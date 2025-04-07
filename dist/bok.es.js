import { jsxs as pt, Fragment as Nt, jsx as it } from "react/jsx-runtime";
import * as yt from "react";
import { useState as dt, useCallback as kt, useEffect as ft, useRef as xt, useMemo as Xt } from "react";
import Ht, { createGlobalStyle as Gt } from "styled-components";
var Ot = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $t(G) {
  return G && G.__esModule && Object.prototype.hasOwnProperty.call(G, "default") ? G.default : G;
}
function It(G) {
  throw new Error('Could not dynamically require "' + G + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ut = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(G, q) {
  (function(p) {
    G.exports = p();
  })(function() {
    return function p(C, v, s) {
      function l(m, y) {
        if (!v[m]) {
          if (!C[m]) {
            var g = typeof It == "function" && It;
            if (!y && g) return g(m, !0);
            if (r) return r(m, !0);
            var b = new Error("Cannot find module '" + m + "'");
            throw b.code = "MODULE_NOT_FOUND", b;
          }
          var a = v[m] = { exports: {} };
          C[m][0].call(a.exports, function(h) {
            var n = C[m][1][h];
            return l(n || h);
          }, a, a.exports, p, C, v, s);
        }
        return v[m].exports;
      }
      for (var r = typeof It == "function" && It, i = 0; i < s.length; i++) l(s[i]);
      return l;
    }({ 1: [function(p, C, v) {
      var s = p("./utils"), l = p("./support"), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      v.encode = function(i) {
        for (var m, y, g, b, a, h, n, c = [], o = 0, d = i.length, k = d, E = s.getTypeOf(i) !== "string"; o < i.length; ) k = d - o, g = E ? (m = i[o++], y = o < d ? i[o++] : 0, o < d ? i[o++] : 0) : (m = i.charCodeAt(o++), y = o < d ? i.charCodeAt(o++) : 0, o < d ? i.charCodeAt(o++) : 0), b = m >> 2, a = (3 & m) << 4 | y >> 4, h = 1 < k ? (15 & y) << 2 | g >> 6 : 64, n = 2 < k ? 63 & g : 64, c.push(r.charAt(b) + r.charAt(a) + r.charAt(h) + r.charAt(n));
        return c.join("");
      }, v.decode = function(i) {
        var m, y, g, b, a, h, n = 0, c = 0, o = "data:";
        if (i.substr(0, o.length) === o) throw new Error("Invalid base64 input, it looks like a data url.");
        var d, k = 3 * (i = i.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (i.charAt(i.length - 1) === r.charAt(64) && k--, i.charAt(i.length - 2) === r.charAt(64) && k--, k % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (d = l.uint8array ? new Uint8Array(0 | k) : new Array(0 | k); n < i.length; ) m = r.indexOf(i.charAt(n++)) << 2 | (b = r.indexOf(i.charAt(n++))) >> 4, y = (15 & b) << 4 | (a = r.indexOf(i.charAt(n++))) >> 2, g = (3 & a) << 6 | (h = r.indexOf(i.charAt(n++))), d[c++] = m, a !== 64 && (d[c++] = y), h !== 64 && (d[c++] = g);
        return d;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(p, C, v) {
      var s = p("./external"), l = p("./stream/DataWorker"), r = p("./stream/Crc32Probe"), i = p("./stream/DataLengthProbe");
      function m(y, g, b, a, h) {
        this.compressedSize = y, this.uncompressedSize = g, this.crc32 = b, this.compression = a, this.compressedContent = h;
      }
      m.prototype = { getContentWorker: function() {
        var y = new l(s.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new i("data_length")), g = this;
        return y.on("end", function() {
          if (this.streamInfo.data_length !== g.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), y;
      }, getCompressedWorker: function() {
        return new l(s.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, m.createWorkerFrom = function(y, g, b) {
        return y.pipe(new r()).pipe(new i("uncompressedSize")).pipe(g.compressWorker(b)).pipe(new i("compressedSize")).withStreamInfo("compression", g);
      }, C.exports = m;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(p, C, v) {
      var s = p("./stream/GenericWorker");
      v.STORE = { magic: "\0\0", compressWorker: function() {
        return new s("STORE compression");
      }, uncompressWorker: function() {
        return new s("STORE decompression");
      } }, v.DEFLATE = p("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(p, C, v) {
      var s = p("./utils"), l = function() {
        for (var r, i = [], m = 0; m < 256; m++) {
          r = m;
          for (var y = 0; y < 8; y++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
          i[m] = r;
        }
        return i;
      }();
      C.exports = function(r, i) {
        return r !== void 0 && r.length ? s.getTypeOf(r) !== "string" ? function(m, y, g, b) {
          var a = l, h = b + g;
          m ^= -1;
          for (var n = b; n < h; n++) m = m >>> 8 ^ a[255 & (m ^ y[n])];
          return -1 ^ m;
        }(0 | i, r, r.length, 0) : function(m, y, g, b) {
          var a = l, h = b + g;
          m ^= -1;
          for (var n = b; n < h; n++) m = m >>> 8 ^ a[255 & (m ^ y.charCodeAt(n))];
          return -1 ^ m;
        }(0 | i, r, r.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(p, C, v) {
      v.base64 = !1, v.binary = !1, v.dir = !1, v.createFolders = !0, v.date = null, v.compression = null, v.compressionOptions = null, v.comment = null, v.unixPermissions = null, v.dosPermissions = null;
    }, {}], 6: [function(p, C, v) {
      var s = null;
      s = typeof Promise < "u" ? Promise : p("lie"), C.exports = { Promise: s };
    }, { lie: 37 }], 7: [function(p, C, v) {
      var s = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", l = p("pako"), r = p("./utils"), i = p("./stream/GenericWorker"), m = s ? "uint8array" : "array";
      function y(g, b) {
        i.call(this, "FlateWorker/" + g), this._pako = null, this._pakoAction = g, this._pakoOptions = b, this.meta = {};
      }
      v.magic = "\b\0", r.inherits(y, i), y.prototype.processChunk = function(g) {
        this.meta = g.meta, this._pako === null && this._createPako(), this._pako.push(r.transformTo(m, g.data), !1);
      }, y.prototype.flush = function() {
        i.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, y.prototype.cleanUp = function() {
        i.prototype.cleanUp.call(this), this._pako = null;
      }, y.prototype._createPako = function() {
        this._pako = new l[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var g = this;
        this._pako.onData = function(b) {
          g.push({ data: b, meta: g.meta });
        };
      }, v.compressWorker = function(g) {
        return new y("Deflate", g);
      }, v.uncompressWorker = function() {
        return new y("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(p, C, v) {
      function s(a, h) {
        var n, c = "";
        for (n = 0; n < h; n++) c += String.fromCharCode(255 & a), a >>>= 8;
        return c;
      }
      function l(a, h, n, c, o, d) {
        var k, E, S = a.file, L = a.compression, A = d !== m.utf8encode, P = r.transformTo("string", d(S.name)), w = r.transformTo("string", m.utf8encode(S.name)), B = S.comment, W = r.transformTo("string", d(B)), _ = r.transformTo("string", m.utf8encode(B)), I = w.length !== S.name.length, e = _.length !== B.length, F = "", V = "", U = "", tt = S.dir, M = S.date, Q = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        h && !n || (Q.crc32 = a.crc32, Q.compressedSize = a.compressedSize, Q.uncompressedSize = a.uncompressedSize);
        var T = 0;
        h && (T |= 8), A || !I && !e || (T |= 2048);
        var O = 0, J = 0;
        tt && (O |= 16), o === "UNIX" ? (J = 798, O |= function(H, st) {
          var ut = H;
          return H || (ut = st ? 16893 : 33204), (65535 & ut) << 16;
        }(S.unixPermissions, tt)) : (J = 20, O |= function(H) {
          return 63 & (H || 0);
        }(S.dosPermissions)), k = M.getUTCHours(), k <<= 6, k |= M.getUTCMinutes(), k <<= 5, k |= M.getUTCSeconds() / 2, E = M.getUTCFullYear() - 1980, E <<= 4, E |= M.getUTCMonth() + 1, E <<= 5, E |= M.getUTCDate(), I && (V = s(1, 1) + s(y(P), 4) + w, F += "up" + s(V.length, 2) + V), e && (U = s(1, 1) + s(y(W), 4) + _, F += "uc" + s(U.length, 2) + U);
        var $ = "";
        return $ += `
\0`, $ += s(T, 2), $ += L.magic, $ += s(k, 2), $ += s(E, 2), $ += s(Q.crc32, 4), $ += s(Q.compressedSize, 4), $ += s(Q.uncompressedSize, 4), $ += s(P.length, 2), $ += s(F.length, 2), { fileRecord: g.LOCAL_FILE_HEADER + $ + P + F, dirRecord: g.CENTRAL_FILE_HEADER + s(J, 2) + $ + s(W.length, 2) + "\0\0\0\0" + s(O, 4) + s(c, 4) + P + F + W };
      }
      var r = p("../utils"), i = p("../stream/GenericWorker"), m = p("../utf8"), y = p("../crc32"), g = p("../signature");
      function b(a, h, n, c) {
        i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = h, this.zipPlatform = n, this.encodeFileName = c, this.streamFiles = a, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      r.inherits(b, i), b.prototype.push = function(a) {
        var h = a.meta.percent || 0, n = this.entriesCount, c = this._sources.length;
        this.accumulate ? this.contentBuffer.push(a) : (this.bytesWritten += a.data.length, i.prototype.push.call(this, { data: a.data, meta: { currentFile: this.currentFile, percent: n ? (h + 100 * (n - c - 1)) / n : 100 } }));
      }, b.prototype.openedSource = function(a) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = a.file.name;
        var h = this.streamFiles && !a.file.dir;
        if (h) {
          var n = l(a, h, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: n.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, b.prototype.closedSource = function(a) {
        this.accumulate = !1;
        var h = this.streamFiles && !a.file.dir, n = l(a, h, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(n.dirRecord), h) this.push({ data: function(c) {
          return g.DATA_DESCRIPTOR + s(c.crc32, 4) + s(c.compressedSize, 4) + s(c.uncompressedSize, 4);
        }(a), meta: { percent: 100 } });
        else for (this.push({ data: n.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, b.prototype.flush = function() {
        for (var a = this.bytesWritten, h = 0; h < this.dirRecords.length; h++) this.push({ data: this.dirRecords[h], meta: { percent: 100 } });
        var n = this.bytesWritten - a, c = function(o, d, k, E, S) {
          var L = r.transformTo("string", S(E));
          return g.CENTRAL_DIRECTORY_END + "\0\0\0\0" + s(o, 2) + s(o, 2) + s(d, 4) + s(k, 4) + s(L.length, 2) + L;
        }(this.dirRecords.length, n, a, this.zipComment, this.encodeFileName);
        this.push({ data: c, meta: { percent: 100 } });
      }, b.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, b.prototype.registerPrevious = function(a) {
        this._sources.push(a);
        var h = this;
        return a.on("data", function(n) {
          h.processChunk(n);
        }), a.on("end", function() {
          h.closedSource(h.previous.streamInfo), h._sources.length ? h.prepareNextSource() : h.end();
        }), a.on("error", function(n) {
          h.error(n);
        }), this;
      }, b.prototype.resume = function() {
        return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, b.prototype.error = function(a) {
        var h = this._sources;
        if (!i.prototype.error.call(this, a)) return !1;
        for (var n = 0; n < h.length; n++) try {
          h[n].error(a);
        } catch {
        }
        return !0;
      }, b.prototype.lock = function() {
        i.prototype.lock.call(this);
        for (var a = this._sources, h = 0; h < a.length; h++) a[h].lock();
      }, C.exports = b;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(p, C, v) {
      var s = p("../compressions"), l = p("./ZipFileWorker");
      v.generateWorker = function(r, i, m) {
        var y = new l(i.streamFiles, m, i.platform, i.encodeFileName), g = 0;
        try {
          r.forEach(function(b, a) {
            g++;
            var h = function(d, k) {
              var E = d || k, S = s[E];
              if (!S) throw new Error(E + " is not a valid compression method !");
              return S;
            }(a.options.compression, i.compression), n = a.options.compressionOptions || i.compressionOptions || {}, c = a.dir, o = a.date;
            a._compressWorker(h, n).withStreamInfo("file", { name: b, dir: c, date: o, comment: a.comment || "", unixPermissions: a.unixPermissions, dosPermissions: a.dosPermissions }).pipe(y);
          }), y.entriesCount = g;
        } catch (b) {
          y.error(b);
        }
        return y;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(p, C, v) {
      function s() {
        if (!(this instanceof s)) return new s();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var l = new s();
          for (var r in this) typeof this[r] != "function" && (l[r] = this[r]);
          return l;
        };
      }
      (s.prototype = p("./object")).loadAsync = p("./load"), s.support = p("./support"), s.defaults = p("./defaults"), s.version = "3.10.1", s.loadAsync = function(l, r) {
        return new s().loadAsync(l, r);
      }, s.external = p("./external"), C.exports = s;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(p, C, v) {
      var s = p("./utils"), l = p("./external"), r = p("./utf8"), i = p("./zipEntries"), m = p("./stream/Crc32Probe"), y = p("./nodejsUtils");
      function g(b) {
        return new l.Promise(function(a, h) {
          var n = b.decompressed.getContentWorker().pipe(new m());
          n.on("error", function(c) {
            h(c);
          }).on("end", function() {
            n.streamInfo.crc32 !== b.decompressed.crc32 ? h(new Error("Corrupted zip : CRC32 mismatch")) : a();
          }).resume();
        });
      }
      C.exports = function(b, a) {
        var h = this;
        return a = s.extend(a || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: r.utf8decode }), y.isNode && y.isStream(b) ? l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : s.prepareContent("the loaded zip file", b, !0, a.optimizedBinaryString, a.base64).then(function(n) {
          var c = new i(a);
          return c.load(n), c;
        }).then(function(n) {
          var c = [l.Promise.resolve(n)], o = n.files;
          if (a.checkCRC32) for (var d = 0; d < o.length; d++) c.push(g(o[d]));
          return l.Promise.all(c);
        }).then(function(n) {
          for (var c = n.shift(), o = c.files, d = 0; d < o.length; d++) {
            var k = o[d], E = k.fileNameStr, S = s.resolve(k.fileNameStr);
            h.file(S, k.decompressed, { binary: !0, optimizedBinaryString: !0, date: k.date, dir: k.dir, comment: k.fileCommentStr.length ? k.fileCommentStr : null, unixPermissions: k.unixPermissions, dosPermissions: k.dosPermissions, createFolders: a.createFolders }), k.dir || (h.file(S).unsafeOriginalName = E);
          }
          return c.zipComment.length && (h.comment = c.zipComment), h;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(p, C, v) {
      var s = p("../utils"), l = p("../stream/GenericWorker");
      function r(i, m) {
        l.call(this, "Nodejs stream input adapter for " + i), this._upstreamEnded = !1, this._bindStream(m);
      }
      s.inherits(r, l), r.prototype._bindStream = function(i) {
        var m = this;
        (this._stream = i).pause(), i.on("data", function(y) {
          m.push({ data: y, meta: { percent: 0 } });
        }).on("error", function(y) {
          m.isPaused ? this.generatedError = y : m.error(y);
        }).on("end", function() {
          m.isPaused ? m._upstreamEnded = !0 : m.end();
        });
      }, r.prototype.pause = function() {
        return !!l.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, r.prototype.resume = function() {
        return !!l.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, C.exports = r;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(p, C, v) {
      var s = p("readable-stream").Readable;
      function l(r, i, m) {
        s.call(this, i), this._helper = r;
        var y = this;
        r.on("data", function(g, b) {
          y.push(g) || y._helper.pause(), m && m(b);
        }).on("error", function(g) {
          y.emit("error", g);
        }).on("end", function() {
          y.push(null);
        });
      }
      p("../utils").inherits(l, s), l.prototype._read = function() {
        this._helper.resume();
      }, C.exports = l;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(p, C, v) {
      C.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(s, l) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(s, l);
        if (typeof s == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(s, l);
      }, allocBuffer: function(s) {
        if (Buffer.alloc) return Buffer.alloc(s);
        var l = new Buffer(s);
        return l.fill(0), l;
      }, isBuffer: function(s) {
        return Buffer.isBuffer(s);
      }, isStream: function(s) {
        return s && typeof s.on == "function" && typeof s.pause == "function" && typeof s.resume == "function";
      } };
    }, {}], 15: [function(p, C, v) {
      function s(S, L, A) {
        var P, w = r.getTypeOf(L), B = r.extend(A || {}, y);
        B.date = B.date || /* @__PURE__ */ new Date(), B.compression !== null && (B.compression = B.compression.toUpperCase()), typeof B.unixPermissions == "string" && (B.unixPermissions = parseInt(B.unixPermissions, 8)), B.unixPermissions && 16384 & B.unixPermissions && (B.dir = !0), B.dosPermissions && 16 & B.dosPermissions && (B.dir = !0), B.dir && (S = o(S)), B.createFolders && (P = c(S)) && d.call(this, P, !0);
        var W = w === "string" && B.binary === !1 && B.base64 === !1;
        A && A.binary !== void 0 || (B.binary = !W), (L instanceof g && L.uncompressedSize === 0 || B.dir || !L || L.length === 0) && (B.base64 = !1, B.binary = !0, L = "", B.compression = "STORE", w = "string");
        var _ = null;
        _ = L instanceof g || L instanceof i ? L : h.isNode && h.isStream(L) ? new n(S, L) : r.prepareContent(S, L, B.binary, B.optimizedBinaryString, B.base64);
        var I = new b(S, _, B);
        this.files[S] = I;
      }
      var l = p("./utf8"), r = p("./utils"), i = p("./stream/GenericWorker"), m = p("./stream/StreamHelper"), y = p("./defaults"), g = p("./compressedObject"), b = p("./zipObject"), a = p("./generate"), h = p("./nodejsUtils"), n = p("./nodejs/NodejsStreamInputAdapter"), c = function(S) {
        S.slice(-1) === "/" && (S = S.substring(0, S.length - 1));
        var L = S.lastIndexOf("/");
        return 0 < L ? S.substring(0, L) : "";
      }, o = function(S) {
        return S.slice(-1) !== "/" && (S += "/"), S;
      }, d = function(S, L) {
        return L = L !== void 0 ? L : y.createFolders, S = o(S), this.files[S] || s.call(this, S, null, { dir: !0, createFolders: L }), this.files[S];
      };
      function k(S) {
        return Object.prototype.toString.call(S) === "[object RegExp]";
      }
      var E = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(S) {
        var L, A, P;
        for (L in this.files) P = this.files[L], (A = L.slice(this.root.length, L.length)) && L.slice(0, this.root.length) === this.root && S(A, P);
      }, filter: function(S) {
        var L = [];
        return this.forEach(function(A, P) {
          S(A, P) && L.push(P);
        }), L;
      }, file: function(S, L, A) {
        if (arguments.length !== 1) return S = this.root + S, s.call(this, S, L, A), this;
        if (k(S)) {
          var P = S;
          return this.filter(function(B, W) {
            return !W.dir && P.test(B);
          });
        }
        var w = this.files[this.root + S];
        return w && !w.dir ? w : null;
      }, folder: function(S) {
        if (!S) return this;
        if (k(S)) return this.filter(function(w, B) {
          return B.dir && S.test(w);
        });
        var L = this.root + S, A = d.call(this, L), P = this.clone();
        return P.root = A.name, P;
      }, remove: function(S) {
        S = this.root + S;
        var L = this.files[S];
        if (L || (S.slice(-1) !== "/" && (S += "/"), L = this.files[S]), L && !L.dir) delete this.files[S];
        else for (var A = this.filter(function(w, B) {
          return B.name.slice(0, S.length) === S;
        }), P = 0; P < A.length; P++) delete this.files[A[P].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(S) {
        var L, A = {};
        try {
          if ((A = r.extend(S || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: l.utf8encode })).type = A.type.toLowerCase(), A.compression = A.compression.toUpperCase(), A.type === "binarystring" && (A.type = "string"), !A.type) throw new Error("No output type specified.");
          r.checkSupport(A.type), A.platform !== "darwin" && A.platform !== "freebsd" && A.platform !== "linux" && A.platform !== "sunos" || (A.platform = "UNIX"), A.platform === "win32" && (A.platform = "DOS");
          var P = A.comment || this.comment || "";
          L = a.generateWorker(this, A, P);
        } catch (w) {
          (L = new i("error")).error(w);
        }
        return new m(L, A.type || "string", A.mimeType);
      }, generateAsync: function(S, L) {
        return this.generateInternalStream(S).accumulate(L);
      }, generateNodeStream: function(S, L) {
        return (S = S || {}).type || (S.type = "nodebuffer"), this.generateInternalStream(S).toNodejsStream(L);
      } };
      C.exports = E;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(p, C, v) {
      C.exports = p("stream");
    }, { stream: void 0 }], 17: [function(p, C, v) {
      var s = p("./DataReader");
      function l(r) {
        s.call(this, r);
        for (var i = 0; i < this.data.length; i++) r[i] = 255 & r[i];
      }
      p("../utils").inherits(l, s), l.prototype.byteAt = function(r) {
        return this.data[this.zero + r];
      }, l.prototype.lastIndexOfSignature = function(r) {
        for (var i = r.charCodeAt(0), m = r.charCodeAt(1), y = r.charCodeAt(2), g = r.charCodeAt(3), b = this.length - 4; 0 <= b; --b) if (this.data[b] === i && this.data[b + 1] === m && this.data[b + 2] === y && this.data[b + 3] === g) return b - this.zero;
        return -1;
      }, l.prototype.readAndCheckSignature = function(r) {
        var i = r.charCodeAt(0), m = r.charCodeAt(1), y = r.charCodeAt(2), g = r.charCodeAt(3), b = this.readData(4);
        return i === b[0] && m === b[1] && y === b[2] && g === b[3];
      }, l.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return [];
        var i = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, i;
      }, C.exports = l;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(p, C, v) {
      var s = p("../utils");
      function l(r) {
        this.data = r, this.length = r.length, this.index = 0, this.zero = 0;
      }
      l.prototype = { checkOffset: function(r) {
        this.checkIndex(this.index + r);
      }, checkIndex: function(r) {
        if (this.length < this.zero + r || r < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + r + "). Corrupted zip ?");
      }, setIndex: function(r) {
        this.checkIndex(r), this.index = r;
      }, skip: function(r) {
        this.setIndex(this.index + r);
      }, byteAt: function() {
      }, readInt: function(r) {
        var i, m = 0;
        for (this.checkOffset(r), i = this.index + r - 1; i >= this.index; i--) m = (m << 8) + this.byteAt(i);
        return this.index += r, m;
      }, readString: function(r) {
        return s.transformTo("string", this.readData(r));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var r = this.readInt(4);
        return new Date(Date.UTC(1980 + (r >> 25 & 127), (r >> 21 & 15) - 1, r >> 16 & 31, r >> 11 & 31, r >> 5 & 63, (31 & r) << 1));
      } }, C.exports = l;
    }, { "../utils": 32 }], 19: [function(p, C, v) {
      var s = p("./Uint8ArrayReader");
      function l(r) {
        s.call(this, r);
      }
      p("../utils").inherits(l, s), l.prototype.readData = function(r) {
        this.checkOffset(r);
        var i = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, i;
      }, C.exports = l;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(p, C, v) {
      var s = p("./DataReader");
      function l(r) {
        s.call(this, r);
      }
      p("../utils").inherits(l, s), l.prototype.byteAt = function(r) {
        return this.data.charCodeAt(this.zero + r);
      }, l.prototype.lastIndexOfSignature = function(r) {
        return this.data.lastIndexOf(r) - this.zero;
      }, l.prototype.readAndCheckSignature = function(r) {
        return r === this.readData(4);
      }, l.prototype.readData = function(r) {
        this.checkOffset(r);
        var i = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, i;
      }, C.exports = l;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(p, C, v) {
      var s = p("./ArrayReader");
      function l(r) {
        s.call(this, r);
      }
      p("../utils").inherits(l, s), l.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return new Uint8Array(0);
        var i = this.data.subarray(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, i;
      }, C.exports = l;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(p, C, v) {
      var s = p("../utils"), l = p("../support"), r = p("./ArrayReader"), i = p("./StringReader"), m = p("./NodeBufferReader"), y = p("./Uint8ArrayReader");
      C.exports = function(g) {
        var b = s.getTypeOf(g);
        return s.checkSupport(b), b !== "string" || l.uint8array ? b === "nodebuffer" ? new m(g) : l.uint8array ? new y(s.transformTo("uint8array", g)) : new r(s.transformTo("array", g)) : new i(g);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(p, C, v) {
      v.LOCAL_FILE_HEADER = "PK", v.CENTRAL_FILE_HEADER = "PK", v.CENTRAL_DIRECTORY_END = "PK", v.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", v.ZIP64_CENTRAL_DIRECTORY_END = "PK", v.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(p, C, v) {
      var s = p("./GenericWorker"), l = p("../utils");
      function r(i) {
        s.call(this, "ConvertWorker to " + i), this.destType = i;
      }
      l.inherits(r, s), r.prototype.processChunk = function(i) {
        this.push({ data: l.transformTo(this.destType, i.data), meta: i.meta });
      }, C.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(p, C, v) {
      var s = p("./GenericWorker"), l = p("../crc32");
      function r() {
        s.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      p("../utils").inherits(r, s), r.prototype.processChunk = function(i) {
        this.streamInfo.crc32 = l(i.data, this.streamInfo.crc32 || 0), this.push(i);
      }, C.exports = r;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(p, C, v) {
      var s = p("../utils"), l = p("./GenericWorker");
      function r(i) {
        l.call(this, "DataLengthProbe for " + i), this.propName = i, this.withStreamInfo(i, 0);
      }
      s.inherits(r, l), r.prototype.processChunk = function(i) {
        if (i) {
          var m = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = m + i.data.length;
        }
        l.prototype.processChunk.call(this, i);
      }, C.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(p, C, v) {
      var s = p("../utils"), l = p("./GenericWorker");
      function r(i) {
        l.call(this, "DataWorker");
        var m = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, i.then(function(y) {
          m.dataIsReady = !0, m.data = y, m.max = y && y.length || 0, m.type = s.getTypeOf(y), m.isPaused || m._tickAndRepeat();
        }, function(y) {
          m.error(y);
        });
      }
      s.inherits(r, l), r.prototype.cleanUp = function() {
        l.prototype.cleanUp.call(this), this.data = null;
      }, r.prototype.resume = function() {
        return !!l.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, s.delay(this._tickAndRepeat, [], this)), !0);
      }, r.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (s.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, r.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return !1;
        var i = null, m = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            i = this.data.substring(this.index, m);
            break;
          case "uint8array":
            i = this.data.subarray(this.index, m);
            break;
          case "array":
          case "nodebuffer":
            i = this.data.slice(this.index, m);
        }
        return this.index = m, this.push({ data: i, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, C.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(p, C, v) {
      function s(l) {
        this.name = l || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      s.prototype = { push: function(l) {
        this.emit("data", l);
      }, end: function() {
        if (this.isFinished) return !1;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = !0;
        } catch (l) {
          this.emit("error", l);
        }
        return !0;
      }, error: function(l) {
        return !this.isFinished && (this.isPaused ? this.generatedError = l : (this.isFinished = !0, this.emit("error", l), this.previous && this.previous.error(l), this.cleanUp()), !0);
      }, on: function(l, r) {
        return this._listeners[l].push(r), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(l, r) {
        if (this._listeners[l]) for (var i = 0; i < this._listeners[l].length; i++) this._listeners[l][i].call(this, r);
      }, pipe: function(l) {
        return l.registerPrevious(this);
      }, registerPrevious: function(l) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = l.streamInfo, this.mergeStreamInfo(), this.previous = l;
        var r = this;
        return l.on("data", function(i) {
          r.processChunk(i);
        }), l.on("end", function() {
          r.end();
        }), l.on("error", function(i) {
          r.error(i);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
      }, resume: function() {
        if (!this.isPaused || this.isFinished) return !1;
        var l = this.isPaused = !1;
        return this.generatedError && (this.error(this.generatedError), l = !0), this.previous && this.previous.resume(), !l;
      }, flush: function() {
      }, processChunk: function(l) {
        this.push(l);
      }, withStreamInfo: function(l, r) {
        return this.extraStreamInfo[l] = r, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var l in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, l) && (this.streamInfo[l] = this.extraStreamInfo[l]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = !0, this.previous && this.previous.lock();
      }, toString: function() {
        var l = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + l : l;
      } }, C.exports = s;
    }, {}], 29: [function(p, C, v) {
      var s = p("../utils"), l = p("./ConvertWorker"), r = p("./GenericWorker"), i = p("../base64"), m = p("../support"), y = p("../external"), g = null;
      if (m.nodestream) try {
        g = p("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function b(h, n) {
        return new y.Promise(function(c, o) {
          var d = [], k = h._internalType, E = h._outputType, S = h._mimeType;
          h.on("data", function(L, A) {
            d.push(L), n && n(A);
          }).on("error", function(L) {
            d = [], o(L);
          }).on("end", function() {
            try {
              var L = function(A, P, w) {
                switch (A) {
                  case "blob":
                    return s.newBlob(s.transformTo("arraybuffer", P), w);
                  case "base64":
                    return i.encode(P);
                  default:
                    return s.transformTo(A, P);
                }
              }(E, function(A, P) {
                var w, B = 0, W = null, _ = 0;
                for (w = 0; w < P.length; w++) _ += P[w].length;
                switch (A) {
                  case "string":
                    return P.join("");
                  case "array":
                    return Array.prototype.concat.apply([], P);
                  case "uint8array":
                    for (W = new Uint8Array(_), w = 0; w < P.length; w++) W.set(P[w], B), B += P[w].length;
                    return W;
                  case "nodebuffer":
                    return Buffer.concat(P);
                  default:
                    throw new Error("concat : unsupported type '" + A + "'");
                }
              }(k, d), S);
              c(L);
            } catch (A) {
              o(A);
            }
            d = [];
          }).resume();
        });
      }
      function a(h, n, c) {
        var o = n;
        switch (n) {
          case "blob":
          case "arraybuffer":
            o = "uint8array";
            break;
          case "base64":
            o = "string";
        }
        try {
          this._internalType = o, this._outputType = n, this._mimeType = c, s.checkSupport(o), this._worker = h.pipe(new l(o)), h.lock();
        } catch (d) {
          this._worker = new r("error"), this._worker.error(d);
        }
      }
      a.prototype = { accumulate: function(h) {
        return b(this, h);
      }, on: function(h, n) {
        var c = this;
        return h === "data" ? this._worker.on(h, function(o) {
          n.call(c, o.data, o.meta);
        }) : this._worker.on(h, function() {
          s.delay(n, arguments, c);
        }), this;
      }, resume: function() {
        return s.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(h) {
        if (s.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new g(this, { objectMode: this._outputType !== "nodebuffer" }, h);
      } }, C.exports = a;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(p, C, v) {
      if (v.base64 = !0, v.array = !0, v.string = !0, v.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", v.nodebuffer = typeof Buffer < "u", v.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") v.blob = !1;
      else {
        var s = new ArrayBuffer(0);
        try {
          v.blob = new Blob([s], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var l = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            l.append(s), v.blob = l.getBlob("application/zip").size === 0;
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
    }, { "readable-stream": 16 }], 31: [function(p, C, v) {
      for (var s = p("./utils"), l = p("./support"), r = p("./nodejsUtils"), i = p("./stream/GenericWorker"), m = new Array(256), y = 0; y < 256; y++) m[y] = 252 <= y ? 6 : 248 <= y ? 5 : 240 <= y ? 4 : 224 <= y ? 3 : 192 <= y ? 2 : 1;
      m[254] = m[254] = 1;
      function g() {
        i.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function b() {
        i.call(this, "utf-8 encode");
      }
      v.utf8encode = function(a) {
        return l.nodebuffer ? r.newBufferFrom(a, "utf-8") : function(h) {
          var n, c, o, d, k, E = h.length, S = 0;
          for (d = 0; d < E; d++) (64512 & (c = h.charCodeAt(d))) == 55296 && d + 1 < E && (64512 & (o = h.charCodeAt(d + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (o - 56320), d++), S += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
          for (n = l.uint8array ? new Uint8Array(S) : new Array(S), d = k = 0; k < S; d++) (64512 & (c = h.charCodeAt(d))) == 55296 && d + 1 < E && (64512 & (o = h.charCodeAt(d + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (o - 56320), d++), c < 128 ? n[k++] = c : (c < 2048 ? n[k++] = 192 | c >>> 6 : (c < 65536 ? n[k++] = 224 | c >>> 12 : (n[k++] = 240 | c >>> 18, n[k++] = 128 | c >>> 12 & 63), n[k++] = 128 | c >>> 6 & 63), n[k++] = 128 | 63 & c);
          return n;
        }(a);
      }, v.utf8decode = function(a) {
        return l.nodebuffer ? s.transformTo("nodebuffer", a).toString("utf-8") : function(h) {
          var n, c, o, d, k = h.length, E = new Array(2 * k);
          for (n = c = 0; n < k; ) if ((o = h[n++]) < 128) E[c++] = o;
          else if (4 < (d = m[o])) E[c++] = 65533, n += d - 1;
          else {
            for (o &= d === 2 ? 31 : d === 3 ? 15 : 7; 1 < d && n < k; ) o = o << 6 | 63 & h[n++], d--;
            1 < d ? E[c++] = 65533 : o < 65536 ? E[c++] = o : (o -= 65536, E[c++] = 55296 | o >> 10 & 1023, E[c++] = 56320 | 1023 & o);
          }
          return E.length !== c && (E.subarray ? E = E.subarray(0, c) : E.length = c), s.applyFromCharCode(E);
        }(a = s.transformTo(l.uint8array ? "uint8array" : "array", a));
      }, s.inherits(g, i), g.prototype.processChunk = function(a) {
        var h = s.transformTo(l.uint8array ? "uint8array" : "array", a.data);
        if (this.leftOver && this.leftOver.length) {
          if (l.uint8array) {
            var n = h;
            (h = new Uint8Array(n.length + this.leftOver.length)).set(this.leftOver, 0), h.set(n, this.leftOver.length);
          } else h = this.leftOver.concat(h);
          this.leftOver = null;
        }
        var c = function(d, k) {
          var E;
          for ((k = k || d.length) > d.length && (k = d.length), E = k - 1; 0 <= E && (192 & d[E]) == 128; ) E--;
          return E < 0 || E === 0 ? k : E + m[d[E]] > k ? E : k;
        }(h), o = h;
        c !== h.length && (l.uint8array ? (o = h.subarray(0, c), this.leftOver = h.subarray(c, h.length)) : (o = h.slice(0, c), this.leftOver = h.slice(c, h.length))), this.push({ data: v.utf8decode(o), meta: a.meta });
      }, g.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: v.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, v.Utf8DecodeWorker = g, s.inherits(b, i), b.prototype.processChunk = function(a) {
        this.push({ data: v.utf8encode(a.data), meta: a.meta });
      }, v.Utf8EncodeWorker = b;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(p, C, v) {
      var s = p("./support"), l = p("./base64"), r = p("./nodejsUtils"), i = p("./external");
      function m(n) {
        return n;
      }
      function y(n, c) {
        for (var o = 0; o < n.length; ++o) c[o] = 255 & n.charCodeAt(o);
        return c;
      }
      p("setimmediate"), v.newBlob = function(n, c) {
        v.checkSupport("blob");
        try {
          return new Blob([n], { type: c });
        } catch {
          try {
            var o = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return o.append(n), o.getBlob(c);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var g = { stringifyByChunk: function(n, c, o) {
        var d = [], k = 0, E = n.length;
        if (E <= o) return String.fromCharCode.apply(null, n);
        for (; k < E; ) c === "array" || c === "nodebuffer" ? d.push(String.fromCharCode.apply(null, n.slice(k, Math.min(k + o, E)))) : d.push(String.fromCharCode.apply(null, n.subarray(k, Math.min(k + o, E)))), k += o;
        return d.join("");
      }, stringifyByChar: function(n) {
        for (var c = "", o = 0; o < n.length; o++) c += String.fromCharCode(n[o]);
        return c;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return s.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return !1;
        }
      }(), nodebuffer: function() {
        try {
          return s.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1;
        } catch {
          return !1;
        }
      }() } };
      function b(n) {
        var c = 65536, o = v.getTypeOf(n), d = !0;
        if (o === "uint8array" ? d = g.applyCanBeUsed.uint8array : o === "nodebuffer" && (d = g.applyCanBeUsed.nodebuffer), d) for (; 1 < c; ) try {
          return g.stringifyByChunk(n, o, c);
        } catch {
          c = Math.floor(c / 2);
        }
        return g.stringifyByChar(n);
      }
      function a(n, c) {
        for (var o = 0; o < n.length; o++) c[o] = n[o];
        return c;
      }
      v.applyFromCharCode = b;
      var h = {};
      h.string = { string: m, array: function(n) {
        return y(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return h.string.uint8array(n).buffer;
      }, uint8array: function(n) {
        return y(n, new Uint8Array(n.length));
      }, nodebuffer: function(n) {
        return y(n, r.allocBuffer(n.length));
      } }, h.array = { string: b, array: m, arraybuffer: function(n) {
        return new Uint8Array(n).buffer;
      }, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, h.arraybuffer = { string: function(n) {
        return b(new Uint8Array(n));
      }, array: function(n) {
        return a(new Uint8Array(n), new Array(n.byteLength));
      }, arraybuffer: m, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(new Uint8Array(n));
      } }, h.uint8array = { string: b, array: function(n) {
        return a(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return n.buffer;
      }, uint8array: m, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, h.nodebuffer = { string: b, array: function(n) {
        return a(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return h.nodebuffer.uint8array(n).buffer;
      }, uint8array: function(n) {
        return a(n, new Uint8Array(n.length));
      }, nodebuffer: m }, v.transformTo = function(n, c) {
        if (c = c || "", !n) return c;
        v.checkSupport(n);
        var o = v.getTypeOf(c);
        return h[o][n](c);
      }, v.resolve = function(n) {
        for (var c = n.split("/"), o = [], d = 0; d < c.length; d++) {
          var k = c[d];
          k === "." || k === "" && d !== 0 && d !== c.length - 1 || (k === ".." ? o.pop() : o.push(k));
        }
        return o.join("/");
      }, v.getTypeOf = function(n) {
        return typeof n == "string" ? "string" : Object.prototype.toString.call(n) === "[object Array]" ? "array" : s.nodebuffer && r.isBuffer(n) ? "nodebuffer" : s.uint8array && n instanceof Uint8Array ? "uint8array" : s.arraybuffer && n instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, v.checkSupport = function(n) {
        if (!s[n.toLowerCase()]) throw new Error(n + " is not supported by this platform");
      }, v.MAX_VALUE_16BITS = 65535, v.MAX_VALUE_32BITS = -1, v.pretty = function(n) {
        var c, o, d = "";
        for (o = 0; o < (n || "").length; o++) d += "\\x" + ((c = n.charCodeAt(o)) < 16 ? "0" : "") + c.toString(16).toUpperCase();
        return d;
      }, v.delay = function(n, c, o) {
        setImmediate(function() {
          n.apply(o || null, c || []);
        });
      }, v.inherits = function(n, c) {
        function o() {
        }
        o.prototype = c.prototype, n.prototype = new o();
      }, v.extend = function() {
        var n, c, o = {};
        for (n = 0; n < arguments.length; n++) for (c in arguments[n]) Object.prototype.hasOwnProperty.call(arguments[n], c) && o[c] === void 0 && (o[c] = arguments[n][c]);
        return o;
      }, v.prepareContent = function(n, c, o, d, k) {
        return i.Promise.resolve(c).then(function(E) {
          return s.blob && (E instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(E)) !== -1) && typeof FileReader < "u" ? new i.Promise(function(S, L) {
            var A = new FileReader();
            A.onload = function(P) {
              S(P.target.result);
            }, A.onerror = function(P) {
              L(P.target.error);
            }, A.readAsArrayBuffer(E);
          }) : E;
        }).then(function(E) {
          var S = v.getTypeOf(E);
          return S ? (S === "arraybuffer" ? E = v.transformTo("uint8array", E) : S === "string" && (k ? E = l.decode(E) : o && d !== !0 && (E = function(L) {
            return y(L, s.uint8array ? new Uint8Array(L.length) : new Array(L.length));
          }(E))), E) : i.Promise.reject(new Error("Can't read the data of '" + n + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(p, C, v) {
      var s = p("./reader/readerFor"), l = p("./utils"), r = p("./signature"), i = p("./zipEntry"), m = p("./support");
      function y(g) {
        this.files = [], this.loadOptions = g;
      }
      y.prototype = { checkSignature: function(g) {
        if (!this.reader.readAndCheckSignature(g)) {
          this.reader.index -= 4;
          var b = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + l.pretty(b) + ", expected " + l.pretty(g) + ")");
        }
      }, isSignature: function(g, b) {
        var a = this.reader.index;
        this.reader.setIndex(g);
        var h = this.reader.readString(4) === b;
        return this.reader.setIndex(a), h;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var g = this.reader.readData(this.zipCommentLength), b = m.uint8array ? "uint8array" : "array", a = l.transformTo(b, g);
        this.zipComment = this.loadOptions.decodeFileName(a);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var g, b, a, h = this.zip64EndOfCentralSize - 44; 0 < h; ) g = this.reader.readInt(2), b = this.reader.readInt(4), a = this.reader.readData(b), this.zip64ExtensibleData[g] = { id: g, length: b, value: a };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var g, b;
        for (g = 0; g < this.files.length; g++) b = this.files[g], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(r.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8(), b.processAttributes();
      }, readCentralDir: function() {
        var g;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER); ) (g = new i({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(g);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var g = this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);
        if (g < 0) throw this.isSignature(0, r.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(g);
        var b = g;
        if (this.checkSignature(r.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === l.MAX_VALUE_16BITS || this.diskWithCentralDirStart === l.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === l.MAX_VALUE_16BITS || this.centralDirRecords === l.MAX_VALUE_16BITS || this.centralDirSize === l.MAX_VALUE_32BITS || this.centralDirOffset === l.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (g = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(g), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, r.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var a = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (a += 20, a += 12 + this.zip64EndOfCentralSize);
        var h = b - a;
        if (0 < h) this.isSignature(b, r.CENTRAL_FILE_HEADER) || (this.reader.zero = h);
        else if (h < 0) throw new Error("Corrupted zip: missing " + Math.abs(h) + " bytes.");
      }, prepareReader: function(g) {
        this.reader = s(g);
      }, load: function(g) {
        this.prepareReader(g), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, C.exports = y;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(p, C, v) {
      var s = p("./reader/readerFor"), l = p("./utils"), r = p("./compressedObject"), i = p("./crc32"), m = p("./utf8"), y = p("./compressions"), g = p("./support");
      function b(a, h) {
        this.options = a, this.loadOptions = h;
      }
      b.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(a) {
        var h, n;
        if (a.skip(22), this.fileNameLength = a.readInt(2), n = a.readInt(2), this.fileName = a.readData(this.fileNameLength), a.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((h = function(c) {
          for (var o in y) if (Object.prototype.hasOwnProperty.call(y, o) && y[o].magic === c) return y[o];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + l.pretty(this.compressionMethod) + " unknown (inner file : " + l.transformTo("string", this.fileName) + ")");
        this.decompressed = new r(this.compressedSize, this.uncompressedSize, this.crc32, h, a.readData(this.compressedSize));
      }, readCentralPart: function(a) {
        this.versionMadeBy = a.readInt(2), a.skip(2), this.bitFlag = a.readInt(2), this.compressionMethod = a.readString(2), this.date = a.readDate(), this.crc32 = a.readInt(4), this.compressedSize = a.readInt(4), this.uncompressedSize = a.readInt(4);
        var h = a.readInt(2);
        if (this.extraFieldsLength = a.readInt(2), this.fileCommentLength = a.readInt(2), this.diskNumberStart = a.readInt(2), this.internalFileAttributes = a.readInt(2), this.externalFileAttributes = a.readInt(4), this.localHeaderOffset = a.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        a.skip(h), this.readExtraFields(a), this.parseZIP64ExtraField(a), this.fileComment = a.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var a = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), a == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), a == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var a = s(this.extraFields[1].value);
          this.uncompressedSize === l.MAX_VALUE_32BITS && (this.uncompressedSize = a.readInt(8)), this.compressedSize === l.MAX_VALUE_32BITS && (this.compressedSize = a.readInt(8)), this.localHeaderOffset === l.MAX_VALUE_32BITS && (this.localHeaderOffset = a.readInt(8)), this.diskNumberStart === l.MAX_VALUE_32BITS && (this.diskNumberStart = a.readInt(4));
        }
      }, readExtraFields: function(a) {
        var h, n, c, o = a.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); a.index + 4 < o; ) h = a.readInt(2), n = a.readInt(2), c = a.readData(n), this.extraFields[h] = { id: h, length: n, value: c };
        a.setIndex(o);
      }, handleUTF8: function() {
        var a = g.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = m.utf8decode(this.fileName), this.fileCommentStr = m.utf8decode(this.fileComment);
        else {
          var h = this.findExtraFieldUnicodePath();
          if (h !== null) this.fileNameStr = h;
          else {
            var n = l.transformTo(a, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(n);
          }
          var c = this.findExtraFieldUnicodeComment();
          if (c !== null) this.fileCommentStr = c;
          else {
            var o = l.transformTo(a, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(o);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var a = this.extraFields[28789];
        if (a) {
          var h = s(a.value);
          return h.readInt(1) !== 1 || i(this.fileName) !== h.readInt(4) ? null : m.utf8decode(h.readData(a.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var a = this.extraFields[25461];
        if (a) {
          var h = s(a.value);
          return h.readInt(1) !== 1 || i(this.fileComment) !== h.readInt(4) ? null : m.utf8decode(h.readData(a.length - 5));
        }
        return null;
      } }, C.exports = b;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(p, C, v) {
      function s(h, n, c) {
        this.name = h, this.dir = c.dir, this.date = c.date, this.comment = c.comment, this.unixPermissions = c.unixPermissions, this.dosPermissions = c.dosPermissions, this._data = n, this._dataBinary = c.binary, this.options = { compression: c.compression, compressionOptions: c.compressionOptions };
      }
      var l = p("./stream/StreamHelper"), r = p("./stream/DataWorker"), i = p("./utf8"), m = p("./compressedObject"), y = p("./stream/GenericWorker");
      s.prototype = { internalStream: function(h) {
        var n = null, c = "string";
        try {
          if (!h) throw new Error("No output type specified.");
          var o = (c = h.toLowerCase()) === "string" || c === "text";
          c !== "binarystring" && c !== "text" || (c = "string"), n = this._decompressWorker();
          var d = !this._dataBinary;
          d && !o && (n = n.pipe(new i.Utf8EncodeWorker())), !d && o && (n = n.pipe(new i.Utf8DecodeWorker()));
        } catch (k) {
          (n = new y("error")).error(k);
        }
        return new l(n, c, "");
      }, async: function(h, n) {
        return this.internalStream(h).accumulate(n);
      }, nodeStream: function(h, n) {
        return this.internalStream(h || "nodebuffer").toNodejsStream(n);
      }, _compressWorker: function(h, n) {
        if (this._data instanceof m && this._data.compression.magic === h.magic) return this._data.getCompressedWorker();
        var c = this._decompressWorker();
        return this._dataBinary || (c = c.pipe(new i.Utf8EncodeWorker())), m.createWorkerFrom(c, h, n);
      }, _decompressWorker: function() {
        return this._data instanceof m ? this._data.getContentWorker() : this._data instanceof y ? this._data : new r(this._data);
      } };
      for (var g = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], b = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, a = 0; a < g.length; a++) s.prototype[g[a]] = b;
      C.exports = s;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(p, C, v) {
      (function(s) {
        var l, r, i = s.MutationObserver || s.WebKitMutationObserver;
        if (i) {
          var m = 0, y = new i(h), g = s.document.createTextNode("");
          y.observe(g, { characterData: !0 }), l = function() {
            g.data = m = ++m % 2;
          };
        } else if (s.setImmediate || s.MessageChannel === void 0) l = "document" in s && "onreadystatechange" in s.document.createElement("script") ? function() {
          var n = s.document.createElement("script");
          n.onreadystatechange = function() {
            h(), n.onreadystatechange = null, n.parentNode.removeChild(n), n = null;
          }, s.document.documentElement.appendChild(n);
        } : function() {
          setTimeout(h, 0);
        };
        else {
          var b = new s.MessageChannel();
          b.port1.onmessage = h, l = function() {
            b.port2.postMessage(0);
          };
        }
        var a = [];
        function h() {
          var n, c;
          r = !0;
          for (var o = a.length; o; ) {
            for (c = a, a = [], n = -1; ++n < o; ) c[n]();
            o = a.length;
          }
          r = !1;
        }
        C.exports = function(n) {
          a.push(n) !== 1 || r || l();
        };
      }).call(this, typeof Ot < "u" ? Ot : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(p, C, v) {
      var s = p("immediate");
      function l() {
      }
      var r = {}, i = ["REJECTED"], m = ["FULFILLED"], y = ["PENDING"];
      function g(o) {
        if (typeof o != "function") throw new TypeError("resolver must be a function");
        this.state = y, this.queue = [], this.outcome = void 0, o !== l && n(this, o);
      }
      function b(o, d, k) {
        this.promise = o, typeof d == "function" && (this.onFulfilled = d, this.callFulfilled = this.otherCallFulfilled), typeof k == "function" && (this.onRejected = k, this.callRejected = this.otherCallRejected);
      }
      function a(o, d, k) {
        s(function() {
          var E;
          try {
            E = d(k);
          } catch (S) {
            return r.reject(o, S);
          }
          E === o ? r.reject(o, new TypeError("Cannot resolve promise with itself")) : r.resolve(o, E);
        });
      }
      function h(o) {
        var d = o && o.then;
        if (o && (typeof o == "object" || typeof o == "function") && typeof d == "function") return function() {
          d.apply(o, arguments);
        };
      }
      function n(o, d) {
        var k = !1;
        function E(A) {
          k || (k = !0, r.reject(o, A));
        }
        function S(A) {
          k || (k = !0, r.resolve(o, A));
        }
        var L = c(function() {
          d(S, E);
        });
        L.status === "error" && E(L.value);
      }
      function c(o, d) {
        var k = {};
        try {
          k.value = o(d), k.status = "success";
        } catch (E) {
          k.status = "error", k.value = E;
        }
        return k;
      }
      (C.exports = g).prototype.finally = function(o) {
        if (typeof o != "function") return this;
        var d = this.constructor;
        return this.then(function(k) {
          return d.resolve(o()).then(function() {
            return k;
          });
        }, function(k) {
          return d.resolve(o()).then(function() {
            throw k;
          });
        });
      }, g.prototype.catch = function(o) {
        return this.then(null, o);
      }, g.prototype.then = function(o, d) {
        if (typeof o != "function" && this.state === m || typeof d != "function" && this.state === i) return this;
        var k = new this.constructor(l);
        return this.state !== y ? a(k, this.state === m ? o : d, this.outcome) : this.queue.push(new b(k, o, d)), k;
      }, b.prototype.callFulfilled = function(o) {
        r.resolve(this.promise, o);
      }, b.prototype.otherCallFulfilled = function(o) {
        a(this.promise, this.onFulfilled, o);
      }, b.prototype.callRejected = function(o) {
        r.reject(this.promise, o);
      }, b.prototype.otherCallRejected = function(o) {
        a(this.promise, this.onRejected, o);
      }, r.resolve = function(o, d) {
        var k = c(h, d);
        if (k.status === "error") return r.reject(o, k.value);
        var E = k.value;
        if (E) n(o, E);
        else {
          o.state = m, o.outcome = d;
          for (var S = -1, L = o.queue.length; ++S < L; ) o.queue[S].callFulfilled(d);
        }
        return o;
      }, r.reject = function(o, d) {
        o.state = i, o.outcome = d;
        for (var k = -1, E = o.queue.length; ++k < E; ) o.queue[k].callRejected(d);
        return o;
      }, g.resolve = function(o) {
        return o instanceof this ? o : r.resolve(new this(l), o);
      }, g.reject = function(o) {
        var d = new this(l);
        return r.reject(d, o);
      }, g.all = function(o) {
        var d = this;
        if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var k = o.length, E = !1;
        if (!k) return this.resolve([]);
        for (var S = new Array(k), L = 0, A = -1, P = new this(l); ++A < k; ) w(o[A], A);
        return P;
        function w(B, W) {
          d.resolve(B).then(function(_) {
            S[W] = _, ++L !== k || E || (E = !0, r.resolve(P, S));
          }, function(_) {
            E || (E = !0, r.reject(P, _));
          });
        }
      }, g.race = function(o) {
        var d = this;
        if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var k = o.length, E = !1;
        if (!k) return this.resolve([]);
        for (var S = -1, L = new this(l); ++S < k; ) A = o[S], d.resolve(A).then(function(P) {
          E || (E = !0, r.resolve(L, P));
        }, function(P) {
          E || (E = !0, r.reject(L, P));
        });
        var A;
        return L;
      };
    }, { immediate: 36 }], 38: [function(p, C, v) {
      var s = {};
      (0, p("./lib/utils/common").assign)(s, p("./lib/deflate"), p("./lib/inflate"), p("./lib/zlib/constants")), C.exports = s;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(p, C, v) {
      var s = p("./zlib/deflate"), l = p("./utils/common"), r = p("./utils/strings"), i = p("./zlib/messages"), m = p("./zlib/zstream"), y = Object.prototype.toString, g = 0, b = -1, a = 0, h = 8;
      function n(o) {
        if (!(this instanceof n)) return new n(o);
        this.options = l.assign({ level: b, method: h, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: a, to: "" }, o || {});
        var d = this.options;
        d.raw && 0 < d.windowBits ? d.windowBits = -d.windowBits : d.gzip && 0 < d.windowBits && d.windowBits < 16 && (d.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new m(), this.strm.avail_out = 0;
        var k = s.deflateInit2(this.strm, d.level, d.method, d.windowBits, d.memLevel, d.strategy);
        if (k !== g) throw new Error(i[k]);
        if (d.header && s.deflateSetHeader(this.strm, d.header), d.dictionary) {
          var E;
          if (E = typeof d.dictionary == "string" ? r.string2buf(d.dictionary) : y.call(d.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(d.dictionary) : d.dictionary, (k = s.deflateSetDictionary(this.strm, E)) !== g) throw new Error(i[k]);
          this._dict_set = !0;
        }
      }
      function c(o, d) {
        var k = new n(d);
        if (k.push(o, !0), k.err) throw k.msg || i[k.err];
        return k.result;
      }
      n.prototype.push = function(o, d) {
        var k, E, S = this.strm, L = this.options.chunkSize;
        if (this.ended) return !1;
        E = d === ~~d ? d : d === !0 ? 4 : 0, typeof o == "string" ? S.input = r.string2buf(o) : y.call(o) === "[object ArrayBuffer]" ? S.input = new Uint8Array(o) : S.input = o, S.next_in = 0, S.avail_in = S.input.length;
        do {
          if (S.avail_out === 0 && (S.output = new l.Buf8(L), S.next_out = 0, S.avail_out = L), (k = s.deflate(S, E)) !== 1 && k !== g) return this.onEnd(k), !(this.ended = !0);
          S.avail_out !== 0 && (S.avail_in !== 0 || E !== 4 && E !== 2) || (this.options.to === "string" ? this.onData(r.buf2binstring(l.shrinkBuf(S.output, S.next_out))) : this.onData(l.shrinkBuf(S.output, S.next_out)));
        } while ((0 < S.avail_in || S.avail_out === 0) && k !== 1);
        return E === 4 ? (k = s.deflateEnd(this.strm), this.onEnd(k), this.ended = !0, k === g) : E !== 2 || (this.onEnd(g), !(S.avail_out = 0));
      }, n.prototype.onData = function(o) {
        this.chunks.push(o);
      }, n.prototype.onEnd = function(o) {
        o === g && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = o, this.msg = this.strm.msg;
      }, v.Deflate = n, v.deflate = c, v.deflateRaw = function(o, d) {
        return (d = d || {}).raw = !0, c(o, d);
      }, v.gzip = function(o, d) {
        return (d = d || {}).gzip = !0, c(o, d);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(p, C, v) {
      var s = p("./zlib/inflate"), l = p("./utils/common"), r = p("./utils/strings"), i = p("./zlib/constants"), m = p("./zlib/messages"), y = p("./zlib/zstream"), g = p("./zlib/gzheader"), b = Object.prototype.toString;
      function a(n) {
        if (!(this instanceof a)) return new a(n);
        this.options = l.assign({ chunkSize: 16384, windowBits: 0, to: "" }, n || {});
        var c = this.options;
        c.raw && 0 <= c.windowBits && c.windowBits < 16 && (c.windowBits = -c.windowBits, c.windowBits === 0 && (c.windowBits = -15)), !(0 <= c.windowBits && c.windowBits < 16) || n && n.windowBits || (c.windowBits += 32), 15 < c.windowBits && c.windowBits < 48 && !(15 & c.windowBits) && (c.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new y(), this.strm.avail_out = 0;
        var o = s.inflateInit2(this.strm, c.windowBits);
        if (o !== i.Z_OK) throw new Error(m[o]);
        this.header = new g(), s.inflateGetHeader(this.strm, this.header);
      }
      function h(n, c) {
        var o = new a(c);
        if (o.push(n, !0), o.err) throw o.msg || m[o.err];
        return o.result;
      }
      a.prototype.push = function(n, c) {
        var o, d, k, E, S, L, A = this.strm, P = this.options.chunkSize, w = this.options.dictionary, B = !1;
        if (this.ended) return !1;
        d = c === ~~c ? c : c === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof n == "string" ? A.input = r.binstring2buf(n) : b.call(n) === "[object ArrayBuffer]" ? A.input = new Uint8Array(n) : A.input = n, A.next_in = 0, A.avail_in = A.input.length;
        do {
          if (A.avail_out === 0 && (A.output = new l.Buf8(P), A.next_out = 0, A.avail_out = P), (o = s.inflate(A, i.Z_NO_FLUSH)) === i.Z_NEED_DICT && w && (L = typeof w == "string" ? r.string2buf(w) : b.call(w) === "[object ArrayBuffer]" ? new Uint8Array(w) : w, o = s.inflateSetDictionary(this.strm, L)), o === i.Z_BUF_ERROR && B === !0 && (o = i.Z_OK, B = !1), o !== i.Z_STREAM_END && o !== i.Z_OK) return this.onEnd(o), !(this.ended = !0);
          A.next_out && (A.avail_out !== 0 && o !== i.Z_STREAM_END && (A.avail_in !== 0 || d !== i.Z_FINISH && d !== i.Z_SYNC_FLUSH) || (this.options.to === "string" ? (k = r.utf8border(A.output, A.next_out), E = A.next_out - k, S = r.buf2string(A.output, k), A.next_out = E, A.avail_out = P - E, E && l.arraySet(A.output, A.output, k, E, 0), this.onData(S)) : this.onData(l.shrinkBuf(A.output, A.next_out)))), A.avail_in === 0 && A.avail_out === 0 && (B = !0);
        } while ((0 < A.avail_in || A.avail_out === 0) && o !== i.Z_STREAM_END);
        return o === i.Z_STREAM_END && (d = i.Z_FINISH), d === i.Z_FINISH ? (o = s.inflateEnd(this.strm), this.onEnd(o), this.ended = !0, o === i.Z_OK) : d !== i.Z_SYNC_FLUSH || (this.onEnd(i.Z_OK), !(A.avail_out = 0));
      }, a.prototype.onData = function(n) {
        this.chunks.push(n);
      }, a.prototype.onEnd = function(n) {
        n === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
      }, v.Inflate = a, v.inflate = h, v.inflateRaw = function(n, c) {
        return (c = c || {}).raw = !0, h(n, c);
      }, v.ungzip = h;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(p, C, v) {
      var s = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      v.assign = function(i) {
        for (var m = Array.prototype.slice.call(arguments, 1); m.length; ) {
          var y = m.shift();
          if (y) {
            if (typeof y != "object") throw new TypeError(y + "must be non-object");
            for (var g in y) y.hasOwnProperty(g) && (i[g] = y[g]);
          }
        }
        return i;
      }, v.shrinkBuf = function(i, m) {
        return i.length === m ? i : i.subarray ? i.subarray(0, m) : (i.length = m, i);
      };
      var l = { arraySet: function(i, m, y, g, b) {
        if (m.subarray && i.subarray) i.set(m.subarray(y, y + g), b);
        else for (var a = 0; a < g; a++) i[b + a] = m[y + a];
      }, flattenChunks: function(i) {
        var m, y, g, b, a, h;
        for (m = g = 0, y = i.length; m < y; m++) g += i[m].length;
        for (h = new Uint8Array(g), m = b = 0, y = i.length; m < y; m++) a = i[m], h.set(a, b), b += a.length;
        return h;
      } }, r = { arraySet: function(i, m, y, g, b) {
        for (var a = 0; a < g; a++) i[b + a] = m[y + a];
      }, flattenChunks: function(i) {
        return [].concat.apply([], i);
      } };
      v.setTyped = function(i) {
        i ? (v.Buf8 = Uint8Array, v.Buf16 = Uint16Array, v.Buf32 = Int32Array, v.assign(v, l)) : (v.Buf8 = Array, v.Buf16 = Array, v.Buf32 = Array, v.assign(v, r));
      }, v.setTyped(s);
    }, {}], 42: [function(p, C, v) {
      var s = p("./common"), l = !0, r = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        l = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        r = !1;
      }
      for (var i = new s.Buf8(256), m = 0; m < 256; m++) i[m] = 252 <= m ? 6 : 248 <= m ? 5 : 240 <= m ? 4 : 224 <= m ? 3 : 192 <= m ? 2 : 1;
      function y(g, b) {
        if (b < 65537 && (g.subarray && r || !g.subarray && l)) return String.fromCharCode.apply(null, s.shrinkBuf(g, b));
        for (var a = "", h = 0; h < b; h++) a += String.fromCharCode(g[h]);
        return a;
      }
      i[254] = i[254] = 1, v.string2buf = function(g) {
        var b, a, h, n, c, o = g.length, d = 0;
        for (n = 0; n < o; n++) (64512 & (a = g.charCodeAt(n))) == 55296 && n + 1 < o && (64512 & (h = g.charCodeAt(n + 1))) == 56320 && (a = 65536 + (a - 55296 << 10) + (h - 56320), n++), d += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
        for (b = new s.Buf8(d), n = c = 0; c < d; n++) (64512 & (a = g.charCodeAt(n))) == 55296 && n + 1 < o && (64512 & (h = g.charCodeAt(n + 1))) == 56320 && (a = 65536 + (a - 55296 << 10) + (h - 56320), n++), a < 128 ? b[c++] = a : (a < 2048 ? b[c++] = 192 | a >>> 6 : (a < 65536 ? b[c++] = 224 | a >>> 12 : (b[c++] = 240 | a >>> 18, b[c++] = 128 | a >>> 12 & 63), b[c++] = 128 | a >>> 6 & 63), b[c++] = 128 | 63 & a);
        return b;
      }, v.buf2binstring = function(g) {
        return y(g, g.length);
      }, v.binstring2buf = function(g) {
        for (var b = new s.Buf8(g.length), a = 0, h = b.length; a < h; a++) b[a] = g.charCodeAt(a);
        return b;
      }, v.buf2string = function(g, b) {
        var a, h, n, c, o = b || g.length, d = new Array(2 * o);
        for (a = h = 0; a < o; ) if ((n = g[a++]) < 128) d[h++] = n;
        else if (4 < (c = i[n])) d[h++] = 65533, a += c - 1;
        else {
          for (n &= c === 2 ? 31 : c === 3 ? 15 : 7; 1 < c && a < o; ) n = n << 6 | 63 & g[a++], c--;
          1 < c ? d[h++] = 65533 : n < 65536 ? d[h++] = n : (n -= 65536, d[h++] = 55296 | n >> 10 & 1023, d[h++] = 56320 | 1023 & n);
        }
        return y(d, h);
      }, v.utf8border = function(g, b) {
        var a;
        for ((b = b || g.length) > g.length && (b = g.length), a = b - 1; 0 <= a && (192 & g[a]) == 128; ) a--;
        return a < 0 || a === 0 ? b : a + i[g[a]] > b ? a : b;
      };
    }, { "./common": 41 }], 43: [function(p, C, v) {
      C.exports = function(s, l, r, i) {
        for (var m = 65535 & s | 0, y = s >>> 16 & 65535 | 0, g = 0; r !== 0; ) {
          for (r -= g = 2e3 < r ? 2e3 : r; y = y + (m = m + l[i++] | 0) | 0, --g; ) ;
          m %= 65521, y %= 65521;
        }
        return m | y << 16 | 0;
      };
    }, {}], 44: [function(p, C, v) {
      C.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(p, C, v) {
      var s = function() {
        for (var l, r = [], i = 0; i < 256; i++) {
          l = i;
          for (var m = 0; m < 8; m++) l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1;
          r[i] = l;
        }
        return r;
      }();
      C.exports = function(l, r, i, m) {
        var y = s, g = m + i;
        l ^= -1;
        for (var b = m; b < g; b++) l = l >>> 8 ^ y[255 & (l ^ r[b])];
        return -1 ^ l;
      };
    }, {}], 46: [function(p, C, v) {
      var s, l = p("../utils/common"), r = p("./trees"), i = p("./adler32"), m = p("./crc32"), y = p("./messages"), g = 0, b = 4, a = 0, h = -2, n = -1, c = 4, o = 2, d = 8, k = 9, E = 286, S = 30, L = 19, A = 2 * E + 1, P = 15, w = 3, B = 258, W = B + w + 1, _ = 42, I = 113, e = 1, F = 2, V = 3, U = 4;
      function tt(t, D) {
        return t.msg = y[D], D;
      }
      function M(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function Q(t) {
        for (var D = t.length; 0 <= --D; ) t[D] = 0;
      }
      function T(t) {
        var D = t.state, R = D.pending;
        R > t.avail_out && (R = t.avail_out), R !== 0 && (l.arraySet(t.output, D.pending_buf, D.pending_out, R, t.next_out), t.next_out += R, D.pending_out += R, t.total_out += R, t.avail_out -= R, D.pending -= R, D.pending === 0 && (D.pending_out = 0));
      }
      function O(t, D) {
        r._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, D), t.block_start = t.strstart, T(t.strm);
      }
      function J(t, D) {
        t.pending_buf[t.pending++] = D;
      }
      function $(t, D) {
        t.pending_buf[t.pending++] = D >>> 8 & 255, t.pending_buf[t.pending++] = 255 & D;
      }
      function H(t, D) {
        var R, f, u = t.max_chain_length, x = t.strstart, N = t.prev_length, j = t.nice_match, z = t.strstart > t.w_size - W ? t.strstart - (t.w_size - W) : 0, Z = t.window, K = t.w_mask, X = t.prev, Y = t.strstart + B, at = Z[x + N - 1], rt = Z[x + N];
        t.prev_length >= t.good_match && (u >>= 2), j > t.lookahead && (j = t.lookahead);
        do
          if (Z[(R = D) + N] === rt && Z[R + N - 1] === at && Z[R] === Z[x] && Z[++R] === Z[x + 1]) {
            x += 2, R++;
            do
              ;
            while (Z[++x] === Z[++R] && Z[++x] === Z[++R] && Z[++x] === Z[++R] && Z[++x] === Z[++R] && Z[++x] === Z[++R] && Z[++x] === Z[++R] && Z[++x] === Z[++R] && Z[++x] === Z[++R] && x < Y);
            if (f = B - (Y - x), x = Y - B, N < f) {
              if (t.match_start = D, j <= (N = f)) break;
              at = Z[x + N - 1], rt = Z[x + N];
            }
          }
        while ((D = X[D & K]) > z && --u != 0);
        return N <= t.lookahead ? N : t.lookahead;
      }
      function st(t) {
        var D, R, f, u, x, N, j, z, Z, K, X = t.w_size;
        do {
          if (u = t.window_size - t.lookahead - t.strstart, t.strstart >= X + (X - W)) {
            for (l.arraySet(t.window, t.window, X, X, 0), t.match_start -= X, t.strstart -= X, t.block_start -= X, D = R = t.hash_size; f = t.head[--D], t.head[D] = X <= f ? f - X : 0, --R; ) ;
            for (D = R = X; f = t.prev[--D], t.prev[D] = X <= f ? f - X : 0, --R; ) ;
            u += X;
          }
          if (t.strm.avail_in === 0) break;
          if (N = t.strm, j = t.window, z = t.strstart + t.lookahead, Z = u, K = void 0, K = N.avail_in, Z < K && (K = Z), R = K === 0 ? 0 : (N.avail_in -= K, l.arraySet(j, N.input, N.next_in, K, z), N.state.wrap === 1 ? N.adler = i(N.adler, j, K, z) : N.state.wrap === 2 && (N.adler = m(N.adler, j, K, z)), N.next_in += K, N.total_in += K, K), t.lookahead += R, t.lookahead + t.insert >= w) for (x = t.strstart - t.insert, t.ins_h = t.window[x], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[x + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[x + w - 1]) & t.hash_mask, t.prev[x & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = x, x++, t.insert--, !(t.lookahead + t.insert < w)); ) ;
        } while (t.lookahead < W && t.strm.avail_in !== 0);
      }
      function ut(t, D) {
        for (var R, f; ; ) {
          if (t.lookahead < W) {
            if (st(t), t.lookahead < W && D === g) return e;
            if (t.lookahead === 0) break;
          }
          if (R = 0, t.lookahead >= w && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + w - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), R !== 0 && t.strstart - R <= t.w_size - W && (t.match_length = H(t, R)), t.match_length >= w) if (f = r._tr_tally(t, t.strstart - t.match_start, t.match_length - w), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= w) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + w - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else f = r._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (f && (O(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = t.strstart < w - 1 ? t.strstart : w - 1, D === b ? (O(t, !0), t.strm.avail_out === 0 ? V : U) : t.last_lit && (O(t, !1), t.strm.avail_out === 0) ? e : F;
      }
      function et(t, D) {
        for (var R, f, u; ; ) {
          if (t.lookahead < W) {
            if (st(t), t.lookahead < W && D === g) return e;
            if (t.lookahead === 0) break;
          }
          if (R = 0, t.lookahead >= w && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + w - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = w - 1, R !== 0 && t.prev_length < t.max_lazy_match && t.strstart - R <= t.w_size - W && (t.match_length = H(t, R), t.match_length <= 5 && (t.strategy === 1 || t.match_length === w && 4096 < t.strstart - t.match_start) && (t.match_length = w - 1)), t.prev_length >= w && t.match_length <= t.prev_length) {
            for (u = t.strstart + t.lookahead - w, f = r._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - w), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= u && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + w - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = w - 1, t.strstart++, f && (O(t, !1), t.strm.avail_out === 0)) return e;
          } else if (t.match_available) {
            if ((f = r._tr_tally(t, 0, t.window[t.strstart - 1])) && O(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return e;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (f = r._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < w - 1 ? t.strstart : w - 1, D === b ? (O(t, !0), t.strm.avail_out === 0 ? V : U) : t.last_lit && (O(t, !1), t.strm.avail_out === 0) ? e : F;
      }
      function nt(t, D, R, f, u) {
        this.good_length = t, this.max_lazy = D, this.nice_length = R, this.max_chain = f, this.func = u;
      }
      function ct() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = d, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new l.Buf16(2 * A), this.dyn_dtree = new l.Buf16(2 * (2 * S + 1)), this.bl_tree = new l.Buf16(2 * (2 * L + 1)), Q(this.dyn_ltree), Q(this.dyn_dtree), Q(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new l.Buf16(P + 1), this.heap = new l.Buf16(2 * E + 1), Q(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new l.Buf16(2 * E + 1), Q(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function ot(t) {
        var D;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = o, (D = t.state).pending = 0, D.pending_out = 0, D.wrap < 0 && (D.wrap = -D.wrap), D.status = D.wrap ? _ : I, t.adler = D.wrap === 2 ? 0 : 1, D.last_flush = g, r._tr_init(D), a) : tt(t, h);
      }
      function _t(t) {
        var D = ot(t);
        return D === a && function(R) {
          R.window_size = 2 * R.w_size, Q(R.head), R.max_lazy_match = s[R.level].max_lazy, R.good_match = s[R.level].good_length, R.nice_match = s[R.level].nice_length, R.max_chain_length = s[R.level].max_chain, R.strstart = 0, R.block_start = 0, R.lookahead = 0, R.insert = 0, R.match_length = R.prev_length = w - 1, R.match_available = 0, R.ins_h = 0;
        }(t.state), D;
      }
      function gt(t, D, R, f, u, x) {
        if (!t) return h;
        var N = 1;
        if (D === n && (D = 6), f < 0 ? (N = 0, f = -f) : 15 < f && (N = 2, f -= 16), u < 1 || k < u || R !== d || f < 8 || 15 < f || D < 0 || 9 < D || x < 0 || c < x) return tt(t, h);
        f === 8 && (f = 9);
        var j = new ct();
        return (t.state = j).strm = t, j.wrap = N, j.gzhead = null, j.w_bits = f, j.w_size = 1 << j.w_bits, j.w_mask = j.w_size - 1, j.hash_bits = u + 7, j.hash_size = 1 << j.hash_bits, j.hash_mask = j.hash_size - 1, j.hash_shift = ~~((j.hash_bits + w - 1) / w), j.window = new l.Buf8(2 * j.w_size), j.head = new l.Buf16(j.hash_size), j.prev = new l.Buf16(j.w_size), j.lit_bufsize = 1 << u + 6, j.pending_buf_size = 4 * j.lit_bufsize, j.pending_buf = new l.Buf8(j.pending_buf_size), j.d_buf = 1 * j.lit_bufsize, j.l_buf = 3 * j.lit_bufsize, j.level = D, j.strategy = x, j.method = R, _t(t);
      }
      s = [new nt(0, 0, 0, 0, function(t, D) {
        var R = 65535;
        for (R > t.pending_buf_size - 5 && (R = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (st(t), t.lookahead === 0 && D === g) return e;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var f = t.block_start + R;
          if ((t.strstart === 0 || t.strstart >= f) && (t.lookahead = t.strstart - f, t.strstart = f, O(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - W && (O(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = 0, D === b ? (O(t, !0), t.strm.avail_out === 0 ? V : U) : (t.strstart > t.block_start && (O(t, !1), t.strm.avail_out), e);
      }), new nt(4, 4, 8, 4, ut), new nt(4, 5, 16, 8, ut), new nt(4, 6, 32, 32, ut), new nt(4, 4, 16, 16, et), new nt(8, 16, 32, 32, et), new nt(8, 16, 128, 128, et), new nt(8, 32, 128, 256, et), new nt(32, 128, 258, 1024, et), new nt(32, 258, 258, 4096, et)], v.deflateInit = function(t, D) {
        return gt(t, D, d, 15, 8, 0);
      }, v.deflateInit2 = gt, v.deflateReset = _t, v.deflateResetKeep = ot, v.deflateSetHeader = function(t, D) {
        return t && t.state ? t.state.wrap !== 2 ? h : (t.state.gzhead = D, a) : h;
      }, v.deflate = function(t, D) {
        var R, f, u, x;
        if (!t || !t.state || 5 < D || D < 0) return t ? tt(t, h) : h;
        if (f = t.state, !t.output || !t.input && t.avail_in !== 0 || f.status === 666 && D !== b) return tt(t, t.avail_out === 0 ? -5 : h);
        if (f.strm = t, R = f.last_flush, f.last_flush = D, f.status === _) if (f.wrap === 2) t.adler = 0, J(f, 31), J(f, 139), J(f, 8), f.gzhead ? (J(f, (f.gzhead.text ? 1 : 0) + (f.gzhead.hcrc ? 2 : 0) + (f.gzhead.extra ? 4 : 0) + (f.gzhead.name ? 8 : 0) + (f.gzhead.comment ? 16 : 0)), J(f, 255 & f.gzhead.time), J(f, f.gzhead.time >> 8 & 255), J(f, f.gzhead.time >> 16 & 255), J(f, f.gzhead.time >> 24 & 255), J(f, f.level === 9 ? 2 : 2 <= f.strategy || f.level < 2 ? 4 : 0), J(f, 255 & f.gzhead.os), f.gzhead.extra && f.gzhead.extra.length && (J(f, 255 & f.gzhead.extra.length), J(f, f.gzhead.extra.length >> 8 & 255)), f.gzhead.hcrc && (t.adler = m(t.adler, f.pending_buf, f.pending, 0)), f.gzindex = 0, f.status = 69) : (J(f, 0), J(f, 0), J(f, 0), J(f, 0), J(f, 0), J(f, f.level === 9 ? 2 : 2 <= f.strategy || f.level < 2 ? 4 : 0), J(f, 3), f.status = I);
        else {
          var N = d + (f.w_bits - 8 << 4) << 8;
          N |= (2 <= f.strategy || f.level < 2 ? 0 : f.level < 6 ? 1 : f.level === 6 ? 2 : 3) << 6, f.strstart !== 0 && (N |= 32), N += 31 - N % 31, f.status = I, $(f, N), f.strstart !== 0 && ($(f, t.adler >>> 16), $(f, 65535 & t.adler)), t.adler = 1;
        }
        if (f.status === 69) if (f.gzhead.extra) {
          for (u = f.pending; f.gzindex < (65535 & f.gzhead.extra.length) && (f.pending !== f.pending_buf_size || (f.gzhead.hcrc && f.pending > u && (t.adler = m(t.adler, f.pending_buf, f.pending - u, u)), T(t), u = f.pending, f.pending !== f.pending_buf_size)); ) J(f, 255 & f.gzhead.extra[f.gzindex]), f.gzindex++;
          f.gzhead.hcrc && f.pending > u && (t.adler = m(t.adler, f.pending_buf, f.pending - u, u)), f.gzindex === f.gzhead.extra.length && (f.gzindex = 0, f.status = 73);
        } else f.status = 73;
        if (f.status === 73) if (f.gzhead.name) {
          u = f.pending;
          do {
            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > u && (t.adler = m(t.adler, f.pending_buf, f.pending - u, u)), T(t), u = f.pending, f.pending === f.pending_buf_size)) {
              x = 1;
              break;
            }
            x = f.gzindex < f.gzhead.name.length ? 255 & f.gzhead.name.charCodeAt(f.gzindex++) : 0, J(f, x);
          } while (x !== 0);
          f.gzhead.hcrc && f.pending > u && (t.adler = m(t.adler, f.pending_buf, f.pending - u, u)), x === 0 && (f.gzindex = 0, f.status = 91);
        } else f.status = 91;
        if (f.status === 91) if (f.gzhead.comment) {
          u = f.pending;
          do {
            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > u && (t.adler = m(t.adler, f.pending_buf, f.pending - u, u)), T(t), u = f.pending, f.pending === f.pending_buf_size)) {
              x = 1;
              break;
            }
            x = f.gzindex < f.gzhead.comment.length ? 255 & f.gzhead.comment.charCodeAt(f.gzindex++) : 0, J(f, x);
          } while (x !== 0);
          f.gzhead.hcrc && f.pending > u && (t.adler = m(t.adler, f.pending_buf, f.pending - u, u)), x === 0 && (f.status = 103);
        } else f.status = 103;
        if (f.status === 103 && (f.gzhead.hcrc ? (f.pending + 2 > f.pending_buf_size && T(t), f.pending + 2 <= f.pending_buf_size && (J(f, 255 & t.adler), J(f, t.adler >> 8 & 255), t.adler = 0, f.status = I)) : f.status = I), f.pending !== 0) {
          if (T(t), t.avail_out === 0) return f.last_flush = -1, a;
        } else if (t.avail_in === 0 && M(D) <= M(R) && D !== b) return tt(t, -5);
        if (f.status === 666 && t.avail_in !== 0) return tt(t, -5);
        if (t.avail_in !== 0 || f.lookahead !== 0 || D !== g && f.status !== 666) {
          var j = f.strategy === 2 ? function(z, Z) {
            for (var K; ; ) {
              if (z.lookahead === 0 && (st(z), z.lookahead === 0)) {
                if (Z === g) return e;
                break;
              }
              if (z.match_length = 0, K = r._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++, K && (O(z, !1), z.strm.avail_out === 0)) return e;
            }
            return z.insert = 0, Z === b ? (O(z, !0), z.strm.avail_out === 0 ? V : U) : z.last_lit && (O(z, !1), z.strm.avail_out === 0) ? e : F;
          }(f, D) : f.strategy === 3 ? function(z, Z) {
            for (var K, X, Y, at, rt = z.window; ; ) {
              if (z.lookahead <= B) {
                if (st(z), z.lookahead <= B && Z === g) return e;
                if (z.lookahead === 0) break;
              }
              if (z.match_length = 0, z.lookahead >= w && 0 < z.strstart && (X = rt[Y = z.strstart - 1]) === rt[++Y] && X === rt[++Y] && X === rt[++Y]) {
                at = z.strstart + B;
                do
                  ;
                while (X === rt[++Y] && X === rt[++Y] && X === rt[++Y] && X === rt[++Y] && X === rt[++Y] && X === rt[++Y] && X === rt[++Y] && X === rt[++Y] && Y < at);
                z.match_length = B - (at - Y), z.match_length > z.lookahead && (z.match_length = z.lookahead);
              }
              if (z.match_length >= w ? (K = r._tr_tally(z, 1, z.match_length - w), z.lookahead -= z.match_length, z.strstart += z.match_length, z.match_length = 0) : (K = r._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++), K && (O(z, !1), z.strm.avail_out === 0)) return e;
            }
            return z.insert = 0, Z === b ? (O(z, !0), z.strm.avail_out === 0 ? V : U) : z.last_lit && (O(z, !1), z.strm.avail_out === 0) ? e : F;
          }(f, D) : s[f.level].func(f, D);
          if (j !== V && j !== U || (f.status = 666), j === e || j === V) return t.avail_out === 0 && (f.last_flush = -1), a;
          if (j === F && (D === 1 ? r._tr_align(f) : D !== 5 && (r._tr_stored_block(f, 0, 0, !1), D === 3 && (Q(f.head), f.lookahead === 0 && (f.strstart = 0, f.block_start = 0, f.insert = 0))), T(t), t.avail_out === 0)) return f.last_flush = -1, a;
        }
        return D !== b ? a : f.wrap <= 0 ? 1 : (f.wrap === 2 ? (J(f, 255 & t.adler), J(f, t.adler >> 8 & 255), J(f, t.adler >> 16 & 255), J(f, t.adler >> 24 & 255), J(f, 255 & t.total_in), J(f, t.total_in >> 8 & 255), J(f, t.total_in >> 16 & 255), J(f, t.total_in >> 24 & 255)) : ($(f, t.adler >>> 16), $(f, 65535 & t.adler)), T(t), 0 < f.wrap && (f.wrap = -f.wrap), f.pending !== 0 ? a : 1);
      }, v.deflateEnd = function(t) {
        var D;
        return t && t.state ? (D = t.state.status) !== _ && D !== 69 && D !== 73 && D !== 91 && D !== 103 && D !== I && D !== 666 ? tt(t, h) : (t.state = null, D === I ? tt(t, -3) : a) : h;
      }, v.deflateSetDictionary = function(t, D) {
        var R, f, u, x, N, j, z, Z, K = D.length;
        if (!t || !t.state || (x = (R = t.state).wrap) === 2 || x === 1 && R.status !== _ || R.lookahead) return h;
        for (x === 1 && (t.adler = i(t.adler, D, K, 0)), R.wrap = 0, K >= R.w_size && (x === 0 && (Q(R.head), R.strstart = 0, R.block_start = 0, R.insert = 0), Z = new l.Buf8(R.w_size), l.arraySet(Z, D, K - R.w_size, R.w_size, 0), D = Z, K = R.w_size), N = t.avail_in, j = t.next_in, z = t.input, t.avail_in = K, t.next_in = 0, t.input = D, st(R); R.lookahead >= w; ) {
          for (f = R.strstart, u = R.lookahead - (w - 1); R.ins_h = (R.ins_h << R.hash_shift ^ R.window[f + w - 1]) & R.hash_mask, R.prev[f & R.w_mask] = R.head[R.ins_h], R.head[R.ins_h] = f, f++, --u; ) ;
          R.strstart = f, R.lookahead = w - 1, st(R);
        }
        return R.strstart += R.lookahead, R.block_start = R.strstart, R.insert = R.lookahead, R.lookahead = 0, R.match_length = R.prev_length = w - 1, R.match_available = 0, t.next_in = j, t.input = z, t.avail_in = N, R.wrap = x, a;
      }, v.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(p, C, v) {
      C.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(p, C, v) {
      C.exports = function(s, l) {
        var r, i, m, y, g, b, a, h, n, c, o, d, k, E, S, L, A, P, w, B, W, _, I, e, F;
        r = s.state, i = s.next_in, e = s.input, m = i + (s.avail_in - 5), y = s.next_out, F = s.output, g = y - (l - s.avail_out), b = y + (s.avail_out - 257), a = r.dmax, h = r.wsize, n = r.whave, c = r.wnext, o = r.window, d = r.hold, k = r.bits, E = r.lencode, S = r.distcode, L = (1 << r.lenbits) - 1, A = (1 << r.distbits) - 1;
        t: do {
          k < 15 && (d += e[i++] << k, k += 8, d += e[i++] << k, k += 8), P = E[d & L];
          e: for (; ; ) {
            if (d >>>= w = P >>> 24, k -= w, (w = P >>> 16 & 255) === 0) F[y++] = 65535 & P;
            else {
              if (!(16 & w)) {
                if (!(64 & w)) {
                  P = E[(65535 & P) + (d & (1 << w) - 1)];
                  continue e;
                }
                if (32 & w) {
                  r.mode = 12;
                  break t;
                }
                s.msg = "invalid literal/length code", r.mode = 30;
                break t;
              }
              B = 65535 & P, (w &= 15) && (k < w && (d += e[i++] << k, k += 8), B += d & (1 << w) - 1, d >>>= w, k -= w), k < 15 && (d += e[i++] << k, k += 8, d += e[i++] << k, k += 8), P = S[d & A];
              r: for (; ; ) {
                if (d >>>= w = P >>> 24, k -= w, !(16 & (w = P >>> 16 & 255))) {
                  if (!(64 & w)) {
                    P = S[(65535 & P) + (d & (1 << w) - 1)];
                    continue r;
                  }
                  s.msg = "invalid distance code", r.mode = 30;
                  break t;
                }
                if (W = 65535 & P, k < (w &= 15) && (d += e[i++] << k, (k += 8) < w && (d += e[i++] << k, k += 8)), a < (W += d & (1 << w) - 1)) {
                  s.msg = "invalid distance too far back", r.mode = 30;
                  break t;
                }
                if (d >>>= w, k -= w, (w = y - g) < W) {
                  if (n < (w = W - w) && r.sane) {
                    s.msg = "invalid distance too far back", r.mode = 30;
                    break t;
                  }
                  if (I = o, (_ = 0) === c) {
                    if (_ += h - w, w < B) {
                      for (B -= w; F[y++] = o[_++], --w; ) ;
                      _ = y - W, I = F;
                    }
                  } else if (c < w) {
                    if (_ += h + c - w, (w -= c) < B) {
                      for (B -= w; F[y++] = o[_++], --w; ) ;
                      if (_ = 0, c < B) {
                        for (B -= w = c; F[y++] = o[_++], --w; ) ;
                        _ = y - W, I = F;
                      }
                    }
                  } else if (_ += c - w, w < B) {
                    for (B -= w; F[y++] = o[_++], --w; ) ;
                    _ = y - W, I = F;
                  }
                  for (; 2 < B; ) F[y++] = I[_++], F[y++] = I[_++], F[y++] = I[_++], B -= 3;
                  B && (F[y++] = I[_++], 1 < B && (F[y++] = I[_++]));
                } else {
                  for (_ = y - W; F[y++] = F[_++], F[y++] = F[_++], F[y++] = F[_++], 2 < (B -= 3); ) ;
                  B && (F[y++] = F[_++], 1 < B && (F[y++] = F[_++]));
                }
                break;
              }
            }
            break;
          }
        } while (i < m && y < b);
        i -= B = k >> 3, d &= (1 << (k -= B << 3)) - 1, s.next_in = i, s.next_out = y, s.avail_in = i < m ? m - i + 5 : 5 - (i - m), s.avail_out = y < b ? b - y + 257 : 257 - (y - b), r.hold = d, r.bits = k;
      };
    }, {}], 49: [function(p, C, v) {
      var s = p("../utils/common"), l = p("./adler32"), r = p("./crc32"), i = p("./inffast"), m = p("./inftrees"), y = 1, g = 2, b = 0, a = -2, h = 1, n = 852, c = 592;
      function o(_) {
        return (_ >>> 24 & 255) + (_ >>> 8 & 65280) + ((65280 & _) << 8) + ((255 & _) << 24);
      }
      function d() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new s.Buf16(320), this.work = new s.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function k(_) {
        var I;
        return _ && _.state ? (I = _.state, _.total_in = _.total_out = I.total = 0, _.msg = "", I.wrap && (_.adler = 1 & I.wrap), I.mode = h, I.last = 0, I.havedict = 0, I.dmax = 32768, I.head = null, I.hold = 0, I.bits = 0, I.lencode = I.lendyn = new s.Buf32(n), I.distcode = I.distdyn = new s.Buf32(c), I.sane = 1, I.back = -1, b) : a;
      }
      function E(_) {
        var I;
        return _ && _.state ? ((I = _.state).wsize = 0, I.whave = 0, I.wnext = 0, k(_)) : a;
      }
      function S(_, I) {
        var e, F;
        return _ && _.state ? (F = _.state, I < 0 ? (e = 0, I = -I) : (e = 1 + (I >> 4), I < 48 && (I &= 15)), I && (I < 8 || 15 < I) ? a : (F.window !== null && F.wbits !== I && (F.window = null), F.wrap = e, F.wbits = I, E(_))) : a;
      }
      function L(_, I) {
        var e, F;
        return _ ? (F = new d(), (_.state = F).window = null, (e = S(_, I)) !== b && (_.state = null), e) : a;
      }
      var A, P, w = !0;
      function B(_) {
        if (w) {
          var I;
          for (A = new s.Buf32(512), P = new s.Buf32(32), I = 0; I < 144; ) _.lens[I++] = 8;
          for (; I < 256; ) _.lens[I++] = 9;
          for (; I < 280; ) _.lens[I++] = 7;
          for (; I < 288; ) _.lens[I++] = 8;
          for (m(y, _.lens, 0, 288, A, 0, _.work, { bits: 9 }), I = 0; I < 32; ) _.lens[I++] = 5;
          m(g, _.lens, 0, 32, P, 0, _.work, { bits: 5 }), w = !1;
        }
        _.lencode = A, _.lenbits = 9, _.distcode = P, _.distbits = 5;
      }
      function W(_, I, e, F) {
        var V, U = _.state;
        return U.window === null && (U.wsize = 1 << U.wbits, U.wnext = 0, U.whave = 0, U.window = new s.Buf8(U.wsize)), F >= U.wsize ? (s.arraySet(U.window, I, e - U.wsize, U.wsize, 0), U.wnext = 0, U.whave = U.wsize) : (F < (V = U.wsize - U.wnext) && (V = F), s.arraySet(U.window, I, e - F, V, U.wnext), (F -= V) ? (s.arraySet(U.window, I, e - F, F, 0), U.wnext = F, U.whave = U.wsize) : (U.wnext += V, U.wnext === U.wsize && (U.wnext = 0), U.whave < U.wsize && (U.whave += V))), 0;
      }
      v.inflateReset = E, v.inflateReset2 = S, v.inflateResetKeep = k, v.inflateInit = function(_) {
        return L(_, 15);
      }, v.inflateInit2 = L, v.inflate = function(_, I) {
        var e, F, V, U, tt, M, Q, T, O, J, $, H, st, ut, et, nt, ct, ot, _t, gt, t, D, R, f, u = 0, x = new s.Buf8(4), N = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!_ || !_.state || !_.output || !_.input && _.avail_in !== 0) return a;
        (e = _.state).mode === 12 && (e.mode = 13), tt = _.next_out, V = _.output, Q = _.avail_out, U = _.next_in, F = _.input, M = _.avail_in, T = e.hold, O = e.bits, J = M, $ = Q, D = b;
        t: for (; ; ) switch (e.mode) {
          case h:
            if (e.wrap === 0) {
              e.mode = 13;
              break;
            }
            for (; O < 16; ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            if (2 & e.wrap && T === 35615) {
              x[e.check = 0] = 255 & T, x[1] = T >>> 8 & 255, e.check = r(e.check, x, 2, 0), O = T = 0, e.mode = 2;
              break;
            }
            if (e.flags = 0, e.head && (e.head.done = !1), !(1 & e.wrap) || (((255 & T) << 8) + (T >> 8)) % 31) {
              _.msg = "incorrect header check", e.mode = 30;
              break;
            }
            if ((15 & T) != 8) {
              _.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (O -= 4, t = 8 + (15 & (T >>>= 4)), e.wbits === 0) e.wbits = t;
            else if (t > e.wbits) {
              _.msg = "invalid window size", e.mode = 30;
              break;
            }
            e.dmax = 1 << t, _.adler = e.check = 1, e.mode = 512 & T ? 10 : 12, O = T = 0;
            break;
          case 2:
            for (; O < 16; ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            if (e.flags = T, (255 & e.flags) != 8) {
              _.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (57344 & e.flags) {
              _.msg = "unknown header flags set", e.mode = 30;
              break;
            }
            e.head && (e.head.text = T >> 8 & 1), 512 & e.flags && (x[0] = 255 & T, x[1] = T >>> 8 & 255, e.check = r(e.check, x, 2, 0)), O = T = 0, e.mode = 3;
          case 3:
            for (; O < 32; ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            e.head && (e.head.time = T), 512 & e.flags && (x[0] = 255 & T, x[1] = T >>> 8 & 255, x[2] = T >>> 16 & 255, x[3] = T >>> 24 & 255, e.check = r(e.check, x, 4, 0)), O = T = 0, e.mode = 4;
          case 4:
            for (; O < 16; ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            e.head && (e.head.xflags = 255 & T, e.head.os = T >> 8), 512 & e.flags && (x[0] = 255 & T, x[1] = T >>> 8 & 255, e.check = r(e.check, x, 2, 0)), O = T = 0, e.mode = 5;
          case 5:
            if (1024 & e.flags) {
              for (; O < 16; ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              e.length = T, e.head && (e.head.extra_len = T), 512 & e.flags && (x[0] = 255 & T, x[1] = T >>> 8 & 255, e.check = r(e.check, x, 2, 0)), O = T = 0;
            } else e.head && (e.head.extra = null);
            e.mode = 6;
          case 6:
            if (1024 & e.flags && (M < (H = e.length) && (H = M), H && (e.head && (t = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Array(e.head.extra_len)), s.arraySet(e.head.extra, F, U, H, t)), 512 & e.flags && (e.check = r(e.check, F, H, U)), M -= H, U += H, e.length -= H), e.length)) break t;
            e.length = 0, e.mode = 7;
          case 7:
            if (2048 & e.flags) {
              if (M === 0) break t;
              for (H = 0; t = F[U + H++], e.head && t && e.length < 65536 && (e.head.name += String.fromCharCode(t)), t && H < M; ) ;
              if (512 & e.flags && (e.check = r(e.check, F, H, U)), M -= H, U += H, t) break t;
            } else e.head && (e.head.name = null);
            e.length = 0, e.mode = 8;
          case 8:
            if (4096 & e.flags) {
              if (M === 0) break t;
              for (H = 0; t = F[U + H++], e.head && t && e.length < 65536 && (e.head.comment += String.fromCharCode(t)), t && H < M; ) ;
              if (512 & e.flags && (e.check = r(e.check, F, H, U)), M -= H, U += H, t) break t;
            } else e.head && (e.head.comment = null);
            e.mode = 9;
          case 9:
            if (512 & e.flags) {
              for (; O < 16; ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              if (T !== (65535 & e.check)) {
                _.msg = "header crc mismatch", e.mode = 30;
                break;
              }
              O = T = 0;
            }
            e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), _.adler = e.check = 0, e.mode = 12;
            break;
          case 10:
            for (; O < 32; ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            _.adler = e.check = o(T), O = T = 0, e.mode = 11;
          case 11:
            if (e.havedict === 0) return _.next_out = tt, _.avail_out = Q, _.next_in = U, _.avail_in = M, e.hold = T, e.bits = O, 2;
            _.adler = e.check = 1, e.mode = 12;
          case 12:
            if (I === 5 || I === 6) break t;
          case 13:
            if (e.last) {
              T >>>= 7 & O, O -= 7 & O, e.mode = 27;
              break;
            }
            for (; O < 3; ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            switch (e.last = 1 & T, O -= 1, 3 & (T >>>= 1)) {
              case 0:
                e.mode = 14;
                break;
              case 1:
                if (B(e), e.mode = 20, I !== 6) break;
                T >>>= 2, O -= 2;
                break t;
              case 2:
                e.mode = 17;
                break;
              case 3:
                _.msg = "invalid block type", e.mode = 30;
            }
            T >>>= 2, O -= 2;
            break;
          case 14:
            for (T >>>= 7 & O, O -= 7 & O; O < 32; ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            if ((65535 & T) != (T >>> 16 ^ 65535)) {
              _.msg = "invalid stored block lengths", e.mode = 30;
              break;
            }
            if (e.length = 65535 & T, O = T = 0, e.mode = 15, I === 6) break t;
          case 15:
            e.mode = 16;
          case 16:
            if (H = e.length) {
              if (M < H && (H = M), Q < H && (H = Q), H === 0) break t;
              s.arraySet(V, F, U, H, tt), M -= H, U += H, Q -= H, tt += H, e.length -= H;
              break;
            }
            e.mode = 12;
            break;
          case 17:
            for (; O < 14; ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            if (e.nlen = 257 + (31 & T), T >>>= 5, O -= 5, e.ndist = 1 + (31 & T), T >>>= 5, O -= 5, e.ncode = 4 + (15 & T), T >>>= 4, O -= 4, 286 < e.nlen || 30 < e.ndist) {
              _.msg = "too many length or distance symbols", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 18;
          case 18:
            for (; e.have < e.ncode; ) {
              for (; O < 3; ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              e.lens[N[e.have++]] = 7 & T, T >>>= 3, O -= 3;
            }
            for (; e.have < 19; ) e.lens[N[e.have++]] = 0;
            if (e.lencode = e.lendyn, e.lenbits = 7, R = { bits: e.lenbits }, D = m(0, e.lens, 0, 19, e.lencode, 0, e.work, R), e.lenbits = R.bits, D) {
              _.msg = "invalid code lengths set", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 19;
          case 19:
            for (; e.have < e.nlen + e.ndist; ) {
              for (; nt = (u = e.lencode[T & (1 << e.lenbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= O); ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              if (ct < 16) T >>>= et, O -= et, e.lens[e.have++] = ct;
              else {
                if (ct === 16) {
                  for (f = et + 2; O < f; ) {
                    if (M === 0) break t;
                    M--, T += F[U++] << O, O += 8;
                  }
                  if (T >>>= et, O -= et, e.have === 0) {
                    _.msg = "invalid bit length repeat", e.mode = 30;
                    break;
                  }
                  t = e.lens[e.have - 1], H = 3 + (3 & T), T >>>= 2, O -= 2;
                } else if (ct === 17) {
                  for (f = et + 3; O < f; ) {
                    if (M === 0) break t;
                    M--, T += F[U++] << O, O += 8;
                  }
                  O -= et, t = 0, H = 3 + (7 & (T >>>= et)), T >>>= 3, O -= 3;
                } else {
                  for (f = et + 7; O < f; ) {
                    if (M === 0) break t;
                    M--, T += F[U++] << O, O += 8;
                  }
                  O -= et, t = 0, H = 11 + (127 & (T >>>= et)), T >>>= 7, O -= 7;
                }
                if (e.have + H > e.nlen + e.ndist) {
                  _.msg = "invalid bit length repeat", e.mode = 30;
                  break;
                }
                for (; H--; ) e.lens[e.have++] = t;
              }
            }
            if (e.mode === 30) break;
            if (e.lens[256] === 0) {
              _.msg = "invalid code -- missing end-of-block", e.mode = 30;
              break;
            }
            if (e.lenbits = 9, R = { bits: e.lenbits }, D = m(y, e.lens, 0, e.nlen, e.lencode, 0, e.work, R), e.lenbits = R.bits, D) {
              _.msg = "invalid literal/lengths set", e.mode = 30;
              break;
            }
            if (e.distbits = 6, e.distcode = e.distdyn, R = { bits: e.distbits }, D = m(g, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, R), e.distbits = R.bits, D) {
              _.msg = "invalid distances set", e.mode = 30;
              break;
            }
            if (e.mode = 20, I === 6) break t;
          case 20:
            e.mode = 21;
          case 21:
            if (6 <= M && 258 <= Q) {
              _.next_out = tt, _.avail_out = Q, _.next_in = U, _.avail_in = M, e.hold = T, e.bits = O, i(_, $), tt = _.next_out, V = _.output, Q = _.avail_out, U = _.next_in, F = _.input, M = _.avail_in, T = e.hold, O = e.bits, e.mode === 12 && (e.back = -1);
              break;
            }
            for (e.back = 0; nt = (u = e.lencode[T & (1 << e.lenbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= O); ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            if (nt && !(240 & nt)) {
              for (ot = et, _t = nt, gt = ct; nt = (u = e.lencode[gt + ((T & (1 << ot + _t) - 1) >> ot)]) >>> 16 & 255, ct = 65535 & u, !(ot + (et = u >>> 24) <= O); ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              T >>>= ot, O -= ot, e.back += ot;
            }
            if (T >>>= et, O -= et, e.back += et, e.length = ct, nt === 0) {
              e.mode = 26;
              break;
            }
            if (32 & nt) {
              e.back = -1, e.mode = 12;
              break;
            }
            if (64 & nt) {
              _.msg = "invalid literal/length code", e.mode = 30;
              break;
            }
            e.extra = 15 & nt, e.mode = 22;
          case 22:
            if (e.extra) {
              for (f = e.extra; O < f; ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              e.length += T & (1 << e.extra) - 1, T >>>= e.extra, O -= e.extra, e.back += e.extra;
            }
            e.was = e.length, e.mode = 23;
          case 23:
            for (; nt = (u = e.distcode[T & (1 << e.distbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= O); ) {
              if (M === 0) break t;
              M--, T += F[U++] << O, O += 8;
            }
            if (!(240 & nt)) {
              for (ot = et, _t = nt, gt = ct; nt = (u = e.distcode[gt + ((T & (1 << ot + _t) - 1) >> ot)]) >>> 16 & 255, ct = 65535 & u, !(ot + (et = u >>> 24) <= O); ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              T >>>= ot, O -= ot, e.back += ot;
            }
            if (T >>>= et, O -= et, e.back += et, 64 & nt) {
              _.msg = "invalid distance code", e.mode = 30;
              break;
            }
            e.offset = ct, e.extra = 15 & nt, e.mode = 24;
          case 24:
            if (e.extra) {
              for (f = e.extra; O < f; ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              e.offset += T & (1 << e.extra) - 1, T >>>= e.extra, O -= e.extra, e.back += e.extra;
            }
            if (e.offset > e.dmax) {
              _.msg = "invalid distance too far back", e.mode = 30;
              break;
            }
            e.mode = 25;
          case 25:
            if (Q === 0) break t;
            if (H = $ - Q, e.offset > H) {
              if ((H = e.offset - H) > e.whave && e.sane) {
                _.msg = "invalid distance too far back", e.mode = 30;
                break;
              }
              st = H > e.wnext ? (H -= e.wnext, e.wsize - H) : e.wnext - H, H > e.length && (H = e.length), ut = e.window;
            } else ut = V, st = tt - e.offset, H = e.length;
            for (Q < H && (H = Q), Q -= H, e.length -= H; V[tt++] = ut[st++], --H; ) ;
            e.length === 0 && (e.mode = 21);
            break;
          case 26:
            if (Q === 0) break t;
            V[tt++] = e.length, Q--, e.mode = 21;
            break;
          case 27:
            if (e.wrap) {
              for (; O < 32; ) {
                if (M === 0) break t;
                M--, T |= F[U++] << O, O += 8;
              }
              if ($ -= Q, _.total_out += $, e.total += $, $ && (_.adler = e.check = e.flags ? r(e.check, V, $, tt - $) : l(e.check, V, $, tt - $)), $ = Q, (e.flags ? T : o(T)) !== e.check) {
                _.msg = "incorrect data check", e.mode = 30;
                break;
              }
              O = T = 0;
            }
            e.mode = 28;
          case 28:
            if (e.wrap && e.flags) {
              for (; O < 32; ) {
                if (M === 0) break t;
                M--, T += F[U++] << O, O += 8;
              }
              if (T !== (4294967295 & e.total)) {
                _.msg = "incorrect length check", e.mode = 30;
                break;
              }
              O = T = 0;
            }
            e.mode = 29;
          case 29:
            D = 1;
            break t;
          case 30:
            D = -3;
            break t;
          case 31:
            return -4;
          case 32:
          default:
            return a;
        }
        return _.next_out = tt, _.avail_out = Q, _.next_in = U, _.avail_in = M, e.hold = T, e.bits = O, (e.wsize || $ !== _.avail_out && e.mode < 30 && (e.mode < 27 || I !== 4)) && W(_, _.output, _.next_out, $ - _.avail_out) ? (e.mode = 31, -4) : (J -= _.avail_in, $ -= _.avail_out, _.total_in += J, _.total_out += $, e.total += $, e.wrap && $ && (_.adler = e.check = e.flags ? r(e.check, V, $, _.next_out - $) : l(e.check, V, $, _.next_out - $)), _.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === 12 ? 128 : 0) + (e.mode === 20 || e.mode === 15 ? 256 : 0), (J == 0 && $ === 0 || I === 4) && D === b && (D = -5), D);
      }, v.inflateEnd = function(_) {
        if (!_ || !_.state) return a;
        var I = _.state;
        return I.window && (I.window = null), _.state = null, b;
      }, v.inflateGetHeader = function(_, I) {
        var e;
        return _ && _.state && 2 & (e = _.state).wrap ? ((e.head = I).done = !1, b) : a;
      }, v.inflateSetDictionary = function(_, I) {
        var e, F = I.length;
        return _ && _.state ? (e = _.state).wrap !== 0 && e.mode !== 11 ? a : e.mode === 11 && l(1, I, F, 0) !== e.check ? -3 : W(_, I, F, F) ? (e.mode = 31, -4) : (e.havedict = 1, b) : a;
      }, v.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(p, C, v) {
      var s = p("../utils/common"), l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], r = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], i = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], m = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      C.exports = function(y, g, b, a, h, n, c, o) {
        var d, k, E, S, L, A, P, w, B, W = o.bits, _ = 0, I = 0, e = 0, F = 0, V = 0, U = 0, tt = 0, M = 0, Q = 0, T = 0, O = null, J = 0, $ = new s.Buf16(16), H = new s.Buf16(16), st = null, ut = 0;
        for (_ = 0; _ <= 15; _++) $[_] = 0;
        for (I = 0; I < a; I++) $[g[b + I]]++;
        for (V = W, F = 15; 1 <= F && $[F] === 0; F--) ;
        if (F < V && (V = F), F === 0) return h[n++] = 20971520, h[n++] = 20971520, o.bits = 1, 0;
        for (e = 1; e < F && $[e] === 0; e++) ;
        for (V < e && (V = e), _ = M = 1; _ <= 15; _++) if (M <<= 1, (M -= $[_]) < 0) return -1;
        if (0 < M && (y === 0 || F !== 1)) return -1;
        for (H[1] = 0, _ = 1; _ < 15; _++) H[_ + 1] = H[_] + $[_];
        for (I = 0; I < a; I++) g[b + I] !== 0 && (c[H[g[b + I]]++] = I);
        if (A = y === 0 ? (O = st = c, 19) : y === 1 ? (O = l, J -= 257, st = r, ut -= 257, 256) : (O = i, st = m, -1), _ = e, L = n, tt = I = T = 0, E = -1, S = (Q = 1 << (U = V)) - 1, y === 1 && 852 < Q || y === 2 && 592 < Q) return 1;
        for (; ; ) {
          for (P = _ - tt, B = c[I] < A ? (w = 0, c[I]) : c[I] > A ? (w = st[ut + c[I]], O[J + c[I]]) : (w = 96, 0), d = 1 << _ - tt, e = k = 1 << U; h[L + (T >> tt) + (k -= d)] = P << 24 | w << 16 | B | 0, k !== 0; ) ;
          for (d = 1 << _ - 1; T & d; ) d >>= 1;
          if (d !== 0 ? (T &= d - 1, T += d) : T = 0, I++, --$[_] == 0) {
            if (_ === F) break;
            _ = g[b + c[I]];
          }
          if (V < _ && (T & S) !== E) {
            for (tt === 0 && (tt = V), L += e, M = 1 << (U = _ - tt); U + tt < F && !((M -= $[U + tt]) <= 0); ) U++, M <<= 1;
            if (Q += 1 << U, y === 1 && 852 < Q || y === 2 && 592 < Q) return 1;
            h[E = T & S] = V << 24 | U << 16 | L - n | 0;
          }
        }
        return T !== 0 && (h[L + T] = _ - tt << 24 | 64 << 16 | 0), o.bits = V, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(p, C, v) {
      C.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(p, C, v) {
      var s = p("../utils/common"), l = 0, r = 1;
      function i(u) {
        for (var x = u.length; 0 <= --x; ) u[x] = 0;
      }
      var m = 0, y = 29, g = 256, b = g + 1 + y, a = 30, h = 19, n = 2 * b + 1, c = 15, o = 16, d = 7, k = 256, E = 16, S = 17, L = 18, A = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], P = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], w = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], B = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], W = new Array(2 * (b + 2));
      i(W);
      var _ = new Array(2 * a);
      i(_);
      var I = new Array(512);
      i(I);
      var e = new Array(256);
      i(e);
      var F = new Array(y);
      i(F);
      var V, U, tt, M = new Array(a);
      function Q(u, x, N, j, z) {
        this.static_tree = u, this.extra_bits = x, this.extra_base = N, this.elems = j, this.max_length = z, this.has_stree = u && u.length;
      }
      function T(u, x) {
        this.dyn_tree = u, this.max_code = 0, this.stat_desc = x;
      }
      function O(u) {
        return u < 256 ? I[u] : I[256 + (u >>> 7)];
      }
      function J(u, x) {
        u.pending_buf[u.pending++] = 255 & x, u.pending_buf[u.pending++] = x >>> 8 & 255;
      }
      function $(u, x, N) {
        u.bi_valid > o - N ? (u.bi_buf |= x << u.bi_valid & 65535, J(u, u.bi_buf), u.bi_buf = x >> o - u.bi_valid, u.bi_valid += N - o) : (u.bi_buf |= x << u.bi_valid & 65535, u.bi_valid += N);
      }
      function H(u, x, N) {
        $(u, N[2 * x], N[2 * x + 1]);
      }
      function st(u, x) {
        for (var N = 0; N |= 1 & u, u >>>= 1, N <<= 1, 0 < --x; ) ;
        return N >>> 1;
      }
      function ut(u, x, N) {
        var j, z, Z = new Array(c + 1), K = 0;
        for (j = 1; j <= c; j++) Z[j] = K = K + N[j - 1] << 1;
        for (z = 0; z <= x; z++) {
          var X = u[2 * z + 1];
          X !== 0 && (u[2 * z] = st(Z[X]++, X));
        }
      }
      function et(u) {
        var x;
        for (x = 0; x < b; x++) u.dyn_ltree[2 * x] = 0;
        for (x = 0; x < a; x++) u.dyn_dtree[2 * x] = 0;
        for (x = 0; x < h; x++) u.bl_tree[2 * x] = 0;
        u.dyn_ltree[2 * k] = 1, u.opt_len = u.static_len = 0, u.last_lit = u.matches = 0;
      }
      function nt(u) {
        8 < u.bi_valid ? J(u, u.bi_buf) : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf), u.bi_buf = 0, u.bi_valid = 0;
      }
      function ct(u, x, N, j) {
        var z = 2 * x, Z = 2 * N;
        return u[z] < u[Z] || u[z] === u[Z] && j[x] <= j[N];
      }
      function ot(u, x, N) {
        for (var j = u.heap[N], z = N << 1; z <= u.heap_len && (z < u.heap_len && ct(x, u.heap[z + 1], u.heap[z], u.depth) && z++, !ct(x, j, u.heap[z], u.depth)); ) u.heap[N] = u.heap[z], N = z, z <<= 1;
        u.heap[N] = j;
      }
      function _t(u, x, N) {
        var j, z, Z, K, X = 0;
        if (u.last_lit !== 0) for (; j = u.pending_buf[u.d_buf + 2 * X] << 8 | u.pending_buf[u.d_buf + 2 * X + 1], z = u.pending_buf[u.l_buf + X], X++, j === 0 ? H(u, z, x) : (H(u, (Z = e[z]) + g + 1, x), (K = A[Z]) !== 0 && $(u, z -= F[Z], K), H(u, Z = O(--j), N), (K = P[Z]) !== 0 && $(u, j -= M[Z], K)), X < u.last_lit; ) ;
        H(u, k, x);
      }
      function gt(u, x) {
        var N, j, z, Z = x.dyn_tree, K = x.stat_desc.static_tree, X = x.stat_desc.has_stree, Y = x.stat_desc.elems, at = -1;
        for (u.heap_len = 0, u.heap_max = n, N = 0; N < Y; N++) Z[2 * N] !== 0 ? (u.heap[++u.heap_len] = at = N, u.depth[N] = 0) : Z[2 * N + 1] = 0;
        for (; u.heap_len < 2; ) Z[2 * (z = u.heap[++u.heap_len] = at < 2 ? ++at : 0)] = 1, u.depth[z] = 0, u.opt_len--, X && (u.static_len -= K[2 * z + 1]);
        for (x.max_code = at, N = u.heap_len >> 1; 1 <= N; N--) ot(u, Z, N);
        for (z = Y; N = u.heap[1], u.heap[1] = u.heap[u.heap_len--], ot(u, Z, 1), j = u.heap[1], u.heap[--u.heap_max] = N, u.heap[--u.heap_max] = j, Z[2 * z] = Z[2 * N] + Z[2 * j], u.depth[z] = (u.depth[N] >= u.depth[j] ? u.depth[N] : u.depth[j]) + 1, Z[2 * N + 1] = Z[2 * j + 1] = z, u.heap[1] = z++, ot(u, Z, 1), 2 <= u.heap_len; ) ;
        u.heap[--u.heap_max] = u.heap[1], function(rt, mt) {
          var St, bt, Et, lt, zt, Tt, vt = mt.dyn_tree, Rt = mt.max_code, Wt = mt.stat_desc.static_tree, Mt = mt.stat_desc.has_stree, Zt = mt.stat_desc.extra_bits, Pt = mt.stat_desc.extra_base, Ct = mt.stat_desc.max_length, At = 0;
          for (lt = 0; lt <= c; lt++) rt.bl_count[lt] = 0;
          for (vt[2 * rt.heap[rt.heap_max] + 1] = 0, St = rt.heap_max + 1; St < n; St++) Ct < (lt = vt[2 * vt[2 * (bt = rt.heap[St]) + 1] + 1] + 1) && (lt = Ct, At++), vt[2 * bt + 1] = lt, Rt < bt || (rt.bl_count[lt]++, zt = 0, Pt <= bt && (zt = Zt[bt - Pt]), Tt = vt[2 * bt], rt.opt_len += Tt * (lt + zt), Mt && (rt.static_len += Tt * (Wt[2 * bt + 1] + zt)));
          if (At !== 0) {
            do {
              for (lt = Ct - 1; rt.bl_count[lt] === 0; ) lt--;
              rt.bl_count[lt]--, rt.bl_count[lt + 1] += 2, rt.bl_count[Ct]--, At -= 2;
            } while (0 < At);
            for (lt = Ct; lt !== 0; lt--) for (bt = rt.bl_count[lt]; bt !== 0; ) Rt < (Et = rt.heap[--St]) || (vt[2 * Et + 1] !== lt && (rt.opt_len += (lt - vt[2 * Et + 1]) * vt[2 * Et], vt[2 * Et + 1] = lt), bt--);
          }
        }(u, x), ut(Z, at, u.bl_count);
      }
      function t(u, x, N) {
        var j, z, Z = -1, K = x[1], X = 0, Y = 7, at = 4;
        for (K === 0 && (Y = 138, at = 3), x[2 * (N + 1) + 1] = 65535, j = 0; j <= N; j++) z = K, K = x[2 * (j + 1) + 1], ++X < Y && z === K || (X < at ? u.bl_tree[2 * z] += X : z !== 0 ? (z !== Z && u.bl_tree[2 * z]++, u.bl_tree[2 * E]++) : X <= 10 ? u.bl_tree[2 * S]++ : u.bl_tree[2 * L]++, Z = z, at = (X = 0) === K ? (Y = 138, 3) : z === K ? (Y = 6, 3) : (Y = 7, 4));
      }
      function D(u, x, N) {
        var j, z, Z = -1, K = x[1], X = 0, Y = 7, at = 4;
        for (K === 0 && (Y = 138, at = 3), j = 0; j <= N; j++) if (z = K, K = x[2 * (j + 1) + 1], !(++X < Y && z === K)) {
          if (X < at) for (; H(u, z, u.bl_tree), --X != 0; ) ;
          else z !== 0 ? (z !== Z && (H(u, z, u.bl_tree), X--), H(u, E, u.bl_tree), $(u, X - 3, 2)) : X <= 10 ? (H(u, S, u.bl_tree), $(u, X - 3, 3)) : (H(u, L, u.bl_tree), $(u, X - 11, 7));
          Z = z, at = (X = 0) === K ? (Y = 138, 3) : z === K ? (Y = 6, 3) : (Y = 7, 4);
        }
      }
      i(M);
      var R = !1;
      function f(u, x, N, j) {
        $(u, (m << 1) + (j ? 1 : 0), 3), function(z, Z, K, X) {
          nt(z), J(z, K), J(z, ~K), s.arraySet(z.pending_buf, z.window, Z, K, z.pending), z.pending += K;
        }(u, x, N);
      }
      v._tr_init = function(u) {
        R || (function() {
          var x, N, j, z, Z, K = new Array(c + 1);
          for (z = j = 0; z < y - 1; z++) for (F[z] = j, x = 0; x < 1 << A[z]; x++) e[j++] = z;
          for (e[j - 1] = z, z = Z = 0; z < 16; z++) for (M[z] = Z, x = 0; x < 1 << P[z]; x++) I[Z++] = z;
          for (Z >>= 7; z < a; z++) for (M[z] = Z << 7, x = 0; x < 1 << P[z] - 7; x++) I[256 + Z++] = z;
          for (N = 0; N <= c; N++) K[N] = 0;
          for (x = 0; x <= 143; ) W[2 * x + 1] = 8, x++, K[8]++;
          for (; x <= 255; ) W[2 * x + 1] = 9, x++, K[9]++;
          for (; x <= 279; ) W[2 * x + 1] = 7, x++, K[7]++;
          for (; x <= 287; ) W[2 * x + 1] = 8, x++, K[8]++;
          for (ut(W, b + 1, K), x = 0; x < a; x++) _[2 * x + 1] = 5, _[2 * x] = st(x, 5);
          V = new Q(W, A, g + 1, b, c), U = new Q(_, P, 0, a, c), tt = new Q(new Array(0), w, 0, h, d);
        }(), R = !0), u.l_desc = new T(u.dyn_ltree, V), u.d_desc = new T(u.dyn_dtree, U), u.bl_desc = new T(u.bl_tree, tt), u.bi_buf = 0, u.bi_valid = 0, et(u);
      }, v._tr_stored_block = f, v._tr_flush_block = function(u, x, N, j) {
        var z, Z, K = 0;
        0 < u.level ? (u.strm.data_type === 2 && (u.strm.data_type = function(X) {
          var Y, at = 4093624447;
          for (Y = 0; Y <= 31; Y++, at >>>= 1) if (1 & at && X.dyn_ltree[2 * Y] !== 0) return l;
          if (X.dyn_ltree[18] !== 0 || X.dyn_ltree[20] !== 0 || X.dyn_ltree[26] !== 0) return r;
          for (Y = 32; Y < g; Y++) if (X.dyn_ltree[2 * Y] !== 0) return r;
          return l;
        }(u)), gt(u, u.l_desc), gt(u, u.d_desc), K = function(X) {
          var Y;
          for (t(X, X.dyn_ltree, X.l_desc.max_code), t(X, X.dyn_dtree, X.d_desc.max_code), gt(X, X.bl_desc), Y = h - 1; 3 <= Y && X.bl_tree[2 * B[Y] + 1] === 0; Y--) ;
          return X.opt_len += 3 * (Y + 1) + 5 + 5 + 4, Y;
        }(u), z = u.opt_len + 3 + 7 >>> 3, (Z = u.static_len + 3 + 7 >>> 3) <= z && (z = Z)) : z = Z = N + 5, N + 4 <= z && x !== -1 ? f(u, x, N, j) : u.strategy === 4 || Z === z ? ($(u, 2 + (j ? 1 : 0), 3), _t(u, W, _)) : ($(u, 4 + (j ? 1 : 0), 3), function(X, Y, at, rt) {
          var mt;
          for ($(X, Y - 257, 5), $(X, at - 1, 5), $(X, rt - 4, 4), mt = 0; mt < rt; mt++) $(X, X.bl_tree[2 * B[mt] + 1], 3);
          D(X, X.dyn_ltree, Y - 1), D(X, X.dyn_dtree, at - 1);
        }(u, u.l_desc.max_code + 1, u.d_desc.max_code + 1, K + 1), _t(u, u.dyn_ltree, u.dyn_dtree)), et(u), j && nt(u);
      }, v._tr_tally = function(u, x, N) {
        return u.pending_buf[u.d_buf + 2 * u.last_lit] = x >>> 8 & 255, u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & x, u.pending_buf[u.l_buf + u.last_lit] = 255 & N, u.last_lit++, x === 0 ? u.dyn_ltree[2 * N]++ : (u.matches++, x--, u.dyn_ltree[2 * (e[N] + g + 1)]++, u.dyn_dtree[2 * O(x)]++), u.last_lit === u.lit_bufsize - 1;
      }, v._tr_align = function(u) {
        $(u, 2, 3), H(u, k, W), function(x) {
          x.bi_valid === 16 ? (J(x, x.bi_buf), x.bi_buf = 0, x.bi_valid = 0) : 8 <= x.bi_valid && (x.pending_buf[x.pending++] = 255 & x.bi_buf, x.bi_buf >>= 8, x.bi_valid -= 8);
        }(u);
      };
    }, { "../utils/common": 41 }], 53: [function(p, C, v) {
      C.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(p, C, v) {
      (function(s) {
        (function(l, r) {
          if (!l.setImmediate) {
            var i, m, y, g, b = 1, a = {}, h = !1, n = l.document, c = Object.getPrototypeOf && Object.getPrototypeOf(l);
            c = c && c.setTimeout ? c : l, i = {}.toString.call(l.process) === "[object process]" ? function(E) {
              process.nextTick(function() {
                d(E);
              });
            } : function() {
              if (l.postMessage && !l.importScripts) {
                var E = !0, S = l.onmessage;
                return l.onmessage = function() {
                  E = !1;
                }, l.postMessage("", "*"), l.onmessage = S, E;
              }
            }() ? (g = "setImmediate$" + Math.random() + "$", l.addEventListener ? l.addEventListener("message", k, !1) : l.attachEvent("onmessage", k), function(E) {
              l.postMessage(g + E, "*");
            }) : l.MessageChannel ? ((y = new MessageChannel()).port1.onmessage = function(E) {
              d(E.data);
            }, function(E) {
              y.port2.postMessage(E);
            }) : n && "onreadystatechange" in n.createElement("script") ? (m = n.documentElement, function(E) {
              var S = n.createElement("script");
              S.onreadystatechange = function() {
                d(E), S.onreadystatechange = null, m.removeChild(S), S = null;
              }, m.appendChild(S);
            }) : function(E) {
              setTimeout(d, 0, E);
            }, c.setImmediate = function(E) {
              typeof E != "function" && (E = new Function("" + E));
              for (var S = new Array(arguments.length - 1), L = 0; L < S.length; L++) S[L] = arguments[L + 1];
              var A = { callback: E, args: S };
              return a[b] = A, i(b), b++;
            }, c.clearImmediate = o;
          }
          function o(E) {
            delete a[E];
          }
          function d(E) {
            if (h) setTimeout(d, 0, E);
            else {
              var S = a[E];
              if (S) {
                h = !0;
                try {
                  (function(L) {
                    var A = L.callback, P = L.args;
                    switch (P.length) {
                      case 0:
                        A();
                        break;
                      case 1:
                        A(P[0]);
                        break;
                      case 2:
                        A(P[0], P[1]);
                        break;
                      case 3:
                        A(P[0], P[1], P[2]);
                        break;
                      default:
                        A.apply(r, P);
                    }
                  })(S);
                } finally {
                  o(E), h = !1;
                }
              }
            }
          }
          function k(E) {
            E.source === l && typeof E.data == "string" && E.data.indexOf(g) === 0 && d(+E.data.slice(g.length));
          }
        })(typeof self > "u" ? s === void 0 ? this : s : self);
      }).call(this, typeof Ot < "u" ? Ot : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Ut);
var Kt = Ut.exports;
const Vt = /* @__PURE__ */ $t(Kt);
function qt() {
  const [G, q] = dt(""), [p, C] = dt(!1), [v, s] = dt(""), [l, r] = dt(null);
  let i = null, m = "", y = {}, g = "", b = null;
  const a = [
    "text/html",
    "text/xml",
    "application/xml",
    "application/xhtml+xml",
    "image/svg+xml"
  ], h = kt(
    async (P) => {
      C(!0), q(""), s("Loading..."), r(null), i = null, m = "", y = {}, g = "", b && (document.head.removeChild(b), URL.revokeObjectURL(b.href), b = null);
      try {
        let w;
        if (typeof P == "string") {
          const B = await fetch(P);
          if (!B.ok)
            throw new Error(
              `HTTP error! status: ${B.status} ${B.statusText}`
            );
          w = await B.arrayBuffer();
        } else P instanceof File ? w = await P.arrayBuffer() : w = P;
        if (!w || w.byteLength === 0)
          throw new Error(
            "EPUB source is empty or could not be read."
          );
        i = await Vt.loadAsync(w), await n();
      } catch (w) {
        const B = w instanceof Error ? w.message : "An unknown error occurred while fetching or loading the EPUB.";
        console.error("Error processing EPUB source:", w), r(B), q(""), s(""), C(!1);
      }
    },
    []
  );
  async function n() {
    if (!i) throw new Error("Zip not loaded");
    const w = i.file("META-INF/container.xml");
    if (!w)
      throw new Error("META-INF/container.xml not found.");
    const B = await w.async("text"), W = c(B);
    if (!W)
      throw new Error("OPF file path not found in container.xml.");
    m = W.substring(0, W.lastIndexOf("/") + 1);
    const _ = i.file(W);
    if (!_) throw new Error(`OPF file not found at path: ${W}`);
    const I = await _.async("text"), F = new DOMParser().parseFromString(I, "application/xml"), V = F.querySelector("parsererror");
    if (V)
      throw new Error(
        `Error parsing OPF file: ${V.textContent || "Unknown XML parse error"}`
      );
    o(F), await d(F);
  }
  function c(P) {
    const W = new DOMParser().parseFromString(
      P,
      "application/xml"
    ).querySelector(
      'rootfile[media-type="application/oebps-package+xml"]'
    );
    return (W == null ? void 0 : W.getAttribute("full-path")) ?? null;
  }
  function o(P) {
    const w = P.querySelector("metadata > dc\\:title") || P.querySelector("metadata > title");
    s((w == null ? void 0 : w.textContent) || "Untitled Book");
  }
  async function d(P) {
    if (!i) return;
    const w = {};
    P.querySelectorAll("manifest > item").forEach((I) => {
      const e = I.getAttribute("id"), F = I.getAttribute("href"), V = I.getAttribute("media-type");
      e && F && V && (w[e] = { href: decodeURIComponent(F), type: V });
    });
    const B = Array.from(
      P.querySelectorAll("spine > itemref")
    ).map((I) => I.getAttribute("idref"));
    let W = "";
    const _ = /* @__PURE__ */ new Set();
    for (const I of B) {
      if (!I) continue;
      const e = w[I];
      if (e) {
        const F = m + e.href, V = i.file(F);
        if (V && (e.type.includes("html") || e.type.includes("xml")))
          try {
            const U = await V.async("text"), tt = await k(
              U,
              e.type
            );
            W += `<div class="bok-chapter">${tt}</div>`;
          } catch (U) {
            console.warn(
              `Failed to process spine item ${F}:`,
              U
            );
          }
      }
    }
    for (const I in w) {
      const e = w[I];
      if (e.type.includes("css")) {
        const F = m + e.href;
        if (!_.has(F)) {
          const V = i.file(F);
          if (V)
            try {
              g += await V.async("text") + `
`, _.add(F);
            } catch (U) {
              console.warn(`Failed to load CSS ${F}:`, U);
            }
        }
      }
    }
    A(), q(W);
  }
  async function k(P, w) {
    let B = P.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    return B = await E(B, w), B;
  }
  async function E(P, w) {
    const B = new DOMParser();
    if (a.includes(w))
      try {
        const W = B.parseFromString(
          P,
          w
        ), _ = W.querySelector("parsererror");
        if (_)
          return console.warn(
            "Parser error in content item during cleanImages, skipping.",
            _.textContent
          ), P;
        const I = W.querySelectorAll("img");
        for (const U of I)
          await S(U);
        const e = W.querySelectorAll("image");
        for (const U of e)
          await L(U);
        return new XMLSerializer().serializeToString(
          W.documentElement || W
        );
      } catch (W) {
        return console.error(
          "Error during cleanImages DOM processing:",
          W
        ), P;
      }
    else return P;
  }
  async function S(P) {
    let w = P.getAttribute("src");
    if (w) {
      for (; w.startsWith(".") || w.startsWith("/"); ) w = w.slice(1);
      if (w = m + w, y[w] === void 0) {
        const B = i == null ? void 0 : i.file(w);
        if (B)
          try {
            const W = await B.async("blob"), _ = URL.createObjectURL(W);
            y[w] = _;
          } catch (W) {
            console.warn(
              `Could not load image blob (formatImg) ${w}:`,
              W
            ), y[w] = "";
          }
        else
          console.warn(`Image file not found in zip (formatImg): ${w}`), y[w] = "";
      }
      P.setAttribute("src", y[w]);
    }
  }
  async function L(P) {
    let w = P.getAttribute("xlink:href");
    if (w) {
      for (; w.startsWith(".") || w.startsWith("/"); ) w = w.slice(1);
      if (w = m + w, y[w] === void 0) {
        const B = i == null ? void 0 : i.file(w);
        if (B)
          try {
            const W = await B.async("blob"), _ = URL.createObjectURL(W);
            y[w] = _;
          } catch (W) {
            console.warn(
              `Could not load image blob (formatXMLImage) ${w}:`,
              W
            ), y[w] = "";
          }
        else
          console.warn(
            `Image file not found in zip (formatXMLImage): ${w}`
          ), y[w] = "";
      }
      P.setAttribute("xlink:href", y[w]);
    }
  }
  function A() {
    if (!g.trim()) return;
    const P = new Blob([g], { type: "text/css" }), w = URL.createObjectURL(P);
    b = document.createElement("link"), b.href = w, b.rel = "stylesheet", b.setAttribute("data-bok-reader-style", "true"), document.head.appendChild(b);
  }
  return {
    title: v,
    rawContent: G,
    isLoading: p,
    error: l,
    loadEpub: h,
    setIsLoading: C
  };
}
function jt(G) {
  const [q, p] = dt({
    width: 0,
    height: 0,
    noOfPages: 1
  });
  return ft(() => {
    const C = G == null ? void 0 : G.current, v = () => {
      if (C) {
        const s = C.getBoundingClientRect(), l = s.height < s.width;
        p((r) => {
          const i = l ? s.width / 2 : s.width, m = s.height, y = l ? 2 : 1;
          return r.width !== i || r.height !== m || r.noOfPages !== y ? {
            width: i,
            height: m,
            noOfPages: y
          } : r;
        });
      } else
        p({ width: 0, height: 0, noOfPages: 1 });
    };
    if (C) {
      v();
      const s = new ResizeObserver(v);
      return s.observe(C), () => {
        s.unobserve(C);
      };
    }
  }, [G]), [q.width, q.height, q.noOfPages];
}
function Yt(G) {
  const [q, p] = dt(0);
  return ft(() => {
    const C = () => {
      if (G.current) {
        const s = G.current.scrollWidth, l = G.current.scrollLeft, r = s > 0 ? l / s : 0;
        p(r);
      }
    }, v = G.current;
    return v == null || v.addEventListener("scroll", C), C(), () => {
      v == null || v.removeEventListener(
        "scroll",
        C
      );
    };
  }, [G]), [q, p];
}
function Jt(G, q, p, C, v) {
  let s = "";
  ft(() => {
    q > 1e-7 && (s = JSON.stringify({
      percentRead: q,
      padding: p,
      fontSize: C,
      fontFamily: v
    }), localStorage.setItem(G, s));
  }, [G, q, p, C, v]);
}
const Qt = (G, q, p) => {
  const [C, v] = jt(p);
  console.log(C);
  const s = xt(null), l = xt(""), r = kt(
    (i, m) => {
      q || (i / C <= 0.4 && m / v < 0.8 && G(-1), i / C > 0.4 && m / v < 0.8 && G(1));
    },
    [G, q, C, v]
  );
  ft(() => {
    const i = () => {
      var y;
      const m = (y = window.getSelection()) == null ? void 0 : y.toString();
      m && m.length > 0 ? l.current = m : l.current = "";
    };
    return document.addEventListener("selectionchange", i), () => {
      document.removeEventListener("selectionchange", i);
    };
  }, []), ft(() => {
    const i = () => {
      s.current = window.setTimeout(() => {
        s.current = null;
      }, 500);
    }, m = (y) => {
      if (s.current && l.current) {
        clearTimeout(s.current), s.current = null;
        const { pageX: g, pageY: b } = y.touches[0];
        r(g, b);
      }
    };
    return window.addEventListener("touchstart", i), window.addEventListener("touchend", m), () => {
      window.removeEventListener("touchstart", i), window.removeEventListener("touchend", m);
    };
  }, [C, r]), ft(() => {
    const i = p.current, m = () => {
      s.current = window.setTimeout(() => {
      }, 200);
    }, y = (g) => {
      s.current && !l.current && (clearTimeout(s.current), s.current = null, r(g.clientX, g.clientY));
    };
    return i == null || i.addEventListener("mousedown", m), i == null || i.addEventListener("mouseup", y), () => {
      i == null || i.removeEventListener("mousedown", m), i == null || i.removeEventListener("mouseup", y);
    };
  }, [C, q, r, p]);
};
function te({ currentPage: G, pages: q }) {
  return /* @__PURE__ */ pt("div", { className: "page-number", children: [
    G + 1,
    "/",
    q
  ] });
}
function ee({
  content: G,
  title: q,
  setIsLoading: p,
  fontSize: C,
  sidePadding: v,
  fontFamily: s,
  isOptionMenuVisible: l,
  setFontSize: r,
  setPadding: i,
  setFontFamily: m,
  containerElementRef: y
}) {
  const g = xt(null), [b, a, h] = jt(y), [n, c] = Yt(g), [o, d] = dt(1), [k, E] = dt(0);
  Jt(q, n, v, C, s);
  const S = kt(
    (w) => {
      d((B) => {
        const W = g.current;
        if (W && k > 0 && h > 0 && W.clientWidth > 0) {
          const _ = W.clientWidth / h, I = B + w;
          if (I >= 0 && I < k)
            return W.scroll({
              left: I * _,
              behavior: "smooth"
            }), I;
        }
        return B;
      });
    },
    [g, k, h]
  );
  Qt(S, l, y), ft(() => {
    if (!q) return;
    const w = localStorage.getItem(q);
    if (w)
      try {
        const B = JSON.parse(w);
        B && (c(B.percentRead || 0), B.fontSize !== void 0 && r(B.fontSize), B.padding !== void 0 && i(B.padding), B.fontFamily !== void 0 && m(B.fontFamily));
      } catch (B) {
        console.error("Failed to parse local storage for", q, B), c(0);
      }
    else
      c(0);
    d(1);
  }, [q, c, r, i, m]);
  const L = kt(() => {
    const w = g.current;
    if (w && b > 0 && h > 0 && w.clientWidth > 0) {
      const B = w.scrollWidth, W = w.clientWidth / h;
      if (W > 0 && B > 0) {
        const _ = Math.ceil(B / W);
        return E(_), _;
      }
    }
    return E(0), 0;
  }, [g, b, h]), A = kt(
    (w) => {
      const B = g.current;
      if (!B || !h || w <= 0 || B.clientWidth <= 0) {
        console.warn(
          "updatePage: Cannot update page, invalid conditions.",
          {
            hasScrollContainer: !!B,
            noOfPages: h,
            newPageCount: w,
            clientWidth: B == null ? void 0 : B.clientWidth
          }
        );
        return;
      }
      let W = Math.ceil(w * n);
      W = Math.max(0, Math.min(w, W));
      const _ = B.clientWidth / h;
      d(W), B.scrollLeft = W * _, p(!1);
    },
    [g, h, p, n, d]
  ), P = kt(
    (w) => {
      w.key === "ArrowLeft" && (w.preventDefault(), S(-1)), w.key === "ArrowRight" && (w.preventDefault(), S(1));
    },
    [S]
  );
  return ft(() => {
    const w = g.current;
    if (b <= 0 || a <= 0 || !w)
      return;
    w.style.setProperty("--side-padding", `${v}px`), w.style.setProperty("--font-size", `${C}em`), w.style.setProperty("--font-family", s), w.style.maxHeight = `${a}px`;
    const B = setTimeout(() => {
      const W = L();
      W > 0 ? A(W) : (p(!1), d(1));
    }, 500);
    return document.addEventListener("keydown", P), () => {
      clearTimeout(B), document.removeEventListener("keydown", P);
    };
  }, [
    G,
    a,
    b,
    h,
    v,
    C,
    s,
    q,
    L,
    A,
    P,
    p
  ]), /* @__PURE__ */ pt(Nt, { children: [
    /* @__PURE__ */ it(
      "div",
      {
        ref: g,
        dangerouslySetInnerHTML: { __html: G },
        className: "book-page"
      }
    ),
    /* @__PURE__ */ it(te, { pages: k, currentPage: o })
  ] });
}
var re = {
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
function ne(G) {
  if (typeof G == "number")
    return {
      value: G,
      unit: "px"
    };
  var q, p = (G.match(/^[0-9.]*/) || "").toString();
  p.includes(".") ? q = parseFloat(p) : q = parseInt(p, 10);
  var C = (G.match(/[^0-9]*$/) || "").toString();
  return re[C] ? {
    value: q,
    unit: C
  } : (console.warn("React Spinners: ".concat(G, " is not a valid css value. Defaulting to ").concat(q, "px.")), {
    value: q,
    unit: "px"
  });
}
var wt = function(G, q, p) {
  var C = "react-spinners-".concat(G, "-").concat(p);
  if (typeof window > "u" || !window.document)
    return C;
  var v = document.createElement("style");
  document.head.appendChild(v);
  var s = v.sheet, l = `
    @keyframes `.concat(C, ` {
      `).concat(q, `
    }
  `);
  return s && s.insertRule(l, 0), C;
}, Bt = function() {
  return Bt = Object.assign || function(G) {
    for (var q, p = 1, C = arguments.length; p < C; p++) {
      q = arguments[p];
      for (var v in q) Object.prototype.hasOwnProperty.call(q, v) && (G[v] = q[v]);
    }
    return G;
  }, Bt.apply(this, arguments);
}, ie = function(G, q) {
  var p = {};
  for (var C in G) Object.prototype.hasOwnProperty.call(G, C) && q.indexOf(C) < 0 && (p[C] = G[C]);
  if (G != null && typeof Object.getOwnPropertySymbols == "function")
    for (var v = 0, C = Object.getOwnPropertySymbols(G); v < C.length; v++)
      q.indexOf(C[v]) < 0 && Object.prototype.propertyIsEnumerable.call(G, C[v]) && (p[C[v]] = G[C[v]]);
  return p;
}, ht = [1, 3, 5], ae = [
  wt("PropagateLoader", "25% {transform: translateX(-".concat(ht[0], `rem) scale(0.75)}
    50% {transform: translateX(-`).concat(ht[1], `rem) scale(0.6)}
    75% {transform: translateX(-`).concat(ht[2], `rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-0"),
  wt("PropagateLoader", "25% {transform: translateX(-".concat(ht[0], `rem) scale(0.75)}
    50% {transform: translateX(-`).concat(ht[1], `rem) scale(0.6)}
    75% {transform: translateX(-`).concat(ht[1], `rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-1"),
  wt("PropagateLoader", "25% {transform: translateX(-".concat(ht[0], `rem) scale(0.75)}
    75% {transform: translateX(-`).concat(ht[0], `rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-2"),
  wt("PropagateLoader", "25% {transform: translateX(".concat(ht[0], `rem) scale(0.75)}
    75% {transform: translateX(`).concat(ht[0], `rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-3"),
  wt("PropagateLoader", "25% {transform: translateX(".concat(ht[0], `rem) scale(0.75)}
    50% {transform: translateX(`).concat(ht[1], `rem) scale(0.6)}
    75% {transform: translateX(`).concat(ht[1], `rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-4"),
  wt("PropagateLoader", "25% {transform: translateX(".concat(ht[0], `rem) scale(0.75)}
    50% {transform: translateX(`).concat(ht[1], `rem) scale(0.6)}
    75% {transform: translateX(`).concat(ht[2], `rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-5")
];
function se(G) {
  var q = G.loading, p = q === void 0 ? !0 : q, C = G.color, v = C === void 0 ? "#000000" : C, s = G.speedMultiplier, l = s === void 0 ? 1 : s, r = G.cssOverride, i = r === void 0 ? {} : r, m = G.size, y = m === void 0 ? 15 : m, g = ie(G, ["loading", "color", "speedMultiplier", "cssOverride", "size"]), b = ne(y), a = b.value, h = b.unit, n = Bt({ display: "inherit", position: "relative" }, i), c = function(o) {
    return {
      position: "absolute",
      fontSize: "".concat(a / 3).concat(h),
      width: "".concat(a).concat(h),
      height: "".concat(a).concat(h),
      background: v,
      borderRadius: "50%",
      animation: "".concat(ae[o], " ").concat(1.5 / l, "s infinite"),
      animationFillMode: "forwards"
    };
  };
  return p ? yt.createElement(
    "span",
    Bt({ style: n }, g),
    yt.createElement("span", { style: c(0) }),
    yt.createElement("span", { style: c(1) }),
    yt.createElement("span", { style: c(2) }),
    yt.createElement("span", { style: c(3) }),
    yt.createElement("span", { style: c(4) }),
    yt.createElement("span", { style: c(5) })
  ) : null;
}
const Ft = {
  "loading-screen": "_loading-screen_42072_1",
  "loading-screen-gon": "_loading-screen-gon_42072_18"
};
function oe({ isLoading: G }) {
  return console.log("loading screen component mounted, you just fucked up the css"), /* @__PURE__ */ it(
    "div",
    {
      className: G ? Ft["loading-screen"] : Ft["loading-screen-gon"],
      children: /* @__PURE__ */ it("div", { children: /* @__PURE__ */ it(se, { color: "red" }) })
    }
  );
}
function le() {
  document.fullscreenElement ? document.exitFullscreen && document.exitFullscreen() : document.documentElement.requestFullscreen();
}
function ce({
  onClose: G,
  fontSize: q,
  padding: p,
  fontFamily: C,
  setFontSize: v,
  setPadding: s,
  setFontFamily: l,
  setIsLoading: r
}) {
  const [i, m] = dt(!1), [y, g] = dt(!1), b = xt(null), a = xt(null), h = ["Inter", "Roboto", "Merriweather"];
  ft(() => {
    const A = setTimeout(() => {
      g(!0);
    }, 0);
    return () => clearTimeout(A);
  }, []);
  const n = () => {
    g(!1), m(!0);
  };
  ft(() => {
    if (i) {
      const A = setTimeout(() => {
        G();
      }, 300);
      return () => clearTimeout(A);
    }
  }, [i, G]);
  const c = () => {
    n();
  }, o = (A) => {
    A.stopPropagation();
  }, d = (A) => {
    A.current && (A.current.classList.add("value-changed"), setTimeout(() => {
      A.current && A.current.classList.remove("value-changed");
    }, 300));
  }, k = () => {
    p <= 70 && (s((A) => A + 5), d(a), r(!0));
  }, E = () => {
    p - 5 > 0 && (s((A) => A - 5), d(a), r(!0));
  }, S = () => {
    q < 3 && (v((A) => A + 0.2), d(b), r(!0));
  }, L = () => {
    q - 0.2 > 0.6 && (v((A) => A - 0.2), d(b), r(!0));
  };
  return /* @__PURE__ */ it(
    "div",
    {
      className: `options-menu-overlay ${i ? "fade-out" : ""}`,
      onClick: c,
      children: /* @__PURE__ */ pt(
        "div",
        {
          className: `options-menu ${y ? "visible" : ""} ${i ? "slide-down" : ""}`,
          onClick: o,
          children: [
            /* @__PURE__ */ it("button", { onClick: n, className: "close-button", children: "✕" }),
            /* @__PURE__ */ it("h2", { children: "Reader Options" }),
            /* @__PURE__ */ pt("div", { className: "options-buttons", children: [
              /* @__PURE__ */ pt("div", { className: "font-family-buttons", children: [
                /* @__PURE__ */ it(
                  "select",
                  {
                    value: C,
                    onChange: (A) => {
                      h.includes(A.target.value) && (l(A.target.value), r(!0));
                    },
                    children: h.map((A) => /* @__PURE__ */ it("option", { value: A, children: A }, A))
                  }
                ),
                /* @__PURE__ */ it("div", { className: "option-label", children: "Font family" })
              ] }),
              /* @__PURE__ */ pt("div", { className: "padding-buttons", children: [
                /* @__PURE__ */ it("button", { onClick: k, children: "+" }),
                /* @__PURE__ */ it("button", { onClick: E, children: "-" }),
                /* @__PURE__ */ pt("div", { children: [
                  /* @__PURE__ */ it("span", { className: "option-label", children: "Side padding: " }),
                  /* @__PURE__ */ it(
                    "span",
                    {
                      ref: a,
                      className: "option-value",
                      children: p
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ pt("div", { className: "font-buttons", children: [
                /* @__PURE__ */ it("button", { onClick: S, children: "+" }),
                /* @__PURE__ */ it("button", { onClick: L, children: "-" }),
                /* @__PURE__ */ pt("div", { style: { marginLeft: "auto" }, children: [
                  /* @__PURE__ */ it("span", { className: "option-label", children: "Font size: " }),
                  /* @__PURE__ */ it("span", { ref: b, className: "option-value", children: Math.round(q * 10) })
                ] })
              ] }),
              /* @__PURE__ */ it("button", { onClick: le, children: "Toggle fullscreen" })
            ] })
          ]
        }
      )
    }
  );
}
const Dt = Gt`
  .bok-reader-container {
    font-family: ${(G) => G.fontFamily}, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    text-align: justify;
    color-scheme: dark light;
    color: rgb(215, 215, 215);
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
        text-shadow: 2px 2px 5px rgba(0, 0, 0); // Keep stylistic choice
        font-size: var(--font-size);

        column-gap: calc(2 * var(--side-padding)); // Gap between columns
        column-fill: auto; // MUST be auto for scrollWidth calculation to be correct
        -moz-column-gap: calc(2 * var(--side-padding));
        -webkit-column-gap: calc(2 * var(--side-padding));

        // Enable horizontal scrolling of the columns
        overflow-x: hidden;
        overflow-y: hidden; // Prevent vertical scrollbar on the container itself
        scroll-snap-type: x mandatory; // Snap pages (columns)
        scroll-behavior: auto; // Let JS handle smooth scrolling during page turns
        -webkit-overflow-scrolling: touch; // Momentum scroll on iOS
        box-sizing: border-box; // Include padding in width/height calculations


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
            column-count: 1;
            -moz-column-count: 1;
            -webkit-column-count: 1;
            column-width: 100%;
            -webkit-column-width: 100%;

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
`, Lt = Ht.div`
    width: 100%;
    height: 100%;
    position: relative; /* Needed for absolute positioning of children like PageNumber/OptionsMenu */
    overflow: hidden; /* Contain the scrolling book */
    overflow-y: hidden;
`, fe = ({
  epubDataSource: G,
  onTitleChange: q,
  onLoadingChange: p,
  onError: C,
  className: v,
  style: s
}) => {
  const { title: l, rawContent: r, isLoading: i, error: m, loadEpub: y, setIsLoading: g } = qt(), [b, a] = dt(!1), [h, n] = dt(1.2), [c, o] = dt(30), [d, k] = dt("Inter"), E = xt(null);
  ft(() => {
    G && y(G);
  }, [G, y]), ft(() => {
    q && q(l);
  }, [l, q]), ft(() => {
    p && p(i);
  }, [i, p]), ft(() => {
    m && C && C(m);
  }, [m, C]);
  const S = Xt(
    () => ({
      "--side-padding": `${c}px`,
      "--top-padding": "30px",
      // Example: make these configurable too if needed
      "--bottom-padding": "70px",
      // Example
      "--font-size": `${h}em`,
      "--font-family": d
    }),
    [c, h, d]
  );
  return m && !i && !r ? /* @__PURE__ */ pt(
    Lt,
    {
      className: `bok-reader-container ${v || ""}`,
      style: s,
      children: [
        /* @__PURE__ */ it(
          Dt,
          {
            fontFamily: d,
            fontSize: h
          }
        ),
        /* @__PURE__ */ pt("div", { style: { padding: "20px", color: "red" }, children: [
          "Error loading EPUB: ",
          m
        ] })
      ]
    }
  ) : /* @__PURE__ */ pt(
    Lt,
    {
      className: `bok-reader-container ${v || ""}`,
      style: { ...s, ...S },
      ref: E,
      children: [
        /* @__PURE__ */ it(Dt, { fontFamily: d, fontSize: h }),
        /* @__PURE__ */ it(oe, { isLoading: i }),
        r && /* @__PURE__ */ pt(Nt, { children: [
          /* @__PURE__ */ it(
            ee,
            {
              content: r,
              title: l,
              setIsLoading: g,
              fontSize: h,
              sidePadding: c,
              fontFamily: d,
              setPadding: o,
              setFontSize: n,
              setFontFamily: k,
              isOptionMenuVisible: b,
              containerElementRef: E
            }
          ),
          b && /* @__PURE__ */ it(
            ce,
            {
              onClose: () => a(!1),
              fontSize: h,
              padding: c,
              fontFamily: d,
              setPadding: o,
              setFontSize: n,
              setFontFamily: k,
              setIsLoading: g
            }
          ),
          !b && /* @__PURE__ */ it(
            "div",
            {
              className: "bottom-click-area",
              onClick: () => a(!0),
              "aria-label": "Open reader options"
            }
          )
        ] }),
        !G && !i && !m && /* @__PURE__ */ it("div", { style: { padding: "20px", textAlign: "center" }, children: "No EPUB loaded." })
      ]
    }
  );
};
export {
  fe as BokReader
};
