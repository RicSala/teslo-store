import mongoose, {Schema, model, Model} from "mongoose";


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['user','admin'],
            message: '{VALUE} no es un rol válido',
            default: 'user',
            required: true,
        },
    },
    }, {
        timestamps: true // will add createdAt and updatedAt fields
    }
)


// TODO: WARNING: THIS FAILS!!!!
let User

if (!mongoose.models) {
    User = model('User', userSchema )
} else
{
    if (!mongoose.models.User) {
        User = model('User', userSchema )
    } else {
        User = mongoose.models.User
    }
}

export default User;