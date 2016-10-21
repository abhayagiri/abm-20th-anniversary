// http://stackoverflow.com/a/11099306

function requireJs(file, callback) {
  callback = callback || function () {};
  var filenode = document.createElement('script');
  filenode.src = file;
  // IE
  filenode.onreadystatechange = function () {
    if (filenode.readyState === 'loaded' || filenode.readyState === 'complete') {
        filenode.onreadystatechange = null;
        callback();
    }
  };
  // others
  filenode.onload = callback;
  document.head.appendChild(filenode);
}

function requireCss(file, callback) {
  callback = callback || function () {};
  filenode = document.createElement('link');
  filenode.rel = 'stylesheet';
  filenode.type = 'text/css';
  filenode.href = file;
  document.head.appendChild(filenode);
  callback();
}
