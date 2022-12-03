const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const apiModel = require('../models/apiModel');


router.post('/signup',
    body('mobile_no').isLength({
        min:1,
        max:10
    }).withMessage('mobile_no should be required'),
    body('password').isLength({
        min:1,
        max:10
    }).withMessage('password should be required'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
            //errors: errors.array()
            msg:'parameter required mobile_no & password'
        });
    }
	
apiModel.registerUser(req.body).then((result2)=>{

    if(result2){
            response = 'true',
            msg ='mobile_no registered successfully...'
        }else{
            response = 'false',
        	msg = 'mobile_no already registered please enter new mobile_no...'
        }   
        
        res.json({
             result:response,
        	  msg:msg,
             data:result2
        }); 

        
   }).catch((err)=>{
		res.json({message:err.message})
	})
});

router.post('/verify_otp',
    body('otp').isLength({
        min:4,
        max:4
    }).withMessage('otp must be required min & max 4 digit.'), (req, res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
            //errors: errors.array(),
            msg:'parameter required _id & otp'
        });
    } 
  
    apiModel.verify_otp(req.body).then((result)=>{
    
        if(result.length == 0){
        	res.json({
        		result: 'false',
				msg:'invalid _id or otp & please Enter the valid _id or otp...',
			})
		}else{
         
            req._id = result[0]._id,
            req.otp = result[0].otp

            if(result[0]._id == req._id && result[0].otp == req.otp ){
				res.json({
					result:'true',
					msg:'user successfully verify...'
				})
			}else{

			
             }
        }  
    }).catch((err)=>{
       res.json({message:err.message})
    })
});


router.post('/request_otp',
    body('mobile_no').isLength({
        min:10,
        max:10
    }).withMessage('mobile_no should be required...'),(req,res,next)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
            // errors: errors.array()
            msg: 'parameter required mobile_no'
        });
    }

    apiModel.request_otp(req.body).then((result2)=>{
          
        if(result2.length==0){
			res.json({
                result: 'false',
				msg:'mobile_no invalid...',
			})
		}else{
            
            req.mobile_no = result2[0].mobile_no

			if(result2[0].mobile_no==req.mobile_no){
				res.json({
                    result: 'true',
                     msg:'otp successfully generated...',
                     data:result2[0]
			    });
			}else{
               
			}
		}

	}).catch((err)=>{
		res.json({message:err.message})
	})
})

router.post('/otp_login',
    body('mobile_no').isLength({
        min:10,
        max:10
    }).withMessage('mobile_no should be required..'),
    body('otp').isLength({
        min:4,
        max:4
    }).withMessage('otp should be required..'),(req,res,next)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
            // errors: errors.array()
            msg: 'parameter required mobile_no & otp'
        });
    }

    apiModel.otp_login(req.body).then((result)=>{
          
        if(result.length==0){
			res.json({
                result: 'false',
				msg:'mobile_no or otp invalid...',
			})
		}
		else{
       
			req.mobile_no = result[0].mobile_no,
			req.otp = result[0].otp

			if(result[0].mobile_no==req.mobile_no && result[0].otp == req.otp){
				res.json({
                    result: 'true',
                     msg:'user successfully login...',
                    // data:result[0]
			    });
			}else{
               
			}
		}

	}).catch((err)=>{
		res.json({message:err.message})
	})
})


router.post('/password_login',
    body('mobile_no').isLength({
        min:10,
        max:10
    }).withMessage('mobile_no should be required..'),
    body('password').isLength({
        min:1,
        max:20
    }).withMessage('password should be required..'),(req,res,next)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
            // errors: errors.array()
            msg: 'parameter required mobile_no & password'
        });
    }

    apiModel.password_login(req.body).then((result)=>{
          
        if(result.length==0){
            res.json({
                result: 'false',
                msg:'mobile_no or password invalid...',
            })
        }
        else{
       
            req.mobile_no = result[0].mobile_no,
            req.password = result[0].password

            if(result[0].mobile_no==req.mobile_no && result[0].password == req.password){
                res.json({
                    result: 'true',
                     msg:'user successfully login...',
                    // data:result[0]
                });
            }else{
               
            }
        }
    }).catch((err)=>{
        res.json({message:err.message})
    })
})

module.exports = router;