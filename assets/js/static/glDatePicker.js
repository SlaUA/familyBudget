define(['jquery'], function ($) {
    $.fn.glDatePicker = function (a) {
        var G = this.data("glDatePicker");
        return !G ? this.each(function () {
            return $(this).data("glDatePicker", new O(this, a))
        }) : !0 === a ? G : this
    };
    $.fn.glDatePicker.defaults = {
        cssName: "default",
        zIndex: 1E3,
        borderSize: 1,
        calendarOffset: {x: 0, y: 1},
        showAlways: !1,
        hideOnClick: !0,
        allowMonthSelect: !0,
        allowYearSelect: !0,
        todayDate: new Date,
        selectedDate: null,
        prevArrow: "\u25c4",
        nextArrow: "\u25ba",
        selectableDates: null,
        selectableDateRange: null,
        specialDates: null,
        selectableMonths: null,
        selectableYears: null,
        selectableDOW: null,
        monthNames: null,
        dowNames: null,
        dowOffset: 0,
        onClick: function (a, G, g) {
            a.val(g.toLocaleDateString())
        },
        onHover: function () {
        },
        onShow: function (a) {
            a.show()
        },
        onHide: function (a) {
            a.hide()
        },
        firstDate: null
    };
    var O = function () {
        function a(a, g) {
            var d = this;
            d.el = $(a);
            var b = d.el;
            d.options = $.extend(!0, {}, $.fn.glDatePicker.defaults, g);
            var c = d.options;
            d.calendar = $($.find("[gldp-el=" + b.attr("gldp-id") + " ]"));
            c.selectedDate = c.selectedDate || c.todayDate;
            c.firstDate = (new Date(c.firstDate || c.selectedDate))._first();
            (b.attr("gldp-id") || "").length || b.attr("gldp-id", "gldp-" + Math.round(1E10 * Math.random()));
            b.addClass("gldp-el").bind("click", function (b) {
                d.show(b)
            }).bind("focus", function (b) {
                d.show(b)
            });
            d.calendar.length && !c.showAlways && d.calendar.hide();
            $(document).bind("mouseup", function (a) {
                var a = a.target, c = d.calendar;
                !b.is(a) && (!c.is(a) && 0 === c.has(a).length && c.is(":visible")) && d.hide()
            });
            d.render()
        }

        a.prototype = {
            show: function () {
                $.each($(".gldp-el").not(this.el), function (a, g) {
                    if (g.length)g.options.onHide(g.calendar)
                });
                this.options.onShow(this.calendar)
            }, hide: function () {
                if (this.options && !this.options.showAlways)this.options.onHide(this.calendar)
            }, render: function (a) {
                var g = this, d = g.el, b = g.options, c = g.calendar, j = "gldp-" + b.cssName, t = b.todayDate._val(), u = t.time, h = b.borderSize + "px", y = function (b, m, a) {
                        for (var c = [], e = b; e <= m; e++)c.push(e);
                        if (a) {
                            var d = [];
                            $.each(a, function (a, c) {
                                c >= b && (c <= m && 0 > d._indexOf(c)) && d.push(c)
                            });
                            c = d.length ? d : c
                        }
                        c.sort();
                        return c
                    }, H = y(0, 11, b.selectableMonths), v = y(t.year - 5, t.year + 5, b.selectableYears),
                    y = y(0, 6, b.selectableDOW), z = b.dowNames || "Sun Mon Tue Wed Thu Fri Sat".split(" "), t = b.monthNames || "January February March April May June July August September October November December".split(" "), f = d.outerWidth(), e, k = f / 7 + 6 * (b.borderSize / 7), f = f / 8 + 7 * (b.borderSize / 8);
                c.length ? eval(c.data("is")) || (f = c.outerWidth(), e = c.outerHeight(), k = f / 7 + 6 * (b.borderSize / 7), f = e / 8 + 7 * (b.borderSize / 8)) : (g.calendar = c = $("<div/>").attr("gldp-el", d.attr("gldp-id")).data("is", !0).css({
                    display: b.showAlways ? void 0 : "none", zIndex: b.zIndex,
                    width: 7 * k + "px"
                }), $("body").append(c));
                d.is(":visible") || c.hide();
                c.removeClass().addClass(j).children().remove();
                j = function () {
                    var i = d.offset();
                    c.css({
                        top: i.top + d.outerHeight() + b.calendarOffset.y + "px",
                        left: i.left + b.calendarOffset.x + "px"
                    })
                };
                $(window).resize(j);
                j();
                var j = {width: k + "px", height: f + "px", lineHeight: f + "px"}, f = function (i) {
                    for (var m = new Date(b.firstDate), i = i || 0; ;) {
                        m.setMonth(m.getMonth() + i);
                        m.setDate(Math.min(1, m._max()));
                        if (0 == i)break;
                        var c = m._val(), a = c.year;
                        if (-1 != H._indexOf(c.month))if (-1 !=
                            v._indexOf(a))break; else if (a < v[0] || a > v[v.length - 1])return null
                    }
                    return m
                }, A = f(-1), B = f(1), f = b.firstDate = f();
                e = f._val();
                var I = e.month, J = e.year, f = new Date(f);
                e = Math.abs(Math.min(6, Math.max(0, b.dowOffset)));
                var l = f.getDay() - e, l = 1 > l ? -7 - l : -l, z = z.concat(z).slice(e, e + 7);
                f._add(l);
                e = $("<div/>").addClass(" core border monyear ").css($.extend({}, j, {borderWidth: h + " 0 0 " + h})).append($("<a/>").addClass("prev-arrow" + (A ? "" : "-off")).html(b.prevArrow)).mousedown(function () {
                    return !1
                }).click(function (i) {
                    "" != b.prevArrow &&
                    A && (i.stopPropagation(), A && (b.firstDate = A, g.render()))
                });
                k = 5 * k - 5 * b.borderSize + b.borderSize;
                k = $("<div/>").addClass(" core border monyear title").css($.extend({}, j, {
                    width: k + "px",
                    borderTopWidth: h,
                    marginLeft: "-" + h
                }));
                l = $("<div/>").addClass(" core border monyear ").css($.extend({}, j, {
                    marginLeft: "-" + h,
                    borderWidth: h + " " + h + " 0 0"
                })).append($("<a/>").addClass("next-arrow" + (B ? "" : "-off")).html(b.nextArrow)).mousedown(function () {
                    return !1
                }).click(function (i) {
                    "" != b.nextArrow && B && (i.stopPropagation(), B && (b.firstDate =
                        B, g.render()))
                });
                c.append(e).append(k).append(l);
                for (l = e = 0; 7 > e; e++)for (var q = 0; 7 > q; q++, l++) {
                    var C = new Date(f), n = "day", r = b.zIndex + l, w = $("<div/>");
                    if (e) {
                        C._add(q + 7 * (e - 1));
                        var p = C._val(), x = p.time, K = null, s = !0, D = function (b, a) {
                            !0 === b.repeatYear && a.setYear(p.year);
                            !0 === b.repeatMonth && a.setMonth(p.month);
                            return a._val()
                        };
                        w.html(p.date);
                        b.selectableDateRange && (s = !1, $.each(b.selectableDateRange, function (b, a) {
                            var c = a.from, d = a.to || null, d = d || new Date(a.from.getFullYear(), a.from.getMonth(), a.from._max()), c = D(a,
                                c), d = D(a, d);
                            if (x >= c.time && x <= d.time)return s = !0
                        }));
                        if (b.selectableDates) {
                            if (b.selectableDateRange && !s || s && !b.selectableDateRange)s = !1;
                            $.each(b.selectableDates, function (b, a) {
                                if (D(a, a.date).time == x)return s = !0
                            })
                        }
                        !s || 0 > v._indexOf(p.year) || 0 > H._indexOf(p.month) || 0 > y._indexOf(p.day) ? n = "noday" : (n = "sun mon tue wed thu fri sat".split(" ")[p.day], I != p.month && (n += " outday"), u == x && (n = "today", r += 50), b.selectedDate._time() == x && (n = "selected", r += 51), b.specialDates && $.each(b.specialDates, function (b, a) {
                            D(a, a.date).time ==
                            x && (n = a.cssClass || "special", r += 52, K = a.data)
                        }), w.mousedown(function () {
                            return !1
                        }).hover(function (a) {
                            a.stopPropagation();
                            a = $(this).data("data");
                            b.onHover(d, w, a.date, a.data)
                        }).click(function (a) {
                            a.stopPropagation();
                            a = $(this).data("data");
                            b.selectedDate = b.firstDate = a.date;
                            g.render(function () {
                                !b.showAlways && b.hideOnClick && g.hide()
                            });
                            b.onClick(d, $(this), a.date, a.data)
                        }))
                    } else n = "dow", w.html(z[q]), C = null;
                    $.extend(j, {
                        borderTopWidth: h,
                        borderBottomWidth: h,
                        borderLeftWidth: 0 < e || !e && !q ? h : 0,
                        borderRightWidth: 0 < e ||
                        !e && 6 == q ? h : 0,
                        marginLeft: 0 < q ? "-" + h : 0,
                        marginTop: 0 < e ? "-" + h : 0,
                        zIndex: r
                    });
                    w.data("data", {date: C, data: K}).addClass(" core border " + n).css(j);
                    c.append(w)
                }
                var N = function (a) {
                        b.allowMonthSelect && (L.css({display: !a ? "none" : "inline-block"}), E.css({display: !a ? "inline-block" : "none"}));
                        b.allowYearSelect && (M.css({display: a ? "none" : "inline-block"}), F.css({display: a ? "inline-block" : "none"}))
                    }, u = function () {
                        b.firstDate = new Date(F.val(), E.val(), 1);
                        g.render()
                    }, E = $("<select/>").hide().change(u), F = $("<select/>").hide().change(u),
                    L = $("<span/>").html(t[I]).mousedown(function () {
                        return !1
                    }).click(function (a) {
                        a.stopPropagation();
                        N(!1)
                    }), M = $("<span/>").html(J).mousedown(function () {
                        return !1
                    }).click(function (a) {
                        a.stopPropagation();
                        N(!0)
                    });
                $.each(t, function (a, c) {
                    if (b.allowMonthSelect && -1 != H._indexOf(a)) {
                        var d = $("<option/>").html(c).attr("value", a);
                        a == I && d.attr("selected", "selected");
                        E.append(d)
                    }
                });
                $.each(v, function (a, c) {
                    if (b.allowYearSelect) {
                        var d = $("<option/>").html(c).attr("value", c);
                        c == J && d.attr("selected", "selected");
                        F.append(d)
                    }
                });
                u = $("<div/>").append(L).append(E).append(M).append(F);
                k.children().remove();
                k.append(u);
                (a || function () {
                })()
            }
        };
        return a
    }();
    Date.prototype._clear = function () {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this
    };
    Date.prototype._time = function () {
        return this._clear().getTime()
    };
    Date.prototype._max = function () {
        return [31, 28 + (1 == (new Date(this.getYear(), 1, 29)).getMonth() ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.getMonth()]
    };
    Date.prototype._add = function (a) {
        this.setDate(this.getDate() +
            a)
    };
    Date.prototype._first = function () {
        var a = new Date(this);
        a.setDate(1);
        return a
    };
    Date.prototype._val = function () {
        this._clear();
        return {
            year: this.getFullYear(),
            month: this.getMonth(),
            date: this.getDate(),
            time: this.getTime(),
            day: this.getDay()
        }
    };
    Array.prototype._indexOf = function (a) {
        return $.inArray(a, this)
    };

    /* Настройка под русский */
    $.extend($.fn.glDatePicker.prototype.constructor.defaults, {
        showAlways: false,
        cssName: 'flatwhite',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dowNames: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
        dowOffset: 1,
        onClick: (function (el, cell, date) {
            el.val(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear());
        })
    });
});