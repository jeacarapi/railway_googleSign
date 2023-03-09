const mongoose = require('mongoose');



const dbConnection = async() =>{

    try{

        await mongoose.connect( process.env.MONGODB_CNN, {
            
            // POR ACTUALIZACION DE MONGO ESTAS CONFIG NO SON NECESARIAS PONERLAS AQUI estas dos no alteran su funionamiento
            useNewUrlParser: true,
            useUnifiedTopology: true,

            // POR ACTUALIZACION DE MONGO ESTAS CONFIG NO SON NECESARIAS PONERLAS AQUI estas si alteran su funcionamiento
            // useCreateIndex: true,
            // useFindAndModify: false
        } );

        console.log('conectado a Base de datos online');


    }catch (error){
        throw new Error('Error a la hora de iniciar la DB');
    }
}



module.exports = {
    dbConnection
}