let  deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A','J','Q','K']

let puntosJugador = 0;
let puntosComputadora = 0;

// REFERENCIAS AL HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
let ptsJugador =  document.querySelector('#puntosJugador');
let ptsComputadora =  document.querySelector('#puntosComputadora');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const crearDeck = () => {

    for(let  i=2; i<=10;i++) {
       for (let tipo of tipos) {
            deck.push(i + tipo);
       }
    };

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    };
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    } else {
        let carta = deck.pop();
        return carta;
    }
}



const valorCarta = (carta) => {
    
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN (valor)) ? 
           (valor === 'A') ? 11 : 10
           : valor * 1;
}

// TURNO DE LA COMPUTADORA

const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        ptsComputadora.innerHTML = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    
    (puntosComputadora <= 21 && puntosMinimos != puntosComputadora) ? alert('Computadora ganó') : (puntosComputadora === puntosMinimos) ? alert('Nadie ganó') : alert('Jugador ganó');

}


// EVENTOS

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    ptsJugador.innerHTML = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador >= 21) {
        btnPedir.disabled = true; 
        btnDetener.disabled = true; 
        turnoComputadora(puntosJugador);
    } 


})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true; 
    btnDetener.disabled = true; 
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();
    btnPedir.disabled = false; 
    btnDetener.disabled = false; 
    puntosJugador = 0;
    puntosComputadora = 0;
    ptsJugador.innerHTML = puntosJugador;
    ptsComputadora.innerHTML = puntosComputadora;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
})