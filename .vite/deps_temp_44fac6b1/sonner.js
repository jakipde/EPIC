"use client";
import {
  require_react_dom
} from "./chunk-7CRKSRDU.js";
import {
  require_react
} from "./chunk-KL4SNAOQ.js";
import {
  __toESM
} from "./chunk-PLDDJCW6.js";

// node_modules/sonner/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var It = (s) => {
  switch (s) {
    case "success":
      return Ut;
    case "info":
      return Kt;
    case "warning":
      return Ot;
    case "error":
      return Jt;
    default:
      return null;
  }
};
var _t = Array(12).fill(0);
var kt = ({ visible: s, className: o }) => import_react2.default.createElement("div", { className: ["sonner-loading-wrapper", o].filter(Boolean).join(" "), "data-visible": s }, import_react2.default.createElement("div", { className: "sonner-spinner" }, _t.map((t, r) => import_react2.default.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${r}` }))));
var Ut = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react2.default.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }));
var Ot = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, import_react2.default.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }));
var Kt = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react2.default.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" }));
var Jt = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react2.default.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }));
var Dt = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, import_react2.default.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), import_react2.default.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));
var Mt = () => {
  let [s, o] = import_react3.default.useState(document.hidden);
  return import_react3.default.useEffect(() => {
    let t = () => {
      o(document.hidden);
    };
    return document.addEventListener("visibilitychange", t), () => window.removeEventListener("visibilitychange", t);
  }, []), s;
};
var mt = 1;
var pt = class {
  constructor() {
    this.subscribe = (o) => (this.subscribers.push(o), () => {
      let t = this.subscribers.indexOf(o);
      this.subscribers.splice(t, 1);
    });
    this.publish = (o) => {
      this.subscribers.forEach((t) => t(o));
    };
    this.addToast = (o) => {
      this.publish(o), this.toasts = [...this.toasts, o];
    };
    this.create = (o) => {
      var P;
      let { message: t, ...r } = o, g = typeof (o == null ? void 0 : o.id) == "number" || ((P = o.id) == null ? void 0 : P.length) > 0 ? o.id : mt++, l = this.toasts.find((h) => h.id === g), E = o.dismissible === void 0 ? true : o.dismissible;
      return l ? this.toasts = this.toasts.map((h) => h.id === g ? (this.publish({ ...h, ...o, id: g, title: t }), { ...h, ...o, id: g, dismissible: E, title: t }) : h) : this.addToast({ title: t, ...r, dismissible: E, id: g }), g;
    };
    this.dismiss = (o) => (o || this.toasts.forEach((t) => {
      this.subscribers.forEach((r) => r({ id: t.id, dismiss: true }));
    }), this.subscribers.forEach((t) => t({ id: o, dismiss: true })), o);
    this.message = (o, t) => this.create({ ...t, message: o });
    this.error = (o, t) => this.create({ ...t, message: o, type: "error" });
    this.success = (o, t) => this.create({ ...t, type: "success", message: o });
    this.info = (o, t) => this.create({ ...t, type: "info", message: o });
    this.warning = (o, t) => this.create({ ...t, type: "warning", message: o });
    this.loading = (o, t) => this.create({ ...t, type: "loading", message: o });
    this.promise = (o, t) => {
      if (!t) return;
      let r;
      t.loading !== void 0 && (r = this.create({ ...t, promise: o, type: "loading", message: t.loading, description: typeof t.description != "function" ? t.description : void 0 }));
      let g = o instanceof Promise ? o : o(), l = r !== void 0, E, P = g.then(async (c) => {
        if (E = ["resolve", c], import_react4.default.isValidElement(c)) l = false, this.create({ id: r, type: "default", message: c });
        else if (Qt(c) && !c.ok) {
          l = false;
          let D = typeof t.error == "function" ? await t.error(`HTTP error! status: ${c.status}`) : t.error, j = typeof t.description == "function" ? await t.description(`HTTP error! status: ${c.status}`) : t.description;
          this.create({ id: r, type: "error", message: D, description: j });
        } else if (t.success !== void 0) {
          l = false;
          let D = typeof t.success == "function" ? await t.success(c) : t.success, j = typeof t.description == "function" ? await t.description(c) : t.description;
          this.create({ id: r, type: "success", message: D, description: j });
        }
      }).catch(async (c) => {
        if (E = ["reject", c], t.error !== void 0) {
          l = false;
          let y = typeof t.error == "function" ? await t.error(c) : t.error, D = typeof t.description == "function" ? await t.description(c) : t.description;
          this.create({ id: r, type: "error", message: y, description: D });
        }
      }).finally(() => {
        var c;
        l && (this.dismiss(r), r = void 0), (c = t.finally) == null || c.call(t);
      }), h = () => new Promise((c, y) => P.then(() => E[0] === "reject" ? y(E[1]) : c(E[1])).catch(y));
      return typeof r != "string" && typeof r != "number" ? { unwrap: h } : Object.assign(r, { unwrap: h });
    };
    this.custom = (o, t) => {
      let r = (t == null ? void 0 : t.id) || mt++;
      return this.create({ jsx: o(r), id: r, ...t }), r;
    };
    this.subscribers = [], this.toasts = [];
  }
};
var v = new pt();
var Gt = (s, o) => {
  let t = (o == null ? void 0 : o.id) || mt++;
  return v.addToast({ title: s, ...o, id: t }), t;
};
var Qt = (s) => s && typeof s == "object" && "ok" in s && typeof s.ok == "boolean" && "status" in s && typeof s.status == "number";
var qt = Gt;
var Zt = () => v.toasts;
var te = Object.assign(qt, { success: v.success, info: v.info, warning: v.warning, error: v.error, custom: v.custom, message: v.message, promise: v.promise, dismiss: v.dismiss, loading: v.loading }, { getHistory: Zt });
function gt(s, { insertAt: o } = {}) {
  if (!s || typeof document == "undefined") return;
  let t = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", o === "top" && t.firstChild ? t.insertBefore(r, t.firstChild) : t.appendChild(r), r.styleSheet ? r.styleSheet.cssText = s : r.appendChild(document.createTextNode(s));
}
gt(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:max(var(--offset),env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position="left"]){left:max(var(--offset),env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:max(var(--offset),env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:max(var(--offset),env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:0;right:0;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function O(s) {
  return s.label !== void 0;
}
var ae = 3;
var ne = "32px";
var At = 4e3;
var re = 356;
var se = 14;
var ie = 20;
var le = 200;
function de(...s) {
  return s.filter(Boolean).join(" ");
}
var ce = (s) => {
  var xt, wt, vt, Tt, Rt, St, Et, Nt, Pt, Ct, Bt;
  let { invert: o, toast: t, unstyled: r, interacting: g, setHeights: l, visibleToasts: E, heights: P, index: h, toasts: c, expanded: y, removeToast: D, defaultRichColors: j, closeButton: K, style: st, cancelButtonStyle: i, actionButtonStyle: J, className: X = "", descriptionClassName: it = "", duration: V, position: lt, gap: dt, loadingIcon: G, expandByDefault: C, classNames: a, icons: N, closeButtonAriaLabel: Q = "Close toast", pauseWhenPageIsHidden: q, cn: T } = s, [B, Z] = import_react.default.useState(false), [_, ct] = import_react.default.useState(false), [M, A] = import_react.default.useState(false), [tt, L] = import_react.default.useState(false), [Y, et] = import_react.default.useState(false), [d, u] = import_react.default.useState(0), [b, w] = import_react.default.useState(0), H = import_react.default.useRef(t.duration || V || At), f = import_react.default.useRef(null), I = import_react.default.useRef(null), ot = h === 0, at = h + 1 <= E, x = t.type, F = t.dismissible !== false, zt = t.className || "", jt = t.descriptionClassName || "", nt = import_react.default.useMemo(() => P.findIndex((n) => n.toastId === t.id) || 0, [P, t.id]), Yt = import_react.default.useMemo(() => {
    var n;
    return (n = t.closeButton) != null ? n : K;
  }, [t.closeButton, K]), ue = import_react.default.useMemo(() => t.duration || V || At, [t.duration, V]), ut = import_react.default.useRef(0), $ = import_react.default.useRef(0), ht = import_react.default.useRef(0), rt = import_react.default.useRef(null), [Ft, $t] = lt.split("-"), bt = import_react.default.useMemo(() => P.reduce((n, p, m) => m >= nt ? n : n + p.height, 0), [P, nt]), yt = Mt(), Wt = t.invert || o, ft = x === "loading";
  $.current = import_react.default.useMemo(() => nt * dt + bt, [nt, bt]), import_react.default.useEffect(() => {
    Z(true);
  }, []), import_react.default.useEffect(() => {
    let n = I.current;
    if (n) {
      let p = n.getBoundingClientRect().height;
      return w(p), l((m) => [{ toastId: t.id, height: p, position: t.position }, ...m]), () => l((m) => m.filter((R) => R.toastId !== t.id));
    }
  }, [l, t.id]), import_react.default.useLayoutEffect(() => {
    if (!B) return;
    let n = I.current, p = n.style.height;
    n.style.height = "auto";
    let m = n.getBoundingClientRect().height;
    n.style.height = p, w(m), l((R) => R.find((k) => k.toastId === t.id) ? R.map((k) => k.toastId === t.id ? { ...k, height: m } : k) : [{ toastId: t.id, height: m, position: t.position }, ...R]);
  }, [B, t.title, t.description, l, t.id]);
  let z = import_react.default.useCallback(() => {
    ct(true), u($.current), l((n) => n.filter((p) => p.toastId !== t.id)), setTimeout(() => {
      D(t);
    }, le);
  }, [t, D, l, $]);
  import_react.default.useEffect(() => {
    if (t.promise && x === "loading" || t.duration === 1 / 0 || t.type === "loading") return;
    let n;
    return y || g || q && yt ? (() => {
      if (ht.current < ut.current) {
        let R = (/* @__PURE__ */ new Date()).getTime() - ut.current;
        H.current = H.current - R;
      }
      ht.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      H.current !== 1 / 0 && (ut.current = (/* @__PURE__ */ new Date()).getTime(), n = setTimeout(() => {
        var R;
        (R = t.onAutoClose) == null || R.call(t, t), z();
      }, H.current));
    })(), () => clearTimeout(n);
  }, [y, g, t, x, q, yt, z]), import_react.default.useEffect(() => {
    t.delete && z();
  }, [z, t.delete]);
  function Vt() {
    var n, p, m;
    return N != null && N.loading ? import_react.default.createElement("div", { className: T(a == null ? void 0 : a.loader, (n = t == null ? void 0 : t.classNames) == null ? void 0 : n.loader, "sonner-loader"), "data-visible": x === "loading" }, N.loading) : G ? import_react.default.createElement("div", { className: T(a == null ? void 0 : a.loader, (p = t == null ? void 0 : t.classNames) == null ? void 0 : p.loader, "sonner-loader"), "data-visible": x === "loading" }, G) : import_react.default.createElement(kt, { className: T(a == null ? void 0 : a.loader, (m = t == null ? void 0 : t.classNames) == null ? void 0 : m.loader), visible: x === "loading" });
  }
  return import_react.default.createElement("li", { tabIndex: 0, ref: I, className: T(X, zt, a == null ? void 0 : a.toast, (xt = t == null ? void 0 : t.classNames) == null ? void 0 : xt.toast, a == null ? void 0 : a.default, a == null ? void 0 : a[x], (wt = t == null ? void 0 : t.classNames) == null ? void 0 : wt[x]), "data-sonner-toast": "", "data-rich-colors": (vt = t.richColors) != null ? vt : j, "data-styled": !(t.jsx || t.unstyled || r), "data-mounted": B, "data-promise": !!t.promise, "data-swiped": Y, "data-removed": _, "data-visible": at, "data-y-position": Ft, "data-x-position": $t, "data-index": h, "data-front": ot, "data-swiping": M, "data-dismissible": F, "data-type": x, "data-invert": Wt, "data-swipe-out": tt, "data-expanded": !!(y || C && B), style: { "--index": h, "--toasts-before": h, "--z-index": c.length - h, "--offset": `${_ ? d : $.current}px`, "--initial-height": C ? "auto" : `${b}px`, ...st, ...t.style }, onPointerDown: (n) => {
    ft || !F || (f.current = /* @__PURE__ */ new Date(), u($.current), n.target.setPointerCapture(n.pointerId), n.target.tagName !== "BUTTON" && (A(true), rt.current = { x: n.clientX, y: n.clientY }));
  }, onPointerUp: () => {
    var R, W, k, U;
    if (tt || !F) return;
    rt.current = null;
    let n = Number(((R = I.current) == null ? void 0 : R.style.getPropertyValue("--swipe-amount").replace("px", "")) || 0), p = (/* @__PURE__ */ new Date()).getTime() - ((W = f.current) == null ? void 0 : W.getTime()), m = Math.abs(n) / p;
    if (Math.abs(n) >= ie || m > 0.11) {
      u($.current), (k = t.onDismiss) == null || k.call(t, t), z(), L(true), et(false);
      return;
    }
    (U = I.current) == null || U.style.setProperty("--swipe-amount", "0px"), A(false);
  }, onPointerMove: (n) => {
    var W, k, U;
    if (!rt.current || !F) return;
    let p = n.clientY - rt.current.y, m = ((W = window.getSelection()) == null ? void 0 : W.toString().length) > 0;
    Number(((k = I.current) == null ? void 0 : k.style.getPropertyValue("--swipe-amount").replace("px", "")) || 0) > 0 && et(true), !m && ((U = I.current) == null || U.style.setProperty("--swipe-amount", `${Math.max(0, p)}px`));
  } }, Yt && !t.jsx ? import_react.default.createElement("button", { "aria-label": Q, "data-disabled": ft, "data-close-button": true, onClick: ft || !F ? () => {
  } : () => {
    var n;
    z(), (n = t.onDismiss) == null || n.call(t, t);
  }, className: T(a == null ? void 0 : a.closeButton, (Tt = t == null ? void 0 : t.classNames) == null ? void 0 : Tt.closeButton) }, (Rt = N == null ? void 0 : N.close) != null ? Rt : Dt) : null, t.jsx || import_react.default.isValidElement(t.title) ? t.jsx ? t.jsx : typeof t.title == "function" ? t.title() : t.title : import_react.default.createElement(import_react.default.Fragment, null, x || t.icon || t.promise ? import_react.default.createElement("div", { "data-icon": "", className: T(a == null ? void 0 : a.icon, (St = t == null ? void 0 : t.classNames) == null ? void 0 : St.icon) }, t.promise || t.type === "loading" && !t.icon ? t.icon || Vt() : null, t.type !== "loading" ? t.icon || (N == null ? void 0 : N[x]) || It(x) : null) : null, import_react.default.createElement("div", { "data-content": "", className: T(a == null ? void 0 : a.content, (Et = t == null ? void 0 : t.classNames) == null ? void 0 : Et.content) }, import_react.default.createElement("div", { "data-title": "", className: T(a == null ? void 0 : a.title, (Nt = t == null ? void 0 : t.classNames) == null ? void 0 : Nt.title) }, typeof t.title == "function" ? t.title() : t.title), t.description ? import_react.default.createElement("div", { "data-description": "", className: T(it, jt, a == null ? void 0 : a.description, (Pt = t == null ? void 0 : t.classNames) == null ? void 0 : Pt.description) }, typeof t.description == "function" ? t.description() : t.description) : null), import_react.default.isValidElement(t.cancel) ? t.cancel : t.cancel && O(t.cancel) ? import_react.default.createElement("button", { "data-button": true, "data-cancel": true, style: t.cancelButtonStyle || i, onClick: (n) => {
    var p, m;
    O(t.cancel) && F && ((m = (p = t.cancel).onClick) == null || m.call(p, n), z());
  }, className: T(a == null ? void 0 : a.cancelButton, (Ct = t == null ? void 0 : t.classNames) == null ? void 0 : Ct.cancelButton) }, t.cancel.label) : null, import_react.default.isValidElement(t.action) ? t.action : t.action && O(t.action) ? import_react.default.createElement("button", { "data-button": true, "data-action": true, style: t.actionButtonStyle || J, onClick: (n) => {
    var p, m;
    O(t.action) && ((m = (p = t.action).onClick) == null || m.call(p, n), !n.defaultPrevented && z());
  }, className: T(a == null ? void 0 : a.actionButton, (Bt = t == null ? void 0 : t.classNames) == null ? void 0 : Bt.actionButton) }, t.action.label) : null));
};
function Lt() {
  if (typeof window == "undefined" || typeof document == "undefined") return "ltr";
  let s = document.documentElement.getAttribute("dir");
  return s === "auto" || !s ? window.getComputedStyle(document.documentElement).direction : s;
}
function Ce() {
  let [s, o] = import_react.default.useState([]);
  return import_react.default.useEffect(() => v.subscribe((t) => {
    o((r) => {
      if ("dismiss" in t && t.dismiss) return r.filter((l) => l.id !== t.id);
      let g = r.findIndex((l) => l.id === t.id);
      if (g !== -1) {
        let l = [...r];
        return l[g] = { ...l[g], ...t }, l;
      } else return [t, ...r];
    });
  }), []), { toasts: s };
}
var Be = (0, import_react.forwardRef)(function(o, t) {
  let { invert: r, position: g = "bottom-right", hotkey: l = ["altKey", "KeyT"], expand: E, closeButton: P, className: h, offset: c, theme: y = "light", richColors: D, duration: j, style: K, visibleToasts: st = ae, toastOptions: i, dir: J = Lt(), gap: X = se, loadingIcon: it, icons: V, containerAriaLabel: lt = "Notifications", pauseWhenPageIsHidden: dt, cn: G = de } = o, [C, a] = import_react.default.useState([]), N = import_react.default.useMemo(() => Array.from(new Set([g].concat(C.filter((d) => d.position).map((d) => d.position)))), [C, g]), [Q, q] = import_react.default.useState([]), [T, B] = import_react.default.useState(false), [Z, _] = import_react.default.useState(false), [ct, M] = import_react.default.useState(y !== "system" ? y : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), A = import_react.default.useRef(null), tt = l.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = import_react.default.useRef(null), Y = import_react.default.useRef(false), et = import_react.default.useCallback((d) => {
    a((u) => {
      var b;
      return (b = u.find((w) => w.id === d.id)) != null && b.delete || v.dismiss(d.id), u.filter(({ id: w }) => w !== d.id);
    });
  }, []);
  return import_react.default.useEffect(() => v.subscribe((d) => {
    if (d.dismiss) {
      a((u) => u.map((b) => b.id === d.id ? { ...b, delete: true } : b));
      return;
    }
    setTimeout(() => {
      import_react_dom.default.flushSync(() => {
        a((u) => {
          let b = u.findIndex((w) => w.id === d.id);
          return b !== -1 ? [...u.slice(0, b), { ...u[b], ...d }, ...u.slice(b + 1)] : [d, ...u];
        });
      });
    });
  }), []), import_react.default.useEffect(() => {
    if (y !== "system") {
      M(y);
      return;
    }
    if (y === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? M("dark") : M("light")), typeof window == "undefined") return;
    let d = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      d.addEventListener("change", ({ matches: u }) => {
        M(u ? "dark" : "light");
      });
    } catch (u) {
      d.addListener(({ matches: b }) => {
        try {
          M(b ? "dark" : "light");
        } catch (w) {
          console.error(w);
        }
      });
    }
  }, [y]), import_react.default.useEffect(() => {
    C.length <= 1 && B(false);
  }, [C]), import_react.default.useEffect(() => {
    let d = (u) => {
      var w, H;
      l.every((f) => u[f] || u.code === f) && (B(true), (w = A.current) == null || w.focus()), u.code === "Escape" && (document.activeElement === A.current || (H = A.current) != null && H.contains(document.activeElement)) && B(false);
    };
    return document.addEventListener("keydown", d), () => document.removeEventListener("keydown", d);
  }, [l]), import_react.default.useEffect(() => {
    if (A.current) return () => {
      L.current && (L.current.focus({ preventScroll: true }), L.current = null, Y.current = false);
    };
  }, [A.current]), import_react.default.createElement("section", { "aria-label": `${lt} ${tt}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false" }, N.map((d, u) => {
    var H;
    let [b, w] = d.split("-");
    return C.length ? import_react.default.createElement("ol", { key: d, dir: J === "auto" ? Lt() : J, tabIndex: -1, ref: A, className: h, "data-sonner-toaster": true, "data-theme": ct, "data-y-position": b, "data-lifted": T && C.length > 1 && !E, "data-x-position": w, style: { "--front-toast-height": `${((H = Q[0]) == null ? void 0 : H.height) || 0}px`, "--offset": typeof c == "number" ? `${c}px` : c || ne, "--width": `${re}px`, "--gap": `${X}px`, ...K }, onBlur: (f) => {
      Y.current && !f.currentTarget.contains(f.relatedTarget) && (Y.current = false, L.current && (L.current.focus({ preventScroll: true }), L.current = null));
    }, onFocus: (f) => {
      f.target instanceof HTMLElement && f.target.dataset.dismissible === "false" || Y.current || (Y.current = true, L.current = f.relatedTarget);
    }, onMouseEnter: () => B(true), onMouseMove: () => B(true), onMouseLeave: () => {
      Z || B(false);
    }, onPointerDown: (f) => {
      f.target instanceof HTMLElement && f.target.dataset.dismissible === "false" || _(true);
    }, onPointerUp: () => _(false) }, C.filter((f) => !f.position && u === 0 || f.position === d).map((f, I) => {
      var ot, at;
      return import_react.default.createElement(ce, { key: f.id, icons: V, index: I, toast: f, defaultRichColors: D, duration: (ot = i == null ? void 0 : i.duration) != null ? ot : j, className: i == null ? void 0 : i.className, descriptionClassName: i == null ? void 0 : i.descriptionClassName, invert: r, visibleToasts: st, closeButton: (at = i == null ? void 0 : i.closeButton) != null ? at : P, interacting: Z, position: d, style: i == null ? void 0 : i.style, unstyled: i == null ? void 0 : i.unstyled, classNames: i == null ? void 0 : i.classNames, cancelButtonStyle: i == null ? void 0 : i.cancelButtonStyle, actionButtonStyle: i == null ? void 0 : i.actionButtonStyle, removeToast: et, toasts: C.filter((x) => x.position == f.position), heights: Q.filter((x) => x.position == f.position), setHeights: q, expandByDefault: E, gap: X, loadingIcon: it, expanded: T, pauseWhenPageIsHidden: dt, cn: G });
    })) : null;
  }));
});
export {
  Be as Toaster,
  te as toast,
  Ce as useSonner
};
//# sourceMappingURL=sonner.js.map
