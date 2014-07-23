var testGroupViewProto = Object.create(HTMLElement.prototype);

testGroupViewProto.createdCallback = function(){
  TestGroupView.create(this);
}
document.registerElement("test-group-view", {
  prototype : testGroupViewProto
});

var TestGroupView = (function(){
  function create(element){
    element.dom = {};
    bind(element);
    element.renderShadow();
    element.gatherSelectors();
    element.attachEvents();
    element.attachObservers();
  }
  function bind(element){
    element.renderShadow = renderShadow.bind(element);
    element.gatherSelectors = gatherSelectors.bind(element);
    element.attachEvents = attachEvents.bind(element);
    element.attachObservers = attachObservers.bind(element);
    element.renderTests = renderTests.bind(element);
    element.onClick = onClick.bind(element);
  }
  function renderShadow(){
    var template = document.getElementById("test-group-view-tmpl");
    var tmpl = Tmpl.tmpl(template, { ".title" : "groupName" }, this);
    this.dom.shadowRoot = this.createShadowRoot();
    this.dom.shadowRoot.appendChild(tmpl);
  }
  function gatherSelectors(){
  }
  function attachEvents(){
    this.addEventListener("click", this.onClick);
  }
  function attachObservers(){
    Obsv.observe(this, "tests", this.renderTests);
  }
  function renderTests(tests){
    for(var i = 0; i < tests.length; i++){
      var testView = document.createElement("test-view");
      testView.test = this.tests[i];
      this.appendChild(testView);
    }
  }
  function onClick(e){
  }
  return {
    create : create
  };
})();