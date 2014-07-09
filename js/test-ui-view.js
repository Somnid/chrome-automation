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
  }
  function gatherSelectors(){
    this.dom.tests = document.getElementById("tests");
  }
  function init(){
    this.gatherSelectors();
    this.render();
  }
  function render(){
    this.options.model.forEach(function(test){
      var testView = document.createElement("test-view");
      testView.innerText = test.file;
      this.dom.tests.appendChild(testView)
    }.bind(this));
  }
  return {
    create : create
  };
})();