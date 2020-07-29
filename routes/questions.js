const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')

router.get('/:companyId', async function(req,res){
    let query = {
        company:req.params.companyId
    }
    let questions = await questionController.index(query)
    res.send(questions)
})
router.get(':companyId/:id', async function(req,res){
    let question = await questionController.index(req.params.id)
    res.send(question)
})
router.post('/', async function(req,res){
    let newQuestion = await questionController.create(req.body)
    res.send(newQuestion)
})
router.patch('/:id', async function(req,res){
    let newQuestion = await questionController.update(req.params.id, req.body)
    res.send(newQuestion)
})
router.delete('/:id', async function(req,res){
    let ok = await questionController.destroy(req.params.id)
    res.send(ok)
})

module.exports = router

module.exports = router