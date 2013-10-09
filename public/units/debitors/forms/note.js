require(["bika/Form", "bika/ApplicationState"], function(Form, AppState) {

  // Import application variables
  var app = new AppState();

  var formid = "bika-units-debitors-forms-note-form";

  var form = new Form({
    id: formid,
  }, formid);

  var container = form.getParent();
  
  function addFormCallback(callback) {
    return form.addCallback(callback);
  }

  function refreshForm(data) {
    form.setValues(data);
  }

  container.set('addFormCallback', addFormCallback);
  container.set('getFormValues', function() { return form.getValues(); });
  container.set('refreshForm', function(data) { refreshForm(data); });
});
