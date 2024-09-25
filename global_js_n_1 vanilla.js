document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll if URL contains hash
    if (window.location.hash) {
        let typeOffset = 0;
        const width = document.documentElement.clientWidth;

        if (document.querySelector(".type-post") || document.querySelector(".type-page")) {
            typeOffset = width < 992 ? -10 : 80;
        } else if (document.querySelector(".type-detail")) {
            typeOffset = width < 992 ? 10 : 200;
        }

        const target = document.querySelector(window.location.hash);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - typeOffset,
                behavior: "smooth"
            });
        }

        setTimeout(() => {
            history.pushState("", document.title, window.location.pathname);
        }, 100);
    }

    // Anchor button smooth scroll
    document.querySelectorAll('a.anchorbtn[href*="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            if (location.pathname.replace(/^\//, "") == anchor.pathname.replace(/^\//, "") && location.hostname == anchor.hostname) {
                let target = document.querySelector(anchor.hash) || document.querySelector(`[name='${anchor.hash.slice(1)}']`);
                if (target) {
                    let typeOffset = 0;
                    const width = document.documentElement.clientWidth;

                    if (document.querySelector(".type-post") || document.querySelector(".type-page")) {
                        typeOffset = width < 992 ? 10 : 80;
                    } else if (document.querySelector(".type-detail")) {
                        typeOffset = width < 992 ? 10 : 200;
                    }

                    window.scrollTo({
                        top: target.offsetTop - typeOffset,
                        behavior: "smooth"
                    });
                    e.preventDefault();
                }
            }
        });
    });

    // Remove specific elements
    const linksToRemove = [
        "/client-center/client-discussion/",
        "/klient/klient-slevy/",
        "/centrum-klientow/klient-rabaty/",
        "/kundencenter/client-discounts/",
        "/centrum-klientow/klient-dyskusja/"
    ];

    linksToRemove.forEach(link => {
        const element = document.querySelector(`a[href='${link}']`);
        if (element) {
            element.parentElement.remove();
        }
    });

    // Customer page messages
    const lang = document.documentElement.lang;
    const customerPageElement = document.querySelector(".id--43");
    if (customerPageElement) {
        let message = "";
        if (lang === "cs") {
            message = "<h4>Pokud si přejete zaslat doklady vydané do 30.9.2021, napište nám prosím na <a href='mailto:finance@respilon.com'>finance@respilon.com</a> a doklady Vám zašleme.</h4>";
        } else if (lang === "en") {
            message = "<h4>If you wish to access documents issued before 22.9.2021, please contact us at <a href='mailto:finance@respilon.com'>finance@respilon.com</a> and we will send them to you.</h4>";
        } else if (lang === "de") {
            message = "<h4>Falls Sie die bis zum 31.8.2021 ausgestellten Unterlagen (Gutschriften, Rechnungen, Vorauszahlungsrechnungen) zukommen lassen möchten, melden Sie sich bei uns unter <a href='mailto:finance@respilon.com'>finance@respilon.com</a> und wir werden die gewünschten Unterlagen zur Verfügung stellen.</h4>";
        } else if (lang === "pl") {
            message = "<h4>Jeśli chcesz przesłać dokumenty wydane przed dniem 1.9.2021, napisz do nas na adres <a href='mailto:finance@respilon.com'>finance@respilon.com</a>, a my prześlemy Ci dokumenty (faktury zaliczkowe, dokumenty podatkowe i noty uznaniowe).</h4>";
        }

        if (message) {
            const container = customerPageElement.querySelector(".content-inner h1");
            if (container) {
                container.insertAdjacentHTML("afterend", message);
            }
        }
    }

    // Blog continue reading button
    let continueReading = "";
    if (lang === "cs") {
        continueReading = "Celý článek";
    } else if (lang === "en") {
        continueReading = "Continue reading";
    } else if (lang === "de") {
        continueReading = "Weiterlesen";
    } else if (lang === "pl") {
        continueReading = "Przeczytaj więcej";
    }

    document.querySelectorAll(".type-posts-listing .content-inner #newsWrapper .news-item").forEach(function (newsItem) {
        const newsAnchor = newsItem.querySelector(".text > a");
        if (newsAnchor) {
            const continueBtn = document.createElement("a");
            continueBtn.href = newsAnchor.href;
            continueBtn.className = "dm-continue-reading";
            continueBtn.textContent = continueReading;
            newsItem.appendChild(continueBtn);
        }
    });

    // Contact page title modification
    let helpText = "";
    if (lang === "cs") {
        helpText = "Můžeme Vám pomoci?";
    } else if (lang === "en") {
        helpText = "How can we help you?";
    } else if (lang === "de") {
        helpText = "Können wir Ihnen helfen?";
    } else if (lang === "pl") {
        helpText = "Możemy Ci pomóc?";
    }

    const contactPageTitle = document.querySelector(".contact-page #content > div > article > header > h1");
    if (contactPageTitle) {
        contactPageTitle.textContent = helpText;
        contactPageTitle.classList.add("center-cstm");
    }

    // Newsletter and footer
    const newsletter = document.querySelector(".newsletter");
    if (newsletter) {
        const footer = document.getElementById("footer");
        const parentDiv = newsletter.closest(".custom-footer > div");
        if (footer && parentDiv) {
            footer.prepend(parentDiv);
            parentDiv.classList.add("newsletter-wrapper");
        }
    }

    const instagramWidget = document.getElementById("dklab_instagram_widget");
    if (instagramWidget) {
        const newsletterWrapper = document.querySelector(".newsletter-wrapper");
        if (newsletterWrapper) {
            newsletterWrapper.insertAdjacentElement("afterend", instagramWidget);
        }
    }

    // Related products
    const relatedHeader = document.querySelector("h2.products-related-header");
    const relatedProducts = document.querySelector("div.products.products-block.products-related.products-additional.p-switchable");
    const productDetail = document.querySelector("div.p-detail");
    const browseProducts = document.querySelector("div.browse-p");

    if (relatedHeader && relatedProducts && productDetail) {
        productDetail.insertAdjacentElement("afterend", relatedHeader);
        relatedHeader.insertAdjacentElement("afterend", relatedProducts);
        relatedProducts.insertAdjacentElement("afterend", browseProducts);
    }

    // Replace images in shipping and payment options
    document.querySelectorAll(".shipping-billing-table img").forEach(function (img) {
        const src = img.getAttribute("src");
        const srcNameEdited = src.replace(/[-0-9]/g, "").split('.').shift();
        const srcFiletype = src.split('.').pop();
        const highQ = `/user/documents/upload/Delivery/ship_pay_ico/${srcNameEdited}.${srcFiletype}`;

        fetch(highQ, { method: "HEAD" }).then(() => {
            img.setAttribute("src", highQ);
        });
    });

    // Update shipping and payment icons
    const paymentImages = {
        'PAYMENT_CARD': 'card.jpg',
        'BITCOIN': 'bitcoin.jpg',
        'GPAY': 'gpay.jpg',
        'APPLE_PAY': 'apay.jpg',
        'PAYPAL': 'paypal.jpg'
    };

    for (const key in paymentImages) {
        const label = document.querySelector(`.shipping-billing-table label[for='inst-${key}'] img`);
        if (label) {
            label.setAttribute("src", `/user/documents/upload/Delivery/ship_pay_ico/${paymentImages[key]}`);
        }
    }

    // Product-related tabs
    if (document.querySelector(".type-detail")) {
        document.querySelector(".product").classList.remove("related-sm-screen-hide");
        document.querySelector(".shp-tabs-holder ul.shp-tabs li a[href='#productDiscussion']").parentElement.remove();

        const productsAlternative = document.querySelector("#productsAlternative");
        if (productsAlternative) {
            let relatedHead = "";
            if (lang === "cs") {
                relatedHead = 'Podobné produkty';
            } else if (lang === "en") {
                relatedHead = 'Alternative products';
            } else if (lang === "de") {
                relatedHead = 'Ähnliche Produkte';
            } else if (lang === "pl") {
                relatedHead = 'Podobne produkty';
            }

            productsAlternative.classList.add("active", "in");
            productsAlternative.insertAdjacentElement("afterend", document.querySelector(".p-detail-tabs-wrapper"));
            const h2 = document.createElement("h2");
            h2.className = "products-related-header";
            h2.innerText = relatedHead;
            productsAlternative.insertAdjacentElement("beforebegin", h2);
            document.querySelector(".shp-tabs-holder ul.shp-tabs li a[href='#productsAlternative']").parentElement.remove();
        }
    }

    // Price measurement updates (specific product IDs for Carbon, RespiPro, etc.)
    if (document.querySelector(".type-detail")) {
        const productIds = [
            "8594190530475", "8594190530482", // Carbon
            "8595190533275", "8595190533312", "8595190532872", "8595190533718" // RespiPro/RespiRaptor
        ];

        productIds.forEach(id => {
            if (document.querySelector(`meta[content="${id}"]`)) {
                let vkrp_price_d = "", vkrp_price_var = "", vkrr_price_d = "", vkrr_price_var = "";

                if (lang === "cs") {
                    vkrp_price_d = "přibližně 1,3 Kč / hod.";
                    vkrp_price_var = "méně než 1,5Kč / hod.";
                    vkrr_price_d = "přibližně 1,1 Kč / hod.";
                    vkrr_price_var = "méně než 1,2 Kč / hod.";
                } else if (lang === "en") {
                    const currency = getShoptetDataLayer('currency');
                    if (currency === 'EUR') {
                        vkrp_price_d = "less than €0.06 / hr";
                        vkrp_price_var = "less than €0.06 / hr";
                        vkrr_price_d = "less than €0.04 / hr";
                        vkrr_price_var = "approxiamtely €0.05 / hr";
                    } else if (currency === 'USD') {
                        vkrp_price_d = "less than $0.07 / hr";
                        vkrp_price_var = "less than $0.07 / hr";
                        vkrr_price_d = "less than $0.05 / hr";
                        vkrr_price_var = "approxiamtely $0.05 / hr";
                    }
                } else if (lang === "de") {
                    vkrp_price_d = "ungefähr 0,05 € / Std.";
                    vkrp_price_var = "weniger als 0,06 €/Std.";
                    vkrr_price_d = "ungefähr 0,04 € / Std.";
                    vkrr_price_var = "weniger als 0,05 €/Std.";
                } else if (lang === "pl") {
                    vkrp_price_d = "mniej niż 0,24 zł / godz.";
                    vkrp_price_var = "około 0,25 zł / godz.";
                    vkrr_price_d = "mniej niż 0,23 zł / godz.";
                    vkrr_price_var = "mniej niż 0,24 zł / godz.";
                }

                const priceMes = `
                <span class="price-measure">
                    <span class="choose-variant default-variant">${vkrp_price_d}</span>
                </span>`;
                document.querySelector(".p-final-price-wrapper .price-measure").innerHTML = priceMes;
            }
        });
    }

    // Handle read more functionality
    const toggletxt = document.getElementById("toggletxt");
    if (toggletxt) {
        toggletxt.addEventListener("click", function () {
            if (toggletxt.textContent === "Read more...") {
                document.getElementById("hidetext").style.display = "block";
                toggletxt.style.display = "none";
            }
        });
    }

    // Handle scrolling to the rating tab if present in URL
    if (document.location.href.indexOf('#ratingTab') > -1) {
        document.querySelector(".star-list a").click();
    }

    // Resize event listener
    window.addEventListener("resize", sizeMsg);

    // Functions for specific actions (sizeMsg, rrsweather, cart_prod_vis, saleProdB, etc.)
    sizeMsg();
    rrsweather();
    cart_prod_vis();
    saleProdDetail();
    saleProdB();
    dorucime();
});

// Function to update site message size
function sizeMsg() {
    const siteCookies = document.querySelector(".siteCookies");
    if (siteCookies) {
        document.querySelector(".site-msg.information").id = "siteCSMTmsg";
        siteCookies.id = "siteCookies";
        const clientHeight = siteCookies.clientHeight;
        const heightMSG = `${clientHeight}px`;
        document.getElementById("site-msg-bttm").innerHTML = `:root{--site-msg-bttm:${heightMSG}}`;

        document.querySelector(".js-cookiesConsentSubmit").addEventListener("click", closeCSTM);
    }
}

// Function to close custom site message
function closeCSTM() {
    document.getElementById("site-msg-bttm").innerHTML = ":root{--site-msg-bttm: 0px}";
}

// Function for weather-based product/category labels
function rrsweather() {
    const lang = document.documentElement.lang;
    let summer = "(summer)", winter = "(winter)";
    
    if (lang === "cs") {
        summer = "(letní)";
        winter = "(zimní)";
    } else if (lang === "de") {
        summer = "(Sommer)";
        winter = "(Winter)";
    } else if (lang === "pl") {
        summer = "(letni)";
        winter = "(zimowy)";
    }

    document.querySelectorAll('.category-appendix, .product-appendix').forEach(elem => {
        if (elem.textContent.includes(winter)) {
            elem.classList.add("winter");
        }
        if (elem.textContent.includes(summer)) {
            elem.classList.add("summer");
        }
        elem.textContent = " ";
    });
}

// Function to handle sale product listings
function saleProdB() {
    document.querySelectorAll(".products-block .product").forEach(function (product) {
        if (!product.classList.contains("DMdone")) {
            const pTools = product.querySelector(".p-tools");
            const pDesc = product.querySelector(".p-desc");
            const prices = product.querySelector(".prices");
            const rating = product.querySelector(".ratings-wrapper");
            const stars = product.querySelector(".stars-wrapper");
            const starsPlaceholder = product.querySelector(".stars-placeholder");

            if (pTools && pDesc) pDesc.insertAdjacentElement("afterend", pTools);
            if (prices && rating) rating.prepend(prices);
            if (stars && rating) rating.append(stars);
            if (starsPlaceholder) starsPlaceholder.remove();

            const standardPrice = product.querySelector(".p .flag-discount .price-standard");
            if (standardPrice) {
                const standardPriceClone = standardPrice.cloneNode(true);
                prices.prepend(standardPriceClone);
                prices.classList.add("DM-sale");

                const percentSale = product.querySelector(".p .flag-discount .price-save").innerHTML;
                const flagsDefault = product.querySelector(".flags-default");

                if (flagsDefault) {
                    const flagPercent = `<span class="flag flag-percentagesale">${percentSale}</span>`;
                    flagsDefault.insertAdjacentHTML("beforeend", flagPercent);
                }
            }
            product.querySelector(".p").classList.add("DMdone");
        }
    });
}

// Function to handle sale product details
function saleProdDetail() {
    const priceSave = document.querySelector(".p-info-wrapper .price-save");
    if (priceSave) {
        const percentSale = priceSave.querySelector(".default-variant")?.textContent || priceSave.textContent.trim();
        const flagPercentage = `<span class="flag flag-percentagesale">(${percentSale})</span>`;
        
        if (document.querySelector(".product-top .flags-default") && !document.querySelector(".product-top .flags-default .flag-percentagesale")) {
            document.querySelector(".product-top .flags-default").insertAdjacentHTML("beforeend", flagPercentage);
        } else if (!document.querySelector(".product-top .flags-default")) {
            const flagWrap = `<div class="flags flags-default">${flagPercentage}</div>`;
            document.querySelector(".product-top .p-detail-info").insertAdjacentHTML("afterbegin", flagWrap);
        }

        priceSave.querySelectorAll("span").forEach(span => {
            span.textContent = `(${span.textContent.trim()})`;
        });
    }
}

// Function to handle related products visibility in cart
function cart_prod_vis() {
    const lang = document.documentElement.lang;
    if (lang === "cs") {
        document.querySelector(".cart-table .show-related").textContent = "Zákazníci k tomuto produktu kupují";
    }
    document.querySelector(".cart-table tbody tr.removeable:last-child").classList.add("related-visible");
    document.querySelector(".cart-table tr.related:last-child").classList.add("visible");

    document.querySelectorAll(".cart-related-product img").forEach(img => {
        img.src = img.dataset.src;
    });
}

// Function to update delivery message
function dorucime() {
    const lang = document.documentElement.lang;
    let defDelivery = "Doručení možné do", newDelivery = "Doručíme do";
    
    if (lang === "de") {
        defDelivery = "Lieferung bis";
        newDelivery = "Normale Lieferung";
    }

    if (lang === "cs" || lang === "de") {
        document.querySelectorAll('.delivery-time').forEach(elem => {
            elem.textContent = elem.textContent.replace(defDelivery, newDelivery);
        });

        document.querySelector(".delivery-time-label").textContent = `${newDelivery}:`;
    }
}
