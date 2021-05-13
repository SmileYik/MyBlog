let previewPostFormat = "<article><header class=\"entry-header\"><div class=\"entry-meta\"><span>发布于 </span><a href=\"%url%\" rel=\"bookmark\"><time class=\"entry-date published\">%time%</time><time class=\"updated\">%time%</time></a></div><h2 class=\"entry-title\"><a href=\"%url%\" rel=\"bookmark\">%title%</a></h2></header><div class=\"entry-content\">%content%</div></article>"
let previewPostLoadJsonPath = "./js/pages/preview-post.json";

function previewPostSetLoadJsonPath(path) {
    previewPostLoadJsonPath = path;
}

function loadNews() {
    let request = new XMLHttpRequest();
    request.open("get", previewPostLoadJsonPath);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            generatePreviewPost(JSON.parse(request.responseText));
            hljs.highlightAll();
        } else {

        }
    }
}

function generatePreviewPost(posts) {
    let main = document.getElementById("main");
    let str = "";
    for (let index in posts) {
        str  += previewPostFormat.replace("%url%", posts[index].url)
                      .replace("%url%", posts[index].url)
                      .replace("%time%", posts[index].time)
                      .replace("%time%", posts[index].time)
                      .replace("%title%", posts[index].title)
                      .replace("%content%", marked(posts[index].markdown));
    }
    main.innerHTML = str;
    MathJax.startup.defaultReady();
}