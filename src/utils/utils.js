module.exports = function() {
  this.findElement = function(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][propName] == propValue)
        return {
          element: arr[i],
          index: i
        };
    }
    return { element: false, index: -1 };
    // will return undefined if not found; you could return a default instead
  };
};
