import { jsxs as pt, Fragment as Nt, jsx as it } from "react/jsx-runtime";
import * as wt from "react";
import { useState as ft, useRef as yt, useCallback as Bt, useEffect as dt, useMemo as Xt } from "react";
import Ht, { createGlobalStyle as Gt } from "styled-components";
var At = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $t(G) {
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
(function(G, Y) {
  (function(g) {
    G.exports = g();
  })(function() {
    return function g(A, v, a) {
      function l(_, y) {
        if (!v[_]) {
          if (!A[_]) {
            var m = typeof Ot == "function" && Ot;
            if (!y && m) return m(_, !0);
            if (r) return r(_, !0);
            var b = new Error("Cannot find module '" + _ + "'");
            throw b.code = "MODULE_NOT_FOUND", b;
          }
          var i = v[_] = { exports: {} };
          A[_][0].call(i.exports, function(h) {
            var n = A[_][1][h];
            return l(n || h);
          }, i, i.exports, g, A, v, a);
        }
        return v[_].exports;
      }
      for (var r = typeof Ot == "function" && Ot, s = 0; s < a.length; s++) l(a[s]);
      return l;
    }({ 1: [function(g, A, v) {
      var a = g("./utils"), l = g("./support"), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      v.encode = function(s) {
        for (var _, y, m, b, i, h, n, c = [], o = 0, f = s.length, w = f, E = a.getTypeOf(s) !== "string"; o < s.length; ) w = f - o, m = E ? (_ = s[o++], y = o < f ? s[o++] : 0, o < f ? s[o++] : 0) : (_ = s.charCodeAt(o++), y = o < f ? s.charCodeAt(o++) : 0, o < f ? s.charCodeAt(o++) : 0), b = _ >> 2, i = (3 & _) << 4 | y >> 4, h = 1 < w ? (15 & y) << 2 | m >> 6 : 64, n = 2 < w ? 63 & m : 64, c.push(r.charAt(b) + r.charAt(i) + r.charAt(h) + r.charAt(n));
        return c.join("");
      }, v.decode = function(s) {
        var _, y, m, b, i, h, n = 0, c = 0, o = "data:";
        if (s.substr(0, o.length) === o) throw new Error("Invalid base64 input, it looks like a data url.");
        var f, w = 3 * (s = s.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (s.charAt(s.length - 1) === r.charAt(64) && w--, s.charAt(s.length - 2) === r.charAt(64) && w--, w % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (f = l.uint8array ? new Uint8Array(0 | w) : new Array(0 | w); n < s.length; ) _ = r.indexOf(s.charAt(n++)) << 2 | (b = r.indexOf(s.charAt(n++))) >> 4, y = (15 & b) << 4 | (i = r.indexOf(s.charAt(n++))) >> 2, m = (3 & i) << 6 | (h = r.indexOf(s.charAt(n++))), f[c++] = _, i !== 64 && (f[c++] = y), h !== 64 && (f[c++] = m);
        return f;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(g, A, v) {
      var a = g("./external"), l = g("./stream/DataWorker"), r = g("./stream/Crc32Probe"), s = g("./stream/DataLengthProbe");
      function _(y, m, b, i, h) {
        this.compressedSize = y, this.uncompressedSize = m, this.crc32 = b, this.compression = i, this.compressedContent = h;
      }
      _.prototype = { getContentWorker: function() {
        var y = new l(a.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s("data_length")), m = this;
        return y.on("end", function() {
          if (this.streamInfo.data_length !== m.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), y;
      }, getCompressedWorker: function() {
        return new l(a.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, _.createWorkerFrom = function(y, m, b) {
        return y.pipe(new r()).pipe(new s("uncompressedSize")).pipe(m.compressWorker(b)).pipe(new s("compressedSize")).withStreamInfo("compression", m);
      }, A.exports = _;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(g, A, v) {
      var a = g("./stream/GenericWorker");
      v.STORE = { magic: "\0\0", compressWorker: function() {
        return new a("STORE compression");
      }, uncompressWorker: function() {
        return new a("STORE decompression");
      } }, v.DEFLATE = g("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(g, A, v) {
      var a = g("./utils"), l = function() {
        for (var r, s = [], _ = 0; _ < 256; _++) {
          r = _;
          for (var y = 0; y < 8; y++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
          s[_] = r;
        }
        return s;
      }();
      A.exports = function(r, s) {
        return r !== void 0 && r.length ? a.getTypeOf(r) !== "string" ? function(_, y, m, b) {
          var i = l, h = b + m;
          _ ^= -1;
          for (var n = b; n < h; n++) _ = _ >>> 8 ^ i[255 & (_ ^ y[n])];
          return -1 ^ _;
        }(0 | s, r, r.length, 0) : function(_, y, m, b) {
          var i = l, h = b + m;
          _ ^= -1;
          for (var n = b; n < h; n++) _ = _ >>> 8 ^ i[255 & (_ ^ y.charCodeAt(n))];
          return -1 ^ _;
        }(0 | s, r, r.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(g, A, v) {
      v.base64 = !1, v.binary = !1, v.dir = !1, v.createFolders = !0, v.date = null, v.compression = null, v.compressionOptions = null, v.comment = null, v.unixPermissions = null, v.dosPermissions = null;
    }, {}], 6: [function(g, A, v) {
      var a = null;
      a = typeof Promise < "u" ? Promise : g("lie"), A.exports = { Promise: a };
    }, { lie: 37 }], 7: [function(g, A, v) {
      var a = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", l = g("pako"), r = g("./utils"), s = g("./stream/GenericWorker"), _ = a ? "uint8array" : "array";
      function y(m, b) {
        s.call(this, "FlateWorker/" + m), this._pako = null, this._pakoAction = m, this._pakoOptions = b, this.meta = {};
      }
      v.magic = "\b\0", r.inherits(y, s), y.prototype.processChunk = function(m) {
        this.meta = m.meta, this._pako === null && this._createPako(), this._pako.push(r.transformTo(_, m.data), !1);
      }, y.prototype.flush = function() {
        s.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, y.prototype.cleanUp = function() {
        s.prototype.cleanUp.call(this), this._pako = null;
      }, y.prototype._createPako = function() {
        this._pako = new l[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var m = this;
        this._pako.onData = function(b) {
          m.push({ data: b, meta: m.meta });
        };
      }, v.compressWorker = function(m) {
        return new y("Deflate", m);
      }, v.uncompressWorker = function() {
        return new y("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(g, A, v) {
      function a(i, h) {
        var n, c = "";
        for (n = 0; n < h; n++) c += String.fromCharCode(255 & i), i >>>= 8;
        return c;
      }
      function l(i, h, n, c, o, f) {
        var w, E, x = i.file, P = i.compression, S = f !== _.utf8encode, U = r.transformTo("string", f(x.name)), C = r.transformTo("string", _.utf8encode(x.name)), z = x.comment, Z = r.transformTo("string", f(z)), p = r.transformTo("string", _.utf8encode(z)), B = C.length !== x.name.length, e = p.length !== z.length, F = "", V = "", L = "", Q = x.dir, W = x.date, tt = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        h && !n || (tt.crc32 = i.crc32, tt.compressedSize = i.compressedSize, tt.uncompressedSize = i.uncompressedSize);
        var T = 0;
        h && (T |= 8), S || !B && !e || (T |= 2048);
        var I = 0, J = 0;
        Q && (I |= 16), o === "UNIX" ? (J = 798, I |= function(H, st) {
          var ut = H;
          return H || (ut = st ? 16893 : 33204), (65535 & ut) << 16;
        }(x.unixPermissions, Q)) : (J = 20, I |= function(H) {
          return 63 & (H || 0);
        }(x.dosPermissions)), w = W.getUTCHours(), w <<= 6, w |= W.getUTCMinutes(), w <<= 5, w |= W.getUTCSeconds() / 2, E = W.getUTCFullYear() - 1980, E <<= 4, E |= W.getUTCMonth() + 1, E <<= 5, E |= W.getUTCDate(), B && (V = a(1, 1) + a(y(U), 4) + C, F += "up" + a(V.length, 2) + V), e && (L = a(1, 1) + a(y(Z), 4) + p, F += "uc" + a(L.length, 2) + L);
        var $ = "";
        return $ += `
\0`, $ += a(T, 2), $ += P.magic, $ += a(w, 2), $ += a(E, 2), $ += a(tt.crc32, 4), $ += a(tt.compressedSize, 4), $ += a(tt.uncompressedSize, 4), $ += a(U.length, 2), $ += a(F.length, 2), { fileRecord: m.LOCAL_FILE_HEADER + $ + U + F, dirRecord: m.CENTRAL_FILE_HEADER + a(J, 2) + $ + a(Z.length, 2) + "\0\0\0\0" + a(I, 4) + a(c, 4) + U + F + Z };
      }
      var r = g("../utils"), s = g("../stream/GenericWorker"), _ = g("../utf8"), y = g("../crc32"), m = g("../signature");
      function b(i, h, n, c) {
        s.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = h, this.zipPlatform = n, this.encodeFileName = c, this.streamFiles = i, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      r.inherits(b, s), b.prototype.push = function(i) {
        var h = i.meta.percent || 0, n = this.entriesCount, c = this._sources.length;
        this.accumulate ? this.contentBuffer.push(i) : (this.bytesWritten += i.data.length, s.prototype.push.call(this, { data: i.data, meta: { currentFile: this.currentFile, percent: n ? (h + 100 * (n - c - 1)) / n : 100 } }));
      }, b.prototype.openedSource = function(i) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = i.file.name;
        var h = this.streamFiles && !i.file.dir;
        if (h) {
          var n = l(i, h, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: n.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, b.prototype.closedSource = function(i) {
        this.accumulate = !1;
        var h = this.streamFiles && !i.file.dir, n = l(i, h, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(n.dirRecord), h) this.push({ data: function(c) {
          return m.DATA_DESCRIPTOR + a(c.crc32, 4) + a(c.compressedSize, 4) + a(c.uncompressedSize, 4);
        }(i), meta: { percent: 100 } });
        else for (this.push({ data: n.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, b.prototype.flush = function() {
        for (var i = this.bytesWritten, h = 0; h < this.dirRecords.length; h++) this.push({ data: this.dirRecords[h], meta: { percent: 100 } });
        var n = this.bytesWritten - i, c = function(o, f, w, E, x) {
          var P = r.transformTo("string", x(E));
          return m.CENTRAL_DIRECTORY_END + "\0\0\0\0" + a(o, 2) + a(o, 2) + a(f, 4) + a(w, 4) + a(P.length, 2) + P;
        }(this.dirRecords.length, n, i, this.zipComment, this.encodeFileName);
        this.push({ data: c, meta: { percent: 100 } });
      }, b.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, b.prototype.registerPrevious = function(i) {
        this._sources.push(i);
        var h = this;
        return i.on("data", function(n) {
          h.processChunk(n);
        }), i.on("end", function() {
          h.closedSource(h.previous.streamInfo), h._sources.length ? h.prepareNextSource() : h.end();
        }), i.on("error", function(n) {
          h.error(n);
        }), this;
      }, b.prototype.resume = function() {
        return !!s.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, b.prototype.error = function(i) {
        var h = this._sources;
        if (!s.prototype.error.call(this, i)) return !1;
        for (var n = 0; n < h.length; n++) try {
          h[n].error(i);
        } catch {
        }
        return !0;
      }, b.prototype.lock = function() {
        s.prototype.lock.call(this);
        for (var i = this._sources, h = 0; h < i.length; h++) i[h].lock();
      }, A.exports = b;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(g, A, v) {
      var a = g("../compressions"), l = g("./ZipFileWorker");
      v.generateWorker = function(r, s, _) {
        var y = new l(s.streamFiles, _, s.platform, s.encodeFileName), m = 0;
        try {
          r.forEach(function(b, i) {
            m++;
            var h = function(f, w) {
              var E = f || w, x = a[E];
              if (!x) throw new Error(E + " is not a valid compression method !");
              return x;
            }(i.options.compression, s.compression), n = i.options.compressionOptions || s.compressionOptions || {}, c = i.dir, o = i.date;
            i._compressWorker(h, n).withStreamInfo("file", { name: b, dir: c, date: o, comment: i.comment || "", unixPermissions: i.unixPermissions, dosPermissions: i.dosPermissions }).pipe(y);
          }), y.entriesCount = m;
        } catch (b) {
          y.error(b);
        }
        return y;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(g, A, v) {
      function a() {
        if (!(this instanceof a)) return new a();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var l = new a();
          for (var r in this) typeof this[r] != "function" && (l[r] = this[r]);
          return l;
        };
      }
      (a.prototype = g("./object")).loadAsync = g("./load"), a.support = g("./support"), a.defaults = g("./defaults"), a.version = "3.10.1", a.loadAsync = function(l, r) {
        return new a().loadAsync(l, r);
      }, a.external = g("./external"), A.exports = a;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(g, A, v) {
      var a = g("./utils"), l = g("./external"), r = g("./utf8"), s = g("./zipEntries"), _ = g("./stream/Crc32Probe"), y = g("./nodejsUtils");
      function m(b) {
        return new l.Promise(function(i, h) {
          var n = b.decompressed.getContentWorker().pipe(new _());
          n.on("error", function(c) {
            h(c);
          }).on("end", function() {
            n.streamInfo.crc32 !== b.decompressed.crc32 ? h(new Error("Corrupted zip : CRC32 mismatch")) : i();
          }).resume();
        });
      }
      A.exports = function(b, i) {
        var h = this;
        return i = a.extend(i || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: r.utf8decode }), y.isNode && y.isStream(b) ? l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : a.prepareContent("the loaded zip file", b, !0, i.optimizedBinaryString, i.base64).then(function(n) {
          var c = new s(i);
          return c.load(n), c;
        }).then(function(n) {
          var c = [l.Promise.resolve(n)], o = n.files;
          if (i.checkCRC32) for (var f = 0; f < o.length; f++) c.push(m(o[f]));
          return l.Promise.all(c);
        }).then(function(n) {
          for (var c = n.shift(), o = c.files, f = 0; f < o.length; f++) {
            var w = o[f], E = w.fileNameStr, x = a.resolve(w.fileNameStr);
            h.file(x, w.decompressed, { binary: !0, optimizedBinaryString: !0, date: w.date, dir: w.dir, comment: w.fileCommentStr.length ? w.fileCommentStr : null, unixPermissions: w.unixPermissions, dosPermissions: w.dosPermissions, createFolders: i.createFolders }), w.dir || (h.file(x).unsafeOriginalName = E);
          }
          return c.zipComment.length && (h.comment = c.zipComment), h;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(g, A, v) {
      var a = g("../utils"), l = g("../stream/GenericWorker");
      function r(s, _) {
        l.call(this, "Nodejs stream input adapter for " + s), this._upstreamEnded = !1, this._bindStream(_);
      }
      a.inherits(r, l), r.prototype._bindStream = function(s) {
        var _ = this;
        (this._stream = s).pause(), s.on("data", function(y) {
          _.push({ data: y, meta: { percent: 0 } });
        }).on("error", function(y) {
          _.isPaused ? this.generatedError = y : _.error(y);
        }).on("end", function() {
          _.isPaused ? _._upstreamEnded = !0 : _.end();
        });
      }, r.prototype.pause = function() {
        return !!l.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, r.prototype.resume = function() {
        return !!l.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, A.exports = r;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(g, A, v) {
      var a = g("readable-stream").Readable;
      function l(r, s, _) {
        a.call(this, s), this._helper = r;
        var y = this;
        r.on("data", function(m, b) {
          y.push(m) || y._helper.pause(), _ && _(b);
        }).on("error", function(m) {
          y.emit("error", m);
        }).on("end", function() {
          y.push(null);
        });
      }
      g("../utils").inherits(l, a), l.prototype._read = function() {
        this._helper.resume();
      }, A.exports = l;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(g, A, v) {
      A.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(a, l) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(a, l);
        if (typeof a == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(a, l);
      }, allocBuffer: function(a) {
        if (Buffer.alloc) return Buffer.alloc(a);
        var l = new Buffer(a);
        return l.fill(0), l;
      }, isBuffer: function(a) {
        return Buffer.isBuffer(a);
      }, isStream: function(a) {
        return a && typeof a.on == "function" && typeof a.pause == "function" && typeof a.resume == "function";
      } };
    }, {}], 15: [function(g, A, v) {
      function a(x, P, S) {
        var U, C = r.getTypeOf(P), z = r.extend(S || {}, y);
        z.date = z.date || /* @__PURE__ */ new Date(), z.compression !== null && (z.compression = z.compression.toUpperCase()), typeof z.unixPermissions == "string" && (z.unixPermissions = parseInt(z.unixPermissions, 8)), z.unixPermissions && 16384 & z.unixPermissions && (z.dir = !0), z.dosPermissions && 16 & z.dosPermissions && (z.dir = !0), z.dir && (x = o(x)), z.createFolders && (U = c(x)) && f.call(this, U, !0);
        var Z = C === "string" && z.binary === !1 && z.base64 === !1;
        S && S.binary !== void 0 || (z.binary = !Z), (P instanceof m && P.uncompressedSize === 0 || z.dir || !P || P.length === 0) && (z.base64 = !1, z.binary = !0, P = "", z.compression = "STORE", C = "string");
        var p = null;
        p = P instanceof m || P instanceof s ? P : h.isNode && h.isStream(P) ? new n(x, P) : r.prepareContent(x, P, z.binary, z.optimizedBinaryString, z.base64);
        var B = new b(x, p, z);
        this.files[x] = B;
      }
      var l = g("./utf8"), r = g("./utils"), s = g("./stream/GenericWorker"), _ = g("./stream/StreamHelper"), y = g("./defaults"), m = g("./compressedObject"), b = g("./zipObject"), i = g("./generate"), h = g("./nodejsUtils"), n = g("./nodejs/NodejsStreamInputAdapter"), c = function(x) {
        x.slice(-1) === "/" && (x = x.substring(0, x.length - 1));
        var P = x.lastIndexOf("/");
        return 0 < P ? x.substring(0, P) : "";
      }, o = function(x) {
        return x.slice(-1) !== "/" && (x += "/"), x;
      }, f = function(x, P) {
        return P = P !== void 0 ? P : y.createFolders, x = o(x), this.files[x] || a.call(this, x, null, { dir: !0, createFolders: P }), this.files[x];
      };
      function w(x) {
        return Object.prototype.toString.call(x) === "[object RegExp]";
      }
      var E = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(x) {
        var P, S, U;
        for (P in this.files) U = this.files[P], (S = P.slice(this.root.length, P.length)) && P.slice(0, this.root.length) === this.root && x(S, U);
      }, filter: function(x) {
        var P = [];
        return this.forEach(function(S, U) {
          x(S, U) && P.push(U);
        }), P;
      }, file: function(x, P, S) {
        if (arguments.length !== 1) return x = this.root + x, a.call(this, x, P, S), this;
        if (w(x)) {
          var U = x;
          return this.filter(function(z, Z) {
            return !Z.dir && U.test(z);
          });
        }
        var C = this.files[this.root + x];
        return C && !C.dir ? C : null;
      }, folder: function(x) {
        if (!x) return this;
        if (w(x)) return this.filter(function(C, z) {
          return z.dir && x.test(C);
        });
        var P = this.root + x, S = f.call(this, P), U = this.clone();
        return U.root = S.name, U;
      }, remove: function(x) {
        x = this.root + x;
        var P = this.files[x];
        if (P || (x.slice(-1) !== "/" && (x += "/"), P = this.files[x]), P && !P.dir) delete this.files[x];
        else for (var S = this.filter(function(C, z) {
          return z.name.slice(0, x.length) === x;
        }), U = 0; U < S.length; U++) delete this.files[S[U].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(x) {
        var P, S = {};
        try {
          if ((S = r.extend(x || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: l.utf8encode })).type = S.type.toLowerCase(), S.compression = S.compression.toUpperCase(), S.type === "binarystring" && (S.type = "string"), !S.type) throw new Error("No output type specified.");
          r.checkSupport(S.type), S.platform !== "darwin" && S.platform !== "freebsd" && S.platform !== "linux" && S.platform !== "sunos" || (S.platform = "UNIX"), S.platform === "win32" && (S.platform = "DOS");
          var U = S.comment || this.comment || "";
          P = i.generateWorker(this, S, U);
        } catch (C) {
          (P = new s("error")).error(C);
        }
        return new _(P, S.type || "string", S.mimeType);
      }, generateAsync: function(x, P) {
        return this.generateInternalStream(x).accumulate(P);
      }, generateNodeStream: function(x, P) {
        return (x = x || {}).type || (x.type = "nodebuffer"), this.generateInternalStream(x).toNodejsStream(P);
      } };
      A.exports = E;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(g, A, v) {
      A.exports = g("stream");
    }, { stream: void 0 }], 17: [function(g, A, v) {
      var a = g("./DataReader");
      function l(r) {
        a.call(this, r);
        for (var s = 0; s < this.data.length; s++) r[s] = 255 & r[s];
      }
      g("../utils").inherits(l, a), l.prototype.byteAt = function(r) {
        return this.data[this.zero + r];
      }, l.prototype.lastIndexOfSignature = function(r) {
        for (var s = r.charCodeAt(0), _ = r.charCodeAt(1), y = r.charCodeAt(2), m = r.charCodeAt(3), b = this.length - 4; 0 <= b; --b) if (this.data[b] === s && this.data[b + 1] === _ && this.data[b + 2] === y && this.data[b + 3] === m) return b - this.zero;
        return -1;
      }, l.prototype.readAndCheckSignature = function(r) {
        var s = r.charCodeAt(0), _ = r.charCodeAt(1), y = r.charCodeAt(2), m = r.charCodeAt(3), b = this.readData(4);
        return s === b[0] && _ === b[1] && y === b[2] && m === b[3];
      }, l.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return [];
        var s = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, s;
      }, A.exports = l;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(g, A, v) {
      var a = g("../utils");
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
        var s, _ = 0;
        for (this.checkOffset(r), s = this.index + r - 1; s >= this.index; s--) _ = (_ << 8) + this.byteAt(s);
        return this.index += r, _;
      }, readString: function(r) {
        return a.transformTo("string", this.readData(r));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var r = this.readInt(4);
        return new Date(Date.UTC(1980 + (r >> 25 & 127), (r >> 21 & 15) - 1, r >> 16 & 31, r >> 11 & 31, r >> 5 & 63, (31 & r) << 1));
      } }, A.exports = l;
    }, { "../utils": 32 }], 19: [function(g, A, v) {
      var a = g("./Uint8ArrayReader");
      function l(r) {
        a.call(this, r);
      }
      g("../utils").inherits(l, a), l.prototype.readData = function(r) {
        this.checkOffset(r);
        var s = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, s;
      }, A.exports = l;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(g, A, v) {
      var a = g("./DataReader");
      function l(r) {
        a.call(this, r);
      }
      g("../utils").inherits(l, a), l.prototype.byteAt = function(r) {
        return this.data.charCodeAt(this.zero + r);
      }, l.prototype.lastIndexOfSignature = function(r) {
        return this.data.lastIndexOf(r) - this.zero;
      }, l.prototype.readAndCheckSignature = function(r) {
        return r === this.readData(4);
      }, l.prototype.readData = function(r) {
        this.checkOffset(r);
        var s = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, s;
      }, A.exports = l;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(g, A, v) {
      var a = g("./ArrayReader");
      function l(r) {
        a.call(this, r);
      }
      g("../utils").inherits(l, a), l.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return new Uint8Array(0);
        var s = this.data.subarray(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, s;
      }, A.exports = l;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(g, A, v) {
      var a = g("../utils"), l = g("../support"), r = g("./ArrayReader"), s = g("./StringReader"), _ = g("./NodeBufferReader"), y = g("./Uint8ArrayReader");
      A.exports = function(m) {
        var b = a.getTypeOf(m);
        return a.checkSupport(b), b !== "string" || l.uint8array ? b === "nodebuffer" ? new _(m) : l.uint8array ? new y(a.transformTo("uint8array", m)) : new r(a.transformTo("array", m)) : new s(m);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(g, A, v) {
      v.LOCAL_FILE_HEADER = "PK", v.CENTRAL_FILE_HEADER = "PK", v.CENTRAL_DIRECTORY_END = "PK", v.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", v.ZIP64_CENTRAL_DIRECTORY_END = "PK", v.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(g, A, v) {
      var a = g("./GenericWorker"), l = g("../utils");
      function r(s) {
        a.call(this, "ConvertWorker to " + s), this.destType = s;
      }
      l.inherits(r, a), r.prototype.processChunk = function(s) {
        this.push({ data: l.transformTo(this.destType, s.data), meta: s.meta });
      }, A.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(g, A, v) {
      var a = g("./GenericWorker"), l = g("../crc32");
      function r() {
        a.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      g("../utils").inherits(r, a), r.prototype.processChunk = function(s) {
        this.streamInfo.crc32 = l(s.data, this.streamInfo.crc32 || 0), this.push(s);
      }, A.exports = r;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(g, A, v) {
      var a = g("../utils"), l = g("./GenericWorker");
      function r(s) {
        l.call(this, "DataLengthProbe for " + s), this.propName = s, this.withStreamInfo(s, 0);
      }
      a.inherits(r, l), r.prototype.processChunk = function(s) {
        if (s) {
          var _ = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = _ + s.data.length;
        }
        l.prototype.processChunk.call(this, s);
      }, A.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(g, A, v) {
      var a = g("../utils"), l = g("./GenericWorker");
      function r(s) {
        l.call(this, "DataWorker");
        var _ = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, s.then(function(y) {
          _.dataIsReady = !0, _.data = y, _.max = y && y.length || 0, _.type = a.getTypeOf(y), _.isPaused || _._tickAndRepeat();
        }, function(y) {
          _.error(y);
        });
      }
      a.inherits(r, l), r.prototype.cleanUp = function() {
        l.prototype.cleanUp.call(this), this.data = null;
      }, r.prototype.resume = function() {
        return !!l.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, a.delay(this._tickAndRepeat, [], this)), !0);
      }, r.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (a.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, r.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return !1;
        var s = null, _ = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            s = this.data.substring(this.index, _);
            break;
          case "uint8array":
            s = this.data.subarray(this.index, _);
            break;
          case "array":
          case "nodebuffer":
            s = this.data.slice(this.index, _);
        }
        return this.index = _, this.push({ data: s, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, A.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(g, A, v) {
      function a(l) {
        this.name = l || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      a.prototype = { push: function(l) {
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
        if (this._listeners[l]) for (var s = 0; s < this._listeners[l].length; s++) this._listeners[l][s].call(this, r);
      }, pipe: function(l) {
        return l.registerPrevious(this);
      }, registerPrevious: function(l) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = l.streamInfo, this.mergeStreamInfo(), this.previous = l;
        var r = this;
        return l.on("data", function(s) {
          r.processChunk(s);
        }), l.on("end", function() {
          r.end();
        }), l.on("error", function(s) {
          r.error(s);
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
      } }, A.exports = a;
    }, {}], 29: [function(g, A, v) {
      var a = g("../utils"), l = g("./ConvertWorker"), r = g("./GenericWorker"), s = g("../base64"), _ = g("../support"), y = g("../external"), m = null;
      if (_.nodestream) try {
        m = g("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function b(h, n) {
        return new y.Promise(function(c, o) {
          var f = [], w = h._internalType, E = h._outputType, x = h._mimeType;
          h.on("data", function(P, S) {
            f.push(P), n && n(S);
          }).on("error", function(P) {
            f = [], o(P);
          }).on("end", function() {
            try {
              var P = function(S, U, C) {
                switch (S) {
                  case "blob":
                    return a.newBlob(a.transformTo("arraybuffer", U), C);
                  case "base64":
                    return s.encode(U);
                  default:
                    return a.transformTo(S, U);
                }
              }(E, function(S, U) {
                var C, z = 0, Z = null, p = 0;
                for (C = 0; C < U.length; C++) p += U[C].length;
                switch (S) {
                  case "string":
                    return U.join("");
                  case "array":
                    return Array.prototype.concat.apply([], U);
                  case "uint8array":
                    for (Z = new Uint8Array(p), C = 0; C < U.length; C++) Z.set(U[C], z), z += U[C].length;
                    return Z;
                  case "nodebuffer":
                    return Buffer.concat(U);
                  default:
                    throw new Error("concat : unsupported type '" + S + "'");
                }
              }(w, f), x);
              c(P);
            } catch (S) {
              o(S);
            }
            f = [];
          }).resume();
        });
      }
      function i(h, n, c) {
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
          this._internalType = o, this._outputType = n, this._mimeType = c, a.checkSupport(o), this._worker = h.pipe(new l(o)), h.lock();
        } catch (f) {
          this._worker = new r("error"), this._worker.error(f);
        }
      }
      i.prototype = { accumulate: function(h) {
        return b(this, h);
      }, on: function(h, n) {
        var c = this;
        return h === "data" ? this._worker.on(h, function(o) {
          n.call(c, o.data, o.meta);
        }) : this._worker.on(h, function() {
          a.delay(n, arguments, c);
        }), this;
      }, resume: function() {
        return a.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(h) {
        if (a.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new m(this, { objectMode: this._outputType !== "nodebuffer" }, h);
      } }, A.exports = i;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(g, A, v) {
      if (v.base64 = !0, v.array = !0, v.string = !0, v.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", v.nodebuffer = typeof Buffer < "u", v.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") v.blob = !1;
      else {
        var a = new ArrayBuffer(0);
        try {
          v.blob = new Blob([a], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var l = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            l.append(a), v.blob = l.getBlob("application/zip").size === 0;
          } catch {
            v.blob = !1;
          }
        }
      }
      try {
        v.nodestream = !!g("readable-stream").Readable;
      } catch {
        v.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(g, A, v) {
      for (var a = g("./utils"), l = g("./support"), r = g("./nodejsUtils"), s = g("./stream/GenericWorker"), _ = new Array(256), y = 0; y < 256; y++) _[y] = 252 <= y ? 6 : 248 <= y ? 5 : 240 <= y ? 4 : 224 <= y ? 3 : 192 <= y ? 2 : 1;
      _[254] = _[254] = 1;
      function m() {
        s.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function b() {
        s.call(this, "utf-8 encode");
      }
      v.utf8encode = function(i) {
        return l.nodebuffer ? r.newBufferFrom(i, "utf-8") : function(h) {
          var n, c, o, f, w, E = h.length, x = 0;
          for (f = 0; f < E; f++) (64512 & (c = h.charCodeAt(f))) == 55296 && f + 1 < E && (64512 & (o = h.charCodeAt(f + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (o - 56320), f++), x += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
          for (n = l.uint8array ? new Uint8Array(x) : new Array(x), f = w = 0; w < x; f++) (64512 & (c = h.charCodeAt(f))) == 55296 && f + 1 < E && (64512 & (o = h.charCodeAt(f + 1))) == 56320 && (c = 65536 + (c - 55296 << 10) + (o - 56320), f++), c < 128 ? n[w++] = c : (c < 2048 ? n[w++] = 192 | c >>> 6 : (c < 65536 ? n[w++] = 224 | c >>> 12 : (n[w++] = 240 | c >>> 18, n[w++] = 128 | c >>> 12 & 63), n[w++] = 128 | c >>> 6 & 63), n[w++] = 128 | 63 & c);
          return n;
        }(i);
      }, v.utf8decode = function(i) {
        return l.nodebuffer ? a.transformTo("nodebuffer", i).toString("utf-8") : function(h) {
          var n, c, o, f, w = h.length, E = new Array(2 * w);
          for (n = c = 0; n < w; ) if ((o = h[n++]) < 128) E[c++] = o;
          else if (4 < (f = _[o])) E[c++] = 65533, n += f - 1;
          else {
            for (o &= f === 2 ? 31 : f === 3 ? 15 : 7; 1 < f && n < w; ) o = o << 6 | 63 & h[n++], f--;
            1 < f ? E[c++] = 65533 : o < 65536 ? E[c++] = o : (o -= 65536, E[c++] = 55296 | o >> 10 & 1023, E[c++] = 56320 | 1023 & o);
          }
          return E.length !== c && (E.subarray ? E = E.subarray(0, c) : E.length = c), a.applyFromCharCode(E);
        }(i = a.transformTo(l.uint8array ? "uint8array" : "array", i));
      }, a.inherits(m, s), m.prototype.processChunk = function(i) {
        var h = a.transformTo(l.uint8array ? "uint8array" : "array", i.data);
        if (this.leftOver && this.leftOver.length) {
          if (l.uint8array) {
            var n = h;
            (h = new Uint8Array(n.length + this.leftOver.length)).set(this.leftOver, 0), h.set(n, this.leftOver.length);
          } else h = this.leftOver.concat(h);
          this.leftOver = null;
        }
        var c = function(f, w) {
          var E;
          for ((w = w || f.length) > f.length && (w = f.length), E = w - 1; 0 <= E && (192 & f[E]) == 128; ) E--;
          return E < 0 || E === 0 ? w : E + _[f[E]] > w ? E : w;
        }(h), o = h;
        c !== h.length && (l.uint8array ? (o = h.subarray(0, c), this.leftOver = h.subarray(c, h.length)) : (o = h.slice(0, c), this.leftOver = h.slice(c, h.length))), this.push({ data: v.utf8decode(o), meta: i.meta });
      }, m.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: v.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, v.Utf8DecodeWorker = m, a.inherits(b, s), b.prototype.processChunk = function(i) {
        this.push({ data: v.utf8encode(i.data), meta: i.meta });
      }, v.Utf8EncodeWorker = b;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(g, A, v) {
      var a = g("./support"), l = g("./base64"), r = g("./nodejsUtils"), s = g("./external");
      function _(n) {
        return n;
      }
      function y(n, c) {
        for (var o = 0; o < n.length; ++o) c[o] = 255 & n.charCodeAt(o);
        return c;
      }
      g("setimmediate"), v.newBlob = function(n, c) {
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
      var m = { stringifyByChunk: function(n, c, o) {
        var f = [], w = 0, E = n.length;
        if (E <= o) return String.fromCharCode.apply(null, n);
        for (; w < E; ) c === "array" || c === "nodebuffer" ? f.push(String.fromCharCode.apply(null, n.slice(w, Math.min(w + o, E)))) : f.push(String.fromCharCode.apply(null, n.subarray(w, Math.min(w + o, E)))), w += o;
        return f.join("");
      }, stringifyByChar: function(n) {
        for (var c = "", o = 0; o < n.length; o++) c += String.fromCharCode(n[o]);
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
        var c = 65536, o = v.getTypeOf(n), f = !0;
        if (o === "uint8array" ? f = m.applyCanBeUsed.uint8array : o === "nodebuffer" && (f = m.applyCanBeUsed.nodebuffer), f) for (; 1 < c; ) try {
          return m.stringifyByChunk(n, o, c);
        } catch {
          c = Math.floor(c / 2);
        }
        return m.stringifyByChar(n);
      }
      function i(n, c) {
        for (var o = 0; o < n.length; o++) c[o] = n[o];
        return c;
      }
      v.applyFromCharCode = b;
      var h = {};
      h.string = { string: _, array: function(n) {
        return y(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return h.string.uint8array(n).buffer;
      }, uint8array: function(n) {
        return y(n, new Uint8Array(n.length));
      }, nodebuffer: function(n) {
        return y(n, r.allocBuffer(n.length));
      } }, h.array = { string: b, array: _, arraybuffer: function(n) {
        return new Uint8Array(n).buffer;
      }, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, h.arraybuffer = { string: function(n) {
        return b(new Uint8Array(n));
      }, array: function(n) {
        return i(new Uint8Array(n), new Array(n.byteLength));
      }, arraybuffer: _, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(new Uint8Array(n));
      } }, h.uint8array = { string: b, array: function(n) {
        return i(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return n.buffer;
      }, uint8array: _, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, h.nodebuffer = { string: b, array: function(n) {
        return i(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return h.nodebuffer.uint8array(n).buffer;
      }, uint8array: function(n) {
        return i(n, new Uint8Array(n.length));
      }, nodebuffer: _ }, v.transformTo = function(n, c) {
        if (c = c || "", !n) return c;
        v.checkSupport(n);
        var o = v.getTypeOf(c);
        return h[o][n](c);
      }, v.resolve = function(n) {
        for (var c = n.split("/"), o = [], f = 0; f < c.length; f++) {
          var w = c[f];
          w === "." || w === "" && f !== 0 && f !== c.length - 1 || (w === ".." ? o.pop() : o.push(w));
        }
        return o.join("/");
      }, v.getTypeOf = function(n) {
        return typeof n == "string" ? "string" : Object.prototype.toString.call(n) === "[object Array]" ? "array" : a.nodebuffer && r.isBuffer(n) ? "nodebuffer" : a.uint8array && n instanceof Uint8Array ? "uint8array" : a.arraybuffer && n instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, v.checkSupport = function(n) {
        if (!a[n.toLowerCase()]) throw new Error(n + " is not supported by this platform");
      }, v.MAX_VALUE_16BITS = 65535, v.MAX_VALUE_32BITS = -1, v.pretty = function(n) {
        var c, o, f = "";
        for (o = 0; o < (n || "").length; o++) f += "\\x" + ((c = n.charCodeAt(o)) < 16 ? "0" : "") + c.toString(16).toUpperCase();
        return f;
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
      }, v.prepareContent = function(n, c, o, f, w) {
        return s.Promise.resolve(c).then(function(E) {
          return a.blob && (E instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(E)) !== -1) && typeof FileReader < "u" ? new s.Promise(function(x, P) {
            var S = new FileReader();
            S.onload = function(U) {
              x(U.target.result);
            }, S.onerror = function(U) {
              P(U.target.error);
            }, S.readAsArrayBuffer(E);
          }) : E;
        }).then(function(E) {
          var x = v.getTypeOf(E);
          return x ? (x === "arraybuffer" ? E = v.transformTo("uint8array", E) : x === "string" && (w ? E = l.decode(E) : o && f !== !0 && (E = function(P) {
            return y(P, a.uint8array ? new Uint8Array(P.length) : new Array(P.length));
          }(E))), E) : s.Promise.reject(new Error("Can't read the data of '" + n + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(g, A, v) {
      var a = g("./reader/readerFor"), l = g("./utils"), r = g("./signature"), s = g("./zipEntry"), _ = g("./support");
      function y(m) {
        this.files = [], this.loadOptions = m;
      }
      y.prototype = { checkSignature: function(m) {
        if (!this.reader.readAndCheckSignature(m)) {
          this.reader.index -= 4;
          var b = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + l.pretty(b) + ", expected " + l.pretty(m) + ")");
        }
      }, isSignature: function(m, b) {
        var i = this.reader.index;
        this.reader.setIndex(m);
        var h = this.reader.readString(4) === b;
        return this.reader.setIndex(i), h;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var m = this.reader.readData(this.zipCommentLength), b = _.uint8array ? "uint8array" : "array", i = l.transformTo(b, m);
        this.zipComment = this.loadOptions.decodeFileName(i);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var m, b, i, h = this.zip64EndOfCentralSize - 44; 0 < h; ) m = this.reader.readInt(2), b = this.reader.readInt(4), i = this.reader.readData(b), this.zip64ExtensibleData[m] = { id: m, length: b, value: i };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var m, b;
        for (m = 0; m < this.files.length; m++) b = this.files[m], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(r.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8(), b.processAttributes();
      }, readCentralDir: function() {
        var m;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER); ) (m = new s({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(m);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var m = this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);
        if (m < 0) throw this.isSignature(0, r.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(m);
        var b = m;
        if (this.checkSignature(r.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === l.MAX_VALUE_16BITS || this.diskWithCentralDirStart === l.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === l.MAX_VALUE_16BITS || this.centralDirRecords === l.MAX_VALUE_16BITS || this.centralDirSize === l.MAX_VALUE_32BITS || this.centralDirOffset === l.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (m = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(m), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, r.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var i = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (i += 20, i += 12 + this.zip64EndOfCentralSize);
        var h = b - i;
        if (0 < h) this.isSignature(b, r.CENTRAL_FILE_HEADER) || (this.reader.zero = h);
        else if (h < 0) throw new Error("Corrupted zip: missing " + Math.abs(h) + " bytes.");
      }, prepareReader: function(m) {
        this.reader = a(m);
      }, load: function(m) {
        this.prepareReader(m), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, A.exports = y;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(g, A, v) {
      var a = g("./reader/readerFor"), l = g("./utils"), r = g("./compressedObject"), s = g("./crc32"), _ = g("./utf8"), y = g("./compressions"), m = g("./support");
      function b(i, h) {
        this.options = i, this.loadOptions = h;
      }
      b.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(i) {
        var h, n;
        if (i.skip(22), this.fileNameLength = i.readInt(2), n = i.readInt(2), this.fileName = i.readData(this.fileNameLength), i.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((h = function(c) {
          for (var o in y) if (Object.prototype.hasOwnProperty.call(y, o) && y[o].magic === c) return y[o];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + l.pretty(this.compressionMethod) + " unknown (inner file : " + l.transformTo("string", this.fileName) + ")");
        this.decompressed = new r(this.compressedSize, this.uncompressedSize, this.crc32, h, i.readData(this.compressedSize));
      }, readCentralPart: function(i) {
        this.versionMadeBy = i.readInt(2), i.skip(2), this.bitFlag = i.readInt(2), this.compressionMethod = i.readString(2), this.date = i.readDate(), this.crc32 = i.readInt(4), this.compressedSize = i.readInt(4), this.uncompressedSize = i.readInt(4);
        var h = i.readInt(2);
        if (this.extraFieldsLength = i.readInt(2), this.fileCommentLength = i.readInt(2), this.diskNumberStart = i.readInt(2), this.internalFileAttributes = i.readInt(2), this.externalFileAttributes = i.readInt(4), this.localHeaderOffset = i.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        i.skip(h), this.readExtraFields(i), this.parseZIP64ExtraField(i), this.fileComment = i.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var i = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), i == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), i == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var i = a(this.extraFields[1].value);
          this.uncompressedSize === l.MAX_VALUE_32BITS && (this.uncompressedSize = i.readInt(8)), this.compressedSize === l.MAX_VALUE_32BITS && (this.compressedSize = i.readInt(8)), this.localHeaderOffset === l.MAX_VALUE_32BITS && (this.localHeaderOffset = i.readInt(8)), this.diskNumberStart === l.MAX_VALUE_32BITS && (this.diskNumberStart = i.readInt(4));
        }
      }, readExtraFields: function(i) {
        var h, n, c, o = i.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); i.index + 4 < o; ) h = i.readInt(2), n = i.readInt(2), c = i.readData(n), this.extraFields[h] = { id: h, length: n, value: c };
        i.setIndex(o);
      }, handleUTF8: function() {
        var i = m.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = _.utf8decode(this.fileName), this.fileCommentStr = _.utf8decode(this.fileComment);
        else {
          var h = this.findExtraFieldUnicodePath();
          if (h !== null) this.fileNameStr = h;
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
          var h = a(i.value);
          return h.readInt(1) !== 1 || s(this.fileName) !== h.readInt(4) ? null : _.utf8decode(h.readData(i.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var i = this.extraFields[25461];
        if (i) {
          var h = a(i.value);
          return h.readInt(1) !== 1 || s(this.fileComment) !== h.readInt(4) ? null : _.utf8decode(h.readData(i.length - 5));
        }
        return null;
      } }, A.exports = b;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(g, A, v) {
      function a(h, n, c) {
        this.name = h, this.dir = c.dir, this.date = c.date, this.comment = c.comment, this.unixPermissions = c.unixPermissions, this.dosPermissions = c.dosPermissions, this._data = n, this._dataBinary = c.binary, this.options = { compression: c.compression, compressionOptions: c.compressionOptions };
      }
      var l = g("./stream/StreamHelper"), r = g("./stream/DataWorker"), s = g("./utf8"), _ = g("./compressedObject"), y = g("./stream/GenericWorker");
      a.prototype = { internalStream: function(h) {
        var n = null, c = "string";
        try {
          if (!h) throw new Error("No output type specified.");
          var o = (c = h.toLowerCase()) === "string" || c === "text";
          c !== "binarystring" && c !== "text" || (c = "string"), n = this._decompressWorker();
          var f = !this._dataBinary;
          f && !o && (n = n.pipe(new s.Utf8EncodeWorker())), !f && o && (n = n.pipe(new s.Utf8DecodeWorker()));
        } catch (w) {
          (n = new y("error")).error(w);
        }
        return new l(n, c, "");
      }, async: function(h, n) {
        return this.internalStream(h).accumulate(n);
      }, nodeStream: function(h, n) {
        return this.internalStream(h || "nodebuffer").toNodejsStream(n);
      }, _compressWorker: function(h, n) {
        if (this._data instanceof _ && this._data.compression.magic === h.magic) return this._data.getCompressedWorker();
        var c = this._decompressWorker();
        return this._dataBinary || (c = c.pipe(new s.Utf8EncodeWorker())), _.createWorkerFrom(c, h, n);
      }, _decompressWorker: function() {
        return this._data instanceof _ ? this._data.getContentWorker() : this._data instanceof y ? this._data : new r(this._data);
      } };
      for (var m = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], b = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, i = 0; i < m.length; i++) a.prototype[m[i]] = b;
      A.exports = a;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(g, A, v) {
      (function(a) {
        var l, r, s = a.MutationObserver || a.WebKitMutationObserver;
        if (s) {
          var _ = 0, y = new s(h), m = a.document.createTextNode("");
          y.observe(m, { characterData: !0 }), l = function() {
            m.data = _ = ++_ % 2;
          };
        } else if (a.setImmediate || a.MessageChannel === void 0) l = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function() {
          var n = a.document.createElement("script");
          n.onreadystatechange = function() {
            h(), n.onreadystatechange = null, n.parentNode.removeChild(n), n = null;
          }, a.document.documentElement.appendChild(n);
        } : function() {
          setTimeout(h, 0);
        };
        else {
          var b = new a.MessageChannel();
          b.port1.onmessage = h, l = function() {
            b.port2.postMessage(0);
          };
        }
        var i = [];
        function h() {
          var n, c;
          r = !0;
          for (var o = i.length; o; ) {
            for (c = i, i = [], n = -1; ++n < o; ) c[n]();
            o = i.length;
          }
          r = !1;
        }
        A.exports = function(n) {
          i.push(n) !== 1 || r || l();
        };
      }).call(this, typeof At < "u" ? At : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(g, A, v) {
      var a = g("immediate");
      function l() {
      }
      var r = {}, s = ["REJECTED"], _ = ["FULFILLED"], y = ["PENDING"];
      function m(o) {
        if (typeof o != "function") throw new TypeError("resolver must be a function");
        this.state = y, this.queue = [], this.outcome = void 0, o !== l && n(this, o);
      }
      function b(o, f, w) {
        this.promise = o, typeof f == "function" && (this.onFulfilled = f, this.callFulfilled = this.otherCallFulfilled), typeof w == "function" && (this.onRejected = w, this.callRejected = this.otherCallRejected);
      }
      function i(o, f, w) {
        a(function() {
          var E;
          try {
            E = f(w);
          } catch (x) {
            return r.reject(o, x);
          }
          E === o ? r.reject(o, new TypeError("Cannot resolve promise with itself")) : r.resolve(o, E);
        });
      }
      function h(o) {
        var f = o && o.then;
        if (o && (typeof o == "object" || typeof o == "function") && typeof f == "function") return function() {
          f.apply(o, arguments);
        };
      }
      function n(o, f) {
        var w = !1;
        function E(S) {
          w || (w = !0, r.reject(o, S));
        }
        function x(S) {
          w || (w = !0, r.resolve(o, S));
        }
        var P = c(function() {
          f(x, E);
        });
        P.status === "error" && E(P.value);
      }
      function c(o, f) {
        var w = {};
        try {
          w.value = o(f), w.status = "success";
        } catch (E) {
          w.status = "error", w.value = E;
        }
        return w;
      }
      (A.exports = m).prototype.finally = function(o) {
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
      }, m.prototype.catch = function(o) {
        return this.then(null, o);
      }, m.prototype.then = function(o, f) {
        if (typeof o != "function" && this.state === _ || typeof f != "function" && this.state === s) return this;
        var w = new this.constructor(l);
        return this.state !== y ? i(w, this.state === _ ? o : f, this.outcome) : this.queue.push(new b(w, o, f)), w;
      }, b.prototype.callFulfilled = function(o) {
        r.resolve(this.promise, o);
      }, b.prototype.otherCallFulfilled = function(o) {
        i(this.promise, this.onFulfilled, o);
      }, b.prototype.callRejected = function(o) {
        r.reject(this.promise, o);
      }, b.prototype.otherCallRejected = function(o) {
        i(this.promise, this.onRejected, o);
      }, r.resolve = function(o, f) {
        var w = c(h, f);
        if (w.status === "error") return r.reject(o, w.value);
        var E = w.value;
        if (E) n(o, E);
        else {
          o.state = _, o.outcome = f;
          for (var x = -1, P = o.queue.length; ++x < P; ) o.queue[x].callFulfilled(f);
        }
        return o;
      }, r.reject = function(o, f) {
        o.state = s, o.outcome = f;
        for (var w = -1, E = o.queue.length; ++w < E; ) o.queue[w].callRejected(f);
        return o;
      }, m.resolve = function(o) {
        return o instanceof this ? o : r.resolve(new this(l), o);
      }, m.reject = function(o) {
        var f = new this(l);
        return r.reject(f, o);
      }, m.all = function(o) {
        var f = this;
        if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var w = o.length, E = !1;
        if (!w) return this.resolve([]);
        for (var x = new Array(w), P = 0, S = -1, U = new this(l); ++S < w; ) C(o[S], S);
        return U;
        function C(z, Z) {
          f.resolve(z).then(function(p) {
            x[Z] = p, ++P !== w || E || (E = !0, r.resolve(U, x));
          }, function(p) {
            E || (E = !0, r.reject(U, p));
          });
        }
      }, m.race = function(o) {
        var f = this;
        if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var w = o.length, E = !1;
        if (!w) return this.resolve([]);
        for (var x = -1, P = new this(l); ++x < w; ) S = o[x], f.resolve(S).then(function(U) {
          E || (E = !0, r.resolve(P, U));
        }, function(U) {
          E || (E = !0, r.reject(P, U));
        });
        var S;
        return P;
      };
    }, { immediate: 36 }], 38: [function(g, A, v) {
      var a = {};
      (0, g("./lib/utils/common").assign)(a, g("./lib/deflate"), g("./lib/inflate"), g("./lib/zlib/constants")), A.exports = a;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(g, A, v) {
      var a = g("./zlib/deflate"), l = g("./utils/common"), r = g("./utils/strings"), s = g("./zlib/messages"), _ = g("./zlib/zstream"), y = Object.prototype.toString, m = 0, b = -1, i = 0, h = 8;
      function n(o) {
        if (!(this instanceof n)) return new n(o);
        this.options = l.assign({ level: b, method: h, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: i, to: "" }, o || {});
        var f = this.options;
        f.raw && 0 < f.windowBits ? f.windowBits = -f.windowBits : f.gzip && 0 < f.windowBits && f.windowBits < 16 && (f.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new _(), this.strm.avail_out = 0;
        var w = a.deflateInit2(this.strm, f.level, f.method, f.windowBits, f.memLevel, f.strategy);
        if (w !== m) throw new Error(s[w]);
        if (f.header && a.deflateSetHeader(this.strm, f.header), f.dictionary) {
          var E;
          if (E = typeof f.dictionary == "string" ? r.string2buf(f.dictionary) : y.call(f.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(f.dictionary) : f.dictionary, (w = a.deflateSetDictionary(this.strm, E)) !== m) throw new Error(s[w]);
          this._dict_set = !0;
        }
      }
      function c(o, f) {
        var w = new n(f);
        if (w.push(o, !0), w.err) throw w.msg || s[w.err];
        return w.result;
      }
      n.prototype.push = function(o, f) {
        var w, E, x = this.strm, P = this.options.chunkSize;
        if (this.ended) return !1;
        E = f === ~~f ? f : f === !0 ? 4 : 0, typeof o == "string" ? x.input = r.string2buf(o) : y.call(o) === "[object ArrayBuffer]" ? x.input = new Uint8Array(o) : x.input = o, x.next_in = 0, x.avail_in = x.input.length;
        do {
          if (x.avail_out === 0 && (x.output = new l.Buf8(P), x.next_out = 0, x.avail_out = P), (w = a.deflate(x, E)) !== 1 && w !== m) return this.onEnd(w), !(this.ended = !0);
          x.avail_out !== 0 && (x.avail_in !== 0 || E !== 4 && E !== 2) || (this.options.to === "string" ? this.onData(r.buf2binstring(l.shrinkBuf(x.output, x.next_out))) : this.onData(l.shrinkBuf(x.output, x.next_out)));
        } while ((0 < x.avail_in || x.avail_out === 0) && w !== 1);
        return E === 4 ? (w = a.deflateEnd(this.strm), this.onEnd(w), this.ended = !0, w === m) : E !== 2 || (this.onEnd(m), !(x.avail_out = 0));
      }, n.prototype.onData = function(o) {
        this.chunks.push(o);
      }, n.prototype.onEnd = function(o) {
        o === m && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = o, this.msg = this.strm.msg;
      }, v.Deflate = n, v.deflate = c, v.deflateRaw = function(o, f) {
        return (f = f || {}).raw = !0, c(o, f);
      }, v.gzip = function(o, f) {
        return (f = f || {}).gzip = !0, c(o, f);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(g, A, v) {
      var a = g("./zlib/inflate"), l = g("./utils/common"), r = g("./utils/strings"), s = g("./zlib/constants"), _ = g("./zlib/messages"), y = g("./zlib/zstream"), m = g("./zlib/gzheader"), b = Object.prototype.toString;
      function i(n) {
        if (!(this instanceof i)) return new i(n);
        this.options = l.assign({ chunkSize: 16384, windowBits: 0, to: "" }, n || {});
        var c = this.options;
        c.raw && 0 <= c.windowBits && c.windowBits < 16 && (c.windowBits = -c.windowBits, c.windowBits === 0 && (c.windowBits = -15)), !(0 <= c.windowBits && c.windowBits < 16) || n && n.windowBits || (c.windowBits += 32), 15 < c.windowBits && c.windowBits < 48 && !(15 & c.windowBits) && (c.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new y(), this.strm.avail_out = 0;
        var o = a.inflateInit2(this.strm, c.windowBits);
        if (o !== s.Z_OK) throw new Error(_[o]);
        this.header = new m(), a.inflateGetHeader(this.strm, this.header);
      }
      function h(n, c) {
        var o = new i(c);
        if (o.push(n, !0), o.err) throw o.msg || _[o.err];
        return o.result;
      }
      i.prototype.push = function(n, c) {
        var o, f, w, E, x, P, S = this.strm, U = this.options.chunkSize, C = this.options.dictionary, z = !1;
        if (this.ended) return !1;
        f = c === ~~c ? c : c === !0 ? s.Z_FINISH : s.Z_NO_FLUSH, typeof n == "string" ? S.input = r.binstring2buf(n) : b.call(n) === "[object ArrayBuffer]" ? S.input = new Uint8Array(n) : S.input = n, S.next_in = 0, S.avail_in = S.input.length;
        do {
          if (S.avail_out === 0 && (S.output = new l.Buf8(U), S.next_out = 0, S.avail_out = U), (o = a.inflate(S, s.Z_NO_FLUSH)) === s.Z_NEED_DICT && C && (P = typeof C == "string" ? r.string2buf(C) : b.call(C) === "[object ArrayBuffer]" ? new Uint8Array(C) : C, o = a.inflateSetDictionary(this.strm, P)), o === s.Z_BUF_ERROR && z === !0 && (o = s.Z_OK, z = !1), o !== s.Z_STREAM_END && o !== s.Z_OK) return this.onEnd(o), !(this.ended = !0);
          S.next_out && (S.avail_out !== 0 && o !== s.Z_STREAM_END && (S.avail_in !== 0 || f !== s.Z_FINISH && f !== s.Z_SYNC_FLUSH) || (this.options.to === "string" ? (w = r.utf8border(S.output, S.next_out), E = S.next_out - w, x = r.buf2string(S.output, w), S.next_out = E, S.avail_out = U - E, E && l.arraySet(S.output, S.output, w, E, 0), this.onData(x)) : this.onData(l.shrinkBuf(S.output, S.next_out)))), S.avail_in === 0 && S.avail_out === 0 && (z = !0);
        } while ((0 < S.avail_in || S.avail_out === 0) && o !== s.Z_STREAM_END);
        return o === s.Z_STREAM_END && (f = s.Z_FINISH), f === s.Z_FINISH ? (o = a.inflateEnd(this.strm), this.onEnd(o), this.ended = !0, o === s.Z_OK) : f !== s.Z_SYNC_FLUSH || (this.onEnd(s.Z_OK), !(S.avail_out = 0));
      }, i.prototype.onData = function(n) {
        this.chunks.push(n);
      }, i.prototype.onEnd = function(n) {
        n === s.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
      }, v.Inflate = i, v.inflate = h, v.inflateRaw = function(n, c) {
        return (c = c || {}).raw = !0, h(n, c);
      }, v.ungzip = h;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(g, A, v) {
      var a = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      v.assign = function(s) {
        for (var _ = Array.prototype.slice.call(arguments, 1); _.length; ) {
          var y = _.shift();
          if (y) {
            if (typeof y != "object") throw new TypeError(y + "must be non-object");
            for (var m in y) y.hasOwnProperty(m) && (s[m] = y[m]);
          }
        }
        return s;
      }, v.shrinkBuf = function(s, _) {
        return s.length === _ ? s : s.subarray ? s.subarray(0, _) : (s.length = _, s);
      };
      var l = { arraySet: function(s, _, y, m, b) {
        if (_.subarray && s.subarray) s.set(_.subarray(y, y + m), b);
        else for (var i = 0; i < m; i++) s[b + i] = _[y + i];
      }, flattenChunks: function(s) {
        var _, y, m, b, i, h;
        for (_ = m = 0, y = s.length; _ < y; _++) m += s[_].length;
        for (h = new Uint8Array(m), _ = b = 0, y = s.length; _ < y; _++) i = s[_], h.set(i, b), b += i.length;
        return h;
      } }, r = { arraySet: function(s, _, y, m, b) {
        for (var i = 0; i < m; i++) s[b + i] = _[y + i];
      }, flattenChunks: function(s) {
        return [].concat.apply([], s);
      } };
      v.setTyped = function(s) {
        s ? (v.Buf8 = Uint8Array, v.Buf16 = Uint16Array, v.Buf32 = Int32Array, v.assign(v, l)) : (v.Buf8 = Array, v.Buf16 = Array, v.Buf32 = Array, v.assign(v, r));
      }, v.setTyped(a);
    }, {}], 42: [function(g, A, v) {
      var a = g("./common"), l = !0, r = !0;
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
      for (var s = new a.Buf8(256), _ = 0; _ < 256; _++) s[_] = 252 <= _ ? 6 : 248 <= _ ? 5 : 240 <= _ ? 4 : 224 <= _ ? 3 : 192 <= _ ? 2 : 1;
      function y(m, b) {
        if (b < 65537 && (m.subarray && r || !m.subarray && l)) return String.fromCharCode.apply(null, a.shrinkBuf(m, b));
        for (var i = "", h = 0; h < b; h++) i += String.fromCharCode(m[h]);
        return i;
      }
      s[254] = s[254] = 1, v.string2buf = function(m) {
        var b, i, h, n, c, o = m.length, f = 0;
        for (n = 0; n < o; n++) (64512 & (i = m.charCodeAt(n))) == 55296 && n + 1 < o && (64512 & (h = m.charCodeAt(n + 1))) == 56320 && (i = 65536 + (i - 55296 << 10) + (h - 56320), n++), f += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
        for (b = new a.Buf8(f), n = c = 0; c < f; n++) (64512 & (i = m.charCodeAt(n))) == 55296 && n + 1 < o && (64512 & (h = m.charCodeAt(n + 1))) == 56320 && (i = 65536 + (i - 55296 << 10) + (h - 56320), n++), i < 128 ? b[c++] = i : (i < 2048 ? b[c++] = 192 | i >>> 6 : (i < 65536 ? b[c++] = 224 | i >>> 12 : (b[c++] = 240 | i >>> 18, b[c++] = 128 | i >>> 12 & 63), b[c++] = 128 | i >>> 6 & 63), b[c++] = 128 | 63 & i);
        return b;
      }, v.buf2binstring = function(m) {
        return y(m, m.length);
      }, v.binstring2buf = function(m) {
        for (var b = new a.Buf8(m.length), i = 0, h = b.length; i < h; i++) b[i] = m.charCodeAt(i);
        return b;
      }, v.buf2string = function(m, b) {
        var i, h, n, c, o = b || m.length, f = new Array(2 * o);
        for (i = h = 0; i < o; ) if ((n = m[i++]) < 128) f[h++] = n;
        else if (4 < (c = s[n])) f[h++] = 65533, i += c - 1;
        else {
          for (n &= c === 2 ? 31 : c === 3 ? 15 : 7; 1 < c && i < o; ) n = n << 6 | 63 & m[i++], c--;
          1 < c ? f[h++] = 65533 : n < 65536 ? f[h++] = n : (n -= 65536, f[h++] = 55296 | n >> 10 & 1023, f[h++] = 56320 | 1023 & n);
        }
        return y(f, h);
      }, v.utf8border = function(m, b) {
        var i;
        for ((b = b || m.length) > m.length && (b = m.length), i = b - 1; 0 <= i && (192 & m[i]) == 128; ) i--;
        return i < 0 || i === 0 ? b : i + s[m[i]] > b ? i : b;
      };
    }, { "./common": 41 }], 43: [function(g, A, v) {
      A.exports = function(a, l, r, s) {
        for (var _ = 65535 & a | 0, y = a >>> 16 & 65535 | 0, m = 0; r !== 0; ) {
          for (r -= m = 2e3 < r ? 2e3 : r; y = y + (_ = _ + l[s++] | 0) | 0, --m; ) ;
          _ %= 65521, y %= 65521;
        }
        return _ | y << 16 | 0;
      };
    }, {}], 44: [function(g, A, v) {
      A.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(g, A, v) {
      var a = function() {
        for (var l, r = [], s = 0; s < 256; s++) {
          l = s;
          for (var _ = 0; _ < 8; _++) l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1;
          r[s] = l;
        }
        return r;
      }();
      A.exports = function(l, r, s, _) {
        var y = a, m = _ + s;
        l ^= -1;
        for (var b = _; b < m; b++) l = l >>> 8 ^ y[255 & (l ^ r[b])];
        return -1 ^ l;
      };
    }, {}], 46: [function(g, A, v) {
      var a, l = g("../utils/common"), r = g("./trees"), s = g("./adler32"), _ = g("./crc32"), y = g("./messages"), m = 0, b = 4, i = 0, h = -2, n = -1, c = 4, o = 2, f = 8, w = 9, E = 286, x = 30, P = 19, S = 2 * E + 1, U = 15, C = 3, z = 258, Z = z + C + 1, p = 42, B = 113, e = 1, F = 2, V = 3, L = 4;
      function Q(t, D) {
        return t.msg = y[D], D;
      }
      function W(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function tt(t) {
        for (var D = t.length; 0 <= --D; ) t[D] = 0;
      }
      function T(t) {
        var D = t.state, R = D.pending;
        R > t.avail_out && (R = t.avail_out), R !== 0 && (l.arraySet(t.output, D.pending_buf, D.pending_out, R, t.next_out), t.next_out += R, D.pending_out += R, t.total_out += R, t.avail_out -= R, D.pending -= R, D.pending === 0 && (D.pending_out = 0));
      }
      function I(t, D) {
        r._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, D), t.block_start = t.strstart, T(t.strm);
      }
      function J(t, D) {
        t.pending_buf[t.pending++] = D;
      }
      function $(t, D) {
        t.pending_buf[t.pending++] = D >>> 8 & 255, t.pending_buf[t.pending++] = 255 & D;
      }
      function H(t, D) {
        var R, d, u = t.max_chain_length, k = t.strstart, N = t.prev_length, j = t.nice_match, O = t.strstart > t.w_size - Z ? t.strstart - (t.w_size - Z) : 0, M = t.window, K = t.w_mask, X = t.prev, q = t.strstart + z, at = M[k + N - 1], rt = M[k + N];
        t.prev_length >= t.good_match && (u >>= 2), j > t.lookahead && (j = t.lookahead);
        do
          if (M[(R = D) + N] === rt && M[R + N - 1] === at && M[R] === M[k] && M[++R] === M[k + 1]) {
            k += 2, R++;
            do
              ;
            while (M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && M[++k] === M[++R] && k < q);
            if (d = z - (q - k), k = q - z, N < d) {
              if (t.match_start = D, j <= (N = d)) break;
              at = M[k + N - 1], rt = M[k + N];
            }
          }
        while ((D = X[D & K]) > O && --u != 0);
        return N <= t.lookahead ? N : t.lookahead;
      }
      function st(t) {
        var D, R, d, u, k, N, j, O, M, K, X = t.w_size;
        do {
          if (u = t.window_size - t.lookahead - t.strstart, t.strstart >= X + (X - Z)) {
            for (l.arraySet(t.window, t.window, X, X, 0), t.match_start -= X, t.strstart -= X, t.block_start -= X, D = R = t.hash_size; d = t.head[--D], t.head[D] = X <= d ? d - X : 0, --R; ) ;
            for (D = R = X; d = t.prev[--D], t.prev[D] = X <= d ? d - X : 0, --R; ) ;
            u += X;
          }
          if (t.strm.avail_in === 0) break;
          if (N = t.strm, j = t.window, O = t.strstart + t.lookahead, M = u, K = void 0, K = N.avail_in, M < K && (K = M), R = K === 0 ? 0 : (N.avail_in -= K, l.arraySet(j, N.input, N.next_in, K, O), N.state.wrap === 1 ? N.adler = s(N.adler, j, K, O) : N.state.wrap === 2 && (N.adler = _(N.adler, j, K, O)), N.next_in += K, N.total_in += K, K), t.lookahead += R, t.lookahead + t.insert >= C) for (k = t.strstart - t.insert, t.ins_h = t.window[k], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[k + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[k + C - 1]) & t.hash_mask, t.prev[k & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = k, k++, t.insert--, !(t.lookahead + t.insert < C)); ) ;
        } while (t.lookahead < Z && t.strm.avail_in !== 0);
      }
      function ut(t, D) {
        for (var R, d; ; ) {
          if (t.lookahead < Z) {
            if (st(t), t.lookahead < Z && D === m) return e;
            if (t.lookahead === 0) break;
          }
          if (R = 0, t.lookahead >= C && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + C - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), R !== 0 && t.strstart - R <= t.w_size - Z && (t.match_length = H(t, R)), t.match_length >= C) if (d = r._tr_tally(t, t.strstart - t.match_start, t.match_length - C), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= C) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + C - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else d = r._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (d && (I(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = t.strstart < C - 1 ? t.strstart : C - 1, D === b ? (I(t, !0), t.strm.avail_out === 0 ? V : L) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? e : F;
      }
      function et(t, D) {
        for (var R, d, u; ; ) {
          if (t.lookahead < Z) {
            if (st(t), t.lookahead < Z && D === m) return e;
            if (t.lookahead === 0) break;
          }
          if (R = 0, t.lookahead >= C && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + C - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = C - 1, R !== 0 && t.prev_length < t.max_lazy_match && t.strstart - R <= t.w_size - Z && (t.match_length = H(t, R), t.match_length <= 5 && (t.strategy === 1 || t.match_length === C && 4096 < t.strstart - t.match_start) && (t.match_length = C - 1)), t.prev_length >= C && t.match_length <= t.prev_length) {
            for (u = t.strstart + t.lookahead - C, d = r._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - C), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= u && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + C - 1]) & t.hash_mask, R = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = C - 1, t.strstart++, d && (I(t, !1), t.strm.avail_out === 0)) return e;
          } else if (t.match_available) {
            if ((d = r._tr_tally(t, 0, t.window[t.strstart - 1])) && I(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return e;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (d = r._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < C - 1 ? t.strstart : C - 1, D === b ? (I(t, !0), t.strm.avail_out === 0 ? V : L) : t.last_lit && (I(t, !1), t.strm.avail_out === 0) ? e : F;
      }
      function nt(t, D, R, d, u) {
        this.good_length = t, this.max_lazy = D, this.nice_length = R, this.max_chain = d, this.func = u;
      }
      function ct() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = f, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new l.Buf16(2 * S), this.dyn_dtree = new l.Buf16(2 * (2 * x + 1)), this.bl_tree = new l.Buf16(2 * (2 * P + 1)), tt(this.dyn_ltree), tt(this.dyn_dtree), tt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new l.Buf16(U + 1), this.heap = new l.Buf16(2 * E + 1), tt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new l.Buf16(2 * E + 1), tt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function ot(t) {
        var D;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = o, (D = t.state).pending = 0, D.pending_out = 0, D.wrap < 0 && (D.wrap = -D.wrap), D.status = D.wrap ? p : B, t.adler = D.wrap === 2 ? 0 : 1, D.last_flush = m, r._tr_init(D), i) : Q(t, h);
      }
      function _t(t) {
        var D = ot(t);
        return D === i && function(R) {
          R.window_size = 2 * R.w_size, tt(R.head), R.max_lazy_match = a[R.level].max_lazy, R.good_match = a[R.level].good_length, R.nice_match = a[R.level].nice_length, R.max_chain_length = a[R.level].max_chain, R.strstart = 0, R.block_start = 0, R.lookahead = 0, R.insert = 0, R.match_length = R.prev_length = C - 1, R.match_available = 0, R.ins_h = 0;
        }(t.state), D;
      }
      function gt(t, D, R, d, u, k) {
        if (!t) return h;
        var N = 1;
        if (D === n && (D = 6), d < 0 ? (N = 0, d = -d) : 15 < d && (N = 2, d -= 16), u < 1 || w < u || R !== f || d < 8 || 15 < d || D < 0 || 9 < D || k < 0 || c < k) return Q(t, h);
        d === 8 && (d = 9);
        var j = new ct();
        return (t.state = j).strm = t, j.wrap = N, j.gzhead = null, j.w_bits = d, j.w_size = 1 << j.w_bits, j.w_mask = j.w_size - 1, j.hash_bits = u + 7, j.hash_size = 1 << j.hash_bits, j.hash_mask = j.hash_size - 1, j.hash_shift = ~~((j.hash_bits + C - 1) / C), j.window = new l.Buf8(2 * j.w_size), j.head = new l.Buf16(j.hash_size), j.prev = new l.Buf16(j.w_size), j.lit_bufsize = 1 << u + 6, j.pending_buf_size = 4 * j.lit_bufsize, j.pending_buf = new l.Buf8(j.pending_buf_size), j.d_buf = 1 * j.lit_bufsize, j.l_buf = 3 * j.lit_bufsize, j.level = D, j.strategy = k, j.method = R, _t(t);
      }
      a = [new nt(0, 0, 0, 0, function(t, D) {
        var R = 65535;
        for (R > t.pending_buf_size - 5 && (R = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (st(t), t.lookahead === 0 && D === m) return e;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var d = t.block_start + R;
          if ((t.strstart === 0 || t.strstart >= d) && (t.lookahead = t.strstart - d, t.strstart = d, I(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - Z && (I(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = 0, D === b ? (I(t, !0), t.strm.avail_out === 0 ? V : L) : (t.strstart > t.block_start && (I(t, !1), t.strm.avail_out), e);
      }), new nt(4, 4, 8, 4, ut), new nt(4, 5, 16, 8, ut), new nt(4, 6, 32, 32, ut), new nt(4, 4, 16, 16, et), new nt(8, 16, 32, 32, et), new nt(8, 16, 128, 128, et), new nt(8, 32, 128, 256, et), new nt(32, 128, 258, 1024, et), new nt(32, 258, 258, 4096, et)], v.deflateInit = function(t, D) {
        return gt(t, D, f, 15, 8, 0);
      }, v.deflateInit2 = gt, v.deflateReset = _t, v.deflateResetKeep = ot, v.deflateSetHeader = function(t, D) {
        return t && t.state ? t.state.wrap !== 2 ? h : (t.state.gzhead = D, i) : h;
      }, v.deflate = function(t, D) {
        var R, d, u, k;
        if (!t || !t.state || 5 < D || D < 0) return t ? Q(t, h) : h;
        if (d = t.state, !t.output || !t.input && t.avail_in !== 0 || d.status === 666 && D !== b) return Q(t, t.avail_out === 0 ? -5 : h);
        if (d.strm = t, R = d.last_flush, d.last_flush = D, d.status === p) if (d.wrap === 2) t.adler = 0, J(d, 31), J(d, 139), J(d, 8), d.gzhead ? (J(d, (d.gzhead.text ? 1 : 0) + (d.gzhead.hcrc ? 2 : 0) + (d.gzhead.extra ? 4 : 0) + (d.gzhead.name ? 8 : 0) + (d.gzhead.comment ? 16 : 0)), J(d, 255 & d.gzhead.time), J(d, d.gzhead.time >> 8 & 255), J(d, d.gzhead.time >> 16 & 255), J(d, d.gzhead.time >> 24 & 255), J(d, d.level === 9 ? 2 : 2 <= d.strategy || d.level < 2 ? 4 : 0), J(d, 255 & d.gzhead.os), d.gzhead.extra && d.gzhead.extra.length && (J(d, 255 & d.gzhead.extra.length), J(d, d.gzhead.extra.length >> 8 & 255)), d.gzhead.hcrc && (t.adler = _(t.adler, d.pending_buf, d.pending, 0)), d.gzindex = 0, d.status = 69) : (J(d, 0), J(d, 0), J(d, 0), J(d, 0), J(d, 0), J(d, d.level === 9 ? 2 : 2 <= d.strategy || d.level < 2 ? 4 : 0), J(d, 3), d.status = B);
        else {
          var N = f + (d.w_bits - 8 << 4) << 8;
          N |= (2 <= d.strategy || d.level < 2 ? 0 : d.level < 6 ? 1 : d.level === 6 ? 2 : 3) << 6, d.strstart !== 0 && (N |= 32), N += 31 - N % 31, d.status = B, $(d, N), d.strstart !== 0 && ($(d, t.adler >>> 16), $(d, 65535 & t.adler)), t.adler = 1;
        }
        if (d.status === 69) if (d.gzhead.extra) {
          for (u = d.pending; d.gzindex < (65535 & d.gzhead.extra.length) && (d.pending !== d.pending_buf_size || (d.gzhead.hcrc && d.pending > u && (t.adler = _(t.adler, d.pending_buf, d.pending - u, u)), T(t), u = d.pending, d.pending !== d.pending_buf_size)); ) J(d, 255 & d.gzhead.extra[d.gzindex]), d.gzindex++;
          d.gzhead.hcrc && d.pending > u && (t.adler = _(t.adler, d.pending_buf, d.pending - u, u)), d.gzindex === d.gzhead.extra.length && (d.gzindex = 0, d.status = 73);
        } else d.status = 73;
        if (d.status === 73) if (d.gzhead.name) {
          u = d.pending;
          do {
            if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > u && (t.adler = _(t.adler, d.pending_buf, d.pending - u, u)), T(t), u = d.pending, d.pending === d.pending_buf_size)) {
              k = 1;
              break;
            }
            k = d.gzindex < d.gzhead.name.length ? 255 & d.gzhead.name.charCodeAt(d.gzindex++) : 0, J(d, k);
          } while (k !== 0);
          d.gzhead.hcrc && d.pending > u && (t.adler = _(t.adler, d.pending_buf, d.pending - u, u)), k === 0 && (d.gzindex = 0, d.status = 91);
        } else d.status = 91;
        if (d.status === 91) if (d.gzhead.comment) {
          u = d.pending;
          do {
            if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > u && (t.adler = _(t.adler, d.pending_buf, d.pending - u, u)), T(t), u = d.pending, d.pending === d.pending_buf_size)) {
              k = 1;
              break;
            }
            k = d.gzindex < d.gzhead.comment.length ? 255 & d.gzhead.comment.charCodeAt(d.gzindex++) : 0, J(d, k);
          } while (k !== 0);
          d.gzhead.hcrc && d.pending > u && (t.adler = _(t.adler, d.pending_buf, d.pending - u, u)), k === 0 && (d.status = 103);
        } else d.status = 103;
        if (d.status === 103 && (d.gzhead.hcrc ? (d.pending + 2 > d.pending_buf_size && T(t), d.pending + 2 <= d.pending_buf_size && (J(d, 255 & t.adler), J(d, t.adler >> 8 & 255), t.adler = 0, d.status = B)) : d.status = B), d.pending !== 0) {
          if (T(t), t.avail_out === 0) return d.last_flush = -1, i;
        } else if (t.avail_in === 0 && W(D) <= W(R) && D !== b) return Q(t, -5);
        if (d.status === 666 && t.avail_in !== 0) return Q(t, -5);
        if (t.avail_in !== 0 || d.lookahead !== 0 || D !== m && d.status !== 666) {
          var j = d.strategy === 2 ? function(O, M) {
            for (var K; ; ) {
              if (O.lookahead === 0 && (st(O), O.lookahead === 0)) {
                if (M === m) return e;
                break;
              }
              if (O.match_length = 0, K = r._tr_tally(O, 0, O.window[O.strstart]), O.lookahead--, O.strstart++, K && (I(O, !1), O.strm.avail_out === 0)) return e;
            }
            return O.insert = 0, M === b ? (I(O, !0), O.strm.avail_out === 0 ? V : L) : O.last_lit && (I(O, !1), O.strm.avail_out === 0) ? e : F;
          }(d, D) : d.strategy === 3 ? function(O, M) {
            for (var K, X, q, at, rt = O.window; ; ) {
              if (O.lookahead <= z) {
                if (st(O), O.lookahead <= z && M === m) return e;
                if (O.lookahead === 0) break;
              }
              if (O.match_length = 0, O.lookahead >= C && 0 < O.strstart && (X = rt[q = O.strstart - 1]) === rt[++q] && X === rt[++q] && X === rt[++q]) {
                at = O.strstart + z;
                do
                  ;
                while (X === rt[++q] && X === rt[++q] && X === rt[++q] && X === rt[++q] && X === rt[++q] && X === rt[++q] && X === rt[++q] && X === rt[++q] && q < at);
                O.match_length = z - (at - q), O.match_length > O.lookahead && (O.match_length = O.lookahead);
              }
              if (O.match_length >= C ? (K = r._tr_tally(O, 1, O.match_length - C), O.lookahead -= O.match_length, O.strstart += O.match_length, O.match_length = 0) : (K = r._tr_tally(O, 0, O.window[O.strstart]), O.lookahead--, O.strstart++), K && (I(O, !1), O.strm.avail_out === 0)) return e;
            }
            return O.insert = 0, M === b ? (I(O, !0), O.strm.avail_out === 0 ? V : L) : O.last_lit && (I(O, !1), O.strm.avail_out === 0) ? e : F;
          }(d, D) : a[d.level].func(d, D);
          if (j !== V && j !== L || (d.status = 666), j === e || j === V) return t.avail_out === 0 && (d.last_flush = -1), i;
          if (j === F && (D === 1 ? r._tr_align(d) : D !== 5 && (r._tr_stored_block(d, 0, 0, !1), D === 3 && (tt(d.head), d.lookahead === 0 && (d.strstart = 0, d.block_start = 0, d.insert = 0))), T(t), t.avail_out === 0)) return d.last_flush = -1, i;
        }
        return D !== b ? i : d.wrap <= 0 ? 1 : (d.wrap === 2 ? (J(d, 255 & t.adler), J(d, t.adler >> 8 & 255), J(d, t.adler >> 16 & 255), J(d, t.adler >> 24 & 255), J(d, 255 & t.total_in), J(d, t.total_in >> 8 & 255), J(d, t.total_in >> 16 & 255), J(d, t.total_in >> 24 & 255)) : ($(d, t.adler >>> 16), $(d, 65535 & t.adler)), T(t), 0 < d.wrap && (d.wrap = -d.wrap), d.pending !== 0 ? i : 1);
      }, v.deflateEnd = function(t) {
        var D;
        return t && t.state ? (D = t.state.status) !== p && D !== 69 && D !== 73 && D !== 91 && D !== 103 && D !== B && D !== 666 ? Q(t, h) : (t.state = null, D === B ? Q(t, -3) : i) : h;
      }, v.deflateSetDictionary = function(t, D) {
        var R, d, u, k, N, j, O, M, K = D.length;
        if (!t || !t.state || (k = (R = t.state).wrap) === 2 || k === 1 && R.status !== p || R.lookahead) return h;
        for (k === 1 && (t.adler = s(t.adler, D, K, 0)), R.wrap = 0, K >= R.w_size && (k === 0 && (tt(R.head), R.strstart = 0, R.block_start = 0, R.insert = 0), M = new l.Buf8(R.w_size), l.arraySet(M, D, K - R.w_size, R.w_size, 0), D = M, K = R.w_size), N = t.avail_in, j = t.next_in, O = t.input, t.avail_in = K, t.next_in = 0, t.input = D, st(R); R.lookahead >= C; ) {
          for (d = R.strstart, u = R.lookahead - (C - 1); R.ins_h = (R.ins_h << R.hash_shift ^ R.window[d + C - 1]) & R.hash_mask, R.prev[d & R.w_mask] = R.head[R.ins_h], R.head[R.ins_h] = d, d++, --u; ) ;
          R.strstart = d, R.lookahead = C - 1, st(R);
        }
        return R.strstart += R.lookahead, R.block_start = R.strstart, R.insert = R.lookahead, R.lookahead = 0, R.match_length = R.prev_length = C - 1, R.match_available = 0, t.next_in = j, t.input = O, t.avail_in = N, R.wrap = k, i;
      }, v.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(g, A, v) {
      A.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(g, A, v) {
      A.exports = function(a, l) {
        var r, s, _, y, m, b, i, h, n, c, o, f, w, E, x, P, S, U, C, z, Z, p, B, e, F;
        r = a.state, s = a.next_in, e = a.input, _ = s + (a.avail_in - 5), y = a.next_out, F = a.output, m = y - (l - a.avail_out), b = y + (a.avail_out - 257), i = r.dmax, h = r.wsize, n = r.whave, c = r.wnext, o = r.window, f = r.hold, w = r.bits, E = r.lencode, x = r.distcode, P = (1 << r.lenbits) - 1, S = (1 << r.distbits) - 1;
        t: do {
          w < 15 && (f += e[s++] << w, w += 8, f += e[s++] << w, w += 8), U = E[f & P];
          e: for (; ; ) {
            if (f >>>= C = U >>> 24, w -= C, (C = U >>> 16 & 255) === 0) F[y++] = 65535 & U;
            else {
              if (!(16 & C)) {
                if (!(64 & C)) {
                  U = E[(65535 & U) + (f & (1 << C) - 1)];
                  continue e;
                }
                if (32 & C) {
                  r.mode = 12;
                  break t;
                }
                a.msg = "invalid literal/length code", r.mode = 30;
                break t;
              }
              z = 65535 & U, (C &= 15) && (w < C && (f += e[s++] << w, w += 8), z += f & (1 << C) - 1, f >>>= C, w -= C), w < 15 && (f += e[s++] << w, w += 8, f += e[s++] << w, w += 8), U = x[f & S];
              r: for (; ; ) {
                if (f >>>= C = U >>> 24, w -= C, !(16 & (C = U >>> 16 & 255))) {
                  if (!(64 & C)) {
                    U = x[(65535 & U) + (f & (1 << C) - 1)];
                    continue r;
                  }
                  a.msg = "invalid distance code", r.mode = 30;
                  break t;
                }
                if (Z = 65535 & U, w < (C &= 15) && (f += e[s++] << w, (w += 8) < C && (f += e[s++] << w, w += 8)), i < (Z += f & (1 << C) - 1)) {
                  a.msg = "invalid distance too far back", r.mode = 30;
                  break t;
                }
                if (f >>>= C, w -= C, (C = y - m) < Z) {
                  if (n < (C = Z - C) && r.sane) {
                    a.msg = "invalid distance too far back", r.mode = 30;
                    break t;
                  }
                  if (B = o, (p = 0) === c) {
                    if (p += h - C, C < z) {
                      for (z -= C; F[y++] = o[p++], --C; ) ;
                      p = y - Z, B = F;
                    }
                  } else if (c < C) {
                    if (p += h + c - C, (C -= c) < z) {
                      for (z -= C; F[y++] = o[p++], --C; ) ;
                      if (p = 0, c < z) {
                        for (z -= C = c; F[y++] = o[p++], --C; ) ;
                        p = y - Z, B = F;
                      }
                    }
                  } else if (p += c - C, C < z) {
                    for (z -= C; F[y++] = o[p++], --C; ) ;
                    p = y - Z, B = F;
                  }
                  for (; 2 < z; ) F[y++] = B[p++], F[y++] = B[p++], F[y++] = B[p++], z -= 3;
                  z && (F[y++] = B[p++], 1 < z && (F[y++] = B[p++]));
                } else {
                  for (p = y - Z; F[y++] = F[p++], F[y++] = F[p++], F[y++] = F[p++], 2 < (z -= 3); ) ;
                  z && (F[y++] = F[p++], 1 < z && (F[y++] = F[p++]));
                }
                break;
              }
            }
            break;
          }
        } while (s < _ && y < b);
        s -= z = w >> 3, f &= (1 << (w -= z << 3)) - 1, a.next_in = s, a.next_out = y, a.avail_in = s < _ ? _ - s + 5 : 5 - (s - _), a.avail_out = y < b ? b - y + 257 : 257 - (y - b), r.hold = f, r.bits = w;
      };
    }, {}], 49: [function(g, A, v) {
      var a = g("../utils/common"), l = g("./adler32"), r = g("./crc32"), s = g("./inffast"), _ = g("./inftrees"), y = 1, m = 2, b = 0, i = -2, h = 1, n = 852, c = 592;
      function o(p) {
        return (p >>> 24 & 255) + (p >>> 8 & 65280) + ((65280 & p) << 8) + ((255 & p) << 24);
      }
      function f() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new a.Buf16(320), this.work = new a.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function w(p) {
        var B;
        return p && p.state ? (B = p.state, p.total_in = p.total_out = B.total = 0, p.msg = "", B.wrap && (p.adler = 1 & B.wrap), B.mode = h, B.last = 0, B.havedict = 0, B.dmax = 32768, B.head = null, B.hold = 0, B.bits = 0, B.lencode = B.lendyn = new a.Buf32(n), B.distcode = B.distdyn = new a.Buf32(c), B.sane = 1, B.back = -1, b) : i;
      }
      function E(p) {
        var B;
        return p && p.state ? ((B = p.state).wsize = 0, B.whave = 0, B.wnext = 0, w(p)) : i;
      }
      function x(p, B) {
        var e, F;
        return p && p.state ? (F = p.state, B < 0 ? (e = 0, B = -B) : (e = 1 + (B >> 4), B < 48 && (B &= 15)), B && (B < 8 || 15 < B) ? i : (F.window !== null && F.wbits !== B && (F.window = null), F.wrap = e, F.wbits = B, E(p))) : i;
      }
      function P(p, B) {
        var e, F;
        return p ? (F = new f(), (p.state = F).window = null, (e = x(p, B)) !== b && (p.state = null), e) : i;
      }
      var S, U, C = !0;
      function z(p) {
        if (C) {
          var B;
          for (S = new a.Buf32(512), U = new a.Buf32(32), B = 0; B < 144; ) p.lens[B++] = 8;
          for (; B < 256; ) p.lens[B++] = 9;
          for (; B < 280; ) p.lens[B++] = 7;
          for (; B < 288; ) p.lens[B++] = 8;
          for (_(y, p.lens, 0, 288, S, 0, p.work, { bits: 9 }), B = 0; B < 32; ) p.lens[B++] = 5;
          _(m, p.lens, 0, 32, U, 0, p.work, { bits: 5 }), C = !1;
        }
        p.lencode = S, p.lenbits = 9, p.distcode = U, p.distbits = 5;
      }
      function Z(p, B, e, F) {
        var V, L = p.state;
        return L.window === null && (L.wsize = 1 << L.wbits, L.wnext = 0, L.whave = 0, L.window = new a.Buf8(L.wsize)), F >= L.wsize ? (a.arraySet(L.window, B, e - L.wsize, L.wsize, 0), L.wnext = 0, L.whave = L.wsize) : (F < (V = L.wsize - L.wnext) && (V = F), a.arraySet(L.window, B, e - F, V, L.wnext), (F -= V) ? (a.arraySet(L.window, B, e - F, F, 0), L.wnext = F, L.whave = L.wsize) : (L.wnext += V, L.wnext === L.wsize && (L.wnext = 0), L.whave < L.wsize && (L.whave += V))), 0;
      }
      v.inflateReset = E, v.inflateReset2 = x, v.inflateResetKeep = w, v.inflateInit = function(p) {
        return P(p, 15);
      }, v.inflateInit2 = P, v.inflate = function(p, B) {
        var e, F, V, L, Q, W, tt, T, I, J, $, H, st, ut, et, nt, ct, ot, _t, gt, t, D, R, d, u = 0, k = new a.Buf8(4), N = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!p || !p.state || !p.output || !p.input && p.avail_in !== 0) return i;
        (e = p.state).mode === 12 && (e.mode = 13), Q = p.next_out, V = p.output, tt = p.avail_out, L = p.next_in, F = p.input, W = p.avail_in, T = e.hold, I = e.bits, J = W, $ = tt, D = b;
        t: for (; ; ) switch (e.mode) {
          case h:
            if (e.wrap === 0) {
              e.mode = 13;
              break;
            }
            for (; I < 16; ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            if (2 & e.wrap && T === 35615) {
              k[e.check = 0] = 255 & T, k[1] = T >>> 8 & 255, e.check = r(e.check, k, 2, 0), I = T = 0, e.mode = 2;
              break;
            }
            if (e.flags = 0, e.head && (e.head.done = !1), !(1 & e.wrap) || (((255 & T) << 8) + (T >> 8)) % 31) {
              p.msg = "incorrect header check", e.mode = 30;
              break;
            }
            if ((15 & T) != 8) {
              p.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (I -= 4, t = 8 + (15 & (T >>>= 4)), e.wbits === 0) e.wbits = t;
            else if (t > e.wbits) {
              p.msg = "invalid window size", e.mode = 30;
              break;
            }
            e.dmax = 1 << t, p.adler = e.check = 1, e.mode = 512 & T ? 10 : 12, I = T = 0;
            break;
          case 2:
            for (; I < 16; ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            if (e.flags = T, (255 & e.flags) != 8) {
              p.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (57344 & e.flags) {
              p.msg = "unknown header flags set", e.mode = 30;
              break;
            }
            e.head && (e.head.text = T >> 8 & 1), 512 & e.flags && (k[0] = 255 & T, k[1] = T >>> 8 & 255, e.check = r(e.check, k, 2, 0)), I = T = 0, e.mode = 3;
          case 3:
            for (; I < 32; ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            e.head && (e.head.time = T), 512 & e.flags && (k[0] = 255 & T, k[1] = T >>> 8 & 255, k[2] = T >>> 16 & 255, k[3] = T >>> 24 & 255, e.check = r(e.check, k, 4, 0)), I = T = 0, e.mode = 4;
          case 4:
            for (; I < 16; ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            e.head && (e.head.xflags = 255 & T, e.head.os = T >> 8), 512 & e.flags && (k[0] = 255 & T, k[1] = T >>> 8 & 255, e.check = r(e.check, k, 2, 0)), I = T = 0, e.mode = 5;
          case 5:
            if (1024 & e.flags) {
              for (; I < 16; ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              e.length = T, e.head && (e.head.extra_len = T), 512 & e.flags && (k[0] = 255 & T, k[1] = T >>> 8 & 255, e.check = r(e.check, k, 2, 0)), I = T = 0;
            } else e.head && (e.head.extra = null);
            e.mode = 6;
          case 6:
            if (1024 & e.flags && (W < (H = e.length) && (H = W), H && (e.head && (t = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Array(e.head.extra_len)), a.arraySet(e.head.extra, F, L, H, t)), 512 & e.flags && (e.check = r(e.check, F, H, L)), W -= H, L += H, e.length -= H), e.length)) break t;
            e.length = 0, e.mode = 7;
          case 7:
            if (2048 & e.flags) {
              if (W === 0) break t;
              for (H = 0; t = F[L + H++], e.head && t && e.length < 65536 && (e.head.name += String.fromCharCode(t)), t && H < W; ) ;
              if (512 & e.flags && (e.check = r(e.check, F, H, L)), W -= H, L += H, t) break t;
            } else e.head && (e.head.name = null);
            e.length = 0, e.mode = 8;
          case 8:
            if (4096 & e.flags) {
              if (W === 0) break t;
              for (H = 0; t = F[L + H++], e.head && t && e.length < 65536 && (e.head.comment += String.fromCharCode(t)), t && H < W; ) ;
              if (512 & e.flags && (e.check = r(e.check, F, H, L)), W -= H, L += H, t) break t;
            } else e.head && (e.head.comment = null);
            e.mode = 9;
          case 9:
            if (512 & e.flags) {
              for (; I < 16; ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              if (T !== (65535 & e.check)) {
                p.msg = "header crc mismatch", e.mode = 30;
                break;
              }
              I = T = 0;
            }
            e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), p.adler = e.check = 0, e.mode = 12;
            break;
          case 10:
            for (; I < 32; ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            p.adler = e.check = o(T), I = T = 0, e.mode = 11;
          case 11:
            if (e.havedict === 0) return p.next_out = Q, p.avail_out = tt, p.next_in = L, p.avail_in = W, e.hold = T, e.bits = I, 2;
            p.adler = e.check = 1, e.mode = 12;
          case 12:
            if (B === 5 || B === 6) break t;
          case 13:
            if (e.last) {
              T >>>= 7 & I, I -= 7 & I, e.mode = 27;
              break;
            }
            for (; I < 3; ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            switch (e.last = 1 & T, I -= 1, 3 & (T >>>= 1)) {
              case 0:
                e.mode = 14;
                break;
              case 1:
                if (z(e), e.mode = 20, B !== 6) break;
                T >>>= 2, I -= 2;
                break t;
              case 2:
                e.mode = 17;
                break;
              case 3:
                p.msg = "invalid block type", e.mode = 30;
            }
            T >>>= 2, I -= 2;
            break;
          case 14:
            for (T >>>= 7 & I, I -= 7 & I; I < 32; ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            if ((65535 & T) != (T >>> 16 ^ 65535)) {
              p.msg = "invalid stored block lengths", e.mode = 30;
              break;
            }
            if (e.length = 65535 & T, I = T = 0, e.mode = 15, B === 6) break t;
          case 15:
            e.mode = 16;
          case 16:
            if (H = e.length) {
              if (W < H && (H = W), tt < H && (H = tt), H === 0) break t;
              a.arraySet(V, F, L, H, Q), W -= H, L += H, tt -= H, Q += H, e.length -= H;
              break;
            }
            e.mode = 12;
            break;
          case 17:
            for (; I < 14; ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            if (e.nlen = 257 + (31 & T), T >>>= 5, I -= 5, e.ndist = 1 + (31 & T), T >>>= 5, I -= 5, e.ncode = 4 + (15 & T), T >>>= 4, I -= 4, 286 < e.nlen || 30 < e.ndist) {
              p.msg = "too many length or distance symbols", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 18;
          case 18:
            for (; e.have < e.ncode; ) {
              for (; I < 3; ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              e.lens[N[e.have++]] = 7 & T, T >>>= 3, I -= 3;
            }
            for (; e.have < 19; ) e.lens[N[e.have++]] = 0;
            if (e.lencode = e.lendyn, e.lenbits = 7, R = { bits: e.lenbits }, D = _(0, e.lens, 0, 19, e.lencode, 0, e.work, R), e.lenbits = R.bits, D) {
              p.msg = "invalid code lengths set", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 19;
          case 19:
            for (; e.have < e.nlen + e.ndist; ) {
              for (; nt = (u = e.lencode[T & (1 << e.lenbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= I); ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              if (ct < 16) T >>>= et, I -= et, e.lens[e.have++] = ct;
              else {
                if (ct === 16) {
                  for (d = et + 2; I < d; ) {
                    if (W === 0) break t;
                    W--, T += F[L++] << I, I += 8;
                  }
                  if (T >>>= et, I -= et, e.have === 0) {
                    p.msg = "invalid bit length repeat", e.mode = 30;
                    break;
                  }
                  t = e.lens[e.have - 1], H = 3 + (3 & T), T >>>= 2, I -= 2;
                } else if (ct === 17) {
                  for (d = et + 3; I < d; ) {
                    if (W === 0) break t;
                    W--, T += F[L++] << I, I += 8;
                  }
                  I -= et, t = 0, H = 3 + (7 & (T >>>= et)), T >>>= 3, I -= 3;
                } else {
                  for (d = et + 7; I < d; ) {
                    if (W === 0) break t;
                    W--, T += F[L++] << I, I += 8;
                  }
                  I -= et, t = 0, H = 11 + (127 & (T >>>= et)), T >>>= 7, I -= 7;
                }
                if (e.have + H > e.nlen + e.ndist) {
                  p.msg = "invalid bit length repeat", e.mode = 30;
                  break;
                }
                for (; H--; ) e.lens[e.have++] = t;
              }
            }
            if (e.mode === 30) break;
            if (e.lens[256] === 0) {
              p.msg = "invalid code -- missing end-of-block", e.mode = 30;
              break;
            }
            if (e.lenbits = 9, R = { bits: e.lenbits }, D = _(y, e.lens, 0, e.nlen, e.lencode, 0, e.work, R), e.lenbits = R.bits, D) {
              p.msg = "invalid literal/lengths set", e.mode = 30;
              break;
            }
            if (e.distbits = 6, e.distcode = e.distdyn, R = { bits: e.distbits }, D = _(m, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, R), e.distbits = R.bits, D) {
              p.msg = "invalid distances set", e.mode = 30;
              break;
            }
            if (e.mode = 20, B === 6) break t;
          case 20:
            e.mode = 21;
          case 21:
            if (6 <= W && 258 <= tt) {
              p.next_out = Q, p.avail_out = tt, p.next_in = L, p.avail_in = W, e.hold = T, e.bits = I, s(p, $), Q = p.next_out, V = p.output, tt = p.avail_out, L = p.next_in, F = p.input, W = p.avail_in, T = e.hold, I = e.bits, e.mode === 12 && (e.back = -1);
              break;
            }
            for (e.back = 0; nt = (u = e.lencode[T & (1 << e.lenbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= I); ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            if (nt && !(240 & nt)) {
              for (ot = et, _t = nt, gt = ct; nt = (u = e.lencode[gt + ((T & (1 << ot + _t) - 1) >> ot)]) >>> 16 & 255, ct = 65535 & u, !(ot + (et = u >>> 24) <= I); ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              T >>>= ot, I -= ot, e.back += ot;
            }
            if (T >>>= et, I -= et, e.back += et, e.length = ct, nt === 0) {
              e.mode = 26;
              break;
            }
            if (32 & nt) {
              e.back = -1, e.mode = 12;
              break;
            }
            if (64 & nt) {
              p.msg = "invalid literal/length code", e.mode = 30;
              break;
            }
            e.extra = 15 & nt, e.mode = 22;
          case 22:
            if (e.extra) {
              for (d = e.extra; I < d; ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              e.length += T & (1 << e.extra) - 1, T >>>= e.extra, I -= e.extra, e.back += e.extra;
            }
            e.was = e.length, e.mode = 23;
          case 23:
            for (; nt = (u = e.distcode[T & (1 << e.distbits) - 1]) >>> 16 & 255, ct = 65535 & u, !((et = u >>> 24) <= I); ) {
              if (W === 0) break t;
              W--, T += F[L++] << I, I += 8;
            }
            if (!(240 & nt)) {
              for (ot = et, _t = nt, gt = ct; nt = (u = e.distcode[gt + ((T & (1 << ot + _t) - 1) >> ot)]) >>> 16 & 255, ct = 65535 & u, !(ot + (et = u >>> 24) <= I); ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              T >>>= ot, I -= ot, e.back += ot;
            }
            if (T >>>= et, I -= et, e.back += et, 64 & nt) {
              p.msg = "invalid distance code", e.mode = 30;
              break;
            }
            e.offset = ct, e.extra = 15 & nt, e.mode = 24;
          case 24:
            if (e.extra) {
              for (d = e.extra; I < d; ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              e.offset += T & (1 << e.extra) - 1, T >>>= e.extra, I -= e.extra, e.back += e.extra;
            }
            if (e.offset > e.dmax) {
              p.msg = "invalid distance too far back", e.mode = 30;
              break;
            }
            e.mode = 25;
          case 25:
            if (tt === 0) break t;
            if (H = $ - tt, e.offset > H) {
              if ((H = e.offset - H) > e.whave && e.sane) {
                p.msg = "invalid distance too far back", e.mode = 30;
                break;
              }
              st = H > e.wnext ? (H -= e.wnext, e.wsize - H) : e.wnext - H, H > e.length && (H = e.length), ut = e.window;
            } else ut = V, st = Q - e.offset, H = e.length;
            for (tt < H && (H = tt), tt -= H, e.length -= H; V[Q++] = ut[st++], --H; ) ;
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
                W--, T |= F[L++] << I, I += 8;
              }
              if ($ -= tt, p.total_out += $, e.total += $, $ && (p.adler = e.check = e.flags ? r(e.check, V, $, Q - $) : l(e.check, V, $, Q - $)), $ = tt, (e.flags ? T : o(T)) !== e.check) {
                p.msg = "incorrect data check", e.mode = 30;
                break;
              }
              I = T = 0;
            }
            e.mode = 28;
          case 28:
            if (e.wrap && e.flags) {
              for (; I < 32; ) {
                if (W === 0) break t;
                W--, T += F[L++] << I, I += 8;
              }
              if (T !== (4294967295 & e.total)) {
                p.msg = "incorrect length check", e.mode = 30;
                break;
              }
              I = T = 0;
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
            return i;
        }
        return p.next_out = Q, p.avail_out = tt, p.next_in = L, p.avail_in = W, e.hold = T, e.bits = I, (e.wsize || $ !== p.avail_out && e.mode < 30 && (e.mode < 27 || B !== 4)) && Z(p, p.output, p.next_out, $ - p.avail_out) ? (e.mode = 31, -4) : (J -= p.avail_in, $ -= p.avail_out, p.total_in += J, p.total_out += $, e.total += $, e.wrap && $ && (p.adler = e.check = e.flags ? r(e.check, V, $, p.next_out - $) : l(e.check, V, $, p.next_out - $)), p.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === 12 ? 128 : 0) + (e.mode === 20 || e.mode === 15 ? 256 : 0), (J == 0 && $ === 0 || B === 4) && D === b && (D = -5), D);
      }, v.inflateEnd = function(p) {
        if (!p || !p.state) return i;
        var B = p.state;
        return B.window && (B.window = null), p.state = null, b;
      }, v.inflateGetHeader = function(p, B) {
        var e;
        return p && p.state && 2 & (e = p.state).wrap ? ((e.head = B).done = !1, b) : i;
      }, v.inflateSetDictionary = function(p, B) {
        var e, F = B.length;
        return p && p.state ? (e = p.state).wrap !== 0 && e.mode !== 11 ? i : e.mode === 11 && l(1, B, F, 0) !== e.check ? -3 : Z(p, B, F, F) ? (e.mode = 31, -4) : (e.havedict = 1, b) : i;
      }, v.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(g, A, v) {
      var a = g("../utils/common"), l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], r = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], s = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], _ = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      A.exports = function(y, m, b, i, h, n, c, o) {
        var f, w, E, x, P, S, U, C, z, Z = o.bits, p = 0, B = 0, e = 0, F = 0, V = 0, L = 0, Q = 0, W = 0, tt = 0, T = 0, I = null, J = 0, $ = new a.Buf16(16), H = new a.Buf16(16), st = null, ut = 0;
        for (p = 0; p <= 15; p++) $[p] = 0;
        for (B = 0; B < i; B++) $[m[b + B]]++;
        for (V = Z, F = 15; 1 <= F && $[F] === 0; F--) ;
        if (F < V && (V = F), F === 0) return h[n++] = 20971520, h[n++] = 20971520, o.bits = 1, 0;
        for (e = 1; e < F && $[e] === 0; e++) ;
        for (V < e && (V = e), p = W = 1; p <= 15; p++) if (W <<= 1, (W -= $[p]) < 0) return -1;
        if (0 < W && (y === 0 || F !== 1)) return -1;
        for (H[1] = 0, p = 1; p < 15; p++) H[p + 1] = H[p] + $[p];
        for (B = 0; B < i; B++) m[b + B] !== 0 && (c[H[m[b + B]]++] = B);
        if (S = y === 0 ? (I = st = c, 19) : y === 1 ? (I = l, J -= 257, st = r, ut -= 257, 256) : (I = s, st = _, -1), p = e, P = n, Q = B = T = 0, E = -1, x = (tt = 1 << (L = V)) - 1, y === 1 && 852 < tt || y === 2 && 592 < tt) return 1;
        for (; ; ) {
          for (U = p - Q, z = c[B] < S ? (C = 0, c[B]) : c[B] > S ? (C = st[ut + c[B]], I[J + c[B]]) : (C = 96, 0), f = 1 << p - Q, e = w = 1 << L; h[P + (T >> Q) + (w -= f)] = U << 24 | C << 16 | z | 0, w !== 0; ) ;
          for (f = 1 << p - 1; T & f; ) f >>= 1;
          if (f !== 0 ? (T &= f - 1, T += f) : T = 0, B++, --$[p] == 0) {
            if (p === F) break;
            p = m[b + c[B]];
          }
          if (V < p && (T & x) !== E) {
            for (Q === 0 && (Q = V), P += e, W = 1 << (L = p - Q); L + Q < F && !((W -= $[L + Q]) <= 0); ) L++, W <<= 1;
            if (tt += 1 << L, y === 1 && 852 < tt || y === 2 && 592 < tt) return 1;
            h[E = T & x] = V << 24 | L << 16 | P - n | 0;
          }
        }
        return T !== 0 && (h[P + T] = p - Q << 24 | 64 << 16 | 0), o.bits = V, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(g, A, v) {
      A.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(g, A, v) {
      var a = g("../utils/common"), l = 0, r = 1;
      function s(u) {
        for (var k = u.length; 0 <= --k; ) u[k] = 0;
      }
      var _ = 0, y = 29, m = 256, b = m + 1 + y, i = 30, h = 19, n = 2 * b + 1, c = 15, o = 16, f = 7, w = 256, E = 16, x = 17, P = 18, S = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], U = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Z = new Array(2 * (b + 2));
      s(Z);
      var p = new Array(2 * i);
      s(p);
      var B = new Array(512);
      s(B);
      var e = new Array(256);
      s(e);
      var F = new Array(y);
      s(F);
      var V, L, Q, W = new Array(i);
      function tt(u, k, N, j, O) {
        this.static_tree = u, this.extra_bits = k, this.extra_base = N, this.elems = j, this.max_length = O, this.has_stree = u && u.length;
      }
      function T(u, k) {
        this.dyn_tree = u, this.max_code = 0, this.stat_desc = k;
      }
      function I(u) {
        return u < 256 ? B[u] : B[256 + (u >>> 7)];
      }
      function J(u, k) {
        u.pending_buf[u.pending++] = 255 & k, u.pending_buf[u.pending++] = k >>> 8 & 255;
      }
      function $(u, k, N) {
        u.bi_valid > o - N ? (u.bi_buf |= k << u.bi_valid & 65535, J(u, u.bi_buf), u.bi_buf = k >> o - u.bi_valid, u.bi_valid += N - o) : (u.bi_buf |= k << u.bi_valid & 65535, u.bi_valid += N);
      }
      function H(u, k, N) {
        $(u, N[2 * k], N[2 * k + 1]);
      }
      function st(u, k) {
        for (var N = 0; N |= 1 & u, u >>>= 1, N <<= 1, 0 < --k; ) ;
        return N >>> 1;
      }
      function ut(u, k, N) {
        var j, O, M = new Array(c + 1), K = 0;
        for (j = 1; j <= c; j++) M[j] = K = K + N[j - 1] << 1;
        for (O = 0; O <= k; O++) {
          var X = u[2 * O + 1];
          X !== 0 && (u[2 * O] = st(M[X]++, X));
        }
      }
      function et(u) {
        var k;
        for (k = 0; k < b; k++) u.dyn_ltree[2 * k] = 0;
        for (k = 0; k < i; k++) u.dyn_dtree[2 * k] = 0;
        for (k = 0; k < h; k++) u.bl_tree[2 * k] = 0;
        u.dyn_ltree[2 * w] = 1, u.opt_len = u.static_len = 0, u.last_lit = u.matches = 0;
      }
      function nt(u) {
        8 < u.bi_valid ? J(u, u.bi_buf) : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf), u.bi_buf = 0, u.bi_valid = 0;
      }
      function ct(u, k, N, j) {
        var O = 2 * k, M = 2 * N;
        return u[O] < u[M] || u[O] === u[M] && j[k] <= j[N];
      }
      function ot(u, k, N) {
        for (var j = u.heap[N], O = N << 1; O <= u.heap_len && (O < u.heap_len && ct(k, u.heap[O + 1], u.heap[O], u.depth) && O++, !ct(k, j, u.heap[O], u.depth)); ) u.heap[N] = u.heap[O], N = O, O <<= 1;
        u.heap[N] = j;
      }
      function _t(u, k, N) {
        var j, O, M, K, X = 0;
        if (u.last_lit !== 0) for (; j = u.pending_buf[u.d_buf + 2 * X] << 8 | u.pending_buf[u.d_buf + 2 * X + 1], O = u.pending_buf[u.l_buf + X], X++, j === 0 ? H(u, O, k) : (H(u, (M = e[O]) + m + 1, k), (K = S[M]) !== 0 && $(u, O -= F[M], K), H(u, M = I(--j), N), (K = U[M]) !== 0 && $(u, j -= W[M], K)), X < u.last_lit; ) ;
        H(u, w, k);
      }
      function gt(u, k) {
        var N, j, O, M = k.dyn_tree, K = k.stat_desc.static_tree, X = k.stat_desc.has_stree, q = k.stat_desc.elems, at = -1;
        for (u.heap_len = 0, u.heap_max = n, N = 0; N < q; N++) M[2 * N] !== 0 ? (u.heap[++u.heap_len] = at = N, u.depth[N] = 0) : M[2 * N + 1] = 0;
        for (; u.heap_len < 2; ) M[2 * (O = u.heap[++u.heap_len] = at < 2 ? ++at : 0)] = 1, u.depth[O] = 0, u.opt_len--, X && (u.static_len -= K[2 * O + 1]);
        for (k.max_code = at, N = u.heap_len >> 1; 1 <= N; N--) ot(u, M, N);
        for (O = q; N = u.heap[1], u.heap[1] = u.heap[u.heap_len--], ot(u, M, 1), j = u.heap[1], u.heap[--u.heap_max] = N, u.heap[--u.heap_max] = j, M[2 * O] = M[2 * N] + M[2 * j], u.depth[O] = (u.depth[N] >= u.depth[j] ? u.depth[N] : u.depth[j]) + 1, M[2 * N + 1] = M[2 * j + 1] = O, u.heap[1] = O++, ot(u, M, 1), 2 <= u.heap_len; ) ;
        u.heap[--u.heap_max] = u.heap[1], function(rt, mt) {
          var xt, bt, St, lt, Ct, Tt, vt = mt.dyn_tree, Rt = mt.max_code, Wt = mt.stat_desc.static_tree, Mt = mt.stat_desc.has_stree, Zt = mt.stat_desc.extra_bits, Pt = mt.stat_desc.extra_base, Et = mt.stat_desc.max_length, zt = 0;
          for (lt = 0; lt <= c; lt++) rt.bl_count[lt] = 0;
          for (vt[2 * rt.heap[rt.heap_max] + 1] = 0, xt = rt.heap_max + 1; xt < n; xt++) Et < (lt = vt[2 * vt[2 * (bt = rt.heap[xt]) + 1] + 1] + 1) && (lt = Et, zt++), vt[2 * bt + 1] = lt, Rt < bt || (rt.bl_count[lt]++, Ct = 0, Pt <= bt && (Ct = Zt[bt - Pt]), Tt = vt[2 * bt], rt.opt_len += Tt * (lt + Ct), Mt && (rt.static_len += Tt * (Wt[2 * bt + 1] + Ct)));
          if (zt !== 0) {
            do {
              for (lt = Et - 1; rt.bl_count[lt] === 0; ) lt--;
              rt.bl_count[lt]--, rt.bl_count[lt + 1] += 2, rt.bl_count[Et]--, zt -= 2;
            } while (0 < zt);
            for (lt = Et; lt !== 0; lt--) for (bt = rt.bl_count[lt]; bt !== 0; ) Rt < (St = rt.heap[--xt]) || (vt[2 * St + 1] !== lt && (rt.opt_len += (lt - vt[2 * St + 1]) * vt[2 * St], vt[2 * St + 1] = lt), bt--);
          }
        }(u, k), ut(M, at, u.bl_count);
      }
      function t(u, k, N) {
        var j, O, M = -1, K = k[1], X = 0, q = 7, at = 4;
        for (K === 0 && (q = 138, at = 3), k[2 * (N + 1) + 1] = 65535, j = 0; j <= N; j++) O = K, K = k[2 * (j + 1) + 1], ++X < q && O === K || (X < at ? u.bl_tree[2 * O] += X : O !== 0 ? (O !== M && u.bl_tree[2 * O]++, u.bl_tree[2 * E]++) : X <= 10 ? u.bl_tree[2 * x]++ : u.bl_tree[2 * P]++, M = O, at = (X = 0) === K ? (q = 138, 3) : O === K ? (q = 6, 3) : (q = 7, 4));
      }
      function D(u, k, N) {
        var j, O, M = -1, K = k[1], X = 0, q = 7, at = 4;
        for (K === 0 && (q = 138, at = 3), j = 0; j <= N; j++) if (O = K, K = k[2 * (j + 1) + 1], !(++X < q && O === K)) {
          if (X < at) for (; H(u, O, u.bl_tree), --X != 0; ) ;
          else O !== 0 ? (O !== M && (H(u, O, u.bl_tree), X--), H(u, E, u.bl_tree), $(u, X - 3, 2)) : X <= 10 ? (H(u, x, u.bl_tree), $(u, X - 3, 3)) : (H(u, P, u.bl_tree), $(u, X - 11, 7));
          M = O, at = (X = 0) === K ? (q = 138, 3) : O === K ? (q = 6, 3) : (q = 7, 4);
        }
      }
      s(W);
      var R = !1;
      function d(u, k, N, j) {
        $(u, (_ << 1) + (j ? 1 : 0), 3), function(O, M, K, X) {
          nt(O), J(O, K), J(O, ~K), a.arraySet(O.pending_buf, O.window, M, K, O.pending), O.pending += K;
        }(u, k, N);
      }
      v._tr_init = function(u) {
        R || (function() {
          var k, N, j, O, M, K = new Array(c + 1);
          for (O = j = 0; O < y - 1; O++) for (F[O] = j, k = 0; k < 1 << S[O]; k++) e[j++] = O;
          for (e[j - 1] = O, O = M = 0; O < 16; O++) for (W[O] = M, k = 0; k < 1 << U[O]; k++) B[M++] = O;
          for (M >>= 7; O < i; O++) for (W[O] = M << 7, k = 0; k < 1 << U[O] - 7; k++) B[256 + M++] = O;
          for (N = 0; N <= c; N++) K[N] = 0;
          for (k = 0; k <= 143; ) Z[2 * k + 1] = 8, k++, K[8]++;
          for (; k <= 255; ) Z[2 * k + 1] = 9, k++, K[9]++;
          for (; k <= 279; ) Z[2 * k + 1] = 7, k++, K[7]++;
          for (; k <= 287; ) Z[2 * k + 1] = 8, k++, K[8]++;
          for (ut(Z, b + 1, K), k = 0; k < i; k++) p[2 * k + 1] = 5, p[2 * k] = st(k, 5);
          V = new tt(Z, S, m + 1, b, c), L = new tt(p, U, 0, i, c), Q = new tt(new Array(0), C, 0, h, f);
        }(), R = !0), u.l_desc = new T(u.dyn_ltree, V), u.d_desc = new T(u.dyn_dtree, L), u.bl_desc = new T(u.bl_tree, Q), u.bi_buf = 0, u.bi_valid = 0, et(u);
      }, v._tr_stored_block = d, v._tr_flush_block = function(u, k, N, j) {
        var O, M, K = 0;
        0 < u.level ? (u.strm.data_type === 2 && (u.strm.data_type = function(X) {
          var q, at = 4093624447;
          for (q = 0; q <= 31; q++, at >>>= 1) if (1 & at && X.dyn_ltree[2 * q] !== 0) return l;
          if (X.dyn_ltree[18] !== 0 || X.dyn_ltree[20] !== 0 || X.dyn_ltree[26] !== 0) return r;
          for (q = 32; q < m; q++) if (X.dyn_ltree[2 * q] !== 0) return r;
          return l;
        }(u)), gt(u, u.l_desc), gt(u, u.d_desc), K = function(X) {
          var q;
          for (t(X, X.dyn_ltree, X.l_desc.max_code), t(X, X.dyn_dtree, X.d_desc.max_code), gt(X, X.bl_desc), q = h - 1; 3 <= q && X.bl_tree[2 * z[q] + 1] === 0; q--) ;
          return X.opt_len += 3 * (q + 1) + 5 + 5 + 4, q;
        }(u), O = u.opt_len + 3 + 7 >>> 3, (M = u.static_len + 3 + 7 >>> 3) <= O && (O = M)) : O = M = N + 5, N + 4 <= O && k !== -1 ? d(u, k, N, j) : u.strategy === 4 || M === O ? ($(u, 2 + (j ? 1 : 0), 3), _t(u, Z, p)) : ($(u, 4 + (j ? 1 : 0), 3), function(X, q, at, rt) {
          var mt;
          for ($(X, q - 257, 5), $(X, at - 1, 5), $(X, rt - 4, 4), mt = 0; mt < rt; mt++) $(X, X.bl_tree[2 * z[mt] + 1], 3);
          D(X, X.dyn_ltree, q - 1), D(X, X.dyn_dtree, at - 1);
        }(u, u.l_desc.max_code + 1, u.d_desc.max_code + 1, K + 1), _t(u, u.dyn_ltree, u.dyn_dtree)), et(u), j && nt(u);
      }, v._tr_tally = function(u, k, N) {
        return u.pending_buf[u.d_buf + 2 * u.last_lit] = k >>> 8 & 255, u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & k, u.pending_buf[u.l_buf + u.last_lit] = 255 & N, u.last_lit++, k === 0 ? u.dyn_ltree[2 * N]++ : (u.matches++, k--, u.dyn_ltree[2 * (e[N] + m + 1)]++, u.dyn_dtree[2 * I(k)]++), u.last_lit === u.lit_bufsize - 1;
      }, v._tr_align = function(u) {
        $(u, 2, 3), H(u, w, Z), function(k) {
          k.bi_valid === 16 ? (J(k, k.bi_buf), k.bi_buf = 0, k.bi_valid = 0) : 8 <= k.bi_valid && (k.pending_buf[k.pending++] = 255 & k.bi_buf, k.bi_buf >>= 8, k.bi_valid -= 8);
        }(u);
      };
    }, { "../utils/common": 41 }], 53: [function(g, A, v) {
      A.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(g, A, v) {
      (function(a) {
        (function(l, r) {
          if (!l.setImmediate) {
            var s, _, y, m, b = 1, i = {}, h = !1, n = l.document, c = Object.getPrototypeOf && Object.getPrototypeOf(l);
            c = c && c.setTimeout ? c : l, s = {}.toString.call(l.process) === "[object process]" ? function(E) {
              process.nextTick(function() {
                f(E);
              });
            } : function() {
              if (l.postMessage && !l.importScripts) {
                var E = !0, x = l.onmessage;
                return l.onmessage = function() {
                  E = !1;
                }, l.postMessage("", "*"), l.onmessage = x, E;
              }
            }() ? (m = "setImmediate$" + Math.random() + "$", l.addEventListener ? l.addEventListener("message", w, !1) : l.attachEvent("onmessage", w), function(E) {
              l.postMessage(m + E, "*");
            }) : l.MessageChannel ? ((y = new MessageChannel()).port1.onmessage = function(E) {
              f(E.data);
            }, function(E) {
              y.port2.postMessage(E);
            }) : n && "onreadystatechange" in n.createElement("script") ? (_ = n.documentElement, function(E) {
              var x = n.createElement("script");
              x.onreadystatechange = function() {
                f(E), x.onreadystatechange = null, _.removeChild(x), x = null;
              }, _.appendChild(x);
            }) : function(E) {
              setTimeout(f, 0, E);
            }, c.setImmediate = function(E) {
              typeof E != "function" && (E = new Function("" + E));
              for (var x = new Array(arguments.length - 1), P = 0; P < x.length; P++) x[P] = arguments[P + 1];
              var S = { callback: E, args: x };
              return i[b] = S, s(b), b++;
            }, c.clearImmediate = o;
          }
          function o(E) {
            delete i[E];
          }
          function f(E) {
            if (h) setTimeout(f, 0, E);
            else {
              var x = i[E];
              if (x) {
                h = !0;
                try {
                  (function(P) {
                    var S = P.callback, U = P.args;
                    switch (U.length) {
                      case 0:
                        S();
                        break;
                      case 1:
                        S(U[0]);
                        break;
                      case 2:
                        S(U[0], U[1]);
                        break;
                      case 3:
                        S(U[0], U[1], U[2]);
                        break;
                      default:
                        S.apply(r, U);
                    }
                  })(x);
                } finally {
                  o(E), h = !1;
                }
              }
            }
          }
          function w(E) {
            E.source === l && typeof E.data == "string" && E.data.indexOf(m) === 0 && f(+E.data.slice(m.length));
          }
        })(typeof self > "u" ? a === void 0 ? this : a : self);
      }).call(this, typeof At < "u" ? At : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Ut);
var Kt = Ut.exports;
const Vt = /* @__PURE__ */ $t(Kt);
function Yt() {
  const [G, Y] = ft(""), [g, A] = ft(!1), [v, a] = ft(""), [l, r] = ft(null);
  let s = "", _ = "";
  const y = yt(null), m = yt(null), b = {}, i = [
    "text/html",
    "text/xml",
    "application/xml",
    "application/xhtml+xml",
    "image/svg+xml"
  ], h = Bt(
    async (C) => {
      A(!0), Y(""), a("Loading..."), r(null), m.current && (document.head.removeChild(m.current), URL.revokeObjectURL(m.current.href), m.current = null);
      try {
        let z;
        if (typeof C == "string") {
          const Z = await fetch(C);
          if (!Z.ok)
            throw new Error(
              `HTTP error! status: ${Z.status} ${Z.statusText}`
            );
          z = await Z.arrayBuffer();
        } else C instanceof File ? z = await C.arrayBuffer() : z = C;
        if (!z || z.byteLength === 0)
          throw new Error(
            "EPUB source is empty or could not be read."
          );
        y.current = await Vt.loadAsync(z), await n();
      } catch (z) {
        const Z = z instanceof Error ? z.message : "An unknown error occurred while fetching or loading the EPUB.";
        console.error("Error processing EPUB source:", z), r(Z), Y(""), a(""), A(!1);
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
    const Z = await z.async("text"), p = c(Z);
    if (!p)
      throw new Error("OPF file path not found in container.xml.");
    s = p.substring(0, p.lastIndexOf("/") + 1);
    const B = y.current.file(p);
    if (!B) throw new Error(`OPF file not found at path: ${p}`);
    const e = await B.async("text"), V = new DOMParser().parseFromString(e, "application/xml"), L = V.querySelector("parsererror");
    if (L)
      throw new Error(
        `Error parsing OPF file: ${L.textContent || "Unknown XML parse error"}`
      );
    o(V), await f(V);
  }
  function c(C) {
    const p = new DOMParser().parseFromString(
      C,
      "application/xml"
    ).querySelector(
      'rootfile[media-type="application/oebps-package+xml"]'
    );
    return (p == null ? void 0 : p.getAttribute("full-path")) ?? null;
  }
  function o(C) {
    const z = C.querySelector("metadata > dc\\:title") || C.querySelector("metadata > title");
    a((z == null ? void 0 : z.textContent) || "Untitled Book");
  }
  async function f(C) {
    if (!y.current) return;
    const z = {};
    C.querySelectorAll("manifest > item").forEach((e) => {
      const F = e.getAttribute("id"), V = e.getAttribute("href"), L = e.getAttribute("media-type");
      F && V && L && (z[F] = { href: decodeURIComponent(V), type: L });
    });
    const Z = Array.from(
      C.querySelectorAll("spine > itemref")
    ).map((e) => e.getAttribute("idref"));
    let p = "";
    const B = /* @__PURE__ */ new Set();
    for (const e of Z) {
      if (!e) continue;
      const F = z[e];
      if (F) {
        const V = s + F.href, L = y.current.file(V);
        if (L && (F.type.includes("html") || F.type.includes("xml")))
          try {
            const Q = await L.async("text"), W = await w(
              Q,
              F.type
            );
            p += `<div class="bok-chapter">${W}</div>`;
          } catch (Q) {
            console.warn(
              `Failed to process spine item ${V}:`,
              Q
            );
          }
      }
    }
    for (const e in z) {
      const F = z[e];
      if (F.type.includes("css")) {
        const V = s + F.href;
        if (!B.has(V)) {
          const L = y.current.file(V);
          if (L)
            try {
              _ += await L.async("text") + `
`, B.add(V);
            } catch (Q) {
              console.warn(`Failed to load CSS ${V}:`, Q);
            }
        }
      }
    }
    U(), Y(p);
  }
  async function w(C, z) {
    let Z = [...C.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((B) => B[1]).join(`
`);
    Z = E(Z), _ += Z;
    let p = C.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    return p = await x(p, z), p;
  }
  function E(C) {
    const z = [
      "background-color",
      "color",
      "font-size",
      "font-family",
      "font-weight",
      "line-height",
      "text-align"
    ];
    return C.split(/}/).map((Z) => {
      const p = Z.split(/{/), B = p[0], e = p[1];
      if (!e) return "";
      const F = e.split(/;/).map((V) => V.trim()).filter((V) => V ? !z.some(
        (L) => new RegExp(`^${L}s*:`, "i").test(V)
      ) : !1).join("; ");
      return F ? `${B.trim()} { ${F}; }` : "";
    }).filter((Z) => !!Z).join(`
`);
  }
  async function x(C, z) {
    const Z = new DOMParser();
    if (i.includes(z))
      try {
        const p = Z.parseFromString(
          C,
          z
        ), B = p.querySelector("parsererror");
        if (B)
          return console.warn(
            "Parser error in content item during cleanImages, skipping.",
            B.textContent
          ), C;
        const e = p.querySelectorAll("img");
        for (const Q of e)
          await P(Q);
        const F = p.querySelectorAll("image");
        for (const Q of F)
          await S(Q);
        return new XMLSerializer().serializeToString(
          p.documentElement || p
        );
      } catch (p) {
        return console.error(
          "Error during cleanImages DOM processing:",
          p
        ), C;
      }
    else return C;
  }
  async function P(C) {
    var Z;
    let z = C.getAttribute("src");
    if (z) {
      for (; z.startsWith(".") || z.startsWith("/"); ) z = z.slice(1);
      if (z = s + z, b[z] === void 0) {
        const p = (Z = y.current) == null ? void 0 : Z.file(z);
        if (p)
          try {
            const B = await p.async("blob"), e = URL.createObjectURL(B);
            b[z] = e;
          } catch (B) {
            console.warn(
              `Could not load image blob (formatImg) ${z}:`,
              B
            ), b[z] = "";
          }
        else
          console.warn(`Image file not found in zip (formatImg): ${z}`), b[z] = "";
      }
      C.setAttribute("src", b[z]);
    }
  }
  async function S(C) {
    var Z;
    let z = C.getAttribute("xlink:href");
    if (z) {
      for (; z.startsWith(".") || z.startsWith("/"); ) z = z.slice(1);
      if (z = s + z, b[z] === void 0) {
        const p = (Z = y.current) == null ? void 0 : Z.file(z);
        if (p)
          try {
            const B = await p.async("blob"), e = URL.createObjectURL(B);
            b[z] = e;
          } catch (B) {
            console.warn(
              `Could not load image blob (formatXMLImage) ${z}:`,
              B
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
  function U() {
    if (!_.trim()) return;
    const C = new Blob([_], { type: "text/css" }), z = URL.createObjectURL(C);
    m.current = document.createElement("link"), m.current.href = z, m.current.rel = "stylesheet", m.current.setAttribute("data-bok-reader-style", "true"), document.head.appendChild(m.current);
  }
  return {
    title: v,
    rawContent: G,
    isLoading: g,
    error: l,
    loadEpub: h,
    setIsLoading: A
  };
}
function jt(G) {
  const [Y, g] = ft({
    width: 0,
    height: 0,
    noOfPages: 1
  });
  return dt(() => {
    const A = G == null ? void 0 : G.current, v = () => {
      if (A) {
        const a = A.getBoundingClientRect(), l = a.height < a.width;
        g((r) => {
          const s = l ? a.width / 2 : a.width, _ = a.height, y = l ? 2 : 1;
          return r.width !== s || r.height !== _ || r.noOfPages !== y ? {
            width: s,
            height: _,
            noOfPages: y
          } : r;
        });
      } else
        g({ width: 0, height: 0, noOfPages: 1 });
    };
    if (A) {
      v();
      const a = new ResizeObserver(v);
      return a.observe(A), () => {
        a.unobserve(A);
      };
    }
  }, [G]), [Y.width, Y.height, Y.noOfPages];
}
function qt(G) {
  const [Y, g] = ft(0), A = Bt(() => {
    if (G.current) {
      const v = G.current.scrollWidth, a = G.current.scrollLeft, l = v > 0 ? a / v : 0;
      g(l);
    }
  }, [G]);
  return dt(() => {
    const v = G.current;
    if (!v) return;
    let a = null;
    const l = 100, r = () => {
      a && clearTimeout(a), a = setTimeout(() => {
        A();
      }, l);
    };
    return v.addEventListener("scroll", r), A(), () => {
      a && clearTimeout(a), v.removeEventListener("scroll", r);
    };
  }, [A, G]), [Y, g];
}
function Jt(G, Y, g, A, v) {
  let a = "";
  dt(() => {
    Y > 1e-7 && (a = JSON.stringify({
      percentRead: Y,
      padding: g,
      fontSize: A,
      fontFamily: v
    }), localStorage.setItem(G, a));
  }, [G, Y, g, A, v]);
}
const Qt = (G, Y, g) => {
  const [A, v] = jt(g), a = yt(null), l = yt(""), r = Bt(
    (s, _) => {
      Y || (s / A <= 0.4 && _ / v < 0.8 && G(-1), s / A > 0.4 && _ / v < 0.8 && G(1));
    },
    [G, Y, A, v]
  );
  dt(() => {
    const s = () => {
      var y;
      const _ = (y = window.getSelection()) == null ? void 0 : y.toString();
      _ && _.length > 0 ? l.current = _ : l.current = "";
    };
    return document.addEventListener("selectionchange", s), () => {
      document.removeEventListener("selectionchange", s);
    };
  }, []), dt(() => {
    const s = () => {
      a.current = window.setTimeout(() => {
        a.current = null;
      }, 500);
    }, _ = (y) => {
      if (a.current && l.current) {
        clearTimeout(a.current), a.current = null;
        const { pageX: m, pageY: b } = y.touches[0];
        r(m, b);
      }
    };
    return window.addEventListener("touchstart", s), window.addEventListener("touchend", _), () => {
      window.removeEventListener("touchstart", s), window.removeEventListener("touchend", _);
    };
  }, [A, r]), dt(() => {
    const s = g.current, _ = () => {
      a.current = window.setTimeout(() => {
      }, 200);
    }, y = (m) => {
      a.current && !l.current && (clearTimeout(a.current), a.current = null, r(m.clientX, m.clientY));
    };
    return s == null || s.addEventListener("mousedown", _), s == null || s.addEventListener("mouseup", y), () => {
      s == null || s.removeEventListener("mousedown", _), s == null || s.removeEventListener("mouseup", y);
    };
  }, [A, Y, r, g]);
};
function te({ currentPage: G, pages: Y }) {
  return /* @__PURE__ */ pt("div", { className: "page-number", children: [
    G + 1,
    "/",
    Y
  ] });
}
function ee({
  content: G,
  title: Y,
  setIsLoading: g,
  fontSize: A,
  sidePadding: v,
  fontFamily: a,
  isOptionMenuVisible: l,
  setFontSize: r,
  setPadding: s,
  setFontFamily: _,
  containerElementRef: y
}) {
  const m = yt(null), [b, i, h] = jt(y), [n, c] = qt(m), [o, f] = ft(1), [w, E] = ft(0);
  Jt(Y, n, v, A, a);
  const x = Bt(
    (P) => {
      f((S) => {
        const U = m.current;
        if (U && w > 0 && h > 0 && U.clientWidth > 0) {
          let C = S + P;
          return C < 0 && (C = 0), C >= w && (C = w - 1), U.scroll({
            left: C * b * h,
            behavior: "smooth"
          }), C;
        }
        return S;
      });
    },
    [b, w, h]
  );
  return Qt(x, l, y), dt(() => {
    if (!Y) return;
    const P = localStorage.getItem(Y);
    if (P)
      try {
        const S = JSON.parse(P);
        S && (c(S.percentRead || 0), S.fontSize !== void 0 && r(S.fontSize), S.padding !== void 0 && s(S.padding), S.fontFamily !== void 0 && _(S.fontFamily));
      } catch (S) {
        console.error("Failed to parse local storage for", Y, S), c(0);
      }
    else
      c(0);
    f(1);
  }, [Y, c, r, s, _]), dt(() => {
    const P = m.current;
    if (!P || b <= 0 || i <= 0) return;
    g(!0);
    const S = setTimeout(() => {
      P.style.setProperty(
        "--side-padding",
        `${v}px`
      ), P.style.setProperty("--font-size", `${A}em`), P.style.setProperty("--font-family", a), P.style.maxHeight = `${i}px`;
      const U = P.scrollWidth, C = b > 0 && U > 0 ? Math.round(U / b) : 0, z = h === 1 ? C : Math.round(C / 2);
      if (E(z), z > 0 && P.clientWidth > 0) {
        let Z = Math.round(z * n);
        Z = Math.max(
          0,
          Math.min(z - 1, Z)
        ), o !== Z && (f(Z), P.scrollLeft = Z * b * h);
      } else
        g(!1), f(1);
      g(!1);
    }, 400);
    return () => {
      clearTimeout(S);
    };
  }, [
    b,
    i,
    v,
    A,
    a,
    h,
    G,
    Y,
    g
  ]), dt(() => {
    const P = (S) => {
      S.key === "ArrowLeft" ? (S.preventDefault(), x(-1)) : S.key === "ArrowRight" && (S.preventDefault(), x(1));
    };
    return document.addEventListener("keydown", P), () => {
      document.removeEventListener("keydown", P);
    };
  }, [x, b, n]), /* @__PURE__ */ pt(Nt, { children: [
    /* @__PURE__ */ it(
      "div",
      {
        ref: m,
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
  var Y, g = (G.match(/^[0-9.]*/) || "").toString();
  g.includes(".") ? Y = parseFloat(g) : Y = parseInt(g, 10);
  var A = (G.match(/[^0-9]*$/) || "").toString();
  return re[A] ? {
    value: Y,
    unit: A
  } : (console.warn("React Spinners: ".concat(G, " is not a valid css value. Defaulting to ").concat(Y, "px.")), {
    value: Y,
    unit: "px"
  });
}
var kt = function(G, Y, g) {
  var A = "react-spinners-".concat(G, "-").concat(g);
  if (typeof window > "u" || !window.document)
    return A;
  var v = document.createElement("style");
  document.head.appendChild(v);
  var a = v.sheet, l = `
    @keyframes `.concat(A, ` {
      `).concat(Y, `
    }
  `);
  return a && a.insertRule(l, 0), A;
}, It = function() {
  return It = Object.assign || function(G) {
    for (var Y, g = 1, A = arguments.length; g < A; g++) {
      Y = arguments[g];
      for (var v in Y) Object.prototype.hasOwnProperty.call(Y, v) && (G[v] = Y[v]);
    }
    return G;
  }, It.apply(this, arguments);
}, ie = function(G, Y) {
  var g = {};
  for (var A in G) Object.prototype.hasOwnProperty.call(G, A) && Y.indexOf(A) < 0 && (g[A] = G[A]);
  if (G != null && typeof Object.getOwnPropertySymbols == "function")
    for (var v = 0, A = Object.getOwnPropertySymbols(G); v < A.length; v++)
      Y.indexOf(A[v]) < 0 && Object.prototype.propertyIsEnumerable.call(G, A[v]) && (g[A[v]] = G[A[v]]);
  return g;
}, ht = [1, 3, 5], ae = [
  kt("PropagateLoader", "25% {transform: translateX(-".concat(ht[0], `rem) scale(0.75)}
    50% {transform: translateX(-`).concat(ht[1], `rem) scale(0.6)}
    75% {transform: translateX(-`).concat(ht[2], `rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-0"),
  kt("PropagateLoader", "25% {transform: translateX(-".concat(ht[0], `rem) scale(0.75)}
    50% {transform: translateX(-`).concat(ht[1], `rem) scale(0.6)}
    75% {transform: translateX(-`).concat(ht[1], `rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-1"),
  kt("PropagateLoader", "25% {transform: translateX(-".concat(ht[0], `rem) scale(0.75)}
    75% {transform: translateX(-`).concat(ht[0], `rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-2"),
  kt("PropagateLoader", "25% {transform: translateX(".concat(ht[0], `rem) scale(0.75)}
    75% {transform: translateX(`).concat(ht[0], `rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-3"),
  kt("PropagateLoader", "25% {transform: translateX(".concat(ht[0], `rem) scale(0.75)}
    50% {transform: translateX(`).concat(ht[1], `rem) scale(0.6)}
    75% {transform: translateX(`).concat(ht[1], `rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-4"),
  kt("PropagateLoader", "25% {transform: translateX(".concat(ht[0], `rem) scale(0.75)}
    50% {transform: translateX(`).concat(ht[1], `rem) scale(0.6)}
    75% {transform: translateX(`).concat(ht[2], `rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`), "propogate-5")
];
function se(G) {
  var Y = G.loading, g = Y === void 0 ? !0 : Y, A = G.color, v = A === void 0 ? "#000000" : A, a = G.speedMultiplier, l = a === void 0 ? 1 : a, r = G.cssOverride, s = r === void 0 ? {} : r, _ = G.size, y = _ === void 0 ? 15 : _, m = ie(G, ["loading", "color", "speedMultiplier", "cssOverride", "size"]), b = ne(y), i = b.value, h = b.unit, n = It({ display: "inherit", position: "relative" }, s), c = function(o) {
    return {
      position: "absolute",
      fontSize: "".concat(i / 3).concat(h),
      width: "".concat(i).concat(h),
      height: "".concat(i).concat(h),
      background: v,
      borderRadius: "50%",
      animation: "".concat(ae[o], " ").concat(1.5 / l, "s infinite"),
      animationFillMode: "forwards"
    };
  };
  return g ? wt.createElement(
    "span",
    It({ style: n }, m),
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
function oe({
  isLoading: G,
  color: Y
}) {
  return /* @__PURE__ */ it(
    "div",
    {
      className: G ? Ft["loading-screen"] : Ft["loading-screen-gon"],
      children: /* @__PURE__ */ it("div", { children: /* @__PURE__ */ it(
        se,
        {
          color: Y || "red"
        }
      ) })
    }
  );
}
function le() {
  document.fullscreenElement ? document.exitFullscreen && document.exitFullscreen() : document.documentElement.requestFullscreen();
}
function ce({
  onClose: G,
  fontSize: Y,
  padding: g,
  fontFamily: A,
  setFontSize: v,
  setPadding: a,
  setFontFamily: l,
  supportedFonts: r
}) {
  const [s, _] = ft(!1), [y, m] = ft(!1), b = yt(null), i = yt(null), h = [
    { displayName: "System Default", name: "system-ui" },
    ...r
  ];
  dt(() => {
    const S = setTimeout(() => {
      m(!0);
    }, 0);
    return () => clearTimeout(S);
  }, []);
  const n = () => {
    m(!1), _(!0);
  };
  dt(() => {
    if (s) {
      const S = setTimeout(() => {
        G();
      }, 300);
      return () => clearTimeout(S);
    }
  }, [s, G]);
  const c = () => {
    n();
  }, o = (S) => {
    S.stopPropagation();
  }, f = (S) => {
    S.current && (S.current.classList.add("value-changed"), setTimeout(() => {
      S.current && S.current.classList.remove("value-changed");
    }, 300));
  }, w = () => {
    g <= 70 && (a((S) => S + 5), f(i));
  }, E = () => {
    g - 5 > 0 && (a((S) => S - 5), f(i));
  }, x = () => {
    Y < 3 && (v((S) => S + 0.2), f(b));
  }, P = () => {
    Y - 0.2 > 0.6 && (v((S) => S - 0.2), f(b));
  };
  return /* @__PURE__ */ it(
    "div",
    {
      className: `options-menu-overlay ${s ? "fade-out" : ""}`,
      onClick: c,
      children: /* @__PURE__ */ pt(
        "div",
        {
          className: `options-menu ${y ? "visible" : ""} ${s ? "slide-down" : ""}`,
          onClick: o,
          children: [
            /* @__PURE__ */ it("button", { onClick: n, className: "close-button", children: "✕" }),
            /* @__PURE__ */ it("h2", { children: "Reader Options" }),
            /* @__PURE__ */ pt("div", { className: "options-buttons", children: [
              /* @__PURE__ */ pt("div", { className: "font-family-buttons", children: [
                /* @__PURE__ */ it(
                  "select",
                  {
                    value: A,
                    onChange: (S) => {
                      for (const U of h)
                        U.name === S.target.value && l(S.target.value);
                    },
                    children: h.map((S) => /* @__PURE__ */ it(
                      "option",
                      {
                        value: S.name,
                        children: S.displayName
                      },
                      S.displayName
                    ))
                  }
                ),
                /* @__PURE__ */ it("div", { className: "option-label", children: "Font family" })
              ] }),
              /* @__PURE__ */ pt("div", { className: "padding-buttons", children: [
                /* @__PURE__ */ it("button", { onClick: w, children: "+" }),
                /* @__PURE__ */ it("button", { onClick: E, children: "-" }),
                /* @__PURE__ */ pt("div", { children: [
                  /* @__PURE__ */ it("span", { className: "option-label", children: "Side padding: " }),
                  /* @__PURE__ */ it(
                    "span",
                    {
                      ref: i,
                      className: "option-value",
                      children: g
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ pt("div", { className: "font-buttons", children: [
                /* @__PURE__ */ it("button", { onClick: x, children: "+" }),
                /* @__PURE__ */ it("button", { onClick: P, children: "-" }),
                /* @__PURE__ */ pt("div", { style: { marginLeft: "auto" }, children: [
                  /* @__PURE__ */ it("span", { className: "option-label", children: "Font size: " }),
                  /* @__PURE__ */ it("span", { ref: b, className: "option-value", children: Math.round(Y * 10) })
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
`, Lt = Ht.div`
    width: 100%;
    height: 100%;
    position: relative;d
    overflow: hidden;d
    overflow-y: hidden;
`, fe = ({
  epubDataSource: G,
  onTitleChange: Y,
  onLoadingChange: g,
  onError: A,
  className: v,
  style: a,
  color: l,
  supportedFonts: r = []
}) => {
  const { title: s, rawContent: _, isLoading: y, error: m, loadEpub: b, setIsLoading: i } = Yt(), [h, n] = ft(!1), [c, o] = ft(1.2), [f, w] = ft(30), [E, x] = ft("Inter"), P = yt(null);
  dt(() => {
    G && b(G);
  }, [G, b]), dt(() => {
    Y && Y(s);
  }, [s, Y]), dt(() => {
    g && g(y);
  }, [y, g]), dt(() => {
    m && A && A(m);
  }, [m, A]);
  const S = Xt(
    () => ({
      "--color-tint": l,
      "--side-padding": `${f}px`,
      "--top-padding": "30px",
      // Example: make these configurable too if needed
      "--bottom-padding": "70px",
      // Example
      "--font-size": `${c}em`,
      "--font-family": E
    }),
    [f, c, E]
  );
  return m && !y && !_ ? /* @__PURE__ */ pt(
    Lt,
    {
      className: `bok-reader-container ${v || ""}`,
      style: a,
      children: [
        /* @__PURE__ */ it(Dt, {}),
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
      style: { ...a, ...S },
      ref: P,
      children: [
        /* @__PURE__ */ it(Dt, {}),
        /* @__PURE__ */ it(oe, { isLoading: y, color: l }),
        _ && /* @__PURE__ */ pt(Nt, { children: [
          /* @__PURE__ */ it(
            ee,
            {
              content: _,
              title: s,
              setIsLoading: i,
              fontSize: c,
              sidePadding: f,
              fontFamily: E,
              setPadding: w,
              setFontSize: o,
              setFontFamily: x,
              isOptionMenuVisible: h,
              containerElementRef: P
            }
          ),
          h && /* @__PURE__ */ it(
            ce,
            {
              onClose: () => n(!1),
              fontSize: c,
              padding: f,
              fontFamily: E,
              setPadding: w,
              setFontSize: o,
              setFontFamily: x,
              supportedFonts: r
            }
          ),
          !h && /* @__PURE__ */ it(
            "div",
            {
              className: "bottom-click-area",
              onClick: () => n(!0),
              "aria-label": "Open reader options"
            }
          )
        ] }),
        !G && !y && !m && /* @__PURE__ */ it("div", { style: { padding: "20px", textAlign: "center" }, children: "No EPUB loaded." })
      ]
    }
  );
};
export {
  fe as BokReader
};
