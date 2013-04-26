

$(document).on("pageinit", "#overviewPage", function () {
    
    /* Open settings or tasklist panel depending on the swipe direction */
    $(document).on("swipeleft swiperight", "#overviewPage", function (e) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
                    
               $.mobile.changePage("#mapPage", { transition: "fade" });            
        
    });
});