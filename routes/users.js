const router = require('express').Router();
const { getInfoUser } = require('../controllers/users');

router.get('/', getInfoUser);
