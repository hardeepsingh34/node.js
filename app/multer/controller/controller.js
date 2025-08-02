const multer = require('multer');
const {v4: uuidv4} = require('uuid');
// const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/uploads');
    },
    filename: function(req, file, cb){
        const uniquename = uuidv4();
        cb( null, uniquename);
    }
});


exports.upload = multer({storage: storage});

exports.fileUpload = (req, res)=>{
        if(!req.file){
         return res.status(400).send('No files were uploded.');
        }
        res.send('file send successfully!');
}