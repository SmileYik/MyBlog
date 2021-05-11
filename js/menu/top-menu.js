topMenuLoad("./js/menu/jsons/top-menu.json");

function topMenuLoad(url) {
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            topMenuShow(JSON.parse(request.responseText));
        } else {

        }
    }
}

function topMenuShow(menu) {
    let elem = document.getElementById("top-menu");
    let str = "";
    for (let id in menu) {
        str += "<li id=\"menu-item-" + id + "\" class=\"" + menu[id].clazz + "\"> <a href=\"" + menu[id].href + "\">" + menu[id].name + "</a></li>";
    }
    elem.innerHTML = str;
}