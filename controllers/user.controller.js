const Users=require('../models/user.model');
const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
const jwt = require('jsonwebtoken'); 
const CLIENT_URL=process.env.CLIENT_URL;
exports.userSignUp=async(req,res)=>{

    const payload=req.body;

    //Email id validation
    const existUser= await Users.findOne({email:payload.email})
    if(existUser){
        return res.send({
            statusCode:400,
            message:"You are already a register user",
        });
    }
    //confirm password checking
    const isSamePassword =checkPassword(
        payload.password,
        payload.confirmPassword,
    );
    if(!isSamePassword){
        return res.send({
            statusCode:400,
            message:"password doesn't match",
        });
    }
        else{
            delete payload.confirmPassword;
        }
    //Password hashing 
    const randomString=await bcrypt.genSalt(10);
    hashedPassword=await bcrypt.hash(payload.password,randomString);
   
    const newUsers= new Users({
        firstName:payload.firstName,
        lastName:payload.lastName,
        email:payload.email,
        password:hashedPassword,
        role:payload.role
    });
    try{
    //save in db
    newUsers.save((err,data)=>{      
        if(err){
            return res.send({
                statusCode:400,
                message:err.message || 'user not added'
            })
        } 
       
            res.send({
                userId:data._id,
                statusCode:201,
                message:"User Added Successfully"
            })
        
 
});
}
catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    });
}
}

const checkPassword=(password,confirmPassword)=>{
    return password !==confirmPassword ? false : true;
};

exports.userSignIn=async(req,res)=>{
    try{
        const payload=req.body;

        //check whether user exist with verified email status active or not
        const existUser=await Users.findOne({email:payload.email});
        if(!existUser){
            return res.send({
                statusCode:400, 
                message:"User doesn't exists please! signup"
            })  
        }

    // check the db password with entered password matching or not
    const isSamePassword =await bcrypt.compare(payload.password,existUser.password);
    if(!isSamePassword){
        return res.send({
            statusCode:400,
            message:"Incorrect password",
        })
    }
    
    //Generate token and send as response and token is encrypted form of payload.
    const token =jwt.sign({_id:existUser._id},process.env.SECRET_KEY,{expiresIn:"1hr"});
    res.send({
        statusCode:200,
        message:"Login successfully",
        token:token,
        name:existUser.firstName,
        role:existUser.role
    })
    }
    catch{
        res.send({
            statusCode:500,
            message:"Internal server error"
        });
    }
}

exports.userForgotPassword=async ( req, res ) =>{
    try{
        const payload=req.body;
        const existUser=await Users.findOne({email:payload.email});
        if(!existUser){
           return res.send({
                statusCode:400,
                message:"user doesn't exist please! signup"
            })
        }
        const token =jwt.sign({_id:existUser._id},process.env.RESET_PASSWORD_KEY,{expiresIn:"10m"});
        await Users.updateOne({email:payload.email},{$set:{resetToken:token}})

            const URL=`${CLIENT_URL}/reset-password/${existUser._id}?tk=${token}`;
            //sendMail
            const transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:process.env.ACC_EMAIL,
                    pass:process.env.ACC_PASS
                },
            });
            const mailOptions={ 
                from:process.env.ACC_EMAIL,
                to:payload.email,
                subject:"Password | Reset Mail",
                html:`Hi ${existUser.firstName},<br/><br/>  
                <span>Forgot your password?</span><br/>
                <span>we received a request to reset the password for your account.</span><br/><br/>
                <span>To reset your password, click on the button below:<span/><br/>
                <a href=${URL} target='_blank'><Button style=" background-color:#00A2ED; width:11em; color:white; padding:10px; outline: none; border-radius:12px; border:none; margin-top:5px; " >Reset password</Button></a><br/><br/>
              <div><br/><br/>
              <span><strong>
              Or copy and paste the URL into your browser :
              </strong>
              </span>
                  <p>${URL}</p>
              
              </div>`
            }
            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                     res.send("Error: error while sending please try again!")
                }
                else{
                     res.send({
                        statusCode:200,
                        message:"Reset Mail has been sent successfully."
                    })
                }
            })  
    }

    catch{
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
}

exports.userResetPassword=async(req,res)=>{
    const tokenId=req.params.tokenId;
    const payload=req.body;
    const verifyToken=req.query.tk;

    //verify token
    jwt.verify(verifyToken,process.env.RESET_PASSWORD_KEY,async(err,decodedData)=>{
        if(err){
            return res.send({
                statusCode:400,
                message:"Invalid Token or Expired"
            })
        }
        //to check reset token is exist or not
        const existUser=await Users.findOne({resetToken:verifyToken});
        if(!existUser){
            return res.send({
                statusCode:400,
                message:"Link is expired"
            })
        }
        // to check the newPassword and confirmPassword are same or not
        const isSamePassword=checkPass(payload.newPassword,payload.confirmPassword);
        if(!isSamePassword){
            return res.send({
                statusCode:400,
                message:"password doesn't match"
            });
        }
        else{
            delete payload.confirmPassword; //no need to save confirmPassword in db
        }

        // to check current password is same as old password
        const existPassword=await bcrypt.compare(payload.newPassword,existUser.password);
        if(existPassword){
            return res.send({
                statusCode:400,
                message:"New password cannot be same as old password"
            });
        } 
    try{
        // password hashing
        const randomString= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(payload.newPassword,randomString);

        // save in db and null the resetToken for no longer to access it again
        await Users.updateOne({_id:tokenId},{$set:{password:hashedPassword,resetToken:""}});
        return res.send({
            statusCode:200,
            message:"Password has been reset successfully!"
        });
  
    }
    catch{
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }  
})  

}
const checkPass=(newPassword,confirmPassword)=>{
return newPassword !== confirmPassword ? false : true;
};

exports.getAllUsers=async(req,res)=>{
    Users.find((err,data)=>{
        if(err){
           return res.status(400).send({message:"no users data found"})
        }
    try{    
        res.send(data)
}
catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
}  
})
}
