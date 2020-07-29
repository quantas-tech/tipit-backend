const express = require('express')
const router = express.Router()

router.get('/',async function(req, res){   
    res.send('Welcome to our API')
})

router.use('/customers', require('./customers'))
router.use('/companies', require('./companies'))
router.use('/stores', require('./stores'))
router.use('/surveys', require('./surveys'))
router.use('/questions', require('./questions'))
router.use('/results',require('./results'))

module.exports = router
