const db = require('./connection')
const ObjectId = require('mongoose').Types.ObjectId;

function apiModel() {

	this.registerUser=(userDetails)=>{
		console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user').find().toArray((err,result)=>{
				if(err)
					reject(err)
				else
				{
					var otp = Math.floor(1000 + Math.random() * 9000);
				     var flag=0

					if(result.length==0)
						_id=1
					else
					{   
					    var max_id=result[0]._id
                         for(let row of result)
						{

						 if(row._id>max_id)
						 	max_id=row._id
						
						 if(row.mobile_no==userDetails.mobile_no)
						 	flag=1							 	
						 	
						}
						_id=max_id+1  	
					}

					userDetails.form_status='0'
					userDetails.varify_status='0'
					userDetails.role="user"
					userDetails.info= new Date()
					userDetails.otp=otp.toString()
					userDetails.varify_status='0'

					if(flag)
					{
						resolve(0)
					}
					else
					{
						db.collection('user').insertOne(userDetails,(err1,result1)=>{
						   //err1 ? reject(err1) : resolve(result1);
						   if(err1){
						   	reject(err1)
						   }
						   else
						   {
						   	db.collection('user').find({'mobile_no':userDetails.mobile_no}).toArray((err2,result2)=>{
						   		err2?reject(err2):resolve(result2)
						   	})
						   }
						   //resolve(result1)
					 	})	
					}
					//resolve(result)
				}	
			})
			
		})	
	}

	
	this.verify_otp=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id),'otp':userDetails.otp}).toArray((err,result)=>{
				//err ? reject(err) : resolve(result);
				if(err){
					reject(err)
				}else{
                 db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'form_status':'1','varify_status':'1'}},(err1,result1)=>{
				    err ? reject(err1) : resolve(result1);
			      })
                 }
                resolve(result);
			    
			})
		})	
	}


	this.request_otp=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no}).toArray((err,result)=>{
				//err ? reject(err) :resolve(result)
				if(err){
					reject(err)
				}else{
					var otp = Math.floor(1000 + Math.random() * 9000);
					db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{'otp':otp.toString()}},(err1,result1)=>{
						//err1 ? reject(err1) : resolve(result1)
						if(err){
					      reject(err)
				        }else{
						db.collection('user').find({'mobile_no':userDetails.mobile_no}).toArray((err2,result2)=>{
						err2 ? reject(err2) :resolve(result2)	
					    })
					   }
					   //resolve(result1)
					})
				}
				//resolve(result)
			})
		})
	}

	this.otp_login=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no, 'otp':userDetails.otp}).toArray((err,result)=>{
				//err ? reject(err) :resolve(result)
				if(err){
					reject(err)
				}else{
					db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{/*'fcm':userDetails.fcm*/}},(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1)
							
					})
				}
				resolve(result)
			})
		})
	}

	this.password_login=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no, 'password':userDetails.password}).toArray((err,result)=>{
				//err ? reject(err) :resolve(result)
				if(err){
					reject(err)
				}else{
					db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{/*'fcm':userDetails.fcm*/}},(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1)
							
					})
				}
				resolve(result)
			})
		})
	}

}

module.exports=new apiModel()