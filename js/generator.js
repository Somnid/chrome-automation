var Generator = (function(){
  
  function createAsync(){
    return new Promise((resolve, reject) => {
      var generator = {};
      generator.data = {};
      bind(generator);
      generator.init()
        .then(() => resolve(generator));
    });
  }
  
  function bind(generator){
    generator.getData = getData.bind(generator);
    generator.init = init.bind(generator);
    
    generator.int = getInt.bind(generator);
    generator.bool = getBool.bind(generator);
    generator.id = getId.bind(generator);
    generator.zip = getZip.bind(generator);
    generator.firstName = getFirstName.bind(generator);
    generator.lastName = getLastName.bind(generator);
    generator.fullName = getFullName.bind(generator);
    generator.phone = getPhone.bind(generator);
    generator.state = getState.bind(generator);
    generator.city = getCity.bind(generator);
  }
  
  function init(){
    return this.getData();
  }
  
  function getData(){
    return Promise.all([
      fetch("/data/female-names.json").then(response => response.json().then(data => { this.data.femaleNames = data; })),
      fetch("/data/male-names.json").then(response => response.json().then(data => { this.data.maleNames = data; })),
      fetch("/data/last-names.json").then(response => response.json().then(data => { this.data.lastNames = data; })),
      fetch("/data/cities.json").then(response => response.json().then(data => { this.data.cities = data; })),
      fetch("/data/states.json").then(response => response.json().then(data => { this.data.states = data; }))
    ]);
  }
  
  function getInt(exclusiveCap){
		return Math.floor(Math.random() * exclusiveCap);
	}
	
	function getBool(){
		if(getInt(2) === 0){
			return true;
		}else{
			return false;
		}
	}
  
  function getId(length){
    var number = "";
    for(var i = 0; i < length; i++){
      number += getInt(10);
    }
    return number;
  }
  
  function getZip(){
    return getId(5);
  }
  
  function getFirstName(gender){
    if(gender == "female"){
      return this.data.femaleNames[getInt(this.data.femaleNames.length)];
    }else if(gender == "male"){
      return this.data.maleNames[getInt(this.data.maleNames.length)];
    }else if(getBool()){
      return this.data.femaleNames[getInt(this.data.femaleNames.length)];
    }
    return this.data.maleNames[getInt(this.data.maleNames.length)];
  }
  
  function getLastName(){
    return this.data.lastNames[getInt(this.data.lastNames.length)];
  }
  
  function getFullName(gender){
    return `${firstName(gender)} ${lastName()}`;
  }
  
  function getPhone(){
    return "555" + id(7);
  }
  
  function getState(format){
    var state = this.data.states[getInt(this.data.states.length)];
    if(!format || format == "XX"){
      return state.code;
    }else if(format == "XXX"){
      return state.name.toUpperCase();
    }else if(format == "xxx"){
      return state.name.toLowerCase();
    }else if(format == "Xxx"){
      return state.name;
    }else if(format == "Xx"){
      return state.code[0] + state.code.substr(1).toLowerCase();
    }
    return state.code.toLowerCase();
  }
  
  function getCity(){
    return this.data.cities[getInt(this.data.cities.length)];
  }
  
  return {
    createAsync : createAsync
  };
})();