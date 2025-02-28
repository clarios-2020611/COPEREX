import { body } from "express-validator";
import { validateErrorWithoutImg } from "./validate.errors.js";
import { objectIdValid } from "./db.validators.js";

export const needId = [
    body('id', 'Id is required').notEmpty().custom(objectIdValid),
    validateErrorWithoutImg
];

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty').notEmpty().toLowerCase(),
    body('password', 'Password cannot be empty').notEmpty(),
    validateErrorWithoutImg
];