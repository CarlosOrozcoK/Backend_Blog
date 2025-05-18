import { response, request } from "express";
import Comentario from "./comentario.model.js";
import Publicacion from "../publicaciones/publicacion.model.js";

export const postComentario = async (req, res = response) => {
    try {
        const datos = req.body;

        const publicacion = await Publicacion.findOne({ titulo: datos.publicacion });

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: '¡Publicación no encontrada!'
            });
        }

        datos.publicacion = publicacion._id;

        const comentario = new Comentario(datos);
        await comentario.save();

        await comentario.populate({
            path: 'publicacion',
            select: 'titulo',
            populate: {
                path: 'cursos',
                select: 'nombre'
            }
        });

        res.status(200).json({
            success: true,
            message: '¡Comentario guardado correctamente!',
            comentario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al guardar el comentario!',
            error
        });
    }
};

export const getComentarios = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, comentarios] = await Promise.all([
            Comentario.countDocuments(query),
            Comentario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate({
                    path: 'publicacion',
                    select: 'titulo',
                    populate: {
                        path: 'cursos',
                        select: 'nombre'
                    }
                })
        ]);

        res.status(200).json({
            success: true,
            message: '¡Comentarios encontrados!',
            total,
            comentarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: '¡Error al obtener comentarios!',
            error
        });
    }
};

export const getComentarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comentario.findById(id).populate({
            path: 'publicacion',
            select: 'titulo',
            populate: {
                path: 'cursos',
                select: 'nombre'
            }
        });

        if (!comentario) {
            return res.status(404).json({
                success: false,
                msg: '¡Comentario no encontrado!'
            });
        }

        res.status(200).json({
            success: true,
            message: '¡Comentario encontrado!',
            comentario
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: '¡Error al buscar comentario!',
            error
        });
    }
};

export const getComentariosPorPublicacion = async (req, res) => {
    try {
        const { titulo } = req.params;

        const publicacion = await Publicacion.findOne({ titulo });

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: '¡Publicación no encontrada!'
            });
        }

        const comentarios = await Comentario.find({
            publicacion: publicacion._id,
            estado: true
        })
            .populate('publicacion', 'titulo')
            .populate({
                path: 'publicacion',
                populate: { path: 'cursos', select: 'nombre' }
            });

        res.status(200).json({
            success: true,
            message: '¡Comentarios encontrados!',
            comentarios
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: '¡Error al obtener comentarios de la publicación!',
            error: error.message
        });
    }
};

export const putComentario = async (req, res = response) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const publicacion = await Publicacion.findOne({ titulo: datos.publicacion });

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: '¡Publicación no encontrada!'
            });
        }

        datos.publicacion = publicacion._id;

        const comentario = await Comentario.findByIdAndUpdate(id, datos, { new: true }).populate({
            path: 'publicacion',
            select: 'titulo',
            populate: {
                path: 'cursos',
                select: 'nombre'
            }
        });

        res.status(200).json({
            success: true,
            msg: '¡Comentario actualizado!',
            comentario
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: '¡Error al actualizar!',
            error
        });
    }
};

export const deleteComentario = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comentario.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.status(200).json({
            success: true,
            msg: '¡Comentario desactivado!',
            comentario
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: '¡Error al desactivar el comentario!',
            error
        });
    }
};
