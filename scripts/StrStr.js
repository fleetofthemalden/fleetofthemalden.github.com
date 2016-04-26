var StrStr = function(baseString, patternString){
  var baseCharArray = baseString.split('');
  var patternCharArray = patternString.split('');
  var firstIndex = -1;
  var matching = false;
  
  var isMatch = function(index){
    for(var k = 0; k < patternCharArray.length; k++){
      if(baseCharArray[index] != patternCharArray[k]){
        return false;
      }
      index++;
    }
    return true;
  };
  
  for(var i = 0; i < baseString.length; i++){
    if(baseCharArray[i] == patternCharArray[0]){
      if(isMatch(i)){
        firstIndex = i;
      }
    }
  }
  
  return firstIndex;
};