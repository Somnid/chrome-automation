var ActionParserService = (function(){
  
  var defaults = {
    actions : null, //required
    generator : null //required
  };
  
  function create(options){
    var actionParserService = {};
    actionParserService.options = Object.assign({}, defaults, options);
    bind(actionParserService);
    return actionParserService;
  }
  
  function bind(actionParserService){
    actionParserService.parse = parse.bind(actionParserService);
    actionParserService.parseAsAction = parseAsAction.bind(actionParserService);
    actionParserService.parseArgument = parseArgument.bind(actionParserService);
    actionParserService.parseGenerator = parseGenerator.bind(actionParserService);
  }

  function parse(script){
    script = script.trim();
    var lines = script.split("\n");
    var actions = [];
    
    lines.forEach((line) => {
      if(!/^\/\//.test(line)){
        actions.push(this.parseAsAction(line));
      }
    });
    
    return actions;
  }
  function parseAsAction(line){
    var parts = Util.splitWhitespace(line);
    var action = this.options.actions.actionMap[parts[0]];
    var args = parts.slice(1).map(x => this.parseArgument(x));
    return {
      action : action,
      args : args
    };
  }
  
  function parseArgument(arg){
    arg = arg.trim();
    arg = Util.transformToken(arg, /\{.*\}/, x => this.parseGenerator(x));
    return arg;
  }
  
  function parseGenerator(generatorText){
    var text = generatorText.replace(/[\{\}]/g, "");
    var split = text.split(",").map(x => x.trim());
    var generator = this.options.generator[split[0]];
    if(!generator){
      throw `Could not find generator for "${split[0]}"`;
    }
    return generator.apply(null, split.slice(1));
  }
  
  return {
    create : create
  };
  
})();