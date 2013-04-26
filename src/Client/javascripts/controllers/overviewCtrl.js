function OverviewCtrl($scope) {
    $scope.TotalTime = function () {

        var day = new Day(new Date());        
        var registrationDay = amplify.store.localStorage(day.Id);

        var mils = _.map(registrationDay.Registrations, function (reg) {
            return new Date(reg.Stop).getTime() - new Date(reg.Start).getTime();
        });

        var totalTime = _.reduce(mils, function (memo, it) {
            return memo + it;
        }, 0);


        var hours = moment.duration(totalTime, 'milliseconds').hours();
        var minutes = moment.duration(totalTime, 'milliseconds').minutes();
        var seconds = moment.duration(totalTime, 'milliseconds').seconds();

        var lineArgs = new Array();


        if (hours > 0) {
            lineArgs.push(hours > 1 ? hours + " hours" : hours + " hour");

        }

        if (minutes > 0) {
            lineArgs.push(minutes > 1 ? minutes + " mins" : minutes + " min");

        }

        if (seconds > 0) {
            lineArgs.push(seconds > 1 ? seconds + " sec" : seconds + " sec");
        }

        return toLine(lineArgs);
        

    };

    $scope.TotalDistance = function() {
        return 0;
    };
    
    $scope.TotalReceipts = function () {
        return 0;
    };
    

    
    function toLine(args) {
        if (args.length == 1)
            return args[0];

        if (args.length == 2)
            return args[0] + ' and ' + args[1];

        return args[0] + ', ' + args[1] + ' and ' + args[2];
    }
};