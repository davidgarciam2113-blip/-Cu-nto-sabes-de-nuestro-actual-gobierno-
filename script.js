const ministros = [

{
nombre:"Pedro Sánchez",
ministerio:"Presidente del Gobierno",
foto:"imagenes/pedro-sanchez.jpg"
},

{
nombre:"Carlos Cuerpo",
ministerio:"Vicepresidente primero y ministro de Economía, Comercio y Empresa",
foto:"imagenes/carlos-cuerpo.jpg"
},

{
nombre:"Yolanda Díaz",
ministerio:"Vicepresidenta segunda y ministra de Trabajo y Economía Social",
foto:"imagenes/yolanda-diaz.jpg"
},

{
nombre:"Sara Aagesen",
ministerio:"Vicepresidenta tercera y ministra para la Transición Ecológica y el Reto Demográfico",
foto:"imagenes/sara-aagesen.jpg"
},

{
nombre:"José Manuel Albares",
ministerio:"Ministro de Asuntos Exteriores, Unión Europea y Cooperación",
foto:"imagenes/jose-albares.jpg"
},

{
nombre:"Félix Bolaños",
ministerio:"Ministro de la Presidencia, Justicia y Relaciones con las Cortes",
foto:"imagenes/felix-bolanos.jpg"
},

{
nombre:"Margarita Robles",
ministerio:"Ministra de Defensa",
foto:"imagenes/margarita-robles.jpg"
},

{
nombre:"Fernando Grande-Marlaska",
ministerio:"Ministro del Interior",
foto:"imagenes/marlaska.jpg"
},

{
nombre:"Óscar Puente",
ministerio:"Ministro de Transportes y Movilidad Sostenible",
foto:"imagenes/oscar-puente.jpg"
},

{
nombre:"Luis Planas",
ministerio:"Ministro de Agricultura, Pesca y Alimentación",
foto:"imagenes/luis-planas.jpg"
},

{
nombre:"Mónica García",
ministerio:"Ministra de Sanidad",
foto:"imagenes/monica-garcia.jpg"
},

{
nombre:"Diana Morant",
ministerio:"Ministra de Ciencia, Innovación y Universidades",
foto:"imagenes/diana-morant.jpg"
},

{
nombre:"Ernest Urtasun",
ministerio:"Ministro de Cultura",
foto:"imagenes/ernest-urtasun.jpg"
}

];


let cartas = [];
let primera = null;
let segunda = null;
let bloqueo = false;

let movimientos = 0;
let aciertos = 0;
let inicio;
let reloj;


function crearJuego(){

    const juego = document.getElementById("juego");

    juego.innerHTML = "";

    cartas = [];
    primera = null;
    segunda = null;
    bloqueo = false;

    movimientos = 0;
    aciertos = 0;

    document.getElementById("movimientos").textContent = "0";
    document.getElementById("tiempo").textContent = "0";
    document.getElementById("resultado").innerHTML = "";


    ministros.forEach((persona, indice) => {

        cartas.push({
            id: indice,
            tipo: "foto",
            contenido: `
                <img
                    src="${persona.foto}"
                    alt="Fotografía de ${persona.nombre}"
                >
            `
        });

        cartas.push({
            id: indice,
            tipo: "texto",
            contenido: `
                <div class="textoCarta">
                    <strong>${persona.nombre}</strong>
                    <br>
                    <span>${persona.ministerio}</span>
                </div>
            `
        });

    });


    mezclar(cartas);


    cartas.forEach(carta => {

        const elemento = document.createElement("div");

        elemento.className = "carta";
        elemento.dataset.id = carta.id;
        elemento.dataset.tipo = carta.tipo;

        elemento.innerHTML = carta.contenido;

        elemento.addEventListener("click", () => {
            voltear(elemento);
        });

        juego.appendChild(elemento);

    });


    clearInterval(reloj);

    inicio = Date.now();

    reloj = setInterval(() => {

        const segundos =
            Math.floor((Date.now() - inicio) / 1000);

        document.getElementById("tiempo").textContent =
            segundos;

    }, 1000);

}


function mezclar(array){

    for(let i = array.length - 1; i > 0; i--){

        const j =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
            [array[j], array[i]];

    }

}


function voltear(carta){

    if(bloqueo) return;

    if(carta.classList.contains("acierto")) return;

    if(carta === primera) return;

    carta.classList.add("visible");


    if(!primera){

        primera = carta;

        return;

    }


    segunda = carta;

    movimientos++;

    document.getElementById("movimientos").textContent =
        movimientos;

    comprobarPareja();

}


function comprobarPareja(){

    const mismaPersona =
        primera.dataset.id === segunda.dataset.id;

    const distintoTipo =
        primera.dataset.tipo !== segunda.dataset.tipo;


    if(mismaPersona && distintoTipo){

        primera.classList.add("acierto");
        segunda.classList.add("acierto");

        aciertos++;

        mostrarMensaje(
            "✅ ¡Correcto! Has encontrado una pareja."
        );

        primera = null;
        segunda = null;


        if(aciertos === ministros.length){

            finalizarJuego();

        }

    } else {

        bloqueo = true;

        mostrarMensaje(
            "❌ No coinciden. Inténtalo otra vez."
        );

        setTimeout(() => {

            primera.classList.remove("visible");
            segunda.classList.remove("visible");

            primera = null;
            segunda = null;

            bloqueo = false;

        }, 900);

    }

}


function mostrarMensaje(texto){

    let mensaje =
        document.getElementById("mensaje");


    if(!mensaje){

        mensaje =
            document.createElement("div");

        mensaje.id = "mensaje";

        const juego =
            document.getElementById("juego");

        juego.parentNode.insertBefore(
            mensaje,
            juego
        );

    }


    mensaje.textContent = texto;


    clearTimeout(
        mostrarMensaje.temporizador
    );


    mostrarMensaje.temporizador =
        setTimeout(() => {

            mensaje.textContent = "";

        }, 1500);

}


function finalizarJuego(){

    clearInterval(reloj);


    const segundos =
        Math.floor((Date.now() - inicio) / 1000);


    const movimientosMinimos =
        ministros.length;

    const errores =
        Math.max(
            0,
            movimientos - movimientosMinimos
        );


    let nota =
        10 - (errores * 0.1);


    if(nota < 0){

        nota = 0;

    }


    document.getElementById("resultado").innerHTML = `
        🎉 Actividad completada
        <br><br>

        Parejas:
        <strong>${aciertos}/${ministros.length}</strong>

        <br>

        Movimientos:
        <strong>${movimientos}</strong>

        <br>

        Tiempo:
        <strong>${segundos}s</strong>

        <br><br>

        ⭐ Nota:
        <strong>${nota.toFixed(1)}/10</strong>
    `;


    mostrarMensaje(
        "🎉 ¡Actividad completada!"
    );

}


function reiniciar(){

    clearInterval(reloj);

    crearJuego();

}


crearJuego();
