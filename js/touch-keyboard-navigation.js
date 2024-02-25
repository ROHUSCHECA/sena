!function(e) {
    var n = e(window)
      , i = e(".header-logo img")
      , s = e(".header-top")
      , a = e(".header-bottom")
      , t = a.height()
      , o = e("html").css("margin-top")
      , d = 0
      , f = !1
      , l = "margin-bottom"
      , u = "top"
      , c = "fixed";
    i.load(function() {
        t = a.height()
    }),
    n.load(function() {
        d = o,
        a.css(u, d)
    }),
    n.resize(function() {
        n.width() < 768 && setTimeout(function() {
            a.removeClass(c)
        }, 250)
    }),
    n.scroll(function() {
        n.width() >= 768 && (n.scrollTop() >= 250 ? f || (s.css(l, t),
        f = !0,
        a.addClass(c).css(u, -t).animate({
            top: d
        }, 400)) : f && (f = !1,
        a.animate({
            top: -t
        }, 200, function() {
            a.removeClass(c),
            s.css(l, 0)
        })))
    })
}(jQuery),
function(e) {
    var n, i, s, a, t = e(window), o = e(".header-main-menu"), d = o.find(".menu-item-has-children"), f = d.find(".sub-menu"), l = d.find("> a"), u = "fa-minus-square", c = "fa-plus-square", r = "span";
    l.append('<span class="fa fa-plus-square"></span>'),
    t.width() < 768 ? (n = i = !0,
    o.hide(),
    f.hide()) : n = i = !1,
    e(".header-bottom .mobile-menu-button").click(function() {
        o.slideToggle()
    }),
    e(window).resize(function() {
        n = !(t.width() >= 768),
        i != n && (n ? (o.hide(),
        f.hide(),
        l.find(r).addClass(c).removeClass(u)) : (o.show(),
        f.show()),
        i = n)
    }),
    l.find(r).click(function(e) {
        e.preventDefault()
    }),
    l.click(function(n) {
        s = e(this).find(r),
        a = e(this).parent().find("> .sub-menu"),
        s.hasClass(c) ? s.addClass(u).removeClass(c) : s.addClass(c).removeClass(u),
        a.slideToggle(400)
    })
}(jQuery),
function(e) {
    $fxTOC = e(".fx-toc"),
    $fxTOC.length && (e(".fx-toc-title").after('<div class="expandir-menu" href="#"><span class="fa fa-bars"></span></div>'),
    $fxTOC.find(".expandir-menu").click(function() {
        $fxTOC.find("> ul").toggle()
    }))
}(jQuery);
