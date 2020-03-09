const productsCtrl = {};
const Producto = require('../models/Producto');

productsCtrl.renderProductForm = (req,res) =>{
   res.render('productos/new-product');
};

productsCtrl.createNewProduct = async (req,res) =>{
   const {nombre, descripcion,marca,distribuidor,precioCompra,precioVenta} = req.body;
   const newProducto = new Producto({nombre, descripcion,marca,distribuidor,precioCompra,precioVenta});
   newProducto.user = req.user.id; // CON ESTO YA LE ASIGNAMOS AL USUARIO LA NOTA
   await newProducto.save();
   req.flash('success_msg','Producto agregado');
   res.redirect('/productos');
};

productsCtrl.renderProductos = async (req,res) =>{
   const productos = await Producto.find({user: req.user.id}).sort({createdAt:'desc'}); //Hacemos una peticion a la bd, lo filtramos segun si el usuario le pertenece y lo ordenamos por fecha de manera desendente
   res.render('productos/all-products', {productos});
};

productsCtrl.renderEditForm = async (req,res) =>{
   const producto = await Producto.findById(req.params.id);
   if(producto.user != req.user.id){ // si el producto en su propiedad usuario es distinto al usuario actual...
      req.flash('error_msg', 'No autorizado');
      res.redirect('/productos');
   }
   res.render('productos/edit-product', {producto});
};

productsCtrl.updateProduct = async (req,res) =>{
   const {nombre, descripcion,marca,distribuidor,precioCompra,precioVenta} = req.body;
   await Producto.findByIdAndUpdate(req.params.id, {nombre, descripcion,marca,distribuidor,precioCompra,precioVenta})
   req.flash('succes_msg','Producto actualializado correctamente');
   res.redirect('/productos');
};

productsCtrl.deleteProduct = async (req,res) =>{
   await Producto.findByIdAndDelete(req.params.id);
   req.flash('success_msg','Producto eliminado satisfactoriamente');
   res.redirect('/productos');
};

module.exports = productsCtrl;