const { response } = require('express');
const jwt = require ('jsonwebtoken');
const User = require ('../models/user');

// un middleware se dispara con tres argumentos req, res, y next
const validarJWT = async (req= request, res = response, next) =>{
    
    const token = req.header('x-token');
    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try{
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        //leer el usuario  que corresponde al uid
        const user = await User.findById( uid );
        
        if( !user){
            return res.status(401).json({
                msg: 'Invalid Token - user doesnt exist in DB'
            })
        }
        //verificando si el uid esta en estado true
        if (!user.status){
            return res.status(401).json({
                msg: 'Invalid Token - user status: false '
            })
        }
        req.user = user;
        next();
    }catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'

        })
    }



    next();
}



module.exports = {
    validarJWT
}