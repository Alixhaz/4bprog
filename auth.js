document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginLink = document.getElementById('showLogin');
    const registerLink = document.getElementById('showRegister');
    const container = document.querySelector('.auth-container');

    // Maneja la visibilidad de los formularios
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('active');
    });

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('active');
    });

    // Lógica para el formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = 'home.html'; // Redirige a la página principal
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al intentar iniciar sesión.');
            }
        });
    }

    // Lógica para el formulario de registro
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = registerForm.email.value;
            const password = registerForm.password.value;

            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                alert(data.message || data.error);
                if (response.ok) {
                    // Si el registro es exitoso, cambia a la vista de login
                    container.classList.remove('active');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al intentar registrarse.');
            }
        });
    }
});