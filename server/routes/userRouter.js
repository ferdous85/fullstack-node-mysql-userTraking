const router = require('express').Router()
const usrCtrl = require('../controllers/userCtrl')

router.get('/', usrCtrl.view)
router.post('/', usrCtrl.find)
router.get('/adduser', usrCtrl.form)
router.post('/adduser', usrCtrl.create)
router.get('/edituser/:id', usrCtrl.edit)
router.post('/edituser/:id', usrCtrl.update)

module.exports = router