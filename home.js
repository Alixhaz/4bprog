// Archivo: home.js

document.addEventListener('DOMContentLoaded', () => {
    // Encuentra el botón de cerrar sesión
    const logoutButton = document.getElementById('logoutBtn');

    if (logoutButton) {
        // Añade el evento de click al botón
        logoutButton.addEventListener('click', () => {
            // Confirmación opcional para el usuario (buena práctica)
            const confirmLogout = confirm('¿Estás seguro de que quieres cerrar la sesión?');
            
            if (confirmLogout) {
                // *** REDIRECCIÓN PARA CERRAR SESIÓN ***
                // 
                // Opción 1: Redirige a una página de inicio de sesión/índice.
                // Si no tienes 'index.html', cámbialo a 'home.html' o a la página que desees.
                window.location.href = 'index.html'; 

                // --- Opcional: Si usas Local Storage (cookies simples) para simular login ---
                // localStorage.removeItem('isLoggedIn'); 
            }
        });
    }
    
    // Aquí puedes mantener la lógica de tu barra lateral (sidebar drawer) si la tienes.
    // ... (Tu código de toggle de la barra lateral, si existe)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarDrawer = document.querySelector('.sidebar-drawer-container'); // O el selector que uses
    
    if (sidebarToggle && sidebarDrawer) {
        sidebarToggle.addEventListener('click', () => {
            sidebarDrawer.classList.toggle('is-open'); 
        });
    }
});