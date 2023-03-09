const  { Router } = require ('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSingIn } = require('../controllers/auth.controller');



const router = Router ()

router.post('/login',[

    check ('email', 'email es obligatorio').isEmail(),
    check ('password', 'password es obligatorio').not().isEmpty()
    ,validarCampos
    ]   ,login);

router.post('/google',[

    check ('id_token', 'id_token de google es necesario').not().isEmpty()
    ,validarCampos
    ]   ,googleSingIn);



module.exports = router;