import { Schema, model } from "mongoose";

const ComentarioSchema = Schema({
    autor: {
        type: String,
        required: [true, "¡El autor es obligatorio!"],
        maxLength: [100, "¡Máximo 100 caracteres!"]
    },

    comentario: {
        type: String,
        required: [true, "¡El comentario es obligatorio!"],
        maxLength: [2000, "¡Máximo 5000 caracteres!"]
    },

    publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: [true, "¡La publicación es obligatoria!"]
    },

    estado: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true,
    versionKey: false
});

export default model('Comentario', ComentarioSchema);
