let showPageRootPath = {
    "json": "./pages/jsons/",
    "markdown": "./pages/"
};

let blogId = {
    "1": {
        "json": "./pages/Notes/jsons/",
        "markdown": "./pages/Notes/"
    },
    "2": {
        "json": "./pages/Reading/jsons/",
        "markdown": "./pages/Reading/"
    }
}

let nowShowBlogId = 0;
let scrollToId = "";

//args format ?<json-name>=<id>=<blog id>#
function onPageLoad(){
    let url = window.location.search;
    scrollToId = window.location.hash;
    if (url.indexOf("?") > -1) {
        let datas = url.substr(1).split("=");
        if (blogId[datas[2]] == null) {
            window.location.href = "./page404.html";
            return;
        }
        nowShowBlogId = datas[2];
        showPageRootPath = blogId[datas[2]];
        loadPage(datas[0] + ".json", datas[1], datas[0]);
    } else {
        window.location.href = "./page404.html"
    }
}

function getBlogId() {
    return nowShowBlogId;
}
let markdownHeadCount = 0;
//配置取读成功, 开始加载页面
function initMarkdown(){
    let rendererMD = new marked.Renderer();
    rendererMD.heading  = function (text, level) {
        let id = encodeURIComponent(text);
        return '<h' + level + " id='" + id + "'>" +
            "<a href='#" + id + "' style='text-decoration:none;'>" + text + "</a></h" + level + ">";
    }
    marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
}

//取读页面信息
function loadPage(jsonName, id, jsonId) {
    let url = showPageRootPath.json + jsonName;
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            try {
                initMarkdown();
                let datas = JSON.parse(request.responseText);
                let prePageDataId = null;
                let nextPageDataId = null;

                let pre = null;
                let flag = false;
                for (let index in datas) {
                    if (flag) {
                        nextPageDataId = index;
                        break;
                    }
                    if (index === id) {
                        flag = true;
                        prePageDataId = pre;
                    } else {
                        pre = index;
                    }
                }

                modifyHtmlPage(datas[id], datas, jsonId, prePageDataId, nextPageDataId);
            } catch (e) {
                window.location.href = "./page404.html";
                console.log(e);
            }
        } else {
            window.location.href = "./page404.html";
        }
    }
}

function modifyHtmlPage(pageData, pageDatas, jsonId, prePageDataId, nextPageDataId) {
    document.getElementById("title").innerHTML = pageData.title + " - miSkYle's Blog";
    document.getElementById("postTime1").innerHTML = pageData.createTime;
    document.getElementById("postTime2").innerHTML = pageData.postTime;
    document.getElementById("postTitle").innerHTML = pageData.postTitle;
    document.getElementById("postAuthor").innerHTML = pageData.postAuthor;
    if (prePageDataId != null) {
        $(".nav-previous").attr("hidden", false);
        $("#navPrevLink").attr("href", "./post.html?" + jsonId + "=" + prePageDataId + "=" + nowShowBlogId);
        $("#navPrevTitle").text(pageDatas[prePageDataId].postTitle);
    }
    if (nextPageDataId != null) {
        $(".nav-next").attr("hidden", false);
        $("#navNextLink").attr("href", "./post.html?" + jsonId + "=" + nextPageDataId + "=" + nowShowBlogId);
        $("#navNextTitle").text(pageDatas[nextPageDataId].postTitle);
    }
    showMarkdown(pageData.postContent);
}

function showMarkdown(fileName){
    let url = showPageRootPath.markdown + fileName;
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        // 返回状态为200，即为数据获取成功
        if (request.status === 200) {
            document.getElementById('postContent').innerHTML = marked(request.responseText);
            MathJax.startup.defaultReady();
            setTimeout("scrollToIdFunction()",500);
        }
    }
}

function scrollToIdFunction() {
    window.location.hash = scrollToId;
    console.log(scrollToId);
}
