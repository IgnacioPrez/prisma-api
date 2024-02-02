"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const collectBugs_1 = require("../../../middlewares/collectBugs");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/create', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').notEmpty().isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe contener 8 caracteres como minimo').notEmpty().isLength({
        min: 8
    }),
    collectBugs_1.collectBugs
], user_controller_1.createUser);
router.post('/login', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').notEmpty().isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe contener 8 caracteres como minimo').notEmpty().isLength({
        min: 8
    }),
    collectBugs_1.collectBugs
], user_controller_1.login);
exports.default = router;
