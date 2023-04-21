import jwt from 'jsonwebtoken';


export const signToken = (_id, email ) => {

    if(!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT, revisar variables de entorno');
    }

    return jwt.sign(
        // payload
        {
            _id, email
        },

        // secret
        process.env.JWT_SECRET_SEED,

        // options
        {
            expiresIn: '30d',
        }
        )


 
}


// This function returns a promise that resolves to the user id if the token is valid (aka, not expired, the user exists, no tampering, etc)
export const isValidToken = (token) => {

    if(!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT, revisar variables de entorno');
    }

    return new Promise((resolve, reject) => { // we want to use promises instead of callbacks, so we wrap the jwt.verify in a promise

        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED, (err, payload) => {
                if(err) {
                    return reject('JWT no válido');
                } else {
                    const {_id} = payload;
                    return resolve(_id)
                }

            });
        } catch (error) {
            reject(error);
        }

    })
}
 