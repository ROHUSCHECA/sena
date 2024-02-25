(()=>{
    "use strict";
    function e(e, t) {
        return !!e.includes(parseInt(t)) || !!e.includes(t.toString())
    }
    function t(e, t) {
        return parseInt(e + t)
    }
    function n(e) {
        let t = "" + e.getMinutes();
        return 1 === t.length && (t = "0" + t),
        e.getHours() + ":" + t
    }
    function s(e) {
        this.qlwapp = e,
        this.init(this)
    }
    s.prototype = {
        open(e, t) {
            let n = "https://api.whatsapp.com/send";
            this.mobiledevice || (n = "https://web.whatsapp.com/send");
            const s = t
              , a = s.dataset.message || ""
              , o = s.dataset.phone || ""
              , i = s.dataset.type || "phone"
              , l = s.dataset.group || "";
            "group" == i ? s.setAttribute("href", l) : s.setAttribute("href", n + "?phone=" + o + "&text=" + encodeURIComponent(a));
            const p = new CustomEvent("qlwapp.click",{
                bubbles: !0,
                cancelable: !0
            });
            this.qlwapp.dispatchEvent(p)
        },
        toggle(e) {
            e?.preventDefault();
            const t = new CustomEvent("qlwapp.toggle");
            this.qlwapp.dispatchEvent(t)
        },
        chat(e, t) {
            e.preventDefault();
            const n = t.closest(".qlwapp-box")
              , s = n.querySelector(".qlwapp-reply")
              , a = n.querySelector(".qlwapp-header")
              , o = t.querySelector(".qlwapp-avatar img")?.getAttribute("src")
              , i = t.querySelector(".qlwapp-name")?.textContent
              , l = t.querySelector(".qlwapp-label")?.textContent
              , p = t.querySelector(".qlwapp-time")?.textContent
              , r = t.dataset.message
              , c = t.dataset.type
              , u = t.dataset.group
              , d = t.dataset.phone;
            n.classList.add("response", "opening"),
            this.qlwapp.dispatchEvent(new CustomEvent("qlwapp.height")),
            setTimeout((function() {
                n.classList.remove("opening")
            }
            ), 300);
            const w = a.querySelector(".qlwapp-avatar img")
              , q = a.querySelector(".qlwapp-number")
              , m = a.querySelector(".qlwapp-name")
              , g = a.querySelector(".qlwapp-label")
              , f = n.querySelector(".qlwapp-message");
            w && (w.setAttribute("src", o),
            w.setAttribute("alt", i)),
            q && (q.innerHTML = u),
            m && (m.innerHTML = i),
            g && (g.innerHTML = p ? p + " - " + l : l),
            f && (f.innerHTML = r),
            s.dataset[c] = "phone" == c ? d : u,
            s.dataset.type = c
        },
        previous(e, t) {
            e.preventDefault();
            const n = t.closest(".qlwapp-box");
            n.classList.add("closing"),
            setTimeout((function() {
                n.classList.remove("response", "closing"),
                n.classList.remove("texting")
            }
            ), 300)
        },
        init(s) {
            const a = new CustomEvent("qlwapp.init")
              , o = new CustomEvent("qlwapp.resize")
              , i = this.qlwapp;
            if (i.classList.add("qlwapp-js-ready"),
            i.classList.contains("auto-load") && !function(e) {
                const t = document.cookie.match("(^|;) ?qlwapp-auto-load=([^;]*)(;|$)");
                return t ? t[2] : null
            }()) {
                const e = Number(i.dataset.autoloadelay);
                setTimeout((()=>{
                    s.toggle()
                }
                ), e),
                function(e, t, n) {
                    const s = new Date;
                    s.setTime(s.getTime() + 864e5 * n),
                    document.cookie = e + "=" + t + ";path=/;expires=" + s.toGMTString()
                }("qlwapp-auto-load", "auto open cookie", 1)
            }
            i.addEventListener("qlwapp.init", (function(e) {
                s.mobiledevice = function() {
                    const e = window.matchMedia("(pointer:coarse)");
                    return e && e.matches
                }()
            }
            )),
            i.addEventListener("qlwapp.time", (function(s) {
                const a = s.target
                  , o = JSON.parse(a.dataset.timedays) || []
                  , i = parseInt(a.dataset.timezone) || 0
                  , l = new Date((new Date).getTime() + 60 * i * 1e3).getUTCDay().toString()
                  , p = a.querySelector(".qlwapp-days")
                  , r = a.querySelector(".qlwapp-time");
                if (o && o.length && !o.includes(l)) {
                    a.classList.add("qlwapp-timeout"),
                    p && (p.style.display = "block"),
                    r && (r.style.display = "none");
                    const t = function(t, n) {
                        for (let s = t; s <= 6; s++)
                            if (e(n, s))
                                return s;
                        for (let s = 0; s <= t; s++)
                            if (e(n, s))
                                return s
                    }(l, o)
                      , n = a.querySelector(`.day${t}`);
                    return n && n.classList.add("qlwapp-available-day"),
                    !0
                }
                o && o.length && o.includes(l) && (p && (p.style.display = "none"),
                r && (r.style.display = "block"));
                const c = a.dataset.timefrom || !1
                  , u = a.dataset.timeto || !1;
                if (!u || !c || c === u)
                    return !0;
                const d = new Date
                  , w = -d.getTimezoneOffset() - i
                  , q = new Date
                  , m = new Date;
                let g, f;
                g = t(c[0], c[1]),
                f = t(c[3], c[4]),
                m.setHours(g),
                m.setMinutes(f + w),
                g = t(u[0], u[1]),
                f = t(u[3], u[4]),
                q.setHours(g),
                q.setMinutes(f + w);
                let y = m.getTime();
                const v = q.getTime();
                if (y > v && (y -= 864e5),
                d.getTime() >= y && d.getTime() <= v || (a.classList.add("qlwapp-timeout"),
                p && (p.style.display = "none"),
                r && (r.style.display = "block")),
                !i)
                    return !0;
                a.querySelector(".from").textContent = n(m),
                a.querySelector(".to").textContent = n(q)
            }
            )),
            i.addEventListener("qlwapp.pro", (function() {
                const e = i.querySelector(".qlwapp-toggle")
                  , t = i.querySelectorAll(".qlwapp-account")
                  , n = new CustomEvent("qlwapp.time",{
                    bubbles: !0
                });
                e.dispatchEvent(n),
                t.forEach((function(e) {
                    e.dispatchEvent(n)
                }
                ))
            }
            )),
            i.addEventListener("qlwapp.resize", (function() {
                this.classList.contains("qlwapp-show") && s.toggle()
            }
            )),
            i.addEventListener("qlwapp.init", (function() {
                s.mobiledevice ? (i.classList.add("mobile"),
                i.classList.remove("desktop")) : (i.classList.add("desktop"),
                i.classList.remove("mobile")),
                i.classList.add("qlwapp-js-ready")
            }
            )),
            i.addEventListener("qlwapp.init", (function() {
                if (i.classList.contains("qlwapp-premium")) {
                    const e = new CustomEvent("qlwapp.pro");
                    i.dispatchEvent(e)
                }
            }
            )),
            i.addEventListener("qlwapp.height", (function(e) {
                const t = e.currentTarget
                  , n = t.querySelector(".qlwapp-body").querySelector(".qlwapp-carousel")
                  , a = t?.querySelector(".qlwapp-header")?.offsetHeight || 0
                  , o = t?.querySelector(".qlwapp-footer")?.offsetHeight || 0;
                if (!n)
                    return;
                let i = window.innerHeight - a - o;
                s.mobiledevice || (i = .7 * window.innerHeight - a - o),
                n.style.maxHeight = i + "px"
            }
            )),
            i.addEventListener("qlwapp.toggle", (function(e) {
                const t = e.currentTarget
                  , n = t.querySelector(".qlwapp-box");
                t.classList.add("qlwapp-transition"),
                n.classList.remove("response", "texting"),
                setTimeout((function() {
                    t.classList.toggle("qlwapp-show");
                    const e = new CustomEvent("qlwapp.height",{
                        bubbles: !0
                    });
                    t.dispatchEvent(e)
                }
                ), 10),
                setTimeout((function() {
                    t.classList.toggle("qlwapp-transition")
                }
                ), 300)
            }
            )),
            i.addEventListener("click", (function(e) {
                const t = e.target.closest("[data-action]");
                if (!t || !i.contains(t))
                    return;
                const n = t.dataset?.action;
                switch (n) {
                case "open":
                    s.open(e, t);
                    break;
                case "box":
                case "close":
                    s.toggle(e, t);
                    break;
                case "chat":
                    s.chat(e, t);
                    break;
                case "previous":
                    s.previous(e, t)
                }
            }
            )),
            i.querySelector("[data-action=response]")?.addEventListener("keypress", (function(e) {
                e.target.matches("textarea") && 13 == e.keyCode && setTimeout((function() {
                    !function(e) {
                        if ("createEvent"in document) {
                            const t = e.ownerDocument
                              , n = t.createEvent("MouseEvents");
                            n.initMouseEvent("click", !0, !0, t.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null),
                            e.dispatchEvent(n)
                        } else
                            e.click()
                    }(i.querySelector(".qlwapp-reply"))
                }
                ), 100)
            }
            )),
            i.querySelector("[data-action=response]")?.addEventListener("keyup", (function(e) {
                if (e.target.matches("textarea")) {
                    e.preventDefault();
                    const t = e.currentTarget
                      , n = e.target
                      , s = t.querySelector("pre")
                      , a = t.querySelector(".qlwapp-reply")
                      , o = i.querySelector(".qlwapp-box")
                      , l = o.querySelector(".qlwapp-buttons");
                    s.innerHTML = n.value,
                    setTimeout((function() {
                        o.classList.add("texting"),
                        o.style.paddingBottom = s.offsetHeight + "px",
                        l.classList.add("active");
                        const e = n.value;
                        a.dataset.message = e,
                        "" == e && (o.classList.remove("texting"),
                        l.classList.remove("active"))
                    }
                    ), 300)
                }
            }
            )),
            i.dispatchEvent(a),
            window.addEventListener("click", (e=>{
                if (!e.target.closest("#qlwapp.qlwapp-show")) {
                    const e = document.querySelector("#qlwapp.qlwapp-show");
                    e && e.dispatchEvent(new CustomEvent("qlwapp.toggle"))
                }
            }
            )),
            window.addEventListener("resize", (()=>{
                if ("TEXTAREA" !== document.activeElement.tagName) {
                    const e = document.querySelector("#qlwapp");
                    e && (e.dispatchEvent(o),
                    e.dispatchEvent(a))
                }
            }
            ))
        }
    };
    const a = s;
    (()=>{
        window.qlwapp = (e,t)=>{
            if (void 0 === t || "object" == typeof t)
                e.plugin_qlwapp || (e.plugin_qlwapp = new a(e,t));
            else if ("string" == typeof t && "_" !== t[0] && "init" !== t) {
                let n;
                const s = e.plugin_qlwapp;
                if (s instanceof a && "function" == typeof s[t]) {
                    const e = Array.from(arguments).slice(1);
                    n = s[t](...e)
                }
                return "destroy" === t && (e.plugin_qlwapp = null),
                void 0 !== n ? n : e
            }
        }
        ;
        const e = ()=>{
            document.querySelectorAll(".qlwapp").forEach((function(e) {
                window.qlwapp(e)
            }
            ))
        }
        ;
        e(),
        window.addEventListener("load", (()=>{
            e()
        }
        ))
    }
    )()
}
)();
