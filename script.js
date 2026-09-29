const cartasBase = [

{
    imagen:"imagenes/pedro-sanchez.jpg",
    texto:"Pedro Sánchez<br>Presidente del Gobierno"
},

{
    imagen:"imagenes/carlos-cuerpo.jpg",
    texto:"Carlos Cuerpo<br>Vicepresidente primero<br>Ministro de Economía, Comercio y Empresa"
},

{
    imagen:"imagenes/yolanda-diaz.jpg",
    texto:"Yolanda Díaz<br>Vicepresidenta segunda<br>Ministra de Trabajo y Economía Social"
},

{
    imagen:"imagenes/sara-aagesen.jpg",
    texto:"Sara Aagesen<br>Vicepresidenta tercera<br>Ministra para la Transición Ecológica"
},

{
    imagen:"imagenes/jose-albares.jpg",
    texto:"José Manuel Albares<br>Ministro de Asuntos Exteriores"
},

{
    imagen:"imagenes/felix-bolanos.jpg",
    texto:"Félix Bolaños<br>Ministro de Presidencia, Justicia y Relaciones con las Cortes"
},

{
    imagen:"imagenes/margarita-robles.jpg",
    texto:"Margarita Robles<br>Ministra de Defensa"
},

{
    imagen:"imagenes/marlaska.jpg",
    texto:"Fernando Grande-Marlaska<br>Ministro del Interior"
},

{
    imagen:"imagenes/oscar-puente.jpg",
    texto:"Óscar Puente<br>Ministro de Transportes y Movilidad Sostenible"
},

{
    imagen:"imagenes/luis-planas.jpg",
    texto:"Luis Planas<br>Ministro de Agricultura, Pesca y Alimentación"
},

{
    imagen:"imagenes/monica-garcia.jpg",
    texto:"Mónica García<br>Ministra de Sanidad"
},

{
    imagen:"imagenes/diana-morant.jpg",
    texto:"Diana Morant<br>Ministra de Ciencia, Innovación y Universidades"
},

{
    imagen:"imagenes/ernest-urtasun.jpg",
    texto:"Ernest Urtasun<br>Ministro de Cultura"
}


];



let cartas = [];

let primera = null;
let segunda = null;

let bloqueo = false;

let movimientos = 0;

let tiempo = 0;

let contadorTiempo;



function iniciar(){


    cartas=[];


    cartasBase.forEach((persona,index)=>{


        // Carta con fotografía

        cartas.push({

            tipo:"foto",

            contenido:
            `<img src="${persona.imagen}" alt="foto">`,

            pareja:index

        });



        // Carta con nombre y ministerio

        cartas.push({

            tipo:"texto",

            contenido:persona.texto,

            pareja:index

        });


    });



    // Mezclar cartas

    cartas.sort(()=>Math.random()-0.5);



    crearTablero();



    contadorTiempo=setInterval(()=>{

        tiempo++;

        document.getElementById("tiempo").innerHTML=tiempo;


    },1000);


}





function crearTablero(){


    const juego=document.getElementById("juego");


    juego.innerHTML="";



    cartas.forEach((carta)=>{


        let div=document.createElement("div");


        div.className="carta";


        div.onclick=function(){

            voltear(div,carta);

        };


        juego.appendChild(div);


    });


}







function voltear(elemento,carta){


    if(bloqueo) return;


    if(elemento.classList.contains("volteada")) return;



    elemento.innerHTML=carta.contenido;


    elemento.classList.add("volteada");



    if(!primera){


        primera={

            elemento:elemento,

            carta:carta

        };


    }

    else{


        segunda={

            elemento:elemento,

            carta:carta

        };



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



        comprobarGanador();


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








function comprobarGanador(){


    let acertadas=document.querySelectorAll(".acierto");



    if(acertadas.length===cartas.length){


        clearInterval(contadorTiempo);



        document.getElementById("resultado").innerHTML=

        "🎉 ¡Enhorabuena!<br><br>"+

        "Tiempo: "+tiempo+" segundos<br>"+

        "Movimientos: "+movimientos;



    }


}







function reiniciar(){


    clearInterval(contadorTiempo);


    movimientos=0;

    tiempo=0;


    document.getElementById("movimientos").innerHTML=0;

    document.getElementById("tiempo").innerHTML=0;


    document.getElementById("resultado").innerHTML="";


    iniciar();


}





iniciar();


