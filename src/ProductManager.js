import { promises as fs } from 'fs';

export class ProductManager {
    constructor() {
        this.products = [];
        this.productId = 1;
        this.DirPath = "./src/files";
        this.FilePath = this.DirPath + "/Products.json";
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
            console.log("ProductManager inicializado correctamente.");
        } catch (error) {
            console.error("Error al inicializar ProductManager:", error);
        }
    }





 //LISTA CANTIDAD DE PRODUCTOS
    async getProduct(limit) {
        try {
            const data = await fs.readFile(this.FilePath, 'utf8');
            const products = JSON.parse(data);
            console.log("Contenido del archivo Products.json:");
            if (limit) {
                const limitedProducts = products.slice(0, limit);
                console.log(limitedProducts);
                return limitedProducts;
            } else {
                console.log(products);
                return products;
            }
        } catch (error) {
            console.error("Error al leer el archivo Products.json:", error);
            throw error;
        }
    }






//LISTA PRODUCTO POR SU ID
    async getProductById(id) {
        try {

            
            if (!id) {
                throw new Error("El ID del producto proporcionado no es válido.");
            }    
            const data = await fs.readFile(this.FilePath, 'utf8');
            const products = JSON.parse(data);
            //const product = products.find(product => product.id === parseInt(id));    
            const product = products.find(product => product.id === (id));    
            if (!product) {
                throw new Error("Producto no encontrado en el archivo.");
            }    
            return product;
        } catch (error) {            
            throw error;
        }
    }



//AGREGA UN PRODUCTO
    async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
        try {

            // Generar un nuevo ID único
            const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
            // Verificar que todos los campos requeridos estén presentes
            this.validateRequiredFields({ title, description, code, price, status, stock, category });            
            // Verificar duplicidad de código
            await this.checkDuplicateCode(id);    
            // Leer datos existentes del archivo
            let existingProducts = [];
            try {
                const data = await fs.readFile(this.FilePath, 'utf8');
                existingProducts = JSON.parse(data);
            } catch (readError) {
                console.error("Error al leer el archivo de productos:", readError);
            }            
            
            // Crear un nuevo producto
            const newProduct = { id, title, description, code, price, status, stock, category, thumbnails };
            
            // Agregar el nuevo producto a la lista existente
            existingProducts.push(newProduct);
            
            // Escribir la lista actualizada de productos en el archivo
            await fs.writeFile(this.FilePath, JSON.stringify(existingProducts, null, 2));
            
            console.log("Producto agregado.");
        } catch (error) {
            console.error("Error al agregar el producto:", error.message);
        }
    }
    


    async updateProduct(productId, updatedFields) {
        try {
            if (!productId) {
                throw new Error("El ID del producto proporcionado no es válido.");
            }

            const data = await fs.readFile(this.FilePath, 'utf8');
            let products = JSON.parse(data);
            
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex === -1) {
                throw new Error("Producto no encontrado en la lista.");
            }

            const productToUpdate = { ...products[productIndex] };
            for (const field in updatedFields) {
                if (field !== 'id') {
                    productToUpdate[field] = updatedFields[field];
                }
            }
            products[productIndex] = productToUpdate;

            await fs.writeFile(this.FilePath, JSON.stringify(products));
            console.log("Producto actualizado.");
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }



    async deleteProduct(productId) {
        try {
            if (!productId) {
                throw new Error("El ID del producto no es válido.");
            }

            const data = await fs.readFile(this.FilePath, 'utf8');
            let products = JSON.parse(data);

            console.log("********");
            console.log(products);
            console.log("********");

            const productToDeleteIndex = products.findIndex(product => product.id === productId);
            if (productToDeleteIndex === -1) {
                throw new Error("No se encontró ningún producto con el ID proporcionado.");
            }

            console.log("INDICE DEL PRODUCTO A ELIMINAR");
            console.log(productToDeleteIndex);

            const productToDelete = products[productToDeleteIndex];
            products.splice(productToDeleteIndex, 1);

            await fs.writeFile(this.FilePath, JSON.stringify(products));
            console.log("Producto eliminado:", productToDelete);
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            throw error;
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
}