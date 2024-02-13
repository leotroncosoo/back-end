
/*     async addProduct({ title, description, price, thumbnail, code, stock }) {
        try {            
            this.validateRequiredFields({ title, description, price, thumbnail, code, stock });
            //await this.checkDuplicateCode(code);
            const id = this.productId++;
            const product = { id, title, description, price, thumbnail, code, stock };
            this.products.push(product);
            await fs.writeFile(this.FilePath, JSON.stringify(this.products));
            console.log("Producto agregado.");
        } catch (error) {
            console.error("Error al agregar el producto:", error.message);
        }
    }
 */

/* ultimo bueno conocido

async addProduct({ title, description, price, thumbnail, code, stock }) {
        try {
            
    
            // Generación de un identificador único para el producto
            const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
            // Mostrar el identificador único generado
            console.log("Identificador único generado:", id);
    
            // Construcción del objeto de producto
            const product = { id, title, description, price, thumbnail, code, stock };
    
            // Agregar el producto a la lista de productos
            this.products.push(product);
            // Escribir los productos en el archivo
            await fs.writeFile(this.FilePath, JSON.stringify(this.products));
            // Mensaje de confirmación de que el producto ha sido agregado
            console.log("Producto agregado.");
        } catch (error) {
            // Manejo de errores en caso de fallo al agregar el producto
            console.error("Error al agregar el producto:", error.message);
        }
    }
    
 */



















/* 

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        try {            
            
            
        console.log("RECIBIDOS")            
        console.log(`titulo: ${title}`);
        console.log(`descripcion: ${description}`);
        console.log(`precio: ${price}`);
        console.log(`imagne: ${thumbnail}`);
        console.log(`codigo: ${code}`);
        console.log(`stock: ${stock}`);
            
            //this.validateRequiredFields({ title, description, price, thumbnail, code, stock });
            
            
            //await this.checkDuplicateCode(code);

            //const id = this.productId++;

            // Generar un identificador único simple
            const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
            // Mostrar el identificador único
            console.log("Identificador único generado:", id);

            

            
            const product = { id, title, description, price, thumbnail, code, stock };
            
          
            
            this.products.push(product);
            await fs.writeFile(this.FilePath, JSON.stringify(this.products));
            console.log("Producto agregado.");
        } catch (error) {
            console.error("Error al agregar el producto:", error.message);
        }
    }
 */








/* 
async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
    try {
        
        // Asignación de valor por defecto a 'status' si no está presente
        const status = true;

        // Validación de campos obligatorios
        //this.validateRequiredFields({ title, description, code, price, status, stock, category });

        // Validación de tipo de datos
        //this.validateDataTypes({ title, description, code, price, status, stock, category, thumbnails });

        // Comprobación de código duplicado
        await this.checkDuplicateCode(code);

        

        const id = this.productId++;
        const product = { id, title, description, code, price, status, stock, category, thumbnails };
        this.products.push(product);
        await fs.writeFile(this.FilePath, JSON.stringify(this.products));
        console.log("Producto agregado.");
    } catch (error) {
        console.error("Error al agregar el producto:", error.message);
    }
}

validateRequiredFields({ title, description, code, price, status, stock, category }) {
    if (!title || !description || !code || !price || status || !stock || !category) {
        throw new Error("Todos los campos son obligatorios.");
    }
}

validateDataTypes({ title, description, code, price, status, stock, category, thumbnails }) {
    if (typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof code !== 'string' ||
        typeof price !== 'number' ||
        typeof status !== 'boolean' ||
        typeof stock !== 'number' ||
        (category && typeof category !== 'string') ||
        (thumbnails && !Array.isArray(thumbnails)) ||
        (thumbnails && thumbnails.some(thumbnail => typeof thumbnail !== 'string'))) {
        throw new Error("Tipos de datos inválidos.");
    }
    
    // Mensajes específicos para cada tipo de dato de correo electrónico ingresado
   
    
   
    
    
}



async checkDuplicateCode(code) {
    const data = await fs.readFile(this.FilePath, 'utf8');
    const products = JSON.parse(data);
    if (products.some(product => product.code === code)) {
        throw new Error("El código del producto ya existe.");
    }
}

 */
