import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken" //bearer token
import bcrypt from "bcrypt"
const applicantSchema = new Schema({
    fullname :{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    phone_number:{
        type:String,
        required:true,
        unique:true, 
    },
    applicant_id:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //for efficient searching
    },
    specification: {
        type:String,
        required:true,
        unique:true
    },
    resume:{
        type:string, //cloudinary url
        required:true,
    },
    skills:[{
        type:String,
        required:true,
        unique:true
    }],
    applications:[
        {
            type:Schema.Types.ObjectId,
            ref:"Job_Application"
        }
    ],
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshtoken:{
        type:string 
    }
    
},{
    timestamps:true
})

applicantSchema.pre("save", async function(next){
    if(!this.ismodified("password")){
        return next();
    }
    this.password = bcrypt.hash(this.password,10)
    next()
})

//let's create a method to check the password
applicantSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
//in arrow functions we can't access this

applicantSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            applicant_id:this.applicant_id,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

applicantSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Applicant = mongoose.model("Applicant",applicantSchema)
//bcrypt used for passwords