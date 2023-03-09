const { response } = require ('express');
const bcryptjs = require ('bcryptjs');
const { generarJWT } = require ('../helpers/gen-jwt');
const User = require('../models/user');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) =>{

    const { email, password }= req.body;


    try {
        //verificar si el email existe
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                msg: 'User / password no son correctos - email'
            })
        }
        // verificar si el usuario esta activo
        if( !user.status ){
            return res.status(400).json({
                msg: 'User / password no son correctos - status: false'
            });
        }
        
        //verificar la contrase;a
        const validPassword = bcryptjs.compareSync( password, user.password );
        if (!validPassword){
            return res.status(400).json({
                msg: 'User / password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT ( user.id );

        res.json({
            // msg: 'Login Ok', 
            user,
            token
        })

    }catch (error){
        
        console.log (error);
        res.status(500).json({

            msg: 'Contáctese con el administrador'

        })
    }


    
}

const googleSingIn = async(req, res= response) =>{
    const {id_token} = req.body;
    
    try{
        const {nombre,img, email} = await googleVerify(id_token);
        let user = await User.findOne({email});

        if (!user ){
            const data ={
                nombre, 
                password: '142341233',
                img,
                email, 
                google:true, 
                rol: 'USER_ROLE'
            };
            user = new User (data);
            await user.save();
        }
        //if user in DB
        if (!user.status){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            });
        }
        
        //Generar el JWT
        const token = await generarJWT ( user.id );

        res.json({
            user, 
            token
        })
    }
    catch (error){
        res.status(400).json({
            ok: false,
            msg: 'el token no se pudo verificar',

        })
    }
}
module.exports = {
    login,
    googleSingIn
}