var TestUiView = (function(){
  function create(options){
    var testUi = {};
    testUi.dom = {};
    testUi.options = options || {};
    testUi.options.model = testUi.options.model || {};
    bind(testUi);
    testUi.init();
  }
  function bind(testUi){
    testUi.gatherSelectors = gatherSelectors.bind(testUi);
    testUi.init = init.bind(testUi);
    testUi.render = render.bind(testUi);
    testUi.getTestElement = getTestElement.bind(testUi);
    testUi.attachEvents = attachEvents.bind(testUi);
    testUi.runAllClick = runAllClick.bind(testUi);
  }
  function gatherSelectors(){
    this.dom.tests = document.getElementById("tests");
    this.dom.runAll = document.getElementById("run-all");
  }
  function init(){
    this.gatherSelectors();
    this.render();
  }
  function attachEvents(){
    this.dom.runAll.addEventListener("click", this.runAllClick);
  }
  function runAllClick(){
    TestRunner.runTests(testConfig);
  }
  function render(){
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
      testElement.test = test;
    }
    return testElement;
  }
  return {
    create : create
  };
})();