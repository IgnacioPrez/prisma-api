import { Router } from "express";
import { createUser, login } from "../controller/user.controller";
import { collectBugs } from "../../../middlewares/collectBugs";
import { check } from "express-validator";

const router = Router()

router.post('/create',[
    check('email', 'El correo es obligatorio').notEmpty().isEmail(),
    check('password','La contraseña debe contener 8 caracteres como minimo').notEmpty().isLength({
        min:8
    }),
    collectBugs
],createUser)

router.post('/login',[
    check('email', 'El correo es obligatorio').notEmpty().isEmail(),
    check('password','La contraseña debe contener 8 caracteres como minimo').notEmpty().isLength({
        min:8
    }),
    collectBugs
],login)

export default router