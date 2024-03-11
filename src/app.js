import express from 'express';
const app = express();
import productsRoutes from './routes/products.routes.js';


app.use(express.json()); //recibir en formato json
app.use(productsRoutes);



export default app; //exporta el app para ser utilizado desde otro archivo
