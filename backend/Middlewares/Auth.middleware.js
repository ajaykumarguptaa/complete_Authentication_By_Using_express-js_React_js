import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

dotenv.config();

const EnsureAuthentication=(req,res,next)=>{
  const auth=req.headers['authorization']
  if(!auth){
    return res.status(401).json({message:"Bearer token is required"})
  }
  try{
    const decoded=jwt.verify(auth,process.env.JWT_SECRET)
    req.user=decoded
    next()
  }catch(err){
    return res.status(401).json({message:"Invalid or expired token"})
  }
}

export default EnsureAuthentication