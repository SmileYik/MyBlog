var url = "./pages/jsons/news.json";
var rootUrl = "./"
newsPoster = document.getElementById("newsPoster");

loadNews();

function loadNews() {
	let request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		if (request.status == 200) {
			generateNews(JSON.parse(request.responseText));
		} else {
			
		}
	}
}

function generateNews(news) {
	let str = "";
	for (obj in news) {
		str += "<p><a href='" + rootUrl + news[obj].url + "'>" + news[obj].title + "</a></p>";
	}
	newsPoster.innerHTML = str;
}