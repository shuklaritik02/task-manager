import mongoose, {Schema , model} from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jasonwebtoken"
import { use } from "react";

const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localpath: String
        },
        default: {
             url: `https://via.placeholder.com/200x200.png`,
        localPath: "",
    },
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        index: true,

    },

    fullname: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    },

    isemailverified: {
        type: Boolean,
        default: false,
    },

    refershToken: {
        type: String,
    },

    forgotPasswordToken: {
        type: String,
    },

    forgotPasswordTokenExpiry: {
        type: Date,
    },

    emailVerificationToken: {
        type: String,
    },  

    emailVerificationTokenExpiry: {
        type: Date,
    },

}
, {    timestamps: true,
}
)

// hash password before saving

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
   next()
})

// compare password
usernameSchema.methods.iscorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generate access token

userSchema.methods.genrateAccessToken = function() {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY},
    )
}

/**
 * @description Method responsible for generating tokens for email verification, password reset etc.
 */

userSchema.methods.generateTemporaryToken = function (){
    // This token should be client facing
  // for example: for email verification unHashedToken should go into the user's mail and hashedToken should be stored in the database
  
  const unHashedToken = crypto.randomBytes(20).toString("hex")

    // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  // This is the expiry time for the token (20 minutes)
  const tokenExpiry = Date.now() + (20 * 60 * 1000); // 20 minutes;

  return { unHashedToken, hashedToken, tokenExpiry };
}





const User = model("User", userSchema)