function TimeCtrl($scope, $timeout, $http) {
    
    var timerProm = null;
    //Find out if we have a current time, and if so start the display
    var current = amplify.store.localStorage("current");

    if (current != null && current.key != null) {
        startTimer();
    }    

    $scope.selectTask = function (task) {
        $scope.selectedTask = task;        
    };                

    $scope.getSelectedTask = function () {        
        return $scope.selectedTask.Name;
    };
    
    $scope.duration = '00:00:00';

    $scope.getDuration = function() {
        return $scope.duration;
    };

    $scope.initTask = function() {
        //$http.get('/Time/Tasks').success(function (data) {
        //    $scope.tasks = data;
        //});
    };
    
    $scope.startClock = function () {        
        var now = new Date();        
        current = amplify.store.localStorage("current");

        //we have a start entry we need to stop
        if (current != null) {            
            //update stoptime and save it back
            current.Stop = now;
            //get the day to persist this registration in
            var registrationDay = amplify.store.localStorage(current.Key);
            registrationDay.Registrations.push(current);
            amplify.store.localStorage(current.Key, registrationDay);
        }

        //We have a new current entry        
        var registration = new Registration(now);
        amplify.store.localStorage("current", registration);
        //add day if it does not exists
        var day = amplify.store.localStorage(registration.Key);
        if (day == null) {
            day = new Day(now);
            amplify.store.localStorage(registration.Key, day);
        }


        //if ($scope.selectedTask == null) {
        //    $scope.selectedTask = new Task("unnamed task", -1);
        //}
        //And a new startentry
        //amplify.store.localStorage('start_' + now,
        //                        { start: now, stop: "", notes: "", task: $scope.selectedTask });
        startTimer();
    };
    
    $scope.stopClock = function () {
        $timeout.cancel(timerProm);
        
        var now = Date.now();
        var currentRegistration = amplify.store.localStorage("current");

        //we have a start entry we need to stop
        if (currentRegistration != null) {

            //get the entry
            
            //update stoptime and save it back
            currentRegistration.Stop = now;
            var day = amplify.store.localStorage(currentRegistration.Key);
            day.Registrations.push(currentRegistration);
            amplify.store.localStorage(currentRegistration.Key, day);
                                    
            $scope.duration = '00:00:00';

            amplify.store.localStorage("current", null);                        
        }                        
    };        

    function startTimer() {
        timerProm = $timeout(updateTimer, 1000);
        current = amplify.store.localStorage("current");
    }
    
    function updateTimer() {
        
        var timeElapsed = Date.now() - new Date( current.Start);

        var hours = moment.duration(timeElapsed, 'milliseconds').hours();
        var minutes = moment.duration(timeElapsed, 'milliseconds').minutes();
        var seconds = moment.duration(timeElapsed, 'milliseconds').seconds();        

        var lineArgs = new Array();
        

        if (hours > 0) {
            lineArgs.push( hours > 1 ? hours + " hours" : hours + " hour");
            
        }
        
        if (minutes > 0) {
            lineArgs.push( minutes > 1 ? minutes + " mins" : minutes + " min");
            
        }
        
        if(seconds > 0) {
            lineArgs.push( seconds > 1 ? seconds + " sec" : seconds + " sec");
        }

        $scope.duration = toLine(lineArgs);
        
        timerProm = $timeout(updateTimer, 1000);
    }


    function toLine(args) {
        if (args.length == 1)
            return args[0];

        if (args.length == 2)
            return args[0] + ' and ' + args[1];

        return args[0] + ', ' + args[1] + ' and ' + args[2];
    }
    
}