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
        if ($("#autoPreCheck")[0].checked) {
            showWhatIEnter();
        }
    }

    edit[0].onfocus = function () {
        setCookie("miskyleMarkdownEditH", edit.css("height"));
    }

    setInterval("autoSave()", 30000);
});

function showWhatIEnter() {

    let texts = $("#mdEditArea")[0].value;
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
    let eleLink = document.createElement('a');
    eleLink.download = $("#mdEditTitle").attr("value") + ".md";
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}

function resetText() {
    $("#mdEditArea")[0].value = "";
    showWhatIEnter();
}

function autoSave() {
    let texts = $("#mdEditArea")[0].value;
    let save = {};
    save["text"] = texts;
    setCookie("miskyleMarkdownEditText", JSON.stringify(save));
    let date = new Date();
    $("#editInfo").text("在 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " 时自动保存");
}

function loadText() {
    if (hasCookie("miskyleMarkdownEditText")) {
        let edit = $("#mdEditArea");
        edit[0].value = JSON.parse(getCookie("miskyleMarkdownEditText")).text;
        $("#main").html(marked(edit[0].value));
        $("#editInfo").text("恢复成功!");
    } else {
        $("#editInfo").text("没有保存记录!");
    }
}

function loadMathCharacter() {
    $.ajax({
        url: "./js/markdownEdit/mathCharacter.md",
        async: true,
        dataType: "text",
        success: function(res) {
            let obj = $("#mathCharacter");
            obj.attr("class", "");
            obj.attr("onclick", "");
            obj.html(marked(res));
            MathJax.startup.defaultReady();
        }
    });
}