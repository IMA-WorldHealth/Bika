require(["dojo/store/Memory", "dijit/form/Select", "dojo/domReady!"], function (Memory, SelectX) {

  // FIXME: Change this to a JSON Rest
  // store once we know what it's for.
  var pricestore = new Memory({
    data: [
      {name:"MicroDevru Prices", id:"MP"},
      {name:"NonMicroDevru Prices", id:"NP"}
    ]
  });

  var inputPrice1 = new Select({
    id    : "inputPrice1",
    name  : "inputPrice1",
    class : "facturation",
    store : pricestore
  }, "inputPrice1");

  var inputPrice2 = new Select({
    id    : "inputPrice2",
    name  : "inputPrice2",
    class : "facturation",
    store : pricestore
  }, "inputPrice2");

  var inputSales1 = new Select({
    id    : "inputSales1",
    name  : "inputSales1",
    class : "facturation",
    store : pricestore
  }, "inputSales1");

  var inputSales2 = new Select({
      id    : "inputSales2",
      name  : "inputSales2",
      class : "facturation",
      store : pricestore
  }, "inputSales2");

  var paiement = new Select({
    id          : "paiement",
    name        : "paiement",
    class       : "facturation",
    placeHolder : "liste paie",
    store       : pricestore,
    onChange    : function() {
      document.getElementById('pour1').innerHTML = dijit.byId('paiement').item.id;
    }
  }, "paiement");	 

  var appeller = new Select({
    id       : "appeller",
    name     : "appeller",
    class    : "facturation",
    store    : pricestore
  }, "appeller");	 
});
