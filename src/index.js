const express = require('express');
const config = require('./config');
console.log('>>> Config leída:', config);

// --- Importaciones de Repositorios (MongoDB) ---
const MongoProductRepository = require('./infraestructure/repositories/MongoProductRepository');
const MongoOrderRepository = require('./infraestructure/repositories/MongoOrderRepository'); 
const MongoCouponRepository = require('./infraestructure/repositories/MongoCouponRepository'); 

// --- Importaciones de Repositorios (MySQL) - Mantener solo si los usas para Product ---
const MySQLProductRepository = require('./infraestructure/repositories/MySQLProductRepository');

// --- Importaciones de Controladores ---
const ProductController = require('./adapters/controllers/ProductController');
const OrderController = require('./adapters/controllers/OrderController'); 
const CouponController = require('./adapters/controllers/CouponController'); 

const AuthController = require('./adapters/controllers/AuthController'); 
const UserController = require('./adapters/controllers/UserController'); 
// const CategoryController = require('./adapters/controllers/CategoryController'); 

// --- Importaciones de Rutas ---
const productRoutes = require('./adapters/routes/productRoutes');
const orderRoutes = require('./adapters/routes/orderRoutes'); // NUEVO
const couponRoutes = require('./adapters/routes/couponRoutes'); // NUEVO
const authRoutes = require('./adapters/routes/AuthRoutes');
const userRoutes = require('./adapters/routes/userRoutes');
// const categoryRoutes = require('./adapters/routes/categoryRoutes'); 

// --- Importaciones de Middlewares de Autenticación ---
const { verifyToken, isAdmin, isUser } = require('./adapters/middlewares/authJwt'); // Asegúrate de importar todos los que uses

// --- Importaciones de Swagger (Documentación de API) ---
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./infraestructure/docs/swaggerConfig');

// --- Importaciones de Servicios y Casos de Uso existentes para Auth/User ---
const MongoUserRepository = require('./infraestructure/repositories/MongoUserRepository');
const PasswordHasher = require('./infraestructure/services/PasswordHasher');
const TokenGenerator = require('./infraestructure/services/TokenGenerator');
const SignIn = require('./application/useCases/SignIn');
const SignUp = require('./application/useCases/SignUp');

// --- Conexión a la Base de Datos (Mongoose) ---

require('./infraestructure/database/mongoose');


const app = express();
const port = config.port;

// --- Middlewares Globales ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

// --- Configuración de Repositorios (con selección de tipo de DB) ---
const dbType = config.DB_TYPE || 'mongodb';
let productRepository;
let orderRepository;   
let couponRepository;  

console.log('>>> DB_TYPE:', dbType);

if (dbType === 'mysql') {
  productRepository = new MySQLProductRepository();

} else {

  productRepository = new MongoProductRepository();
  orderRepository = new MongoOrderRepository();    
  couponRepository = new MongoCouponRepository();  
}

// --- Instanciación de Servicios y Casos de Uso Existentes (Auth/User) ---
const userRepo = new MongoUserRepository();
const passwordHasher = new PasswordHasher();
const tokenGen = new TokenGenerator();
const signInUseCase = new SignIn(userRepo, passwordHasher, tokenGen);
const signUpUseCase = new SignUp(userRepo, passwordHasher);

// --- Instanciación de Controladores (Existentes y Nuevos) ---

const authController = new AuthController(signInUseCase, signUpUseCase); 
const userController = new UserController(userRepo);
const productController = new ProductController(productRepository);


const orderController = new OrderController(orderRepository, productRepository);   

const couponController = new CouponController(couponRepository, orderRepository); 
// const categoryController = new CategoryController(/* ...dependencies */); // Si tienes este


// --- Configuración de Swagger UI ---
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// --- Conexión de Rutas de la API (Existentes y Nuevas) ---
app.use('/api/v1', express.json()); // Middleware para parsear JSON en todas las rutas bajo /api/v1


// Rutas de Autenticación y Usuarios
app.use('/api/v1/auth', authRoutes(authController));
app.use('/api/v1/users', userRoutes(userController)); 

// --- Rutas protegidas con verifyToken (se aplica a todas las rutas que usen este middleware) ---
app.use('/api/v1/products', verifyToken, productRoutes(productController));
app.use('/api/v1/orders', verifyToken, orderRoutes(orderController));   
app.use('/api/v1/coupons', verifyToken, couponRoutes(couponController));   


// --- Middleware de Manejo de Errores Global ---
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: 'Something went wrong on the server!', error: err.message });
});

// --- Iniciar Servidor ---
app.listen(port, () => {
  console.log(`E-commerce server running on port http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});


