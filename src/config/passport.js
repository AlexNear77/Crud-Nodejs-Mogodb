const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

//Nota aqui todaviamos podemos validar si el correo realmente es un correo, etc.

passport.use(new localStrategy({ //'login', con eso cuando lo utilizemos en el controllador de users al requirir passoport podremos user passport.login pero el puto de fazt no lo hizo asi
   usernameField: 'email',
   passwordField: 'password'
}, async (email,password,done) => {
    //Comprobamos si el correo conicide con la del user registrado
    const user = await User.findOne({email});
    if (!user) {
       return done(null,false,{message: 'Usuario no encontrado'});
    }else{
       //Ahora validamos la contraseña
       const match = await user.matchContraseña(password);
       if (match) {
          return done(null,user);
       }else
         return done(null,false,{message: 'Contraseña incorrecta'});
    }
}));

passport.serializeUser((user,done) =>{
   done(null,user.id);
}); // passport.serializeUser recibe una funcion y esa funcion resive un usario y una funciom callback para terminar

passport.deserializeUser((id, done) =>{
   User.findById(id, (err,user) => {
      done(err,user); //si existe un error manda un error si existe un usuario manda el user
   })
});