window.addEventListener('load',main);

//DECLARACION VARIABLES
var fallas=0;
var ancho=500;
var alto=600;


function main(){
	console.log("Creado por:Stefania Estrada Rojas"); 
	console.log("Abril 2018")
	canvas=document.getElementById("HangmanCanvas"); //Obtener info de etiqueta 
	canvas.width=ancho;
	canvas.height=alto;
	contexto=canvas.getContext("2d");

	//*****************************
	//PALABRAS POSIBLES
	//*****************************
	var PalabrasPosibles=["desayuno", "elefante","afganistan", "albania", "alemania", "argentina", "turquia", "camello","canario","cangrejo","canguro",
						 "caracol","ciervo","cocodrilo","australia","ciuedad","agua","gente","anonimo","cien","hidratacion","computador","equipo","innovacion",
						 "nunca","infinito","veinte", "acronimo","bebida","modelo","telecomunicaciones","cien","perfume","relacion","refresco","niño","dinosaurio"];


	//*****************************
	//CARGAS IMAGENES
	//*****************************

	falla0=new Image();
	falla0.src="assets/executed/hangman0.jpg";
	falla1=new Image();
	falla1.src="assets/executed/hangman1.jpg";
	falla2=new Image();
	falla2.src="assets/executed/hangman2.jpg";
	falla3=new Image();
	falla3.src="assets/executed/hangman3.jpg";
	falla4=new Image();
	falla4.src="assets/executed/hangman4.jpg";
	falla5=new Image();
	falla5.src="assets/executed/hangman5.jpg";
	falla6=new Image();
	falla6.src="assets/executed/hangman6.jpg";
	falla7=new Image();
	falla7.src="assets/executed/hangman7.jpg";
	lost=new Image();
	lost.src="assets/LOST.jpg";
	winner=new Image();
	winner.src="assets/winner.png";

	falla0.onload=function(){
		contexto.drawImage(falla0,0,0,826,978,0,0,canvas.width,canvas.height);
	};

	//*****************************
	//Obtener letra seleccionada
	//*****************************
	

	$("#alfabeto").on("click",".letras",elegirLetra);

	function PalabraJuego(){
		palabraActualCompleta=SeleccionarPalabra(PalabrasPosibles);

		palabraActual=palabraActualCompleta.toUpperCase();

		palabraActual.split("").map(function(character){
			var bloquePalabra=document.getElementById("palabra_en_juego");

			var Elemento=document.createElement("div");

			if(character.match(/[a-z]/i)){
				Elemento.className="BloqueCaracter es-letra";
			}
			else{
				Elemento.className="BloqueCaracter";
			}

			bloquePalabra.appendChild(Elemento);
		});
	}//End PalabraJuego

	function SeleccionarPalabra(array){
		var num=Math.floor(Math.random()*(array.length-1));
		var esta=array[num];

		return esta;
	}//End SeleccionarPalabra

	function elegirLetra(){
		var letraElegida=$(this);

		letraElegida.removeClass("letras").addClass("deshabilitarletras");

		letraElegida=letraElegida.html();
		console.log(letraElegida);
		hayLetra(letraElegida);

	}//end escogerLetra

	function hayLetra(letraElegida){
		var resultados=[];
		var ind=palabraActual.indexOf(letraElegida);

		//Si la letra esta en la palabra se le hace "push" a las letras
		//push() agrega uno o mas elementos al final de un array y devuelve la nueva longitud
		while(ind !==-1){
			resultados.push(ind);
			ind=palabraActual.indexOf(letraElegida,ind+1);
		}


		//Poner las letras acertadas
		if(resultados.length > 0){
			var letrasAcertadas=document.getElementsByClassName("es-letra");
			
			resultados.map(function(num){
				var Elemento=document.createElement("rango");
				Elemento.innerHTML=palabraActualCompleta[num].toUpperCase();
				letrasAcertadas[num].appendChild(Elemento);

				MensajeVictoria();
			});
		}
		else{
			//var Elemento=document.createElement("div");
			//Elemento.className="letras_falladas";
			//Elemento.innerHTML=letraElegida;
			fallas+=1;
			dibujarOrcadito(fallas);

			//MensajePerdida(fallas);
		}
	}//end hayLetra

	function MensajeVictoria(){
		var aciertos=$(".es-letra > rango").length;

		if(aciertos==palabraActual.length){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(winner,0,0,500,475,0,0,canvas.width,canvas.height);
		}
	}//end MensajeVictoria

	// function MensajePerdida(fallas){
	// 	if(fallas==7){
	// 		$("#Perdio").modal('show');

	// 	}
	// }//end MensajePerdida

	function dibujarOrcadito(fallas){

		if (fallas==1){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(falla1,0,0,826,978,0,0,canvas.width,canvas.height);
		}
		else if (fallas==2){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(falla2,0,0,826,978,0,0,canvas.width,canvas.height);
		}
		else if (fallas==3){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(falla3,0,0,826,978,0,0,canvas.width,canvas.height);
		}
		else if (fallas==4){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(falla4,0,0,826,978,0,0,canvas.width,canvas.height);
		}
		else if (fallas==5){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(falla5,0,0,826,978,0,0,canvas.width,canvas.height);
		}
		else if (fallas==6){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(falla6,0,0,826,978,0,0,canvas.width,canvas.height);
		}
		else if (fallas==7){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(falla7,0,0,826,978,0,0,canvas.width,canvas.height);
		}
		else if (fallas>7){
			contexto.clearRect(0,0,canvas.width,canvas.height);
			contexto.drawImage(lost,0,0,497,434,0,0,canvas.width,canvas.height);
			window.confirm("NOOOOOOO!! La palabra era: "+palabraActual);
		}

	}//End dibujarOrcadito

	var palabraActualCompleta;
	var palabraActual;

	PalabraJuego();
	//console.log("Palabra Actual:"+palabraActual);

}//End main