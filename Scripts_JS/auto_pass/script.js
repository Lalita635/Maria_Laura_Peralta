const tamanyo_password = 9;
let caracteres_conseguidos = 0;
let caracter_temporal = '';
let array_caracteres = Array(tamanyo_password).fill(null);
let password_definitivo = '';

const numero_minimo_letras_minusculas = 1;
const numero_minimo_letras_mayusculas = 1;
const numero_minimo_numeros = 1;
const numero_minimo_simbolos = 1;

let letras_minusculas_conseguidas = 0;
let letras_mayusculas_conseguidas = 0;
let numeros_conseguidos = 0;
let simbolos_conseguidos = 0;

function genera_aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setCredits = () => {
    const creditsElement = document.getElementById('credits');
    creditsElement.textContent = 'By Lalita635';
}

function genera_caracter(tipo) {
	const lista = '$+=?@_23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
	let min = 0, max = 0;

	switch (tipo) {
		case 'minúscula':
			min = 38; max = 61;
			break;
		case 'mayúscula':
			min = 14; max = 37;
			break;
		case 'número':
			min = 6; max = 13;
			break;
		case 'símbolo':
			min = 0; max = 5;
			break;
		case 'aleatorio':
			min = 0; max = 61;
			break;
	}
	return lista.charAt(genera_aleatorio(min, max));
}

function guarda_caracter_en_posicion_aleatoria(caracter) {
	let guardado = false;
	while (!guardado) {
		const pos = genera_aleatorio(0, tamanyo_password - 1);
		if (array_caracteres[pos] === null) {
			array_caracteres[pos] = caracter;
			guardado = true;
		}
	}
}

function generar_contrasenya() {
	while (letras_minusculas_conseguidas < numero_minimo_letras_minusculas) {
		caracter_temporal = genera_caracter('minúscula');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		letras_minusculas_conseguidas++;
		caracteres_conseguidos++;
	}

	while (letras_mayusculas_conseguidas < numero_minimo_letras_mayusculas) {
		caracter_temporal = genera_caracter('mayúscula');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		letras_mayusculas_conseguidas++;
		caracteres_conseguidos++;
	}

	while (numeros_conseguidos < numero_minimo_numeros) {
		caracter_temporal = genera_caracter('número');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		numeros_conseguidos++;
		caracteres_conseguidos++;
	}

	while (simbolos_conseguidos < numero_minimo_simbolos) {
		caracter_temporal = genera_caracter('símbolo');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		simbolos_conseguidos++;
		caracteres_conseguidos++;
	}

	while (caracteres_conseguidos < tamanyo_password) {
		caracter_temporal = genera_caracter('aleatorio');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		caracteres_conseguidos++;
	}

	for (let i = 0; i < array_caracteres.length; i++) {
		password_definitivo += array_caracteres[i];
	}

	const resultado = document.getElementById("resultado");
	resultado.innerHTML = `
		<p>Tamaño total de la contraseña: ${tamanyo_password}</p>
		<p>Cantidad de minúsculas: ${numero_minimo_letras_minusculas}</p>
		<p>Cantidad de mayúsculas: ${numero_minimo_letras_mayusculas}</p>
		<p>Cantidad de números: ${numero_minimo_numeros}</p>
		<p>Cantidad de símbolos: ${numero_minimo_simbolos}</p>
		<p>El resto de caracteres se completa aleatoriamente hasta el tamaño total.</p>
		<hr>
		<h3 class="text-primary">Contraseña generada:</h3>
		<h2 class="text-danger">${password_definitivo}</h2>
		<hr>
		<p><em>Recargá la página (F5) para generar una nueva contraseña</em></p>
	`;

	setCredits();
}

document.addEventListener("DOMContentLoaded", generar_contrasenya);
