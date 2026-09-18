(function (g) {
  let deferred = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e;
    const bar = document.getElementById("install-banner");
    if (bar) bar.classList.remove("hidden");
  });
  g.InstallService = {
    prompt() {
      if (deferred) {
        deferred.prompt();
        deferred.userChoice.finally(() => {
          deferred = null;
          const bar = document.getElementById("install-banner");
          if (bar) bar.classList.add("hidden");
        });
      } else {
        const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
        alert(ios
          ? "On iPhone/iPad: tap Share, then Add to Home Screen."
          : "Use your browser menu: Install app or Add to Home Screen. If the prompt is unavailable, the app still works in the browser.");
      }
    }
  };
})(window);
