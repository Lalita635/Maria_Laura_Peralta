document.addEventListener("DOMContentLoaded", () => {
	const NADA = 0,
		PIEDRA = 1,
		MANZANA = 2,
		CUADRO_VERDE = 3,
		TAMANIO_SPRITES = 15,
		PARED_IZQUIERDA = 4,
		PARED_DERECHA = 5,
		PARED_ARRIBA = 6,
		PARED_ABAJO = 7;

	let juegoComenzado = false,
		enPausa = false,
		cartelPausaVisible = false,
		$canvas = document.querySelector("#canvas");

	class PedazoSerpiente {
		constructor(x = 10, y = 10) {
			this.x = x;
			this.y = y;
		}
	}

	class Juego {
		constructor() {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.bufferSonidoComerManzana = null;
			this.cargarEfectosDeSonido();
			this.teclas = {
				"39": "derecha",
				"37": "izquierda",
				"38": "arriba",
				"40": "abajo"
			};

			this.imagenes = {
				comida: "https://image.ibb.co/gTiND6/snake_food.png",
				paredIzquierda: "https://image.ibb.co/n0FDLm/pared_izquierda_resized.png",
				paredDerecha: "https://image.ibb.co/j21nfm/pared_derecha_resized.png",
				paredArriba: "https://image.ibb.co/cxrW6R/pared_abajo_resized.png",
				paredAbajo: "https://image.ibb.co/hhar6R/pared_arriba_resized.png",
				cuadroVerde: "https://image.ibb.co/g4SURR/snake_pixel.png",
				manzana: "https://image.ibb.co/gTiND6/snake_food.png",
				raton: "https://image.ibb.co/e9jq0m/Greedy_Mouse_sprite.png",
				piedra: "https://image.ibb.co/e9jq0m/Greedy_Mouse_sprite.png"
			};

			this.contadorImagenes = 0;
			this.imagenesRequeridas = 9;
			this.serpiente = [
				new PedazoSerpiente(),
				new PedazoSerpiente(),
				new PedazoSerpiente()
			];

			this.canvas = $canvas;
			this.canvasCtx = this.canvas.getContext("2d");

			this.longitudX = parseInt(this.canvas.width / TAMANIO_SPRITES);
			this.longitudY = parseInt(this.canvas.height / TAMANIO_SPRITES);
			this.matriz = this.obtenerMatrizEscenario(this.longitudY, this.longitudX);

			this.velocidadInicial = 100;
			this.velocidad = 1;
			this.incrementoVelocidad = 0.05;

			this.direcciones = {
				derecha: 1,
				izquierda: 2,
				arriba: 3,
				abajo: 4
			};

			this.siguienteDireccion = this.direcciones.derecha;
			this.direccion = this.direcciones.derecha;

			let dis = this;
			this._imagenes = {};
			for (let i in this.imagenes) {
				this._imagenes[i] = new Image();
				this._imagenes[i].src = this.imagenes[i];
				this._imagenes[i].addEventListener("load", () => {
					dis.contadorImagenes++;
					dis.comprobarSiSeTerminaronDeCargar();
				});
			}

			document.addEventListener("keydown", evento => {
				let direccion = this.teclas[evento.keyCode];
				if (direccion) {
					if (
						(this.direccion === this.direcciones.derecha || this.direccion === this.direcciones.izquierda) &&
						(direccion === "arriba" || direccion === "abajo")
					)
						this.siguienteDireccion = this.direcciones[direccion];
					else if (
						(this.direccion === this.direcciones.arriba || this.direccion === this.direcciones.abajo) &&
						(direccion === "derecha" || direccion === "izquierda")
					)
						this.siguienteDireccion = this.direcciones[direccion];
				}

				if (evento.key === 'p' || evento.key === 'P') {
					if (!enPausa) {
						enPausa = true;
						cartelPausaVisible = true;
						Swal.fire({
							title: '⏸ Juego en Pausa',
							text: 'Haz clic en el botón para continuar.',
							icon: 'info',
							confirmButtonText: '▶ Reanudar',
							allowOutsideClick: false,
							allowEscapeKey: false,
							showCancelButton: false,
							showCloseButton: false,
							didOpen: () => {
								Swal.getTitle().style.color = '#333';
								Swal.getPopup().style.background = '#f4f4f4';
							}
						}).then(() => {
							enPausa = false;
							cartelPausaVisible = false;
							this.dibujar();
						});
					}
				}

			});
		}

		ponerManzanaEnAlgunLugar() {
			let x, y;
			do {
				x = Math.floor(Math.random() * (this.longitudX - 2 + 1) + 1);
				y = Math.floor(Math.random() * (this.longitudY - 2 + 1) + 1);
			} while (this.matriz[x][y] !== NADA);
			this.matriz[x][y] = MANZANA;
		}

		agregarPedazo() {
			this.serpiente.push(new PedazoSerpiente());
		}

		dibujarSerpiente() {
			this.direccion = this.siguienteDireccion;
			for (let x = this.serpiente.length - 1; x >= 1; x--) {
				this.serpiente[x].x = this.serpiente[x - 1].x;
				this.serpiente[x].y = this.serpiente[x - 1].y;
			}
			switch (this.direccion) {
				case this.direcciones.derecha:
					this.serpiente[0].x++;
					break;
				case this.direcciones.izquierda:
					this.serpiente[0].x--;
					break;
				case this.direcciones.arriba:
					this.serpiente[0].y--;
					break;
				case this.direcciones.abajo:
					this.serpiente[0].y++;
					break;
			}

			if (this.colisionaConAlgo()) return false;

			for (let x = this.serpiente.length - 1; x >= 0; x--) {
				this.canvasCtx.drawImage(
					this._imagenes.cuadroVerde,
					this.serpiente[x].x * TAMANIO_SPRITES,
					this.serpiente[x].y * TAMANIO_SPRITES,
					TAMANIO_SPRITES,
					TAMANIO_SPRITES
				);
			}
			return true;
		}

		comprobarSiSeTerminaronDeCargar() {
			if (this.contadorImagenes === this.imagenesRequeridas) this.reiniciarJuego();
		}

		reiniciarJuego() {
			juegoComenzado = true;
			setTimeout(() => {
				this.ponerManzanaEnAlgunLugar();
				this.dibujar();
			}, this.velocidadInicial / this.velocidad);
		}

		onManzanaComida() {
			this.reproducirSonidoDeManzanaComida();
			this.agregarPedazo();
			this.aumentarVelocidad();
			this.ponerManzanaEnAlgunLugar();
		}

		aumentarVelocidad() {
			this.velocidad += this.incrementoVelocidad;
		}

		cargarEfectosDeSonido() {
			var context = new AudioContext();
			let peticion = new XMLHttpRequest(),
				_this = this;
			peticion.open('GET', "assets/apple-crunch-16.wav", true);
			peticion.responseType = 'arraybuffer';

			peticion.onload = function () {
				context.decodeAudioData(peticion.response, function (buffer) {
					_this.bufferSonidoComerManzana = buffer;
				});
			}
			peticion.send();
		}

		reproducirSonidoDeManzanaComida() {
			if (this.bufferSonidoComerManzana) {
				var context = new AudioContext();
				var source = context.createBufferSource();
				source.buffer = this.bufferSonidoComerManzana;
				source.connect(context.destination);
				source.start(0);
			}
		}

		dibujar() {
			if (enPausa) return;

			this.limpiarEscenario();
			this.dibujarMatriz();
			let sePudoDibujarLaSerpiente = this.dibujarSerpiente();

			if (sePudoDibujarLaSerpiente) {
				if (this.matriz[this.serpiente[0].x][this.serpiente[0].y] === MANZANA) {
					this.matriz[this.serpiente[0].x][this.serpiente[0].y] = NADA;
					this.onManzanaComida();
				}
				setTimeout(() => this.dibujar(), this.velocidadInicial / this.velocidad);
			} else {
				Swal.fire({
					title: '💥 ¡Perdiste!',
					text: '¿Quieres volver a jugar?',
					icon: 'error',
					confirmButtonText: 'Reiniciar',
					allowOutsideClick: false,
					allowEscapeKey: false,
					showCancelButton: false,
					showCloseButton: false
				}).then(() => window.location.reload());
			}
		}

		colisionaConAlgo() {
			return [PARED_ABAJO, PARED_ARRIBA, PARED_DERECHA, PARED_IZQUIERDA].includes(
				this.matriz[this.serpiente[0].x][this.serpiente[0].y]
			);
		}

		obtenerMatrizEscenario(altura, anchura) {
			let matriz = [];
			for (let x = 0; x < anchura; x++) {
				matriz.push([]);
				for (let y = 0; y < altura; y++) {
					if (x === 0) matriz[x].push(PARED_IZQUIERDA);
					else if (x === anchura - 1) matriz[x].push(PARED_DERECHA);
					else if (y === 0) matriz[x].push(PARED_ARRIBA);
					else if (y === altura - 1) matriz[x].push(PARED_ABAJO);
					else matriz[x].push(NADA);
				}
			}
			return matriz;
		}

		dibujarMatriz() {
			for (let x = 0; x < this.matriz.length; x++) {
				for (let y = 0; y < this.matriz[x].length; y++) {
					let tipo = this.matriz[x][y];
					if (tipo === NADA) continue;
					let imagen = null;
					switch (tipo) {
						case PIEDRA: imagen = this._imagenes.piedra; break;
						case PARED_ARRIBA: imagen = this._imagenes.paredArriba; break;
						case PARED_ABAJO: imagen = this._imagenes.paredAbajo; break;
						case PARED_DERECHA: imagen = this._imagenes.paredDerecha; break;
						case PARED_IZQUIERDA: imagen = this._imagenes.paredIzquierda; break;
						case MANZANA: imagen = this._imagenes.manzana; break;
					}
					this.canvasCtx.drawImage(imagen, x * TAMANIO_SPRITES, y * TAMANIO_SPRITES, TAMANIO_SPRITES, TAMANIO_SPRITES);
				}
			}
		}

		limpiarEscenario() {
			this.canvasCtx.fillStyle = "#e0e0e0";
			this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

	$canvas.width = window.innerWidth;
	$canvas.height = window.innerHeight;

	async function mostrarPantallaInicio() {
		await Swal.fire({
			title: '🐍 Juego de la Serpiente',
			text: 'Usa las flechas o haz clic para moverte en las diferentes direcciones y P para pausar/reanudar. ¡Come manzanas y evita las paredes!',
			confirmButtonText: 'Comenzar juego',
			allowOutsideClick: false,
			allowEscapeKey: false,
			showCancelButton: false,
			showCloseButton: false
		});
		if (!juegoComenzado) new Juego();
	}

	mostrarPantallaInicio();
});