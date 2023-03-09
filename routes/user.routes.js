

const  { Router } = require ('express');
const { check } = require ('express-validator');


const  { validarCampos } = require ('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require ('../middlewares/validate-roles');
const { esRoleValido, existUserByID, emailExiste } = require('../helpers/db-validators');

const { userGet, 
        userPost, 
        userPut, 
        userDelete, 
        userPatch } = require('../controllers/user.controllers');

const router = Router ()


router.get('/', userGet);





router.post('/',[
        check('nombre', 'el nombre es obligatorio / ingrese nombre').not().isEmpty(),
        check('email', 'el correo no es válido').isEmail(),
        check('email').custom(emailExiste),

        check('password', 'password es obligatorio y debe contener mas de 6 dígitos').isLength({ min: 6 }),
        
        check('rol').custom( esRoleValido),
        
        validarCampos 
] ,userPost );



router.put('/:id', [
        check ('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existUserByID),
        check('rol').custom( esRoleValido),
        validarCampos
],userPut);
        



router.patch('/', userPatch);

router.delete('/:id', [
        validarJWT, 
        isAdminRole,
        check ('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existUserByID),
        validarCampos
],userDelete );














module.exports = router;

