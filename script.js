const cartasBase = [

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/pedro-sanchez.jpg",
texto:"Pedro Sánchez<br>Presidente del Gobierno"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/carlos-cuerpo.jpg",
texto:"Carlos Cuerpo<br>Ministro de Economía"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/yolanda-diaz.jpg",
texto:"Yolanda Díaz<br>Ministra de Trabajo"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/sara-aagesen.jpg",
texto:"Sara Aagesen<br>Ministra para la Transición Ecológica"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/jose-albares.jpg",
texto:"José Manuel Albares<br>Ministro de Exteriores"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/felix-bolanos.jpg",
texto:"Félix Bolaños<br>Ministro de Presidencia"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/margarita-robles.jpg",
texto:"Margarita Robles<br>Ministra de Defensa"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/marlaska.jpg",
texto:"Grande-Marlaska<br>Ministro del Interior"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/oscar-puente.jpg",
texto:"Óscar Puente<br>Ministro de Transportes"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/luis-planas.jpg",
texto:"Luis Planas<br>Ministro de Agricultura"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/monica-garcia.jpg",
texto:"Mónica García<br>Ministra de Sanidad"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/diana-morant.jpg",
texto:"Diana Morant<br>Ministra de Ciencia"
},

{
imagen:"/Cu-nto-sabes-de-nuestro-actual-gobierno-/imagenes/ernest-urtasun.jpg",
texto:"Ernest Urtasun<br>Ministro de Cultura"
}

];


let cartas=[];
let primera=null;
let segunda=null;
let bloqueo=false;
let movimientos=0;
let tiempo=0;
let reloj;


function iniciarJuego(){

cartas=[];

cartasBase.forEach((persona,i)=>{

cartas.push({
contenido:`<img src="${persona.imagen}" class="foto">`,
pareja:i
});


cartas.push({
contenido:persona.texto,
pareja:i
});

});


cartas.sort(()=>Math.random()-0.5);

crearTablero();

reloj=setInterval(()=>{

tiempo++;

document.getElementById("tiempo").textContent=tiempo;

},1000);

}



function crearTablero(){

let juego=document.getElementById("juego");

juego.innerHTML="";


cartas.forEach(carta=>{

let div=document.createElement("div");

div.className="carta";


div.onclick=()=>voltear(div,carta);


juego.appendChild(div);

});

}




function voltear(div,carta){

if(bloqueo)return;

if(div.classList.contains("volteada"))return;


div.innerHTML=carta.contenido;

div.classList.add("volteada");


if(!primera){

primera={div,carta};

}else{

segunda={div,carta};

movimientos++;

document.getElementById("movimientos").textContent=movimientos;


comprobar();

}

}



function comprobar(){

if(primera.carta.pareja===segunda.carta.pareja){

primera.div.classList.add("correcta");
segunda.div.classList.add("correcta");

primera=null;
segunda=null;


}else{


bloqueo=true;


setTimeout(()=>{

primera.div.innerHTML="";
segunda.div.innerHTML="";

primera.div.classList.remove("volteada");
segunda.div.classList.remove("volteada");


primera=null;
segunda=null;

bloqueo=false;


},1000);


}


}



iniciarJuego();
