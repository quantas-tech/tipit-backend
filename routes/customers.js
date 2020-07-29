const express = require('express')
const router = express.Router()

router.get('/',async function(req, res){   
    res.send('Welcome to the Customers API')
})

module.exports = router