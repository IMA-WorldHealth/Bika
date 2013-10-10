require([
  "dojo/store/Memory", 
  "dojo/store/JsonRest", 
  "dojo/store/Cache", 
  "bika/Select", 
  "bika/Form",
  "dgrid/OnDemandGrid", 
  "dojo/domReady!"],
function (Memory, JsonRest, Cache, Select, Form, OnDemandGrid)  {

  // prefix for this page.
  var prefix = "bika-units-debitors-forms-invoicing-";
  var form = new Form({
    id: prefix + "form" // FIXME: why are we doing this.
  }, prefix + "form");

  // payment select feeds from payment_id
  var pstore = new Cache(new JsonRest({target: "data/"}), new Memory());
  var pquery = {
    e: [{t: "payment", c: ["id", "days", "months", "text", "note"]}] // FIXME: remove cols we don't need 
  };

  var pselect = new Select({
    id: prefix + "payment",
    store: pstore,
    query: "?" + JSON.stringify(pquery),
    getLabel: function(data) { return data.text; },
    emptyNode: true // FIXME: make this default
  });

  pselect.startup();

  var cstore = new Cache(new JsonRest({target: "data/"}), new Memory());
  var cquery = {
    e: [
      {t: "employee", c:["id", "name", "title", "location_id", "department_id", "initials"]}
    ],
  };

  var cselect = new Select({
    id: prefix + "contact",
    store: cstore,
    query: "?" + JSON.stringify(cquery),
    getLabel: function(data) {
      return data.name;
    },
    emptyNode: true // FIXME: make this default
  });

  cselect.startup();

  var pgstore = new Cache(new JsonRest({target: "data/"}), new Memory());
  var pgquery= {
    e: [{t: "pricegroup", c: ["id", "note"]}] 
  };

  // FIXME: I don't understand what this is supposed to do
  // enough to properly impliment it.
  var pgcolumns = [
    {id: "note", field: "note", label: "Price Group"}
  ];

  var pricegrid = new OnDemandGrid({
    store: pgstore,
    query: "?" + JSON.stringify(pgquery),
    columns: pgcolumns
  }, prefix + "pricegrid");

  // expose exterior methods
  
  var container = form.getParent();

  function refreshForm(data) {
    form.setValues(data);

    var payid = data.payment_id;
    var payobj = pstore.get(payid);
    pselect.setOption(pstore.getIdentity(payobj));

    var contactid = data.contact_id;
    var contactobj = cstore.get(contactid);
    cselect.setOption(cstore.getIdentity(contactobj));

  }

  container.set('refreshForm', refreshForm);
  container.set('getFormValues', function() { return form.getValues(); });
  container.set('addFormCallback', function(callback, evt) { return form.addCallback(callback, evt); });

});
