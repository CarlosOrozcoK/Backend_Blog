import { Router } from "express";
import { check } from "express-validator";
import {
    postPublicacion,
    getPublicaciones,
    getPublicacionPorId,
    getPublicacionPorTitulo,
    getPublicacionesPorCurso,
    putPublicacion,
    deletePublicacion
} from "./publicacion.controller.js";
import {
    idPublicacionValida,
    tituloPublicacionValido,
    nombreCursoValido
} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/crear",
    [
        validarCampos
    ],
    postPublicacion
);

router.get("/todas", getPublicaciones);

router.get(
    "/por-id/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idPublicacionValida),
        validarCampos
    ],
    getPublicacionPorId
);

router.get(
    "/por-titulo/:titulo",
    [
        check("titulo").custom(tituloPublicacionValido),
        validarCampos
    ],
    getPublicacionPorTitulo
);

router.get(
    "/por-curso/:nombre",
    [
        check("nombre").custom(nombreCursoValido),
        validarCampos
    ],
    getPublicacionesPorCurso
);

router.put(
    "/editar/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idPublicacionValida),
        validarCampos
    ],
    putPublicacion
);

router.delete(
    "/eliminar/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idPublicacionValida),
        validarCampos
    ],
    deletePublicacion
);

export default router;
