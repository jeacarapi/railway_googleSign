

const {Schema, model} = require ('mongoose');

const RoleSchema = Schema ({
    rol:{
        type: String,
        required: [true, ' El rol es obligatorio ']
    }
});



module.exports = model( 'Role', RoleSchema )




/***** NOTA IMPORTANTE: 
 * este archivo debe llamarse de la misma forma que la collection creada en MONGODB COMPASS.
 * pero sin la 's' al final.

* COLLECTION CREADA EN MONGO>>>>      roles
 * por lo tanto>>>>>>>>               role.js */
