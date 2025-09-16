export const asyncHandler = (fn)=>{
    return async (req,res,next)=>{
        try {
            await fn(req,res,next);
        } catch (error) {
            console.error("Failed to execute: ",error);
            return res.status(500).json({Message: error || "Something gone wrong"});
        }
    }
}