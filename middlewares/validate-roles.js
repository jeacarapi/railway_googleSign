const { response } = require("express");



const isAdminRole = (req ,res = response, next) => {

    if (!req.user){
        return res.status(500).json({
            msg: 'Someone is trying to verify role without validating token first'
        });
        
    }
    
    const {rol, nombre} = req.user;
    if ( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ nombre } not admin role, restricted operation`
        }); 
    }   
    next();

    }


module.exports = {
    isAdminRole
}