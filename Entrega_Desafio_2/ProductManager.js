const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            products.push(product);
            await this.saveProducts(products);
        } catch (error) {
            throw new Error('Error al agregar producto: ' + error.message);
        }
    }

    async getProducts() {
        try {
            if (!fs.existsSync(this.filePath)) {
                return [];
            }
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error('Error al obtener productos: ' + error.message);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === id);
        } catch (error) {
            throw new Error('Error al obtener producto by id: ' + error.message);
        }
    }

    async updateProduct(id, updated) {
        try {
            const productToUpdate = await this.getProductById(id);
            if (productToUpdate) {
                const products = await this.getProducts();
                const index = products.findIndex(product => product.id === id);
                products[index] = { ...products[index], ...updated };
                await this.saveProducts(products);
                console.log('Producto actualizado');
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            throw new Error('Error al actualizar producto: ' + error.message);
        }
    }
    
    async deleteProduct(id) {
        try {
            const productToDelete = await this.getProductById(id);
            if (productToDelete) {
                const products = await this.getProducts();
                const index = products.findIndex(product => product.id === id);
                products.splice(index, 1);
                await this.saveProducts(products);
                console.log('Producto eliminado');
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
    

    async saveProducts(products) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2), 'utf-8');
        } catch (error) {
            throw new Error('Error al guardar el producto: ' + error.message);
        }
    }
}

module.exports = ProductManager;
