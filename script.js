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
let primera=null;
let segunda=null;
let bloqueado=false;

let movimientos=0;
let aciertos=0;
let inicio;
let tiempo;


const juego=document.getElementById("juego");


function crearJuego(){

juego.innerHTML="";

cartas=[];

ministros.forEach((m,i)=>{

cartas.push({
tipo:"foto",
valor:m.nombre,
contenido:m.foto
});


cartas.push({
tipo:"texto",
valor:m.nombre,
contenido:
`
<strong>${m.nombre}</strong>
<br>
${m.ministerio}
`
});


});


cartas.sort(()=>Math.random()-0.5);


cartas.forEach((c)=>{


let carta=document.createElement("div");

carta.className="carta";

carta.dataset.valor=c.valor;
carta.dataset.tipo=c.tipo;


if(c.tipo==="foto"){

carta.innerHTML=
`
<img src="${c.contenido}">
`;

}else{

carta.innerHTML=c.contenido;

}


carta.onclick=()=>voltear(carta);


juego.appendChild(carta);


});


movimientos=0;
aciertos=0;

document.getElementById("movimientos").textContent=0;

document.getElementById("resultado").textContent="";


inicio=new Date();

clearInterval(tiempo);

tiempo=setInterval(()=>{

let segundos=Math.floor((new Date()-inicio)/1000);

document.getElementById("tiempo").textContent=segundos;


},1000);


}



function voltear(carta){


if(bloqueado) return;

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


let correcto=
primera.dataset.valor===segunda.dataset.valor
&& primera.dataset.tipo!==segunda.dataset.tipo;



if(correcto){


primera.classList.add("acierto");
segunda.classList.add("acierto");


aciertos++;


alert("✅ ¡Correcto! Has encontrado la pareja");


primera=null;
segunda=null;



if(aciertos===ministros.length){

finalizar();

}


}else{


bloqueado=true;


setTimeout(()=>{

primera.classList.remove("visible");
segunda.classList.remove("visible");


primera=null;
segunda=null;

bloqueado=false;


},1000);



}



}



function finalizar(){


clearInterval(tiempo);


let segundos=
Math.floor((new Date()-inicio)/1000);



let nota=
10-(movimientos-(ministros.length))*0.25;


if(nota<0) nota=0;


document.getElementById("resultado").innerHTML=
`
🎉 Juego terminado<br>
Aciertos: ${aciertos}/${ministros.length}<br>
Movimientos: ${movimientos}<br>
Tiempo: ${segundos}s<br>
<br>
⭐ Nota: ${nota.toFixed(1)}/10
`;

alert(
"🎉 ¡Enhorabuena! Has completado la actividad.\n\nTu nota es: "
+nota.toFixed(1)+"/10"
);


}



function reiniciar(){

crearJuego();

}


crearJuego();
