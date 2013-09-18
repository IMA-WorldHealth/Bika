var jasmine = require('jasmine-node')
    , db = require('../lib/database/db')()
    , env = jasmine.getEnv();

describe("The database module db.js ", function() {

  it("supports mysql database", function() {
    expect(db.getSupportedDatabases()).toContain("mysql");
  });

  it("has an update statement", function() {
    expect(db.update).toBeDefined();
  });

});


describe("Database UPDATE tests", function() {
  var single_row, multi_row, table = 'account';

  single_row_int = {
    rows: {id:1},
    updateInfo: {accountLocked: 0}
  };

  single_row_int_res = "UPDATE `account` SET `accountLocked`=0 WHERE `id`=1;";

  it("supports single property updates (integer)", function() {
    expect(db.update(table, single_row_int)).toBe(single_row_int_res);
  });

  single_row_string = {
    rows: {id: 1},
    updateInfo: {accountTxt: "This is a test"}
  };

  single_row_string_res = "UPDATE `account` SET `accountTxt`='This is a test' WHERE `id`=1;";
  
  it("supports single property updates (string)", function () {
    expect(db.update(table, single_row_string)).toBe(single_row_string_res);
  });


  single_row_multi = {
    rows: {id:1},
    updateInfo: {accountTxt1: "test1", accountTxt2: "test2"}
  };

  single_row_multi_res = "UPDATE `account` SET `accountTxt1`='test1', `accountTxt2`='test2' WHERE `id`=1;";

  it("supports multi property updates (uniform)", function () {
    expect(db.update(table, single_row_multi)).toBe(single_row_multi_res);
  });

  single_row_multi_mixed = {
    rows: {id: 1},
    updateInfo: {accountTxt1: "test1", accountTypeId: 1}
  };

  single_row_multi_mixed_res = "UPDATE `account` SET `accountTxt1`='test1', `accountTypeId`=1 WHERE `id`=1;";

  it("supports multi property updates (mixed type)", function () {
    expect(db.update(table, single_row_multi_mixed)).toBe(single_row_multi_mixed_res);
  });

  multi_row = {
    rows: {id: [1,2]},
    updateInfo: {accountTxt: 'test'}
  };

  multi_row_res = "UPDATE `account` SET `accountTxt`='test' WHERE `id` IN (1, 2);";

  it("supports multi row updates (string)", function () {
    expect(db.update(table, multi_row)).toBe(multi_row_res);
  });
});

describe("Database INSERT tests", function() {
  var single_line, table = 'location';

  single_line = [{id: 7, name: 'Kikongo'}];
  single_line_res = "INSERT INTO `location` (id, name) VALUES (7, 'Kikongo');";

  it("supports single line inserts", function() {
    expect(db.insert(table, single_line)).toBe(single_line_res);
  });

  multi_line = [
    {id: 8, name: 'Sona Bata', climate: 'medium'},
    {id: 10, name: 'Sona Mpangu', climate: 'wet'}
  ];

  multi_line_res = "INSERT INTO `location` (id, name, climate) VALUES (8, 'Sona Bata', 'medium'), (10, 'Sona Mpangu', 'wet');";

  it("supports multi line inserts", function() {
    expect(db.insert(table, multi_line)).toBe(multi_line_res);
  });

  // FIXME: more tests for INSERT

});

describe("database DELETE tests", function() {
  var table = "user";

  single_param = {id: [1,2,3]};
  single_param_res = "DELETE FROM `user` WHERE `id` IN (1, 2, 3);";

  it("supports single parameter deletions", function() {
    expect(db.delete(table, single_param)).toBe(single_param_res);
  });

  multi_param = {id: [1,2,3], name: ["jon", "bill", "jack"]};
  multi_param_res = "DELETE FROM `user` WHERE `id` IN (1, 2, 3) AND `name` IN ('jon', 'bill', 'jack');";

  it("supports multi parameter deletions", function () {
    expect(db.delete(table, multi_param)).toBe(multi_param_res);
  });

  multi_param_unbalanced = {id: [1], loggedIn: [0,1]};
  multi_param_unbalanced_res = "DELETE FROM `user` WHERE `id` IN (1) AND `loggedIn` IN (0, 1);";

  it("supports unbalanced multi parameter deletions", function() {
    expect(db.delete(table, multi_param_unbalanced)).toBe(multi_param_unbalanced_res);
  });

  // FIXME: More tests  for DELETE

});

describe("database SELECT tests", function () {
  
  no_condition_single = {entities: [{t: 'account', c: ['id']}]};
  no_condition_single_res = "SELECT `account`.`id` FROM `account`;";

  it("supports single table, simple selects", function() {
    expect(db.select(no_condition_single)).toBe(no_condition_single_res);
  });

  no_condition_multi = {entities: [{t: 'account', c: ['id', 'accountLocked']}]};
  no_condition_multi_res = "SELECT `account`.`id`, `account`.`accountLocked` FROM `account`;";

  it("supports single table, multicolumn selects", function() {
    expect(db.select(no_condition_multi)).toBe(no_condition_multi_res);
  });

  join_condition_double = {
    entities: [
      {t: 'account', c: ['id', 'accountTxt']},
      {t: 'debitor', c: ['id', 'account_id']}
    ],
    jcond: [
      {ts: ['account', 'debitor'], c: ['id', 'account_id']}
    ]
  };
  join_condition_double_res = "SELECT `account`.`id`, `account`.`accountTxt`, `debitor`.`id`, `debitor`.`account_id` FROM `account`, `debitor` WHERE `account`.`id` = `debitor`.`account_id`;";

  it("supports simple join conditions", function () {
    expect(db.select(join_condition_double)).toBe(join_condition_double_res);
  });

  join_condition_and_triple = {
    entities: [
      {t: 'account', c: ['id', 'accountTxt']},
      {t: 'debitor', c: ['id', 'account_id', 'debitor_group_id']},
      {t: 'debitor_group', c: ['id', 'type']}
    ],
    jcond: [
      {ts: ['account', 'debitor'], c: ['id', 'account_id'], l: 'AND'},
      {ts: ['debitor', 'debitor_group'], c: ['debitor_group_id', 'id']}
    ]
  };
  join_condition_and_triple_res = "SELECT `account`.`id`, `account`.`accountTxt`, `debitor`.`id`, `debitor`.`account_id`, `debitor`.`debitor_group_id`, `debitor_group`.`id`, `debitor_group`.`type` FROM `account`, `debitor`, `debitor_group` WHERE `account`.`id` = `debitor`.`account_id` AND `debitor`.`debitor_group_id` = `debitor_group`.`id`;";

  it("supports three-way join conditions with AND", function() {
    expect(db.select(join_condition_and_triple)).toBe(join_condition_and_triple_res);
  });

  condition_simple_number = {
    entities: [
      {t: 'account', c: ['id', 'accountTxt']}
    ],
    cond: [
      {t: 'account', cl: 'id', z: '<', v: 1010}
    ]
  };

  condition_simple_number_res = "SELECT `account`.`id`, `account`.`accountTxt` FROM `account` WHERE `account`.`id` < 1010;";
  
  it("supports simple conditions (numbers)", function() {
    expect(db.select(condition_simple_number)).toBe(condition_simple_number_res);
  });

  condition_simple_text = {
    entities: [
      {t: 'account', c: ['id', 'accountTxt']}
    ],
    cond: [
      {t: 'account', cl: 'accountTxt', z: '=', v: "Hello World"}
    ]
  };

  condition_simple_text_res = "SELECT `account`.`id`, `account`.`accountTxt` FROM `account` WHERE `account`.`accountTxt` = 'Hello World';";

  it("supports simple conditions (text)", function () {
    expect(db.select(condition_simple_text)).toBe(condition_simple_text_res);
  });

  condition_multi_mixed_and = {
    entities: [
      {t: 'account', c: ['id', 'accountTxt']}
    ],
    cond: [
      {t: 'account', cl: 'id', z:'=', v:1, l: 'AND'},
      {t: 'account', cl: 'accountTxt', z: '=', v:'Hello World'}
    ]
  };

  condition_multi_mixed_and_res = "SELECT `account`.`id`, `account`.`accountTxt` FROM `account` WHERE `account`.`id` = 1 AND `account`.`accountTxt` = 'Hello World';";

  it("Supports multiple mixed type conditions with AND", function() {
    expect(db.select(condition_multi_mixed_and)).toBe(condition_multi_mixed_and_res);
  });

  condition_multi_mixed_or= {
    entities: [
      {t: 'account', c: ['id', 'accountTxt']}
    ],
    cond: [
      {t: 'account', cl: 'id', z:'=', v:1, l: 'OR'},
      {t: 'account', cl: 'accountTxt', z: '=', v:'Hello World'}
    ]
  }; 

  condition_multi_mixed_or_res= "SELECT `account`.`id`, `account`.`accountTxt` FROM `account` WHERE `account`.`id` = 1 OR `account`.`accountTxt` = 'Hello World';";

  it("supports multiple mixed type conditions with OR" , function() {
    expect(db.select(condition_multi_mixed_or)).toBe(condition_multi_mixed_or_res);
  });

  combined_simple = {
    entities: [
      {t: 'enterprise', c: ['id', 'name']},
      {t: 'account', c: ['id', 'enterprise_id']}
    ],
    jcond: [
      {ts: ['enterprise', 'account'], c: ['id', 'enterprise_id'], l: 'AND'}
    ],
    cond: [
      {t: 'account', cl: 'id', z:'>=', v:101} 
    ]
  };

  combined_simple_res = "SELECT `enterprise`.`id`, `enterprise`.`name`, `account`.`id`, `account`.`enterprise_id` FROM `enterprise`, `account` WHERE `enterprise`.`id` = `account`.`enterprise_id` AND `account`.`id` >= 101;";

  it("supports combined joins and conditions", function() {
    expect(db.select(combined_simple)).toBe(combined_simple_res);
  });
});


env.updateInterval = 250;
var reporter = new jasmine.ConsoleReporter();
env.addReporter(reporter);
env.execute();
