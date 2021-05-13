let postSideFormat = "<li><a href=\"%url%\">%title%</a><span class=\"post-date\">%time%</span></li>";
let postList = {};

let postSizeRootPath = {
    "preJson": "./js/pages/preview-post.json",
    "postListJson": "./js/pages/post-list.json",
    "postJson": "./pages/jsons/"
};

function postSizeSetRootPath(preJson, postListJson, postJson) {
    postSizeRootPath.preJson = preJson;
    postSizeRootPath.postListJson = postListJson;
    postSizeRootPath.postJson = postJson;
}

let nowShowJson = {};
let nowShowJsonDataIndex = 0;
let postItemIndex = 0;

function generatePostSideStart() {
    let request = new XMLHttpRequest();
    request.open("get", postSizeRootPath.preJson);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            generatePostSide(JSON.parse(request.responseText));
        } else {

        }
    }
}

function generatePostListStart(blogId) {
    let request = new XMLHttpRequest();
    request.open("get", postSizeRootPath.postListJson);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            postList = JSON.parse(request.responseText);
            showPostJsonList(blogId);
        } else {

        }
    }
}

function generatePostSide(posts) {
    let postSide = document.getElementById("postSide");
    let str = "<ul>";
    for (let index in posts) {
        str += postSideFormat.replace("%url%", posts[index].url)
            .replace("%time%", posts[index].time)
            .replace("%title%", posts[index].title);
    }
    postSide.innerHTML = str + "</ul>";
}


function showPostJsonList(blogId) {
    let str = "<ul>";
    let list = postList.postJsonList;
    for (let index in list) {
        str += "<li><a onclick=\"selectPostJson("+ index + ", " + blogId + ");\">" + list[index].name + "</a></li>";
    }
    str += "</ul>";
    document.getElementById("postList").innerHTML = str;
}

function selectPostJson(nowShowIndex, blogId) {
    let request = new XMLHttpRequest();
    nowShowJsonDataIndex = nowShowIndex;
    request.open("get", postSizeRootPath.postJson + postList.postJsonList[nowShowIndex].link);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            nowShowJson = JSON.parse(request.responseText);
            postItemIndex = 0;
            showPostItem(blogId);
        } else {

        }
    }
}

function showPostItem(blogId) {
    let str = "<ul>";
    let showedItem = 0;
    let skipIndex = 0;

    for (let idIndex in nowShowJson) {
        str += postSideFormat.replace("%url%", "./post.html?" + postList.postJsonList[nowShowJsonDataIndex].arg + "=" + idIndex + "=" + blogId)
            .replace("%time%", nowShowJson[idIndex].postTime)
            .replace("%title%", nowShowJson[idIndex].postTitle);
        ++showedItem;
        ++postItemIndex;
    }
    str += "</ul>";
    document.getElementById("postList").innerHTML = str;
}

function resetList(blogId) {
    showPostJsonList(blogId);
}
