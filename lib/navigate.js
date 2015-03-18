var detect = require('./detect');

module.exports = function triggerUrl(url, silent) {
    if (detect.hasHashbang()) {
        window.location.hash = '#!' + url;
    } else if (detect.hasPushState) {
        window.history.pushState({}, '', url);

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
