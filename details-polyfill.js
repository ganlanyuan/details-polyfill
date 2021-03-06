;(function () {
  var DETAILS = 'details';
  var SUMMARY = 'summary';

  var supported = checkSupport();
  if (supported) { return; }

  // Add a classname
  document.documentElement.className += ' no-details';
  window.addEventListener('click', clickHandler);

  // injectStyle('details-polyfill-style',
  //   'html.no-details ' + DETAILS + ':not([open]) > :not(' + SUMMARY + ') { display: none; }\n' +
  //   'html.no-details ' + DETAILS + ' > ' + SUMMARY + ':before { content: "\u25b6"; display: inline-block; font-size: .8em; width: 1.5em; }\n' +
  //   'html.no-details ' + DETAILS + '[open] > ' + SUMMARY + ':before { content: "\u25bc"; }');

  
  // Click handler for `<summary>` tags 
  function clickHandler (e) {
    var target = lookupByType(e.target, SUMMARY, ['body', 'html', DETAILS]);
    if (target) {
      var details = target.parentNode;
      if (!details) { return; }

      if (details.getAttribute('open')) {
        details.open = false;
        details.removeAttribute('open');
      } else {
        details.open = true;
        details.setAttribute('open', 'open');
      }
    }
  }

  function lookupByType (el, target_name, arr) {
    if (!arr.length) { arr.push('body'); }
    var name = el.nodeName.toLowerCase();
    if (arr.indexOf(name) >= 0) { return null; }
    return name !== target_name ? lookupByType(el.parentNode, target_name, arr) : el;
  }

  // Checks for support for `<details>` 
  function checkSupport () {
    var el = document.createElement(DETAILS);
    if (!('open' in el)) { return false; }

    el.innerHTML = '<' + SUMMARY + '>a</' + SUMMARY + '>b';
    document.body.appendChild(el);

    var diff = el.offsetHeight;
    el.open = true;
    var result = (diff != el.offsetHeight);

    document.body.removeChild(el);
    return result;
  }

  // Injects styles (idempotent) 
  // function injectStyle (id, style) {
  //   if (document.getElementById(id)) return

  //   var el = document.createElement('style')
  //   el.id = id
  //   el.innerHTML = style

  //   document.getElementsByTagName('head')[0].appendChild(el)
  // }
})();