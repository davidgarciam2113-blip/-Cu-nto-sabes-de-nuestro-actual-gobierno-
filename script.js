const ministros = [

{
nombre:"Pedro Sánchez",
ministerio:"Presidente del Gobierno",
foto:"imagenes/pedro-sanchez.jpg"
},

{
nombre:"Carlos Cuerpo",
ministerio:"Economía, Comercio y Empresa",
foto:"imagenes/carlos-cuerpo.jpg"
},

{
nombre:"Yolanda Díaz",
ministerio:"Trabajo y Economía Social",
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
ministerio:"Presidencia y Justicia",
foto:"imagenes/felix-bolanos.jpg"
},

{
nombre:"Margarita Robles",
ministerio:"Defensa",
foto:"imagenes/margarita-robles.jpg"
},

{
nombre:"Fernando Grande-Marlaska",
ministerio:"Interior",
foto:"imagenes/marlaska.jpg"
},

{
nombre:"Óscar Puente",
ministerio:"Transportes",
foto:"imagenes/oscar-puente.jpg"
},

{
nombre:"Luis Planas",
ministerio:"Agricultura",
foto:"imagenes/luis-planas.jpg"
},

{
nombre:"Mónica García",
ministerio:"Sanidad",
foto:"imagenes/monica-garcia.jpg"
},

{
nombre:"Diana Morant",
ministerio:"Ciencia",
foto:"imagenes/diana-morant.jpg"
},

{
nombre:"Ernest Urtasun",
ministerio:"Cultura",
foto:"imagenes/ernest-urtasun.jpg"
}

];


let cartas = [];
let primera = null;
let segunda = null;
let bloqueo = false;

let movimientos = 0;
let aciertos = 0;
let segundos = 0;
let reloj;



function iniciarJuego(){


const juego = document.getElementById("juego");


juego.innerHTML="";


cartas=[];

primera=null;
segunda=null;

bloqueo=false;

movimientos=0;
aciertos=0;
segundos=0;


document.getElementById("movimientos").textContent="0";
document.getElementById("tiempo").textContent="0";
document.getElementById("resultado").innerHTML="";



ministros.forEach((persona)=>{


cartas.push({

tipo:"foto",

pareja:persona.nombre,

contenido:
`
<img src="${persona.foto}" class="foto">
`

});


cartas.push({

tipo:"texto",

pareja:persona.nombre,

contenido:
`
<div class="textoCarta">
<b>${persona.nombre}</b>
<br>
${persona.ministerio}
</div>
`

});


});



cartas.sort(()=>Math.random()-0.5);



cartas.forEach((carta)=>{


let div=document.createElement("div");


div.className="carta";


div.onclick=function(){

mostrarCarta(div,carta);

};


juego.appendChild(div);


});



clearInterval(reloj);


reloj=setInterval(()=>{


segundos++;


document.getElementById("tiempo").textContent=segundos;


},1000);



}





function mostrarCarta(div,carta){


if(bloqueo)return;


if(div.classList.contains("abierta"))return;



div.innerHTML=carta.contenido;


div.classList.add("abierta");



if(!primera){


primera={div,carta};


return;


}



segunda={div,carta};


movimientos++;


document.getElementById("movimientos").textContent=movimientos;



comprobarPareja();



}






function comprobarPareja(){



if(
primera.carta.pareja===segunda.carta.pareja
&&
primera.carta.tipo!==segunda.carta.tipo
){



aciertos++;


primera.div.classList.add("correcta");

segunda.div.classList.add("correcta");



alert("✅ ¡Correcto! Has encontrado la pareja");


primera=null;

segunda=null;



if(aciertos===ministros.length){

terminarJuego();

}


}

else{


bloqueo=true;


setTimeout(()=>{


primera.div.innerHTML="";

segunda.div.innerHTML="";


primera.div.classList.remove("abierta");

segunda.div.classList.remove("abierta");



primera=null;

segunda=null;

bloqueo=false;


},1000);



}



}





function terminarJuego(){


clearInterval(reloj);



let nota=(aciertos/ministros.length)*10;


nota=nota.toFixed(1);



document.getElementById("resultado").innerHTML=

`
🎉 Actividad completada

<br><br>

Parejas acertadas:
${aciertos}/${ministros.length}

<br><br>

Movimientos:
${movimientos}

<br><br>

Tiempo:
${segundos} segundos

<br><br>

⭐ Nota final:
<strong>${nota}/10</strong>

`;



}





function reiniciar(){

iniciarJuego();

}



iniciarJuego();
