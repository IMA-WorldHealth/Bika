require(["dojo/_base/declare", "dojo/store/Memory", "dojo/store/JsonRest", "dojo/store/Cache", "dijit/form/Select", "dgrid/Grid", "dgrid/editor", "dojo/domReady!"],
function (declare, Memory, JsonRest, Cache, Select, Grid, editor) {

  var payment_rest_store = new JsonRest({target: "data/"});
  var payment_mem_store = new Memory({});
  var payment_store = new Cache(payment_rest_store, payment_mem_store);
  var payment_query = {};

  var payment_select = new Select({
    store: payment_store,
    query: payment_query
  }, "bika-units-debitors-forms-invoicing-payment");

  var contact_rest_store = new JsonRest({target: "data/"});
  var contact_mem_store = new Memory({});
  var contact_store = new Cache(contact_rest_store, contact_mem_store);
  var contact_query = {};

  var contact_select = new Select({
    store: contact_store,
    query: contact_query
  }, "bika-units-debitors-forms-invoicing-contact");

  var pricegrid_rest_store = new JsonRest({target: "data/"});
  var pricegrid_mem_store = new Memory({});
  var pricegrid_store = new Cache(pricegrid_rest_store, pricegrid_mem_store);
  var pricegrid_query = {};

  var columns = [
    {id: 'pricegroups', field: 'pricegroups'},
    {id: 'discount', field: 'discount'},
    {id: 'salesprice', field: 'salesprice'}
  ];

  var pricegrid = new Grid({
    store: pricegrid_store,
    query: pricegrid_query
  }, "bika-units-debitors-forms-invoicing-pricegrid");


  function updateInvoicing() {
    
  }

});
