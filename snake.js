window.onload= function()
{
	window.addEventListener("keydown", checkKeyPressed, false);
 
	function checkKeyPressed(e) {
		var x = e.keyCode;
	    if (x == 37) {  // left arrow
	    	if(serpent.speedx==1){
	    		serpent.speedy=0;
	    	}
	    	else{
	    		serpent.speedx=-1;
	        	serpent.speedy=0;
	    	}
	        
	    }
	    else if(x == 39){  //right arrow
	    	if(serpent.speedx==-1){
	    		serpent.speedy=0;
	    	}
	    	else{
	    		serpent.speedx=1;
	    		serpent.speedy=0;
	    	}
	    }
	    else if(x == 38){  //up arrow
	    	if(serpent.speedy==1){
	    		serpent.speedx=0;
	    	}
	    	else{
	    	serpent.speedy=-1;
	    	serpent.speedx=0;
	    	}
	    }
	    else if(x == 40){  //down arrow
	    	if(serpent.speedy==-1){
	    		serpent.speedx=0;
	    	}
	    	else{
		    	serpent.speedy=1;
		    	serpent.speedx=0;
		    }
	    }
	}
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");


	

	var serpent = {
		posx : 0,
		posy : 0,
		speedx : 1,
		speedy : 0,
		scl : 20,
		taille : 1
	}
	var pomme = {
		posx : Math.floor(Math.random()*50)*serpent.scl,
		posy : Math.floor((Math.random()*25)+3)*serpent.scl
	}
	var tailx = [];
	var taily = [];
	var bodyx = [];
	var bodyy = [];
	var total=0;
	function drawSnake(prevx,prevy){
		if(total==0){
			ctx.clearRect(prevx,prevy,serpent.scl,serpent.scl);
		}
		else{
			ctx.clearRect(tailx[tailx.length-total-1],taily[taily.length-total-1],serpent.scl,serpent.scl);

		}
		if(serpent.posx<0){
			serpent.posx=c.width-serpent.scl;
		}
		if(serpent.posx>c.width-20){
			serpent.posx=0;
		}
		if(serpent.posy<0){
			serpent.posy=c.height-serpent.scl;
		}
		if(serpent.posy>c.height-20){
			serpent.posy=0;
		}
		tailx.push(serpent.posx);
		taily.push(serpent.posy);
		for(var i=total+1; i>0;i--){
			ctx.beginPath();
			ctx.rect(tailx[tailx.length-i],taily[taily.length-i] , serpent.scl, serpent.scl);
			ctx.fillStyle = "#AD1457";
			ctx.fill();
			}

	}
	function deplacement(){
		serpent.posx+=serpent.scl*serpent.speedx;
		serpent.posy+=serpent.scl*serpent.speedy;
	}
	var prevx=0;
    var prevy=0;
    var prevpommex=0;
    var prevpommey=0;

    function collide(){
    	if(serpent.posx==pomme.posx && serpent.posy==pomme.posy){
    		
    		total++;
    		document.getElementById("score").textContent = total;
    		return true;
    	}
    	else{
    		return false;
    	}
	}
	function drawPomme(){

			ctx.clearRect(pomme.posx,pomme.posy,serpent.scl,serpent.scl)
			pomme.posx=Math.floor(Math.random()*49)*serpent.scl;
			pomme.posy=Math.floor(Math.random()*22)*serpent.scl;
			ctx.beginPath();
			ctx.rect(pomme.posx,pomme.posy , serpent.scl, serpent.scl);
			ctx.fillStyle = "#2196F3";
			ctx.fill();
			console.log(pomme.posx,pomme.posy);
	}
	function collideTail(){
		var a;
		var b=false;

		for(var i = 0 ; i<=total+1;i++){
			
			//console.log("x="+serpent.posx+"!!!!!"+tailx[tailx.length-1-i]);
			//console.log("y="+serpent.posy+"!!!!!"+taily[taily.length-1-i]);
			if(total==0){
				b=false;
			}
			else{
				if(serpent.posx==tailx[tailx.length-1-i] && serpent.posy==taily[taily.length-1-i]){
					console.log("yes it touches");
					document.getElementById("score").textContent = "votre score est de : "+total;
					a=true;
				}
				else{
					a=false;
				}
				if(a==true){
					b=true;
				}
			}
		}
		return b ;

	}
	var myInterval = setInterval(animate, 1000/10);
    function animate(){


    	if(collideTail()){
    		console.log("testessea");
    	}
    	else{
    		drawSnake(prevx,prevy);
	    	if(collide()){
	    		drawPomme();
	    	}
	    	else if(total==0 && prevpommex==0 && prevpommey==0){
	    		drawPomme();
	    	}
	    	prevpommey=pomme.posy;
	    	prevpommex=pomme.posx
	    	prevx=serpent.posx;
	    	prevy=serpent.posy;
	    	deplacement();
	    }
 
    }

}