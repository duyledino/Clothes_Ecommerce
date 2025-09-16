import Cloundinary from 'cloudinary'
import 'dotenv/config'

const cloudinary = Cloundinary.v2;

cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_NAME,
    api_key: process.env.CLOUNDINARY_APIKEY,
    api_secret: process.env.CLOUNDINARY_SECRET,
    secure:true,
})

export {cloudinary};