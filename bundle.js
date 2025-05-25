(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
///<reference path="node_modules/makerjs/index.d.ts" />
///<reference path="node_modules/jszip/index.d.ts" />
///<reference lib="es2017.object" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var makerjs = require('makerjs');
var JSZip = require('jszip');
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.renderCurrent = function () {
            _this.errorDisplay.innerHTML = '';
            var size = _this.sizeInput.valueAsNumber;
            if (!size)
                size = parseFloat(_this.sizeInput.value);
            if (!size)
                size = 100;
            _this.render(_this.selectFamily.selectedIndex, _this.selectVariant.selectedIndex, _this.textInput.value, size, _this.unionCheckbox.checked, _this.filledCheckbox.checked, _this.kerningCheckbox.checked, _this.separateCheckbox.checked, parseFloat(_this.bezierAccuracy.value) || undefined, _this.selectUnits.value, _this.fillInput.value, _this.strokeInput.value, _this.strokeWidthInput.value, _this.strokeNonScalingCheckbox.checked, _this.fillRuleInput.value);
        };
        this.loadVariants = function () {
            _this.selectVariant.options.length = 0;
            var f = _this.fontList.items[_this.selectFamily.selectedIndex];
            var v = f.variants.forEach(function (v) { return _this.addOption(_this.selectVariant, v); });
            _this.renderCurrent();
        };
        this.downloadSvg = function () { return __awaiter(_this, void 0, void 0, function () {
            var svgs, filenames, svgFiles, zip, _i, svgFiles_1, file, blob, url, a;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        svgs = this.outputTextarea.value.split(',');
                        filenames = this.textInput.value.split(/\n/);
                        svgFiles = svgs.map(function (content, i) { return ({ name: "".concat(filenames[i], ".svg"), content: _this.addNamespace(content) }); });
                        zip = new JSZip();
                        for (_i = 0, svgFiles_1 = svgFiles; _i < svgFiles_1.length; _i++) {
                            file = svgFiles_1[_i];
                            zip.file(file.name, file.content);
                        }
                        return [4 /*yield*/, zip.generateAsync({ type: "blob" })];
                    case 1:
                        blob = _a.sent();
                        url = URL.createObjectURL(blob);
                        a = document.createElement("a");
                        a.href = url;
                        a.download = "svg_archive_".concat(Date.now(), ".zip");
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        return [2 /*return*/];
                }
            });
        }); };
        this.downloadDxf = function () {
            var dxfFile = window.btoa(_this.renderDiv.getAttribute('data-dxf'));
            _this.dxfButton.href = 'data:application/dxf;base64,' + dxfFile;
            _this.dxfButton.download = _this.textInput.value + '.dxf';
        };
        this.copyToClipboard = function () {
            _this.outputTextarea.select();
            document.execCommand('copy');
            _this.copyToClipboardBtn.innerText = 'copied';
            setTimeout(function () {
                _this.copyToClipboardBtn.innerText = 'copy to clipboard';
            }, 2000);
        };
        this.updateUrl = function () {
            var urlSearchParams = new URLSearchParams(window.location.search);
            urlSearchParams.set('font-select', _this.selectFamily.value);
            urlSearchParams.set('font-variant', _this.selectVariant.value);
            urlSearchParams.set('input-union', String(_this.unionCheckbox.checked));
            urlSearchParams.set('input-filled', String(_this.filledCheckbox.checked));
            urlSearchParams.set('input-kerning', String(_this.kerningCheckbox.checked));
            urlSearchParams.set('input-separate', String(_this.separateCheckbox.checked));
            urlSearchParams.set('input-text', _this.textInput.value);
            urlSearchParams.set('input-bezier-accuracy', _this.bezierAccuracy.value);
            urlSearchParams.set('dxf-units', _this.selectUnits.value);
            urlSearchParams.set('input-size', _this.sizeInput.value);
            urlSearchParams.set('input-fill', _this.fillInput.value);
            urlSearchParams.set('input-stroke', _this.strokeInput.value);
            urlSearchParams.set('input-strokeWidth', _this.strokeWidthInput.value);
            urlSearchParams.set('input-fill-rule', _this.fillRuleInput.value);
            var url = window.location.protocol
                + "//" + window.location.host
                + window.location.pathname
                + "?"
                + urlSearchParams.toString();
            window.history.replaceState({ path: url }, "", url);
            _this.copyString(window.location.href);
            _this.createLinkButton.innerText = 'copied';
            setTimeout(function () {
                _this.createLinkButton.innerText = 'create link';
            }, 2000);
        };
        this.copyString = function (string) {
            _this.dummy.value = string;
            _this.dummy.type = 'text';
            _this.dummy.select();
            document.execCommand('copy');
            _this.dummy.type = 'hidden';
        };
        this.readUploadedFile = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var element, files, buffer, font;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = event.currentTarget;
                        if (!(element.files.length === 0)) return [3 /*break*/, 1];
                        this.customFont = undefined;
                        return [3 /*break*/, 3];
                    case 1:
                        files = element.files[0];
                        return [4 /*yield*/, files.arrayBuffer()];
                    case 2:
                        buffer = _a.sent();
                        font = opentype.parse(buffer);
                        this.customFont = font;
                        _a.label = 3;
                    case 3:
                        this.renderCurrent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.removeUploadedFont = function () {
            _this.fileUpload.value = null;
            _this.customFont = undefined;
            _this.renderCurrent();
        };
    }
    App.prototype.addNamespace = function (svg) {
        var namespace = 'http://www.w3.org/2000/svg';
        if (!svg.includes('xmlns="')) {
            return svg.replace('<svg', "<svg xmlns=\"".concat(namespace, "\" xmlns:xlink=\"http://www.w3.org/1999/xlink\""));
        }
        return svg;
    };
    App.prototype.init = function () {
        var _this = this;
        this.errorDisplay = this.$('#error-display');
        this.fileUpload = this.$('#font-upload');
        this.fileUploadRemove = this.$('#font-upload-remove');
        this.selectFamily = this.$('#font-select');
        this.selectVariant = this.$('#font-variant');
        this.unionCheckbox = this.$('#input-union');
        this.filledCheckbox = this.$('#input-filled');
        this.kerningCheckbox = this.$('#input-kerning');
        this.separateCheckbox = this.$('#input-separate');
        this.textInput = this.$('#input-text');
        this.bezierAccuracy = this.$('#input-bezier-accuracy');
        this.selectUnits = this.$('#dxf-units');
        this.sizeInput = this.$('#input-size');
        this.renderDiv = this.$('#svg-render');
        this.outputTextarea = this.$('#output-svg');
        this.downloadButton = this.$("#download-btn");
        this.dxfButton = this.$("#dxf-btn");
        this.createLinkButton = this.$("#create-link");
        this.copyToClipboardBtn = this.$("#copy-to-clipboard-btn");
        this.dummy = this.$('#dummy');
        this.fillInput = this.$('#input-fill');
        this.strokeInput = this.$('#input-stroke');
        this.strokeWidthInput = this.$('#input-stroke-width');
        this.strokeNonScalingCheckbox = this.$('#input-stroke-non-scaling');
        this.fillRuleInput = this.$("#input-fill-rule");
        // Init units select.
        Object.values(makerjs.unitType).forEach(function (unit) { return _this.addOption(_this.selectUnits, unit); });
    };
    App.prototype.readQueryParams = function () {
        var urlSearchParams = new URLSearchParams(window.location.search);
        var selectFamily = urlSearchParams.get('font-select');
        var selectVariant = urlSearchParams.get('font-variant');
        var unionCheckbox = urlSearchParams.get('input-union');
        var filledCheckbox = urlSearchParams.get('input-filled');
        var kerningCheckbox = urlSearchParams.get('input-kerning');
        var separateCheckbox = urlSearchParams.get('input-separate');
        var textInput = urlSearchParams.get('input-text');
        var bezierAccuracy = urlSearchParams.get('input-bezier-accuracy');
        var selectUnits = urlSearchParams.get('dxf-units');
        var sizeInput = urlSearchParams.get('input-size');
        var fillInput = urlSearchParams.get('input-fill');
        var strokeInput = urlSearchParams.get('input-stroke');
        var strokeWidthInput = urlSearchParams.get('input-stroke-width');
        var strokeNonScalingCheckbox = urlSearchParams.get('input-stroke-non-scaling');
        var fillRuleInput = urlSearchParams.get('input-fill-rule');
        if (selectFamily !== "" && selectFamily !== null)
            this.selectFamily.value = selectFamily;
        if (selectVariant !== "" && selectVariant !== null)
            this.selectVariant.value = selectVariant;
        if (selectUnits !== "" && selectUnits !== null)
            this.selectUnits.value = selectUnits;
        if (unionCheckbox !== "" && unionCheckbox !== null)
            this.unionCheckbox.checked = unionCheckbox === "true" ? true : false;
        if (filledCheckbox !== "" && filledCheckbox !== null)
            this.filledCheckbox.checked = filledCheckbox === "true" ? true : false;
        if (kerningCheckbox !== "" && kerningCheckbox !== null)
            this.kerningCheckbox.checked = kerningCheckbox === "true" ? true : false;
        if (separateCheckbox !== "" && separateCheckbox !== null)
            this.separateCheckbox.checked = separateCheckbox === "true" ? true : false;
        if (textInput !== "" && textInput !== null)
            this.textInput.value = textInput;
        if (bezierAccuracy !== "" && bezierAccuracy !== null)
            this.bezierAccuracy.value = bezierAccuracy;
        if (sizeInput !== "" && sizeInput !== null)
            this.sizeInput.value = sizeInput;
        if (fillInput !== "" && fillInput !== null)
            this.fillInput.value = fillInput;
        if (strokeInput !== "" && strokeInput !== null)
            this.strokeInput.value = strokeInput;
        if (strokeWidthInput !== "" && strokeWidthInput !== null)
            this.strokeWidthInput.value = strokeWidthInput;
        if (strokeNonScalingCheckbox !== "" && strokeNonScalingCheckbox !== null)
            this.strokeNonScalingCheckbox.checked = strokeNonScalingCheckbox === "true" ? true : false;
        if (fillRuleInput !== "" && fillRuleInput !== null)
            this.fillRuleInput.value = fillRuleInput;
    };
    App.prototype.handleEvents = function () {
        this.fileUpload.onchange = this.readUploadedFile;
        this.fileUploadRemove.onclick = this.removeUploadedFont;
        this.selectFamily.onchange = this.loadVariants;
        this.selectVariant.onchange =
            this.textInput.onchange =
                this.textInput.onkeyup =
                    this.sizeInput.onkeyup =
                        this.unionCheckbox.onchange =
                            this.filledCheckbox.onchange =
                                this.kerningCheckbox.onchange =
                                    this.separateCheckbox.onchange =
                                        this.bezierAccuracy.onchange =
                                            this.bezierAccuracy.onkeyup =
                                                this.selectUnits.onchange =
                                                    this.fillInput.onchange =
                                                        this.fillInput.onkeyup =
                                                            this.strokeInput.onchange =
                                                                this.strokeInput.onkeyup =
                                                                    this.strokeWidthInput.onchange =
                                                                        this.strokeWidthInput.onkeyup =
                                                                            this.strokeNonScalingCheckbox.onchange =
                                                                                this.fillRuleInput.onchange =
                                                                                    this.renderCurrent;
        // Is triggered on the document whenever a new color is picked
        document.addEventListener("coloris:pick", debounce(this.renderCurrent));
        //this.copyToClipboardBtn.onclick = this.copyToClipboard;
        this.downloadButton.onclick = this.downloadSvg;
        //this.dxfButton.onclick = this.downloadDxf;
        //this.createLinkButton.onclick = this.updateUrl;
    };
    App.prototype.$ = function (selector) {
        return document.querySelector(selector);
    };
    App.prototype.addOption = function (select, optionText) {
        var option = document.createElement('option');
        option.text = optionText;
        option.value = optionText;
        select.options.add(option);
        if (optionText === "Pacifico") {
            select.value = optionText;
        }
    };
    App.prototype.getGoogleFonts = function (apiKey) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey, true);
        xhr.onloadend = function () {
            _this.fontList = JSON.parse(xhr.responseText);
            _this.fontList.items.forEach(function (font) { return _this.addOption(_this.selectFamily, font.family); });
            _this.loadVariants();
            _this.handleEvents();
            _this.readQueryParams();
            _this.renderCurrent();
        };
        xhr.send();
    };
    App.prototype.callMakerjs = function (font, text, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule) {
        //generate the text using a font
        var textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy, { kerning: kerning });
        if (separate) {
            for (var i in textModel.models) {
                textModel.models[i].layer = i;
            }
        }
        var svg = makerjs.exporter.toSVG(textModel, {
            fill: filled ? fill : undefined,
            stroke: stroke ? stroke : undefined,
            strokeWidth: strokeWidth ? strokeWidth : undefined,
            fillRule: fillRule ? fillRule : undefined,
            scalingStroke: !strokeNonScaling,
        });
        var dxf = makerjs.exporter.toDXF(textModel, { units: units, usePOLYLINE: true });
        this.renderDiv.innerHTML = svg;
        //this.renderDiv.setAttribute('data-dxf', dxf);
        this.outputTextarea.value = svg;
    };
    App.prototype.renderMakerjsOutput = function (font, texts, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule) {
        var textsArray = texts.split(/\n/);
        var svgsArray = textsArray.map(function (t) {
            //generate the text using a font
            var textModel = new makerjs.models.Text(font, t, size, union, false, bezierAccuracy, { kerning: kerning });
            if (separate) {
                for (var i in textModel.models) {
                    textModel.models[i].layer = i;
                }
            }
            var svg = makerjs.exporter.toSVG(textModel, {
                fill: filled ? fill : undefined,
                stroke: stroke ? stroke : undefined,
                strokeWidth: strokeWidth ? strokeWidth : undefined,
                fillRule: fillRule ? fillRule : undefined,
                scalingStroke: !strokeNonScaling,
            });
            var dxf = makerjs.exporter.toDXF(textModel, { units: units, usePOLYLINE: true });
            return { svg: svg, dxf: dxf };
        });
        this.renderDiv.innerHTML = svgsArray.map(function (_a) {
            var svg = _a.svg;
            return svg;
        }).join("<br/>");
        this.renderDiv.setAttribute('data-dxf', svgsArray.map(function (_a) {
            var dxf = _a.dxf;
            return dxf;
        }).join());
        this.outputTextarea.value = svgsArray.map(function (_a) {
            var svg = _a.svg;
            return svg;
        }).join();
    };
    App.prototype.render = function (fontIndex, variantIndex, text, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule) {
        var _this = this;
        var f = this.fontList.items[fontIndex];
        var v = f.variants[variantIndex];
        var url = f.files[v].replace('http:', 'https:');
        if (this.customFont !== undefined) {
            this.callMakerjs(this.customFont, text, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule);
        }
        else {
            opentype.load(url, function (err, font) {
                if (err) {
                    _this.errorDisplay.innerHTML = err.toString();
                }
                else {
                    _this.renderMakerjsOutput(font, text, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule);
                }
            });
        }
    };
    return App;
}());
var app = new App();
window.onload = function () {
    app.init();
    app.getGoogleFonts('AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc');
};
/**
 * Creates and returns a new debounced version of the passed function that will
 * postpone its execution until after wait milliseconds have elapsed since the last time it was invoked.
 *
 * @param callback
 * @param wait
 * @returns
 */
function debounce(callback, wait) {
    if (wait === void 0) { wait = 200; }
    var timeoutId = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            callback.apply(null, args);
        }, wait);
    };
}

},{"jszip":13,"makerjs":14}],2:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],3:[function(require,module,exports){
module.exports = require('./lib/bezier');

},{"./lib/bezier":4}],4:[function(require,module,exports){
/**
  A javascript Bezier curve library by Pomax.

  Based on http://pomax.github.io/bezierinfo

  This code is MIT licensed.
**/
(function() {
  "use strict";

  // math-inlining.
  var abs = Math.abs,
    min = Math.min,
    max = Math.max,
    cos = Math.cos,
    sin = Math.sin,
    acos = Math.acos,
    sqrt = Math.sqrt,
    pi = Math.PI,
    // a zero coordinate, which is surprisingly useful
    ZERO = { x: 0, y: 0, z: 0 };

  // quite needed
  var utils = require("./utils.js");

  // only used for outlines atm.
  var PolyBezier = require("./poly-bezier.js");

  /**
   * Bezier curve constructor. The constructor argument can be one of three things:
   *
   * 1. array/4 of {x:..., y:..., z:...}, z optional
   * 2. numerical array/8 ordered x1,y1,x2,y2,x3,y3,x4,y4
   * 3. numerical array/12 ordered x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4
   *
   */
  var Bezier = function(coords) {
    var args = coords && coords.forEach ? coords : [].slice.call(arguments);
    var coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      var newargs = [];
      args.forEach(function(point) {
        ["x", "y", "z"].forEach(function(d) {
          if (typeof point[d] !== "undefined") {
            newargs.push(point[d]);
          }
        });
      });
      args = newargs;
    }
    var higher = false;
    var len = args.length;
    if (coordlen) {
      if (coordlen > 4) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
        higher = true;
      }
    } else {
      if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
      }
    }
    var _3d =
      (!higher && (len === 9 || len === 12)) ||
      (coords && coords[0] && typeof coords[0].z !== "undefined");
    this._3d = _3d;
    var points = [];
    for (var idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point.z = args[idx + 2];
      }
      points.push(point);
    }
    this.order = points.length - 1;
    this.points = points;
    var dims = ["x", "y"];
    if (_3d) dims.push("z");
    this.dims = dims;
    this.dimlen = dims.length;

    (function(curve) {
      var order = curve.order;
      var points = curve.points;
      var a = utils.align(points, { p1: points[0], p2: points[order] });
      for (var i = 0; i < a.length; i++) {
        if (abs(a[i].y) > 0.0001) {
          curve._linear = false;
          return;
        }
      }
      curve._linear = true;
    })(this);

    this._t1 = 0;
    this._t2 = 1;
    this.update();
  };

  var svgToBeziers = require("./svg-to-beziers");

  /**
   * turn an svg <path> d attribute into a sequence of Bezier segments.
   */
  Bezier.SVGtoBeziers = function(d) {
    return svgToBeziers(Bezier, d);
  };

  function getABC(n, S, B, E, t) {
    if (typeof t === "undefined") {
      t = 0.5;
    }
    var u = utils.projectionratio(t, n),
      um = 1 - u,
      C = {
        x: u * S.x + um * E.x,
        y: u * S.y + um * E.y
      },
      s = utils.abcratio(t, n),
      A = {
        x: B.x + (B.x - C.x) / s,
        y: B.y + (B.y - C.y) / s
      };
    return { A: A, B: B, C: C };
  }

  Bezier.quadraticFromPoints = function(p1, p2, p3, t) {
    if (typeof t === "undefined") {
      t = 0.5;
    }
    // shortcuts, although they're really dumb
    if (t === 0) {
      return new Bezier(p2, p2, p3);
    }
    if (t === 1) {
      return new Bezier(p1, p2, p2);
    }
    // real fitting.
    var abc = getABC(2, p1, p2, p3, t);
    return new Bezier(p1, abc.A, p3);
  };

  Bezier.cubicFromPoints = function(S, B, E, t, d1) {
    if (typeof t === "undefined") {
      t = 0.5;
    }
    var abc = getABC(3, S, B, E, t);
    if (typeof d1 === "undefined") {
      d1 = utils.dist(B, abc.C);
    }
    var d2 = d1 * (1 - t) / t;

    var selen = utils.dist(S, E),
      lx = (E.x - S.x) / selen,
      ly = (E.y - S.y) / selen,
      bx1 = d1 * lx,
      by1 = d1 * ly,
      bx2 = d2 * lx,
      by2 = d2 * ly;
    // derivation of new hull coordinates
    var e1 = { x: B.x - bx1, y: B.y - by1 },
      e2 = { x: B.x + bx2, y: B.y + by2 },
      A = abc.A,
      v1 = { x: A.x + (e1.x - A.x) / (1 - t), y: A.y + (e1.y - A.y) / (1 - t) },
      v2 = { x: A.x + (e2.x - A.x) / t, y: A.y + (e2.y - A.y) / t },
      nc1 = { x: S.x + (v1.x - S.x) / t, y: S.y + (v1.y - S.y) / t },
      nc2 = {
        x: E.x + (v2.x - E.x) / (1 - t),
        y: E.y + (v2.y - E.y) / (1 - t)
      };
    // ...done
    return new Bezier(S, nc1, nc2, E);
  };

  var getUtils = function() {
    return utils;
  };

  Bezier.getUtils = getUtils;

  Bezier.PolyBezier = PolyBezier;

  Bezier.prototype = {
    getUtils: getUtils,
    valueOf: function() {
      return this.toString();
    },
    toString: function() {
      return utils.pointsToString(this.points);
    },
    toSVG: function(relative) {
      if (this._3d) return false;
      var p = this.points,
        x = p[0].x,
        y = p[0].y,
        s = ["M", x, y, this.order === 2 ? "Q" : "C"];
      for (var i = 1, last = p.length; i < last; i++) {
        s.push(p[i].x);
        s.push(p[i].y);
      }
      return s.join(" ");
    },
    setRatios: function(ratios) {
      if (ratios.length !== this.points.length) {
        throw new Error("incorrect number of ratio values");
      }
      this.ratios = ratios;
      this._lut = []; //  invalidate any precomputed LUT
    },
    verify: function() {
      var print = this.coordDigest();
      if (print !== this._print) {
        this._print = print;
        this.update();
      }
    },
    coordDigest: function() {
      return this.points.map(function(c,pos) {
        return '' + pos + c.x + c.y + (c.z?c.z:0);
      }).join('');
    },
    update: function(newprint) {
      // invalidate any precomputed LUT
      this._lut = [];
      this.dpoints = utils.derive(this.points, this._3d);
      this.computedirection();
    },
    computedirection: function() {
      var points = this.points;
      var angle = utils.angle(points[0], points[this.order], points[1]);
      this.clockwise = angle > 0;
    },
    length: function() {
      return utils.length(this.derivative.bind(this));
    },
    _lut: [],
    getLUT: function(steps) {
      this.verify();
      steps = steps || 100;
      if (this._lut.length === steps) {
        return this._lut;
      }
      this._lut = [];
      // We want a range from 0 to 1 inclusive, so
      // we decrement and then use <= rather than <:
      steps--;
      for (var t = 0; t <= steps; t++) {
        this._lut.push(this.compute(t / steps));
      }
      return this._lut;
    },
    on: function(point, error) {
      error = error || 5;
      var lut = this.getLUT(),
        hits = [],
        c,
        t = 0;
      for (var i = 0; i < lut.length; i++) {
        c = lut[i];
        if (utils.dist(c, point) < error) {
          hits.push(c);
          t += i / lut.length;
        }
      }
      if (!hits.length) return false;
      return (t /= hits.length);
    },
    project: function(point) {
      // step 1: coarse check
      var LUT = this.getLUT(),
        l = LUT.length - 1,
        closest = utils.closest(LUT, point),
        mdist = closest.mdist,
        mpos = closest.mpos;

      // step 2: fine check
      var ft,
        t,
        p,
        d,
        t1 = (mpos - 1) / l,
        t2 = (mpos + 1) / l,
        step = 0.1 / l;
      mdist += 1;
      for (t = t1, ft = t; t < t2 + step; t += step) {
        p = this.compute(t);
        d = utils.dist(point, p);
        if (d < mdist) {
          mdist = d;
          ft = t;
        }
      }
      p = this.compute(ft);
      p.t = ft;
      p.d = mdist;
      return p;
    },
    get: function(t) {
      return this.compute(t);
    },
    point: function(idx) {
      return this.points[idx];
    },
    compute: function(t) {
      if (this.ratios) return utils.computeWithRatios(t, this.points, this.ratios, this._3d);
      return utils.compute(t, this.points, this._3d, this.ratios);
    },
    raise: function() {
      var p = this.points,
        np = [p[0]],
        i,
        k = p.length,
        pi,
        pim;
      for (var i = 1; i < k; i++) {
        pi = p[i];
        pim = p[i - 1];
        np[i] = {
          x: (k - i) / k * pi.x + i / k * pim.x,
          y: (k - i) / k * pi.y + i / k * pim.y
        };
      }
      np[k] = p[k - 1];
      return new Bezier(np);
    },
    derivative: function(t) {
      var mt = 1 - t,
        a,
        b,
        c = 0,
        p = this.dpoints[0];
      if (this.order === 2) {
        p = [p[0], p[1], ZERO];
        a = mt;
        b = t;
      }
      if (this.order === 3) {
        a = mt * mt;
        b = mt * t * 2;
        c = t * t;
      }
      var ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y
      };
      if (this._3d) {
        ret.z = a * p[0].z + b * p[1].z + c * p[2].z;
      }
      return ret;
    },
    curvature: function(t) {
      return utils.curvature(t, this.points, this._3d);
    },
    inflections: function() {
      return utils.inflections(this.points);
    },
    normal: function(t) {
      return this._3d ? this.__normal3(t) : this.__normal2(t);
    },
    __normal2: function(t) {
      var d = this.derivative(t);
      var q = sqrt(d.x * d.x + d.y * d.y);
      return { x: -d.y / q, y: d.x / q };
    },
    __normal3: function(t) {
      // see http://stackoverflow.com/questions/25453159
      var r1 = this.derivative(t),
        r2 = this.derivative(t + 0.01),
        q1 = sqrt(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z),
        q2 = sqrt(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
      r1.x /= q1;
      r1.y /= q1;
      r1.z /= q1;
      r2.x /= q2;
      r2.y /= q2;
      r2.z /= q2;
      // cross product
      var c = {
        x: r2.y * r1.z - r2.z * r1.y,
        y: r2.z * r1.x - r2.x * r1.z,
        z: r2.x * r1.y - r2.y * r1.x
      };
      var m = sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
      c.x /= m;
      c.y /= m;
      c.z /= m;
      // rotation matrix
      var R = [
        c.x * c.x,
        c.x * c.y - c.z,
        c.x * c.z + c.y,
        c.x * c.y + c.z,
        c.y * c.y,
        c.y * c.z - c.x,
        c.x * c.z - c.y,
        c.y * c.z + c.x,
        c.z * c.z
      ];
      // normal vector:
      var n = {
        x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
        y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
        z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
      };
      return n;
    },
    hull: function(t) {
      var p = this.points,
        _p = [],
        pt,
        q = [],
        idx = 0,
        i = 0,
        l = 0;
      q[idx++] = p[0];
      q[idx++] = p[1];
      q[idx++] = p[2];
      if (this.order === 3) {
        q[idx++] = p[3];
      }
      // we lerp between all points at each iteration, until we have 1 point left.
      while (p.length > 1) {
        _p = [];
        for (i = 0, l = p.length - 1; i < l; i++) {
          pt = utils.lerp(t, p[i], p[i + 1]);
          q[idx++] = pt;
          _p.push(pt);
        }
        p = _p;
      }
      return q;
    },
    split: function(t1, t2) {
      // shortcuts
      if (t1 === 0 && !!t2) {
        return this.split(t2).left;
      }
      if (t2 === 1) {
        return this.split(t1).right;
      }

      // no shortcut: use "de Casteljau" iteration.
      var q = this.hull(t1);
      var result = {
        left:
          this.order === 2
            ? new Bezier([q[0], q[3], q[5]])
            : new Bezier([q[0], q[4], q[7], q[9]]),
        right:
          this.order === 2
            ? new Bezier([q[5], q[4], q[2]])
            : new Bezier([q[9], q[8], q[6], q[3]]),
        span: q
      };

      // make sure we bind _t1/_t2 information!
      result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
      result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
      result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
      result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);

      // if we have no t2, we're done
      if (!t2) {
        return result;
      }

      // if we have a t2, split again:
      t2 = utils.map(t2, t1, 1, 0, 1);
      var subsplit = result.right.split(t2);
      return subsplit.left;
    },
    extrema: function() {
      var dims = this.dims,
        result = {},
        roots = [],
        p,
        mfn;
      dims.forEach(
        function(dim) {
          mfn = function(v) {
            return v[dim];
          };
          p = this.dpoints[0].map(mfn);
          result[dim] = utils.droots(p);
          if (this.order === 3) {
            p = this.dpoints[1].map(mfn);
            result[dim] = result[dim].concat(utils.droots(p));
          }
          result[dim] = result[dim].filter(function(t) {
            return t >= 0 && t <= 1;
          });
          roots = roots.concat(result[dim].sort(utils.numberSort));
        }.bind(this)
      );
      roots = roots.sort(utils.numberSort).filter(function(v, idx) {
        return roots.indexOf(v) === idx;
      });
      result.values = roots;
      return result;
    },
    bbox: function() {
      var extrema = this.extrema(),
        result = {};
      this.dims.forEach(
        function(d) {
          result[d] = utils.getminmax(this, d, extrema[d]);
        }.bind(this)
      );
      return result;
    },
    overlaps: function(curve) {
      var lbbox = this.bbox(),
        tbbox = curve.bbox();
      return utils.bboxoverlap(lbbox, tbbox);
    },
    offset: function(t, d) {
      if (typeof d !== "undefined") {
        var c = this.get(t);
        var n = this.normal(t);
        var ret = {
          c: c,
          n: n,
          x: c.x + n.x * d,
          y: c.y + n.y * d
        };
        if (this._3d) {
          ret.z = c.z + n.z * d;
        }
        return ret;
      }
      if (this._linear) {
        var nv = this.normal(0);
        var coords = this.points.map(function(p) {
          var ret = {
            x: p.x + t * nv.x,
            y: p.y + t * nv.y
          };
          if (p.z && n.z) {
            ret.z = p.z + t * nv.z;
          }
          return ret;
        });
        return [new Bezier(coords)];
      }
      var reduced = this.reduce();
      return reduced.map(function(s) {
        if (s._linear) {
          return s.offset(t)[0];
        }
        return s.scale(t);
      });
    },
    simple: function() {
      if (this.order === 3) {
        var a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
        var a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
        if ((a1 > 0 && a2 < 0) || (a1 < 0 && a2 > 0)) return false;
      }
      var n1 = this.normal(0);
      var n2 = this.normal(1);
      var s = n1.x * n2.x + n1.y * n2.y;
      if (this._3d) {
        s += n1.z * n2.z;
      }
      var angle = abs(acos(s));
      return angle < pi / 3;
    },
    reduce: function() {
      var i,
        t1 = 0,
        t2 = 0,
        step = 0.01,
        segment,
        pass1 = [],
        pass2 = [];
      // first pass: split on extrema
      var extrema = this.extrema().values;
      if (extrema.indexOf(0) === -1) {
        extrema = [0].concat(extrema);
      }
      if (extrema.indexOf(1) === -1) {
        extrema.push(1);
      }

      for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
        t2 = extrema[i];
        segment = this.split(t1, t2);
        segment._t1 = t1;
        segment._t2 = t2;
        pass1.push(segment);
        t1 = t2;
      }

      // second pass: further reduce these segments to simple segments
      pass1.forEach(function(p1) {
        t1 = 0;
        t2 = 0;
        while (t2 <= 1) {
          for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
            segment = p1.split(t1, t2);
            if (!segment.simple()) {
              t2 -= step;
              if (abs(t1 - t2) < step) {
                // we can never form a reduction
                return [];
              }
              segment = p1.split(t1, t2);
              segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
              segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
              pass2.push(segment);
              t1 = t2;
              break;
            }
          }
        }
        if (t1 < 1) {
          segment = p1.split(t1, 1);
          segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
          segment._t2 = p1._t2;
          pass2.push(segment);
        }
      });
      return pass2;
    },
    scale: function(d) {
      var order = this.order;
      var distanceFn = false;
      if (typeof d === "function") {
        distanceFn = d;
      }
      if (distanceFn && order === 2) {
        return this.raise().scale(distanceFn);
      }

      // TODO: add special handling for degenerate (=linear) curves.
      var clockwise = this.clockwise;
      var r1 = distanceFn ? distanceFn(0) : d;
      var r2 = distanceFn ? distanceFn(1) : d;
      var v = [this.offset(0, 10), this.offset(1, 10)];
      var o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
      if (!o) {
        throw new Error("cannot scale this curve. Try reducing it first.");
      }
      // move all points by distance 'd' wrt the origin 'o'
      var points = this.points,
        np = [];

      // move end points by fixed distance along normal.
      [0, 1].forEach(
        function(t) {
          var p = (np[t * order] = utils.copy(points[t * order]));
          p.x += (t ? r2 : r1) * v[t].n.x;
          p.y += (t ? r2 : r1) * v[t].n.y;
        }.bind(this)
      );

      if (!distanceFn) {
        // move control points to lie on the intersection of the offset
        // derivative vector, and the origin-through-control vector
        [0, 1].forEach(
          function(t) {
            if (this.order === 2 && !!t) return;
            var p = np[t * order];
            var d = this.derivative(t);
            var p2 = { x: p.x + d.x, y: p.y + d.y };
            np[t + 1] = utils.lli4(p, p2, o, points[t + 1]);
          }.bind(this)
        );
        return new Bezier(np);
      }

      // move control points by "however much necessary to
      // ensure the correct tangent to endpoint".
      [0, 1].forEach(
        function(t) {
          if (this.order === 2 && !!t) return;
          var p = points[t + 1];
          var ov = {
            x: p.x - o.x,
            y: p.y - o.y
          };
          var rc = distanceFn ? distanceFn((t + 1) / order) : d;
          if (distanceFn && !clockwise) rc = -rc;
          var m = sqrt(ov.x * ov.x + ov.y * ov.y);
          ov.x /= m;
          ov.y /= m;
          np[t + 1] = {
            x: p.x + rc * ov.x,
            y: p.y + rc * ov.y
          };
        }.bind(this)
      );
      return new Bezier(np);
    },
    outline: function(d1, d2, d3, d4) {
      d2 = typeof d2 === "undefined" ? d1 : d2;
      var reduced = this.reduce(),
        len = reduced.length,
        fcurves = [],
        bcurves = [],
        p,
        alen = 0,
        tlen = this.length();

      var graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";

      function linearDistanceFunction(s, e, tlen, alen, slen) {
        return function(v) {
          var f1 = alen / tlen,
            f2 = (alen + slen) / tlen,
            d = e - s;
          return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
        };
      }

      // form curve oulines
      reduced.forEach(function(segment) {
        slen = segment.length();
        if (graduated) {
          fcurves.push(
            segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen))
          );
          bcurves.push(
            segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen))
          );
        } else {
          fcurves.push(segment.scale(d1));
          bcurves.push(segment.scale(-d2));
        }
        alen += slen;
      });

      // reverse the "return" outline
      bcurves = bcurves
        .map(function(s) {
          p = s.points;
          if (p[3]) {
            s.points = [p[3], p[2], p[1], p[0]];
          } else {
            s.points = [p[2], p[1], p[0]];
          }
          return s;
        })
        .reverse();

      // form the endcaps as lines
      var fs = fcurves[0].points[0],
        fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1],
        bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1],
        be = bcurves[0].points[0],
        ls = utils.makeline(bs, fs),
        le = utils.makeline(fe, be),
        segments = [ls]
          .concat(fcurves)
          .concat([le])
          .concat(bcurves),
        slen = segments.length;

      return new PolyBezier(segments);
    },
    outlineshapes: function(d1, d2, curveIntersectionThreshold) {
      d2 = d2 || d1;
      var outline = this.outline(d1, d2).curves;
      var shapes = [];
      for (var i = 1, len = outline.length; i < len / 2; i++) {
        var shape = utils.makeshape(
          outline[i],
          outline[len - i],
          curveIntersectionThreshold
        );
        shape.startcap.virtual = i > 1;
        shape.endcap.virtual = i < len / 2 - 1;
        shapes.push(shape);
      }
      return shapes;
    },
    intersects: function(curve, curveIntersectionThreshold) {
      if (!curve) return this.selfintersects(curveIntersectionThreshold);
      if (curve.p1 && curve.p2) {
        return this.lineIntersects(curve);
      }
      if (curve instanceof Bezier) {
        curve = curve.reduce();
      }
      return this.curveintersects(
        this.reduce(),
        curve,
        curveIntersectionThreshold
      );
    },
    lineIntersects: function(line) {
      var mx = min(line.p1.x, line.p2.x),
        my = min(line.p1.y, line.p2.y),
        MX = max(line.p1.x, line.p2.x),
        MY = max(line.p1.y, line.p2.y),
        self = this;
      return utils.roots(this.points, line).filter(function(t) {
        var p = self.get(t);
        return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
      });
    },
    selfintersects: function(curveIntersectionThreshold) {
      var reduced = this.reduce();
      // "simple" curves cannot intersect with their direct
      // neighbour, so for each segment X we check whether
      // it intersects [0:x-2][x+2:last].
      var i,
        len = reduced.length - 2,
        results = [],
        result,
        left,
        right;
      for (i = 0; i < len; i++) {
        left = reduced.slice(i, i + 1);
        right = reduced.slice(i + 2);
        result = this.curveintersects(left, right, curveIntersectionThreshold);
        results = results.concat(result);
      }
      return results;
    },
    curveintersects: function(c1, c2, curveIntersectionThreshold) {
      var pairs = [];
      // step 1: pair off any overlapping segments
      c1.forEach(function(l) {
        c2.forEach(function(r) {
          if (l.overlaps(r)) {
            pairs.push({ left: l, right: r });
          }
        });
      });
      // step 2: for each pairing, run through the convergence algorithm.
      var intersections = [];
      pairs.forEach(function(pair) {
        var result = utils.pairiteration(
          pair.left,
          pair.right,
          curveIntersectionThreshold
        );
        if (result.length > 0) {
          intersections = intersections.concat(result);
        }
      });
      return intersections;
    },
    arcs: function(errorThreshold) {
      errorThreshold = errorThreshold || 0.5;
      var circles = [];
      return this._iterate(errorThreshold, circles);
    },
    _error: function(pc, np1, s, e) {
      var q = (e - s) / 4,
        c1 = this.get(s + q),
        c2 = this.get(e - q),
        ref = utils.dist(pc, np1),
        d1 = utils.dist(pc, c1),
        d2 = utils.dist(pc, c2);
      return abs(d1 - ref) + abs(d2 - ref);
    },
    _iterate: function(errorThreshold, circles) {
      var t_s = 0,
        t_e = 1,
        safety;
      // we do a binary search to find the "good `t` closest to no-longer-good"
      do {
        safety = 0;

        // step 1: start with the maximum possible arc
        t_e = 1;

        // points:
        var np1 = this.get(t_s),
          np2,
          np3,
          arc,
          prev_arc;

        // booleans:
        var curr_good = false,
          prev_good = false,
          done;

        // numbers:
        var t_m = t_e,
          prev_e = 1,
          step = 0;

        // step 2: find the best possible arc
        do {
          prev_good = curr_good;
          prev_arc = arc;
          t_m = (t_s + t_e) / 2;
          step++;

          np2 = this.get(t_m);
          np3 = this.get(t_e);

          arc = utils.getccenter(np1, np2, np3);

          //also save the t values
          arc.interval = {
            start: t_s,
            end: t_e
          };

          var error = this._error(arc, np1, t_s, t_e);
          curr_good = error <= errorThreshold;

          done = prev_good && !curr_good;
          if (!done) prev_e = t_e;

          // this arc is fine: we can move 'e' up to see if we can find a wider arc
          if (curr_good) {
            // if e is already at max, then we're done for this arc.
            if (t_e >= 1) {
              // make sure we cap at t=1
              arc.interval.end = prev_e = 1;
              prev_arc = arc;
              // if we capped the arc segment to t=1 we also need to make sure that
              // the arc's end angle is correct with respect to the bezier end point.
              if (t_e > 1) {
                var d = {
                  x: arc.x + arc.r * cos(arc.e),
                  y: arc.y + arc.r * sin(arc.e)
                };
                arc.e += utils.angle({ x: arc.x, y: arc.y }, d, this.get(1));
              }
              break;
            }
            // if not, move it up by half the iteration distance
            t_e = t_e + (t_e - t_s) / 2;
          } else {
            // this is a bad arc: we need to move 'e' down to find a good arc
            t_e = t_m;
          }
        } while (!done && safety++ < 100);

        if (safety >= 100) {
          break;
        }

        // console.log("L835: [F] arc found", t_s, prev_e, prev_arc.x, prev_arc.y, prev_arc.s, prev_arc.e);

        prev_arc = prev_arc ? prev_arc : arc;
        circles.push(prev_arc);
        t_s = prev_e;
      } while (t_e < 1);
      return circles;
    }
  };

  module.exports = Bezier;
})();

},{"./poly-bezier.js":6,"./svg-to-beziers":7,"./utils.js":8}],5:[function(require,module,exports){
/**
 * Normalise an SVG path to absolute coordinates
 * and full commands, rather than relative coordinates
 * and/or shortcut commands.
 */
function normalizePath(d) {
  // preprocess "d" so that we have spaces between values
  d = d
    .replace(/,/g, " ") // replace commas with spaces
    .replace(/-/g, " - ") // add spacing around minus signs
    .replace(/-\s+/g, "-") // remove spacing to the right of minus signs.
    .replace(/([a-zA-Z])/g, " $1 ");

  // set up the variables used in this function
  var instructions = d.replace(/([a-zA-Z])\s?/g, "|$1").split("|"),
    instructionLength = instructions.length,
    i,
    instruction,
    op,
    lop,
    args = [],
    alen,
    a,
    sx = 0,
    sy = 0,
    x = 0,
    y = 0,
    cx = 0,
    cy = 0,
    cx2 = 0,
    cy2 = 0,
    normalized = "";

  // we run through the instruction list starting at 1, not 0,
  // because we split up "|M x y ...." so the first element will
  // always be an empty string. By design.
  for (i = 1; i < instructionLength; i++) {
    // which instruction is this?
    instruction = instructions[i];
    op = instruction.substring(0, 1);
    lop = op.toLowerCase();

    // what are the arguments? note that we need to convert
    // all strings into numbers, or + will do silly things.
    args = instruction
      .replace(op, "")
      .trim()
      .split(" ");
    args = args
      .filter(function(v) {
        return v !== "";
      })
      .map(parseFloat);
    alen = args.length;

    // we could use a switch, but elaborate code in a "case" with
    // fallthrough is just horrid to read. So let's use ifthen
    // statements instead.

    // moveto command (plus possible lineto)
    if (lop === "m") {
      normalized += "M ";
      if (op === "m") {
        x += args[0];
        y += args[1];
      } else {
        x = args[0];
        y = args[1];
      }
      // records start position, for dealing
      // with the shape close operator ('Z')
      sx = x;
      sy = y;
      normalized += x + " " + y + " ";
      if (alen > 2) {
        for (a = 0; a < alen; a += 2) {
          if (op === "m") {
            x += args[a];
            y += args[a + 1];
          } else {
            x = args[a];
            y = args[a + 1];
          }
          normalized += ["L",x,y,''].join(" ");
        }
      }
    } else if (lop === "l") {
      // lineto commands
      for (a = 0; a < alen; a += 2) {
        if (op === "l") {
          x += args[a];
          y += args[a + 1];
        } else {
          x = args[a];
          y = args[a + 1];
        }
        normalized += ["L",x,y,''].join(" ");
      }
    } else if (lop === "h") {
      for (a = 0; a < alen; a++) {
        if (op === "h") {
          x += args[a];
        } else {
          x = args[a];
        }
        normalized += ["L",x,y,''].join(" ");
      }
    } else if (lop === "v") {
      for (a = 0; a < alen; a++) {
        if (op === "v") {
          y += args[a];
        } else {
          y = args[a];
        }
        normalized += ["L",x,y,''].join(" ");
      }
    } else if (lop === "q") {
      // quadratic curveto commands
      for (a = 0; a < alen; a += 4) {
        if (op === "q") {
          cx = x + args[a];
          cy = y + args[a + 1];
          x += args[a + 2];
          y += args[a + 3];
        } else {
          cx = args[a];
          cy = args[a + 1];
          x = args[a + 2];
          y = args[a + 3];
        }
        normalized += ["Q",cx,cy,x,y,''].join(" ");
      }
    } else if (lop === "t") {
      for (a = 0; a < alen; a += 2) {
        // reflect previous cx/cy over x/y
        cx = x + (x - cx);
        cy = y + (y - cy);
        // then get real end point
        if (op === "t") {
          x += args[a];
          y += args[a + 1];
        } else {
          x = args[a];
          y = args[a + 1];
        }
        normalized += ["Q",cx,cy,x,y,''].join(" ");
      }
    } else if (lop === "c") {
      // cubic curveto commands
      for (a = 0; a < alen; a += 6) {
        if (op === "c") {
          cx = x + args[a];
          cy = y + args[a + 1];
          cx2 = x + args[a + 2];
          cy2 = y + args[a + 3];
          x += args[a + 4];
          y += args[a + 5];
        } else {
          cx = args[a];
          cy = args[a + 1];
          cx2 = args[a + 2];
          cy2 = args[a + 3];
          x = args[a + 4];
          y = args[a + 5];
        }
        normalized += ["C",cx,cy,cx2,cy2,x,y,''].join(" ");
      }
    } else if (lop === "s") {
      for (a = 0; a < alen; a += 4) {
        // reflect previous cx2/cy2 over x/y
        cx = x + (x - cx2);
        cy = y + (y - cy2);
        // then get real control and end point
        if (op === "s") {
          cx2 = x + args[a];
          cy2 = y + args[a + 1];
          x += args[a + 2];
          y += args[a + 3];
        } else {
          cx2 = args[a];
          cy2 = args[a + 1];
          x = args[a + 2];
          y = args[a + 3];
        }
        normalized +=["C",cx,cy,cx2,cy2,x,y,''].join(" ");
      }
    } else if (lop === "z") {
      normalized += "Z ";
      // not unimportant: path closing changes the current x/y coordinate
      x = sx;
      y = sy;
    }
  }
  return normalized.trim();
}

module.exports = normalizePath;

},{}],6:[function(require,module,exports){
(function() {
  "use strict";

  var utils = require("./utils.js");

  /**
   * Poly Bezier
   * @param {[type]} curves [description]
   */
  var PolyBezier = function(curves) {
    this.curves = [];
    this._3d = false;
    if (!!curves) {
      this.curves = curves;
      this._3d = this.curves[0]._3d;
    }
  };

  PolyBezier.prototype = {
    valueOf: function() {
      return this.toString();
    },
    toString: function() {
      return (
        "[" +
        this.curves
          .map(function(curve) {
            return utils.pointsToString(curve.points);
          })
          .join(", ") +
        "]"
      );
    },
    addCurve: function(curve) {
      this.curves.push(curve);
      this._3d = this._3d || curve._3d;
    },
    length: function() {
      return this.curves
        .map(function(v) {
          return v.length();
        })
        .reduce(function(a, b) {
          return a + b;
        });
    },
    curve: function(idx) {
      return this.curves[idx];
    },
    bbox: function() {
      var c = this.curves;
      var bbox = c[0].bbox();
      for (var i = 1; i < c.length; i++) {
        utils.expandbox(bbox, c[i].bbox());
      }
      return bbox;
    },
    offset: function(d) {
      var offset = [];
      this.curves.forEach(function(v) {
        offset = offset.concat(v.offset(d));
      });
      return new PolyBezier(offset);
    }
  };

  module.exports = PolyBezier;
})();

},{"./utils.js":8}],7:[function(require,module,exports){
var normalise = require("./normalise-svg.js");

var M = { x: false, y: false };

function makeBezier(Bezier, term, values) {
  if (term === 'Z') return;
  if (term === 'M') {
    M = {x: values[0], y: values[1]};
    return;
  }
  // ES7: new Bezier(M.x, M.y, ...values)
  var cvalues = [false, M.x, M.y].concat(values);
  var PreboundConstructor = Bezier.bind.apply(Bezier, cvalues)
  var curve = new PreboundConstructor();
  var last = values.slice(-2);
  M = { x : last[0], y: last[1] };
  return curve;
}

function convertPath(Bezier, d) {
  var terms = normalise(d).split(" "),
    term,
    matcher = new RegExp("[MLCQZ]", ""),
    segment,
    values,
    segments = [],
    ARGS = { "C": 6, "Q": 4, "L": 2, "M": 2};

  while (terms.length) {
    term = terms.splice(0,1)[0];
    if (matcher.test(term)) {
      values = terms.splice(0, ARGS[term]).map(parseFloat);
      segment = makeBezier(Bezier, term, values);
      if (segment) segments.push(segment);
    }
  }

  return new Bezier.PolyBezier(segments);
}

module.exports = convertPath;

},{"./normalise-svg.js":5}],8:[function(require,module,exports){
(function() {
  "use strict";

  // math-inlining.
  var abs = Math.abs,
    cos = Math.cos,
    sin = Math.sin,
    acos = Math.acos,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    pow = Math.pow,
    // cube root function yielding real roots
    crt = function(v) {
      return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
    },
    // trig constants
    pi = Math.PI,
    tau = 2 * pi,
    quart = pi / 2,
    // float precision significant decimal
    epsilon = 0.000001,
    // extremas used in bbox calculation and similar algorithms
    nMax = Number.MAX_SAFE_INTEGER || 9007199254740991,
    nMin = Number.MIN_SAFE_INTEGER || -9007199254740991,
    // a zero coordinate, which is surprisingly useful
    ZERO = { x: 0, y: 0, z: 0 };

  // Bezier utility functions
  var utils = {
    // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
    Tvalues: [
      -0.0640568928626056260850430826247450385909,
      0.0640568928626056260850430826247450385909,
      -0.1911188674736163091586398207570696318404,
      0.1911188674736163091586398207570696318404,
      -0.3150426796961633743867932913198102407864,
      0.3150426796961633743867932913198102407864,
      -0.4337935076260451384870842319133497124524,
      0.4337935076260451384870842319133497124524,
      -0.5454214713888395356583756172183723700107,
      0.5454214713888395356583756172183723700107,
      -0.6480936519369755692524957869107476266696,
      0.6480936519369755692524957869107476266696,
      -0.7401241915785543642438281030999784255232,
      0.7401241915785543642438281030999784255232,
      -0.8200019859739029219539498726697452080761,
      0.8200019859739029219539498726697452080761,
      -0.8864155270044010342131543419821967550873,
      0.8864155270044010342131543419821967550873,
      -0.9382745520027327585236490017087214496548,
      0.9382745520027327585236490017087214496548,
      -0.9747285559713094981983919930081690617411,
      0.9747285559713094981983919930081690617411,
      -0.9951872199970213601799974097007368118745,
      0.9951872199970213601799974097007368118745
    ],

    // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
    Cvalues: [
      0.1279381953467521569740561652246953718517,
      0.1279381953467521569740561652246953718517,
      0.1258374563468282961213753825111836887264,
      0.1258374563468282961213753825111836887264,
      0.121670472927803391204463153476262425607,
      0.121670472927803391204463153476262425607,
      0.1155056680537256013533444839067835598622,
      0.1155056680537256013533444839067835598622,
      0.1074442701159656347825773424466062227946,
      0.1074442701159656347825773424466062227946,
      0.0976186521041138882698806644642471544279,
      0.0976186521041138882698806644642471544279,
      0.086190161531953275917185202983742667185,
      0.086190161531953275917185202983742667185,
      0.0733464814110803057340336152531165181193,
      0.0733464814110803057340336152531165181193,
      0.0592985849154367807463677585001085845412,
      0.0592985849154367807463677585001085845412,
      0.0442774388174198061686027482113382288593,
      0.0442774388174198061686027482113382288593,
      0.0285313886289336631813078159518782864491,
      0.0285313886289336631813078159518782864491,
      0.0123412297999871995468056670700372915759,
      0.0123412297999871995468056670700372915759
    ],

    arcfn: function(t, derivativeFn) {
      var d = derivativeFn(t);
      var l = d.x * d.x + d.y * d.y;
      if (typeof d.z !== "undefined") {
        l += d.z * d.z;
      }
      return sqrt(l);
    },

    compute: function(t, points, _3d) {
      // shortcuts
      if (t === 0) {
        return points[0];
      }

      var order = points.length-1;

      if (t === 1) {
        return points[order];
      }

      var p = points;
      var mt = 1 - t;

      // constant?
      if (order === 0) {
        return points[0];
      }

      // linear?
      if (order === 1) {
        ret = {
          x: mt * p[0].x + t * p[1].x,
          y: mt * p[0].y + t * p[1].y
        };
        if (_3d) {
          ret.z = mt * p[0].z + t * p[1].z;
        }
        return ret;
      }

      // quadratic/cubic curve?
      if (order < 4) {
        var mt2 = mt * mt,
          t2 = t * t,
          a,
          b,
          c,
          d = 0;
        if (order === 2) {
          p = [p[0], p[1], p[2], ZERO];
          a = mt2;
          b = mt * t * 2;
          c = t2;
        } else if (order === 3) {
          a = mt2 * mt;
          b = mt2 * t * 3;
          c = mt * t2 * 3;
          d = t * t2;
        }
        var ret = {
          x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
          y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y
        };
        if (_3d) {
          ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
        }
        return ret;
      }

      // higher order curves: use de Casteljau's computation
      var dCpts = JSON.parse(JSON.stringify(points));
      while (dCpts.length > 1) {
        for (var i = 0; i < dCpts.length - 1; i++) {
          dCpts[i] = {
            x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t,
            y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t
          };
          if (typeof dCpts[i].z !== "undefined") {
            dCpts[i] = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t;
          }
        }
        dCpts.splice(dCpts.length - 1, 1);
      }
      return dCpts[0];
    },

    computeWithRatios: function (t, points, ratios, _3d) {
      var mt = 1 - t, r = ratios, p = points, d;
      var f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3];

      // spec for linear
      f1 *= mt;
      f2 *= t;

      if (p.length === 2) {
        d = f1 + f2;
        return {
          x: (f1 * p[0].x + f2 * p[1].x)/d,
          y: (f1 * p[0].y + f2 * p[1].y)/d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z)/d
        };
      }

      // upgrade to quadratic
      f1 *= mt;
      f2 *= 2 * mt;
      f3 *= t * t;

      if (p.length === 3) {
        d = f1 + f2 + f3;
        return {
          x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x)/d,
          y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y)/d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z)/d
        };
      }

      // upgrade to cubic
      f1 *= mt;
      f2 *= 1.5 * mt;
      f3 *= 3 * mt;
      f4 *= t * t * t;

      if (p.length === 4) {
        d = f1 + f2 + f3 + f4;
        return {
          x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x)/d,
          y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y)/d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z)/d
        };
      }
    },

    derive: function (points, _3d) {
      var dpoints = [];
      for (var p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
        var list = [];
        for (var j = 0, dpt; j < c; j++) {
          dpt = {
            x: c * (p[j + 1].x - p[j].x),
            y: c * (p[j + 1].y - p[j].y)
          };
          if (_3d) {
            dpt.z = c * (p[j + 1].z - p[j].z);
          }
          list.push(dpt);
        }
        dpoints.push(list);
        p = list;
      }
      return dpoints;
    },

    between: function(v, m, M) {
      return (
        (m <= v && v <= M) ||
        utils.approximately(v, m) ||
        utils.approximately(v, M)
      );
    },

    approximately: function(a, b, precision) {
      return abs(a - b) <= (precision || epsilon);
    },

    length: function(derivativeFn) {
      var z = 0.5,
        sum = 0,
        len = utils.Tvalues.length,
        i,
        t;
      for (i = 0; i < len; i++) {
        t = z * utils.Tvalues[i] + z;
        sum += utils.Cvalues[i] * utils.arcfn(t, derivativeFn);
      }
      return z * sum;
    },

    map: function(v, ds, de, ts, te) {
      var d1 = de - ds,
        d2 = te - ts,
        v2 = v - ds,
        r = v2 / d1;
      return ts + d2 * r;
    },

    lerp: function(r, v1, v2) {
      var ret = {
        x: v1.x + r * (v2.x - v1.x),
        y: v1.y + r * (v2.y - v1.y)
      };
      if (!!v1.z && !!v2.z) {
        ret.z = v1.z + r * (v2.z - v1.z);
      }
      return ret;
    },

    pointToString: function(p) {
      var s = p.x + "/" + p.y;
      if (typeof p.z !== "undefined") {
        s += "/" + p.z;
      }
      return s;
    },

    pointsToString: function(points) {
      return "[" + points.map(utils.pointToString).join(", ") + "]";
    },

    copy: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    angle: function(o, v1, v2) {
      var dx1 = v1.x - o.x,
        dy1 = v1.y - o.y,
        dx2 = v2.x - o.x,
        dy2 = v2.y - o.y,
        cross = dx1 * dy2 - dy1 * dx2,
        dot = dx1 * dx2 + dy1 * dy2;
      return atan2(cross, dot);
    },

    // round as string, to avoid rounding errors
    round: function(v, d) {
      var s = "" + v;
      var pos = s.indexOf(".");
      return parseFloat(s.substring(0, pos + 1 + d));
    },

    dist: function(p1, p2) {
      var dx = p1.x - p2.x,
        dy = p1.y - p2.y;
      return sqrt(dx * dx + dy * dy);
    },

    closest: function(LUT, point) {
      var mdist = pow(2, 63),
        mpos,
        d;
      LUT.forEach(function(p, idx) {
        d = utils.dist(point, p);
        if (d < mdist) {
          mdist = d;
          mpos = idx;
        }
      });
      return { mdist: mdist, mpos: mpos };
    },

    abcratio: function(t, n) {
      // see ratio(t) note on http://pomax.github.io/bezierinfo/#abc
      if (n !== 2 && n !== 3) {
        return false;
      }
      if (typeof t === "undefined") {
        t = 0.5;
      } else if (t === 0 || t === 1) {
        return t;
      }
      var bottom = pow(t, n) + pow(1 - t, n),
        top = bottom - 1;
      return abs(top / bottom);
    },

    projectionratio: function(t, n) {
      // see u(t) note on http://pomax.github.io/bezierinfo/#abc
      if (n !== 2 && n !== 3) {
        return false;
      }
      if (typeof t === "undefined") {
        t = 0.5;
      } else if (t === 0 || t === 1) {
        return t;
      }
      var top = pow(1 - t, n),
        bottom = pow(t, n) + top;
      return top / bottom;
    },

    lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
      var nx =
          (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
        ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
        d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (d == 0) {
        return false;
      }
      return { x: nx / d, y: ny / d };
    },

    lli4: function(p1, p2, p3, p4) {
      var x1 = p1.x,
        y1 = p1.y,
        x2 = p2.x,
        y2 = p2.y,
        x3 = p3.x,
        y3 = p3.y,
        x4 = p4.x,
        y4 = p4.y;
      return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
    },

    lli: function(v1, v2) {
      return utils.lli4(v1, v1.c, v2, v2.c);
    },

    makeline: function(p1, p2) {
      var Bezier = require("./bezier");
      var x1 = p1.x,
        y1 = p1.y,
        x2 = p2.x,
        y2 = p2.y,
        dx = (x2 - x1) / 3,
        dy = (y2 - y1) / 3;
      return new Bezier(
        x1,
        y1,
        x1 + dx,
        y1 + dy,
        x1 + 2 * dx,
        y1 + 2 * dy,
        x2,
        y2
      );
    },

    findbbox: function(sections) {
      var mx = nMax,
        my = nMax,
        MX = nMin,
        MY = nMin;
      sections.forEach(function(s) {
        var bbox = s.bbox();
        if (mx > bbox.x.min) mx = bbox.x.min;
        if (my > bbox.y.min) my = bbox.y.min;
        if (MX < bbox.x.max) MX = bbox.x.max;
        if (MY < bbox.y.max) MY = bbox.y.max;
      });
      return {
        x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
        y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
      };
    },

    shapeintersections: function(
      s1,
      bbox1,
      s2,
      bbox2,
      curveIntersectionThreshold
    ) {
      if (!utils.bboxoverlap(bbox1, bbox2)) return [];
      var intersections = [];
      var a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
      var a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
      a1.forEach(function(l1) {
        if (l1.virtual) return;
        a2.forEach(function(l2) {
          if (l2.virtual) return;
          var iss = l1.intersects(l2, curveIntersectionThreshold);
          if (iss.length > 0) {
            iss.c1 = l1;
            iss.c2 = l2;
            iss.s1 = s1;
            iss.s2 = s2;
            intersections.push(iss);
          }
        });
      });
      return intersections;
    },

    makeshape: function(forward, back, curveIntersectionThreshold) {
      var bpl = back.points.length;
      var fpl = forward.points.length;
      var start = utils.makeline(back.points[bpl - 1], forward.points[0]);
      var end = utils.makeline(forward.points[fpl - 1], back.points[0]);
      var shape = {
        startcap: start,
        forward: forward,
        back: back,
        endcap: end,
        bbox: utils.findbbox([start, forward, back, end])
      };
      var self = utils;
      shape.intersections = function(s2) {
        return self.shapeintersections(
          shape,
          shape.bbox,
          s2,
          s2.bbox,
          curveIntersectionThreshold
        );
      };
      return shape;
    },

    getminmax: function(curve, d, list) {
      if (!list) return { min: 0, max: 0 };
      var min = nMax,
        max = nMin,
        t,
        c;
      if (list.indexOf(0) === -1) {
        list = [0].concat(list);
      }
      if (list.indexOf(1) === -1) {
        list.push(1);
      }
      for (var i = 0, len = list.length; i < len; i++) {
        t = list[i];
        c = curve.get(t);
        if (c[d] < min) {
          min = c[d];
        }
        if (c[d] > max) {
          max = c[d];
        }
      }
      return { min: min, mid: (min + max) / 2, max: max, size: max - min };
    },

    align: function(points, line) {
      var tx = line.p1.x,
        ty = line.p1.y,
        a = -atan2(line.p2.y - ty, line.p2.x - tx),
        d = function(v) {
          return {
            x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
            y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
          };
        };
      return points.map(d);
    },

    roots: function(points, line) {
      line = line || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
      var order = points.length - 1;
      var p = utils.align(points, line);
      var reduce = function(t) {
        return 0 <= t && t <= 1;
      };

      if (order === 2) {
        var a = p[0].y,
          b = p[1].y,
          c = p[2].y,
          d = a - 2 * b + c;
        if (d !== 0) {
          var m1 = -sqrt(b * b - a * c),
            m2 = -a + b,
            v1 = -(m1 + m2) / d,
            v2 = -(-m1 + m2) / d;
          return [v1, v2].filter(reduce);
        } else if (b !== c && d === 0) {
          return [(2*b - c)/(2*b - 2*c)].filter(reduce);
        }
        return [];
      }

      // see http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm
      var pa = p[0].y,
        pb = p[1].y,
        pc = p[2].y,
        pd = p[3].y,
        d = -pa + 3 * pb - 3 * pc + pd,
        a = 3 * pa - 6 * pb + 3 * pc,
        b = -3 * pa + 3 * pb,
        c = pa;

      if (utils.approximately(d, 0)) {
        // this is not a cubic curve.
        if (utils.approximately(a, 0)) {
          // in fact, this is not a quadratic curve either.
          if (utils.approximately(b, 0)) {
            // in fact in fact, there are no solutions.
            return [];
          }
          // linear solution:
          return [-c / b].filter(reduce);
        }
        // quadratic solution:
        var q = sqrt(b * b - 4 * a * c),
          a2 = 2 * a;
        return [(q - b) / a2, (-b - q) / a2].filter(reduce);
      }

      // at this point, we know we need a cubic solution:

      a /= d;
      b /= d;
      c /= d;

      var p = (3 * b - a * a) / 3,
        p3 = p / 3,
        q = (2 * a * a * a - 9 * a * b + 27 * c) / 27,
        q2 = q / 2,
        discriminant = q2 * q2 + p3 * p3 * p3,
        u1,
        v1,
        x1,
        x2,
        x3;
      if (discriminant < 0) {
        var mp3 = -p / 3,
          mp33 = mp3 * mp3 * mp3,
          r = sqrt(mp33),
          t = -q / (2 * r),
          cosphi = t < -1 ? -1 : t > 1 ? 1 : t,
          phi = acos(cosphi),
          crtr = crt(r),
          t1 = 2 * crtr;
        x1 = t1 * cos(phi / 3) - a / 3;
        x2 = t1 * cos((phi + tau) / 3) - a / 3;
        x3 = t1 * cos((phi + 2 * tau) / 3) - a / 3;
        return [x1, x2, x3].filter(reduce);
      } else if (discriminant === 0) {
        u1 = q2 < 0 ? crt(-q2) : -crt(q2);
        x1 = 2 * u1 - a / 3;
        x2 = -u1 - a / 3;
        return [x1, x2].filter(reduce);
      } else {
        var sd = sqrt(discriminant);
        u1 = crt(-q2 + sd);
        v1 = crt(q2 + sd);
        return [u1 - v1 - a / 3].filter(reduce);
      }
    },

    droots: function(p) {
      // quadratic roots are easy
      if (p.length === 3) {
        var a = p[0],
          b = p[1],
          c = p[2],
          d = a - 2 * b + c;
        if (d !== 0) {
          var m1 = -sqrt(b * b - a * c),
            m2 = -a + b,
            v1 = -(m1 + m2) / d,
            v2 = -(-m1 + m2) / d;
          return [v1, v2];
        } else if (b !== c && d === 0) {
          return [(2 * b - c) / (2 * (b - c))];
        }
        return [];
      }

      // linear roots are even easier
      if (p.length === 2) {
        var a = p[0],
          b = p[1];
        if (a !== b) {
          return [a / (a - b)];
        }
        return [];
      }
    },

    curvature: function(t, points, _3d, kOnly) {
      var dpoints = utils.derive(points);
      var d1 = dpoints[0];
      var d2 = dpoints[1];
      var num, dnm, adk, dk, k=0, r=0;

      //
      // We're using the following formula for curvature:
      //
      //              x'y" - y'x"
      //   k(t) = ------------------
      //           (x'² + y'²)^(3/2)
      //
      // from https://en.wikipedia.org/wiki/Radius_of_curvature#Definition
      //
      // With it corresponding 3D counterpart:
      //
      //          sqrt( (y'z" - y"z')² + (z'x" - z"x')² + (x'y" - x"y')²)
      //   k(t) = -------------------------------------------------------
      //                     (x'² + y'² + z'²)^(3/2)
      //

      var d = utils.compute(t, d1);
      var dd = utils.compute(t, d2);
      var qdsum = d.x*d.x + d.y*d.y;
      if (_3d) {
        num = sqrt(
          pow(d.y*dd.z - dd.y*d.z, 2) +
          pow(d.z*dd.x - dd.z*d.x, 2) +
          pow(d.x*dd.y - dd.x*d.y, 2)
        );
        dnm = pow(qdsum + d.z*d.z, 3/2);
      } else {
        num = d.x*dd.y - d.y*dd.x;
        dnm = pow(qdsum, 3/2);
      }

      if (num === 0 || dnm === 0) {
        return { k:0, r:0 };
      }

      k = num/dnm;
      r = dnm/num;

      // We're also computing the derivative of kappa, because
      // there is value in knowing the rate of change for the
      // curvature along the curve. And we're just going to
      // ballpark it based on an epsilon.
      if (!kOnly) {
        // compute k'(t) based on the interval before, and after it,
        // to at least try to not introduce forward/backward pass bias.
        var pk = utils.curvature(t-0.001, points, _3d, true).k;
        var nk = utils.curvature(t+0.001, points, _3d, true).k;
        dk = ((nk-k) + (k-pk))/2;
        adk = (abs(nk-k) + abs(k-pk))/2;
      }

      return { k: k, r: r, dk: dk, adk:adk, };
    },

    inflections: function(points) {
      if (points.length < 4) return [];

      // FIXME: TODO: add in inflection abstraction for quartic+ curves?

      var p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }),
        a = p[2].x * p[1].y,
        b = p[3].x * p[1].y,
        c = p[1].x * p[2].y,
        d = p[3].x * p[2].y,
        v1 = 18 * (-3 * a + 2 * b + 3 * c - d),
        v2 = 18 * (3 * a - b - 3 * c),
        v3 = 18 * (c - a);

      if (utils.approximately(v1, 0)) {
        if (!utils.approximately(v2, 0)) {
          var t = -v3 / v2;
          if (0 <= t && t <= 1) return [t];
        }
        return [];
      }

      var trm = v2 * v2 - 4 * v1 * v3,
        sq = Math.sqrt(trm),
        d = 2 * v1;

      if (utils.approximately(d, 0)) return [];

      return [(sq - v2) / d, -(v2 + sq) / d].filter(function(r) {
        return 0 <= r && r <= 1;
      });
    },

    bboxoverlap: function(b1, b2) {
      var dims = ["x", "y"],
        len = dims.length,
        i,
        dim,
        l,
        t,
        d;
      for (i = 0; i < len; i++) {
        dim = dims[i];
        l = b1[dim].mid;
        t = b2[dim].mid;
        d = (b1[dim].size + b2[dim].size) / 2;
        if (abs(l - t) >= d) return false;
      }
      return true;
    },

    expandbox: function(bbox, _bbox) {
      if (_bbox.x.min < bbox.x.min) {
        bbox.x.min = _bbox.x.min;
      }
      if (_bbox.y.min < bbox.y.min) {
        bbox.y.min = _bbox.y.min;
      }
      if (_bbox.z && _bbox.z.min < bbox.z.min) {
        bbox.z.min = _bbox.z.min;
      }
      if (_bbox.x.max > bbox.x.max) {
        bbox.x.max = _bbox.x.max;
      }
      if (_bbox.y.max > bbox.y.max) {
        bbox.y.max = _bbox.y.max;
      }
      if (_bbox.z && _bbox.z.max > bbox.z.max) {
        bbox.z.max = _bbox.z.max;
      }
      bbox.x.mid = (bbox.x.min + bbox.x.max) / 2;
      bbox.y.mid = (bbox.y.min + bbox.y.max) / 2;
      if (bbox.z) {
        bbox.z.mid = (bbox.z.min + bbox.z.max) / 2;
      }
      bbox.x.size = bbox.x.max - bbox.x.min;
      bbox.y.size = bbox.y.max - bbox.y.min;
      if (bbox.z) {
        bbox.z.size = bbox.z.max - bbox.z.min;
      }
    },

    pairiteration: function(c1, c2, curveIntersectionThreshold) {
      var c1b = c1.bbox(),
        c2b = c2.bbox(),
        r = 100000,
        threshold = curveIntersectionThreshold || 0.5;
      if (
        c1b.x.size + c1b.y.size < threshold &&
        c2b.x.size + c2b.y.size < threshold
      ) {
        return [
          ((r * (c1._t1 + c1._t2) / 2) | 0) / r +
            "/" +
            ((r * (c2._t1 + c2._t2) / 2) | 0) / r
        ];
      }
      var cc1 = c1.split(0.5),
        cc2 = c2.split(0.5),
        pairs = [
          { left: cc1.left, right: cc2.left },
          { left: cc1.left, right: cc2.right },
          { left: cc1.right, right: cc2.right },
          { left: cc1.right, right: cc2.left }
        ];
      pairs = pairs.filter(function(pair) {
        return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
      });
      var results = [];
      if (pairs.length === 0) return results;
      pairs.forEach(function(pair) {
        results = results.concat(
          utils.pairiteration(pair.left, pair.right, threshold)
        );
      });
      results = results.filter(function(v, i) {
        return results.indexOf(v) === i;
      });
      return results;
    },

    getccenter: function(p1, p2, p3) {
      var dx1 = p2.x - p1.x,
        dy1 = p2.y - p1.y,
        dx2 = p3.x - p2.x,
        dy2 = p3.y - p2.y;
      var dx1p = dx1 * cos(quart) - dy1 * sin(quart),
        dy1p = dx1 * sin(quart) + dy1 * cos(quart),
        dx2p = dx2 * cos(quart) - dy2 * sin(quart),
        dy2p = dx2 * sin(quart) + dy2 * cos(quart);
      // chord midpoints
      var mx1 = (p1.x + p2.x) / 2,
        my1 = (p1.y + p2.y) / 2,
        mx2 = (p2.x + p3.x) / 2,
        my2 = (p2.y + p3.y) / 2;
      // midpoint offsets
      var mx1n = mx1 + dx1p,
        my1n = my1 + dy1p,
        mx2n = mx2 + dx2p,
        my2n = my2 + dy2p;
      // intersection of these lines:
      var arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n),
        r = utils.dist(arc, p1),
        // arc start/end values, over mid point:
        s = atan2(p1.y - arc.y, p1.x - arc.x),
        m = atan2(p2.y - arc.y, p2.x - arc.x),
        e = atan2(p3.y - arc.y, p3.x - arc.x),
        _;
      // determine arc direction (cw/ccw correction)
      if (s < e) {
        // if s<m<e, arc(s, e)
        // if m<s<e, arc(e, s + tau)
        // if s<e<m, arc(e, s + tau)
        if (s > m || m > e) {
          s += tau;
        }
        if (s > e) {
          _ = e;
          e = s;
          s = _;
        }
      } else {
        // if e<m<s, arc(e, s)
        // if m<e<s, arc(s, e + tau)
        // if e<s<m, arc(s, e + tau)
        if (e < m && m < s) {
          _ = e;
          e = s;
          s = _;
        } else {
          e += tau;
        }
      }
      // assign and done.
      arc.s = s;
      arc.e = e;
      arc.r = r;
      return arc;
    },

    numberSort: function(a, b) {
      return a - b;
    }
  };

  module.exports = utils;
})();

},{"./bezier":4}],9:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":2,"buffer":9,"ieee754":12}],10:[function(require,module,exports){
(function (Buffer){(function (){
var clone = (function() {
'use strict';

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
*/
function clone(parent, circular, depth, prototype) {
  var filter;
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    filter = circular.filter;
    circular = circular.circular
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth == 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
};
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
};
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
};
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
};
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":9}],11:[function(require,module,exports){
/**
 * Graham's Scan Convex Hull Algorithm
 * @desc An implementation of the Graham's Scan Convex Hull algorithm in JavaScript.
 * @author Brian Barnett, brian@3kb.co.uk, http://brianbar.net/ || http://3kb.co.uk/
 * @version 1.0.5
 */
function ConvexHullGrahamScan(){this.anchorPoint=void 0,this.reverse=!1,this.points=[]}ConvexHullGrahamScan.prototype={constructor:ConvexHullGrahamScan,Point:function(a,b){this.x=a,this.y=b},_findPolarAngle:function(a,b){var c,d,e=57.295779513082;if(!a||!b)return 0;if(c=b.x-a.x,d=b.y-a.y,0==c&&0==d)return 0;var f=Math.atan2(d,c)*e;return this.reverse?0>=f&&(f+=360):f>=0&&(f+=360),f},addPoint:function(a,b){var c=void 0===this.anchorPoint||this.anchorPoint.y>b||this.anchorPoint.y===b&&this.anchorPoint.x>a;c?(void 0!==this.anchorPoint&&this.points.push(new this.Point(this.anchorPoint.x,this.anchorPoint.y)),this.anchorPoint=new this.Point(a,b)):this.points.push(new this.Point(a,b))},_sortPoints:function(){var a=this;return this.points.sort(function(b,c){var d=a._findPolarAngle(a.anchorPoint,b),e=a._findPolarAngle(a.anchorPoint,c);return e>d?-1:d>e?1:0})},_checkPoints:function(a,b,c){var d,e=this._findPolarAngle(a,b),f=this._findPolarAngle(a,c);return e>f?(d=e-f,!(d>180)):f>e?(d=f-e,d>180):!0},getHull:function(){var a,b,c=[];if(this.reverse=this.points.every(function(a){return a.x<0&&a.y<0}),a=this._sortPoints(),b=a.length,3>b)return a.unshift(this.anchorPoint),a;for(c.push(a.shift(),a.shift());;){var d,e,f;if(c.push(a.shift()),d=c[c.length-3],e=c[c.length-2],f=c[c.length-1],this._checkPoints(d,e,f)&&c.splice(c.length-2,1),0==a.length){if(b==c.length){var g=this.anchorPoint;return c=c.filter(function(a){return!!a}),c.some(function(a){return a.x==g.x&&a.y==g.y})||c.unshift(this.anchorPoint),c}a=c,b=a.length,c=[],c.push(a.shift(),a.shift())}}}},"function"==typeof define&&define.amd&&define(function(){return ConvexHullGrahamScan}),"undefined"!=typeof module&&(module.exports=ConvexHullGrahamScan);

},{}],12:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,setImmediate){(function (){
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=e()}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],require("timers").setImmediate)
},{"_process":15,"buffer":9,"timers":16}],14:[function(require,module,exports){
/*
__________________________________________________________________________________________________________________________________________            
 __________________________________________________________________________________________________________________________________________           
  ________/\\\\____________/\\\\_____/\\\\\\\\\_____/\\\________/\\\__/\\\\\\\\\\\\\\\__/\\\\\\\\\\\________________________________________          
   _______\/\\\\\\________/\\\\\\___/\\\\/////\\\\__\/\\\_____/\\\//__\/\\\///////////__\/\\\///////\\\_______________/\\\___________________         
    _______\/\\\//\\\____/\\\//\\\__/\\\/____\///\\\_\/\\\__/\\\//_____\/\\\_____________\/\\\_____\/\\\______________\///____________________        
     _______\/\\\\///\\\/\\\/_\/\\\_\/\\\_______\/\\\_\/\\\\\\//\\\_____\/\\\\\\\\\\\_____\/\\\\\\\\\\\/________________/\\\__/\\\\\\\\\\______       
      _______\/\\\__\///\\\/___\/\\\_\/\\\\\\\\\\\\\\\_\/\\\//_\//\\\____\/\\\///////______\/\\\//////\\\_______________\/\\\_\/\\\//////_______      
       _______\/\\\____\///_____\/\\\_\/\\\/////////\\\_\/\\\____\//\\\___\/\\\_____________\/\\\____\//\\\______________\/\\\_\/\\\\\\\\\\______     
        _______\/\\\_____________\/\\\_\/\\\_______\/\\\_\/\\\_____\//\\\__\/\\\_____________\/\\\_____\//\\\_________/\\_\/\\\_\////////\\\______    
         _______\/\\\_____________\/\\\_\/\\\_______\/\\\_\/\\\______\//\\\_\/\\\\\\\\\\\\\\\_\/\\\______\//\\\__/\\\_\//\\\\\\___/\\\\\\\\\\______   
          _______\///______________\///__\///________\///__\///________\///__\///////////////__\///________\///__\///___\//////___\//////////_______  
           __________________________________________________________________________________________________________________________________________ 
            __________________________________________________________________________________________________________________________________________

Maker.js
https://github.com/Microsoft/maker.js

Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.

*/
/**
 * Root module for Maker.js.
 *
 * Example: get a reference to Maker.js
 * ```
 * var makerjs = require('makerjs');
 * ```
 *
 */
var MakerJs;
(function (MakerJs) {
    /**
     * Version info
     */
    MakerJs.version = 'debug';
    /**
     * Enumeration of environment types.
     */
    MakerJs.environmentTypes = {
        BrowserUI: 'browser',
        NodeJs: 'node',
        WebWorker: 'worker',
        Unknown: 'unknown'
    };
    /**
     * @private
     */
    function tryEval(name) {
        try {
            var value = eval(name);
            return value;
        }
        catch (e) { }
        return;
    }
    /**
     * @private
     */
    function detectEnvironment() {
        if (tryEval('WorkerGlobalScope') && tryEval('self')) {
            return MakerJs.environmentTypes.WebWorker;
        }
        if (tryEval('window') && tryEval('document')) {
            return MakerJs.environmentTypes.BrowserUI;
        }
        //put node last since packagers usually add shims for it
        if (tryEval('global') && tryEval('process')) {
            return MakerJs.environmentTypes.NodeJs;
        }
        return MakerJs.environmentTypes.Unknown;
    }
    /**
     * Current execution environment type, should be one of environmentTypes.
     */
    MakerJs.environment = detectEnvironment();
    //units
    /**
     * String-based enumeration of unit types: imperial, metric or otherwise.
     * A model may specify the unit system it is using, if any. When importing a model, it may have different units.
     * Unit conversion function is makerjs.units.conversionScale().
     * Important: If you add to this, you must also add a corresponding conversion ratio in the unit.ts file!
     */
    MakerJs.unitType = {
        Centimeter: 'cm',
        Foot: 'foot',
        Inch: 'inch',
        Meter: 'm',
        Millimeter: 'mm'
    };
    /**
     * private
     */
    function split(s, char) {
        var p = s.indexOf(char);
        if (p < 0) {
            return [s];
        }
        else if (p > 0) {
            return [s.substr(0, p), s.substr(p + 1)];
        }
        else {
            return ['', s];
        }
    }
    /**
     * Split a decimal into its whole and fractional parts as strings.
     *
     * Example: get whole and fractional parts of 42.056
     * ```
     * makerjs.splitDecimal(42.056); //returns ["42", "056"]
     * ```
     *
     * @param n The number to split.
     * @returns Array of 2 strings when n contains a decimal point, or an array of one string when n is an integer.
     */
    function splitDecimal(n) {
        var s = n.toString();
        if (s.indexOf('e') > 0) {
            //max digits is 20 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
            s = n.toFixed(20).match(/.*[^(0+$)]/)[0]; //regex trims trailing zeros
        }
        return split(s, '.');
    }
    MakerJs.splitDecimal = splitDecimal;
    /**
     * Numeric rounding
     *
     * Example: round to 3 decimal places
     * ```
     * makerjs.round(3.14159, .001); //returns 3.142
     * ```
     *
     * @param n The number to round off.
     * @param accuracy Optional exemplar of number of decimal places.
     * @returns Rounded number.
     */
    function round(n, accuracy) {
        if (accuracy === void 0) { accuracy = .0000001; }
        //optimize for early exit for integers
        if (n % 1 === 0)
            return n;
        var exp = 1 - String(Math.ceil(1 / accuracy)).length;
        //Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math.round(n);
        }
        n = +n;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(n) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // If the value is negative...
        if (n < 0) {
            return -round(-n, accuracy);
        }
        // Shift
        var a = split(n.toString(), 'e');
        n = Math.round(+(a[0] + 'e' + (a[1] ? (+a[1] - exp) : -exp)));
        // Shift back
        a = split(n.toString(), 'e');
        return +(a[0] + 'e' + (a[1] ? (+a[1] + exp) : exp));
    }
    MakerJs.round = round;
    /**
     * Create a string representation of a route array.
     *
     * @param route Array of strings which are segments of a route.
     * @returns String of the flattened array.
     */
    function createRouteKey(route) {
        var converted = [];
        for (var i = 0; i < route.length; i++) {
            var element = route[i];
            var newElement;
            if (i % 2 === 0) {
                newElement = (i > 0 ? '.' : '') + element;
            }
            else {
                newElement = JSON.stringify([element]);
            }
            converted.push(newElement);
        }
        return converted.join('');
    }
    MakerJs.createRouteKey = createRouteKey;
    /**
     * Travel along a route inside of a model to extract a specific node in its tree.
     *
     * @param modelContext Model to travel within.
     * @param route String of a flattened route, or a string array of route segments.
     * @returns Model or Path object within the modelContext tree.
     */
    function travel(modelContext, route) {
        if (!modelContext || !route)
            return null;
        var routeArray;
        if (Array.isArray(route)) {
            routeArray = route;
        }
        else {
            routeArray = JSON.parse(route);
        }
        var props = routeArray.slice();
        var ref = modelContext;
        var origin = modelContext.origin || [0, 0];
        while (props.length) {
            var prop = props.shift();
            ref = ref[prop];
            if (!ref)
                return null;
            if (ref.origin && props.length) {
                origin = MakerJs.point.add(origin, ref.origin);
            }
        }
        return {
            result: ref,
            offset: origin
        };
    }
    MakerJs.travel = travel;
    /**
     * @private
     */
    var clone = require('clone');
    /**
     * Clone an object.
     *
     * @param objectToClone The object to clone.
     * @returns A new clone of the original object.
     */
    function cloneObject(objectToClone) {
        return clone(objectToClone);
    }
    MakerJs.cloneObject = cloneObject;
    /**
     * Copy the properties from one object to another object.
     *
     * Example:
     * ```
     * makerjs.extendObject({ abc: 123 }, { xyz: 789 }); //returns { abc: 123, xyz: 789 }
     * ```
     *
     * @param target The object to extend. It will receive the new properties.
     * @param other An object containing properties to merge in.
     * @returns The original object after merging.
     */
    function extendObject(target, other) {
        if (target && other) {
            for (var key in other) {
                if (typeof other[key] !== 'undefined') {
                    target[key] = other[key];
                }
            }
        }
        return target;
    }
    MakerJs.extendObject = extendObject;
    /**
     * Test to see if a variable is a function.
     *
     * @param value The object to test.
     * @returns True if the object is a function type.
     */
    function isFunction(value) {
        return typeof value === 'function';
    }
    MakerJs.isFunction = isFunction;
    /**
     * Test to see if a variable is a number.
     *
     * @param value The object to test.
     * @returns True if the object is a number type.
     */
    function isNumber(value) {
        return typeof value === 'number';
    }
    MakerJs.isNumber = isNumber;
    /**
     * Test to see if a variable is an object.
     *
     * @param value The object to test.
     * @returns True if the object is an object type.
     */
    function isObject(value) {
        return typeof value === 'object';
    }
    MakerJs.isObject = isObject;
    //points
    /**
     * Test to see if an object implements the required properties of a point.
     *
     * @param item The item to test.
     */
    function isPoint(item) {
        return item && Array.isArray(item) && item.length == 2 && isNumber(item[0]) && isNumber(item[1]);
    }
    MakerJs.isPoint = isPoint;
    /**
     * Test to see if an object implements the required properties of a path.
     *
     * @param item The item to test.
     */
    function isPath(item) {
        return item && item.type && isPoint(item.origin);
    }
    MakerJs.isPath = isPath;
    /**
     * Test to see if an object implements the required properties of a line.
     *
     * @param item The item to test.
     */
    function isPathLine(item) {
        return isPath(item) && item.type == MakerJs.pathType.Line && isPoint(item.end);
    }
    MakerJs.isPathLine = isPathLine;
    /**
     * Test to see if an object implements the required properties of a circle.
     *
     * @param item The item to test.
     */
    function isPathCircle(item) {
        return isPath(item) && item.type == MakerJs.pathType.Circle && isNumber(item.radius);
    }
    MakerJs.isPathCircle = isPathCircle;
    /**
     * Test to see if an object implements the required properties of an arc.
     *
     * @param item The item to test.
     */
    function isPathArc(item) {
        return isPath(item) && item.type == MakerJs.pathType.Arc && isNumber(item.radius) && isNumber(item.startAngle) && isNumber(item.endAngle);
    }
    MakerJs.isPathArc = isPathArc;
    /**
     * Test to see if an object implements the required properties of an arc in a bezier curve.
     *
     * @param item The item to test.
     */
    function isPathArcInBezierCurve(item) {
        return isPathArc(item) && isObject(item.bezierData) && isNumber(item.bezierData.startT) && isNumber(item.bezierData.endT);
    }
    MakerJs.isPathArcInBezierCurve = isPathArcInBezierCurve;
    /**
     * String-based enumeration of all paths types.
     *
     * Examples: use pathType instead of string literal when creating a circle.
     * ```
     * var circle: IPathCircle = { type: pathType.Circle, origin: [0, 0], radius: 7 };   //typescript
     * var circle = { type: pathType.Circle, origin: [0, 0], radius: 7 };   //javascript
     * ```
     */
    MakerJs.pathType = {
        Line: "line",
        Circle: "circle",
        Arc: "arc",
        BezierSeed: "bezier-seed"
    };
    /**
     * Test to see if an object implements the required properties of a model.
     */
    function isModel(item) {
        return item && (item.paths || item.models);
    }
    MakerJs.isModel = isModel;
    /**
     * Test to see if an object implements the required properties of a chain.
     *
     * @param item The item to test.
     */
    function isChain(item) {
        var x = item;
        return x && x.links && Array.isArray(x.links) && isNumber(x.pathLength);
    }
    MakerJs.isChain = isChain;
    /**
     * @private
     */
    var Cascade = /** @class */ (function () {
        function Cascade(_module, $initial) {
            this._module = _module;
            this.$initial = $initial;
            for (var methodName in this._module)
                this._shadow(methodName);
            this.$result = $initial;
        }
        Cascade.prototype._shadow = function (methodName) {
            var _this = this;
            this[methodName] = function () {
                return _this._apply(_this._module[methodName], arguments);
            };
        };
        Cascade.prototype._apply = function (fn, carriedArguments) {
            var args = [].slice.call(carriedArguments);
            args.unshift(this.$result);
            this.$result = fn.apply(undefined, args);
            return this;
        };
        Cascade.prototype.$reset = function () {
            this.$result = this.$initial;
            return this;
        };
        return Cascade;
    }());
    function $(context) {
        if (isModel(context)) {
            return new Cascade(MakerJs.model, context);
        }
        else if (isPath(context)) {
            return new Cascade(MakerJs.path, context);
        }
        else if (isPoint(context)) {
            return new Cascade(MakerJs.point, context);
        }
    }
    MakerJs.$ = $;
})(MakerJs || (MakerJs = {}));
//CommonJs
module.exports = MakerJs;
//This file is generated by ./target/cascadable.js
var MakerJs;
(function (MakerJs) {
    var angle;
    (function (angle) {
        /**
         * private
         */
        function getFractionalPart(n) {
            return MakerJs.splitDecimal(n)[1];
        }
        /**
         * private
         */
        function setFractionalPart(n, fractionalPart) {
            if (fractionalPart) {
                return +(MakerJs.splitDecimal(n)[0] + '.' + fractionalPart);
            }
            else {
                return n;
            }
        }
        /**
         * private
         */
        function copyFractionalPart(src, dest) {
            if ((src < 0 && dest < 0) || (src > 0 && dest > 0)) {
                return setFractionalPart(dest, getFractionalPart(src));
            }
            return dest;
        }
        /**
         * Ensures an angle is not greater than 360
         *
         * @param angleInDegrees Angle in degrees.
         * @returns Same polar angle but not greater than 360 degrees.
         */
        function noRevolutions(angleInDegrees) {
            var revolutions = Math.floor(angleInDegrees / 360);
            if (revolutions === 0)
                return angleInDegrees;
            var a = angleInDegrees - (360 * revolutions);
            return copyFractionalPart(angleInDegrees, a);
        }
        angle.noRevolutions = noRevolutions;
        /**
         * Convert an angle from degrees to radians.
         *
         * @param angleInDegrees Angle in degrees.
         * @returns Angle in radians.
         */
        function toRadians(angleInDegrees) {
            return noRevolutions(angleInDegrees) * Math.PI / 180.0;
        }
        angle.toRadians = toRadians;
        /**
         * Convert an angle from radians to degrees.
         *
         * @param angleInRadians Angle in radians.
         * @returns Angle in degrees.
         */
        function toDegrees(angleInRadians) {
            return angleInRadians * 180.0 / Math.PI;
        }
        angle.toDegrees = toDegrees;
        /**
         * Get an arc's end angle, ensured to be greater than its start angle.
         *
         * @param arc An arc path object.
         * @returns End angle of arc.
         */
        function ofArcEnd(arc) {
            //compensate for values past zero. This allows easy compute of total angle size.
            //for example 0 = 360
            if (arc.endAngle < arc.startAngle) {
                var revolutions = Math.ceil((arc.startAngle - arc.endAngle) / 360);
                var a = revolutions * 360 + arc.endAngle;
                return copyFractionalPart(arc.endAngle, a);
            }
            return arc.endAngle;
        }
        angle.ofArcEnd = ofArcEnd;
        /**
         * Get the angle in the middle of an arc's start and end angles.
         *
         * @param arc An arc path object.
         * @param ratio Optional number between 0 and 1 specifying percentage between start and end angles. Default is .5
         * @returns Middle angle of arc.
         */
        function ofArcMiddle(arc, ratio) {
            if (ratio === void 0) { ratio = .5; }
            return arc.startAngle + ofArcSpan(arc) * ratio;
        }
        angle.ofArcMiddle = ofArcMiddle;
        /**
         * Total angle of an arc between its start and end angles.
         *
         * @param arc The arc to measure.
         * @returns Angle of arc.
         */
        function ofArcSpan(arc) {
            var endAngle = angle.ofArcEnd(arc);
            var a = endAngle - arc.startAngle;
            if (MakerJs.round(a) > 360) {
                return noRevolutions(a);
            }
            else {
                return a;
            }
        }
        angle.ofArcSpan = ofArcSpan;
        /**
         * Angle of a line path.
         *
         * @param line The line path to find the angle of.
         * @returns Angle of the line path, in degrees.
         */
        function ofLineInDegrees(line) {
            return noRevolutions(toDegrees(ofPointInRadians(line.origin, line.end)));
        }
        angle.ofLineInDegrees = ofLineInDegrees;
        /**
         * Angle of a line through a point, in degrees.
         *
         * @param pointToFindAngle The point to find the angle.
         * @param origin Point of origin of the angle.
         * @returns Angle of the line throught the point, in degrees.
         */
        function ofPointInDegrees(origin, pointToFindAngle) {
            return toDegrees(ofPointInRadians(origin, pointToFindAngle));
        }
        angle.ofPointInDegrees = ofPointInDegrees;
        /**
         * Angle of a line through a point, in radians.
         *
         * @param pointToFindAngle The point to find the angle.
         * @param origin Point of origin of the angle.
         * @returns Angle of the line throught the point, in radians.
         */
        function ofPointInRadians(origin, pointToFindAngle) {
            var d = MakerJs.point.subtract(pointToFindAngle, origin);
            var x = d[0];
            var y = d[1];
            return Math.atan2(-y, -x) + Math.PI;
        }
        angle.ofPointInRadians = ofPointInRadians;
        /**
         * Mirror an angle on either or both x and y axes.
         *
         * @param angleInDegrees The angle to mirror.
         * @param mirrorX Boolean to mirror on the x axis.
         * @param mirrorY Boolean to mirror on the y axis.
         * @returns Mirrored angle.
         */
        function mirror(angleInDegrees, mirrorX, mirrorY) {
            if (mirrorY) {
                angleInDegrees = 360 - angleInDegrees;
            }
            if (mirrorX) {
                angleInDegrees = (angleInDegrees < 180 ? 180 : 540) - angleInDegrees;
            }
            return angleInDegrees;
        }
        angle.mirror = mirror;
        /**
         * @private
         */
        var linkLineMap = {};
        linkLineMap[MakerJs.pathType.Arc] = function (arc, first, reversed) {
            var fromEnd = first != reversed;
            var angleToRotate = fromEnd ? arc.endAngle - 90 : arc.startAngle + 90;
            var origin = MakerJs.point.fromArc(arc)[fromEnd ? 1 : 0];
            var end = MakerJs.point.rotate(MakerJs.point.add(origin, [arc.radius, 0]), angleToRotate, origin);
            return new MakerJs.paths.Line(first ? [end, origin] : [origin, end]);
        };
        linkLineMap[MakerJs.pathType.Line] = function (line, first, reversed) {
            return reversed ? new MakerJs.paths.Line(line.end, line.origin) : line;
        };
        /**
         * @private
         */
        function getLinkLine(chainLink, first) {
            if (chainLink) {
                var p = chainLink.walkedPath.pathContext;
                var fn = linkLineMap[p.type];
                if (fn) {
                    return fn(p, first, chainLink.reversed);
                }
            }
        }
        /**
         * Get the angle of a joint between 2 chain links.
         *
         * @param linkA First chain link.
         * @param linkB Second chain link.
         * @returns Angle between chain links.
         */
        function ofChainLinkJoint(linkA, linkB) {
            if (arguments.length < 2)
                return null;
            var linkLines = [linkA, linkB].map(function (link, i) { return getLinkLine(link, i === 0); });
            var result = noRevolutions(ofLineInDegrees(linkLines[1]) - ofLineInDegrees(linkLines[0]));
            if (result > 180)
                result -= 360;
            return result;
        }
        angle.ofChainLinkJoint = ofChainLinkJoint;
    })(angle = MakerJs.angle || (MakerJs.angle = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var point;
    (function (point) {
        /**
         * Add two points together and return the result as a new point object.
         *
         * @param a First point.
         * @param b Second point.
         * @param subtract Optional boolean to subtract instead of add.
         * @returns A new point object.
         */
        function add(a, b, subtract) {
            var newPoint = clone(a);
            if (!b)
                return newPoint;
            for (var i = 2; i--;) {
                if (subtract) {
                    newPoint[i] -= b[i];
                }
                else {
                    newPoint[i] += b[i];
                }
            }
            return newPoint;
        }
        point.add = add;
        /**
         * Get the average of two points.
         *
         * @param a First point.
         * @param b Second point.
         * @returns New point object which is the average of a and b.
         */
        function average(a, b) {
            function avg(i) {
                return (a[i] + b[i]) / 2;
            }
            return [avg(0), avg(1)];
        }
        point.average = average;
        /**
         * Clone a point into a new point.
         *
         * @param pointToClone The point to clone.
         * @returns A new point with same values as the original.
         */
        function clone(pointToClone) {
            if (!pointToClone)
                return point.zero();
            return [pointToClone[0], pointToClone[1]];
        }
        point.clone = clone;
        /**
         * From an array of points, find the closest point to a given reference point.
         *
         * @param referencePoint The reference point.
         * @param pointOptions Array of points to choose from.
         * @returns The first closest point from the pointOptions.
         */
        function closest(referencePoint, pointOptions) {
            var smallest = {
                index: 0,
                distance: -1
            };
            for (var i = 0; i < pointOptions.length; i++) {
                var distance = MakerJs.measure.pointDistance(referencePoint, pointOptions[i]);
                if (smallest.distance == -1 || distance < smallest.distance) {
                    smallest.distance = distance;
                    smallest.index = i;
                }
            }
            return pointOptions[smallest.index];
        }
        point.closest = closest;
        /**
         * private
         */
        var zero_cos = {};
        zero_cos[Math.PI / 2] = true;
        zero_cos[3 * Math.PI / 2] = true;
        /**
         * private
         */
        var zero_sin = {};
        zero_sin[Math.PI] = true;
        zero_sin[2 * Math.PI] = true;
        /**
         * Get a point from its polar coordinates.
         *
         * @param angleInRadians The angle of the polar coordinate, in radians.
         * @param radius The radius of the polar coordinate.
         * @returns A new point object.
         */
        function fromPolar(angleInRadians, radius) {
            return [
                (angleInRadians in zero_cos) ? 0 : MakerJs.round(radius * Math.cos(angleInRadians)),
                (angleInRadians in zero_sin) ? 0 : MakerJs.round(radius * Math.sin(angleInRadians))
            ];
        }
        point.fromPolar = fromPolar;
        /**
         * Get a point on a circle or arc path, at a given angle.
         * @param angleInDegrees The angle at which you want to find the point, in degrees.
         * @param circle A circle or arc.
         * @returns A new point object.
         */
        function fromAngleOnCircle(angleInDegrees, circle) {
            return add(circle.origin, fromPolar(MakerJs.angle.toRadians(angleInDegrees), circle.radius));
        }
        point.fromAngleOnCircle = fromAngleOnCircle;
        /**
         * Get the two end points of an arc path.
         *
         * @param arc The arc path object.
         * @returns Array with 2 elements: [0] is the point object corresponding to the start angle, [1] is the point object corresponding to the end angle.
         */
        function fromArc(arc) {
            return [fromAngleOnCircle(arc.startAngle, arc), fromAngleOnCircle(arc.endAngle, arc)];
        }
        point.fromArc = fromArc;
        /**
         * @private
         */
        var pathEndsMap = {};
        pathEndsMap[MakerJs.pathType.Arc] = function (arc) {
            return point.fromArc(arc);
        };
        pathEndsMap[MakerJs.pathType.Line] = function (line) {
            return [line.origin, line.end];
        };
        pathEndsMap[MakerJs.pathType.BezierSeed] = pathEndsMap[MakerJs.pathType.Line];
        /**
         * Get the two end points of a path.
         *
         * @param pathContext The path object.
         * @returns Array with 2 elements: [0] is the point object corresponding to the origin, [1] is the point object corresponding to the end.
         */
        function fromPathEnds(pathContext, pathOffset) {
            var result = null;
            var fn = pathEndsMap[pathContext.type];
            if (fn) {
                result = fn(pathContext);
                if (pathOffset) {
                    result = result.map(function (p) { return add(p, pathOffset); });
                }
            }
            return result;
        }
        point.fromPathEnds = fromPathEnds;
        /**
         * @private
         */
        function verticalIntersectionPoint(verticalLine, nonVerticalSlope) {
            var x = verticalLine.origin[0];
            var y = nonVerticalSlope.slope * x + nonVerticalSlope.yIntercept;
            return [x, y];
        }
        /**
         * Calculates the intersection of slopes of two lines.
         *
         * @param lineA First line to use for slope.
         * @param lineB Second line to use for slope.
         * @param options Optional IPathIntersectionOptions.
         * @returns point of intersection of the two slopes, or null if the slopes did not intersect.
         */
        function fromSlopeIntersection(lineA, lineB, options) {
            if (options === void 0) { options = {}; }
            var slopeA = MakerJs.measure.lineSlope(lineA);
            var slopeB = MakerJs.measure.lineSlope(lineB);
            //see if slope are parallel 
            if (MakerJs.measure.isSlopeParallel(slopeA, slopeB)) {
                if (MakerJs.measure.isSlopeEqual(slopeA, slopeB)) {
                    //check for overlap
                    options.out_AreOverlapped = MakerJs.measure.isLineOverlapping(lineA, lineB, options.excludeTangents);
                }
                return null;
            }
            var pointOfIntersection;
            if (!slopeA.hasSlope) {
                pointOfIntersection = verticalIntersectionPoint(lineA, slopeB);
            }
            else if (!slopeB.hasSlope) {
                pointOfIntersection = verticalIntersectionPoint(lineB, slopeA);
            }
            else {
                // find intersection by line equation
                var x = (slopeB.yIntercept - slopeA.yIntercept) / (slopeA.slope - slopeB.slope);
                var y = slopeA.slope * x + slopeA.yIntercept;
                pointOfIntersection = [x, y];
            }
            return pointOfIntersection;
        }
        point.fromSlopeIntersection = fromSlopeIntersection;
        /**
         * @private
         */
        function midCircle(circle, midAngle) {
            return point.add(circle.origin, point.fromPolar(MakerJs.angle.toRadians(midAngle), circle.radius));
        }
        /**
         * @private
         */
        var middleMap = {};
        middleMap[MakerJs.pathType.Arc] = function (arc, ratio) {
            var midAngle = MakerJs.angle.ofArcMiddle(arc, ratio);
            return midCircle(arc, midAngle);
        };
        middleMap[MakerJs.pathType.Circle] = function (circle, ratio) {
            return midCircle(circle, 360 * ratio);
        };
        middleMap[MakerJs.pathType.Line] = function (line, ratio) {
            function ration(a, b) {
                return a + (b - a) * ratio;
            }
            ;
            return [
                ration(line.origin[0], line.end[0]),
                ration(line.origin[1], line.end[1])
            ];
        };
        middleMap[MakerJs.pathType.BezierSeed] = function (seed, ratio) {
            return MakerJs.models.BezierCurve.computePoint(seed, ratio);
        };
        /**
         * Get the middle point of a path.
         *
         * @param pathContext The path object.
         * @param ratio Optional ratio (between 0 and 1) of point along the path. Default is .5 for middle.
         * @returns Point on the path, in the middle of the path.
         */
        function middle(pathContext, ratio) {
            if (ratio === void 0) { ratio = .5; }
            var midPoint = null;
            var fn = middleMap[pathContext.type];
            if (fn) {
                midPoint = fn(pathContext, ratio);
            }
            return midPoint;
        }
        point.middle = middle;
        /**
         * Create a clone of a point, mirrored on either or both x and y axes.
         *
         * @param pointToMirror The point to mirror.
         * @param mirrorX Boolean to mirror on the x axis.
         * @param mirrorY Boolean to mirror on the y axis.
         * @returns Mirrored point.
         */
        function mirror(pointToMirror, mirrorX, mirrorY) {
            var p = clone(pointToMirror);
            if (mirrorX) {
                p[0] = -p[0];
            }
            if (mirrorY) {
                p[1] = -p[1];
            }
            return p;
        }
        point.mirror = mirror;
        /**
         * Round the values of a point.
         *
         * @param pointContext The point to serialize.
         * @param accuracy Optional exemplar number of decimal places.
         * @returns A new point with the values rounded.
         */
        function rounded(pointContext, accuracy) {
            return [MakerJs.round(pointContext[0], accuracy), MakerJs.round(pointContext[1], accuracy)];
        }
        point.rounded = rounded;
        /**
         * Rotate a point.
         *
         * @param pointToRotate The point to rotate.
         * @param angleInDegrees The amount of rotation, in degrees.
         * @param rotationOrigin The center point of rotation.
         * @returns A new point.
         */
        function rotate(pointToRotate, angleInDegrees, rotationOrigin) {
            if (rotationOrigin === void 0) { rotationOrigin = [0, 0]; }
            var pointAngleInRadians = MakerJs.angle.ofPointInRadians(rotationOrigin, pointToRotate);
            var d = MakerJs.measure.pointDistance(rotationOrigin, pointToRotate);
            var rotatedPoint = fromPolar(pointAngleInRadians + MakerJs.angle.toRadians(angleInDegrees), d);
            return add(rotationOrigin, rotatedPoint);
        }
        point.rotate = rotate;
        /**
         * Scale a point's coordinates.
         *
         * @param pointToScale The point to scale.
         * @param scaleValue The amount of scaling.
         * @returns A new point.
         */
        function scale(pointToScale, scaleValue) {
            var p = clone(pointToScale);
            for (var i = 2; i--;) {
                p[i] *= scaleValue;
            }
            return p;
        }
        point.scale = scale;
        /**
         * Distort a point's coordinates.
         *
         * @param pointToDistort The point to distort.
         * @param scaleX The amount of x scaling.
         * @param scaleY The amount of y scaling.
         * @returns A new point.
         */
        function distort(pointToDistort, scaleX, scaleY) {
            return [pointToDistort[0] * scaleX, pointToDistort[1] * scaleY];
        }
        point.distort = distort;
        /**
         * Subtract a point from another point, and return the result as a new point. Shortcut to Add(a, b, subtract = true).
         *
         * @param a First point.
         * @param b Second point.
         * @returns A new point object.
         */
        function subtract(a, b) {
            return add(a, b, true);
        }
        point.subtract = subtract;
        /**
         * A point at 0,0 coordinates.
         * NOTE: It is important to call this as a method, with the empty parentheses.
         *
         * @returns A new point.
         */
        function zero() {
            return [0, 0];
        }
        point.zero = zero;
    })(point = MakerJs.point || (MakerJs.point = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var path;
    (function (path) {
        /**
         * Add a path to a model. This is basically equivalent to:
         * ```
         * parentModel.paths[pathId] = childPath;
         * ```
         * with additional checks to make it safe for cascading.
         *
         * @param childPath The path to add.
         * @param parentModel The model to add to.
         * @param pathId The id of the path.
         * @param overwrite Optional flag to overwrite any path referenced by pathId. Default is false, which will create an id similar to pathId.
         * @returns The original path (for cascading).
         */
        function addTo(childPath, parentModel, pathId, overwrite) {
            if (overwrite === void 0) { overwrite = false; }
            MakerJs.model.addPath(parentModel, childPath, pathId, overwrite);
            return childPath;
        }
        path.addTo = addTo;
        /**
         * @private
         */
        function copyLayer(pathA, pathB) {
            if (pathA && pathB && ('layer' in pathA)) {
                pathB.layer = pathA.layer;
            }
            //carry extra props if this is an IPathArcInBezierCurve
            if (pathA && pathB && ('bezierData' in pathA)) {
                pathB.bezierData = pathA.bezierData;
            }
        }
        /**
         * private
         */
        var copyPropsMap = {};
        copyPropsMap[MakerJs.pathType.Circle] = function (srcCircle, destCircle, offset) {
            destCircle.radius = srcCircle.radius;
        };
        copyPropsMap[MakerJs.pathType.Arc] = function (srcArc, destArc, offset) {
            copyPropsMap[MakerJs.pathType.Circle](srcArc, destArc, offset);
            destArc.startAngle = srcArc.startAngle;
            destArc.endAngle = srcArc.endAngle;
        };
        copyPropsMap[MakerJs.pathType.Line] = function (srcLine, destLine, offset) {
            destLine.end = MakerJs.point.add(srcLine.end, offset);
        };
        copyPropsMap[MakerJs.pathType.BezierSeed] = function (srcSeed, destSeed, offset) {
            copyPropsMap[MakerJs.pathType.Line](srcSeed, destSeed, offset);
            destSeed.controls = srcSeed.controls.map(function (p) { return MakerJs.point.add(p, offset); });
        };
        /**
         * Create a clone of a path. This is faster than cloneObject.
         *
         * @param pathToClone The path to clone.
         * @param offset Optional point to move path a relative distance.
         * @returns Cloned path.
         */
        function clone(pathToClone, offset) {
            var result = { type: pathToClone.type, origin: MakerJs.point.add(pathToClone.origin, offset) };
            var fn = copyPropsMap[pathToClone.type];
            if (fn) {
                fn(pathToClone, result, offset);
            }
            copyLayer(pathToClone, result);
            return result;
        }
        path.clone = clone;
        /**
         * Copy the schema properties of one path to another.
         *
         * @param srcPath The source path to copy property values from.
         * @param destPath The destination path to copy property values to.
         * @returns The source path.
         */
        function copyProps(srcPath, destPath) {
            var fn = copyPropsMap[srcPath.type];
            if (fn) {
                destPath.origin = MakerJs.point.clone(srcPath.origin);
                fn(srcPath, destPath);
            }
            copyLayer(srcPath, destPath);
            return srcPath;
        }
        path.copyProps = copyProps;
        /**
         * @private
         */
        var mirrorMap = {};
        mirrorMap[MakerJs.pathType.Line] = function (line, origin, mirrorX, mirrorY) {
            return new MakerJs.paths.Line(origin, MakerJs.point.mirror(line.end, mirrorX, mirrorY));
        };
        mirrorMap[MakerJs.pathType.Circle] = function (circle, origin, mirrorX, mirrorY) {
            return new MakerJs.paths.Circle(origin, circle.radius);
        };
        mirrorMap[MakerJs.pathType.Arc] = function (arc, origin, mirrorX, mirrorY) {
            var startAngle = MakerJs.angle.mirror(arc.startAngle, mirrorX, mirrorY);
            var endAngle = MakerJs.angle.mirror(MakerJs.angle.ofArcEnd(arc), mirrorX, mirrorY);
            var xor = mirrorX != mirrorY;
            return new MakerJs.paths.Arc(origin, arc.radius, xor ? endAngle : startAngle, xor ? startAngle : endAngle);
        };
        mirrorMap[MakerJs.pathType.BezierSeed] = function (seed, origin, mirrorX, mirrorY) {
            var mirrored = mirrorMap[MakerJs.pathType.Line](seed, origin, mirrorX, mirrorY);
            mirrored.type = MakerJs.pathType.BezierSeed;
            mirrored.controls = seed.controls.map(function (c) { return MakerJs.point.mirror(c, mirrorX, mirrorY); });
            return mirrored;
        };
        /**
         * Set the layer of a path. This is equivalent to:
         * ```
         * pathContext.layer = layer;
         * ```
         *
         * @param pathContext The path to set the layer.
         * @param layer The layer name.
         * @returns The original path (for cascading).
         */
        function layer(pathContext, layer) {
            pathContext.layer = layer;
            return pathContext;
        }
        path.layer = layer;
        /**
         * Create a clone of a path, mirrored on either or both x and y axes.
         *
         * @param pathToMirror The path to mirror.
         * @param mirrorX Boolean to mirror on the x axis.
         * @param mirrorY Boolean to mirror on the y axis.
         * @returns Mirrored path.
         */
        function mirror(pathToMirror, mirrorX, mirrorY) {
            var newPath = null;
            if (pathToMirror) {
                var origin = MakerJs.point.mirror(pathToMirror.origin, mirrorX, mirrorY);
                var fn = mirrorMap[pathToMirror.type];
                if (fn) {
                    newPath = fn(pathToMirror, origin, mirrorX, mirrorY);
                }
            }
            copyLayer(pathToMirror, newPath);
            return newPath;
        }
        path.mirror = mirror;
        /**
         * @private
         */
        var moveMap = {};
        moveMap[MakerJs.pathType.Line] = function (line, origin) {
            var delta = MakerJs.point.subtract(line.end, line.origin);
            line.end = MakerJs.point.add(origin, delta);
        };
        /**
         * Move a path to an absolute point.
         *
         * @param pathToMove The path to move.
         * @param origin The new origin for the path.
         * @returns The original path (for cascading).
         */
        function move(pathToMove, origin) {
            if (pathToMove) {
                var fn = moveMap[pathToMove.type];
                if (fn) {
                    fn(pathToMove, origin);
                }
                pathToMove.origin = origin;
            }
            return pathToMove;
        }
        path.move = move;
        /**
         * @private
         */
        var moveRelativeMap = {};
        moveRelativeMap[MakerJs.pathType.Line] = function (line, delta, subtract) {
            line.end = MakerJs.point.add(line.end, delta, subtract);
        };
        moveRelativeMap[MakerJs.pathType.BezierSeed] = function (seed, delta, subtract) {
            moveRelativeMap[MakerJs.pathType.Line](seed, delta, subtract);
            seed.controls = seed.controls.map(function (c) { return MakerJs.point.add(c, delta, subtract); });
        };
        /**
         * Move a path's origin by a relative amount.
         *
         * @param pathToMove The path to move.
         * @param delta The x & y adjustments as a point object.
         * @param subtract Optional boolean to subtract instead of add.
         * @returns The original path (for cascading).
         */
        function moveRelative(pathToMove, delta, subtract) {
            if (pathToMove && delta) {
                pathToMove.origin = MakerJs.point.add(pathToMove.origin, delta, subtract);
                var fn = moveRelativeMap[pathToMove.type];
                if (fn) {
                    fn(pathToMove, delta, subtract);
                }
            }
            return pathToMove;
        }
        path.moveRelative = moveRelative;
        /**
         * Move some paths relatively during a task execution, then unmove them.
         *
         * @param pathsToMove The paths to move.
         * @param deltas The x & y adjustments as a point object array.
         * @param task The function to call while the paths are temporarily moved.
         */
        function moveTemporary(pathsToMove, deltas, task) {
            var subtract = false;
            function move(pathToOffset, i) {
                if (deltas[i]) {
                    moveRelative(pathToOffset, deltas[i], subtract);
                }
            }
            pathsToMove.map(move);
            task();
            subtract = true;
            pathsToMove.map(move);
        }
        path.moveTemporary = moveTemporary;
        /**
         * @private
         */
        var rotateMap = {};
        rotateMap[MakerJs.pathType.Line] = function (line, angleInDegrees, rotationOrigin) {
            line.end = MakerJs.point.rotate(line.end, angleInDegrees, rotationOrigin);
        };
        rotateMap[MakerJs.pathType.Arc] = function (arc, angleInDegrees, rotationOrigin) {
            arc.startAngle = MakerJs.angle.noRevolutions(arc.startAngle + angleInDegrees);
            arc.endAngle = MakerJs.angle.noRevolutions(arc.endAngle + angleInDegrees);
        };
        rotateMap[MakerJs.pathType.BezierSeed] = function (seed, angleInDegrees, rotationOrigin) {
            rotateMap[MakerJs.pathType.Line](seed, angleInDegrees, rotationOrigin);
            seed.controls = seed.controls.map(function (c) { return MakerJs.point.rotate(c, angleInDegrees, rotationOrigin); });
        };
        /**
         * Rotate a path.
         *
         * @param pathToRotate The path to rotate.
         * @param angleInDegrees The amount of rotation, in degrees.
         * @param rotationOrigin The center point of rotation.
         * @returns The original path (for cascading).
         */
        function rotate(pathToRotate, angleInDegrees, rotationOrigin) {
            if (rotationOrigin === void 0) { rotationOrigin = [0, 0]; }
            if (!pathToRotate || !angleInDegrees)
                return pathToRotate;
            pathToRotate.origin = MakerJs.point.rotate(pathToRotate.origin, angleInDegrees, rotationOrigin);
            var fn = rotateMap[pathToRotate.type];
            if (fn) {
                fn(pathToRotate, angleInDegrees, rotationOrigin);
            }
            return pathToRotate;
        }
        path.rotate = rotate;
        /**
         * @private
         */
        var scaleMap = {};
        scaleMap[MakerJs.pathType.Line] = function (line, scaleValue) {
            line.end = MakerJs.point.scale(line.end, scaleValue);
        };
        scaleMap[MakerJs.pathType.BezierSeed] = function (seed, scaleValue) {
            scaleMap[MakerJs.pathType.Line](seed, scaleValue);
            seed.controls = seed.controls.map(function (c) { return MakerJs.point.scale(c, scaleValue); });
        };
        scaleMap[MakerJs.pathType.Circle] = function (circle, scaleValue) {
            circle.radius *= scaleValue;
        };
        scaleMap[MakerJs.pathType.Arc] = scaleMap[MakerJs.pathType.Circle];
        /**
         * Scale a path.
         *
         * @param pathToScale The path to scale.
         * @param scaleValue The amount of scaling.
         * @returns The original path (for cascading).
         */
        function scale(pathToScale, scaleValue) {
            if (!pathToScale || scaleValue == 1)
                return pathToScale;
            pathToScale.origin = MakerJs.point.scale(pathToScale.origin, scaleValue);
            var fn = scaleMap[pathToScale.type];
            if (fn) {
                fn(pathToScale, scaleValue);
            }
            return pathToScale;
        }
        path.scale = scale;
        /**
         * @private
         */
        var distortMap = {};
        distortMap[MakerJs.pathType.Arc] = function (arc, scaleX, scaleY) {
            return new MakerJs.models.EllipticArc(arc, scaleX, scaleY);
        };
        distortMap[MakerJs.pathType.Circle] = function (circle, scaleX, scaleY) {
            var ellipse = new MakerJs.models.Ellipse(circle.radius * scaleX, circle.radius * scaleY);
            ellipse.origin = MakerJs.point.distort(circle.origin, scaleX, scaleY);
            return ellipse;
        };
        distortMap[MakerJs.pathType.Line] = function (line, scaleX, scaleY) {
            return new MakerJs.paths.Line([line.origin, line.end].map(function (p) { return MakerJs.point.distort(p, scaleX, scaleY); }));
        };
        distortMap[MakerJs.pathType.BezierSeed] = function (seed, scaleX, scaleY) {
            var d = MakerJs.point.distort;
            return {
                type: MakerJs.pathType.BezierSeed,
                origin: d(seed.origin, scaleX, scaleY),
                controls: seed.controls.map(function (c) { return d(c, scaleX, scaleY); }),
                end: d(seed.end, scaleX, scaleY)
            };
        };
        /**
         * Distort a path - scale x and y individually.
         *
         * @param pathToDistort The path to distort.
         * @param scaleX The amount of x scaling.
         * @param scaleY The amount of y scaling.
         * @returns A new IModel (for circles and arcs) or IPath (for lines and bezier seeds).
         */
        function distort(pathToDistort, scaleX, scaleY) {
            if (!pathToDistort)
                return null;
            var fn = distortMap[pathToDistort.type];
            if (fn) {
                return fn(pathToDistort, scaleX, scaleY);
            }
            return null;
        }
        path.distort = distort;
        /**
         * Connect 2 lines at their slope intersection point.
         *
         * @param lineA First line to converge.
         * @param lineB Second line to converge.
         * @param useOriginA Optional flag to converge the origin point of lineA instead of the end point.
         * @param useOriginB Optional flag to converge the origin point of lineB instead of the end point.
         * @returns point of convergence.
         */
        function converge(lineA, lineB, useOriginA, useOriginB) {
            var p = MakerJs.point.fromSlopeIntersection(lineA, lineB);
            if (p) {
                var lines = [lineA, lineB];
                var useOrigin = [useOriginA, useOriginB];
                if (arguments.length === 2) {
                    //converge to closest
                    lines.forEach(function (line, i) {
                        useOrigin[i] = (MakerJs.point.closest(p, [line.origin, line.end]) === line.origin);
                    });
                }
                function setPoint(line, useOrigin) {
                    var setP;
                    if (useOrigin) {
                        setP = line.origin;
                    }
                    else {
                        setP = line.end;
                    }
                    setP[0] = p[0];
                    setP[1] = p[1];
                }
                lines.forEach(function (line, i) {
                    setPoint(line, useOrigin[i]);
                });
            }
            return p;
        }
        path.converge = converge;
        /**
         * @private
         */
        var alterMap = {};
        alterMap[MakerJs.pathType.Arc] = function (arc, pathLength, distance, useOrigin) {
            var span = MakerJs.angle.ofArcSpan(arc);
            var delta = ((pathLength + distance) * span / pathLength) - span;
            if (useOrigin) {
                arc.startAngle -= delta;
            }
            else {
                arc.endAngle += delta;
            }
        };
        alterMap[MakerJs.pathType.Circle] = function (circle, pathLength, distance, useOrigin) {
            circle.radius *= (pathLength + distance) / pathLength;
        };
        alterMap[MakerJs.pathType.Line] = function (line, pathLength, distance, useOrigin) {
            var delta = MakerJs.point.scale(MakerJs.point.subtract(line.end, line.origin), distance / pathLength);
            if (useOrigin) {
                line.origin = MakerJs.point.subtract(line.origin, delta);
            }
            else {
                line.end = MakerJs.point.add(line.end, delta);
            }
        };
        /**
         * Alter a path by lengthening or shortening it.
         *
         * @param pathToAlter Path to alter.
         * @param distance Numeric amount of length to add or remove from the path. Use a positive number to lengthen, negative to shorten. When shortening: this function will not alter the path and will return null if the resulting path length is less than or equal to zero.
         * @param useOrigin Optional flag to alter from the origin instead of the end of the path.
         * @returns The original path (for cascading), or null if the path could not be altered.
         */
        function alterLength(pathToAlter, distance, useOrigin) {
            if (useOrigin === void 0) { useOrigin = false; }
            if (!pathToAlter || !distance)
                return null;
            var fn = alterMap[pathToAlter.type];
            if (fn) {
                var pathLength = MakerJs.measure.pathLength(pathToAlter);
                if (!pathLength || -distance >= pathLength)
                    return null;
                fn(pathToAlter, pathLength, distance, useOrigin);
                return pathToAlter;
            }
            return null;
        }
        path.alterLength = alterLength;
        /**
         * Get points along a path.
         *
         * @param pathContext Path to get points from.
         * @param numberOfPoints Number of points to divide the path.
         * @returns Array of points which are on the path spread at a uniform interval.
         */
        function toPoints(pathContext, numberOfPoints) {
            //avoid division by zero when there is only one point
            if (numberOfPoints == 1) {
                return [MakerJs.point.middle(pathContext)];
            }
            var points = [];
            var base = numberOfPoints;
            if (pathContext.type != MakerJs.pathType.Circle)
                base--;
            for (var i = 0; i < numberOfPoints; i++) {
                points.push(MakerJs.point.middle(pathContext, i / base));
            }
            return points;
        }
        path.toPoints = toPoints;
        /**
         * @private
         */
        var numberOfKeyPointsMap = {};
        numberOfKeyPointsMap[MakerJs.pathType.Line] = function (line) {
            return 2;
        };
        numberOfKeyPointsMap[MakerJs.pathType.Circle] = function (circle, maxPointDistance) {
            var len = MakerJs.measure.pathLength(circle);
            if (!len)
                return 0;
            maxPointDistance = maxPointDistance || len;
            return Math.max(8, Math.ceil(len / (maxPointDistance || len)));
        };
        numberOfKeyPointsMap[MakerJs.pathType.Arc] = function (arc, maxPointDistance) {
            var len = MakerJs.measure.pathLength(arc);
            if (!len)
                return 0;
            var minPoints = Math.ceil(MakerJs.angle.ofArcSpan(arc) / 45) + 1;
            return Math.max(minPoints, Math.ceil(len / (maxPointDistance || len)));
        };
        /**
         * Get key points (a minimal a number of points) along a path.
         *
         * @param pathContext Path to get points from.
         * @param maxArcFacet Optional maximum length between points on an arc or circle.
         * @returns Array of points which are on the path.
         */
        function toKeyPoints(pathContext, maxArcFacet) {
            if (pathContext.type == MakerJs.pathType.BezierSeed) {
                var curve = new MakerJs.models.BezierCurve(pathContext);
                var curveKeyPoints;
                MakerJs.model.findChains(curve, function (chains, loose, layer) {
                    if (chains.length == 1) {
                        var c = chains[0];
                        switch (c.links[0].walkedPath.pathId) {
                            case 'arc_0':
                            case 'line_0':
                                break;
                            default:
                                MakerJs.chain.reverse(c);
                        }
                        curveKeyPoints = MakerJs.chain.toKeyPoints(c);
                    }
                    else if (loose.length === 1) {
                        curveKeyPoints = toKeyPoints(loose[0].pathContext);
                    }
                });
                return curveKeyPoints;
            }
            else {
                var fn = numberOfKeyPointsMap[pathContext.type];
                if (fn) {
                    var numberOfKeyPoints = fn(pathContext, maxArcFacet);
                    if (numberOfKeyPoints) {
                        return toPoints(pathContext, numberOfKeyPoints);
                    }
                }
            }
            return [];
        }
        path.toKeyPoints = toKeyPoints;
        /**
         * Center a path at [0, 0].
         *
         * @param pathToCenter The path to center.
         * @returns The original path (for cascading).
         */
        function center(pathToCenter) {
            var m = MakerJs.measure.pathExtents(pathToCenter);
            var c = MakerJs.point.average(m.high, m.low);
            var o = MakerJs.point.subtract(pathToCenter.origin || [0, 0], c);
            move(pathToCenter, o);
            return pathToCenter;
        }
        path.center = center;
        /**
         * Move a path so its bounding box begins at [0, 0].
         *
         * @param pathToZero The path to zero.
         * @returns The original path (for cascading).
         */
        function zero(pathToZero) {
            var m = MakerJs.measure.pathExtents(pathToZero);
            var z = MakerJs.point.subtract(pathToZero.origin || [0, 0], m.low);
            move(pathToZero, z);
            return pathToZero;
        }
        path.zero = zero;
    })(path = MakerJs.path || (MakerJs.path = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var path;
    (function (path_1) {
        /**
         * @private
         */
        var breakPathFunctionMap = {};
        breakPathFunctionMap[MakerJs.pathType.Arc] = function (arc, pointOfBreak) {
            var angleAtBreakPoint = MakerJs.angle.ofPointInDegrees(arc.origin, pointOfBreak);
            if (MakerJs.measure.isAngleEqual(angleAtBreakPoint, arc.startAngle) || MakerJs.measure.isAngleEqual(angleAtBreakPoint, arc.endAngle)) {
                return null;
            }
            function getAngleStrictlyBetweenArcAngles() {
                var startAngle = MakerJs.angle.noRevolutions(arc.startAngle);
                var endAngle = startAngle + MakerJs.angle.ofArcEnd(arc) - arc.startAngle;
                var tries = [0, 1, -1];
                for (var i = 0; i < tries.length; i++) {
                    var add = +360 * tries[i];
                    if (MakerJs.measure.isBetween(angleAtBreakPoint + add, startAngle, endAngle, true)) {
                        return arc.startAngle + angleAtBreakPoint + add - startAngle;
                    }
                }
                return null;
            }
            var angleAtBreakPointBetween = getAngleStrictlyBetweenArcAngles();
            if (angleAtBreakPointBetween == null) {
                return null;
            }
            var savedEndAngle = arc.endAngle;
            arc.endAngle = angleAtBreakPointBetween;
            //clone the original to carry other properties
            var copy = MakerJs.cloneObject(arc);
            copy.startAngle = angleAtBreakPointBetween;
            copy.endAngle = savedEndAngle;
            return copy;
        };
        breakPathFunctionMap[MakerJs.pathType.Circle] = function (circle, pointOfBreak) {
            //breaking a circle turns it into an arc
            circle.type = MakerJs.pathType.Arc;
            var arc = circle;
            var angleAtBreakPoint = MakerJs.angle.ofPointInDegrees(circle.origin, pointOfBreak);
            arc.startAngle = angleAtBreakPoint;
            arc.endAngle = angleAtBreakPoint + 360;
            return null;
        };
        breakPathFunctionMap[MakerJs.pathType.Line] = function (line, pointOfBreak) {
            if (!MakerJs.measure.isBetweenPoints(pointOfBreak, line, true)) {
                return null;
            }
            var savedEndPoint = line.end;
            line.end = pointOfBreak;
            //clone the original to carry other properties
            var copy = MakerJs.cloneObject(line);
            copy.origin = pointOfBreak;
            copy.end = savedEndPoint;
            return copy;
        };
        /**
         * Breaks a path in two. The supplied path will end at the supplied pointOfBreak,
         * a new path is returned which begins at the pointOfBreak and ends at the supplied path's initial end point.
         * For Circle, the original path will be converted in place to an Arc, and null is returned.
         *
         * @param pathToBreak The path to break.
         * @param pointOfBreak The point at which to break the path.
         * @returns A new path of the same type, when path type is line or arc. Returns null for circle.
         */
        function breakAtPoint(pathToBreak, pointOfBreak) {
            if (pathToBreak && pointOfBreak) {
                var fn = breakPathFunctionMap[pathToBreak.type];
                if (fn) {
                    var result = fn(pathToBreak, pointOfBreak);
                    if (result && ('layer' in pathToBreak)) {
                        result.layer = pathToBreak.layer;
                    }
                    return result;
                }
            }
            return null;
        }
        path_1.breakAtPoint = breakAtPoint;
    })(path = MakerJs.path || (MakerJs.path = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var paths;
    (function (paths) {
        /**
         * Class for arc path.
         */
        var Arc = /** @class */ (function () {
            function Arc() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                function getSpan(origin) {
                    var startAngle = MakerJs.angle.ofPointInDegrees(origin, args[clockwise ? 1 : 0]);
                    var endAngle = MakerJs.angle.ofPointInDegrees(origin, args[clockwise ? 0 : 1]);
                    if (endAngle < startAngle) {
                        endAngle += 360;
                    }
                    return {
                        origin: origin,
                        startAngle: startAngle,
                        endAngle: endAngle,
                        size: endAngle - startAngle
                    };
                }
                switch (args.length) {
                    case 5:
                        //SVG style arc designation
                        var pointA = args[0];
                        var pointB = args[1];
                        this.radius = args[2];
                        var largeArc = args[3];
                        var clockwise = args[4];
                        var span;
                        //make sure arc can reach. if not, scale up.
                        var smallestRadius = MakerJs.measure.pointDistance(pointA, pointB) / 2;
                        if (MakerJs.round(this.radius - smallestRadius) <= 0) {
                            this.radius = smallestRadius;
                            span = getSpan(MakerJs.point.average(pointA, pointB));
                        }
                        else {
                            //find the 2 potential origins
                            var origins = MakerJs.path.intersection(new Circle(pointA, this.radius), new Circle(pointB, this.radius));
                            var spans = [];
                            for (var i = origins.intersectionPoints.length; i--;) {
                                span = getSpan(origins.intersectionPoints[i]);
                                //insert sorted by size ascending
                                if (spans.length == 0 || span.size > spans[0].size) {
                                    spans.push(span);
                                }
                                else {
                                    spans.unshift(span);
                                }
                            }
                            var index = largeArc ? 1 : 0;
                            span = spans[index];
                        }
                        this.origin = span.origin;
                        this.startAngle = span.startAngle;
                        this.endAngle = span.endAngle;
                        break;
                    case 4:
                        this.origin = args[0];
                        this.radius = args[1];
                        this.startAngle = args[2];
                        this.endAngle = args[3];
                        break;
                    case 3:
                        if (MakerJs.isPoint(args[2])) {
                            //from 3 points
                            Circle.apply(this, args);
                            var angles = [];
                            for (var i = 0; i < 3; i++) {
                                angles.push(MakerJs.angle.ofPointInDegrees(this.origin, args[i]));
                            }
                            this.startAngle = angles[0];
                            this.endAngle = angles[2];
                            //swap start and end angles if this arc does not contain the midpoint
                            if (!MakerJs.measure.isBetweenArcAngles(angles[1], this, false)) {
                                this.startAngle = angles[2];
                                this.endAngle = angles[0];
                            }
                            //do not fall through if this was 3 points
                            break;
                        }
                    //fall through to below if 2 points
                    case 2:
                        //from 2 points (and optional clockwise flag)
                        var clockwise = args[2];
                        Circle.call(this, args[0], args[1]);
                        this.startAngle = MakerJs.angle.ofPointInDegrees(this.origin, args[clockwise ? 1 : 0]);
                        this.endAngle = MakerJs.angle.ofPointInDegrees(this.origin, args[clockwise ? 0 : 1]);
                        break;
                }
                //do this after Circle.apply / Circle.call to make sure this is an arc
                this.type = MakerJs.pathType.Arc;
            }
            return Arc;
        }());
        paths.Arc = Arc;
        /**
         * Class for circle path.
         */
        var Circle = /** @class */ (function () {
            function Circle() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.type = MakerJs.pathType.Circle;
                switch (args.length) {
                    case 1:
                        this.origin = [0, 0];
                        this.radius = args[0];
                        break;
                    case 2:
                        if (MakerJs.isNumber(args[1])) {
                            this.origin = args[0];
                            this.radius = args[1];
                        }
                        else {
                            //Circle from 2 points
                            this.origin = MakerJs.point.average(args[0], args[1]);
                            this.radius = MakerJs.measure.pointDistance(this.origin, args[0]);
                        }
                        break;
                    default:
                        //Circle from 3 points
                        //create 2 lines with 2nd point in common
                        var lines = [
                            new Line(args[0], args[1]),
                            new Line(args[1], args[2])
                        ];
                        //create perpendicular lines
                        var perpendiculars = [];
                        for (var i = 2; i--;) {
                            var midpoint = MakerJs.point.middle(lines[i]);
                            perpendiculars.push(MakerJs.path.rotate(lines[i], 90, midpoint));
                        }
                        //find intersection of slopes of perpendiculars
                        var origin = MakerJs.point.fromSlopeIntersection(perpendiculars[0], perpendiculars[1]);
                        if (origin) {
                            this.origin = origin;
                            //radius is distance to any of the 3 points
                            this.radius = MakerJs.measure.pointDistance(this.origin, args[0]);
                        }
                        else {
                            throw 'invalid parameters - attempted to construct a circle from 3 points on a line: ' + JSON.stringify(args);
                        }
                        break;
                }
            }
            return Circle;
        }());
        paths.Circle = Circle;
        /**
         * Class for line path.
         */
        var Line = /** @class */ (function () {
            function Line() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.type = MakerJs.pathType.Line;
                switch (args.length) {
                    case 1:
                        var points = args[0];
                        this.origin = points[0];
                        this.end = points[1];
                        break;
                    case 2:
                        this.origin = args[0];
                        this.end = args[1];
                        break;
                }
            }
            return Line;
        }());
        paths.Line = Line;
        /**
         * Class for chord, which is simply a line path that connects the endpoints of an arc.
         *
         * @param arc Arc to use as the basic for the chord.
         */
        var Chord = /** @class */ (function () {
            function Chord(arc) {
                var arcPoints = MakerJs.point.fromArc(arc);
                this.type = MakerJs.pathType.Line;
                this.origin = arcPoints[0];
                this.end = arcPoints[1];
            }
            return Chord;
        }());
        paths.Chord = Chord;
        /**
         * Class for a parallel line path.
         *
         * @param toLine A line to be parallel to.
         * @param distance Distance between parallel and original line.
         * @param nearPoint Any point to determine which side of the line to place the parallel.
         */
        var Parallel = /** @class */ (function () {
            function Parallel(toLine, distance, nearPoint) {
                this.type = MakerJs.pathType.Line;
                this.origin = MakerJs.point.clone(toLine.origin);
                this.end = MakerJs.point.clone(toLine.end);
                var angleOfLine = MakerJs.angle.ofLineInDegrees(this);
                function getNewOrigin(offsetAngle) {
                    var origin = MakerJs.point.add(toLine.origin, MakerJs.point.fromPolar(MakerJs.angle.toRadians(angleOfLine + offsetAngle), distance));
                    return {
                        origin: origin,
                        nearness: MakerJs.measure.pointDistance(origin, nearPoint)
                    };
                }
                var newOrigins = [getNewOrigin(-90), getNewOrigin(90)];
                var newOrigin = (newOrigins[0].nearness < newOrigins[1].nearness) ? newOrigins[0].origin : newOrigins[1].origin;
                MakerJs.path.move(this, newOrigin);
            }
            return Parallel;
        }());
        paths.Parallel = Parallel;
    })(paths = MakerJs.paths || (MakerJs.paths = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var model;
    (function (model) {
        /**
         * Add a path as a child. This is basically equivalent to:
         * ```
         * parentModel.paths[childPathId] = childPath;
         * ```
         * with additional checks to make it safe for cascading.
         *
         * @param modelContext The model to add to.
         * @param pathContext The path to add.
         * @param pathId The id of the path.
         * @param overWrite Optional flag to overwrite any path referenced by pathId. Default is false, which will create an id similar to pathId.
         * @returns The original model (for cascading).
         */
        function addPath(modelContext, pathContext, pathId, overWrite) {
            if (overWrite === void 0) { overWrite = false; }
            var id = overWrite ? pathId : getSimilarPathId(modelContext, pathId);
            modelContext.paths = modelContext.paths || {};
            modelContext.paths[id] = pathContext;
            return modelContext;
        }
        model.addPath = addPath;
        /**
         * Add a model as a child. This is basically equivalent to:
         * ```
         * parentModel.models[childModelId] = childModel;
         * ```
         * with additional checks to make it safe for cascading.
         *
         * @param parentModel The model to add to.
         * @param childModel The model to add.
         * @param childModelId The id of the child model.
         * @param overWrite Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.
         * @returns The original model (for cascading).
         */
        function addModel(parentModel, childModel, childModelId, overWrite) {
            if (overWrite === void 0) { overWrite = false; }
            var id = overWrite ? childModelId : getSimilarModelId(parentModel, childModelId);
            parentModel.models = parentModel.models || {};
            parentModel.models[id] = childModel;
            return parentModel;
        }
        model.addModel = addModel;
        /**
         * Add a model as a child of another model. This is basically equivalent to:
         * ```
         * parentModel.models[childModelId] = childModel;
         * ```
         * with additional checks to make it safe for cascading.
         *
         * @param childModel The model to add.
         * @param parentModel The model to add to.
         * @param childModelId The id of the child model.
         * @param overWrite Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.
         * @returns The original model (for cascading).
         */
        function addTo(childModel, parentModel, childModelId, overWrite) {
            if (overWrite === void 0) { overWrite = false; }
            addModel(parentModel, childModel, childModelId, overWrite);
            return childModel;
        }
        model.addTo = addTo;
        /**
         * Clone a model. Alias of makerjs.cloneObject(modelToClone)
         *
         * @param modelToClone The model to clone.
         * @returns A clone of the model you passed.
         */
        function clone(modelToClone) {
            return MakerJs.cloneObject(modelToClone);
        }
        model.clone = clone;
        /**
         * Count the number of child models within a given model.
         *
         * @param modelContext The model containing other models.
         * @returns Number of child models.
         */
        function countChildModels(modelContext) {
            var count = 0;
            if (modelContext.models) {
                for (var id in modelContext.models) {
                    count++;
                }
            }
            return count;
        }
        model.countChildModels = countChildModels;
        /**
         * @private
         */
        function getSimilarId(map, id) {
            if (!map)
                return id;
            var i = 0;
            var newId = id;
            while (newId in map) {
                i++;
                newId = [id, i].join('_');
            }
            return newId;
        }
        /**
         * Get an unused id in the models map with the same prefix.
         *
         * @param modelContext The model containing the models map.
         * @param modelId The id to use directly (if unused), or as a prefix.
         */
        function getSimilarModelId(modelContext, modelId) {
            return getSimilarId(modelContext.models, modelId);
        }
        model.getSimilarModelId = getSimilarModelId;
        /**
         * Get an unused id in the paths map with the same prefix.
         *
         * @param modelContext The model containing the paths map.
         * @param pathId The id to use directly (if unused), or as a prefix.
         */
        function getSimilarPathId(modelContext, pathId) {
            return getSimilarId(modelContext.paths, pathId);
        }
        model.getSimilarPathId = getSimilarPathId;
        /**
         * Set the layer of a model. This is equivalent to:
         * ```
         * modelContext.layer = layer;
         * ```
         *
         * @param modelContext The model to set the layer.
         * @param layer The layer name.
         * @returns The original model (for cascading).
         */
        function layer(modelContext, layer) {
            modelContext.layer = layer;
            return modelContext;
        }
        model.layer = layer;
        /**
         * Moves all of a model's children (models and paths, recursively) in reference to a single common origin. Useful when points between children need to connect to each other.
         *
         * @param modelToOriginate The model to originate.
         * @param origin Optional offset reference point.
         * @returns The original model (for cascading).
         */
        function originate(modelToOriginate, origin) {
            function innerOriginate(m, o) {
                if (!m)
                    return;
                var newOrigin = MakerJs.point.add(m.origin, o);
                if (m.type === MakerJs.models.BezierCurve.typeName) {
                    MakerJs.path.moveRelative(m.seed, newOrigin);
                }
                if (m.paths) {
                    for (var id in m.paths) {
                        MakerJs.path.moveRelative(m.paths[id], newOrigin);
                    }
                }
                if (m.models) {
                    for (var id in m.models) {
                        innerOriginate(m.models[id], newOrigin);
                    }
                }
                m.origin = MakerJs.point.zero();
            }
            innerOriginate(modelToOriginate, origin ? MakerJs.point.subtract([0, 0], origin) : [0, 0]);
            if (origin) {
                modelToOriginate.origin = origin;
            }
            return modelToOriginate;
        }
        model.originate = originate;
        /**
         * Center a model at [0, 0].
         *
         * @param modelToCenter The model to center.
         * @param centerX Boolean to center on the x axis. Default is true.
         * @param centerY Boolean to center on the y axis. Default is true.
         * @returns The original model (for cascading).
         */
        function center(modelToCenter, centerX, centerY) {
            if (centerX === void 0) { centerX = true; }
            if (centerY === void 0) { centerY = true; }
            var m = MakerJs.measure.modelExtents(modelToCenter);
            var o = modelToCenter.origin || [0, 0];
            if (centerX)
                o[0] -= m.center[0];
            if (centerY)
                o[1] -= m.center[1];
            modelToCenter.origin = o;
            return modelToCenter;
        }
        model.center = center;
        /**
         * Create a clone of a model, mirrored on either or both x and y axes.
         *
         * @param modelToMirror The model to mirror.
         * @param mirrorX Boolean to mirror on the x axis.
         * @param mirrorY Boolean to mirror on the y axis.
         * @returns Mirrored model.
         */
        function mirror(modelToMirror, mirrorX, mirrorY) {
            var newModel = {};
            if (!modelToMirror)
                return null;
            if (modelToMirror.origin) {
                newModel.origin = MakerJs.point.mirror(modelToMirror.origin, mirrorX, mirrorY);
            }
            if (modelToMirror.type) {
                newModel.type = modelToMirror.type;
            }
            if ('layer' in modelToMirror) {
                newModel.layer = modelToMirror.layer;
            }
            if (modelToMirror.units) {
                newModel.units = modelToMirror.units;
            }
            if (modelToMirror.type === MakerJs.models.BezierCurve.typeName) {
                newModel.type = MakerJs.models.BezierCurve.typeName;
                newModel.seed = MakerJs.path.mirror(modelToMirror.seed, mirrorX, mirrorY);
            }
            if (modelToMirror.paths) {
                newModel.paths = {};
                for (var id in modelToMirror.paths) {
                    var pathToMirror = modelToMirror.paths[id];
                    if (!pathToMirror)
                        continue;
                    var pathMirrored = MakerJs.path.mirror(pathToMirror, mirrorX, mirrorY);
                    if (!pathMirrored)
                        continue;
                    newModel.paths[id] = pathMirrored;
                }
            }
            if (modelToMirror.models) {
                newModel.models = {};
                for (var id in modelToMirror.models) {
                    var childModelToMirror = modelToMirror.models[id];
                    if (!childModelToMirror)
                        continue;
                    var childModelMirrored = mirror(childModelToMirror, mirrorX, mirrorY);
                    if (!childModelMirrored)
                        continue;
                    newModel.models[id] = childModelMirrored;
                }
            }
            return newModel;
        }
        model.mirror = mirror;
        /**
         * Move a model to an absolute point. Note that this is also accomplished by directly setting the origin property. This function exists for cascading.
         *
         * @param modelToMove The model to move.
         * @param origin The new position of the model.
         * @returns The original model (for cascading).
         */
        function move(modelToMove, origin) {
            modelToMove.origin = MakerJs.point.clone(origin);
            return modelToMove;
        }
        model.move = move;
        /**
         * Move a model's origin by a relative amount.
         *
         * @param modelToMove The model to move.
         * @param delta The x & y adjustments as a point object.
         * @returns The original model (for cascading).
         */
        function moveRelative(modelToMove, delta) {
            if (modelToMove) {
                modelToMove.origin = MakerJs.point.add(modelToMove.origin || MakerJs.point.zero(), delta);
            }
            return modelToMove;
        }
        model.moveRelative = moveRelative;
        /**
         * Prefix the ids of paths in a model.
         *
         * @param modelToPrefix The model to prefix.
         * @param prefix The prefix to prepend on paths ids.
         * @returns The original model (for cascading).
         */
        function prefixPathIds(modelToPrefix, prefix) {
            var walkedPaths = [];
            //first collect the paths because we don't want to modify keys during an iteration on keys
            walk(modelToPrefix, {
                onPath: function (walkedPath) {
                    walkedPaths.push(walkedPath);
                }
            });
            //now modify the ids in our own iteration
            for (var i = 0; i < walkedPaths.length; i++) {
                var walkedPath = walkedPaths[i];
                delete walkedPath.modelContext.paths[walkedPath.pathId];
                walkedPath.modelContext.paths[prefix + walkedPath.pathId] = walkedPath.pathContext;
            }
            return modelToPrefix;
        }
        model.prefixPathIds = prefixPathIds;
        /**
         * Rotate a model.
         *
         * @param modelToRotate The model to rotate.
         * @param angleInDegrees The amount of rotation, in degrees.
         * @param rotationOrigin The center point of rotation.
         * @returns The original model (for cascading).
         */
        function rotate(modelToRotate, angleInDegrees, rotationOrigin) {
            if (rotationOrigin === void 0) { rotationOrigin = [0, 0]; }
            if (!modelToRotate || !angleInDegrees)
                return modelToRotate;
            var offsetOrigin = MakerJs.point.subtract(rotationOrigin, modelToRotate.origin);
            if (modelToRotate.type === MakerJs.models.BezierCurve.typeName) {
                MakerJs.path.rotate(modelToRotate.seed, angleInDegrees, offsetOrigin);
            }
            if (modelToRotate.paths) {
                for (var id in modelToRotate.paths) {
                    MakerJs.path.rotate(modelToRotate.paths[id], angleInDegrees, offsetOrigin);
                }
            }
            if (modelToRotate.models) {
                for (var id in modelToRotate.models) {
                    rotate(modelToRotate.models[id], angleInDegrees, offsetOrigin);
                }
            }
            return modelToRotate;
        }
        model.rotate = rotate;
        /**
         * Scale a model.
         *
         * @param modelToScale The model to scale.
         * @param scaleValue The amount of scaling.
         * @param scaleOrigin Optional boolean to scale the origin point. Typically false for the root model.
         * @returns The original model (for cascading).
         */
        function scale(modelToScale, scaleValue, scaleOrigin) {
            if (scaleOrigin === void 0) { scaleOrigin = false; }
            if (scaleOrigin && modelToScale.origin) {
                modelToScale.origin = MakerJs.point.scale(modelToScale.origin, scaleValue);
            }
            if (modelToScale.type === MakerJs.models.BezierCurve.typeName) {
                MakerJs.path.scale(modelToScale.seed, scaleValue);
            }
            if (modelToScale.paths) {
                for (var id in modelToScale.paths) {
                    MakerJs.path.scale(modelToScale.paths[id], scaleValue);
                }
            }
            if (modelToScale.models) {
                for (var id in modelToScale.models) {
                    scale(modelToScale.models[id], scaleValue, true);
                }
            }
            return modelToScale;
        }
        model.scale = scale;
        /**
         * Convert a model to match a different unit system.
         *
         * @param modeltoConvert The model to convert.
         * @param destUnitType The unit system.
         * @returns The scaled model (for cascading).
         */
        function convertUnits(modeltoConvert, destUnitType) {
            if (modeltoConvert.units && MakerJs.units.isValidUnit(modeltoConvert.units) && MakerJs.units.isValidUnit(destUnitType)) {
                var ratio = MakerJs.units.conversionScale(modeltoConvert.units, destUnitType);
                if (ratio != 1) {
                    scale(modeltoConvert, ratio);
                    //update the model with its new unit type
                    modeltoConvert.units = destUnitType;
                }
            }
            return modeltoConvert;
        }
        model.convertUnits = convertUnits;
        /**
         * DEPRECATED - use model.walk instead.
         * Recursively walk through all paths for a given model.
         *
         * @param modelContext The model to walk.
         * @param callback Callback for each path.
         */
        function walkPaths(modelContext, callback) {
            if (modelContext.paths) {
                for (var pathId in modelContext.paths) {
                    if (!modelContext.paths[pathId])
                        continue;
                    callback(modelContext, pathId, modelContext.paths[pathId]);
                }
            }
            if (modelContext.models) {
                for (var id in modelContext.models) {
                    if (!modelContext.models[id])
                        continue;
                    walkPaths(modelContext.models[id], callback);
                }
            }
        }
        model.walkPaths = walkPaths;
        /**
         * Recursively walk through all child models and paths for a given model.
         *
         * @param modelContext The model to walk.
         * @param options Object containing callbacks.
         * @returns The original model (for cascading).
         */
        function walk(modelContext, options) {
            if (!modelContext)
                return;
            function walkRecursive(modelContext, layer, offset, route, routeKey) {
                var newOffset = MakerJs.point.add(modelContext.origin, offset);
                layer = (layer != undefined) ? layer : '';
                if (modelContext.paths) {
                    for (var pathId in modelContext.paths) {
                        var pathContext = modelContext.paths[pathId];
                        if (!pathContext)
                            continue;
                        var walkedPath = {
                            modelContext: modelContext,
                            layer: (pathContext.layer != undefined) ? pathContext.layer : layer,
                            offset: newOffset,
                            pathContext: pathContext,
                            pathId: pathId,
                            route: route.concat(['paths', pathId]),
                            routeKey: routeKey + (routeKey ? '.' : '') + 'paths' + JSON.stringify([pathId])
                        };
                        if (options.onPath)
                            options.onPath(walkedPath);
                    }
                }
                if (modelContext.models) {
                    for (var modelId in modelContext.models) {
                        var childModel = modelContext.models[modelId];
                        if (!childModel)
                            continue;
                        var walkedModel = {
                            parentModel: modelContext,
                            layer: (childModel.layer != undefined) ? childModel.layer : layer,
                            offset: newOffset,
                            route: route.concat(['models', modelId]),
                            routeKey: routeKey + (routeKey ? '.' : '') + 'models' + JSON.stringify([modelId]),
                            childId: modelId,
                            childModel: childModel
                        };
                        if (options.beforeChildWalk) {
                            if (!options.beforeChildWalk(walkedModel))
                                continue;
                        }
                        walkRecursive(walkedModel.childModel, walkedModel.layer, newOffset, walkedModel.route, walkedModel.routeKey);
                        if (options.afterChildWalk) {
                            options.afterChildWalk(walkedModel);
                        }
                    }
                }
            }
            walkRecursive(modelContext, modelContext.layer, [0, 0], [], '');
            return modelContext;
        }
        model.walk = walk;
        /**
         * Move a model so its bounding box begins at [0, 0].
         *
         * @param modelToZero The model to zero.
         * @param zeroX Boolean to zero on the x axis. Default is true.
         * @param zeroY Boolean to zero on the y axis. Default is true.
         * @returns The original model (for cascading).
         */
        function zero(modelToZero, zeroX, zeroY) {
            if (zeroX === void 0) { zeroX = true; }
            if (zeroY === void 0) { zeroY = true; }
            var m = MakerJs.measure.modelExtents(modelToZero);
            var z = modelToZero.origin || [0, 0];
            if (zeroX)
                z[0] -= m.low[0];
            if (zeroY)
                z[1] -= m.low[1];
            modelToZero.origin = z;
            return modelToZero;
        }
        model.zero = zero;
    })(model = MakerJs.model || (MakerJs.model = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var model;
    (function (model) {
        /**
         * @private
         */
        function getNonZeroSegments(pathToSegment, breakPoint) {
            var segment1 = MakerJs.cloneObject(pathToSegment);
            if (!segment1)
                return null;
            var segment2 = MakerJs.path.breakAtPoint(segment1, breakPoint);
            if (segment2) {
                var segments = [segment1, segment2];
                for (var i = 2; i--;) {
                    if (MakerJs.round(MakerJs.measure.pathLength(segments[i]), .0001) == 0) {
                        return null;
                    }
                }
                return segments;
            }
            else if (pathToSegment.type == MakerJs.pathType.Circle) {
                return [segment1];
            }
            return null;
        }
        /**
         * private
         */
        function getPointsOnPath(points, onPath, popOptions) {
            var endpointsOnPath = [];
            points.forEach(function (p) {
                if (MakerJs.measure.isPointOnPath(p, onPath, .00001, null, popOptions)) {
                    endpointsOnPath.push(p);
                }
            });
            return endpointsOnPath;
        }
        /**
         * @private
         */
        function breakAlongForeignPath(crossedPath, overlappedSegments, foreignWalkedPath) {
            var foreignPath = foreignWalkedPath.pathContext;
            var segments = crossedPath.segments;
            if (MakerJs.measure.isPathEqual(segments[0].absolutePath, foreignPath, .0001, null, foreignWalkedPath.offset)) {
                segments[0].overlapped = true;
                segments[0].duplicate = true;
                overlappedSegments.push(segments[0]);
                return;
            }
            //this will cache the slope, to keep from being recalculated for each segment
            var popOptions = {};
            var options = { path1Offset: crossedPath.offset, path2Offset: foreignWalkedPath.offset };
            var foreignIntersection = MakerJs.path.intersection(crossedPath.pathContext, foreignPath, options);
            var intersectionPoints = foreignIntersection ? foreignIntersection.intersectionPoints : null;
            var foreignPathEndPoints = MakerJs.point.fromPathEnds(foreignPath, foreignWalkedPath.offset) || [];
            for (var i = 0; i < segments.length; i++) {
                var pointsOfInterest = intersectionPoints ? foreignPathEndPoints.concat(intersectionPoints) : foreignPathEndPoints;
                var pointsToCheck = getPointsOnPath(pointsOfInterest, segments[i].absolutePath, popOptions);
                if (options.out_AreOverlapped) {
                    segments[i].overlapped = true;
                    overlappedSegments.push(segments[i]);
                }
                if (pointsToCheck.length > 0) {
                    //break the path which intersected, and add the shard to the end of the array so it can also be checked in this loop for further sharding.
                    var subSegments = null;
                    var p = 0;
                    while (!subSegments && p < pointsToCheck.length) {
                        subSegments = getNonZeroSegments(segments[i].absolutePath, pointsToCheck[p]);
                        p++;
                    }
                    if (subSegments) {
                        crossedPath.broken = true;
                        segments[i].absolutePath = subSegments[0];
                        if (subSegments[1]) {
                            var newSegment = {
                                absolutePath: subSegments[1],
                                pathId: segments[0].pathId,
                                overlapped: segments[i].overlapped,
                                uniqueForeignIntersectionPoints: []
                            };
                            if (segments[i].overlapped) {
                                overlappedSegments.push(newSegment);
                            }
                            segments.push(newSegment);
                        }
                        //re-check this segment for another deep intersection
                        i--;
                    }
                }
            }
        }
        /**
         * DEPRECATED - use measure.isPointInsideModel instead.
         * Check to see if a path is inside of a model.
         *
         * @param pathContext The path to check.
         * @param modelContext The model to check against.
         * @param farPoint Optional point of reference which is outside the bounds of the modelContext.
         * @returns Boolean true if the path is inside of the modelContext.
         */
        function isPathInsideModel(pathContext, modelContext, pathOffset, farPoint, measureAtlas) {
            var options = {
                farPoint: farPoint,
                measureAtlas: measureAtlas
            };
            var p = MakerJs.point.add(MakerJs.point.middle(pathContext), pathOffset);
            return MakerJs.measure.isPointInsideModel(p, modelContext, options);
        }
        model.isPathInsideModel = isPathInsideModel;
        /**
         * DEPRECATED
         * Break a model's paths everywhere they intersect with another path.
         *
         * @param modelToBreak The model containing paths to be broken.
         * @param modelToIntersect Optional model containing paths to look for intersection, or else the modelToBreak will be used.
         * @returns The original model (for cascading).
         */
        function breakPathsAtIntersections(modelToBreak, modelToIntersect) {
            var modelToBreakAtlas = new MakerJs.measure.Atlas(modelToBreak);
            modelToBreakAtlas.measureModels();
            var modelToIntersectAtlas;
            if (!modelToIntersect) {
                modelToIntersect = modelToBreak;
                modelToIntersectAtlas = modelToBreakAtlas;
            }
            else {
                modelToIntersectAtlas = new MakerJs.measure.Atlas(modelToIntersect);
                modelToIntersectAtlas.measureModels();
            }
            ;
            breakAllPathsAtIntersections(modelToBreak, modelToIntersect || modelToBreak, false, modelToBreakAtlas, modelToIntersectAtlas);
            return modelToBreak;
        }
        model.breakPathsAtIntersections = breakPathsAtIntersections;
        /**
         * @private
         */
        function breakAllPathsAtIntersections(modelToBreak, modelToIntersect, checkIsInside, modelToBreakAtlas, modelToIntersectAtlas, farPoint) {
            var crossedPaths = [];
            var overlappedSegments = [];
            var walkModelToBreakOptions = {
                onPath: function (outerWalkedPath) {
                    //clone this path and make it the first segment
                    var segment = {
                        absolutePath: MakerJs.path.clone(outerWalkedPath.pathContext, outerWalkedPath.offset),
                        pathId: outerWalkedPath.pathId,
                        overlapped: false,
                        uniqueForeignIntersectionPoints: []
                    };
                    var thisPath = outerWalkedPath;
                    thisPath.broken = false;
                    thisPath.segments = [segment];
                    var walkModelToIntersectOptions = {
                        onPath: function (innerWalkedPath) {
                            if (outerWalkedPath.pathContext !== innerWalkedPath.pathContext && MakerJs.measure.isMeasurementOverlapping(modelToBreakAtlas.pathMap[outerWalkedPath.routeKey], modelToIntersectAtlas.pathMap[innerWalkedPath.routeKey])) {
                                breakAlongForeignPath(thisPath, overlappedSegments, innerWalkedPath);
                            }
                        },
                        beforeChildWalk: function (innerWalkedModel) {
                            //see if there is a model measurement. if not, it is because the model does not contain paths.
                            var innerModelMeasurement = modelToIntersectAtlas.modelMap[innerWalkedModel.routeKey];
                            return innerModelMeasurement && MakerJs.measure.isMeasurementOverlapping(modelToBreakAtlas.pathMap[outerWalkedPath.routeKey], innerModelMeasurement);
                        }
                    };
                    //keep breaking the segments anywhere they intersect with paths of the other model
                    model.walk(modelToIntersect, walkModelToIntersectOptions);
                    if (checkIsInside) {
                        //check each segment whether it is inside or outside
                        for (var i = 0; i < thisPath.segments.length; i++) {
                            var p = MakerJs.point.middle(thisPath.segments[i].absolutePath);
                            var pointInsideOptions = { measureAtlas: modelToIntersectAtlas, farPoint: farPoint };
                            thisPath.segments[i].isInside = MakerJs.measure.isPointInsideModel(p, modelToIntersect, pointInsideOptions);
                            thisPath.segments[i].uniqueForeignIntersectionPoints = pointInsideOptions.out_intersectionPoints;
                        }
                    }
                    crossedPaths.push(thisPath);
                }
            };
            model.walk(modelToBreak, walkModelToBreakOptions);
            return { crossedPaths: crossedPaths, overlappedSegments: overlappedSegments };
        }
        /**
         * @private
         */
        function checkForEqualOverlaps(crossedPathsA, crossedPathsB, pointMatchingDistance) {
            function compareSegments(segment1, segment2) {
                if (MakerJs.measure.isPathEqual(segment1.absolutePath, segment2.absolutePath, pointMatchingDistance)) {
                    segment1.duplicate = segment2.duplicate = true;
                }
            }
            function compareAll(segment) {
                for (var i = 0; i < crossedPathsB.length; i++) {
                    compareSegments(crossedPathsB[i], segment);
                }
            }
            for (var i = 0; i < crossedPathsA.length; i++) {
                compareAll(crossedPathsA[i]);
            }
        }
        /**
         * @private
         */
        function addOrDeleteSegments(crossedPath, includeInside, includeOutside, keepDuplicates, atlas, trackDeleted) {
            function addSegment(modelContext, pathIdBase, segment) {
                var id = model.getSimilarPathId(modelContext, pathIdBase);
                var newRouteKey = (id == pathIdBase) ? crossedPath.routeKey : MakerJs.createRouteKey(crossedPath.route.slice(0, -1).concat([id]));
                segment.addedPath = MakerJs.cloneObject(crossedPath.pathContext);
                //circles may have become arcs
                segment.addedPath.type = segment.absolutePath.type;
                MakerJs.path.copyProps(segment.absolutePath, segment.addedPath);
                MakerJs.path.moveRelative(segment.addedPath, crossedPath.offset, true);
                modelContext.paths[id] = segment.addedPath;
                if (crossedPath.broken) {
                    //save the new segment's measurement
                    var measurement = MakerJs.measure.pathExtents(segment.absolutePath);
                    atlas.pathMap[newRouteKey] = measurement;
                    atlas.modelsMeasured = false;
                }
                else {
                    //keep the original measurement
                    atlas.pathMap[newRouteKey] = savedMeasurement;
                }
            }
            function checkAddSegment(modelContext, pathIdBase, segment) {
                if (segment.isInside && includeInside || !segment.isInside && includeOutside) {
                    addSegment(modelContext, pathIdBase, segment);
                }
                else {
                    atlas.modelsMeasured = false;
                    trackDeleted(segment.absolutePath, crossedPath.routeKey, 'segment is ' + (segment.isInside ? 'inside' : 'outside') + ' intersectionPoints=' + JSON.stringify(segment.uniqueForeignIntersectionPoints));
                }
            }
            //save the original measurement
            var savedMeasurement = atlas.pathMap[crossedPath.routeKey];
            //delete the original, its segments will be added
            delete crossedPath.modelContext.paths[crossedPath.pathId];
            delete atlas.pathMap[crossedPath.routeKey];
            for (var i = 0; i < crossedPath.segments.length; i++) {
                if (crossedPath.segments[i].duplicate) {
                    if (keepDuplicates) {
                        addSegment(crossedPath.modelContext, crossedPath.pathId, crossedPath.segments[i]);
                    }
                    else {
                        trackDeleted(crossedPath.segments[i].absolutePath, crossedPath.routeKey, 'segment is duplicate');
                    }
                }
                else {
                    checkAddSegment(crossedPath.modelContext, crossedPath.pathId, crossedPath.segments[i]);
                }
            }
        }
        /**
         * Combine 2 models. Each model will be modified accordingly.
         *
         * @param modelA First model to combine.
         * @param modelB Second model to combine.
         * @param includeAInsideB Flag to include paths from modelA which are inside of modelB.
         * @param includeAOutsideB Flag to include paths from modelA which are outside of modelB.
         * @param includeBInsideA Flag to include paths from modelB which are inside of modelA.
         * @param includeBOutsideA Flag to include paths from modelB which are outside of modelA.
         * @param options Optional ICombineOptions object.
         * @returns A new model containing both of the input models as "a" and "b".
         */
        function combine(modelA, modelB, includeAInsideB, includeAOutsideB, includeBInsideA, includeBOutsideA, options) {
            if (includeAInsideB === void 0) { includeAInsideB = false; }
            if (includeAOutsideB === void 0) { includeAOutsideB = true; }
            if (includeBInsideA === void 0) { includeBInsideA = false; }
            if (includeBOutsideA === void 0) { includeBOutsideA = true; }
            var opts = {
                trimDeadEnds: true,
                pointMatchingDistance: .005,
                out_deleted: [{ paths: {} }, { paths: {} }]
            };
            MakerJs.extendObject(opts, options);
            opts.measureA = opts.measureA || new MakerJs.measure.Atlas(modelA);
            opts.measureB = opts.measureB || new MakerJs.measure.Atlas(modelB);
            //make sure model measurements capture all paths
            opts.measureA.measureModels();
            opts.measureB.measureModels();
            if (!opts.farPoint) {
                var measureBoth = MakerJs.measure.increase(MakerJs.measure.increase({ high: [null, null], low: [null, null] }, opts.measureA.modelMap['']), opts.measureB.modelMap['']);
                opts.farPoint = MakerJs.point.add(measureBoth.high, [1, 1]);
            }
            var pathsA = breakAllPathsAtIntersections(modelA, modelB, true, opts.measureA, opts.measureB, opts.farPoint);
            var pathsB = breakAllPathsAtIntersections(modelB, modelA, true, opts.measureB, opts.measureA, opts.farPoint);
            checkForEqualOverlaps(pathsA.overlappedSegments, pathsB.overlappedSegments, opts.pointMatchingDistance);
            function trackDeleted(which, deletedPath, routeKey, reason) {
                model.addPath(opts.out_deleted[which], deletedPath, 'deleted');
                var p = deletedPath;
                p.reason = reason;
                p.routeKey = routeKey;
            }
            for (var i = 0; i < pathsA.crossedPaths.length; i++) {
                addOrDeleteSegments(pathsA.crossedPaths[i], includeAInsideB, includeAOutsideB, true, opts.measureA, function (p, id, reason) { return trackDeleted(0, p, id, reason); });
            }
            for (var i = 0; i < pathsB.crossedPaths.length; i++) {
                addOrDeleteSegments(pathsB.crossedPaths[i], includeBInsideA, includeBOutsideA, false, opts.measureB, function (p, id, reason) { return trackDeleted(1, p, id, reason); });
            }
            var result = { models: { a: modelA, b: modelB } };
            if (opts.trimDeadEnds) {
                var shouldKeep;
                //union
                if (!includeAInsideB && !includeBInsideA) {
                    shouldKeep = function (walkedPath) {
                        //When A and B share an outer contour, the segments marked as duplicate will not pass the "inside" test on either A or B.
                        //Duplicates were discarded from B but kept in A
                        for (var i = 0; i < pathsA.overlappedSegments.length; i++) {
                            if (pathsA.overlappedSegments[i].duplicate && walkedPath.pathContext === pathsA.overlappedSegments[i].addedPath) {
                                return false;
                            }
                        }
                        //default - keep the path
                        return true;
                    };
                }
                model.removeDeadEnds(result, null, shouldKeep, function (wp, reason) {
                    var which = wp.route[1] === 'a' ? 0 : 1;
                    trackDeleted(which, wp.pathContext, wp.routeKey, reason);
                });
            }
            //pass options back to caller
            MakerJs.extendObject(options, opts);
            return result;
        }
        model.combine = combine;
        /**
         * Combine 2 models, resulting in a intersection. Each model will be modified accordingly.
         *
         * @param modelA First model to combine.
         * @param modelB Second model to combine.
         * @returns A new model containing both of the input models as "a" and "b".
         */
        function combineIntersection(modelA, modelB) {
            return combine(modelA, modelB, true, false, true, false);
        }
        model.combineIntersection = combineIntersection;
        /**
         * Combine 2 models, resulting in a subtraction of B from A. Each model will be modified accordingly.
         *
         * @param modelA First model to combine.
         * @param modelB Second model to combine.
         * @returns A new model containing both of the input models as "a" and "b".
         */
        function combineSubtraction(modelA, modelB) {
            return combine(modelA, modelB, false, true, true, false);
        }
        model.combineSubtraction = combineSubtraction;
        /**
         * Combine 2 models, resulting in a union. Each model will be modified accordingly.
         *
         * @param modelA First model to combine.
         * @param modelB Second model to combine.
         * @returns A new model containing both of the input models as "a" and "b".
         */
        function combineUnion(modelA, modelB) {
            return combine(modelA, modelB, false, true, false, true);
        }
        model.combineUnion = combineUnion;
    })(model = MakerJs.model || (MakerJs.model = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    /**
     * Collects items that share a common key.
     */
    var Collector = /** @class */ (function () {
        function Collector(comparer) {
            this.comparer = comparer;
            this.collections = [];
        }
        Collector.prototype.addItemToCollection = function (key, item) {
            var found = this.findCollection(key);
            if (found) {
                found.push(item);
            }
            else {
                var collection = { key: key, items: [item] };
                this.collections.push(collection);
            }
        };
        Collector.prototype.findCollection = function (key, action) {
            for (var i = 0; i < this.collections.length; i++) {
                var collection = this.collections[i];
                if (this.comparer(key, collection.key)) {
                    if (action) {
                        action(i);
                    }
                    return collection.items;
                }
            }
            return null;
        };
        Collector.prototype.removeCollection = function (key) {
            var _this = this;
            if (this.findCollection(key, function (index) { _this.collections.splice(index, 1); })) {
                return true;
            }
            return false;
        };
        Collector.prototype.removeItemFromCollection = function (key, item) {
            var collection = this.findCollection(key);
            if (!collection)
                return;
            for (var i = 0; i < collection.length; i++) {
                if (collection[i] === item) {
                    collection.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        Collector.prototype.getCollectionsOfMultiple = function (cb) {
            for (var i = 0; i < this.collections.length; i++) {
                var collection = this.collections[i];
                if (collection.items.length > 1) {
                    cb(collection.key, collection.items);
                }
            }
        };
        return Collector;
    }());
    MakerJs.Collector = Collector;
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var model;
    (function (model) {
        /**
         * @private
         */
        function checkForOverlaps(refPaths, isOverlapping, overlapUnion) {
            var currIndex = 0;
            do {
                var root = refPaths[currIndex];
                do {
                    var overlaps = false;
                    for (var i = currIndex + 1; i < refPaths.length; i++) {
                        var arcRef = refPaths[i];
                        overlaps = isOverlapping(root.pathContext, arcRef.pathContext, false);
                        if (overlaps) {
                            overlapUnion(root.pathContext, arcRef.pathContext);
                            delete arcRef.modelContext.paths[arcRef.pathId];
                            refPaths.splice(i, 1);
                            break;
                        }
                    }
                } while (overlaps);
                currIndex++;
            } while (currIndex < refPaths.length);
        }
        /**
         * Simplify a model's paths by reducing redundancy: combine multiple overlapping paths into a single path. The model must be originated.
         *
         * @param modelContext The originated model to search for similar paths.
         * @param options Optional options object.
         * @returns The simplified model (for cascading).
         */
        function simplify(modelToSimplify, options) {
            function compareCircles(circleA, circleB) {
                if (Math.abs(circleA.radius - circleB.radius) <= opts.scalarMatchingDistance) {
                    var distance = MakerJs.measure.pointDistance(circleA.origin, circleB.origin);
                    return distance <= opts.pointMatchingDistance;
                }
                return false;
            }
            var similarArcs = new MakerJs.Collector(compareCircles);
            var similarCircles = new MakerJs.Collector(compareCircles);
            var similarLines = new MakerJs.Collector(MakerJs.measure.isSlopeEqual);
            var map = {};
            map[MakerJs.pathType.Arc] = function (arcRef) {
                similarArcs.addItemToCollection(arcRef.pathContext, arcRef);
            };
            map[MakerJs.pathType.Circle] = function (circleRef) {
                similarCircles.addItemToCollection(circleRef.pathContext, circleRef);
            };
            map[MakerJs.pathType.Line] = function (lineRef) {
                var slope = MakerJs.measure.lineSlope(lineRef.pathContext);
                similarLines.addItemToCollection(slope, lineRef);
            };
            var opts = {
                scalarMatchingDistance: .001,
                pointMatchingDistance: .005
            };
            MakerJs.extendObject(opts, options);
            //walk the model and collect: arcs on same center / radius, circles on same center / radius, lines on same y-intercept / slope.
            var walkOptions = {
                onPath: function (walkedPath) {
                    var fn = map[walkedPath.pathContext.type];
                    if (fn) {
                        fn(walkedPath);
                    }
                }
            };
            model.walk(modelToSimplify, walkOptions);
            //for all arcs that are similar, see if they overlap.
            //combine overlapping arcs into the first one and delete the second.
            similarArcs.getCollectionsOfMultiple(function (key, arcRefs) {
                checkForOverlaps(arcRefs, MakerJs.measure.isArcOverlapping, function (arcA, arcB) {
                    //find ends within the other
                    var aEndsInB = MakerJs.measure.isBetweenArcAngles(arcA.endAngle, arcB, false);
                    var bEndsInA = MakerJs.measure.isBetweenArcAngles(arcB.endAngle, arcA, false);
                    //check for complete circle
                    if (aEndsInB && bEndsInA) {
                        arcA.endAngle = arcA.startAngle + 360;
                        return;
                    }
                    //find the leader, in polar terms
                    var ordered = aEndsInB ? [arcA, arcB] : [arcB, arcA];
                    //save in arcA
                    arcA.startAngle = MakerJs.angle.noRevolutions(ordered[0].startAngle);
                    arcA.endAngle = ordered[1].endAngle;
                });
            });
            //for all circles that are similar, delete all but the first.
            similarCircles.getCollectionsOfMultiple(function (key, circleRefs) {
                for (var i = 1; i < circleRefs.length; i++) {
                    var circleRef = circleRefs[i];
                    delete circleRef.modelContext.paths[circleRef.pathId];
                }
            });
            //for all lines that are similar, see if they overlap.
            //combine overlapping lines into the first one and delete the second.
            similarLines.getCollectionsOfMultiple(function (slope, arcRefs) {
                checkForOverlaps(arcRefs, MakerJs.measure.isLineOverlapping, function (lineA, lineB) {
                    var box = { paths: { lineA: lineA, lineB: lineB } };
                    var m = MakerJs.measure.modelExtents(box);
                    if (!slope.hasSlope) {
                        //vertical
                        lineA.origin[1] = m.low[1];
                        lineA.end[1] = m.high[1];
                    }
                    else {
                        //non-vertical
                        if (slope.slope < 0) {
                            //downward
                            lineA.origin = [m.low[0], m.high[1]];
                            lineA.end = [m.high[0], m.low[1]];
                        }
                        else if (slope.slope > 0) {
                            //upward
                            lineA.origin = m.low;
                            lineA.end = m.high;
                        }
                        else {
                            //horizontal
                            lineA.origin[0] = m.low[0];
                            lineA.end[0] = m.high[0];
                        }
                    }
                });
            });
            return modelToSimplify;
        }
        model.simplify = simplify;
    })(model = MakerJs.model || (MakerJs.model = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var path;
    (function (path) {
        /**
         * @private
         */
        var map = {};
        map[MakerJs.pathType.Arc] = function (arc, expansion, isolateCaps) {
            return new MakerJs.models.OvalArc(arc.startAngle, arc.endAngle, arc.radius, expansion, false, isolateCaps);
        };
        map[MakerJs.pathType.Circle] = function (circle, expansion, isolateCaps) {
            return new MakerJs.models.Ring(circle.radius + expansion, circle.radius - expansion);
        };
        map[MakerJs.pathType.Line] = function (line, expansion, isolateCaps) {
            return new MakerJs.models.Slot(line.origin, line.end, expansion, isolateCaps);
        };
        /**
         * Expand path by creating a model which surrounds it.
         *
         * @param pathToExpand Path to expand.
         * @param expansion Distance to expand.
         * @param isolateCaps Optional flag to put the end caps into a separate model named "caps".
         * @returns Model which surrounds the path.
         */
        function expand(pathToExpand, expansion, isolateCaps) {
            if (!pathToExpand)
                return null;
            var result = null;
            var fn = map[pathToExpand.type];
            if (fn) {
                result = fn(pathToExpand, expansion, isolateCaps);
                result.origin = pathToExpand.origin;
            }
            return result;
        }
        path.expand = expand;
        /**
         * Represent an arc using straight lines.
         *
         * @param arc Arc to straighten.
         * @param bevel Optional flag to bevel the angle to prevent it from being too sharp.
         * @param prefix Optional string prefix to apply to path ids.
         * @param close Optional flag to make a closed geometry by connecting the endpoints.
         * @returns Model of straight lines with same endpoints as the arc.
         */
        function straighten(arc, bevel, prefix, close) {
            var arcSpan = MakerJs.angle.ofArcSpan(arc);
            var joints = 1;
            if (arcSpan >= 270) {
                joints = 4;
            }
            else if (arcSpan > 180) {
                joints = 3;
            }
            else if (arcSpan > 150 || bevel) {
                joints = 2;
            }
            var jointAngleInRadians = MakerJs.angle.toRadians(arcSpan / joints);
            var circumscribedRadius = MakerJs.models.Polygon.circumscribedRadius(arc.radius, jointAngleInRadians);
            var ends = MakerJs.point.fromArc(arc);
            var points = [MakerJs.point.subtract(ends[0], arc.origin)];
            var a = MakerJs.angle.toRadians(arc.startAngle) + jointAngleInRadians / 2;
            for (var i = 0; i < joints; i++) {
                points.push(MakerJs.point.fromPolar(a, circumscribedRadius));
                a += jointAngleInRadians;
            }
            points.push(MakerJs.point.subtract(ends[1], arc.origin));
            var result = new MakerJs.models.ConnectTheDots(close, points);
            result.origin = arc.origin;
            if (typeof prefix === 'string' && prefix.length) {
                MakerJs.model.prefixPathIds(result, prefix);
            }
            return result;
        }
        path.straighten = straighten;
    })(path = MakerJs.path || (MakerJs.path = {}));
})(MakerJs || (MakerJs = {}));
(function (MakerJs) {
    var model;
    (function (model) {
        /**
         * Expand all paths in a model, then combine the resulting expansions.
         *
         * @param modelToExpand Model to expand.
         * @param distance Distance to expand.
         * @param joints Number of points at a joint between paths. Use 0 for round joints, 1 for pointed joints, 2 for beveled joints.
         * @param combineOptions Optional object containing combine options.
         * @returns Model which surrounds the paths of the original model.
         */
        function expandPaths(modelToExpand, distance, joints, combineOptions) {
            if (joints === void 0) { joints = 0; }
            if (combineOptions === void 0) { combineOptions = {}; }
            if (distance <= 0)
                return null;
            var result = {
                models: {
                    expansions: { models: {} },
                    caps: { models: {} }
                }
            };
            var first = true;
            var lastFarPoint = combineOptions.farPoint;
            var walkOptions = {
                onPath: function (walkedPath) {
                    //don't expand paths shorter than the tolerance for combine operations
                    if (combineOptions.pointMatchingDistance && MakerJs.measure.pathLength(walkedPath.pathContext) < combineOptions.pointMatchingDistance)
                        return;
                    var expandedPathModel = MakerJs.path.expand(walkedPath.pathContext, distance, true);
                    if (expandedPathModel) {
                        model.moveRelative(expandedPathModel, walkedPath.offset);
                        var newId = model.getSimilarModelId(result.models['expansions'], walkedPath.pathId);
                        model.prefixPathIds(expandedPathModel, walkedPath.pathId + '_');
                        model.originate(expandedPathModel);
                        if (!first) {
                            model.combine(result, expandedPathModel, false, true, false, true, combineOptions);
                            combineOptions.measureA.modelsMeasured = false;
                            lastFarPoint = combineOptions.farPoint;
                            delete combineOptions.farPoint;
                            delete combineOptions.measureB;
                        }
                        result.models['expansions'].models[newId] = expandedPathModel;
                        if (expandedPathModel.models) {
                            var caps = expandedPathModel.models['Caps'];
                            if (caps) {
                                delete expandedPathModel.models['Caps'];
                                result.models['caps'].models[newId] = caps;
                            }
                        }
                        first = false;
                    }
                }
            };
            model.walk(modelToExpand, walkOptions);
            if (joints) {
                var roundCaps = result.models['caps'];
                var straightCaps = { models: {} };
                result.models['straightcaps'] = straightCaps;
                model.simplify(roundCaps);
                //straighten each cap, optionally beveling
                for (var id in roundCaps.models) {
                    //add a model container to the straight caps
                    straightCaps.models[id] = { models: {} };
                    model.walk(roundCaps.models[id], {
                        onPath: function (walkedPath) {
                            var arc = walkedPath.pathContext;
                            //make a small closed shape using the straightened arc
                            var straightened = MakerJs.path.straighten(arc, joints == 2, walkedPath.pathId + '_', true);
                            //union this little pointy shape with the rest of the result
                            model.combine(result, straightened, false, true, false, true, combineOptions);
                            combineOptions.measureA.modelsMeasured = false;
                            lastFarPoint = combineOptions.farPoint;
                            delete combineOptions.farPoint;
                            delete combineOptions.measureB;
                            //replace the rounded path with the straightened model
                            straightCaps.models[id].models[walkedPath.pathId] = straightened;
                            //delete all the paths in the model containing this path
                            delete walkedPath.modelContext.paths;
                        }
                    });
                }
                //delete the round caps
                delete result.models['caps'];
            }
            combineOptions.farPoint = lastFarPoint;
            return result;
        }
        model.expandPaths = expandPaths;
        /**
         * @private
         */
        function getEndlessChains(modelContext) {
            var endlessChains = [];
            model.findChains(modelContext, function (chains, loose, layer) {
                endlessChains = chains.filter(function (chain) { return chain.endless; });
            });
            return endlessChains;
        }
        /**
         * @private
         */
        function getClosedGeometries(modelContext) {
            //get endless chains from the model
            var endlessChains = getEndlessChains(modelContext);
            if (endlessChains.length == 0)
                return null;
            //make a new model with only closed geometries
            var closed = { models: {} };
            endlessChains.forEach(function (c, i) {
                closed.models[i] = MakerJs.chain.toNewModel(c);
            });
            return closed;
        }
        /**
         * Outline a model by a specified distance. Useful for accommodating for kerf.
         *
         * @param modelToOutline Model to outline.
         * @param distance Distance to outline.
         * @param joints Number of points at a joint between paths. Use 0 for round joints, 1 for pointed joints, 2 for beveled joints.
         * @param inside Optional boolean to draw lines inside the model instead of outside.
         * @param options Options to send to combine() function.
         * @returns Model which surrounds the paths outside of the original model.
         */
        function outline(modelToOutline, distance, joints, inside, options) {
            if (joints === void 0) { joints = 0; }
            if (inside === void 0) { inside = false; }
            if (options === void 0) { options = {}; }
            var expanded = expandPaths(modelToOutline, distance, joints, options);
            if (!expanded)
                return null;
            //get closed geometries from the model
            var closed = getClosedGeometries(modelToOutline);
            if (closed) {
                var childCount = 0;
                var result = { models: {} };
                //get closed geometries from the expansion
                var chains = getEndlessChains(expanded);
                chains.forEach(function (c) {
                    //sample one link from the chain
                    var wp = c.links[0].walkedPath;
                    //see if it is inside the original model
                    var isInside = MakerJs.measure.isPointInsideModel(MakerJs.point.middle(wp.pathContext), closed, wp.offset);
                    //save the ones we want
                    if (inside && isInside || !inside && !isInside) {
                        result.models[childCount++] = MakerJs.chain.toNewModel(c);
                    }
                    ;
                });
                return result;
            }
            else {
                return expanded;
            }
        }
        model.outline = outline;
    })(model = MakerJs.model || (MakerJs.model = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var units;
    (function (units) {
        /**
         * The base type is arbitrary. Other conversions are then based off of this.
         * @private
         */
        var base = MakerJs.unitType.Millimeter;
        /**
         * Initialize all known conversions here.
         * @private
         */
        function init() {
            addBaseConversion(MakerJs.unitType.Centimeter, 10);
            addBaseConversion(MakerJs.unitType.Meter, 1000);
            addBaseConversion(MakerJs.unitType.Inch, 25.4);
            addBaseConversion(MakerJs.unitType.Foot, 25.4 * 12);
        }
        /**
         * Table of conversions. Lazy load upon first conversion.
         * @private
         */
        var table;
        /**
         * Add a conversion, and its inversion.
         * @private
         */
        function addConversion(srcUnitType, destUnitType, value) {
            function row(unitType) {
                if (!table[unitType]) {
                    table[unitType] = {};
                }
                return table[unitType];
            }
            row(srcUnitType)[destUnitType] = value;
            row(destUnitType)[srcUnitType] = 1 / value;
        }
        /**
         * Add a conversion of the base unit.
         * @private
         */
        function addBaseConversion(destUnitType, value) {
            addConversion(destUnitType, base, value);
        }
        /**
         * Get a conversion ratio between a source unit and a destination unit.
         *
         * @param srcUnitType unitType converting from.
         * @param destUnitType unitType converting to.
         * @returns Numeric ratio of the conversion.
         */
        function conversionScale(srcUnitType, destUnitType) {
            if (srcUnitType == destUnitType) {
                return 1;
            }
            //This will lazy load the table with initial conversions.
            if (!table) {
                table = {};
                init();
            }
            //look for a cached conversion in the table.
            if (!table[srcUnitType][destUnitType]) {
                //create a new conversionsand cache it in the table.
                addConversion(srcUnitType, destUnitType, table[srcUnitType][base] * table[base][destUnitType]);
            }
            return table[srcUnitType] && table[srcUnitType][destUnitType];
        }
        units.conversionScale = conversionScale;
        /**
         * Check to see if unit type is a valid Maker.js unit.
         *
         * @param tryUnit unit type to check.
         * @returns Boolean true if unit type is valid.
         */
        function isValidUnit(tryUnit) {
            for (var id in MakerJs.unitType) {
                if (MakerJs.unitType[id] == tryUnit) {
                    return true;
                }
            }
            return false;
        }
        units.isValidUnit = isValidUnit;
    })(units = MakerJs.units || (MakerJs.units = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var measure;
    (function (measure) {
        /**
         * Find out if two angles are equal.
         *
         * @param angleA First angle.
         * @param angleB Second angle.
         * @returns true if angles are the same, false if they are not
         */
        function isAngleEqual(angleA, angleB, accuracy) {
            if (accuracy === void 0) { accuracy = .0001; }
            var a = MakerJs.angle.noRevolutions(angleA);
            var b = MakerJs.angle.noRevolutions(angleB);
            var d = MakerJs.angle.noRevolutions(MakerJs.round(b - a, accuracy));
            return d == 0;
        }
        measure.isAngleEqual = isAngleEqual;
        /**
         * @private
         */
        var pathAreEqualMap = {};
        pathAreEqualMap[MakerJs.pathType.Line] = function (lineA, lineB, withinPointDistance) {
            return (isPointEqual(lineA.origin, lineB.origin, withinPointDistance) && isPointEqual(lineA.end, lineB.end, withinPointDistance))
                || (isPointEqual(lineA.origin, lineB.end, withinPointDistance) && isPointEqual(lineA.end, lineB.origin, withinPointDistance));
        };
        pathAreEqualMap[MakerJs.pathType.Circle] = function (circleA, circleB, withinPointDistance) {
            return isPointEqual(circleA.origin, circleB.origin, withinPointDistance) && circleA.radius == circleB.radius;
        };
        pathAreEqualMap[MakerJs.pathType.Arc] = function (arcA, arcB, withinPointDistance) {
            return pathAreEqualMap[MakerJs.pathType.Circle](arcA, arcB, withinPointDistance) && isAngleEqual(arcA.startAngle, arcB.startAngle) && isAngleEqual(arcA.endAngle, arcB.endAngle);
        };
        /**
         * Find out if two paths are equal.
         *
         * @param pathA First path.
         * @param pathB Second path.
         * @returns true if paths are the same, false if they are not
         */
        function isPathEqual(pathA, pathB, withinPointDistance, pathAOffset, pathBOffset) {
            var result = false;
            if (pathA.type == pathB.type) {
                var fn = pathAreEqualMap[pathA.type];
                if (fn) {
                    function getResult() {
                        result = fn(pathA, pathB, withinPointDistance);
                    }
                    if (pathAOffset || pathBOffset) {
                        MakerJs.path.moveTemporary([pathA, pathB], [pathAOffset, pathBOffset], getResult);
                    }
                    else {
                        getResult();
                    }
                }
            }
            return result;
        }
        measure.isPathEqual = isPathEqual;
        /**
         * Find out if two points are equal.
         *
         * @param a First point.
         * @param b Second point.
         * @param withinDistance Optional distance to consider points equal.
         * @returns true if points are the same, false if they are not
         */
        function isPointEqual(a, b, withinDistance) {
            if (!withinDistance) {
                return MakerJs.round(a[0] - b[0]) == 0 && MakerJs.round(a[1] - b[1]) == 0;
            }
            else {
                if (!a || !b)
                    return false;
                var distance = measure.pointDistance(a, b);
                return distance <= withinDistance;
            }
        }
        measure.isPointEqual = isPointEqual;
        /**
         * Find out if a point is distinct among an array of points.
         *
         * @param pointToCheck point to check.
         * @param pointArray array of points.
         * @param withinDistance Optional distance to consider points equal.
         * @returns false if point is equal to any point in the array.
         */
        function isPointDistinct(pointToCheck, pointArray, withinDistance) {
            for (var i = 0; i < pointArray.length; i++) {
                if (isPointEqual(pointArray[i], pointToCheck, withinDistance)) {
                    return false;
                }
            }
            return true;
        }
        measure.isPointDistinct = isPointDistinct;
        /**
         * Find out if point is on a slope.
         *
         * @param p Point to check.
         * @param b Slope.
         * @param withinDistance Optional distance of tolerance.
         * @returns true if point is on the slope
         */
        function isPointOnSlope(p, slope, withinDistance) {
            if (withinDistance === void 0) { withinDistance = 0; }
            if (slope.hasSlope) {
                // y = mx * b
                return Math.abs(p[1] - (slope.slope * p[0] + slope.yIntercept)) <= withinDistance;
            }
            else {
                //vertical slope
                return Math.abs(p[0] - slope.line.origin[0]) <= withinDistance;
            }
        }
        measure.isPointOnSlope = isPointOnSlope;
        /**
         * Find out if point is on a circle.
         *
         * @param p Point to check.
         * @param circle Circle.
         * @param withinDistance Optional distance of tolerance.
         * @returns true if point is on the circle
         */
        function isPointOnCircle(p, circle, withinDistance) {
            if (withinDistance === void 0) { withinDistance = 0; }
            var d = Math.abs(measure.pointDistance(p, circle.origin) - circle.radius);
            return d <= withinDistance;
        }
        measure.isPointOnCircle = isPointOnCircle;
        /**
         * private
         */
        var onPathMap = {};
        onPathMap[MakerJs.pathType.Circle] = function (p, circle, withinDistance) {
            return isPointOnCircle(p, circle, withinDistance);
        };
        onPathMap[MakerJs.pathType.Arc] = function (p, arc, withinDistance) {
            if (onPathMap[MakerJs.pathType.Circle](p, arc, withinDistance)) {
                var a = MakerJs.angle.ofPointInDegrees(arc.origin, p);
                return measure.isBetweenArcAngles(a, arc, false);
            }
            return false;
        };
        onPathMap[MakerJs.pathType.Line] = function (p, line, withinDistance, options) {
            var slope = (options && options.cachedLineSlope) || measure.lineSlope(line);
            if (options && !options.cachedLineSlope) {
                options.cachedLineSlope = slope;
            }
            return isPointOnSlope(p, slope, withinDistance) && measure.isBetweenPoints(p, line, false);
        };
        /**
         * Find out if a point lies on a path.
         * @param pointToCheck point to check.
         * @param onPath path to check against.
         * @param withinDistance Optional distance to consider point on the path.
         * @param pathOffset Optional offset of path from [0, 0].
         * @param options Optional IIsPointOnPathOptions to cache computation.
         */
        function isPointOnPath(pointToCheck, onPath, withinDistance, pathOffset, options) {
            if (withinDistance === void 0) { withinDistance = 0; }
            var fn = onPathMap[onPath.type];
            if (fn) {
                var offsetPath = pathOffset ? MakerJs.path.clone(onPath, pathOffset) : onPath;
                return fn(pointToCheck, offsetPath, withinDistance, options);
            }
            return false;
        }
        measure.isPointOnPath = isPointOnPath;
        /**
         * Check for slope equality.
         *
         * @param slopeA The ISlope to test.
         * @param slopeB The ISlope to check for equality.
         * @returns Boolean true if slopes are equal.
         */
        function isSlopeEqual(slopeA, slopeB) {
            if (!isSlopeParallel(slopeA, slopeB))
                return false;
            if (!slopeA.hasSlope && !slopeB.hasSlope) {
                //lines are both vertical, see if x are the same
                return MakerJs.round(slopeA.line.origin[0] - slopeB.line.origin[0]) == 0;
            }
            //lines are parallel, but not vertical, see if y-intercept is the same
            return MakerJs.round(slopeA.yIntercept - slopeB.yIntercept, .00001) == 0;
        }
        measure.isSlopeEqual = isSlopeEqual;
        /**
         * Check for parallel slopes.
         *
         * @param slopeA The ISlope to test.
         * @param slopeB The ISlope to check for parallel.
         * @returns Boolean true if slopes are parallel.
         */
        function isSlopeParallel(slopeA, slopeB) {
            if (!slopeA.hasSlope && !slopeB.hasSlope) {
                return true;
            }
            if (slopeA.hasSlope && slopeB.hasSlope && (MakerJs.round(slopeA.slope - slopeB.slope, .00001) == 0)) {
                //lines are parallel
                return true;
            }
            return false;
        }
        measure.isSlopeParallel = isSlopeParallel;
    })(measure = MakerJs.measure || (MakerJs.measure = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var measure;
    (function (measure) {
        /**
         * Increase a measurement by an additional measurement.
         *
         * @param baseMeasure The measurement to increase.
         * @param addMeasure The additional measurement.
         * @param addOffset Optional offset point of the additional measurement.
         * @returns The increased original measurement (for cascading).
         */
        function increase(baseMeasure, addMeasure) {
            function getExtreme(basePoint, newPoint, fn) {
                if (!newPoint)
                    return;
                for (var i = 2; i--;) {
                    if (newPoint[i] == null)
                        continue;
                    if (basePoint[i] == null) {
                        basePoint[i] = newPoint[i];
                    }
                    else {
                        basePoint[i] = fn(basePoint[i], newPoint[i]);
                    }
                }
            }
            if (addMeasure) {
                getExtreme(baseMeasure.low, addMeasure.low, Math.min);
                getExtreme(baseMeasure.high, addMeasure.high, Math.max);
            }
            return baseMeasure;
        }
        measure.increase = increase;
        /**
         * Check for arc being concave or convex towards a given point.
         *
         * @param arc The arc to test.
         * @param towardsPoint The point to test.
         * @returns Boolean true if arc is concave towards point.
         */
        function isArcConcaveTowardsPoint(arc, towardsPoint) {
            if (pointDistance(arc.origin, towardsPoint) <= arc.radius) {
                return true;
            }
            var midPointToNearPoint = new MakerJs.paths.Line(MakerJs.point.middle(arc), towardsPoint);
            var options = {};
            var intersectionPoint = MakerJs.path.intersection(midPointToNearPoint, new MakerJs.paths.Chord(arc), options);
            if (intersectionPoint || options.out_AreOverlapped) {
                return true;
            }
            return false;
        }
        measure.isArcConcaveTowardsPoint = isArcConcaveTowardsPoint;
        /**
         * DEPRECATED - use isArcSpanOverlapping() instead.
         */
        function isArcOverlapping(arcA, arcB, excludeTangents) {
            return isArcSpanOverlapping(arcA, arcB, excludeTangents);
        }
        measure.isArcOverlapping = isArcOverlapping;
        /**
         * Check for arc overlapping another arc.
         *
         * @param arcA The arc to test.
         * @param arcB The arc to check for overlap.
         * @param excludeTangents Boolean to exclude exact endpoints and only look for deep overlaps.
         * @returns Boolean true if arcA is overlapped with arcB.
         */
        function isArcSpanOverlapping(arcA, arcB, excludeTangents) {
            var pointsOfIntersection = [];
            function checkAngles(a, b) {
                function checkAngle(n) {
                    return isBetweenArcAngles(n, a, excludeTangents);
                }
                return checkAngle(b.startAngle) || checkAngle(b.endAngle);
            }
            return checkAngles(arcA, arcB) || checkAngles(arcB, arcA) || (arcA.startAngle == arcB.startAngle && arcA.endAngle == arcB.endAngle);
        }
        measure.isArcSpanOverlapping = isArcSpanOverlapping;
        /**
         * Check if a given number is between two given limits.
         *
         * @param valueInQuestion The number to test.
         * @param limitA First limit.
         * @param limitB Second limit.
         * @param exclusive Flag to exclude equaling the limits.
         * @returns Boolean true if value is between (or equal to) the limits.
         */
        function isBetween(valueInQuestion, limitA, limitB, exclusive) {
            if (exclusive) {
                return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
            }
            else {
                return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
            }
        }
        measure.isBetween = isBetween;
        /**
         * Check if a given angle is between an arc's start and end angles.
         *
         * @param angleInQuestion The angle to test.
         * @param arc Arc to test against.
         * @param exclusive Flag to exclude equaling the start or end angles.
         * @returns Boolean true if angle is between (or equal to) the arc's start and end angles.
         */
        function isBetweenArcAngles(angleInQuestion, arc, exclusive) {
            var startAngle = MakerJs.angle.noRevolutions(arc.startAngle);
            var span = MakerJs.angle.ofArcSpan(arc);
            var endAngle = startAngle + span;
            angleInQuestion = MakerJs.angle.noRevolutions(angleInQuestion);
            //computed angles will not be negative, but the arc may have specified a negative angle, so check against one revolution forward and backward
            return (isBetween(angleInQuestion, startAngle, endAngle, exclusive) || isBetween(angleInQuestion, startAngle + 360, endAngle + 360, exclusive) || isBetween(angleInQuestion, startAngle - 360, endAngle - 360, exclusive));
        }
        measure.isBetweenArcAngles = isBetweenArcAngles;
        /**
         * Check if a given point is between a line's end points.
         *
         * @param pointInQuestion The point to test.
         * @param line Line to test against.
         * @param exclusive Flag to exclude equaling the origin or end points.
         * @returns Boolean true if point is between (or equal to) the line's origin and end points.
         */
        function isBetweenPoints(pointInQuestion, line, exclusive) {
            var oneDimension = false;
            for (var i = 2; i--;) {
                if (MakerJs.round(line.origin[i] - line.end[i], .000001) == 0) {
                    if (oneDimension)
                        return false;
                    oneDimension = true;
                    continue;
                }
                var origin_value = MakerJs.round(line.origin[i]);
                var end_value = MakerJs.round(line.end[i]);
                if (!isBetween(MakerJs.round(pointInQuestion[i]), origin_value, end_value, exclusive))
                    return false;
            }
            return true;
        }
        measure.isBetweenPoints = isBetweenPoints;
        /**
         * Check if a given bezier seed has all points on the same slope.
         *
         * @param seed The bezier seed to test.
         * @param exclusive Optional boolean to test only within the boundary of the endpoints.
         * @returns Boolean true if bezier seed has control points on the line slope and between the line endpoints.
         */
        function isBezierSeedLinear(seed, exclusive) {
            //create a slope from the endpoints
            var slope = lineSlope(seed);
            for (var i = 0; i < seed.controls.length; i++) {
                if (!(measure.isPointOnSlope(seed.controls[i], slope))) {
                    if (!exclusive)
                        return false;
                    if (isBetweenPoints(seed.controls[i], seed, false))
                        return false;
                }
            }
            return true;
        }
        measure.isBezierSeedLinear = isBezierSeedLinear;
        var graham_scan = require('graham_scan');
        /**
         * @private
         */
        function serializePoint(p) {
            return p.join(',');
        }
        /**
         * Check for flow of paths in a chain being clockwise or not.
         *
         * @param chainContext The chain to test.
         * @param out_result Optional output object, if provided, will be populated with convex hull results.
         * @returns Boolean true if paths in the chain flow clockwise.
         */
        function isChainClockwise(chainContext, out_result) {
            //cannot do non-endless or circle
            if (!chainContext.endless || chainContext.links.length === 1) {
                return null;
            }
            var keyPoints = MakerJs.chain.toKeyPoints(chainContext);
            return isPointArrayClockwise(keyPoints, out_result);
        }
        measure.isChainClockwise = isChainClockwise;
        /**
         * Check for array of points being clockwise or not.
         *
         * @param points The array of points to test.
         * @param out_result Optional output object, if provided, will be populated with convex hull results.
         * @returns Boolean true if points flow clockwise.
         */
        function isPointArrayClockwise(points, out_result) {
            var convexHull = new graham_scan();
            var pointsInOrder = [];
            function add(endPoint) {
                convexHull.addPoint(endPoint[0], endPoint[1]);
                pointsInOrder.push(serializePoint(endPoint));
            }
            points.forEach(add);
            //we only need to deal with 3 points
            var hull = convexHull.getHull();
            var hullPoints = hull.slice(0, 3).map(function (p) { return serializePoint([p.x, p.y]); });
            var ordered = [];
            pointsInOrder.forEach(function (p) {
                if (~hullPoints.indexOf(p))
                    ordered.push(p);
            });
            //now make sure endpoints of hull are endpoints of ordered. do this by managing the middle point
            switch (ordered.indexOf(hullPoints[1])) {
                case 0:
                    //shift down
                    ordered.unshift(ordered.pop());
                    break;
                case 2:
                    //shift up
                    ordered.push(ordered.shift());
                    break;
            }
            if (out_result) {
                out_result.hullPoints = hull.map(function (p) { return [p.x, p.y]; });
                out_result.keyPoints = points;
            }
            //the hull is counterclockwise, so the result is clockwise if the first elements do not match
            return hullPoints[0] != ordered[0];
        }
        measure.isPointArrayClockwise = isPointArrayClockwise;
        /**
         * Check for line overlapping another line.
         *
         * @param lineA The line to test.
         * @param lineB The line to check for overlap.
         * @param excludeTangents Boolean to exclude exact endpoints and only look for deep overlaps.
         * @returns Boolean true if lineA is overlapped with lineB.
         */
        function isLineOverlapping(lineA, lineB, excludeTangents) {
            var pointsOfIntersection = [];
            function checkPoints(index, a, b) {
                function checkPoint(p) {
                    return isBetweenPoints(p, a, excludeTangents);
                }
                return checkPoint(b.origin) || checkPoint(b.end);
            }
            return checkPoints(0, lineA, lineB) || checkPoints(1, lineB, lineA);
        }
        measure.isLineOverlapping = isLineOverlapping;
        /**
         * Check for measurement overlapping another measurement.
         *
         * @param measureA The measurement to test.
         * @param measureB The measurement to check for overlap.
         * @returns Boolean true if measureA is overlapped with measureB.
         */
        function isMeasurementOverlapping(measureA, measureB) {
            for (var i = 2; i--;) {
                if (!(MakerJs.round(measureA.low[i] - measureB.high[i]) <= 0 && MakerJs.round(measureA.high[i] - measureB.low[i]) >= 0))
                    return false;
            }
            return true;
        }
        measure.isMeasurementOverlapping = isMeasurementOverlapping;
        /**
         * Gets the slope of a line.
         */
        function lineSlope(line) {
            var dx = line.end[0] - line.origin[0];
            if (MakerJs.round(dx, .000001) == 0) {
                return {
                    line: line,
                    hasSlope: false
                };
            }
            var dy = line.end[1] - line.origin[1];
            var slope = dy / dx;
            var yIntercept = line.origin[1] - slope * line.origin[0];
            return {
                line: line,
                hasSlope: true,
                slope: slope,
                yIntercept: yIntercept
            };
        }
        measure.lineSlope = lineSlope;
        /**
         * Calculates the distance between two points.
         *
         * @param a First point.
         * @param b Second point.
         * @returns Distance between points.
         */
        function pointDistance(a, b) {
            var dx = b[0] - a[0];
            var dy = b[1] - a[1];
            return Math.sqrt(dx * dx + dy * dy);
        }
        measure.pointDistance = pointDistance;
        /**
         * @private
         */
        function getExtremePoint(a, b, fn) {
            return [
                fn(a[0], b[0]),
                fn(a[1], b[1])
            ];
        }
        /**
         * @private
         */
        var pathExtentsMap = {};
        pathExtentsMap[MakerJs.pathType.Line] = function (line) {
            return {
                low: getExtremePoint(line.origin, line.end, Math.min),
                high: getExtremePoint(line.origin, line.end, Math.max)
            };
        };
        pathExtentsMap[MakerJs.pathType.Circle] = function (circle) {
            var r = circle.radius;
            return {
                low: MakerJs.point.add(circle.origin, [-r, -r]),
                high: MakerJs.point.add(circle.origin, [r, r])
            };
        };
        pathExtentsMap[MakerJs.pathType.Arc] = function (arc) {
            var r = arc.radius;
            var arcPoints = MakerJs.point.fromArc(arc);
            function extremeAngle(xyAngle, value, fn) {
                var extremePoint = getExtremePoint(arcPoints[0], arcPoints[1], fn);
                for (var i = 2; i--;) {
                    if (isBetweenArcAngles(xyAngle[i], arc, false)) {
                        extremePoint[i] = value + arc.origin[i];
                    }
                }
                return extremePoint;
            }
            return {
                low: extremeAngle([180, 270], -r, Math.min),
                high: extremeAngle([360, 90], r, Math.max)
            };
        };
        /**
         * Calculates the smallest rectangle which contains a path.
         *
         * @param pathToMeasure The path to measure.
         * @returns object with low and high points.
         */
        function pathExtents(pathToMeasure, addOffset) {
            if (pathToMeasure) {
                var fn = pathExtentsMap[pathToMeasure.type];
                if (fn) {
                    var m = fn(pathToMeasure);
                    if (addOffset) {
                        m.high = MakerJs.point.add(m.high, addOffset);
                        m.low = MakerJs.point.add(m.low, addOffset);
                    }
                    return m;
                }
            }
            return { low: null, high: null };
        }
        measure.pathExtents = pathExtents;
        /**
         * @private
         */
        var pathLengthMap = {};
        pathLengthMap[MakerJs.pathType.Line] = function (line) {
            return pointDistance(line.origin, line.end);
        };
        pathLengthMap[MakerJs.pathType.Circle] = function (circle) {
            return 2 * Math.PI * circle.radius;
        };
        pathLengthMap[MakerJs.pathType.Arc] = function (arc) {
            var value = pathLengthMap[MakerJs.pathType.Circle](arc);
            var pct = MakerJs.angle.ofArcSpan(arc) / 360;
            value *= pct;
            return value;
        };
        pathLengthMap[MakerJs.pathType.BezierSeed] = function (seed) {
            return MakerJs.models.BezierCurve.computeLength(seed);
        };
        /**
         * Measures the length of a path.
         *
         * @param pathToMeasure The path to measure.
         * @returns Length of the path.
         */
        function pathLength(pathToMeasure) {
            if (pathToMeasure) {
                var fn = pathLengthMap[pathToMeasure.type];
                if (fn) {
                    return fn(pathToMeasure);
                }
            }
            return 0;
        }
        measure.pathLength = pathLength;
        /**
         * Measures the length of all paths in a model.
         *
         * @param modelToMeasure The model containing paths to measure.
         * @returns Length of all paths in the model.
         */
        function modelPathLength(modelToMeasure) {
            var total = 0;
            MakerJs.model.walk(modelToMeasure, {
                onPath: function (walkedPath) {
                    total += pathLength(walkedPath.pathContext);
                }
            });
            return total;
        }
        measure.modelPathLength = modelPathLength;
        /**
         * @private
         */
        function cloneMeasure(measureToclone) {
            return {
                high: MakerJs.point.clone(measureToclone.high),
                low: MakerJs.point.clone(measureToclone.low)
            };
        }
        /**
         * Measures the smallest rectangle which contains a model.
         *
         * @param modelToMeasure The model to measure.
         * @param atlas Optional atlas to save measurements.
         * @returns object with low and high points.
         */
        function modelExtents(modelToMeasure, atlas) {
            function increaseParentModel(childRoute, childMeasurement) {
                if (!childMeasurement)
                    return;
                //to get the parent route, just traverse backwards 2 to remove id and 'paths' / 'models'
                var parentRoute = childRoute.slice(0, -2);
                var parentRouteKey = MakerJs.createRouteKey(parentRoute);
                if (!(parentRouteKey in atlas.modelMap)) {
                    //just start with the known size
                    atlas.modelMap[parentRouteKey] = cloneMeasure(childMeasurement);
                }
                else {
                    increase(atlas.modelMap[parentRouteKey], childMeasurement);
                }
            }
            if (!atlas)
                atlas = new Atlas(modelToMeasure);
            var walkOptions = {
                onPath: function (walkedPath) {
                    //trust that the path measurement is good
                    if (!(walkedPath.routeKey in atlas.pathMap)) {
                        atlas.pathMap[walkedPath.routeKey] = pathExtents(walkedPath.pathContext, walkedPath.offset);
                    }
                    increaseParentModel(walkedPath.route, atlas.pathMap[walkedPath.routeKey]);
                },
                afterChildWalk: function (walkedModel) {
                    //model has been updated by all its children, update parent
                    increaseParentModel(walkedModel.route, atlas.modelMap[walkedModel.routeKey]);
                }
            };
            MakerJs.model.walk(modelToMeasure, walkOptions);
            atlas.modelsMeasured = true;
            var m = atlas.modelMap[''];
            if (m) {
                return augment(m);
            }
            return m;
        }
        measure.modelExtents = modelExtents;
        /**
         * Augment a measurement - add more properties such as center point, height and width.
         *
         * @param measureToAugment The measurement to augment.
         * @returns Measurement object with augmented properties.
         */
        function augment(measureToAugment) {
            var m = measureToAugment;
            m.center = MakerJs.point.average(m.high, m.low);
            m.width = m.high[0] - m.low[0];
            m.height = m.high[1] - m.low[1];
            return m;
        }
        measure.augment = augment;
        /**
         * A list of maps of measurements.
         *
         * @param modelToMeasure The model to measure.
         * @param atlas Optional atlas to save measurements.
         * @returns object with low and high points.
         */
        var Atlas = /** @class */ (function () {
            /**
             * Constructor.
             * @param modelContext The model to measure.
             */
            function Atlas(modelContext) {
                this.modelContext = modelContext;
                /**
                 * Flag that models have been measured.
                 */
                this.modelsMeasured = false;
                /**
                 * Map of model measurements, mapped by routeKey.
                 */
                this.modelMap = {};
                /**
                 * Map of path measurements, mapped by routeKey.
                 */
                this.pathMap = {};
            }
            Atlas.prototype.measureModels = function () {
                if (!this.modelsMeasured) {
                    modelExtents(this.modelContext, this);
                }
            };
            return Atlas;
        }());
        measure.Atlas = Atlas;
        /**
         * @private
         */
        function loopIndex(base, i) {
            if (i >= base)
                return i - base;
            if (i < 0)
                return i + base;
            return i;
        }
        /**
         * @private
         */
        function yAtX(slope, x) {
            return slope.slope * x + slope.yIntercept;
        }
        /**
         * @private
         */
        function pointOnSlopeAtX(line, x) {
            var slope = lineSlope(line);
            return [x, yAtX(slope, x)];
        }
        /**
         * @private
         */
        function isCircular(bounds) {
            for (var i = 1; i < 3; i++) {
                if (!measure.isPointEqual(bounds[0].center, bounds[i].center, .000001) || !(MakerJs.round(bounds[0].width - bounds[i].width) === 0)) {
                    return false;
                }
            }
            return true;
        }
        /**
         * @private
         */
        function getAngledBounds(index, modelToMeasure, rotateModel, rotatePaths) {
            MakerJs.model.rotate(modelToMeasure, rotateModel);
            var m = modelExtents(modelToMeasure);
            var result = {
                index: index,
                rotation: rotatePaths,
                center: MakerJs.point.rotate(m.center, rotatePaths),
                //model is sideways, so width is based on Y, height is based on X
                width: m.height,
                height: m.width,
                bottom: new MakerJs.paths.Line(m.low, [m.high[0], m.low[1]]),
                middle: new MakerJs.paths.Line([m.low[0], m.center[1]], [m.high[0], m.center[1]]),
                top: new MakerJs.paths.Line(m.high, [m.low[0], m.high[1]])
            };
            [result.top, result.middle, result.bottom].forEach(function (line) { return MakerJs.path.rotate(line, rotatePaths); });
            return result;
        }
        /**
         * @private
         */
        function hexSolution(lines, bounds) {
            var tip = lines[1].origin;
            var tipX = tip[0];
            var left = lines[3].origin[0];
            var right = lines[0].origin[0];
            //see if left edge is in bounds if right edge is on the hex boundary
            var altRight = tipX - right;
            if ((right - left) > 2 * altRight)
                return null;
            //see if right edge is in bounds if left edge is on the hex boundary
            var altLeft = (tipX - left) / 3;
            if (altRight < altLeft)
                return null;
            var altitudeViaSide = Math.min(altLeft, altRight);
            var radiusViaSide = MakerJs.solvers.equilateralSide(altitudeViaSide);
            //find peaks, then find highest peak
            var peakPoints = [MakerJs.point.fromSlopeIntersection(lines[1], lines[2]), MakerJs.point.fromSlopeIntersection(lines[4], lines[5])];
            var peakRadii = peakPoints.map(function (p) { return Math.abs(p[1] - tip[1]); });
            var peakNum = (peakRadii[0] > peakRadii[1]) ? 0 : 1; //top = 0, bottom = 1
            var radiusViaPeak = peakRadii[peakNum];
            if (radiusViaPeak > radiusViaSide) {
                var altitudeViaPeak = MakerJs.solvers.equilateralAltitude(radiusViaPeak);
                var peakX = tipX - 2 * altitudeViaPeak;
                //see if it will contain right side
                if (right > peakX + altitudeViaPeak)
                    return null;
                //see if it will contain left side
                if (left < peakX - altitudeViaPeak)
                    return null;
                //at this point, [tipX - 2 * altitudeViaPeak, tip[1]] is a solution for origin.
                //but we want to best center the result by sliding along the boundary middle, balancing the smallest gap
                var leftGap = left - peakX + altitudeViaPeak;
                var peakGap = 2 * altitudeViaPeak - bounds[peakNum + 1].width;
                var minHalfGap = Math.min(leftGap, peakGap) / 2;
                return {
                    origin: pointOnSlopeAtX(bounds[2 - peakNum].middle, peakX + minHalfGap),
                    radius: radiusViaPeak,
                    type: 'peak ' + peakNum
                };
            }
            else {
                return {
                    origin: [tipX - 2 * altitudeViaSide, tip[1]],
                    radius: radiusViaSide,
                    type: 'side'
                };
            }
        }
        /**
         * Measures the minimum bounding hexagon surrounding a model. The hexagon is oriented such that the right and left sides are vertical, and the top and bottom are pointed.
         *
         * @param modelToMeasure The model to measure.
         * @returns IBoundingHex object which is a hexagon model, with an additional radius property.
         */
        function boundingHexagon(modelToMeasure) {
            var clone = MakerJs.cloneObject(modelToMeasure);
            MakerJs.model.originate(clone);
            var originalMeasure = modelExtents(clone);
            var bounds = [];
            var scratch = { paths: {} };
            MakerJs.model.center(clone);
            function result(radius, origin, notes) {
                return {
                    radius: radius,
                    paths: new MakerJs.models.Polygon(6, radius, 30).paths,
                    origin: MakerJs.point.add(origin, originalMeasure.center),
                    //models: { scratch: scratch },
                    notes: notes
                };
            }
            var boundRotations = [[90, -90], [-60, -30], [-60, 30]];
            while (boundRotations.length) {
                var rotation = boundRotations.shift();
                var bound = getAngledBounds(bounds.length, clone, rotation[0], rotation[1]);
                var side = MakerJs.solvers.equilateralSide(bound.width / 2);
                if (side >= bound.height) {
                    return result(side, bound.center, 'solved by bound ' + bounds.length);
                }
                bounds.push(bound);
            }
            //model.rotate(clone, 30);
            //scratch.models = { clone: clone };
            //check for a circular solution
            if (isCircular(bounds)) {
                return result(MakerJs.solvers.equilateralSide(bounds[0].width / 2), bounds[0].center, 'solved as circular');
            }
            var perimeters = bounds.map(function (b) { return b.top; }).concat(bounds.map(function (b) { return b.bottom; }));
            perimeters.forEach(function (p, i) {
                scratch.paths[i] = p;
                //converge alternate lines to form two triangles
                MakerJs.path.converge(perimeters[loopIndex(6, i + 2)], p, true);
            });
            bounds.forEach(function (b, i) {
                scratch.paths['m' + i] = b.middle;
            });
            var boundCopy = bounds.slice();
            var solution;
            //solve a hexagon for every tip, keeping the smallest one
            for (var i = 0; i < 6; i++) {
                //rotate the scratch area so that we always reference the tip at polar 0
                if (i > 0) {
                    perimeters.push(perimeters.shift());
                    boundCopy.push(boundCopy.shift());
                    MakerJs.model.rotate(scratch, -60);
                }
                var s = hexSolution(perimeters, boundCopy);
                if (s) {
                    if (!solution || s.radius < solution.radius) {
                        solution = s;
                        solution.index = i;
                    }
                }
            }
            var p = MakerJs.point.rotate(solution.origin, solution.index * 60);
            return result(solution.radius, p, 'solved by ' + solution.index + ' as ' + solution.type);
        }
        measure.boundingHexagon = boundingHexagon;
        /**
         * @private
         */
        function addUniquePoints(pointArray, pointsToAdd) {
            var added = 0;
            pointsToAdd.forEach(function (p) {
                if (!measure.isPointDistinct(p, pointArray, .00000001))
                    return;
                pointArray.push(p);
                added++;
            });
            return added;
        }
        /**
         * @private
         */
        function getFarPoint(modelContext, farPoint, measureAtlas) {
            if (farPoint)
                return farPoint;
            var high = modelExtents(modelContext).high;
            if (high) {
                return MakerJs.point.add(high, [1, 1]);
            }
            return [7654321, 1234567];
        }
        /**
         * Check to see if a point is inside of a model.
         *
         * @param pointToCheck The point to check.
         * @param modelContext The model to check against.
         * @param options Optional IMeasurePointInsideOptions object.
         * @returns Boolean true if the path is inside of the modelContext.
         */
        function isPointInsideModel(pointToCheck, modelContext, options) {
            if (options === void 0) { options = {}; }
            if (!options.farPoint) {
                options.farPoint = getFarPoint(modelContext, options.farPoint, options.measureAtlas);
            }
            options.out_intersectionPoints = [];
            var isInside;
            var lineToFarPoint = new MakerJs.paths.Line(pointToCheck, options.farPoint);
            var measureFarPoint = pathExtents(lineToFarPoint);
            var walkOptions = {
                onPath: function (walkedPath) {
                    if (options.measureAtlas && !isMeasurementOverlapping(measureFarPoint, options.measureAtlas.pathMap[walkedPath.routeKey])) {
                        return;
                    }
                    var intersectOptions = { path2Offset: walkedPath.offset };
                    var farInt = MakerJs.path.intersection(lineToFarPoint, walkedPath.pathContext, intersectOptions);
                    if (farInt) {
                        var added = addUniquePoints(options.out_intersectionPoints, farInt.intersectionPoints);
                        //if number of intersections is an odd number, flip the flag.
                        if (added % 2 == 1) {
                            isInside = !!!isInside;
                        }
                    }
                },
                beforeChildWalk: function (innerWalkedModel) {
                    if (!options.measureAtlas) {
                        return true;
                    }
                    //see if there is a model measurement. if not, it is because the model does not contain paths.
                    var innerModelMeasurement = options.measureAtlas.modelMap[innerWalkedModel.routeKey];
                    return innerModelMeasurement && isMeasurementOverlapping(measureFarPoint, innerModelMeasurement);
                }
            };
            MakerJs.model.walk(modelContext, walkOptions);
            return !!isInside;
        }
        measure.isPointInsideModel = isPointInsideModel;
    })(measure = MakerJs.measure || (MakerJs.measure = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var exporter;
    (function (exporter) {
        /**
         * Renders an item in JSON.
         *
         * @param itemToExport Item to render: may be a path, an array of paths, or a model object.
         * @param options Rendering options object.
         * @param options.accuracy Optional exemplar of number of decimal places.
         * @param options.indentation Optional number of characters to indent after a newline.
         * @returns String of DXF content.
         */
        function toJson(itemToExport, options) {
            if (options === void 0) { options = {}; }
            function replacer(key, value) {
                if (MakerJs.isNumber(value)) {
                    var newValue = MakerJs.round(value, options.accuracy);
                    return newValue;
                }
                if (MakerJs.isPoint(value)) {
                    var newPoint = MakerJs.point.rounded(value, options.accuracy);
                    return newPoint;
                }
                return value;
            }
            return JSON.stringify(itemToExport, options.accuracy && replacer, options.indentation);
        }
        exporter.toJson = toJson;
        /**
         * Try to get the unit system from a model
         * @private
         */
        function tryGetModelUnits(itemToExport) {
            if (MakerJs.isModel(itemToExport)) {
                return itemToExport.units;
            }
        }
        exporter.tryGetModelUnits = tryGetModelUnits;
        /**
         * Named colors, safe for CSS and DXF
         * 17 colors from https://www.w3.org/TR/CSS21/syndata.html#value-def-color mapped to DXF equivalent AutoDesk Color Index
         */
        exporter.colors = {
            black: 0,
            red: 1,
            yellow: 2,
            lime: 3,
            aqua: 4,
            blue: 5,
            fuchsia: 6,
            white: 7,
            gray: 9,
            maroon: 14,
            orange: 30,
            olive: 58,
            green: 94,
            teal: 134,
            navy: 174,
            purple: 214,
            silver: 254
        };
    })(exporter = MakerJs.exporter || (MakerJs.exporter = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var importer;
    (function (importer) {
        /**
         * Create a numeric array from a string of numbers. The numbers may be delimited by anything non-numeric.
         *
         * Example:
         * ```
         * var n = makerjs.importer.parseNumericList('5, 10, 15.20 25-30-35 4e1 .5');
         * ```
         *
         * @param s The string of numbers.
         * @returns Array of numbers.
         */
        function parseNumericList(s) {
            var result = [];
            //http://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly
            var re = /[\.-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
            var matches;
            while ((matches = re.exec(s)) !== null) {
                if (matches.index === re.lastIndex) {
                    re.lastIndex++;
                }
                result.push(parseFloat(matches[0]));
            }
            return result;
        }
        importer.parseNumericList = parseNumericList;
    })(importer = MakerJs.importer || (MakerJs.importer = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var exporter;
    (function (exporter) {
        /**
         * Renders an item in AutoDesk DFX file format.
         *
         * @param itemToExport Item to render: may be a path, an array of paths, or a model object.
         * @param options Rendering options object.
         * @param options.units String of the unit system. May be omitted. See makerjs.unitType for possible values.
         * @returns String of DXF content.
         */
        function toDXF(itemToExport, options) {
            //DXF format documentation:
            //http://images.autodesk.com/adsk/files/acad_dxf0.pdf
            if (options === void 0) { options = {}; }
            var opts = {};
            var layerIds = [];
            var dxf = { "top": [], "bottom": [] };
            var dxfIndex = "top";
            function append(value) {
                dxf[dxfIndex].push(value);
            }
            MakerJs.extendObject(opts, options);
            if (MakerJs.isModel(itemToExport)) {
                var modelToExport = itemToExport;
                if (modelToExport.exporterOptions) {
                    MakerJs.extendObject(opts, modelToExport.exporterOptions['toDXF']);
                }
            }
            function colorLayerOptions(layer) {
                if (opts.layerOptions && opts.layerOptions[layer])
                    return opts.layerOptions[layer];
                if (layer in exporter.colors) {
                    return {
                        color: exporter.colors[layer]
                    };
                }
            }
            function defaultLayer(pathContext, parentLayer) {
                var layerId = (pathContext && pathContext.layer) || parentLayer || '0';
                if (layerIds.indexOf(layerId) < 0) {
                    layerIds.push(layerId);
                }
                return layerId;
            }
            var map = {};
            map[MakerJs.pathType.Line] = function (line, offset, layer) {
                append("0");
                append("LINE");
                append("8");
                append(defaultLayer(line, layer));
                append("10");
                append(MakerJs.round(line.origin[0] + offset[0], opts.accuracy));
                append("20");
                append(MakerJs.round(line.origin[1] + offset[1], opts.accuracy));
                append("11");
                append(MakerJs.round(line.end[0] + offset[0], opts.accuracy));
                append("21");
                append(MakerJs.round(line.end[1] + offset[1], opts.accuracy));
            };
            map[MakerJs.pathType.Circle] = function (circle, offset, layer) {
                append("0");
                append("CIRCLE");
                append("8");
                append(defaultLayer(circle, layer));
                append("10");
                append(MakerJs.round(circle.origin[0] + offset[0], opts.accuracy));
                append("20");
                append(MakerJs.round(circle.origin[1] + offset[1], opts.accuracy));
                append("40");
                append(MakerJs.round(circle.radius, opts.accuracy));
            };
            map[MakerJs.pathType.Arc] = function (arc, offset, layer) {
                append("0");
                append("ARC");
                append("8");
                append(defaultLayer(arc, layer));
                append("10");
                append(MakerJs.round(arc.origin[0] + offset[0], opts.accuracy));
                append("20");
                append(MakerJs.round(arc.origin[1] + offset[1], opts.accuracy));
                append("40");
                append(MakerJs.round(arc.radius, opts.accuracy));
                append("50");
                append(MakerJs.round(arc.startAngle, opts.accuracy));
                append("51");
                append(MakerJs.round(arc.endAngle, opts.accuracy));
            };
            //TODO - handle scenario if any bezier seeds get passed
            //map[pathType.BezierSeed]
            function appendVertex(v, layer, bulge) {
                append("0");
                append("VERTEX");
                append("8");
                append(defaultLayer(null, layer));
                append("10");
                append(MakerJs.round(v[0], opts.accuracy));
                append("20");
                append(MakerJs.round(v[1], opts.accuracy));
                append("30");
                append(0);
                if (bulge !== undefined) {
                    append("42");
                    append(bulge);
                }
            }
            function polyline(c) {
                append("0");
                append("POLYLINE");
                append("8");
                append(defaultLayer(null, c.layer));
                append("10");
                append(0);
                append("20");
                append(0);
                append("30");
                append(0);
                append("70");
                append(c.chain.endless ? 1 : 0);
                c.chain.links.forEach(function (link, i) {
                    var bulge;
                    if (link.walkedPath.pathContext.type === MakerJs.pathType.Arc) {
                        var arc = link.walkedPath.pathContext;
                        bulge = MakerJs.round(Math.tan(MakerJs.angle.toRadians(MakerJs.angle.ofArcSpan(arc)) / 4), opts.accuracy);
                        if (link.reversed) {
                            bulge *= -1;
                        }
                    }
                    var vertex = link.endPoints[link.reversed ? 1 : 0];
                    appendVertex(vertex, c.layer, bulge);
                });
                if (!c.chain.endless) {
                    var lastLink = c.chain.links[c.chain.links.length - 1];
                    var endPoint = lastLink.endPoints[lastLink.reversed ? 0 : 1];
                    appendVertex(endPoint, c.layer);
                }
                append("0");
                append("SEQEND");
            }
            function section(sectionFn) {
                append("0");
                append("SECTION");
                sectionFn();
                append("0");
                append("ENDSEC");
            }
            function tables(tableFn) {
                append("2");
                append("TABLES");
                append("0");
                append("TABLE");
                tableFn();
                append("0");
                append("ENDTAB");
            }
            function layerOut(layerId, layerColor) {
                append("0");
                append("LAYER");
                append("2");
                append(layerId);
                append("70");
                append("0");
                append("62");
                append(layerColor);
                append("6");
                append("CONTINUOUS");
            }
            function layersOut() {
                append("2");
                append("LAYER");
                layerIds.forEach(function (layerId) {
                    var layerOptions = colorLayerOptions(layerId);
                    if (layerOptions) {
                        layerOut(layerId, layerOptions.color);
                    }
                });
            }
            function header() {
                append("2");
                append("HEADER");
                if (opts.units) {
                    var units = dxfUnit[opts.units];
                    append("9");
                    append("$INSUNITS");
                    append("70");
                    append(units);
                }
            }
            function entities(walkedPaths, chains) {
                append("2");
                append("ENTITIES");
                chains.forEach(function (c) { return polyline(c); });
                walkedPaths.forEach(function (walkedPath) {
                    var fn = map[walkedPath.pathContext.type];
                    if (fn) {
                        fn(walkedPath.pathContext, walkedPath.offset, walkedPath.layer);
                    }
                });
            }
            //fixup options
            if (!opts.units) {
                var units = exporter.tryGetModelUnits(itemToExport);
                if (units) {
                    opts.units = units;
                }
            }
            //also pass back to options parameter
            MakerJs.extendObject(options, opts);
            //begin dxf output
            dxfIndex = "bottom";
            section(function () {
                var chainsOnLayers = [];
                var walkedPaths = [];
                if (opts.usePOLYLINE) {
                    var cb = function (chains, loose, layer) {
                        chains.forEach(function (c) {
                            if (c.endless && c.links.length === 1 && c.links[0].walkedPath.pathContext.type === MakerJs.pathType.Circle) {
                                //don't treat circles as lwpolylines
                                walkedPaths.push(c.links[0].walkedPath);
                                return;
                            }
                            var chainOnLayer = { chain: c, layer: layer };
                            chainsOnLayers.push(chainOnLayer);
                        });
                        walkedPaths.push.apply(walkedPaths, loose);
                    };
                    MakerJs.model.findChains(modelToExport, cb, { byLayers: true });
                }
                else {
                    var walkOptions = {
                        onPath: function (walkedPath) {
                            walkedPaths.push(walkedPath);
                        }
                    };
                    MakerJs.model.walk(modelToExport, walkOptions);
                }
                entities(walkedPaths, chainsOnLayers);
            });
            dxfIndex = "top";
            section(header);
            section(function () { return tables(layersOut); });
            dxfIndex = "bottom";
            append("0");
            append("EOF");
            return dxf["top"].concat(dxf["bottom"]).join('\n');
        }
        exporter.toDXF = toDXF;
        /**
         * @private
         */
        var dxfUnit = {};
        //DXF format documentation:
        //http://images.autodesk.com/adsk/files/acad_dxf0.pdf
        //Default drawing units for AutoCAD DesignCenter blocks:
        //0 = Unitless; 1 = Inches; 2 = Feet; 3 = Miles; 4 = Millimeters; 5 = Centimeters; 6 = Meters; 7 = Kilometers; 8 = Microinches;
        dxfUnit[''] = 0;
        dxfUnit[MakerJs.unitType.Inch] = 1;
        dxfUnit[MakerJs.unitType.Foot] = 2;
        dxfUnit[MakerJs.unitType.Millimeter] = 4;
        dxfUnit[MakerJs.unitType.Centimeter] = 5;
        dxfUnit[MakerJs.unitType.Meter] = 6;
    })(exporter = MakerJs.exporter || (MakerJs.exporter = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var solvers;
    (function (solvers) {
        /**
         * @private
         */
        var equilateral = Math.sqrt(3) / 2;
        /**
         * Solves for the altitude of an equilateral triangle when you know its side length.
         *
         * @param sideLength Length of a side of the equilateral triangle (all 3 sides are equal).
         * @returns Altitude of the equilateral triangle.
         */
        function equilateralAltitude(sideLength) {
            return sideLength * equilateral;
        }
        solvers.equilateralAltitude = equilateralAltitude;
        /**
         * Solves for the side length of an equilateral triangle when you know its altitude.
         *
         * @param altitude Altitude of the equilateral triangle.
         * @returns Length of the side of the equilateral triangle (all 3 sides are equal).
         */
        function equilateralSide(altitude) {
            return altitude / equilateral;
        }
        solvers.equilateralSide = equilateralSide;
        /**
         * Solves for the angle of a triangle when you know lengths of 3 sides.
         *
         * @param lengthA Length of side of triangle, opposite of the angle you are trying to find.
         * @param lengthB Length of any other side of the triangle.
         * @param lengthC Length of the remaining side of the triangle.
         * @returns Angle opposite of the side represented by the first parameter.
         */
        function solveTriangleSSS(lengthA, lengthB, lengthC) {
            return MakerJs.angle.toDegrees(Math.acos((lengthB * lengthB + lengthC * lengthC - lengthA * lengthA) / (2 * lengthB * lengthC)));
        }
        solvers.solveTriangleSSS = solveTriangleSSS;
        /**
         * Solves for the length of a side of a triangle when you know length of one side and 2 angles.
         *
         * @param oppositeAngleInDegrees Angle which is opposite of the side you are trying to find.
         * @param lengthOfSideBetweenAngles Length of one side of the triangle which is between the provided angles.
         * @param otherAngleInDegrees An other angle of the triangle.
         * @returns Length of the side of the triangle which is opposite of the first angle parameter.
         */
        function solveTriangleASA(oppositeAngleInDegrees, lengthOfSideBetweenAngles, otherAngleInDegrees) {
            var angleOppositeSide = 180 - oppositeAngleInDegrees - otherAngleInDegrees;
            return (lengthOfSideBetweenAngles * Math.sin(MakerJs.angle.toRadians(oppositeAngleInDegrees))) / Math.sin(MakerJs.angle.toRadians(angleOppositeSide));
        }
        solvers.solveTriangleASA = solveTriangleASA;
        /**
         * Solves for the angles of the tangent lines between 2 circles.
         *
         * @param a First circle.
         * @param b Second circle.
         * @param inner Boolean to use inner tangents instead of outer tangents.
         * @returns Array of angles in degrees where 2 lines between the circles will be tangent to both circles.
         */
        function circleTangentAngles(a, b, inner) {
            if (inner === void 0) { inner = false; }
            var connect = new MakerJs.paths.Line(a.origin, b.origin);
            var distance = MakerJs.measure.pointDistance(a.origin, b.origin);
            //no tangents if either circle encompasses the other
            if (a.radius >= distance + b.radius || b.radius >= distance + a.radius)
                return null;
            //no inner tangents when circles touch or overlap
            if (inner && (a.radius + b.radius >= distance))
                return null;
            var tangentAngles;
            if (!inner && MakerJs.round(a.radius - b.radius) == 0) {
                tangentAngles = [90, 270];
            }
            else {
                //solve for circles on the x axis at the distance
                var d2 = distance / 2;
                var between = new MakerJs.paths.Circle([d2, 0], d2);
                var diff = new MakerJs.paths.Circle(a.radius > b.radius ? [0, 0] : [distance, 0], inner ? (a.radius + b.radius) : Math.abs(a.radius - b.radius));
                var int = MakerJs.path.intersection(diff, between);
                if (!int || !int.path1Angles)
                    return null;
                tangentAngles = int.path1Angles;
            }
            var connectAngle = MakerJs.angle.ofLineInDegrees(connect);
            //add the line's angle to the result
            return tangentAngles.map(function (a) { return MakerJs.angle.noRevolutions(a + connectAngle); });
        }
        solvers.circleTangentAngles = circleTangentAngles;
    })(solvers = MakerJs.solvers || (MakerJs.solvers = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var path;
    (function (path) {
        /**
         * @private
         */
        var map = {};
        map[MakerJs.pathType.Arc] = {};
        map[MakerJs.pathType.Circle] = {};
        map[MakerJs.pathType.Line] = {};
        map[MakerJs.pathType.Arc][MakerJs.pathType.Arc] = function (arc1, arc2, options, swapOffsets) {
            var result = null;
            moveTemp([arc1, arc2], options, swapOffsets, function () {
                var angles = circleToCircle(arc1, arc2, options);
                if (angles) {
                    var arc1Angles = getAnglesWithinArc(angles[0], arc1, options);
                    var arc2Angles = getAnglesWithinArc(angles[1], arc2, options);
                    if (arc1Angles && arc2Angles) {
                        //must correspond to the same angle indexes
                        if (arc1Angles.length === 1 || arc2Angles.length === 1) {
                            for (var i1 = 0; i1 < arc1Angles.length; i1++) {
                                for (var i2 = 0; i2 < arc2Angles.length; i2++) {
                                    var p1 = MakerJs.point.fromAngleOnCircle(arc1Angles[i1], arc1);
                                    var p2 = MakerJs.point.fromAngleOnCircle(arc2Angles[i2], arc2);
                                    //if they do not correspond then they don't intersect
                                    if (MakerJs.measure.isPointEqual(p1, p2, .0001)) {
                                        result = {
                                            intersectionPoints: [p1],
                                            path1Angles: [arc1Angles[i1]],
                                            path2Angles: [arc2Angles[i2]]
                                        };
                                        return;
                                    }
                                }
                            }
                        }
                        else {
                            result = {
                                intersectionPoints: pointsFromAnglesOnCircle(arc1Angles, arc1),
                                path1Angles: arc1Angles,
                                path2Angles: arc2Angles
                            };
                        }
                    }
                }
                else {
                    if (options.out_AreOverlapped) {
                        //overlapped for circle, reset and see if arcs actually overlap.
                        options.out_AreOverlapped = MakerJs.measure.isArcOverlapping(arc1, arc2, options.excludeTangents);
                    }
                }
            });
            return result;
        };
        map[MakerJs.pathType.Arc][MakerJs.pathType.Circle] = function (arc, circle, options, swapOffsets) {
            var result = null;
            moveTemp([arc, circle], options, swapOffsets, function () {
                var angles = circleToCircle(arc, circle, options);
                if (angles) {
                    var arcAngles = getAnglesWithinArc(angles[0], arc, options);
                    if (arcAngles) {
                        var circleAngles;
                        //if both points are on arc, use both on circle
                        if (arcAngles.length == 2) {
                            circleAngles = angles[1];
                        }
                        else {
                            //use the corresponding point on circle 
                            var index = findCorrespondingAngleIndex(angles[0], arcAngles[0]);
                            circleAngles = [angles[1][index]];
                        }
                        result = {
                            intersectionPoints: pointsFromAnglesOnCircle(arcAngles, arc),
                            path1Angles: arcAngles,
                            path2Angles: circleAngles
                        };
                    }
                }
            });
            return result;
        };
        map[MakerJs.pathType.Arc][MakerJs.pathType.Line] = function (arc, line, options, swapOffsets) {
            var result = null;
            moveTemp([arc, line], options, swapOffsets, function () {
                var angles = lineToCircle(line, arc, options);
                if (angles) {
                    var arcAngles = getAnglesWithinArc(angles, arc, options);
                    if (arcAngles) {
                        result = {
                            intersectionPoints: pointsFromAnglesOnCircle(arcAngles, arc),
                            path1Angles: arcAngles
                        };
                    }
                }
            });
            return result;
        };
        map[MakerJs.pathType.Circle][MakerJs.pathType.Arc] = function (circle, arc, options) {
            var result = map[MakerJs.pathType.Arc][MakerJs.pathType.Circle](arc, circle, options, true);
            if (result) {
                return swapAngles(result);
            }
            return null;
        };
        map[MakerJs.pathType.Circle][MakerJs.pathType.Circle] = function (circle1, circle2, options, swapOffsets) {
            var result = null;
            moveTemp([circle1, circle2], options, swapOffsets, function () {
                var angles = circleToCircle(circle1, circle2, options);
                if (angles) {
                    result = {
                        intersectionPoints: pointsFromAnglesOnCircle(angles[0], circle1),
                        path1Angles: angles[0],
                        path2Angles: angles[1]
                    };
                }
            });
            return result;
        };
        map[MakerJs.pathType.Circle][MakerJs.pathType.Line] = function (circle, line, options, swapOffsets) {
            var result = null;
            moveTemp([circle, line], options, swapOffsets, function () {
                var angles = lineToCircle(line, circle, options);
                if (angles) {
                    result = {
                        intersectionPoints: pointsFromAnglesOnCircle(angles, circle),
                        path1Angles: angles
                    };
                }
            });
            return result;
        };
        map[MakerJs.pathType.Line][MakerJs.pathType.Arc] = function (line, arc, options) {
            var result = map[MakerJs.pathType.Arc][MakerJs.pathType.Line](arc, line, options, true);
            if (result) {
                return swapAngles(result);
            }
            return null;
        };
        map[MakerJs.pathType.Line][MakerJs.pathType.Circle] = function (line, circle, options) {
            var result = map[MakerJs.pathType.Circle][MakerJs.pathType.Line](circle, line, options, true);
            if (result) {
                return swapAngles(result);
            }
            return null;
        };
        map[MakerJs.pathType.Line][MakerJs.pathType.Line] = function (line1, line2, options, swapOffsets) {
            var result = null;
            moveTemp([line1, line2], options, swapOffsets, function () {
                var intersectionPoint = MakerJs.point.fromSlopeIntersection(line1, line2, options);
                if (intersectionPoint) {
                    //we have the point of intersection of endless lines, now check to see if the point is between both segemnts
                    if (MakerJs.measure.isBetweenPoints(intersectionPoint, line1, options.excludeTangents) && MakerJs.measure.isBetweenPoints(intersectionPoint, line2, options.excludeTangents)) {
                        result = {
                            intersectionPoints: [intersectionPoint]
                        };
                    }
                }
            });
            return result;
        };
        /**
         * @private
         */
        function moveTemp(pathsToOffset, options, swapOffsets, task) {
            var offsets = swapOffsets ? [options.path2Offset, options.path1Offset] : [options.path1Offset, options.path2Offset];
            path.moveTemporary(pathsToOffset, offsets, task);
        }
        ;
        /**
         * @private
         */
        function swapAngles(result) {
            var temp = result.path1Angles;
            if (result.path2Angles) {
                result.path1Angles = result.path2Angles;
            }
            else {
                delete result.path1Angles;
            }
            if (temp) {
                result.path2Angles = temp;
            }
            return result;
        }
        /**
         * Find the point(s) where 2 paths intersect.
         *
         * @param path1 First path to find intersection.
         * @param path2 Second path to find intersection.
         * @param options Optional IPathIntersectionOptions.
         * @returns IPathIntersection object, with points(s) of intersection (and angles, when a path is an arc or circle); or null if the paths did not intersect.
         */
        function intersection(path1, path2, options) {
            if (options === void 0) { options = {}; }
            if (path1 && path2) {
                var fn = map[path1.type][path2.type];
                if (fn) {
                    return fn(path1, path2, options);
                }
            }
            return null;
        }
        path.intersection = intersection;
        /**
         * @private
         */
        function findCorrespondingAngleIndex(circleAngles, arcAngle) {
            for (var i = 2; i--;) {
                if (circleAngles[i] === arcAngle)
                    return i;
            }
        }
        /**
         * @private
         */
        function pointsFromAnglesOnCircle(anglesInDegrees, circle) {
            var result = [];
            for (var i = 0; i < anglesInDegrees.length; i++) {
                result.push(MakerJs.point.fromAngleOnCircle(anglesInDegrees[i], circle));
            }
            return result;
        }
        /**
         * @private
         */
        function getAnglesWithinArc(angles, arc, options) {
            if (!angles)
                return null;
            var anglesWithinArc = [];
            for (var i = 0; i < angles.length; i++) {
                if (MakerJs.measure.isBetweenArcAngles(angles[i], arc, options.excludeTangents)) {
                    anglesWithinArc.push(angles[i]);
                }
            }
            if (anglesWithinArc.length == 0)
                return null;
            return anglesWithinArc;
        }
        /**
         * @private
         */
        function lineToCircle(line, circle, options) {
            var radius = MakerJs.round(circle.radius);
            //no-op for degenerate circle
            if (circle.radius <= 0) {
                return null;
            }
            //clone the line
            var clonedLine = new MakerJs.paths.Line(MakerJs.point.subtract(line.origin, circle.origin), MakerJs.point.subtract(line.end, circle.origin));
            //get angle of line
            var lineAngleNormal = MakerJs.angle.ofLineInDegrees(line);
            //use the positive horizontal angle
            var lineAngle = (lineAngleNormal >= 180) ? lineAngleNormal - 360 : lineAngleNormal;
            //rotate the line to horizontal
            path.rotate(clonedLine, -lineAngle, MakerJs.point.zero());
            //remember how to undo the rotation we just did
            function unRotate(resultAngle) {
                var unrotated = resultAngle + lineAngle;
                return MakerJs.round(MakerJs.angle.noRevolutions(unrotated));
            }
            //line is horizontal, get the y value from any point
            var lineY = MakerJs.round(clonedLine.origin[1]);
            var lineYabs = Math.abs(lineY);
            //if y is greater than radius, there is no intersection
            if (lineYabs > radius) {
                return null;
            }
            var anglesOfIntersection = [];
            //if horizontal Y is the same as the radius, we know it's 90 degrees
            if (lineYabs == radius) {
                if (options.excludeTangents) {
                    return null;
                }
                anglesOfIntersection.push(unRotate(lineY > 0 ? 90 : 270));
            }
            else {
                function intersectionBetweenEndpoints(x, angleOfX) {
                    if (MakerJs.measure.isBetween(MakerJs.round(x), MakerJs.round(clonedLine.origin[0]), MakerJs.round(clonedLine.end[0]), options.excludeTangents)) {
                        anglesOfIntersection.push(unRotate(angleOfX));
                    }
                }
                //find angle where line intersects
                var intersectRadians = Math.asin(lineY / radius);
                var intersectDegrees = MakerJs.angle.toDegrees(intersectRadians);
                //line may intersect in 2 places
                var intersectX = Math.cos(intersectRadians) * radius;
                intersectionBetweenEndpoints(-intersectX, 180 - intersectDegrees);
                intersectionBetweenEndpoints(intersectX, intersectDegrees);
            }
            if (anglesOfIntersection.length > 0) {
                return anglesOfIntersection;
            }
            return null;
        }
        /**
         * @private
         */
        function circleToCircle(circle1, circle2, options) {
            //no-op if either circle is degenerate
            if (circle1.radius <= 0 || circle2.radius <= 0) {
                return null;
            }
            //see if circles are the same
            if (circle1.radius == circle2.radius && MakerJs.measure.isPointEqual(circle1.origin, circle2.origin, .0001)) {
                options.out_AreOverlapped = true;
                return null;
            }
            //get offset from origin
            var offset = MakerJs.point.subtract(MakerJs.point.zero(), circle1.origin);
            //clone circle1 and move to origin
            var c1 = new MakerJs.paths.Circle(MakerJs.point.zero(), circle1.radius);
            //clone circle2 and move relative to circle1
            var c2 = new MakerJs.paths.Circle(MakerJs.point.subtract(circle2.origin, circle1.origin), circle2.radius);
            //rotate circle2 to horizontal, c2 will be to the right of the origin.
            var c2Angle = MakerJs.angle.ofPointInDegrees(MakerJs.point.zero(), c2.origin);
            path.rotate(c2, -c2Angle, MakerJs.point.zero());
            function unRotate(resultAngle) {
                var unrotated = resultAngle + c2Angle;
                return MakerJs.angle.noRevolutions(unrotated);
            }
            //get X of c2 origin
            var x = c2.origin[0];
            //see if circles are tangent interior on left side
            if (MakerJs.round(c2.radius - x - c1.radius) == 0) {
                if (options.excludeTangents) {
                    return null;
                }
                return [[unRotate(180)], [unRotate(180)]];
            }
            //see if circles are tangent interior on right side
            if (MakerJs.round(c2.radius + x - c1.radius) == 0) {
                if (options.excludeTangents) {
                    return null;
                }
                return [[unRotate(0)], [unRotate(0)]];
            }
            //see if circles are tangent exterior
            if (MakerJs.round(x - c2.radius - c1.radius) == 0) {
                if (options.excludeTangents) {
                    return null;
                }
                return [[unRotate(0)], [unRotate(180)]];
            }
            //see if c2 is outside of c1
            if (MakerJs.round(x - c2.radius) > c1.radius) {
                return null;
            }
            //see if c2 is within c1
            if (MakerJs.round(x + c2.radius) < c1.radius) {
                return null;
            }
            //see if c1 is within c2
            if (MakerJs.round(x - c2.radius) < -c1.radius) {
                return null;
            }
            function bothAngles(oneAngle) {
                return [unRotate(oneAngle), unRotate(MakerJs.angle.mirror(oneAngle, false, true))];
            }
            var c1IntersectionAngle = MakerJs.solvers.solveTriangleSSS(c2.radius, c1.radius, x);
            var c2IntersectionAngle = MakerJs.solvers.solveTriangleSSS(c1.radius, x, c2.radius);
            return [bothAngles(c1IntersectionAngle), bothAngles(180 - c2IntersectionAngle)];
        }
    })(path = MakerJs.path || (MakerJs.path = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var path;
    (function (path) {
        /**
         * @private
         */
        var propertyNamesMap = {};
        propertyNamesMap[MakerJs.pathType.Arc] = function (arc) {
            return ['startAngle', 'endAngle'];
        };
        propertyNamesMap[MakerJs.pathType.Line] = function (line) {
            return ['origin', 'end'];
        };
        /**
         * @private
         */
        function getPointProperties(pathToInspect) {
            var points = MakerJs.point.fromPathEnds(pathToInspect);
            if (points) {
                function pointProperty(index) {
                    return { point: points[index], propertyName: propertyNames[index] };
                }
                var propertyNames = null;
                var fn = propertyNamesMap[pathToInspect.type];
                if (fn) {
                    propertyNames = fn(pathToInspect);
                    return [pointProperty(0), pointProperty(1)];
                }
            }
            return null;
        }
        /**
         * @private
         */
        function getMatchingPointProperties(pathA, pathB, options) {
            var pathAProperties = getPointProperties(pathA);
            var pathBProperties = getPointProperties(pathB);
            var result = null;
            function makeMatch(pathContext, pointProperties, index) {
                return {
                    path: pathContext,
                    isStart: index == 0,
                    propertyName: pointProperties[index].propertyName,
                    point: pointProperties[index].point,
                    oppositePoint: pointProperties[1 - index].point
                };
            }
            function check(iA, iB) {
                if (MakerJs.measure.isPointEqual(pathAProperties[iA].point, pathBProperties[iB].point, .0001)) {
                    result = [
                        makeMatch(pathA, pathAProperties, iA),
                        makeMatch(pathB, pathBProperties, iB)
                    ];
                    return true;
                }
                return false;
            }
            check(0, 0) || check(0, 1) || check(1, 0) || check(1, 1);
            return result;
        }
        /**
         * @private
         */
        function populateShardPointsFromReferenceCircle(filletRadius, center, properties, options) {
            var referenceCircle = new MakerJs.paths.Circle(center, filletRadius);
            //get reference circle intersection points
            for (var i = 0; i < 2; i++) {
                var circleIntersection = path.intersection(referenceCircle, properties[i].path);
                if (!circleIntersection) {
                    return false;
                }
                properties[i].shardPoint = circleIntersection.intersectionPoints[0];
                if (MakerJs.measure.isPointEqual(properties[i].point, circleIntersection.intersectionPoints[0], .0001)) {
                    if (circleIntersection.intersectionPoints.length > 1) {
                        properties[i].shardPoint = circleIntersection.intersectionPoints[1];
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        }
        /**
         * @private
         */
        function cloneAndBreakPath(pathToShard, shardPoint) {
            var shardStart = path.clone(pathToShard);
            var shardEnd = path.breakAtPoint(shardStart, shardPoint);
            return [shardStart, shardEnd];
        }
        /**
         * @private
         */
        var guidePathMap = {};
        guidePathMap[MakerJs.pathType.Arc] = function (arc, filletRadius, nearPoint, shardPoint, isStart) {
            var guideRadius = arc.radius;
            //see if the guideline should be external or internal to the context arc.
            var guideArcShard = cloneAndBreakPath(arc, shardPoint)[isStart ? 0 : 1];
            if (guideArcShard) {
                if (MakerJs.measure.isArcConcaveTowardsPoint(guideArcShard, nearPoint)) {
                    guideRadius -= filletRadius;
                }
                else {
                    guideRadius += filletRadius;
                }
                if (MakerJs.round(guideRadius) <= 0)
                    return null;
                return new MakerJs.paths.Arc(arc.origin, guideRadius, arc.startAngle, arc.endAngle);
            }
            return null;
        };
        guidePathMap[MakerJs.pathType.Line] = function (line, filletRadius, nearPoint, shardPoint, isStart) {
            return new MakerJs.paths.Parallel(line, filletRadius, nearPoint);
        };
        /**
         * @private
         */
        function getGuidePath(context, filletRadius, nearPoint) {
            var result = null;
            var fn = guidePathMap[context.path.type];
            if (fn) {
                result = fn(context.path, filletRadius, nearPoint, context.shardPoint, context.isStart);
            }
            return result;
        }
        /**
         * @private
         */
        var filletResultMap = {};
        filletResultMap[MakerJs.pathType.Arc] = function (arc, propertyName, filletRadius, filletCenter) {
            var guideLine = new MakerJs.paths.Line(arc.origin, filletCenter);
            var guideLineAngle = MakerJs.angle.ofLineInDegrees(guideLine);
            var filletAngle = guideLineAngle;
            //the context is an arc and the fillet is an arc so they will be tangent. If the fillet is external to the arc then the tangent is opposite.
            if (!MakerJs.measure.isArcConcaveTowardsPoint(arc, filletCenter)) {
                filletAngle += 180;
            }
            return {
                filletAngle: MakerJs.angle.noRevolutions(filletAngle),
                clipPath: function () {
                    arc[propertyName] = guideLineAngle;
                }
            };
        };
        filletResultMap[MakerJs.pathType.Line] = function (line, propertyName, filletRadius, filletCenter) {
            //make a small vertical line
            var guideLine = new MakerJs.paths.Line([0, 0], [0, 1]);
            //rotate this vertical line the same angle as the line context. It will be perpendicular.
            var lineAngle = MakerJs.angle.ofLineInDegrees(line);
            path.rotate(guideLine, lineAngle, [0, 0]);
            path.moveRelative(guideLine, filletCenter);
            //get the intersection point of the slopes of the context line and the perpendicular line. This is where the fillet meets the line.
            var intersectionPoint = MakerJs.point.fromSlopeIntersection(line, guideLine);
            if (intersectionPoint) {
                return {
                    filletAngle: MakerJs.angle.ofPointInDegrees(filletCenter, intersectionPoint),
                    clipPath: function () {
                        line[propertyName] = intersectionPoint;
                    }
                };
            }
            return null;
        };
        /**
         * @private
         */
        function getFilletResult(context, filletRadius, filletCenter) {
            var result = null;
            var fn = filletResultMap[context.path.type];
            if (fn) {
                result = fn(context.path, context.propertyName, filletRadius, filletCenter);
            }
            if (!testFilletResult(context, result)) {
                result = null;
            }
            return result;
        }
        /**
         * @private
         */
        function getDogboneResult(context, filletCenter) {
            var result = {
                filletAngle: MakerJs.angle.ofPointInDegrees(filletCenter, context.shardPoint),
                clipPath: function () {
                    context.path[context.propertyName] = context.shardPoint;
                }
            };
            if (!testFilletResult(context, result)) {
                result = null;
            }
            return result;
        }
        /**
         * @private
         */
        function testFilletResult(context, result) {
            var test = false;
            if (result) {
                //temporarily clip the path.
                var originalValue = context.path[context.propertyName];
                result.clipPath();
                //don't allow a fillet which effectivly eliminates the path.
                if (MakerJs.measure.pathLength(context.path) > 0) {
                    test = true;
                }
                //revert the clipping we just did.
                context.path[context.propertyName] = originalValue;
            }
            return test;
        }
        /**
         * @private
         */
        function getLineRatio(lines) {
            var totalLength = 0;
            var lengths = [];
            for (var i = 0; i < lines.length; i++) {
                var length = MakerJs.measure.pathLength(lines[i]);
                lengths.push(length);
                totalLength += length;
            }
            return lengths[0] / totalLength;
        }
        /**
         * Adds a round corner to the outside angle between 2 lines. The lines must meet at one point.
         *
         * @param lineA First line to fillet, which will be modified to fit the fillet.
         * @param lineB Second line to fillet, which will be modified to fit the fillet.
         * @returns Arc path object of the new fillet.
         */
        function dogbone(lineA, lineB, filletRadius, options) {
            //TODO: allow arcs in dogbone
            if (MakerJs.isPathLine(lineA) && MakerJs.isPathLine(lineB) && filletRadius && filletRadius > 0) {
                var opts = {
                    pointMatchingDistance: .005
                };
                MakerJs.extendObject(opts, options);
                //first find the common point
                var commonProperty = getMatchingPointProperties(lineA, lineB, options);
                if (commonProperty) {
                    //get the ratio comparison of the two lines
                    var ratio = getLineRatio([lineA, lineB]);
                    //draw a line between the two endpoints, and get the bisection point at the ratio
                    var span = new MakerJs.paths.Line(commonProperty[0].oppositePoint, commonProperty[1].oppositePoint);
                    var midRatioPoint = MakerJs.point.middle(span, ratio);
                    //use the bisection theorem to get the angle bisecting the lines
                    var bisectionAngle = MakerJs.angle.ofPointInDegrees(commonProperty[0].point, midRatioPoint);
                    var center = MakerJs.point.add(commonProperty[0].point, MakerJs.point.fromPolar(MakerJs.angle.toRadians(bisectionAngle), filletRadius));
                    if (!populateShardPointsFromReferenceCircle(filletRadius, center, commonProperty, opts)) {
                        return null;
                    }
                    //get the angles of the fillet and a function which clips the path to the fillet.
                    var results = [];
                    for (var i = 0; i < 2; i++) {
                        var result = getDogboneResult(commonProperty[i], center);
                        if (!result) {
                            return null;
                        }
                        results.push(result);
                    }
                    var filletArc = new MakerJs.paths.Arc(center, filletRadius, results[0].filletAngle, results[1].filletAngle);
                    //make sure midpoint of fillet is outside of the angle
                    if (MakerJs.round(MakerJs.angle.noRevolutions(MakerJs.angle.ofArcMiddle(filletArc))) == MakerJs.round(bisectionAngle)) {
                        filletArc.startAngle = results[1].filletAngle;
                        filletArc.endAngle = results[0].filletAngle;
                    }
                    //clip the paths and return the fillet arc.
                    results[0].clipPath();
                    results[1].clipPath();
                    return filletArc;
                }
            }
            return null;
        }
        path.dogbone = dogbone;
        /**
         * Adds a round corner to the inside angle between 2 paths. The paths must meet at one point.
         *
         * @param pathA First path to fillet, which will be modified to fit the fillet.
         * @param pathB Second path to fillet, which will be modified to fit the fillet.
         * @param filletRadius Radius of the fillet.
         * @param options Optional IPointMatchOptions object to specify pointMatchingDistance.
         * @returns Arc path object of the new fillet.
         */
        function fillet(pathA, pathB, filletRadius, options) {
            if (pathA && pathB && filletRadius && filletRadius > 0) {
                var opts = {
                    pointMatchingDistance: .005
                };
                MakerJs.extendObject(opts, options);
                //first find the common point
                var commonProperty = getMatchingPointProperties(pathA, pathB, options);
                if (commonProperty) {
                    //since arcs can curl beyond, we need a local reference point. 
                    //An intersection with a circle of the same radius as the desired fillet should suffice.
                    if (!populateShardPointsFromReferenceCircle(filletRadius, commonProperty[0].point, commonProperty, opts)) {
                        return null;
                    }
                    //get "parallel" guidelines
                    var guidePaths = [];
                    for (var i = 0; i < 2; i++) {
                        var otherPathShardPoint = commonProperty[1 - i].shardPoint;
                        if (!otherPathShardPoint) {
                            return null;
                        }
                        var guidePath = getGuidePath(commonProperty[i], filletRadius, otherPathShardPoint);
                        guidePaths.push(guidePath);
                    }
                    //the center of the fillet is the point where the guidelines intersect.
                    var intersectionPoint = path.intersection(guidePaths[0], guidePaths[1]);
                    if (intersectionPoint) {
                        var center;
                        //if guidelines intersect in more than one place, choose the closest one.
                        if (intersectionPoint.intersectionPoints.length == 1) {
                            center = intersectionPoint.intersectionPoints[0];
                        }
                        else {
                            center = MakerJs.point.closest(commonProperty[0].point, intersectionPoint.intersectionPoints);
                        }
                        //get the angles of the fillet and a function which clips the path to the fillet.
                        var results = [];
                        for (var i = 0; i < 2; i++) {
                            var result = getFilletResult(commonProperty[i], filletRadius, center);
                            if (!result) {
                                return null;
                            }
                            results.push(result);
                        }
                        //the two paths may actually be on the same line
                        if (MakerJs.round(results[0].filletAngle - results[1].filletAngle) == 0)
                            return null;
                        var filletArc = new MakerJs.paths.Arc(center, filletRadius, results[0].filletAngle, results[1].filletAngle);
                        var filletSpan = MakerJs.angle.ofArcSpan(filletArc);
                        //the algorithm is only valid for fillet less than 180 degrees
                        if (filletSpan == 180) {
                            return null;
                        }
                        if (filletSpan > 180) {
                            //swap to make smallest angle
                            filletArc.startAngle = results[1].filletAngle;
                            filletArc.endAngle = results[0].filletAngle;
                        }
                        //clip the paths and return the fillet arc.
                        results[0].clipPath();
                        results[1].clipPath();
                        return filletArc;
                    }
                }
            }
            return null;
        }
        path.fillet = fillet;
    })(path = MakerJs.path || (MakerJs.path = {}));
})(MakerJs || (MakerJs = {}));
(function (MakerJs) {
    var chain;
    (function (chain) {
        function dogbone(chainToFillet, filletSpec) {
            return chainFillet(false, chainToFillet, filletSpec);
        }
        chain.dogbone = dogbone;
        function fillet(chainToFillet, filletSpec) {
            return chainFillet(true, chainToFillet, filletSpec);
        }
        chain.fillet = fillet;
        function chainFillet(traditional, chainToFillet, filletSpec) {
            var result = { paths: {} };
            var added = 0;
            var links = chainToFillet.links;
            function add(i1, i2) {
                var p1 = links[i1].walkedPath, p2 = links[i2].walkedPath;
                if (p1.modelContext === p2.modelContext && p1.modelContext.type == MakerJs.models.BezierCurve.typeName)
                    return;
                MakerJs.path.moveTemporary([p1.pathContext, p2.pathContext], [p1.offset, p2.offset], function () {
                    var filletRadius;
                    if (MakerJs.isObject(filletSpec)) {
                        var a = MakerJs.angle.ofChainLinkJoint(links[i1], links[i2]);
                        if (MakerJs.round(a) === 0)
                            return;
                        filletRadius = (a > 0) ? filletSpec.left : filletSpec.right;
                    }
                    else {
                        filletRadius = filletSpec;
                    }
                    if (!filletRadius || filletRadius < 0)
                        return;
                    var filletArc;
                    if (traditional) {
                        filletArc = MakerJs.path.fillet(p1.pathContext, p2.pathContext, filletRadius);
                    }
                    else {
                        filletArc = MakerJs.path.dogbone(p1.pathContext, p2.pathContext, filletRadius);
                    }
                    if (filletArc) {
                        result.paths['fillet' + added] = filletArc;
                        added++;
                    }
                });
            }
            for (var i = 1; i < links.length; i++) {
                add(i - 1, i);
            }
            if (chainToFillet.endless) {
                add(i - 1, 0);
            }
            if (!added)
                return null;
            return result;
        }
    })(chain = MakerJs.chain || (MakerJs.chain = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var kit;
    (function (kit) {
        //construct a model
        /**
         * Helper function to use the JavaScript "apply" function in conjunction with the "new" keyword.
         *
         * @param ctor The constructor for the class which is an IKit.
         * @param args The array of parameters passed to the constructor.
         * @returns A new instance of the class, which implements the IModel interface.
         */
        function construct(ctor, args) {
            function F() {
                return ctor.apply(this, args);
            }
            F.prototype = ctor.prototype;
            return new F();
        }
        kit.construct = construct;
        /**
         * Extract just the initial sample values from a kit.
         *
         * @param ctor The constructor for the class which is an IKit.
         * @returns Array of the inital sample values provided in the metaParameters array.
         */
        function getParameterValues(ctor) {
            var parameters = [];
            var metaParams = ctor.metaParameters;
            if (metaParams) {
                for (var i = 0; i < metaParams.length; i++) {
                    var value = metaParams[i].value;
                    if (Array.isArray(value)) {
                        value = value[0];
                    }
                    parameters.push(value);
                }
            }
            return parameters;
        }
        kit.getParameterValues = getParameterValues;
    })(kit = MakerJs.kit || (MakerJs.kit = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var model;
    (function (model) {
        /**
         * @private
         */
        function getOpposedLink(linkedPaths, pathContext) {
            if (linkedPaths[0].walkedPath.pathContext === pathContext) {
                return linkedPaths[1];
            }
            return linkedPaths[0];
        }
        /**
         * @private
         */
        function followLinks(connections, chainFound, chainNotFound) {
            function followLink(currLink, chain, firstLink) {
                while (currLink) {
                    chain.links.push(currLink);
                    chain.pathLength += currLink.pathLength;
                    var next = currLink.reversed ? 0 : 1;
                    var nextPoint = currLink.endPoints[next];
                    var items = connections.findCollection(nextPoint);
                    if (!items || items.length === 0) {
                        break;
                    }
                    var nextLink = getOpposedLink(items, currLink.walkedPath.pathContext);
                    //remove the first 2 items, which should be currlink and nextlink
                    items.splice(0, 2);
                    if (!nextLink) {
                        break;
                    }
                    if (nextLink.walkedPath.pathContext === firstLink.walkedPath.pathContext) {
                        chain.endless = true;
                        break;
                    }
                    currLink = nextLink;
                }
            }
            for (var i = 0; i < connections.collections.length; i++) {
                var linkedPaths = connections.collections[i].items;
                if (linkedPaths && linkedPaths.length > 0) {
                    var chain = {
                        links: [],
                        pathLength: 0
                    };
                    followLink(linkedPaths[0], chain, linkedPaths[0]);
                    if (chain.endless) {
                        chainFound(chain);
                    }
                    else {
                        //need to go in reverse
                        chain.links.reverse();
                        var firstLink = chain.links[0];
                        chain.links.map(function (link) { link.reversed = !link.reversed; });
                        //remove the last link, it will be added in the call
                        chain.pathLength -= chain.links[chain.links.length - 1].pathLength;
                        var currLink = chain.links.pop();
                        followLink(currLink, chain, firstLink);
                        if (chain.links.length > 1) {
                            chainFound(chain);
                        }
                        else {
                            chainNotFound(chain.links[0].walkedPath);
                        }
                    }
                    //if there were more than 2 paths on this point, follow those too.
                    if (linkedPaths.length > 0) {
                        i--;
                    }
                }
            }
        }
        /**
         * Find a single chain within a model, across all layers. Shorthand of findChains; useful when you know there is only one chain to find in your model.
         *
         * @param modelContext The model to search for a chain.
         * @returns A chain object or null if chains were not found.
         */
        function findSingleChain(modelContext) {
            var singleChain = null;
            findChains(modelContext, function (chains, loose, layer) {
                singleChain = chains[0];
            }, { byLayers: false });
            return singleChain;
        }
        model.findSingleChain = findSingleChain;
        function findChains(modelContext) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var options;
            var callback;
            switch (args.length) {
                case 1:
                    if (typeof args[0] === 'function') {
                        callback = args[0];
                    }
                    else {
                        options = args[0];
                    }
                    break;
                case 2:
                    callback = args[0];
                    options = args[1];
                    break;
            }
            var opts = {
                pointMatchingDistance: .005
            };
            MakerJs.extendObject(opts, options);
            function comparePoint(pointA, pointB) {
                var distance = MakerJs.measure.pointDistance(pointA, pointB);
                return distance <= opts.pointMatchingDistance;
            }
            var connectionMap = {};
            var chainsByLayer = {};
            var ignored = {};
            var walkOptions = {
                onPath: function (walkedPath) {
                    var layer = opts.byLayers ? walkedPath.layer : '';
                    if (!connectionMap[layer]) {
                        connectionMap[layer] = new MakerJs.Collector(comparePoint);
                    }
                    var connections = connectionMap[layer];
                    var pathLength = MakerJs.measure.pathLength(walkedPath.pathContext);
                    //circles are loops by nature
                    if (walkedPath.pathContext.type === MakerJs.pathType.Circle ||
                        (walkedPath.pathContext.type === MakerJs.pathType.Arc && MakerJs.round(MakerJs.angle.ofArcSpan(walkedPath.pathContext) - 360) === 0) ||
                        (walkedPath.pathContext.type === MakerJs.pathType.BezierSeed && MakerJs.measure.isPointEqual(walkedPath.pathContext.origin, walkedPath.pathContext.end, opts.pointMatchingDistance))) {
                        var chain = {
                            links: [{
                                    walkedPath: walkedPath,
                                    reversed: null,
                                    endPoints: null,
                                    pathLength: pathLength
                                }],
                            endless: true,
                            pathLength: pathLength
                        };
                        //store circles so that layers fire grouped
                        if (!chainsByLayer[layer]) {
                            chainsByLayer[layer] = [];
                        }
                        chainsByLayer[layer].push(chain);
                    }
                    else {
                        //don't add lines which are shorter than the tolerance
                        if (pathLength < opts.pointMatchingDistance) {
                            if (!ignored[layer]) {
                                ignored[layer] = [];
                            }
                            ignored[layer].push(walkedPath);
                            return;
                        }
                        //gather both endpoints from all non-circle segments
                        var endPoints = MakerJs.point.fromPathEnds(walkedPath.pathContext, walkedPath.offset);
                        for (var i = 0; i < 2; i++) {
                            var link = {
                                walkedPath: walkedPath,
                                endPoints: endPoints,
                                reversed: i != 0,
                                pathLength: pathLength
                            };
                            connections.addItemToCollection(endPoints[i], link);
                        }
                    }
                }
            };
            if (opts.shallow) {
                walkOptions.beforeChildWalk = function () { return false; };
            }
            var beziers;
            if (opts.unifyBeziers) {
                beziers = getBezierModels(modelContext);
                swapBezierPathsWithSeeds(beziers, true);
            }
            model.walk(modelContext, walkOptions);
            for (var layer in connectionMap) {
                var connections = connectionMap[layer];
                var loose = [];
                if (!chainsByLayer[layer]) {
                    chainsByLayer[layer] = [];
                }
                //follow paths to find endless chains
                followLinks(connections, function (chain) {
                    chain.endless = !!chain.endless;
                    chainsByLayer[layer].push(chain);
                }, function (walkedPath) {
                    loose.push(walkedPath);
                });
                //sort to return largest chains first
                chainsByLayer[layer].sort(function (a, b) { return b.pathLength - a.pathLength; });
                if (opts.contain) {
                    var containChainsOptions = MakerJs.isObject(opts.contain) ? opts.contain : { alternateDirection: false };
                    var containedChains = getContainment(chainsByLayer[layer], containChainsOptions);
                    chainsByLayer[layer] = containedChains;
                }
                if (callback)
                    callback(chainsByLayer[layer], loose, layer, ignored[layer]);
            }
            if (beziers) {
                swapBezierPathsWithSeeds(beziers, false);
            }
            if (opts.byLayers) {
                return chainsByLayer;
            }
            else {
                return chainsByLayer[''];
            }
        }
        model.findChains = findChains;
        /**
         * @private
         */
        function getContainment(allChains, opts) {
            var chainsAsModels = allChains.map(function (c) { return MakerJs.chain.toNewModel(c); });
            var parents = [];
            //see which are inside of each other
            allChains.forEach(function (chainContext, i1) {
                if (!chainContext.endless)
                    return;
                var wp = chainContext.links[0].walkedPath;
                var firstPath = MakerJs.path.clone(wp.pathContext, wp.offset);
                allChains.forEach(function (otherChain, i2) {
                    if (chainContext === otherChain)
                        return;
                    if (!otherChain.endless)
                        return;
                    if (MakerJs.measure.isPointInsideModel(MakerJs.point.middle(firstPath), chainsAsModels[i2])) {
                        //since chains were sorted by pathLength, the smallest pathLength parent will be the parent if contained in multiple chains.
                        parents[i1] = otherChain;
                    }
                });
            });
            //convert parent to children
            var result = [];
            allChains.forEach(function (chainContext, i) {
                var parent = parents[i];
                if (!parent) {
                    result.push(chainContext);
                }
                else {
                    if (!parent.contains) {
                        parent.contains = [];
                    }
                    parent.contains.push(chainContext);
                }
            });
            if (opts.alternateDirection) {
                function alternate(chains, shouldBeClockwise) {
                    chains.forEach(function (chainContext, i) {
                        var isClockwise = MakerJs.measure.isChainClockwise(chainContext);
                        if (isClockwise !== null) {
                            if (!isClockwise && shouldBeClockwise || isClockwise && !shouldBeClockwise) {
                                MakerJs.chain.reverse(chainContext);
                            }
                        }
                        if (chainContext.contains) {
                            alternate(chainContext.contains, !shouldBeClockwise);
                        }
                    });
                }
                alternate(result, true);
            }
            return result;
        }
        /**
         * @private
         */
        function getBezierModels(modelContext) {
            var beziers = [];
            function checkIsBezier(wm) {
                if (wm.childModel.type === MakerJs.models.BezierCurve.typeName) {
                    beziers.push(wm);
                }
            }
            var options = {
                beforeChildWalk: function (walkedModel) {
                    checkIsBezier(walkedModel);
                    return true;
                }
            };
            var rootModel = {
                childId: '',
                childModel: modelContext,
                layer: modelContext.layer,
                offset: modelContext.origin,
                parentModel: null,
                route: [],
                routeKey: ''
            };
            checkIsBezier(rootModel);
            model.walk(modelContext, options);
            return beziers;
        }
        /**
         * @private
         */
        function swapBezierPathsWithSeeds(beziers, swap) {
            var tempKey = 'tempPaths';
            var tempLayerKey = 'tempLayer';
            beziers.forEach(function (wm) {
                var b = wm.childModel;
                if (swap) {
                    //set layer prior to looking for seeds by layer
                    if (wm.layer != undefined && wm.layer !== '') {
                        b[tempLayerKey] = b.layer;
                        b.layer = wm.layer;
                    }
                    //use seeds as path, hide the arc paths from findChains()
                    var bezierSeedsByLayer = MakerJs.models.BezierCurve.getBezierSeeds(b, { byLayers: true });
                    for (var layer in bezierSeedsByLayer) {
                        var bezierSeeds = bezierSeedsByLayer[layer];
                        if (bezierSeeds.length > 0) {
                            b[tempKey] = b.paths;
                            var newPaths = {};
                            bezierSeeds.forEach(function (seed, i) {
                                seed.layer = layer;
                                newPaths['seed_' + i] = seed;
                            });
                            b.paths = newPaths;
                        }
                    }
                }
                else {
                    //revert the above
                    if (tempKey in b) {
                        b.paths = b[tempKey];
                        delete b[tempKey];
                    }
                    if (tempLayerKey in b) {
                        if (b[tempLayerKey] == undefined) {
                            delete b.layer;
                        }
                        else {
                            b.layer = b[tempLayerKey];
                        }
                        delete b[tempLayerKey];
                    }
                }
            });
        }
    })(model = MakerJs.model || (MakerJs.model = {}));
})(MakerJs || (MakerJs = {}));
(function (MakerJs) {
    var chain;
    (function (chain) {
        /**
         * Shift the links of an endless chain.
         *
         * @param chainContext Chain to cycle through. Must be endless.
         * @param amount Optional number of links to shift. May be negative to cycle backwards.
         * @returns The chainContext for cascading.
         */
        function cycle(chainContext, amount) {
            if (amount === void 0) { amount = 1; }
            if (!chainContext.endless)
                return;
            var n = Math.abs(amount);
            for (var i = 0; i < n; i++) {
                if (amount < 0) {
                    //remove from beginning, add to end
                    chainContext.links.push(chainContext.links.shift());
                }
                else {
                    //remove from end, add to beginning
                    chainContext.links.unshift(chainContext.links.pop());
                }
            }
            return chainContext;
        }
        chain.cycle = cycle;
        /**
         * Reverse the links of a chain.
         *
         * @param chainContext Chain to reverse.
         * @returns The chainContext for cascading.
         */
        function reverse(chainContext) {
            chainContext.links.reverse();
            chainContext.links.forEach(function (link) { return link.reversed = !link.reversed; });
            return chainContext;
        }
        chain.reverse = reverse;
        /**
         * Set the beginning of an endless chain to a known routeKey of a path.
         *
         * @param chainContext Chain to cycle through. Must be endless.
         * @param routeKey RouteKey of the desired path to start the chain with.
         * @returns The chainContext for cascading.
         */
        function startAt(chainContext, routeKey) {
            if (!chainContext.endless)
                return;
            var index = -1;
            for (var i = 0; i < chainContext.links.length; i++) {
                if (chainContext.links[i].walkedPath.routeKey == routeKey) {
                    index = i;
                    break;
                }
            }
            if (index > 0) {
                cycle(chainContext, index);
            }
            return chainContext;
        }
        chain.startAt = startAt;
        /**
         * Convert a chain to a new model, independent of any model from where the chain was found.
         *
         * @param chainContext Chain to convert to a model.
         * @param detachFromOldModel Flag to remove the chain's paths from their current parent model. If false, each path will be cloned. If true, the original path will be re-parented into the resulting new model. Default is false.
         * @returns A new model containing paths from the chain.
         */
        function toNewModel(chainContext, detachFromOldModel) {
            if (detachFromOldModel === void 0) { detachFromOldModel = false; }
            var result = { paths: {} };
            for (var i = 0; i < chainContext.links.length; i++) {
                var wp = chainContext.links[i].walkedPath;
                if (wp.pathContext.type === MakerJs.pathType.BezierSeed) {
                    if (detachFromOldModel) {
                        delete wp.modelContext.paths[wp.pathId];
                    }
                    if (!result.models) {
                        result.models = {};
                    }
                    var modelId = MakerJs.model.getSimilarModelId(result, wp.pathId);
                    result.models[modelId] = MakerJs.model.moveRelative(new MakerJs.models.BezierCurve(wp.pathContext), wp.offset);
                }
                else {
                    var newPath;
                    if (detachFromOldModel) {
                        newPath = wp.pathContext;
                        delete wp.modelContext.paths[wp.pathId];
                    }
                    else {
                        newPath = MakerJs.path.clone(wp.pathContext);
                    }
                    var pathId = MakerJs.model.getSimilarPathId(result, wp.pathId);
                    result.paths[pathId] = MakerJs.path.moveRelative(newPath, wp.offset);
                }
            }
            return result;
        }
        chain.toNewModel = toNewModel;
        /**
         * @private
         */
        function removeDuplicateEnds(endless, points) {
            if (!endless || points.length < 2)
                return;
            if (MakerJs.measure.isPointEqual(points[0], points[points.length - 1], .00001)) {
                points.pop();
            }
        }
        /**
         * Get points along a chain of paths.
         *
         * @param chainContext Chain of paths to get points from.
         * @param distance Numeric distance along the chain between points, or numeric array of distances along the chain between each point.
         * @param maxPoints Maximum number of points to retrieve.
         * @returns Array of points which are on the chain spread at a uniform interval.
         */
        function toPoints(chainContext, distanceOrDistances, maxPoints) {
            var result = [];
            var di = 0;
            var t = 0;
            var distanceArray;
            if (Array.isArray(distanceOrDistances)) {
                distanceArray = distanceOrDistances;
            }
            for (var i = 0; i < chainContext.links.length; i++) {
                var link = chainContext.links[i];
                var wp = link.walkedPath;
                var len = link.pathLength;
                while (MakerJs.round(len - t) > 0) {
                    var r = t / len;
                    if (link.reversed) {
                        r = 1 - r;
                    }
                    result.push(MakerJs.point.add(MakerJs.point.middle(wp.pathContext, r), wp.offset));
                    if (maxPoints && result.length >= maxPoints)
                        return result;
                    var distance;
                    if (distanceArray) {
                        distance = distanceArray[di];
                        di++;
                        if (di > distanceArray.length) {
                            return result;
                        }
                    }
                    else {
                        distance = distanceOrDistances;
                    }
                    t += distance;
                }
                t -= len;
            }
            removeDuplicateEnds(chainContext.endless, result);
            return result;
        }
        chain.toPoints = toPoints;
        /**
         * Get key points (a minimal a number of points) along a chain of paths.
         *
         * @param chainContext Chain of paths to get points from.
         * @param maxArcFacet The maximum length between points on an arc or circle.
         * @returns Array of points which are on the chain.
         */
        function toKeyPoints(chainContext, maxArcFacet) {
            var result = [];
            for (var i = 0; i < chainContext.links.length; i++) {
                var link = chainContext.links[i];
                var wp = link.walkedPath;
                var keyPoints = MakerJs.path.toKeyPoints(wp.pathContext, maxArcFacet);
                if (keyPoints.length > 0) {
                    if (link.reversed) {
                        keyPoints.reverse();
                    }
                    if (i > 0) {
                        keyPoints.shift();
                    }
                    var offsetPathPoints = keyPoints.map(function (p) { return MakerJs.point.add(p, wp.offset); });
                    result.push.apply(result, offsetPathPoints);
                }
            }
            removeDuplicateEnds(chainContext.endless, result);
            return result;
        }
        chain.toKeyPoints = toKeyPoints;
    })(chain = MakerJs.chain || (MakerJs.chain = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var model;
    (function (model) {
        /**
         * @private
         */
        function getOpposedLink(linkedPaths, pathContext) {
            if (linkedPaths[0].path === pathContext) {
                return linkedPaths[1];
            }
            return linkedPaths[0];
        }
        /**
         * @private
         */
        function getFirstPathFromModel(modelContext) {
            if (!modelContext.paths)
                return null;
            for (var pathId in modelContext.paths) {
                return modelContext.paths[pathId];
            }
            return null;
        }
        /**
         * @private
         */
        function collectLoop(loop, loops, detach) {
            loops.push(loop);
            if (detach) {
                detachLoop(loop);
            }
        }
        /**
         * @private
         */
        function follow(connections, loops, detach) {
            //for a given point, follow the paths that connect to each other to form loops
            for (var i = 0; i < connections.collections.length; i++) {
                var linkedPaths = connections.collections[i].items;
                if (linkedPaths && linkedPaths.length > 0) {
                    var loopModel = {
                        paths: {},
                        insideCount: 0
                    };
                    var firstLink = linkedPaths[0];
                    var currLink = firstLink;
                    while (true) {
                        var currPath = currLink.path;
                        currPath.reversed = currLink.reversed;
                        var id = model.getSimilarPathId(loopModel, currPath.pathId);
                        loopModel.paths[id] = currPath;
                        var items = connections.findCollection(currLink.nextConnection);
                        if (!items || items.length == 0)
                            break;
                        var nextLink = getOpposedLink(items, currLink.path);
                        //remove the first 2 items, which should be currlink and nextlink
                        items.splice(0, 2);
                        if (!nextLink)
                            break;
                        currLink = nextLink;
                        if (currLink.path === firstLink.path) {
                            //loop is closed
                            collectLoop(loopModel, loops, detach);
                            break;
                        }
                    }
                }
            }
        }
        /**
         * Find paths that have common endpoints and form loops.
         *
         * @param modelContext The model to search for loops.
         * @param options Optional options object.
         * @returns A new model with child models ranked according to their containment within other found loops. The paths of models will be IPathDirectionalWithPrimeContext.
         */
        function findLoops(modelContext, options) {
            var loops = [];
            var result = { models: {} };
            var opts = {
                pointMatchingDistance: .005
            };
            MakerJs.extendObject(opts, options);
            function spin(callback) {
                for (var i = 0; i < loops.length; i++) {
                    callback(loops[i]);
                }
            }
            function getModelByDepth(depth) {
                var id = depth.toString();
                if (!(id in result.models)) {
                    var newModel = { models: {} };
                    result.models[id] = newModel;
                }
                return result.models[id];
            }
            function comparePoint(pointA, pointB) {
                var distance = MakerJs.measure.pointDistance(pointA, pointB);
                return distance <= opts.pointMatchingDistance;
            }
            var connections = new MakerJs.Collector(comparePoint);
            //todo: remove dead ends first
            model.originate(modelContext);
            //find loops by looking at all paths in this model
            var walkOptions = {
                onPath: function (walkedPath) {
                    var safePath = MakerJs.path.clone(walkedPath.pathContext);
                    safePath.pathId = walkedPath.pathId;
                    safePath.modelContext = modelContext;
                    //circles are loops by nature
                    if (safePath.type == MakerJs.pathType.Circle || (safePath.type == MakerJs.pathType.Arc && MakerJs.angle.ofArcSpan(walkedPath.pathContext) == 360)) {
                        var loopModel = {
                            paths: {},
                            insideCount: 0
                        };
                        loopModel.paths[walkedPath.pathId] = safePath;
                        collectLoop(loopModel, loops, opts.removeFromOriginal);
                    }
                    else {
                        //gather both endpoints from all non-circle segments
                        safePath.endPoints = MakerJs.point.fromPathEnds(safePath);
                        //don't add lines which are shorter than the tolerance
                        if (safePath.type == MakerJs.pathType.Line) {
                            var distance = MakerJs.measure.pointDistance(safePath.endPoints[0], safePath.endPoints[1]);
                            if (distance < opts.pointMatchingDistance) {
                                return;
                            }
                        }
                        for (var i = 2; i--;) {
                            var linkedPath = {
                                path: safePath,
                                nextConnection: safePath.endPoints[1 - i],
                                reversed: i != 0
                            };
                            connections.addItemToCollection(safePath.endPoints[i], linkedPath);
                        }
                    }
                }
            };
            model.walk(modelContext, walkOptions);
            //follow paths to find loops
            follow(connections, loops, opts.removeFromOriginal);
            //now we have all loops, we need to see which are inside of each other
            spin(function (firstLoop) {
                var firstPath = getFirstPathFromModel(firstLoop);
                if (!firstPath)
                    return;
                spin(function (secondLoop) {
                    if (firstLoop === secondLoop)
                        return;
                    if (MakerJs.measure.isPointInsideModel(MakerJs.point.middle(firstPath), secondLoop)) {
                        firstLoop.insideCount++;
                    }
                });
            });
            //now we can group similar loops by their nested level
            spin(function (loop) {
                var depthModel = getModelByDepth(loop.insideCount);
                var id = model.countChildModels(depthModel).toString();
                delete loop.insideCount;
                depthModel.models[id] = loop;
            });
            return result;
        }
        model.findLoops = findLoops;
        /**
         * Remove all paths in a loop model from the model(s) which contained them.
         *
         * @param loopToDetach The model to search for loops.
         */
        function detachLoop(loopToDetach) {
            for (var id in loopToDetach.paths) {
                var pathDirectionalWithOriginalContext = loopToDetach.paths[id];
                var primeModel = pathDirectionalWithOriginalContext.modelContext;
                if (primeModel && primeModel.paths && pathDirectionalWithOriginalContext.pathId) {
                    delete primeModel.paths[pathDirectionalWithOriginalContext.pathId];
                }
            }
        }
        model.detachLoop = detachLoop;
        /**
         * @private
         */
        var DeadEndFinder = /** @class */ (function () {
            function DeadEndFinder(pointMatchingDistance, keep, trackDeleted) {
                this.pointMatchingDistance = pointMatchingDistance;
                this.keep = keep;
                this.trackDeleted = trackDeleted;
                pointMatchingDistance = pointMatchingDistance || .005;
                function comparePoint(pointA, pointB) {
                    var distance = MakerJs.measure.pointDistance(pointA, pointB);
                    return distance <= pointMatchingDistance;
                }
                this.pointMap = new MakerJs.Collector(comparePoint);
            }
            DeadEndFinder.prototype.removePathRef = function (pathRef, reason) {
                var _this = this;
                var removePath = function (p) {
                    var pathRefs = _this.pointMap.findCollection(p);
                    for (var i = 0; i < pathRefs.length; i++) {
                        if (pathRefs[i] === pathRef) {
                            pathRefs.splice(i, 1);
                            return;
                        }
                    }
                };
                for (var i = 2; i--;) {
                    removePath(pathRef.endPoints[i]);
                }
                delete pathRef.modelContext.paths[pathRef.pathId];
                if (this.trackDeleted) {
                    this.trackDeleted(pathRef, reason);
                }
            };
            DeadEndFinder.prototype.removeDeadEnd = function (baseCount) {
                var _this = this;
                var found = 0;
                for (var i = 0; i < this.pointMap.collections.length; i++) {
                    var pathRefs = this.pointMap.collections[i].items;
                    if (pathRefs.length % 2 == 0)
                        continue;
                    if (pathRefs.length == 1) {
                        this.removePathRef(pathRefs[0], "dead end " + (baseCount + found));
                        found++;
                    }
                    else if (this.keep) {
                        //allow caller to decide to keep each path
                        pathRefs.forEach(function (pathRef) {
                            if (!_this.keep(pathRef)) {
                                _this.removePathRef(pathRef, "not keeping");
                                found++;
                            }
                        });
                    }
                }
                return found;
            };
            return DeadEndFinder;
        }());
        /**
         * Remove paths from a model which have endpoints that do not connect to other paths.
         *
         * @param modelContext The model to search for dead ends.
         * @param pointMatchingDistance Optional max distance to consider two points as the same.
         * @param keep Optional callback function (which should return a boolean) to decide if a dead end path should be kept instead.
         * @param trackDeleted Optional callback function which will log discarded paths and the reason they were discarded.
         * @returns The input model (for cascading).
         */
        function removeDeadEnds(modelContext, pointMatchingDistance, keep, trackDeleted) {
            var deadEndFinder = new DeadEndFinder(pointMatchingDistance, keep, trackDeleted);
            var walkOptions = {
                onPath: function (walkedPath) {
                    var endPoints = MakerJs.point.fromPathEnds(walkedPath.pathContext, walkedPath.offset);
                    if (!endPoints)
                        return;
                    var pathRef = walkedPath;
                    pathRef.endPoints = endPoints;
                    for (var i = 2; i--;) {
                        deadEndFinder.pointMap.addItemToCollection(endPoints[i], pathRef);
                    }
                }
            };
            model.walk(modelContext, walkOptions);
            var total = 0;
            var pass = 0;
            while (pass = deadEndFinder.removeDeadEnd(total)) {
                total += pass;
            }
            return modelContext;
        }
        model.removeDeadEnds = removeDeadEnds;
    })(model = MakerJs.model || (MakerJs.model = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var exporter;
    (function (exporter) {
        /**
         * Class for an XML tag.
         * @private
         */
        var XmlTag = /** @class */ (function () {
            /**
             * @param name Name of the XML tag.
             * @param attrs Optional attributes for the tag.
             */
            function XmlTag(name, attrs) {
                this.name = name;
                this.attrs = attrs;
                /**
                 * Text between the opening and closing tags.
                 */
                this.innerText = '';
            }
            /**
             * Escapes certain characters within a string so that it can appear in a tag or its attribute.
             *
             * @returns Escaped string.
             */
            XmlTag.escapeString = function (value) {
                var escape = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;'
                };
                for (var code in escape) {
                    //.split then .join is a 'replace'
                    value = value.split(code).join(escape[code]);
                }
                return value;
            };
            /**
             * Get the opening tag.
             *
             * @param selfClose Flag to determine if opening tag should be self closing.
             */
            XmlTag.prototype.getOpeningTag = function (selfClose) {
                var attrs = '';
                function outputAttr(attrName, attrValue) {
                    if (attrValue == null || typeof attrValue === 'undefined')
                        return;
                    if (Array.isArray(attrValue) || typeof attrValue === 'object') {
                        attrValue = JSON.stringify(attrValue);
                    }
                    if (typeof attrValue === 'string') {
                        attrValue = XmlTag.escapeString(attrValue);
                    }
                    attrs += ' ' + attrName + '="' + attrValue + '"';
                }
                for (var name in this.attrs) {
                    outputAttr(name, this.attrs[name]);
                }
                return '<' + this.name + attrs + (selfClose ? '/' : '') + '>';
            };
            /**
             * Get the inner text.
             */
            XmlTag.prototype.getInnerText = function () {
                if (this.innerTextEscaped) {
                    return this.innerText;
                }
                else {
                    return XmlTag.escapeString(this.innerText);
                }
            };
            /**
             * Get the closing tag.
             */
            XmlTag.prototype.getClosingTag = function () {
                return '</' + this.name + '>';
            };
            /**
             * Output the entire tag as a string.
             */
            XmlTag.prototype.toString = function () {
                var selfClose = !this.innerText;
                if (selfClose && !this.closingTags) {
                    return this.getOpeningTag(true);
                }
                else {
                    return this.getOpeningTag(false) + this.getInnerText() + this.getClosingTag();
                }
            };
            return XmlTag;
        }());
        exporter.XmlTag = XmlTag;
    })(exporter = MakerJs.exporter || (MakerJs.exporter = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var exporter;
    (function (exporter) {
        /**
         * @private
         */
        function wrap(prefix, content, condition) {
            if (condition) {
                return prefix + '(' + content + ')';
            }
            else {
                return content;
            }
        }
        /**
         * @private
         */
        function facetSizeToResolution(arcOrCircle, facetSize) {
            if (!facetSize)
                return;
            var circle = new MakerJs.paths.Circle([0, 0], arcOrCircle.radius);
            var length = MakerJs.measure.pathLength(circle);
            if (!length)
                return;
            return Math.ceil(length / facetSize);
        }
        /**
         * @private
         */
        function chainToJscadScript(chainContext, facetSize, accuracy) {
            var head = '';
            var tail = '';
            var first = true;
            var exit = false;
            var reverseTail = false;
            var beginMap = {};
            beginMap[MakerJs.pathType.Circle] = function (circle, link) {
                var circleOptions = {
                    center: MakerJs.point.rounded(MakerJs.point.add(circle.origin, link.walkedPath.offset), accuracy),
                    radius: MakerJs.round(circle.radius, accuracy),
                    resolution: facetSizeToResolution(circle, facetSize)
                };
                head = wrap('CAG.circle', JSON.stringify(circleOptions), true);
                exit = true;
            };
            beginMap[MakerJs.pathType.Line] = function (line, link) {
                var points = link.endPoints.map(function (p) { return MakerJs.point.rounded(p, accuracy); });
                if (link.reversed) {
                    points.reverse();
                }
                head = wrap('new CSG.Path2D', JSON.stringify(points), true);
            };
            beginMap[MakerJs.pathType.Arc] = function (arc, link) {
                var endAngle = MakerJs.angle.ofArcEnd(arc);
                if (link.reversed) {
                    reverseTail = true;
                }
                var arcOptions = {
                    center: MakerJs.point.rounded(MakerJs.point.add(arc.origin, link.walkedPath.offset), accuracy),
                    radius: MakerJs.round(arc.radius, accuracy),
                    startangle: MakerJs.round(arc.startAngle, accuracy),
                    endangle: MakerJs.round(endAngle, accuracy),
                    resolution: facetSizeToResolution(arc, facetSize)
                };
                head = wrap('new CSG.Path2D.arc', JSON.stringify(arcOptions), true);
            };
            var appendMap = {};
            appendMap[MakerJs.pathType.Line] = function (line, link) {
                var reverse = (reverseTail != link.reversed);
                var endPoint = MakerJs.point.rounded(link.endPoints[reverse ? 0 : 1], accuracy);
                append(wrap('.appendPoint', JSON.stringify(endPoint), true));
            };
            appendMap[MakerJs.pathType.Arc] = function (arc, link) {
                var reverse = (reverseTail != link.reversed);
                var endAngle = MakerJs.angle.ofArcEnd(arc);
                var arcOptions = {
                    radius: MakerJs.round(arc.radius, accuracy),
                    clockwise: reverse,
                    large: Math.abs(endAngle - arc.startAngle) > 180,
                    resolution: facetSizeToResolution(arc, facetSize)
                };
                var endPoint = MakerJs.point.rounded(link.endPoints[reverse ? 0 : 1], accuracy);
                append(wrap('.appendArc', JSON.stringify(endPoint) + ',' + JSON.stringify(arcOptions), true));
            };
            function append(s) {
                if (reverseTail) {
                    tail = s + tail;
                }
                else {
                    tail += s;
                }
            }
            for (var i = 0; i < chainContext.links.length; i++) {
                var link = chainContext.links[i];
                var pathContext = link.walkedPath.pathContext;
                var fn = first ? beginMap[pathContext.type] : appendMap[pathContext.type];
                if (fn) {
                    fn(pathContext, link);
                }
                if (exit) {
                    return head;
                }
                first = false;
            }
            return head + tail + '.close().innerToCAG()';
        }
        function makeFakeChainFromLoop(modelContext) {
            var fakeChain = { endless: true, links: [], pathLength: 0 };
            for (var pathId in modelContext.paths) {
                var pathContext = modelContext.paths[pathId];
                var walkedPath = {
                    layer: '',
                    modelContext: modelContext,
                    offset: [0, 0],
                    pathContext: pathContext,
                    pathId: pathId,
                    route: [],
                    routeKey: ''
                };
                var link = {
                    endPoints: pathContext.endPoints,
                    pathLength: 0,
                    reversed: pathContext.reversed,
                    walkedPath: walkedPath
                };
                fakeChain.links.push(link);
            }
            return fakeChain;
        }
        /**
         * DEPRECATED - use .toJscadScript() instead.
         * Creates a string of JavaScript code for execution with the OpenJsCad engine.
         *
         * @param modelToExport Model object to export.
         * @param options Export options object.
         * @param options.extrusion Height of 3D extrusion.
         * @param options.resolution Size of facets.
         * @returns String of JavaScript containing a main() function for OpenJsCad.
         */
        function toOpenJsCad(itemToExport, options) {
            if (!itemToExport)
                return '';
            var modelToExport;
            var all = '';
            var depth = 0;
            var depthModel;
            var opts = {
                extrusion: 1,
                pointMatchingDistance: .005,
                functionName: 'main'
            };
            MakerJs.extendObject(opts, options);
            if (MakerJs.isModel(itemToExport)) {
                modelToExport = itemToExport;
            }
            else {
                if (Array.isArray(itemToExport)) {
                    modelToExport = { paths: {} };
                    itemToExport.forEach(function (p, i) { return modelToExport.paths[i] = p; });
                }
                else {
                    modelToExport = { paths: { 0: itemToExport } };
                }
            }
            if (modelToExport.exporterOptions) {
                MakerJs.extendObject(opts, modelToExport.exporterOptions['toOpenJsCad']);
            }
            //pass options back into calling object
            MakerJs.extendObject(options, opts);
            if (opts && opts.modelMap) {
                all = exportFromOptionsMap(modelToExport, opts.modelMap);
            }
            if (!all) {
                var result = [];
                var loops = MakerJs.model.findLoops(modelToExport, opts);
                while (depthModel = loops.models[depth]) {
                    var union = '';
                    for (var modelId in depthModel.models) {
                        var subModel = depthModel.models[modelId];
                        var fakeChain = makeFakeChainFromLoop(subModel);
                        union += wrap('.union', chainToJscadScript(fakeChain, opts.facetSize, opts.accuracy), union);
                    }
                    var operator = (depth % 2 == 0) ? '.union' : '.subtract';
                    result.push(wrap(operator, union, result.length));
                    depth++;
                }
                if (result.length === 0) {
                    throw ('No closed geometries found.');
                }
                var extrudeOptions = { offset: [0, 0, opts.extrusion] };
                result.push(wrap('.extrude', JSON.stringify(extrudeOptions), true));
                all = 'return ' + result.join('');
            }
            return 'function ' + opts.functionName + '(){' + all + ';}';
        }
        exporter.toOpenJsCad = toOpenJsCad;
        /**
         * @private
         */
        function exportFromOptionsMap(modelToExport, optionsMap) {
            if (!modelToExport.models)
                return;
            var result = [];
            var union = [];
            var i = 0;
            for (var key in optionsMap) {
                var fName = 'f' + i;
                var options = optionsMap[key];
                options.functionName = fName;
                var childModel = modelToExport.models[key];
                if (childModel) {
                    result.push(toOpenJsCad(childModel, options));
                    union.push('(' + fName + '())');
                }
                i++;
            }
            if (!result.length)
                return;
            result.push('return ' + union.join('.union'));
            return result.join(' ');
        }
        /**
         * DEPRECATED - use .toJscadSTL() instead.
         * Executes a JavaScript string with the OpenJsCad engine - converts 2D to 3D.
         *
         * @param modelToExport Model object to export.
         * @param options Export options object.
         * @param options.extrusion Height of 3D extrusion.
         * @param options.resolution Size of facets.
         * @returns String of STL format of 3D object.
         */
        function toSTL(modelToExport, options) {
            if (options === void 0) { options = {}; }
            if (!modelToExport)
                return '';
            var container;
            switch (MakerJs.environment) {
                case MakerJs.environmentTypes.BrowserUI:
                    if (!('CAG' in window) || !('CSG' in window)) {
                        throw "OpenJsCad library not found. Download http://maker.js.org/external/OpenJsCad/csg.js and http://maker.js.org/external/OpenJsCad/formats.js to your website and add script tags.";
                    }
                    container = window;
                    break;
                case MakerJs.environmentTypes.NodeJs:
                    //this can throw if not found
                    container = eval('require("openjscad-csg")');
                    break;
                case MakerJs.environmentTypes.WebWorker:
                    if (!('CAG' in self) || !('CSG' in self)) {
                        throw "OpenJsCad library not found. Download http://maker.js.org/external/OpenJsCad/csg.js and http://maker.js.org/external/OpenJsCad/formats.js to your website and add an importScripts statement.";
                    }
                    container = self;
                    break;
            }
            var script = toOpenJsCad(modelToExport, options);
            script += 'return ' + options.functionName + '();';
            var f = new Function('CAG', 'CSG', script);
            var csg = f(container.CAG, container.CSG);
            return csg.toStlString();
        }
        exporter.toSTL = toSTL;
        /**
         * @private
         */
        function makePhasedCallback(originalCb, phaseStart, phaseSpan) {
            return function statusCallback(status) {
                originalCb && originalCb({ progress: phaseStart + status.progress * phaseSpan / 100 });
            };
        }
        /**
         * Converts a model to a @jscad/csg object - 2D to 2D.
         *
         * Example:
         * ```
         * //First, use npm install @jscad/csg from the command line in your jscad project
         * //Create a CAG instance from a model.
         * var { CAG } = require('@jscad/csg');
         * var model = new makerjs.models.Ellipse(70, 40);
         * var cag = makerjs.exporter.toJscadCAG(CAG, model, {maxArcFacet: 1});
         * ```
         *
         * @param jscadCAG @jscad/csg CAG engine.
         * @param modelToExport Model object to export.
         * @param options Optional options object.
         * @param options.byLayers Optional flag to separate chains by layers.
         * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
         * @param options.maxArcFacet The maximum length between points on an arc or circle.
         * @param options.statusCallback Optional callback function to get the percentage complete.
         * @returns jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.
         */
        function toJscadCAG(jscadCAG, modelToExport, jsCadCagOptions) {
            function chainToJscadCag(c, maxArcFacet) {
                var keyPoints = MakerJs.chain.toKeyPoints(c, maxArcFacet);
                keyPoints.push(keyPoints[0]);
                return jscadCAG.fromPoints(keyPoints);
            }
            function jscadCagUnion(augend, addend) {
                return augend.union(addend);
            }
            function jscadCagSubtraction(minuend, subtrahend) {
                return minuend.subtract(subtrahend);
            }
            return convertChainsTo2D(chainToJscadCag, jscadCagUnion, jscadCagSubtraction, modelToExport, jsCadCagOptions);
        }
        exporter.toJscadCAG = toJscadCAG;
        /**
         * @private
         */
        function convertChainsTo2D(convertToT, union, subtraction, modelToExport, jsCadCagOptions) {
            if (jsCadCagOptions === void 0) { jsCadCagOptions = {}; }
            var adds = {};
            var status = { total: 0, complete: 0 };
            function unionize(phaseStart, phaseSpan, arr) {
                var result = arr.shift();
                arr.forEach(function (el) { return result = union(result, el); });
                status.complete++;
                jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: phaseStart + phaseSpan * status.complete / status.total });
                return result;
            }
            function subtractChains(layerId, cs) {
                var subtracts = [];
                cs.forEach(function (c) {
                    if (!c.endless)
                        return;
                    if (c.contains) {
                        addChains(layerId, c.contains);
                    }
                    status.total++;
                    subtracts.unshift(convertToT(c, jsCadCagOptions.maxArcFacet));
                });
                return subtracts;
            }
            function addChains(layerId, cs) {
                cs.forEach(function (c) {
                    if (!c.endless)
                        return;
                    var add = { cag: convertToT(c, jsCadCagOptions.maxArcFacet), subtracts: [] };
                    if (c.contains) {
                        var subtracts = subtractChains(layerId, c.contains);
                        if (subtracts.length > 0) {
                            add.subtracts.push(subtracts);
                        }
                    }
                    status.total++;
                    if (!(layerId in adds)) {
                        adds[layerId] = [];
                    }
                    adds[layerId].unshift(add);
                });
            }
            var options = {
                pointMatchingDistance: jsCadCagOptions.pointMatchingDistance,
                byLayers: jsCadCagOptions.byLayers,
                contain: true
            };
            jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 25 });
            var chainsResult = MakerJs.model.findChains(modelToExport, options);
            if (Array.isArray(chainsResult)) {
                addChains('', chainsResult);
            }
            else {
                for (var layerId in chainsResult) {
                    addChains(layerId, chainsResult[layerId]);
                }
            }
            jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 50 });
            var closedCount = 0;
            for (var layerId in adds) {
                closedCount += adds[layerId].length;
            }
            if (closedCount === 0) {
                jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
                throw ('No closed geometries found.');
            }
            var resultMap = {};
            for (var layerId in adds) {
                var flatAdds = adds[layerId].map(function (add) {
                    var result = add.cag;
                    add.subtracts.forEach(function (subtract) {
                        var union = unionize(50, 50, subtract);
                        result = subtraction(result, union);
                    });
                    return result;
                });
                resultMap[layerId] = unionize(50, 50, flatAdds);
            }
            jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
            return options.byLayers ? resultMap : resultMap[''];
        }
        /**
         * Converts a model to a @jscad/csg object - 2D to 3D.
         *
         * Example:
         * ```
         * //First, use npm install @jscad/csg from the command line in your jscad project
         * //Create a CSG instance from a model.
         * var { CAG } = require('@jscad/csg');
         * var model = new makerjs.models.Ellipse(70, 40);
         * var csg = makerjs.exporter.toJscadCSG(CAG, model, {maxArcFacet: 1, extrude: 10});
         * ```
         *
         * @param jscadCAG @jscad/csg CAG engine.
         * @param modelToExport Model object to export.
         * @param options Optional options object.
         * @param options.byLayers Optional flag to separate chains by layers.
         * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
         * @param options.maxArcFacet The maximum length between points on an arc or circle.
         * @param options.statusCallback Optional callback function to get the percentage complete.
         * @param options.extrude Optional default extrusion distance.
         * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
         * @returns jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.
         */
        function toJscadCSG(jscadCAG, modelToExport, options) {
            function to2D(opts) {
                return toJscadCAG(jscadCAG, modelToExport, opts);
            }
            function to3D(cag, extrude, z) {
                var csg = cag.extrude({ offset: [0, 0, extrude] });
                if (z) {
                    csg = csg.translate([0, 0, z]);
                }
                return csg;
            }
            function union3D(augend, addend) {
                return augend.union(addend);
            }
            return convert2Dto3D(to2D, to3D, union3D, modelToExport, options);
        }
        exporter.toJscadCSG = toJscadCSG;
        /**
         * @private
         */
        function convert2Dto3D(to2D, to3D, union3D, modelToExport, options) {
            if (options === void 0) { options = {}; }
            var originalCb = options.statusCallback;
            function getDefinedNumber(a, b) {
                if (MakerJs.isNumber(a))
                    return a;
                return b;
            }
            if (modelToExport.exporterOptions) {
                MakerJs.extendObject(options, modelToExport.exporterOptions['toJscadCSG']);
            }
            options.byLayers = options.byLayers || (options.layerOptions && true);
            options.statusCallback = makePhasedCallback(originalCb, 0, 50);
            var result2D = to2D(options);
            var csgs = [];
            if (options.byLayers) {
                for (var layerId in result2D) {
                    var layerOptions = options.layerOptions[layerId];
                    var csg = to3D(result2D[layerId], layerOptions.extrude || options.extrude, getDefinedNumber(layerOptions.z, options.z));
                    csgs.push(csg);
                }
            }
            else {
                var csg = to3D(result2D, options.extrude, options.z);
                csgs.push(csg);
            }
            options.statusCallback = makePhasedCallback(originalCb, 50, 100);
            var status = { total: csgs.length - 1, complete: 0 };
            var result = csgs.shift();
            csgs.forEach(function (el, i) {
                result = union3D(result, el);
                status.complete++;
                options.statusCallback({ progress: status.complete / status.total });
            });
            return result;
        }
        /**
         * Creates a string of JavaScript code for execution with a Jscad environment.
         *
         * @param modelToExport Model object to export.
         * @param options Export options object.
         * @param options.byLayers Optional flag to separate chains by layers.
         * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
         * @param options.maxArcFacet The maximum length between points on an arc or circle.
         * @param options.statusCallback Optional callback function to get the percentage complete.
         * @param options.extrude Optional default extrusion distance.
         * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
         * @returns String of JavaScript containing a main() function for Jscad.
         */
        function toJscadScript(modelToExport, options) {
            if (options === void 0) { options = {}; }
            function _chainToJscadScript(c, maxArcFacet) {
                return wrap(chainToJscadScript(c, maxArcFacet, options.accuracy));
            }
            function scriptUnion(augend, addend) {
                return augend + (".union(" + addend + ")");
            }
            function scriptSubtraction(minuend, subtrahend) {
                return minuend + (".subtract(" + subtrahend + ")");
            }
            function to2D(opts) {
                return convertChainsTo2D(_chainToJscadScript, scriptUnion, scriptSubtraction, modelToExport, options);
            }
            function to3D(cag, extrude, z) {
                var csg = cag + (".extrude({ offset: [0, 0, " + extrude + "] })");
                if (z) {
                    csg = csg + (".translate([0, 0, " + z + "])");
                }
                return csg;
            }
            function wrap(s) {
                return "" + nl + indent + s + nl;
            }
            var indent = new Array((options.indent || 0) + 1).join(' ');
            var nl = options.indent ? '\n' : '';
            var result = convert2Dto3D(to2D, to3D, scriptUnion, modelToExport, options).trim();
            return "function " + (options.functionName || 'main') + "(){" + wrap("return " + result + ";") + "}" + nl;
        }
        exporter.toJscadScript = toJscadScript;
        /**
         * Exports a model in STL format - 2D to 3D.
         *
         * @param jscadCAG @jscad/csg CAG engine.
         * @param stlSerializer @jscad/stl-serializer (require('@jscad/stl-serializer')).
         * @param modelToExport Model object to export.
         * @param options Optional options object.
         * @param options.byLayers Optional flag to separate chains by layers.
         * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
         * @param options.maxArcFacet The maximum length between points on an arc or circle.
         * @param options.statusCallback Optional callback function to get the percentage complete.
         * @param options.extrude Optional default extrusion distance.
         * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
         * @returns String in STL ASCII format.
         */
        function toJscadSTL(CAG, stlSerializer, modelToExport, options) {
            var originalCb = options.statusCallback;
            options.statusCallback = makePhasedCallback(originalCb, 0, 50);
            var csg = toJscadCSG(CAG, modelToExport, options);
            return stlSerializer.serialize(csg, { binary: false, statusCallback: makePhasedCallback(originalCb, 50, 50) });
        }
        exporter.toJscadSTL = toJscadSTL;
    })(exporter = MakerJs.exporter || (MakerJs.exporter = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var exporter;
    (function (exporter) {
        /**
         * Injects drawing into a PDFKit document.
         *
         * @param modelToExport Model object to export.
         * @param options Export options object.
         * @returns String of PDF file contents.
         */
        function toPDF(doc, modelToExport, options) {
            if (!modelToExport)
                return;
            //fixup options
            var opts = {
                origin: [0, 0],
                stroke: "#000"
            };
            MakerJs.extendObject(opts, options);
            //try to get the unit system from the itemToExport
            var scale = 1;
            var exportUnits = opts.units || modelToExport.units;
            if (exportUnits) {
                //convert to inch
                scale = MakerJs.units.conversionScale(exportUnits, MakerJs.unitType.Inch);
            }
            else {
                //assume pixels, convert to inch
                scale = 1 / 100;
            }
            //from inch to PDF PPI
            scale *= 72;
            //TODO scale each element without a whole clone
            var scaledModel = MakerJs.model.scale(MakerJs.cloneObject(modelToExport), scale);
            var size = MakerJs.measure.modelExtents(scaledModel);
            var left = -size.low[0];
            var offset = [left, size.high[1]];
            offset = MakerJs.point.add(offset, options.origin);
            MakerJs.model.findChains(scaledModel, function (chains, loose, layer) {
                function single(walkedPath) {
                    var pathData = exporter.pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset);
                    doc.path(pathData).stroke(opts.stroke);
                }
                chains.map(function (chain) {
                    if (chain.links.length > 1) {
                        var pathData = exporter.chainToSVGPathData(chain, offset);
                        doc.path(pathData).stroke(opts.stroke);
                    }
                    else {
                        var walkedPath = chain.links[0].walkedPath;
                        if (walkedPath.pathContext.type === MakerJs.pathType.Circle) {
                            var fixedPath;
                            MakerJs.path.moveTemporary([walkedPath.pathContext], [walkedPath.offset], function () {
                                fixedPath = MakerJs.path.mirror(walkedPath.pathContext, false, true);
                            });
                            MakerJs.path.moveRelative(fixedPath, offset);
                            //TODO use only chainToSVGPathData instead of circle, so that we can use fill
                            doc.circle(fixedPath.origin[0], fixedPath.origin[1], walkedPath.pathContext.radius).stroke(opts.stroke);
                        }
                        else {
                            single(walkedPath);
                        }
                    }
                });
                loose.map(single);
            }, { byLayers: false });
        }
        exporter.toPDF = toPDF;
    })(exporter = MakerJs.exporter || (MakerJs.exporter = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var exporter;
    (function (exporter) {
        /**
         * @private
         */
        var chainLinkToPathDataMap = {};
        chainLinkToPathDataMap[MakerJs.pathType.Arc] = function (arc, endPoint, reversed, d, accuracy) {
            d.push('A');
            svgArcData(d, arc.radius, endPoint, accuracy, MakerJs.angle.ofArcSpan(arc) > 180, reversed ? (arc.startAngle > arc.endAngle) : (arc.startAngle < arc.endAngle));
        };
        chainLinkToPathDataMap[MakerJs.pathType.Line] = function (line, endPoint, reversed, d, accuracy) {
            d.push('L', MakerJs.round(endPoint[0], accuracy), MakerJs.round(endPoint[1], accuracy));
        };
        chainLinkToPathDataMap[MakerJs.pathType.BezierSeed] = function (seed, endPoint, reversed, d, accuracy) {
            svgBezierData(d, seed, accuracy, reversed);
        };
        /**
         * @private
         */
        function svgCoords(p) {
            return MakerJs.point.mirror(p, false, true);
        }
        /**
         * @private
         */
        function correctArc(arc) {
            var arcSpan = MakerJs.angle.ofArcSpan(arc);
            arc.startAngle = MakerJs.angle.noRevolutions(arc.startAngle);
            arc.endAngle = arc.startAngle + arcSpan;
        }
        /**
         * Convert a chain to SVG path data.
         *
         * @param chain Chain to convert.
         * @param offset IPoint relative offset point.
         * @param accuracy Optional accuracy of SVG path data.
         * @returns String of SVG path data.
         */
        function chainToSVGPathData(chain, offset, accuracy) {
            function offsetPoint(p) {
                return MakerJs.point.add(p, offset);
            }
            var first = chain.links[0];
            var firstPoint = offsetPoint(svgCoords(first.endPoints[first.reversed ? 1 : 0]));
            var d = ['M', MakerJs.round(firstPoint[0], accuracy), MakerJs.round(firstPoint[1], accuracy)];
            for (var i = 0; i < chain.links.length; i++) {
                var link = chain.links[i];
                var pathContext = link.walkedPath.pathContext;
                var fn = chainLinkToPathDataMap[pathContext.type];
                if (fn) {
                    var fixedPath;
                    MakerJs.path.moveTemporary([pathContext], [link.walkedPath.offset], function () {
                        fixedPath = MakerJs.path.mirror(pathContext, false, true);
                    });
                    MakerJs.path.moveRelative(fixedPath, offset);
                    fn(fixedPath, offsetPoint(svgCoords(link.endPoints[link.reversed ? 0 : 1])), link.reversed, d, accuracy);
                }
            }
            if (chain.endless) {
                d.push('Z');
            }
            return d.join(' ');
        }
        exporter.chainToSVGPathData = chainToSVGPathData;
        /**
         * @private
         */
        function startSvgPathData(start, d, accuracy) {
            return ["M", MakerJs.round(start[0], accuracy), MakerJs.round(start[1], accuracy)].concat(d);
        }
        /**
         * @private
         */
        var svgPathDataMap = {};
        svgPathDataMap[MakerJs.pathType.Line] = function (line, accuracy) {
            return startSvgPathData(line.origin, MakerJs.point.rounded(line.end, accuracy), accuracy);
        };
        svgPathDataMap[MakerJs.pathType.Circle] = function (circle, accuracy, clockwiseCircle) {
            return startSvgPathData(circle.origin, svgCircleData(circle.radius, accuracy, clockwiseCircle), accuracy);
        };
        svgPathDataMap[MakerJs.pathType.Arc] = function (arc, accuracy) {
            correctArc(arc);
            var arcPoints = MakerJs.point.fromArc(arc);
            if (MakerJs.measure.isPointEqual(arcPoints[0], arcPoints[1])) {
                return svgPathDataMap[MakerJs.pathType.Circle](arc, accuracy);
            }
            else {
                var d = ['A'];
                svgArcData(d, arc.radius, arcPoints[1], accuracy, MakerJs.angle.ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
                return startSvgPathData(arcPoints[0], d, accuracy);
            }
        };
        svgPathDataMap[MakerJs.pathType.BezierSeed] = function (seed, accuracy) {
            var d = [];
            svgBezierData(d, seed, accuracy);
            return startSvgPathData(seed.origin, d, accuracy);
        };
        /**
         * Export a path to SVG path data.
         *
         * @param pathToExport IPath to export.
         * @param pathOffset IPoint relative offset of the path object.
         * @param exportOffset IPoint relative offset point of the export.
         * @param accuracy Optional accuracy of SVG path data.
         * @param clockwiseCircle Optional flag to use clockwise winding for circles.
         * @returns String of SVG path data.
         */
        function pathToSVGPathData(pathToExport, pathOffset, exportOffset, accuracy, clockwiseCircle) {
            var fn = svgPathDataMap[pathToExport.type];
            if (fn) {
                var fixedPath;
                MakerJs.path.moveTemporary([pathToExport], [pathOffset], function () {
                    fixedPath = MakerJs.path.mirror(pathToExport, false, true);
                });
                MakerJs.path.moveRelative(fixedPath, exportOffset);
                var d = fn(fixedPath, accuracy, clockwiseCircle);
                return d.join(' ');
            }
            return '';
        }
        exporter.pathToSVGPathData = pathToSVGPathData;
        /**
         * @private
         */
        function getPathDataByLayer(modelToExport, offset, options, accuracy) {
            var pathDataByLayer = {};
            options.unifyBeziers = true;
            MakerJs.model.findChains(modelToExport, function (chains, loose, layer) {
                function single(walkedPath, clockwise) {
                    var pathData = pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset, accuracy, clockwise);
                    pathDataByLayer[layer].push(pathData);
                }
                pathDataByLayer[layer] = [];
                function doChains(cs, clockwise) {
                    cs.forEach(function (chain) {
                        if (chain.links.length > 1) {
                            var pathData = chainToSVGPathData(chain, offset, accuracy);
                            pathDataByLayer[layer].push(pathData);
                        }
                        else {
                            single(chain.links[0].walkedPath, clockwise);
                        }
                        if (chain.contains) {
                            doChains(chain.contains, !clockwise);
                        }
                    });
                }
                doChains(chains, true);
                loose.forEach(function (wp) { return single(wp); });
            }, options);
            return pathDataByLayer;
        }
        function toSVGPathData(modelToExport) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var options = {
                fillRule: 'evenodd'
            };
            if (typeof args[0] === 'boolean') {
                options.byLayers = args[0];
                options.origin = args[1];
                options.accuracy = args[2];
            }
            else if (MakerJs.isObject(args[0])) {
                MakerJs.extendObject(options, args[0]);
            }
            var findChainsOptions = {
                byLayers: options.byLayers,
                contain: false
            };
            if (options.fillRule === 'nonzero') {
                findChainsOptions.contain = {
                    alternateDirection: true
                };
            }
            var size = MakerJs.measure.modelExtents(modelToExport);
            if (!options.origin) {
                options.origin = [-size.low[0], size.high[1]];
            }
            var pathDataArrayByLayer = getPathDataByLayer(modelToExport, options.origin, findChainsOptions, options.accuracy);
            var pathDataStringByLayer = {};
            for (var layer in pathDataArrayByLayer) {
                pathDataStringByLayer[layer] = pathDataArrayByLayer[layer].join(' ');
            }
            return findChainsOptions.byLayers ? pathDataStringByLayer : pathDataStringByLayer[''];
        }
        exporter.toSVGPathData = toSVGPathData;
        /**
         * Renders an item in SVG markup.
         *
         * @param itemToExport Item to render: may be a path, an array of paths, or a model object.
         * @param options Rendering options object.
         * @param options.annotate Boolean to indicate that the id's of paths should be rendered as SVG text elements.
         * @param options.origin point object for the rendered reference origin.
         * @param options.scale Number to scale the SVG rendering.
         * @param options.stroke String color of the rendered paths.
         * @param options.strokeWidth String numeric width and optional units of the rendered paths.
         * @param options.units String of the unit system. May be omitted. See makerjs.unitType for possible values.
         * @param options.useSvgPathOnly Boolean to use SVG path elements instead of line, circle etc.
         * @returns String of XML / SVG content.
         */
        function toSVG(itemToExport, options) {
            function append(value, layer, forcePush) {
                if (forcePush === void 0) { forcePush = false; }
                if (!forcePush && typeof layer == "string" && layer.length > 0) {
                    if (!(layer in layers)) {
                        layers[layer] = [];
                    }
                    layers[layer].push(value);
                }
                else {
                    elements.push(value);
                }
            }
            function cssStyle(elOpts) {
                var a = [];
                function push(name, val) {
                    if (val === undefined)
                        return;
                    a.push(name + ':' + val);
                }
                push('stroke', elOpts.stroke);
                push('stroke-width', elOpts.strokeWidth);
                push('fill', elOpts.fill);
                return a.join(';');
            }
            function addSvgAttrs(attrs, elOpts) {
                if (!elOpts)
                    return;
                MakerJs.extendObject(attrs, {
                    "stroke": elOpts.stroke,
                    "stroke-width": elOpts.strokeWidth,
                    "fill": elOpts.fill,
                    "style": elOpts.cssStyle || cssStyle(elOpts)
                });
            }
            function colorLayerOptions(layer) {
                if (opts.layerOptions && opts.layerOptions[layer])
                    return opts.layerOptions[layer];
                if (layer in exporter.colors) {
                    return {
                        stroke: layer
                    };
                }
            }
            function createElement(tagname, attrs, layer, innerText, forcePush) {
                if (innerText === void 0) { innerText = null; }
                if (forcePush === void 0) { forcePush = false; }
                if (tagname !== 'text') {
                    addSvgAttrs(attrs, colorLayerOptions(layer));
                }
                if (!opts.scalingStroke) {
                    attrs['vector-effect'] = 'non-scaling-stroke';
                }
                var tag = new exporter.XmlTag(tagname, attrs);
                tag.closingTags = opts.closingTags;
                if (innerText) {
                    tag.innerText = innerText;
                }
                append(tag.toString(), layer, forcePush);
            }
            function fixPoint(pointToFix) {
                //in DXF Y increases upward. in SVG, Y increases downward
                var pointMirroredY = svgCoords(pointToFix);
                return MakerJs.point.scale(pointMirroredY, opts.scale);
            }
            function fixPath(pathToFix, origin) {
                //mirror creates a copy, so we don't modify the original
                var mirrorY = MakerJs.path.mirror(pathToFix, false, true);
                return MakerJs.path.moveRelative(MakerJs.path.scale(mirrorY, opts.scale), origin);
            }
            //fixup options
            var opts = {
                accuracy: .001,
                annotate: false,
                origin: null,
                scale: 1,
                stroke: "#000",
                strokeLineCap: "round",
                strokeWidth: '0.25mm',
                fill: "none",
                fillRule: "evenodd",
                fontSize: '9pt',
                useSvgPathOnly: true,
                viewBox: true
            };
            MakerJs.extendObject(opts, options);
            var modelToExport;
            var itemToExportIsModel = MakerJs.isModel(itemToExport);
            if (itemToExportIsModel) {
                modelToExport = itemToExport;
                if (modelToExport.exporterOptions) {
                    MakerJs.extendObject(opts, modelToExport.exporterOptions['toSVG']);
                }
            }
            var elements = [];
            var layers = {};
            //measure the item to move it into svg area
            if (itemToExportIsModel) {
                modelToExport = itemToExport;
            }
            else if (Array.isArray(itemToExport)) {
                //issue: this won't handle an array of models
                var pathMap = {};
                itemToExport.forEach(function (p, i) { pathMap[i] = p; });
                modelToExport = { paths: pathMap };
            }
            else if (MakerJs.isPath(itemToExport)) {
                modelToExport = { paths: { modelToMeasure: itemToExport } };
            }
            var size = MakerJs.measure.modelExtents(modelToExport);
            //try to get the unit system from the itemToExport
            if (!opts.units) {
                var unitSystem = exporter.tryGetModelUnits(itemToExport);
                if (unitSystem) {
                    opts.units = unitSystem;
                }
            }
            //convert unit system (if it exists) into SVG's units. scale if necessary.
            var useSvgUnit = exporter.svgUnit[opts.units];
            if (useSvgUnit && opts.viewBox) {
                opts.scale *= useSvgUnit.scaleConversion;
            }
            if (size && !opts.origin) {
                var left = -size.low[0] * opts.scale;
                opts.origin = [left, size.high[1] * opts.scale];
            }
            //also pass back to options parameter
            MakerJs.extendObject(options, opts);
            //begin svg output
            var svgAttrs;
            if (size && opts.viewBox) {
                var width = MakerJs.round(size.width * opts.scale, opts.accuracy);
                var height = MakerJs.round(size.height * opts.scale, opts.accuracy);
                var viewBox = [0, 0, width, height];
                var unit = useSvgUnit ? useSvgUnit.svgUnitType : '';
                svgAttrs = {
                    width: width + unit,
                    height: height + unit,
                    viewBox: viewBox.join(' ')
                };
            }
            var svgTag = new exporter.XmlTag('svg', MakerJs.extendObject(svgAttrs || {}, opts.svgAttrs));
            append(svgTag.getOpeningTag(false));
            var groupAttrs = {
                id: 'svgGroup',
                "stroke-linecap": opts.strokeLineCap,
                "fill-rule": opts.fillRule,
                "font-size": opts.fontSize
            };
            addSvgAttrs(groupAttrs, opts);
            var svgGroup = new exporter.XmlTag('g', groupAttrs);
            append(svgGroup.getOpeningTag(false));
            if (opts.useSvgPathOnly) {
                var findChainsOptions = {
                    byLayers: true
                };
                if (opts.fillRule === 'nonzero') {
                    findChainsOptions.contain = {
                        alternateDirection: true
                    };
                }
                var pathDataByLayer = getPathDataByLayer(modelToExport, opts.origin, findChainsOptions, opts.accuracy);
                for (var layerId1 in pathDataByLayer) {
                    var pathData = pathDataByLayer[layerId1].join(' ');
                    var attrs = { "d": pathData };
                    if (layerId1.length > 0) {
                        attrs["id"] = layerId1;
                    }
                    createElement("path", attrs, layerId1, null, true);
                }
            }
            else {
                function drawText(id, textPoint, layer) {
                    createElement("text", {
                        "id": id + "_text",
                        "x": MakerJs.round(textPoint[0], opts.accuracy),
                        "y": MakerJs.round(textPoint[1], opts.accuracy)
                    }, layer, id);
                }
                function drawPath(id, x, y, d, layer, route, textPoint, annotate, flow) {
                    createElement("path", {
                        "id": id,
                        "data-route": route,
                        "d": ["M", MakerJs.round(x, opts.accuracy), MakerJs.round(y, opts.accuracy)].concat(d).join(" ")
                    }, layer);
                    if (annotate) {
                        drawText(id, textPoint, layer);
                    }
                }
                function circleInPaths(id, center, radius, layer, route, annotate, flow) {
                    var d = svgCircleData(radius, opts.accuracy);
                    drawPath(id, center[0], center[1], d, layer, route, center, annotate, flow);
                }
                var map = {};
                map[MakerJs.pathType.Line] = function (id, line, layer, className, route, annotate, flow) {
                    var start = line.origin;
                    var end = line.end;
                    createElement("line", {
                        "id": id,
                        "class": className,
                        "data-route": route,
                        "x1": MakerJs.round(start[0], opts.accuracy),
                        "y1": MakerJs.round(start[1], opts.accuracy),
                        "x2": MakerJs.round(end[0], opts.accuracy),
                        "y2": MakerJs.round(end[1], opts.accuracy)
                    }, layer);
                    if (annotate) {
                        drawText(id, MakerJs.point.middle(line), layer);
                    }
                    if (flow) {
                        addFlowMarks(flow, layer, line.origin, line.end, MakerJs.angle.ofLineInDegrees(line));
                    }
                };
                map[MakerJs.pathType.Circle] = function (id, circle, layer, className, route, annotate, flow) {
                    var center = circle.origin;
                    createElement("circle", {
                        "id": id,
                        "class": className,
                        "data-route": route,
                        "r": circle.radius,
                        "cx": MakerJs.round(center[0], opts.accuracy),
                        "cy": MakerJs.round(center[1], opts.accuracy)
                    }, layer);
                    if (annotate) {
                        drawText(id, center, layer);
                    }
                };
                map[MakerJs.pathType.Arc] = function (id, arc, layer, className, route, annotate, flow) {
                    correctArc(arc);
                    var arcPoints = MakerJs.point.fromArc(arc);
                    if (MakerJs.measure.isPointEqual(arcPoints[0], arcPoints[1])) {
                        circleInPaths(id, arc.origin, arc.radius, layer, route, annotate, flow);
                    }
                    else {
                        var d = ['A'];
                        svgArcData(d, arc.radius, arcPoints[1], opts.accuracy, MakerJs.angle.ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
                        drawPath(id, arcPoints[0][0], arcPoints[0][1], d, layer, route, MakerJs.point.middle(arc), annotate, flow);
                        if (flow) {
                            addFlowMarks(flow, layer, arcPoints[1], arcPoints[0], MakerJs.angle.noRevolutions(arc.startAngle - 90));
                        }
                    }
                };
                map[MakerJs.pathType.BezierSeed] = function (id, seed, layer, className, route, annotate, flow) {
                    var d = [];
                    svgBezierData(d, seed, opts.accuracy);
                    drawPath(id, seed.origin[0], seed.origin[1], d, layer, route, MakerJs.point.middle(seed), annotate, flow);
                };
                function addFlowMarks(flow, layer, origin, end, endAngle) {
                    var className = 'flow';
                    //origin: add a circle
                    map[MakerJs.pathType.Circle]('', new MakerJs.paths.Circle(origin, flow.size / 2), layer, className, null, false, null);
                    //end: add an arrow
                    var arrowEnd = [-1 * flow.size, flow.size / 2];
                    var arrowLines = [arrowEnd, MakerJs.point.mirror(arrowEnd, false, true)].map(function (p) { return new MakerJs.paths.Line(MakerJs.point.add(MakerJs.point.rotate(p, endAngle), end), end); });
                    arrowLines.forEach(function (a) { return map[MakerJs.pathType.Line]('', a, layer, className, null, false, null); });
                }
                function beginModel(id, modelContext) {
                    modelGroup.attrs = { id: id };
                    append(modelGroup.getOpeningTag(false), modelContext.layer);
                }
                function endModel(modelContext) {
                    append(modelGroup.getClosingTag(), modelContext.layer);
                }
                var modelGroup = new exporter.XmlTag('g');
                var walkOptions = {
                    beforeChildWalk: function (walkedModel) {
                        beginModel(walkedModel.childId, walkedModel.childModel);
                        return true;
                    },
                    onPath: function (walkedPath) {
                        var fn = map[walkedPath.pathContext.type];
                        if (fn) {
                            var offset = MakerJs.point.add(fixPoint(walkedPath.offset), opts.origin);
                            fn(walkedPath.pathId, fixPath(walkedPath.pathContext, offset), walkedPath.layer, null, walkedPath.route, opts.annotate, opts.flow);
                        }
                    },
                    afterChildWalk: function (walkedModel) {
                        endModel(walkedModel.childModel);
                    }
                };
                beginModel('0', modelToExport);
                MakerJs.model.walk(modelToExport, walkOptions);
                //export layers as groups
                for (var layerId2 in layers) {
                    var layerGroup = new exporter.XmlTag('g', { id: layerId2 });
                    addSvgAttrs(layerGroup.attrs, colorLayerOptions(layerId2));
                    for (var i = 0; i < layers[layerId2].length; i++) {
                        layerGroup.innerText += layers[layerId2][i];
                    }
                    layerGroup.innerTextEscaped = true;
                    append(layerGroup.toString());
                }
            }
            append(svgGroup.getClosingTag());
            append(svgTag.getClosingTag());
            return elements.join('');
        }
        exporter.toSVG = toSVG;
        /**
         * @private
         */
        function svgCircleData(radius, accuracy, clockwiseCircle) {
            var r = MakerJs.round(radius, accuracy);
            var d = ['m', -r, 0];
            function halfCircle(sign) {
                d.push('a');
                svgArcData(d, r, [2 * r * sign, 0], accuracy, false, !clockwiseCircle);
            }
            halfCircle(1);
            halfCircle(-1);
            d.push('z');
            return d;
        }
        /**
         * @private
         */
        function svgBezierData(d, seed, accuracy, reversed) {
            if (seed.controls.length === 1) {
                d.push('Q', MakerJs.round(seed.controls[0][0], accuracy), MakerJs.round(seed.controls[0][1], accuracy));
            }
            else {
                var controls = reversed ? [seed.controls[1], seed.controls[0]] : seed.controls;
                d.push('C', MakerJs.round(controls[0][0], accuracy), MakerJs.round(controls[0][1], accuracy), MakerJs.round(controls[1][0], accuracy), MakerJs.round(controls[1][1], accuracy));
            }
            var final = reversed ? seed.origin : seed.end;
            d.push(MakerJs.round(final[0], accuracy), MakerJs.round(final[1], accuracy));
        }
        /**
         * @private
         */
        function svgArcData(d, radius, endPoint, accuracy, largeArc, increasing) {
            var r = MakerJs.round(radius, accuracy);
            var end = endPoint;
            d.push(r, r);
            d.push(0); //0 = x-axis rotation
            d.push(largeArc ? 1 : 0); //large arc=1, small arc=0
            d.push(increasing ? 0 : 1); //sweep-flag 0=increasing, 1=decreasing 
            d.push(MakerJs.round(end[0], accuracy), MakerJs.round(end[1], accuracy));
        }
        /**
         * Map of MakerJs unit system to SVG unit system
         */
        exporter.svgUnit = {};
        //SVG Coordinate Systems, Transformations and Units documentation:
        //http://www.w3.org/TR/SVG/coords.html
        //The supported length unit identifiers are: em, ex, px, pt, pc, cm, mm, in, and percentages.
        exporter.svgUnit[MakerJs.unitType.Inch] = { svgUnitType: "in", scaleConversion: 1 };
        exporter.svgUnit[MakerJs.unitType.Millimeter] = { svgUnitType: "mm", scaleConversion: 1 };
        exporter.svgUnit[MakerJs.unitType.Centimeter] = { svgUnitType: "cm", scaleConversion: 1 };
        //Add conversions for all unitTypes
        exporter.svgUnit[MakerJs.unitType.Foot] = { svgUnitType: "in", scaleConversion: 12 };
        exporter.svgUnit[MakerJs.unitType.Meter] = { svgUnitType: "cm", scaleConversion: 100 };
    })(exporter = MakerJs.exporter || (MakerJs.exporter = {}));
})(MakerJs || (MakerJs = {}));
(function (MakerJs) {
    var importer;
    (function (importer) {
        /**
         * Create a model from SVG path data.
         *
         * @param pathData SVG path data.
         * @param options ISVGImportOptions object.
         * @param options.bezierAccuracy Optional accuracy of Bezier curves.
         * @returns An IModel object.
         */
        function fromSVGPathData(pathData, options) {
            if (options === void 0) { options = {}; }
            var result = {};
            function addPath(p) {
                if (!result.paths) {
                    result.paths = {};
                }
                result.paths['p_' + ++pathCount] = p;
            }
            function addModel(m) {
                if (!result.models) {
                    result.models = {};
                }
                result.models['p_' + ++pathCount] = m;
            }
            function getPoint(cmd, offset) {
                if (offset === void 0) { offset = 0; }
                var p = MakerJs.point.mirror([cmd.data[0 + offset], cmd.data[1 + offset]], false, true);
                if (cmd.absolute) {
                    return p;
                }
                else {
                    return MakerJs.point.add(p, cmd.from);
                }
            }
            function lineTo(cmd, end) {
                if (!MakerJs.measure.isPointEqual(cmd.from, end)) {
                    addPath(new MakerJs.paths.Line(cmd.from, end));
                }
                return end;
            }
            var map = {};
            map['M'] = function (cmd) {
                firstPoint = getPoint(cmd);
                return firstPoint;
            };
            map['Z'] = function (cmd) {
                return lineTo(cmd, firstPoint);
            };
            map['H'] = function (cmd) {
                var end = MakerJs.point.clone(cmd.from);
                if (cmd.absolute) {
                    end[0] = cmd.data[0];
                }
                else {
                    end[0] += cmd.data[0];
                }
                return lineTo(cmd, end);
            };
            map['V'] = function (cmd) {
                var end = MakerJs.point.clone(cmd.from);
                //subtract to mirror on y axis: SVG coords
                if (cmd.absolute) {
                    end[1] = -cmd.data[0];
                }
                else {
                    end[1] -= cmd.data[0];
                }
                return lineTo(cmd, end);
            };
            map['L'] = function (cmd) {
                var end = getPoint(cmd);
                return lineTo(cmd, end);
            };
            map['A'] = function (cmd) {
                var rx = cmd.data[0];
                var ry = cmd.data[1];
                var rotation = cmd.data[2];
                var large = cmd.data[3] === 1;
                var decreasing = cmd.data[4] === 1;
                var end = getPoint(cmd, 5);
                var elliptic = rx !== ry;
                //first, rotate so we are dealing with a zero angle x-axis
                var xAxis = new MakerJs.paths.Line(cmd.from, MakerJs.point.rotate(end, rotation, cmd.from));
                //next, un-distort any ellipse back into a circle in terms of x axis
                if (elliptic) {
                    xAxis = MakerJs.path.distort(xAxis, 1, rx / ry);
                }
                //now create an arc, making sure we use the large and decreasing flags
                var arc = new MakerJs.paths.Arc(xAxis.origin, xAxis.end, rx, large, decreasing);
                if (elliptic) {
                    //scale up if radius was insufficient.
                    if (rx < arc.radius) {
                        var scaleUp = arc.radius / rx;
                        rx *= scaleUp;
                        ry *= scaleUp;
                    }
                    //create an elliptical arc, this will re-distort
                    var e = new MakerJs.models.EllipticArc(arc, 1, ry / rx, options.bezierAccuracy);
                    //un-rotate back to where it should be.
                    MakerJs.model.rotate(e, -rotation, cmd.from);
                    addModel(e);
                }
                else {
                    //just use the arc
                    //un-rotate back to where it should be.
                    MakerJs.path.rotate(arc, -rotation, cmd.from);
                    addPath(arc);
                }
                return end;
            };
            map['C'] = function (cmd) {
                var control1 = getPoint(cmd, 0);
                var control2 = getPoint(cmd, 2);
                var end = getPoint(cmd, 4);
                addModel(new MakerJs.models.BezierCurve(cmd.from, control1, control2, end, options.bezierAccuracy));
                return end;
            };
            map['S'] = function (cmd) {
                var control1;
                var prevControl2;
                if (cmd.prev.command === 'C') {
                    prevControl2 = getPoint(cmd.prev, 2);
                    control1 = MakerJs.point.rotate(prevControl2, 180, cmd.from);
                }
                else if (cmd.prev.command === 'S') {
                    prevControl2 = getPoint(cmd.prev, 0);
                    control1 = MakerJs.point.rotate(prevControl2, 180, cmd.from);
                }
                else {
                    control1 = cmd.from;
                }
                var control2 = getPoint(cmd, 0);
                var end = getPoint(cmd, 2);
                addModel(new MakerJs.models.BezierCurve(cmd.from, control1, control2, end, options.bezierAccuracy));
                return end;
            };
            map['Q'] = function (cmd) {
                var control = getPoint(cmd, 0);
                var end = getPoint(cmd, 2);
                addModel(new MakerJs.models.BezierCurve(cmd.from, control, end, options.bezierAccuracy));
                return end;
            };
            map['T'] = function (cmd) {
                var control;
                var prevControl;
                if (cmd.prev.command === 'Q') {
                    prevControl = getPoint(cmd.prev, 0);
                    control = MakerJs.point.rotate(prevControl, 180, cmd.from);
                }
                else if (cmd.prev.command === 'T') {
                    prevControl = getPoint(cmd.prev, 2); //see below *
                    control = MakerJs.point.rotate(prevControl, 180, cmd.from);
                }
                else {
                    control = cmd.from;
                }
                //* save the control point in the data list, will be accessible from index 2
                var p = MakerJs.point.mirror(control, false, true);
                cmd.data.push.apply(cmd.data, p);
                var end = getPoint(cmd, 0);
                addModel(new MakerJs.models.BezierCurve(cmd.from, control, end, options.bezierAccuracy));
                return end;
            };
            var firstPoint = [0, 0];
            var currPoint = [0, 0];
            var pathCount = 0;
            var prevCommand;
            var regexpCommands = /([achlmqstvz])([0-9e\.,\+-\s]*)/ig;
            var commandMatches;
            while ((commandMatches = regexpCommands.exec(pathData)) !== null) {
                if (commandMatches.index === regexpCommands.lastIndex) {
                    regexpCommands.lastIndex++;
                }
                var command = commandMatches[1]; //0 = command and data, 1 = command, 2 = data
                var dataString = commandMatches[2];
                var currCmd = {
                    command: command.toUpperCase(),
                    data: [],
                    from: currPoint,
                    prev: prevCommand
                };
                if (command === currCmd.command) {
                    currCmd.absolute = true;
                }
                currCmd.data = importer.parseNumericList(dataString);
                var fn = map[currCmd.command];
                if (fn) {
                    currPoint = fn(currCmd);
                }
                prevCommand = currCmd;
            }
            return result;
        }
        importer.fromSVGPathData = fromSVGPathData;
    })(importer = MakerJs.importer || (MakerJs.importer = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var layout;
    (function (layout) {
        /**
         * @private
         */
        function getChildPlacement(parentModel, baseline) {
            //measure everything and cache the results
            var atlas = new MakerJs.measure.Atlas(parentModel);
            var measureParent = MakerJs.measure.modelExtents(parentModel, atlas);
            //measure height of the model from the baseline 0
            var parentTop = measureParent.high[1];
            var cpa = [];
            var xMap = {};
            var walkOptions = {
                beforeChildWalk: function (context) {
                    var child = context.childModel;
                    //get cached measurement of the child
                    var m = atlas.modelMap[context.routeKey];
                    if (!m)
                        return;
                    var childMeasure = MakerJs.measure.augment(m);
                    //set a new origin at the x-center and y-baseline of the child
                    MakerJs.model.originate(child, [childMeasure.center[0], parentTop * baseline]);
                    //get the x-center of the child
                    var x = child.origin[0] - measureParent.low[0];
                    xMap[context.childId] = x;
                    //get the x-center of the child as a percentage
                    var xRatio = x / measureParent.width;
                    cpa.push({ childId: context.childId, xRatio: xRatio });
                    //do not walk the grandchildren. This is only for immediate children of the parentModel.
                    return false;
                }
            };
            MakerJs.model.walk(parentModel, walkOptions);
            cpa.sort(function (a, b) { return a.xRatio - b.xRatio; });
            var first = cpa[0];
            var last = cpa[cpa.length - 1];
            var min = first.xRatio;
            var max = last.xRatio;
            var span = max - min;
            cpa.forEach(function (cp) { return cp.xRatio = (cp.xRatio - min) / span; });
            return {
                cpa: cpa,
                firstX: xMap[first.childId],
                lastX: measureParent.width - xMap[last.childId]
            };
        }
        /**
         * @private
         */
        function moveAndRotate(parentModel, cpa, rotate) {
            cpa.forEach(function (cp) {
                var child = parentModel.models[cp.childId];
                //move the child to the new location
                child.origin = cp.origin;
                //rotate the child
                if (rotate)
                    MakerJs.model.rotate(child, cp.angle, cp.origin);
            });
        }
        /**
         * @private
         */
        var onPathMap = {};
        onPathMap[MakerJs.pathType.Arc] = function (arc, reversed, cpa) {
            var arcSpan = MakerJs.angle.ofArcSpan(arc);
            cpa.forEach(function (p) { return p.angle = reversed ? arc.endAngle - p.xRatio * arcSpan - 90 : arc.startAngle + p.xRatio * arcSpan + 90; });
        };
        onPathMap[MakerJs.pathType.Line] = function (line, reversed, cpa) {
            var lineAngle = MakerJs.angle.ofLineInDegrees(line);
            cpa.forEach(function (p) { return p.angle = lineAngle; });
        };
        /**
         * Layout the children of a model along a path.
         * The x-position of each child will be projected onto the path so that the proportion between children is maintained.
         * Each child will be rotated such that it will be perpendicular to the path at the child's x-center.
         *
         * @param parentModel The model containing children to lay out.
         * @param onPath The path on which to lay out.
         * @param baseline Numeric percentage value of vertical displacement from the path. Default is zero.
         * @param reversed Flag to travel along the path in reverse. Default is false.
         * @param contain Flag to contain the children layout within the length of the path. Default is false.
         * @param rotate Flag to rotate the child to perpendicular. Default is true.
         * @returns The parentModel, for cascading.
         */
        function childrenOnPath(parentModel, onPath, baseline, reversed, contain, rotate) {
            if (baseline === void 0) { baseline = 0; }
            if (reversed === void 0) { reversed = false; }
            if (contain === void 0) { contain = false; }
            if (rotate === void 0) { rotate = true; }
            var result = getChildPlacement(parentModel, baseline);
            var cpa = result.cpa;
            var chosenPath = onPath;
            if (contain) {
                //see if we need to clip
                var onPathLength = MakerJs.measure.pathLength(onPath);
                if (result.firstX + result.lastX < onPathLength) {
                    chosenPath = MakerJs.path.clone(onPath);
                    MakerJs.path.alterLength(chosenPath, -result.firstX, true);
                    MakerJs.path.alterLength(chosenPath, -result.lastX);
                }
            }
            cpa.forEach(function (p) { return p.origin = MakerJs.point.middle(chosenPath, reversed ? 1 - p.xRatio : p.xRatio); });
            var fn = onPathMap[chosenPath.type];
            if (fn) {
                fn(chosenPath, reversed, cpa);
            }
            moveAndRotate(parentModel, cpa, rotate);
            return parentModel;
        }
        layout.childrenOnPath = childrenOnPath;
        /**
         * @private
         */
        function miterAngles(points, offsetAngle) {
            var arc = new MakerJs.paths.Arc([0, 0], 0, 0, 0);
            return points.map(function (p, i) {
                var a;
                if (i === 0) {
                    a = MakerJs.angle.ofPointInDegrees(p, points[i + 1]) + 90;
                }
                else if (i === points.length - 1) {
                    a = MakerJs.angle.ofPointInDegrees(points[i - 1], p) + 90;
                }
                else {
                    arc.origin = p;
                    arc.startAngle = MakerJs.angle.ofPointInDegrees(p, points[i + 1]);
                    arc.endAngle = MakerJs.angle.ofPointInDegrees(p, points[i - 1]);
                    a = MakerJs.angle.ofArcMiddle(arc);
                }
                return a + offsetAngle;
            });
        }
        /**
         * Layout the children of a model along a chain.
         * The x-position of each child will be projected onto the chain so that the proportion between children is maintained.
         * The projected positions of the children will become an array of points that approximate the chain.
         * Each child will be rotated such that it will be mitered according to the vertex angles formed by this series of points.
         *
         * @param parentModel The model containing children to lay out.
         * @param onChain The chain on which to lay out.
         * @param baseline Numeric percentage value of vertical displacement from the chain. Default is zero.
         * @param reversed Flag to travel along the chain in reverse. Default is false.
         * @param contain Flag to contain the children layout within the length of the chain. Default is false.
         * @param rotate Flag to rotate the child to mitered angle. Default is true.
         * @returns The parentModel, for cascading.
         */
        function childrenOnChain(parentModel, onChain, baseline, reversed, contain, rotated) {
            if (baseline === void 0) { baseline = 0; }
            if (reversed === void 0) { reversed = false; }
            if (contain === void 0) { contain = false; }
            if (rotated === void 0) { rotated = true; }
            var result = getChildPlacement(parentModel, baseline);
            var cpa = result.cpa;
            var chainLength = onChain.pathLength;
            if (contain)
                chainLength -= result.firstX + result.lastX;
            var absolutes = cpa.map(function (cp) { return (reversed ? 1 - cp.xRatio : cp.xRatio) * chainLength; });
            var relatives;
            if (reversed)
                absolutes.reverse();
            relatives = absolutes.map(function (ab, i) { return Math.abs(ab - (i == 0 ? 0 : absolutes[i - 1])); });
            if (contain) {
                relatives[0] += reversed ? result.lastX : result.firstX;
            }
            else {
                relatives.shift();
            }
            //chain.toPoints always follows the chain in its order, from beginning to end. This is why we needed to contort the points input
            var points = MakerJs.chain.toPoints(onChain, relatives);
            if (points.length < cpa.length) {
                //add last point of chain, since our distances exceeded the chain
                var endLink = onChain.links[onChain.links.length - 1];
                points.push(endLink.endPoints[endLink.reversed ? 0 : 1]);
            }
            if (contain)
                points.shift(); //delete the first point which is the beginning of the chain
            if (reversed)
                points.reverse();
            var angles = miterAngles(points, -90);
            cpa.forEach(function (cp, i) {
                cp.angle = angles[i];
                cp.origin = points[i];
            });
            moveAndRotate(parentModel, cpa, rotated);
            return parentModel;
        }
        layout.childrenOnChain = childrenOnChain;
        /**
         * Layout clones in a radial format.
         *
         * Example:
         * ```
         * //daisy petals
         * var makerjs = require('makerjs');
         *
         * var belt = new makerjs.models.Belt(5, 50, 20);
         *
         * makerjs.model.move(belt, [25, 0]);
         *
         * var petals = makerjs.layout.cloneToRadial(belt, 8, 45);
         *
         * document.write(makerjs.exporter.toSVG(petals));
         * ```
         *
         * @param itemToClone: Either a model or a path object.
         * @param count Number of clones in the radial result.
         * @param angleInDegrees angle of rotation between clones..
         * @returns A new model with clones in a radial format.
         */
        function cloneToRadial(itemToClone, count, angleInDegrees, rotationOrigin) {
            var result = {};
            var add;
            var rotateFn;
            if (MakerJs.isModel(itemToClone)) {
                add = result.models = {};
                rotateFn = MakerJs.model.rotate;
            }
            else {
                add = result.paths = {};
                rotateFn = MakerJs.path.rotate;
            }
            for (var i = 0; i < count; i++) {
                add[i] = rotateFn(MakerJs.cloneObject(itemToClone), i * angleInDegrees, rotationOrigin);
            }
            return result;
        }
        layout.cloneToRadial = cloneToRadial;
        /**
         * @private
         */
        function cloneTo(dimension, itemToClone, count, margin) {
            var result = {};
            var add;
            var measureFn;
            var moveFn;
            if (MakerJs.isModel(itemToClone)) {
                measureFn = MakerJs.measure.modelExtents;
                add = result.models = {};
                moveFn = MakerJs.model.move;
            }
            else {
                measureFn = MakerJs.measure.pathExtents;
                add = result.paths = {};
                moveFn = MakerJs.path.move;
            }
            var m = measureFn(itemToClone);
            var size = m.high[dimension] - m.low[dimension];
            for (var i = 0; i < count; i++) {
                var origin = [0, 0];
                origin[dimension] = i * (size + margin);
                add[i] = moveFn(MakerJs.cloneObject(itemToClone), origin);
            }
            return result;
        }
        /**
         * Layout clones in a column format.
         *
         * Example:
         * ```
         * //Grooves for a finger joint
         * var m = require('makerjs');
         *
         * var dogbone = new m.models.Dogbone(50, 20, 2, -1, false);
         *
         * var grooves = m.layout.cloneToColumn(dogbone, 5, 20);
         *
         * document.write(m.exporter.toSVG(grooves));
         * ```
         *
         * @param itemToClone: Either a model or a path object.
         * @param count Number of clones in the column.
         * @param margin Optional distance between each clone.
         * @returns A new model with clones in a column.
         */
        function cloneToColumn(itemToClone, count, margin) {
            if (margin === void 0) { margin = 0; }
            return cloneTo(1, itemToClone, count, margin);
        }
        layout.cloneToColumn = cloneToColumn;
        /**
         * Layout clones in a row format.
         *
         * Example:
         * ```
         * //Tongue and grooves for a box joint
         * var m = require('makerjs');
         * var tongueWidth = 60;
         * var grooveWidth = 50;
         * var grooveDepth = 30;
         * var groove = new m.models.Dogbone(grooveWidth, grooveDepth, 5, 0, true);
         *
         * groove.paths['leftTongue'] = new m.paths.Line([-tongueWidth / 2, 0], [0, 0]);
         * groove.paths['rightTongue'] = new m.paths.Line([grooveWidth, 0], [grooveWidth + tongueWidth / 2, 0]);
         *
         * var tongueAndGrooves = m.layout.cloneToRow(groove, 3);
         *
         * document.write(m.exporter.toSVG(tongueAndGrooves));
         * ```
         *
         * @param itemToClone: Either a model or a path object.
         * @param count Number of clones in the row.
         * @param margin Optional distance between each clone.
         * @returns A new model with clones in a row.
         */
        function cloneToRow(itemToClone, count, margin) {
            if (margin === void 0) { margin = 0; }
            return cloneTo(0, itemToClone, count, margin);
        }
        layout.cloneToRow = cloneToRow;
        /**
         * Layout clones in a grid format.
         *
         * Example:
         * ```
         * //Grid of squares
         * var m = require('makerjs');
         * var square = new m.models.Square(43);
         * var grid = m.layout.cloneToGrid(square, 5, 5, 7);
         * document.write(m.exporter.toSVG(grid));
         * ```
         *
         * @param itemToClone: Either a model or a path object.
         * @param xCount Number of columns in the grid.
         * @param yCount Number of rows in the grid.
         * @param margin Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.
         * @returns A new model with clones in a grid layout.
         */
        function cloneToGrid(itemToClone, xCount, yCount, margin) {
            var margins = getMargins(margin);
            return cloneToColumn(cloneToRow(itemToClone, xCount, margins[0]), yCount, margins[1]);
        }
        layout.cloneToGrid = cloneToGrid;
        /**
         * @private
         */
        function getMargins(margin) {
            if (Array.isArray(margin)) {
                return margin;
            }
            else {
                return [margin, margin];
            }
        }
        /**
         * @private
         */
        function cloneToAlternatingRows(itemToClone, xCount, yCount, spacingFn) {
            var modelToMeasure;
            if (MakerJs.isModel(itemToClone)) {
                modelToMeasure = itemToClone;
            }
            else {
                modelToMeasure = { paths: { "0": itemToClone } };
            }
            var spacing = spacingFn(modelToMeasure);
            var result = { models: {} };
            for (var i = 0; i < yCount; i++) {
                var i2 = i % 2;
                result.models[i] = MakerJs.model.move(cloneToRow(itemToClone, xCount + i2, spacing.xMargin), [i2 * spacing.x, i * spacing.y]);
            }
            return result;
        }
        /**
         * Layout clones in a brick format. Alternating rows will have an additional item in each row.
         *
         * Examples:
         * ```
         * //Brick wall
         * var m = require('makerjs');
         * var brick = new m.models.RoundRectangle(50, 30, 4);
         * var wall = m.layout.cloneToBrick(brick, 8, 6, 3);
         * document.write(m.exporter.toSVG(wall));
         * ```
         *
         * ```
         * //Fish scales
         * var m = require('makerjs');
         * var arc = new m.paths.Arc([0, 0], 50, 20, 160);
         * var scales = m.layout.cloneToBrick(arc, 8, 20);
         * document.write(m.exporter.toSVG(scales));
         * ```
         *
         * @param itemToClone: Either a model or a path object.
         * @param xCount Number of columns in the brick grid.
         * @param yCount Number of rows in the brick grid.
         * @param margin Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.
         * @returns A new model with clones in a brick layout.
         */
        function cloneToBrick(itemToClone, xCount, yCount, margin) {
            var margins = getMargins(margin);
            function spacing(modelToMeasure) {
                var m = MakerJs.measure.modelExtents(modelToMeasure);
                var xMargin = margins[0] || 0;
                var yMargin = margins[1] || 0;
                return { x: (m.width + xMargin) / -2, y: m.height + yMargin, xMargin: xMargin };
            }
            return cloneToAlternatingRows(itemToClone, xCount, yCount, spacing);
        }
        layout.cloneToBrick = cloneToBrick;
        /**
         * Layout clones in a honeycomb format. Alternating rows will have an additional item in each row.
         *
         * Examples:
         * ```
         * //Honeycomb
         * var m = require('makerjs');
         * var hex = new m.models.Polygon(6, 50, 30);
         * var pattern = m.layout.cloneToHoneycomb(hex, 8, 9, 10);
         * document.write(m.exporter.toSVG(pattern));
         * ```
         *
         * @param itemToClone: Either a model or a path object.
         * @param xCount Number of columns in the honeycomb grid.
         * @param yCount Number of rows in the honeycomb grid.
         * @param margin Optional distance between each clone.
         * @returns A new model with clones in a honeycomb layout.
         */
        function cloneToHoneycomb(itemToClone, xCount, yCount, margin) {
            if (margin === void 0) { margin = 0; }
            function spacing(modelToMeasure) {
                var hex = MakerJs.measure.boundingHexagon(modelToMeasure);
                var width = 2 * MakerJs.solvers.equilateralAltitude(hex.radius);
                var s = width + margin;
                return { x: s / -2, y: MakerJs.solvers.equilateralAltitude(s), xMargin: margin };
            }
            return cloneToAlternatingRows(itemToClone, xCount, yCount, spacing);
        }
        layout.cloneToHoneycomb = cloneToHoneycomb;
    })(layout = MakerJs.layout || (MakerJs.layout = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        /**
         * @private
         */
        var hasLib = false;
        /**
         * @private
         */
        function ensureBezierLib() {
            if (hasLib)
                return;
            try {
                var lib = Bezier.prototype;
                hasLib = true;
            }
            catch (e) {
                throw "Bezier library not found. If you are using Node, try running 'npm install' or if you are in the browser, download http://pomax.github.io/bezierjs/bezier.js to your website and add a script tag.";
            }
        }
        /**
         * @private
         */
        var scratch;
        /**
         * @private
         */
        function getScratch(seed) {
            var points = [seed.origin];
            points.push.apply(points, seed.controls);
            points.push(seed.end);
            var bezierJsPoints = points.map(function (p) {
                var bp = {
                    x: p[0], y: p[1]
                };
                return bp;
            });
            if (!scratch) {
                ensureBezierLib();
                scratch = new Bezier(bezierJsPoints);
            }
            else {
                //invoke the constructor on the same object
                Bezier.apply(scratch, bezierJsPoints);
            }
            return scratch;
        }
        /**
         * @private
         */
        function BezierToSeed(b, range) {
            var points = b.points.map(getIPoint);
            var seed = new BezierSeed(points);
            if (range) {
                seed.parentRange = range;
            }
            return seed;
        }
        /**
         * @private
         */
        function seedToBezier(seed) {
            var coords = [];
            coords.push.apply(coords, seed.origin);
            coords.push.apply(coords, seed.controls[0]);
            if (seed.controls.length > 1) {
                coords.push.apply(coords, seed.controls[1]);
            }
            coords.push.apply(coords, seed.end);
            ensureBezierLib();
            return new Bezier(coords);
        }
        /**
         * @private
         */
        function getExtrema(b) {
            var extrema = b.extrema().values
                .map(function (m) { return MakerJs.round(m); })
                .filter(function (value, index, self) { return self.indexOf(value) === index; })
                .sort();
            if (extrema.length === 0)
                return [0, 1];
            //ensure leading zero
            if (extrema[0] !== 0) {
                extrema.unshift(0);
            }
            //ensure ending 1
            if (extrema[extrema.length - 1] !== 1) {
                extrema.push(1);
            }
            return extrema;
        }
        /**
         * @private
         */
        function getIPoint(p) {
            return [p.x, p.y];
        }
        /**
         * @private
         */
        var TPoint = /** @class */ (function () {
            function TPoint(b, t, offset) {
                this.t = t;
                this.point = MakerJs.point.add(getIPoint(b.get(t)), offset);
            }
            return TPoint;
        }());
        /**
         * @private
         */
        function getError(b, startT, endT, arc, arcReversed) {
            var tSpan = endT - startT;
            function m(ratio) {
                var t = startT + tSpan * ratio;
                var bp = getIPoint(b.get(t));
                var ap = MakerJs.point.middle(arc, arcReversed ? 1 - ratio : ratio);
                return MakerJs.measure.pointDistance(ap, bp);
            }
            return m(0.25) + m(0.75);
        }
        /**
         * @private
         */
        function getLargestArc(b, startT, endT, accuracy) {
            var arc, lastGoodArc;
            var start = new TPoint(b, startT);
            var end = new TPoint(b, endT);
            var upper = end;
            var lower = start;
            var count = 0;
            var test = upper;
            var reversed;
            while (count < 100) {
                var middle = getIPoint(b.get((start.t + test.t) / 2));
                //if the 3 points are linear, this may throw
                try {
                    arc = new MakerJs.paths.Arc(start.point, middle, test.point);
                }
                catch (e) {
                    if (lastGoodArc) {
                        return lastGoodArc;
                    }
                    else {
                        break;
                    }
                }
                //only need to test once to see if this arc is polar / clockwise
                if (reversed === undefined) {
                    reversed = MakerJs.measure.isPointEqual(start.point, MakerJs.point.fromAngleOnCircle(arc.endAngle, arc));
                }
                //now we have a valid arc, measure the error.
                var error = getError(b, startT, test.t, arc, reversed);
                //if error is within accuracy, this becomes the lower
                if (error <= accuracy) {
                    arc.bezierData = {
                        startT: startT,
                        endT: test.t
                    };
                    lower = test;
                    lastGoodArc = arc;
                }
                else {
                    upper = test;
                }
                //exit if lower is the end
                if (lower.t === upper.t || (lastGoodArc && (lastGoodArc !== arc) && (MakerJs.angle.ofArcSpan(arc) - MakerJs.angle.ofArcSpan(lastGoodArc)) < .5)) {
                    return lastGoodArc;
                }
                count++;
                test = new TPoint(b, (lower.t + upper.t) / 2);
            }
            //arc failed, so return a line
            var line = new MakerJs.paths.Line(start.point, test.point);
            line.bezierData = {
                startT: startT,
                endT: test.t
            };
            return line;
        }
        /**
         * @private
         */
        function getArcs(bc, b, accuracy, startT, endT, base) {
            var added = 0;
            var arc;
            while (startT < endT) {
                arc = getLargestArc(b, startT, endT, accuracy);
                //add an arc
                startT = arc.bezierData.endT;
                var len = MakerJs.measure.pathLength(arc);
                if (len < .0001) {
                    continue;
                }
                bc.paths[arc.type + '_' + (base + added)] = arc;
                added++;
            }
            return added;
        }
        /**
         * @private
         * Class for bezier seed.
         */
        var BezierSeed = /** @class */ (function () {
            function BezierSeed() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.type = MakerJs.pathType.BezierSeed;
                switch (args.length) {
                    case 1://point array
                        var points = args[0];
                        this.origin = points[0];
                        if (points.length === 3) {
                            this.controls = [points[1]];
                            this.end = points[2];
                        }
                        else if (points.length === 4) {
                            this.controls = [points[1], points[2]];
                            this.end = points[3];
                        }
                        else {
                            this.end = points[1];
                        }
                        break;
                    case 3://quadratic or cubic
                        if (Array.isArray(args[1])) {
                            this.controls = args[1];
                        }
                        else {
                            this.controls = [args[1]];
                        }
                        this.end = args[2];
                        break;
                    case 4://cubic params
                        this.controls = [args[1], args[2]];
                        this.end = args[3];
                        break;
                }
            }
            return BezierSeed;
        }());
        var BezierCurve = /** @class */ (function () {
            function BezierCurve() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.type = BezierCurve.typeName;
                var isArrayArg0 = Array.isArray(args[0]);
                switch (args.length) {
                    case 2:
                        if (isArrayArg0) {
                            this.accuracy = args[1];
                        }
                        else {
                            //seed
                            this.seed = args[0];
                            this.accuracy = args[1];
                            break;
                        }
                    //fall through to point array
                    case 1://point array or seed
                        if (isArrayArg0) {
                            var points = args[0];
                            this.seed = new BezierSeed(points);
                        }
                        else {
                            this.seed = args[0];
                        }
                        break;
                    default:
                        switch (args.length) {
                            case 4:
                                if (MakerJs.isPoint(args[3])) {
                                    this.seed = new BezierSeed(args);
                                    break;
                                }
                                else {
                                    this.accuracy = args[3];
                                    //fall through
                                }
                            case 3:
                                if (isArrayArg0) {
                                    this.seed = new BezierSeed(args.slice(0, 3));
                                }
                                break;
                            case 5:
                                this.accuracy = args[4];
                                this.seed = new BezierSeed(args.slice(0, 4));
                                break;
                        }
                        break;
                }
                this.paths = {};
                if (MakerJs.measure.isBezierSeedLinear(this.seed)) {
                    //use a line and exit
                    var line = new MakerJs.paths.Line(MakerJs.point.clone(this.seed.origin), MakerJs.point.clone(this.seed.end));
                    line.bezierData = {
                        startT: 0,
                        endT: 1
                    };
                    this.paths = {
                        "0": line
                    };
                    return;
                }
                var b = seedToBezier(this.seed);
                var extrema = getExtrema(b);
                this.paths = {};
                //use arcs
                if (!this.accuracy) {
                    //get a default accuracy relative to the size of the bezier
                    var len = b.length();
                    //set the default to be a combination of fast rendering and good smoothing.
                    this.accuracy = len / 100;
                }
                var count = 0;
                for (var i = 1; i < extrema.length; i++) {
                    var extremaSpan = extrema[i] - extrema[i - 1];
                    count += getArcs(this, b, this.accuracy * extremaSpan, extrema[i - 1], extrema[i], count);
                }
            }
            BezierCurve.getBezierSeeds = function (curve, options) {
                if (options === void 0) { options = {}; }
                options.shallow = true;
                var seedsByLayer = {};
                function getActualBezierRange(arc, endpoints, offset) {
                    var b = getScratch(curve.seed);
                    var tPoints = [arc.bezierData.startT, arc.bezierData.endT].map(function (t) { return new TPoint(b, t, offset); });
                    var ends = endpoints.slice();
                    //clipped arcs will still have endpoints closer to the original endpoints
                    var endpointDistancetoStart = ends.map(function (e) { return MakerJs.measure.pointDistance(e, tPoints[0].point); });
                    if (endpointDistancetoStart[0] > endpointDistancetoStart[1])
                        ends.reverse();
                    for (var i = 2; i--;) {
                        if (!MakerJs.measure.isPointEqual(ends[i], tPoints[i].point)) {
                            return null;
                        }
                    }
                    return arc.bezierData;
                }
                MakerJs.model.findChains(curve, function (chains, loose, layer) {
                    function addToLayer(pathToAdd, clone) {
                        if (clone === void 0) { clone = false; }
                        if (!seedsByLayer[layer]) {
                            seedsByLayer[layer] = [];
                        }
                        seedsByLayer[layer].push(clone ? MakerJs.path.clone(pathToAdd) : pathToAdd);
                    }
                    function getChainBezierRange(c) {
                        var endLinks = [c.links[0], c.links[c.links.length - 1]];
                        if (endLinks[0].walkedPath.pathContext.bezierData.startT > endLinks[1].walkedPath.pathContext.bezierData.startT) {
                            MakerJs.chain.reverse(c);
                            endLinks.reverse();
                        }
                        var actualBezierRanges = endLinks.map(function (endLink) { return getActualBezierRange(endLink.walkedPath.pathContext, endLink.endPoints, endLink.walkedPath.offset); });
                        var result = {
                            startT: actualBezierRanges[0] ? actualBezierRanges[0].startT : null,
                            endT: actualBezierRanges[1] ? actualBezierRanges[1].endT : null
                        };
                        if (result.startT !== null && result.endT !== null) {
                            return result;
                        }
                        else if (c.links.length > 2) {
                            if (result.startT === null) {
                                //exclude the first from the chain
                                addToLayer(c.links[0].walkedPath.pathContext, true);
                                result.startT = c.links[1].walkedPath.pathContext.bezierData.startT;
                            }
                            if (result.endT === null) {
                                //exclude the last from the chain
                                addToLayer(c.links[c.links.length - 1].walkedPath.pathContext, true);
                                result.endT = c.links[c.links.length - 2].walkedPath.pathContext.bezierData.endT;
                            }
                            return result;
                        }
                        return null;
                    }
                    chains.forEach(function (c) {
                        var range = getChainBezierRange(c);
                        if (range) {
                            var b = getScratch(curve.seed);
                            var piece = b.split(range.startT, range.endT);
                            addToLayer(BezierToSeed(piece));
                        }
                        else {
                            c.links.forEach(function (link) { return addToLayer(link.walkedPath.pathContext, true); });
                        }
                    });
                    loose.forEach(function (wp) {
                        if (wp.pathContext.type === MakerJs.pathType.Line) {
                            //bezier is linear
                            return addToLayer(wp.pathContext, true);
                        }
                        var range = getActualBezierRange(wp.pathContext, MakerJs.point.fromPathEnds(wp.pathContext), wp.offset);
                        if (range) {
                            var b = getScratch(curve.seed);
                            var piece = b.split(range.startT, range.endT);
                            addToLayer(BezierToSeed(piece));
                        }
                        else {
                            addToLayer(wp.pathContext, true);
                        }
                    });
                }, options);
                if (options.byLayers) {
                    return seedsByLayer;
                }
                else {
                    return seedsByLayer[''];
                }
            };
            BezierCurve.computeLength = function (seed) {
                var b = seedToBezier(seed);
                return b.length();
            };
            BezierCurve.computePoint = function (seed, t) {
                var s = getScratch(seed);
                var computedPoint = s.compute(t);
                return getIPoint(computedPoint);
            };
            BezierCurve.typeName = 'BezierCurve';
            return BezierCurve;
        }());
        models.BezierCurve = BezierCurve;
        BezierCurve.metaParameters = [
            {
                title: "points", type: "select", value: [
                    [[100, 0], [-80, -60], [100, 220], [100, 60]],
                    [[0, 0], [100, 0], [100, 100]],
                    [[0, 0], [20, 0], [80, 100], [100, 100]]
                ]
            }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        /**
         * @private
         * Our maximum circular arc span for accurate representation by a cubic curve.
         */
        var maxBezierArcspan = 45;
        /**
         * @private
         */
        function controlYForCircularCubic(arcSpanInRadians) {
            //from http://pomax.github.io/bezierinfo/#circles_cubic
            return 4 * (Math.tan(arcSpanInRadians / 4) / 3);
        }
        /**
         * @private
         */
        function controlPointsForCircularCubic(arc) {
            var arcSpan = MakerJs.angle.ofArcSpan(arc);
            //compute y for radius of 1
            var y = controlYForCircularCubic(MakerJs.angle.toRadians(arcSpan));
            //multiply by radius
            var c1 = [arc.radius, arc.radius * y];
            //get second control point by mirroring, then rotating
            var c2 = MakerJs.point.rotate(MakerJs.point.mirror(c1, false, true), arcSpan, [0, 0]);
            //rotate again to start angle, then offset by arc's origin
            return [c1, c2].map(function (p) { return MakerJs.point.add(arc.origin, MakerJs.point.rotate(p, arc.startAngle, [0, 0])); });
        }
        /**
         * @private
         */
        function bezierSeedFromArc(arc) {
            var span = MakerJs.angle.ofArcSpan(arc);
            if (span <= 90) {
                var endPoints = MakerJs.point.fromPathEnds(arc);
                var controls = controlPointsForCircularCubic(arc);
                return {
                    type: MakerJs.pathType.BezierSeed,
                    origin: endPoints[0],
                    controls: controls,
                    end: endPoints[1]
                };
            }
            return null;
        }
        var Ellipse = /** @class */ (function () {
            function Ellipse() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = this;
                this.models = {};
                var n = 360 / maxBezierArcspan;
                var accuracy;
                var isPointArgs0 = MakerJs.isPoint(args[0]);
                var realArgs = function (numArgs) {
                    switch (numArgs) {
                        case 2:
                            if (isPointArgs0) {
                                //origin, radius
                                _this.origin = args[0];
                            }
                            break;
                        case 3:
                            //origin, rx, ry
                            _this.origin = args[0];
                            break;
                        case 4:
                            //cx, cy, rx, ry
                            _this.origin = [args[0], args[1]];
                            break;
                    }
                    //construct a bezier approximation for an arc with radius of 1.
                    var a = 360 / n;
                    var arc = new MakerJs.paths.Arc([0, 0], 1, 0, a);
                    //clone and rotate to complete a circle
                    for (var i = 0; i < n; i++) {
                        var seed = bezierSeedFromArc(arc);
                        switch (numArgs) {
                            case 1:
                                //radius
                                seed = MakerJs.path.scale(seed, args[0]);
                                break;
                            case 2:
                                if (isPointArgs0) {
                                    //origin, radius
                                    seed = MakerJs.path.scale(seed, args[1]);
                                }
                                else {
                                    //rx, ry
                                    seed = MakerJs.path.distort(seed, args[0], args[1]);
                                }
                                break;
                            case 3:
                                //origin, rx, ry
                                seed = MakerJs.path.distort(seed, args[1], args[2]);
                                break;
                            case 4:
                                //cx, cy, rx, ry
                                seed = MakerJs.path.distort(seed, args[2], args[3]);
                                break;
                        }
                        _this.models['Curve_' + (1 + i)] = new models.BezierCurve(seed, accuracy);
                        arc.startAngle += a;
                        arc.endAngle += a;
                    }
                };
                switch (args.length) {
                    case 2:
                        realArgs(2);
                        break;
                    case 3:
                        if (isPointArgs0) {
                            realArgs(3);
                        }
                        else {
                            accuracy = args[2];
                            realArgs(2);
                        }
                        break;
                    case 4:
                        if (isPointArgs0) {
                            accuracy = args[3];
                            realArgs(3);
                        }
                        else {
                            realArgs(4);
                        }
                        break;
                    case 5:
                        accuracy = args[4];
                        realArgs(4);
                        break;
                }
            }
            return Ellipse;
        }());
        models.Ellipse = Ellipse;
        Ellipse.metaParameters = [
            { title: "radiusX", type: "range", min: 1, max: 50, value: 50 },
            { title: "radiusY", type: "range", min: 1, max: 50, value: 25 }
        ];
        var EllipticArc = /** @class */ (function () {
            function EllipticArc() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.models = {};
                var arc;
                var accuracy;
                var distortX;
                var distortY;
                if (MakerJs.isPathArc(args[0])) {
                    arc = args[0];
                    distortX = args[1];
                    distortY = args[2];
                    accuracy = args[3];
                }
                else {
                    arc = new MakerJs.paths.Arc([0, 0], 1, args[0], args[1]);
                    distortX = args[2];
                    distortY = args[3];
                    accuracy = args[4];
                }
                var span = MakerJs.angle.ofArcSpan(arc);
                //split into equal chunks, no larger than max chunk size
                var count = Math.ceil(span / maxBezierArcspan);
                var subSpan = span / count;
                var subArc = MakerJs.path.clone(arc);
                for (var i = 0; i < count; i++) {
                    subArc.startAngle = arc.startAngle + (i * subSpan);
                    subArc.endAngle = subArc.startAngle + subSpan;
                    var seed = bezierSeedFromArc(subArc);
                    seed = MakerJs.path.distort(seed, distortX, distortY);
                    this.models['Curve_' + (1 + i)] = new models.BezierCurve(seed, accuracy);
                }
            }
            return EllipticArc;
        }());
        models.EllipticArc = EllipticArc;
        EllipticArc.metaParameters = [
            { title: "startAngle", type: "range", min: 0, max: 90, value: 0 },
            { title: "endAngle", type: "range", min: 90, max: 360, value: 180 },
            { title: "radiusX", type: "range", min: 1, max: 50, value: 50 },
            { title: "radiusY", type: "range", min: 1, max: 50, value: 25 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        /**
         * @private
         */
        function getPoints(arg) {
            var coords;
            if (Array.isArray(arg)) {
                if (MakerJs.isPoint(arg[0])) {
                    return arg;
                }
                coords = arg;
            }
            else {
                coords = MakerJs.importer.parseNumericList(arg);
            }
            var points = [];
            for (var i = 0; i < coords.length; i += 2) {
                points.push([coords[i], coords[i + 1]]);
            }
            return points;
        }
        var ConnectTheDots = /** @class */ (function () {
            function ConnectTheDots() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = this;
                this.paths = {};
                var isClosed;
                var points;
                switch (args.length) {
                    case 1:
                        isClosed = true;
                        points = getPoints(args[0]);
                        break;
                    case 2:
                        isClosed = args[0];
                        points = getPoints(args[1]);
                        break;
                }
                var connect = function (a, b, skipZeroDistance) {
                    if (skipZeroDistance === void 0) { skipZeroDistance = false; }
                    if (skipZeroDistance && MakerJs.measure.pointDistance(points[a], points[b]) == 0)
                        return;
                    _this.paths["ShapeLine" + i] = new MakerJs.paths.Line(points[a], points[b]);
                };
                for (var i = 1; i < points.length; i++) {
                    connect(i - 1, i);
                }
                if (isClosed && points.length > 2) {
                    connect(points.length - 1, 0, true);
                }
            }
            return ConnectTheDots;
        }());
        models.ConnectTheDots = ConnectTheDots;
        ConnectTheDots.metaParameters = [
            { title: "closed", type: "bool", value: true },
            {
                title: "points", type: "select", value: [
                    [[0, 0], [40, 40], [60, 20], [100, 100], [60, 60], [40, 80]],
                    [[0, 0], [100, 0], [50, 87]],
                    [-10, 0, 10, 0, 0, 20],
                    '-10 0 10 0 0 20',
                ]
            }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Polygon = /** @class */ (function () {
            function Polygon(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed) {
                this.paths = {};
                this.paths = new models.ConnectTheDots(true, Polygon.getPoints(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed)).paths;
            }
            Polygon.circumscribedRadius = function (radius, angleInRadians) {
                return radius / Math.cos(angleInRadians / 2);
            };
            Polygon.getPoints = function (numberOfSides, radius, firstCornerAngleInDegrees, circumscribed) {
                if (firstCornerAngleInDegrees === void 0) { firstCornerAngleInDegrees = 0; }
                if (circumscribed === void 0) { circumscribed = false; }
                var points = [];
                var a1 = MakerJs.angle.toRadians(firstCornerAngleInDegrees);
                var a = 2 * Math.PI / numberOfSides;
                if (circumscribed) {
                    radius = Polygon.circumscribedRadius(radius, a);
                }
                for (var i = 0; i < numberOfSides; i++) {
                    points.push(MakerJs.point.fromPolar(a * i + a1, radius));
                }
                return points;
            };
            return Polygon;
        }());
        models.Polygon = Polygon;
        Polygon.metaParameters = [
            { title: "number of sides", type: "range", min: 3, max: 24, value: 6 },
            { title: "radius", type: "range", min: 1, max: 100, value: 50 },
            { title: "offset angle", type: "range", min: 0, max: 180, value: 0 },
            { title: "radius on flats (vs radius on vertexes)", type: "bool", value: false }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Holes = /** @class */ (function () {
            /**
             * Create an array of circles of the same radius from an array of center points.
             *
             * Example:
             * ```
             * //Create some holes from an array of points
             * var makerjs = require('makerjs');
             * var model = new makerjs.models.Holes(10, [[0, 0],[50, 0],[25, 40]]);
             * var svg = makerjs.exporter.toSVG(model);
             * document.write(svg);
             * ```
             *
             * @param holeRadius Hole radius.
             * @param points Array of points for origin of each hole.
             * @param ids Optional array of corresponding path ids for the holes.
             */
            function Holes(holeRadius, points, ids) {
                this.paths = {};
                for (var i = 0; i < points.length; i++) {
                    var id = ids ? ids[i] : i.toString();
                    this.paths[id] = new MakerJs.paths.Circle(points[i], holeRadius);
                }
            }
            return Holes;
        }());
        models.Holes = Holes;
        Holes.metaParameters = [
            { title: "holeRadius", type: "range", min: .1, max: 10, step: .1, value: 1 },
            {
                title: "points", type: "select", value: [
                    [[0, 0], [10, 10], [20, 20], [30, 30], [40, 40], [50, 50], [60, 60], [70, 70], [80, 80]],
                    [[0, 0], [0, 25], [0, 50], [0, 75], [0, 100], [25, 50], [50, 50], [75, 50], [100, 100], [100, 75], [100, 50], [100, 25], [100, 0]]
                ]
            }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var BoltCircle = /** @class */ (function () {
            function BoltCircle(boltRadius, holeRadius, boltCount, firstBoltAngleInDegrees) {
                if (firstBoltAngleInDegrees === void 0) { firstBoltAngleInDegrees = 0; }
                this.paths = {};
                var points = models.Polygon.getPoints(boltCount, boltRadius, firstBoltAngleInDegrees);
                var ids = points.map(function (p, i) { return "bolt " + i; });
                this.paths = new models.Holes(holeRadius, points, ids).paths;
            }
            return BoltCircle;
        }());
        models.BoltCircle = BoltCircle;
        BoltCircle.metaParameters = [
            { title: "bolt circle radius", type: "range", min: 1, max: 100, value: 50 },
            { title: "hole radius", type: "range", min: 1, max: 50, value: 5 },
            { title: "bolt count", type: "range", min: 3, max: 24, value: 12 },
            { title: "offset angle", type: "range", min: 0, max: 180, value: 0 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var BoltRectangle = /** @class */ (function () {
            function BoltRectangle(width, height, holeRadius) {
                this.paths = {};
                var points = [[0, 0], [width, 0], [width, height], [0, height]];
                var ids = ["BottomLeft_bolt", "BottomRight_bolt", "TopRight_bolt", "TopLeft_bolt"];
                this.paths = new models.Holes(holeRadius, points, ids).paths;
            }
            return BoltRectangle;
        }());
        models.BoltRectangle = BoltRectangle;
        BoltRectangle.metaParameters = [
            { title: "width", type: "range", min: 1, max: 100, value: 100 },
            { title: "height", type: "range", min: 1, max: 100, value: 50 },
            { title: "hole radius", type: "range", min: 1, max: 50, value: 5 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Dogbone = /** @class */ (function () {
            /**
             * Create a dogbone from width, height, corner radius, style, and bottomless flag.
             *
             * Example:
             * ```
             * var d = new makerjs.models.Dogbone(50, 100, 5);
             * ```
             *
             * @param width Width of the rectangle.
             * @param height Height of the rectangle.
             * @param radius Corner radius.
             * @param style Optional corner style: 0 (default) for dogbone, 1 for vertical, -1 for horizontal.
             * @param bottomless Optional flag to omit the bottom line and bottom corners (default false).
             */
            function Dogbone(width, height, radius, style, bottomless) {
                if (style === void 0) { style = 0; }
                if (bottomless === void 0) { bottomless = false; }
                this.paths = {};
                var maxSide = Math.min(height, width) / 2;
                var maxRadius;
                switch (style) {
                    case -1: //horizontal
                    case 1://vertical
                        maxRadius = maxSide / 2;
                        break;
                    case 0: //equal
                    default:
                        maxRadius = maxSide * Math.SQRT2 / 2;
                        break;
                }
                radius = Math.min(radius, maxRadius);
                var ax;
                var ay;
                var lx;
                var ly;
                var apexes;
                switch (style) {
                    case -1:
                        ax = 0;
                        ay = radius;
                        lx = 0;
                        ly = radius * 2;
                        apexes = [180, 0, 0, 180];
                        break;
                    case 1:
                        ax = radius;
                        ay = 0;
                        lx = radius * 2;
                        ly = 0;
                        apexes = [270, 270, 90, 90];
                        break;
                    case 0:
                    default:
                        ax = ay = radius / Math.SQRT2;
                        lx = ly = ax * 2;
                        apexes = [225, 315, 45, 135];
                        break;
                }
                if (bottomless) {
                    this.paths['Left'] = new MakerJs.paths.Line([0, 0], [0, height - ly]);
                    this.paths['Right'] = new MakerJs.paths.Line([width, 0], [width, height - ly]);
                }
                else {
                    this.paths['Left'] = new MakerJs.paths.Line([0, ly], [0, height - ly]);
                    this.paths['Right'] = new MakerJs.paths.Line([width, ly], [width, height - ly]);
                    this.paths['Bottom'] = new MakerJs.paths.Line([lx, 0], [width - lx, 0]);
                    this.paths["BottomLeft"] = new MakerJs.paths.Arc([ax, ay], radius, apexes[0] - 90, apexes[0] + 90);
                    this.paths["BottomRight"] = new MakerJs.paths.Arc([width - ax, ay], radius, apexes[1] - 90, apexes[1] + 90);
                }
                this.paths["TopRight"] = new MakerJs.paths.Arc([width - ax, height - ay], radius, apexes[2] - 90, apexes[2] + 90);
                this.paths["TopLeft"] = new MakerJs.paths.Arc([ax, height - ay], radius, apexes[3] - 90, apexes[3] + 90);
                this.paths['Top'] = new MakerJs.paths.Line([lx, height], [width - lx, height]);
            }
            return Dogbone;
        }());
        models.Dogbone = Dogbone;
        Dogbone.metaParameters = [
            { title: "width", type: "range", min: 1, max: 100, value: 50 },
            { title: "height", type: "range", min: 1, max: 100, value: 100 },
            { title: "radius", type: "range", min: 0, max: 50, value: 5 },
            { title: "style", type: "select", value: [0, 1, -1] },
            { title: "bottomless", type: "bool", value: false }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Dome = /** @class */ (function () {
            function Dome(width, height, radius, bottomless) {
                this.paths = {};
                var w2 = width / 2;
                if (radius < 0)
                    radius = 0;
                if (radius === void 0)
                    radius = w2;
                radius = Math.min(radius, w2);
                radius = Math.min(radius, height);
                var wt = Math.max(w2 - radius, 0);
                var hr = Math.max(height - radius, 0);
                if (!bottomless) {
                    this.paths["Bottom"] = new MakerJs.paths.Line([-w2, 0], [w2, 0]);
                }
                if (hr) {
                    this.paths["Left"] = new MakerJs.paths.Line([-w2, 0], [-w2, hr]);
                    this.paths["Right"] = new MakerJs.paths.Line([w2, 0], [w2, hr]);
                }
                if (radius > 0) {
                    this.paths["TopLeft"] = new MakerJs.paths.Arc([-wt, hr], radius, 90, 180);
                    this.paths["TopRight"] = new MakerJs.paths.Arc([wt, hr], radius, 0, 90);
                }
                if (wt) {
                    this.paths["Top"] = new MakerJs.paths.Line([-wt, height], [wt, height]);
                }
            }
            return Dome;
        }());
        models.Dome = Dome;
        Dome.metaParameters = [
            { title: "width", type: "range", min: 1, max: 100, value: 50 },
            { title: "height", type: "range", min: 1, max: 100, value: 100 },
            { title: "radius", type: "range", min: 0, max: 50, value: 25 },
            { title: "bottomless", type: "bool", value: false }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var RoundRectangle = /** @class */ (function () {
            function RoundRectangle() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.paths = {};
                var width;
                var height;
                var radius = 0;
                switch (args.length) {
                    case 3:
                        width = args[0];
                        height = args[1];
                        radius = args[2];
                        break;
                    case 2:
                        radius = args[1];
                    //fall through to 1
                    case 1:
                        var m = MakerJs.measure.modelExtents(args[0]);
                        this.origin = MakerJs.point.subtract(m.low, [radius, radius]);
                        width = m.high[0] - m.low[0] + 2 * radius;
                        height = m.high[1] - m.low[1] + 2 * radius;
                        break;
                }
                var maxRadius = Math.min(height, width) / 2;
                radius = Math.min(radius, maxRadius);
                var wr = width - radius;
                var hr = height - radius;
                if (radius > 0) {
                    this.paths["BottomLeft"] = new MakerJs.paths.Arc([radius, radius], radius, 180, 270);
                    this.paths["BottomRight"] = new MakerJs.paths.Arc([wr, radius], radius, 270, 0);
                    this.paths["TopRight"] = new MakerJs.paths.Arc([wr, hr], radius, 0, 90);
                    this.paths["TopLeft"] = new MakerJs.paths.Arc([radius, hr], radius, 90, 180);
                }
                if (wr - radius > 0) {
                    this.paths["Bottom"] = new MakerJs.paths.Line([radius, 0], [wr, 0]);
                    this.paths["Top"] = new MakerJs.paths.Line([wr, height], [radius, height]);
                }
                if (hr - radius > 0) {
                    this.paths["Right"] = new MakerJs.paths.Line([width, radius], [width, hr]);
                    this.paths["Left"] = new MakerJs.paths.Line([0, hr], [0, radius]);
                }
            }
            return RoundRectangle;
        }());
        models.RoundRectangle = RoundRectangle;
        RoundRectangle.metaParameters = [
            { title: "width", type: "range", min: 1, max: 100, value: 50 },
            { title: "height", type: "range", min: 1, max: 100, value: 100 },
            { title: "radius", type: "range", min: 0, max: 50, value: 11 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Oval = /** @class */ (function () {
            function Oval(width, height) {
                this.paths = {};
                this.paths = new models.RoundRectangle(width, height, Math.min(height / 2, width / 2)).paths;
            }
            return Oval;
        }());
        models.Oval = Oval;
        Oval.metaParameters = [
            { title: "width", type: "range", min: 1, max: 100, value: 50 },
            { title: "height", type: "range", min: 1, max: 100, value: 100 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var OvalArc = /** @class */ (function () {
            function OvalArc(startAngle, endAngle, sweepRadius, slotRadius, selfIntersect, isolateCaps) {
                if (selfIntersect === void 0) { selfIntersect = false; }
                if (isolateCaps === void 0) { isolateCaps = false; }
                var _this = this;
                this.paths = {};
                var capRoot;
                if (isolateCaps) {
                    capRoot = { models: {} };
                    this.models = { 'Caps': capRoot };
                }
                if (slotRadius <= 0 || sweepRadius <= 0)
                    return;
                startAngle = MakerJs.angle.noRevolutions(startAngle);
                endAngle = MakerJs.angle.noRevolutions(endAngle);
                if (MakerJs.round(startAngle - endAngle) == 0)
                    return;
                if (endAngle < startAngle)
                    endAngle += 360;
                var addCap = function (id, tiltAngle, offsetStartAngle, offsetEndAngle) {
                    var capModel;
                    if (isolateCaps) {
                        capModel = { paths: {} };
                        capRoot.models[id] = capModel;
                    }
                    else {
                        capModel = _this;
                    }
                    return capModel.paths[id] = new MakerJs.paths.Arc(MakerJs.point.fromPolar(MakerJs.angle.toRadians(tiltAngle), sweepRadius), slotRadius, tiltAngle + offsetStartAngle, tiltAngle + offsetEndAngle);
                };
                var addSweep = function (id, offsetRadius) {
                    return _this.paths[id] = new MakerJs.paths.Arc([0, 0], sweepRadius + offsetRadius, startAngle, endAngle);
                };
                addSweep("Outer", slotRadius);
                var hasInner = (sweepRadius - slotRadius) > 0;
                if (hasInner) {
                    addSweep("Inner", -slotRadius);
                }
                var caps = [];
                caps.push(addCap("StartCap", startAngle, 180, 0));
                caps.push(addCap("EndCap", endAngle, 0, 180));
                //the distance between the cap origins
                var d = MakerJs.measure.pointDistance(caps[0].origin, caps[1].origin);
                if ((d / 2) < slotRadius) {
                    //the caps intersect
                    var int = MakerJs.path.intersection(caps[0], caps[1]);
                    if (int) {
                        if (!hasInner || !selfIntersect) {
                            caps[0].startAngle = int.path1Angles[0];
                            caps[1].endAngle = int.path2Angles[0];
                        }
                        if (!selfIntersect && hasInner && int.intersectionPoints.length == 2) {
                            addCap("StartCap2", startAngle, 180, 0).endAngle = int.path1Angles[1];
                            addCap("EndCap2", endAngle, 0, 180).startAngle = int.path2Angles[1] + 360;
                        }
                    }
                }
            }
            return OvalArc;
        }());
        models.OvalArc = OvalArc;
        OvalArc.metaParameters = [
            { title: "start angle", type: "range", min: -360, max: 360, step: 1, value: 180 },
            { title: "end angle", type: "range", min: -360, max: 360, step: 1, value: 0 },
            { title: "sweep", type: "range", min: 0, max: 100, step: 1, value: 50 },
            { title: "radius", type: "range", min: 0, max: 100, step: 1, value: 15 },
            { title: "self intersect", type: "bool", value: false }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Rectangle = /** @class */ (function () {
            function Rectangle() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.paths = {};
                var width;
                var height;
                if (args.length === 2 && !MakerJs.isObject(args[0])) {
                    width = args[0];
                    height = args[1];
                }
                else {
                    var margin = 0;
                    var m;
                    if (MakerJs.isModel(args[0])) {
                        m = MakerJs.measure.modelExtents(args[0]);
                        if (args.length === 2) {
                            margin = args[1];
                        }
                    }
                    else {
                        //use measurement
                        m = args[0];
                    }
                    this.origin = MakerJs.point.subtract(m.low, [margin, margin]);
                    width = m.high[0] - m.low[0] + 2 * margin;
                    height = m.high[1] - m.low[1] + 2 * margin;
                }
                this.paths = new models.ConnectTheDots(true, [[0, 0], [width, 0], [width, height], [0, height]]).paths;
            }
            return Rectangle;
        }());
        models.Rectangle = Rectangle;
        Rectangle.metaParameters = [
            { title: "width", type: "range", min: 1, max: 100, value: 50 },
            { title: "height", type: "range", min: 1, max: 100, value: 100 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Ring = /** @class */ (function () {
            function Ring(outerRadius, innerRadius) {
                this.paths = {};
                var radii = {
                    "Ring_outer": outerRadius,
                    "Ring_inner": innerRadius
                };
                for (var id in radii) {
                    if (radii[id] === void 0)
                        continue;
                    this.paths[id] = new MakerJs.paths.Circle(MakerJs.point.zero(), radii[id]);
                }
            }
            return Ring;
        }());
        models.Ring = Ring;
        Ring.metaParameters = [
            { title: "outer radius", type: "range", min: 0, max: 100, step: 1, value: 50 },
            { title: "inner radius", type: "range", min: 0, max: 100, step: 1, value: 20 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Belt = /** @class */ (function () {
            function Belt(leftRadius, distance, rightRadius) {
                this.paths = {};
                var left = new MakerJs.paths.Arc([0, 0], leftRadius, 0, 360);
                var right = new MakerJs.paths.Arc([distance, 0], rightRadius, 0, 360);
                var angles = MakerJs.solvers.circleTangentAngles(left, right);
                if (!angles) {
                    this.paths["Belt"] = new MakerJs.paths.Circle(Math.max(leftRadius, rightRadius));
                }
                else {
                    angles = angles.sort(function (a, b) { return a - b; });
                    left.startAngle = angles[0];
                    left.endAngle = angles[1];
                    right.startAngle = angles[1];
                    right.endAngle = angles[0];
                    this.paths["Left"] = left;
                    this.paths["Right"] = right;
                    this.paths["Top"] = new MakerJs.paths.Line(MakerJs.point.fromAngleOnCircle(angles[0], left), MakerJs.point.fromAngleOnCircle(angles[0], right));
                    this.paths["Bottom"] = new MakerJs.paths.Line(MakerJs.point.fromAngleOnCircle(angles[1], left), MakerJs.point.fromAngleOnCircle(angles[1], right));
                }
            }
            return Belt;
        }());
        models.Belt = Belt;
        Belt.metaParameters = [
            { title: "left radius", type: "range", min: 0, max: 100, value: 30 },
            { title: "distance between centers", type: "range", min: 0, max: 100, value: 50 },
            { title: "right radius", type: "range", min: 0, max: 100, value: 15 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var SCurve = /** @class */ (function () {
            function SCurve(width, height) {
                this.paths = {};
                function findRadius(x, y) {
                    return x + (y * y - x * x) / (2 * x);
                }
                var h2 = height / 2;
                var w2 = width / 2;
                var radius;
                var startAngle;
                var endAngle;
                var arcOrigin;
                if (width > height) {
                    radius = findRadius(h2, w2);
                    startAngle = 270;
                    endAngle = 360 - MakerJs.angle.toDegrees(Math.acos(w2 / radius));
                    arcOrigin = [0, radius];
                }
                else {
                    radius = findRadius(w2, h2);
                    startAngle = 180 - MakerJs.angle.toDegrees(Math.asin(h2 / radius));
                    endAngle = 180;
                    arcOrigin = [radius, 0];
                }
                var curve = new MakerJs.paths.Arc(arcOrigin, radius, startAngle, endAngle);
                this.paths['curve_start'] = curve;
                this.paths['curve_end'] = MakerJs.path.moveRelative(MakerJs.path.mirror(curve, true, true), [width, height]);
            }
            return SCurve;
        }());
        models.SCurve = SCurve;
        SCurve.metaParameters = [
            { title: "width", type: "range", min: 1, max: 100, value: 50 },
            { title: "height", type: "range", min: 1, max: 100, value: 100 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Slot = /** @class */ (function () {
            function Slot(origin, endPoint, radius, isolateCaps) {
                if (isolateCaps === void 0) { isolateCaps = false; }
                var _this = this;
                this.paths = {};
                var capRoot;
                if (isolateCaps) {
                    capRoot = { models: {} };
                    this.models = { 'Caps': capRoot };
                }
                var addCap = function (id, capPath) {
                    var capModel;
                    if (isolateCaps) {
                        capModel = { paths: {} };
                        capRoot.models[id] = capModel;
                    }
                    else {
                        capModel = _this;
                    }
                    capModel.paths[id] = capPath;
                };
                var a = MakerJs.angle.ofPointInDegrees(origin, endPoint);
                var len = MakerJs.measure.pointDistance(origin, endPoint);
                this.paths['Top'] = new MakerJs.paths.Line([0, radius], [len, radius]);
                this.paths['Bottom'] = new MakerJs.paths.Line([0, -radius], [len, -radius]);
                addCap('StartCap', new MakerJs.paths.Arc([0, 0], radius, 90, 270));
                addCap('EndCap', new MakerJs.paths.Arc([len, 0], radius, 270, 90));
                MakerJs.model.rotate(this, a, [0, 0]);
                this.origin = origin;
            }
            return Slot;
        }());
        models.Slot = Slot;
        Slot.metaParameters = [
            {
                title: "origin", type: "select", value: [
                    [0, 0],
                    [10, 0],
                    [10, 10]
                ]
            },
            {
                title: "end", type: "select", value: [
                    [80, 0],
                    [0, 30],
                    [10, 30]
                ]
            },
            { title: "radius", type: "range", min: 1, max: 50, value: 10 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Square = /** @class */ (function () {
            function Square(side) {
                this.paths = {};
                this.paths = new models.Rectangle(side, side).paths;
            }
            return Square;
        }());
        models.Square = Square;
        Square.metaParameters = [
            { title: "side", type: "range", min: 1, max: 100, value: 100 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Star = /** @class */ (function () {
            function Star(numberOfPoints, outerRadius, innerRadius, skipPoints) {
                if (skipPoints === void 0) { skipPoints = 2; }
                this.paths = {};
                if (!innerRadius) {
                    innerRadius = outerRadius * Star.InnerRadiusRatio(numberOfPoints, skipPoints);
                }
                var outerPoints = models.Polygon.getPoints(numberOfPoints, outerRadius);
                var innerPoints = models.Polygon.getPoints(numberOfPoints, innerRadius, 180 / numberOfPoints);
                var allPoints = [];
                for (var i = 0; i < numberOfPoints; i++) {
                    allPoints.push(outerPoints[i]);
                    allPoints.push(innerPoints[i]);
                }
                var model = new models.ConnectTheDots(true, allPoints);
                this.paths = model.paths;
                delete model.paths;
            }
            Star.InnerRadiusRatio = function (numberOfPoints, skipPoints) {
                //formula from http://www.jdawiseman.com/papers/easymath/surds_star_inner_radius.html
                //Cos(Pi()*m/n) / Cos(Pi()*(m-1)/n)
                if (numberOfPoints > 0 && skipPoints > 1 && skipPoints < numberOfPoints / 2) {
                    return Math.cos(Math.PI * skipPoints / numberOfPoints) / Math.cos(Math.PI * (skipPoints - 1) / numberOfPoints);
                }
                return 0;
            };
            return Star;
        }());
        models.Star = Star;
        Star.metaParameters = [
            { title: "number of sides", type: "range", min: 3, max: 24, value: 8 },
            { title: "outer radius", type: "range", min: 1, max: 100, value: 50 },
            { title: "inner radius", type: "range", min: 0, max: 100, value: 15 },
            { title: "skip points (when inner radius is zero)", type: "range", min: 0, max: 12, value: 2 }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
var MakerJs;
(function (MakerJs) {
    var models;
    (function (models) {
        var Text = /** @class */ (function () {
            function Text(font, text, fontSize, combine, centerCharacterOrigin, bezierAccuracy, opentypeOptions) {
                if (combine === void 0) { combine = false; }
                if (centerCharacterOrigin === void 0) { centerCharacterOrigin = false; }
                var _this = this;
                this.models = {};
                var charIndex = 0;
                var prevDeleted;
                var prevChar;
                var cb = function (glyph, x, y, _fontSize, options) {
                    var charModel = {};
                    var firstPoint;
                    var currPoint;
                    var pathCount = 0;
                    function addPath(p) {
                        if (!charModel.paths) {
                            charModel.paths = {};
                        }
                        charModel.paths['p_' + ++pathCount] = p;
                    }
                    function addModel(m) {
                        if (!charModel.models) {
                            charModel.models = {};
                        }
                        charModel.models['p_' + ++pathCount] = m;
                    }
                    var p = glyph.getPath(0, 0, _fontSize);
                    p.commands.map(function (command, i) {
                        var points = [[command.x, command.y], [command.x1, command.y1], [command.x2, command.y2]].map(function (p) {
                            if (p[0] !== void 0) {
                                return MakerJs.point.mirror(p, false, true);
                            }
                        });
                        switch (command.type) {
                            case 'M':
                                firstPoint = points[0];
                                break;
                            case 'Z':
                                points[0] = firstPoint;
                            //fall through to line
                            case 'L':
                                if (!MakerJs.measure.isPointEqual(currPoint, points[0])) {
                                    addPath(new MakerJs.paths.Line(currPoint, points[0]));
                                }
                                break;
                            case 'C':
                                addModel(new models.BezierCurve(currPoint, points[1], points[2], points[0], bezierAccuracy));
                                break;
                            case 'Q':
                                addModel(new models.BezierCurve(currPoint, points[1], points[0], bezierAccuracy));
                                break;
                        }
                        currPoint = points[0];
                    });
                    charModel.origin = [x, 0];
                    if (centerCharacterOrigin && (charModel.paths || charModel.models)) {
                        var m = MakerJs.measure.modelExtents(charModel);
                        if (m) {
                            var w = m.high[0] - m.low[0];
                            MakerJs.model.originate(charModel, [m.low[0] + w / 2, 0]);
                        }
                    }
                    if (combine && charIndex > 0) {
                        var combineOptions = {};
                        var prev;
                        if (prevDeleted) {
                            //form a temporary complete geometry of the previous character using the previously deleted segments
                            prev = {
                                models: {
                                    deleted: prevDeleted,
                                    char: prevChar
                                }
                            };
                        }
                        else {
                            prev = prevChar;
                        }
                        MakerJs.model.combine(prev, charModel, false, true, false, true, combineOptions);
                        //save the deleted segments from this character for the next iteration
                        prevDeleted = combineOptions.out_deleted[1];
                    }
                    _this.models[charIndex] = charModel;
                    charIndex++;
                    prevChar = charModel;
                };
                font.forEachGlyph(text, 0, 0, fontSize, opentypeOptions, cb);
            }
            return Text;
        }());
        models.Text = Text;
        Text.metaParameters = [
            { title: "font", type: "font", value: '*' },
            { title: "text", type: "text", value: 'Hello' },
            { title: "font size", type: "range", min: 10, max: 200, value: 72 },
            { title: "combine", type: "bool", value: false },
            { title: "center character origin", type: "bool", value: false }
        ];
    })(models = MakerJs.models || (MakerJs.models = {}));
})(MakerJs || (MakerJs = {}));
MakerJs.version = "0.9.93";
﻿var Bezier = require('bezier-js');

},{"bezier-js":3,"clone":10,"graham_scan":11}],15:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],16:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":15,"timers":16}]},{},[1]);
