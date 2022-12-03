const db = require('./connection')

function indexModel() {

	this.registerUser=(userDetails)=>{
		console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('admin').find().toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
				userDetails.role ='admin'
				userDetails.info = new Date()	
		    db.collection('admin').insertOne(userDetails,(err1,result1)=>{
				err1 ? reject(err1) : resolve(1);
			})	
		  }
		})
	 })

    }

    this.userLogin=(userDetails)=>{
		console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('admin').find({'email':userDetails.email,'password':userDetails.password}).toArray((err,result)=>{
				err ? reject(err) :resolve(result)
			})
		})
	}	
}

module.exports=new indexModel()