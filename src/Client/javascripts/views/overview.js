function OverviewCtrl($scope) {
    $scope.TotalTime = function () {
        
        //read all registrations
        var registrations = amplify.store();
        
        //get all registrations for today only.
        //first remove current entry
        registrations.shift();
        
        //second find all registrations for today
        var today = Date();        
        var todaysRegistrations = _.filter(registrations, function (registration) {
            return Date(registration.start).month == today.month &&
                Date(registration.start).getDay == today.day;
        });


        var totalTime = _.reduce(todaysRegistrations, function (x, item) {
            x + (Date(item.stop) - Date(item.start))}, 0);

        var total = momentum.duration(totalTime, 'milliseconds');
        return total.seconds();
    };
};