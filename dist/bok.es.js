import { jsxs as pt, Fragment as Lt, jsx as et } from "react/jsx-runtime";
import * as wt from "react";
import Ht, { useState as ft, useRef as yt, useCallback as Tt, useEffect as ut, useMemo as Gt } from "react";
import Ut, { createGlobalStyle as $t } from "styled-components";
var At = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yt(Z) {
  return Z && Z.__esModule && Object.prototype.hasOwnProperty.call(Z, "default") ? Z.default : Z;
}
function Ot(Z) {
  throw new Error('Could not dynamically require "' + Z + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var jt = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(Z, K) {
  (function(p) {
    Z.exports = p();
  })(function() {
    return function p(A, v, a) {
      function o(g, y) {
        if (!v[g]) {
          if (!A[g]) {
            var _ = typeof Ot == "function" && Ot;
            if (!y && _) return _(g, !0);
            if (r) return r(g, !0);
            var b = new Error("Cannot find module '" + g + "'");
            throw b.code = "MODULE_NOT_FOUND", b;
          }
          var i = v[g] = { exports: {} };
          A[g][0].call(i.exports, function(d) {
            var n = A[g][1][d];
            return o(n || d);
          }, i, i.exports, p, A, v, a);
        }
        return v[g].exports;
      }
      for (var r = typeof Ot == "function" && Ot, l = 0; l < a.length; l++) o(a[l]);
      return o;
    }({ 1: [function(p, A, v) {
      var a = p("./utils"), o = p("./support"), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      v.encode = function(l) {
        for (var g, y, _, b, i, d, n, c = [], s = 0, m = l.length, w = m, x = a.getTypeOf(l) !== "string"; s < l.length; ) w = m - s, _ = x ? (g = l[s++], y = s < m ? l[s++] : 0, s < m ? l[s++] : 0) : (g = l.charCodeAt(s++), y = s < m ? l.charCodeAt(s++) : 0, s < m ? l.charCodeAt(s++) : 0), b = g >> 2, i = (3 & g) << 4 | y >> 4, d = 1 < w ? (15 & y) << 2 | _ >> 6 : 64, n = 2 < w ? 63 & _ : 64, c.push(r.charAt(b) + r.charAt(i) + r.charAt(d) + r.charAt(n));
        return c.join("");
      }, v.decode = function(l) {
        var g, y, _, b, i, d, n = 0, c = 0, s = "data:";
        if (l.substr(0, s.length) === s) throw new Error("Invalid base64 input, it looks like a data url.");
        var m, w = 3 * (l = l.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (l.charAt(l.length - 1) === r.charAt(64) && w--, l.charAt(l.length - 2) === r.charAt(64) && w--, w % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (m = o.uint8array ? new Uint8Array(0 | w) : new Array(0 | w); n < l.length; ) g = r.indexOf(l.charAt(n++)) << 2 | (b = r.indexOf(l.charAt(n++))) >> 4, y = (15 & b) << 4 | (i = r.indexOf(l.charAt(n++))) >> 2, _ = (3 & i) << 6 | (d = r.indexOf(l.charAt(n++))), m[c++] = g, i !== 64 && (m[c++] = y), d !== 64 && (m[c++] = _);
        return m;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(p, A, v) {
      var a = p("./external"), o = p("./stream/DataWorker"), r = p("./stream/Crc32Probe"), l = p("./stream/DataLengthProbe");
      function g(y, _, b, i, d) {
        this.compressedSize = y, this.uncompressedSize = _, this.crc32 = b, this.compression = i, this.compressedContent = d;
      }
      g.prototype = { getContentWorker: function() {
        var y = new o(a.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l("data_length")), _ = this;
        return y.on("end", function() {
          if (this.streamInfo.data_length !== _.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), y;
      }, getCompressedWorker: function() {
        return new o(a.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, g.createWorkerFrom = function(y, _, b) {
        return y.pipe(new r()).pipe(new l("uncompressedSize")).pipe(_.compressWorker(b)).pipe(new l("compressedSize")).withStreamInfo("compression", _);
      }, A.exports = g;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(p, A, v) {
      var a = p("./stream/GenericWorker");
      v.STORE = { magic: "\0\0", compressWorker: function() {
        return new a("STORE compression");
      }, uncompressWorker: function() {
        return new a("STORE decompression");
      } }, v.DEFLATE = p("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(p, A, v) {
      var a = p("./utils"), o = function() {
        for (var r, l = [], g = 0; g < 256; g++) {
          r = g;
          for (var y = 0; y < 8; y++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
          l[g] = r;
        }
        return l;
      }();
      A.exports = function(r, l) {
        return r !== void 0 && r.length ? a.getTypeOf(r) !== "string" ? function(g, y, _, b) {
          var i = o, d = b + _;
          g ^= -1;
          for (var n = b; n < d; n++) g = g >>> 8 ^ i[255 & (g ^ y[n])];
          return -1 ^ g;
        }(0 | l, r, r.length, 0) : function(g, y, _, b) {
          var i = o, d = b + _;
          g ^= -1;
          for (var n = b; n < d; n++) g = g >>> 8 ^ i[255 & (g ^ y.charCodeAt(n))];
          return -1 ^ g;
        }(0 | l, r, r.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(p, A, v) {
      v.base64 = !1, v.binary = !1, v.dir = !1, v.createFolders = !0, v.date = null, v.compression = null, v.compressionOptions = null, v.comment = null, v.unixPermissions = null, v.dosPermissions = null;
    }, {}], 6: [function(p, A, v) {
      var a = null;
      a = typeof Promise < "u" ? Promise : p("lie"), A.exports = { Promise: a };
    }, { lie: 37 }], 7: [function(p, A, v) {
      var a = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", o = p("pako"), r = p("./utils"), l = p("./stream/GenericWorker"), g = a ? "uint8array" : "array";
      function y(_, b) {
        l.call(this, "FlateWorker/" + _), this._pako = null, this._pakoAction = _, this._pakoOptions = b, this.meta = {};
      }
      v.magic = "\b\0", r.inherits(y, l), y.prototype.processChunk = function(_) {
        this.meta = _.meta, this._pako === null && this._createPako(), this._pako.push(r.transformTo(g, _.data), !1);
      }, y.prototype.flush = function() {
        l.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, y.prototype.cleanUp = function() {
        l.prototype.cleanUp.call(this), this._pako = null;
      }, y.prototype._createPako = function() {
        this._pako = new o[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var _ = this;
        this._pako.onData = function(b) {
          _.push({ data: b, meta: _.meta });
        };
      }, v.compressWorker = function(_) {
        return new y("Deflate", _);
      }, v.uncompressWorker = function() {
        return new y("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(p, A, v) {
      function a(i, d) {
        var n, c = "";
        for (n = 0; n < d; n++) c += String.fromCharCode(255 & i), i >>>= 8;
        return c;
      }
      function o(i, d, n, c, s, m) {
        var w, x, S = i.file, F = i.compression, E = m !== g.utf8encode, D = r.transformTo("string", m(S.name)), C = r.transformTo("string", g.utf8encode(S.name)), z = S.comment, X = r.transformTo("string", m(z)), h = r.transformTo("string", g.utf8encode(z)), T = C.length !== S.name.length, e = h.length !== z.length, P = "", V = "", L = "", Q = S.dir, W = S.date, tt = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        d && !n || (tt.crc32 = i.crc32, tt.compressedSize = i.compressedSize, tt.uncompressedSize = i.uncompressedSize);
        var B = 0;
        d && (B |= 8), E || !T && !e || (B |= 2048);
        var I = 0, J = 0;
        Q && (I |= 16), s === "UNIX" ? (J = 798, I |= function(G, st) {
          var ht = G;
          return G || (ht = st ? 16893 : 33204), (65535 & ht) << 16;
        }(S.unixPermissions, Q)) : (J = 20, I |= function(G) {
          return 63 & (G || 0);
        }(S.dosPermissions)), w = W.getUTCHours(), w <<= 6, w |= W.getUTCMinutes(), w <<= 5, w |= W.getUTCSeconds() / 2, x = W.getUTCFullYear() - 1980, x <<= 4, x |= W.getUTCMonth() + 1, x <<= 5, x |= W.getUTCDate(), T && (V = a(1, 1) + a(y(D), 4) + C, P += "up" + a(V.length, 2) + V), e && (L = a(1, 1) + a(y(X), 4) + h, P += "uc" + a(L.length, 2) + L);
        var $ = "";
        return $ += `
\0`, $ += a(B, 2), $ += F.magic, $ += a(w, 2), $ += a(x, 2), $ += a(tt.crc32, 4), $ += a(tt.compressedSize, 4), $ += a(tt.uncompressedSize, 4), $ += a(D.length, 2), $ += a(P.length, 2), { fileRecord: _.LOCAL_FILE_HEADER + $ + D + P, dirRecord: _.CENTRAL_FILE_HEADER + a(J, 2) + $ + a(X.length, 2) + "\0\0\0\0" + a(I, 4) + a(c, 4) + D + P + X };
      }
      var r = p("../utils"), l = p("../stream/GenericWorker"), g = p("../utf8"), y = p("../crc32"), _ = p("../signature");
      function b(i, d, n, c) {
        l.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = d, this.zipPlatform = n, this.encodeFileName = c, this.streamFiles = i, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      r.inherits(b, l), b.prototype.push = function(i) {
        var d = i.meta.percent || 0, n = this.entriesCount, c = this._sources.length;
        this.accumulate ? this.contentBuffer.push(i) : (this.bytesWritten += i.data.length, l.prototype.push.call(this, { data: i.data, meta: { currentFile: this.currentFile, percent: n ? (d + 100 * (n - c - 1)) / n : 100 } }));
      }, b.prototype.openedSource = function(i) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = i.file.name;
        var d = this.streamFiles && !i.file.dir;
        if (d) {
          var n = o(i, d, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: n.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, b.prototype.closedSource = function(i) {
        this.accumulate = !1;
        var d = this.streamFiles && !i.file.dir, n = o(i, d, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(n.dirRecord), d) this.push({ data: function(c) {
          return _.DATA_DESCRIPTOR + a(c.crc32, 4) + a(c.compressedSize, 4) + a(c.uncompressedSize, 4);
        }(i), meta: { percent: 100 } });
        else for (this.push({ data: n.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, b.prototype.flush = function() {
        for (var i = this.bytesWritten, d = 0; d < this.dirRecords.length; d++) this.push({ data: this.dirRecords[d], meta: { percent: 100 } });
        var n = this.bytesWritten - i, c = function(s, m, w, x, S) {
          var F = r.transformTo("string", S(x));
          return _.CENTRAL_DIRECTORY_END + "\0\0\0\0" + a(s, 2) + a(s, 2) + a(m, 4) + a(w, 4) + a(F.length, 2) + F;
        }(this.dirRecords.length, n, i, this.zipComment, this.encodeFileName);
        this.push({ data: c, meta: { percent: 100 } });
      }, b.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, b.prototype.registerPrevious = function(i) {
        this._sources.push(i);
        var d = this;
        return i.on("data", function(n) {
          d.processChunk(n);
        }), i.on("end", function() {
          d.closedSource(d.previous.streamInfo), d._sources.length ? d.prepareNextSource() : d.end();
        }), i.on("error", function(n) {
          d.error(n);
        }), this;
      }, b.prototype.resume = function() {
        return !!l.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, b.prototype.error = function(i) {
        var d = this._sources;
        if (!l.prototype.error.call(this, i)) return !1;
        for (var n = 0; n < d.length; n++) try {
          d[n].error(i);
        } catch {
        }
        return !0;
      }, b.prototype.lock = function() {
        l.prototype.lock.call(this);
        for (var i = this._sources, d = 0; d < i.length; d++) i[d].lock();
      }, A.exports = b;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(p, A, v) {
      var a = p("../compressions"), o = p("./ZipFileWorker");
      v.generateWorker = function(r, l, g) {
        var y = new o(l.streamFiles, g, l.platform, l.encodeFileName), _ = 0;
        try {
          r.forEach(function(b, i) {
            _++;
            var d = function(m, w) {
              var x = m || w, S = a[x];
              if (!S) throw new Error(x + " is not a valid compression method !");
              return S;
            }(i.options.compression, l.compression), n = i.options.compressionOptions || l.compressionOptions || {}, c = i.dir, s = i.date;
            i._compressWorker(d, n).withStreamInfo("file", { name: b, dir: c, date: s, comment: i.comment || "", unixPermissions: i.unixPermissions, dosPermissions: i.dosPermissions }).pipe(y);
          }), y.entriesCount = _;
        } catch (b) {
          y.error(b);
        }
        return y;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(p, A, v) {
      function a() {
        if (!(this instanceof a)) return new a();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var o = new a();
          for (var r in this) typeof this[r] != "function" && (o[r] = this[r]);
          return o;
        };
      }
      (a.prototype = p("./object")).loadAsync = p("./load"), a.support = p("./support"), a.defaults = p("./defaults"), a.version = "3.10.1", a.loadAsync = function(o, r) {
        return new a().loadAsync(o, r);
      }, a.external = p("./external"), A.exports = a;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(p, A, v) {
      var a = p("./utils"), o = p("./external"), r = p("./utf8"), l = p("./zipEntries"), g = p("./stream/Crc32Probe"), y = p("./nodejsUtils");
      function _(b) {
        return new o.Promise(function(i, d) {
          var n = b.decompressed.getContentWorker().pipe(new g());
          n.on("error", function(c) {
            d(c);
          }).on("end", function() {
            n.streamInfo.crc32 !== b.decompressed.crc32 ? d(new Error("Corrupted zip : CRC32 mismatch")) : i();
          }).resume();
        });
      }
      A.exports = function(b, i) {
        var d = this;
        return i = a.extend(i || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: r.utf8decode }), y.isNode && y.isStream(b) ? o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : a.prepareContent("the loaded zip file", b, !0, i.optimizedBinaryString, i.base64).then(function(n) {
          var c = new l(i);
          return c.load(n), c;
        }).then(function(n) {
          var c = [o.Promise.resolve(n)], s = n.files;
          if (i.checkCRC32) for (var m = 0; m < s.length; m++) c.push(_(s[m]));
          return o.Promise.all(c);
        }).then(function(n) {
          for (var c = n.shift(), s = c.files, m = 0; m < s.length; m++) {
            var w = s[m], x = w.fileNameStr, S = a.resolve(w.fileNameStr);
            d.file(S, w.decompressed, { binary: !0, optimizedBinaryString: !0, date: w.date, dir: w.dir, comment: w.fileCommentStr.length ? w.fileCommentStr : null, unixPermissions: w.unixPermissions, dosPermissions: w.dosPermissions, createFolders: i.createFolders }), w.dir || (d.file(S).unsafeOriginalName = x);
          }
          return c.zipComment.length && (d.comment = c.zipComment), d;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(p, A, v) {
      var a = p("../utils"), o = p("../stream/GenericWorker");
      function r(l, g) {
        o.call(this, "Nodejs stream input adapter for " + l), this._upstreamEnded = !1, this._bindStream(g);
      }
      a.inherits(r, o), r.prototype._bindStream = function(l) {
        var g = this;
        (this._stream = l).pause(), l.on("data", function(y) {
          g.push({ data: y, meta: { percent: 0 } });
        }).on("error", function(y) {
          g.isPaused ? this.generatedError = y : g.error(y);
        }).on("end", function() {
          g.isPaused ? g._upstreamEnded = !0 : g.end();
        });
      }, r.prototype.pause = function() {
        return !!o.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, r.prototype.resume = function() {
        return !!o.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, A.exports = r;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(p, A, v) {
      var a = p("readable-stream").Readable;
      function o(r, l, g) {
        a.call(this, l), this._helper = r;
        var y = this;
        r.on("data", function(_, b) {
          y.push(_) || y._helper.pause(), g && g(b);
        }).on("error", function(_) {
          y.emit("error", _);
        }).on("end", function() {
          y.push(null);
        });
      }
      p("../utils").inherits(o, a), o.prototype._read = function() {
        this._helper.resume();
      }, A.exports = o;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(p, A, v) {
      A.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(a, o) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(a, o);
        if (typeof a == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(a, o);
      }, allocBuffer: function(a) {
        if (Buffer.alloc) return Buffer.alloc(a);
        var o = new Buffer(a);
        return o.fill(0), o;
      }, isBuffer: function(a) {
        return Buffer.isBuffer(a);
      }, isStream: function(a) {
        return a && typeof a.on == "function" && typeof a.pause == "function" && typeof a.resume == "function";
      } };
    }, {}], 15: [function(p, A, v) {
      function a(S, F, E) {
        var D, C = r.getTypeOf(F), z = r.extend(E || {}, y);
        z.date = z.date || /* @__PURE__ */ new Date(), z.compression !== null && (z.compression = z.compression.toUpperCase()), typeof z.unixPermissions == "string" && (z.unixPermissions = parseInt(z.unixPermissions, 8)), z.unixPermissions && 16384 & z.unixPermissions && (z.dir = !0), z.dosPermissions && 16 & z.dosPermissions && (z.dir = !0), z.dir && (S = s(S)), z.createFolders && (D = c(S)) && m.call(this, D, !0);
        var X = C === "string" && z.binary === !1 && z.base64 === !1;
        E && E.binary !== void 0 || (z.binary = !X), (F instanceof _ && F.uncompressedSize === 0 || z.dir || !F || F.length === 0) && (z.base64 = !1, z.binary = !0, F = "", z.compression = "STORE", C = "string");
        var h = null;
        h = F instanceof _ || F instanceof l ? F : d.isNode && d.isStream(F) ? new n(S, F) : r.prepareContent(S, F, z.binary, z.optimizedBinaryString, z.base64);
        var T = new b(S, h, z);
        this.files[S] = T;
      }
      var o = p("./utf8"), r = p("./utils"), l = p("./stream/GenericWorker"), g = p("./stream/StreamHelper"), y = p("./defaults"), _ = p("./compressedObject"), b = p("./zipObject"), i = p("./generate"), d = p("./nodejsUtils"), n = p("./nodejs/NodejsStreamInputAdapter"), c = function(S) {
        S.slice(-1) === "/" && (S = S.substring(0, S.length - 1));
        var F = S.lastIndexOf("/");
        return 0 < F ? S.substring(0, F) : "";
      }, s = function(S) {
        return S.slice(-1) !== "/" && (S += "/"), S;
      }, m = function(S, F) {
        return F = F !== void 0 ? F : y.createFolders, S = s(S), this.files[S] || a.call(this, S, null, { dir: !0, createFolders: F }), this.files[S];
      };
      function w(S) {
        return Object.prototype.toString.call(S) === "[object RegExp]";
      }
      var x = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(S) {
        var F, E, D;
        for (F in this.files) D = this.files[F], (E = F.slice(this.root.length, F.length)) && F.slice(0, this.root.length) === this.root && S(E, D);
      }, filter: function(S) {
        var F = [];
        return this.forEach(function(E, D) {
          S(E, D) && F.push(D);
        }), F;
      }, file: function(S, F, E) {
        if (arguments.length !== 1) return S = this.root + S, a.call(this, S, F, E), this;
        if (w(S)) {
          var D = S;
          return this.filter(function(z, X) {
            return !X.dir && D.test(z);
          });
        }
        var C = this.files[this.root + S];
        return C && !C.dir ? C : null;
      }, folder: function(S) {
        if (!S) return this;
        if (w(S)) return this.filter(function(C, z) {
          return z.dir && S.test(C);
        });
        var F = this.root + S, E = m.call(this, F), D = this.clone();
        return D.root = E.name, D;
      }, remove: function(S) {
        S = this.root + S;
        var F = this.files[S];
        if (F || (S.slice(-1) !== "/" && (S += "/"), F = this.files[S]), F && !F.dir) delete this.files[S];
        else for (var E = this.filter(function(C, z) {
          return z.name.slice(0, S.length) === S;
        }), D = 0; D < E.length; D++) delete this.files[E[D].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(S) {
        var F, E = {};
        try {
          if ((E = r.extend(S || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: o.utf8encode })).type = E.type.toLowerCase(), E.compression = E.compression.toUpperCase(), E.type === "binarystring" && (E.type = "string"), !E.type) throw new Error("No output type specified.");
          r.checkSupport(E.type), E.platform !== "darwin" && E.platform !== "freebsd" && E.platform !== "linux" && E.platform !== "sunos" || (E.platform = "UNIX"), E.platform === "win32" && (E.platform = "DOS");
          var D = E.comment || this.comment || "";
          F = i.generateWorker(this, E, D);
        } catch (C) {
          (F = new l("error")).error(C);
        }
        return new g(F, E.type || "string", E.mimeType);
      }, generateAsync: function(S, F) {
        return this.generateInternalStream(S).accumulate(F);
      }, generateNodeStream: function(S, F) {
        return (S = S || {}).type || (S.type = "nodebuffer"), this.generateInternalStream(S).toNodejsStream(F);
      } };
      A.exports = x;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(p, A, v) {
      A.exports = p("stream");
    }, { stream: void 0 }], 17: [function(p, A, v) {
      var a = p("./DataReader");
      function o(r) {
        a.call(this, r);
        for (var l = 0; l < this.data.length; l++) r[l] = 255 & r[l];
      }
      p("../utils").inherits(o, a), o.prototype.byteAt = function(r) {
        return this.data[this.zero + r];
      }, o.prototype.lastIndexOfSignature = function(r) {
        for (var l = r.charCodeAt(0), g = r.charCodeAt(1), y = r.charCodeAt(2), _ = r.charCodeAt(3), b = this.length - 4; 0 <= b; --b) if (this.data[b] === l && this.data[b + 1] === g && this.data[b + 2] === y && this.data[b + 3] === _) return b - this.zero;
        return -1;
      }, o.prototype.readAndCheckSignature = function(r) {
        var l = r.charCodeAt(0), g = r.charCodeAt(1), y = r.charCodeAt(2), _ = r.charCodeAt(3), b = this.readData(4);
        return l === b[0] && g === b[1] && y === b[2] && _ === b[3];
      }, o.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return [];
        var l = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, l;
      }, A.exports = o;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(p, A, v) {
      var a = p("../utils");
      function o(r) {
        this.data = r, this.length = r.length, this.index = 0, this.zero = 0;
      }
      o.prototype = { checkOffset: function(r) {
        this.checkIndex(this.index + r);
      }, checkIndex: function(r) {
        if (this.length < this.zero + r || r < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + r + "). Corrupted zip ?");
      }, setIndex: function(r) {
        this.checkIndex(r), this.index = r;
      }, skip: function(r) {
        this.setIndex(this.index + r);
      }, byteAt: function() {
      }, readInt: function(r) {
        var l, g = 0;
        for (this.checkOffset(r), l = this.index + r - 1; l >= this.index; l--) g = (g << 8) + this.byteAt(l);
        return this.index += r, g;
      }, readString: function(r) {
        return a.transformTo("string", this.readData(r));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var r = this.readInt(4);
        return new Date(Date.UTC(1980 + (r >> 25 & 127), (r >> 21 & 15) - 1, r >> 16 & 31, r >> 11 & 31, r >> 5 & 63, (31 & r) << 1));
      } }, A.exports = o;
    }, { "../utils": 32 }], 19: [function(p, A, v) {
      var a = p("./Uint8ArrayReader");
      function o(r) {
        a.call(this, r);
      }
      p("../utils").inherits(o, a), o.prototype.readData = function(r) {
        this.checkOffset(r);
        var l = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, l;
      }, A.exports = o;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(p, A, v) {
      var a = p("./DataReader");
      function o(r) {
        a.call(this, r);
      }
      p("../utils").inherits(o, a), o.prototype.byteAt = function(r) {
        return this.data.charCodeAt(this.zero + r);
      }, o.prototype.lastIndexOfSignature = function(r) {
        return this.data.lastIndexOf(r) - this.zero;
      }, o.prototype.readAndCheckSignature = function(r) {
        return r === this.readData(4);
      }, o.prototype.readData = function(r) {
        this.checkOffset(r);
        var l = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, l;
      }, A.exports = o;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(p, A, v) {
      var a = p("./ArrayReader");
      function o(r) {
        a.call(this, r);
      }
      p("../utils").inherits(o, a), o.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return new Uint8Array(0);
        var l = this.data.subarray(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, l;
      }, A.exports = o;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(p, A, v) {
      var a = p("../utils"), o = p("../support"), r = p("./ArrayReader"), l = p("./StringReader"), g = p("./NodeBufferReader"), y = p("./Uint8ArrayReader");
      A.exports = function(_) {
        var b = a.getTypeOf(_);
        return a.checkSupport(b), b !== "string" || o.uint8array ? b === "nodebuffer" ? new g(_) : o.uint8array ? new y(a.transformTo("uint8array", _)) : new r(a.transformTo("array", _)) : new l(_);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(p, A, v) {
      v.LOCAL_FILE_HEADER = "PK", v.CENTRAL_FILE_HEADER = "PK", v.CENTRAL_DIRECTORY_END = "PK", v.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", v.ZIP64_CENTRAL_DIRECTORY_END = "PK", v.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(p, A, v) {
      var a = p("./GenericWorker"), o = p("../utils");
      function r(l) {
        a.call(this, "ConvertWorker to " + l), this.destType = l;
      }
      o.inherits(r, a), r.prototype.processChunk = function(l) {
        this.push({ data: o.transformTo(this.destType, l.data), meta: l.meta });
      }, A.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(p, A, v) {
      var a = p("./GenericWorker"), o = p("../crc32");
      function r() {
        a.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      p("../utils").inherits(r, a), r.prototype.processChunk = function(l) {
        this.streamInfo.crc32 = o(l.data, this.streamInfo.crc32 || 0), this.push(l);
      }, A.exports = r;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(p, A, v) {
      var a = p("../utils"), o = p("./GenericWorker");
      function r(l) {
        o.call(this, "DataLengthProbe for " + l), this.propName = l, this.withStreamInfo(l, 0);
      }
      a.inherits(r, o), r.prototype.processChunk = function(l) {
        if (l) {
          var g = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = g + l.data.length;
        }
        o.prototype.processChunk.call(this, l);
      }, A.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(p, A, v) {
      var a = p("../utils"), o = p("./GenericWorker");
      function r(l) {
        o.call(this, "DataWorker");
        var g = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, l.then(function(y) {
          g.dataIsReady = !0, g.data = y, g.max = y && y.length || 0, g.type = a.getTypeOf(y), g.isPaused || g._tickAndRepeat();
        }, function(y) {
          g.error(y);
        });
      }
      a.inherits(r, o), r.prototype.cleanUp = function() {
        o.prototype.cleanUp.call(this), this.data = null;
      }, r.prototype.resume = function() {
        return !!o.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, a.delay(this._tickAndRepeat, [], this)), !0);
      }, r.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (a.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, r.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return !1;
        var l = null, g = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            l = this.data.substring(this.index, g);
            break;
          case "uint8array":
            l = this.data.subarray(this.index, g);
            break;
          case "array":
          case "nodebuffer":
            l = this.data.slice(this.index, g);
        }
        return this.index = g, this.push({ data: l, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, A.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(p, A, v) {
      function a(o) {
        this.name = o || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      a.prototype = { push: function(o) {
        this.emit("data", o);
      }, end: function() {
        if (this.isFinished) return !1;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = !0;
        } catch (o) {
          this.emit("error", o);
        }
        return !0;
      }, error: function(o) {
        return !this.isFinished && (this.isPaused ? this.generatedError = o : (this.isFinished = !0, this.emit("error", o), this.previous && this.previous.error(o), this.cleanUp()), !0);
      }, on: function(o, r) {
        return this._listeners[o].push(r), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(o, r) {
        if (this._listeners[o]) for (var l = 0; l < this._listeners[o].length; l++) this._listeners[o][l].call(this, r);
      }, pipe: function(o) {
        return o.registerPrevious(this);
      }, registerPrevious: function(o) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = o.streamInfo, this.mergeStreamInfo(), this.previous = o;
        var r = this;
        return o.on("data", function(l) {
          r.processChunk(l);
        }), o.on("end", function() {
          r.end();
        }), o.on("error", function(l) {
          r.error(l);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
      }, resume: function() {
        if (!this.isPaused || this.isFinished) return !1;
        var o = this.isPaused = !1;
        return this.generatedError && (this.error(this.generatedError), o = !0), this.previous && this.previous.resume(), !o;
      }, flush: function() {
      }, processChunk: function(o) {
        this.push(o);
      }, withStreamInfo: function(o, r) {
        return this.extraStreamInfo[o] = r, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var o in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, o) && (this.streamInfo[o] = this.extraStreamInfo[o]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = !0, this.previous && this.previous.lock();
      }, toString: function() {
        var o = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + o : o;
      } }, A.exports = a;
    }, {}], 29: [function(p, A, v) {
      var a = p("../utils"), o = p("./ConvertWorker"), r = p("./GenericWorker"), l = p("../base64"), g = p("../support"), y = p("../external"), _ = null;
      if (g.nodestream) try {
        _ = p("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function b(d, n) {
        return new y.Promise(function(c, s) {
          var m = [], w = d._internalType, x = d._outputType, S = d._mimeType;
          d.on("data", function(F, E) {
            m.push(F), n && n(E);
          }).on("error", function(F) {
            m = [], s(F);
          }).on("end", function() {
            try {
              var F = function(E, D, C) {
                switch (E) {
                  case "blob":
                    return a.newBlob(a.transformTo("arraybuffer", D), C);
                  case "base64":
                    return l.encode(D);
                  default:
                    return a.transformTo(E, D);
                }
              }(x, function(E, D) {
                var C, z = 0, X = null, h = 0;
                for (C = 0; C < D.length; C++) h += D[C].length;
                switch (E) {
                  case "string":
                    return D.join("");
                  case "array":
                    return Array.prototype.concat.apply([], D);
                  case "uint8array":
                    for (X = new Uint8Array(h), C = 0; C < D.length; C++) X.set(D[C], z), z += D[C].length;
                    return X;
                  case "nodebuffer":
                    return Buffer.concat(D);
                  default:
                    throw new Error("concat : unsupported type '" + E + "'");
                }
              }(w, m), S);
              c(F);
            } catch (E) {
              s(E);
            }
            m = [];
          }).resume();
        });
      }
      function i(d, n, c) {
        var s = n;
        switch (n) {
          case "blob":
          case "arraybuffer":
            s = "uint8array";
            break;
          case "base64":
            s = "string";
        }
        try {
          this._internalType = s, this._outputType = n, this._mimeType = c, a.checkSupport(s), this._worker = d.pipe(new o(s)), d.lock();
        } catch (m) {
          this._worker = new r("error"), this._worker.error(m);
        }
      }
      i.prototype = { accumulate: function(d) {
        return b(this, d);
      }, on: function(d, n) {
        var c = this;
        return d === "data" ? this._worker.on(d, function(s) {
          n.call(c, s.data, s.meta);
        }) : this._worker.on(d, function() {
          a.delay(n, arguments, c);
        }), this;
      }, resume: function() {
        return a.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(d) {
        if (a.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new _(this, { objectMode: this._outputType !== "nodebuffer" }, d);
      } }, A.exports = i;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(p, A, v) {
      if (v.base64 = !0, v.array = !0, v.string = !0, v.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", v.nodebuffer = typeof Buffer < "u", v.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") v.blob = !1;
      else {
        var a = new ArrayBuffer(0);
        try {
          v.blob = new Blob([a], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var o = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            o.append(a), v.blob = o.getBlob("application/zip").size === 0;
          } catch {
            v.blob = !1;
          }
        }
      }
      try {
        v.nodestream = !!p("readable-stream").Readable;
      } catch {
        v.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(p, A, v) {
      for (var a = p("./utils"), o = p("./support"), r = p("./nodejsUtils"), l = p("./stream/GenericWorker"), g = new Array(256), y = 0; y < 256; y++) g[y] = 252 <= y ? 6 : 248 <= y ? 5 : 240 <= y ? 4 : 224 <= y ? 3 : 192 <= y ? 2 : 1;
      g[254] = g[254] = 1;
      function _() {
        l.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function b() {
        l.call(this, "utf-8 encode");
      }
      v.utf8encode = function(i) {
        return o.nodebuffer ? r.newBufferFrom(i, "utf-8") : function(d) {
          var n, c, s, m, w, x = d.length, S = 0;
          for (m = 0; m < x; m++) (64512 & (c = d.charCodeAt(m))) == 55296 && m + 1 < x && (64512 & (s = d.charCodeAt(m + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (s - 56320), m++), S += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
          for (n = o.uint8array ? new Uint8Array(S) : new Array(S), m = w = 0; w < S; m++) (64512 & (c = d.charCodeAt(m))) == 55296 && m + 1 < x && (64512 & (s = d.charCodeAt(m + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (s - 56320), m++), c < 128 ? n[w++] = c : (c < 2048 ? n[w++] = 192 | c >>> 6 : (c < 65536 ? n[w++] = 224 | c >>> 12 : (n[w++] = 240 | c >>> 18, n[w++] = 128 | c >>> 12 & 63), n[w++] = 128 | c >>> 6 & 63), n[w++] = 128 | 63 & c);
          return n;
        }(i);
      }, v.utf8decode = function(i) {
        return o.nodebuffer ? a.transformTo("nodebuffer", i).toString("utf-8") : function(d) {
          var n, c, s, m, w = d.length, x = new Array(2 * w);
          for (n = c = 0; n < w; ) if ((s = d[n++]) < 128) x[c++] = s;
          else if (4 < (m = g[s])) x[c++] = 65533, n += m - 1;
          else {
            for (s &= m === 2 ? 31 : m === 3 ? 15 : 7; 1 < m && n < w; ) s = s << 6 | 63 & d[n++], m--;
            1 < m ? x[c++] = 65533 : s < 65536 ? x[c++] = s : (s -= 65536, x[c++] = 55296 | s >> 10 & 1023, x[c++] = 56320 | 1023 & s);
          }
          return x.length !== c && (x.subarray ? x = x.subarray(0, c) : x.length = c), a.applyFromCharCode(x);
        }(i = a.transformTo(o.uint8array ? "uint8array" : "array", i));
      }, a.inherits(_, l), _.prototype.processChunk = function(i) {
        var d = a.transformTo(o.uint8array ? "uint8array" : "array", i.data);
        if (this.leftOver && this.leftOver.length) {
          if (o.uint8array) {
            var n = d;
            (d = new Uint8Array(n.length + this.leftOver.length)).set(this.leftOver, 0), d.set(n, this.leftOver.length);
          } else d = this.leftOver.concat(d);
          this.leftOver = null;
        }
        var c = function(m, w) {
          var x;
          for ((w = w || m.length) > m.length && (w = m.length), x = w - 1; 0 <= x && (192 & m[x]) == 128; ) x--;
          return x < 0 || x === 0 ? w : x + g[m[x]] > w ? x : w;
        }(d), s = d;
        c !== d.length && (o.uint8array ? (s = d.subarray(0, c), this.leftOver = d.subarray(c, d.length)) : (s = d.slice(0, c), this.leftOver = d.slice(c, d.length))), this.push({ data: v.utf8decode(s), meta: i.meta });
      }, _.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: v.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, v.Utf8DecodeWorker = _, a.inherits(b, l), b.prototype.processChunk = function(i) {
        this.push({ data: v.utf8encode(i.data), meta: i.meta });
      }, v.Utf8EncodeWorker = b;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(p, A, v) {
      var a = p("./support"), o = p("./base64"), r = p("./nodejsUtils"), l = p("./external");
      function g(n) {
        return n;
      }
      function y(n, c) {
        for (var s = 0; s < n.length; ++s) c[s] = 255 & n.charCodeAt(s);
        return c;
      }
      p("setimmediate"), v.newBlob = function(n, c) {
        v.checkSupport("blob");
        try {
          return new Blob([n], { type: c });
        } catch {
          try {
            var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return s.append(n), s.getBlob(c);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var _ = { stringifyByChunk: function(n, c, s) {
        var m = [], w = 0, x = n.length;
        if (x <= s) return String.fromCharCode.apply(null, n);
        for (; w < x; ) c === "array" || c === "nodebuffer" ? m.push(String.fromCharCode.apply(null, n.slice(w, Math.min(w + s, x)))) : m.push(String.fromCharCode.apply(null, n.subarray(w, Math.min(w + s, x)))), w += s;
        return m.join("");
      }, stringifyByChar: function(n) {
        for (var c = "", s = 0; s < n.length; s++) c += String.fromCharCode(n[s]);
        return c;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return a.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return !1;
        }
      }(), nodebuffer: function() {
        try {
          return a.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1;
        } catch {
          return !1;
        }
      }() } };
      function b(n) {
        var c = 65536, s = v.getTypeOf(n), m = !0;
        if (s === "uint8array" ? m = _.applyCanBeUsed.uint8array : s === "nodebuffer" && (m = _.applyCanBeUsed.nodebuffer), m) for (; 1 < c; ) try {
          return _.stringifyByChunk(n, s, c);
        } catch {
          c = Math.floor(c / 2);
        }
        return _.stringifyByChar(n);
      }
      function i(n, c) {
        for (var s = 0; s < n.length; s++) c[s] = n[s];
        return c;
      }
      v.applyFromCharCode = b;
      var d = {};
      d.string = { string: g, array: function(n) {
        return y(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return d.string.uint8array(n).buffer;
      }, uint8array: function(n) {
        return y(n, new Uint8Array(n.length));
      }, nodebuffer: function(n) {
        return y(n, r.allocBuffer(n.length));
      } }, d.array = { string: b, array: g, arraybuffer: function(n) {
        return new Uint8Array(n).buffer;
      }, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, d.arraybuffer = { string: function(n) {
        return b(new Uint8Array(n));
      }, array: function(n) {
        return i(new Uint8Array(n), new Array(n.byteLength));
      }, arraybuffer: g, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(new Uint8Array(n));
      } }, d.uint8array = { string: b, array: function(n) {
        return i(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return n.buffer;
      }, uint8array: g, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, d.nodebuffer = { string: b, array: function(n) {
        return i(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return d.nodebuffer.uint8array(n).buffer;
      }, uint8array: function(n) {
        return i(n, new Uint8Array(n.length));
      }, nodebuffer: g }, v.transformTo = function(n, c) {
        if (c = c || "", !n) return c;
        v.checkSupport(n);
        var s = v.getTypeOf(c);
        return d[s][n](c);
      }, v.resolve = function(n) {
        for (var c = n.split("/"), s = [], m = 0; m < c.length; m++) {
          var w = c[m];
          w === "." || w === "" && m !== 0 && m !== c.length - 1 || (w === ".." ? s.pop() : s.push(w));
        }
        return s.join("/");
      }, v.getTypeOf = function(n) {
        return typeof n == "string" ? "string" : Object.prototype.toString.call(n) === "[object Array]" ? "array" : a.nodebuffer && r.isBuffer(n) ? "nodebuffer" : a.uint8array && n instanceof Uint8Array ? "uint8array" : a.arraybuffer && n instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, v.checkSupport = function(n) {
        if (!a[n.toLowerCase()]) throw new Error(n + " is not supported by this platform");
      }, v.MAX_VALUE_16BITS = 65535, v.MAX_VALUE_32BITS = -1, v.pretty = function(n) {
        var c, s, m = "";
        for (s = 0; s < (n || "").length; s++) m += "\\x" + ((c = n.charCodeAt(s)) < 16 ? "0" : "") + c.toString(16).toUpperCase();
        return m;
      }, v.delay = function(n, c, s) {
        setImmediate(function() {
          n.apply(s || null, c || []);
        });
      }, v.inherits = function(n, c) {
        function s() {
        }
        s.prototype = c.prototype, n.prototype = new s();
      }, v.extend = function() {
        var n, c, s = {};
        for (n = 0; n < arguments.length; n++) for (c in arguments[n]) Object.prototype.hasOwnProperty.call(arguments[n], c) && s[c] === void 0 && (s[c] = arguments[n][c]);
        return s;
      }, v.prepareContent = function(n, c, s, m, w) {
        return l.Promise.resolve(c).then(function(x) {
          return a.blob && (x instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(x)) !== -1) && typeof FileReader < "u" ? new l.Promise(function(S, F) {
            var E = new FileReader();
            E.onload = function(D) {
              S(D.target.result);
            }, E.onerror = function(D) {
              F(D.target.error);
            }, E.readAsArrayBuffer(x);
          }) : x;
        }).then(function(x) {
          var S = v.getTypeOf(x);
          return S ? (S === "arraybuffer" ? x = v.transformTo("uint8array", x) : S === "string" && (w ? x = o.decode(x) : s && m !== !0 && (x = function(F) {
            return y(F, a.uint8array ? new Uint8Array(F.length) : new Array(F.length));
          }(x))), x) : l.Promise.reject(new Error("Can't read the data of '" + n + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(p, A, v) {
      var a = p("./reader/readerFor"), o = p("./utils"), r = p("./signature"), l = p("./zipEntry"), g = p("./support");
      function y(_) {
        this.files = [], this.loadOptions = _;
      }
      y.prototype = { checkSignature: function(_) {
        if (!this.reader.readAndCheckSignature(_)) {
          this.reader.index -= 4;
          var b = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + o.pretty(b) + ", expected " + o.pretty(_) + ")");
        }
      }, isSignature: function(_, b) {
        var i = this.reader.index;
        this.reader.setIndex(_);
        var d = this.reader.readString(4) === b;
        return this.reader.setIndex(i), d;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var _ = this.reader.readData(this.zipCommentLength), b = g.uint8array ? "uint8array" : "array", i = o.transformTo(b, _);
        this.zipComment = this.loadOptions.decodeFileName(i);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var _, b, i, d = this.zip64EndOfCentralSize - 44; 0 < d; ) _ = this.reader.readInt(2), b = this.reader.readInt(4), i = this.reader.readData(b), this.zip64ExtensibleData[_] = { id: _, length: b, value: i };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var _, b;
        for (_ = 0; _ < this.files.length; _++) b = this.files[_], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(r.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8(), b.processAttributes();
      }, readCentralDir: function() {
        var _;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER); ) (_ = new l({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(_);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var _ = this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);
        if (_ < 0) throw this.isSignature(0, r.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(_);
        var b = _;
        if (this.checkSignature(r.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === o.MAX_VALUE_16BITS || this.diskWithCentralDirStart === o.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === o.MAX_VALUE_16BITS || this.centralDirRecords === o.MAX_VALUE_16BITS || this.centralDirSize === o.MAX_VALUE_32BITS || this.centralDirOffset === o.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (_ = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(_), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, r.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var i = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (i += 20, i += 12 + this.zip64EndOfCentralSize);
        var d = b - i;
        if (0 < d) this.isSignature(b, r.CENTRAL_FILE_HEADER) || (this.reader.zero = d);
        else if (d < 0) throw new Error("Corrupted zip: missing " + Math.abs(d) + " bytes.");
      }, prepareReader: function(_) {
        this.reader = a(_);
      }, load: function(_) {
        this.prepareReader(_), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, A.exports = y;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(p, A, v) {
      var a = p("./reader/readerFor"), o = p("./utils"), r = p("./compressedObject"), l = p("./crc32"), g = p("./utf8"), y = p("./compressions"), _ = p("./support");
      function b(i, d) {
        this.options = i, this.loadOptions = d;
      }
      b.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(i) {
        var d, n;
        if (i.skip(22), this.fileNameLength = i.readInt(2), n = i.readInt(2), this.fileName = i.readData(this.fileNameLength), i.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((d = function(c) {
          for (var s in y) if (Object.prototype.hasOwnProperty.call(y, s) && y[s].magic === c) return y[s];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + o.pretty(this.compressionMethod) + " unknown (inner file : " + o.transformTo("string", this.fileName) + ")");
        this.decompressed = new r(this.compressedSize, this.uncompressedSize, this.crc32, d, i.readData(this.compressedSize));
      }, readCentralPart: function(i) {
        this.versionMadeBy = i.readInt(2), i.skip(2), this.bitFlag = i.readInt(2), this.compressionMethod = i.readString(2), this.date = i.readDate(), this.crc32 = i.readInt(4), this.compressedSize = i.readInt(4), this.uncompressedSize = i.readInt(4);
        var d = i.readInt(2);
        if (this.extraFieldsLength = i.readInt(2), this.fileCommentLength = i.readInt(2), this.diskNumberStart = i.readInt(2), this.internalFileAttributes = i.readInt(2), this.externalFileAttributes = i.readInt(4), this.localHeaderOffset = i.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        i.skip(d), this.readExtraFields(i), this.parseZIP64ExtraField(i), this.fileComment = i.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var i = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), i == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), i == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var i = a(this.extraFields[1].value);
          this.uncompressedSize === o.MAX_VALUE_32BITS && (this.uncompressedSize = i.readInt(8)), this.compressedSize === o.MAX_VALUE_32BITS && (this.compressedSize = i.readInt(8)), this.localHeaderOffset === o.MAX_VALUE_32BITS && (this.localHeaderOffset = i.readInt(8)), this.diskNumberStart === o.MAX_VALUE_32BITS && (this.diskNumberStart = i.readInt(4));
        }
      }, readExtraFields: function(i) {
        var d, n, c, s = i.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); i.index + 4 < s; ) d = i.readInt(2), n = i.readInt(2), c = i.readData(n), this.extraFields[d] = { id: d, length: n, value: c };
        i.setIndex(s);
      }, handleUTF8: function() {
        var i = _.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = g.utf8decode(this.fileName), this.fileCommentStr = g.utf8decode(this.fileComment);
        else {
          var d = this.findExtraFieldUnicodePath();
          if (d !== null) this.fileNameStr = d;
          else {
            var n = o.transformTo(i, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(n);
          }
          var c = this.findExtraFieldUnicodeComment();
          if (c !== null) this.fileCommentStr = c;
          else {
            var s = o.transformTo(i, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(s);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var i = this.extraFields[28789];
        if (i) {
          var d = a(i.value);
          return d.readInt(1) !== 1 || l(this.fileName) !== d.readInt(4) ? null : g.utf8decode(d.readData(i.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var i = this.extraFields[25461];
        if (i) {
          var d = a(i.value);
          return d.readInt(1) !== 1 || l(this.fileComment) !== d.readInt(4) ? null : g.utf8decode(d.readData(i.length - 5));
        }
        return null;
      } }, A.exports = b;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(p, A, v) {
      function a(d, n, c) {
        this.name = d, this.dir = c.dir, this.date = c.date, this.comment = c.comment, this.unixPermissions = c.unixPermissions, this.dosPermissions = c.dosPermissions, this._data = n, this._dataBinary = c.binary, this.options = { compression: c.compression, compressionOptions: c.compressionOptions };
      }
      var o = p("./stream/StreamHelper"), r = p("./stream/DataWorker"), l = p("./utf8"), g = p("./compressedObject"), y = p("./stream/GenericWorker");
      a.prototype = { internalStream: function(d) {
        var n = null, c = "string";
        try {
          if (!d) throw new Error("No output type specified.");
          var s = (c = d.toLowerCase()) === "string" || c === "text";
          c !== "binarystring" && c !== "text" || (c = "string"), n = this._decompressWorker();
          var m = !this._dataBinary;
          m && !s && (n = n.pipe(new l.Utf8EncodeWorker())), !m && s && (n = n.pipe(new l.Utf8DecodeWorker()));
        } catch (w) {
          (n = new y("error")).error(w);
        }
        return new o(n, c, "");
      }, async: function(d, n) {
        return this.internalStream(d).accumulate(n);
      }, nodeStream: function(d, n) {
        return this.internalStream(d || "nodebuffer").toNodejsStream(n);
      }, _compressWorker: function(d, n) {
        if (this._data instanceof g && this._data.compression.magic === d.magic) return this._data.getCompressedWorker();
        var c = this._decompressWorker();
        return this._dataBinary || (c = c.pipe(new l.Utf8EncodeWorker())), g.createWorkerFrom(c, d, n);
      }, _decompressWorker: function() {
        return this._data instanceof g ? this._data.getContentWorker() : this._data instanceof y ? this._data : new r(this._data);
      } };
      for (var _ = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], b = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, i = 0; i < _.length; i++) a.prototype[_[i]] = b;
      A.exports = a;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(p, A, v) {
      (function(a) {
        var o, r, l = a.MutationObserver || a.WebKitMutationObserver;
        if (l) {
          var g = 0, y = new l(d), _ = a.document.createTextNode("");
          y.observe(_, { characterData: !0 }), o = function() {
            _.data = g = ++g % 2;
          };
        } else if (a.setImmediate || a.MessageChannel === void 0) o = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function() {
          var n = a.document.createElement("script");
          n.onreadystatechange = function() {
            d(), n.onreadystatechange = null, n.parentNode.removeChild(n), n = null;
          }, a.document.documentElement.appendChild(n);
        } : function() {
          setTimeout(d, 0);
        };
        else {
          var b = new a.MessageChannel();
          b.port1.onmessage = d, o = function() {
            b.port2.postMessage(0);
          };
        }
        var i = [];
        function d() {
          var n, c;
          r = !0;
          for (var s = i.length; s; ) {
            for (c = i, i = [], n = -1; ++n < s; ) c[n]();
            s = i.length;
          }
          r = !1;
        }
        A.exports = function(n) {
          i.push(n) !== 1 || r || o();
        };
      }).call(this, typeof At < "u" ? At : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(p, A, v) {
      var a = p("immediate");
      function o() {
      }
      var r = {}, l = ["REJECTED"], g = ["FULFILLED"], y = ["PENDING"];
      function _(s) {
        if (typeof s != "function") throw new TypeError("resolver must be a function");
        this.state = y, this.queue = [], this.outcome = void 0, s !== o && n(this, s);
      }
      function b(s, m, w) {
        this.promise = s, typeof m == "function" && (this.onFulfilled = m, this.callFulfilled = this.otherCallFulfilled), typeof w == "function" && (this.onRejected = w, this.callRejected = this.otherCallRejected);
      }
      function i(s, m, w) {
        a(function() {
          var x;
          try {
            x = m(w);
          } catch (S) {
            return r.reject(s, S);
          }
          x === s ? r.reject(s, new TypeError("Cannot resolve promise with itself")) : r.resolve(s, x);
        });
      }
      function d(s) {
        var m = s && s.then;
        if (s && (typeof s == "object" || typeof s == "function") && typeof m == "function") return function() {
          m.apply(s, arguments);
        };
      }
      function n(s, m) {
        var w = !1;
        function x(E) {
          w || (w = !0, r.reject(s, E));
        }
        function S(E) {
          w || (w = !0, r.resolve(s, E));
        }
        var F = c(function() {
          m(S, x);
        });
        F.status === "error" && x(F.value);
      }
      function c(s, m) {
        var w = {};
        try {
          w.value = s(m), w.status = "success";
        } catch (x) {
          w.status = "error", w.value = x;
        }
        return w;
      }
      (A.exports = _).prototype.finally = function(s) {
        if (typeof s != "function") return this;
        var m = this.constructor;
        return this.then(function(w) {
          return m.resolve(s()).then(function() {
            return w;
          });
        }, function(w) {
          return m.resolve(s()).then(function() {
            throw w;
          });
        });
      }, _.prototype.catch = function(s) {
        return this.then(null, s);
      }, _.prototype.then = function(s, m) {
        if (typeof s != "function" && this.state === g || typeof m != "function" && this.state === l) return this;
        var w = new this.constructor(o);
        return this.state !== y ? i(w, this.state === g ? s : m, this.outcome) : this.queue.push(new b(w, s, m)), w;
      }, b.prototype.callFulfilled = function(s) {
        r.resolve(this.promise, s);
      }, b.prototype.otherCallFulfilled = function(s) {
        i(this.promise, this.onFulfilled, s);
      }, b.prototype.callRejected = function(s) {
        r.reject(this.promise, s);
      }, b.prototype.otherCallRejected = function(s) {
        i(this.promise, this.onRejected, s);
      }, r.resolve = function(s, m) {
        var w = c(d, m);
        if (w.status === "error") return r.reject(s, w.value);
        var x = w.value;
        if (x) n(s, x);
        else {
          s.state = g, s.outcome = m;
          for (var S = -1, F = s.queue.length; ++S < F; ) s.queue[S].callFulfilled(m);
        }
        return s;
      }, r.reject = function(s, m) {
        s.state = l, s.outcome = m;
        for (var w = -1, x = s.queue.length; ++w < x; ) s.queue[w].callRejected(m);
        return s;
      }, _.resolve = function(s) {
        return s instanceof this ? s : r.resolve(new this(o), s);
      }, _.reject = function(s) {
        var m = new this(o);
        return r.reject(m, s);
      }, _.all = function(s) {
        var m = this;
        if (Object.prototype.toString.call(s) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var w = s.length, x = !1;
        if (!w) return this.resolve([]);
        for (var S = new Array(w), F = 0, E = -1, D = new this(o); ++E < w; ) C(s[E], E);
        return D;
        function C(z, X) {
          m.resolve(z).then(function(h) {
            S[X] = h, ++F !== w || x || (x = !0, r.resolve(D, S));
          }, function(h) {
            x || (x = !0, r.reject(D, h));
          });
        }
      }, _.race = function(s) {
        var m = this;
        if (Object.prototype.toString.call(s) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var w = s.length, x = !1;
        if (!w) return this.resolve([]);
        for (var S = -1, F = new this(o); ++S < w; ) E = s[S], m.resolve(E).then(function(D) {
          x || (x = !0, r.resolve(F, D));
        }, function(D) {
          x || (x = !0, r.reject(F, D));
        });
        var E;
        return F;
      };
    }, { immediate: 36 }], 38: [function(p, A, v) {
      var a = {};
      (0, p("./lib/utils/common").assign)(a, p("./lib/deflate"), p("./lib/inflate"), p("./lib/zlib/constants")), A.exports = a;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(p, A, v) {
      var a = p("./zlib/deflate"), o = p("./utils/common"), r = p("./utils/strings"), l = p("./zlib/messages"), g = p("./zlib/zstream"), y = Object.prototype.toString, _ = 0, b = -1, i = 0, d = 8;
      function n(s) {
        if (!(this instanceof n)) return new n(s);
        this.options = o.assign({ level: b, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: i, to: "" }, s || {});
        var m = this.options;
        m.raw && 0 < m.windowBits ? m.windowBits = -m.windowBits : m.gzip && 0 < m.windowBits && m.windowBits < 16 && (m.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new g(), this.strm.avail_out = 0;
        var w = a.deflateInit2(this.strm, m.level, m.method, m.windowBits, m.memLevel, m.strategy);
        if (w !== _) throw new Error(l[w]);
        if (m.header && a.deflateSetHeader(this.strm, m.header), m.dictionary) {
          var x;
          if (x = typeof m.dictionary == "string" ? r.string2buf(m.dictionary) : y.call(m.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(m.dictionary) : m.dictionary, (w = a.deflateSetDictionary(this.strm, x)) !== _) throw new Error(l[w]);
          this._dict_set = !0;
        }
      }
      function c(s, m) {
        var w = new n(m);
        if (w.push(s, !0), w.err) throw w.msg || l[w.err];
        return w.result;
      }
      n.prototype.push = function(s, m) {
        var w, x, S = this.strm, F = this.options.chunkSize;
        if (this.ended) return !1;
        x = m === ~~m ? m : m === !0 ? 4 : 0, typeof s == "string" ? S.input = r.string2buf(s) : y.call(s) === "[object ArrayBuffer]" ? S.input = new Uint8Array(s) : S.input = s, S.next_in = 0, S.avail_in = S.input.length;
        do {
          if (S.avail_out === 0 && (S.output = new o.Buf8(F), S.next_out = 0, S.avail_out = F), (w = a.deflate(S, x)) !== 1 && w !== _) return this.onEnd(w), !(this.ended = !0);
          S.avail_out !== 0 && (S.avail_in !== 0 || x !== 4 && x !== 2) || (this.options.to === "string" ? this.onData(r.buf2binstring(o.shrinkBuf(S.output, S.next_out))) : this.onData(o.shrinkBuf(S.output, S.next_out)));
        } while ((0 < S.avail_in || S.avail_out === 0) && w !== 1);
        return x === 4 ? (w = a.deflateEnd(this.strm), this.onEnd(w), this.ended = !0, w === _) : x !== 2 || (this.onEnd(_), !(S.avail_out = 0));
      }, n.prototype.onData = function(s) {
        this.chunks.push(s);
      }, n.prototype.onEnd = function(s) {
        s === _ && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = s, this.msg = this.strm.msg;
      }, v.Deflate = n, v.deflate = c, v.deflateRaw = function(s, m) {
        return (m = m || {}).raw = !0, c(s, m);
      }, v.gzip = function(s, m) {
        return (m = m || {}).gzip = !0, c(s, m);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(p, A, v) {
      var a = p("./zlib/inflate"), o = p("./utils/common"), r = p("./utils/strings"), l = p("./zlib/constants"), g = p("./zlib/messages"), y = p("./zlib/zstream"), _ = p("./zlib/gzheader"), b = Object.prototype.toString;
      function i(n) {
        if (!(this instanceof i)) return new i(n);
        this.options = o.assign({ chunkSize: 16384, windowBits: 0, to: "" }, n || {});
        var c = this.options;
        c.raw && 0 <= c.windowBits && c.windowBits < 16 && (c.windowBits = -c.windowBits, c.windowBits === 0 && (c.windowBits = -15)), !(0 <= c.windowBits && c.windowBits < 16) || n && n.windowBits || (c.windowBits += 32), 15 < c.windowBits && c.windowBits < 48 && !(15 & c.windowBits) && (c.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new y(), this.strm.avail_out = 0;
        var s = a.inflateInit2(this.strm, c.windowBits);
        if (s !== l.Z_OK) throw new Error(g[s]);
        this.header = new _(), a.inflateGetHeader(this.strm, this.header);
      }
      function d(n, c) {
        var s = new i(c);
        if (s.push(n, !0), s.err) throw s.msg || g[s.err];
        return s.result;
      }
      i.prototype.push = function(n, c) {
        var s, m, w, x, S, F, E = this.strm, D = this.options.chunkSize, C = this.options.dictionary, z = !1;
        if (this.ended) return !1;
        m = c === ~~c ? c : c === !0 ? l.Z_FINISH : l.Z_NO_FLUSH, typeof n == "string" ? E.input = r.binstring2buf(n) : b.call(n) === "[object ArrayBuffer]" ? E.input = new Uint8Array(n) : E.input = n, E.next_in = 0, E.avail_in = E.input.length;
        do {
          if (E.avail_out === 0 && (E.output = new o.Buf8(D), E.next_out = 0, E.avail_out = D), (s = a.inflate(E, l.Z_NO_FLUSH)) === l.Z_NEED_DICT && C && (F = typeof C == "string" ? r.string2buf(C) : b.call(C) === "[object ArrayBuffer]" ? new Uint8Array(C) : C, s = a.inflateSetDictionary(this.strm, F)), s === l.Z_BUF_ERROR && z === !0 && (s = l.Z_OK, z = !1), s !== l.Z_STREAM_END && s !== l.Z_OK) return this.onEnd(s), !(this.ended = !0);
          E.next_out && (E.avail_out !== 0 && s !== l.Z_STREAM_END && (E.avail_in !== 0 || m !== l.Z_FINISH && m !== l.Z_SYNC_FLUSH) || (this.options.to === "string" ? (w = r.utf8border(E.output, E.next_out), x = E.next_out - w, S = r.buf2string(E.output, w), E.next_out = x, E.avail_out = D - x, x && o.arraySet(E.output, E.output, w, x, 0), this.onData(S)) : this.onData(o.shrinkBuf(E.output, E.next_out)))), E.avail_in === 0 && E.avail_out === 0 && (z = !0);
        } while ((0 < E.avail_in || E.avail_out === 0) && s !== l.Z_STREAM_END);
        return s === l.Z_STREAM_END && (m = l.Z_FINISH), m === l.Z_FINISH ? (s = a.inflateEnd(this.strm), this.onEnd(s), this.ended = !0, s === l.Z_OK) : m !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), !(E.avail_out = 0));
      }, i.prototype.onData = function(n) {
        this.chunks.push(n);
      }, i.prototype.onEnd = function(n) {
        n === l.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
      }, v.Inflate = i, v.inflate = d, v.inflateRaw = function(n, c) {
        return (c = c || {}).raw = !0, d(n, c);
      }, v.ungzip = d;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(p, A, v) {
      var a = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      v.assign = function(l) {
        for (var g = Array.prototype.slice.call(arguments, 1); g.length; ) {
          var y = g.shift();
          if (y) {
            if (typeof y != "object") throw new TypeError(y + "must be non-object");
            for (var _ in y) y.hasOwnProperty(_) && (l[_] = y[_]);
          }
        }
        return l;
      }, v.shrinkBuf = function(l, g) {
        return l.length === g ? l : l.subarray ? l.subarray(0, g) : (l.length = g, l);
      };
      var o = { arraySet: function(l, g, y, _, b) {
        if (g.subarray && l.subarray) l.set(g.subarray(y, y + _), b);
        else for (var i = 0; i < _; i++) l[b + i] = g[y + i];
      }, flattenChunks: function(l) {
        var g, y, _, b, i, d;
        for (g = _ = 0, y = l.length; g < y; g++) _ += l[g].length;
        for (d = new Uint8Array(_), g = b = 0, y = l.length; g < y; g++) i = l[g], d.set(i, b), b += i.length;
        return d;
      } }, r = { arraySet: function(l, g, y, _, b) {
        for (var i = 0; i < _; i++) l[b + i] = g[y + i];
      }, flattenChunks: function(l) {
        return [].concat.apply([], l);
      } };
      v.setTyped = function(l) {
        l ? (v.Buf8 = Uint8Array, v.Buf16 = Uint16Array, v.Buf32 = Int32Array, v.assign(v, o)) : (v.Buf8 = Array, v.Buf16 = Array, v.Buf32 = Array, v.assign(v, r));
      }, v.setTyped(a);
    }, {}], 42: [function(p, A, v) {
      var a = p("./common"), o = !0, r = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        o = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        r = !1;
      }
      for (var l = new a.Buf8(256), g = 0; g < 256; g++) l[g] = 252 <= g ? 6 : 248 <= g ? 5 : 240 <= g ? 4 : 224 <= g ? 3 : 192 <= g ? 2 : 1;
      function y(_, b) {
        if (b < 65537 && (_.subarray && r || !_.subarray && o)) return String.fromCharCode.apply(null, a.shrinkBuf(_, b));
        for (var i = "", d = 0; d < b; d++) i += String.fromCharCode(_[d]);
        return i;
      }
      l[254] = l[254] = 1, v.string2buf = function(_) {
        var b, i, d, n, c, s = _.length, m = 0;
        for (n = 0; n < s; n++) (64512 & (i = _.charCodeAt(n))) == 55296 && n + 1 < s && (64512 & (d = _.charCodeAt(n + 1))) == 56320 && (i = 65536 + (i - 55296 << 10) + (d - 56320), n++), m += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
        for (b = new a.Buf8(m), n = c = 0; c < m; n++) (64512 & (i = _.charCodeAt(n))) == 55296 && n + 1 < s && (64512 & (d = _.charCodeAt(n + 1))) == 56320 && (i = 65536 + (i - 55296 << 10) + (d - 56320), n++), i < 128 ? b[c++] = i : (i < 2048 ? b[c++] = 192 | i >>> 6 : (i < 65536 ? b[c++] = 224 | i >>> 12 : (b[c++] = 240 | i >>> 18, b[c++] = 128 | i >>> 12 & 63), b[c++] = 128 | i >>> 6 & 63), b[c++] = 128 | 63 & i);
        return b;
      }, v.buf2binstring = function(_) {
        return y(_, _.length);
      }, v.binstring2buf = function(_) {
        for (var b = new a.Buf8(_.length), i = 0, d = b.length; i < d; i++) b[i] = _.charCodeAt(i);
        return b;
      }, v.buf2string = function(_, b) {
        var i, d, n, c, s = b || _.length, m = new Array(2 * s);
        for (i = d = 0; i < s; ) if ((n = _[i++]) < 128) m[d++] = n;
        else if (4 < (c = l[n])) m[d++] = 65533, i += c - 1;
        else {
          for (n &= c === 2 ? 31 : c === 3 ? 15 : 7; 1 < c && i < s; ) n = n << 6 | 63 & _[i++], c--;
          1 < c ? m[d++] = 65533 : n < 65536 ? m[d++] = n : (n -= 65536, m[d++] = 55296 | n >> 10 & 1023, m[d++] = 56320 | 1023 & n);
        }
        return y(m, d);
      }, v.utf8border = function(_, b) {
        var i;
        for ((b = b || _.length) > _.length && (b = _.length), i = b - 1; 0 <= i && (192 & _[i]) == 128; ) i--;
        return i < 0 || i === 0 ? b : i + l[_[i]] > b ? i : b;
      };
    }, { "./common": 41 }], 43: [function(p, A, v) {
      A.exports = function(a, o, r, l) {
        for (var g = 65535 & a | 0, y = a >>> 16 & 65535 | 0, _ = 0; r !== 0; ) {
          for (r -= _ = 2e3 < r ? 2e3 : r; y = y + (g = g + o[l++] | 0) | 0, --_; ) ;
          g %= 65521, y %= 65521;
        }
        return g | y << 16 | 0;
      };
    }, {}], 44: [function(p, A, v) {
      A.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(p, A, v) {
      var a = function() {
        for (var o, r = [], l = 0; l < 256; l++) {
          o = l;
          for (var g = 0; g < 8; g++) o = 1 & o ? 3988292384 ^ o >>> 1 : o >>> 1;
          r[l] = o;
        }
        return r;
      }();
      A.exports = function(o, r, l, g) {
        var y = a, _ = g + l;
        o ^= -1;
        for (var b = g; b < _; b++) o = o >>> 8 ^ y[255 & (o ^ r[b])];
        return -1 ^ o;
      };
    }, {}], 46: [function(p, A, v) {
      var a, o = p("../utils/common"), r = p("./trees"), l = p("./adler32"), g = p("./crc32"), y = p("./messages"), _ = 0, b = 4, i = 0, d = -2, n = -1, c = 4, s = 2, m = 8, w = 9, x = 286, S = 30, F = 19, E = 2 * x + 1, D = 15, C = 3, z = 258, X = z + C + 1, h = 42, T = 113, e = 1, P = 2, V = 3, L = 4;
      function Q(t, N) {
        return t.msg = y[N], N;
      }
      function W(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function tt(t) {
        for (var N = t.length; 0 <= --N; ) t[N] = 0;
      }
      function B(t) {
        var N = t.state, R = N.pending;
        R > t.avail_out && (R = t.avail_out), R !== 0 && (o.arraySet(t.output, N.pending_buf, N.pending_out, R, t.next_out), t.next_out += R, N.pending_out += R, t.total_out += R, t.avail_out -= R, N.pending -= R, N.pending === 0 && (N.pending_out = 0));
      }
      function I(t, N) {
        r._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, N), t.block_start = t.strstart, B(t.strm);
      }
      function J(t, N) {
        t.pending_buf[t.pending++] = N;
      }
      function $(t, N) {
        t.pending_buf[t.pending++] = N >>> 8 & 255, t.pending_buf[t.pending++] = 255 & N;
      }
      function G(t, N) {
        var R, f, u = t.max_chain_length, k = t.strstart, U = t.prev_length, j = t.nice_match, O = t.strstart > t.w_size - X ? t.strstart - (t.w_size - X) : 0, M = t.window, Y = t.w_mask, H = t.prev, q = t.strstart + z, at = M[k + U - 1], nt = M[k + U];
        t.prev_length >= t.good_match && (u >>= 2), j > t.lookahead && (j = t.lookahead);
        do
          if (M[(R = N) + U] === nt && M[R + U - 1] === at && M[R] === M[k] && M[++R] === M[k + 1]) {
            k += 2, R++;
            do
              ;
            while (M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && k < q);
            if (f = z - (q - k), k = q - z, U < f) {
              if (t.match_start = N, j <= (U = f)) break;
              at = M[k + U - 1], nt = M[k + U];
            }
          }
        while ((N = H[N & Y]) > O && --u != 0);
        return U <= t.lookahead ? U : t.lookahead;
      }
      function st(t) {
        var N, R, f, u, k, U, j, O, M, Y, H = t.w_size;
        do {
          if (u = t.window_size - t.lookahead - t.strstart, t.strstart >= H + (H - X)) {
            for (o.arraySet(t.window, t.window, H, H, 0), t.match_start -= H, t.strstart -= H, t.block_start -= H, N = R = t.hash_size; f = t.head[--N], t.head[N] = H <= f ? f - H : 0, --R; ) ;
            for (N = R = H; f = t.prev[--N], t.prev[N] = H <= f ? f - H : 0, --R; ) ;
            u += H;
          }
          if (t.strm.avail_in === 0) break;
          if (U = t.strm, j = t.window, O = t.strstart + t.lookahead, M = u, Y = void 0, Y = U.avail_in, M < Y && (Y = M), R = Y === 0 ? 0 : (U.avail_in -= Y, o.arraySet(j, U.input, U.next_in, Y, O), U.state.wrap === 1 ? U.adler = l(U.adler, j, Y, O) : U.state.wrap === 2 && (U.adler = g(U.adler, j, Y, O)), U.next_in += Y, U.total_in += Y, Y), t.lookahead += R, t.lookahead + t.insert >= C) for (k = t.strstart - t.insert, t.ins_h = t.window[k], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[k + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[k + C - 1]) & t.hash_mask, t.prev[k & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = k, k++, t.insert--, !(t.lookahead + t.insert < C)); ) ;
        } while (t.lookahead < X && t.strm.avail_in !== 0);
      }
      function ht(t, N) {
        for (var R, f; ; ) {
          if (t.lookahead < X) {
            if (st(t), t.lookahead < X && N === _) return e;
            if (t.lookahead === 0) break;
          }
          if (R = 0, t.lookahead >= C && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + C - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), R !== 0 && t.strstart - R <= t.w_size - X && (t.match_length = G(t, R)), t.match_length >= C) if (f = r._tr_tally(t, t.strstart - t.match_start, t.match_length - C), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= C) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + C - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else f = r._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (f && (I(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = t.strstart < C - 1 ? t.strstart : C - 1, N === b ? (I(t, !0), t.strm.avail_out === 0 ? V : L) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? e : P;
      }
      function rt(t, N) {
        for (var R, f, u; ; ) {
          if (t.lookahead < X) {
            if (st(t), t.lookahead < X && N === _) return e;
            if (t.lookahead === 0) break;
          }
          if (R = 0, t.lookahead >= C && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + C - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = C - 1, R !== 0 && t.prev_length < t.max_lazy_match && t.strstart - R <= t.w_size - X && (t.match_length = G(t, R), t.match_length <= 5 && (t.strategy === 1 || t.match_length === C && 4096 < t.strstart - t.match_start) && (t.match_length = C - 1)), t.prev_length >= C && t.match_length <= t.prev_length) {
            for (u = t.strstart + t.lookahead - C, f = r._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - C), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= u && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + C - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = C - 1, t.strstart++, f && (I(t, !1), t.strm.avail_out === 0)) return e;
          } else if (t.match_available) {
            if ((f = r._tr_tally(t, 0, t.window[t.strstart - 1])) && I(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return e;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (f = r._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < C - 1 ? t.strstart : C - 1, N === b ? (I(t, !0), t.strm.avail_out === 0 ? V : L) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? e : P;
      }
      function it(t, N, R, f, u) {
        this.good_length = t, this.max_lazy = N, this.nice_length = R, this.max_chain = f, this.func = u;
      }
      function ct() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = m, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new o.Buf16(2 * E), this.dyn_dtree = new o.Buf16(2 * (2 * S + 1)), this.bl_tree = new o.Buf16(2 * (2 * F + 1)), tt(this.dyn_ltree), tt(this.dyn_dtree), tt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new o.Buf16(D + 1), this.heap = new o.Buf16(2 * x + 1), tt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new o.Buf16(2 * x + 1), tt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function ot(t) {
        var N;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = s, (N = t.state).pending = 0, N.pending_out = 0, N.wrap < 0 && (N.wrap = -N.wrap), N.status = N.wrap ? h : T, t.adler = N.wrap === 2 ? 0 : 1, N.last_flush = _, r._tr_init(N), i) : Q(t, d);
      }
      function _t(t) {
        var N = ot(t);
        return N === i && function(R) {
          R.window_size = 2 * R.w_size, tt(R.head), R.max_lazy_match = a[R.level].max_lazy, R.good_match = a[R.level].good_length, R.nice_match = a[R.level].nice_length, R.max_chain_length = a[R.level].max_chain, R.strstart = 0, R.block_start = 0, R.lookahead = 0, R.insert = 0, R.match_length = R.prev_length = C - 1, R.match_available = 0, R.ins_h = 0;
        }(t.state), N;
      }
      function gt(t, N, R, f, u, k) {
        if (!t) return d;
        var U = 1;
        if (N === n && (N = 6), f < 0 ? (U = 0, f = -f) : 15 < f && (U = 2, f -= 16), u < 1 || w < u || R !== m || f < 8 || 15 < f || N < 0 || 9 < N || k < 0 || c < k) return Q(t, d);
        f === 8 && (f = 9);
        var j = new ct();
        return (t.state = j).strm = t, j.wrap = U, j.gzhead = null, j.w_bits = f, j.w_size = 1 << j.w_bits, j.w_mask = j.w_size - 1, j.hash_bits = u + 7, j.hash_size = 1 << j.hash_bits, j.hash_mask = j.hash_size - 1, j.hash_shift = ~~((j.hash_bits + C - 1) / C), j.window = new o.Buf8(2 * j.w_size), j.head = new o.Buf16(j.hash_size), j.prev = new o.Buf16(j.w_size), j.lit_bufsize = 1 << u + 6, j.pending_buf_size = 4 * j.lit_bufsize, j.pending_buf = new o.Buf8(j.pending_buf_size), j.d_buf = 1 * j.lit_bufsize, j.l_buf = 3 * j.lit_bufsize, j.level = N, j.strategy = k, j.method = R, _t(t);
      }
      a = [new it(0, 0, 0, 0, function(t, N) {
        var R = 65535;
        for (R > t.pending_buf_size - 5 && (R = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (st(t), t.lookahead === 0 && N === _) return e;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var f = t.block_start + R;
          if ((t.strstart === 0 || t.strstart >= f) && (t.lookahead = t.strstart - f, t.strstart = f, I(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - X && (I(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = 0, N === b ? (I(t, !0), t.strm.avail_out === 0 ? V : L) : (t.strstart > t.block_start && (I(t, !1), t.strm.avail_out), e);
      }), new it(4, 4, 8, 4, ht), new it(4, 5, 16, 8, ht), new it(4, 6, 32, 32, ht), new it(4, 4, 16, 16, rt), new it(8, 16, 32, 32, rt), new it(8, 16, 128, 128, rt), new it(8, 32, 128, 256, rt), new it(32, 128, 258, 1024, rt), new it(32, 258, 258, 4096, rt)], v.deflateInit = function(t, N) {
        return gt(t, N, m, 15, 8, 0);
      }, v.deflateInit2 = gt, v.deflateReset = _t, v.deflateResetKeep = ot, v.deflateSetHeader = function(t, N) {
        return t && t.state ? t.state.wrap !== 2 ? d : (t.state.gzhead = N, i) : d;
      }, v.deflate = function(t, N) {
        var R, f, u, k;
        if (!t || !t.state || 5 < N || N < 0) return t ? Q(t, d) : d;
        if (f = t.state, !t.output || !t.input && t.avail_in !== 0 || f.status === 666 && N !== b) return Q(t, t.avail_out === 0 ? -5 : d);
        if (f.strm = t, R = f.last_flush, f.last_flush = N, f.status === h) if (f.wrap === 2) t.adler = 0, J(f, 31), J(f, 139), J(f, 8), f.gzhead ? (J(f, (f.gzhead.text ? 1 : 0) + (f.gzhead.hcrc ? 2 : 0) + (f.gzhead.extra ? 4 : 0) + (f.gzhead.name ? 8 : 0) + (f.gzhead.comment ? 16 : 0)), J(f, 255 & f.gzhead.time), J(f, f.gzhead.time >> 8 & 255), J(f, f.gzhead.time >> 16 & 255), J(f, f.gzhead.time >> 24 & 255), J(f, f.level === 9 ? 2 : 2 <= f.strategy || f.level < 2 ? 4 : 0), J(f, 255 & f.gzhead.os), f.gzhead.extra && f.gzhead.extra.length && (J(f, 255 & f.gzhead.extra.length), J(f, f.gzhead.extra.length >> 8 & 255)), f.gzhead.hcrc && (t.adler = g(t.adler, f.pending_buf, f.pending, 0)), f.gzindex = 0, f.status = 69) : (J(f, 0), J(f, 0), J(f, 0), J(f, 0), J(f, 0), J(f, f.level === 9 ? 2 : 2 <= f.strategy || f.level < 2 ? 4 : 0), J(f, 3), f.status = T);
        else {
          var U = m + (f.w_bits - 8 << 4) << 8;
          U |= (2 <= f.strategy || f.level < 2 ? 0 : f.level < 6 ? 1 : f.level === 6 ? 2 : 3) << 6, f.strstart !== 0 && (U |= 32), U += 31 - U % 31, f.status = T, $(f, U), f.strstart !== 0 && ($(f, t.adler >>> 16), $(f, 65535 & t.adler)), t.adler = 1;
        }
        if (f.status === 69) if (f.gzhead.extra) {
          for (u = f.pending; f.gzindex < (65535 & f.gzhead.extra.length) && (f.pending !== f.pending_buf_size || (f.gzhead.hcrc && f.pending > u && (t.adler = g(t.adler, f.pending_buf, f.pending - u, u)), B(t), u = f.pending, f.pending !== f.pending_buf_size)); ) J(f, 255 & f.gzhead.extra[f.gzindex]), f.gzindex++;
          f.gzhead.hcrc && f.pending > u && (t.adler = g(t.adler, f.pending_buf, f.pending - u, u)), f.gzindex === f.gzhead.extra.length && (f.gzindex = 0, f.status = 73);
        } else f.status = 73;
        if (f.status === 73) if (f.gzhead.name) {
          u = f.pending;
          do {
            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > u && (t.adler = g(t.adler, f.pending_buf, f.pending - u, u)), B(t), u = f.pending, f.pending === f.pending_buf_size)) {
              k = 1;
              break;
            }
            k = f.gzindex < f.gzhead.name.length ? 255 & f.gzhead.name.charCodeAt(f.gzindex++) : 0, J(f, k);
          } while (k !== 0);
          f.gzhead.hcrc && f.pending > u && (t.adler = g(t.adler, f.pending_buf, f.pending - u, u)), k === 0 && (f.gzindex = 0, f.status = 91);
        } else f.status = 91;
        if (f.status === 91) if (f.gzhead.comment) {
          u = f.pending;
          do {
            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > u && (t.adler = g(t.adler, f.pending_buf, f.pending - u, u)), B(t), u = f.pending, f.pending === f.pending_buf_size)) {
              k = 1;
              break;
            }
            k = f.gzindex < f.gzhead.comment.length ? 255 & f.gzhead.comment.charCodeAt(f.gzindex++) : 0, J(f, k);
          } while (k !== 0);
          f.gzhead.hcrc && f.pending > u && (t.adler = g(t.adler, f.pending_buf, f.pending - u, u)), k === 0 && (f.status = 103);
        } else f.status = 103;
        if (f.status === 103 && (f.gzhead.hcrc ? (f.pending + 2 > f.pending_buf_size && B(t), f.pending + 2 <= f.pending_buf_size && (J(f, 255 & t.adler), J(f, t.adler >> 8 & 255), t.adler = 0, f.status = T)) : f.status = T), f.pending !== 0) {
          if (B(t), t.avail_out === 0) return f.last_flush = -1, i;
        } else if (t.avail_in === 0 && W(N) <= W(R) && N !== b) return Q(t, -5);
        if (f.status === 666 && t.avail_in !== 0) return Q(t, -5);
        if (t.avail_in !== 0 || f.lookahead !== 0 || N !== _ && f.status !== 666) {
          var j = f.strategy === 2 ? function(O, M) {
            for (var Y; ; ) {
              if (O.lookahead === 0 && (st(O), O.lookahead === 0)) {
                if (M === _) return e;
                break;
              }
              if (O.match_length = 0, Y = r._tr_tally(O, 0, O.window[O.strstart]), O.lookahead--, O.strstart++, Y && (I(O, !1), O.strm.avail_out === 0)) return e;
            }
            return O.insert = 0, M === b ? (I(O, !0), O.strm.avail_out === 0 ? V : L) : O.last_lit && (I(O, !1), O.strm.avail_out === 0) ? e : P;
          }(f, N) : f.strategy === 3 ? function(O, M) {
            for (var Y, H, q, at, nt = O.window; ; ) {
              if (O.lookahead <= z) {
                if (st(O), O.lookahead <= z && M === _) return e;
                if (O.lookahead === 0) break;
              }
              if (O.match_length = 0, O.lookahead >= C && 0 < O.strstart && (H = nt[q = O.strstart - 1]) === nt[++q] && H === nt[++q] && H === nt[++q]) {
                at = O.strstart + z;
                do
                  ;
                while (H === nt[++q] && H === nt[++q] && H === nt[++q] && H === nt[++q] && H === nt[++q] && H === nt[++q] && H === nt[++q] && H === nt[++q] && q < at);
                O.match_length = z - (at - q), O.match_length > O.lookahead && (O.match_length = O.lookahead);
              }
              if (O.match_length >= C ? (Y = r._tr_tally(O, 1, O.match_length - C), O.lookahead -= O.match_length, O.strstart += O.match_length, O.match_length = 0) : (Y = r._tr_tally(O, 0, O.window[O.strstart]), O.lookahead--, O.strstart++), Y && (I(O, !1), O.strm.avail_out === 0)) return e;
            }
            return O.insert = 0, M === b ? (I(O, !0), O.strm.avail_out === 0 ? V : L) : O.last_lit && (I(O, !1), O.strm.avail_out === 0) ? e : P;
          }(f, N) : a[f.level].func(f, N);
          if (j !== V && j !== L || (f.status = 666), j === e || j === V) return t.avail_out === 0 && (f.last_flush = -1), i;
          if (j === P && (N === 1 ? r._tr_align(f) : N !== 5 && (r._tr_stored_block(f, 0, 0, !1), N === 3 && (tt(f.head), f.lookahead === 0 && (f.strstart = 0, f.block_start = 0, f.insert = 0))), B(t), t.avail_out === 0)) return f.last_flush = -1, i;
        }
        return N !== b ? i : f.wrap <= 0 ? 1 : (f.wrap === 2 ? (J(f, 255 & t.adler), J(f, t.adler >> 8 & 255), J(f, t.adler >> 16 & 255), J(f, t.adler >> 24 & 255), J(f, 255 & t.total_in), J(f, t.total_in >> 8 & 255), J(f, t.total_in >> 16 & 255), J(f, t.total_in >> 24 & 255)) : ($(f, t.adler >>> 16), $(f, 65535 & t.adler)), B(t), 0 < f.wrap && (f.wrap = -f.wrap), f.pending !== 0 ? i : 1);
      }, v.deflateEnd = function(t) {
        var N;
        return t && t.state ? (N = t.state.status) !== h && N !== 69 && N !== 73 && N !== 91 && N !== 103 && N !== T && N !== 666 ? Q(t, d) : (t.state = null, N === T ? Q(t, -3) : i) : d;
      }, v.deflateSetDictionary = function(t, N) {
        var R, f, u, k, U, j, O, M, Y = N.length;
        if (!t || !t.state || (k = (R = t.state).wrap) === 2 || k === 1 && R.status !== h || R.lookahead) return d;
        for (k === 1 && (t.adler = l(t.adler, N, Y, 0)), R.wrap = 0, Y >= R.w_size && (k === 0 && (tt(R.head), R.strstart = 0, R.block_start = 0, R.insert = 0), M = new o.Buf8(R.w_size), o.arraySet(M, N, Y - R.w_size, R.w_size, 0), N = M, Y = R.w_size), U = t.avail_in, j = t.next_in, O = t.input, t.avail_in = Y, t.next_in = 0, t.input = N, st(R); R.lookahead >= C; ) {
          for (f = R.strstart, u = R.lookahead - (C - 1); R.ins_h = (R.ins_h << R.hash_shift ^ R.window[f + C - 1]) & R.hash_mask, R.prev[f & R.w_mask] = R.head[R.ins_h], R.head[R.ins_h] = f, f++, --u; ) ;
          R.strstart = f, R.lookahead = C - 1, st(R);
        }
        return R.strstart += R.lookahead, R.block_start = R.strstart, R.insert = R.lookahead, R.lookahead = 0, R.match_length = R.prev_length = C - 1, R.match_available = 0, t.next_in = j, t.input = O, t.avail_in = U, R.wrap = k, i;
      }, v.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(p, A, v) {
      A.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(p, A, v) {
      A.exports = function(a, o) {
        var r, l, g, y, _, b, i, d, n, c, s, m, w, x, S, F, E, D, C, z, X, h, T, e, P;
        r = a.state, l = a.next_in, e = a.input, g = l + (a.avail_in - 5), y = a.next_out, P = a.output, _ = y - (o - a.avail_out), b = y + (a.avail_out - 257), i = r.dmax, d = r.wsize, n = r.whave, c = r.wnext, s = r.window, m = r.hold, w = r.bits, x = r.lencode, S = r.distcode, F = (1 << r.lenbits) - 1, E = (1 << r.distbits) - 1;
        t: do {
          w < 15 && (m += e[l++] << w, w += 8, m += e[l++] << w, w += 8), D = x[m & F];
          e: for (; ; ) {
            if (m >>>= C = D >>> 24, w -= C, (C = D >>> 16 & 255) === 0) P[y++] = 65535 & D;
            else {
              if (!(16 & C)) {
                if (!(64 & C)) {
                  D = x[(65535 & D) + (m & (1 << C) - 1)];
                  continue e;
                }
                if (32 & C) {
                  r.mode = 12;
                  break t;
                }
                a.msg = "invalid literal/length code", r.mode = 30;
                break t;
              }
              z = 65535 & D, (C &= 15) && (w < C && (m += e[l++] << w, w += 8), z += m & (1 << C) - 1, m >>>= C, w -= C), w < 15 && (m += e[l++] << w, w += 8, m += e[l++] << w, w += 8), D = S[m & E];
              r: for (; ; ) {
                if (m >>>= C = D >>> 24, w -= C, !(16 & (C = D >>> 16 & 255))) {
                  if (!(64 & C)) {
                    D = S[(65535 & D) + (m & (1 << C) - 1)];
                    continue r;
                  }
                  a.msg = "invalid distance code", r.mode = 30;
                  break t;
                }
                if (X = 65535 & D, w < (C &= 15) && (m += e[l++] << w, (w += 8) < C && (m += e[l++] << w, w += 8)), i < (X += m & (1 << C) - 1)) {
                  a.msg = "invalid distance too far back", r.mode = 30;
                  break t;
                }
                if (m >>>= C, w -= C, (C = y - _) < X) {
                  if (n < (C = X - C) && r.sane) {
                    a.msg = "invalid distance too far back", r.mode = 30;
                    break t;
                  }
                  if (T = s, (h = 0) === c) {
                    if (h += d - C, C < z) {
                      for (z -= C; P[y++] = s[h++], --C; ) ;
                      h = y - X, T = P;
                    }
                  } else if (c < C) {
                    if (h += d + c - C, (C -= c) < z) {
                      for (z -= C; P[y++] = s[h++], --C; ) ;
                      if (h = 0, c < z) {
                        for (z -= C = c; P[y++] = s[h++], --C; ) ;
                        h = y - X, T = P;
                      }
                    }
                  } else if (h += c - C, C < z) {
                    for (z -= C; P[y++] = s[h++], --C; ) ;
                    h = y - X, T = P;
                  }
                  for (; 2 < z; ) P[y++] = T[h++], P[y++] = T[h++], P[y++] = T[h++], z -= 3;
                  z && (P[y++] = T[h++], 1 < z && (P[y++] = T[h++]));
                } else {
                  for (h = y - X; P[y++] = P[h++], P[y++] = P[h++], P[y++] = P[h++], 2 < (z -= 3); ) ;
                  z && (P[y++] = P[h++], 1 < z && (P[y++] = P[h++]));
                }
                break;
              }
            }
            break;
          }
        } while (l < g && y < b);
        l -= z = w >> 3, m &= (1 << (w -= z << 3)) - 1, a.next_in = l, a.next_out = y, a.avail_in = l < g ? g - l + 5 : 5 - (l - g), a.avail_out = y < b ? b - y + 257 : 257 - (y - b), r.hold = m, r.bits = w;
      };
    }, {}], 49: [function(p, A, v) {
      var a = p("../utils/common"), o = p("./adler32"), r = p("./crc32"), l = p("./inffast"), g = p("./inftrees"), y = 1, _ = 2, b = 0, i = -2, d = 1, n = 852, c = 592;
      function s(h) {
        return (h >>> 24 & 255) + (h >>> 8 & 65280) + ((65280 & h) << 8) + ((255 & h) << 24);
      }
      function m() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new a.Buf16(320), this.work = new a.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function w(h) {
        var T;
        return h && h.state ? (T = h.state, h.total_in = h.total_out = T.total = 0, h.msg = "", T.wrap && (h.adler = 1 & T.wrap), T.mode = d, T.last = 0, T.havedict = 0, T.dmax = 32768, T.head = null, T.hold = 0, T.bits = 0, T.lencode = T.lendyn = new a.Buf32(n), T.distcode = T.distdyn = new a.Buf32(c), T.sane = 1, T.back = -1, b) : i;
      }
      function x(h) {
        var T;
        return h && h.state ? ((T = h.state).wsize = 0, T.whave = 0, T.wnext = 0, w(h)) : i;
      }
      function S(h, T) {
        var e, P;
        return h && h.state ? (P = h.state, T < 0 ? (e = 0, T = -T) : (e = 1 + (T >> 4), T < 48 && (T &= 15)), T && (T < 8 || 15 < T) ? i : (P.window !== null && P.wbits !== T && (P.window = null), P.wrap = e, P.wbits = T, x(h))) : i;
      }
      function F(h, T) {
        var e, P;
        return h ? (P = new m(), (h.state = P).window = null, (e = S(h, T)) !== b && (h.state = null), e) : i;
      }
      var E, D, C = !0;
      function z(h) {
        if (C) {
          var T;
          for (E = new a.Buf32(512), D = new a.Buf32(32), T = 0; T < 144; ) h.lens[T++] = 8;
          for (; T < 256; ) h.lens[T++] = 9;
          for (; T < 280; ) h.lens[T++] = 7;
          for (; T < 288; ) h.lens[T++] = 8;
          for (g(y, h.lens, 0, 288, E, 0, h.work, { bits: 9 }), T = 0; T < 32; ) h.lens[T++] = 5;
          g(_, h.lens, 0, 32, D, 0, h.work, { bits: 5 }), C = !1;
        }
        h.lencode = E, h.lenbits = 9, h.distcode = D, h.distbits = 5;
      }
      function X(h, T, e, P) {
        var V, L = h.state;
        return L.window === null && (L.wsize = 1 << L.wbits, L.wnext = 0, L.whave = 0, L.window = new a.Buf8(L.wsize)), P >= L.wsize ? (a.arraySet(L.window, T, e - L.wsize, L.wsize, 0), L.wnext = 0, L.whave = L.wsize) : (P < (V = L.wsize - L.wnext) && (V = P), a.arraySet(L.window, T, e - P, V, L.wnext), (P -= V) ? (a.arraySet(L.window, T, e - P, P, 0), L.wnext = P, L.whave = L.wsize) : (L.wnext += V, L.wnext === L.wsize && (L.wnext = 0), L.whave < L.wsize && (L.whave += V))), 0;
      }
      v.inflateReset = x, v.inflateReset2 = S, v.inflateResetKeep = w, v.inflateInit = function(h) {
        return F(h, 15);
      }, v.inflateInit2 = F, v.inflate = function(h, T) {
        var e, P, V, L, Q, W, tt, B, I, J, $, G, st, ht, rt, it, ct, ot, _t, gt, t, N, R, f, u = 0, k = new a.Buf8(4), U = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!h || !h.state || !h.output || !h.input && h.avail_in !== 0) return i;
        (e = h.state).mode === 12 && (e.mode = 13), Q = h.next_out, V = h.output, tt = h.avail_out, L = h.next_in, P = h.input, W = h.avail_in, B = e.hold, I = e.bits, J = W, $ = tt, N = b;
        t: for (; ; ) switch (e.mode) {
          case d:
            if (e.wrap === 0) {
              e.mode = 13;
              break;
            }
            for (; I < 16; ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            if (2 & e.wrap && B === 35615) {
              k[e.check = 0] = 255 & B, k[1] = B >>> 8 & 255, e.check = r(e.check, k, 2, 0), I = B = 0, e.mode = 2;
              break;
            }
            if (e.flags = 0, e.head && (e.head.done = !1), !(1 & e.wrap) || (((255 & B) << 8) + (B >> 8)) % 31) {
              h.msg = "incorrect header check", e.mode = 30;
              break;
            }
            if ((15 & B) != 8) {
              h.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (I -= 4, t = 8 + (15 & (B >>>= 4)), e.wbits === 0) e.wbits = t;
            else if (t > e.wbits) {
              h.msg = "invalid window size", e.mode = 30;
              break;
            }
            e.dmax = 1 << t, h.adler = e.check = 1, e.mode = 512 & B ? 10 : 12, I = B = 0;
            break;
          case 2:
            for (; I < 16; ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            if (e.flags = B, (255 & e.flags) != 8) {
              h.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (57344 & e.flags) {
              h.msg = "unknown header flags set", e.mode = 30;
              break;
            }
            e.head && (e.head.text = B >> 8 & 1), 512 & e.flags && (k[0] = 255 & B, k[1] = B >>> 8 & 255, e.check = r(e.check, k, 2, 0)), I = B = 0, e.mode = 3;
          case 3:
            for (; I < 32; ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            e.head && (e.head.time = B), 512 & e.flags && (k[0] = 255 & B, k[1] = B >>> 8 & 255, k[2] = B >>> 16 & 255, k[3] = B >>> 24 & 255, e.check = r(e.check, k, 4, 0)), I = B = 0, e.mode = 4;
          case 4:
            for (; I < 16; ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            e.head && (e.head.xflags = 255 & B, e.head.os = B >> 8), 512 & e.flags && (k[0] = 255 & B, k[1] = B >>> 8 & 255, e.check = r(e.check, k, 2, 0)), I = B = 0, e.mode = 5;
          case 5:
            if (1024 & e.flags) {
              for (; I < 16; ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              e.length = B, e.head && (e.head.extra_len = B), 512 & e.flags && (k[0] = 255 & B, k[1] = B >>> 8 & 255, e.check = r(e.check, k, 2, 0)), I = B = 0;
            } else e.head && (e.head.extra = null);
            e.mode = 6;
          case 6:
            if (1024 & e.flags && (W < (G = e.length) && (G = W), G && (e.head && (t = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Array(e.head.extra_len)), a.arraySet(e.head.extra, P, L, G, t)), 512 & e.flags && (e.check = r(e.check, P, G, L)), W -= G, L += G, e.length -= G), e.length)) break t;
            e.length = 0, e.mode = 7;
          case 7:
            if (2048 & e.flags) {
              if (W === 0) break t;
              for (G = 0; t = P[L + G++], e.head && t && e.length < 65536 && (e.head.name += String.fromCharCode(t)), t && G < W; ) ;
              if (512 & e.flags && (e.check = r(e.check, P, G, L)), W -= G, L += G, t) break t;
            } else e.head && (e.head.name = null);
            e.length = 0, e.mode = 8;
          case 8:
            if (4096 & e.flags) {
              if (W === 0) break t;
              for (G = 0; t = P[L + G++], e.head && t && e.length < 65536 && (e.head.comment += String.fromCharCode(t)), t && G < W; ) ;
              if (512 & e.flags && (e.check = r(e.check, P, G, L)), W -= G, L += G, t) break t;
            } else e.head && (e.head.comment = null);
            e.mode = 9;
          case 9:
            if (512 & e.flags) {
              for (; I < 16; ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              if (B !== (65535 & e.check)) {
                h.msg = "header crc mismatch", e.mode = 30;
                break;
              }
              I = B = 0;
            }
            e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), h.adler = e.check = 0, e.mode = 12;
            break;
          case 10:
            for (; I < 32; ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            h.adler = e.check = s(B), I = B = 0, e.mode = 11;
          case 11:
            if (e.havedict === 0) return h.next_out = Q, h.avail_out = tt, h.next_in = L, h.avail_in = W, e.hold = B, e.bits = I, 2;
            h.adler = e.check = 1, e.mode = 12;
          case 12:
            if (T === 5 || T === 6) break t;
          case 13:
            if (e.last) {
              B >>>= 7 & I, I -= 7 & I, e.mode = 27;
              break;
            }
            for (; I < 3; ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            switch (e.last = 1 & B, I -= 1, 3 & (B >>>= 1)) {
              case 0:
                e.mode = 14;
                break;
              case 1:
                if (z(e), e.mode = 20, T !== 6) break;
                B >>>= 2, I -= 2;
                break t;
              case 2:
                e.mode = 17;
                break;
              case 3:
                h.msg = "invalid block type", e.mode = 30;
            }
            B >>>= 2, I -= 2;
            break;
          case 14:
            for (B >>>= 7 & I, I -= 7 & I; I < 32; ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            if ((65535 & B) != (B >>> 16 ^ 65535)) {
              h.msg = "invalid stored block lengths", e.mode = 30;
              break;
            }
            if (e.length = 65535 & B, I = B = 0, e.mode = 15, T === 6) break t;
          case 15:
            e.mode = 16;
          case 16:
            if (G = e.length) {
              if (W < G && (G = W), tt < G && (G = tt), G === 0) break t;
              a.arraySet(V, P, L, G, Q), W -= G, L += G, tt -= G, Q += G, e.length -= G;
              break;
            }
            e.mode = 12;
            break;
          case 17:
            for (; I < 14; ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            if (e.nlen = 257 + (31 & B), B >>>= 5, I -= 5, e.ndist = 1 + (31 & B), B >>>= 5, I -= 5, e.ncode = 4 + (15 & B), B >>>= 4, I -= 4, 286 < e.nlen || 30 < e.ndist) {
              h.msg = "too many length or distance symbols", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 18;
          case 18:
            for (; e.have < e.ncode; ) {
              for (; I < 3; ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              e.lens[U[e.have++]] = 7 & B, B >>>= 3, I -= 3;
            }
            for (; e.have < 19; ) e.lens[U[e.have++]] = 0;
            if (e.lencode = e.lendyn, e.lenbits = 7, R = { bits: e.lenbits }, N = g(0, e.lens, 0, 19, e.lencode, 0, e.work, R), e.lenbits = R.bits, N) {
              h.msg = "invalid code lengths set", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 19;
          case 19:
            for (; e.have < e.nlen + e.ndist; ) {
              for (; it = (u = e.lencode[B & (1 << e.lenbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((rt = u >>> 24) <= I); ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              if (ct < 16) B >>>= rt, I -= rt, e.lens[e.have++] = ct;
              else {
                if (ct === 16) {
                  for (f = rt + 2; I < f; ) {
                    if (W === 0) break t;
                    W--, B += P[L++] << I, I += 8;
                  }
                  if (B >>>= rt, I -= rt, e.have === 0) {
                    h.msg = "invalid bit length repeat", e.mode = 30;
                    break;
                  }
                  t = e.lens[e.have - 1], G = 3 + (3 & B), B >>>= 2, I -= 2;
                } else if (ct === 17) {
                  for (f = rt + 3; I < f; ) {
                    if (W === 0) break t;
                    W--, B += P[L++] << I, I += 8;
                  }
                  I -= rt, t = 0, G = 3 + (7 & (B >>>= rt)), B >>>= 3, I -= 3;
                } else {
                  for (f = rt + 7; I < f; ) {
                    if (W === 0) break t;
                    W--, B += P[L++] << I, I += 8;
                  }
                  I -= rt, t = 0, G = 11 + (127 & (B >>>= rt)), B >>>= 7, I -= 7;
                }
                if (e.have + G > e.nlen + e.ndist) {
                  h.msg = "invalid bit length repeat", e.mode = 30;
                  break;
                }
                for (; G--; ) e.lens[e.have++] = t;
              }
            }
            if (e.mode === 30) break;
            if (e.lens[256] === 0) {
              h.msg = "invalid code -- missing end-of-block", e.mode = 30;
              break;
            }
            if (e.lenbits = 9, R = { bits: e.lenbits }, N = g(y, e.lens, 0, e.nlen, e.lencode, 0, e.work, R), e.lenbits = R.bits, N) {
              h.msg = "invalid literal/lengths set", e.mode = 30;
              break;
            }
            if (e.distbits = 6, e.distcode = e.distdyn, R = { bits: e.distbits }, N = g(_, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, R), e.distbits = R.bits, N) {
              h.msg = "invalid distances set", e.mode = 30;
              break;
            }
            if (e.mode = 20, T === 6) break t;
          case 20:
            e.mode = 21;
          case 21:
            if (6 <= W && 258 <= tt) {
              h.next_out = Q, h.avail_out = tt, h.next_in = L, h.avail_in = W, e.hold = B, e.bits = I, l(h, $), Q = h.next_out, V = h.output, tt = h.avail_out, L = h.next_in, P = h.input, W = h.avail_in, B = e.hold, I = e.bits, e.mode === 12 && (e.back = -1);
              break;
            }
            for (e.back = 0; it = (u = e.lencode[B & (1 << e.lenbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((rt = u >>> 24) <= I); ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            if (it && !(240 & it)) {
              for (ot = rt, _t = it, gt = ct; it = (u = e.lencode[gt + ((B & (1 << ot + _t) - 1) >> ot)]) >>> 16 & 255, ct = 65535 & u, !(ot + (rt = u >>> 24) <= I); ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              B >>>= ot, I -= ot, e.back += ot;
            }
            if (B >>>= rt, I -= rt, e.back += rt, e.length = ct, it === 0) {
              e.mode = 26;
              break;
            }
            if (32 & it) {
              e.back = -1, e.mode = 12;
              break;
            }
            if (64 & it) {
              h.msg = "invalid literal/length code", e.mode = 30;
              break;
            }
            e.extra = 15 & it, e.mode = 22;
          case 22:
            if (e.extra) {
              for (f = e.extra; I < f; ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              e.length += B & (1 << e.extra) - 1, B >>>= e.extra, I -= e.extra, e.back += e.extra;
            }
            e.was = e.length, e.mode = 23;
          case 23:
            for (; it = (u = e.distcode[B & (1 << e.distbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((rt = u >>> 24) <= I); ) {
              if (W === 0) break t;
              W--, B += P[L++] << I, I += 8;
            }
            if (!(240 & it)) {
              for (ot = rt, _t = it, gt = ct; it = (u = e.distcode[gt + ((B & (1 << ot + _t) - 1) >> ot)]) >>> 16 & 255, ct = 65535 & u, !(ot + (rt = u >>> 24) <= I); ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              B >>>= ot, I -= ot, e.back += ot;
            }
            if (B >>>= rt, I -= rt, e.back += rt, 64 & it) {
              h.msg = "invalid distance code", e.mode = 30;
              break;
            }
            e.offset = ct, e.extra = 15 & it, e.mode = 24;
          case 24:
            if (e.extra) {
              for (f = e.extra; I < f; ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              e.offset += B & (1 << e.extra) - 1, B >>>= e.extra, I -= e.extra, e.back += e.extra;
            }
            if (e.offset > e.dmax) {
              h.msg = "invalid distance too far back", e.mode = 30;
              break;
            }
            e.mode = 25;
          case 25:
            if (tt === 0) break t;
            if (G = $ - tt, e.offset > G) {
              if ((G = e.offset - G) > e.whave && e.sane) {
                h.msg = "invalid distance too far back", e.mode = 30;
                break;
              }
              st = G > e.wnext ? (G -= e.wnext, e.wsize - G) : e.wnext - G, G > e.length && (G = e.length), ht = e.window;
            } else ht = V, st = Q - e.offset, G = e.length;
            for (tt < G && (G = tt), tt -= G, e.length -= G; V[Q++] = ht[st++], --G; ) ;
            e.length === 0 && (e.mode = 21);
            break;
          case 26:
            if (tt === 0) break t;
            V[Q++] = e.length, tt--, e.mode = 21;
            break;
          case 27:
            if (e.wrap) {
              for (; I < 32; ) {
                if (W === 0) break t;
                W--, B |= P[L++] << I, I += 8;
              }
              if ($ -= tt, h.total_out += $, e.total += $, $ && (h.adler = e.check = e.flags ? r(e.check, V, $, Q - $) : o(e.check, V, $, Q - $)), $ = tt, (e.flags ? B : s(B)) !== e.check) {
                h.msg = "incorrect data check", e.mode = 30;
                break;
              }
              I = B = 0;
            }
            e.mode = 28;
          case 28:
            if (e.wrap && e.flags) {
              for (; I < 32; ) {
                if (W === 0) break t;
                W--, B += P[L++] << I, I += 8;
              }
              if (B !== (4294967295 & e.total)) {
                h.msg = "incorrect length check", e.mode = 30;
                break;
              }
              I = B = 0;
            }
            e.mode = 29;
          case 29:
            N = 1;
            break t;
          case 30:
            N = -3;
            break t;
          case 31:
            return -4;
          case 32:
          default:
            return i;
        }
        return h.next_out = Q, h.avail_out = tt, h.next_in = L, h.avail_in = W, e.hold = B, e.bits = I, (e.wsize || $ !== h.avail_out && e.mode < 30 && (e.mode < 27 || T !== 4)) && X(h, h.output, h.next_out, $ - h.avail_out) ? (e.mode = 31, -4) : (J -= h.avail_in, $ -= h.avail_out, h.total_in += J, h.total_out += $, e.total += $, e.wrap && $ && (h.adler = e.check = e.flags ? r(e.check, V, $, h.next_out - $) : o(e.check, V, $, h.next_out - $)), h.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === 12 ? 128 : 0) + (e.mode === 20 || e.mode === 15 ? 256 : 0), (J == 0 && $ === 0 || T === 4) && N === b && (N = -5), N);
      }, v.inflateEnd = function(h) {
        if (!h || !h.state) return i;
        var T = h.state;
        return T.window && (T.window = null), h.state = null, b;
      }, v.inflateGetHeader = function(h, T) {
        var e;
        return h && h.state && 2 & (e = h.state).wrap ? ((e.head = T).done = !1, b) : i;
      }, v.inflateSetDictionary = function(h, T) {
        var e, P = T.length;
        return h && h.state ? (e = h.state).wrap !== 0 && e.mode !== 11 ? i : e.mode === 11 && o(1, T, P, 0) !== e.check ? -3 : X(h, T, P, P) ? (e.mode = 31, -4) : (e.havedict = 1, b) : i;
      }, v.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(p, A, v) {
      var a = p("../utils/common"), o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], r = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], g = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      A.exports = function(y, _, b, i, d, n, c, s) {
        var m, w, x, S, F, E, D, C, z, X = s.bits, h = 0, T = 0, e = 0, P = 0, V = 0, L = 0, Q = 0, W = 0, tt = 0, B = 0, I = null, J = 0, $ = new a.Buf16(16), G = new a.Buf16(16), st = null, ht = 0;
        for (h = 0; h <= 15; h++) $[h] = 0;
        for (T = 0; T < i; T++) $[_[b + T]]++;
        for (V = X, P = 15; 1 <= P && $[P] === 0; P--) ;
        if (P < V && (V = P), P === 0) return d[n++] = 20971520, d[n++] = 20971520, s.bits = 1, 0;
        for (e = 1; e < P && $[e] === 0; e++) ;
        for (V < e && (V = e), h = W = 1; h <= 15; h++) if (W <<= 1, (W -= $[h]) < 0) return -1;
        if (0 < W && (y === 0 || P !== 1)) return -1;
        for (G[1] = 0, h = 1; h < 15; h++) G[h + 1] = G[h] + $[h];
        for (T = 0; T < i; T++) _[b + T] !== 0 && (c[G[_[b + T]]++] = T);
        if (E = y === 0 ? (I = st = c, 19) : y === 1 ? (I = o, J -= 257, st = r, ht -= 257, 256) : (I = l, st = g, -1), h = e, F = n, Q = T = B = 0, x = -1, S = (tt = 1 << (L = V)) - 1, y === 1 && 852 < tt || y === 2 && 592 < tt) return 1;
        for (; ; ) {
          for (D = h - Q, z = c[T] < E ? (C = 0, c[T]) : c[T] > E ? (C = st[ht + c[T]], I[J + c[T]]) : (C = 96, 0), m = 1 << h - Q, e = w = 1 << L; d[F + (B >> Q) + (w -= m)] = D << 24 | C << 16 | z | 0, w !== 0; ) ;
          for (m = 1 << h - 1; B & m; ) m >>= 1;
          if (m !== 0 ? (B &= m - 1, B += m) : B = 0, T++, --$[h] == 0) {
            if (h === P) break;
            h = _[b + c[T]];
          }
          if (V < h && (B & S) !== x) {
            for (Q === 0 && (Q = V), F += e, W = 1 << (L = h - Q); L + Q < P && !((W -= $[L + Q]) <= 0); ) L++, W <<= 1;
            if (tt += 1 << L, y === 1 && 852 < tt || y === 2 && 592 < tt) return 1;
            d[x = B & S] = V << 24 | L << 16 | F - n | 0;
          }
        }
        return B !== 0 && (d[F + B] = h - Q << 24 | 64 << 16 | 0), s.bits = V, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(p, A, v) {
      A.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(p, A, v) {
      var a = p("../utils/common"), o = 0, r = 1;
      function l(u) {
        for (var k = u.length; 0 <= --k; ) u[k] = 0;
      }
      var g = 0, y = 29, _ = 256, b = _ + 1 + y, i = 30, d = 19, n = 2 * b + 1, c = 15, s = 16, m = 7, w = 256, x = 16, S = 17, F = 18, E = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], D = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], X = new Array(2 * (b + 2));
      l(X);
      var h = new Array(2 * i);
      l(h);
      var T = new Array(512);
      l(T);
      var e = new Array(256);
      l(e);
      var P = new Array(y);
      l(P);
      var V, L, Q, W = new Array(i);
      function tt(u, k, U, j, O) {
        this.static_tree = u, this.extra_bits = k, this.extra_base = U, this.elems = j, this.max_length = O, this.has_stree = u && u.length;
      }
      function B(u, k) {
        this.dyn_tree = u, this.max_code = 0, this.stat_desc = k;
      }
      function I(u) {
        return u < 256 ? T[u] : T[256 + (u >>> 7)];
      }
      function J(u, k) {
        u.pending_buf[u.pending++] = 255 & k, u.pending_buf[u.pending++] = k >>> 8 & 255;
      }
      function $(u, k, U) {
        u.bi_valid > s - U ? (u.bi_buf |= k << u.bi_valid & 65535, J(u, u.bi_buf), u.bi_buf = k >> s - u.bi_valid, u.bi_valid += U - s) : (u.bi_buf |= k << u.bi_valid & 65535, u.bi_valid += U);
      }
      function G(u, k, U) {
        $(u, U[2 * k], U[2 * k + 1]);
      }
      function st(u, k) {
        for (var U = 0; U |= 1 & u, u >>>= 1, U <<= 1, 0 < --k; ) ;
        return U >>> 1;
      }
      function ht(u, k, U) {
        var j, O, M = new Array(c + 1), Y = 0;
        for (j = 1; j <= c; j++) M[j] = Y = Y + U[j - 1] << 1;
        for (O = 0; O <= k; O++) {
          var H = u[2 * O + 1];
          H !== 0 && (u[2 * O] = st(M[H]++, H));
        }
      }
      function rt(u) {
        var k;
        for (k = 0; k < b; k++) u.dyn_ltree[2 * k] = 0;
        for (k = 0; k < i; k++) u.dyn_dtree[2 * k] = 0;
        for (k = 0; k < d; k++) u.bl_tree[2 * k] = 0;
        u.dyn_ltree[2 * w] = 1, u.opt_len = u.static_len = 0, u.last_lit = u.matches = 0;
      }
      function it(u) {
        8 < u.bi_valid ? J(u, u.bi_buf) : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf), u.bi_buf = 0, u.bi_valid = 0;
      }
      function ct(u, k, U, j) {
        var O = 2 * k, M = 2 * U;
        return u[O] < u[M] || u[O] === u[M] && j[k] <= j[U];
      }
      function ot(u, k, U) {
        for (var j = u.heap[U], O = U << 1; O <= u.heap_len && (O < u.heap_len && ct(k, u.heap[O + 1], u.heap[O], u.depth) && O++, !ct(k, j, u.heap[O], u.depth)); ) u.heap[U] = u.heap[O], U = O, O <<= 1;
        u.heap[U] = j;
      }
      function _t(u, k, U) {
        var j, O, M, Y, H = 0;
        if (u.last_lit !== 0) for (; j = u.pending_buf[u.d_buf + 2 * H] << 8 | u.pending_buf[u.d_buf + 2 * H + 1], O = u.pending_buf[u.l_buf + H], H++, j === 0 ? G(u, O, k) : (G(u, (M = e[O]) + _ + 1, k), (Y = E[M]) !== 0 && $(u, O -= P[M], Y), G(u, M = I(--j), U), (Y = D[M]) !== 0 && $(u, j -= W[M], Y)), H < u.last_lit; ) ;
        G(u, w, k);
      }
      function gt(u, k) {
        var U, j, O, M = k.dyn_tree, Y = k.stat_desc.static_tree, H = k.stat_desc.has_stree, q = k.stat_desc.elems, at = -1;
        for (u.heap_len = 0, u.heap_max = n, U = 0; U < q; U++) M[2 * U] !== 0 ? (u.heap[++u.heap_len] = at = U, u.depth[U] = 0) : M[2 * U + 1] = 0;
        for (; u.heap_len < 2; ) M[2 * (O = u.heap[++u.heap_len] = at < 2 ? ++at : 0)] = 1, u.depth[O] = 0, u.opt_len--, H && (u.static_len -= Y[2 * O + 1]);
        for (k.max_code = at, U = u.heap_len >> 1; 1 <= U; U--) ot(u, M, U);
        for (O = q; U = u.heap[1], u.heap[1] = u.heap[u.heap_len--], ot(u, M, 1), j = u.heap[1], u.heap[--u.heap_max] = U, u.heap[--u.heap_max] = j, M[2 * O] = M[2 * U] + M[2 * j], u.depth[O] = (u.depth[U] >= u.depth[j] ? u.depth[U] : u.depth[j]) + 1, M[2 * U + 1] = M[2 * j + 1] = O, u.heap[1] = O++, ot(u, M, 1), 2 <= u.heap_len; ) ;
        u.heap[--u.heap_max] = u.heap[1], function(nt, mt) {
          var xt, bt, St, lt, Ct, Bt, vt = mt.dyn_tree, Rt = mt.max_code, Mt = mt.stat_desc.static_tree, Zt = mt.stat_desc.has_stree, Xt = mt.stat_desc.extra_bits, Pt = mt.stat_desc.extra_base, Et = mt.stat_desc.max_length, zt = 0;
          for (lt = 0; lt <= c; lt++) nt.bl_count[lt] = 0;
          for (vt[2 * nt.heap[nt.heap_max] + 1] = 0, xt = nt.heap_max + 1; xt < n; xt++) Et < (lt = vt[2 * vt[2 * (bt = nt.heap[xt]) + 1] + 1] + 1) && (lt = Et, zt++), vt[2 * bt + 1] = lt, Rt < bt || (nt.bl_count[lt]++, Ct = 0, Pt <= bt && (Ct = Xt[bt - Pt]), Bt = vt[2 * bt], nt.opt_len += Bt * (lt + Ct), Zt && (nt.static_len += Bt * (Mt[2 * bt + 1] + Ct)));
          if (zt !== 0) {
            do {
              for (lt = Et - 1; nt.bl_count[lt] === 0; ) lt--;
              nt.bl_count[lt]--, nt.bl_count[lt + 1] += 2, nt.bl_count[Et]--, zt -= 2;
            } while (0 < zt);
            for (lt = Et; lt !== 0; lt--) for (bt = nt.bl_count[lt]; bt !== 0; ) Rt < (St = nt.heap[--xt]) || (vt[2 * St + 1] !== lt && (nt.opt_len += (lt - vt[2 * St + 1]) * vt[2 * St], vt[2 * St + 1] = lt), bt--);
          }
        }(u, k), ht(M, at, u.bl_count);
      }
      function t(u, k, U) {
        var j, O, M = -1, Y = k[1], H = 0, q = 7, at = 4;
        for (Y === 0 && (q = 138, at = 3), k[2 * (U + 1) + 1] = 65535, j = 0; j <= U; j++) O = Y, Y = k[2 * (j + 1) + 1], ++H < q && O === Y || (H < at ? u.bl_tree[2 * O] += H : O !== 0 ? (O !== M && u.bl_tree[2 * O]++, u.bl_tree[2 * x]++) : H <= 10 ? u.bl_tree[2 * S]++ : u.bl_tree[2 * F]++, M = O, at = (H = 0) === Y ? (q = 138, 3) : O === Y ? (q = 6, 3) : (q = 7, 4));
      }
      function N(u, k, U) {
        var j, O, M = -1, Y = k[1], H = 0, q = 7, at = 4;
        for (Y === 0 && (q = 138, at = 3), j = 0; j <= U; j++) if (O = Y, Y = k[2 * (j + 1) + 1], !(++H < q && O === Y)) {
          if (H < at) for (; G(u, O, u.bl_tree), --H != 0; ) ;
          else O !== 0 ? (O !== M && (G(u, O, u.bl_tree), H--), G(u, x, u.bl_tree), $(u, H - 3, 2)) : H <= 10 ? (G(u, S, u.bl_tree), $(u, H - 3, 3)) : (G(u, F, u.bl_tree), $(u, H - 11, 7));
          M = O, at = (H = 0) === Y ? (q = 138, 3) : O === Y ? (q = 6, 3) : (q = 7, 4);
        }
      }
      l(W);
      var R = !1;
      function f(u, k, U, j) {
        $(u, (g << 1) + (j ? 1 : 0), 3), function(O, M, Y, H) {
          it(O), J(O, Y), J(O, ~Y), a.arraySet(O.pending_buf, O.window, M, Y, O.pending), O.pending += Y;
        }(u, k, U);
      }
      v._tr_init = function(u) {
        R || (function() {
          var k, U, j, O, M, Y = new Array(c + 1);
          for (O = j = 0; O < y - 1; O++) for (P[O] = j, k = 0; k < 1 << E[O]; k++) e[j++] = O;
          for (e[j - 1] = O, O = M = 0; O < 16; O++) for (W[O] = M, k = 0; k < 1 << D[O]; k++) T[M++] = O;
          for (M >>= 7; O < i; O++) for (W[O] = M << 7, k = 0; k < 1 << D[O] - 7; k++) T[256 + M++] = O;
          for (U = 0; U <= c; U++) Y[U] = 0;
          for (k = 0; k <= 143; ) X[2 * k + 1] = 8, k++, Y[8]++;
          for (; k <= 255; ) X[2 * k + 1] = 9, k++, Y[9]++;
          for (; k <= 279; ) X[2 * k + 1] = 7, k++, Y[7]++;
          for (; k <= 287; ) X[2 * k + 1] = 8, k++, Y[8]++;
          for (ht(X, b + 1, Y), k = 0; k < i; k++) h[2 * k + 1] = 5, h[2 * k] = st(k, 5);
          V = new tt(X, E, _ + 1, b, c), L = new tt(h, D, 0, i, c), Q = new tt(new Array(0), C, 0, d, m);
        }(), R = !0), u.l_desc = new B(u.dyn_ltree, V), u.d_desc = new B(u.dyn_dtree, L), u.bl_desc = new B(u.bl_tree, Q), u.bi_buf = 0, u.bi_valid = 0, rt(u);
      }, v._tr_stored_block = f, v._tr_flush_block = function(u, k, U, j) {
        var O, M, Y = 0;
        0 < u.level ? (u.strm.data_type === 2 && (u.strm.data_type = function(H) {
          var q, at = 4093624447;
          for (q = 0; q <= 31; q++, at >>>= 1) if (1 & at && H.dyn_ltree[2 * q] !== 0) return o;
          if (H.dyn_ltree[18] !== 0 || H.dyn_ltree[20] !== 0 || H.dyn_ltree[26] !== 0) return r;
          for (q = 32; q < _; q++) if (H.dyn_ltree[2 * q] !== 0) return r;
          return o;
        }(u)), gt(u, u.l_desc), gt(u, u.d_desc), Y = function(H) {
          var q;
          for (t(H, H.dyn_ltree, H.l_desc.max_code), t(H, H.dyn_dtree, H.d_desc.max_code), gt(H, H.bl_desc), q = d - 1; 3 <= q && H.bl_tree[2 * z[q] + 1] === 0; q--) ;
          return H.opt_len += 3 * (q + 1) + 5 + 5 + 4, q;
        }(u), O = u.opt_len + 3 + 7 >>> 3, (M = u.static_len + 3 + 7 >>> 3) <= O && (O = M)) : O = M = U + 5, U + 4 <= O && k !== -1 ? f(u, k, U, j) : u.strategy === 4 || M === O ? ($(u, 2 + (j ? 1 : 0), 3), _t(u, X, h)) : ($(u, 4 + (j ? 1 : 0), 3), function(H, q, at, nt) {
          var mt;
          for ($(H, q - 257, 5), $(H, at - 1, 5), $(H, nt - 4, 4), mt = 0; mt < nt; mt++) $(H, H.bl_tree[2 * z[mt] + 1], 3);
          N(H, H.dyn_ltree, q - 1), N(H, H.dyn_dtree, at - 1);
        }(u, u.l_desc.max_code + 1, u.d_desc.max_code + 1, Y + 1), _t(u, u.dyn_ltree, u.dyn_dtree)), rt(u), j && it(u);
      }, v._tr_tally = function(u, k, U) {
        return u.pending_buf[u.d_buf + 2 * u.last_lit] = k >>> 8 & 255, u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & k, u.pending_buf[u.l_buf + u.last_lit] = 255 & U, u.last_lit++, k === 0 ? u.dyn_ltree[2 * U]++ : (u.matches++, k--, u.dyn_ltree[2 * (e[U] + _ + 1)]++, u.dyn_dtree[2 * I(k)]++), u.last_lit === u.lit_bufsize - 1;
      }, v._tr_align = function(u) {
        $(u, 2, 3), G(u, w, X), function(k) {
          k.bi_valid === 16 ? (J(k, k.bi_buf), k.bi_buf = 0, k.bi_valid = 0) : 8 <= k.bi_valid && (k.pending_buf[k.pending++] = 255 & k.bi_buf, k.bi_buf >>= 8, k.bi_valid -= 8);
        }(u);
      };
    }, { "../utils/common": 41 }], 53: [function(p, A, v) {
      A.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(p, A, v) {
      (function(a) {
        (function(o, r) {
          if (!o.setImmediate) {
            var l, g, y, _, b = 1, i = {}, d = !1, n = o.document, c = Object.getPrototypeOf && Object.getPrototypeOf(o);
            c = c && c.setTimeout ? c : o, l = {}.toString.call(o.process) === "[object process]" ? function(x) {
              process.nextTick(function() {
                m(x);
              });
            } : function() {
              if (o.postMessage && !o.importScripts) {
                var x = !0, S = o.onmessage;
                return o.onmessage = function() {
                  x = !1;
                }, o.postMessage("", "*"), o.onmessage = S, x;
              }
            }() ? (_ = "setImmediate$" + Math.random() + "$", o.addEventListener ? o.addEventListener("message", w, !1) : o.attachEvent("onmessage", w), function(x) {
              o.postMessage(_ + x, "*");
            }) : o.MessageChannel ? ((y = new MessageChannel()).port1.onmessage = function(x) {
              m(x.data);
            }, function(x) {
              y.port2.postMessage(x);
            }) : n && "onreadystatechange" in n.createElement("script") ? (g = n.documentElement, function(x) {
              var S = n.createElement("script");
              S.onreadystatechange = function() {
                m(x), S.onreadystatechange = null, g.removeChild(S), S = null;
              }, g.appendChild(S);
            }) : function(x) {
              setTimeout(m, 0, x);
            }, c.setImmediate = function(x) {
              typeof x != "function" && (x = new Function("" + x));
              for (var S = new Array(arguments.length - 1), F = 0; F < S.length; F++) S[F] = arguments[F + 1];
              var E = { callback: x, args: S };
              return i[b] = E, l(b), b++;
            }, c.clearImmediate = s;
          }
          function s(x) {
            delete i[x];
          }
          function m(x) {
            if (d) setTimeout(m, 0, x);
            else {
              var S = i[x];
              if (S) {
                d = !0;
                try {
                  (function(F) {
                    var E = F.callback, D = F.args;
                    switch (D.length) {
                      case 0:
                        E();
                        break;
                      case 1:
                        E(D[0]);
                        break;
                      case 2:
                        E(D[0], D[1]);
                        break;
                      case 3:
                        E(D[0], D[1], D[2]);
                        break;
                      default:
                        E.apply(r, D);
                    }
                  })(S);
                } finally {
                  s(x), d = !1;
                }
              }
            }
          }
          function w(x) {
            x.source === o && typeof x.data == "string" && x.data.indexOf(_) === 0 && m(+x.data.slice(_.length));
          }
        })(typeof self > "u" ? a === void 0 ? this : a : self);
      }).call(this, typeof At < "u" ? At : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(jt);
var Vt = jt.exports;
const Kt = /* @__PURE__ */ Yt(Vt);
function qt() {
  const [Z, K] = ft(""), [p, A] = ft(!1), [v, a] = ft(""), [o, r] = ft(null);
  let l = "", g = "";
  const y = yt(null), _ = yt(null), b = {}, i = [
    "text/html",
    "text/xml",
    "application/xml",
    "application/xhtml+xml",
    "image/svg+xml"
  ], d = Tt(
    async (C) => {
      A(!0), K(""), a("Loading..."), r(null), _.current && (document.head.removeChild(_.current), URL.revokeObjectURL(_.current.href), _.current = null);
      try {
        let z;
        if (typeof C == "string") {
          const X = await fetch(C);
          if (!X.ok)
            throw new Error(
              `HTTP error! status: ${X.status} ${X.statusText}`
            );
          z = await X.arrayBuffer();
        } else C instanceof File ? z = await C.arrayBuffer() : z = C;
        if (!z || z.byteLength === 0)
          throw new Error(
            "EPUB source is empty or could not be read."
          );
        y.current = await Kt.loadAsync(z), await n();
      } catch (z) {
        const X = z instanceof Error ? z.message : "An unknown error occurred while fetching or loading the EPUB.";
        console.error("Error processing EPUB source:", z), r(X), K(""), a(""), A(!1);
      }
    },
    // eslint-disable-next-line
    []
  );
  async function n() {
    if (!y.current) throw new Error("Zip not loaded");
    const z = y.current.file("META-INF/container.xml");
    if (!z)
      throw new Error("META-INF/container.xml not found.");
    const X = await z.async("text"), h = c(X);
    if (!h)
      throw new Error("OPF file path not found in container.xml.");
    l = h.substring(0, h.lastIndexOf("/") + 1);
    const T = y.current.file(h);
    if (!T) throw new Error(`OPF file not found at path: ${h}`);
    const e = await T.async("text"), V = new DOMParser().parseFromString(e, "application/xml"), L = V.querySelector("parsererror");
    if (L)
      throw new Error(
        `Error parsing OPF file: ${L.textContent || "Unknown XML parse error"}`
      );
    s(V), await m(V);
  }
  function c(C) {
    const h = new DOMParser().parseFromString(
      C,
      "application/xml"
    ).querySelector(
      'rootfile[media-type="application/oebps-package+xml"]'
    );
    return (h == null ? void 0 : h.getAttribute("full-path")) ?? null;
  }
  function s(C) {
    const z = C.querySelector("metadata > dc\\:title") || C.querySelector("metadata > title");
    a((z == null ? void 0 : z.textContent) || "Untitled Book");
  }
  async function m(C) {
    if (!y.current) return;
    const z = {};
    C.querySelectorAll("manifest > item").forEach((e) => {
      const P = e.getAttribute("id"), V = e.getAttribute("href"), L = e.getAttribute("media-type");
      P && V && L && (z[P] = { href: decodeURIComponent(V), type: L });
    });
    const X = Array.from(
      C.querySelectorAll("spine > itemref")
    ).map((e) => e.getAttribute("idref"));
    let h = "";
    const T = /* @__PURE__ */ new Set();
    for (const e of X) {
      if (!e) continue;
      const P = z[e];
      if (P) {
        const V = l + P.href, L = y.current.file(V);
        if (L && (P.type.includes("html") || P.type.includes("xml")))
          try {
            const Q = await L.async("text"), W = await w(
              Q,
              P.type
            );
            h += `<div class="bok-chapter">${W}</div>`;
          } catch (Q) {
            console.warn(
              `Failed to process spine item ${V}:`,
              Q
            );
          }
      }
    }
    for (const e in z) {
      const P = z[e];
      if (P.type.includes("css")) {
        const V = l + P.href;
        if (!T.has(V)) {
          const L = y.current.file(V);
          if (L)
            try {
              g += await L.async("text") + `
`, T.add(V);
            } catch (Q) {
              console.warn(`Failed to load CSS ${V}:`, Q);
            }
        }
      }
    }
    D(), K(h);
  }
  async function w(C, z) {
    let X = [...C.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((T) => T[1]).join(`
`);
    X = x(X), g += X;
    let h = C.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    return h = await S(h, z), h;
  }
  function x(C) {
    const z = [
      "background-color",
      "color",
      "font-size",
      "font-family",
      "font-weight",
      "line-height",
      "text-align"
    ];
    return C.split(/}/).map((X) => {
      const h = X.split(/{/), T = h[0], e = h[1];
      if (!e) return "";
      const P = e.split(/;/).map((V) => V.trim()).filter((V) => V ? !z.some(
        (L) => new RegExp(`^${L}s*:`, "i").test(V)
      ) : !1).join("; ");
      return P ? `${T.trim()} { ${P}; }` : "";
    }).filter((X) => !!X).join(`
`);
  }
  async function S(C, z) {
    const X = new DOMParser();
    if (i.includes(z))
      try {
        const h = X.parseFromString(
          C,
          z
        ), T = h.querySelector("parsererror");
        if (T)
          return console.warn(
            "Parser error in content item during cleanImages, skipping.",
            T.textContent
          ), C;
        const e = h.querySelectorAll("img");
        for (const Q of e)
          await F(Q);
        const P = h.querySelectorAll("image");
        for (const Q of P)
          await E(Q);
        return new XMLSerializer().serializeToString(
          h.documentElement || h
        );
      } catch (h) {
        return console.error(
          "Error during cleanImages DOM processing:",
          h
        ), C;
      }
    else return C;
  }
  async function F(C) {
    var X;
    let z = C.getAttribute("src");
    if (z) {
      for (; z.startsWith(".") || z.startsWith("/"); ) z = z.slice(1);
      if (z = l + z, b[z] === void 0) {
        const h = (X = y.current) == null ? void 0 : X.file(z);
        if (h)
          try {
            const T = await h.async("blob"), e = URL.createObjectURL(T);
            b[z] = e;
          } catch (T) {
            console.warn(
              `Could not load image blob (formatImg) ${z}:`,
              T
            ), b[z] = "";
          }
        else
          console.warn(`Image file not found in zip (formatImg): ${z}`), b[z] = "";
      }
      C.setAttribute("src", b[z]);
    }
  }
  async function E(C) {
    var X;
    let z = C.getAttribute("xlink:href");
    if (z) {
      for (; z.startsWith(".") || z.startsWith("/"); ) z = z.slice(1);
      if (z = l + z, b[z] === void 0) {
        const h = (X = y.current) == null ? void 0 : X.file(z);
        if (h)
          try {
            const T = await h.async("blob"), e = URL.createObjectURL(T);
            b[z] = e;
          } catch (T) {
            console.warn(
              `Could not load image blob (formatXMLImage) ${z}:`,
              T
            ), b[z] = "";
          }
        else
          console.warn(
            `Image file not found in zip (formatXMLImage): ${z}`
          ), b[z] = "";
      }
      C.setAttribute("xlink:href", b[z]);
    }
  }
  function D() {
    if (!g.trim()) return;
    const C = new Blob([g], { type: "text/css" }), z = URL.createObjectURL(C);
    _.current = document.createElement("link"), _.current.href = z, _.current.rel = "stylesheet", _.current.setAttribute("data-bok-reader-style", "true"), document.head.appendChild(_.current);
  }
  return {
    title: v,
    rawContent: Z,
    isLoading: p,
    error: o,
    loadEpub: d,
    setIsLoading: A
  };
}
function Wt(Z) {
  const [K, p] = ft({
    width: 0,
    height: 0,
    noOfPages: 1
  });
  return ut(() => {
    const A = Z == null ? void 0 : Z.current, v = () => {
      if (A) {
        const a = A.getBoundingClientRect(), o = a.height < a.width;
        p((r) => {
          const l = o ? a.width / 2 : a.width, g = a.height, y = o ? 2 : 1;
          return r.width !== l || r.height !== g || r.noOfPages !== y ? {
            width: l,
            height: g,
            noOfPages: y
          } : r;
        });
      } else
        p({ width: 0, height: 0, noOfPages: 1 });
    };
    if (A) {
      v();
      const a = new ResizeObserver(v);
      return a.observe(A), () => {
        a.unobserve(A);
      };
    }
  }, [Z]), [K.width, K.height, K.noOfPages];
}
function Jt(Z) {
  const [K, p] = ft(0), A = Tt(() => {
    if (Z.current) {
      const v = Z.current.scrollWidth, a = Z.current.scrollLeft, o = v > 0 ? a / v : 0;
      p(o);
    }
  }, [Z]);
  return ut(() => {
    const v = Z.current;
    if (!v) return;
    let a = null;
    const o = 100, r = () => {
      a && clearTimeout(a), a = setTimeout(() => {
        A();
      }, o);
    };
    return v.addEventListener("scroll", r), A(), () => {
      a && clearTimeout(a), v.removeEventListener("scroll", r);
    };
  }, [A, Z]), [K, p];
}
function Qt(Z, K, p, A, v) {
  let a = "";
  ut(() => {
    K > 1e-7 && (a = JSON.stringify({
      percentRead: K,
      padding: p,
      fontSize: A,
      fontFamily: v
    }), localStorage.setItem(Z, a));
  }, [Z, K, p, A, v]);
}
const te = (Z, K, p, A) => {
  const [v, a] = Wt(p), o = yt(null), r = yt(""), l = Tt(
    (g, y) => {
      !K && !A && (g / v <= 0.4 && y / a < 0.8 && Z(-1), g / v > 0.4 && y / a < 0.8 && Z(1));
    },
    [Z, K, v, a]
  );
  ut(() => {
    const g = () => {
      var _;
      const y = (_ = window.getSelection()) == null ? void 0 : _.toString();
      y && y.length > 0 ? r.current = y : r.current = "";
    };
    return document.addEventListener("selectionchange", g), () => {
      document.removeEventListener("selectionchange", g);
    };
  }, []), ut(() => {
    const g = () => {
      o.current = window.setTimeout(() => {
        o.current = null;
      }, 500);
    }, y = (_) => {
      if (o.current && r.current) {
        clearTimeout(o.current), o.current = null;
        const { pageX: b, pageY: i } = _.touches[0];
        l(b, i);
      }
    };
    return window.addEventListener("touchstart", g), window.addEventListener("touchend", y), () => {
      window.removeEventListener("touchstart", g), window.removeEventListener("touchend", y);
    };
  }, [v, l]), ut(() => {
    const g = p.current, y = () => {
      o.current = window.setTimeout(() => {
      }, 200);
    }, _ = (b) => {
      o.current && !r.current && (clearTimeout(o.current), o.current = null, l(b.clientX, b.clientY));
    };
    return g == null || g.addEventListener("mousedown", y), g == null || g.addEventListener("mouseup", _), () => {
      g == null || g.removeEventListener("mousedown", y), g == null || g.removeEventListener("mouseup", _);
    };
  }, [v, K, l, p]);
};
function ee({ currentPage: Z, pages: K }) {
  return /* @__PURE__ */ pt("div", { className: "page-number", children: [
    Z + 1,
    "/",
    K
  ] });
}
function re({
  content: Z,
  title: K,
  setIsLoading: p,
  fontSize: A,
  sidePadding: v,
  fontFamily: a,
  isOptionMenuVisible: o,
  setFontSize: r,
  setPadding: l,
  setFontFamily: g,
  containerElementRef: y,
  showTutorial: _
}) {
  const b = yt(null), [i, d, n] = Wt(y), [c, s] = Jt(b), [m, w] = ft(1), [x, S] = ft(0);
  Qt(K, c, v, A, a);
  const F = Tt(
    (E) => {
      w((D) => {
        const C = b.current;
        if (C && x > 0 && n > 0 && C.clientWidth > 0) {
          let z = D + E;
          return z < 0 && (z = 0), z >= x && (z = x - 1), C.scroll({
            left: z * i * n,
            behavior: "smooth"
          }), z;
        }
        return D;
      });
    },
    [i, x, n]
  );
  return te(
    F,
    o,
    y,
    _
  ), ut(() => {
    if (!K) return;
    const E = localStorage.getItem(K);
    if (E)
      try {
        const D = JSON.parse(E);
        D && (s(D.percentRead || 0), D.fontSize !== void 0 && r(D.fontSize), D.padding !== void 0 && l(D.padding), D.fontFamily !== void 0 && g(D.fontFamily));
      } catch (D) {
        console.error("Failed to parse local storage for", K, D), s(0);
      }
    else
      s(0);
    w(1);
  }, [K, s, r, l, g]), ut(() => {
    const E = b.current;
    if (!E || i <= 0 || d <= 0) return;
    p(!0);
    const D = setTimeout(() => {
      E.style.setProperty(
        "--side-padding",
        `${v}px`
      ), E.style.setProperty("--font-size", `${A}em`), E.style.setProperty("--font-family", a), E.style.maxHeight = `${d}px`;
      const C = E.scrollWidth, z = i > 0 && C > 0 ? Math.round(C / i) : 0, X = n === 1 ? z : Math.round(z / 2);
      if (S(X), X > 0 && E.clientWidth > 0) {
        let h = Math.round(X * c);
        h = Math.max(
          0,
          Math.min(X - 1, h)
        ), m !== h && (w(h), E.scrollLeft = h * i * n);
      } else
        p(!1), w(1);
      p(!1);
    }, 400);
    return () => {
      clearTimeout(D);
    };
  }, [
    i,
    d,
    v,
    A,
    a,
    n,
    Z,
    K,
    p
  ]), ut(() => {
    const E = (D) => {
      D.key === "ArrowLeft" ? (D.preventDefault(), F(-1)) : D.key === "ArrowRight" && (D.preventDefault(), F(1));
    };
    return document.addEventListener("keydown", E), () => {
      document.removeEventListener("keydown", E);
    };
  }, [F, i, c]), /* @__PURE__ */ pt(Lt, { children: [
    /* @__PURE__ */ et(
      "div",
      {
        ref: b,
        dangerouslySetInnerHTML: { __html: Z },
        className: "book-page"
      }
    ),
    /* @__PURE__ */ et(ee, { pages: x, currentPage: m })
  ] });
}
var ne = {
  cm: !0,
  mm: !0,
  in: !0,
  px: !0,
  pt: !0,
  pc: !0,
  em: !0,
  ex: !0,
  ch: !0,
  rem: !0,
  vw: !0,
  vh: !0,
  vmin: !0,
  vmax: !0,
  "%": !0
};
function ie(Z) {
  if (typeof Z == "number")
    return {
      value: Z,
      unit: "px"
    };
  var K, p = (Z.match(/^[0-9.]*/) || "").toString();
  p.includes(".") ? K = parseFloat(p) : K = parseInt(p, 10);
  var A = (Z.match(/[^0-9]*$/) || "").toString();
  return ne[A] ? {
    value: K,
    unit: A
  } : (console.warn("React Spinners: ".concat(Z, " is not a valid css value. Defaulting to ").concat(K, "px.")), {
    value: K,
    unit: "px"
  });
}
var kt = function(Z, K, p) {
  var A = "react-spinners-".concat(Z, "-").concat(p);
  if (typeof window > "u" || !window.document)
    return A;
  var v = document.createElement("style");
  document.head.appendChild(v);
  var a = v.sheet, o = `
    @keyframes `.concat(A, ` {
      `).concat(K, `
    }
  `);
  return a && a.insertRule(o, 0), A;
}, It = function() {
  return It = Object.assign || function(Z) {
    for (var K, p = 1, A = arguments.length; p < A; p++) {
      K = arguments[p];
      for (var v in K) Object.prototype.hasOwnProperty.call(K, v) && (Z[v] = K[v]);
    }
    return Z;
  }, It.apply(this, arguments);
}, ae = function(Z, K) {
  var p = {};
  for (var A in Z) Object.prototype.hasOwnProperty.call(Z, A) && K.indexOf(A) < 0 && (p[A] = Z[A]);
  if (Z != null && typeof Object.getOwnPropertySymbols == "function")
    for (var v = 0, A = Object.getOwnPropertySymbols(Z); v < A.length; v++)
      K.indexOf(A[v]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, A[v]) && (p[A[v]] = Z[A[v]]);
  return p;
}, dt = [1, 3, 5], se = [
  kt("PropagateLoader", "25% {transform: translateX(-".concat(dt[0], `rem) scale(0.75)}
    50% {transform: translateX(-`).concat(dt[1], `rem) scale(0.6)}
    75% {transform: translateX(-`).concat(dt[2], `rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-0"),
  kt("PropagateLoader", "25% {transform: translateX(-".concat(dt[0], `rem) scale(0.75)}
    50% {transform: translateX(-`).concat(dt[1], `rem) scale(0.6)}
    75% {transform: translateX(-`).concat(dt[1], `rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-1"),
  kt("PropagateLoader", "25% {transform: translateX(-".concat(dt[0], `rem) scale(0.75)}
    75% {transform: translateX(-`).concat(dt[0], `rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-2"),
  kt("PropagateLoader", "25% {transform: translateX(".concat(dt[0], `rem) scale(0.75)}
    75% {transform: translateX(`).concat(dt[0], `rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-3"),
  kt("PropagateLoader", "25% {transform: translateX(".concat(dt[0], `rem) scale(0.75)}
    50% {transform: translateX(`).concat(dt[1], `rem) scale(0.6)}
    75% {transform: translateX(`).concat(dt[1], `rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-4"),
  kt("PropagateLoader", "25% {transform: translateX(".concat(dt[0], `rem) scale(0.75)}
    50% {transform: translateX(`).concat(dt[1], `rem) scale(0.6)}
    75% {transform: translateX(`).concat(dt[2], `rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-5")
];
function oe(Z) {
  var K = Z.loading, p = K === void 0 ? !0 : K, A = Z.color, v = A === void 0 ? "#000000" : A, a = Z.speedMultiplier, o = a === void 0 ? 1 : a, r = Z.cssOverride, l = r === void 0 ? {} : r, g = Z.size, y = g === void 0 ? 15 : g, _ = ae(Z, ["loading", "color", "speedMultiplier", "cssOverride", "size"]), b = ie(y), i = b.value, d = b.unit, n = It({ display: "inherit", position: "relative" }, l), c = function(s) {
    return {
      position: "absolute",
      fontSize: "".concat(i / 3).concat(d),
      width: "".concat(i).concat(d),
      height: "".concat(i).concat(d),
      background: v,
      borderRadius: "50%",
      animation: "".concat(se[s], " ").concat(1.5 / o, "s infinite"),
      animationFillMode: "forwards"
    };
  };
  return p ? wt.createElement(
    "span",
    It({ style: n }, _),
    wt.createElement("span", { style: c(0) }),
    wt.createElement("span", { style: c(1) }),
    wt.createElement("span", { style: c(2) }),
    wt.createElement("span", { style: c(3) }),
    wt.createElement("span", { style: c(4) }),
    wt.createElement("span", { style: c(5) })
  ) : null;
}
const Ft = {
  "loading-screen": "_loading-screen_42072_1",
  "loading-screen-gon": "_loading-screen-gon_42072_18"
};
function le({
  isLoading: Z,
  color: K
}) {
  return /* @__PURE__ */ et(
    "div",
    {
      className: Z ? Ft["loading-screen"] : Ft["loading-screen-gon"],
      children: /* @__PURE__ */ et("div", { children: /* @__PURE__ */ et(
        oe,
        {
          color: K || "red"
        }
      ) })
    }
  );
}
function ce() {
  document.fullscreenElement ? document.exitFullscreen && document.exitFullscreen() : document.documentElement.requestFullscreen();
}
function ue({
  onClose: Z,
  fontSize: K,
  padding: p,
  fontFamily: A,
  setFontSize: v,
  setPadding: a,
  setFontFamily: o,
  supportedFonts: r
}) {
  const [l, g] = ft(!1), [y, _] = ft(!1), b = yt(null), i = yt(null), d = [
    { displayName: "System Default", name: "system-ui" },
    ...r
  ];
  ut(() => {
    const E = setTimeout(() => {
      _(!0);
    }, 0);
    return () => clearTimeout(E);
  }, []);
  const n = () => {
    _(!1), g(!0);
  };
  ut(() => {
    if (l) {
      const E = setTimeout(() => {
        Z();
      }, 300);
      return () => clearTimeout(E);
    }
  }, [l, Z]);
  const c = () => {
    n();
  }, s = (E) => {
    E.stopPropagation();
  }, m = (E) => {
    E.current && (E.current.classList.add("value-changed"), setTimeout(() => {
      E.current && E.current.classList.remove("value-changed");
    }, 300));
  }, w = () => {
    p <= 70 && (a((E) => E + 5), m(i));
  }, x = () => {
    p - 5 > 0 && (a((E) => E - 5), m(i));
  }, S = () => {
    K < 3 && (v((E) => E + 0.2), m(b));
  }, F = () => {
    K - 0.2 > 0.6 && (v((E) => E - 0.2), m(b));
  };
  return /* @__PURE__ */ et(
    "div",
    {
      className: `options-menu-overlay ${l ? "fade-out" : ""}`,
      onClick: c,
      children: /* @__PURE__ */ pt(
        "div",
        {
          className: `options-menu ${y ? "visible" : ""} ${l ? "slide-down" : ""}`,
          onClick: s,
          children: [
            /* @__PURE__ */ et("button", { onClick: n, className: "close-button", children: "✕" }),
            /* @__PURE__ */ et("h2", { children: "Reader Options" }),
            /* @__PURE__ */ pt("div", { className: "options-buttons", children: [
              /* @__PURE__ */ pt("div", { className: "font-family-buttons", children: [
                /* @__PURE__ */ et(
                  "select",
                  {
                    value: A,
                    onChange: (E) => {
                      for (const D of d)
                        D.name === E.target.value && o(E.target.value);
                    },
                    children: d.map((E) => /* @__PURE__ */ et(
                      "option",
                      {
                        value: E.name,
                        children: E.displayName
                      },
                      E.displayName
                    ))
                  }
                ),
                /* @__PURE__ */ et("div", { className: "option-label", children: "Font family" })
              ] }),
              /* @__PURE__ */ pt("div", { className: "padding-buttons", children: [
                /* @__PURE__ */ et("button", { onClick: w, children: "+" }),
                /* @__PURE__ */ et("button", { onClick: x, children: "-" }),
                /* @__PURE__ */ pt("div", { children: [
                  /* @__PURE__ */ et("span", { className: "option-label", children: "Side padding: " }),
                  /* @__PURE__ */ et(
                    "span",
                    {
                      ref: i,
                      className: "option-value",
                      children: p
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ pt("div", { className: "font-buttons", children: [
                /* @__PURE__ */ et("button", { onClick: S, children: "+" }),
                /* @__PURE__ */ et("button", { onClick: F, children: "-" }),
                /* @__PURE__ */ pt("div", { style: { marginLeft: "auto" }, children: [
                  /* @__PURE__ */ et("span", { className: "option-label", children: "Font size: " }),
                  /* @__PURE__ */ et("span", { ref: b, className: "option-value", children: Math.round(K * 10) })
                ] })
              ] }),
              /* @__PURE__ */ et("button", { onClick: ce, children: "Toggle fullscreen" })
            ] })
          ]
        }
      )
    }
  );
}
const he = Ut.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    z-index: 2000;
    pointer-events: auto;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.35s ease;
    &.fade-out {
        opacity: 0;
        pointer-events: none;
    }

    .tap-circle {
        position: absolute;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        border: 3px solid ${({ color: Z }) => Z || "#4fc3f7"};
        background: ${({ color: Z }) => Z || "#4fc3f7"};
        box-shadow: 0 0 16px 0 ${({ color: Z }) => Z || "#4fc3f7"}55;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        pointer-events: none;
        opacity: 0.95;
    }
    .tap-circle.right {
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
    }
    .tap-circle.left {
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
    }
    .tap-circle.bottom {
        left: 50%;
        bottom: 32px;
        transform: translateX(-50%);
    }
    .tutorial-label {
        position: absolute;
        color: ${({ color: Z }) => Z || "#4fc3f7"};
        font-size: 1.1em;
        font-weight: 500;
        background: rgba(0, 0, 0, 0.7);
        padding: 0.5em 1.1em;
        border-radius: 1.2em;
        z-index: 3;
        pointer-events: none;
        white-space: nowrap;
    }
    .tutorial-label.right {
        right: 90px;
        top: 47%;
        transform: none;
    }
    .tutorial-label.left {
        left: 90px;
        top: 47%;
        transform: none;
    }
    .tutorial-label.bottom {
        left: 50%;
        bottom: 110px;
        transform: translateX(-50%);
    }
    .tutorial-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    .dismiss {
        position: absolute;
        left: 50%;
        top: 16%;
        text-align: center;
        padding: 0.5em 1.1em;
        transform: translateX(-50%);
        font-size: 1em;
        color: #fff;
        opacity: 0.8;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10;
        pointer-events: none;
    }
    @media (max-width: 600px) {
        .tap-circle.right {
            top: 44%;
        }
        .tutorial-label.right {
            top: 41%;
        }
        .tap-circle.left {
            top: 56%;
        }
        .tutorial-label.left {
            top: 53%;
        }
    }
`, de = ({
  color: Z,
  onDismiss: K
}) => {
  const [p, A] = Ht.useState(!1);
  return /* @__PURE__ */ pt(
    he,
    {
      color: Z,
      onClick: () => {
        A(!0), setTimeout(K, 350);
      },
      className: p ? "fade-out" : "",
      children: [
        /* @__PURE__ */ et("div", { className: "tap-circle right" }),
        /* @__PURE__ */ et("div", { className: "tap-circle left" }),
        /* @__PURE__ */ et("div", { className: "tap-circle bottom" }),
        /* @__PURE__ */ et("div", { className: "tutorial-label right", children: "scroll right" }),
        /* @__PURE__ */ et("div", { className: "tutorial-label left", children: "scroll left" }),
        /* @__PURE__ */ et("div", { className: "tutorial-label bottom", children: "open settings" }),
        /* @__PURE__ */ et("div", { className: "dismiss", children: "Tap anywhere to continue" })
      ]
    }
  );
}, Dt = $t`
  .bok-reader-container {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    text-align: justify;
    color-scheme: dark light;
    color: rgb(215, 215, 215) !important;
    background-color: black;
    height: 100%;
    width: 100%;
    overflow: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
     &::-webkit-scrollbar { display: none; }
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    container-type: size;

    .book-page {
        margin: 0;
        font-family: var(--font-family);
        padding: var(--top-padding) var(--side-padding) var(--bottom-padding);
        height: 100%;
        text-shadow: 2px 2px 5px rgba(0, 0, 0); 
        font-size: var(--font-size);

        column-gap: calc(2 * var(--side-padding));
        -webkit-column-fill: auto;
        // column-fill: auto; // MUST be auto for scrollWidth calculation to be correct
        -webkit-column-gap: calc(2 * var(--side-padding));

        // Enable horizontal scrolling of the columns
        overflow-x: hidden;
        overflow-y: hidden; // Prevent vertical scrollbar on the container itself
        scroll-snap-type: x mandatory; // Snap pages (columns)
        scroll-behavior: auto; // Let JS handle smooth scrolling during page turns
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;

        scrollbar-width: none;
        -ms-overflow-style: none;
         &::-webkit-scrollbar {
            display: none;
         }

        // Content *inside* the columns
         > * { // Target direct children (likely the .bok-chapter divs)
              break-inside: avoid-column; // Try to prevent elements breaking mid-column
              page-break-inside: avoid; /* Older alias */
              -webkit-column-break-inside: avoid;
         }
        p {
            color: 
        }
    }

    @container (aspect-ratio > 1/1) {
        .book-page {
            column-count: 2;
            -moz-column-count: 2;
            -webkit-column-count: 2;
            column-width: calc(50% - var(--side-padding));
            -webkit-column-width: calc(50% - var(--side-padding));

            img, svg {
                max-width: calc(100% - 2 * var(--side-padding)) !important;
                margin-bottom: 10px;
            }

        }
    }

    @container (aspect-ratio <= 1/1) {
        .book-page {
            columns: var(--safari-is-stupid-width, 100%) auto;

            img, svg {
                max-width: calc(100% - 2 * var(--side-padding)) !important;
                margin-bottom: 10px;
            }
        }
    }    // --- Styles for Images/SVG within Columns ---

    .book-page img,
    .book-page svg {
        border-radius: 10px;
        // Max height respects the vertical padding of the book-page container
        max-height: calc(100% - var(--top-padding) - var(--bottom-padding)) !important;
        display: block;
        margin-left: auto; // Center if smaller than column width
        margin-right: auto;
        object-fit: contain; // Fit without distortion
        box-sizing: border-box; // Ensure border/padding included in size
         break-inside: avoid-column; // Crucial to prevent images splitting across columns
         page-break-inside: avoid;
         -webkit-column-break-inside: avoid;
    }

    .book-page svg > image {
        width: 100%; // Inherit size from parent SVG
        height: 100%;
    }

    // --- Chapter Styling ---
    .bok-chapter {
      margin-bottom: 100%;
       break-inside: avoid-column;
       page-break-inside: avoid;
       -webkit-column-break-inside: avoid;
    }

    // --- Other Scoped Styles ---
    parsererror { display: none; } // Hide EPUB parsing errors if they render

    .page-number {
        position: absolute;
        bottom: 15px; // Position relative to the reader container
        left: 50%;
        transform: translateX(-50%);
        font-size: 13px;
        color: gray;
        z-index: 10; // Above book content
        pointer-events: none; // Non-interactive
    }

    .bottom-click-area {
        position: absolute; // Within the reader container
        bottom: 0;
        left: 0;
        width: 100%;
        height: 15%;
        z-index: 1000; // Above page number, below options menu overlay
        background-color: transparent;
        cursor: pointer;
    }
  }
`, Nt = Ut.div`
    width: 100%;
    height: 100%;
    position: relative;d
    overflow: hidden;d
    overflow-y: hidden;
`;
function fe(Z, K) {
  const [p, A] = ft(() => {
    const v = localStorage.getItem(Z);
    return v === null ? K : v === "true";
  });
  return ut(() => {
    localStorage.setItem(Z, p ? "true" : "false");
  }, [Z, p]), [p, A];
}
const _e = ({
  epubDataSource: Z,
  onTitleChange: K,
  onLoadingChange: p,
  onError: A,
  className: v,
  style: a,
  color: o,
  supportedFonts: r = []
}) => {
  const { title: l, rawContent: g, isLoading: y, error: _, loadEpub: b, setIsLoading: i } = qt(), [d, n] = ft(!1), [c, s] = ft(1.2), [m, w] = ft(30), [x, S] = ft("Inter"), F = yt(null), [E, D] = fe(
    "bokreader_tutorial_shown",
    !1
  ), [C, z] = ft(!E);
  ut(() => {
    E && z(!1);
  }, [E]);
  const X = () => {
    z(!1), D(!0);
  };
  ut(() => {
    Z && b(Z);
  }, [Z, b]), ut(() => {
    K && K(l);
  }, [l, K]), ut(() => {
    p && p(y);
  }, [y, p]), ut(() => {
    _ && A && A(_);
  }, [_, A]);
  const h = Gt(
    () => ({
      "--color-tint": o,
      "--side-padding": `${m}px`,
      "--top-padding": "30px",
      // Example: make these configurable too if needed
      "--bottom-padding": "70px",
      // Example
      "--font-size": `${c}em`,
      "--font-family": x
    }),
    [m, c, x]
  );
  return _ && !y && !g ? /* @__PURE__ */ pt(
    Nt,
    {
      className: `bok-reader-container ${v || ""}`,
      style: a,
      children: [
        /* @__PURE__ */ et(Dt, {}),
        /* @__PURE__ */ pt("div", { style: { padding: "20px", color: "red" }, children: [
          "Error loading EPUB: ",
          _
        ] })
      ]
    }
  ) : /* @__PURE__ */ pt(
    Nt,
    {
      className: `bok-reader-container ${v || ""}`,
      style: { ...a, ...h },
      ref: F,
      children: [
        /* @__PURE__ */ et(Dt, {}),
        /* @__PURE__ */ et(le, { isLoading: y, color: o }),
        g && /* @__PURE__ */ pt(Lt, { children: [
          C && !y && /* @__PURE__ */ et(
            de,
            {
              color: o,
              onDismiss: X
            }
          ),
          /* @__PURE__ */ et(
            re,
            {
              content: g,
              title: l,
              setIsLoading: i,
              fontSize: c,
              sidePadding: m,
              fontFamily: x,
              setPadding: w,
              setFontSize: s,
              setFontFamily: S,
              isOptionMenuVisible: d,
              containerElementRef: F,
              showTutorial: C
            }
          ),
          d && /* @__PURE__ */ et(
            ue,
            {
              onClose: () => n(!1),
              fontSize: c,
              padding: m,
              fontFamily: x,
              setPadding: w,
              setFontSize: s,
              setFontFamily: S,
              supportedFonts: r
            }
          ),
          !d && /* @__PURE__ */ et(
            "div",
            {
              className: "bottom-click-area",
              onClick: () => {
                C || n(!0);
              },
              "aria-label": "Open reader options"
            }
          )
        ] }),
        !Z && !y && !_ && /* @__PURE__ */ et("div", { style: { padding: "20px", textAlign: "center" }, children: "No EPUB loaded." })
      ]
    }
  );
};
export {
  _e as BokReader
};
