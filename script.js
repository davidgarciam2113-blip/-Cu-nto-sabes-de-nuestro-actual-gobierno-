const ministros = [

{
nombre:"Pedro Sánchez",
ministerio:"Presidente del Gobierno",
foto:"imagenes/pedro-sanchez.jpg"
},

{
nombre:"Carlos Cuerpo",
ministerio:"Economía",
foto:"imagenes/carlos-cuerpo.jpg"
},

{
nombre:"Yolanda Díaz",
ministerio:"Trabajo",
foto:"imagenes/yolanda-diaz.jpg"
},

{
nombre:"Sara Aagesen",
ministerio:"Transición Ecológica",
foto:"imagenes/sara-aagesen.jpg"
},

{
nombre:"José Manuel Albares",
ministerio:"Asuntos Exteriores",
foto:"imagenes/jose-albares.jpg"
},

{
nombre:"Félix Bolaños",
ministerio:"Justicia",
foto:"imagenes/felix-bolanos.jpg"
}

];


let cartas=[];

let primera=null;
let segunda=null;

let bloqueo=false;

let movimientos=0;

let aciertos=0;

let inicio;

let reloj;



function crearJuego(){


const juego=document.getElementById("juego");


juego.innerHTML="";


cartas=[];



ministros.forEach((m,i)=>{


cartas.push({

id:i,

tipo:"foto",

contenido:`<img src="${m.foto}">`

});



cartas.push({

id:i,

tipo:"texto",

contenido:`

<strong>${m.nombre}</strong>

<br>

${m.ministerio}

`

});


});



cartas.sort(()=>Math.random()-0.5);



cartas.forEach(c=>{


let carta=document.createElement("div");


carta.className="carta";


carta.dataset.id=c.id;


carta.dataset.tipo=c.tipo;


carta.innerHTML=c.contenido;



carta.onclick=function(){

voltear(carta);

};



juego.appendChild(carta);



});



movimientos=0;

aciertos=0;


document.getElementById("movimientos").textContent=0;


document.getElementById("tiempo").textContent=0;


inicio=new Date();


clearInterval(reloj);


reloj=setInterval(()=>{


let segundos=Math.floor((new Date()-inicio)/1000);


document.getElementById("tiempo").textContent=segundos;


},1000);



}





function voltear(carta){


if(bloqueo) return;


if(carta===primera) return;



carta.classList.add("visible");



if(!primera){

primera=carta;

return;

}



segunda=carta;


movimientos++;


document.getElementById("movimientos").textContent=movimientos;



comprobar();



}





function comprobar(){


if(primera.dataset.id===segunda.dataset.id 
&& primera.dataset.tipo!==segunda.dataset.tipo){



primera.classList.add("acierto");

segunda.classList.add("acierto");



aciertos++;


primera=null;

segunda=null;



if(aciertos===ministros.length){

finalizar();

}



}else{



bloqueo=true;



setTimeout(()=>{


primera.classList.remove("visible");

segunda.classList.remove("visible");


primera=null;

segunda=null;


bloqueo=false;


},1000);



}


}





function finalizar(){


clearInterval(reloj);



let tiempo=Math.floor((new Date()-inicio)/1000);



let nota=10-(movimientos-ministros.length)*0.2;


if(nota<0){

nota=0;

}



document.getElementById("resultado").innerHTML=

`

🎉 Actividad completada

<br>

Movimientos: ${movimientos}

<br>

Tiempo: ${tiempo}s

<br><br>

⭐ Nota: ${nota.toFixed(1)}/10

`;



}





function reiniciar(){

crearJuego();

}



crearJuego();
