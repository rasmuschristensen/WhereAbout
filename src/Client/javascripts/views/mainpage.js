
var t;
function onPullDown(event, data) {

    setTimeout(function gotPullDownData() {
        data.iscrollview.refresh();
    }, 1500);
}
    

$(document).on("pageinit", "#mainPage", function () {

       

    /* Open settings or tasklist panel depending on the swipe direction */
    $(document).on("swipeleft swiperight", "#mainPage", function (e) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swipeleft") {
                $("#task-panel").panel("open");
            } else if (e.type === "swiperight") {
                $("#setting-panel").panel("open");
            }
        }
    });

    /* Close the task list panel when a task i clicked */
    $(document).on("click", "#task-list", function (e) {
        $("#task-panel").panel("close");
    });

    /* When the tasklist is pulled down we add a hook to refresh its data */
    $(document).on("iscroll_onpulldown", ".iscroll-wrapper", function (event, data) {
        onPullDown(event, data);
    });
});