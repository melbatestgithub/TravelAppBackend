const errorHandler=async (res,req,next,error)=>{
  return  res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
}
module.exports = errorHandler;