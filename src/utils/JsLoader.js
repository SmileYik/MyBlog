import {Fragment} from "react";

export default function LoadAllJs() {
  setTimeout(function () {
    loadJsByUrl("./common/js/global.js");
    loadJsByUrl("./common/js/navigation.js");
  }, 1000);
  return <Fragment/>
}

// function loadJsByContent(script) {
//   const s = document.createElement("script");
//   s.innerText = script;//"initGlobal(jQuery);initMainNavigation(jQuery); "
//   document.body.appendChild(s);
// }

function loadJsByUrl(url) {
  const s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}
