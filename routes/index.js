const express = require('express');
const router = express.Router();

const indexModel = require('../models/indexModel')


router.get('/', (req, res,next)=>{
  res.render('home');
});

router.get('/login', (req, res,next)=>{
  res.render('login',{'output':''});
});

router.get('/signup', (req, res,next)=>{
  res.render('signup');
});

router.post('/signup',(req,res,next)=>{
 indexModel.registerUser(req.body).then((result)=>{
  
     if(result)
            result =true,
        msg ="User registered Successfully...."
            
       else
           result = false,
          msg =" email already exit,Plese enter new email"
            
       // res.render('register',{'output':msg});
          res.json({
            result:result,
            msg:msg
          })
          

  }).catch((err)=>{
    //res.render({message:err.message})
    console.log(err)
  })
})

router.post('/login',(req,res,next)=>{
    indexModel.userLogin(req.body).then((result)=>{
        console.log(req.body)
   if(result.length==0){
      res.render('login',{'output':'Invalid email & password....'});
            /*res.json({
                result:false,
                msg:'email  not registered please enter register email..'
            })*/
    }else{
          req.sunm = result[0].email,
          req.srole = result[0].role

          if(result[0].role=="admin"){
            res.redirect('/admin/index')
            /* res.json({
                result:true,
                msg:'admin successfully login..'
             })*/
            }else{
             res.redirect('/login')
           /* res.json({
                result:false,
                msg:'email & password invalid..'
             })  */  
            }
        }
      }).catch((err)=>{
    res.render({message:err.message})
        //console.log(err)
  })
})


module.exports = router;