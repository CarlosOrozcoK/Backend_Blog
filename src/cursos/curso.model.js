import { Schema, model } from "mongoose";

const CursoSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        maxLength: 500,
    },

    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Curso', CursoSchema);
