const imgEditNew = {};
//Experimental
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cd)=>{
        cd(null, path.join(__dirname, '../public/img/photoDogs'));
    },
    filename: (req, file, cd)=>{
        cd(null, Date.now()+'-'+file.originalname);
    }
});
imgEditNew.upload = multer({storage}).single('img');

module.exports = imgEditNew;