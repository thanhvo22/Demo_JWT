const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
    

    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});
const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  ||
       file.mimetype ==="image/jpeg"  ||
       file.mimetype ===  "image/png"){

    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
export const upload = multer({storage: storage, fileFilter : fileFilter});
