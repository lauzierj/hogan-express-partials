var walker = require('fs-walk'),
    path = require('path');

exports.middleware = function() {
  return function(req, res, next) {
    var render = res.render;
    res.render = function(template, locals, callback) {
      if(!locals) locals = {};
      if(!locals.partials) locals.partials = {};

      var viewDir = req.app.get('views');
      walker.walk(viewDir, function(basedir, filename, stat, next) {
        var p = path.join(basedir, filename).replace(path.join(viewDir, '/'), '').replace(/\\/g, '/');
        if((path.extname(p) == '.html') && filename.indexOf('.') != 0) {
          locals.partials['@' + p.replace(/\\/g, '/')] = p;
          if(filename == 'index.html')
            locals.partials['@' + path.dirname(p).replace(/\\/g, '/')] = p;
          locals.partials['@' + p.replace('.html', '').replace(/\\/g, '/')] = p;
        }
        next();
      }, function() {
        render.call(res, template, locals, callback);
      });
    }
    next();
  }
};