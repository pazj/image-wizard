!(function (e) {
  var t = {};
  function n(i) {
    if (t[i]) return t[i].exports;
    var r = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            i,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return i;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    n((n.s = 0));
})([
  function (e, t, n) {
    "use strict";
    n.r(t);
    class i {
      constructor() {
        (this._version = "2.0.0"),
          (this._isISActive = !1),
          (this._dataIdAttr = "data-id-opt"),
          (this._patternPlaceholderClass = "dyn-edit"),
          (this._patternPlaceholderClassIsImage = "dyn-edit--is-image"),
          (this._patternPlaceholderClassIsBg = "dyn-edit--is-bg"),
          (this._domElementsImg =
           "img[data-original-src]:not([data-id-opt]), img:not([data-id-opt]):not(.menu-link-vertical-big img):not(.menu-link-horizontal img)"),
          (this._domElementsWithBackground =
            '[style*="background"]:not([data-id-opt])'),
          (this._domElementsCheckComputed =
            'a:not([style*="background"]):not([data-id-opt]), li:not([style*="background"]):not([data-id-opt]), div:not([style*="background"]):not([data-id-opt]), section:not([style*="background"]):not([data-id-opt])'),
          (this._recommendationsList = {
            height: { title: "Height" },
            width: { title: "Width" },
            ext: { title: "Extension" },
            size: { title: "Size" },
            title: { title: "Title" },
            alt: { title: "Alt" },
            url: { title: "URL" },
          }),
          (this._elements = []),
          (this._elementsCount = 0),
          (this._selectedElement = Element);
      }
      destroyDomItems() {
        this._destroyPrevPositions(),
          this._destroyPlaceholders(
            document.querySelectorAll("." + this._patternPlaceholderClass)
          ),
          this._restoreLinks(document.querySelectorAll("[data-href-temp]"));
      }
      _destroyPrevSrcsets() {
        document
          .querySelectorAll("[data-is-prev-srcset]")
          .forEach(function (e) {
            e.srcset = e.getAttribute("data-is-prev-srcset");
          });
      }
      _activatePrevPositions() {}
      _destroyPrevPositions() {}
      _destroyPlaceholders(e) {
        e &&
          (e.forEach((e) => {
            e.parentNode.removeChild(e);
          }),
          document.querySelectorAll("[data-is-loaded]").forEach((e) => {
            e.removeAttribute("data-is-loaded");
          }));
      }
      _restoreLinks(e) {
        e &&
          e.forEach((e) => {
            e.setAttribute("href", e.getAttribute("data-href-temp")),
              e.removeAttribute("data-href-temp");
          });
      }
      _isElementVisible(e) {
        if (!e.closest("n-popin")) return null !== e.offsetParent;
      }
      _isElementAlreadyCreated(e) {
        return (
          this._elements.forEach((t) => {
            if (t.item.indexOf(e) >= 0) return !0;
          }),
          !1
        );
      }
      _addRawDomElement(e) {
        (this._elements["el-" + this._elementsCount] = { item: e }),
          this._elementsCount++;
      }
      _findDomImgs() {
        document.querySelectorAll(this._domElementsImg).forEach((e) => {
          if (this._isElementVisible(e)) {
            const t = e.getBoundingClientRect();
            t.height >= 30 && t.width >= 30 && this._addRawDomElement(e);
          }
        });
      }
      _findDomElements() {
        document
          .querySelectorAll(this._domElementsWithBackground)
          .forEach((e) => {
            this._isElementVisible(e) &&
              "" !== e.style.backgroundImage &&
              "url()" !== e.style.backgroundImage &&
              "url();" !== e.style.backgroundImage &&
              'url("")' !== e.style.backgroundImage &&
              'url("");' !== e.style.backgroundImage &&
              "none" !== e.style.backgroundImage &&
              (("static" !== getComputedStyle(e).position &&
                getComputedStyle(e).position) ||
                ("static" !== e.style.position && e.style.position) ||
                (e.setAttribute("data-is-prev-pos", e.style.position),
                (e.style.position = "relative")),
              this._addRawDomElement(e));
          });
      }
      _findDomComputedElements() {
        document
          .querySelectorAll(this._domElementsCheckComputed)
          .forEach((e) => {
            if (this._isElementVisible(e)) {
              const t = getComputedStyle(e)["background-image"];
              t &&
                "none" !== t &&
                -1 !== t.search("url") &&
                "" !== t &&
                "url()" !== t &&
                'url("")' !== t &&
                "none" !== t &&
                (("static" !== getComputedStyle(e).position &&
                  getComputedStyle(e).position) ||
                  (e.setAttribute("data-is-prev-pos", e.style.position),
                  (e.style.position = "relative")),
                this._addRawDomElement(e));
            }
          });
      }
      _findElements() {
        this._findDomImgs(),
          this._findDomElements(),
          this._findDomComputedElements(),
          this._createPlaceholders(),
          window.addEventListener(
            "resize",
            this._debounce((e) => {
              this._recalc();
            })
          ),
          window.addEventListener(
            "scroll",
            this._debounce((e) => {
              this._isISActive &&
                (this._recalc(),
                this._findDomImgs(),
                this._findDomElements(),
                this._findDomComputedElements(),
                this._createPlaceholders());
            })
          );
      }
      _createElementPlaceholder(e, t) {
        const n = document.createElement("div");
        if (
          (this._adjustElementPlaceholder(e, n),
          (n.id = t),
          n.classList.add("dyn-edit"),
          (n.style.zIndex = 10),
          e.classList.contains("g_bg"))
        ) {
          const t = Number(e.style.zIndex),
            n = Number(getComputedStyle(e).zIndex),
            i = Math.max(t, n);
          e.setAttribute("data-is-el-prev-zindex", i),
            (e.style.zIndex = "auto");
        }
        return n;
      }
      _adjustElementPlaceholder(e, t) {
        return (
          (t.style.width = e.offsetWidth + "px"),
          (t.style.height = e.offsetHeight + "px"),
          t
        );
      }
      _setItemSizing(e, t) {
        if (e) {
          const n = e.getBoundingClientRect(),
            i = n.width,
            r = n.height,
            s = n.left + window.scrollX,
            o = n.top + window.scrollY;
          (t.style.width = i + "px"),
            (t.style.height = r + "px"),
            (t.style.top = o + "px"),
            (t.style.left = s + "px");
        }
        return t;
      }
      _createElementInputPlaceholder(e, t) {
        const n = document.createElement("input");
        return (
          n.setAttribute("type", "file"),
          n.setAttribute("accept", "image/*"),
          this._createElementInputPlaceholderEvents(e, n, t),
          n
        );
      }
      _getImageSrc(e) {
        if (e && e.src)
          return e.hasAttribute("data-src")
            ? e.getAttribute("data-src")
            : e.src;
      }
      _createElementInputPlaceholderEvents(e, t, n) {
        const i = this;
        t.addEventListener("change", (t) => {
          if (FileReader) {
            var r = new FileReader();
            r.readAsDataURL(t.srcElement.files[0]),
              (r.onload = function (r) {
                var s = new Image();
                (s.src = r.target.result),
                  (s.onload = function () {
                    const r = document.querySelector(
                      `[${i._dataIdAttr}="${n.id}"]`
                    );
                    if (
                      (document
                        .querySelector(`#${n.id} .dyn-zoom--toPrevious`)
                        .classList.remove("dyn-zoom--toPrevious-is-disabled"),
                      "IMG" === e.tagName)
                    )
                      r.getAttribute("data-original-src") ||
                        r.setAttribute("data-original-src", r.src),
                        r.setAttribute("data-new-src", s.src),
                        (r.srcset = ""),
                        (r.src = s.src);
                    else {
                      if (!r.getAttribute("data-original-src"))
                        if (r.style.backgroundImage)
                          r.setAttribute(
                            "data-original-src",
                            r.style.backgroundImage
                          );
                        else {
                          const e = i._removeURLStringFromBG(
                            getComputedStyle(r)["background-image"]
                          );
                          r.setAttribute("data-original-src", `url('${e}')`);
                        }
                      r.setAttribute("data-new-src", s.src),
                        // (r.style.backgroundImage = `url('${s.src}')`);
                        r.style.setProperty("background-image", `url('${s.src}')`, "important");
                    }
                    if (e.closest("picture")) {
                      e.closest("picture")
                        .querySelectorAll("source")
                        .forEach(function (e) {
                          e.getAttribute("data-is-prev-srcset") ||
                            e.setAttribute("data-is-prev-srcset", e.srcset),
                            (e.srcset = s.currentSrc);
                        });
                    }
                    (i._elements[n.id].properties.hasOriginalMode = !1),
                      (i._elements[n.id].properties.isUpdated = !0),
                      (i._elements[n.id].properties.new.height = s.height),
                      (i._elements[n.id].properties.new.width = s.width),
                      (i._elements[n.id].properties.new.size =
                        t.srcElement.files[0].size),
                      (i._elements[n.id].properties.new.ext =
                        t.srcElement.files[0].type),
                      setTimeout(() => {
                        i._recalc();
                      }, 500);
                  });
              });
          }
        });
      }
      _getPercentage(e, t) {
        return Math.round(100 * Math.abs((e - t) / ((e + t) / 2)), 1);
      }
      _translateImageMimeType(e) {
        return "image/jpg" === e
          ? "JPG"
          : "image/jpeg" === e
          ? "JPEG"
          : "image/png" === e
          ? "PNG"
          : "image/gif" === e
          ? "GIF"
          : void 0;
      }
      _createElementActionsPlaceholder() {
        const e = document.createElement("div");
        return e.classList.add("dyn-actions"), e;
      }
      _createElementIconGroup() {
        const e = document.createElement("span");
        e.classList.add("dyn-icon");
        const t = document.createElement("span");
        t.classList.add("dyn-icon-fig", "dyn-icon-fig1");
        const n = document.createElement("span");
        return (
          n.classList.add("dyn-icon-fig", "dyn-icon-fig2"),
          e.appendChild(t),
          e.appendChild(n),
          e
        );
      }
      _createElementIconPrevious() {
        const e = document.createElement("span");
        e.classList.add("dyn-icon");
        const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        t.setAttribute("height", "15px"),
          t.setAttribute("width", "15px"),
          t.setAttribute("viewBox", "0 0 512 512.00241");
        const n = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        return (
          n.setAttribute("fill-rule", "evenodd"),
          n.setAttribute(
            "d",
            "m256 .00390625c-62.675781 0-123.605469 23.08203175-171.09375 62.26953175l-57.597656-57.597657c-4.585938-4.566406-11.457032-5.933593-17.429688-3.457031-5.972656 2.472656-9.878906 8.296875-9.878906 14.785156v138.664063c0 8.832031 7.167969 16 16 16h138.667969c6.484375 0 12.308593-3.902344 14.785156-9.875 2.472656-5.972657 1.109375-12.84375-3.480469-17.429688l-50.75-50.773437c39.445313-31.425782 89.363282-49.921875 140.777344-49.921875 117.632812 0 213.335938 95.703125 213.335938 213.335937 0 117.628906-95.703126 213.332032-213.335938 213.332032-56.9375 0-110.503906-22.207032-150.804688-62.527344-8.339843-8.34375-21.824218-8.34375-30.164062 0-8.34375 8.339844-8.34375 21.824218 0 30.164062 48.363281 48.382813 112.640625 75.03125 180.96875 75.03125 141.164062 0 256-114.839844 256-256 0-141.164062-114.835938-255.99999975-256-255.99999975zm0 0"
          ),
          t.appendChild(n),
          e.appendChild(t),
          e
        );
      }
      _createElementReplacePrevious(e, t) {
        const n = document.createElement("div");
        return (
          n.classList.add("dyn-zoom", "dyn-zoom--toPrevious"),
          t.properties.isUpdated ||
            n.classList.add("dyn-zoom--toPrevious-is-disabled"),
          (n.title = "Replace for the original"),
          n.append(this._createElementIconPrevious()),
          n.addEventListener("click", () => {
            const n = document.querySelector(`[${this._dataIdAttr}="${e}"]`);
            if (t.properties.isUpdated) {
              if (t.properties.hasOriginalMode) {
                const e = t.item.getAttribute("data-new-src");
                if (
                  (t.properties.original.isImage
                    ? (n.src = e)
                    : (n.style.backgroundImage = `url('${e}')`),
                  t.item.closest("picture"))
                ) {
                  t.item
                    .closest("picture")
                    .querySelectorAll("source")
                    .forEach(function (t) {
                      t.getAttribute("data-is-prev-srcset") && (t.srcset = e);
                    });
                }
                t.properties.hasOriginalMode = !1;
              } else {
                const e = t.item.getAttribute("data-original-src");
                if (
                  (t.properties.original.isImage
                    ? (n.src = e)
                    : (n.style.backgroundImage = "" + e),
                  t.item.closest("picture"))
                ) {
                  t.item
                    .closest("picture")
                    .querySelectorAll("source")
                    .forEach(function (e) {
                      e.getAttribute("data-is-prev-srcset") &&
                        (e.srcset = e.getAttribute("data-is-prev-srcset"));
                    });
                }
                t.properties.hasOriginalMode = !0;
              }
              this._recalc();
            }
          }),
          n
        );
      }
      _createElementZoomOutPlaceholder(e) {
        const t = document.createElement("div");
        return (
          t.classList.add("dyn-zoom", "dyn-zoom--zoomOut"),
          (t.title = "Send to back"),
          t.append(this._createElementIconGroup()),
          t.addEventListener("click", function () {
            document.getElementById(e).style.zIndex >= 1 &&
              (document.getElementById(e).style.zIndex =
                parseInt(document.getElementById(e).style.zIndex) - 1);
          }),
          t
        );
      }
      _extractExt(e) {
        let t;
        if (void 0 !== e)
          return (
            (t = e.split(".").pop()), (t = t.substring(0, 3)), t.toUpperCase()
          );
      }
      _removeURLStringFromBG(e) {
        const t = /(https?:\/\/[^ ]*)/;
        if (new RegExp(t).test(e)) {
          let n = e.match(t)[1];
          if (n)
            return (
              (n = n.replace(/['"]+/g, "")), (n = n.replace(/[()]/g, "")), n
            );
        }
      }
      _getURLFromBackgroundImage(e) {
        const t = /(https?:\/\/[^ ]*)/,
          n = new RegExp(t);
        let i = e.style.backgroundImage;
        if (
          (i || (i = getComputedStyle(e)["background-image"]),
          i.startsWith('url("/'))
        ) {
          const e = document.location.origin;
          i = i.replace('url("/', 'url("' + e + "/");
        }
        if (n.test(i)) {
          let e = i.match(t)[1];
          if (e)
            return (
              (e = e.replace(/['"]+/g, "")), (e = e.replace(/[()]/g, "")), e
            );
        }
      }
      _splitLastPathURL(e) {
        const t = e.split("/");
        return t.pop() || t.pop();
      }
      _getCurrentValLabel(e, t) {
        return t > e
          ? "(larger value)"
          : t < e
          ? "(smaller value)"
          : "(same value)";
      }
      _createPlaceholders() {
        let e = 0;
        Object.entries(this._elements).forEach(([t, n]) => {
          let i;
          const r = this._elements[t],
            s = r.item;
          if (!s.hasAttribute("data-is-loaded")) {
            s.setAttribute("data-is-loaded", !0);
            const t = "el-" + e,
              n = this._createElementPlaceholder(s, t),
              o = this._createElementActionsPlaceholder(),
              a = this._createElementInputPlaceholder(s, n);
            void 0 === r.properties &&
              ((r.id = e),
              (r.properties = {
                original: {},
                new: {},
                isUpdated: !1,
                hasOriginalMode: !0,
              })),
              n.appendChild(a),
              n.appendChild(o),
              o.appendChild(this._createElementZoomOutPlaceholder(t)),
              o.appendChild(this._createElementReplacePrevious(t, r)),
              s.setAttribute(this._dataIdAttr, "el-" + e),
              (i = r.properties.original.url),
              r.properties.isUpdated ||
                (r.properties.original.isImage = "IMG" === s.tagName),
              "IMG" === s.tagName
                ? (n.classList.add(this._patternPlaceholderClassIsImage),
                  this._setItemSizing(s, n),
                  document.body.appendChild(n))
                : (n.classList.add(this._patternPlaceholderClassIsBg),
                  s.appendChild(n));
            const d = n.closest("a");
            let l;
            d &&
              (d.setAttribute("data-href-temp", d.href),
              d.removeAttribute("href"),
              d.addEventListener("click", (e) => {
                e.stopPropagation();
              })),
              n.addEventListener("mouseleave", (e) => {
                clearTimeout(l);
              }),
              n.addEventListener("mouseenter", (e) => {
                l = setTimeout(() => {
                  if (!r.properties.isUpdated)
                    if (r.properties.original.isImage) {
                      if (
                        ((i = this._getImageSrc(r.item)),
                        (r.properties.original.url = i),
                        (r.properties.original.ext = this._extractExt(i)),
                        (r.properties.original.height = r.item.naturalHeight),
                        (r.properties.original.width = r.item.naturalWidth),
                        (r.properties.original.alt = r.item.alt
                          ? r.item.alt
                          : '<span style="color:#fe1f18">undefined</span>'),
                        (r.properties.original.title = r.item.title
                          ? r.item.title
                          : '<span style="color:#fe1f18">undefined</span>'),
                        "SVG" === r.properties.original.ext)
                      ) {
                        const e = r.item.getBoundingClientRect();
                        (r.properties.original.height = Math.round(e.height)),
                          (r.properties.original.width = Math.round(e.width));
                      }
                    } else {
                      const e = new Image();
                      (i = this._getURLFromBackgroundImage(r.item)),
                        (e.src = i),
                        (r.properties.original.ext = this._extractExt(i)),
                        (r.properties.original.url = i),
                        (r.properties.original.height = e.height),
                        (r.properties.original.width = e.width),
                        (r.properties.original.alt = "(not needed)"),
                        (r.properties.original.title = r.item.title
                          ? r.item.title
                          : "(not needed)");
                    }
                  if (
                    ((document.getElementById("dyn-height-0").innerHTML =
                      r.properties.original.height + "px"),
                    (document.getElementById("dyn-width-0").innerHTML =
                      r.properties.original.width + "px"),
                    (document.getElementById("dyn-ext-0").innerHTML =
                      r.properties.original.ext),
                    (document.getElementById("dyn-alt-0").innerHTML =
                      r.properties.original.alt),
                    (document.getElementById("dyn-title-0").innerHTML =
                      r.properties.original.title),
                    (document.getElementById("dyn-url-0").innerHTML = i),
                    (this._selectedElement = r),
                    0 !== Object.keys(r.properties.new).length)
                  ) {
                    const e =
                      r.properties.new.size <= r.properties.original.size;
                    (document.getElementById("dyn-height-1").innerHTML =
                      r.properties.new.height +
                      "px" +
                      (r.properties.new.height !== r.properties.original.height
                        ? ' <span style="color:#2685d9">' +
                          this._getCurrentValLabel(
                            r.properties.original.height,
                            r.properties.new.height
                          ) +
                          "</span>"
                        : "")),
                      (document.getElementById("dyn-width-1").innerHTML =
                        r.properties.new.width +
                        "px" +
                        (r.properties.new.width !== r.properties.original.width
                          ? ' <span style="color:#2685d9">' +
                            this._getCurrentValLabel(
                              r.properties.original.width,
                              r.properties.new.width
                            ) +
                            "</span>"
                          : "")),
                      (document.getElementById("dyn-ext-1").innerHTML =
                        this._translateImageMimeType(r.properties.new.ext) +
                        (r.properties.new.ext !== r.properties.original.ext
                          ? ' <span style="color:#fe1f18">(different extension)</span>'
                          : "")),
                      (document.getElementById("dyn-size-1").innerHTML =
                        this._formatBytes(r.properties.new.size) +
                        ' <span style="color:' +
                        (e ? "#468c0f" : "#fe1f18") +
                        '">' +
                        this._getPercentage(
                          r.properties.original.size,
                          r.properties.new.size
                        ) +
                        "% " +
                        (e ? "more" : "less") +
                        " performant</span>");
                  } else
                    (document.getElementById("dyn-height-1").innerHTML = "0px"),
                      (document.getElementById("dyn-width-1").innerHTML =
                        "0px"),
                      (document.getElementById("dyn-ext-1").innerHTML =
                        "undefined"),
                      (document.getElementById("dyn-size-1").innerHTML = "0");
                  void 0 !== i &&
                    ((document.getElementById("dyn-url-0").innerHTML =
                      this._splitLastPathURL(i)),
                    (document.getElementById("dyn-url-0").href = i),
                    (document.getElementById("dyn-url-0").title = i),
                    (document.getElementById("dyn-url-0").target = "_blank")),
                    r.properties.original.size
                      ? (document.getElementById("dyn-size-0").innerHTML =
                          this._formatBytes(r.properties.original.size))
                      : fetch(i)
                          .then((e) => e.blob())
                          .then((e) => {
                            (r.properties.original.size = e.size),
                              (document.getElementById("dyn-size-0").innerHTML =
                                this._formatBytes(e.size));
                          });
                }, 500);
              });
          }
          e++;
        });
      }
      _resetDomDataValues() {
        for (let e = 0; e < 2; e++)
          for (const t in this._recommendationsList) {
            const n = document.getElementById(`dyn-${t}-${e}`);
            n && (n.innerHTML = "0");
          }
      }
      _formatBytes(e, t = 2) {
        if (0 === e) return "0 Bytes";
        const n = t < 0 ? 0 : t,
          i = Math.floor(Math.log(e) / Math.log(1024));
        return (
          parseFloat((e / Math.pow(1024, i)).toFixed(n)) +
          " " +
          ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][i]
        );
      }
      _recalc() {
        const e = `.${this._patternPlaceholderClass}.${this._patternPlaceholderClassIsImage}`,
          t = `.${this._patternPlaceholderClass}.${this._patternPlaceholderClassIsBg}`;
        document.querySelectorAll(e).forEach((e) => {
          const t = e.id,
            n = document.querySelector(`[${this._dataIdAttr}="${t}"]`);
          this._setItemSizing(n, e);
        }),
          document.querySelectorAll(t).forEach((e) => {
            const t = e.id,
              n = document.querySelector(`[${this._dataIdAttr}="${t}"]`);
            this._adjustElementPlaceholder(n, e);
          });
      }
      _debounce(e) {
        let t;
        return function (n) {
          t && clearTimeout(t), (t = setTimeout(e, 100, n));
        };
      }
      _injectSwitcher() {
        const e = this._injectSwitcherPlaceholder(),
          t = this._injectSwitcherLabel(),
          n = this._injectSwitcherInput(),
          i = this._injectSwitcherSpan();
        return e.appendChild(t), t.appendChild(n), t.appendChild(i), e;
      }
      _injectStatusInfoBar() {
        const e = this._injectStatusInfoBarPlaceholder(),
          t = this._injectStatusInfoBarSwitcher(),
          n = this._injectStatusInfoBarElementsContainer(),
          i = this._injectStatusInfoBarElements(0, "Current"),
          r = this._injectStatusInfoBarElements(1, "New");
        e.appendChild(t),
          e.appendChild(n),
          n.appendChild(i),
          n.appendChild(r),
          document.body.appendChild(e);
      }
      _injectSwitcherPlaceholder() {
        const e = document.createElement("div");
        return e.classList.add("dyn-switcher"), e;
      }
      _injectStatusInfoBarPlaceholder() {
        const e = document.createElement("div");
        return e.classList.add("dyn-infobar"), e;
      }
      _injectStatusInfoBarSwitcher() {
        const e = document.createElement("div");
        return (
          e.classList.add("dyn-infobar-switcher"),
          e.appendChild(this._injectSwitcher()),
          e
        );
      }
      _injectStatusInfoBarElementsContainer() {
        const e = document.createElement("div");
        return e.classList.add("dyn-infobar-elements-container"), e;
      }
      _injectStatusInfoBarElements(e, t) {
        const n = document.createElement("div");
        n.classList.add("dyn-infobar-inline");
        const i = document.createElement("span");
        i.classList.add("dyn-infobar-title"), (i.innerHTML = t);
        const r = document.createElement("ul");
        r.classList.add("dyn-infobar-items"), n.appendChild(i);
        for (const t in this._recommendationsList) {
          const n = this._injectStatusInfoBarElementsList(
              this._recommendationsList[t].title + ":",
              ""
            ),
            i =
              "url" === t
                ? document.createElement("a")
                : document.createElement("span");
          if (
            ("url" === t && 1 === e) ||
            ("alt" === t && 1 === e) ||
            ("title" === t && 1 === e)
          )
            break;
          r.appendChild(n),
            (i.id = `dyn-${t}-${e || 0}`),
            (i.innerHTML = "0"),
            n.appendChild(i);
        }
        return n.appendChild(r), n;
      }
      _injectStatusInfoBarElementsList(e, t) {
        const n = document.createElement("li"),
          i = document.createElement("span");
        return (n.innerHTML = t), n.appendChild(i), (i.innerHTML = e), n;
      }
      _injectSwitcherLabel() {
        const e = document.createElement("label");
        return e.classList.add("dyn-switch"), e;
    
      }
      _injectSwitcherInput() {
        const e = document.createElement("input");
        (e.type = "checkbox"), (e.checked = !0);
        const t = this;
        return (
          e.addEventListener("change", function () {
            this.checked
              ? ((t._isISActive = !0),
                t._findElements(),
                t._activatePrevPositions(),
                (document.querySelector(
                  ".dyn-infobar-elements-container"
                ).style.display = "block"))
              : ((t._isISActive = !1),
                t.destroyDomItems(),
                document
                  .querySelectorAll("[data-is-el-prev-zindex]")
                  .forEach((e) => {
                    e.style.zIndex = e.getAttribute("data-is-el-prev-zindex");
                  }),
                (document.querySelector(
                  ".dyn-infobar-elements-container"
                ).style.display = "none"));
          }),
          e
        );
      }
      _injectSwitcherSpan() {
        const e = document.createElement("span");
        return e.classList.add("dyn-slider", "dyn-round"), e;
      }
      init() {
        (this._isISActive = !0),
          this._findElements(),
          this._injectStyles(),
          this._injectStatusInfoBar(),
          console.info(
            "Image Wizard loaded successfully. Version: " + this._version
          );
      }
      _injectStyles() {
        const e = document.createElement("style");
        (e.type = "text/css"),
          (e.innerHTML =
            '\n            .dyn-infobar {\n                box-sizing: border-box;\n                display: flex;\n                position: fixed;\n                left: 0;\n                bottom: 0;\n                height: 122px;\n                background-color: rgba(0,0,0,0.9);\n                width: 100%;\n                z-index: 999999;\n                font-size: 18px;\n                font-family: Calibri;\n                padding: 15px;\n                direction: ltr;\n            }\n            \n            .dyn-infobar-switcher {\n                margin-right: 20px;\n                // display: flex;\n                // align-items: center;\n            }\n            \n            .dyn-infobar-elements-container {\n                overflow-x: auto;\n                overflow-y: hidden;\n            }\n            \n     @media (max-width: 768px) {\n .dyn-infobar-elements-container {\n width: 350px;\n }\n }    \n        \n       .dyn-infobar-inline {\n                display: block;\n                margin-bottom: 5px;\n                white-space: nowrap;\n            }\n            \n            .dyn-infobar-title {\n                color: white;\n                display: inline-block;\n                font-weight: bold;\n                padding-right: 10px;\n                min-width: 100px;\n            }\n            \n            .dyn-infobar-items {\n                color: white;\n                list-style: none;\n                padding: 0;\n                margin: 0;\n                display: inline-block;\n            }\n            \n            .dyn-infobar-items li {\n                color: white;\n                padding-right: 10px;\n                display: inline-block;\n            }\n            \n            .dyn-infobar-items li > span:first-child {\n                padding-right: 5px;\n                font-weight: bold;\n            }\n            \n            .dyn-edit {\n                position: absolute;\n                content: "";\n                width: 100%;\n                height: 100%;\n                transition: all .2 ease;\n                border: 5px dashed #FF7518;\n                background-color: rgba(255, 117, 24, 0.6);\n            }\n            \n            .dyn-edit:not(.dyn-edit--is-image) {\n                top: 0; \n                left: 0;                  \n            }\n            \n            .dyn-edit input {\n                position: absolute;\n                left: 0;\n                top: 0;\n                z-index: 1;\n                width: 100%;\n                height: 100%;\n                cursor: pointer;\n            }\n            \n            .dyn-edit:hover {\n                background-color: rgba(255, 117, 24, 0.8);\n            }\n            \n            .dyn-actions {\n display: none !important;\n                \n            }\n            \n            .dyn-zoom {\n                position: relative;\n                background-color: rgba(0,0,0,0.6);\n                display: table-cell;\n                margin-left: 5px;\n                font-weight: bold;\n                font-size: 24px;\n                color: white;\n                line-height: 15px;\n                vertical-align: middle;\n                cursor: pointer;\n                border-radius: 100%;\n                height: 30px;\n                width: 30px;\n                text-align: center;\n            }\n           \n            .dyn-zoom.dyn-zoom--zoomOut .dyn-icon-fig2 {\n                z-index: 1\n            }\n            \n            .dyn-zoom--toPrevious-is-disabled {\n                opacity: .4;            \n                cursor: not-allowed;\n            }\n    \n            .dyn-switch {\n              position: relative;\n              display: inline-block;\n              width: 60px;\n              height: 34px;\n            }\n            \n            .dyn-switch input {\n              opacity: 0;\n              width: 0;\n              height: 0;\n            }\n          \n            .dyn-slider {\n              position: absolute;\n              cursor: pointer;\n              top: 0;\n              left: 0;\n              right: 0;\n              bottom: 0;\n              background-color: #ccc;\n              -webkit-transition: .4s;\n              transition: .4s;\n            }\n            \n            .dyn-slider:before {\n              position: absolute;\n              content: "";\n              height: 26px;\n              width: 26px;\n              left: 4px;\n              bottom: 4px;\n              background-color: white;\n              -webkit-transition: .4s;\n              transition: .4s;\n   background-image: url("https://www.devpaz.com/image-wizard/witch-hat-1.png");\n background-size: contain;\n       }\n            \n            input:checked + .dyn-slider {\n              background-color: #A200FF;\n            }\n            \n            input:focus + .dyn-slider {\n              box-shadow: 0 0 1px #2196F3;\n            }\n            \n            input:checked + .dyn-slider:before {\n              -webkit-transform: translateX(26px);\n              -ms-transform: translateX(26px);\n              transform: translateX(26px);\n            }\n            \n            .dyn-slider.dyn-round {\n              border-radius: 34px;\n            }\n            \n            .dyn-slider.dyn-round:before {\n              border-radius: 50%;\n            }\n            \n            .dyn-icon {\n                position: absolute !Important;\n                left: 50%;\n                top: 50%;\n                transform: translate(-50%,-50%);\n                width: 18px;\n                height: 16px;\n            }\n            \n            .dyn-icon svg {\n                margin-top: 1px;\n                fill: #fff;\n            }\n            \n            .dyn-icon-fig {\n                width: 12px;\n                height: 12px;\n                position: absolute !important;\n                background-color: #3fa9f5;\n                top: 0;\n                left: 0;\n                z-index: 1;\n                border-radius: 2px;\n            }\n            \n            .dyn-icon-fig2 {\n                background-color: #0071bd;\n                top: 5px;\n                left: 5px;\n                z-index: 0;\n            }\n            \n            .dyn-switcher {\n                padding-top: 10px;\n            }\n            \n            #dyn-url-0 {\n                margin-top: 1px;\n                text-decoration: none;\n                text-overflow: ellipsis;\n                overflow: hidden;\n                white-space: nowrap;\n                width: 200px;\n                float: right;\n                color: #fff;\n                margin: 0;\n                padding: 0;\n                line-height: 20px;\n            }\n        '),
          document.getElementsByTagName("head")[0].appendChild(e);
      }
    }
    class r {
      constructor() {
        (this._doc = ""),
          (this._version = "2.0.0"),
          (this._isISActive = !1),
          (this._dataIdAttr = "data-id-opt"),
          (this._patternPlaceholderClass = "dyn-edit"),
          (this._patternPlaceholderClassIsImage = "dyn-edit--is-image"),
          (this._patternPlaceholderClassIsBg = "dyn-edit--is-bg"),
          (this._domElementsImg =
            "img[data-original-src]:not([data-id-opt]), img:not([data-id-opt]):not(.HeaderNavigationBarDropdown__item-media-image)"),
          (this._domElementsWithBackground =
            '[style*="background"]:not([data-id-opt]):not(.HeaderNavigationBarItem__icon)'),
          (this._domElementsCheckComputed =
            'a:not([style*="background"]):not([data-id-opt]), li:not([style*="background"]):not([data-id-opt]), div:not([style*="background"]):not([data-id-opt]), section:not([style*="background"]):not([data-id-opt])'),
          (this._recommendationsList = {
            height: { title: "Height" },
            width: { title: "Width" },
            ext: { title: "Extension" },
            size: { title: "Size" },
            url: { title: "URL" },
          }),
          (this._elements = []),
          (this._elementsCount = 0),
          (this._selectedElement = Element);
      }
      init() {
        this._injectOuterStyles(),
          this._injectStatusInfoBar(),
          this._doc &&
            ((this._isISActive = !0),
            this._injectStyles(),
            this._findElements()),
          console.info(
            "Image Wizard for Page Buider loaded successfully. Version: " +
              this._version
          );
      }
      setDoc(e) {
        (this._isISActive = !0),
          (this._doc = e),
          this._injectStyles(),
          this._findElements();
      }
      destroy() {
        this._destroyDomItems(),
          document.querySelectorAll(`[${this._dataIdAttr}]`).forEach((e) => {
            e.removeAttribute(this._dataIdAttr);
          }),
          document.getElementsByClassName("dyn-infobar")[0].remove(),
          (this._isISActive = !1);
      }
      _destroyDomItems() {
        this._isISActive &&
          (this._destroyPlaceholders(
            this._doc.querySelectorAll("." + this._patternPlaceholderClass)
          ),
          this._restoreLinks(this._doc.querySelectorAll("[data-href-temp]")));
      }
      _destroyPlaceholders(e) {
        e &&
          (e.forEach((e) => {
            e.parentNode.removeChild(e);
          }),
          this._doc.querySelectorAll("[data-is-loaded]").forEach((e) => {
            e.removeAttribute("data-is-loaded");
          }));
      }
      _restoreLinks(e) {
        e &&
          e.forEach((e) => {
            e.setAttribute("href", e.getAttribute("data-href-temp")),
              e.removeAttribute("data-href-temp");
          });
      }
      _isElementVisible(e) {
        if (!e.closest("n-popin")) return null !== e.offsetParent;
      }
      _addRawDomElement(e) {
        (this._elements["el-" + this._elementsCount] = { item: e }),
          this._elementsCount++;
      }
      _findDomImgs() {
        this._doc.querySelectorAll(this._domElementsImg).forEach((e) => {
          if (this._isElementVisible(e)) {
            const t = e.getBoundingClientRect();
            t.height >= 30 && t.width >= 30 && this._addRawDomElement(e);
          }
        });
      }
      _findDomElements() {
        this._doc
          .querySelectorAll(this._domElementsWithBackground)
          .forEach((e) => {
            this._isElementVisible(e) &&
              "" !== e.style.backgroundImage &&
              "url()" !== e.style.backgroundImage &&
              "url();" !== e.style.backgroundImage &&
              'url("")' !== e.style.backgroundImage &&
              'url("");' !== e.style.backgroundImage &&
              "none" !== e.style.backgroundImage &&
              (("static" !== getComputedStyle(e).position &&
                getComputedStyle(e).position) ||
                ("static" !== e.style.position && e.style.position) ||
                (e.setAttribute("data-is-prev-pos", e.style.position),
                (e.style.position = "relative")),
              this._addRawDomElement(e));
          });
      }
      _findDomComputedElements() {
        this._doc
          .querySelectorAll(this._domElementsCheckComputed)
          .forEach((e) => {
            if (this._isElementVisible(e)) {
              const t = getComputedStyle(e)["background-image"];
              t &&
                "none" !== t &&
                -1 !== t.search("url") &&
                "" !== t &&
                "url()" !== t &&
                'url("")' !== t &&
                "none" !== t &&
                (("static" !== getComputedStyle(e).position &&
                  getComputedStyle(e).position) ||
                  (e.setAttribute("data-is-prev-pos", e.style.position),
                  (e.style.position = "relative")),
                this._addRawDomElement(e));
            }
          });
      }
      _findElements() {
        this._findDomImgs(),
          this._findDomElements(),
          this._findDomComputedElements(),
          this._createPlaceholders(),
          document.querySelectorAll("#viewport-switch a").forEach((e) => {
            e.addEventListener("click", () => {
              this._isISActive &&
                (this._recalc(),
                this._findDomImgs(),
                this._findDomElements(),
                this._findDomComputedElements(),
                this._createPlaceholders());
            });
          }),
          this._doc.addEventListener(
            "resize",
            this._debounce((e) => {
              this._isISActive && this._recalc();
            })
          ),
          this._doc.addEventListener(
            "scroll",
            this._debounce((e) => {
              this._isISActive &&
                (this._recalc(),
                this._findDomImgs(),
                this._findDomElements(),
                this._findDomComputedElements(),
                this._createPlaceholders());
            })
          );
      }
      _createElementPlaceholder(e, t) {
        const n = this._doc.createElement("div");
        if (
          (this._adjustElementPlaceholder(e, n),
          (n.id = t),
          n.classList.add("dyn-edit"),
          (n.style.zIndex = 10),
          e.classList.contains("g_bg"))
        ) {
          const t = Number(e.style.zIndex),
            n = Number(getComputedStyle(e).zIndex),
            i = Math.max(t, n);
          e.setAttribute("data-is-el-prev-zindex", i),
            (e.style.zIndex = "auto");
        }
        return n;
      }
      _adjustElementPlaceholder(e, t) {
        return (
          (t.style.width = e.offsetWidth + "px"),
          (t.style.height = e.offsetHeight + "px"),
          t
        );
      }
      _setItemSizing(e, t) {
        if (e) {
          const n = e.getBoundingClientRect(),
            i = n.width,
            r = n.height,
            s = n.left + window.scrollX,
            o = n.top + window.scrollY;
          (t.style.width = i + "px"),
            (t.style.height = r + "px"),
            (t.style.top = o + "px"),
            (t.style.left = s + "px");
        }
        return t;
      }
      _createElementInputPlaceholder(e, t) {
        const n = this._doc.createElement("input");
        return (
          n.setAttribute("type", "file"),
          n.setAttribute("accept", "image/*"),
          this._createElementInputPlaceholderEvents(e, n, t),
          n
        );
      }
      _getImageSrc(e) {
        if (e && e.src)
          return e.hasAttribute("data-src")
            ? e.getAttribute("data-src")
            : e.src;
      }
      _createElementInputPlaceholderEvents(e, t, n) {
        const i = this;
        t.addEventListener("change", (t) => {
          if (FileReader) {
            var r = new FileReader();
            r.readAsDataURL(t.srcElement.files[0]),
              (r.onload = function (r) {
                var s = new Image();
                (s.src = r.target.result),
                  (s.onload = function () {
                    const r = i._doc.querySelector(
                      `[${i._dataIdAttr}="${n.id}"]`
                    );
                    if (
                      (i._doc
                        .querySelector(`#${n.id} .dyn-zoom--toPrevious`)
                        .classList.remove("dyn-zoom--toPrevious-is-disabled"),
                      "IMG" === e.tagName)
                    )
                      r.getAttribute("data-original-src") ||
                        r.setAttribute("data-original-src", r.src),
                        r.setAttribute("data-new-src", s.src),
                        (r.srcset = ""),
                        (r.src = s.src);
                    else {
                      if (!r.getAttribute("data-original-src"))
                        if (r.style.backgroundImage)
                          r.setAttribute(
                            "data-original-src",
                            r.style.backgroundImage
                          );
                        else {
                          const e = i._removeURLStringFromBG(
                            getComputedStyle(r)["background-image"]
                          );
                          r.setAttribute("data-original-src", `url('${e}')`);
                        }
                      r.setAttribute("data-new-src", s.src),
                        (r.style.backgroundImage = `url('${s.src}')`);
                    }
                    if (e.closest("picture")) {
                      e.closest("picture")
                        .querySelectorAll("source")
                        .forEach(function (e) {
                          e.getAttribute("data-is-prev-srcset") ||
                            e.setAttribute("data-is-prev-srcset", e.srcset),
                            (e.srcset = s.currentSrc);
                        });
                    }
                    (i._elements[n.id].properties.hasOriginalMode = !1),
                      (i._elements[n.id].properties.isUpdated = !0),
                      (i._elements[n.id].properties.new.height = s.height),
                      (i._elements[n.id].properties.new.width = s.width),
                      (i._elements[n.id].properties.new.size =
                        t.srcElement.files[0].size),
                      (i._elements[n.id].properties.new.ext =
                        t.srcElement.files[0].type),
                      setTimeout(() => {
                        i._recalc();
                      }, 500);
                  });
              });
          }
        });
      }
      _getPercentage(e, t) {
        return Math.round(100 * Math.abs((e - t) / ((e + t) / 2)), 1);
      }
      _translateImageMimeType(e) {
        return "image/jpg" === e
          ? "JPG"
          : "image/jpeg" === e
          ? "JPEG"
          : "image/png" === e
          ? "PNG"
          : "image/gif" === e
          ? "GIF"
          : void 0;
      }
      _createElementActionsPlaceholder() {
        const e = document.createElement("div");
        return e.classList.add("dyn-actions"), e;
      }
      _createElementIconGroup() {
        const e = this._doc.createElement("span");
        e.classList.add("dyn-icon");
        const t = this._doc.createElement("span");
        t.classList.add("dyn-icon-fig", "dyn-icon-fig1");
        const n = this._doc.createElement("span");
        return (
          n.classList.add("dyn-icon-fig", "dyn-icon-fig2"),
          e.appendChild(t),
          e.appendChild(n),
          e
        );
      }
      _createElementIconPrevious() {
        const e = this._doc.createElement("span");
        e.classList.add("dyn-icon");
        const t = this._doc.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        t.setAttribute("height", "15px"),
          t.setAttribute("width", "15px"),
          t.setAttribute("viewBox", "0 0 512 512.00241");
        const n = this._doc.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        return (
          n.setAttribute("fill-rule", "evenodd"),
          n.setAttribute(
            "d",
            "m256 .00390625c-62.675781 0-123.605469 23.08203175-171.09375 62.26953175l-57.597656-57.597657c-4.585938-4.566406-11.457032-5.933593-17.429688-3.457031-5.972656 2.472656-9.878906 8.296875-9.878906 14.785156v138.664063c0 8.832031 7.167969 16 16 16h138.667969c6.484375 0 12.308593-3.902344 14.785156-9.875 2.472656-5.972657 1.109375-12.84375-3.480469-17.429688l-50.75-50.773437c39.445313-31.425782 89.363282-49.921875 140.777344-49.921875 117.632812 0 213.335938 95.703125 213.335938 213.335937 0 117.628906-95.703126 213.332032-213.335938 213.332032-56.9375 0-110.503906-22.207032-150.804688-62.527344-8.339843-8.34375-21.824218-8.34375-30.164062 0-8.34375 8.339844-8.34375 21.824218 0 30.164062 48.363281 48.382813 112.640625 75.03125 180.96875 75.03125 141.164062 0 256-114.839844 256-256 0-141.164062-114.835938-255.99999975-256-255.99999975zm0 0"
          ),
          t.appendChild(n),
          e.appendChild(t),
          e
        );
      }
      _createElementReplacePrevious(e, t) {
        const n = this._doc.createElement("div");
        return (
          n.classList.add("dyn-zoom", "dyn-zoom--toPrevious"),
          t.properties.isUpdated ||
            n.classList.add("dyn-zoom--toPrevious-is-disabled"),
          (n.title = "Replace for the original"),
          n.append(this._createElementIconPrevious()),
          n.addEventListener("click", () => {
            const n = this._doc.querySelector(`[${this._dataIdAttr}="${e}"]`);
            if (t.properties.isUpdated) {
              if (t.properties.hasOriginalMode) {
                const e = t.item.getAttribute("data-new-src");
                if (
                  (t.properties.original.isImage
                    ? (n.src = e)
                    : (n.style.backgroundImage = `url('${e}')`),
                  t.item.closest("picture"))
                ) {
                  t.item
                    .closest("picture")
                    .querySelectorAll("source")
                    .forEach(function (t) {
                      t.getAttribute("data-is-prev-srcset") && (t.srcset = e);
                    });
                }
                t.properties.hasOriginalMode = !1;
              } else {
                const e = t.item.getAttribute("data-original-src");
                if (
                  (t.properties.original.isImage
                    ? (n.src = e)
                    : (n.style.backgroundImage = "" + e),
                  t.item.closest("picture"))
                ) {
                  t.item
                    .closest("picture")
                    .querySelectorAll("source")
                    .forEach(function (e) {
                      e.getAttribute("data-is-prev-srcset") &&
                        (e.srcset = e.getAttribute("data-is-prev-srcset"));
                    });
                }
                t.properties.hasOriginalMode = !0;
              }
              this._recalc();
            }
          }),
          n
        );
      }
      _createElementZoomOutPlaceholder(e) {
        const t = this,
          n = this._doc.createElement("div");
        return (
          n.classList.add("dyn-zoom", "dyn-zoom--zoomOut"),
          (n.title = "Send to back"),
          n.append(this._createElementIconGroup()),
          n.addEventListener("click", function () {
            t._doc.getElementById(e).style.zIndex >= 1 &&
              (t._doc.getElementById(e).style.zIndex =
                parseInt(t._doc.getElementById(e).style.zIndex) - 1);
          }),
          n
        );
      }
      _extractExt(e) {
        let t;
        if (void 0 !== e)
          return (
            (t = e.split(".").pop()), (t = t.substring(0, 3)), t.toUpperCase()
          );
      }
      _removeURLStringFromBG(e) {
        const t = /(https?:\/\/[^ ]*)/;
        if (new RegExp(t).test(e)) {
          let n = e.match(t)[1];
          if (n)
            return (
              (n = n.replace(/['"]+/g, "")), (n = n.replace(/[()]/g, "")), n
            );
        }
      }
      _getURLFromBackgroundImage(e) {
        const t = /(https?:\/\/[^ ]*)/,
          n = new RegExp(t);
        let i = e.style.backgroundImage;
        if (
          (i || (i = getComputedStyle(e)["background-image"]),
          i.startsWith('url("/'))
        ) {
          const e = document.location.origin;
          i = i.replace('url("/', 'url("' + e + "/");
        }
        if (n.test(i)) {
          let e = i.match(t)[1];
          if (e)
            return (
              (e = e.replace(/['"]+/g, "")), (e = e.replace(/[()]/g, "")), e
            );
        }
      }
      _splitLastPathURL(e) {
        const t = e.split("/");
        return t.pop() || t.pop();
      }
      _getCurrentValLabel(e, t) {
        return t > e
          ? "(larger value)"
          : t < e
          ? "(smaller value)"
          : "(same value)";
      }
      _createPlaceholders() {
        let e = 0;
        Object.entries(this._elements).forEach(([t, n]) => {
          let i;
          const r = this._elements[t],
            s = r.item;
          if (!s.hasAttribute("data-is-loaded")) {
            s.setAttribute("data-is-loaded", !0);
            const t = "el-" + e,
              n = this._createElementPlaceholder(s, t),
              o = this._createElementActionsPlaceholder(),
              a = this._createElementInputPlaceholder(s, n);
            void 0 === r.properties &&
              ((r.id = e),
              (r.properties = {
                original: {},
                new: {},
                isUpdated: !1,
                hasOriginalMode: !0,
              })),
              n.appendChild(a),
              n.appendChild(o),
              o.appendChild(this._createElementZoomOutPlaceholder(t)),
              o.appendChild(this._createElementReplacePrevious(t, r)),
              s.setAttribute(this._dataIdAttr, "el-" + e),
              (i = r.properties.original.url),
              r.properties.isUpdated ||
                (r.properties.original.isImage = "IMG" === s.tagName),
              "IMG" === s.tagName
                ? (n.classList.add(this._patternPlaceholderClassIsImage),
                  this._setItemSizing(s, n),
                  this._doc.body.appendChild(n))
                : (n.classList.add(this._patternPlaceholderClassIsBg),
                  s.appendChild(n));
            const d = n.closest("a");
            let l;
            d &&
              (d.setAttribute("data-href-temp", d.href),
              d.removeAttribute("href"),
              d.addEventListener("click", (e) => {
                e.stopPropagation();
              })),
              n.addEventListener("mouseleave", (e) => {
                clearTimeout(l);
              }),
              n.addEventListener("mouseenter", (e) => {
                l = setTimeout(() => {
                  if (!r.properties.isUpdated)
                    if (r.properties.original.isImage) {
                      if (
                        ((i = this._getImageSrc(r.item)),
                        (r.properties.original.url = i),
                        (r.properties.original.ext = this._extractExt(i)),
                        (r.properties.original.height = r.item.naturalHeight),
                        (r.properties.original.width = r.item.naturalWidth),
                        "SVG" === r.properties.original.ext)
                      ) {
                        const e = r.item.getBoundingClientRect();
                        (r.properties.original.height = Math.round(e.height)),
                          (r.properties.original.width = Math.round(e.width));
                      }
                    } else {
                      const e = new Image();
                      (i = this._getURLFromBackgroundImage(r.item)),
                        (e.src = i),
                        (r.properties.original.ext = this._extractExt(i)),
                        (r.properties.original.url = i),
                        (r.properties.original.height = e.height),
                        (r.properties.original.width = e.width);
                    }
                  if (
                    ((document.getElementById("dyn-height-0").innerHTML =
                      r.properties.original.height + "px"),
                    (document.getElementById("dyn-width-0").innerHTML =
                      r.properties.original.width + "px"),
                    (document.getElementById("dyn-ext-0").innerHTML =
                      r.properties.original.ext),
                    (document.getElementById("dyn-url-0").innerHTML = i),
                    (this._selectedElement = r),
                    0 !== Object.keys(r.properties.new).length)
                  ) {
                    const e =
                      r.properties.new.size <= r.properties.original.size;
                    (document.getElementById("dyn-height-1").innerHTML =
                      r.properties.new.height +
                      "px" +
                      (r.properties.new.height !== r.properties.original.height
                        ? ' <span style="color:#2685d9">' +
                          this._getCurrentValLabel(
                            r.properties.original.height,
                            r.properties.new.height
                          ) +
                          "</span>"
                        : "")),
                      (document.getElementById("dyn-width-1").innerHTML =
                        r.properties.new.width +
                        "px" +
                        (r.properties.new.width !== r.properties.original.width
                          ? ' <span style="color:#2685d9">' +
                            this._getCurrentValLabel(
                              r.properties.original.width,
                              r.properties.new.width
                            ) +
                            "</span>"
                          : "")),
                      (document.getElementById("dyn-ext-1").innerHTML =
                        this._translateImageMimeType(r.properties.new.ext) +
                        (r.properties.new.ext !== r.properties.original.ext
                          ? ' <span style="color:#fe1f18">(different extension)</span>'
                          : "")),
                      (document.getElementById("dyn-size-1").innerHTML =
                        this._formatBytes(r.properties.new.size) +
                        ' <span style="color:' +
                        (e ? "#468c0f" : "#fe1f18") +
                        '">' +
                        this._getPercentage(
                          r.properties.original.size,
                          r.properties.new.size
                        ) +
                        "% " +
                        (e ? "more" : "less") +
                        " performant</span>");
                  } else
                    (document.getElementById("dyn-height-1").innerHTML = "0px"),
                      (document.getElementById("dyn-width-1").innerHTML =
                        "0px"),
                      (document.getElementById("dyn-ext-1").innerHTML =
                        "undefined"),
                      (document.getElementById("dyn-size-1").innerHTML = "0");
                  void 0 !== i &&
                    ((document.getElementById("dyn-url-0").innerHTML =
                      this._splitLastPathURL(i)),
                    (document.getElementById("dyn-url-0").href = i),
                    (document.getElementById("dyn-url-0").title = i),
                    (document.getElementById("dyn-url-0").target = "_blank")),
                    r.properties.original.size
                      ? (document.getElementById("dyn-size-0").innerHTML =
                          this._formatBytes(r.properties.original.size))
                      : fetch(i)
                          .then((e) => e.blob())
                          .then((e) => {
                            (r.properties.original.size = e.size),
                              (document.getElementById("dyn-size-0").innerHTML =
                                this._formatBytes(e.size));
                          });
                }, 500);
              });
          }
          e++;
        });
      }
      _formatBytes(e, t = 2) {
        if (0 === e) return "0 Bytes";
        const n = t < 0 ? 0 : t,
          i = Math.floor(Math.log(e) / Math.log(1024));
        return (
          parseFloat((e / Math.pow(1024, i)).toFixed(n)) +
          " " +
          ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][i]
        );
      }
      _recalc() {
        const e = `.${this._patternPlaceholderClass}.${this._patternPlaceholderClassIsImage}`,
          t = `.${this._patternPlaceholderClass}.${this._patternPlaceholderClassIsBg}`;
        this._doc.querySelectorAll(e).forEach((e) => {
          const t = e.id,
            n = this._doc.querySelector(`[${this._dataIdAttr}="${t}"]`);
          this._setItemSizing(n, e);
        }),
          this._doc.querySelectorAll(t).forEach((e) => {
            const t = e.id,
              n = this._doc.querySelector(`[${this._dataIdAttr}="${t}"]`);
            this._adjustElementPlaceholder(n, e);
          });
      }
      _debounce(e) {
        let t;
        return function (n) {
          t && clearTimeout(t), (t = setTimeout(e, 100, n));
        };
      }
      _injectSwitcher() {
        const e = this._injectSwitcherPlaceholder(),
          t = this._injectSwitcherLabel(),
          n = this._injectSwitcherInput(),
          i = this._injectSwitcherSpan();
        return e.appendChild(t), t.appendChild(n), t.appendChild(i), e;
      }
      _injectStatusInfoBar() {
        const e = this._injectStatusInfoBarPlaceholder(),
          t = this._injectStatusInfoBarSwitcher(),
          n = this._injectStatusInfoBarElementsContainer(),
          i = this._injectStatusInfoBarElements(0, "Current"),
          r = this._injectStatusInfoBarElements(1, "New");
        e.appendChild(t),
          e.appendChild(n),
          n.appendChild(i),
          n.appendChild(r),
          document.body.appendChild(e);
      }
      _injectSwitcherPlaceholder() {
        const e = document.createElement("div");
        return e.classList.add("dyn-switcher"), e;
      }
      _injectStatusInfoBarPlaceholder() {
        const e = document.createElement("div");
        return e.classList.add("dyn-infobar"), e;
      }
      _injectStatusInfoBarSwitcher() {
        const e = document.createElement("div");
        return (
          e.classList.add("dyn-infobar-switcher"),
          e.appendChild(this._injectSwitcher()),
          e
        );
      }
      _injectStatusInfoBarElementsContainer() {
        const e = document.createElement("div");
        return e.classList.add("dyn-infobar-elements-container"), e;
      }
      _injectStatusInfoBarElements(e, t) {
        const n = document.createElement("div");
        n.classList.add("dyn-infobar-inline");
        const i = document.createElement("span");
        i.classList.add("dyn-infobar-title"), (i.innerHTML = t);
        const r = document.createElement("ul");
        r.classList.add("dyn-infobar-items"), n.appendChild(i);
        for (const t in this._recommendationsList) {
          const n = this._injectStatusInfoBarElementsList(
              this._recommendationsList[t].title + ":",
              ""
            ),
            i =
              "url" === t
                ? document.createElement("a")
                : document.createElement("span");
          if (
            ("url" === t && 1 === e) ||
            ("alt" === t && 1 === e) ||
            ("title" === t && 1 === e)
          )
            break;
          r.appendChild(n),
            (i.id = `dyn-${t}-${e || 0}`),
            (i.innerHTML = "0"),
            n.appendChild(i);
        }
        return n.appendChild(r), n;
      }
      _injectStatusInfoBarElementsList(e, t) {
        const n = document.createElement("li"),
          i = document.createElement("span");
        return (n.innerHTML = t), n.appendChild(i), (i.innerHTML = e), n;
      }
      _injectSwitcherLabel() {
        const e = document.createElement("label");
        return e.classList.add("dyn-switch"), e;
      }
      _injectSwitcherInput() {
        const e = document.createElement("input");
        (e.type = "checkbox"), (e.checked = !0);
        const t = this;
        return (
          e.addEventListener("change", function () {
            this.checked
              ? ((t._isISActive = !0),
                t._findElements(),
                (document.querySelector(
                  ".dyn-infobar-elements-container"
                ).style.display = "block"))
              : (t._destroyDomItems(),
                document
                  .querySelectorAll("[data-is-el-prev-zindex]")
                  .forEach((e) => {
                    e.style.zIndex = e.getAttribute("data-is-el-prev-zindex");
                  }),
                (document.querySelector(
                  ".dyn-infobar-elements-container"
                ).style.display = "none"),
                (t._isISActive = !1));
          }),
          e
        );
      }
      _injectSwitcherSpan() {
        const e = document.createElement("span");
        return e.classList.add("dyn-slider", "dyn-round"), e;
      }
      _injectOuterStyles() {
        const e = document.createElement("style");
        (e.innerHTML =
          '\n            .dyn-infobar {\n                box-sizing: border-box;\n                display: flex;\n                position: fixed;\n                left: 0;\n                bottom: 0;\n                height: 122px;\n                background-color: rgba(0,0,0,0.9);\n                width: 100%;\n                z-index: 999999;\n                font-size: 18px;\n                font-family: Calibri;\n                padding: 15px;\n                direction: ltr;\n            }\n            \n            .dyn-infobar-switcher {\n                margin-right: 20px;\n                // display: flex;\n                // align-items: center;\n            }\n            \n            .dyn-infobar-elements-container {\n                overflow-x: auto;\n                overflow-y: hidden;\n            }\n            \n      @media (max-width: 768px) {\n .dyn-infobar-elements-container {\n width: 350px;\n }\n }    \n        \n      .dyn-infobar-inline {\n                display: block;\n                margin-bottom: 5px;\n                white-space: nowrap;\n            }\n            \n            .dyn-infobar-title {\n                color: white;\n                display: inline-block;\n                font-weight: bold;\n                padding-right: 10px;\n                min-width: 100px;\n            }\n            \n            .dyn-infobar-items {\n                color: white;\n                list-style: none;\n                padding: 0;\n                margin: 0;\n                display: inline-block;\n            }\n            \n            .dyn-infobar-items li {\n                color: white;\n                padding-right: 10px;\n                display: inline-block;\n            }\n            \n            .dyn-infobar-items li > span:first-child {\n                padding-right: 5px;\n                font-weight: bold;\n            }\n            .dyn-switch {\n              position: relative;\n              display: inline-block;\n              width: 60px;\n              height: 34px;\n            }\n            \n            .dyn-switch input {\n              opacity: 0;\n              width: 0;\n              height: 0;\n            }\n          \n            .dyn-slider {\n              position: absolute;\n              cursor: pointer;\n              top: 0;\n              left: 0;\n              right: 0;\n              bottom: 0;\n              background-color: #ccc;\n              -webkit-transition: .4s;\n              transition: .4s;\n            }\n            \n            .dyn-slider:before {\n              position: absolute;\n              content: "";\n              height: 26px;\n              width: 26px;\n              left: 4px;\n              bottom: 4px;\n              background-color: white;\n              -webkit-transition: .4s;\n              transition: .4s;\n    background-image: url("witch-hat-1.png");\n    background-size: contain;\n    }\n            \n            input:checked + .dyn-slider {\n              background-color: #A200FF;\n            }\n            \n            input:focus + .dyn-slider {\n              box-shadow: 0 0 1px #2196F3;\n            }\n            \n            input:checked + .dyn-slider:before {\n              -webkit-transform: translateX(26px);\n              -ms-transform: translateX(26px);\n              transform: translateX(26px);\n            }\n            \n            .dyn-slider.dyn-round {\n              border-radius: 34px;\n            }\n            \n            .dyn-slider.dyn-round:before {\n              border-radius: 50%;\n            }\n            .dyn-switcher {\n                padding-top: 10px;\n            }\n            \n            #dyn-url-0 {\n                margin-top: 1px;\n                text-decoration: none;\n                text-overflow: ellipsis;\n                overflow: hidden;\n                white-space: nowrap;\n                width: 200px;\n                float: right;\n                color: #fff;\n                margin: 0;\n                padding: 0;\n                line-height: 20px;\n            }\n        '),
          document.getElementsByTagName("head")[0].appendChild(e);
      }
      _injectStyles() {
        const e = this._doc.createElement("style");
        (e.type = "text/css"),
          (e.innerHTML =
            '\n            .dyn-edit {\n                position: absolute;\n                content: "";\n                width: 100%;\n                height: 100%;\n                transition: all .2 ease;\n                border: 5px dashed #FF7518;\n                background-color: rgba(255, 117, 24, 0.6);\n            }\n            \n            .dyn-edit:not(.dyn-edit--is-image) {\n                top: 0; \n                left: 0;                  \n            }\n            \n            .dyn-edit--is-image {\n                position: fixed;\n            }\n            \n            .dyn-edit input {\n                position: absolute;\n                left: 0;\n                top: 0;\n                z-index: 1;\n                width: 100%;\n                height: 100%;\n                cursor: pointer;\n            }\n            \n            .dyn-edit:hover {\n                background-color: rgba(255, 0, 0, .8);\n            }\n            \n            .dyn-actions {\n               display: none !important \n            }\n            \n            .dyn-zoom {\n                position: relative;\n                background-color: rgba(0,0,0,0.6);\n                display: table-cell;\n                margin-left: 5px;\n                font-weight: bold;\n                font-size: 24px;\n                color: white;\n                line-height: 15px;\n                vertical-align: middle;\n                cursor: pointer;\n                border-radius: 100%;\n                height: 30px;\n                width: 30px;\n                text-align: center;\n            }\n           \n            .dyn-zoom.dyn-zoom--zoomOut .dyn-icon-fig2 {\n                z-index: 1\n            }\n            \n            .dyn-zoom--toPrevious-is-disabled {\n                opacity: .4;            \n                cursor: not-allowed;\n            }\n    \n           \n            .dyn-icon {\n                position: absolute !Important;\n                left: 50%;\n                top: 50%;\n                transform: translate(-50%,-50%);\n                width: 18px;\n                height: 16px;\n            }\n            \n            .dyn-icon svg {\n                margin-top: 1px;\n                fill: #fff;\n            }\n            \n            .dyn-icon-fig {\n                width: 12px;\n                height: 12px;\n                position: absolute !important;\n                background-color: #3fa9f5;\n                top: 0;\n                left: 0;\n                z-index: 1;\n                border-radius: 2px;\n            }\n            \n            .dyn-icon-fig2 {\n                background-color: #0071bd;\n                top: 5px;\n                left: 5px;\n                z-index: 0;\n            }\n        '),
          this._doc.getElementsByTagName("head")[0].appendChild(e);
      }
    }
    if (
      "/testing/here.html" === window.location.pathname
    ) {
      var s = document.getElementById("render"),
        o = new r();
      if ((o.init(), s)) {
        var a = s.contentDocument || s.contentWindow.document;
        o.setDoc(a);
      }
      new MutationObserver(function (e) {
        e.forEach(function (e) {
          "preview" === e.target.id &&
            setTimeout(() => {
              o.destroy(), o.init();
              var t =
                e.target.querySelector("#render").contentDocument ||
                e.target.querySelector("#render").contentWindow.document;
              o.setDoc(t);
            }, 1500);
        });
      }).observe(document.body, { subtree: !0, childList: !0 });
    } else {
      new i().init();
    } 

  },
]);

