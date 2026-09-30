const cartasBase = [

{
imagen:"imagenes/pedro-sanchez.jpg",
texto:"Pedro Sánchez<br>Presidente del Gobierno"
},

{
imagen:"imagenes/carlos-cuerpo.jpg",
texto:"Carlos Cuerpo<br>Ministro de Economía"
},

{
imagen:"imagenes/yolanda-diaz.jpg",
texto:"Yolanda Díaz<br>Ministra de Trabajo"
}

];


let cartas=[];


function iniciarJuego(){

cartas=[];


cartasBase.forEach((persona,index)=>{


cartas.push({

contenido:`<img src="${persona.imagen}" width="100%" height="100%">`,

pareja:index

});


cartas.push({

contenido:persona.texto,

pareja:index

});


});


crearTablero();

}



function crearTablero(){

const juego=document.getElementById("juego");

juego.innerHTML="";


cartas.forEach(carta=>{


let div=document.createElement("div");

div.className="carta";


div.onclick=function(){

div.innerHTML=carta.contenido;

};


juego.appendChild(div);


});


}



iniciarJuego();
