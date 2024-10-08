// Inicializar la variable para el # de intentos y el número aleatorio 
let intentos = 0;
let numeroAleatorio = Math.floor(Math.random() * 10) + 1;
let tiempoRestante = 30;
let temporizador;

// Sonidos
const soundSuccess = new Audio('script/success.mp3');
const soundFailure = new Audio('script/failure.mp3');
const soundError = new Audio('script/error.mp3');

// Función para iniciar el temporizador
function iniciarTemporizador() {
    temporizador = setInterval(() => {
        tiempoRestante--;
        document.getElementById('timer').textContent = `Tiempo restante: ${tiempoRestante} segundos`;

        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            Swal.fire({
                icon: 'info',
                title: '¡Se acabó el tiempo!',
                text: 'No lograste adivinar el número a tiempo. El número era ' + numeroAleatorio + '.'
            });
            reiniciarJuego();
        }
    }, 1000);
}

// Función para comprobar la adivinanza
function checkGuess() {
    const numeroaAdivinar = parseInt(document.getElementById("guess").value);

    if (isNaN(numeroaAdivinar) || numeroaAdivinar < 1 || numeroaAdivinar > 10) {
        Swal.fire({
            icon: 'warning',
            title: 'Número no válido',
            text: 'Por favor ingresa un número entre 1 y 10.'
        });
        soundError.play();
        return;
    }

    if (intentos >= 3) {
        Swal.fire({
            icon: 'info',
            title: 'Fin de intentos',
            text: 'Has agotado tus 3 intentos. El número era ' + numeroAleatorio + '.'
        });
        reiniciarJuego();
        return;
    }

    intentos++;

    if (numeroaAdivinar === numeroAleatorio) {
        Swal.fire({
            icon: 'success',
            title: '¡Felicidades!',
            text: `Adivinaste el número en ${intentos} intento(s).`
        });
        soundSuccess.play();
        reiniciarJuego();
    } else {
        let mensaje = "No adivinaste el número.";
        if (numeroaAdivinar > numeroAleatorio) {
            mensaje += " El número a adivinar es menor.";
        } else {
            mensaje += " El número a adivinar es mayor.";
        }
        Swal.fire({
            icon: 'error',
            title: '¡Oops!',
            text: `${mensaje} Llevas ${intentos} de 3 intentos permitidos.`
        });
        soundFailure.play();
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    intentos = 0;
    numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    tiempoRestante = 30;
    clearInterval(temporizador);
    iniciarTemporizador();
}

// Iniciar el juego y el temporizador
iniciarTemporizador();
