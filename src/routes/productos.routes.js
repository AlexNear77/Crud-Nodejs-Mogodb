// IMPORTACIONES MODULS //
const {Router} = require('express');
const router = Router();

const { renderProductForm, 
   createNewProduct ,
   renderProductos,
   renderEditForm, 
   updateProduct, 
   deleteProduct
} = require('../controllers/productos.controller');

const { isAuthenticated } = require('../helpers/validaRutas');

// Nuevo Producto
router.get('/productos/add', isAuthenticated, renderProductForm);
router.post('/productos/new-product', isAuthenticated, createNewProduct);

//Obtener Todas las rutas
router.get('/productos', isAuthenticated,renderProductos);

//editar Productos
router.get('/productos/edit/:id', isAuthenticated,renderEditForm);
router.put('/productos/edit/:id', isAuthenticated,updateProduct);

//Eliminar Producto
router.delete('/productos/delete/:id',isAuthenticated, deleteProduct);

module.exports = router;