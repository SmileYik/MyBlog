var pageData = {};
//args format ?<json-name>#<id>
function onLoad(){
	let url = window.location.search;
	if (url.indexOf("?") > -1) {
		let datas = url.substr(1).split("=");
		loadPage(datas[0] + ".json", datas[1]);
	} else {
		window.location.href = "./page404.html";
	}
}

//配置取读成功, 开始加载页面
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

//取读页面信息
function loadPage(jsonName, id) {
	let url = "./pages/jsons/" + jsonName;
	let request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		if (request.status == 200) {
			pageData = JSON.parse(request.responseText);
			try {
				init(pageData[id]);				
			} catch (e) {
				window.location.href = "./page404.html";
				console.log(e);
			}
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
			document.getElementById('markdownContents').innerHTML = marked(request.responseText);
		}
	}
}

