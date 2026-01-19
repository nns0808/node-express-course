const express = require('express')
const router = express.Router()
const { logon, hello } = require('../controllers/main')

const auth = require('../middleware/auth')

router.post('/logon', logon)
router.get('/hello', auth, hello)


module.exports = router