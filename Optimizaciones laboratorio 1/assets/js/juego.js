const miModulo = (() => {
    
    'use strict';

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A','J','Q','K'];
    

    let puntosJugadores = [];
    
    // REFERENCIAS AL HTML
    
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          ptsHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
    

    
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        ptsHTML.forEach( elem => elem.innerHTML = 0 );
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false; 
        btnDetener.disabled = false; 

    }


    const crearDeck = () => {
        deck = [];
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

        return (_.shuffle(deck));
    }
    
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        } else {
            return deck.pop();
        }
    }
    
    
    
    const valorCarta = (carta) => {
        
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN (valor)) ? 
               (valor === 'A') ? 11 : 10
               : valor * 1;
    }

    // Turno 0: primer jugador, último computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        ptsHTML[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        
        (puntosComputadora <= 21 && puntosMinimos != puntosComputadora) ? alert('Computadora ganó') : (puntosComputadora === puntosMinimos) ? alert('Nadie ganó') : alert('Jugador ganó');
    }
    
    // TURNO DE LA COMPUTADORA
    
    const turnoComputadora = (puntosMinimos) => {
    
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
    
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        
        determinarGanador();
            
    }
    
    
    // EVENTOS
    
    btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();
        puntosJugador = acumularPuntos(carta, 0)
        crearCarta(carta, 0);
    
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugador.append(imgCarta);
    
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
    
    // btnNuevo.addEventListener('click', () => {
        
    //     inicializarJuego();

    // })

    return {
        nuevoJuego: inicializarJuego
    };

})();



