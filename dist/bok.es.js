import { jsxs as pt, Fragment as Nt, jsx as it } from "react/jsx-runtime";
import * as yt from "react";
import { useState as ft, useCallback as Tt, useEffect as dt, useRef as kt, useMemo as Xt } from "react";
import Ht, { createGlobalStyle as Gt } from "styled-components";
var At = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Kt(G) {
  return G && G.__esModule && Object.prototype.hasOwnProperty.call(G, "default") ? G.default : G;
}
function Ot(G) {
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
    return function p(z, y, s) {
      function l(m, b) {
        if (!y[m]) {
          if (!z[m]) {
            var g = typeof Ot == "function" && Ot;
            if (!b && g) return g(m, !0);
            if (r) return r(m, !0);
            var _ = new Error("Cannot find module '" + m + "'");
            throw _.code = "MODULE_NOT_FOUND", _;
          }
          var i = y[m] = { exports: {} };
          z[m][0].call(i.exports, function(d) {
            var n = z[m][1][d];
            return l(n || d);
          }, i, i.exports, p, z, y, s);
        }
        return y[m].exports;
      }
      for (var r = typeof Ot == "function" && Ot, a = 0; a < s.length; a++) l(s[a]);
      return l;
    }({ 1: [function(p, z, y) {
      var s = p("./utils"), l = p("./support"), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      y.encode = function(a) {
        for (var m, b, g, _, i, d, n, c = [], o = 0, f = a.length, w = f, C = s.getTypeOf(a) !== "string"; o < a.length; ) w = f - o, g = C ? (m = a[o++], b = o < f ? a[o++] : 0, o < f ? a[o++] : 0) : (m = a.charCodeAt(o++), b = o < f ? a.charCodeAt(o++) : 0, o < f ? a.charCodeAt(o++) : 0), _ = m >> 2, i = (3 & m) << 4 | b >> 4, d = 1 < w ? (15 & b) << 2 | g >> 6 : 64, n = 2 < w ? 63 & g : 64, c.push(r.charAt(_) + r.charAt(i) + r.charAt(d) + r.charAt(n));
        return c.join("");
      }, y.decode = function(a) {
        var m, b, g, _, i, d, n = 0, c = 0, o = "data:";
        if (a.substr(0, o.length) === o) throw new Error("Invalid base64 input, it looks like a data url.");
        var f, w = 3 * (a = a.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (a.charAt(a.length - 1) === r.charAt(64) && w--, a.charAt(a.length - 2) === r.charAt(64) && w--, w % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (f = l.uint8array ? new Uint8Array(0 | w) : new Array(0 | w); n < a.length; ) m = r.indexOf(a.charAt(n++)) << 2 | (_ = r.indexOf(a.charAt(n++))) >> 4, b = (15 & _) << 4 | (i = r.indexOf(a.charAt(n++))) >> 2, g = (3 & i) << 6 | (d = r.indexOf(a.charAt(n++))), f[c++] = m, i !== 64 && (f[c++] = b), d !== 64 && (f[c++] = g);
        return f;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(p, z, y) {
      var s = p("./external"), l = p("./stream/DataWorker"), r = p("./stream/Crc32Probe"), a = p("./stream/DataLengthProbe");
      function m(b, g, _, i, d) {
        this.compressedSize = b, this.uncompressedSize = g, this.crc32 = _, this.compression = i, this.compressedContent = d;
      }
      m.prototype = { getContentWorker: function() {
        var b = new l(s.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), g = this;
        return b.on("end", function() {
          if (this.streamInfo.data_length !== g.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), b;
      }, getCompressedWorker: function() {
        return new l(s.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, m.createWorkerFrom = function(b, g, _) {
        return b.pipe(new r()).pipe(new a("uncompressedSize")).pipe(g.compressWorker(_)).pipe(new a("compressedSize")).withStreamInfo("compression", g);
      }, z.exports = m;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(p, z, y) {
      var s = p("./stream/GenericWorker");
      y.STORE = { magic: "\0\0", compressWorker: function() {
        return new s("STORE compression");
      }, uncompressWorker: function() {
        return new s("STORE decompression");
      } }, y.DEFLATE = p("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(p, z, y) {
      var s = p("./utils"), l = function() {
        for (var r, a = [], m = 0; m < 256; m++) {
          r = m;
          for (var b = 0; b < 8; b++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
          a[m] = r;
        }
        return a;
      }();
      z.exports = function(r, a) {
        return r !== void 0 && r.length ? s.getTypeOf(r) !== "string" ? function(m, b, g, _) {
          var i = l, d = _ + g;
          m ^= -1;
          for (var n = _; n < d; n++) m = m >>> 8 ^ i[255 & (m ^ b[n])];
          return -1 ^ m;
        }(0 | a, r, r.length, 0) : function(m, b, g, _) {
          var i = l, d = _ + g;
          m ^= -1;
          for (var n = _; n < d; n++) m = m >>> 8 ^ i[255 & (m ^ b.charCodeAt(n))];
          return -1 ^ m;
        }(0 | a, r, r.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(p, z, y) {
      y.base64 = !1, y.binary = !1, y.dir = !1, y.createFolders = !0, y.date = null, y.compression = null, y.compressionOptions = null, y.comment = null, y.unixPermissions = null, y.dosPermissions = null;
    }, {}], 6: [function(p, z, y) {
      var s = null;
      s = typeof Promise < "u" ? Promise : p("lie"), z.exports = { Promise: s };
    }, { lie: 37 }], 7: [function(p, z, y) {
      var s = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", l = p("pako"), r = p("./utils"), a = p("./stream/GenericWorker"), m = s ? "uint8array" : "array";
      function b(g, _) {
        a.call(this, "FlateWorker/" + g), this._pako = null, this._pakoAction = g, this._pakoOptions = _, this.meta = {};
      }
      y.magic = "\b\0", r.inherits(b, a), b.prototype.processChunk = function(g) {
        this.meta = g.meta, this._pako === null && this._createPako(), this._pako.push(r.transformTo(m, g.data), !1);
      }, b.prototype.flush = function() {
        a.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, b.prototype.cleanUp = function() {
        a.prototype.cleanUp.call(this), this._pako = null;
      }, b.prototype._createPako = function() {
        this._pako = new l[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var g = this;
        this._pako.onData = function(_) {
          g.push({ data: _, meta: g.meta });
        };
      }, y.compressWorker = function(g) {
        return new b("Deflate", g);
      }, y.uncompressWorker = function() {
        return new b("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(p, z, y) {
      function s(i, d) {
        var n, c = "";
        for (n = 0; n < d; n++) c += String.fromCharCode(255 & i), i >>>= 8;
        return c;
      }
      function l(i, d, n, c, o, f) {
        var w, C, S = i.file, P = i.compression, E = f !== m.utf8encode, R = r.transformTo("string", f(S.name)), k = r.transformTo("string", m.utf8encode(S.name)), D = S.comment, X = r.transformTo("string", f(D)), v = r.transformTo("string", m.utf8encode(D)), B = k.length !== S.name.length, e = v.length !== D.length, F = "", $ = "", U = "", tt = S.dir, W = S.date, Q = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        d && !n || (Q.crc32 = i.crc32, Q.compressedSize = i.compressedSize, Q.uncompressedSize = i.uncompressedSize);
        var I = 0;
        d && (I |= 8), E || !B && !e || (I |= 2048);
        var O = 0, J = 0;
        tt && (O |= 16), o === "UNIX" ? (J = 798, O |= function(H, st) {
          var ut = H;
          return H || (ut = st ? 16893 : 33204), (65535 & ut) << 16;
        }(S.unixPermissions, tt)) : (J = 20, O |= function(H) {
          return 63 & (H || 0);
        }(S.dosPermissions)), w = W.getUTCHours(), w <<= 6, w |= W.getUTCMinutes(), w <<= 5, w |= W.getUTCSeconds() / 2, C = W.getUTCFullYear() - 1980, C <<= 4, C |= W.getUTCMonth() + 1, C <<= 5, C |= W.getUTCDate(), B && ($ = s(1, 1) + s(b(R), 4) + k, F += "up" + s($.length, 2) + $), e && (U = s(1, 1) + s(b(X), 4) + v, F += "uc" + s(U.length, 2) + U);
        var K = "";
        return K += `
\0`, K += s(I, 2), K += P.magic, K += s(w, 2), K += s(C, 2), K += s(Q.crc32, 4), K += s(Q.compressedSize, 4), K += s(Q.uncompressedSize, 4), K += s(R.length, 2), K += s(F.length, 2), { fileRecord: g.LOCAL_FILE_HEADER + K + R + F, dirRecord: g.CENTRAL_FILE_HEADER + s(J, 2) + K + s(X.length, 2) + "\0\0\0\0" + s(O, 4) + s(c, 4) + R + F + X };
      }
      var r = p("../utils"), a = p("../stream/GenericWorker"), m = p("../utf8"), b = p("../crc32"), g = p("../signature");
      function _(i, d, n, c) {
        a.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = d, this.zipPlatform = n, this.encodeFileName = c, this.streamFiles = i, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      r.inherits(_, a), _.prototype.push = function(i) {
        var d = i.meta.percent || 0, n = this.entriesCount, c = this._sources.length;
        this.accumulate ? this.contentBuffer.push(i) : (this.bytesWritten += i.data.length, a.prototype.push.call(this, { data: i.data, meta: { currentFile: this.currentFile, percent: n ? (d + 100 * (n - c - 1)) / n : 100 } }));
      }, _.prototype.openedSource = function(i) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = i.file.name;
        var d = this.streamFiles && !i.file.dir;
        if (d) {
          var n = l(i, d, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: n.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, _.prototype.closedSource = function(i) {
        this.accumulate = !1;
        var d = this.streamFiles && !i.file.dir, n = l(i, d, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(n.dirRecord), d) this.push({ data: function(c) {
          return g.DATA_DESCRIPTOR + s(c.crc32, 4) + s(c.compressedSize, 4) + s(c.uncompressedSize, 4);
        }(i), meta: { percent: 100 } });
        else for (this.push({ data: n.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, _.prototype.flush = function() {
        for (var i = this.bytesWritten, d = 0; d < this.dirRecords.length; d++) this.push({ data: this.dirRecords[d], meta: { percent: 100 } });
        var n = this.bytesWritten - i, c = function(o, f, w, C, S) {
          var P = r.transformTo("string", S(C));
          return g.CENTRAL_DIRECTORY_END + "\0\0\0\0" + s(o, 2) + s(o, 2) + s(f, 4) + s(w, 4) + s(P.length, 2) + P;
        }(this.dirRecords.length, n, i, this.zipComment, this.encodeFileName);
        this.push({ data: c, meta: { percent: 100 } });
      }, _.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, _.prototype.registerPrevious = function(i) {
        this._sources.push(i);
        var d = this;
        return i.on("data", function(n) {
          d.processChunk(n);
        }), i.on("end", function() {
          d.closedSource(d.previous.streamInfo), d._sources.length ? d.prepareNextSource() : d.end();
        }), i.on("error", function(n) {
          d.error(n);
        }), this;
      }, _.prototype.resume = function() {
        return !!a.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, _.prototype.error = function(i) {
        var d = this._sources;
        if (!a.prototype.error.call(this, i)) return !1;
        for (var n = 0; n < d.length; n++) try {
          d[n].error(i);
        } catch {
        }
        return !0;
      }, _.prototype.lock = function() {
        a.prototype.lock.call(this);
        for (var i = this._sources, d = 0; d < i.length; d++) i[d].lock();
      }, z.exports = _;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(p, z, y) {
      var s = p("../compressions"), l = p("./ZipFileWorker");
      y.generateWorker = function(r, a, m) {
        var b = new l(a.streamFiles, m, a.platform, a.encodeFileName), g = 0;
        try {
          r.forEach(function(_, i) {
            g++;
            var d = function(f, w) {
              var C = f || w, S = s[C];
              if (!S) throw new Error(C + " is not a valid compression method !");
              return S;
            }(i.options.compression, a.compression), n = i.options.compressionOptions || a.compressionOptions || {}, c = i.dir, o = i.date;
            i._compressWorker(d, n).withStreamInfo("file", { name: _, dir: c, date: o, comment: i.comment || "", unixPermissions: i.unixPermissions, dosPermissions: i.dosPermissions }).pipe(b);
          }), b.entriesCount = g;
        } catch (_) {
          b.error(_);
        }
        return b;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(p, z, y) {
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
      }, s.external = p("./external"), z.exports = s;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(p, z, y) {
      var s = p("./utils"), l = p("./external"), r = p("./utf8"), a = p("./zipEntries"), m = p("./stream/Crc32Probe"), b = p("./nodejsUtils");
      function g(_) {
        return new l.Promise(function(i, d) {
          var n = _.decompressed.getContentWorker().pipe(new m());
          n.on("error", function(c) {
            d(c);
          }).on("end", function() {
            n.streamInfo.crc32 !== _.decompressed.crc32 ? d(new Error("Corrupted zip : CRC32 mismatch")) : i();
          }).resume();
        });
      }
      z.exports = function(_, i) {
        var d = this;
        return i = s.extend(i || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: r.utf8decode }), b.isNode && b.isStream(_) ? l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : s.prepareContent("the loaded zip file", _, !0, i.optimizedBinaryString, i.base64).then(function(n) {
          var c = new a(i);
          return c.load(n), c;
        }).then(function(n) {
          var c = [l.Promise.resolve(n)], o = n.files;
          if (i.checkCRC32) for (var f = 0; f < o.length; f++) c.push(g(o[f]));
          return l.Promise.all(c);
        }).then(function(n) {
          for (var c = n.shift(), o = c.files, f = 0; f < o.length; f++) {
            var w = o[f], C = w.fileNameStr, S = s.resolve(w.fileNameStr);
            d.file(S, w.decompressed, { binary: !0, optimizedBinaryString: !0, date: w.date, dir: w.dir, comment: w.fileCommentStr.length ? w.fileCommentStr : null, unixPermissions: w.unixPermissions, dosPermissions: w.dosPermissions, createFolders: i.createFolders }), w.dir || (d.file(S).unsafeOriginalName = C);
          }
          return c.zipComment.length && (d.comment = c.zipComment), d;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(p, z, y) {
      var s = p("../utils"), l = p("../stream/GenericWorker");
      function r(a, m) {
        l.call(this, "Nodejs stream input adapter for " + a), this._upstreamEnded = !1, this._bindStream(m);
      }
      s.inherits(r, l), r.prototype._bindStream = function(a) {
        var m = this;
        (this._stream = a).pause(), a.on("data", function(b) {
          m.push({ data: b, meta: { percent: 0 } });
        }).on("error", function(b) {
          m.isPaused ? this.generatedError = b : m.error(b);
        }).on("end", function() {
          m.isPaused ? m._upstreamEnded = !0 : m.end();
        });
      }, r.prototype.pause = function() {
        return !!l.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, r.prototype.resume = function() {
        return !!l.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, z.exports = r;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(p, z, y) {
      var s = p("readable-stream").Readable;
      function l(r, a, m) {
        s.call(this, a), this._helper = r;
        var b = this;
        r.on("data", function(g, _) {
          b.push(g) || b._helper.pause(), m && m(_);
        }).on("error", function(g) {
          b.emit("error", g);
        }).on("end", function() {
          b.push(null);
        });
      }
      p("../utils").inherits(l, s), l.prototype._read = function() {
        this._helper.resume();
      }, z.exports = l;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(p, z, y) {
      z.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(s, l) {
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
    }, {}], 15: [function(p, z, y) {
      function s(S, P, E) {
        var R, k = r.getTypeOf(P), D = r.extend(E || {}, b);
        D.date = D.date || /* @__PURE__ */ new Date(), D.compression !== null && (D.compression = D.compression.toUpperCase()), typeof D.unixPermissions == "string" && (D.unixPermissions = parseInt(D.unixPermissions, 8)), D.unixPermissions && 16384 & D.unixPermissions && (D.dir = !0), D.dosPermissions && 16 & D.dosPermissions && (D.dir = !0), D.dir && (S = o(S)), D.createFolders && (R = c(S)) && f.call(this, R, !0);
        var X = k === "string" && D.binary === !1 && D.base64 === !1;
        E && E.binary !== void 0 || (D.binary = !X), (P instanceof g && P.uncompressedSize === 0 || D.dir || !P || P.length === 0) && (D.base64 = !1, D.binary = !0, P = "", D.compression = "STORE", k = "string");
        var v = null;
        v = P instanceof g || P instanceof a ? P : d.isNode && d.isStream(P) ? new n(S, P) : r.prepareContent(S, P, D.binary, D.optimizedBinaryString, D.base64);
        var B = new _(S, v, D);
        this.files[S] = B;
      }
      var l = p("./utf8"), r = p("./utils"), a = p("./stream/GenericWorker"), m = p("./stream/StreamHelper"), b = p("./defaults"), g = p("./compressedObject"), _ = p("./zipObject"), i = p("./generate"), d = p("./nodejsUtils"), n = p("./nodejs/NodejsStreamInputAdapter"), c = function(S) {
        S.slice(-1) === "/" && (S = S.substring(0, S.length - 1));
        var P = S.lastIndexOf("/");
        return 0 < P ? S.substring(0, P) : "";
      }, o = function(S) {
        return S.slice(-1) !== "/" && (S += "/"), S;
      }, f = function(S, P) {
        return P = P !== void 0 ? P : b.createFolders, S = o(S), this.files[S] || s.call(this, S, null, { dir: !0, createFolders: P }), this.files[S];
      };
      function w(S) {
        return Object.prototype.toString.call(S) === "[object RegExp]";
      }
      var C = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(S) {
        var P, E, R;
        for (P in this.files) R = this.files[P], (E = P.slice(this.root.length, P.length)) && P.slice(0, this.root.length) === this.root && S(E, R);
      }, filter: function(S) {
        var P = [];
        return this.forEach(function(E, R) {
          S(E, R) && P.push(R);
        }), P;
      }, file: function(S, P, E) {
        if (arguments.length !== 1) return S = this.root + S, s.call(this, S, P, E), this;
        if (w(S)) {
          var R = S;
          return this.filter(function(D, X) {
            return !X.dir && R.test(D);
          });
        }
        var k = this.files[this.root + S];
        return k && !k.dir ? k : null;
      }, folder: function(S) {
        if (!S) return this;
        if (w(S)) return this.filter(function(k, D) {
          return D.dir && S.test(k);
        });
        var P = this.root + S, E = f.call(this, P), R = this.clone();
        return R.root = E.name, R;
      }, remove: function(S) {
        S = this.root + S;
        var P = this.files[S];
        if (P || (S.slice(-1) !== "/" && (S += "/"), P = this.files[S]), P && !P.dir) delete this.files[S];
        else for (var E = this.filter(function(k, D) {
          return D.name.slice(0, S.length) === S;
        }), R = 0; R < E.length; R++) delete this.files[E[R].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(S) {
        var P, E = {};
        try {
          if ((E = r.extend(S || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: l.utf8encode })).type = E.type.toLowerCase(), E.compression = E.compression.toUpperCase(), E.type === "binarystring" && (E.type = "string"), !E.type) throw new Error("No output type specified.");
          r.checkSupport(E.type), E.platform !== "darwin" && E.platform !== "freebsd" && E.platform !== "linux" && E.platform !== "sunos" || (E.platform = "UNIX"), E.platform === "win32" && (E.platform = "DOS");
          var R = E.comment || this.comment || "";
          P = i.generateWorker(this, E, R);
        } catch (k) {
          (P = new a("error")).error(k);
        }
        return new m(P, E.type || "string", E.mimeType);
      }, generateAsync: function(S, P) {
        return this.generateInternalStream(S).accumulate(P);
      }, generateNodeStream: function(S, P) {
        return (S = S || {}).type || (S.type = "nodebuffer"), this.generateInternalStream(S).toNodejsStream(P);
      } };
      z.exports = C;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(p, z, y) {
      z.exports = p("stream");
    }, { stream: void 0 }], 17: [function(p, z, y) {
      var s = p("./DataReader");
      function l(r) {
        s.call(this, r);
        for (var a = 0; a < this.data.length; a++) r[a] = 255 & r[a];
      }
      p("../utils").inherits(l, s), l.prototype.byteAt = function(r) {
        return this.data[this.zero + r];
      }, l.prototype.lastIndexOfSignature = function(r) {
        for (var a = r.charCodeAt(0), m = r.charCodeAt(1), b = r.charCodeAt(2), g = r.charCodeAt(3), _ = this.length - 4; 0 <= _; --_) if (this.data[_] === a && this.data[_ + 1] === m && this.data[_ + 2] === b && this.data[_ + 3] === g) return _ - this.zero;
        return -1;
      }, l.prototype.readAndCheckSignature = function(r) {
        var a = r.charCodeAt(0), m = r.charCodeAt(1), b = r.charCodeAt(2), g = r.charCodeAt(3), _ = this.readData(4);
        return a === _[0] && m === _[1] && b === _[2] && g === _[3];
      }, l.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return [];
        var a = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, a;
      }, z.exports = l;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(p, z, y) {
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
        var a, m = 0;
        for (this.checkOffset(r), a = this.index + r - 1; a >= this.index; a--) m = (m << 8) + this.byteAt(a);
        return this.index += r, m;
      }, readString: function(r) {
        return s.transformTo("string", this.readData(r));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var r = this.readInt(4);
        return new Date(Date.UTC(1980 + (r >> 25 & 127), (r >> 21 & 15) - 1, r >> 16 & 31, r >> 11 & 31, r >> 5 & 63, (31 & r) << 1));
      } }, z.exports = l;
    }, { "../utils": 32 }], 19: [function(p, z, y) {
      var s = p("./Uint8ArrayReader");
      function l(r) {
        s.call(this, r);
      }
      p("../utils").inherits(l, s), l.prototype.readData = function(r) {
        this.checkOffset(r);
        var a = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, a;
      }, z.exports = l;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(p, z, y) {
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
        var a = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, a;
      }, z.exports = l;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(p, z, y) {
      var s = p("./ArrayReader");
      function l(r) {
        s.call(this, r);
      }
      p("../utils").inherits(l, s), l.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return new Uint8Array(0);
        var a = this.data.subarray(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, a;
      }, z.exports = l;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(p, z, y) {
      var s = p("../utils"), l = p("../support"), r = p("./ArrayReader"), a = p("./StringReader"), m = p("./NodeBufferReader"), b = p("./Uint8ArrayReader");
      z.exports = function(g) {
        var _ = s.getTypeOf(g);
        return s.checkSupport(_), _ !== "string" || l.uint8array ? _ === "nodebuffer" ? new m(g) : l.uint8array ? new b(s.transformTo("uint8array", g)) : new r(s.transformTo("array", g)) : new a(g);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(p, z, y) {
      y.LOCAL_FILE_HEADER = "PK", y.CENTRAL_FILE_HEADER = "PK", y.CENTRAL_DIRECTORY_END = "PK", y.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", y.ZIP64_CENTRAL_DIRECTORY_END = "PK", y.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(p, z, y) {
      var s = p("./GenericWorker"), l = p("../utils");
      function r(a) {
        s.call(this, "ConvertWorker to " + a), this.destType = a;
      }
      l.inherits(r, s), r.prototype.processChunk = function(a) {
        this.push({ data: l.transformTo(this.destType, a.data), meta: a.meta });
      }, z.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(p, z, y) {
      var s = p("./GenericWorker"), l = p("../crc32");
      function r() {
        s.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      p("../utils").inherits(r, s), r.prototype.processChunk = function(a) {
        this.streamInfo.crc32 = l(a.data, this.streamInfo.crc32 || 0), this.push(a);
      }, z.exports = r;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(p, z, y) {
      var s = p("../utils"), l = p("./GenericWorker");
      function r(a) {
        l.call(this, "DataLengthProbe for " + a), this.propName = a, this.withStreamInfo(a, 0);
      }
      s.inherits(r, l), r.prototype.processChunk = function(a) {
        if (a) {
          var m = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = m + a.data.length;
        }
        l.prototype.processChunk.call(this, a);
      }, z.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(p, z, y) {
      var s = p("../utils"), l = p("./GenericWorker");
      function r(a) {
        l.call(this, "DataWorker");
        var m = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, a.then(function(b) {
          m.dataIsReady = !0, m.data = b, m.max = b && b.length || 0, m.type = s.getTypeOf(b), m.isPaused || m._tickAndRepeat();
        }, function(b) {
          m.error(b);
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
        var a = null, m = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            a = this.data.substring(this.index, m);
            break;
          case "uint8array":
            a = this.data.subarray(this.index, m);
            break;
          case "array":
          case "nodebuffer":
            a = this.data.slice(this.index, m);
        }
        return this.index = m, this.push({ data: a, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, z.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(p, z, y) {
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
        if (this._listeners[l]) for (var a = 0; a < this._listeners[l].length; a++) this._listeners[l][a].call(this, r);
      }, pipe: function(l) {
        return l.registerPrevious(this);
      }, registerPrevious: function(l) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = l.streamInfo, this.mergeStreamInfo(), this.previous = l;
        var r = this;
        return l.on("data", function(a) {
          r.processChunk(a);
        }), l.on("end", function() {
          r.end();
        }), l.on("error", function(a) {
          r.error(a);
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
      } }, z.exports = s;
    }, {}], 29: [function(p, z, y) {
      var s = p("../utils"), l = p("./ConvertWorker"), r = p("./GenericWorker"), a = p("../base64"), m = p("../support"), b = p("../external"), g = null;
      if (m.nodestream) try {
        g = p("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function _(d, n) {
        return new b.Promise(function(c, o) {
          var f = [], w = d._internalType, C = d._outputType, S = d._mimeType;
          d.on("data", function(P, E) {
            f.push(P), n && n(E);
          }).on("error", function(P) {
            f = [], o(P);
          }).on("end", function() {
            try {
              var P = function(E, R, k) {
                switch (E) {
                  case "blob":
                    return s.newBlob(s.transformTo("arraybuffer", R), k);
                  case "base64":
                    return a.encode(R);
                  default:
                    return s.transformTo(E, R);
                }
              }(C, function(E, R) {
                var k, D = 0, X = null, v = 0;
                for (k = 0; k < R.length; k++) v += R[k].length;
                switch (E) {
                  case "string":
                    return R.join("");
                  case "array":
                    return Array.prototype.concat.apply([], R);
                  case "uint8array":
                    for (X = new Uint8Array(v), k = 0; k < R.length; k++) X.set(R[k], D), D += R[k].length;
                    return X;
                  case "nodebuffer":
                    return Buffer.concat(R);
                  default:
                    throw new Error("concat : unsupported type '" + E + "'");
                }
              }(w, f), S);
              c(P);
            } catch (E) {
              o(E);
            }
            f = [];
          }).resume();
        });
      }
      function i(d, n, c) {
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
          this._internalType = o, this._outputType = n, this._mimeType = c, s.checkSupport(o), this._worker = d.pipe(new l(o)), d.lock();
        } catch (f) {
          this._worker = new r("error"), this._worker.error(f);
        }
      }
      i.prototype = { accumulate: function(d) {
        return _(this, d);
      }, on: function(d, n) {
        var c = this;
        return d === "data" ? this._worker.on(d, function(o) {
          n.call(c, o.data, o.meta);
        }) : this._worker.on(d, function() {
          s.delay(n, arguments, c);
        }), this;
      }, resume: function() {
        return s.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(d) {
        if (s.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new g(this, { objectMode: this._outputType !== "nodebuffer" }, d);
      } }, z.exports = i;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(p, z, y) {
      if (y.base64 = !0, y.array = !0, y.string = !0, y.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", y.nodebuffer = typeof Buffer < "u", y.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") y.blob = !1;
      else {
        var s = new ArrayBuffer(0);
        try {
          y.blob = new Blob([s], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var l = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            l.append(s), y.blob = l.getBlob("application/zip").size === 0;
          } catch {
            y.blob = !1;
          }
        }
      }
      try {
        y.nodestream = !!p("readable-stream").Readable;
      } catch {
        y.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(p, z, y) {
      for (var s = p("./utils"), l = p("./support"), r = p("./nodejsUtils"), a = p("./stream/GenericWorker"), m = new Array(256), b = 0; b < 256; b++) m[b] = 252 <= b ? 6 : 248 <= b ? 5 : 240 <= b ? 4 : 224 <= b ? 3 : 192 <= b ? 2 : 1;
      m[254] = m[254] = 1;
      function g() {
        a.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function _() {
        a.call(this, "utf-8 encode");
      }
      y.utf8encode = function(i) {
        return l.nodebuffer ? r.newBufferFrom(i, "utf-8") : function(d) {
          var n, c, o, f, w, C = d.length, S = 0;
          for (f = 0; f < C; f++) (64512 & (c = d.charCodeAt(f))) == 55296 && f + 1 < C && (64512 & (o = d.charCodeAt(f + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (o - 56320), f++), S += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
          for (n = l.uint8array ? new Uint8Array(S) : new Array(S), f = w = 0; w < S; f++) (64512 & (c = d.charCodeAt(f))) == 55296 && f + 1 < C && (64512 & (o = d.charCodeAt(f + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (o - 56320), f++), c < 128 ? n[w++] = c : (c < 2048 ? n[w++] = 192 | c >>> 6 : (c < 65536 ? n[w++] = 224 | c >>> 12 : (n[w++] = 240 | c >>> 18, n[w++] = 128 | c >>> 12 & 63), n[w++] = 128 | c >>> 6 & 63), n[w++] = 128 | 63 & c);
          return n;
        }(i);
      }, y.utf8decode = function(i) {
        return l.nodebuffer ? s.transformTo("nodebuffer", i).toString("utf-8") : function(d) {
          var n, c, o, f, w = d.length, C = new Array(2 * w);
          for (n = c = 0; n < w; ) if ((o = d[n++]) < 128) C[c++] = o;
          else if (4 < (f = m[o])) C[c++] = 65533, n += f - 1;
          else {
            for (o &= f === 2 ? 31 : f === 3 ? 15 : 7; 1 < f && n < w; ) o = o << 6 | 63 & d[n++], f--;
            1 < f ? C[c++] = 65533 : o < 65536 ? C[c++] = o : (o -= 65536, C[c++] = 55296 | o >> 10 & 1023, C[c++] = 56320 | 1023 & o);
          }
          return C.length !== c && (C.subarray ? C = C.subarray(0, c) : C.length = c), s.applyFromCharCode(C);
        }(i = s.transformTo(l.uint8array ? "uint8array" : "array", i));
      }, s.inherits(g, a), g.prototype.processChunk = function(i) {
        var d = s.transformTo(l.uint8array ? "uint8array" : "array", i.data);
        if (this.leftOver && this.leftOver.length) {
          if (l.uint8array) {
            var n = d;
            (d = new Uint8Array(n.length + this.leftOver.length)).set(this.leftOver, 0), d.set(n, this.leftOver.length);
          } else d = this.leftOver.concat(d);
          this.leftOver = null;
        }
        var c = function(f, w) {
          var C;
          for ((w = w || f.length) > f.length && (w = f.length), C = w - 1; 0 <= C && (192 & f[C]) == 128; ) C--;
          return C < 0 || C === 0 ? w : C + m[f[C]] > w ? C : w;
        }(d), o = d;
        c !== d.length && (l.uint8array ? (o = d.subarray(0, c), this.leftOver = d.subarray(c, d.length)) : (o = d.slice(0, c), this.leftOver = d.slice(c, d.length))), this.push({ data: y.utf8decode(o), meta: i.meta });
      }, g.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: y.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, y.Utf8DecodeWorker = g, s.inherits(_, a), _.prototype.processChunk = function(i) {
        this.push({ data: y.utf8encode(i.data), meta: i.meta });
      }, y.Utf8EncodeWorker = _;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(p, z, y) {
      var s = p("./support"), l = p("./base64"), r = p("./nodejsUtils"), a = p("./external");
      function m(n) {
        return n;
      }
      function b(n, c) {
        for (var o = 0; o < n.length; ++o) c[o] = 255 & n.charCodeAt(o);
        return c;
      }
      p("setimmediate"), y.newBlob = function(n, c) {
        y.checkSupport("blob");
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
        var f = [], w = 0, C = n.length;
        if (C <= o) return String.fromCharCode.apply(null, n);
        for (; w < C; ) c === "array" || c === "nodebuffer" ? f.push(String.fromCharCode.apply(null, n.slice(w, Math.min(w + o, C)))) : f.push(String.fromCharCode.apply(null, n.subarray(w, Math.min(w + o, C)))), w += o;
        return f.join("");
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
      function _(n) {
        var c = 65536, o = y.getTypeOf(n), f = !0;
        if (o === "uint8array" ? f = g.applyCanBeUsed.uint8array : o === "nodebuffer" && (f = g.applyCanBeUsed.nodebuffer), f) for (; 1 < c; ) try {
          return g.stringifyByChunk(n, o, c);
        } catch {
          c = Math.floor(c / 2);
        }
        return g.stringifyByChar(n);
      }
      function i(n, c) {
        for (var o = 0; o < n.length; o++) c[o] = n[o];
        return c;
      }
      y.applyFromCharCode = _;
      var d = {};
      d.string = { string: m, array: function(n) {
        return b(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return d.string.uint8array(n).buffer;
      }, uint8array: function(n) {
        return b(n, new Uint8Array(n.length));
      }, nodebuffer: function(n) {
        return b(n, r.allocBuffer(n.length));
      } }, d.array = { string: _, array: m, arraybuffer: function(n) {
        return new Uint8Array(n).buffer;
      }, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, d.arraybuffer = { string: function(n) {
        return _(new Uint8Array(n));
      }, array: function(n) {
        return i(new Uint8Array(n), new Array(n.byteLength));
      }, arraybuffer: m, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(new Uint8Array(n));
      } }, d.uint8array = { string: _, array: function(n) {
        return i(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return n.buffer;
      }, uint8array: m, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, d.nodebuffer = { string: _, array: function(n) {
        return i(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return d.nodebuffer.uint8array(n).buffer;
      }, uint8array: function(n) {
        return i(n, new Uint8Array(n.length));
      }, nodebuffer: m }, y.transformTo = function(n, c) {
        if (c = c || "", !n) return c;
        y.checkSupport(n);
        var o = y.getTypeOf(c);
        return d[o][n](c);
      }, y.resolve = function(n) {
        for (var c = n.split("/"), o = [], f = 0; f < c.length; f++) {
          var w = c[f];
          w === "." || w === "" && f !== 0 && f !== c.length - 1 || (w === ".." ? o.pop() : o.push(w));
        }
        return o.join("/");
      }, y.getTypeOf = function(n) {
        return typeof n == "string" ? "string" : Object.prototype.toString.call(n) === "[object Array]" ? "array" : s.nodebuffer && r.isBuffer(n) ? "nodebuffer" : s.uint8array && n instanceof Uint8Array ? "uint8array" : s.arraybuffer && n instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, y.checkSupport = function(n) {
        if (!s[n.toLowerCase()]) throw new Error(n + " is not supported by this platform");
      }, y.MAX_VALUE_16BITS = 65535, y.MAX_VALUE_32BITS = -1, y.pretty = function(n) {
        var c, o, f = "";
        for (o = 0; o < (n || "").length; o++) f += "\\x" + ((c = n.charCodeAt(o)) < 16 ? "0" : "") + c.toString(16).toUpperCase();
        return f;
      }, y.delay = function(n, c, o) {
        setImmediate(function() {
          n.apply(o || null, c || []);
        });
      }, y.inherits = function(n, c) {
        function o() {
        }
        o.prototype = c.prototype, n.prototype = new o();
      }, y.extend = function() {
        var n, c, o = {};
        for (n = 0; n < arguments.length; n++) for (c in arguments[n]) Object.prototype.hasOwnProperty.call(arguments[n], c) && o[c] === void 0 && (o[c] = arguments[n][c]);
        return o;
      }, y.prepareContent = function(n, c, o, f, w) {
        return a.Promise.resolve(c).then(function(C) {
          return s.blob && (C instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(C)) !== -1) && typeof FileReader < "u" ? new a.Promise(function(S, P) {
            var E = new FileReader();
            E.onload = function(R) {
              S(R.target.result);
            }, E.onerror = function(R) {
              P(R.target.error);
            }, E.readAsArrayBuffer(C);
          }) : C;
        }).then(function(C) {
          var S = y.getTypeOf(C);
          return S ? (S === "arraybuffer" ? C = y.transformTo("uint8array", C) : S === "string" && (w ? C = l.decode(C) : o && f !== !0 && (C = function(P) {
            return b(P, s.uint8array ? new Uint8Array(P.length) : new Array(P.length));
          }(C))), C) : a.Promise.reject(new Error("Can't read the data of '" + n + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(p, z, y) {
      var s = p("./reader/readerFor"), l = p("./utils"), r = p("./signature"), a = p("./zipEntry"), m = p("./support");
      function b(g) {
        this.files = [], this.loadOptions = g;
      }
      b.prototype = { checkSignature: function(g) {
        if (!this.reader.readAndCheckSignature(g)) {
          this.reader.index -= 4;
          var _ = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + l.pretty(_) + ", expected " + l.pretty(g) + ")");
        }
      }, isSignature: function(g, _) {
        var i = this.reader.index;
        this.reader.setIndex(g);
        var d = this.reader.readString(4) === _;
        return this.reader.setIndex(i), d;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var g = this.reader.readData(this.zipCommentLength), _ = m.uint8array ? "uint8array" : "array", i = l.transformTo(_, g);
        this.zipComment = this.loadOptions.decodeFileName(i);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var g, _, i, d = this.zip64EndOfCentralSize - 44; 0 < d; ) g = this.reader.readInt(2), _ = this.reader.readInt(4), i = this.reader.readData(_), this.zip64ExtensibleData[g] = { id: g, length: _, value: i };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var g, _;
        for (g = 0; g < this.files.length; g++) _ = this.files[g], this.reader.setIndex(_.localHeaderOffset), this.checkSignature(r.LOCAL_FILE_HEADER), _.readLocalPart(this.reader), _.handleUTF8(), _.processAttributes();
      }, readCentralDir: function() {
        var g;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER); ) (g = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(g);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var g = this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);
        if (g < 0) throw this.isSignature(0, r.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(g);
        var _ = g;
        if (this.checkSignature(r.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === l.MAX_VALUE_16BITS || this.diskWithCentralDirStart === l.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === l.MAX_VALUE_16BITS || this.centralDirRecords === l.MAX_VALUE_16BITS || this.centralDirSize === l.MAX_VALUE_32BITS || this.centralDirOffset === l.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (g = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(g), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, r.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var i = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (i += 20, i += 12 + this.zip64EndOfCentralSize);
        var d = _ - i;
        if (0 < d) this.isSignature(_, r.CENTRAL_FILE_HEADER) || (this.reader.zero = d);
        else if (d < 0) throw new Error("Corrupted zip: missing " + Math.abs(d) + " bytes.");
      }, prepareReader: function(g) {
        this.reader = s(g);
      }, load: function(g) {
        this.prepareReader(g), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, z.exports = b;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(p, z, y) {
      var s = p("./reader/readerFor"), l = p("./utils"), r = p("./compressedObject"), a = p("./crc32"), m = p("./utf8"), b = p("./compressions"), g = p("./support");
      function _(i, d) {
        this.options = i, this.loadOptions = d;
      }
      _.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(i) {
        var d, n;
        if (i.skip(22), this.fileNameLength = i.readInt(2), n = i.readInt(2), this.fileName = i.readData(this.fileNameLength), i.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((d = function(c) {
          for (var o in b) if (Object.prototype.hasOwnProperty.call(b, o) && b[o].magic === c) return b[o];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + l.pretty(this.compressionMethod) + " unknown (inner file : " + l.transformTo("string", this.fileName) + ")");
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
          var i = s(this.extraFields[1].value);
          this.uncompressedSize === l.MAX_VALUE_32BITS && (this.uncompressedSize = i.readInt(8)), this.compressedSize === l.MAX_VALUE_32BITS && (this.compressedSize = i.readInt(8)), this.localHeaderOffset === l.MAX_VALUE_32BITS && (this.localHeaderOffset = i.readInt(8)), this.diskNumberStart === l.MAX_VALUE_32BITS && (this.diskNumberStart = i.readInt(4));
        }
      }, readExtraFields: function(i) {
        var d, n, c, o = i.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); i.index + 4 < o; ) d = i.readInt(2), n = i.readInt(2), c = i.readData(n), this.extraFields[d] = { id: d, length: n, value: c };
        i.setIndex(o);
      }, handleUTF8: function() {
        var i = g.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = m.utf8decode(this.fileName), this.fileCommentStr = m.utf8decode(this.fileComment);
        else {
          var d = this.findExtraFieldUnicodePath();
          if (d !== null) this.fileNameStr = d;
          else {
            var n = l.transformTo(i, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(n);
          }
          var c = this.findExtraFieldUnicodeComment();
          if (c !== null) this.fileCommentStr = c;
          else {
            var o = l.transformTo(i, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(o);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var i = this.extraFields[28789];
        if (i) {
          var d = s(i.value);
          return d.readInt(1) !== 1 || a(this.fileName) !== d.readInt(4) ? null : m.utf8decode(d.readData(i.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var i = this.extraFields[25461];
        if (i) {
          var d = s(i.value);
          return d.readInt(1) !== 1 || a(this.fileComment) !== d.readInt(4) ? null : m.utf8decode(d.readData(i.length - 5));
        }
        return null;
      } }, z.exports = _;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(p, z, y) {
      function s(d, n, c) {
        this.name = d, this.dir = c.dir, this.date = c.date, this.comment = c.comment, this.unixPermissions = c.unixPermissions, this.dosPermissions = c.dosPermissions, this._data = n, this._dataBinary = c.binary, this.options = { compression: c.compression, compressionOptions: c.compressionOptions };
      }
      var l = p("./stream/StreamHelper"), r = p("./stream/DataWorker"), a = p("./utf8"), m = p("./compressedObject"), b = p("./stream/GenericWorker");
      s.prototype = { internalStream: function(d) {
        var n = null, c = "string";
        try {
          if (!d) throw new Error("No output type specified.");
          var o = (c = d.toLowerCase()) === "string" || c === "text";
          c !== "binarystring" && c !== "text" || (c = "string"), n = this._decompressWorker();
          var f = !this._dataBinary;
          f && !o && (n = n.pipe(new a.Utf8EncodeWorker())), !f && o && (n = n.pipe(new a.Utf8DecodeWorker()));
        } catch (w) {
          (n = new b("error")).error(w);
        }
        return new l(n, c, "");
      }, async: function(d, n) {
        return this.internalStream(d).accumulate(n);
      }, nodeStream: function(d, n) {
        return this.internalStream(d || "nodebuffer").toNodejsStream(n);
      }, _compressWorker: function(d, n) {
        if (this._data instanceof m && this._data.compression.magic === d.magic) return this._data.getCompressedWorker();
        var c = this._decompressWorker();
        return this._dataBinary || (c = c.pipe(new a.Utf8EncodeWorker())), m.createWorkerFrom(c, d, n);
      }, _decompressWorker: function() {
        return this._data instanceof m ? this._data.getContentWorker() : this._data instanceof b ? this._data : new r(this._data);
      } };
      for (var g = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], _ = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, i = 0; i < g.length; i++) s.prototype[g[i]] = _;
      z.exports = s;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(p, z, y) {
      (function(s) {
        var l, r, a = s.MutationObserver || s.WebKitMutationObserver;
        if (a) {
          var m = 0, b = new a(d), g = s.document.createTextNode("");
          b.observe(g, { characterData: !0 }), l = function() {
            g.data = m = ++m % 2;
          };
        } else if (s.setImmediate || s.MessageChannel === void 0) l = "document" in s && "onreadystatechange" in s.document.createElement("script") ? function() {
          var n = s.document.createElement("script");
          n.onreadystatechange = function() {
            d(), n.onreadystatechange = null, n.parentNode.removeChild(n), n = null;
          }, s.document.documentElement.appendChild(n);
        } : function() {
          setTimeout(d, 0);
        };
        else {
          var _ = new s.MessageChannel();
          _.port1.onmessage = d, l = function() {
            _.port2.postMessage(0);
          };
        }
        var i = [];
        function d() {
          var n, c;
          r = !0;
          for (var o = i.length; o; ) {
            for (c = i, i = [], n = -1; ++n < o; ) c[n]();
            o = i.length;
          }
          r = !1;
        }
        z.exports = function(n) {
          i.push(n) !== 1 || r || l();
        };
      }).call(this, typeof At < "u" ? At : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(p, z, y) {
      var s = p("immediate");
      function l() {
      }
      var r = {}, a = ["REJECTED"], m = ["FULFILLED"], b = ["PENDING"];
      function g(o) {
        if (typeof o != "function") throw new TypeError("resolver must be a function");
        this.state = b, this.queue = [], this.outcome = void 0, o !== l && n(this, o);
      }
      function _(o, f, w) {
        this.promise = o, typeof f == "function" && (this.onFulfilled = f, this.callFulfilled = this.otherCallFulfilled), typeof w == "function" && (this.onRejected = w, this.callRejected = this.otherCallRejected);
      }
      function i(o, f, w) {
        s(function() {
          var C;
          try {
            C = f(w);
          } catch (S) {
            return r.reject(o, S);
          }
          C === o ? r.reject(o, new TypeError("Cannot resolve promise with itself")) : r.resolve(o, C);
        });
      }
      function d(o) {
        var f = o && o.then;
        if (o && (typeof o == "object" || typeof o == "function") && typeof f == "function") return function() {
          f.apply(o, arguments);
        };
      }
      function n(o, f) {
        var w = !1;
        function C(E) {
          w || (w = !0, r.reject(o, E));
        }
        function S(E) {
          w || (w = !0, r.resolve(o, E));
        }
        var P = c(function() {
          f(S, C);
        });
        P.status === "error" && C(P.value);
      }
      function c(o, f) {
        var w = {};
        try {
          w.value = o(f), w.status = "success";
        } catch (C) {
          w.status = "error", w.value = C;
        }
        return w;
      }
      (z.exports = g).prototype.finally = function(o) {
        if (typeof o != "function") return this;
        var f = this.constructor;
        return this.then(function(w) {
          return f.resolve(o()).then(function() {
            return w;
          });
        }, function(w) {
          return f.resolve(o()).then(function() {
            throw w;
          });
        });
      }, g.prototype.catch = function(o) {
        return this.then(null, o);
      }, g.prototype.then = function(o, f) {
        if (typeof o != "function" && this.state === m || typeof f != "function" && this.state === a) return this;
        var w = new this.constructor(l);
        return this.state !== b ? i(w, this.state === m ? o : f, this.outcome) : this.queue.push(new _(w, o, f)), w;
      }, _.prototype.callFulfilled = function(o) {
        r.resolve(this.promise, o);
      }, _.prototype.otherCallFulfilled = function(o) {
        i(this.promise, this.onFulfilled, o);
      }, _.prototype.callRejected = function(o) {
        r.reject(this.promise, o);
      }, _.prototype.otherCallRejected = function(o) {
        i(this.promise, this.onRejected, o);
      }, r.resolve = function(o, f) {
        var w = c(d, f);
        if (w.status === "error") return r.reject(o, w.value);
        var C = w.value;
        if (C) n(o, C);
        else {
          o.state = m, o.outcome = f;
          for (var S = -1, P = o.queue.length; ++S < P; ) o.queue[S].callFulfilled(f);
        }
        return o;
      }, r.reject = function(o, f) {
        o.state = a, o.outcome = f;
        for (var w = -1, C = o.queue.length; ++w < C; ) o.queue[w].callRejected(f);
        return o;
      }, g.resolve = function(o) {
        return o instanceof this ? o : r.resolve(new this(l), o);
      }, g.reject = function(o) {
        var f = new this(l);
        return r.reject(f, o);
      }, g.all = function(o) {
        var f = this;
        if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var w = o.length, C = !1;
        if (!w) return this.resolve([]);
        for (var S = new Array(w), P = 0, E = -1, R = new this(l); ++E < w; ) k(o[E], E);
        return R;
        function k(D, X) {
          f.resolve(D).then(function(v) {
            S[X] = v, ++P !== w || C || (C = !0, r.resolve(R, S));
          }, function(v) {
            C || (C = !0, r.reject(R, v));
          });
        }
      }, g.race = function(o) {
        var f = this;
        if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var w = o.length, C = !1;
        if (!w) return this.resolve([]);
        for (var S = -1, P = new this(l); ++S < w; ) E = o[S], f.resolve(E).then(function(R) {
          C || (C = !0, r.resolve(P, R));
        }, function(R) {
          C || (C = !0, r.reject(P, R));
        });
        var E;
        return P;
      };
    }, { immediate: 36 }], 38: [function(p, z, y) {
      var s = {};
      (0, p("./lib/utils/common").assign)(s, p("./lib/deflate"), p("./lib/inflate"), p("./lib/zlib/constants")), z.exports = s;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(p, z, y) {
      var s = p("./zlib/deflate"), l = p("./utils/common"), r = p("./utils/strings"), a = p("./zlib/messages"), m = p("./zlib/zstream"), b = Object.prototype.toString, g = 0, _ = -1, i = 0, d = 8;
      function n(o) {
        if (!(this instanceof n)) return new n(o);
        this.options = l.assign({ level: _, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: i, to: "" }, o || {});
        var f = this.options;
        f.raw && 0 < f.windowBits ? f.windowBits = -f.windowBits : f.gzip && 0 < f.windowBits && f.windowBits < 16 && (f.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new m(), this.strm.avail_out = 0;
        var w = s.deflateInit2(this.strm, f.level, f.method, f.windowBits, f.memLevel, f.strategy);
        if (w !== g) throw new Error(a[w]);
        if (f.header && s.deflateSetHeader(this.strm, f.header), f.dictionary) {
          var C;
          if (C = typeof f.dictionary == "string" ? r.string2buf(f.dictionary) : b.call(f.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(f.dictionary) : f.dictionary, (w = s.deflateSetDictionary(this.strm, C)) !== g) throw new Error(a[w]);
          this._dict_set = !0;
        }
      }
      function c(o, f) {
        var w = new n(f);
        if (w.push(o, !0), w.err) throw w.msg || a[w.err];
        return w.result;
      }
      n.prototype.push = function(o, f) {
        var w, C, S = this.strm, P = this.options.chunkSize;
        if (this.ended) return !1;
        C = f === ~~f ? f : f === !0 ? 4 : 0, typeof o == "string" ? S.input = r.string2buf(o) : b.call(o) === "[object ArrayBuffer]" ? S.input = new Uint8Array(o) : S.input = o, S.next_in = 0, S.avail_in = S.input.length;
        do {
          if (S.avail_out === 0 && (S.output = new l.Buf8(P), S.next_out = 0, S.avail_out = P), (w = s.deflate(S, C)) !== 1 && w !== g) return this.onEnd(w), !(this.ended = !0);
          S.avail_out !== 0 && (S.avail_in !== 0 || C !== 4 && C !== 2) || (this.options.to === "string" ? this.onData(r.buf2binstring(l.shrinkBuf(S.output, S.next_out))) : this.onData(l.shrinkBuf(S.output, S.next_out)));
        } while ((0 < S.avail_in || S.avail_out === 0) && w !== 1);
        return C === 4 ? (w = s.deflateEnd(this.strm), this.onEnd(w), this.ended = !0, w === g) : C !== 2 || (this.onEnd(g), !(S.avail_out = 0));
      }, n.prototype.onData = function(o) {
        this.chunks.push(o);
      }, n.prototype.onEnd = function(o) {
        o === g && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = o, this.msg = this.strm.msg;
      }, y.Deflate = n, y.deflate = c, y.deflateRaw = function(o, f) {
        return (f = f || {}).raw = !0, c(o, f);
      }, y.gzip = function(o, f) {
        return (f = f || {}).gzip = !0, c(o, f);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(p, z, y) {
      var s = p("./zlib/inflate"), l = p("./utils/common"), r = p("./utils/strings"), a = p("./zlib/constants"), m = p("./zlib/messages"), b = p("./zlib/zstream"), g = p("./zlib/gzheader"), _ = Object.prototype.toString;
      function i(n) {
        if (!(this instanceof i)) return new i(n);
        this.options = l.assign({ chunkSize: 16384, windowBits: 0, to: "" }, n || {});
        var c = this.options;
        c.raw && 0 <= c.windowBits && c.windowBits < 16 && (c.windowBits = -c.windowBits, c.windowBits === 0 && (c.windowBits = -15)), !(0 <= c.windowBits && c.windowBits < 16) || n && n.windowBits || (c.windowBits += 32), 15 < c.windowBits && c.windowBits < 48 && !(15 & c.windowBits) && (c.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new b(), this.strm.avail_out = 0;
        var o = s.inflateInit2(this.strm, c.windowBits);
        if (o !== a.Z_OK) throw new Error(m[o]);
        this.header = new g(), s.inflateGetHeader(this.strm, this.header);
      }
      function d(n, c) {
        var o = new i(c);
        if (o.push(n, !0), o.err) throw o.msg || m[o.err];
        return o.result;
      }
      i.prototype.push = function(n, c) {
        var o, f, w, C, S, P, E = this.strm, R = this.options.chunkSize, k = this.options.dictionary, D = !1;
        if (this.ended) return !1;
        f = c === ~~c ? c : c === !0 ? a.Z_FINISH : a.Z_NO_FLUSH, typeof n == "string" ? E.input = r.binstring2buf(n) : _.call(n) === "[object ArrayBuffer]" ? E.input = new Uint8Array(n) : E.input = n, E.next_in = 0, E.avail_in = E.input.length;
        do {
          if (E.avail_out === 0 && (E.output = new l.Buf8(R), E.next_out = 0, E.avail_out = R), (o = s.inflate(E, a.Z_NO_FLUSH)) === a.Z_NEED_DICT && k && (P = typeof k == "string" ? r.string2buf(k) : _.call(k) === "[object ArrayBuffer]" ? new Uint8Array(k) : k, o = s.inflateSetDictionary(this.strm, P)), o === a.Z_BUF_ERROR && D === !0 && (o = a.Z_OK, D = !1), o !== a.Z_STREAM_END && o !== a.Z_OK) return this.onEnd(o), !(this.ended = !0);
          E.next_out && (E.avail_out !== 0 && o !== a.Z_STREAM_END && (E.avail_in !== 0 || f !== a.Z_FINISH && f !== a.Z_SYNC_FLUSH) || (this.options.to === "string" ? (w = r.utf8border(E.output, E.next_out), C = E.next_out - w, S = r.buf2string(E.output, w), E.next_out = C, E.avail_out = R - C, C && l.arraySet(E.output, E.output, w, C, 0), this.onData(S)) : this.onData(l.shrinkBuf(E.output, E.next_out)))), E.avail_in === 0 && E.avail_out === 0 && (D = !0);
        } while ((0 < E.avail_in || E.avail_out === 0) && o !== a.Z_STREAM_END);
        return o === a.Z_STREAM_END && (f = a.Z_FINISH), f === a.Z_FINISH ? (o = s.inflateEnd(this.strm), this.onEnd(o), this.ended = !0, o === a.Z_OK) : f !== a.Z_SYNC_FLUSH || (this.onEnd(a.Z_OK), !(E.avail_out = 0));
      }, i.prototype.onData = function(n) {
        this.chunks.push(n);
      }, i.prototype.onEnd = function(n) {
        n === a.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
      }, y.Inflate = i, y.inflate = d, y.inflateRaw = function(n, c) {
        return (c = c || {}).raw = !0, d(n, c);
      }, y.ungzip = d;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(p, z, y) {
      var s = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      y.assign = function(a) {
        for (var m = Array.prototype.slice.call(arguments, 1); m.length; ) {
          var b = m.shift();
          if (b) {
            if (typeof b != "object") throw new TypeError(b + "must be non-object");
            for (var g in b) b.hasOwnProperty(g) && (a[g] = b[g]);
          }
        }
        return a;
      }, y.shrinkBuf = function(a, m) {
        return a.length === m ? a : a.subarray ? a.subarray(0, m) : (a.length = m, a);
      };
      var l = { arraySet: function(a, m, b, g, _) {
        if (m.subarray && a.subarray) a.set(m.subarray(b, b + g), _);
        else for (var i = 0; i < g; i++) a[_ + i] = m[b + i];
      }, flattenChunks: function(a) {
        var m, b, g, _, i, d;
        for (m = g = 0, b = a.length; m < b; m++) g += a[m].length;
        for (d = new Uint8Array(g), m = _ = 0, b = a.length; m < b; m++) i = a[m], d.set(i, _), _ += i.length;
        return d;
      } }, r = { arraySet: function(a, m, b, g, _) {
        for (var i = 0; i < g; i++) a[_ + i] = m[b + i];
      }, flattenChunks: function(a) {
        return [].concat.apply([], a);
      } };
      y.setTyped = function(a) {
        a ? (y.Buf8 = Uint8Array, y.Buf16 = Uint16Array, y.Buf32 = Int32Array, y.assign(y, l)) : (y.Buf8 = Array, y.Buf16 = Array, y.Buf32 = Array, y.assign(y, r));
      }, y.setTyped(s);
    }, {}], 42: [function(p, z, y) {
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
      for (var a = new s.Buf8(256), m = 0; m < 256; m++) a[m] = 252 <= m ? 6 : 248 <= m ? 5 : 240 <= m ? 4 : 224 <= m ? 3 : 192 <= m ? 2 : 1;
      function b(g, _) {
        if (_ < 65537 && (g.subarray && r || !g.subarray && l)) return String.fromCharCode.apply(null, s.shrinkBuf(g, _));
        for (var i = "", d = 0; d < _; d++) i += String.fromCharCode(g[d]);
        return i;
      }
      a[254] = a[254] = 1, y.string2buf = function(g) {
        var _, i, d, n, c, o = g.length, f = 0;
        for (n = 0; n < o; n++) (64512 & (i = g.charCodeAt(n))) == 55296 && n + 1 < o && (64512 & (d = g.charCodeAt(n + 1))) == 56320 && (i = 65536 + (i - 55296 << 10) + (d - 56320), n++), f += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
        for (_ = new s.Buf8(f), n = c = 0; c < f; n++) (64512 & (i = g.charCodeAt(n))) == 55296 && n + 1 < o && (64512 & (d = g.charCodeAt(n + 1))) == 56320 && (i = 65536 + (i - 55296 << 10) + (d - 56320), n++), i < 128 ? _[c++] = i : (i < 2048 ? _[c++] = 192 | i >>> 6 : (i < 65536 ? _[c++] = 224 | i >>> 12 : (_[c++] = 240 | i >>> 18, _[c++] = 128 | i >>> 12 & 63), _[c++] = 128 | i >>> 6 & 63), _[c++] = 128 | 63 & i);
        return _;
      }, y.buf2binstring = function(g) {
        return b(g, g.length);
      }, y.binstring2buf = function(g) {
        for (var _ = new s.Buf8(g.length), i = 0, d = _.length; i < d; i++) _[i] = g.charCodeAt(i);
        return _;
      }, y.buf2string = function(g, _) {
        var i, d, n, c, o = _ || g.length, f = new Array(2 * o);
        for (i = d = 0; i < o; ) if ((n = g[i++]) < 128) f[d++] = n;
        else if (4 < (c = a[n])) f[d++] = 65533, i += c - 1;
        else {
          for (n &= c === 2 ? 31 : c === 3 ? 15 : 7; 1 < c && i < o; ) n = n << 6 | 63 & g[i++], c--;
          1 < c ? f[d++] = 65533 : n < 65536 ? f[d++] = n : (n -= 65536, f[d++] = 55296 | n >> 10 & 1023, f[d++] = 56320 | 1023 & n);
        }
        return b(f, d);
      }, y.utf8border = function(g, _) {
        var i;
        for ((_ = _ || g.length) > g.length && (_ = g.length), i = _ - 1; 0 <= i && (192 & g[i]) == 128; ) i--;
        return i < 0 || i === 0 ? _ : i + a[g[i]] > _ ? i : _;
      };
    }, { "./common": 41 }], 43: [function(p, z, y) {
      z.exports = function(s, l, r, a) {
        for (var m = 65535 & s | 0, b = s >>> 16 & 65535 | 0, g = 0; r !== 0; ) {
          for (r -= g = 2e3 < r ? 2e3 : r; b = b + (m = m + l[a++] | 0) | 0, --g; ) ;
          m %= 65521, b %= 65521;
        }
        return m | b << 16 | 0;
      };
    }, {}], 44: [function(p, z, y) {
      z.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(p, z, y) {
      var s = function() {
        for (var l, r = [], a = 0; a < 256; a++) {
          l = a;
          for (var m = 0; m < 8; m++) l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1;
          r[a] = l;
        }
        return r;
      }();
      z.exports = function(l, r, a, m) {
        var b = s, g = m + a;
        l ^= -1;
        for (var _ = m; _ < g; _++) l = l >>> 8 ^ b[255 & (l ^ r[_])];
        return -1 ^ l;
      };
    }, {}], 46: [function(p, z, y) {
      var s, l = p("../utils/common"), r = p("./trees"), a = p("./adler32"), m = p("./crc32"), b = p("./messages"), g = 0, _ = 4, i = 0, d = -2, n = -1, c = 4, o = 2, f = 8, w = 9, C = 286, S = 30, P = 19, E = 2 * C + 1, R = 15, k = 3, D = 258, X = D + k + 1, v = 42, B = 113, e = 1, F = 2, $ = 3, U = 4;
      function tt(t, L) {
        return t.msg = b[L], L;
      }
      function W(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function Q(t) {
        for (var L = t.length; 0 <= --L; ) t[L] = 0;
      }
      function I(t) {
        var L = t.state, T = L.pending;
        T > t.avail_out && (T = t.avail_out), T !== 0 && (l.arraySet(t.output, L.pending_buf, L.pending_out, T, t.next_out), t.next_out += T, L.pending_out += T, t.total_out += T, t.avail_out -= T, L.pending -= T, L.pending === 0 && (L.pending_out = 0));
      }
      function O(t, L) {
        r._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, L), t.block_start = t.strstart, I(t.strm);
      }
      function J(t, L) {
        t.pending_buf[t.pending++] = L;
      }
      function K(t, L) {
        t.pending_buf[t.pending++] = L >>> 8 & 255, t.pending_buf[t.pending++] = 255 & L;
      }
      function H(t, L) {
        var T, h, u = t.max_chain_length, x = t.strstart, N = t.prev_length, j = t.nice_match, A = t.strstart > t.w_size - X ? t.strstart - (t.w_size - X) : 0, M = t.window, V = t.w_mask, Z = t.prev, Y = t.strstart + D, at = M[x + N - 1], rt = M[x + N];
        t.prev_length >= t.good_match && (u >>= 2), j > t.lookahead && (j = t.lookahead);
        do
          if (M[(T = L) + N] === rt && M[T + N - 1] === at && M[T] === M[x] && M[++T] === M[x + 1]) {
            x += 2, T++;
            do
              ;
            while (M[++x] === M[++T] && M[++x] === M[++T] && M[++x] === M[++T] && M[++x] === M[++T] && M[++x] === M[++T] && M[++x] === M[++T] && M[++x] === M[++T] && M[++x] === M[++T] && x < Y);
            if (h = D - (Y - x), x = Y - D, N < h) {
              if (t.match_start = L, j <= (N = h)) break;
              at = M[x + N - 1], rt = M[x + N];
            }
          }
        while ((L = Z[L & V]) > A && --u != 0);
        return N <= t.lookahead ? N : t.lookahead;
      }
      function st(t) {
        var L, T, h, u, x, N, j, A, M, V, Z = t.w_size;
        do {
          if (u = t.window_size - t.lookahead - t.strstart, t.strstart >= Z + (Z - X)) {
            for (l.arraySet(t.window, t.window, Z, Z, 0), t.match_start -= Z, t.strstart -= Z, t.block_start -= Z, L = T = t.hash_size; h = t.head[--L], t.head[L] = Z <= h ? h - Z : 0, --T; ) ;
            for (L = T = Z; h = t.prev[--L], t.prev[L] = Z <= h ? h - Z : 0, --T; ) ;
            u += Z;
          }
          if (t.strm.avail_in === 0) break;
          if (N = t.strm, j = t.window, A = t.strstart + t.lookahead, M = u, V = void 0, V = N.avail_in, M < V && (V = M), T = V === 0 ? 0 : (N.avail_in -= V, l.arraySet(j, N.input, N.next_in, V, A), N.state.wrap === 1 ? N.adler = a(N.adler, j, V, A) : N.state.wrap === 2 && (N.adler = m(N.adler, j, V, A)), N.next_in += V, N.total_in += V, V), t.lookahead += T, t.lookahead + t.insert >= k) for (x = t.strstart - t.insert, t.ins_h = t.window[x], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[x + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[x + k - 1]) & t.hash_mask, t.prev[x & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = x, x++, t.insert--, !(t.lookahead + t.insert < k)); ) ;
        } while (t.lookahead < X && t.strm.avail_in !== 0);
      }
      function ut(t, L) {
        for (var T, h; ; ) {
          if (t.lookahead < X) {
            if (st(t), t.lookahead < X && L === g) return e;
            if (t.lookahead === 0) break;
          }
          if (T = 0, t.lookahead >= k && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + k - 1]) & t.hash_mask, T = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), T !== 0 && t.strstart - T <= t.w_size - X && (t.match_length = H(t, T)), t.match_length >= k) if (h = r._tr_tally(t, t.strstart - t.match_start, t.match_length - k), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= k) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + k - 1]) & t.hash_mask, T = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else h = r._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (h && (O(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = t.strstart < k - 1 ? t.strstart : k - 1, L === _ ? (O(t, !0), t.strm.avail_out === 0 ? $ : U) : t.last_lit && (O(t, !1), t.strm.avail_out === 0) ? e : F;
      }
      function et(t, L) {
        for (var T, h, u; ; ) {
          if (t.lookahead < X) {
            if (st(t), t.lookahead < X && L === g) return e;
            if (t.lookahead === 0) break;
          }
          if (T = 0, t.lookahead >= k && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + k - 1]) & t.hash_mask, T = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = k - 1, T !== 0 && t.prev_length < t.max_lazy_match && t.strstart - T <= t.w_size - X && (t.match_length = H(t, T), t.match_length <= 5 && (t.strategy === 1 || t.match_length === k && 4096 < t.strstart - t.match_start) && (t.match_length = k - 1)), t.prev_length >= k && t.match_length <= t.prev_length) {
            for (u = t.strstart + t.lookahead - k, h = r._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - k), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= u && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + k - 1]) & t.hash_mask, T = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = k - 1, t.strstart++, h && (O(t, !1), t.strm.avail_out === 0)) return e;
          } else if (t.match_available) {
            if ((h = r._tr_tally(t, 0, t.window[t.strstart - 1])) && O(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return e;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (h = r._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < k - 1 ? t.strstart : k - 1, L === _ ? (O(t, !0), t.strm.avail_out === 0 ? $ : U) : t.last_lit && (O(t, !1), t.strm.avail_out === 0) ? e : F;
      }
      function nt(t, L, T, h, u) {
        this.good_length = t, this.max_lazy = L, this.nice_length = T, this.max_chain = h, this.func = u;
      }
      function ct() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = f, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new l.Buf16(2 * E), this.dyn_dtree = new l.Buf16(2 * (2 * S + 1)), this.bl_tree = new l.Buf16(2 * (2 * P + 1)), Q(this.dyn_ltree), Q(this.dyn_dtree), Q(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new l.Buf16(R + 1), this.heap = new l.Buf16(2 * C + 1), Q(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new l.Buf16(2 * C + 1), Q(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function ot(t) {
        var L;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = o, (L = t.state).pending = 0, L.pending_out = 0, L.wrap < 0 && (L.wrap = -L.wrap), L.status = L.wrap ? v : B, t.adler = L.wrap === 2 ? 0 : 1, L.last_flush = g, r._tr_init(L), i) : tt(t, d);
      }
      function _t(t) {
        var L = ot(t);
        return L === i && function(T) {
          T.window_size = 2 * T.w_size, Q(T.head), T.max_lazy_match = s[T.level].max_lazy, T.good_match = s[T.level].good_length, T.nice_match = s[T.level].nice_length, T.max_chain_length = s[T.level].max_chain, T.strstart = 0, T.block_start = 0, T.lookahead = 0, T.insert = 0, T.match_length = T.prev_length = k - 1, T.match_available = 0, T.ins_h = 0;
        }(t.state), L;
      }
      function gt(t, L, T, h, u, x) {
        if (!t) return d;
        var N = 1;
        if (L === n && (L = 6), h < 0 ? (N = 0, h = -h) : 15 < h && (N = 2, h -= 16), u < 1 || w < u || T !== f || h < 8 || 15 < h || L < 0 || 9 < L || x < 0 || c < x) return tt(t, d);
        h === 8 && (h = 9);
        var j = new ct();
        return (t.state = j).strm = t, j.wrap = N, j.gzhead = null, j.w_bits = h, j.w_size = 1 << j.w_bits, j.w_mask = j.w_size - 1, j.hash_bits = u + 7, j.hash_size = 1 << j.hash_bits, j.hash_mask = j.hash_size - 1, j.hash_shift = ~~((j.hash_bits + k - 1) / k), j.window = new l.Buf8(2 * j.w_size), j.head = new l.Buf16(j.hash_size), j.prev = new l.Buf16(j.w_size), j.lit_bufsize = 1 << u + 6, j.pending_buf_size = 4 * j.lit_bufsize, j.pending_buf = new l.Buf8(j.pending_buf_size), j.d_buf = 1 * j.lit_bufsize, j.l_buf = 3 * j.lit_bufsize, j.level = L, j.strategy = x, j.method = T, _t(t);
      }
      s = [new nt(0, 0, 0, 0, function(t, L) {
        var T = 65535;
        for (T > t.pending_buf_size - 5 && (T = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (st(t), t.lookahead === 0 && L === g) return e;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var h = t.block_start + T;
          if ((t.strstart === 0 || t.strstart >= h) && (t.lookahead = t.strstart - h, t.strstart = h, O(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - X && (O(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = 0, L === _ ? (O(t, !0), t.strm.avail_out === 0 ? $ : U) : (t.strstart > t.block_start && (O(t, !1), t.strm.avail_out), e);
      }), new nt(4, 4, 8, 4, ut), new nt(4, 5, 16, 8, ut), new nt(4, 6, 32, 32, ut), new nt(4, 4, 16, 16, et), new nt(8, 16, 32, 32, et), new nt(8, 16, 128, 128, et), new nt(8, 32, 128, 256, et), new nt(32, 128, 258, 1024, et), new nt(32, 258, 258, 4096, et)], y.deflateInit = function(t, L) {
        return gt(t, L, f, 15, 8, 0);
      }, y.deflateInit2 = gt, y.deflateReset = _t, y.deflateResetKeep = ot, y.deflateSetHeader = function(t, L) {
        return t && t.state ? t.state.wrap !== 2 ? d : (t.state.gzhead = L, i) : d;
      }, y.deflate = function(t, L) {
        var T, h, u, x;
        if (!t || !t.state || 5 < L || L < 0) return t ? tt(t, d) : d;
        if (h = t.state, !t.output || !t.input && t.avail_in !== 0 || h.status === 666 && L !== _) return tt(t, t.avail_out === 0 ? -5 : d);
        if (h.strm = t, T = h.last_flush, h.last_flush = L, h.status === v) if (h.wrap === 2) t.adler = 0, J(h, 31), J(h, 139), J(h, 8), h.gzhead ? (J(h, (h.gzhead.text ? 1 : 0) + (h.gzhead.hcrc ? 2 : 0) + (h.gzhead.extra ? 4 : 0) + (h.gzhead.name ? 8 : 0) + (h.gzhead.comment ? 16 : 0)), J(h, 255 & h.gzhead.time), J(h, h.gzhead.time >> 8 & 255), J(h, h.gzhead.time >> 16 & 255), J(h, h.gzhead.time >> 24 & 255), J(h, h.level === 9 ? 2 : 2 <= h.strategy || h.level < 2 ? 4 : 0), J(h, 255 & h.gzhead.os), h.gzhead.extra && h.gzhead.extra.length && (J(h, 255 & h.gzhead.extra.length), J(h, h.gzhead.extra.length >> 8 & 255)), h.gzhead.hcrc && (t.adler = m(t.adler, h.pending_buf, h.pending, 0)), h.gzindex = 0, h.status = 69) : (J(h, 0), J(h, 0), J(h, 0), J(h, 0), J(h, 0), J(h, h.level === 9 ? 2 : 2 <= h.strategy || h.level < 2 ? 4 : 0), J(h, 3), h.status = B);
        else {
          var N = f + (h.w_bits - 8 << 4) << 8;
          N |= (2 <= h.strategy || h.level < 2 ? 0 : h.level < 6 ? 1 : h.level === 6 ? 2 : 3) << 6, h.strstart !== 0 && (N |= 32), N += 31 - N % 31, h.status = B, K(h, N), h.strstart !== 0 && (K(h, t.adler >>> 16), K(h, 65535 & t.adler)), t.adler = 1;
        }
        if (h.status === 69) if (h.gzhead.extra) {
          for (u = h.pending; h.gzindex < (65535 & h.gzhead.extra.length) && (h.pending !== h.pending_buf_size || (h.gzhead.hcrc && h.pending > u && (t.adler = m(t.adler, h.pending_buf, h.pending - u, u)), I(t), u = h.pending, h.pending !== h.pending_buf_size)); ) J(h, 255 & h.gzhead.extra[h.gzindex]), h.gzindex++;
          h.gzhead.hcrc && h.pending > u && (t.adler = m(t.adler, h.pending_buf, h.pending - u, u)), h.gzindex === h.gzhead.extra.length && (h.gzindex = 0, h.status = 73);
        } else h.status = 73;
        if (h.status === 73) if (h.gzhead.name) {
          u = h.pending;
          do {
            if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > u && (t.adler = m(t.adler, h.pending_buf, h.pending - u, u)), I(t), u = h.pending, h.pending === h.pending_buf_size)) {
              x = 1;
              break;
            }
            x = h.gzindex < h.gzhead.name.length ? 255 & h.gzhead.name.charCodeAt(h.gzindex++) : 0, J(h, x);
          } while (x !== 0);
          h.gzhead.hcrc && h.pending > u && (t.adler = m(t.adler, h.pending_buf, h.pending - u, u)), x === 0 && (h.gzindex = 0, h.status = 91);
        } else h.status = 91;
        if (h.status === 91) if (h.gzhead.comment) {
          u = h.pending;
          do {
            if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > u && (t.adler = m(t.adler, h.pending_buf, h.pending - u, u)), I(t), u = h.pending, h.pending === h.pending_buf_size)) {
              x = 1;
              break;
            }
            x = h.gzindex < h.gzhead.comment.length ? 255 & h.gzhead.comment.charCodeAt(h.gzindex++) : 0, J(h, x);
          } while (x !== 0);
          h.gzhead.hcrc && h.pending > u && (t.adler = m(t.adler, h.pending_buf, h.pending - u, u)), x === 0 && (h.status = 103);
        } else h.status = 103;
        if (h.status === 103 && (h.gzhead.hcrc ? (h.pending + 2 > h.pending_buf_size && I(t), h.pending + 2 <= h.pending_buf_size && (J(h, 255 & t.adler), J(h, t.adler >> 8 & 255), t.adler = 0, h.status = B)) : h.status = B), h.pending !== 0) {
          if (I(t), t.avail_out === 0) return h.last_flush = -1, i;
        } else if (t.avail_in === 0 && W(L) <= W(T) && L !== _) return tt(t, -5);
        if (h.status === 666 && t.avail_in !== 0) return tt(t, -5);
        if (t.avail_in !== 0 || h.lookahead !== 0 || L !== g && h.status !== 666) {
          var j = h.strategy === 2 ? function(A, M) {
            for (var V; ; ) {
              if (A.lookahead === 0 && (st(A), A.lookahead === 0)) {
                if (M === g) return e;
                break;
              }
              if (A.match_length = 0, V = r._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++, V && (O(A, !1), A.strm.avail_out === 0)) return e;
            }
            return A.insert = 0, M === _ ? (O(A, !0), A.strm.avail_out === 0 ? $ : U) : A.last_lit && (O(A, !1), A.strm.avail_out === 0) ? e : F;
          }(h, L) : h.strategy === 3 ? function(A, M) {
            for (var V, Z, Y, at, rt = A.window; ; ) {
              if (A.lookahead <= D) {
                if (st(A), A.lookahead <= D && M === g) return e;
                if (A.lookahead === 0) break;
              }
              if (A.match_length = 0, A.lookahead >= k && 0 < A.strstart && (Z = rt[Y = A.strstart - 1]) === rt[++Y] && Z === rt[++Y] && Z === rt[++Y]) {
                at = A.strstart + D;
                do
                  ;
                while (Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Y < at);
                A.match_length = D - (at - Y), A.match_length > A.lookahead && (A.match_length = A.lookahead);
              }
              if (A.match_length >= k ? (V = r._tr_tally(A, 1, A.match_length - k), A.lookahead -= A.match_length, A.strstart += A.match_length, A.match_length = 0) : (V = r._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++), V && (O(A, !1), A.strm.avail_out === 0)) return e;
            }
            return A.insert = 0, M === _ ? (O(A, !0), A.strm.avail_out === 0 ? $ : U) : A.last_lit && (O(A, !1), A.strm.avail_out === 0) ? e : F;
          }(h, L) : s[h.level].func(h, L);
          if (j !== $ && j !== U || (h.status = 666), j === e || j === $) return t.avail_out === 0 && (h.last_flush = -1), i;
          if (j === F && (L === 1 ? r._tr_align(h) : L !== 5 && (r._tr_stored_block(h, 0, 0, !1), L === 3 && (Q(h.head), h.lookahead === 0 && (h.strstart = 0, h.block_start = 0, h.insert = 0))), I(t), t.avail_out === 0)) return h.last_flush = -1, i;
        }
        return L !== _ ? i : h.wrap <= 0 ? 1 : (h.wrap === 2 ? (J(h, 255 & t.adler), J(h, t.adler >> 8 & 255), J(h, t.adler >> 16 & 255), J(h, t.adler >> 24 & 255), J(h, 255 & t.total_in), J(h, t.total_in >> 8 & 255), J(h, t.total_in >> 16 & 255), J(h, t.total_in >> 24 & 255)) : (K(h, t.adler >>> 16), K(h, 65535 & t.adler)), I(t), 0 < h.wrap && (h.wrap = -h.wrap), h.pending !== 0 ? i : 1);
      }, y.deflateEnd = function(t) {
        var L;
        return t && t.state ? (L = t.state.status) !== v && L !== 69 && L !== 73 && L !== 91 && L !== 103 && L !== B && L !== 666 ? tt(t, d) : (t.state = null, L === B ? tt(t, -3) : i) : d;
      }, y.deflateSetDictionary = function(t, L) {
        var T, h, u, x, N, j, A, M, V = L.length;
        if (!t || !t.state || (x = (T = t.state).wrap) === 2 || x === 1 && T.status !== v || T.lookahead) return d;
        for (x === 1 && (t.adler = a(t.adler, L, V, 0)), T.wrap = 0, V >= T.w_size && (x === 0 && (Q(T.head), T.strstart = 0, T.block_start = 0, T.insert = 0), M = new l.Buf8(T.w_size), l.arraySet(M, L, V - T.w_size, T.w_size, 0), L = M, V = T.w_size), N = t.avail_in, j = t.next_in, A = t.input, t.avail_in = V, t.next_in = 0, t.input = L, st(T); T.lookahead >= k; ) {
          for (h = T.strstart, u = T.lookahead - (k - 1); T.ins_h = (T.ins_h << T.hash_shift ^ T.window[h + k - 1]) & T.hash_mask, T.prev[h & T.w_mask] = T.head[T.ins_h], T.head[T.ins_h] = h, h++, --u; ) ;
          T.strstart = h, T.lookahead = k - 1, st(T);
        }
        return T.strstart += T.lookahead, T.block_start = T.strstart, T.insert = T.lookahead, T.lookahead = 0, T.match_length = T.prev_length = k - 1, T.match_available = 0, t.next_in = j, t.input = A, t.avail_in = N, T.wrap = x, i;
      }, y.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(p, z, y) {
      z.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(p, z, y) {
      z.exports = function(s, l) {
        var r, a, m, b, g, _, i, d, n, c, o, f, w, C, S, P, E, R, k, D, X, v, B, e, F;
        r = s.state, a = s.next_in, e = s.input, m = a + (s.avail_in - 5), b = s.next_out, F = s.output, g = b - (l - s.avail_out), _ = b + (s.avail_out - 257), i = r.dmax, d = r.wsize, n = r.whave, c = r.wnext, o = r.window, f = r.hold, w = r.bits, C = r.lencode, S = r.distcode, P = (1 << r.lenbits) - 1, E = (1 << r.distbits) - 1;
        t: do {
          w < 15 && (f += e[a++] << w, w += 8, f += e[a++] << w, w += 8), R = C[f & P];
          e: for (; ; ) {
            if (f >>>= k = R >>> 24, w -= k, (k = R >>> 16 & 255) === 0) F[b++] = 65535 & R;
            else {
              if (!(16 & k)) {
                if (!(64 & k)) {
                  R = C[(65535 & R) + (f & (1 << k) - 1)];
                  continue e;
                }
                if (32 & k) {
                  r.mode = 12;
                  break t;
                }
                s.msg = "invalid literal/length code", r.mode = 30;
                break t;
              }
              D = 65535 & R, (k &= 15) && (w < k && (f += e[a++] << w, w += 8), D += f & (1 << k) - 1, f >>>= k, w -= k), w < 15 && (f += e[a++] << w, w += 8, f += e[a++] << w, w += 8), R = S[f & E];
              r: for (; ; ) {
                if (f >>>= k = R >>> 24, w -= k, !(16 & (k = R >>> 16 & 255))) {
                  if (!(64 & k)) {
                    R = S[(65535 & R) + (f & (1 << k) - 1)];
                    continue r;
                  }
                  s.msg = "invalid distance code", r.mode = 30;
                  break t;
                }
                if (X = 65535 & R, w < (k &= 15) && (f += e[a++] << w, (w += 8) < k && (f += e[a++] << w, w += 8)), i < (X += f & (1 << k) - 1)) {
                  s.msg = "invalid distance too far back", r.mode = 30;
                  break t;
                }
                if (f >>>= k, w -= k, (k = b - g) < X) {
                  if (n < (k = X - k) && r.sane) {
                    s.msg = "invalid distance too far back", r.mode = 30;
                    break t;
                  }
                  if (B = o, (v = 0) === c) {
                    if (v += d - k, k < D) {
                      for (D -= k; F[b++] = o[v++], --k; ) ;
                      v = b - X, B = F;
                    }
                  } else if (c < k) {
                    if (v += d + c - k, (k -= c) < D) {
                      for (D -= k; F[b++] = o[v++], --k; ) ;
                      if (v = 0, c < D) {
                        for (D -= k = c; F[b++] = o[v++], --k; ) ;
                        v = b - X, B = F;
                      }
                    }
                  } else if (v += c - k, k < D) {
                    for (D -= k; F[b++] = o[v++], --k; ) ;
                    v = b - X, B = F;
                  }
                  for (; 2 < D; ) F[b++] = B[v++], F[b++] = B[v++], F[b++] = B[v++], D -= 3;
                  D && (F[b++] = B[v++], 1 < D && (F[b++] = B[v++]));
                } else {
                  for (v = b - X; F[b++] = F[v++], F[b++] = F[v++], F[b++] = F[v++], 2 < (D -= 3); ) ;
                  D && (F[b++] = F[v++], 1 < D && (F[b++] = F[v++]));
                }
                break;
              }
            }
            break;
          }
        } while (a < m && b < _);
        a -= D = w >> 3, f &= (1 << (w -= D << 3)) - 1, s.next_in = a, s.next_out = b, s.avail_in = a < m ? m - a + 5 : 5 - (a - m), s.avail_out = b < _ ? _ - b + 257 : 257 - (b - _), r.hold = f, r.bits = w;
      };
    }, {}], 49: [function(p, z, y) {
      var s = p("../utils/common"), l = p("./adler32"), r = p("./crc32"), a = p("./inffast"), m = p("./inftrees"), b = 1, g = 2, _ = 0, i = -2, d = 1, n = 852, c = 592;
      function o(v) {
        return (v >>> 24 & 255) + (v >>> 8 & 65280) + ((65280 & v) << 8) + ((255 & v) << 24);
      }
      function f() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new s.Buf16(320), this.work = new s.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function w(v) {
        var B;
        return v && v.state ? (B = v.state, v.total_in = v.total_out = B.total = 0, v.msg = "", B.wrap && (v.adler = 1 & B.wrap), B.mode = d, B.last = 0, B.havedict = 0, B.dmax = 32768, B.head = null, B.hold = 0, B.bits = 0, B.lencode = B.lendyn = new s.Buf32(n), B.distcode = B.distdyn = new s.Buf32(c), B.sane = 1, B.back = -1, _) : i;
      }
      function C(v) {
        var B;
        return v && v.state ? ((B = v.state).wsize = 0, B.whave = 0, B.wnext = 0, w(v)) : i;
      }
      function S(v, B) {
        var e, F;
        return v && v.state ? (F = v.state, B < 0 ? (e = 0, B = -B) : (e = 1 + (B >> 4), B < 48 && (B &= 15)), B && (B < 8 || 15 < B) ? i : (F.window !== null && F.wbits !== B && (F.window = null), F.wrap = e, F.wbits = B, C(v))) : i;
      }
      function P(v, B) {
        var e, F;
        return v ? (F = new f(), (v.state = F).window = null, (e = S(v, B)) !== _ && (v.state = null), e) : i;
      }
      var E, R, k = !0;
      function D(v) {
        if (k) {
          var B;
          for (E = new s.Buf32(512), R = new s.Buf32(32), B = 0; B < 144; ) v.lens[B++] = 8;
          for (; B < 256; ) v.lens[B++] = 9;
          for (; B < 280; ) v.lens[B++] = 7;
          for (; B < 288; ) v.lens[B++] = 8;
          for (m(b, v.lens, 0, 288, E, 0, v.work, { bits: 9 }), B = 0; B < 32; ) v.lens[B++] = 5;
          m(g, v.lens, 0, 32, R, 0, v.work, { bits: 5 }), k = !1;
        }
        v.lencode = E, v.lenbits = 9, v.distcode = R, v.distbits = 5;
      }
      function X(v, B, e, F) {
        var $, U = v.state;
        return U.window === null && (U.wsize = 1 << U.wbits, U.wnext = 0, U.whave = 0, U.window = new s.Buf8(U.wsize)), F >= U.wsize ? (s.arraySet(U.window, B, e - U.wsize, U.wsize, 0), U.wnext = 0, U.whave = U.wsize) : (F < ($ = U.wsize - U.wnext) && ($ = F), s.arraySet(U.window, B, e - F, $, U.wnext), (F -= $) ? (s.arraySet(U.window, B, e - F, F, 0), U.wnext = F, U.whave = U.wsize) : (U.wnext += $, U.wnext === U.wsize && (U.wnext = 0), U.whave < U.wsize && (U.whave += $))), 0;
      }
      y.inflateReset = C, y.inflateReset2 = S, y.inflateResetKeep = w, y.inflateInit = function(v) {
        return P(v, 15);
      }, y.inflateInit2 = P, y.inflate = function(v, B) {
        var e, F, $, U, tt, W, Q, I, O, J, K, H, st, ut, et, nt, ct, ot, _t, gt, t, L, T, h, u = 0, x = new s.Buf8(4), N = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!v || !v.state || !v.output || !v.input && v.avail_in !== 0) return i;
        (e = v.state).mode === 12 && (e.mode = 13), tt = v.next_out, $ = v.output, Q = v.avail_out, U = v.next_in, F = v.input, W = v.avail_in, I = e.hold, O = e.bits, J = W, K = Q, L = _;
        t: for (; ; ) switch (e.mode) {
          case d:
            if (e.wrap === 0) {
              e.mode = 13;
              break;
            }
            for (; O < 16; ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            if (2 & e.wrap && I === 35615) {
              x[e.check = 0] = 255 & I, x[1] = I >>> 8 & 255, e.check = r(e.check, x, 2, 0), O = I = 0, e.mode = 2;
              break;
            }
            if (e.flags = 0, e.head && (e.head.done = !1), !(1 & e.wrap) || (((255 & I) << 8) + (I >> 8)) % 31) {
              v.msg = "incorrect header check", e.mode = 30;
              break;
            }
            if ((15 & I) != 8) {
              v.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (O -= 4, t = 8 + (15 & (I >>>= 4)), e.wbits === 0) e.wbits = t;
            else if (t > e.wbits) {
              v.msg = "invalid window size", e.mode = 30;
              break;
            }
            e.dmax = 1 << t, v.adler = e.check = 1, e.mode = 512 & I ? 10 : 12, O = I = 0;
            break;
          case 2:
            for (; O < 16; ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            if (e.flags = I, (255 & e.flags) != 8) {
              v.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (57344 & e.flags) {
              v.msg = "unknown header flags set", e.mode = 30;
              break;
            }
            e.head && (e.head.text = I >> 8 & 1), 512 & e.flags && (x[0] = 255 & I, x[1] = I >>> 8 & 255, e.check = r(e.check, x, 2, 0)), O = I = 0, e.mode = 3;
          case 3:
            for (; O < 32; ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            e.head && (e.head.time = I), 512 & e.flags && (x[0] = 255 & I, x[1] = I >>> 8 & 255, x[2] = I >>> 16 & 255, x[3] = I >>> 24 & 255, e.check = r(e.check, x, 4, 0)), O = I = 0, e.mode = 4;
          case 4:
            for (; O < 16; ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            e.head && (e.head.xflags = 255 & I, e.head.os = I >> 8), 512 & e.flags && (x[0] = 255 & I, x[1] = I >>> 8 & 255, e.check = r(e.check, x, 2, 0)), O = I = 0, e.mode = 5;
          case 5:
            if (1024 & e.flags) {
              for (; O < 16; ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              e.length = I, e.head && (e.head.extra_len = I), 512 & e.flags && (x[0] = 255 & I, x[1] = I >>> 8 & 255, e.check = r(e.check, x, 2, 0)), O = I = 0;
            } else e.head && (e.head.extra = null);
            e.mode = 6;
          case 6:
            if (1024 & e.flags && (W < (H = e.length) && (H = W), H && (e.head && (t = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Array(e.head.extra_len)), s.arraySet(e.head.extra, F, U, H, t)), 512 & e.flags && (e.check = r(e.check, F, H, U)), W -= H, U += H, e.length -= H), e.length)) break t;
            e.length = 0, e.mode = 7;
          case 7:
            if (2048 & e.flags) {
              if (W === 0) break t;
              for (H = 0; t = F[U + H++], e.head && t && e.length < 65536 && (e.head.name += String.fromCharCode(t)), t && H < W; ) ;
              if (512 & e.flags && (e.check = r(e.check, F, H, U)), W -= H, U += H, t) break t;
            } else e.head && (e.head.name = null);
            e.length = 0, e.mode = 8;
          case 8:
            if (4096 & e.flags) {
              if (W === 0) break t;
              for (H = 0; t = F[U + H++], e.head && t && e.length < 65536 && (e.head.comment += String.fromCharCode(t)), t && H < W; ) ;
              if (512 & e.flags && (e.check = r(e.check, F, H, U)), W -= H, U += H, t) break t;
            } else e.head && (e.head.comment = null);
            e.mode = 9;
          case 9:
            if (512 & e.flags) {
              for (; O < 16; ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              if (I !== (65535 & e.check)) {
                v.msg = "header crc mismatch", e.mode = 30;
                break;
              }
              O = I = 0;
            }
            e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), v.adler = e.check = 0, e.mode = 12;
            break;
          case 10:
            for (; O < 32; ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            v.adler = e.check = o(I), O = I = 0, e.mode = 11;
          case 11:
            if (e.havedict === 0) return v.next_out = tt, v.avail_out = Q, v.next_in = U, v.avail_in = W, e.hold = I, e.bits = O, 2;
            v.adler = e.check = 1, e.mode = 12;
          case 12:
            if (B === 5 || B === 6) break t;
          case 13:
            if (e.last) {
              I >>>= 7 & O, O -= 7 & O, e.mode = 27;
              break;
            }
            for (; O < 3; ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            switch (e.last = 1 & I, O -= 1, 3 & (I >>>= 1)) {
              case 0:
                e.mode = 14;
                break;
              case 1:
                if (D(e), e.mode = 20, B !== 6) break;
                I >>>= 2, O -= 2;
                break t;
              case 2:
                e.mode = 17;
                break;
              case 3:
                v.msg = "invalid block type", e.mode = 30;
            }
            I >>>= 2, O -= 2;
            break;
          case 14:
            for (I >>>= 7 & O, O -= 7 & O; O < 32; ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            if ((65535 & I) != (I >>> 16 ^ 65535)) {
              v.msg = "invalid stored block lengths", e.mode = 30;
              break;
            }
            if (e.length = 65535 & I, O = I = 0, e.mode = 15, B === 6) break t;
          case 15:
            e.mode = 16;
          case 16:
            if (H = e.length) {
              if (W < H && (H = W), Q < H && (H = Q), H === 0) break t;
              s.arraySet($, F, U, H, tt), W -= H, U += H, Q -= H, tt += H, e.length -= H;
              break;
            }
            e.mode = 12;
            break;
          case 17:
            for (; O < 14; ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            if (e.nlen = 257 + (31 & I), I >>>= 5, O -= 5, e.ndist = 1 + (31 & I), I >>>= 5, O -= 5, e.ncode = 4 + (15 & I), I >>>= 4, O -= 4, 286 < e.nlen || 30 < e.ndist) {
              v.msg = "too many length or distance symbols", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 18;
          case 18:
            for (; e.have < e.ncode; ) {
              for (; O < 3; ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              e.lens[N[e.have++]] = 7 & I, I >>>= 3, O -= 3;
            }
            for (; e.have < 19; ) e.lens[N[e.have++]] = 0;
            if (e.lencode = e.lendyn, e.lenbits = 7, T = { bits: e.lenbits }, L = m(0, e.lens, 0, 19, e.lencode, 0, e.work, T), e.lenbits = T.bits, L) {
              v.msg = "invalid code lengths set", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 19;
          case 19:
            for (; e.have < e.nlen + e.ndist; ) {
              for (; nt = (u = e.lencode[I & (1 << e.lenbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= O); ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              if (ct < 16) I >>>= et, O -= et, e.lens[e.have++] = ct;
              else {
                if (ct === 16) {
                  for (h = et + 2; O < h; ) {
                    if (W === 0) break t;
                    W--, I += F[U++] << O, O += 8;
                  }
                  if (I >>>= et, O -= et, e.have === 0) {
                    v.msg = "invalid bit length repeat", e.mode = 30;
                    break;
                  }
                  t = e.lens[e.have - 1], H = 3 + (3 & I), I >>>= 2, O -= 2;
                } else if (ct === 17) {
                  for (h = et + 3; O < h; ) {
                    if (W === 0) break t;
                    W--, I += F[U++] << O, O += 8;
                  }
                  O -= et, t = 0, H = 3 + (7 & (I >>>= et)), I >>>= 3, O -= 3;
                } else {
                  for (h = et + 7; O < h; ) {
                    if (W === 0) break t;
                    W--, I += F[U++] << O, O += 8;
                  }
                  O -= et, t = 0, H = 11 + (127 & (I >>>= et)), I >>>= 7, O -= 7;
                }
                if (e.have + H > e.nlen + e.ndist) {
                  v.msg = "invalid bit length repeat", e.mode = 30;
                  break;
                }
                for (; H--; ) e.lens[e.have++] = t;
              }
            }
            if (e.mode === 30) break;
            if (e.lens[256] === 0) {
              v.msg = "invalid code -- missing end-of-block", e.mode = 30;
              break;
            }
            if (e.lenbits = 9, T = { bits: e.lenbits }, L = m(b, e.lens, 0, e.nlen, e.lencode, 0, e.work, T), e.lenbits = T.bits, L) {
              v.msg = "invalid literal/lengths set", e.mode = 30;
              break;
            }
            if (e.distbits = 6, e.distcode = e.distdyn, T = { bits: e.distbits }, L = m(g, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, T), e.distbits = T.bits, L) {
              v.msg = "invalid distances set", e.mode = 30;
              break;
            }
            if (e.mode = 20, B === 6) break t;
          case 20:
            e.mode = 21;
          case 21:
            if (6 <= W && 258 <= Q) {
              v.next_out = tt, v.avail_out = Q, v.next_in = U, v.avail_in = W, e.hold = I, e.bits = O, a(v, K), tt = v.next_out, $ = v.output, Q = v.avail_out, U = v.next_in, F = v.input, W = v.avail_in, I = e.hold, O = e.bits, e.mode === 12 && (e.back = -1);
              break;
            }
            for (e.back = 0; nt = (u = e.lencode[I & (1 << e.lenbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= O); ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            if (nt && !(240 & nt)) {
              for (ot = et, _t = nt, gt = ct; nt = (u = e.lencode[gt + ((I & (1 << ot + _t) - 1) >> ot)]) >>> 16 & 255, ct = 65535 & u, !(ot + (et = u >>> 24) <= O); ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              I >>>= ot, O -= ot, e.back += ot;
            }
            if (I >>>= et, O -= et, e.back += et, e.length = ct, nt === 0) {
              e.mode = 26;
              break;
            }
            if (32 & nt) {
              e.back = -1, e.mode = 12;
              break;
            }
            if (64 & nt) {
              v.msg = "invalid literal/length code", e.mode = 30;
              break;
            }
            e.extra = 15 & nt, e.mode = 22;
          case 22:
            if (e.extra) {
              for (h = e.extra; O < h; ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              e.length += I & (1 << e.extra) - 1, I >>>= e.extra, O -= e.extra, e.back += e.extra;
            }
            e.was = e.length, e.mode = 23;
          case 23:
            for (; nt = (u = e.distcode[I & (1 << e.distbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= O); ) {
              if (W === 0) break t;
              W--, I += F[U++] << O, O += 8;
            }
            if (!(240 & nt)) {
              for (ot = et, _t = nt, gt = ct; nt = (u = e.distcode[gt + ((I & (1 << ot + _t) - 1) >> ot)]) >>> 16 & 255, ct = 65535 & u, !(ot + (et = u >>> 24) <= O); ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              I >>>= ot, O -= ot, e.back += ot;
            }
            if (I >>>= et, O -= et, e.back += et, 64 & nt) {
              v.msg = "invalid distance code", e.mode = 30;
              break;
            }
            e.offset = ct, e.extra = 15 & nt, e.mode = 24;
          case 24:
            if (e.extra) {
              for (h = e.extra; O < h; ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              e.offset += I & (1 << e.extra) - 1, I >>>= e.extra, O -= e.extra, e.back += e.extra;
            }
            if (e.offset > e.dmax) {
              v.msg = "invalid distance too far back", e.mode = 30;
              break;
            }
            e.mode = 25;
          case 25:
            if (Q === 0) break t;
            if (H = K - Q, e.offset > H) {
              if ((H = e.offset - H) > e.whave && e.sane) {
                v.msg = "invalid distance too far back", e.mode = 30;
                break;
              }
              st = H > e.wnext ? (H -= e.wnext, e.wsize - H) : e.wnext - H, H > e.length && (H = e.length), ut = e.window;
            } else ut = $, st = tt - e.offset, H = e.length;
            for (Q < H && (H = Q), Q -= H, e.length -= H; $[tt++] = ut[st++], --H; ) ;
            e.length === 0 && (e.mode = 21);
            break;
          case 26:
            if (Q === 0) break t;
            $[tt++] = e.length, Q--, e.mode = 21;
            break;
          case 27:
            if (e.wrap) {
              for (; O < 32; ) {
                if (W === 0) break t;
                W--, I |= F[U++] << O, O += 8;
              }
              if (K -= Q, v.total_out += K, e.total += K, K && (v.adler = e.check = e.flags ? r(e.check, $, K, tt - K) : l(e.check, $, K, tt - K)), K = Q, (e.flags ? I : o(I)) !== e.check) {
                v.msg = "incorrect data check", e.mode = 30;
                break;
              }
              O = I = 0;
            }
            e.mode = 28;
          case 28:
            if (e.wrap && e.flags) {
              for (; O < 32; ) {
                if (W === 0) break t;
                W--, I += F[U++] << O, O += 8;
              }
              if (I !== (4294967295 & e.total)) {
                v.msg = "incorrect length check", e.mode = 30;
                break;
              }
              O = I = 0;
            }
            e.mode = 29;
          case 29:
            L = 1;
            break t;
          case 30:
            L = -3;
            break t;
          case 31:
            return -4;
          case 32:
          default:
            return i;
        }
        return v.next_out = tt, v.avail_out = Q, v.next_in = U, v.avail_in = W, e.hold = I, e.bits = O, (e.wsize || K !== v.avail_out && e.mode < 30 && (e.mode < 27 || B !== 4)) && X(v, v.output, v.next_out, K - v.avail_out) ? (e.mode = 31, -4) : (J -= v.avail_in, K -= v.avail_out, v.total_in += J, v.total_out += K, e.total += K, e.wrap && K && (v.adler = e.check = e.flags ? r(e.check, $, K, v.next_out - K) : l(e.check, $, K, v.next_out - K)), v.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === 12 ? 128 : 0) + (e.mode === 20 || e.mode === 15 ? 256 : 0), (J == 0 && K === 0 || B === 4) && L === _ && (L = -5), L);
      }, y.inflateEnd = function(v) {
        if (!v || !v.state) return i;
        var B = v.state;
        return B.window && (B.window = null), v.state = null, _;
      }, y.inflateGetHeader = function(v, B) {
        var e;
        return v && v.state && 2 & (e = v.state).wrap ? ((e.head = B).done = !1, _) : i;
      }, y.inflateSetDictionary = function(v, B) {
        var e, F = B.length;
        return v && v.state ? (e = v.state).wrap !== 0 && e.mode !== 11 ? i : e.mode === 11 && l(1, B, F, 0) !== e.check ? -3 : X(v, B, F, F) ? (e.mode = 31, -4) : (e.havedict = 1, _) : i;
      }, y.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(p, z, y) {
      var s = p("../utils/common"), l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], r = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], m = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      z.exports = function(b, g, _, i, d, n, c, o) {
        var f, w, C, S, P, E, R, k, D, X = o.bits, v = 0, B = 0, e = 0, F = 0, $ = 0, U = 0, tt = 0, W = 0, Q = 0, I = 0, O = null, J = 0, K = new s.Buf16(16), H = new s.Buf16(16), st = null, ut = 0;
        for (v = 0; v <= 15; v++) K[v] = 0;
        for (B = 0; B < i; B++) K[g[_ + B]]++;
        for ($ = X, F = 15; 1 <= F && K[F] === 0; F--) ;
        if (F < $ && ($ = F), F === 0) return d[n++] = 20971520, d[n++] = 20971520, o.bits = 1, 0;
        for (e = 1; e < F && K[e] === 0; e++) ;
        for ($ < e && ($ = e), v = W = 1; v <= 15; v++) if (W <<= 1, (W -= K[v]) < 0) return -1;
        if (0 < W && (b === 0 || F !== 1)) return -1;
        for (H[1] = 0, v = 1; v < 15; v++) H[v + 1] = H[v] + K[v];
        for (B = 0; B < i; B++) g[_ + B] !== 0 && (c[H[g[_ + B]]++] = B);
        if (E = b === 0 ? (O = st = c, 19) : b === 1 ? (O = l, J -= 257, st = r, ut -= 257, 256) : (O = a, st = m, -1), v = e, P = n, tt = B = I = 0, C = -1, S = (Q = 1 << (U = $)) - 1, b === 1 && 852 < Q || b === 2 && 592 < Q) return 1;
        for (; ; ) {
          for (R = v - tt, D = c[B] < E ? (k = 0, c[B]) : c[B] > E ? (k = st[ut + c[B]], O[J + c[B]]) : (k = 96, 0), f = 1 << v - tt, e = w = 1 << U; d[P + (I >> tt) + (w -= f)] = R << 24 | k << 16 | D | 0, w !== 0; ) ;
          for (f = 1 << v - 1; I & f; ) f >>= 1;
          if (f !== 0 ? (I &= f - 1, I += f) : I = 0, B++, --K[v] == 0) {
            if (v === F) break;
            v = g[_ + c[B]];
          }
          if ($ < v && (I & S) !== C) {
            for (tt === 0 && (tt = $), P += e, W = 1 << (U = v - tt); U + tt < F && !((W -= K[U + tt]) <= 0); ) U++, W <<= 1;
            if (Q += 1 << U, b === 1 && 852 < Q || b === 2 && 592 < Q) return 1;
            d[C = I & S] = $ << 24 | U << 16 | P - n | 0;
          }
        }
        return I !== 0 && (d[P + I] = v - tt << 24 | 64 << 16 | 0), o.bits = $, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(p, z, y) {
      z.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(p, z, y) {
      var s = p("../utils/common"), l = 0, r = 1;
      function a(u) {
        for (var x = u.length; 0 <= --x; ) u[x] = 0;
      }
      var m = 0, b = 29, g = 256, _ = g + 1 + b, i = 30, d = 19, n = 2 * _ + 1, c = 15, o = 16, f = 7, w = 256, C = 16, S = 17, P = 18, E = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], R = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], k = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], D = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], X = new Array(2 * (_ + 2));
      a(X);
      var v = new Array(2 * i);
      a(v);
      var B = new Array(512);
      a(B);
      var e = new Array(256);
      a(e);
      var F = new Array(b);
      a(F);
      var $, U, tt, W = new Array(i);
      function Q(u, x, N, j, A) {
        this.static_tree = u, this.extra_bits = x, this.extra_base = N, this.elems = j, this.max_length = A, this.has_stree = u && u.length;
      }
      function I(u, x) {
        this.dyn_tree = u, this.max_code = 0, this.stat_desc = x;
      }
      function O(u) {
        return u < 256 ? B[u] : B[256 + (u >>> 7)];
      }
      function J(u, x) {
        u.pending_buf[u.pending++] = 255 & x, u.pending_buf[u.pending++] = x >>> 8 & 255;
      }
      function K(u, x, N) {
        u.bi_valid > o - N ? (u.bi_buf |= x << u.bi_valid & 65535, J(u, u.bi_buf), u.bi_buf = x >> o - u.bi_valid, u.bi_valid += N - o) : (u.bi_buf |= x << u.bi_valid & 65535, u.bi_valid += N);
      }
      function H(u, x, N) {
        K(u, N[2 * x], N[2 * x + 1]);
      }
      function st(u, x) {
        for (var N = 0; N |= 1 & u, u >>>= 1, N <<= 1, 0 < --x; ) ;
        return N >>> 1;
      }
      function ut(u, x, N) {
        var j, A, M = new Array(c + 1), V = 0;
        for (j = 1; j <= c; j++) M[j] = V = V + N[j - 1] << 1;
        for (A = 0; A <= x; A++) {
          var Z = u[2 * A + 1];
          Z !== 0 && (u[2 * A] = st(M[Z]++, Z));
        }
      }
      function et(u) {
        var x;
        for (x = 0; x < _; x++) u.dyn_ltree[2 * x] = 0;
        for (x = 0; x < i; x++) u.dyn_dtree[2 * x] = 0;
        for (x = 0; x < d; x++) u.bl_tree[2 * x] = 0;
        u.dyn_ltree[2 * w] = 1, u.opt_len = u.static_len = 0, u.last_lit = u.matches = 0;
      }
      function nt(u) {
        8 < u.bi_valid ? J(u, u.bi_buf) : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf), u.bi_buf = 0, u.bi_valid = 0;
      }
      function ct(u, x, N, j) {
        var A = 2 * x, M = 2 * N;
        return u[A] < u[M] || u[A] === u[M] && j[x] <= j[N];
      }
      function ot(u, x, N) {
        for (var j = u.heap[N], A = N << 1; A <= u.heap_len && (A < u.heap_len && ct(x, u.heap[A + 1], u.heap[A], u.depth) && A++, !ct(x, j, u.heap[A], u.depth)); ) u.heap[N] = u.heap[A], N = A, A <<= 1;
        u.heap[N] = j;
      }
      function _t(u, x, N) {
        var j, A, M, V, Z = 0;
        if (u.last_lit !== 0) for (; j = u.pending_buf[u.d_buf + 2 * Z] << 8 | u.pending_buf[u.d_buf + 2 * Z + 1], A = u.pending_buf[u.l_buf + Z], Z++, j === 0 ? H(u, A, x) : (H(u, (M = e[A]) + g + 1, x), (V = E[M]) !== 0 && K(u, A -= F[M], V), H(u, M = O(--j), N), (V = R[M]) !== 0 && K(u, j -= W[M], V)), Z < u.last_lit; ) ;
        H(u, w, x);
      }
      function gt(u, x) {
        var N, j, A, M = x.dyn_tree, V = x.stat_desc.static_tree, Z = x.stat_desc.has_stree, Y = x.stat_desc.elems, at = -1;
        for (u.heap_len = 0, u.heap_max = n, N = 0; N < Y; N++) M[2 * N] !== 0 ? (u.heap[++u.heap_len] = at = N, u.depth[N] = 0) : M[2 * N + 1] = 0;
        for (; u.heap_len < 2; ) M[2 * (A = u.heap[++u.heap_len] = at < 2 ? ++at : 0)] = 1, u.depth[A] = 0, u.opt_len--, Z && (u.static_len -= V[2 * A + 1]);
        for (x.max_code = at, N = u.heap_len >> 1; 1 <= N; N--) ot(u, M, N);
        for (A = Y; N = u.heap[1], u.heap[1] = u.heap[u.heap_len--], ot(u, M, 1), j = u.heap[1], u.heap[--u.heap_max] = N, u.heap[--u.heap_max] = j, M[2 * A] = M[2 * N] + M[2 * j], u.depth[A] = (u.depth[N] >= u.depth[j] ? u.depth[N] : u.depth[j]) + 1, M[2 * N + 1] = M[2 * j + 1] = A, u.heap[1] = A++, ot(u, M, 1), 2 <= u.heap_len; ) ;
        u.heap[--u.heap_max] = u.heap[1], function(rt, mt) {
          var xt, bt, St, lt, Ct, Bt, vt = mt.dyn_tree, Rt = mt.max_code, Wt = mt.stat_desc.static_tree, Mt = mt.stat_desc.has_stree, Zt = mt.stat_desc.extra_bits, Pt = mt.stat_desc.extra_base, Et = mt.stat_desc.max_length, zt = 0;
          for (lt = 0; lt <= c; lt++) rt.bl_count[lt] = 0;
          for (vt[2 * rt.heap[rt.heap_max] + 1] = 0, xt = rt.heap_max + 1; xt < n; xt++) Et < (lt = vt[2 * vt[2 * (bt = rt.heap[xt]) + 1] + 1] + 1) && (lt = Et, zt++), vt[2 * bt + 1] = lt, Rt < bt || (rt.bl_count[lt]++, Ct = 0, Pt <= bt && (Ct = Zt[bt - Pt]), Bt = vt[2 * bt], rt.opt_len += Bt * (lt + Ct), Mt && (rt.static_len += Bt * (Wt[2 * bt + 1] + Ct)));
          if (zt !== 0) {
            do {
              for (lt = Et - 1; rt.bl_count[lt] === 0; ) lt--;
              rt.bl_count[lt]--, rt.bl_count[lt + 1] += 2, rt.bl_count[Et]--, zt -= 2;
            } while (0 < zt);
            for (lt = Et; lt !== 0; lt--) for (bt = rt.bl_count[lt]; bt !== 0; ) Rt < (St = rt.heap[--xt]) || (vt[2 * St + 1] !== lt && (rt.opt_len += (lt - vt[2 * St + 1]) * vt[2 * St], vt[2 * St + 1] = lt), bt--);
          }
        }(u, x), ut(M, at, u.bl_count);
      }
      function t(u, x, N) {
        var j, A, M = -1, V = x[1], Z = 0, Y = 7, at = 4;
        for (V === 0 && (Y = 138, at = 3), x[2 * (N + 1) + 1] = 65535, j = 0; j <= N; j++) A = V, V = x[2 * (j + 1) + 1], ++Z < Y && A === V || (Z < at ? u.bl_tree[2 * A] += Z : A !== 0 ? (A !== M && u.bl_tree[2 * A]++, u.bl_tree[2 * C]++) : Z <= 10 ? u.bl_tree[2 * S]++ : u.bl_tree[2 * P]++, M = A, at = (Z = 0) === V ? (Y = 138, 3) : A === V ? (Y = 6, 3) : (Y = 7, 4));
      }
      function L(u, x, N) {
        var j, A, M = -1, V = x[1], Z = 0, Y = 7, at = 4;
        for (V === 0 && (Y = 138, at = 3), j = 0; j <= N; j++) if (A = V, V = x[2 * (j + 1) + 1], !(++Z < Y && A === V)) {
          if (Z < at) for (; H(u, A, u.bl_tree), --Z != 0; ) ;
          else A !== 0 ? (A !== M && (H(u, A, u.bl_tree), Z--), H(u, C, u.bl_tree), K(u, Z - 3, 2)) : Z <= 10 ? (H(u, S, u.bl_tree), K(u, Z - 3, 3)) : (H(u, P, u.bl_tree), K(u, Z - 11, 7));
          M = A, at = (Z = 0) === V ? (Y = 138, 3) : A === V ? (Y = 6, 3) : (Y = 7, 4);
        }
      }
      a(W);
      var T = !1;
      function h(u, x, N, j) {
        K(u, (m << 1) + (j ? 1 : 0), 3), function(A, M, V, Z) {
          nt(A), J(A, V), J(A, ~V), s.arraySet(A.pending_buf, A.window, M, V, A.pending), A.pending += V;
        }(u, x, N);
      }
      y._tr_init = function(u) {
        T || (function() {
          var x, N, j, A, M, V = new Array(c + 1);
          for (A = j = 0; A < b - 1; A++) for (F[A] = j, x = 0; x < 1 << E[A]; x++) e[j++] = A;
          for (e[j - 1] = A, A = M = 0; A < 16; A++) for (W[A] = M, x = 0; x < 1 << R[A]; x++) B[M++] = A;
          for (M >>= 7; A < i; A++) for (W[A] = M << 7, x = 0; x < 1 << R[A] - 7; x++) B[256 + M++] = A;
          for (N = 0; N <= c; N++) V[N] = 0;
          for (x = 0; x <= 143; ) X[2 * x + 1] = 8, x++, V[8]++;
          for (; x <= 255; ) X[2 * x + 1] = 9, x++, V[9]++;
          for (; x <= 279; ) X[2 * x + 1] = 7, x++, V[7]++;
          for (; x <= 287; ) X[2 * x + 1] = 8, x++, V[8]++;
          for (ut(X, _ + 1, V), x = 0; x < i; x++) v[2 * x + 1] = 5, v[2 * x] = st(x, 5);
          $ = new Q(X, E, g + 1, _, c), U = new Q(v, R, 0, i, c), tt = new Q(new Array(0), k, 0, d, f);
        }(), T = !0), u.l_desc = new I(u.dyn_ltree, $), u.d_desc = new I(u.dyn_dtree, U), u.bl_desc = new I(u.bl_tree, tt), u.bi_buf = 0, u.bi_valid = 0, et(u);
      }, y._tr_stored_block = h, y._tr_flush_block = function(u, x, N, j) {
        var A, M, V = 0;
        0 < u.level ? (u.strm.data_type === 2 && (u.strm.data_type = function(Z) {
          var Y, at = 4093624447;
          for (Y = 0; Y <= 31; Y++, at >>>= 1) if (1 & at && Z.dyn_ltree[2 * Y] !== 0) return l;
          if (Z.dyn_ltree[18] !== 0 || Z.dyn_ltree[20] !== 0 || Z.dyn_ltree[26] !== 0) return r;
          for (Y = 32; Y < g; Y++) if (Z.dyn_ltree[2 * Y] !== 0) return r;
          return l;
        }(u)), gt(u, u.l_desc), gt(u, u.d_desc), V = function(Z) {
          var Y;
          for (t(Z, Z.dyn_ltree, Z.l_desc.max_code), t(Z, Z.dyn_dtree, Z.d_desc.max_code), gt(Z, Z.bl_desc), Y = d - 1; 3 <= Y && Z.bl_tree[2 * D[Y] + 1] === 0; Y--) ;
          return Z.opt_len += 3 * (Y + 1) + 5 + 5 + 4, Y;
        }(u), A = u.opt_len + 3 + 7 >>> 3, (M = u.static_len + 3 + 7 >>> 3) <= A && (A = M)) : A = M = N + 5, N + 4 <= A && x !== -1 ? h(u, x, N, j) : u.strategy === 4 || M === A ? (K(u, 2 + (j ? 1 : 0), 3), _t(u, X, v)) : (K(u, 4 + (j ? 1 : 0), 3), function(Z, Y, at, rt) {
          var mt;
          for (K(Z, Y - 257, 5), K(Z, at - 1, 5), K(Z, rt - 4, 4), mt = 0; mt < rt; mt++) K(Z, Z.bl_tree[2 * D[mt] + 1], 3);
          L(Z, Z.dyn_ltree, Y - 1), L(Z, Z.dyn_dtree, at - 1);
        }(u, u.l_desc.max_code + 1, u.d_desc.max_code + 1, V + 1), _t(u, u.dyn_ltree, u.dyn_dtree)), et(u), j && nt(u);
      }, y._tr_tally = function(u, x, N) {
        return u.pending_buf[u.d_buf + 2 * u.last_lit] = x >>> 8 & 255, u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & x, u.pending_buf[u.l_buf + u.last_lit] = 255 & N, u.last_lit++, x === 0 ? u.dyn_ltree[2 * N]++ : (u.matches++, x--, u.dyn_ltree[2 * (e[N] + g + 1)]++, u.dyn_dtree[2 * O(x)]++), u.last_lit === u.lit_bufsize - 1;
      }, y._tr_align = function(u) {
        K(u, 2, 3), H(u, w, X), function(x) {
          x.bi_valid === 16 ? (J(x, x.bi_buf), x.bi_buf = 0, x.bi_valid = 0) : 8 <= x.bi_valid && (x.pending_buf[x.pending++] = 255 & x.bi_buf, x.bi_buf >>= 8, x.bi_valid -= 8);
        }(u);
      };
    }, { "../utils/common": 41 }], 53: [function(p, z, y) {
      z.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(p, z, y) {
      (function(s) {
        (function(l, r) {
          if (!l.setImmediate) {
            var a, m, b, g, _ = 1, i = {}, d = !1, n = l.document, c = Object.getPrototypeOf && Object.getPrototypeOf(l);
            c = c && c.setTimeout ? c : l, a = {}.toString.call(l.process) === "[object process]" ? function(C) {
              process.nextTick(function() {
                f(C);
              });
            } : function() {
              if (l.postMessage && !l.importScripts) {
                var C = !0, S = l.onmessage;
                return l.onmessage = function() {
                  C = !1;
                }, l.postMessage("", "*"), l.onmessage = S, C;
              }
            }() ? (g = "setImmediate$" + Math.random() + "$", l.addEventListener ? l.addEventListener("message", w, !1) : l.attachEvent("onmessage", w), function(C) {
              l.postMessage(g + C, "*");
            }) : l.MessageChannel ? ((b = new MessageChannel()).port1.onmessage = function(C) {
              f(C.data);
            }, function(C) {
              b.port2.postMessage(C);
            }) : n && "onreadystatechange" in n.createElement("script") ? (m = n.documentElement, function(C) {
              var S = n.createElement("script");
              S.onreadystatechange = function() {
                f(C), S.onreadystatechange = null, m.removeChild(S), S = null;
              }, m.appendChild(S);
            }) : function(C) {
              setTimeout(f, 0, C);
            }, c.setImmediate = function(C) {
              typeof C != "function" && (C = new Function("" + C));
              for (var S = new Array(arguments.length - 1), P = 0; P < S.length; P++) S[P] = arguments[P + 1];
              var E = { callback: C, args: S };
              return i[_] = E, a(_), _++;
            }, c.clearImmediate = o;
          }
          function o(C) {
            delete i[C];
          }
          function f(C) {
            if (d) setTimeout(f, 0, C);
            else {
              var S = i[C];
              if (S) {
                d = !0;
                try {
                  (function(P) {
                    var E = P.callback, R = P.args;
                    switch (R.length) {
                      case 0:
                        E();
                        break;
                      case 1:
                        E(R[0]);
                        break;
                      case 2:
                        E(R[0], R[1]);
                        break;
                      case 3:
                        E(R[0], R[1], R[2]);
                        break;
                      default:
                        E.apply(r, R);
                    }
                  })(S);
                } finally {
                  o(C), d = !1;
                }
              }
            }
          }
          function w(C) {
            C.source === l && typeof C.data == "string" && C.data.indexOf(g) === 0 && f(+C.data.slice(g.length));
          }
        })(typeof self > "u" ? s === void 0 ? this : s : self);
      }).call(this, typeof At < "u" ? At : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Ut);
var Vt = Ut.exports;
const $t = /* @__PURE__ */ Kt(Vt);
function qt() {
  const [G, q] = ft(""), [p, z] = ft(!1), [y, s] = ft(""), [l, r] = ft(null);
  let a = null, m = "", b = {}, g = "", _ = null;
  const i = [
    "text/html",
    "text/xml",
    "application/xml",
    "application/xhtml+xml",
    "image/svg+xml"
  ], d = Tt(
    async (R) => {
      z(!0), q(""), s("Loading..."), r(null), a = null, m = "", b = {}, g = "", _ && (document.head.removeChild(_), URL.revokeObjectURL(_.href), _ = null);
      try {
        let k;
        if (typeof R == "string") {
          const D = await fetch(R);
          if (!D.ok)
            throw new Error(
              `HTTP error! status: ${D.status} ${D.statusText}`
            );
          k = await D.arrayBuffer();
        } else R instanceof File ? k = await R.arrayBuffer() : k = R;
        if (!k || k.byteLength === 0)
          throw new Error(
            "EPUB source is empty or could not be read."
          );
        a = await $t.loadAsync(k), await n();
      } catch (k) {
        const D = k instanceof Error ? k.message : "An unknown error occurred while fetching or loading the EPUB.";
        console.error("Error processing EPUB source:", k), r(D), q(""), s(""), z(!1);
      }
    },
    []
  );
  async function n() {
    if (!a) throw new Error("Zip not loaded");
    const k = a.file("META-INF/container.xml");
    if (!k)
      throw new Error("META-INF/container.xml not found.");
    const D = await k.async("text"), X = c(D);
    if (!X)
      throw new Error("OPF file path not found in container.xml.");
    m = X.substring(0, X.lastIndexOf("/") + 1);
    const v = a.file(X);
    if (!v) throw new Error(`OPF file not found at path: ${X}`);
    const B = await v.async("text"), F = new DOMParser().parseFromString(B, "application/xml"), $ = F.querySelector("parsererror");
    if ($)
      throw new Error(
        `Error parsing OPF file: ${$.textContent || "Unknown XML parse error"}`
      );
    o(F), await f(F);
  }
  function c(R) {
    const X = new DOMParser().parseFromString(
      R,
      "application/xml"
    ).querySelector(
      'rootfile[media-type="application/oebps-package+xml"]'
    );
    return (X == null ? void 0 : X.getAttribute("full-path")) ?? null;
  }
  function o(R) {
    const k = R.querySelector("metadata > dc\\:title") || R.querySelector("metadata > title");
    s((k == null ? void 0 : k.textContent) || "Untitled Book");
  }
  async function f(R) {
    if (!a) return;
    const k = {};
    R.querySelectorAll("manifest > item").forEach((B) => {
      const e = B.getAttribute("id"), F = B.getAttribute("href"), $ = B.getAttribute("media-type");
      e && F && $ && (k[e] = { href: decodeURIComponent(F), type: $ });
    });
    const D = Array.from(
      R.querySelectorAll("spine > itemref")
    ).map((B) => B.getAttribute("idref"));
    let X = "";
    const v = /* @__PURE__ */ new Set();
    for (const B of D) {
      if (!B) continue;
      const e = k[B];
      if (e) {
        const F = m + e.href, $ = a.file(F);
        if ($ && (e.type.includes("html") || e.type.includes("xml")))
          try {
            const U = await $.async("text"), tt = await w(
              U,
              e.type
            );
            X += `<div class="bok-chapter">${tt}</div>`;
          } catch (U) {
            console.warn(
              `Failed to process spine item ${F}:`,
              U
            );
          }
      }
    }
    for (const B in k) {
      const e = k[B];
      if (e.type.includes("css")) {
        const F = m + e.href;
        if (!v.has(F)) {
          const $ = a.file(F);
          if ($)
            try {
              g += await $.async("text") + `
`, v.add(F);
            } catch (U) {
              console.warn(`Failed to load CSS ${F}:`, U);
            }
        }
      }
    }
    E(), q(X);
  }
  async function w(R, k) {
    let D = R.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    return D = await C(D, k), D;
  }
  async function C(R, k) {
    const D = new DOMParser();
    if (i.includes(k))
      try {
        const X = D.parseFromString(
          R,
          k
        ), v = X.querySelector("parsererror");
        if (v)
          return console.warn(
            "Parser error in content item during cleanImages, skipping.",
            v.textContent
          ), R;
        const B = X.querySelectorAll("img");
        for (const U of B)
          await S(U);
        const e = X.querySelectorAll("image");
        for (const U of e)
          await P(U);
        return new XMLSerializer().serializeToString(
          X.documentElement || X
        );
      } catch (X) {
        return console.error(
          "Error during cleanImages DOM processing:",
          X
        ), R;
      }
    else return R;
  }
  async function S(R) {
    let k = R.getAttribute("src");
    if (k) {
      for (; k.startsWith(".") || k.startsWith("/"); ) k = k.slice(1);
      if (k = m + k, b[k] === void 0) {
        const D = a == null ? void 0 : a.file(k);
        if (D)
          try {
            const X = await D.async("blob"), v = URL.createObjectURL(X);
            b[k] = v;
          } catch (X) {
            console.warn(
              `Could not load image blob (formatImg) ${k}:`,
              X
            ), b[k] = "";
          }
        else
          console.warn(`Image file not found in zip (formatImg): ${k}`), b[k] = "";
      }
      R.setAttribute("src", b[k]);
    }
  }
  async function P(R) {
    let k = R.getAttribute("xlink:href");
    if (k) {
      for (; k.startsWith(".") || k.startsWith("/"); ) k = k.slice(1);
      if (k = m + k, b[k] === void 0) {
        const D = a == null ? void 0 : a.file(k);
        if (D)
          try {
            const X = await D.async("blob"), v = URL.createObjectURL(X);
            b[k] = v;
          } catch (X) {
            console.warn(
              `Could not load image blob (formatXMLImage) ${k}:`,
              X
            ), b[k] = "";
          }
        else
          console.warn(
            `Image file not found in zip (formatXMLImage): ${k}`
          ), b[k] = "";
      }
      R.setAttribute("xlink:href", b[k]);
    }
  }
  function E() {
    if (!g.trim()) return;
    const R = new Blob([g], { type: "text/css" }), k = URL.createObjectURL(R);
    _ = document.createElement("link"), _.href = k, _.rel = "stylesheet", _.setAttribute("data-bok-reader-style", "true"), document.head.appendChild(_);
  }
  return {
    title: y,
    rawContent: G,
    isLoading: p,
    error: l,
    loadEpub: d,
    setIsLoading: z
  };
}
function jt(G) {
  const [q, p] = ft({
    width: 0,
    height: 0,
    noOfPages: 1
  });
  return dt(() => {
    const z = G == null ? void 0 : G.current, y = () => {
      if (z) {
        const s = z.getBoundingClientRect(), l = s.height < s.width;
        p((r) => {
          const a = l ? s.width / 2 : s.width, m = s.height, b = l ? 2 : 1;
          return r.width !== a || r.height !== m || r.noOfPages !== b ? {
            width: a,
            height: m,
            noOfPages: b
          } : r;
        });
      } else
        p({ width: 0, height: 0, noOfPages: 1 });
    };
    if (z) {
      y();
      const s = new ResizeObserver(y);
      return s.observe(z), () => {
        s.unobserve(z);
      };
    }
  }, [G]), [q.width, q.height, q.noOfPages];
}
function Yt(G) {
  const [q, p] = ft(0);
  return dt(() => {
    const z = () => {
      if (G.current) {
        const s = G.current.scrollWidth, l = G.current.scrollLeft, r = s > 0 ? l / s : 0;
        p(r);
      }
    }, y = G.current;
    return y == null || y.addEventListener("scroll", z), z(), () => {
      y == null || y.removeEventListener(
        "scroll",
        z
      );
    };
  }, [G]), [q, p];
}
function Jt(G, q, p, z, y) {
  let s = "";
  dt(() => {
    q > 1e-7 && (s = JSON.stringify({
      percentRead: q,
      padding: p,
      fontSize: z,
      fontFamily: y
    }), localStorage.setItem(G, s));
  }, [G, q, p, z, y]);
}
const Qt = (G, q, p) => {
  const [z, y] = jt(p), s = kt(null), l = kt(""), r = Tt(
    (a, m) => {
      q || (a / z <= 0.4 && m / y < 0.8 && G(-1), a / z > 0.4 && m / y < 0.8 && G(1));
    },
    [G, q, z, y]
  );
  dt(() => {
    const a = () => {
      var b;
      const m = (b = window.getSelection()) == null ? void 0 : b.toString();
      m && m.length > 0 ? l.current = m : l.current = "";
    };
    return document.addEventListener("selectionchange", a), () => {
      document.removeEventListener("selectionchange", a);
    };
  }, []), dt(() => {
    const a = () => {
      s.current = window.setTimeout(() => {
        s.current = null;
      }, 500);
    }, m = (b) => {
      if (s.current && l.current) {
        clearTimeout(s.current), s.current = null;
        const { pageX: g, pageY: _ } = b.touches[0];
        r(g, _);
      }
    };
    return window.addEventListener("touchstart", a), window.addEventListener("touchend", m), () => {
      window.removeEventListener("touchstart", a), window.removeEventListener("touchend", m);
    };
  }, [z, r]), dt(() => {
    const a = p.current, m = () => {
      s.current = window.setTimeout(() => {
      }, 200);
    }, b = (g) => {
      s.current && !l.current && (clearTimeout(s.current), s.current = null, r(g.clientX, g.clientY));
    };
    return a == null || a.addEventListener("mousedown", m), a == null || a.addEventListener("mouseup", b), () => {
      a == null || a.removeEventListener("mousedown", m), a == null || a.removeEventListener("mouseup", b);
    };
  }, [z, q, r, p]);
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
  fontSize: z,
  sidePadding: y,
  fontFamily: s,
  isOptionMenuVisible: l,
  setFontSize: r,
  setPadding: a,
  setFontFamily: m,
  containerElementRef: b
}) {
  const g = kt(null), [_, i, d] = jt(b), [n, c] = Yt(g), [o, f] = ft(1), [w, C] = ft(0);
  Jt(q, n, y, z, s);
  const S = Tt(
    (P) => {
      f((E) => {
        const R = g.current;
        if (R && w > 0 && d > 0 && R.clientWidth > 0) {
          const k = E + P;
          if (k >= 0 && k < w)
            return R.scroll({
              left: k * _,
              behavior: "smooth"
            }), k;
        }
        return E;
      });
    },
    [_, w, d]
  );
  return Qt(S, l, b), dt(() => {
    if (!q) return;
    const P = localStorage.getItem(q);
    if (P)
      try {
        const E = JSON.parse(P);
        E && (c(E.percentRead || 0), E.fontSize !== void 0 && r(E.fontSize), E.padding !== void 0 && a(E.padding), E.fontFamily !== void 0 && m(E.fontFamily));
      } catch (E) {
        console.error("Failed to parse local storage for", q, E), c(0);
      }
    else
      c(0);
    f(1);
  }, [q, c, r, a, m]), dt(() => {
    const P = g.current;
    if (!P || _ <= 0 || i <= 0) return;
    p(!0);
    const E = setTimeout(() => {
      P.style.setProperty(
        "--side-padding",
        `${y}px`
      ), P.style.setProperty("--font-size", `${z}em`), P.style.setProperty("--font-family", s), P.style.maxHeight = `${i}px`;
      const R = P.scrollWidth, k = _ > 0 && R > 0 ? Math.floor(R / _) : 0;
      if (C(k), k > 0 && P.clientWidth > 0) {
        let D = Math.round(k * n);
        D = Math.max(
          0,
          Math.min(k - 1, D)
        ), o !== D && (f(D), P.scrollLeft = D * _);
      } else
        p(!1), f(1);
      p(!1);
    }, 400);
    return () => {
      clearTimeout(E);
    };
  }, [
    // @eslint-ignore
    _,
    i,
    y,
    z,
    s,
    d,
    G,
    q,
    p
    // currentPage,
    // percentRead,
  ]), dt(() => {
    const P = (E) => {
      E.key === "ArrowLeft" ? (E.preventDefault(), console.log(_), S(-1)) : E.key === "ArrowRight" && (E.preventDefault(), S(1));
    };
    return document.addEventListener("keydown", P), () => {
      document.removeEventListener("keydown", P);
    };
  }, [S, _]), /* @__PURE__ */ pt(Nt, { children: [
    /* @__PURE__ */ it(
      "div",
      {
        ref: g,
        dangerouslySetInnerHTML: { __html: G },
        className: "book-page"
      }
    ),
    /* @__PURE__ */ it(te, { pages: w, currentPage: o })
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
  var z = (G.match(/[^0-9]*$/) || "").toString();
  return re[z] ? {
    value: q,
    unit: z
  } : (console.warn("React Spinners: ".concat(G, " is not a valid css value. Defaulting to ").concat(q, "px.")), {
    value: q,
    unit: "px"
  });
}
var wt = function(G, q, p) {
  var z = "react-spinners-".concat(G, "-").concat(p);
  if (typeof window > "u" || !window.document)
    return z;
  var y = document.createElement("style");
  document.head.appendChild(y);
  var s = y.sheet, l = `
    @keyframes `.concat(z, ` {
      `).concat(q, `
    }
  `);
  return s && s.insertRule(l, 0), z;
}, It = function() {
  return It = Object.assign || function(G) {
    for (var q, p = 1, z = arguments.length; p < z; p++) {
      q = arguments[p];
      for (var y in q) Object.prototype.hasOwnProperty.call(q, y) && (G[y] = q[y]);
    }
    return G;
  }, It.apply(this, arguments);
}, ie = function(G, q) {
  var p = {};
  for (var z in G) Object.prototype.hasOwnProperty.call(G, z) && q.indexOf(z) < 0 && (p[z] = G[z]);
  if (G != null && typeof Object.getOwnPropertySymbols == "function")
    for (var y = 0, z = Object.getOwnPropertySymbols(G); y < z.length; y++)
      q.indexOf(z[y]) < 0 && Object.prototype.propertyIsEnumerable.call(G, z[y]) && (p[z[y]] = G[z[y]]);
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
  var q = G.loading, p = q === void 0 ? !0 : q, z = G.color, y = z === void 0 ? "#000000" : z, s = G.speedMultiplier, l = s === void 0 ? 1 : s, r = G.cssOverride, a = r === void 0 ? {} : r, m = G.size, b = m === void 0 ? 15 : m, g = ie(G, ["loading", "color", "speedMultiplier", "cssOverride", "size"]), _ = ne(b), i = _.value, d = _.unit, n = It({ display: "inherit", position: "relative" }, a), c = function(o) {
    return {
      position: "absolute",
      fontSize: "".concat(i / 3).concat(d),
      width: "".concat(i).concat(d),
      height: "".concat(i).concat(d),
      background: y,
      borderRadius: "50%",
      animation: "".concat(ae[o], " ").concat(1.5 / l, "s infinite"),
      animationFillMode: "forwards"
    };
  };
  return p ? yt.createElement(
    "span",
    It({ style: n }, g),
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
  fontFamily: z,
  setFontSize: y,
  setPadding: s,
  setFontFamily: l,
  supportedFonts: r
}) {
  const [a, m] = ft(!1), [b, g] = ft(!1), _ = kt(null), i = kt(null), d = [
    ...r,
    { displayName: "System Default", name: "system-ui" }
  ];
  dt(() => {
    const E = setTimeout(() => {
      g(!0);
    }, 0);
    return () => clearTimeout(E);
  }, []);
  const n = () => {
    g(!1), m(!0);
  };
  dt(() => {
    if (a) {
      const E = setTimeout(() => {
        G();
      }, 300);
      return () => clearTimeout(E);
    }
  }, [a, G]);
  const c = () => {
    n();
  }, o = (E) => {
    E.stopPropagation();
  }, f = (E) => {
    E.current && (E.current.classList.add("value-changed"), setTimeout(() => {
      E.current && E.current.classList.remove("value-changed");
    }, 300));
  }, w = () => {
    p <= 70 && (s((E) => E + 5), f(i));
  }, C = () => {
    p - 5 > 0 && (s((E) => E - 5), f(i));
  }, S = () => {
    q < 3 && (y((E) => E + 0.2), f(_));
  }, P = () => {
    q - 0.2 > 0.6 && (y((E) => E - 0.2), f(_));
  };
  return /* @__PURE__ */ it(
    "div",
    {
      className: `options-menu-overlay ${a ? "fade-out" : ""}`,
      onClick: c,
      children: /* @__PURE__ */ pt(
        "div",
        {
          className: `options-menu ${b ? "visible" : ""} ${a ? "slide-down" : ""}`,
          onClick: o,
          children: [
            /* @__PURE__ */ it("button", { onClick: n, className: "close-button", children: "✕" }),
            /* @__PURE__ */ it("h2", { children: "Reader Options" }),
            /* @__PURE__ */ pt("div", { className: "options-buttons", children: [
              /* @__PURE__ */ pt("div", { className: "font-family-buttons", children: [
                /* @__PURE__ */ it(
                  "select",
                  {
                    value: z,
                    onChange: (E) => {
                      for (const R of d)
                        R.name === E.target.value && l(E.target.value);
                    },
                    children: d.map((E) => /* @__PURE__ */ it(
                      "option",
                      {
                        value: E.name,
                        children: E.displayName
                      },
                      E.displayName
                    ))
                  }
                ),
                /* @__PURE__ */ it("div", { className: "option-label", children: "Font family" })
              ] }),
              /* @__PURE__ */ pt("div", { className: "padding-buttons", children: [
                /* @__PURE__ */ it("button", { onClick: w, children: "+" }),
                /* @__PURE__ */ it("button", { onClick: C, children: "-" }),
                /* @__PURE__ */ pt("div", { children: [
                  /* @__PURE__ */ it("span", { className: "option-label", children: "Side padding: " }),
                  /* @__PURE__ */ it(
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
                /* @__PURE__ */ it("button", { onClick: S, children: "+" }),
                /* @__PURE__ */ it("button", { onClick: P, children: "-" }),
                /* @__PURE__ */ pt("div", { style: { marginLeft: "auto" }, children: [
                  /* @__PURE__ */ it("span", { className: "option-label", children: "Font size: " }),
                  /* @__PURE__ */ it("span", { ref: _, className: "option-value", children: Math.round(q * 10) })
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
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
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
  onError: z,
  className: y,
  style: s,
  supportedFonts: l = []
}) => {
  const { title: r, rawContent: a, isLoading: m, error: b, loadEpub: g, setIsLoading: _ } = qt(), [i, d] = ft(!1), [n, c] = ft(1.2), [o, f] = ft(30), [w, C] = ft("Inter"), S = kt(null);
  dt(() => {
    G && g(G);
  }, [G, g]), dt(() => {
    q && q(r);
  }, [r, q]), dt(() => {
    p && p(m);
  }, [m, p]), dt(() => {
    b && z && z(b);
  }, [b, z]);
  const P = Xt(
    () => ({
      "--side-padding": `${o}px`,
      "--top-padding": "30px",
      // Example: make these configurable too if needed
      "--bottom-padding": "70px",
      // Example
      "--font-size": `${n}em`,
      "--font-family": w
    }),
    [o, n, w]
  );
  return b && !m && !a ? /* @__PURE__ */ pt(
    Lt,
    {
      className: `bok-reader-container ${y || ""}`,
      style: s,
      children: [
        /* @__PURE__ */ it(Dt, {}),
        /* @__PURE__ */ pt("div", { style: { padding: "20px", color: "red" }, children: [
          "Error loading EPUB: ",
          b
        ] })
      ]
    }
  ) : /* @__PURE__ */ pt(
    Lt,
    {
      className: `bok-reader-container ${y || ""}`,
      style: { ...s, ...P },
      ref: S,
      children: [
        /* @__PURE__ */ it(Dt, {}),
        /* @__PURE__ */ it(oe, { isLoading: m }),
        a && /* @__PURE__ */ pt(Nt, { children: [
          /* @__PURE__ */ it(
            ee,
            {
              content: a,
              title: r,
              setIsLoading: _,
              fontSize: n,
              sidePadding: o,
              fontFamily: w,
              setPadding: f,
              setFontSize: c,
              setFontFamily: C,
              isOptionMenuVisible: i,
              containerElementRef: S
            }
          ),
          i && /* @__PURE__ */ it(
            ce,
            {
              onClose: () => d(!1),
              fontSize: n,
              padding: o,
              fontFamily: w,
              setPadding: f,
              setFontSize: c,
              setFontFamily: C,
              supportedFonts: l
            }
          ),
          !i && /* @__PURE__ */ it(
            "div",
            {
              className: "bottom-click-area",
              onClick: () => d(!0),
              "aria-label": "Open reader options"
            }
          )
        ] }),
        !G && !m && !b && /* @__PURE__ */ it("div", { style: { padding: "20px", textAlign: "center" }, children: "No EPUB loaded." })
      ]
    }
  );
};
export {
  fe as BokReader
};
