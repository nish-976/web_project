var a = "1st";
var b = "1st";
var str ="/yeardata?year="+a+"&sem="+b;
var xhttp = new XMLHttpRequest();
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
xhttp.open("POST", str, true);
xhttp.send();
