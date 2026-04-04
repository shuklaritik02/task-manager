import mongoose , {Schema,  model} from "mongoose";

const projectSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim: true,
    },
    description : {
        type : String,
        trim: true,
    },

    createdby : {
        type : Schema.Types.ObjectId,
        ref: "user",
        required : true,
    }
}
, {
    timestamps : true,
})

export const Project = model("project", projectSchema);

