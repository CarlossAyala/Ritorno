const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { renderUserProfile } = require('../controllers/user.controller');

router.get('/profile', renderUserProfile);

module.exports = router;