alert("SCRIPT CARGADO");

const juego = document.getElementById("juego");

juego.innerHTML = `
<div style="
width:120px;
height:120px;
background:red;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size:20px;
">
PRUEBA
</div>
`;

console.log("El div juego es:", juego);
