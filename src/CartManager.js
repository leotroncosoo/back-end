import { promises as fs } from 'fs';
import { ProductManager } from "./ProductManager.js";
const manager2 = new ProductManager();

export class CartManager {
    constructor() {
        this.carts = [];
        this.cartId = 1;
        this.DirPath = "./src/files";
        this.FilePath = this.DirPath + "/carro.json";
    }

    async initialize() {
        try {
            await fs.mkdir(this.DirPath, { recursive: true });
            const fileExists = await fs.access(this.FilePath)
                .then(() => true)
                .catch(() => false);
            if (!fileExists) {
                await fs.writeFile(this.FilePath, JSON.stringify([]));
            }
            console.log("CartManager inicializado correctamente.");
        } catch (error) {
            console.error("Error al inicializar CartManager:", error);
        }
    }




    async addProductToCart(cartId, productId) {
        try {
            // Leer el archivo Carts.json para validar la existencia del cartId
            const cartsData = await fs.readFile(this.FilePath, 'utf8');
            const carts = JSON.parse(cartsData);
            
            // Encontrar el carrito con el cartId proporcionado
            const cart = carts.find(cart => cart.id === cartId);
            if (!cart) {
                throw new Error(`El carrito con ID ${cartId} no existe.`);
            }
    
            // Leer el archivo Products.json para validar la existencia del productId
            const productsData = await fs.readFile(manager2.FilePath, 'utf8');
            const products = JSON.parse(productsData);
            const product = products.find(product => product.id === productId);
            if (!product) {
                throw new Error(`El producto con ID ${productId} no existe.`);
            }
    
            // Buscar si el producto ya está en el carrito
            const productInCartIndex = cart.products.findIndex(p => p.id === productId);
            if (productInCartIndex !== -1) {
                // Si el producto ya está en el carrito, aumentar su cantidad en 1
                cart.products[productInCartIndex].quantity++;
            } else {
                // Si el producto no está en el carrito, agregarlo con una cantidad de 1
                cart.products.push({ id: productId, quantity: 1 });
            }
    
            // Escribir los cambios de vuelta al archivo Carts.json
            await fs.writeFile(this.FilePath, JSON.stringify(carts, null, 2));
    
            return "Operación completada exitosamente";
        } catch (error) {
            throw error;
        }
    }
    

    async newCart() {
    try {
        // Leer datos existentes del archivo
        let existingCarts = [];
        try {
            const data = await fs.readFile(this.FilePath, 'utf8');
            existingCarts = JSON.parse(data);
        } catch (readError) {
            console.error("Error al leer el archivo de carritos:", readError);
        }

        // Generar un nuevo ID único
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2);       

        // Crear un nuevo carrito vacío
        const newCart = { id, products: [] };

        // Agregar el nuevo carrito a la lista existente
        existingCarts.push(newCart);

        // Escribir la lista actualizada de carritos en el archivo
        await fs.writeFile(this.FilePath, JSON.stringify(existingCarts, null, 2));

        console.log("Carrito agregado.");
    } catch (error) {
        console.error("Error al agregar el carrito:", error.message);
    }
}










    validateRequiredFields({ title, description, code, price, status, stock, category }) {
        // Verificar que todos los campos requeridos estén presentes y no sean nulos o vacíos
        if (!title || !description || !code || !price || !status || !stock || !category) {
            throw new Error("Todos los campos son obligatorios.");
        }
    }
    
    async checkDuplicateCode(id) {
        // Leer datos existentes del archivo
        const data = await fs.readFile(this.FilePath, 'utf8');
        const products = JSON.parse(data);        
    
        // Verificar si hay algún producto con el mismo código
        if (products.some(product => product.id === id)) {
            throw new Error("El código del producto ya existe.");
        }
    }
    

    async productsInCart(cartId) {
        try {
            // Leer el archivo Carts.json para validar la existencia del cartId
            const cartsData = await fs.readFile(this.FilePath, 'utf8');
            const carts = JSON.parse(cartsData);
    
            // Encontrar el carrito con el cartId proporcionado
            const cart = carts.find(cart => cart.id === cartId);
            if (!cart) {
                throw new Error(`El carrito con ID ${cartId} no existe.`);
            }
    
            // Leer el archivo Products.json para obtener los detalles de los productos
            const productsData = await fs.readFile(manager2.FilePath, 'utf8');
            const products = JSON.parse(productsData);
    
            // Obtener los detalles completos de los productos en el carrito
            const productsInCart = cart.products.map(cartProduct => {
                const productDetails = products.find(product => product.id === cartProduct.id);
                return {
                    ...cartProduct,
                    details: productDetails
                };
            });
    
            return productsInCart;
        } catch (error) {
            throw error;
        }
    }
    

    



}