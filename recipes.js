document.addEventListener('DOMContentLoaded', () => {
    const dessertSelection = document.getElementById('dessert-selection-menu');
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const recipeFormContainer = document.getElementById('recipe-form-container');
    const recipeForm = document.getElementById('recipe-form');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    const userRecipesContainer = document.getElementById('user-recipes-container');
    const recipeDisplayContainer = document.getElementById('recipe-display-container');
    
    // Objeto con las recetas predeterminadas
    const predefinedRecipes = {
        flan: {
            title: "Flan Kawaii",
            image: "images/flann.jpeg",
            description: "El flan de la abuela, con un toque muy lindo.",
            ingredients: [
                "5 huevos",
                "1 lata de leche condensada",
                "1 lata de leche evaporada",
                "1 cucharadita de extracto de vainilla",
                "1/2 taza de azúcar para el caramelo"
            ],
            instructions: [
                "Precalienta el horno a 180°C (350°F).",
                "En una olla, derrite el azúcar a fuego medio hasta que se forme un caramelo dorado. Vierte el caramelo en el molde.",
                "En una licuadora, mezcla los huevos, la leche condensada, la leche evaporada y la vainilla.",
                "Vierte la mezcla en el molde sobre el caramelo.",
                "Hornea a baño maría por 60 minutos o hasta que al insertar un palillo, este salga limpio.",
                "Deja enfriar y refrigera por 4 horas antes de desmoldar."
            ]
        },
        karlota: {
            title: "Karlota",
            image: "images/karlota.jpeg",
            description: "Una deliciosa Karlota de limón, fresca y fácil de preparar.",
            ingredients: [
                "1 lata de leche condensada",
                "1 lata de leche evaporada",
                "Jugo de 4 limones",
                "1 paquete de galletas Marías"
            ],
            instructions: [
                "En la licuadora, mezcla la leche condensada, la leche evaporada y el jugo de limón hasta que espese.",
                "En un molde, coloca una capa de galletas y luego una capa de la mezcla.",
                "Repite las capas hasta terminar con la mezcla.",
                "Refrigera por al menos 2 horas o hasta que esté firme."
            ]
        },
        pay_de_queso: {
            title: "Pay de Queso",
            image: "images/pay.jpeg",
            description: "El clásico y cremoso pay de queso, perfecto para cualquier ocasión.",
            ingredients: [
                "1 paquete de galletas Marías molidas",
                "1/2 barra de mantequilla derretida",
                "1 paquete de queso crema (190 g)",
                "1 lata de leche condensada",
                "1 huevo",
                "1 cucharadita de extracto de vainilla"
            ],
            instructions: [
                "Mezcla las galletas molidas con la mantequilla derretida y presiona en un molde para pay.",
                "Hornea la base por 10 minutos a 180°C.",
                "Mientras, licúa el queso crema, la leche condensada, el huevo y la vainilla.",
                "Vierte la mezcla sobre la base y hornea por 30-40 minutos o hasta que el centro esté firme."
            ]
        },
        tarta_de_chocolate: {
            title: "Tarta de Chocolate",
            image: "images/tarta.jpeg",
            description: "Una tarta irresistible para los amantes del chocolate.",
            ingredients: [
                "200g de chocolate negro",
                "200ml de nata para montar",
                "1 base de tarta quebrada (comprada o hecha en casa)",
                "Frutas rojas para decorar (opcional)"
            ],
            instructions: [
                "Derrite el chocolate al baño maría o en el microondas.",
                "Calienta la nata en una olla sin que hierva y mézclala con el chocolate derretido hasta obtener una ganache homogénea.",
                "Vierte la mezcla sobre la base de tarta y refrigera por 4 horas o hasta que esté firme.",
                "Decora con frutas rojas antes de servir."
            ]
        },
        pastafrola: {
            title: "Pastafrola",
            image: "images/pastafrola.jpeg",
            description: "Una deliciosa tarta de dulce de membrillo, un clásico argentino.",
            ingredients: [
                "300g de harina",
                "150g de mantequilla fría",
                "1 huevo",
                "100g de azúcar",
                "1 pizca de sal",
                "400g de dulce de membrillo",
                "Agua (si es necesario)"
            ],
            instructions: [
                "Forma un arenado con la harina, la mantequilla, el azúcar y la sal. Agrega el huevo y une la masa.",
                "Cubre el molde con 2/3 de la masa. Reserva el resto para las tiras.",
                "Ablanda el dulce de membrillo con un poco de agua si es necesario y rellena la base.",
                "Con el resto de la masa, haz tiras y forma un enrejado sobre el dulce.",
                "Hornea a 180°C por 30-40 minutos o hasta que esté dorada."
            ]
        }
    };

    // Función para renderizar la receta de un postre
    function renderRecipe(recipeData, isUserRecipe = false, index = null) {
        // Limpiamos el contenedor antes de mostrar la nueva receta
        recipeDisplayContainer.innerHTML = '';
        
        const recipeBox = document.createElement('div');
        recipeBox.className = 'recipe-box';
        
        // Agregar la imagen si existe
        if (recipeData.image) {
            const recipeImage = document.createElement('img');
            recipeImage.src = recipeData.image;
            recipeImage.alt = recipeData.title;
            recipeImage.className = 'dessert-image';
            recipeBox.appendChild(recipeImage);
        }

        // Agregar los detalles de la receta
        const titleElement = document.createElement('h3');
        titleElement.textContent = recipeData.title;
        recipeBox.appendChild(titleElement);
        
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = recipeData.description || '';
        if(recipeData.description) recipeBox.appendChild(descriptionElement);
        
        const ingredientsTitle = document.createElement('h4');
        ingredientsTitle.textContent = "Ingredientes:";
        recipeBox.appendChild(ingredientsTitle);

        const ingredientsList = document.createElement('ul');
        if (Array.isArray(recipeData.ingredients)) {
            recipeData.ingredients.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ingredientsList.appendChild(li);
            });
        } else {
            const p = document.createElement('p');
            p.textContent = recipeData.ingredients.replace(/\n/g, '<br>');
            recipeBox.appendChild(p);
        }
        recipeBox.appendChild(ingredientsList);
        
        const instructionsTitle = document.createElement('h4');
        instructionsTitle.textContent = "Preparación:";
        recipeBox.appendChild(instructionsTitle);
        
        const instructionsList = document.createElement('ol');
        if (Array.isArray(recipeData.instructions)) {
            recipeData.instructions.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                instructionsList.appendChild(li);
            });
        } else {
            const p = document.createElement('p');
            p.textContent = recipeData.instructions.replace(/\n/g, '<br>');
            recipeBox.appendChild(p);
        }
        recipeBox.appendChild(instructionsList);

        if (isUserRecipe) {
            recipeBox.classList.add('user-recipe-box');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'x';
            deleteButton.dataset.index = index;
            recipeBox.appendChild(deleteButton);
        }

        recipeDisplayContainer.appendChild(recipeBox);
        recipeDisplayContainer.classList.remove('hidden');
    }

    // Manejar clics en los botones de postres predeterminados
    const dessertButtons = document.querySelectorAll('.dessert-button');
    dessertButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dessertKey = button.dataset.dessert;
            const recipe = predefinedRecipes[dessertKey];
            if (recipe) {
                dessertSelection.classList.add('hidden');
                recipeFormContainer.classList.add('hidden');
                renderRecipe(recipe);
            }
        });
    });

    // Manejar el botón para agregar una nueva receta
    addRecipeBtn.addEventListener('click', () => {
        dessertSelection.classList.add('hidden');
        recipeDisplayContainer.classList.add('hidden');
        recipeFormContainer.classList.remove('hidden');
    });

    // Manejar el botón para cancelar el formulario
    cancelFormBtn.addEventListener('click', () => {
        recipeFormContainer.classList.add('hidden');
        dessertSelection.classList.remove('hidden');
    });

    // Función para cargar las recetas del almacenamiento local
    function loadUserRecipes() {
        const recipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
        userRecipesContainer.innerHTML = '';
        recipes.forEach((recipe, index) => {
            renderUserRecipe(recipe, index);
        });
    }

    // Función para renderizar una receta de usuario
    function renderUserRecipe(recipe, index) {
        const recipeBox = document.createElement('div');
        recipeBox.className = 'recipe-box user-recipe-box';
        recipeBox.innerHTML = `
            <h3>${recipe.title}</h3>
            <h4>Ingredientes:</h4>
            <p>${recipe.ingredients.replace(/\n/g, '<br>')}</p>
            <h4>Preparación:</h4>
            <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>
            <button class="delete-button" data-index="${index}">x</button>
        `;
        userRecipesContainer.appendChild(recipeBox);
    }
    
    // Manejar el envío del formulario
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newRecipe = {
            title: document.getElementById('recipe-title').value,
            ingredients: document.getElementById('recipe-ingredients').value,
            instructions: document.getElementById('recipe-instructions').value
        };

        const recipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
        recipes.push(newRecipe);
        localStorage.setItem('userRecipes', JSON.stringify(recipes));

        recipeForm.reset();
        recipeFormContainer.classList.add('hidden');
        dessertSelection.classList.remove('hidden'); // Volver al menú de selección
        loadUserRecipes();
    });

    // Manejar la eliminación de recetas
    userRecipesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            const indexToDelete = e.target.dataset.index;
            const recipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
            recipes.splice(indexToDelete, 1);
            localStorage.setItem('userRecipes', JSON.stringify(recipes));
            loadUserRecipes();
        }
    });

    // Cargar recetas de usuario al inicio
    loadUserRecipes();
});