if ($('html[lang="cs"]').length) {
    var dp_Header = "Rychlý nákup";//Nadpis
    var dp_Dostupne = "Skladem;Předobjednávka";//kdyz se dostupnost rovna tomuto tak to bude v dostupnych polozkach , vice moznosti oddělit středníkem
    var url_kosik = "/kosik/"; //URL kosiku kam se přesměruje po vlozeni neceho do kosiku
}

/*
if ($('html[lang="en"]').length) {
    var dp_Header = "Zrychlený nákup";//Nadpis
    var dp_Dostupne = "Available";//kdyz se dostupnost rovna tomuto tak to bude v dostupnych polozkach , vice moznosti oddělit středníkem
    var url_kosik = "/cart/"; //URL kosiku kam se přesměruje po vlozeni neceho do kosiku
}

if ($('html[lang="de"]').length) {
    var dp_Header = "Zrychlený nákup";//Nadpis
    var dp_Dostupne = "Auf Lager";//kdyz se dostupnost rovna tomuto tak to bude v dostupnych polozkach , vice moznosti oddělit středníkem
    var url_kosik = "/warenkorb/"; //URL kosiku kam se přesměruje po vlozeni neceho do kosiku
}

if ($('html[lang="pl"]').length) {
    var dp_Header = "Zrychlený nákup";//Nadpis
    var dp_Dostupne = "Dostępny";//kdyz se dostupnost rovna tomuto tak to bude v dostupnych polozkach , vice moznosti oddělit středníkem
    var url_kosik = "/koszyk/"; //URL kosiku kam se přesměruje po vlozeni neceho do kosiku
}
*/

var dp_URL = window.location.origin + "/dominikp1.xml";

function failedAdd () {
    showMessage(shoptet.messages["unavailableVariant"], "error", "", false, false);
}

dp_START();
function dp_START()
{
    var jedem = true;
    var datx = localStorage.dominikpRNdate;
    if ((datx != null) && (datx != undefined) && (datx.length > 10))
    {
        var dat = new Date(parseInt(datx, 10));
        var ted = new Date();
        var diffX = ted.getTime() - dat.getTime();
        var diff = Math.round(diffX / 60000);
        if (diff <= 5)
        {
            jedem = false;
            console.log("already downloaded " + diff + " min ago");
        }
    }
    if (jedem) {
        console.log("download fresh data");
        var request = new XMLHttpRequest();
        request.open("GET", dp_URL, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    var XML = request.responseXML;
                    dp_saveXML(XML);
                }
            }
        }
        request.send();
    }
    else { dp_ACTION();}
}
function dp_ACTION()
{
    var products = document.getElementsByClassName("product");
    for (var i = 0; i <= products.length - 1; i++) {
        var product = products[i];
        var a = product.getElementsByTagName("a")[0];
        if (a != null) {
            if (product.getElementsByClassName("quickbuy")[0] == null) {
                var div = document.createElement("div");
                div.id = "show-variants";

                var span = document.createElement("span"); span.setAttribute("class", "quickbuy"); span.innerText = dp_Header; div.appendChild(span);

                var href = a.href;
                var variants = dp_get_Variants(href);

                var spl = variants.split('¬');
                for (var m = 0; m <= 1; m++)
                {
                    for (var o = 0; o <= spl.length - 1; o++) {
                        var spl2 = spl[o].split('`');
                        var a = document.createElement("a");
                        a.innerText = spl2[1];
                        a.id = "dp_" + spl2[0];
                        a.onclick = function () { dp_Order(this); };
                        a.setAttribute("data-micro-product-id", product.getElementsByTagName("div")[0].getAttribute("data-micro-product-id"));
                        a.setAttribute("data-micro-variant-id", spl2[0]);
                        var dostupnosti = dp_Dostupne.split(';');
                        var dostupne = false;
                        for (var e = 0; e <= dostupnosti.length - 1; e++) {
                            if (dostupnosti[e] == spl2[2]) { dostupne = true; break; }
                        }
                        if (dostupne) {
                            if (m == 0) {
                                var span_dostupne = document.createElement("span"); span_dostupne.setAttribute("class", "variant"); div.appendChild(span_dostupne);
                                span_dostupne.appendChild(a);
                            } else { a.remove();}
                        }
                        else {
                            if (m == 1)
                            {
                                var span_nedostupne = document.createElement("span"); span_nedostupne.setAttribute("class", "variant outofstock"); span_nedostupne.setAttribute("onClick", "failedAdd()"); div.appendChild(span_nedostupne);
                                span_nedostupne.innerText = spl2[1];
                                span_nedostupne.id = "dp_" + spl2[0];                               
                            }
                            a.remove();
                        }
                    }
                }
               
                if (spl != "") {
                    var pDesc = product.getElementsByClassName("p-desc")[0];
                    pDesc.parentElement.insertBefore(div, pDesc);
                    console.log("Quickbuy Product updated");
                }
            }
        }
    }

    if (products.length > 0) { setTimeout(function () { dp_ACTION(); }, 200);}    
}


function dp_Order(ele) {
    // Retrieve the CSRF token from the hidden input field
    var csrfToken = document.querySelector('input[name="__csrf__"]').value;

    var http = new XMLHttpRequest();
    http.open("POST", "/action/Cart/addCartItem/?simple_ajax_cart=1", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Include the CSRF token in the request parameters
    var params = "productId=" + ele.getAttribute("data-micro-product-id") + 
                 "&priceId=" + ele.getAttribute("data-micro-variant-id") + 
                 "&amount=1" + 
                 "&__csrf__=" + encodeURIComponent(csrfToken);  // Encode the token to ensure it is safely transmitted

    http.send(params);
    http.onload = function() {
        if (http.status >= 200 && http.status < 300) {
            // Redirect or handle successful cart addition
            window.location.href = url_kosik;
        } else {
            // Log or handle errors
            console.error("Failed to add item: ", http.status, http.responseText);
        }
    }
}


function dp_get_Variants(href)
{
    var variants = "";
    var rows = localStorage.dominikpRNitems.split('¬');
    for (var i = 0; i <= rows.length - 1; i++)
    {
        var row = rows[i];
        var spl = row.split('`');
        if (href == spl[1])
        {
            if (variants == "") { variants = spl[2] + "`" + spl[3] + "`" + spl[4] ; }
            else { variants = variants + "¬" + spl[2] + "`" + spl[3] + "`" + spl[4]; }
        }
    }
    return variants;
}
function dp_saveXML(XML)
{
    var data = "";
    var SHOPITEMS = XML.getElementsByTagName("SHOPITEM");
    for (var i = 0; i <= SHOPITEMS.length - 1; i++)
    {
        var SHOPITEM = SHOPITEMS[i];
        var CODE = SHOPITEM.getElementsByTagName("CODE")[0].innerHTML.trim();
        var URL = SHOPITEM.getElementsByTagName("URL")[0].innerHTML.trim();
        var NAME = SHOPITEM.getElementsByTagName("NAME")[0].innerHTML.trim();
        var AVAILABILITY = SHOPITEM.getElementsByTagName("AVAILABILITY")[0].innerHTML.trim();
      
        if (URL.toLowerCase().includes("?variantid="))
        {
            var spl = URL.replace("?variantId=","`").split('`')
            if (data == "") { data = CODE + "`" + spl[0] + "`" + spl[1] + "`" + NAME + "`" + AVAILABILITY; }
            else { data = data + "¬" + CODE + "`" + spl[0] + "`" + spl[1] + "`" + NAME + "`" + AVAILABILITY; }
        }        
    }
    localStorage.dominikpRNitems = data;

    var dat = new Date();
    localStorage.dominikpRNdate = '' + dat.getTime();
    dp_ACTION();
}
