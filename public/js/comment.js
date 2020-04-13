var xhttp = new XMLHttpRequest();
document.getElementById("a1").innerHTML = "<br>";
xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        var d = JSON.parse(this.responseText);
      for(var i=0;i<d.length;i++)
      {
            document.getElementById("a1").innerHTML +=  "<h1>Name</h1>"+ d[i]["name"] +"<h1>Comment</h1>"+ "<br>" + d[i]["comment"];
      }
    }
};
xhttp.open("POST", '/commentArr', true);
xhttp.send();