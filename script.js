alert("SCRIPT NUEVO CARGADO");
const cartasBase = [

    {
        imagen: "imagenes/pedro-sanchez.jpg",
        texto: "Pedro Sánchez<br>Presidente del Gobierno"
    },

    {
        imagen: "imagenes/carlos-cuerpo.jpg",
        texto: "Carlos Cuerpo<br>Ministro de Economía, Comercio y Empresa"
    },

    {
        imagen: "imagenes/yolanda-diaz.jpg",
        texto: "Yolanda Díaz<br>Ministra de Trabajo y Economía Social"
    },

    {
        imagen: "imagenes/sara-aagesen.jpg",
        texto: "Sara Aagesen<br>Ministra para la Transición Ecológica"
    },

    {
        imagen: "imagenes/jose-albares.jpg",
        texto: "José Manuel Albares<br>Ministro de Asuntos Exteriores"
    },

    {
        imagen: "imagenes/felix-bolanos.jpg",
        texto: "Félix Bolaños<br>Ministro de Presidencia y Justicia"
    },

    {
        imagen: "imagenes/margarita-robles.jpg",
        texto: "Margarita Robles<br>Ministra de Defensa"
    },

    {
        imagen: "imagenes/marlaska.jpg",
        texto: "Fernando Grande-Marlaska<br>Ministro del Interior"
    },

    {
        imagen: "imagenes/oscar-puente.jpg",
        texto: "Óscar Puente<br>Ministro de Transportes"
    },

    {
        imagen: "imagenes/luis-planas.jpg",
        texto: "Luis Planas<br>Ministro de Agricultura"
    },

    {
        imagen: "imagenes/monica-garcia.jpg",
        texto: "Mónica García<br>Ministra de Sanidad"
    },

    {
        imagen: "imagenes/diana-morant.jpg",
        texto: "Diana Morant<br>Ministra de Ciencia"
    },

    {
        imagen: "imagenes/ernest-urtasun.jpg",
        texto: "Ernest Urtasun<br>Ministro de Cultura"
    }

];


let cartas = [];
let primera = null;
let segunda = null;
let bloqueo = false;

let movimientos = 0;
let tiempo = 0;
let reloj;



function iniciarJuego() {

    cartas = [];

    cartasBase.forEach((persona, indice) => {


        // Carta con fotografía

        cartas.push({

            tipo: "foto",

            contenido:
            `<img src="./${persona.imagen}" alt="foto">`,

            pareja: indice

        });



        // Carta con información

        cartas.push({

            tipo: "texto",

            contenido: persona.texto,

            pareja: indice

        });


    });



    cartas.sort(() => Math.random() - 0.5);


    crearTablero();


    iniciarReloj();

}




function crearTablero() {


    const tablero = document.getElementById("juego");

    tablero.innerHTML = "";


    cartas.forEach(carta => {


        const div = document.createElement("div");


        div.className = "carta";


        div.onclick = () => {

            mostrarCarta(div, carta);

        };


        tablero.appendChild(div);


    });


}





function mostrarCarta(elemento, carta) {


    if (bloqueo) return;


    if (elemento.classList.contains("volteada")) return;



    elemento.innerHTML = carta.contenido;

    elemento.classList.add("volteada");



    if (!primera) {


        primera = {

            elemento,
            carta

        };


    } else {


        segunda = {

            elemento,
            carta

        };


        movimientos++;

        document.getElementById("movimientos").textContent = movimientos;


        comprobarPareja();


    }


}





function comprobarPareja() {


    if (primera.carta.pareja === segunda.carta.pareja) {


        primera.elemento.classList.add("correcta");

        segunda.elemento.classList.add("correcta");


        primera = null;

        segunda = null;


        comprobarVictoria();


    } else {


        bloqueo = true;


        setTimeout(() => {


            primera.elemento.innerHTML = "";

            segunda.elemento.innerHTML = "";


            primera.elemento.classList.remove("volteada");

            segunda.elemento.classList.remove("volteada");


            primera = null;

            segunda = null;


            bloqueo = false;


        }, 1000);


    }


}




function comprobarVictoria() {


    const parejas = document.querySelectorAll(".correcta");


    if (parejas.length === cartas.length) {


        clearInterval(reloj);


        document.getElementById("resultado").innerHTML =

        `
        🎉 ¡Juego completado!<br><br>
        Tiempo: ${tiempo} segundos<br>
        Movimientos: ${movimientos}
        `;


    }


}





function iniciarReloj() {


    clearInterval(reloj);


    tiempo = 0;


    reloj = setInterval(() => {


        tiempo++;


        document.getElementById("tiempo").textContent = tiempo;


    },1000);


}




function reiniciar() {


    clearInterval(reloj);


    movimientos = 0;

    tiempo = 0;


    document.getElementById("movimientos").textContent = 0;

    document.getElementById("tiempo").textContent = 0;

    document.getElementById("resultado").innerHTML = "";


    iniciarJuego();

}




iniciarJuego();
