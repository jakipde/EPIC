import {
  __commonJS
} from "./chunk-PLDDJCW6.js";

// node_modules/theme-change/index.js
var require_theme_change = __commonJS({
  "node_modules/theme-change/index.js"(exports, module) {
    function themeToggle() {
      var toggleEl = document.querySelector("[data-toggle-theme]");
      var dataKey = toggleEl ? toggleEl.getAttribute("data-key") : null;
      (function(theme = localStorage.getItem(dataKey ? dataKey : "theme")) {
        if (localStorage.getItem(dataKey ? dataKey : "theme")) {
          document.documentElement.setAttribute("data-theme", theme);
          if (toggleEl) {
            [...document.querySelectorAll("[data-toggle-theme]")].forEach((el) => {
              el.classList.add(toggleEl.getAttribute("data-act-class"));
            });
          }
        }
      })();
      if (toggleEl) {
        [...document.querySelectorAll("[data-toggle-theme]")].forEach((el) => {
          el.addEventListener("click", function() {
            var themesList = el.getAttribute("data-toggle-theme");
            if (themesList) {
              var themesArray = themesList.split(",");
              if (document.documentElement.getAttribute("data-theme") == themesArray[0]) {
                if (themesArray.length == 1) {
                  document.documentElement.removeAttribute("data-theme");
                  localStorage.removeItem(dataKey ? dataKey : "theme");
                } else {
                  document.documentElement.setAttribute("data-theme", themesArray[1]);
                  localStorage.setItem(dataKey ? dataKey : "theme", themesArray[1]);
                }
              } else {
                document.documentElement.setAttribute("data-theme", themesArray[0]);
                localStorage.setItem(dataKey ? dataKey : "theme", themesArray[0]);
              }
            }
            [...document.querySelectorAll("[data-toggle-theme]")].forEach((el2) => {
              el2.classList.toggle(this.getAttribute("data-act-class"));
            });
          });
        });
      }
    }
    function themeBtn() {
      var btnEl = document.querySelector("[data-set-theme='']");
      var dataKey = btnEl ? btnEl.getAttribute("data-key") : null;
      (function(theme = localStorage.getItem(dataKey ? dataKey : "theme")) {
        if (theme != void 0 && theme != "") {
          if (localStorage.getItem(dataKey ? dataKey : "theme") && localStorage.getItem(dataKey ? dataKey : "theme") != "") {
            document.documentElement.setAttribute("data-theme", theme);
            var btnEl2 = document.querySelector("[data-set-theme='" + theme.toString() + "']");
            if (btnEl2) {
              [...document.querySelectorAll("[data-set-theme]")].forEach((el) => {
                el.classList.remove(el.getAttribute("data-act-class"));
              });
              if (btnEl2.getAttribute("data-act-class")) {
                btnEl2.classList.add(btnEl2.getAttribute("data-act-class"));
              }
            }
          } else {
            var btnEl2 = document.querySelector("[data-set-theme='']");
            if (btnEl2.getAttribute("data-act-class")) {
              btnEl2.classList.add(btnEl2.getAttribute("data-act-class"));
            }
          }
        }
      })();
      [...document.querySelectorAll("[data-set-theme]")].forEach((el) => {
        el.addEventListener("click", function() {
          document.documentElement.setAttribute("data-theme", this.getAttribute("data-set-theme"));
          localStorage.setItem(dataKey ? dataKey : "theme", document.documentElement.getAttribute("data-theme"));
          [...document.querySelectorAll("[data-set-theme]")].forEach((el2) => {
            el2.classList.remove(el2.getAttribute("data-act-class"));
          });
          if (el.getAttribute("data-act-class")) {
            el.classList.add(el.getAttribute("data-act-class"));
          }
        });
      });
    }
    function themeSelect() {
      var selectEl = document.querySelector("select[data-choose-theme]");
      var dataKey = selectEl ? selectEl.getAttribute("data-key") : null;
      (function(theme = localStorage.getItem(dataKey ? dataKey : "theme")) {
        if (localStorage.getItem(dataKey ? dataKey : "theme")) {
          document.documentElement.setAttribute("data-theme", theme);
          var optionToggler = document.querySelector("select[data-choose-theme] [value='" + theme.toString() + "']");
          if (optionToggler) {
            [...document.querySelectorAll("select[data-choose-theme] [value='" + theme.toString() + "']")].forEach((el) => {
              el.selected = true;
            });
          }
        }
      })();
      if (selectEl) {
        [...document.querySelectorAll("select[data-choose-theme]")].forEach((el) => {
          el.addEventListener("change", function() {
            document.documentElement.setAttribute("data-theme", this.value);
            localStorage.setItem(dataKey ? dataKey : "theme", document.documentElement.getAttribute("data-theme"));
            [...document.querySelectorAll("select[data-choose-theme] [value='" + localStorage.getItem(dataKey ? dataKey : "theme") + "']")].forEach((el2) => {
              el2.selected = true;
            });
          });
        });
      }
    }
    function themeChange(attach = true) {
      if (attach === true) {
        document.addEventListener("DOMContentLoaded", function(event) {
          themeToggle();
          themeSelect();
          themeBtn();
        });
      } else {
        themeToggle();
        themeSelect();
        themeBtn();
      }
    }
    if (typeof exports != "undefined") {
      module.exports = { themeChange };
    } else {
      themeChange();
    }
  }
});
export default require_theme_change();
//# sourceMappingURL=theme-change.js.map
