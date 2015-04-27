var loggly = require('loggly'),
    tools = require('totem-tools'),
    _ = require('lodash');
    client = loggly.createClient({ token: process.env.LOGGLY_KEY },json:true, subdomain:"totem");

function logMain(level, data) {
	var stacklist = (new Error()).stack.split('\n');
  var stack = getStack()[2];
  if(_.isPlainObject(data)) {
	  data._file = stack.getFileName();
    data._line = stack.getLineNumber();
    data._level = level;
	 client.log(data);
  } else {
   client.log({
	    _file: stack.getFileName(),
      _line: stack.getLineNumber(),
      _level : level,
      message: data.toString()
   });
  }
};

exports.trace = function(data){
  logMain('trace',data);
};
exports.debug = function(data){
  logMain('debug',data);
};
exports.info = function(data){
  logMain('info',data);
};
exports.error = function(data){
  logMain('error',data);
};
exports.warn = function(data){
  logMain('warning',data);
};


