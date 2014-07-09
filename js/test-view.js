document.registerElement("test-view", {
  createdCallback : function(){
    this.innerHtml = "<div><content></content><button></button></div>";
  }
});