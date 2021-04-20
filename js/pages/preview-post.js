let previewPostFormat = "<article><header class=\"entry-header\"><div class=\"entry-meta\"><span class=\"screen-reader-text\">发布于</span><a href=\"%url%\" rel=\"bookmark\"><time class=\"entry-date published\">%time%</time><time class=\"updated\">%time%</time></a></div><h2 class=\"entry-title\"><a href=\"%url%\" rel=\"bookmark\">%title%</a></h2></header><div class=\"entry-content\">%content%</div></article>"


function loadNews() {
    let request = new XMLHttpRequest();
    request.open("get", "./js/pages/preview-post.json");
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            generatePreviewPost(JSON.parse(request.responseText));
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
}

//						<article><header class="entry-header"><div class="entry-meta"><span class="screen-reader-text">发布于</span><a href="http://localhost/wordpress/?p=69" rel="bookmark"><time class="entry-date published">2020-12-07</time><time class="updated">2020-12-07</time></a></div><h2 class="entry-title"><a href="http://localhost/wordpress/?p=69" rel="bookmark">CorpPlus – 让你的服务器能够自定义作物</a></h2></header><div class="entry-content"></div></article>
