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
ministerio:"Justicia y Presidencia",
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


let cartas=[];
let primeraCarta=null;
let segundaCarta=null;
let bloqueo=false;

let movimientos=0;
let aciertos=0;
let segundos=0;
let reloj;



function crearJuego(){

const tablero=document.getElementById("juego");

tablero.innerHTML="";


cartas=[];



ministros.forEach((persona,index)=>{


cartas.push({

id:index,
tipo:"foto",
contenido:
`<img src="${persona.foto}" class="foto">`,
nombre:persona.nombre

});


cartas.push({

id:index,
tipo:"texto",
contenido:
`
<div class="textoCarta">
<b>${persona.nombre}</b>
<br>
${persona.ministerio}
</div>
`,
nombre:persona.nombre

});


});



cartas.sort(()=>Math.random()-0.5);



cartas.forEach(carta=>{


let div=document.createElement("div");

div.className="carta";


div.dataset.id=carta.id;


div.onclick=function(){

mostrarCarta(div,carta);

};


tablero.appendChild(div);


});



movimientos=0;
aciertos=0;
segundos=0;


document.getElementById("movimientos").textContent=0;

document.getElementById("tiempo").textContent=0;

document.getElementById("resultado").innerHTML="";



clearInterval(reloj);


reloj=setInterval(()=>{

segundos++;

document.getElementById("tiempo").textContent=segundos;


},1000);


}




function mostrarCarta(div,carta){


if(bloqueo)return;


if(div.classList.contains("volteada"))return;



div.innerHTML=carta.contenido;

div.classList.add("volteada");



if(!primeraCarta){

primeraCarta={
div:div,
carta:carta
};

return;

}



segundaCarta={
div:div,
carta:carta
};


movimientos++;

document.getElementById("movimientos").textContent=movimientos;



comprobar();



}




function comprobar(){


if(
primeraCarta.carta.id === segundaCarta.carta.id
&&
primeraCarta.carta.tipo !== segundaCarta.carta.tipo
){


primeraCarta.div.classList.add("correcta");

segundaCarta.div.classList.add("correcta");


aciertos++;


alert("✅ ¡Correcto! Has encontrado la pareja");


primeraCarta=null;
segundaCarta=null;



if(aciertos===ministros.length){

finalizar();

}



}

else{


bloqueo=true;


setTimeout(()=>{


primeraCarta.div.innerHTML="";

segundaCarta.div.innerHTML="";


primeraCarta.div.classList.remove("volteada");

segundaCarta.div.classList.remove("volteada");


primeraCarta=null;

segundaCarta=null;

bloqueo=false;


},1000);



}



}





function finalizar(){


clearInterval(reloj);



let nota=10-(movimientos-ministros.length)*0.1;


if(nota<0){

nota=0;

}



document.getElementById("resultado").innerHTML=

`
🎉 Actividad terminada

<br><br>

Parejas correctas:
${aciertos}/${ministros.length}

<br>

Movimientos:
${movimientos}

<br>

Tiempo:
${segundos} segundos

<br><br>

⭐ Nota:
<b>${nota.toFixed(1)}/10</b>

`;



alert(
"🎉 Has terminado la actividad\n\nNota: "
+nota.toFixed(1)+"/10"
);



}




function reiniciar(){

crearJuego();

}



crearJuego();
