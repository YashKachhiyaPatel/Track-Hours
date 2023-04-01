var name = prompt("enter your name");
// const id     = document.getElementById('Id');
var player = document.getElementById('player');
var answer = document.getElementById('answer');
var score = document.getElementById('score');

var time_left = document.getElementById('time_left');
var start = document.getElementById('start');
var txt = document.getElementById('txt');

var container = document.querySelector('.container');
var resultid = document.getElementById('resultid');

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');
var back = document.getElementById('Back');

var newDate = document.getElementById('newDate');
var btndate = document.getElementById('btnDate');
var start = document.getElementById('start');
var end = document.getElementById('end');

var first = document.getElementById('first');
var second = document.getElementById('second');
var operator = document.querySelector('.operator');

const database = firebase.database();
const rootRef = database.ref('users');

var fetch = document.getElementById('fetch');
var row = 1;
var stno = 0;

const op = ["+","-","*","%"];

let f,s,o;
let c=0;

fetchData(name);

function calculateTimeDifference() {
  // Get the time inputs
  var time1 = document.getElementById("time1").value;
  var time2 = document.getElementById("time2").value;

var date = document.getElementById("dateInput").value;
  // Convert time inputs to Date objects
  var date1 = new Date("2023-03-24T" + time1 + ":00Z");
  var date2 = new Date("2023-03-24T" + time2 + ":00Z");

  // Calculate the difference in milliseconds
  var difference = Math.abs(date1 - date2);

  // Convert milliseconds to minutes
  var minutes = Math.floor(difference / (1000 * 60));

  var hour = Math.floor(minutes/60);

  minutes = minutes - (60*hour);

  // Display the result
  
  c = hour;
  score = hour;
  
  addToDatabase(minutes);
}

function fetchData(name){
	database.ref('users').once('value',function(snapshot){
		snapshot.forEach(
			function(childsnapshot){
				let fname = childsnapshot.val().firstname;
				let score = childsnapshot.val().score;

				if(name == fname) {
					document.getElementById("score").innerHTML = "Total: "+score+" Hour ";
				}
				else{
					
				}
				
			});
	
	});
}

function addToDatabase(minutes)
{
	database.ref('users').once('value',function(snapshot){
		snapshot.forEach(
			function(childsnapshot){
				let fname = childsnapshot.val().firstname;
				let score = childsnapshot.val().score;

				if(name == fname) {
					c = score + c;
					database.ref('users/'+ name).set({
		  			firstname:name,
		  			score:c
		  		    });
				}
				else{
					database.ref('users/'+ name).set({
		  			firstname:name,
		  			score:c
		  		    });
				}
				
			});

document.getElementById("score").innerHTML = "Total: "+c +" Hour " + minutes + "mins";
	
	});
}


back.style.display = "none";
container.style.display = "none";

start.style.display = "block";
	btn1.style.display = "inline";
	btn2.style.display = "inline";
	btn3.style.display = "inline";
	btn4.style.display = "inline";

let final = 0;

if (name == "null") {
	player.innerHTML = "Player";
	name = "Player";
}else{
	player.innerHTML = name.toUpperCase();
}


start.addEventListener("click",function(){
	fetch.style.display = "block";
    resultid.style.display = "none";
	player.style.color = "black";
	container.style.display = "block";
	start.style.display = "none";
	txt.style.display = "none";


	 f = Math.floor(Math.random()*20);
 	 s = Math.floor(Math.random()*20);
 	 o = op[Math.floor(Math.random()*4)];

 	  first.value=f;
 	      second.value=s; 
 	      operator.textContent = o;
 	      score.innerHTML = c;    

  	    if (o == "+") { final = f+s; } 
 	     if (o == "-") { final = f-s; } 
 	     if (o == "*") { final = f*s; } 
 	     if (o == "%") { final = f%s; } 
	timer();

});


// answer.addEventListener("keypress",function(e){
// 	if (e.which === 13) {

// 		if (final == answer.value) {
// 			c += 2;				
// 				player.style.color = "darkgreen";		
// 		}
// 		else{
// 			c--;
// 				player.style.color = "red";		
// 		}
// 		answer.value = "";
// 	    f = Math.ceil(Math.random()*20);
//  	       s = Math.ceil(Math.random()*20);
//  	       o = op[Math.floor(Math.random()*4)];


//  	      first.value=f;
//  	      second.value=s; 
//  	      operator.textContent = o;
//  	      score.innerHTML = c;

//  	     if (o == "+") { final = f+s; } 
//  	     if (o == "-") { final = f-s; } 
//  	     if (o == "*") { final = f*s; } 
//  	     if (o == "%") { final = f%s; } 

// 	}

// });

back.addEventListener('click',()=>{
	location.reload();
});

function addtoList(first,score)
{
	var ul = document.getElementById('list');

	var fname = document.createElement('li');    
	var lastscore = document.createElement('li');

	fname.innerHTML = first;

	if(lastscore != undefined || lastscore > -1 || lastscore != "undefined")
    { lastscore.innerHTML = score; }
	else
    { lastscore.innerHTML = score; }

      ul.appendChild(fname);
      ul.appendChild(lastscore);

}


fetch.addEventListener('click',() =>{

	resultid.style.display = "none";
	txt.style.display = "none";
	fetch.style.display = "none";
	start.style.display = "none";
	btn1.style.display = "none";
	btn2.style.display = "none";
	btn3.style.display = "none";
	btn4.style.display = "none";
	back.style.display = "inline";


	database.ref('users').once('value',function(snapshot){
		snapshot.forEach(
			function(childsnapshot){
				let fname = childsnapshot.val().firstname;
				let score = childsnapshot.val().score;
				if (score<0) {score=0;}
				addtoList(fname,score);
			});

	});

});


function timer(){
	let x = setInterval(function(){
		if (time_left.textContent > 0) {
				time_left.textContent -= 1;
		}else{
			clearInterval(x);
			container.style.display = "none";
			start.style.display = "block";
			resultid.style.display = "block";
			resultid.innerHTML = `<h3>your score : ${c}</h3>`;
		      
			if (c<0) {
				c = 0;				
			}
            database.ref('users/'+ name).set({
  			firstname:name,
  			score:c

  		    });

			time_left.textContent = 60;
			c = 0;
		}

	},1000);
}

 var body = document.getElementById('body');
 function color1(){
 	body.style.background = "rgb(103 142 160)";
 }
 function color2(){
 	body.style.background = "#90c7ee";
 }
 function color3(){
 	body.style.background = "rgb(155 193 110)";
 }
 function color4(){
 	body.style.background = "rgb(206 137 137)";
 }


