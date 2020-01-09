'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _prismic = require('prismic.io');

var _prismic2 = _interopRequireDefault(_prismic);

var _prismicConfiguration = require('./prismic-configuration');

var _prismicConfiguration2 = _interopRequireDefault(_prismicConfiguration);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_DOMAIN = 'https://prismic.io';
var DEFAULT_CONFIG_PATH = './prismic-configuration.js';

function makeTemplate(name, url, configuration, innerFolder, instructions, isQuickstart) {
  var ignoreConf = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

  var config = configuration || DEFAULT_CONFIG_PATH;
  return {
    name: name,
    url: url,
    configuration: ignoreConf ? null : config,
    innerFolder: innerFolder,
    instructions: instructions,
    isQuickstart: isQuickstart || false
  };
}

function convertDocToTemplates(doc) {
  return doc.getSliceZone('cli.templates').slices.reduce(function (acc, s) {
    if (s.sliceType === 'template') {
      var template = s.value.toArray()[0];
      return acc.concat([makeTemplate(template.getText('name'), template.getText('url'), template.getText('configuration'), template.getText('innerFolder'), template.getText('instructions'), template.getText('is-quickstart') === 'yes')]);
    }
    return acc;
  }, []);
}

var Helpers = {
  UI: {
    display: function display(messages) {
      if (typeof messages === 'string') {
        process.stdout.write(messages + '\n');
      } else if (typeof messages.join === 'function') {
        process.stdout.write(messages.join('\n') + '\n');
      }
    },
    debug: function debug(msg) {
      process.stdout.write(msg + '\n');
    },
    displayErrors: function displayErrors(errors) {
      if (typeof errors === 'string') {
        process.stdout.write(errors + '\n');
      } else {
        var errorsMsg = (0, _keys2.default)(errors).reduce(function (acc, field) {
          var fieldErrors = errors[field];
          return acc.concat(fieldErrors);
        }, []);
        this.display(errorsMsg);
      }
    }
  },
  Prismic: {
    getApi: function getApi() {
      return _prismic2.default.api(_prismicConfiguration2.default.apiEndpoint);
    },
    templates: function templates() {
      var api, doc;
      return _regenerator2.default.async(function templates$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _regenerator2.default.awrap(this.getApi());

            case 3:
              api = _context.sent;
              _context.next = 6;
              return _regenerator2.default.awrap(api.getSingle('cli'));

            case 6:
              doc = _context.sent;
              return _context.abrupt('return', convertDocToTemplates(doc));

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', []);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[0, 10]]);
    }
  },
  Domain: {
    default: DEFAULT_DOMAIN,
    repository: function repository(base, domain) {
      var matches = (base || DEFAULT_DOMAIN).match(new RegExp('((https?://)([^/]*))'));
      return '' + matches[2] + domain + '.' + matches[3];
    },
    api: function api(base, domain) {
      return this.repository(base, domain) + '/api';
    }
  },
  Theme: {
    defaultConfigPath: DEFAULT_CONFIG_PATH,
    make: function make(name, url, configPath, ignoreConf, tmpFolder, innerFolder) {
      return {
        tmpFolder: tmpFolder,
        template: makeTemplate(name, url, configPath, innerFolder, ignoreConf)
      };
    }
  },
  Json: {
    merge: function merge(obj, other) {
      var result = this.copy(obj);
      (0, _keys2.default)(other).forEach(function (key) {
        result[key] = other[key];
      });
      return result;
    },
    copy: function copy(obj) {
      var result = {};
      (0, _keys2.default)(obj).forEach(function (key) {
        result[key] = obj[key];
      });
      return result;
    }
  },
  MagicLink: {
    parse: function parse(response) {
      try {
        var _JSON$parse = JSON.parse(response),
            token = _JSON$parse.token;

        return token;
      } catch (e) {
        return null;
      }
    },
    buildRedirectUrl: function buildRedirectUrl(base, domain) {
      var token, redirectUri;
      return _regenerator2.default.async(function buildRedirectUrl$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator2.default.awrap(_config2.default.get('magicLink'));

            case 2:
              token = _context2.sent;
              redirectUri = Helpers.Domain.repository(base, domain);

              if (!token) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', (base || DEFAULT_DOMAIN) + '/magic?token=' + token + '&redirectUri=' + redirectUri);

            case 6:
              return _context2.abrupt('return', redirectUri);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  },
  Url: {
    // param should be an array of tuples [[key, value]]
    buildQueryString: function buildQueryString(params) {
      var formattedParams = (0, _entries2.default)(params).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return v !== null;
      }).map(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return k + '=' + v;
      });

      if (formattedParams.length == 0) return '';else return '?' + formattedParams.join('&');
    }
  }
};

exports.default = Helpers;