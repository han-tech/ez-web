#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
  });

var _regenerator = require('babel-runtime/regenerator');
var _regenerator2 = _interopRequireDefault(_regenerator);
var _authentication = require('./authentication');
var _authentication2 = _interopRequireDefault(_authentication);
var _login = require('./login');
var _login2 = _interopRequireDefault(_login);
var _config = require('./config');
var _config2 = _interopRequireDefault(_config);
var _helpers = require('./helpers');
var _helpers2 = _interopRequireDefault(_helpers);
var _repository = require('./repository');
var _repository2 = _interopRequireDefault(_repository);
var _communication = require('./communication');
var _communication2 = _interopRequireDefault(_communication);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login(config, args) {
    var base, email, password;
    return _regenerator2.default.async(function login$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                base = config.base || _helpers2.default.Domain.default;
                email = args['--email'];
                password = args['--password'];
                _context5.next = 5;
                return _regenerator2.default.awrap((0, _login2.default)(base, email, password));

                case 5:
                    _helpers2.default.UI.display('Successfully logged in! You can now create repositories.');

                case 6:
                case 'end':
                return _context5.stop();
            }
        }
    }, null, this);
}
function init(config, domain, args, theme) {
    var base, templates;
    return _regenerator2.default.async(function init$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            base = config.base || _helpers2.default.Domain.default;
  
            if (args['--new'] && _helpers2.default.Domain.default !== base) {
              _helpers2.default.UI.display('CAREFUL, your current base is: ' + base + '\n');
            }
  
            _helpers2.default.UI.display('Let\'s get to it!');
            _context.next = 5;
            return _regenerator2.default.awrap(_helpers2.default.Prismic.templates());
  
          case 5:
            templates = _context.sent;
  
            _repository2.default.create(templates, base, domain, args, theme).catch(function (err) {
              _helpers2.default.UI.display('Repository creation aborted: ' + err);
            });
  
          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this);
  }
function initWithTheme(config, url, args, domain) {
    var opts, theme;
    return _regenerator2.default.async(function initWithTheme$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            opts = {
              configPath: args['--conf'] || _helpers2.default.Theme.defaultConfigPath,
              ignoreConf: args['--ignore-conf']
            };
            _context2.next = 4;
            return _regenerator2.default.awrap(_repository2.default.validateTheme(url, opts));
  
          case 4:
            theme = _context2.sent;
            _context2.next = 7;
            return _regenerator2.default.awrap(init(config, domain, args, theme));
  
          case 7:
            return _context2.abrupt('return', _context2.sent);
  
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', _helpers2.default.UI.display('Repository creation aborted: ' + _context2.t0));
  
          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, this, [[0, 10]]);
  }
  function parseCookies (rc) {
    var list = {};
  
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  
    return list;
  }
  
  class PrismicUtility{  
    async createPrismicProject(email, password, prismicTemplate, prismicProjectName) {
      let loginArgs={"--email": email, "--password": password};
      let config = await _config2.default.getAll();
      login(config, loginArgs);
      let themeArgs={"--new":true,"--conf": "prismic-config.js","--noconfirm":true,"--ignoreInstall":true};
      //let config = await _config2.default.getAll();
      initWithTheme(config, prismicTemplate, themeArgs, prismicProjectName);
    }
    async createPrismicWebHook(username, password, prismicProjectName, webhookUrl) {
      let args = {};
      args['--email']=username;
      args['--password']=password;
      let base = 'https://'+prismicProjectName+'.prismic.io';
      let cookies = await _authentication2.default.connect(base, args, true);
      var c = parseCookies(cookies);
      let session = c.X_XSRF;
  
      var url = base+'/app/settings/webhooks/create?_='+session;
      var data = {
        url: webhookUrl
      };
      return await _communication2.default.post(url, data, cookies);
    }
    async createPrismicContent(username, password, prismicProjectName, type, contentType, content) {
      let args = {};
      args['--email']=username;
      args['--password']=password;
      let base = 'https://prismic.io';
      let cookies = await _authentication2.default.connect(base, args, true);
      var c = parseCookies(cookies);
      let session = c.X_XSRF;
  
      var url = 'https://'+prismicProjectName+'.prismic.io'+'/app/documents?context=unclassified&language=en-us&_='+session;
      var data = {
        "mask":{
          "id":type,
          "value":contentType
        },
        "version":{
          "tags":[],
          "document":content
        },
        "integrationFields":[]
      } ;
      return await _communication2.default.postJson(url, data, cookies);
    }
    async createAndPublishPrismicContent(username, password, prismicProjectName, type, contentType, content) {
      let args = {};
      args['--email']=username;
      args['--password']=password;
      let base = 'https://prismic.io';
      let cookies = await _authentication2.default.connect(base, args, true);
      var c = parseCookies(cookies);
      let session = c.X_XSRF;
  
      var url = 'https://'+prismicProjectName+'.prismic.io'+'/app/documents?context=unclassified&language=en-us&_='+session;
      var data = {
        "mask":{
          "id":type,
          "value":contentType
        },
        "version":{
          "tags":[],
          "document":content
        },
        "integrationFields":[]
      } ;
      var content = await _communication2.default.postJson(url, data, cookies);
      url = 'https://'+prismicProjectName+'.prismic.io'+'/app/documents/'
      +content.created+'/versions/'+content.saved+'/publish?context=unclassified&language=en-us&_='+session;
      data=null;
      return await _communication2.default.post(url, data, cookies);
    }
  }
  exports.PrismicUtility = PrismicUtility;