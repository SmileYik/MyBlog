var pageData = {};
function onLoad(){
	let url = window.location.search;
	testttt();
	return;
	if (url.indexOf("?") > -1) {
		loadPage(url.substr(1));
	} else {
		window.location.href = "./page404.html";
	}
}

function testttt() {
	let url = "https://www.shutterstock.com/zh/home";
	let request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		if (request.status == 200) {
			console.log(request.responseText);
			document.getElementById('markdownContents').innerHTML = marked(request.responseText);

		} else {
			window.location.href = "./page404.html";
		}
	}
}

function init(pageData){
	var rendererMD = new marked.Renderer();
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
	
	document.getElementById("title").innerHTML = pageData.title;
	showMarkdown(pageData.markdown);
}

function loadPage(page) {
	let url = "./pages/" + page + ".json";
	let request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		if (request.status == 200) {
			pageData = JSON.parse(request.responseText);
			init(pageData);
		} else {
			window.location.href = "./page404.html";
		}
	}
}

function showMarkdown(fileName){
	let url = "./pages/" + fileName;
	var request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		// 返回状态为200，即为数据获取成功
		if (request.status == 200) {
			console.log(request.responseText);
			document.getElementById('markdownContents').innerHTML = marked(request.responseText);
		}
	}
}

