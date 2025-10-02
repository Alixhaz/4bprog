// server.js

// Importación de librerías y módulos
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

// Inicialización de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Permite solicitudes de diferentes orígenes (necesario para el frontend)
app.use(cors());
// Permite al servidor entender datos en formato JSON
app.use(express.json());
// Sirve los archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------------------------------------
// CONEXIÓN A MONGODB
// -------------------------------------------------------------

const MONGODB_URI = 'mongodb://localhost:27017/mi_proyecto_web';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// -------------------------------------------------------------
// ESQUEMAS Y MODELOS DE MONGODB
// -------------------------------------------------------------

// Esquema para usuarios
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Esquema para recetas
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    imageUrl: { type: String, required: false },
    isFixed: { type: Boolean, default: false }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Datos de las 5 recetas fijas
const fixedRecipes = [
    {
        title: 'Carlota de Limón',
        ingredients: ['1 lata de leche evaporada', '1 lata de leche condensada', '1/2 taza de jugo de limón', '1 paquete de galletas Marías', '1/2 taza de crema para batir'],
        steps: ['En un bowl, mezcla la leche evaporada, leche condensada y el jugo de limón hasta que espese.', 'En un refractario, coloca una capa de galletas, luego una capa de la mezcla de limón.', 'Repite las capas hasta terminar con la mezcla.', 'Refrigera por al menos 4 horas antes de servir.'],
        imageUrl: '/images/carlota.jpg',
        isFixed: true
    },
    {
        title: 'Pay de Queso',
        ingredients: ['1 paquete de galletas de vainilla', '90g de mantequilla derretida', '1 paquete de queso crema', '1/2 taza de azúcar', '1 huevo', '1 cucharadita de vainilla'],
        steps: ['Tritura las galletas y mézclalas con la mantequilla.', 'Presiona la mezcla en la base de un molde para pay.', 'Bate el queso crema, el azúcar, el huevo y la vainilla hasta obtener una mezcla suave.', 'Vierte la mezcla sobre la base de galletas y hornea por 25-30 minutos a 180°C.'],
        imageUrl: '/images/pay_queso.jpg',
        isFixed: true
    },
    {
        title: 'Chocoflan',
        ingredients: ['1 caja de harina para pastel de chocolate', '1 lata de leche condensada', '1 lata de leche evaporada', '5 huevos', '1 taza de azúcar', '1 cucharada de vainilla'],
        steps: ['Prepara el pastel de chocolate según las instrucciones de la caja y viértelo en un molde engrasado.', 'En una licuadora, mezcla los ingredientes para el flan.', 'Vierte la mezcla de flan sobre la del pastel.', 'Hornea a baño maría por 60-70 minutos.', 'Deja enfriar y desmolda.'],
        imageUrl: '/images/chocoflan.jpg',
        isFixed: true
    },
    {
        title: 'Tarta de Chocolate',
        ingredients: ['200g de galletas de chocolate', '100g de mantequilla derretida', '250g de chocolate semi-amargo', '200ml de crema para batir', '3 huevos', 'Azúcar al gusto'],
        steps: ['Tritura las galletas y mézclalas con la mantequilla.', 'Presiona en un molde y refrigera por 30 minutos.', 'Calienta la crema y vierte sobre el chocolate para derretirlo.', 'Agrega los huevos y mezcla.', 'Vierte la mezcla en el molde y hornea por 20 minutos a 180°C.'],
        imageUrl: '/images/tarta_chocolate.jpg',
        isFixed: true
    },
    {
        title: 'Pastafrola',
        ingredients: ['250g de harina', '125g de mantequilla fría', '100g de azúcar', '1 huevo', '1 yema de huevo', '250g de dulce de membrillo'],
        steps: ['Forma una masa con la harina, mantequilla, azúcar, huevo y yema.', 'Divide la masa en dos partes: una más grande para la base y otra para las tiras.', 'Estira la masa de la base y colócala en un molde.', 'Rellena con el dulce de membrillo ablandado y forma las tiras de masa para la parte superior.', 'Hornea por 30-40 minutos a 180°C.'],
        imageUrl: '/images/pastafrola.jpg',
        isFixed: true
    }
];

// Función para insertar las recetas fijas solo si la base de datos está vacía
const insertFixedRecipes = async () => {
    try {
        const count = await Recipe.countDocuments({ isFixed: true });
        if (count === 0) {
            await Recipe.insertMany(fixedRecipes);
            console.log('✅ Recetas fijas insertadas correctamente.');
        } else {
            console.log('Recetas fijas ya existen en la base de datos.');
        }
    } catch (error) {
        console.error('❌ Error al insertar recetas fijas:', error);
    }
};

// Se llama a la función para insertar las recetas al iniciar el servidor
mongoose.connection.on('connected', () => {
    insertFixedRecipes();
});

// -------------------------------------------------------------
// RUTAS DE LA API
// -------------------------------------------------------------

// Ruta de registro de usuario
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar usuario. El email ya existe.' });
    }
});

// Ruta de login de usuario
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Credenciales inválidas.' });
        }
        // Comparar la contraseña ingresada con la encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Credenciales inválidas.' });
        }
        res.json({ message: 'Login exitoso.' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
});

// Obtener todas las recetas
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las recetas.' });
    }
});

// Agregar una nueva receta
app.post('/api/recipes', async (req, res) => {
    try {
        const { title, ingredients, steps, imageUrl } = req.body;
        const newRecipe = new Recipe({
            title,
            ingredients,
            steps,
            imageUrl,
            isFixed: false // Las recetas agregadas por el usuario no son fijas
        });
        await newRecipe.save();
        res.status(201).json({ message: 'Receta agregada exitosamente.' });
    } catch (error) {
        res.status(400).json({ error: 'Error al agregar la receta.' });
    }
});

// Eliminar una receta
app.delete('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada.' });
        }
        if (recipe.isFixed) {
            return res.status(403).json({ message: 'No se pueden eliminar las recetas fijas.' });
        }
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: 'Receta eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la receta.' });
    }
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.send('API funcionando!');
});

// Manejo de rutas que no existen (middleware de 404)
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// -------------------------------------------------------------
// INICIAR EL SERVIDOR
// -------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});