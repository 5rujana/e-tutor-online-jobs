import mongoose ,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const job_application_schema = new Schema({
    JobID :{
        type:string,
        required: true,
        index:true,
        unique:true
    },
    application_id :{
        type:string,
        required:true,
        index:true,
        unique:true
    },
    applicant_id:{
        type:Schema.Types.ObjectId,
        ref:"Applicant"
    },
    application_status:{
        type:string,
        enum: ['accepted', 'rejected', 'processing']
    }
},{
    timestamps:true
})

job_application_schema.plugin(mongooseAggregatePaginate)
export const Job_Application = mongoose.model("Job_Application",job_application_schema)