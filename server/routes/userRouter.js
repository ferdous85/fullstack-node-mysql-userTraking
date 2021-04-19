const router = require('express').Router()
const usrCtrl = require('../controllers/userCtrl')

router.get('/', usrCtrl.view)
router.post('/', usrCtrl.find)
router.get('/adduser', usrCtrl.form)
router.post('/adduser', usrCtrl.create)
router.get('/edituser/:id', usrCtrl.edit)
router.post('/edituser/:id', usrCtrl.update)
router.get('/:id', usrCtrl.delete)
router.get('/viewuser/:id', usrCtrl.viewone)

module.exports = router