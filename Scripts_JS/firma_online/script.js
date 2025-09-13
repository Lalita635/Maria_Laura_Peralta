
const $canvas = document.querySelector("#canvas"),
    $btnDescargar = document.querySelector("#btnDescargar"),
    $btnLimpiar = document.querySelector("#btnLimpiar"),
    $btnGenerarDocumento = document.querySelector("#btnGenerarDocumento");
const contexto = $canvas.getContext("2d");
const COLOR_PINCEL = "black";
const COLOR_FONDO = "white";
const GROSOR = 2;
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
const obtenerXReal = (clientX) => clientX - $canvas.getBoundingClientRect().left;
const obtenerYReal = (clientY) => clientY - $canvas.getBoundingClientRect().top;
let haComenzadoDibujo = false;

const setCredits = () => {
    const creditsElement = document.getElementById('credits');
    creditsElement.textContent = 'By Lalita635';
}

const limpiarCanvas = () => {
    contexto.fillStyle = COLOR_FONDO;
    contexto.fillRect(0, 0, $canvas.width, $canvas.height);
};
limpiarCanvas();
$btnLimpiar.onclick = limpiarCanvas;
$btnDescargar.onclick = () => {
    const canvasConMarca = document.createElement('canvas');
    canvasConMarca.width = $canvas.width;
    canvasConMarca.height = $canvas.height;
    const ctxMarca = canvasConMarca.getContext('2d');

    ctxMarca.drawImage($canvas, 0, 0);

    
    ctxMarca.save();
    ctxMarca.translate(canvasConMarca.width / 2, canvasConMarca.height / 2);
    ctxMarca.rotate(-Math.atan(canvasConMarca.height / canvasConMarca.width));
    ctxMarca.font = "50px Arial";
    ctxMarca.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctxMarca.textAlign = "center";
    ctxMarca.textBaseline = "middle";
    ctxMarca.fillText("EJEMPLO", 0, 0);
    ctxMarca.restore();


    const textoLinea1 = "Para obtener el código sin la marca";
    const textoLinea2 = "de agua ingresa a: 🔒 http://bit.ly/4fS0yUa";


    ctxMarca.font = "bold 12px sans-serif";
    ctxMarca.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctxMarca.textAlign = "center";
    ctxMarca.textBaseline = "bottom";

    ctxMarca.fillText(textoLinea1, canvasConMarca.width / 2, canvasConMarca.height - 28);
    ctxMarca.fillText(textoLinea2, canvasConMarca.width / 2, canvasConMarca.height - 15);

    const enlace = document.createElement('a');
    enlace.download = "Firma.png";
    enlace.href = canvasConMarca.toDataURL();
    enlace.click();
};


window.obtenerImagen = () => {
    return $canvas.toDataURL();
};

$btnGenerarDocumento.onclick = () => {
    window.open("documento.html");
};


$canvas.addEventListener("mousedown", evento => {
    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.fillStyle = COLOR_PINCEL;
    contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
    contexto.closePath();
    haComenzadoDibujo = true;
});

$canvas.addEventListener("mousemove", (evento) => {
    if (!haComenzadoDibujo) {
        return;
    }

    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.moveTo(xAnterior, yAnterior);
    contexto.lineTo(xActual, yActual);
    contexto.strokeStyle = COLOR_PINCEL;
    contexto.lineWidth = GROSOR;
    contexto.stroke();
    contexto.closePath();
});
["mouseup", "mouseout"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, () => {
        haComenzadoDibujo = false;
    });
});

setCredits();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    drawing = true;
    const touch = e.touches[0];
    ctx.beginPath();
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
});

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (!drawing) return;
    const touch = e.touches[0];
    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
});

canvas.addEventListener("touchend", () => {
    drawing = false;
});

