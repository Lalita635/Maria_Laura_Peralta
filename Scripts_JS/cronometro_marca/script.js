document.addEventListener("DOMContentLoaded", () => {
	const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido"),
		$btnIniciar = document.querySelector("#btnIniciar"),
		$btnPausar = document.querySelector("#btnPausar"),
		$btnMarca = document.querySelector("#btnMarca"),
		$btnDetener = document.querySelector("#btnDetener"),
		$contenedorMarcas = document.querySelector("#contenedorMarcas");
	let marcas = [],
		idInterval,
		tiempoInicio = null;
	let diferenciaTemporal = 0;

	const ocultarElemento = elemento => {
		elemento.style.display = "none";
	}

	const mostrarElemento = elemento => {
		elemento.style.display = "";
	}

	const setCredits = () => {
		const creditsElement = document.getElementById('credits');
		creditsElement.textContent = 'By Lalita635';
	}
	const agregarCeroSiEsNecesario = valor => {
		if (valor < 10) {
			return "0" + valor;
		} else {
			return "" + valor;
		}
	}

	const milisegundosAMinutosYSegundos = (milisegundos) => {
		const minutos = parseInt(milisegundos / 1000 / 60);
		milisegundos -= minutos * 60 * 1000;
		segundos = (milisegundos / 1000);
		return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`;
	};


	const iniciar = () => {
		const ahora = new Date();
		tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
		clearInterval(idInterval);
		idInterval = setInterval(refrescarTiempo, 100);
		ocultarElemento($btnIniciar);
		ocultarElemento($btnDetener);
		mostrarElemento($btnMarca);
		mostrarElemento($btnPausar);
		setCredits();
	};
	const pausar = () => {
		diferenciaTemporal = new Date() - tiempoInicio.getTime();
		clearInterval(idInterval);
		mostrarElemento($btnIniciar);
		ocultarElemento($btnMarca);
		ocultarElemento($btnPausar);
		mostrarElemento($btnDetener);
	};
	const refrescarTiempo = () => {
		const ahora = new Date();
		const diferencia = ahora.getTime() - tiempoInicio.getTime();
		$tiempoTranscurrido.textContent = milisegundosAMinutosYSegundos(diferencia);
	};
	const ponerMarca = () => {
		marcas.unshift(new Date() - tiempoInicio.getTime());
		dibujarMarcas();
	};
	const dibujarMarcas = () => {
		$contenedorMarcas.innerHTML = "";
		for (const [indice, marca] of marcas.entries()) {
			const $p = document.createElement("p");
			$p.innerHTML = `<strong class="is-size-4">${marcas.length - indice}.</strong> ${milisegundosAMinutosYSegundos(marca)}`;
			$p.classList.add("is-size-3");
			$contenedorMarcas.append($p);
		}
	};

	const detener = () => {
		Swal.fire({
			title: localStorage.getItem("lang") === "en" ? "⏱ Stop the stopwatch?" : "⏱ ¿Detener el cronómetro?",
			text: localStorage.getItem("lang") === "en" ? "You will lose the current recorded time." : "Perderás el tiempo registrado hasta ahora.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: localStorage.getItem("lang") === "en" ? "Yes, stop" : "Sí, detener",
			cancelButtonText: localStorage.getItem("lang") === "en" ? "Cancel" : "Cancelar"
		}).then((result) => {
			if (result.isConfirmed) {
				clearInterval(idInterval);
				init();
				marcas = [];
				dibujarMarcas();
				diferenciaTemporal = 0;
			}
		});
	}


	const init = () => {
		$tiempoTranscurrido.textContent = "00:00.0";
		ocultarElemento($btnPausar);
		ocultarElemento($btnMarca);
		ocultarElemento($btnDetener);
	};
	init();

	$btnIniciar.onclick = iniciar;
	$btnMarca.onclick = ponerMarca;
	$btnPausar.onclick = pausar;
	$btnDetener.onclick = detener;
});
