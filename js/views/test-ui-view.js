var TestUiView = (function(){
  var defaults = {
    model : []
  };
  
  function create(options){
    var testUi = {};
    testUi.options = Object.assign({}, defaults, options);
    bind(testUi);
    testUi.init();
  }
  function bind(testUi){
    testUi.cacheDom = cacheDom.bind(testUi);
    testUi.init = init.bind(testUi);
    testUi.render = render.bind(testUi);
    testUi.getTestElement = getTestElement.bind(testUi);
    testUi.attachEvents = attachEvents.bind(testUi);
    testUi.runAllClick = runAllClick.bind(testUi);
    testUi.addTest = addTest.bind(testUi);
  }
  function cacheDom(){
    this.dom = {};
    this.dom.tests = document.getElementById("tests");
    this.dom.edit = document.getElementById("edit");
    this.dom.addTest = document.getElementById("add-test");
    this.dom.runAll = document.getElementById("run-all");
  }
  function init(){
    this.cacheDom();
    this.attachEvents();
    this.render();
  }
  function attachEvents(){
    this.dom.addTest.addEventListener("click", this.addTest);
  }
  function runAllClick(){
    TestRunner.runTests(testConfig);
  }
  function addTest(){
    this.dom.edit.style.display = "flex";
  }
  function render(){
    if(!this.options.model || this.options.model.length < 1){
      var span = document.createElement("span");
      span.textContent = "No Tests Available";
      this.dom.tests.appendChild(span);
    }
    this.options.model.sort(function(a, b){
      if(a.subtests && !b.subtests){
        return -1;
      }else if(!a.subtests && b.subtests){
        return 1;
      }
      if(a.name > b.name){
        return 1;
      }else if(a.name < b.name){
        return -1;
      }
      return 0;
    });
    for(var i = 0; i < this.options.model.length; i++){
      var testElement = this.getTestElement(this.options.model[i]);
      this.dom.tests.appendChild(testElement);
    }
  }
  function getTestElement(test){
    var testElement;
    if(test.subtests){
      testElement = document.createElement("test-group-view");
      testElement.groupName = test.name;
      testElement.tests = test.subtests;
    }else{
      testElement = document.createElement("test-view");
      test.file = Util.isAbsolutePath(test.file) ? test.file : this.options.basePath + "/" + test.file;
      testElement.test = test;
    }
    return testElement;
  }
  return {
    create : create
  };
})();