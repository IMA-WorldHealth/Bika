var map = { e: 'entities',
            jc: 'jcond',
            c: 'cond',
            r:'rows',
            t:'table',
            u:'updateInfo'};

var hasMap = function (key) {
  return map[key] ? true : false;
};


var getQueryObj = function (objRequest) {
  var base = {};
  if (!objRequest) { 
    return;
  }  
for(var key in objRequest){
  console.log('key', key);
   var name = hasMap(key) ? map[key] : key;
    base[name] = objRequest[key];
  }
  return base;
}
exports.getQueryObj = getQueryObj;
