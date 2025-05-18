import { Router } from "express";
import { check } from "express-validator";
import {
    postCurso,
    getCursos,
    getCursoPorId,
    getCursoPorNombre,
    putCurso,
    deleteCurso
} from "./curso.controller.js";
import {
    idCursoValido,
    nombreCursoValido
} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validarCampos
    ],
    postCurso
);

router.get("/", getCursos);

router.get(
    "/id/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idCursoValido),
        validarCampos
    ],
    getCursoPorId
);

router.get(
    "/nombre/:name",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("name").custom(nombreCursoValido),
        validarCampos
    ],
    getCursoPorNombre
);

router.put(
    "/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idCursoValido),
        validarCampos
    ],
    putCurso
);

router.delete(
    "/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idCursoValido),
        validarCampos
    ],
    deleteCurso
);

export default router;
