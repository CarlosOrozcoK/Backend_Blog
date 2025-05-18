import { Router } from "express";
import { check } from "express-validator";
import {
    postComentario,
    getComentarios,
    getComentarioPorId,
    getComentariosPorPublicacion,
    putComentario,
    deleteComentario
} from "./comentario.controller.js";
import {
    idComentarioValido,
    publicacionComentarioValida
} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/crear",
    [
        validarCampos
    ],
    postComentario
);

router.get("/listar", getComentarios);

router.get(
    "/buscar/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idComentarioValido),
        validarCampos
    ],
    getComentarioPorId
);

router.get(
    "/por-publicacion/:titulo",
    [
        check("titulo", "¡Título obligatorio!").not().isEmpty(),
        check("titulo").custom(publicacionComentarioValida),
        validarCampos
    ],
    getComentariosPorPublicacion
);

router.put(
    "/actualizar/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idComentarioValido),
        validarCampos
    ],
    putComentario
);

router.delete(
    "/eliminar/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idComentarioValido),
        validarCampos
    ],
    deleteComentario
);

export default router;
 