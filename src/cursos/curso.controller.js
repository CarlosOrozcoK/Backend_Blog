import { response, request } from "express";
import Curso from "./curso.model.js"; 

export const postCurso = async (req, res) => {
    try {
        const data = req.body;
        const curso = new Curso(data);
        await curso.save();

        res.status(200).json({
            success: true,
            mensaje: '¡Curso guardado exitosamente!',
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: '¡Error al guardar el curso!',
            error
        });
    }
};

export const getCursos = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, cursos] = await Promise.all([
            Curso.countDocuments(query),
            Curso.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            cursos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: '¡Error al obtener los cursos!',
            error
        });
    }
};

export const getCursoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findById(id);

        if (!curso) {
            return res.status(404).json({
                success: false,
                mensaje: '¡Curso no encontrado!'
            });
        }

        res.status(200).json({
            success: true,
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: '¡Error al obtener el curso!',
            error
        });
    }
};

export const getCursoPorNombre = async (req, res) => {
    try {
        const { name } = req.params;
        const curso = await Curso.findOne({ name });

        if (!curso) {
            return res.status(404).json({
                success: false,
                mensaje: '¡Curso no encontrado!'
            });
        }

        res.status(200).json({
            success: true,
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: '¡Error al obtener el curso!',
            error: error.message
        });
    }
};

export const putCurso = async (req, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const curso = await Curso.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            mensaje: '¡Curso actualizado!',
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: '¡Error al actualizar el curso!',
            error
        });
    }
};

export const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params;

        const curso = await Curso.findByIdAndUpdate(id, { status: false }, { new: true });

        res.status(200).json({
            success: true,
            mensaje: '¡Curso desactivado!',
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: '¡Error al desactivar el curso!',
            error
        });
    }
};
