var testGroupViewProto = Object.create(HTMLElement.prototype);

Object.defineProperty(testGroupViewProto, "tests", {
  writable : true
});

testGroupViewProto.createdCallback = function(){
  TestGroupView.create(this);
}
document.registerElement("test-group-view", {
  prototype : testGroupViewProto
});

var TestGroupView = (function(){
  function create(element){
    element.dom = {};
    element.test = {};
    bind(element);
    element.renderShadow();
    element.gatherSelectors();
    element.attachEvents();
  }
  function bind(element){
    element.renderShadow = renderShadow.bind(element);
    element.gatherSelectors = gatherSelectors.bind(element);
    element.attachEvents = attachEvents.bind(element);
    element.onClick = onClick.bind(element);
  }
  function renderShadow(){
    var template = document.getElementById("test-group-view-tmpl");
    var tmpl = Tmpl.tmpl(template, { ".title" : "test.name" }, this);
    this.dom.shadowRoot = this.createShadowRoot();
    this.dom.shadowRoot.appendChild(tmpl);
  }
  function gatherSelectors(){
  }
  function attachEvents(){
    this.addEventListener("click", this.onClick);
  }
  function onClick(e){
  }
  return {
    create : create
  };
})();