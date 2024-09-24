$(document).ready(function () {
    // Lang
      var mutace = '<div class="lang"><a href="https://shop.respilon.com/"><img src="https://shop.respilon.cz/user/documents/upload/sablona-nemazat/world.png"></a>'+
    '<a href="https://shop.respilon.com/"><img src="https://shop.respilon.cz/user/documents/upload/sablona-nemazat/united.png"></a>'+
    '<a href="https://shop.respilon.sk/"><img src="https://shop.respilon.cz/user/documents/upload/sablona-nemazat/slovakia.png"></a>'+
    '<a href="https://shop.respilon.de/"><img src="https://shop.respilon.cz/user/documents/upload/sablona-nemazat/germany.png"></a></div>';
    if($('header#header').length){
        $(mutace).clone().insertBefore('.top-navigation-tools .responsive-tools');
        $(mutace).clone().insertBefore('.top-navigation-bar');
    }
    
    // Remark cart
    $('label:contains("Zadat poznámku pro prodejce")').remove();    
    
    // FB fix
    $(".facebook a").text("Facebook");
    $(".facebook a").attr("href", "https://www.facebook.com/respilon.cz/");
    
    // Detail additional
    if ($(".type-detail").length) {

        const date = new Date();
        today_date = date.toLocaleString('en-US', {timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit',}),
        today_spl = today_date.split("/")
        today_white = today_spl[0] + "-" + today_spl[1] + "-" + today_spl[2]
        today = today_white.replace(/\s+/g, "");
        console.log(today)

        endSrp = '2022-08-31'

        if (today < endSrp) {
            mallpay_sale();
        }
    }
});

// Benefits
$(document).ready(function () {
    // FIX
    $(".benefitBanner__item").appendTo(".benefitBanner")
    $(".benefitBanner.position--benefitProduct").insertBefore(".social-buttons-wrapper")

    var nano_prod = '\
    <div class="benefitBanner__item">\
    <a class="benefitBanner__link" href="/aaaa/">\
    <div class="benefitBanner__picture">\
    <img src="https://shop.respilon.cz/user/documents/upload/Benefit_ban/nano.png" class="benefitBanner__img" alt="">\
    </div>\
    <div class="benefitBanner__content">\
    <div class="benefitBanner__data">\
    <b>Nanovlákenný filtr<b>\
    </div></div></></div>';

    var light_weight = '\
    <div class="benefitBanner__item">\
    <a class="benefitBanner__link" href="/aaaa/">\
    <div class="benefitBanner__picture">\
    <img src="https://shop.respilon.cz/user/documents/upload/Benefit_ban/light.png" class="benefitBanner__img" alt="">\
    </div>\
    <div class="benefitBanner__content">\
    <div class="benefitBanner__data">\
    <b>Extrémně lehký a pohodlný<b>\
    </div></div></></div>';

    /*
    var washable = '\
    <div class="benefitBanner__item">\
    <a class="benefitBanner__link" href="/aaaa/">\
    <div class="benefitBanner__picture">\
    <img src="https://shop.respilon.cz/user/documents/upload/Benefit_ban/icon_newsletter_machinewash.png" class="benefitBanner__img" alt="">\
    </div>\
    <div class="benefitBanner__content">\
    <div class="benefitBanner__data">\
    <b>Pratelný<b>\
    </div></div></></div>';
    */

    if ($(".in-nano-respiratory.type-detail").length) {
        $(light_weight).prependTo(".position--benefitProduct")
        $(nano_prod).prependTo(".position--benefitProduct")
    }

    if (
        $(".type-detail.in-classic").length
        ||
        $(".type-detail.in-light").length
    ) {
        //$(washable).prependTo(".type-detail .position--benefitProduct")
        $(nano_prod).prependTo(".position--benefitProduct")
    }

    if (
        $(".type-detail.in-nano-site-do-oken").length
        ||
        $(".type-detail.in-filtry-do-klimatizace").length
        ) {
        
        $(nano_prod).prependTo(".position--benefitProduct")
    }
});

