import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    score:{
        type:String,
        required:true,
    }
})

const result = mongoose.model('result',resultSchema);
export default result;