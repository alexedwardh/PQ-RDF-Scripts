(function () {
	var storageId = ""; //use your own bin ID
	retrieveStorage(storageId, process);

	function retrieveStorage(id, callback) {
		var myJsonBaseUrl = "https://api.myjson.com/bins/";
		var storageUrl = myJsonBaseUrl + id;
		
		get(storageUrl, callback);
	}

	function process(json) {
		var entries = document.querySelectorAll("entry");
		var entriesArray = Array.prototype.slice.call(entries);

		entriesArray
			.map(convert)
			.filter(filter.bind(null, json))
			.forEach(downloadEntry);
	}

	function get(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = handleResponse.bind(null, callback);
		xhr.open('GET', url);
		xhr.send();
	}

	function handleResponse(callback, e) {
		var xhr = e.target;
		switch (xhr.readyState) {
			case (XMLHttpRequest.DONE):
				if (xhr.status === 200) {
					var json = JSON.parse(xhr.response).UIN;
					callback(json);
				}
				break;
		}
	}

	function convert(entry) {
		var uin = entry.querySelector("title").textContent.split(" ")[1];
		var href = entry.lastElementChild.attributes.href.textContent;
		return {
			uin: uin,
			href: href
		};
	}

	function filter(json, entry) {
		return json.includes(entry.uin);
	}

	function downloadEntry(entry) {
		download(entry.href, entry.uin + ".queued");
	}

	function download(url, fileName) {
		var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
		a.setAttribute("href", url);
		a.setAttribute("download", fileName);
		a.click();
	}
})();