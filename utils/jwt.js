import jwt from 'jsonwebtoken';
import * as jose from 'jose'



export const signToken = async (_id, email) => {

    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT, revisar variables de entorno');
    }



    const alg = 'HS256'


    

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_SEED)

    const jwt = await new jose.SignJWT({ _id, email })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('teslo')
        .setAudience('teslo')
        .setExpirationTime('30d')
        .sign(secret)

    console.log("jwt", jwt)

    return jwt
}




// returns a promise that resolves to the user id if the token is valid
export const isValidToken = async (token) => {

    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT, revisar variables de entorno');
    }

        console.log('Token:', token);
        console.log('Token type:', typeof token);

        const secret = new TextEncoder().encode(process.env.JWT_SECRET_SEED);

        try {
            const verifiedJWT = await jose.jwtVerify(token, secret, {
                issuer: 'teslo',
                audience: 'teslo',
                algorithms: ['HS256']
            })

            console.log("verifiedJWT", verifiedJWT)

            const { _id } = verifiedJWT.payload;

            return _id

        } catch (error) {
            console.log("error", error)
            throw new Error('JWT no válido', error);
        }
    
}



// PREVIOUS VERSION USING JSONWEBTOKEN

// export const signToken = (_id, email) => {

    //     if (!process.env.JWT_SECRET_SEED) {
        //         throw new Error('No hay semilla de JWT, revisar variables de entorno');
//     }

//     return jwt.sign(
    //         // payload, the data we want to sign
    //         { _id, email },
    
    //         // secret
    //         process.env.JWT_SECRET_SEED,
    
    //         // options
    //         { expiresIn: '30d', }
    //     )
    // }





    
    // export const isValidToken = (token) => {
    
    //     if (!process.env.JWT_SECRET_SEED) {
    //         throw new Error('No hay semilla de JWT, revisar variables de entorno');
    //     }
    
    //     return new Promise((resolve, reject) => { // we want to use promises instead of callbacks, so we wrap the jwt.verify in a promise
    
    //         try {
    //             jwt.verify(token, process.env.JWT_SECRET_SEED, (err, payload) => {
    //                 if (err) {
    //                     return reject('JWT no válido');
    //                 } else {
    //                     const { _id } = payload;
    //                     return resolve(_id)
    //                 }
    
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     })
    // }