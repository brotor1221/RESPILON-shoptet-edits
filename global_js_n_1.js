if (window.location.hash) {
    if (
        $(".type-post").length
        ||
        $(".type-page").length
    ) {
        var width = $("html").width()
        if (width < 992) {
            var typeOffset = -10    
        }
        else {
            var typeOffset = 80
        }
    }
    else if ($(".type-detail").length) {
        var width = $("html").width()
        if (width < 992) {
            var typeOffset = 10    
        }
        else {
            var typeOffset = 200
        }
    }
    $('html, body').animate({
        scrollTop: ($(window.location.hash).offset().top - typeOffset)
    }, "slow", 'linear');

    setTimeout(() => {
        history.pushState("", document.title, window.location.pathname);
    }, 100);
} 

$('a.anchorbtn[href*="#"]').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
            if (
                $(".type-post").length
                ||
                $(".type-page").length
            ) {
                var width = $("html").width()
                if (width < 992) {
                    var typeOffset = 10    
                }
                else {
                    var typeOffset = 80
                }
            }
            else if ($(".type-detail").length) {
                var width = $("html").width()
                if (width < 992) {
                    var typeOffset = 10    
                }
                else {
                    var typeOffset = 200
                }
            }
            $("html, body").animate({
                    scrollTop: target.offset().top - typeOffset,
                }, "slow", "linear");
            return false;
        }
    }
});

$(document).ready(function () {
    // Customer
    $('a[href="/client-center/client-discussion/"]').parent().remove()
    $('a[href="/klient/klient-slevy/"]').parent().remove()
    $('a[href="/centrum-klientow/klient-rabaty/"]').parent().remove()
    $('a[href="/kundencenter/client-discounts/"]').parent().remove()    
    $('a[href="/centrum-klientow/klient-dyskusja/"]').parent().remove() 

    if ($(".id--43").length) {
        if ($('html[lang="cs"]').length) {
            var customer_page_files = "<h4>Pokud si přejete zaslat doklady vydané do 30.9.2021, napište nám prosím na <a href='mailto:finance@respilon.com'>finance@respilon.com</a> a doklady Vám zašleme.</h4>"
        }                    
        if ($('html[lang="en"]').length) {
            var customer_page_files = "<h4>If you wish to access documents issued before 22.9.2021, please contact us at <a href='mailto:finance@respilon.com'>finance@respilon.com</a> and we will send them to you.</h4>"
        }                    
        if ($('html[lang="de"]').length) {
            var customer_page_files = "<h4>Falls Sie die bis zum 31.8.2021 ausgestellten Unterlagen (Gutschriften, Rechnungen, Vorauszahlungsrechnungen) zukommen lassen möchten, melden Sie sich bei uns unter  <a href='mailto:finance@respilon.com'>finance@respilon.com</a> und wir werden die gewünschten Unterlagen zur Verfügung stellen.</h4>"
        }                    
        if ($('html[lang="pl"]').length) {
            var customer_page_files = "<h4>Jeśli chcesz przesłać dokumenty wydane przed dniem 1.9.2021, napisz do nas na adres <a href='mailto:finance@respilon.com'>finance@respilon.com</a>, a my prześlemy Ci dokumenty (faktury zaliczkowe, dokumenty podatkowe i noty uznaniowe).</h4>"
        }

        $(customer_page_files).insertAfter(".content-inner h1")
    }

    // Blog
    if ($('html[lang="cs"]').length) {
        var continue_reading = 'Celý článek'
    }                    
    if ($('html[lang="en"]').length) {
        var continue_reading = 'Continue reading'
    }                    
    if ($('html[lang="de"]').length) {
        var continue_reading = 'Weiterlesen'
    }                    
    if ($('html[lang="pl"]').length) {
        var continue_reading = 'Przeczytaj więcej'
    }

    $(".type-posts-listing .content-inner #newsWrapper .news-item").each(function () {
        var news_anchor = $(this).find(".text>a").attr("href")
        var continue_btn = '<a href="' + news_anchor + '" class="dm-continue-reading">'+continue_reading+'</a>'
        $(continue_btn).appendTo(this)
    })

    // Contat page
    if ($('html[lang="cs"]').length) {
        var can_we_help = 'Můžeme Vám pomoci?'
    }                    
    if ($('html[lang="en"]').length) {
        var can_we_help = 'How can we help you?'
    }                    
    if ($('html[lang="de"]').length) {
        var can_we_help = 'Können wir Ihnen helfen?'
    }                    
    if ($('html[lang="pl"]').length) {
        var can_we_help = 'Możemy Ci pomóc?'
    }
    if ($(".contact-page").length) {
            $("#content > div > article > header > h1").html(can_we_help).addClass("center-cstm")
    }

    // NWSLTR
    $(".newsletter").closest(".custom-footer > div").prependTo("#footer").addClass("newsletter-wrapper");
    $("#dklab_instagram_widget").insertAfter(".newsletter-wrapper");

    // Related products
    $("h2.products-related-header").insertAfter("div.p-detail");
    $("div.products.products-block.products-related.products-additional.p-switchable").insertAfter("h2.products-related-header");
    $("div.browse-p").insertAfter("div.products.products-block.products-related.products-additional.p-switchable")

    // BTN
    if ($('html[lang="cs"]').length) {
        var buy_btn = 'KOUPIT'
    }                    
    if ($('html[lang="en"]').length) {
        var buy_btn = 'BUY'
    }                         
    if ($('html[lang="pl"]').length) {
        var buy_btn = 'KUP'
    }

    if (!$("html[lang='de']").length) {
        $('.add-to-cart-button').html(buy_btn);
    }

    // Last rating
    if ( $( ".latest-contribution-wrapper" ).length ) {
        $("div.content-wrapper.latest-contribution-box h2").insertBefore(".latest-contribution-wrapper");
    }

    $("a.latest-contribution-inner").each(function() {
        var deflink = $(this).attr("href")
        var newlink = deflink + '#ratingTab'
        $(this).attr("href", newlink)
    });

    // Cart ship + pay
    $(".shipping-billing-table img").each(function () {
        var img = $(this)
        var src = $(img).attr("src")
        var src_end = src.replace("https://cdn.myshoptet.com/usr/" + location.host + "/user/system/", "")
    
        var spl = src_end.split('.')
        var src_name_edited = spl[0].replace("-","").replace(/[0-9]/g, "");
        var src_filetype = spl[1];
    
        //var src_to_png = src_filetype.replace(src_filetype, "jpg")
        var high_q = '/user/documents/upload/Delivery/ship_pay_ico/' + src_name_edited + '.' + src_filetype //+ src_to_png
    
        $.ajax({
            type: 'HEAD',
            url: high_q,
            success: function () {
                $(img).attr("src",high_q)
            }
        });    
    })
    
    $(".shipping-billing-table label[for='inst-PAYMENT_CARD'] img").attr("src", "/user/documents/upload/Delivery/ship_pay_ico/card.jpg")
    $(".shipping-billing-table label[for='inst-BITCOIN'] img").attr("src", "/user/documents/upload/Delivery/ship_pay_ico/bitcoin.jpg")
    $(".shipping-billing-table label[for='inst-GPAY'] img").attr("src", "/user/documents/upload/Delivery/ship_pay_ico/gpay.jpg")
    $(".shipping-billing-table label[for='inst-APPLE_PAY'] img").attr("src", "/user/documents/upload/Delivery/ship_pay_ico/apay.jpg")
    $(".shipping-billing-table label[for='inst-PAYPAL'] img").attr("src", "/user/documents/upload/Delivery/ship_pay_ico/paypal.jpg")    

    // Detail tabs
    if ($(".type-detail").length) {
        $(".product").removeClass("related-sm-screen-hide")
        $(".shp-tabs-holder ul.shp-tabs li a[href='#productDiscussion']").parent().remove()

        if ($(".type-detail #productsAlternative").length) {
            if ($('html[lang="cs"]').length) {
                var related_head = 'Podobné produkty'
            }                    
            if ($('html[lang="en"]').length) {
                var related_head = 'Alternative products'
            }                    
            if ($('html[lang="de"]').length) {
                var related_head = 'Ähnliche Produkte'
            }                    
            if ($('html[lang="pl"]').length) {
                var related_head = 'Podobne produkty'
            }

            $("#productsAlternative").addClass("active in").insertAfter(".p-detail-tabs-wrapper")
            $('<h2 class="products-related-header">' + related_head + '</h2>').insertBefore("#productsAlternative")
            $(".shp-tabs-holder ul.shp-tabs li a[href='#productsAlternative']").parent().remove()
        }   
    }

    // Price mesure VK + Carbon
    if ($(".type-detail").length) {
        if (
            // Carbon
            $('meta[content="8594190530475"]').length
            ||
            $('meta[content="8594190530482"]').length
            // Carbon konec
            ||
            // RespiPro VK
            $('meta[content="8595190533275"]').length
            ||
            $('meta[content="8595190533275"]').length
            ||
            $('meta[content="8595190533275"]').length
            ||
            $('meta[content="8595190533275"]').length
            // RespiPro VK konec
            ||
            // RespiRaptor VK
            $('meta[content="8595190533312"]').length
            ||
            $('meta[content="8595190532872"]').length
            ||
            $('meta[content="8595190533718"]').length
            // RespiRaptor VK konec
        ) {
            if ($('html[lang="cs"]').length) {
                // RespiPro VK
                var vkrp_price_d = 'přibližně 1,3 Kč / hod.'
                var vkrp_price_var = 'méně než 1,5Kč / hod.'
                // RespiRaptor VK
                var vkrr_price_d = 'přibližně 1,1 Kč / hod.'
                var vkrr_price_var = 'méně než 1,2 Kč / hod.'
            }                    
            if ($('html[lang="en"]').length) {
                var currency = getShoptetDataLayer('currency');
                if (currency == 'EUR') {
                    // RespiPro VK
                    var vkrp_price_d = 'less than €0.06 / hr'
                    var vkrp_price_var = 'less than €0.06 / hr'
                    // RespiRaptor VK
                    var vkrr_price_d = 'less than €0.04 / hr'
                    var vkrr_price_var = 'approxiamtely €0.05 / hr'
                }
                else if (currency == 'USD') {
                    // RespiPro VK
                    var vkrp_price_d = 'less than $0.07 / hr'
                    var vkrp_price_var = 'less than $0.07 / hr'
                    // RespiRaptor VK
                    var vkrr_price_d = 'less than $0.05 / hr'
                    var vkrr_price_var = 'approxiamtely $0.05 / hr'
                }
            }                    
            if ($('html[lang="de"]').length) {
                // RespiPro VK
                var vkrp_price_d = 'ungefähr 0,05 € / Std.'
                var vkrp_price_var = 'weniger als 0,06 €/Std.'
                // RespiRaptor VK
                var vkrr_price_d = 'ungefähr 0,04 € / Std.'
                var vkrr_price_var = 'weniger als 0,05 €/Std.'
            }                    
            if ($('html[lang="pl"]').length) {
                // RespiPro VK
                var vkrp_price_d = 'mniej niż 0,24 zł / godz.'
                var vkrp_price_var = 'około 0,25 zł / godz.'
                // RespiRaptor VK
                var vkrr_price_d = 'mniej niż 0,23 zł / godz.'
                var vkrr_price_var = 'mniej niż 0,24 zł / godz.'
            }

            // Carbon
            if (
                $('meta[content="8594190530475"]').length
                ||
                $('meta[content="8594190530482"]').length 
            ) {
                var carbon_price = $(".price-measure .choose-variant.1").text()
                $(".price-measure .choose-variant.default-variant").text(carbon_price)
            }
        
            // RespiPro VK
            if (
                $('meta[content="8595190533275"]').length
                ||
                $('meta[content="8595190533275"]').length
                ||
                $('meta[content="8595190533275"]').length
                ||
                $('meta[content="8595190533275"]').length
            ) {
                var price_mes = '\
                <span class="price-measure">\
                    <span class="choose-variant no-display 1 noDisplay">\
                        '+ vkrp_price_var +'\
                    </span>\
                    <span class="choose-variant no-display no-display 2 noDisplay">\
                        '+ vkrp_price_d +'\
                    </span>\
                    <span class="choose-variant no-display 3 noDisplay">\
                        '+ vkrp_price_var +'\
                    </span>\
                    <span class="choose-variant no-display 4 noDisplay">\
                        '+ vkrp_price_d +'\
                    </span>\
                    <span class="choose-variant default-variant">\
                        '+ vkrp_price_d +'\
                    </span>\
                </span>\
                ';
            }
        
            // RespiRaptor VK
            if (
                $('meta[content="8595190533312"]').length
                ||
                $('meta[content="8595190532872"]').length
                ||
                $('meta[content="8595190533718"]').length
            ) {
                var price_mes = '\
                <span class="price-measure">\
                    <span class="choose-variant no-display 1 noDisplay">\
                        '+ vkrr_price_var +'\
                    </span>\
                    <span class="choose-variant no-display no-display 2 noDisplay">\
                        '+ vkrr_price_var +'\
                    </span>\
                    <span class="choose-variant no-display 3 noDisplay">\
                        '+ vkrr_price_d +'\
                    </span>\
                    <span class="choose-variant default-variant">\
                        '+ vkrr_price_d +'\
                    </span>\
                </span>\
                ';
            }

            $(".p-final-price-wrapper .price-measure").html(price_mes)
            $(".default-variant").css("visibility", "visible")
            $(".default-variant").css("display","block")
        }
    }

    if ($(".in-index").length) {
        $(".latest-contribution-wrapper .latest-contribution-inner").each(function () {
            var that = $(this)
            var have_name = $(this).find(".latest-contribution-author")
            if (!$(have_name).length) {
                $(that).find("i").hide()
            }
        })
    }

    if (
        $("iframe").length
        &&
        $(".in-blog").length
    ) {
        $("iframe").each(function () {
            $(this).wrap("<div class='iframe-wraper'>")
        });
    }
});

function hidetext() {
    var elem = $("#toggletxt").text();
    if (elem == "Read more...") {
        $("#hidetext").slideDown();
        $("#toggletxt").fadeOut();
    }
}

$(function () {
    if (document.location.href.indexOf('#ratingTab') > -1) {
        $(".star-list a").click()
    }
});

$(document).ready(function () {
    sizeMsg();
    rrsweather(); 
    cart_prod_vis();
    saleProdDetail();
    saleProdB();
    dorucime();
});

$(document).ajaxSuccess(function (event, request, settings) {
    sizeMsg();
    rrsweather(); 
    cart_prod_vis();
    saleProdB();
    dorucime();
});

document.addEventListener('ShoptetDOMContentLoaded', function () {
    sizeMsg();
    rrsweather(); 
    cart_prod_vis();
    saleProdB();
    dorucime();
});

window.addEventListener("resize", function (event) {
    sizeMsg();
});

function sizeMsg() {
    if ($(".siteCookies").length) {   
        $(".site-msg.information").attr("id", "siteCSMTmsg")
        $(".siteCookies").attr("id", "siteCookies")
        var clientHeight = document.getElementById('siteCookies').clientHeight;
        var heightMSG = clientHeight + 'px'
        $("#site-msg-bttm").html(":root{--site-msg-bttm:" + heightMSG + "}")
        
        $(".js-cookiesConsentSubmit").attr("onClick", "closeCSTM()")
    }
}

function closeCSTM() {
    $("#site-msg-bttm").html(":root{--site-msg-bttm: 0px}")
}

function rrsweather() {
    if ($('html[lang="cs"]').length) {
        var summer = "(letní)"
        var winter = "(zimní)"
    }                    
    if ($('html[lang="en"]').length) {
        var summer = "(summer)"
        var winter = "(winter)"
    }                    
    if ($('html[lang="de"]').length) {
        var summer = "(Sommer)"
        var winter = "(Winter)"
    }                    
    if ($('html[lang="pl"]').length) {
        var summer = "(letni)"
        var winter = "(zimowy)"
    }

    $('.category-appendix:contains("' + winter + '")').addClass("winter")
    $('.product-appendix:contains("' + winter + '")').addClass("winter")
    
    $('.category-appendix:contains("' + summer + '")').addClass("summer")
    $('.product-appendix:contains("' + summer + '")').addClass("summer")
    
    $(".category-appendix").html(" ")
    $(".product-appendix").html(" ")
}

function saleProdB() {
    if ($(".products-block").length) {
        $(".products-block .product").each(function () {
            var OK = $(this).find(".DMdone")
            if (!$(OK).length) {
                var ptools = $(this).find(".p-tools")
                var p_desc = $(this).find(".p-desc")
                var prices = $(this).find(".prices")
                var rating = $(this).find(".ratings-wrapper")
                var stars = $(this).find(".stars-wrapper")
                var stars_placeholder = $(this).find(".stars-placeholder")
        
                $(ptools).insertAfter(p_desc)
                $(prices).prependTo(rating)
                $(stars).appendTo(rating)
                $(stars_placeholder).remove()

                var standardprice = $(this).find(".p .flag-discount .price-standard")
                if ($(standardprice).length) {
                    var standardprice_c = $(this).find(".p .flag-discount .price-standard").clone()
                    var prices = $(this).find(".prices")
                    $(standardprice_c).prependTo(prices)

                    $(prices).addClass("DM-sale")
    
                    var percentsale = $(this).find(".p .flag-discount .price-save").html()
                    var flags_default = $(this).find(".flags-default") 
                    
                    if ($(flags_default).length) {
                        var flag_percentage = '<span class="flag flag-percentagesale">' + percentsale + '</span>'
                        $(flag_percentage).appendTo(flags_default)
                    }
                    else {
                        var flag_percentage = '<div class="flags flags-default"><span class="flag flag-percentagesale">' + percentsale + '</span></div>'
                        var flags_extra = $(this).find(".flags-extra")
                        $(flag_percentage).insertBefore(flags_extra)
                    }
    
                    var dif_prices = $(this).find(".price-final>strong>small")
                    var price_standard_bttm = $(this).find(".prices>.price-standard>span")
                    var flag_percentage_find = $(this).find(".flag.flag-percentagesale")
    
                    if ($(dif_prices).length) {
                        if ($('html[lang="cs"]').length) {
                            var od_w = 'od'
                            var az_w = 'až'
                        }                    
                        if ($('html[lang="en"]').length) {
                            var od_w = 'from'
                            var az_w = 'up to'
                        }                    
                        if ($('html[lang="de"]').length) {
                            var od_w = 'ab'
                            var az_w = 'Bis zu'
                        }                    
                        if ($('html[lang="pl"]').length) {
                            var od_w = 'od'
                            var az_w = 'Ponad'
                        }
    
                        var od = '<span>'+od_w+' <span>'
                        var az = '<span>'+az_w+' <span>'

                        $(od).prependTo(price_standard_bttm)
                        $(az).prependTo(flag_percentage_find)
                    }
                }

                $(this).find(".p").addClass("DMdone")
            }
        });
    };
}

function saleProdDetail() {
    if ($(".p-info-wrapper .price-save").length) {
        if ($(".p-info-wrapper .price-save .default-variant").length) {
            var percentsale_d = $(".p-info-wrapper .price-save .default-variant").text()
        }
        else {
            var percentsale_d = $(".p-info-wrapper .price-save").text()
        }
            
        if (
            $(".product-top .flags-default").length
            &&
            !$(".product-top .flags-default .flag-percentagesale").length
        ) {
            var flag_percentage_d = '<span class="flag flag-percentagesale">' + percentsale_d + '</span>'
            $(flag_percentage_d).appendTo(".product-top .flags-default")
        }
        else if (
            !$(".product-top .flags-default").length
            &&
            !$(".product-top .flags-default .flag-percentagesale").length
        ) {
            var flag_percentage_d = '<div class="flags flags-default"><span class="flag flag-percentagesale">' + percentsale_d + '</span></div>'
            $(flag_percentage_d).prependTo(".product-top .p-detail-info")
        }

        if ($(".p-info-wrapper .price-save .default-variant").length) {
            $(".p-info-wrapper .price-save span").each(function () {
                var str = $(this).text().trim();
                $(this).text('(' + str + ')')
            })
        }
        else {
            $(".p-info-wrapper .price-save").each(function () {
                var str = $(this).text().trim();
                $(this).text('(' + str + ')')
            })
        }
    }
}

function cart_prod_vis() {
    if ($('html[lang="cs"]').length) {
        $(".cart-table .show-related").html("Zákazníci k tomuto produktu kupují");
    }
    $('.cart-table tbody tr.removeable:last').addClass("related-visible")
    $('.cart-table tr.related:last-child').addClass("visible")

    $(".cart-related-product").each(function () {
        var img = $(this).find("img")
        var data_src = $(img).data("src")
        $(img).attr("src", data_src)
    })
}

function dorucime() {
    if ($('html[lang="cs"]').length) {
        var def_delivery = 'Doručení možné do'
        var new_delivery = 'Doručíme do'
    }    
    if ($('html[lang="de"]').length) {
        var def_delivery = 'Lieferung bis'
        var new_delivery = 'Normale Lieferung'
    }

    if (
        $('html[lang="cs"]').length
        ||
        $('html[lang="de"]').length
    ) {
        $('.delivery-time').html(function (i, txt) {
            return txt.replace(def_delivery, new_delivery);
        });
        
        $(".delivery-time-label").text(new_delivery + ":")
    }
}
