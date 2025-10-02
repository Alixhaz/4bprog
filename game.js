document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================
    // 1. LÓGICA DE LA BARRA LATERAL (SIDEBAR DRAWER)
    // ===================================
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarDrawer = document.querySelector('.sidebar-drawer-container');
    
    if (sidebarToggle && sidebarDrawer) {
        sidebarDrawer.addEventListener('click', () => {
            sidebarDrawer.classList.toggle('is-open'); 
        });
    }

    // ===================================
    // 2. VARIABLES Y ELEMENTOS DEL JUEGO
    // ===================================
    const clawRope = document.getElementById('claw-rope');
    const clawImage = document.getElementById('claw-image');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const upButton = document.getElementById('up-button');     
    const downButton = document.getElementById('down-button'); 
    const grabButton = document.getElementById('grab-button');
    const coinButton = document.getElementById('coin-button');         
    const refillPlushButton = document.getElementById('refill-plush-button'); 
    const scoreDisplay = document.getElementById('score-display');
    const toyArea = document.querySelector('.toy-area');
    const playsDisplay = document.getElementById('plays-display');
    const timeDisplay = document.getElementById('time-display'); 

    let clawPositionX = 50; 
    let clawPositionY = 90; 
    const MAX_Y = 320;      
    const MIN_Y = 90;       
    const STEP = 5;         
    let score = 0;
    let plays = 0;          
    let isGameActive = false; 
    let timeLeft = 30;
    let timerInterval;
    
    // Rutas de las imágenes de tus peluches (¡Asegúrate que sean .png!)
    // RECUERDA: DEBES TENER ESTOS ARCHIVOS EN TU CARPETA 'images/'
    const plushImagePaths = [
        'images/peluche1.png', 
        'images/peluche2.png',
        'images/peluche3.png',
        'images/peluche3.png',
        'images/peluche3.png',
        'images/peluche2.png',
        'images/peluche2.png',   // Ejemplo de nuevos nombres .png
        'images/peluche4',  // Ejemplo de nuevos nombres .png
        // Puedes agregar más, pero solo se usarán los primeros 8 en la máquina.
    ];
    
    let generatedPlushies = []; 
    // ***** CAMBIO SOLICITADO: SOLO 8 PELUCHES *****
    const MAX_PLUSHIES = 8; 

    // ===================================
    // 3. FUNCIONES PRINCIPALES DEL JUEGO
    // ===================================

    // Genera peluches con imágenes
    function generatePlushies() {
        if (generatedPlushies.length === MAX_PLUSHIES) return;
        
        toyArea.innerHTML = '';
        generatedPlushies = [];
        
        for (let i = 0; i < MAX_PLUSHIES; i++) {
            const plush = document.createElement('div');
            plush.classList.add('plush');
            
            // Crea un elemento de imagen y establece su src aleatoriamente
            const plushImage = document.createElement('img');
            plushImage.src = plushImagePaths[Math.floor(Math.random() * plushImagePaths.length)];
            plushImage.alt = "Peluche"; 
            plush.appendChild(plushImage); 
            
            // Posicionamiento de peluches (simulando 2 filas para 8 peluches)
            const randomLeft = 10 + Math.random() * 80; 
            // 8 peluches en 2 filas (4 por fila)
            const row = Math.floor(i / (MAX_PLUSHIES / 2)); 
            
            plush.style.left = `${randomLeft}%`;
            plush.style.bottom = `${10 + row * 40}px`; // Un poco más de espacio vertical
            
            toyArea.appendChild(plush);
            generatedPlushies.push(plush); 
        }
        alert(`¡Máquina rellenada con ${MAX_PLUSHIES} nuevos peluches!`);
        checkRefillButton();
    }

    // Inicia el temporizador
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timeLeft = 30;
        timeDisplay.textContent = timeLeft;
        timeDisplay.style.color = '#ff3377'; 

        timerInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;

            if (timeLeft <= 5) {
                timeDisplay.style.color = '#ff0000';
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (isGameActive) {
                    alert('¡Tiempo agotado! Turno perdido.');
                    resetClaw(false); 
                }
            }
        }, 1000);
    }
    
    // Habilita controles si hay jugadas disponibles
    function activateGame() {
        if (plays > 0 && !isGameActive) {
            isGameActive = true;
            disableControls(false); 
            startTimer();
        } else if (plays <= 0) {
             alert('Necesitas insertar una moneda (botón "JUGAR") para obtener una jugada.');
        }
    }

    // Movimiento de la garra (4 direcciones)
    function moveClaw(direction) {
        activateGame(); 
        if (!isGameActive) return;

        clawImage.style.transition = 'all 0.1s linear';
        clawRope.style.transition = 'left 0.1s linear';

        switch (direction) {
            case 'left':
                clawPositionX = Math.max(5, clawPositionX - STEP);
                break;
            case 'right':
                clawPositionX = Math.min(95, clawPositionX + STEP);
                break;
            case 'up':
                clawPositionY = Math.max(MIN_Y, clawPositionY - STEP * 2);
                break;
            case 'down':
                clawPositionY = Math.min(MAX_Y, clawPositionY + STEP * 2); 
                break;
        }

        clawRope.style.left = `${clawPositionX}%`;
        clawImage.style.left = `${clawPositionX}%`;
        clawImage.style.top = `${clawPositionY}px`;
    }

    // Lanza la garra
    function dropClaw() {
        if (!isGameActive || plays <= 0) return;
        
        clearInterval(timerInterval); 
        isGameActive = false;
        disableControls(true); 

        plays--;
        playsDisplay.textContent = plays;
        
        clawImage.style.transition = 'top 1.5s ease-in';
        clawImage.style.top = `${MAX_Y}px`; 

        setTimeout(() => {
            let caughtPlush = null;
            const clawCenterX = clawPositionX; 
            const activePlushies = generatedPlushies.filter(p => p.parentNode === toyArea); 
            
            // Lógica de colisión
            activePlushies.forEach(plush => {
                const plushLeft = parseFloat(plush.style.left.replace('%', ''));
                if (Math.abs(clawCenterX - plushLeft) < 8 && !caughtPlush) { 
                    caughtPlush = plush;
                }
            });

            // Captura (éxito del 60%)
            if (caughtPlush && Math.random() > 0.4) { 
                
                // 1. El peluche sube con la garra
                caughtPlush.style.transition = 'all 1.5s ease-out';
                caughtPlush.style.left = `${clawPositionX}%`; 
                caughtPlush.style.top = `${MIN_Y + 60}px`; 
                
                setTimeout(() => {
                    // 2. Mover la garra (y peluche) hacia la caja
                    clawImage.style.transition = 'top 1s linear, left 1s ease-in-out';
                    clawRope.style.transition = 'left 1s ease-in-out';
                    
                    clawImage.style.left = '15%'; 
                    clawRope.style.left = '15%';
                    caughtPlush.style.transition = 'all 1s ease-in-out';
                    caughtPlush.style.left = '8%'; 
                    
                    setTimeout(() => {
                        // 3. Soltar el peluche
                        caughtPlush.style.transition = 'top 0.5s ease-in, opacity 0.5s';
                        caughtPlush.style.opacity = '0';
                        
                        setTimeout(() => {
                            caughtPlush.remove();
                            generatedPlushies = generatedPlushies.filter(p => p !== caughtPlush);
                            
                            score++;
                            scoreDisplay.textContent = `Peluches: ${score}`;
                            alert('✨ ¡PREMIO! Atrapaste un peluche. ✨');

                            resetClaw(true); 
                        }, 500);
                    }, 1000);
                }, 1500);

            } else {
                alert('¡Oh no! El peluche se resbaló. 😔 Inténtalo de nuevo.');
                resetClaw(true); 
            }
        }, 1500); 
    }
    
    function disableControls(state) {
        grabButton.disabled = state;
        leftButton.disabled = state;
        rightButton.disabled = state;
        upButton.disabled = state;
        downButton.disabled = state;
    }

    function resetClaw(startNewTurn) {
        clearInterval(timerInterval);
        timeLeft = 30;
        timeDisplay.textContent = 30;
        timeDisplay.style.color = '#ff3377'; 

        clawImage.style.transition = 'top 0.5s linear, left 0.5s ease-in-out';
        clawRope.style.transition = 'left 0.5s ease-in-out';
        
        clawPositionX = 50;
        clawPositionY = MIN_Y;
        clawImage.style.left = `${clawPositionX}%`;
        clawRope.style.left = `${clawPositionX}%`;
        clawImage.style.top = `${clawPositionY}px`; 

        isGameActive = false;
        disableControls(true);
        
        checkRefillButton();
    }
    
    // Inserta una moneda (aumenta jugadas en 1)
    function insertCoin() {
        plays++;
        playsDisplay.textContent = plays;
        alert('¡Moneda insertada! Tienes 1 jugada.');
        checkRefillButton();
        activateGame(); 
    }

    // Chequea si el botón de Rellenar Peluches debe estar visible
    function checkRefillButton() {
        // Muestra el botón si hay menos de la mitad de los peluches originales
        if (generatedPlushies.length < MAX_PLUSHIES / 2) { 
            refillPlushButton.classList.remove('hidden');
        } else {
            refillPlushButton.classList.add('hidden');
        }
    }


    // ===================================
    // 4. EVENTOS Y SETUP INICIAL
    // ===================================
    leftButton.addEventListener('click', () => moveClaw('left'));
    rightButton.addEventListener('click', () => moveClaw('right'));
    upButton.addEventListener('click', () => moveClaw('up'));
    downButton.addEventListener('click', () => moveClaw('down'));
    grabButton.addEventListener('click', dropClaw);
    
    coinButton.addEventListener('click', insertCoin);
    
    refillPlushButton.addEventListener('click', generatePlushies);

    // Inicializar
    generatePlushies(); 
    playsDisplay.textContent = plays;
    scoreDisplay.textContent = `Peluches: ${score}`;
    
    resetClaw(false); 
});