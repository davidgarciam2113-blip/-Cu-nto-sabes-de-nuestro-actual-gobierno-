
const cartasBase=[


{
imagen:"imagenes/pedro-sanchez.jpg",
texto:"Pedro Sánchez<br>Presidente del Gobierno"
},


{
imagen:"imagenes/margarita-robles.jpg",
texto:"Margarita Robles<br>Ministra de Defensa"
},


{
imagen:"imagenes/yolanda-diaz.jpg",
texto:"Yolanda Díaz<br>Vicepresidenta segunda<br>Ministra de Trabajo"
},


{
imagen:"imagenes/carlos-cuerpo.jpg",
texto:"Carlos Cuerpo<br>Ministro de Economía"
},


{
imagen:"imagenes/jose-albares.jpg",
texto:"José Manuel Albares<br>Ministro de Asuntos Exteriores"
},


{
imagen:"imagenes/monica-garcia.jpg",
texto:"Mónica García<br>Ministra de Sanidad"
}


];



let cartas=[];
let primera=null;
let segunda=null;
let bloqueo=false;

let movimientos=0;
let tiempo=0;

let contador;



function iniciar(){


cartas=[];


cartasBase.forEach((persona,index)=>{


cartas.push({

tipo:"foto",
contenido:
`<img src="${persona.imagen}">`,
pareja:index

});


cartas.push({

tipo:"texto",
contenido:persona.texto,
pareja:index

});


});



cartas.sort(()=>Math.random()-0.5);


crearTablero();


contador=setInterval(()=>{

tiempo++;

document.getElementById("tiempo").innerHTML=tiempo;


},1000);


}




function crearTablero(){


let juego=document.getElementById("juego");

juego.innerHTML="";


cartas.forEach((carta)=>{


let div=document.createElement("div");

div.className="carta";

div.dataset.pareja=carta.pareja;


div.onclick=()=>voltear(div,carta);


juego.appendChild(div);


});


}



function voltear(elemento,carta){


if(bloqueo) return;

if(elemento.classList.contains("volteada"))
return;



elemento.innerHTML=carta.contenido;

elemento.classList.add("volteada");



if(!primera){

primera={elemento,carta};

}

else{


segunda={elemento,carta};

movimientos++;

document.getElementById("movimientos").innerHTML=movimientos;


comprobar();


}


}




function comprobar(){


if(primera.carta.pareja===segunda.carta.pareja){


primera.elemento.classList.add("acierto");
segunda.elemento.classList.add("acierto");


primera=null;
segunda=null;


ganador();


}


else{


bloqueo=true;


setTimeout(()=>{


primera.elemento.innerHTML="";
segunda.elemento.innerHTML="";


primera.elemento.classList.remove("volteada");
segunda.elemento.classList.remove("volteada");


primera=null;
segunda=null;


bloqueo=false;


},1000);



}


}




function ganador(){


let aciertos=document.querySelectorAll(".acierto");


if(aciertos.length===cartas.length){


clearInterval(contador);


document.getElementById("resultado").innerHTML=

"🎉 ¡Completado! Tiempo: "+tiempo+
" segundos. Movimientos: "+movimientos;


}


}




function reiniciar(){


clearInterval(contador);

tiempo=0;

movimientos=0;

document.getElementById("tiempo").innerHTML=0;

document.getElementById("movimientos").innerHTML=0;

document.getElementById("resultado").innerHTML="";


iniciar();


}



iniciar();
