var loggly = require('loggly'),
    _ = require('lodash'),
    client;

if(process.env.LOGGLY_KEY && process.env.LOGGLY_SUBDOMAIN ) {
 client = loggly.createClient({ token: process.env.LOGGLY_KEY, json:true, subdomain: process.env.LOGGLY_SUBDOMAIN });
} else {
  client = { log: function(data){ console.log(data); }};
}

function logMain(level, data, location) {
  if(_.isPlainObject(data)) {
    data._location = location;
    data._level = level;
	 client.log(data);
  } else {
   client.log({
	    _location: location,
      _level : level,
      message: data.toString()
   });
  }
};

exports.trace = function(data,location){
  logMain('trace',data,location);
};
exports.debug = function(data,location){
  logMain('debug',data, location);
};
exports.info = function(data,location){
  logMain('info',data, location);
};
exports.error = function(data,location){
  logMain('error',data, location);
};
exports.warn = function(data,location){
  logMain('warning',data, location);
};
exports.metric = function(data,location){
  logMain('metric',data, location);
};
