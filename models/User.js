import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: { type: String, required: 'Nombre de usuario es requerido' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} no es un rol válido',
            default: 'user',
            required: true,
        },
    },
}, {
    timestamps: true // will add createdAt and updatedAt fields
}
)


let User

if (!mongoose.models) {
    User = model('User', userSchema)
} else {
    if (!mongoose.models.User) {
        User = model('User', userSchema)
    } else {
        User = mongoose.models.User
    }
}

export default User;