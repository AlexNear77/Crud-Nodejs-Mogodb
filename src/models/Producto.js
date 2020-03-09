
const {Schema, model} =require('mongoose');

const ProductSchema = new Schema({
   nombre:{
      type: String,
      required: true
   },
   descripcion:{
      type:String,
      required:true
   },
   marca:{
      type: String,
      required: true
   },
   distribuidor:{
      type:String,
      required: true
   },
   precioCompra:{
      type: String,
      required: true
   },
   precioVenta:{
      type: String,
      required: true
   },
   user: {
      type: String,
      required:true
   }
   //FALTA IMAGEN
}, {
   timestamps:true
});

module.exports = model('Producto',ProductSchema);