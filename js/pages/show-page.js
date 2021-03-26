
//args format ?<json-name>#<id>
function onPageLoad(){
    let url = window.location.search;
    if (url.indexOf("?") > -1) {
        let datas = url.substr(1).split("=");
        loadPage(datas[0] + ".json", datas[1]);
    } else {
        window.location.href = "./page404.html";
    }
}


//配置取读成功, 开始加载页面
function initMarkdown(){
    let rendererMD = new marked.Renderer();
    marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: true
    });
    marked.setOptions({
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
}

//取读页面信息
function loadPage(jsonName, id) {
    let url = "./pages/jsons/" + jsonName;
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            try {
                initMarkdown();
                modifyHtmlPage(JSON.parse(request.responseText)[id]);
            } catch (e) {
                window.location.href = "./page404.html";
                console.log(e);
            }
        } else {
            window.location.href = "./page404.html";
        }
    }
}

function modifyHtmlPage(pageData) {
    document.getElementById("title").innerHTML = pageData.title + "- miSkYle's Blog";
    document.getElementById("postTime1").innerHTML = pageData.postTime;
    document.getElementById("postTime2").innerHTML = pageData.postTime;
    document.getElementById("postTitle").innerHTML = pageData.postTitle;
    document.getElementById("postAuthor").innerHTML = pageData.postAuthor;
    showMarkdown(pageData.postContent);
}

function showMarkdown(fileName){
    let url = "./pages/" + fileName;
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        // 返回状态为200，即为数据获取成功
        if (request.status == 200) {
            document.getElementById('postContent').innerHTML = marked(request.responseText);
        }
    }
}
