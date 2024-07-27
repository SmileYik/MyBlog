import {Fragment} from "react";

export default function LoadAllJs() {
  loadJs();
  setTimeout(() => loadJs(), 165);
  setTimeout(() => loadJs(), 265);
  setTimeout(() => loadJs(), 1000);
  return <Fragment/>
}

// function loadJsByContent(script) {
//   const s = document.createElement("script");
//   s.innerText = script;//"initGlobal(jQuery);initMainNavigation(jQuery); "
//   document.body.appendChild(s);
// }

function loadJs() {
  loadJsByUrl("./common/js/global.js");
  loadJsByUrl("./common/js/navigation.js");
}

function loadJsByUrl(url) {
  const s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}
