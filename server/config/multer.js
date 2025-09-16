import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./upload');
    },
    filename: (req,file,cb)=>{
        const unique = Date.now()+ Math.round(Math.random() * 1E9);
        cb(null,file.fieldname + '-' + unique);
    }
})

export const upload = multer({
    storage: storage
})

