function jsonp(url, jsonpCallback, success) {
  let script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.type = "text/javascript";
  window[jsonpCallback] = function(data) {
    success && success(data);
  };
  document.body.appendChild(script);
}
// promise版
function loadScript (url, attrs = {}) {
  return new Promise((resolve, reject) => {
    if (!url) {
      return resolve('empty');
    }
    let oHead = document.getElementsByTagName('head')[0];
    let oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    Object.keys(attrs).forEach(key => {
      oScript.setAttribute(key, attrs[key]);
    });
    oScript.onload = oScript.onerror = function (e) {
      resolve(e);
      this.onload = null;
      this.onerror = null;
      // setTimeout(function () {
      //     oScript.parentNode.removeChild(oScript);
      // }, 100);
    };
    oScript.src = url;
    oHead.appendChild(oScript);
  });
}

jsonp(
  "http://xxx",
  "callback",
  function(value) {
    console.log(value);
  }
);
