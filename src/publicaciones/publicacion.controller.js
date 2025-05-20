import { response, request } from "express";
import Publicacion from "./publicacion.model.js";
import Curso from "../cursos/curso.model.js";

export const postPublicacion = async (req, res) => {
    try {
        const data = req.body;

        const mapeo = await Curso.find({ name: { $in: data.cursos } });

        data.cursos = mapeo.map(curso => curso._id);

        const publicacion = new Publicacion(data);

        await publicacion.save();

        await publicacion.populate('cursos', 'name');

        res.status(200).json({
            ok: true,
            mensaje: '¡Publicación guardada exitosamente!',
            publicacion
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: '¡Error al guardar la publicación!',
            error
        });
    }
};

export const getPublicaciones = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, publicaciones] = await Promise.all([
            Publicacion.countDocuments(query),
            Publicacion.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('cursos', 'name')
        ]);

        res.status(200).json({
            ok: true,
            mensaje: '¡Publicaciones encontradas!',
            total,
            publicaciones
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: '¡Error al obtener publicaciones!',
            error
        });
    }
};

export const getPublicacionPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicacion.findById(id).populate('cursos', 'name');

        res.status(200).json({
            ok: true,
            mensaje: '¡Publicación encontrada!',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: '¡Error al obtener la publicación!',
            error
        });
    }
};

export const getPublicacionPorTitulo = async (req, res) => {
    try {
        const { titulo } = req.params;

        const publicacion = await Publicacion.findOne({ titulo }).populate('cursos', 'name');

        if (!publicacion) {
            return res.status(404).json({
                ok: false,
                mensaje: '¡Publicación no encontrada!'
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: '¡Publicación encontrada!',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: '¡Error al buscar la publicación!',
            error: error.message
        });
    }
};

export const getPublicacionesPorCurso = async (req, res) => {
    try {
        const { name } = req.params;

        const curso = await Curso.findOne({ name });

        if (!curso) {
            return res.status(404).json({
                ok: false,
                mensaje: '¡Curso no encontrado!'
            });
        }

        const publicaciones = await Publicacion.find({ cursos: curso._id }).populate('cursos', 'name');

        res.status(200).json({
            ok: true,
            mensaje: '¡Publicaciones encontradas!',
            publicaciones
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: '¡Error al obtener publicaciones!',
            error: error.message
        });
    }
};

export const putPublicacion = async (req, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const mapeo = await Curso.find({ name: { $in: data.cursos } });
        data.cursos = mapeo.map(curso => curso._id);

        const publicacion = await Publicacion.findByIdAndUpdate(id, data, { new: true }).populate('cursos', 'name');

        res.status(200).json({
            ok: true,
            mensaje: '¡Publicación actualizada!',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: '¡Error al actualizar!',
            error
        });
    }
};

export const deletePublicacion = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicacion.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.status(200).json({
            ok: true,
            mensaje: '¡Publicación desactivada!',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: '¡Error al desactivar la publicación!',
            error
        });
    }
};
