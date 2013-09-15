// useful scripts to make a developers life easier


// [Function] Strip
// @param string : string
// @param num : integer
// @param side: string {'front'|'back'|'both'}
function strip(string, num, side) {
  var l = string.length;
  if (!side) {
    return string.slice(0, l - num);
  } else {
    if (side === 'both') {
      return string.slice(num, l - num);
    } else if (side === 'front') {
      return string.slice(num);
    } else {
      return string.slice(0, l - num);
    }
  }
}


function Generator(options) {
  options = options || {};
  this.i = options.initial_value || 0;
}

Generator.prototype.next = function() {
  return this.i++;
};

Generator.prototype.reset = function() {
  this.i = 0;
  return this.i;
};
