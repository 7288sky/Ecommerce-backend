const asyncHandler=(fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(error=>{
        res.status(500).json({message:error.message})
    })
}

export default asyncHandler;

// for under standing and the importance of async handeler

// app.get('/user/:id', asyncHandler(async (req, res, next) => {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//         const error = new Error('User not found');
//         error.code = 404;
//         throw error;
//     }
//     res.json(user);
// }));


// In this example, if the User.findById operation throws an error (for example, if the user ID is not found), it will be caught by the asyncHandler and sent back to the client with a 404 status code and a message of 'User not found'.