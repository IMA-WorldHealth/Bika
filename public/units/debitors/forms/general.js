require([
  "dojo/store/Memory",
  "dojo/store/JsonRest",
  "dojo/store/Cache",
  "bika/Select",
  "bika/Form", // required for getParent()
  "bika/ApplicationState",
  "dojo/domReady!"
  ], function (Memory, JsonRest, Cache, Select, Form, AppState) {

  // the prefix used for ids in this module
  var prefix = "bika-units-debitors-forms-general-";
  var form = new Form({
    id: prefix + 'form'
  }, prefix + 'form');
  
  // import application variables
  var app = new AppState();
  // organisation select declaration
  var orgstore = new Cache(new JsonRest({ target: 'data/' }), new Memory());

  var orgquery = {
    e: [{t: "organisation", c: ["id", "name", "account_number", "location_id", "address_1", "address_2", "phone", "email"]}],
    c: [
      {t: "organisation", cl: "enterprise_id", z: "=", v: app.getValue("enterprise-select")}
    ]
  };

  var orgselect = new Select({
    id: prefix + "org",
    store: orgstore,
    query: "?" + JSON.stringify(orgquery),
    getLabel: function(data) { return data.name; },
    emptyNode: true // FIXME: make this default
  });

  orgselect.startup(); // necessary
  
  var locationstore = new Cache(new JsonRest({ target: 'data/' }), new Memory());

  var locationquery = {
    e: [{t: 'location', c: ['id', 'city', 'region', 'country_code']}],
  };

  var countrystore = new Cache(new JsonRest({ target: 'data/' }), new Memory());

  countryquery = {
    e: [ {t: 'country', c: ['id', 'code', 'country_en']}]
  };

  var countryselect = new Select({
    id: prefix + "country",
    store: countrystore,
    emptyNode: true,
    query: "?" + JSON.stringify(countryquery),
    getLabel: function(data) {
      return data.country_en;
    }
  });

  countryselect.startup();

  var regionselect = new Select({
    id: prefix + "region",
    store: locationstore,
    emptyNode: true,
    query: "?" + JSON.stringify(locationquery),
    getLabel: function(data) {
      return data.region;
    }
  });

  regionselect.startup(); // absolutely required for function

  var cityselect = new Select({
    id: prefix + "city",
    store: locationstore,
    query: "?" + JSON.stringify(locationquery),
    class: "bika", // FIXME: doesn't work yet
    emptyNode: true,
    getLabel: function(data) {
      return data.city;
    }
  });

  cityselect.startup(); // necessary
  
  // expose form methods to content pane 
  
  var container = form.getParent();

  // FIXME: this is an embarrassingly terrible
  // way of doing this but I'm sick of wasting
  // time on this code and this will work.  Fix
  // it when you get a chance.

  // refreshform : Function
  function refreshForm(data) {
    // set('values', data) seems to be broken..
    // Issue with Stateful?
    // TODO: fix this
    form.setValues(data);
    // set more specific queries
    var orgid = data.id;
    var orgobj = orgstore.get(data.id);
    orgselect.setOption(orgstore.getIdentity(orgobj));

    var locationid = data.location_id;
    var locationobj = locationstore.get(locationid);

    var cityid = locationobj.city;
    cityselect.setOption(cityid);
    var regionid = locationobj.region;
    regionselect.setOption(regionid);
    
    var countryid = locationobj.country_code;
    var countryobj = countrystore.get(countryid);
    countryselect.setOption(countrystore.getIdentity(countryobj));
  }

  // expose to outside
  container.set('refreshForm', refreshForm);
  container.set('addFormCallback', function(callback, evt) { return form.addCallback(callback, evt); });
  container.set('getFormValues', function() { return form.getValues(); });

}); 
