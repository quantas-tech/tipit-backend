const express = require('express')
const router = express.Router()

router.get('/',async function(req, res){   
    res.send('Welcome to the take survey api')
})

module.exports = router
