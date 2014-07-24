var Generators = (function(){
  function number(length){
    
  }
  function zip(){
    return number(5);
  }
  function phone(){
    return "555" + number(7);
  }
  return {
    number : number,
    zip : zip,
    phone : phone
  };
});