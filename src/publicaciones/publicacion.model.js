import { Schema, model } from "mongoose";

const PublicacionSchema = Schema({
    titulo: {
        type: String,
        required: [true, "¡El título es obligatorio!"],
        maxLength: 3000,
    },

    descripcion: {
        type: String,
        required: [true, "¡La descripción es obligatoria!"],
        maxLength: 4000,
    },

    cursos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Curso',
            required: [true, "¡El curso es obligatorio!"]
        }
    ],

    estado: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true,
    versionKey: false
});

export default model('Publicacion', PublicacionSchema);
