var xhttp = new XMLHttpRequest();
document.getElementById("a1").innerHTML = "<br>";
xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        var d = JSON.parse(this.responseText);
        var d1 = document.getElementById("a1");
        var b = document.createElement("ul");
        b.setAttribute("class", "list-group");
        d1.appendChild(b);
        for (var i = d.length - 1; i >= 0; i--) {
            var x = document.createElement("strong");
            x.setAttribute("class", "set-color");
            x.textContent = d[i]["name"];
            var c = document.createElement("li");
            c.setAttribute("class", "list-group-item-dark");
            c.textContent = d[i]["comment"];
            var y = document.createElement("br");
            b.appendChild(x);
            b.appendChild(c);
            b.appendChild(y);
            b.appendChild(y);
            b.appendChild(y);
            b.appendChild(y);
            b.appendChild(y);
        }
    }
};
xhttp.open("POST", "/commentArr", true);
xhttp.send();