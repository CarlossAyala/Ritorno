const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

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
const upload = multer({storage}).single('img');

const { renderReport1, sendReport2, sendReport3, sendReport4, updateProfile, renderMascotas, renderAddPet, renderDeletePet, renderUpdatePet } = require('../controllers/links.controller');

// Authorization
//router.use(isLoggedIn);

//Reports - Routes
router.get('/report-1', renderReport1);
router.post('/report-2', sendReport2);
router.post('/report-3', sendReport3);
router.post('/report-4', sendReport4);

// Routes
router.post('/cuenta/update', updateProfile);
router.get('/cuenta/mascotas', renderMascotas);
router.post('/cuenta/mascotas/addpet', upload, renderAddPet);
router.get('/cuenta/mascotas/delete/:id',renderDeletePet);
router.post('/cuenta/mascotas/update', upload, renderUpdatePet);

module.exports = router;