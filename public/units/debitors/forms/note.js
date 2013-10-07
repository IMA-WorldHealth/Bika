require(["dojo/dom", "bika/ApplicationState"], function(dom, AppState) {

  // Import application variables
  var app = new AppState();

  // using dojo's dom functions to make Steven proud
  var textarea = dom.byId('bika-units-debitors-forms-note-form');

  // note: use a dojo/form
