import {
  require_prop_types
} from "./chunk-XBRYKRTD.js";
import {
  require_react
} from "./chunk-KL4SNAOQ.js";
import {
  __commonJS
} from "./chunk-PLDDJCW6.js";

// node_modules/react-json-pretty/dist/JSONPretty.js
var require_JSONPretty = __commonJS({
  "node_modules/react-json-pretty/dist/JSONPretty.js"(exports, module) {
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
          t[p[i]] = s[p[i]];
      }
      return t;
    };
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
    var PropTypes = __importStar(require_prop_types());
    var React = __importStar(require_react());
    function getStyleValue(name, theme, styles) {
      var extra = styles[name + "Style"] || "";
      var style = theme ? theme[name] || "" : "";
      return extra ? extra + ";" + style : style;
    }
    function getStyle(name, theme, styles) {
      var value = getStyleValue(name, theme, styles);
      return value ? ' style="' + value + '"' : "";
    }
    var xssmap = {
      '"': "&quot;",
      "'": "&apos;",
      "&": "&amp;",
      ">": "&gt;",
      "<": "&lt"
    };
    function xss(s) {
      if (!s) {
        return s;
      }
      return s.replace(/<|>|&|"|'/g, function(m) {
        return xssmap[m];
      });
    }
    var JSONPretty = (
      /** @class */
      function(_super) {
        __extends(JSONPretty2, _super);
        function JSONPretty2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        JSONPretty2.prototype.render = function() {
          var _a = this.props, json = _a.json, data = _a.data, replacer = _a.replacer, space = _a.space, themeClassName = _a.themeClassName, theme = _a.theme, onJSONPrettyError = _a.onJSONPrettyError, onError = _a.onError, silent = _a.silent, mainStyle = _a.mainStyle, keyStyle = _a.keyStyle, valueStyle = _a.valueStyle, stringStyle = _a.stringStyle, booleanStyle = _a.booleanStyle, errorStyle = _a.errorStyle, rest = __rest(_a, ["json", "data", "replacer", "space", "themeClassName", "theme", "onJSONPrettyError", "onError", "silent", "mainStyle", "keyStyle", "valueStyle", "stringStyle", "booleanStyle", "errorStyle"]);
          var styles = {
            mainStyle,
            keyStyle,
            valueStyle,
            stringStyle,
            booleanStyle,
            errorStyle
          };
          var obj = data || json;
          if (typeof obj === "string") {
            try {
              obj = JSON.parse(obj);
            } catch (e) {
              if (!silent) {
                console.warn("[react-json-pretty]: " + e.message);
              }
              if (onJSONPrettyError) {
                onJSONPrettyError(e);
              }
              if (!onJSONPrettyError && onError) {
                onError(e);
                console.warn("JSONPretty#onError is deprecated, please use JSONPretty#onJSONPrettyError instead");
              }
              return React.createElement("div", __assign({}, rest, { dangerouslySetInnerHTML: {
                __html: '<pre class="__json-pretty-error__"' + getStyle("error", theme, styles) + ">" + xss(obj) + "</pre>"
              } }));
            }
          }
          return React.createElement("div", __assign({}, rest, { dangerouslySetInnerHTML: {
            __html: '<pre class="' + themeClassName + '"' + getStyle("main", theme, styles) + ">" + this._pretty(theme, obj, replacer, +space, styles) + "</pre>"
          } }));
        };
        JSONPretty2.prototype._pretty = function(theme, obj, replacer, space, styles) {
          var regLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([,[{]|\[\s*\],?|\{\s*\},?)?$/mg;
          var text = JSON.stringify(obj, typeof replacer === "function" ? replacer : null, isNaN(space) ? 2 : space);
          if (!text) {
            return text;
          }
          return text.replace(/&/g, "&amp;").replace(/\\"([^,])/g, "\\&quot;$1").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(regLine, this._replace.bind(null, theme, styles));
        };
        JSONPretty2.prototype._replace = function(theme, styles, match, ind, key, val, tra) {
          var spanEnd = "</span>";
          var keySpan = '<span class="__json-key__"' + getStyle("key", theme, styles) + ">";
          var valSpan = '<span class="__json-value__"' + getStyle("value", theme, styles) + ">";
          var strSpan = '<span class="__json-string__"' + getStyle("string", theme, styles) + ">";
          var booSpan = '<span class="__json-boolean__"' + getStyle("boolean", theme, styles) + ">";
          var sps = ind || "";
          if (key) {
            sps = sps + '"' + keySpan + key.replace(/^"|":\s$/g, "") + spanEnd + '": ';
          }
          if (val) {
            if (val === "true" || val === "false") {
              sps = sps + booSpan + val + spanEnd;
            } else {
              sps = sps + (val[0] === '"' ? strSpan : valSpan) + val + spanEnd;
            }
          }
          return sps + (tra || "");
        };
        JSONPretty2.propTypes = {
          data: PropTypes.any,
          json: PropTypes.any,
          replacer: PropTypes.func,
          silent: PropTypes.bool,
          space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          theme: PropTypes.object,
          themeClassName: PropTypes.string,
          onJSONPrettyError: PropTypes.func
        };
        JSONPretty2.defaultProps = {
          data: "",
          json: "",
          silent: true,
          space: 2,
          themeClassName: "__json-pretty__"
        };
        return JSONPretty2;
      }(React.Component)
    );
    module.exports = JSONPretty;
  }
});
export default require_JSONPretty();
//# sourceMappingURL=react-json-pretty.js.map
