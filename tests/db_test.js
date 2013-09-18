var jasmine = require('jasmine-node')
    , db = require('../lib/database/db')()
    , env = jasmine.getEnv();

describe("Jasmine is running properly", function () {
  it("can verify truths", function () {
    expect(true).toBe(true);
  });
});

describe("The database module db.js ", function() {

  it("supports mysql database", function() {
    expect(db.getSupportedDatabases()).toContain("mysql");
  });

  it("has an update statement", function() {
    expect(db.update).toBeDefined();
  });

});


describe("Database update tests", function() {
  var single_row, multi_row, table = 'account';

  single_row_int = {
    rows: {id:1},
    updateInfo: {accountLocked: 0}
  };

  single_row_int_res = "UPDATE `account` SET `accountLocked`=0 WHERE id=1;";

  it("supports single property updates (integer)", function() {
    expect(db.update(table, single_row_int)).toBe(single_row_int_res);
  });

  single_row_string = {
    rows: {id: 1},
    updateInfo: {accountTxt: "This is a test"}
  };

  single_row_string_res = "UPDATE `account` SET `accountTxt`=`This is a test` WHERE id=1;";
  
  it("supports single property updates (string)", function () {
    expect(db.update(table, single_row_string)).toBe(single_row_string_res);
  });


  single_row_multi = {
    rows: {id:1},
    updateInfo: {accountTxt1: "test1", accountTxt2: "test2"}
  };

  single_row_multi_res = "UPDATE `account` SET `accountTxt1`=`test1`, `accountTxt2`=`test2` WHERE id=1;";

  it("supports multi property updates (uniform)", function () {
    expect(db.update(table, single_row_multi)).toBe(single_row_multi_res);
  });

  single_row_multi_mixed = {
    rows: {id: 1},
    updateInfo: {accountTxt1: "test1", accountTypeId: 1}
  };

  single_row_multi_mixed_res = "UPDATE `account` SET `accountTxt1`=`test1`, `accountTypeId`=1 WHERE id=1;";

  it("supports multi property updates (mixed type)", function () {
    expect(db.update(table, single_row_multi_mixed)).toBe(single_row_multi_mixed_res);
  });

  multi_row = {
    rows: {id: [1,2]},
    updateInfo: {accountTxt: 'test'}
  };

  multi_row_res = "UPDATE `account` SET `accountTxt`=`test` WHERE id IN (1,2);";

  it("supports multi row updates (string)", function () {
    expect(db.update(table, multi_row)).toBe(multi_row_res);
  });
});




env.updateInterval = 250;
var reporter = new jasmine.ConsoleReporter();
env.addReporter(reporter);
env.execute();
