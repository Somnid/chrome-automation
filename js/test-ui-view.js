var TestUiView = (function(){
  function create(options){
    var testUi = {};
    testUi.dom = {};
    testUi.options = options || {};
    bind(testUi);
    testUi.init();
  }
  function bind(testUi){
    testUi.gatherSelectors = gatherSelectors.bind(testUi);
    testUi.init = init.bind(testUi);
    testUi.render = render.bind(testUi);
    testUi.attachEvents = attachEvents.bind(testUi);
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
    this.dom.runAll.addEventListener("click", function(){
      TestRunner.runTests(testConfig);
	  });
  }
  function render(){
    this.options.model.forEach(function(test){
      var testView = document.createElement("test-view");
      testView.innerText = test.name || test.file;
      testView.test = test;
      this.dom.tests.appendChild(testView)
    }.bind(this));
  }
  return {
    create : create
  };
})();