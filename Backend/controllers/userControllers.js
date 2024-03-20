import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new Error('Please fill all fields')
    }
    const userExists = await User.findOne({ email })
    if (userExists) res.status(400).send("User already existed")
    // if(userExists) throw Error("user already exists") this can be another way of doing the above

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)



    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        createToken(res,newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invaliid user data")
    }
})

const loginUser=asyncHandler(async(req,res)=>{

const {email,password}=req.body
const existedUser=await User.findOne({email})

if(existedUser){
    const isPasswordValid=await bcrypt.compare(password,existedUser.password)
    if(isPasswordValid){
        createToken(res,existedUser._id);

    return  res.status(201).json({
            _id: existedUser._id,
            username: existedUser.username,
            email: existedUser.email,
            isAdmin: existedUser.isAdmin
        })  
    }else{
            return res.status(400).json("Invalid password")     
    }
}else{
    return res.status(404).json("Invalid Email")
}

})

const logoutCurrentUser=asyncHandler(async(req,res)=>{
res.cookie(
    'jwt',
    '',
    {
        httpOnly:true,
        expires: new Date(0),
    }
    )
    res.status(200).json({message:"Lougout successfully"})
})

const getAllUsers=asyncHandler(async(req,res)=>{
const users=await User.find({});
res.json(users)
})

const getCurrentUserProfile=asyncHandler(async(req,res)=>{
const user=await User.findById(req.user._id)

if(user){
res.json({
    _id:user._id,
    username:user.username,
    email:user.email
})
}else{
    res.status(404)
    throw new Error("User not found")
}

})

const updateCurrentUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        user.username=req.body.username||user.username
        user.email=req.body.email||user.email
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)            
            user.password=hashedPassword
        }
        const updateUser=await user.save()

        res.json({
            _id:updateUser._id,
            username:updateUser.username,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin
        })

    }else{
        res.status(404);
        throw new Error("User not found")
    }
})

const deleteUserById=asyncHandler(async(req,res)=>{
const user=await User.findById(req.params.id)

if(user){
if(user.isAdmin){
    res.status(400)
    throw new Error("Cannot delete admin user")
}

await User.deleteOne({_id:user._id})

res.json({message:"User removed"})

}else{
res.status(400);
throw new Error("User not found")
}

})

const getUserById=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select('-password')
    if(user){
        return res.json(user)
    }else{
        res.status(404);
        throw new Error("User not found")
    }
})

const updateUserById=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)

    if(user){
        user.username=req.body.username||user.username
        user.email=req.body.email||user.email
        user.isAdmin=Boolean(req.body.isAdmin)
        const updateUser=await user.save()
        res.json({
            _id:updateUser._id,
            username:updateUser.username,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin
        })
    }else{
        res.status(404);
        throw new Error("User not found")       
    }


})

export { 
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
 }



 