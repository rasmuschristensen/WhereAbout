

$(document).on("pageinit", "#overviewPage", function () {
    
    /* Close the task list panel when a task i clicked */
    $(document).on("click", "#task-list", function (e) {
        $("#task-panel").panel("close");
    });

    /* When the tasklist is pulled down we add a hook to refresh its data */
    $(document).on("iscroll_onpulldown", ".iscroll-wrapper", function (event, data) {
        onPullDown(event, data);
    });    
});