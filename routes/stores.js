const express = require('express')
const router = express.Router()
const storeController = require('../controllers/storeController')
const upload = require('../helpers/imageUpload')

router.get('/:companyId', async function(req,res){
    // console.log(req.kauth.grant.access_token.content)
    let stores = await storeController.index(req.params.companyId)
    res.send(stores)
})
router.post('/', upload.single('image'),async function(req,res){
    let newStore = await storeController.create(req.body, req.file)
    res.send(newStore)
})
router.patch('/:id', upload.single('image'), async function(req,res){
    let newStore = await storeController.update(req.params.id, req.body, req.file)
    res.send(newStore)
})
router.delete('/:id', async function(req,res){
    let ok = await storeController.destroy(req.params.id)
    res.send(ok)
})

module.exports = router