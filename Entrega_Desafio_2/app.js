const ProductManager = require('./ProductManager.js');

const filePath = 'productos.json';

const productManager = new ProductManager(filePath);

async function testProductManager() {
    try {
        // Agregar algunos productos de ejemplo
    await productManager.addProduct({
        title: 'Camiseta River',
        description: 'Camiseta entrenamiento River',
        price: 50000,
        thumbnail: 'imagen1.jpg',
        code: 'P001',
        stock: 20
});

    await productManager.addProduct({
        title: 'Short River',
        description: 'Short entrenamiento River',
        price: 35000,
        thumbnail: 'imagen2.jpg',
        code: 'P002',
        stock: 15
});

        const allProducts = await productManager.getProducts();
        console.log('Todos los productos:', allProducts);

        const productId = 1;
        const productById = await productManager.getProductById(productId);
        console.log(`Producto con ID ${productId}:`, productById);

        await productManager.updateProduct(productId, {
            price: 35000,
            stock: 15
        });
        console.log('Producto actualizado');

        await productManager.deleteProduct(productId);
        console.log('Producto eliminado');

        const deletedProduct = await productManager.getProductById(productId);
        console.log(`Producto con ID ${productId}:`, deletedProduct);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testProductManager();