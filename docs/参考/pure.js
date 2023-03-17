import * as At from 'fs'
import * as Wt from 'vue'

var mt = Object.create
var ge = Object.defineProperty
var ht = Object.getOwnPropertyDescriptor
var gt = Object.getOwnPropertyNames
var yt = Object.getPrototypeOf,
  wt = Object.prototype.hasOwnProperty
var je = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  ye = (e, t) => {
    for (var n in t) ge(e, n, { get: t[n], enumerable: !0 })
  },
  he = (e, t, n, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let a of gt(t))
        !wt.call(e, a) &&
          a !== n &&
          ge(e, a, {
            get: () => t[a],
            enumerable: !(r = ht(t, a)) || r.enumerable,
          })
    return e
  },
  k = (e, t, n) => (he(e, t, 'default'), n && he(n, t, 'default')),
  Le = (e, t, n) => (
    (n = e != null ? mt(yt(e)) : {}),
    he(
      t || !e || !e.__esModule
        ? ge(n, 'default', { value: e, enumerable: !0 })
        : n,
      e,
    )
  )
var Ve = je((be, _e) => {
  ;(function (e, t) {
    typeof be == 'object' && typeof _e < 'u'
      ? (_e.exports = t())
      : typeof define == 'function' && define.amd
      ? define(t)
      : ((e = typeof globalThis < 'u' ? globalThis : e || self).dayjs = t())
  })(be, function () {
    var e = 1e3,
      t = 6e4,
      n = 36e5,
      r = 'millisecond',
      a = 'second',
      o = 'minute',
      i = 'hour',
      l = 'day',
      b = 'week',
      p = 'month',
      g = 'quarter',
      S = 'year',
      M = 'date',
      j = 'Invalid Date',
      I = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      B = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      X = {
        name: 'en',
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
          '_',
        ),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
          '_',
        ),
      },
      R = function (h, s, c) {
        var w = String(h)
        return !w || w.length >= s
          ? h
          : '' + Array(s + 1 - w.length).join(c) + h
      },
      Y = {
        s: R,
        z: function (h) {
          var s = -h.utcOffset(),
            c = Math.abs(s),
            w = Math.floor(c / 60),
            d = c % 60
          return (s <= 0 ? '+' : '-') + R(w, 2, '0') + ':' + R(d, 2, '0')
        },
        m: function h(s, c) {
          if (s.date() < c.date()) return -h(c, s)
          var w = 12 * (c.year() - s.year()) + (c.month() - s.month()),
            d = s.clone().add(w, p),
            O = c - d < 0,
            P = s.clone().add(w + (O ? -1 : 1), p)
          return +(-(w + (c - d) / (O ? d - P : P - d)) || 0)
        },
        a: function (h) {
          return h < 0 ? Math.ceil(h) || 0 : Math.floor(h)
        },
        p: function (h) {
          return (
            { M: p, y: S, w: b, d: l, D: M, h: i, m: o, s: a, ms: r, Q: g }[
              h
            ] ||
            String(h || '')
              .toLowerCase()
              .replace(/s$/, '')
          )
        },
        u: function (h) {
          return h === void 0
        },
      },
      E = 'en',
      y = {}
    y[E] = X
    var v = function (h) {
        return h instanceof $
      },
      x = function h(s, c, w) {
        var d
        if (!s) return E
        if (typeof s == 'string') {
          var O = s.toLowerCase()
          y[O] && (d = O), c && ((y[O] = c), (d = O))
          var P = s.split('-')
          if (!d && P.length > 1) return h(P[0])
        } else {
          var D = s.name
          ;(y[D] = s), (d = D)
        }
        return !w && d && (E = d), d || (!w && E)
      },
      _ = function (h, s) {
        if (v(h)) return h.clone()
        var c = typeof s == 'object' ? s : {}
        return (c.date = h), (c.args = arguments), new $(c)
      },
      u = Y
    ;(u.l = x),
      (u.i = v),
      (u.w = function (h, s) {
        return _(h, { locale: s.$L, utc: s.$u, x: s.$x, $offset: s.$offset })
      })
    var $ = (function () {
        function h(c) {
          ;(this.$L = x(c.locale, null, !0)), this.parse(c)
        }
        var s = h.prototype
        return (
          (s.parse = function (c) {
            ;(this.$d = (function (w) {
              var d = w.date,
                O = w.utc
              if (d === null) return new Date(NaN)
              if (u.u(d)) return new Date()
              if (d instanceof Date) return new Date(d)
              if (typeof d == 'string' && !/Z$/i.test(d)) {
                var P = d.match(I)
                if (P) {
                  var D = P[2] - 1 || 0,
                    C = (P[7] || '0').substring(0, 3)
                  return O
                    ? new Date(
                        Date.UTC(
                          P[1],
                          D,
                          P[3] || 1,
                          P[4] || 0,
                          P[5] || 0,
                          P[6] || 0,
                          C,
                        ),
                      )
                    : new Date(
                        P[1],
                        D,
                        P[3] || 1,
                        P[4] || 0,
                        P[5] || 0,
                        P[6] || 0,
                        C,
                      )
                }
              }
              return new Date(d)
            })(c)),
              (this.$x = c.x || {}),
              this.init()
          }),
          (s.init = function () {
            var c = this.$d
            ;(this.$y = c.getFullYear()),
              (this.$M = c.getMonth()),
              (this.$D = c.getDate()),
              (this.$W = c.getDay()),
              (this.$H = c.getHours()),
              (this.$m = c.getMinutes()),
              (this.$s = c.getSeconds()),
              (this.$ms = c.getMilliseconds())
          }),
          (s.$utils = function () {
            return u
          }),
          (s.isValid = function () {
            return this.$d.toString() !== j
          }),
          (s.isSame = function (c, w) {
            var d = _(c)
            return this.startOf(w) <= d && d <= this.endOf(w)
          }),
          (s.isAfter = function (c, w) {
            return _(c) < this.startOf(w)
          }),
          (s.isBefore = function (c, w) {
            return this.endOf(w) < _(c)
          }),
          (s.$g = function (c, w, d) {
            return u.u(c) ? this[w] : this.set(d, c)
          }),
          (s.unix = function () {
            return Math.floor(this.valueOf() / 1e3)
          }),
          (s.valueOf = function () {
            return this.$d.getTime()
          }),
          (s.startOf = function (c, w) {
            var d = this,
              O = !!u.u(w) || w,
              P = u.p(c),
              D = function (Z, N) {
                var q = u.w(
                  d.$u ? Date.UTC(d.$y, N, Z) : new Date(d.$y, N, Z),
                  d,
                )
                return O ? q : q.endOf(l)
              },
              C = function (Z, N) {
                return u.w(
                  d
                    .toDate()
                    [Z].apply(
                      d.toDate('s'),
                      (O ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(N),
                    ),
                  d,
                )
              },
              A = this.$W,
              F = this.$M,
              z = this.$D,
              U = 'set' + (this.$u ? 'UTC' : '')
            switch (P) {
              case S:
                return O ? D(1, 0) : D(31, 11)
              case p:
                return O ? D(1, F) : D(0, F + 1)
              case b:
                var ee = this.$locale().weekStart || 0,
                  te = (A < ee ? A + 7 : A) - ee
                return D(O ? z - te : z + (6 - te), F)
              case l:
              case M:
                return C(U + 'Hours', 0)
              case i:
                return C(U + 'Minutes', 1)
              case o:
                return C(U + 'Seconds', 2)
              case a:
                return C(U + 'Milliseconds', 3)
              default:
                return this.clone()
            }
          }),
          (s.endOf = function (c) {
            return this.startOf(c, !1)
          }),
          (s.$set = function (c, w) {
            var d,
              O = u.p(c),
              P = 'set' + (this.$u ? 'UTC' : ''),
              D = ((d = {}),
              (d[l] = P + 'Date'),
              (d[M] = P + 'Date'),
              (d[p] = P + 'Month'),
              (d[S] = P + 'FullYear'),
              (d[i] = P + 'Hours'),
              (d[o] = P + 'Minutes'),
              (d[a] = P + 'Seconds'),
              (d[r] = P + 'Milliseconds'),
              d)[O],
              C = O === l ? this.$D + (w - this.$W) : w
            if (O === p || O === S) {
              var A = this.clone().set(M, 1)
              A.$d[D](C),
                A.init(),
                (this.$d = A.set(M, Math.min(this.$D, A.daysInMonth())).$d)
            } else D && this.$d[D](C)
            return this.init(), this
          }),
          (s.set = function (c, w) {
            return this.clone().$set(c, w)
          }),
          (s.get = function (c) {
            return this[u.p(c)]()
          }),
          (s.add = function (c, w) {
            var d,
              O = this
            c = Number(c)
            var P = u.p(w),
              D = function (F) {
                var z = _(O)
                return u.w(z.date(z.date() + Math.round(F * c)), O)
              }
            if (P === p) return this.set(p, this.$M + c)
            if (P === S) return this.set(S, this.$y + c)
            if (P === l) return D(1)
            if (P === b) return D(7)
            var C = ((d = {}), (d[o] = t), (d[i] = n), (d[a] = e), d)[P] || 1,
              A = this.$d.getTime() + c * C
            return u.w(A, this)
          }),
          (s.subtract = function (c, w) {
            return this.add(-1 * c, w)
          }),
          (s.format = function (c) {
            var w = this,
              d = this.$locale()
            if (!this.isValid()) return d.invalidDate || j
            var O = c || 'YYYY-MM-DDTHH:mm:ssZ',
              P = u.z(this),
              D = this.$H,
              C = this.$m,
              A = this.$M,
              F = d.weekdays,
              z = d.months,
              U = function (N, q, me, oe) {
                return (N && (N[q] || N(w, O))) || me[q].slice(0, oe)
              },
              ee = function (N) {
                return u.s(D % 12 || 12, N, '0')
              },
              te =
                d.meridiem ||
                function (N, q, me) {
                  var oe = N < 12 ? 'AM' : 'PM'
                  return me ? oe.toLowerCase() : oe
                },
              Z = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: A + 1,
                MM: u.s(A + 1, 2, '0'),
                MMM: U(d.monthsShort, A, z, 3),
                MMMM: U(z, A),
                D: this.$D,
                DD: u.s(this.$D, 2, '0'),
                d: String(this.$W),
                dd: U(d.weekdaysMin, this.$W, F, 2),
                ddd: U(d.weekdaysShort, this.$W, F, 3),
                dddd: F[this.$W],
                H: String(D),
                HH: u.s(D, 2, '0'),
                h: ee(1),
                hh: ee(2),
                a: te(D, C, !0),
                A: te(D, C, !1),
                m: String(C),
                mm: u.s(C, 2, '0'),
                s: String(this.$s),
                ss: u.s(this.$s, 2, '0'),
                SSS: u.s(this.$ms, 3, '0'),
                Z: P,
              }
            return O.replace(B, function (N, q) {
              return q || Z[N] || P.replace(':', '')
            })
          }),
          (s.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
          }),
          (s.diff = function (c, w, d) {
            var O,
              P = u.p(w),
              D = _(c),
              C = (D.utcOffset() - this.utcOffset()) * t,
              A = this - D,
              F = u.m(this, D)
            return (
              (F =
                ((O = {}),
                (O[S] = F / 12),
                (O[p] = F),
                (O[g] = F / 3),
                (O[b] = (A - C) / 6048e5),
                (O[l] = (A - C) / 864e5),
                (O[i] = A / n),
                (O[o] = A / t),
                (O[a] = A / e),
                O)[P] || A),
              d ? F : u.a(F)
            )
          }),
          (s.daysInMonth = function () {
            return this.endOf(p).$D
          }),
          (s.$locale = function () {
            return y[this.$L]
          }),
          (s.locale = function (c, w) {
            if (!c) return this.$L
            var d = this.clone(),
              O = x(c, w, !0)
            return O && (d.$L = O), d
          }),
          (s.clone = function () {
            return u.w(this.$d, this)
          }),
          (s.toDate = function () {
            return new Date(this.valueOf())
          }),
          (s.toJSON = function () {
            return this.isValid() ? this.toISOString() : null
          }),
          (s.toISOString = function () {
            return this.$d.toISOString()
          }),
          (s.toString = function () {
            return this.$d.toUTCString()
          }),
          h
        )
      })(),
      T = $.prototype
    return (
      (_.prototype = T),
      [
        ['$ms', r],
        ['$s', a],
        ['$m', o],
        ['$H', i],
        ['$W', l],
        ['$M', p],
        ['$y', S],
        ['$D', M],
      ].forEach(function (h) {
        T[h[1]] = function (s) {
          return this.$g(s, h[0], h[1])
        }
      }),
      (_.extend = function (h, s) {
        return h.$i || (h(s, $, _), (h.$i = !0)), _
      }),
      (_.locale = x),
      (_.isDayjs = v),
      (_.unix = function (h) {
        return _(1e3 * h)
      }),
      (_.en = y[E]),
      (_.Ls = y),
      (_.p = {}),
      _
    )
  })
})
var ze = je((Oe, Pe) => {
  ;(function (e, t) {
    typeof Oe == 'object' && typeof Pe < 'u'
      ? (Pe.exports = t())
      : typeof define == 'function' && define.amd
      ? define(t)
      : ((e =
          typeof globalThis < 'u'
            ? globalThis
            : e || self).dayjs_plugin_duration = t())
  })(Oe, function () {
    var e,
      t,
      n = 1e3,
      r = 6e4,
      a = 36e5,
      o = 864e5,
      i = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      l = 31536e6,
      b = 2592e6,
      p = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,
      g = {
        years: l,
        months: b,
        days: o,
        hours: a,
        minutes: r,
        seconds: n,
        milliseconds: 1,
        weeks: 6048e5,
      },
      S = function (E) {
        return E instanceof Y
      },
      M = function (E, y, v) {
        return new Y(E, v, y.$l)
      },
      j = function (E) {
        return t.p(E) + 's'
      },
      I = function (E) {
        return E < 0
      },
      B = function (E) {
        return I(E) ? Math.ceil(E) : Math.floor(E)
      },
      X = function (E) {
        return Math.abs(E)
      },
      R = function (E, y) {
        return E
          ? I(E)
            ? { negative: !0, format: '' + X(E) + y }
            : { negative: !1, format: '' + E + y }
          : { negative: !1, format: '' }
      },
      Y = (function () {
        function E(v, x, _) {
          var u = this
          if (
            ((this.$d = {}),
            (this.$l = _),
            v === void 0 && ((this.$ms = 0), this.parseFromMilliseconds()),
            x)
          )
            return M(v * g[j(x)], this)
          if (typeof v == 'number')
            return (this.$ms = v), this.parseFromMilliseconds(), this
          if (typeof v == 'object')
            return (
              Object.keys(v).forEach(function (h) {
                u.$d[j(h)] = v[h]
              }),
              this.calMilliseconds(),
              this
            )
          if (typeof v == 'string') {
            var $ = v.match(p)
            if ($) {
              var T = $.slice(2).map(function (h) {
                return h != null ? Number(h) : 0
              })
              return (
                (this.$d.years = T[0]),
                (this.$d.months = T[1]),
                (this.$d.weeks = T[2]),
                (this.$d.days = T[3]),
                (this.$d.hours = T[4]),
                (this.$d.minutes = T[5]),
                (this.$d.seconds = T[6]),
                this.calMilliseconds(),
                this
              )
            }
          }
          return this
        }
        var y = E.prototype
        return (
          (y.calMilliseconds = function () {
            var v = this
            this.$ms = Object.keys(this.$d).reduce(function (x, _) {
              return x + (v.$d[_] || 0) * g[_]
            }, 0)
          }),
          (y.parseFromMilliseconds = function () {
            var v = this.$ms
            ;(this.$d.years = B(v / l)),
              (v %= l),
              (this.$d.months = B(v / b)),
              (v %= b),
              (this.$d.days = B(v / o)),
              (v %= o),
              (this.$d.hours = B(v / a)),
              (v %= a),
              (this.$d.minutes = B(v / r)),
              (v %= r),
              (this.$d.seconds = B(v / n)),
              (v %= n),
              (this.$d.milliseconds = v)
          }),
          (y.toISOString = function () {
            var v = R(this.$d.years, 'Y'),
              x = R(this.$d.months, 'M'),
              _ = +this.$d.days || 0
            this.$d.weeks && (_ += 7 * this.$d.weeks)
            var u = R(_, 'D'),
              $ = R(this.$d.hours, 'H'),
              T = R(this.$d.minutes, 'M'),
              h = this.$d.seconds || 0
            this.$d.milliseconds && (h += this.$d.milliseconds / 1e3)
            var s = R(h, 'S'),
              c =
                v.negative ||
                x.negative ||
                u.negative ||
                $.negative ||
                T.negative ||
                s.negative,
              w = $.format || T.format || s.format ? 'T' : '',
              d =
                (c ? '-' : '') +
                'P' +
                v.format +
                x.format +
                u.format +
                w +
                $.format +
                T.format +
                s.format
            return d === 'P' || d === '-P' ? 'P0D' : d
          }),
          (y.toJSON = function () {
            return this.toISOString()
          }),
          (y.format = function (v) {
            var x = v || 'YYYY-MM-DDTHH:mm:ss',
              _ = {
                Y: this.$d.years,
                YY: t.s(this.$d.years, 2, '0'),
                YYYY: t.s(this.$d.years, 4, '0'),
                M: this.$d.months,
                MM: t.s(this.$d.months, 2, '0'),
                D: this.$d.days,
                DD: t.s(this.$d.days, 2, '0'),
                H: this.$d.hours,
                HH: t.s(this.$d.hours, 2, '0'),
                m: this.$d.minutes,
                mm: t.s(this.$d.minutes, 2, '0'),
                s: this.$d.seconds,
                ss: t.s(this.$d.seconds, 2, '0'),
                SSS: t.s(this.$d.milliseconds, 3, '0'),
              }
            return x.replace(i, function (u, $) {
              return $ || String(_[u])
            })
          }),
          (y.as = function (v) {
            return this.$ms / g[j(v)]
          }),
          (y.get = function (v) {
            var x = this.$ms,
              _ = j(v)
            return (
              _ === 'milliseconds'
                ? (x %= 1e3)
                : (x = _ === 'weeks' ? B(x / g[_]) : this.$d[_]),
              x === 0 ? 0 : x
            )
          }),
          (y.add = function (v, x, _) {
            var u
            return (
              (u = x ? v * g[j(x)] : S(v) ? v.$ms : M(v, this).$ms),
              M(this.$ms + u * (_ ? -1 : 1), this)
            )
          }),
          (y.subtract = function (v, x) {
            return this.add(v, x, !0)
          }),
          (y.locale = function (v) {
            var x = this.clone()
            return (x.$l = v), x
          }),
          (y.clone = function () {
            return M(this.$ms, this)
          }),
          (y.humanize = function (v) {
            return e().add(this.$ms, 'ms').locale(this.$l).fromNow(!v)
          }),
          (y.milliseconds = function () {
            return this.get('milliseconds')
          }),
          (y.asMilliseconds = function () {
            return this.as('milliseconds')
          }),
          (y.seconds = function () {
            return this.get('seconds')
          }),
          (y.asSeconds = function () {
            return this.as('seconds')
          }),
          (y.minutes = function () {
            return this.get('minutes')
          }),
          (y.asMinutes = function () {
            return this.as('minutes')
          }),
          (y.hours = function () {
            return this.get('hours')
          }),
          (y.asHours = function () {
            return this.as('hours')
          }),
          (y.days = function () {
            return this.get('days')
          }),
          (y.asDays = function () {
            return this.as('days')
          }),
          (y.weeks = function () {
            return this.get('weeks')
          }),
          (y.asWeeks = function () {
            return this.as('weeks')
          }),
          (y.months = function () {
            return this.get('months')
          }),
          (y.asMonths = function () {
            return this.as('months')
          }),
          (y.years = function () {
            return this.get('years')
          }),
          (y.asYears = function () {
            return this.as('years')
          }),
          E
        )
      })()
    return function (E, y, v) {
      ;(e = v),
        (t = v().$utils()),
        (v.duration = function (u, $) {
          var T = v.locale()
          return M(u, { $l: T }, $)
        }),
        (v.isDuration = S)
      var x = y.prototype.add,
        _ = y.prototype.subtract
      ;(y.prototype.add = function (u, $) {
        return S(u) && (u = u.asMilliseconds()), x.bind(this)(u, $)
      }),
        (y.prototype.subtract = function (u, $) {
          return S(u) && (u = u.asMilliseconds()), _.bind(this)(u, $)
        })
    }
  })
})
function ae(e) {
  e.preventDefault()
}
var un = (e) => {
    function t(n) {
      n === 'add'
        ? e.forEach((r) => {
            document.addEventListener(r, ae, { passive: !1 })
          })
        : e.forEach((r) => {
            document.removeEventListener(r, ae)
          })
    }
    document.addEventListener('visibilitychange', () => {
      document.visibilityState === 'visible'
        ? t('add')
        : document.visibilityState === 'hidden' &&
          (t('remove'), document.removeEventListener('visibilitychange', ae))
    }),
      t('add')
  },
  ln = (e) => {
    e.forEach((t) => {
      document.removeEventListener(t, ae)
    })
  }
function Fe(e) {
  let t = e.split(','),
    r = t[0].match(/:(.*?);/)[1],
    a = window.atob(t[1]),
    o = a.length,
    i = new Uint8Array(o)
  for (; o--; ) i[o] = a.charCodeAt(o)
  return new Blob([i], { type: r })
}
function ke(e, t, n) {
  return new Promise((r, a) => {
    let o = document.createElement('CANVAS'),
      i = o.getContext('2d'),
      l = new Image()
    ;(l.crossOrigin = ''),
      (l.onload = function () {
        if (!o || !i) return a()
        ;(o.height = l.height), (o.width = l.width), i.drawImage(l, 0, 0)
        let b = o.toDataURL(t || 'image/png', n)
        ;(o = null), r(b)
      }),
      (l.src = e)
  })
}
var se = (e, t) => !!e.className.match(new RegExp('(\\s|^)' + t + '(\\s|$)')),
  dn = (e, t, n) => {
    se(e, t) || (e.className += ' ' + t),
      n && !se(e, n) && (e.className += ' ' + n)
  },
  pn = (e, t, n) => {
    if (se(e, t)) {
      let r = new RegExp('(\\s|^)' + t + '(\\s|$)')
      e.className = e.className.replace(r, ' ').trim()
    }
    if (n && se(e, n)) {
      let r = new RegExp('(\\s|^)' + n + '(\\s|$)')
      e.className = e.className.replace(r, ' ').trim()
    }
  },
  vn = (e, t, n) => {
    let r = n || document.body,
      { className: a } = r
    ;(a = a.replace(t, '')), (r.className = e ? `${a} ${t} ` : a)
  }
var bt = Object.prototype.toString
function _t(e, t) {
  return e && e.hasOwnProperty ? e.hasOwnProperty(t) : !1
}
function Ot(e, t, n) {
  if (e)
    if (e.forEach) e.forEach(t, n)
    else for (let r = 0, a = e.length; r < a; r++) t.call(n, e[r], r, e)
}
function Pt(e, t, n) {
  if (e) for (let r in e) _t(e, r) && t.call(n, e[r], r, e)
}
function we(e, t) {
  let n = e.__proto__.constructor
  return t ? new n(t) : new n()
}
function ie(e, t) {
  return t ? Re(e, t) : e
}
function Re(e, t) {
  if (e)
    switch (bt.call(e)) {
      case '[object Object]': {
        let n = Object.create(e.__proto__)
        return (
          Pt(e, function (r, a) {
            n[a] = ie(r, t)
          }),
          n
        )
      }
      case '[object Date]':
      case '[object RegExp]':
        return we(e, e.valueOf())
      case '[object Array]':
      case '[object Arguments]': {
        let n = []
        return (
          Ot(e, function (r) {
            n.push(ie(r, t))
          }),
          n
        )
      }
      case '[object Set]': {
        let n = we(e)
        return (
          n.forEach(function (r) {
            n.add(ie(r, t))
          }),
          n
        )
      }
      case '[object Map]': {
        let n = we(e)
        return (
          n.forEach(function (r) {
            n.set(ie(r, t))
          }),
          n
        )
      }
    }
  return e
}
function hn(e, t) {
  return e && Re(e, t)
}
var yn = (e) => {
    let t = (e == null ? void 0 : e.type) ?? 'rgb',
      n = (e == null ? void 0 : e.num) ?? 0
    if (n === 0)
      switch (t) {
        case 'rgb':
          return window.crypto.getRandomValues(new Uint8Array(3)).toString()
        case 'hex':
          return `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, `${Math.random() * 10}`)}`
        case 'hsl':
          return [
            360 * Math.random(),
            `${100 * Math.random()}%`,
            `${100 * Math.random()}%`,
          ].toString()
      }
    else
      switch (t) {
        case 'rgb':
          let r = []
          for (let i = 0; i < n; i++)
            r.push(window.crypto.getRandomValues(new Uint8Array(3)).toString())
          return r
        case 'hex':
          let a = []
          for (let i = 0; i < n; i++)
            a.push(
              `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, `${Math.random() * 10}`)}`,
            )
          return a
        case 'hsl':
          let o = []
          for (let i = 0; i < n; i++)
            o.push(
              [
                360 * Math.random(),
                `${100 * Math.random()}%`,
                `${100 * Math.random()}%`,
              ].toString(),
            )
          return o
      }
  },
  Ne = (e) => {
    let t = e.replace('#', '').match(/../g)
    for (let n = 0; n < 3; n++) t[n] = parseInt(t[n], 16)
    return t
  },
  Be = (e, t, n) => {
    let r = [e.toString(16), t.toString(16), n.toString(16)]
    for (let a = 0; a < 3; a++) r[a].length == 1 && (r[a] = `0${r[a]}`)
    return `#${r.join('')}`
  },
  wn = (e, t) => {
    let n = Ne(e)
    for (let r = 0; r < 3; r++) n[r] = Math.floor(n[r] * (1 - t))
    return Be(n[0], n[1], n[2])
  },
  bn = (e, t) => {
    let n = Ne(e)
    for (let r = 0; r < 3; r++) n[r] = Math.floor((255 - n[r]) * t + n[r])
    return Be(n[0], n[1], n[2])
  }
function On(e) {
  let t = /^\\\\\?\\/.test(e),
    n = /[^\u0000-\u0080]+/.test(e)
  return t || n ? e : e.replace(/\\/g, '/')
}
var ue = 52.35987755982988,
  L = 3.141592653589793,
  le = 6378245,
  ce = 0.006693421622965943
function $n(e, t) {
  let n = +e,
    r = +t,
    a = n - 0.0065,
    o = r - 0.006,
    i = Math.sqrt(a * a + o * o) - 2e-5 * Math.sin(o * ue),
    l = Math.atan2(o, a) - 3e-6 * Math.cos(a * ue),
    b = i * Math.cos(l),
    p = i * Math.sin(l)
  return [b, p]
}
function Sn(e, t) {
  let n = +e,
    r = +t,
    a = Math.sqrt(n * n + r * r) + 2e-5 * Math.sin(r * ue),
    o = Math.atan2(r, n) + 3e-6 * Math.cos(n * ue),
    i = a * Math.cos(o) + 0.0065,
    l = a * Math.sin(o) + 0.006
  return [i, l]
}
function xn(e, t) {
  let n = +e,
    r = +t
  if (We(n, r)) return [n, r]
  {
    let a = Ue(n - 105, r - 35),
      o = He(n - 105, r - 35),
      i = (r / 180) * L,
      l = Math.sin(i)
    l = 1 - ce * l * l
    let b = Math.sqrt(l)
    ;(a = (a * 180) / (((le * (1 - ce)) / (l * b)) * L)),
      (o = (o * 180) / ((le / b) * Math.cos(i) * L))
    let p = r + a
    return [n + o, p]
  }
}
function En(e, t) {
  let n = +e,
    r = +t
  if (We(n, r)) return [n, r]
  {
    let a = Ue(n - 105, r - 35),
      o = He(n - 105, r - 35),
      i = (r / 180) * L,
      l = Math.sin(i)
    l = 1 - ce * l * l
    let b = Math.sqrt(l)
    ;(a = (a * 180) / (((le * (1 - ce)) / (l * b)) * L)),
      (o = (o * 180) / ((le / b) * Math.cos(i) * L))
    let p = r + a,
      g = n + o
    return [n * 2 - g, r * 2 - p]
  }
}
function Ue(e, t) {
  let n = +e,
    r = +t,
    a =
      -100 +
      2 * n +
      3 * r +
      0.2 * r * r +
      0.1 * n * r +
      0.2 * Math.sqrt(Math.abs(n))
  return (
    (a += ((20 * Math.sin(6 * n * L) + 20 * Math.sin(2 * n * L)) * 2) / 3),
    (a += ((20 * Math.sin(r * L) + 40 * Math.sin((r / 3) * L)) * 2) / 3),
    (a +=
      ((160 * Math.sin((r / 12) * L) + 320 * Math.sin((r * L) / 30)) * 2) / 3),
    a
  )
}
function He(e, t) {
  let n = +e,
    r = +t,
    a =
      300 + e + 2 * r + 0.1 * n * n + 0.1 * n * r + 0.1 * Math.sqrt(Math.abs(n))
  return (
    (a += ((20 * Math.sin(6 * n * L) + 20 * Math.sin(2 * n * L)) * 2) / 3),
    (a += ((20 * Math.sin(n * L) + 40 * Math.sin((n / 3) * L)) * 2) / 3),
    (a +=
      ((150 * Math.sin((n / 12) * L) + 300 * Math.sin((n / 30) * L)) * 2) / 3),
    a
  )
}
function We(e, t) {
  let n = +e,
    r = +t
  return !(n > 73.66 && n < 135.05 && r > 3.86 && r < 53.55)
}
var H = Le(Ve())
var Dn = (e) => Math.max.apply(null, e),
  Mn = (e) => Math.min.apply(null, e),
  fe = (e) => e.reduce((t, n) => t + n),
  An = (e) => fe(e) / e.length,
  Ye = (e) => {
    if (!e && typeof e > 'u') return ''
    if (Number(e) === 0) return '\u96F6'
    let t = [
        '\u96F6',
        '\u4E00',
        '\u4E8C',
        '\u4E09',
        '\u56DB',
        '\u4E94',
        '\u516D',
        '\u4E03',
        '\u516B',
        '\u4E5D',
        '\u5341',
      ],
      n = ['', '\u5341', '\u767E', '\u5343', '\u4E07', '\u4EBF', '\u70B9', ''],
      r = ('' + e).replace(/(^0*)/g, '').split('.'),
      a = 0,
      o = ''
    for (let i = r[0].length - 1; i >= 0; i--) {
      switch (a) {
        case 0:
          o = n[7] + o
          break
        case 4:
          new RegExp('0{4}//d{' + (r[0].length - i - 1) + '}$').test(r[0]) ||
            (o = n[4] + o)
          break
        case 8:
          ;(o = n[5] + o), (n[7] = n[5]), (a = 0)
          break
      }
      a % 4 == 2 &&
        r[0].charAt(i + 2) != 0 &&
        r[0].charAt(i + 1) == 0 &&
        (o = t[0] + o),
        r[0].charAt(i) != 0 && (o = t[r[0].charAt(i)] + n[a % 4] + o),
        a++
    }
    if (r.length > 1) {
      o += n[6]
      for (let i = 0; i < r[1].length; i++) o += t[r[1].charAt(i)]
    }
    return (
      o == '\u4E00\u5341' && (o = '\u5341'),
      o.match(/^一/) && o.length == 3 && (o = o.replace('\u4E00', '')),
      o
    )
  }
var qe = Le(ze())
H.default.extend(qe.default)
function $t(e = '\u661F\u671F') {
  let t = (0, H.default)().day()
  return `${e}${t === 0 ? '\u65E5' : Ye(t)}`
}
function jn(e) {
  e = new Date(e)
  let t = e.getFullYear(),
    n = e.getMonth() + 1
  return new Date(t, n, 0).getDate()
}
function Ln(e) {
  let t = []
  for (let n = 0; n <= new Date().getFullYear() - e; n++) t.push(e + n)
  return t.reverse()
}
function Fn(e) {
  let t = (e == null ? void 0 : e.type) ?? 1,
    n = $t((e == null ? void 0 : e.prefix) ?? '\u661F\u671F'),
    r = {
      ymd: (0, H.default)(new Date()).format('YYYY\u5E74MM\u6708DD\u65E5'),
      hms: (0, H.default)(new Date()).format('HH\u65F6mm\u5206ss\u79D2'),
      week: n,
    },
    a = {
      ymd: (0, H.default)(new Date()).format('YYYY-MM-DD'),
      hms: (0, H.default)(new Date()).format('HH-mm-ss'),
      week: n,
    },
    o = {
      ymd: (0, H.default)(new Date()).format('YYYY/MM/DD'),
      hms: (0, H.default)(new Date()).format('HH/mm/ss'),
      week: n,
    }
  switch (t) {
    case 1:
      return r
    case 2:
      return a
    case 3:
      return o
    default:
      return r
  }
}
var Ge = (e) => new Promise((t) => setTimeout(t, e)),
  Rn = (e, t = 200, n = !1) => {
    let r,
      a = t
    return () => {
      r && clearTimeout(r),
        n
          ? (r || e(), (r = setTimeout(() => (r = null), a)))
          : (r = setTimeout(e, a))
    }
  },
  Nn = (e, t = 16.67) => {
    let n
    return () => {
      n && clearTimeout(n),
        (n = setTimeout(() => {
          e()
        }, t))
    }
  }
var Un = () => {
    let e = navigator.userAgent.toLowerCase(),
      t = e.match(/midp/i) == 'midp',
      n = e.match(/ucweb/i) == 'ucweb',
      r = e.match(/android/i) == 'android',
      a = e.match(/iphone os/i) == 'iphone os',
      o = e.match(/windows ce/i) == 'windows ce',
      i = e.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4',
      l = e.match(/windows mobile/i) == 'windows mobile'
    return t || n || r || a || o || i || l
  },
  Hn = () => {
    let e = navigator.userAgent.toLowerCase(),
      t = /(msie|firefox|chrome|opera|version).*?([\d.]+)/,
      n = e.match(t)
    return {
      browser: n == null ? void 0 : n[1].replace(/version/, "'safari"),
      version: n == null ? void 0 : n[2],
    }
  }
var Xe = (e, t = '_blank') => {
  let n = document.createElement('a')
  n.setAttribute('href', e),
    n.setAttribute('target', t),
    n.setAttribute('rel', 'noreferrer noopener'),
    n.setAttribute('id', 'external')
  let r = document.getElementById('external')
  r && document.body.removeChild(r),
    document.body.appendChild(n),
    n.click(),
    n.remove()
}
function qn(e, t, n, r) {
  ke(e).then((a) => {
    St(a, t, n, r)
  })
}
function St(e, t, n, r) {
  let a = Fe(e)
  xt(a, t, n, r)
}
function xt(e, t, n, r) {
  let a = typeof r < 'u' ? [r, e] : [e],
    o = new Blob(a, { type: n || 'application/octet-stream' }),
    i = window.URL.createObjectURL(o),
    l = document.createElement('a')
  ;(l.style.display = 'none'),
    (l.href = i),
    l.setAttribute('download', t),
    typeof l.download > 'u' && l.setAttribute('target', '_blank'),
    document.body.appendChild(l),
    l.click(),
    document.body.removeChild(l),
    window.URL.revokeObjectURL(i)
}
function Gn({ url: e, target: t = '_blank', fileName: n }) {
  let r = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
    a = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1
  if (/(iP)/g.test(window.navigator.userAgent))
    return console.error('Your browser does not support download!'), !1
  if (r || a) {
    let o = document.createElement('a')
    if (
      ((o.href = e),
      (o.target = t),
      o.download !== void 0 &&
        (o.download = n || e.substring(e.lastIndexOf('/') + 1, e.length)),
      document.createEvent)
    ) {
      let i = document.createEvent('MouseEvents')
      return i.initEvent('click', !0, !0), o.dispatchEvent(i), !0
    }
  }
  return e.indexOf('?') === -1 && (e += '?download'), Xe(e, t), !0
}
function Et(e, t) {
  if (!e || !t || e.length !== t.length) return !1
  for (let n of Object.keys(e)) if (!Je(e[n], t[n])) return !1
  return !0
}
function Tt(e, t) {
  if (!e || !t) return !1
  let { length: n } = e
  if (n !== t.length) return !1
  for (let r = 0; r < n; r++) if (!Je(e[r], t[r])) return !1
  return !0
}
function Je(e, t) {
  let n = Object.prototype.toString.call(e)
  return n !== Object.prototype.toString.call(t)
    ? !1
    : n === '[object Object]'
    ? Et(e, t)
    : n === '[object Array]'
    ? Tt(e, t)
    : n === '[object Function]'
    ? e === t
      ? !0
      : e.toString() === t.toString()
    : e === t
}
function Kn(e) {
  let t = new FormData()
  return (
    Object.keys(e).forEach((n) => {
      t.append(n, e[n])
    }),
    t
  )
}
var Zn = (e, t) => {
    if (
      ((e.install = (n) => {
        for (let r of [e, ...Object.values(t ?? {})]) n.component(r.name, r)
      }),
      t)
    )
      for (let [n, r] of Object.entries(t)) e[n] = r
    return e
  },
  er = (e, t) => (
    (e.install = (n) => {
      ;(e._context = n._context), (n.config.globalProperties[t] = e)
    }),
    e
  ),
  tr = (e) => ((e.install = NOOP), e)
var Dt = Object.prototype.toString
function G(e, t) {
  return Dt.call(e) === `[object ${t}]`
}
function J(e) {
  return typeof e < 'u'
}
function Qe(e) {
  return !J(e)
}
function $e(e) {
  return e !== null && G(e, 'Object')
}
function rr(e) {
  return Mt(e) || W(e)
    ? e.length === 0
    : e instanceof Map || e instanceof Set
    ? e.size === 0
    : $e(e)
    ? Object.keys(e).length === 0
    : !1
}
function or(e) {
  return G(e, 'Date')
}
function ar(e) {
  return e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0)
}
function Ze(e) {
  return e === null
}
function sr(e) {
  return Ze(e) && Qe(e)
}
function ir(e) {
  return Ze(e) || Qe(e)
}
function et(e) {
  return G(e, 'Number')
}
function ur(e) {
  return G(e, 'Promise') && $e(e) && Ke(e.then) && Ke(e.catch)
}
function W(e) {
  return G(e, 'String')
}
function Ke(e) {
  return typeof e == 'function'
}
function lr(e) {
  return G(e, 'Boolean')
}
function cr(e) {
  return G(e, 'RegExp')
}
function Mt(e) {
  return e && Array.isArray(e)
}
function fr(e) {
  return typeof window < 'u' && G(e, 'Window')
}
function dr(e) {
  return $e(e) && !!e.tagName
}
var pr = (e) => {
    if (e === '' || e.trim() === '') return !1
    try {
      return btoa(atob(e)) == e
    } catch {
      return !1
    }
  },
  vr = (e) => /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(e),
  mr = (e) => /^rgb\((\s*\d+\s*,?){3}\)$/.test(e),
  hr = (e) => /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(e),
  Se = typeof window > 'u',
  gr = !Se
function tt(e) {
  let t =
    "^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
  return new RegExp(t).test(e)
}
function yr(e) {
  return /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/.test(
    e,
  )
}
function wr(e) {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e)
}
function br(e) {
  return /^[1-9][0-9]{4,12}$/.test(e.toString())
}
function _r(e) {
  return /^[1-9][0-9]{5}$/.test(e.toString())
}
function Or(e) {
  return /[\u4e00-\u9fa5]/.test(e)
}
function Pr(e) {
  return /^[a-z]+$/.test(e)
}
function $r(e) {
  return /^[A-Z]+$/.test(e)
}
function Sr(e) {
  return /^[A-Za-z]+$/.test(e)
}
function xr(e) {
  return !!new RegExp(/\s+/g).test(e)
}
var Tr = (e) => {
    let t = /-(\w)/g
    return e.replace(t, (n, r) => (r ? r.toUpperCase() : ''))
  },
  Dr = (e) => {
    let t = /\B([A-Z])/g
    return e.replace(t, '-$1').toLowerCase()
  }
var V = {}
ye(V, { Fs: () => At })
k(V, At)
var xe = [],
  Ct = (e, t) => {
    if (e == 0) return '0 Bytes'
    let n = 1024,
      r = t || 2,
      a = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      o = Math.floor(Math.log(e) / Math.log(n))
    return parseFloat((e / Math.pow(n, o)).toFixed(r)) + ' ' + a[o]
  },
  It = (e) => {
    let { folder: t = 'dist', callback: n, format: r = !0 } = e
    ;(0, V.readdir)(t, (a, o) => {
      if (a) throw a
      let i = 0,
        l = () => {
          ++i == o.length && n(r ? Ct(fe(xe)) : fe(xe))
        }
      o.forEach((b) => {
        ;(0, V.stat)(`${t}/${b}`, async (p, g) => {
          if (p) throw p
          g.isFile()
            ? (xe.push(g.size), l())
            : g.isDirectory() && It({ folder: `${t}/${b}/`, callback: l })
        })
      }),
        o.length === 0 && n(0)
    })
  }
function kr() {
  if (Se) return {}
  let e = window.performance.timing
  return new Promise((t, n) => {
    Ge(500)
      .then((r) => {
        t({
          dns: (e.domainLookupEnd - e.domainLookupStart) / 1e3,
          tcp: (e.connectEnd - e.connectStart) / 1e3,
          request: (e.responseEnd - e.responseStart) / 1e3,
          dom: (e.domComplete - e.domInteractive) / 1e3,
          whiteScreen: (e.domComplete - e.navigationStart) / 1e3,
        })
      })
      .catch((r) => {
        n(r)
      })
  })
}
var Nr = (e) => e.replace(/^\s*/, ''),
  Br = (e) => e.replace(/(\s*$)/g, ''),
  Ur = (e) => e.replace(/^\s*|\s*$/g, ''),
  Hr = (e) => e.replace(/\s*/g, '')
var de = class {
    storage
    constructor(t) {
      this.storage = t
    }
    setItem(t, n) {
      this.storage.setItem(t, JSON.stringify(n))
    }
    getItem(t) {
      return JSON.parse(this.storage.getItem(t))
    }
    removeItem(t) {
      this.storage.removeItem(t)
    }
    clear() {
      this.storage.clear()
    }
  },
  Ee = class extends de {
    constructor(t) {
      super(t)
    }
  },
  jt = typeof window < 'u' ? window.localStorage : '',
  Lt = typeof window < 'u' ? window.sessionStorage : '',
  Vr = new Ee(jt),
  Yr = new de(Lt)
function Ft(e, t) {
  return W(t) ? e.substring(0, e.indexOf(t)) : ''
}
function kt(e, t) {
  return W(t) ? e.substring(e.lastIndexOf(t) + t.length, e.length) : ''
}
function Gr(e, t) {
  return W(t) ? [Ft(e, t), kt(e, t)] : []
}
function Xr(e, t, n) {
  if (!W(t) || !W(n)) return ''
  let r = e.substring(e.indexOf(t) + t.length, e.length)
  return r.substring(0, r.indexOf(n))
}
function Jr(e, t = 3) {
  return (e = e.toString()), e.length > t ? e.substr(0, t) + '...' : e
}
function Kr(e) {
  return e ? [...(e + '')].map(Number) : ''
}
var Rt = (e) => {
    if (!Array.isArray(e)) return console.warn('tree must be an array'), []
    if (!e || e.length === 0) return []
    let t = []
    for (let n of e)
      n.children && n.children.length > 0 && Rt(n.children), t.push(n.uniqueId)
    return t
  },
  Nt = (e, t = []) => {
    if (!Array.isArray(e)) return console.warn('menuTree must be an array'), []
    if (!e || e.length === 0) return []
    for (let [n, r] of e.entries())
      r.children && r.children.length === 1 && delete r.children,
        (r.id = n),
        (r.parentId = t.length ? t[t.length - 1] : null),
        (r.pathList = [...t, r.id]),
        (r.uniqueId =
          r.pathList.length > 1 ? r.pathList.join('-') : r.pathList[0]),
        r.children && r.children.length > 0 && Nt(r.children, r.pathList)
    return e
  },
  Bt = (e, t = []) => {
    if (!Array.isArray(e)) return console.warn('tree must be an array'), []
    if (!e || e.length === 0) return []
    for (let [n, r] of e.entries())
      (r.id = n),
        (r.parentId = t.length ? t[t.length - 1] : null),
        (r.pathList = [...t, r.id]),
        r.children && r.children.length > 0 && Bt(r.children, r.pathList)
    return e
  },
  Ut = (e, t) => {
    if (!Array.isArray(e)) return console.warn('menuTree must be an array'), []
    if (!e || e.length === 0) return []
    let n = e.find((a) => a.uniqueId === t)
    if (n) return n
    let r = e
      .filter((a) => a.children)
      .map((a) => a.children)
      .flat(1)
    return Ut(r, t)
  },
  Ht = (e, t, n) => {
    if (!Array.isArray(e)) return console.warn('menuTree must be an array'), []
    if (!e || e.length === 0) return []
    for (let r of e) {
      let a = r.children && r.children.length > 0
      r.uniqueId === t &&
        Object.prototype.toString.call(n) === '[object Object]' &&
        Object.assign(r, n),
        a && Ht(r.children, t, n)
    }
    return e
  },
  Zr = (e, t, n, r) => {
    if (!Array.isArray(e)) return console.warn('data must be an array'), []
    let a = {
        id: t || 'id',
        parentId: n || 'parentId',
        childrenList: r || 'children',
      },
      o = {},
      i = {},
      l = []
    for (let p of e) {
      let g = p[a.parentId]
      o[g] == null && (o[g] = []), (i[p[a.id]] = p), o[g].push(p)
    }
    for (let p of e) {
      let g = p[a.parentId]
      i[g] == null && l.push(p)
    }
    for (let p of l) b(p)
    function b(p) {
      if (
        (o[p[a.id]] !== null && (p[a.childrenList] = o[p[a.id]]),
        p[a.childrenList])
      )
        for (let g of p[a.childrenList]) b(g)
    }
    return l
  }
function no() {
  return window.location
}
function ro(e) {
  if (!tt(e)) return {}
  let t = e.indexOf('?'),
    r = e.slice(t + 1).split('&'),
    a = {}
  for (let o = 0; o < r.length; o++) a[r[o].split('=')[0]] = r[o].split('=')[1]
  return a
}
var ao = () => {
    let e = '',
      t = []
    for (let n = 0; n <= 15; n++) t[n] = n.toString(16)
    for (let n = 1; n <= 36; n++)
      n === 9 || n === 14 || n === 19 || n === 24
        ? (e += '-')
        : n === 15
        ? (e += 4)
        : n === 20
        ? (e += t[(Math.random() * 4) | 8])
        : (e += t[(Math.random() * 16) | 0])
    return e.replace(/-/g, '')
  },
  so = (e = '') => {
    let t = 0,
      n = Date.now(),
      r = Math.floor(Math.random() * 1e9)
    return t++, `${e}${r}${t}${String(n)}`
  },
  io = (e, t, n = '') => {
    let r = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
        '',
      ),
      a = [],
      o
    if (((t = t || r.length), e))
      for (o = 0; o < e; o++) a[o] = r[0 | (Math.random() * t)]
    else {
      let i
      for (a[8] = a[13] = a[18] = a[23] = '-', a[14] = '4', o = 0; o < 36; o++)
        a[o] ||
          ((i = 0 | (Math.random() * 16)),
          (a[o] = r[o == 19 ? (i & 3) | 8 : i]))
    }
    return n ? n + a.join('') : a.join('')
  }
var f = {}
ye(f, { Vue: () => Wt })
k(f, Wt)
var Vt = ['class', 'style'],
  Yt = /^on[A-Z]/
function zt(e) {
  return Object.keys(e).map((t) => [t, e[t]])
}
function fo(e = {}) {
  let t = (0, f.getCurrentInstance)()
  if (!t) return {}
  let { excludeListeners: n = !1, excludeKeys: r = [] } = e,
    a = (0, f.shallowRef)({}),
    o = r.concat(Vt)
  return (
    (t.attrs = (0, f.reactive)(t.attrs)),
    (0, f.watchEffect)(() => {
      let i = zt(t.attrs).reduce(
        (l, [b, p]) => (!o.includes(b) && !(n && Yt.test(b)) && (l[b] = p), l),
        {},
      )
      a.value = i
    }),
    a
  )
}
var mo = (e) => (0, f.h)((0, f.resolveComponent)(e))
function qt(e, { target: t = document.body } = {}) {
  let n = document.createElement('textarea'),
    r = document.activeElement
  ;(n.value = e),
    n.setAttribute('readonly', ''),
    (n.style.contain = 'strict'),
    (n.style.position = 'absolute'),
    (n.style.left = '-9999px'),
    (n.style.fontSize = '12pt')
  let a = document.getSelection(),
    o
  a && a.rangeCount > 0 && (o = a.getRangeAt(0)),
    t.append(n),
    n.select(),
    (n.selectionStart = 0),
    (n.selectionEnd = e.length)
  let i = !1
  try {
    i = document.execCommand('copy')
  } catch (l) {
    throw new Error(l)
  }
  return (
    n.remove(),
    o && a && (a.removeAllRanges(), a.addRange(o)),
    r && r.focus(),
    i
  )
}
var wo = (e) => {
  let t = (0, f.ref)(e || ''),
    n = (0, f.ref)(!1)
  return (
    (0, f.watch)(
      t,
      (r) => {
        J(r) && (n.value = qt(r))
      },
      { immediate: !!e, flush: 'sync' },
    ),
    { clipboardValue: t, copied: n }
  )
}
var m = {}
ye(m, {
  Vue: () => Wt,
  Vue2: () => Xt,
  del: () => rt,
  install: () => Jt,
  isVue2: () => Te,
  isVue3: () => nt,
  set: () => De,
})
k(m, Wt)
var Te = !1,
  nt = !0,
  Xt = void 0
function Jt() {}
function De(e, t, n) {
  return Array.isArray(e)
    ? ((e.length = Math.max(e.length, t)), e.splice(t, 1, n), n)
    : ((e[t] = n), n)
}
function rt(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1)
    return
  }
  delete e[t]
}
var ot,
  K = typeof window < 'u'
var at = (e) => typeof e == 'string'
var pe = () => {}
K &&
  ((ot = window == null ? void 0 : window.navigator) == null
    ? void 0
    : ot.userAgent) &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent)
function ne(e) {
  return typeof e == 'function' ? e() : (0, m.unref)(e)
}
function st(e, t) {
  function n(...r) {
    e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })
  }
  return n
}
function it(e, t = {}) {
  let n, r
  return (o) => {
    let i = ne(e),
      l = ne(t.maxWait)
    if ((n && clearTimeout(n), i <= 0 || (l !== void 0 && l <= 0)))
      return r && (clearTimeout(r), (r = null)), o()
    l &&
      !r &&
      (r = setTimeout(() => {
        n && clearTimeout(n), (r = null), o()
      }, l)),
      (n = setTimeout(() => {
        r && clearTimeout(r), (r = null), o()
      }, i))
  }
}
function ut(e) {
  return e
}
function Me(e) {
  return (0, m.getCurrentScope)() ? ((0, m.onScopeDispose)(e), !0) : !1
}
function Ae(e, t = 200, n = {}) {
  return st(it(t, n), e)
}
function Q(e) {
  ;(0, m.getCurrentInstance)() && (0, m.onUnmounted)(e)
}
function re(e, t, n = {}) {
  let { immediate: r = !0 } = n,
    a = (0, m.ref)(!1),
    o = null
  function i() {
    o && (clearTimeout(o), (o = null))
  }
  function l() {
    ;(a.value = !1), i()
  }
  function b(...p) {
    i(),
      (a.value = !0),
      (o = setTimeout(() => {
        ;(a.value = !1), (o = null), e(...p)
      }, ne(t)))
  }
  return (
    r && ((a.value = !0), K && b()), Me(l), { isPending: a, start: b, stop: l }
  )
}
function Qt(e) {
  var t
  let n = ne(e)
  return (t = n == null ? void 0 : n.$el) != null ? t : n
}
var Zt = K ? window : void 0
function ve(...e) {
  let t, n, r, a
  if ((at(e[0]) ? (([n, r, a] = e), (t = Zt)) : ([t, n, r, a] = e), !t))
    return pe
  let o = pe,
    i = (0, m.watch)(
      () => Qt(t),
      (b) => {
        o(),
          b &&
            (b.addEventListener(n, r, a),
            (o = () => {
              b.removeEventListener(n, r, a), (o = pe)
            }))
      },
      { immediate: !0, flush: 'post' },
    ),
    l = () => {
      i(), o()
    }
  return Me(l), l
}
var Ce =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  Ie = '__vueuse_ssr_handlers__'
Ce[Ie] = Ce[Ie] || {}
Ce[Ie]
var lt
;(function (e) {
  ;(e.UP = 'UP'),
    (e.RIGHT = 'RIGHT'),
    (e.DOWN = 'DOWN'),
    (e.LEFT = 'LEFT'),
    (e.NONE = 'NONE')
})(lt || (lt = {}))
var en = Object.defineProperty,
  ct = Object.getOwnPropertySymbols,
  tn = Object.prototype.hasOwnProperty,
  nn = Object.prototype.propertyIsEnumerable,
  ft = (e, t, n) =>
    t in e
      ? en(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  rn = (e, t) => {
    for (var n in t || (t = {})) tn.call(t, n) && ft(e, n, t[n])
    if (ct) for (var n of ct(t)) nn.call(t, n) && ft(e, n, t[n])
    return e
  },
  on = {
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInOutSine: [0.37, 0, 0.63, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6],
  }
rn({ linear: ut }, on)
var la = () => {
  let e = (0, f.ref)(!1),
    t,
    n = () => {
      e.value = document.documentElement.classList.contains('dark')
    }
  return (
    Q(() => {
      t.takeRecords(), t.disconnect()
    }),
    (0, f.onMounted)(() => {
      n(),
        (t = new MutationObserver(n)),
        t.observe(document.documentElement, {
          attributes: !0,
          attributeFilter: ['class'],
        })
    }),
    { isDark: e }
  )
}
function dt(e, t = 'px') {
  if (!e) return ''
  if (W(e)) return e
  if (et(e)) return `${e}${t}`
  console.warn('binding value must be a string or number')
}
var pa = (e, t, n) => {
  let r = (0, f.ref)({ offsetX: 0, offsetY: 0 }),
    a = (l) => {
      let b = l.clientX,
        p = l.clientY,
        { offsetX: g, offsetY: S } = r.value,
        M = e.value.getBoundingClientRect(),
        j = M.left,
        I = M.top,
        B = M.width,
        X = M.height,
        R = document.documentElement.clientWidth,
        Y = document.documentElement.clientHeight,
        E = -j + g,
        y = -I + S,
        v = R - j - B + g,
        x = Y - I - X + S,
        _ = ($) => {
          let T = Math.min(Math.max(g + $.clientX - b, E), v),
            h = Math.min(Math.max(S + $.clientY - p, y), x)
          ;(r.value.offsetX = T),
            (r.value.offsetY = h),
            (e.value.style.transform = `translate(${dt(T)}, ${dt(h)})`)
        },
        u = () => {
          document.removeEventListener('mousemove', _),
            document.removeEventListener('mouseup', u)
        }
      document.addEventListener('mousemove', _),
        document.addEventListener('mouseup', u)
    },
    o = () => {
      t.value && e.value && t.value.addEventListener('mousedown', a)
    },
    i = () => {
      t.value && e.value && t.value.removeEventListener('mousedown', a)
    }
  return (
    (0, f.onMounted)(() => {
      ;(0, f.watchEffect)(() => {
        n.value || n ? o() : i()
      })
    }),
    (0, f.onBeforeUnmount)(() => {
      i()
    }),
    { transform: r }
  )
}
function pt() {
  let {
    appContext: {
      config: { globalProperties: e },
    },
  } = (0, f.getCurrentInstance)()
  return e
}
var ba = (e, t) => {
  let n = (t == null ? void 0 : t.theme) ?? (0, f.ref)('default'),
    r = (t == null ? void 0 : t.tooltipId) ?? 'tooltipElement',
    a = pt().$echarts,
    o = null,
    i = (0, f.ref)({}),
    l = (0, f.ref)(),
    b = (0, f.computed)(() =>
      n.value !== 'dark'
        ? i.value
        : { backgroundColor: 'transparent', ...i.value },
    )
  function p(u) {
    let $ = (0, f.unref)(e)
    !$ || !(0, f.unref)($) || (o = a.init($, u))
  }
  function g(u, ...$) {
    var T
    if (
      ((i.value = u),
      (l.value = $),
      ((T = (0, f.unref)(e)) == null ? void 0 : T.offsetHeight) === 0)
    ) {
      re(() => {
        g((0, f.unref)(b), ...$)
      }, 30)
      return
    }
    ;(0, f.nextTick)(() => {
      re(() => {
        !o && p(n.value),
          (u.clear ?? !0) && S(),
          o.setOption((0, f.unref)(b)),
          $ &&
            $.map((s) => {
              ;(s == null ? void 0 : s.type) !== 'zrender' &&
                typeof (s == null ? void 0 : s.callback) == 'function' &&
                o.on(
                  s == null ? void 0 : s.name,
                  s != null && s.query ? (s == null ? void 0 : s.query) : '',
                  (c) => {
                    s == null || s.callback(c)
                  },
                ),
                (s == null ? void 0 : s.type) === 'zrender' &&
                  typeof (s == null ? void 0 : s.callback) == 'function' &&
                  o.getZr().on(s == null ? void 0 : s.name, (c) => {
                    c.target || s == null || s.callback(c)
                  })
            }),
          u != null && u.addTooltip && _(u.addTooltip)
      }, 30)
    })
  }
  function S() {
    o.clear()
  }
  function M() {
    o.resize()
  }
  function j(u) {
    let $ = (u == null ? void 0 : u.type) ?? 'default',
      T = (u == null ? void 0 : u.opts) ?? {}
    o.showLoading($, T)
  }
  function I() {
    o.hideLoading()
  }
  function B(u) {
    o.appendData(u)
  }
  function X() {
    return o.getWidth()
  }
  function R() {
    return o.getHeight()
  }
  function Y() {
    return o || p(n.value), o
  }
  function E() {
    return o.getDom()
  }
  function y() {
    return o.getOption()
  }
  function v(u) {
    return o.getDataURL(u)
  }
  function x(u) {
    return o.getConnectedDataURL(u)
  }
  function _(u) {
    if (!u) return
    let $ = document.querySelector('html')
    if (!document.getElementById(r)) {
      let s = document.createElement('div')
      s.setAttribute('id', r), (s.style.display = 'block'), $.appendChild(s)
    }
    let T = document.querySelector(`#${r}`),
      h = (s) => {
        if ((s == null ? void 0 : s.targetType) !== 'axisLabel') return
        let c = `
        padding: 5px;
        font-size: 12px;
        display: inline;
        border-radius: 4px;
        position: absolute;
        background-color: #303133;
        z-index: 99999;color: #fff;
        box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px;
      `
        ;(T.style.cssText = c),
          (T.innerHTML = s == null ? void 0 : s.value),
          ($.onmousemove = (w) => {
            let d = w.pageX - 10,
              O = w.pageY + 15
            ;(T.style.top = O + 'px'), (T.style.left = d + 'px')
          })
      }
    o.on('mouseover', (s) => {
      ;((u === 'x' && s.componentType == 'xAxis') ||
        (u === 'y' && s.componentType == 'yAxis') ||
        (u.toString() === 'true' && s.componentType.includes('Axis'))) &&
        h(s)
    }),
      o.on('mouseout', () => {
        ;($.onmousemove = null), (T.style.cssText = 'display:none')
      })
  }
  return (
    (0, f.watch)(
      () => n.value,
      (u) => {
        o && (o.dispose(), p(u), g(i.value, ...l.value))
      },
    ),
    Q(() => {
      var u
      !o ||
        (o.dispose(),
        (o = null),
        (u = document.querySelector(`#${r}`)) == null || u.remove())
    }),
    (0, f.onMounted)(() => {
      ;(0, f.nextTick)(() => {
        ve('resize', () => {
          !o ||
            re(() => {
              M()
            }, 30)
        })
      })
    }),
    {
      echarts: a,
      clear: S,
      resize: M,
      getDom: E,
      getWidth: X,
      getOption: y,
      getHeight: R,
      addTooltip: _,
      getDataURL: v,
      setOptions: g,
      appendData: B,
      getInstance: Y,
      showLoading: j,
      hideLoading: I,
      getConnectedDataURL: x,
    }
  )
}
function vt(e) {
  var r, a
  let t = document.getElementsByTagName(e.tag),
    n = t.length
  for (let o = 0; o < n; o++)
    for (let i = 0; i <= o; i++)
      t[o] &&
        t[i] &&
        ((r = t[o]) == null ? void 0 : r[e.link]) ===
          ((a = t[i]) == null ? void 0 : a[e.link]) &&
        t[i - o].remove()
}
function Pa(e = !0) {
  let t, n
  function r(o) {
    return (
      vt({ tag: 'link', link: 'href' }),
      new Promise((i, l) => {
        ;(t = document.createElement('link')),
          (t.rel = 'stylesheet'),
          (t.onload = function () {
            i('success')
          }),
          (t.onerror = function (b) {
            l(b)
          }),
          (t.href = o.src),
          document[(o == null ? void 0 : o.carrier) ?? 'head'].appendChild(t)
      })
    )
  }
  function a(o) {
    return (
      vt({ tag: 'script', link: 'src' }),
      new Promise((i, l) => {
        ;(n = document.createElement('script')),
          (n.type = 'text/javascript'),
          (n.onload = function () {
            i('success')
          }),
          (n.onerror = function (b) {
            l(b)
          }),
          (n.src = o.src),
          document[(o == null ? void 0 : o.carrier) ?? 'head'].appendChild(n)
      })
    )
  }
  return (
    Q(() => {
      e && (t && t.remove(), n && n.remove())
    }),
    { loadCss: r, loadScript: a }
  )
}
var an = Symbol('watermark-dom'),
  Ta = (e = (0, f.ref)(document.body)) => {
    let t = Ae(() => {
        let p = (0, f.unref)(e)
        if (!p) return
        let { clientHeight: g, clientWidth: S } = p
        i({ height: g, width: S })
      }),
      n = an.toString(),
      r = (0, f.shallowRef)(),
      a = () => {
        let p = (0, f.unref)(r)
        r.value = void 0
        let g = (0, f.unref)(e)
        !g || (p && g.removeChild(p))
      }
    function o(p, g) {
      let S = document.createElement('canvas'),
        M = 300,
        j = 240
      Object.assign(S, { width: M, height: j })
      let I = S.getContext('2d')
      return (
        I &&
          (I.rotate((-20 * Math.PI) / 120),
          (I.font = (g == null ? void 0 : g.font) ?? '15px Reggae One'),
          (I.fillStyle =
            (g == null ? void 0 : g.fillStyle) ?? 'rgba(0, 0, 0, 0.15)'),
          (I.textAlign = 'left'),
          (I.textBaseline = 'middle'),
          I.fillText(p, M / 20, j)),
        S.toDataURL('image/png')
      )
    }
    function i(p = {}) {
      let g = (0, f.unref)(r)
      !g ||
        (J(p.width) && (g.style.width = `${p.width}px`),
        J(p.height) && (g.style.height = `${p.height}px`),
        J(p.str) &&
          (g.style.background = `url(${o(p.str, p.attr)}) left top repeat`))
    }
    let l = (p, g) => {
      if ((0, f.unref)(r)) return i({ str: p, attr: g }), n
      let S = document.createElement('div')
      ;(r.value = S),
        (S.id = n),
        (S.style.pointerEvents = 'none'),
        (S.style.top = '0px'),
        (S.style.left = '0px'),
        (S.style.position = 'absolute'),
        (S.style.zIndex = '100000')
      let M = (0, f.unref)(e)
      if (!M) return n
      let { clientHeight: j, clientWidth: I } = M
      return i({ str: p, width: I, height: j, attr: g }), M.appendChild(S), n
    }
    function b(p, g) {
      l(p, g),
        ve('resize', t),
        (0, f.getCurrentInstance)() &&
          (0, f.onBeforeUnmount)(() => {
            a()
          })
    }
    return { setWatermark: b, clear: a }
  }

export {
  dn as addClass,
  ln as allowMouseEvent,
  Ht as appendFieldByUniqueId,
  An as average,
  un as banMouseEvent,
  $n as bd09togcj02,
  Bt as buildHierarchyTree,
  so as buildPrefixUUID,
  ao as buildUUID,
  hn as clone,
  On as convertPath,
  qt as copyTextToClipboard,
  Ln as createYear,
  wn as darken,
  Fe as dataURLtoBlob,
  Rn as debounce,
  Ge as delay,
  Nt as deleteChildren,
  Un as deviceDetection,
  St as downloadByBase64,
  xt as downloadByData,
  qn as downloadByOnlineUrl,
  Gn as downloadByUrl,
  zt as entries,
  Rt as extractPathList,
  Kn as formDataHander,
  Ct as formatBytes,
  Sn as gcj02tobd09,
  En as gcj02towgs84,
  Hn as getBrowserInfo,
  Fn as getCurrentDate,
  $t as getCurrentWeek,
  no as getLocation,
  Ut as getNodeByUniqueId,
  It as getPackageSize,
  kr as getPerformance,
  ro as getQueryMap,
  Zr as handleTree,
  Or as hasCNChars,
  se as hasClass,
  _t as hasOwnProp,
  Ne as hexToRgb,
  G as is,
  Sr as isAlphabets,
  Mt as isArray,
  pr as isBase64,
  lr as isBoolean,
  gr as isClient,
  or as isDate,
  J as isDef,
  dr as isElement,
  wr as isEmail,
  rr as isEmpty,
  Je as isEqual,
  Tt as isEqualArray,
  Et as isEqualObject,
  xr as isExistSpace,
  Ke as isFunction,
  vr as isHex,
  ar as isLeapYear,
  Pr as isLowerCase,
  Ze as isNull,
  sr as isNullAndUnDef,
  ir as isNullOrUnDef,
  et as isNumber,
  $e as isObject,
  yr as isPhone,
  _r as isPostCode,
  ur as isPromise,
  br as isQQ,
  cr as isRegExp,
  mr as isRgb,
  hr as isRgba,
  Se as isServer,
  W as isString,
  Qe as isUnDef,
  $r as isUpperCase,
  tt as isUrl,
  fr as isWindow,
  bn as lighten,
  Dn as max,
  Mn as min,
  jn as monthDays,
  Tr as nameCamelize,
  Dr as nameHyphenate,
  Ye as numberToChinese,
  Xe as openLink,
  Nn as optimizeFps,
  We as out_of_china,
  yn as randomColor,
  Hr as removeAllSpace,
  Ur as removeBothSidesSpace,
  pn as removeClass,
  Nr as removeLeftSpace,
  Br as removeRightSpace,
  Be as rgbToHex,
  Kr as splitNum,
  Vr as storageLocal,
  Yr as storageSession,
  kt as subAfter,
  Ft as subBefore,
  Xr as subBetween,
  Gr as subBothSides,
  Jr as subTextAddEllipsis,
  fe as sum,
  vn as toggleClass,
  Ue as transformlat,
  He as transformlng,
  ke as urlToBase64,
  fo as useAttrs,
  wo as useCopyToClipboard,
  la as useDark,
  pa as useDraggable,
  mo as useDynamicComponent,
  ba as useECharts,
  pt as useGlobal,
  Pa as useLoader,
  Ta as useWatermark,
  io as uuid,
  xn as wgs84togcj02,
  Zn as withInstall,
  er as withInstallFunction,
  tr as withNoopInstall,
}
