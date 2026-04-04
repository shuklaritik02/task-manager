import mongoose  , {Schema , model}from "mongoose";

import { UserRolesEnum, AvailableUserRoles } from "../utils/constants";

const projectMemberSchema = new Schema ({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    project : {
        type : Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },

    role : {
        type : String,
        enum : AvailableUserRoles,
        default : UserRolesEnum.MEMBER
    },
} , 
{
    timestamps : true
}
)

 export const ProjectMember = model("ProjectMember" , projectMemberSchema);


