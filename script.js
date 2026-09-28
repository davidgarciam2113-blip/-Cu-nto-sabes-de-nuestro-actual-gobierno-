const cartasBase = [

{
imagen:"https://www.lamoncloa.gob.es/presidente/biografia/Paginas/index.aspx",
texto:"Pedro Sánchez<br>Presidente del Gobierno"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Carlos Cuerpo<br>Vicepresidente primero<br>Ministro de Economía, Comercio y Empresa"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Yolanda Díaz<br>Vicepresidenta segunda<br>Ministra de Trabajo y Economía Social"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Sara Aagesen<br>Vicepresidenta tercera<br>Ministra para la Transición Ecológica"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"José Manuel Albares<br>Ministro de Asuntos Exteriores, Unión Europea y Cooperación"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Félix Bolaños<br>Ministro de Presidencia, Justicia y Relaciones con las Cortes"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Margarita Robles<br>Ministra de Defensa"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Arcadi España<br>Ministro de Hacienda"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Fernando Grande-Marlaska<br>Ministro del Interior"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Óscar Puente<br>Ministro de Transportes y Movilidad Sostenible"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Milagros Tolón<br>Ministra de Educación, Formación Profesional y Deportes"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Jordi Hereu<br>Ministro de Industria y Turismo"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Luis Planas<br>Ministro de Agricultura, Pesca y Alimentación"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Ángel Víctor Torres<br>Ministro de Política Territorial y Memoria Democrática"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Isabel Rodríguez<br>Ministra de Vivienda y Agenda Urbana"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Ernest Urtasun<br>Ministro de Cultura"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Mónica García<br>Ministra de Sanidad"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Pablo Bustinduy<br>Ministro de Derechos Sociales, Consumo y Agenda 2030"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Diana Morant<br>Ministra de Ciencia, Innovación y Universidades"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Ana Redondo<br>Ministra de Igualdad"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Elma Saiz<br>Ministra de Inclusión, Seguridad Social y Migraciones"
},

{
imagen:"https://www.lamoncloa.gob.es/gobierno/composiciondelgobierno/Paginas/index.aspx",
texto:"Óscar López<br>Ministro para la Transformación Digital y Función Pública"
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
contenido:`<img src="${persona.imagen}" alt="foto">`,
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


cartas.forEach(carta=>{


let div=document.createElement("div");

div.className="carta";


div.onclick=()=>voltear(div,carta);


juego.appendChild(div);


});


}




function voltear(elemento,carta){


if(bloqueo)return;

if(elemento.classList.contains("volteada"))return;


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
"🎉 Juego terminado<br>"+
"Tiempo: "+tiempo+" segundos<br>"+
"Movimientos: "+movimientos;


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



