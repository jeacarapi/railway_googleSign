const jwt = require ('jsonwebtoken');

// useridentifier
const generarJWT = ( uid = '')=> {
    
    return new Promise ( ( resolve, reject ) =>{

        const payload = { uid }

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            //cuando quieres que expre el toke. En este caso 4horas
            expiresIn: '4h'
        }, (err, token)=> {

            if ( err ) { 
                console.log(err);
                reject('No se pudo generar el token')
            }else {
                resolve( token );
            }
        })
    })
}


module.exports ={ generarJWT } ;