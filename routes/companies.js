const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companyController')
const keycloak = require('../config/keycloak')
const upload = require('../helpers/imageUpload')

router.get('/', keycloak.protect(), async function(req, res){   
    let companies = await companyController.index(req.kauth.grant.access_token.content.sub)
    res.send(companies)
})

router.post('/', upload.single('image'), async function(req,res){
    let newCustomer = await companyController.create(req.body, req.file)
    res.send(newCustomer)
})

router.patch('/:id', async function(req,res){
    let newCustomer = await companyController.update(req.params.id,req.body)
    res.send(newCustomer)
})

// router.get('/:id', async function(req,res){
//     let company = await companyController.show(req.params.id)
//     res.send(company)
// })

module.exports = router