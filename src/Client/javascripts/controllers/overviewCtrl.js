function OverviewCtrl($scope) {
    $scope.TotalTime = function () {

        var day = new Day(new Date());
        //read all registrations This is not an array but an object!!!
        var registrationDay = amplify.store.localStorage(day.Id);

        var mils = _.map(registrationDay.Registrations, function (reg) {
            return new Date(reg.Stop).getTime() - new Date(reg.Start).getTime();
        });

        var totalTime = _.reduce(mils, function (memo, it) {
            return memo + it;
        }, 0);

        return totalTime / 1000;        
    };
};