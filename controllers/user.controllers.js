const { response, request } = require ('express');
// User con mayuscula permitirá crear instancias 

const bcryptjs = require ('bcryptjs');

const User = require ('../models/user');




const userGet = async (req = request, res = response) => {
    
    //aqui se pueden establecer valores por defecto
    // const { q, 
    //         nombre = 'No name', 
    //         apikey, 
    //         page = 1, 
    //         limit 
    //     } = req.query;
    const { limite = 5, desde = 0 } =req.query; 
    
    const  query  = { status: true };

    // const users = await User.find( query ) // .find engloba a todos los usuarios, al llamar con GET saldran TODOS. CUIDADO SI SE TIENE MUCHOS USUARIOS ESTE PROCESO PUEDE TARDAR
    //     .skip (desde) // si no funciona probar .skip(Number(desde))
    //     .limit (limite);// .limit (Number(limite)); // en el video el profe debe poner NUMBER para que funcione. 


    // const total = await User.countDocuments( query );

    const [ total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
        .skip (desde)
        .limit (limite)
    ])
    
    res.json({
        
        // msg: 'get API - controller',
        // q,
        // nombre, 
        // apikey,
        // page,
        // limit


        total,
        users

        // resp
    })
}




const userPost = async (req = request, res = response) => {
    
    //body de postman, donde ingresamos informacion como test
    const { nombre, email, password, rol } = req.body;
    //creación de instancia 
    const user = new User( {nombre, email, password, rol} );
    
    await user.save();

    res.json({
        
        msg: 'post API - controller',
        user
    })
}

const userPut = async (req = request, res = response) => {
    const { id } = req.params;
    const {_id, password, google, email,...resto} = req.body;

    if ( password ){
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );

    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json(user)
}

const userPatch = (req = request, res = response) => {
    res.json({
        
        msg: 'patch API - controller'
    })
}

const userDelete = async (req = request, res = response) => {

    const { id } = req.params;

    // const uid = req.uid;

    // borrado fisico
    // const user = await User.findByIdAndDelete( id );
    
    const user = await User.findByIdAndUpdate( id, { status:false})
    //const userAutenticado = req.user;
    //res.json({ user, userAutenticado })
    res.json({ user})
    
}


module.exports = {
    userGet, 
    userPost, 
    userPut,
    userDelete, 
    userPatch, 
}