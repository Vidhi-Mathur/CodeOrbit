import mongoose from "mongoose"
const schema = mongoose.Schema

//Todo: Zod Validation
const UserSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        select: false
    },
    image: {
        type: String,
        default: "https://img.icons8.com/nolan/100/user-default.png"
    },
    authProvider: {
        type: String,
        required: true,
        enum: ["google", "github", "twitter", "credentials"],
        select: false
    },
    authProviderId: {
        type: String,
        select: false
    },
    username: {
        type: String,
        lowercase: true,
        trim: true
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    education: {
        degree: String,
        branch: String,
        college: String,
        gradYear: Number,
        location: String,
        currentProfile: {
            type: String,
            enum: ["Student", "Fresher", "Working Professional", "Freelancer", "Other"]
        },
    },
    platforms: {
        dsa: {
            leetcode: String,
            codeforces: String
        },
        dev: {
            github: String
        },
        social: {
            website: String,
            linkedin: String,
            twitter: String
        }
    },
  }, {  timestamps: true, versionKey: false })

  UserSchema.index({ username: 1 }, { unique: true })
  UserSchema.index({ email: 1 }, { unique: true })

export default mongoose.models.User || mongoose.model("User", UserSchema)