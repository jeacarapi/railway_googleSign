
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// const googleVerify = async( idToken = '' ) => {

//   const ticket = await client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
async function googleVerify(token = '') {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
    // falta asignar nombre a la constante ?
    // ya se cambio nombre de image a img 
    const {
      name:nombre,picture:img, 
      email
    } = ticket.getPayload();
  
  return {
    nombre,img,email,
  }
  // const {name, picture, email} = ticket.getPayload();
  //   return {
  //     nombre:name,
  //     img: picture,
  //     email: email
  //   }
    
  
}

module.exports = {
    googleVerify
}