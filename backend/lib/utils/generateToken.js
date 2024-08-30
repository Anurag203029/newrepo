import jwt from "jsonwebtoken";
const JWT_NODE_ENV='development';
const JWT_SCERET="sceret";
 const generateTokenAndSetCookies=(userId,res)=>{
    const token = jwt.sign({userId},JWT_SCERET,{
        expiresIn:'15d'
    })
    console.log(token);
    res.cookie('jwt',token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:'strict',
        secure:JWT_NODE_ENV !=="development"
    })
}

export default generateTokenAndSetCookies;