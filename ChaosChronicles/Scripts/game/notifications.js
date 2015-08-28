var Notifications = {};
$(function () {
    //monitor if the browser tab is active or not
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
        // IE 9 and lower:
    else if ("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
        // All others:
    else
        window.onpageshow = window.onpagehide
        = window.onfocus = window.onblur = onchange;

    function onchange(evt) {
        var v = "visible", h = "hidden",
            evtMap = {
                focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
            };

        evt = evt || window.event;
        if (evt.type in evtMap)
            document.body.className = evtMap[evt.type];
        else
            document.body.className = this[hidden] ? "hidden" : "visible";

        if (document.body.className == 'visible') {
            Notifications.PageTitleNotification.Off();
        }
    }

    // set the initial state (but only if browser supports the Page Visibility API)
    if (document[hidden] !== undefined)
        onchange({ type: document[hidden] ? "blur" : "focus" });
});

Notifications.PageTitleNotification = {
    Vars: {
        OriginalTitle: document.title,
        Interval: null
    },
    On: function (notification, intervalSpeed) {
        if (document.body.className != 'visible') {
            var _this = this;
            _this.Vars.Interval = setInterval(function () {
                document.title = (_this.Vars.OriginalTitle == document.title)
                                    ? notification
                                    : _this.Vars.OriginalTitle;
            }, (intervalSpeed) ? intervalSpeed : 1000);
        }
    },
    Off: function () {
        clearInterval(this.Vars.Interval);
        document.title = this.Vars.OriginalTitle;
    }
}