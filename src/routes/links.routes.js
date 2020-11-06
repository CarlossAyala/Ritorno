const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

//experimental
//const { renderAddPet } = require('../routes/image.routes')

const { renderReport1, sendReport2, sendReport3, sendReport4, updateProfile, renderMascotas, renderAddPet, renderDeletePet, renderUpdatePet } = require('../controllers/links.controller');

// Authorization
router.use(isLoggedIn);

//Reports - Routes
router.get('/report-1', renderReport1);
router.post('/report-2', sendReport2);
router.post('/report-3', sendReport3);
router.post('/report-4', sendReport4);

// Routes
router.post('/cuenta/update', updateProfile);
router.get('/cuenta/mascotas', isLoggedIn, renderMascotas);
router.post('/cuenta/mascotas/addpet',  renderAddPet);
router.get('/cuenta/mascotas/delete/:id',renderDeletePet);
router.post('/cuenta/mascotas/update', renderUpdatePet);

module.exports = router;