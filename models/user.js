
//grabar data de usuario
// nombre, correo, password encripatado o en hash para impedir su robo
// img de perfil, rol, estado (activo, eliminado)
//google (si la cuenta fue creada por mi o ingreso por medio de cuenta de google)

/* 
{
    Full Name: 'Jose Ezequiel Acarapi Vega',
    Email: 'joseacarapi2017@gmail.com',
    password: '2311066lapaz',
    passwordEncript: '************',
    image: 'https://image.jpg',
    rol: 'cliente, gerente administrador, recepcion',
    estado: BOOLEAN 'cuenta activa = true, cuenta eliminada = false',
    google: BOOLEAN 'cuenta creada mediante cuenta de google = true, cuenta creada por mi sistema de autenticación = false'
} */ 


const { Schema, model } = require ('mongoose');

const UserSchema = Schema ({
    
    nombre: {
        type: String,
        required: [true, 'Este campo (nombre) es obligatorio']
    },
    
    email: {
        type: String,
        required: [true, 'Este campo (correo) es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Este campo (password) es obligatorio'], 
    },

    img: {
        type: String
    }, 

    rol: {
        type: String,
        required: true,
        /* Al tratar de ingresar VENTAS_ROLE con postman, no puede identificarlo debido a esta linea de comando. 
        una vez comentada instintivamente el sistema busca los roles en la DB donde si existe VENTAS_ROLE. Y de esta forma 
        puede ingresar informacion a DB. */
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    
    status: {
        type: Boolean,
        default: true, 
    },
    
    google: {
        type: Boolean,
        default: true
    }
}); 

UserSchema.methods.toJSON = function (){
    const { __v, password, _id,...user} = this.toObject();
    user.uid= _id; // CAMBIO DE NOMBRE DE _ID A UID
    // const { __v, password, ...user} = this.toObject();
    return user;
}


module.exports = model( 'User', UserSchema ); 