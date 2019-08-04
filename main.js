! function (t) {
    function e(a) {
        if (n[a]) return n[a].exports;
        var r = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }

    var n = {};
    e.m = t, e.c = n, e.d = function (t, n, a) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }, e.n = function (t) {
        var n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 0)
}([function (t, e, n) {
    t.exports = n(1)
}, function (t, e, n) {
    "use strict";

    function a() {
        u = {}, p = {}, f = [], g = {}, m = [], d3.json("data/" + A[$("#type-input").val()].file, function (t) {
            for (var e in t)
                if ("min" !== e && "max" !== e && "max2" !== e && t.hasOwnProperty(e)) {
                    const n = t[e].name,
                        a = t[e].data;
                    if (g[n] = a, u[e] = n, p[n] = e, c.includes(e)) continue;
                    f.push([e, a]), m.push(n)
                }
            h = 10 * parseInt(t.min / 10), y = 10 * parseInt(t.max / 10 + 1), v = 10 * parseInt(t.max2 / 10 + 1), m = c.concat(m.sort()), r(), Object(i.a)(g[$("#country-input").val()], x), $("#year-2010").addClass("selected-year"), d3.json("data/AgeComposition.json", function (t) {
                d = t, o()
            })
        })
    }

    function r() {
        if ($("#map").empty(), document.getElementById("country-input").childElementCount !== m.length) {
            const t = $("#country-input").val(),
                e = d3.select("#country-input");
            e.selectAll("*").remove(), m.forEach(function (t) {
                e.append("option").text(t)
            }), m.includes(t) ? $("#country-input").val(t) : $("#country-input").val("World")
        }
        const n = {},
            a = $("#type-input").val(),
            r = "Population (million)" === a ? v : y,
            c = "Population (million)" === a ? 3 : 1,
            s = d3.scale.linear().range([0, 1]).domain([h, r / c]);

        f.forEach(function (t) {
            const e = t[1][$("#year-input").val()];
            n[t[0]] = {
                numberOfThings: e,
                fillColor: A[a].color(s(e))
            }
        });
        const d = (new Datamap({
                element: document.getElementById("map"),
                projection: "mercator",
                fills: {
                    defaultFill: "#e0e1d7"
                },
                data: n,
                geographyConfig: {
                    borderColor: "#717171",
                    highlightBorderWidth: 2,
                    highlightFillColor: function (t) {
                        return t.fillColor || "#F5F5F5"
                    },
                    popupTemplate: function (t, e) {
                        if (e) {
                            if ("Population (million)" === a) {
                                var n = e.numberOfThings;
                                n = n > 1000 ? l(n / 1000) + " million" : l(n) + " thousand";
                                const r = ['<div class="hoverinfo">', "<strong>", u[t.id], "</strong>"];
                                return r.concat(["<br/>", A[$("#type-input").val()].class, ": <strong>", n, "</strong>", "</div>"]).join("")
                            }
                            const r = ['<div class="hoverinfo">', "<strong>", u[t.id], "</strong>"];
                            return r.concat(["<br/>", A[$("#type-input").val()].class, ": <strong>", l(e.numberOfThings), "</strong>", "</div>"]).join("")
                        }
                        const r = ['<div class="hoverinfo">', "<strong>", t.properties.name, "</strong>"];
                        return r.push("<br><strong>No Data</strong>"), r.join("")
                    },
                    highlightBorderColor: "#ffffff"
                },
                done: function (t) {
                    t.svg.selectAll(".datamaps-subunit").on("click", function (t) {
                        if (u.hasOwnProperty(t.id)) {
                            const e = $("#country-input");
                            e.val(u[t.id]), Object(i.a)(g[e.val()], x), o()
                        }
                    })
                }
            }),
           "Population (million)" === a ? 1000 : 1),
            p = d3.select(".datamap");

        const b = p.append("defs").append("svg:linearGradient").attr("id", "gradient").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");
        for (var R = 0; R <= 100; R += 10) b.append("stop").attr("offset", R + "%").attr("stop-color", A[$("#type-input").val()].color(R / 100));
        const D = d3.scale.linear().range([0, 150]).domain([h, r / d / c]),
            O = d3.svg.axis().scale(D).orient("bottom").ticks(5);


    }

    function o() {
        d3.select("#pyramid").remove();
        const t = d3.select(".datamap").append("g").attr("id", "pyramid").attr("transform", "translate(0,400)"),
            e = ($("#year-input").val() - 2010) / 5,
            n = d[p[$("#country-input").val()]];
        if (void 0 !== n) {
            var a = Number.MIN_VALUE;
            const r = n.male[e],
                o = n.female[e];
            for (var i = 0; i < 21; i++) a = a > r[i] ? a : r[i], a = a > o[i] ? a : o[i];
            const l = d3.scale.linear().domain([0, a]).range([0, 100]);
            t.selectAll(".male-age-rect").data(n.male[e]).attr("x", function (t) {
                return 100 - l(t)
            }).attr("width", function (t) {
                return l(t)
            }).enter().append("rect").attr("class", "age-rect male-age-rect").attr("x", function (t) {
                return 100 - l(t)
            }).attr("y", function (t, e) {
                return 20 - 10 * e
            }).attr("width", function (t) {
                return l(t)
            }).attr("height", 10).append("title").text(function (t) {
                return d3.format(",.d")(t) + ",000"
            });
            t.selectAll(".female-age-rect").data(n.female[e]).attr("width", function (t) {
                return l(t[1])
            }).enter().append("rect").attr("class", "age-rect female-age-rect").attr("x", 140).attr("y", function (t, e) {
                return 20 - 10 * e
            }).attr("width", function (t) {
                return l(t)
            }).attr("height", 10).append("title").text(function (t) {
                return d3.format(",.d")(t) + ",000"
            }), t.selectAll("text").data(s).enter().append("text").attr("x", function (t, e) {
                return e > 1 ? 105 : 107
            }).attr("y", function (t, e) {
                return 30 - 10 * e
            })
            .text(function (t) {
                return t
            }).style("font-size", "11px"), t.append("text").attr("x", 60).attr("y", 45).text("Male").style("font-size", "10px"), t.append("text").attr("x", 160).attr("y", 45).text("Female").style("font-size", "10px");
            const c = d3.scale.linear().domain([a / 1000, 0]).range([-40, 100]),
                u = d3.scale.linear().domain([0, a / 1000]).range([-40, 100]),
                f = d3.svg.axis().scale(c).orient("bottom").ticks(4),
                g = d3.svg.axis().scale(u).orient("bottom").ticks(4);
            t.append("g").attr("transform", "translate(40,250)").attr("id", "map-legend-axis").call(f), t.append("g").attr("transform", "translate(140,250)").attr("id", "map-legend-axis").call(g), t.append("text").attr("x", 75).attr("y", 280).text("Population (million)")
        }
    }

    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(2);
    const l = d3.format(",.1f"),
        c = ["World", "High Income Countries", "Middle Income Countries", "Low Income Countries"],
        s = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90-94", "95-99", "100+"];
    var d = {},
        u = {},
        p = {},
        f = [],
        g = {},
        m = [],
        y = Number.MIN_VALUE,
        v = Number.MIN_VALUE,
        h = Number.MAX_VALUE,
        x = d3.select("#bar").append("svg").attr("id", "bar-svg").attr("width", "100%").attr("height", "100%");
    const A = {
        "Population (million)": {
            file: "Population.json",
            color: d3.interpolateViridis,
            class: "Population"
        },
    };
    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
        enumerable: !1,
        value: function (t) {
            return this.filter(function (e) {
                return e == t
            }).length > 0
        }
    });
    const b = document.createElement("style"),
        R = $(".range input"),
        D = ["webkit-slider-runnable-track", "moz-range-track", "ms-track"];
    document.head.appendChild(b);
    const O = function (t) {
        const e = t.value,
            n = 1.176470588 * (e - 2010);
        var a = "";
        $(".range-labels li").removeClass("active selected");
        $(".year").removeClass("active-year selected-year");
        const r = $(".range-labels").find("li:nth-child(" + (e - 2005) / 5 + ")");
        r.addClass("active selected");
        r.prevAll().addClass("active selected");
        const o = $("#bar-svg").find("rect:nth-child(" + (e - 2000) / 5 + ")");
        o.addClass("active-year selected-year");
        o.prevAll().addClass("selected-year");
        for (var i = 0; i < D.length; i++) a += ".range {background: linear-gradient(to right, #488048 0%, #488048 " + n + "%, #fff " + n + "%, #fff 100%)}", a += ".range input::-" + D[i] + "{background: linear-gradient(to right, #488048 0%, #488048 " + n + "%, #488048 " + n + "%, #488048  100%)}";
        return a
    };
    R.on("input", function () {
        b.textContent = O(this), r(), o()
    }), $(".range-labels li").on("click", function () {
        const t = $(this).index();
        R.val(5 * t + 2010).trigger("input")
    }), $("#country-input").change(function () {
        const t = $("#country-input").val();
        Object(i.a)(g[t], x), o()
    }), $("#type-input").change(function () {
        a()
    }), a()
}, function (t, e, n) {
    "use strict";

    function a() {
        const t = $(this).index()-1;
        $(".range input").val(5 * t + 2010).trigger("input")
    }

    function r() {
        $(this).addClass("active-year")
    }

    function o() {
        $(this).removeClass("active-year")
    }

    e.a = function (t, e) {

        var n = d3.format(",.1f");
        const i = window.innerHeight > 925 ? 280 : 220;
        $("#bar").css("height", i), $("#map").css("margin-top", window.innerHeight > 925 ? "-150px" : "-180px");
        var l = [],
            c = Number.MAX_VALUE,
            s = Number.MIN_VALUE;
        const d = "Population (million)" === $("#type-input").val() ? 1000 : 1;
        for (var u = 2010; u <= 2095; u += 5) {
            const p = t[u] / d;
            l.push({
                year: String(u),
                value: p
            }), c = c < p ? c : p, s = s > p ? s : p
        }
        c = 5 * parseInt(c / 5), s = 5 * parseInt(s / 5 + 1);
        const f = function (t) {
                return t.year
            },
            g = function (t) {
                return t.value
            },
            m = d3.scale.linear().domain(d3.extent(l, f)).range([0, 915]),
            y = d3.scale.linear().domain([c, s]).range([10, i - 20]),
            v = d3.scale.linear().domain([s, c]).range([i - y(s), i - y(c)]),
            h = e.selectAll("rect").data(l).attr("x", function (t) {
                return m(f(t)) + 12
            }).attr("y", function (t) {
                return i - y(g(t))
            }).attr("width", 30).attr("height", function (t) {
                return y(g(t))
            });

        e.selectAll("title").data(l).text(function (t) {
            return n(g(t))
        }), h.enter().append("rect").attr("class", "year").attr("id", function (t) {
            return "year-" + t.year
        }).attr("x", function (t) {
            return m(f(t)) + 12
        }).attr("y", function (t) {
            return i - y(g(t))
        }).attr("width", 30).attr("height", function (t) {
            return y(g(t))
        }).on("click", a).on("mouseover", r).on("mouseout", o).append("title").attr("class", "rect-popup").text(function (t) {
            return n(g(t))
        });
        const x = d3.svg.axis().scale(v).orient("right").ticks(8).innerTickSize(-1000);
        e.select(".grid").remove(), e.insert("g", ":first-child").attr("transform", "translate(972,0)").attr("class", "grid").call(x), e.selectAll(".bar-line").remove(), e.selectAll(".bar-text").remove(), e.selectAll(".bar-point").remove();
        for (var u = 0; u < l.length && (e.append("text").attr("class", "bar-text").attr("x", m(f(l[u])) + 10 - g(l[u]) / 1000).attr("y", i - y(g(l[u])) - 8), e.append("circle").attr("class", "bar-point").attr("cx", m(f(l[u])) + 12 + 15).attr("cy", i - y(g(l[u]))).attr("r", 3), u !== l.length - 1); u++) e.append("line").attr("class", "bar-line").attr("x1", m(f(l[u])) + 12 + 15).attr("y1", i - y(g(l[u]))).attr("x2", m(f(l[u + 1])) + 12 + 15).attr("y2", i - y(g(l[u + 1])))

    }
}]);

//.text(n(g(l[u])))