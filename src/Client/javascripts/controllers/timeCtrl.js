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
        $http.get('/Time/Tasks').success(function (data) {
            $scope.tasks = data;
        });
    };
    
    $scope.startClock = function () {        
        var now = Date.now();
        var cur = amplify.store.localStorage("current");

        //we have a start entry we need to stop
        if (cur != null && cur.key != null) {

            //get the entry
            var lookup = 'start_' + cur.key;
            var entry = amplify.store.localStorage(lookup);
            //update stoptime and save it back
            entry.stop = now;
            amplify.store.localStorage(lookup, entry);
        }

        //We have a new current entry
        amplify.store.localStorage("current",
                                { key: now });

        var task;
        if ($scope.selectedTask == null) {
            $scope.selectedTask = new Task("unnamed task", -1);
        }
        //And a new startentry
        amplify.store.localStorage('start_' + now,
                                { start: now, stop: "", notes: "", task: $scope.selectedTask });
        startTimer();
    };
    
    $scope.stopClock = function () {
        $timeout.cancel(timerProm);
        
        var now = Date.now();
        var cur = amplify.store.localStorage("current");

        //we have a start entry we need to stop
        if (cur != null && cur.key != null) {

            //get the entry
            var lookup = 'start_' + cur.key;
            var entry = amplify.store.localStorage(lookup);
            //update stoptime and save it back
            entry.stop = now;
            amplify.store.localStorage(lookup, entry);
            
            //We have a new current entry
            amplify.store.localStorage("current",
                                    { key: null });

            $scope.duration = '00:00:00';
        }
        
        //read all registrations This is not an array but an object!!!
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
            x + (Date(item.stop) - Date(item.start))
        }, 0);

        var total = momentum.duration(totalTime, 'milliseconds');
        console.log(total.seconds());
    };
    
    function Task(name, id) {
        this.Name = name;
        this.Id = id;
        this.Description = "";
    }

    function startTimer() {
        timerProm = $timeout(updateTimer, 1000);
        current = amplify.store.localStorage("current");
    }
    
    function updateTimer() {
        var timeElapsed = Date.now() - current.key;

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