let insertEntrypointsHere;

function loadScript(src, done) {
  if (src.indexOf(".css") !== -1) {
    done();
    return;
  }

  console.log("[sc] loadScript", src);
  var js = document.createElement("script");
  js.src = src;
  js.onload = function () {
    done();
  };
  js.onerror = function () {
    done(new Error("Failed to load script " + src));
  };
  document.head.appendChild(js);
}

function loadScripts(scripts) {
  if (!scripts || scripts.length === 0) return;
  var index = 0;
  function onScriptLoaded() {
    index = index + 1;
    if (scripts[index]) loadScript(scripts[index], onScriptLoaded);
  }
  loadScript(scripts[index], onScriptLoaded);
}

function browserSupportsAllFeatures() {
  return window.Promise && window.fetch && window.Symbol && Object.entries;
}

if (browserSupportsAllFeatures()) loadScripts(window.__APP_MODERN_ENTRYPOINTS__);
else loadScripts(window.__APP_LEGACY_ENTRYPOINTS__);

function addSt(src) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = src;
  document.head.appendChild(link);
}

function includeAllCss() {
  window.__APP_MODERN_ENTRYPOINTS__.filter((src) => src.indexOf(".css") !== -1).forEach((src) => addSt(src));
}

if (document.readyState === "complete") includeAllCss();
document.addEventListener("readystatechange", () => {
  includeAllCss();
});
