import formidable from 'formidable';
import fs from 'fs';
import cloudinary from 'cloudinary';



// config to prevent body parser
export const config = {
    api: {
        bodyParser: false,
    },
}

cloudinary.v2.config(
    {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    }
);

// Log the configuration
console.log(cloudinary.config());


export default async function handler(req, res) {
    switch (req.method) {

        case 'POST': return await uploadImage(req, res);

        default: return res.status(400).json({ message: 'Bad request' });
    }
}

// // saving the file in the file system is not recommended!!!  (it is just for the sake of the example)
// const saveFile = async (image) => {
//     const data = fs.readFileSync(image.filepath); // read file from temp location (It would be eventually deleted)
//     fs.writeFileSync(`./public/${image.originalFilename}`, data); // write file to permanent location
//     fs.unlinkSync(image.filepath); // delete file from temp location (unlink = delete )
//     return
// }


const saveFile = async (image) => {
    console.log(image.filepath);

    // Upload image to cloudinary
    const { secure_url } = await cloudinary.v2.uploader.upload(image.filepath);

    return secure_url;

}


const parseFiles = async (req) => {
    return new Promise((resolve, reject) => { // formidable works with callbacks and we want to work with promises
        const form = new formidable.IncomingForm(); // prepare for incoming data
        form.parse(req, async (err, fields, files) => { // parse incoming data
            // console.log(err, fields, files) // show data: fields if there is any text data, files if there is any file data
            if (err) return reject(err); // if there is an error, reject promise

            const imagePublicUrl = await saveFile(files.image); // save file
            return resolve(imagePublicUrl);
        });
    });
}




// This function gets a file from the request body (dataform) and saves it in the file system
const uploadImage = async (req, res) => {

    const imageUrl = await parseFiles(req);

    return res.status(200).json({ message: imageUrl });

}