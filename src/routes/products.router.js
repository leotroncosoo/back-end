import {Router} from 'express';
const router = Router();

import { ProductManager } from "../ProductManager.js";
const manager = new ProductManager();






//OBTENER TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const productos = await manager.getProduct();
        res.send(productos);
    } catch (error) {
        console.error("Hubo un error al obtener los productos", error);
        res.status(500).send("Error interno del servidor");
    }
});



//OBTENER LIMITE DE PRODUCTOS
router.get('/query', async (req, res) => {
    try {
        let datos = req.query;
        let limite = datos.limit;
        const productos = await manager.getProduct(limite)
        res.send(productos);
    } catch (error) {
        console.error("Hubo un error al obtener los productos", error);
        res.status(500).send("Error. El producto no existe");
    }
});

//DEVOLVER PRODUCTO SEGUN SU ID
router.get('/:pid', async (req, res) => {
    try {

        const productId = req.params.pid;
        //let {productId} = req.params

        console.log ("LISTA PRODUCTO POR ID");
        console.log ("ID ENVIADO");
        console.log (productId);


        const productos = await manager.getProductById(productId)
        res.send(productos);
    } catch (error) {
        console.error("Hubo un error al obtener los productos", error);
        res.status(500).send("Error. El producto no existe");
    }
});


//AGREGAR UN PRODUCTO
router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status = true , stock, category, thumbnails } = req.body; 
        const productos = await manager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});






//ACTUALIZAR UN PRODUCTO
router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        console.log("ID PRODUCTO ENVIADO");
        console.log(productId);

        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        const updatedFields = { title, description, code, price, status, stock, category, thumbnails };

        const productos = await manager.getProductById(productId);
        if (!productId) {
            return res.status(404).json({ error: "Producto no encontrado." });
        }

               
        // Actualizar el producto
        await manager.updateProduct(productId, updatedFields);


        res.status(200).json({ message: "Producto actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar el producto." });
    }
});




// BORRAR UN DELETE
router.delete('/:pid', async (req, res) => {
    try {
        
        const productId = req.params.pid;
        console.log("ID PRODUCTO ENVIADO");
        console.log(productId);


        if (!productId) {
            return res.status(400).json({ error: "El ID del producto no es válido." });
        }

        await manager.deleteProduct(productId);
        res.status(200).json({ message: "Producto eliminado exitosamente." });
    } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
        res.status(500).json({ error: "Error interno del servidor al eliminar el producto." });
    }
});






/* 


// DELETE
router.delete('/:userId', async (req, res) => {
    let userId = parseInt(req.params.userId);
    // tomamos el tamanio del array antes de elimanr el registro
    const usersSize = users.length;
    // buscamos el registro por el id
    const userPosition = users.findIndex((u => u.id === userId));
    if (userPosition < 0) {
        return response.status(202).send({ status: "info", error: "Usuario no encontrado" });
    }
    // Eliminamos el registro
    users.splice(userPosition, 1);
    if (users.length === usersSize) {
        return response.status(500).send({ status: "error", error: "Usuario no se pudo borrar." });
    }
    res.send({ status: "Success", message: "Usuario Eliminado." }); //Si no se indica retorna status HTTP 200 OK.
})


 */










export default router;

