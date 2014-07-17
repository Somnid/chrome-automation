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
    testUi.getTestView = getTestView.bind(testUi);
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
    this.dom.runAll.addEventListener("click", function(e){
      TestRunner.runTests(testConfig);
	  });
  }
  function render(){
    for(var i = 0; i < this.options.model.length; i++){
      var testView = this.getTestView(this.options.model[i]);
      this.dom.tests.appendChild(testView);
    }
  }
  function getTestView(test){
    var testView = document.createElement("test-view");
    testView.test = test;
    if(test.subtests){
      for(var i = 0; i < test.subtests.length; i++){
        var subTestView = this.getTestView(test.subtests[i]);
        testView.appendChild(subTestView);
      }
    }
    return testView;
  }
  return {
    create : create
  };
})();