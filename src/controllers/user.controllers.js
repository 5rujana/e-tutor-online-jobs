import {asyncHandler} from "../utils/asynchandler.js"


const registerUser = asyncHandler(async (req,res) =>{
    // get user details from user
    const {fullname,email,phone_number,password} = req.body
    console.log(`email: ${email}`)
    //validation
    //check if user already exist
    //check of images,check for avtar
    //upload to cloudinary, avtar
    // create user object - create entry in db
    // remove password and refresh token field from response
    //check for user creation
    //return response
})

export {registerUser} 