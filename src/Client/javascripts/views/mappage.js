﻿

$(document).on("pageshow", "#mapPage", function () {    

        
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        
        google.maps.event.trigger(map, 'resize');

    
});

