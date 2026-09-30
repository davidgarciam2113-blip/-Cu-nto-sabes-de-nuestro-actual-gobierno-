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


function crearJuego(){

let juego=document.getElementById("juego");

juego.innerHTML="";


cartas=[];


ministros.forEach((m,i)=>{


cartas.push({

id:i,

contenido:
`
<img src="${m.foto}" width="100">
`

});


cartas.push({

id:i,

contenido:
`
<b>${m.nombre}</b>
<br>
${m.ministerio}
`

});


});



cartas.sort(()=>Math.random()-0.5);



cartas.forEach(c=>{


let carta=document.createElement("div");


carta.className="carta";


carta.innerHTML=c.contenido;


juego.appendChild(carta);



});



}



function reiniciar(){

crearJuego();

}



crearJuego();
