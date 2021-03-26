let postSideFormat = "<li><a href=\"%url%\">%title%</a><span class=\"post-date\">%time%</span></li>";
let postList = {
    "postJsonList": [
        {
            "name": "name",
            "link": "link",
            "arg": "arg"
        }
    ],
    "maxItem": 5
};

let nowShowJson = {};
let nowShowJsonDataIndex = 0;
let postItemIndex = 0;

function generatePostSideStart() {
    let request = new XMLHttpRequest();
    request.open("get", "./js/pages/preview-post.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            generatePostSide(JSON.parse(request.responseText));
        } else {

        }
    }
}

function generatePostListStart() {
    let request = new XMLHttpRequest();
    request.open("get", "./js/pages/post-list.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            postList = JSON.parse(request.responseText);
            showPostJsonList();
        } else {

        }
    }
}

function generatePostSide(posts) {
    let postSide = document.getElementById("postSide");
    let str = "<ul>";
    for (let index in posts) {
        str += postSideFormat.replaceAll("%url%", posts[index].url)
            .replaceAll("%time%", posts[index].time)
            .replaceAll("%title%", posts[index].title);
    }
    postSide.innerHTML = str + "</ul>";
}


function showPostJsonList() {
    let str = "<ul>";
    let list = postList.postJsonList;
    for (let index in list) {
        str += "<li><a onclick=\"selectPostJson("+ index + ");\">" + list[index].name + "</a></li>";
    }
    str += "</ul>";
    document.getElementById("postList").innerHTML = str;
}

function selectPostJson(nowShowIndex) {
    let request = new XMLHttpRequest();
    nowShowJsonDataIndex = nowShowIndex;
    request.open("get", postList.postJsonList[nowShowIndex].link);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            nowShowJson = JSON.parse(request.responseText);
            postItemIndex = 0;
            showPostItem();
        } else {

        }
    }
}

function showPostItem() {
    let str = "<ul>";
    let showedItem = 0;
    let skipIndex = 0;

    for (let idIndex in nowShowJson) {
        str += postSideFormat.replaceAll("%url%", "./post.html?" + postList.postJsonList[nowShowJsonDataIndex].arg + "=" + idIndex)
            .replaceAll("%time%", nowShowJson[idIndex].postTime)
            .replaceAll("%title%", nowShowJson[idIndex].postTitle);
        ++showedItem;
        ++postItemIndex;
    }
    str += "</ul>";
    document.getElementById("postList").innerHTML = str;
}

function resetList() {
    showPostJsonList();
}
