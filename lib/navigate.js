var detect = require('./detect');
var history = window.history

module.exports = function triggerUrl(url, silent, replace) {
    if (detect.hasHashbang()) {
        window.location.hash = '#!' + url;
    } else if (detect.hasPushState) {
        replace = replace && typeof(history.replaceState) == "function"
        
        history[replace ? "replaceState" : "pushState"]({}, '', url);

        if (!silent) {
          var e;

          if(typeof(window.Event) == 'function') {
            e = new window.Event('popstate')
          } else {
            e = document.createEvent("Event")
            e.initEvent("popstate",true,true);
          }

          window.dispatchEvent(e)
        }
    } else {
        console.error("Browser does not support pushState, and hash is missing a hashbang prefix!");
    }
};
