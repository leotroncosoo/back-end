import {Router} from 'express';
const router = Router();

import { CartManager } from "../CartManager.js";
const manager = new CartManager();



//CREAR NUEVO CARRO
router.get('/:cid', async (req, res) => {
    try {

        const cartId = req.params.cid;
        const products = await manager.productsByCart(cartId);
        res.send(products);
        //res.status(201).send("Carro creado satisfactoriamente"); // 201: Created
    } catch (error) {
        console.error("Hubo un error al crear el carro", error);
        res.status(500).send("Error interno del servidor");
    }
});



//CREAR NUEVO CARRO
router.post('/', async (req, res) => {
    try {
        const carts = await manager.newCart();
        res.send(carts);
        //res.status(201).send("Carro creado satisfactoriamente"); // 201: Created
    } catch (error) {
        console.error("Hubo un error al crear el carro", error);
        res.status(500).send("Error interno del servidor");
    }
});


//AGREGAR PRODUCTO AL CARRO
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        
        const cartId = req.params.cid;
        const productId = req.params.pid;
        //let {productId} = req.params

        console.log ("ID CARRO ENVIADO");
        console.log (cartId);
        console.log ("ID PRODUCTO ENVIADO");
        console.log (productId);            
        
        
        const carts = await manager.addProductToCart(cartId,productId);
        res.send(carts);
        //res.status(201).send("Carro creado satisfactoriamente"); // 201: Created
    } catch (error) {
        console.error("Hubo un error al agregar el producto al carro", error);
        res.status(500).send("Error interno del servidor");
    }
});

// LISTAR PRODUCTOS DE UN CARRITO ESPECÍFICO
router.get('/:cid/products', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productsInCart = await manager.productsInCart(cartId);
        res.send(productsInCart);
    } catch (error) {
        console.error("Hubo un error al obtener los productos del carrito", error);
        res.status(500).send("Error interno del servidor");
    }
});






export default router;