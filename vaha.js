
(function () {
    "use strict";
    $(document).ready(function () {
        if ($(".show-tooltip.tooltip-icon") !== null) {
            $(".show-tooltip.tooltip-icon").mouseenter().mouseleave();
            setTimeout(function () {
                var tipText = $(".tooltip-content").text();
                var subStr = tipText.match("Váha zásilky: (.*) kg");
                console.log("subStr = " + subStr[1]);
                $(".small-block-grid-1.medium-block-grid-4.large-block-grid-4.overview-detail.block-grid")
                    .eq(1)
                    .append("<li><label for='Vaha-zbozi' class='small-15 medium-12 large-9'>Váha zboží: " + subStr[1] + "kg</label></li>");
            }, 10);
        }

        $(".std-table-listing td:contains('R-shield +')").addClass("case")
        $(".std-table-listing td:contains('R-shield Light +')").addClass("case")

        $(".std-table-listing td:contains('R-shield Light')").addClass("light")
        $(".std-table-listing td:not(.light):contains('R-shield')").addClass("winter")

        $("<div class='case-info'>+ POUZDRO</div>").prependTo(".case")
        $("<div class='rrs-winter'>ZIMNÍ</div>").prependTo(".winter")
        $("<div class='rrs-light'>LETNÍ</div>").prependTo(".light")

        var stylesheetRRS = '\
            <style>\
            .case, .case .blue {\
                /*color: #db1b4e!important;*/\
                font - weight: 550; \
            }\
            .rrs-winter, .rrs-light, .case-info {\
                font-weight: 550;\
                font-size: 16px;\
                line-height: normal;\
            }\
            div.table-holder > table > tbody > tr > td:nth-child(6) {\
                font-size: 16px;\
                font-weight: 550;\
            }\
        </style>\
        ';
        $(stylesheetRRS).appendTo("html")

    });
})();

