$(function () {
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

    let edit = $("#mdEditArea");

    if (hasCookie("miskyleMarkdownEditText")) {
        edit[0].value = JSON.parse(getCookie("miskyleMarkdownEditText")).text;
        $("#main").html(marked(edit[0].value));
    }
    if (hasCookie("miskyleMarkdownEditH")) {
        edit.css({
            "height": getCookie("miskyleMarkdownEditH"),
        });
    }

    edit[0].onkeyup = function () {
        showWhatIEnter();
    }

    edit[0].onfocus = function () {
        setCookie("miskyleMarkdownEditH", edit.css("height"));
    }
});

function showWhatIEnter() {
    let texts = $("#mdEditArea")[0].value;
    let save = {};
    save["text"] = texts;
    setCookie("miskyleMarkdownEditText", JSON.stringify(save));
    $("#main").html(marked(texts));
    MathJax.startup.defaultReady();
}

function setCookie(key, value) {
    document.cookie = key + "=" + value + ";";
}

function getCookie(key) {
    let cookies = document.cookie.split(";");
    for (let index in cookies) {
        let data = cookies[index].split("=");
        if (data[0].indexOf(key) >= 0) {
            return data[1];
        }
    }
    return "";
}

function hasCookie(key) {
    return MB_getCookie(key) !== "";
}

function downloadMd() {
    let content = $("#mdEditArea")[0].value;
    var eleLink = document.createElement('a');
    eleLink.download = "markdown.md";
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};