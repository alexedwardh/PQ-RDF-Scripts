(function() {
    function put(entry) {
        var xhr = new XMLHttpRequest();
	var bin = ""; //use your own bin ID
        xhr.open("PUT", "https://api.myjson.com/bins/" + bin);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
            if (xhr.status === 200) {
                var userInfo = JSON.parse(xhr.responseText);
            }
        };
        var date = new Date();
        xhr.send(JSON.stringify({
            name: date.getDate().toString()+(date.getUTCMonth()+1).toString(),
            UIN: entry
        }));
    }

    var entries = document.querySelectorAll(".qna-result-question-uin, .UIN");
    var entryArray = Array.prototype.slice.call(entries);    

    entryArray
    .forEach(function(item, index) {
        entryArray[index].innerText = entryArray[index].innerText.replace(/[^\w]/gi,"");
    });
    
    var arraystr = entryArray.map(function(element) {
        return element.innerText;
    });

    put(arraystr);
})();