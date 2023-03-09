const Role = require ('../models/role');
const User = require ('../models/user');

const esRoleValido = async( rol = '' ) => {
    const existRol = await Role.findOne({ rol });
    if ( !existRol ) {
            throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
};

const emailExiste = async (email = '')=>{
    const emailvalido = await User.findOne ({ email });
    if ( emailvalido){
            throw new Error(`El correo  ${ email } que ingresó ya está registrado`)
    }
};

const existUserByID = async (id = '')=>{
    const existUser = await User.findById ( id );
    if ( !existUser){
            throw new Error(`El id  ${ id } no existe`)
    }
};



module.exports = {
    esRoleValido,
    emailExiste,
    existUserByID
}