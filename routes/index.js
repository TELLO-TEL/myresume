var router = require('express').Router()

 router.get('/',async (req,res) =>{
     await res.render('index')
 })


module.exports = router ;