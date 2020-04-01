var a = document.getElementById("year123").innerHTML;
var b = document.getElementById("sem123").innerHTML;
if (a == 1) a = "1st";
if (a == 2) a = "2nd";
if (a == 3) a = "3rd";
if (a == 4) a = "4th";
if (b == 1) b = "1st";
if (b == 2) b = "2nd";
var str = "/yeardata?year=" + a + "&sem=" + b;
var xhttp = new XMLHttpRequest();
var xhttp1 = new XMLHttpRequest();
xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        var d = JSON.parse(this.responseText);
        document.getElementById("c1").innerHTML = d[0]["subjects"][0];
        document.getElementById("c2").innerHTML = d[0]["subjects"][1];
        document.getElementById("c3").innerHTML = d[0]["subjects"][2];
        document.getElementById("c4").innerHTML = d[0]["subjects"][3];
        document.getElementById("c5").innerHTML = d[0]["subjects"][4];
        document.getElementById("c6").innerHTML = d[0]["subjects"][5];
    }
};

document.getElementById("c1").addEventListener("click", display);
document.getElementById("c2").addEventListener("click", display);
document.getElementById("c3").addEventListener("click", display);
document.getElementById("c4").addEventListener("click", display);
document.getElementById("c5").addEventListener("click", display);
xhttp1.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        var d = JSON.parse(this.responseText);
        
      var d1 =  document.getElementById("iii1");
      var child = d1.lastElementChild;  
        while (child) { 
            d1.removeChild(child); 
            child = d1.lastElementChild; 
        } 
      console.log(d);
     for(i=0;i<d.length;i++)
     {
       
        var a = document.createElement("iframe");
      a.src = d[i]["link"];
      a.width="315";
      a.height="215";
       a.frameborder="0"; 
       a.allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ;
       d1.appendChild(a);
     }
    }
};

function display(e) {
    console.log(111);
    var eval = e.target.innerHTML;

    var str1 = "/search?year=" + a + "&tag=" + eval;
    console.log(str1);
    xhttp1.open("POST", str1, true);
    xhttp1.send();
}
xhttp.open("POST", str, true);
xhttp.send();