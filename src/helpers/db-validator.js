import Publicacion from '../publicaciones/publicacion.model.js';
import Curso from "../cursos/curso.model.js";
import Comentario from "../comentarios/comentario.model.js";

export const idPublicacionValida = async (id = '') => {
    const existe = await Publicacion.findById(id);
    if (!existe) {
        throw new Error(`La publicación con el ID ${id} no existe en la base de datos.`);
    }
};

export const tituloPublicacionValido = async (titulo = '') => {
    const existe = await Publicacion.findOne({ titulo });
    if (!existe) {
        throw new Error(`La publicación con el título "${titulo}" no existe en la base de datos.`);
    }
};

export const idCursoValido = async (id = '') => {
    const existe = await Curso.findById(id);
    if (!existe) {
        throw new Error(`El curso con el ID ${id} no existe en la base de datos.`);
    }
};

export const nombreCursoValido = async (nombre = '') => {
    const existe = await Curso.findOne({ nombre });
    if (!existe) {
        throw new Error(`El curso con el nombre "${nombre}" no existe en la base de datos.`);
    }
};

export const idComentarioValido = async (id = '') => {
    const existe = await Comentario.findById(id);
    if (!existe) {
        throw new Error(`El comentario con el ID ${id} no existe en la base de datos.`);
    }
};

export const publicacionComentarioValida = async (titulo = '') => {
    const publicacion = await Publicacion.findOne({ titulo });
    if (!publicacion) {
        throw new Error(`No existe una publicación con el título "${titulo}".`);
    }

    const hayComentarios = await Comentario.findOne({ publication: publicacion._id });
    if (!hayComentarios) {
        throw new Error(`No hay comentarios registrados para la publicación "${titulo}".`);
    }
};
