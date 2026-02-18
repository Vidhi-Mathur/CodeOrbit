import mongoose from "mongoose"
const schema = mongoose.Schema

//Todo: Zod Validation
const UserSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function (this: any) {
            return this.authProvider === "credentials"
        },
        select: false
    },
    image: {
        type: String,
        required: false,
        default: "https://img.icons8.com/nolan/100/user-default.png"
    },
    authProvider: {
        type: String,
        required: true,
        enum: ["google", "github", "twitter", "credentials"],
        select: false,
        unique: false
    },
    authProviderId: {
        type: String,
        required: function (this: any) {
            return this.authProvider !== "credentials"
        },
        select: false
    },
    username: {
        type: String,
        unique: true,
        required: function (this: any): boolean {
            return this.isOnboarded 
        },
        lowercase: true,
        trim: true
    },
    isOnboarded: {
        type: Boolean,
        default: false,
    },
    education: {
        degree: {
            type: String,
            required: function (this: any) {
                return this && this.isOnboarded
            },
        },
        branch: {
            type: String,
            required: false,
        },
        college: {
            type: String,
            required: function (this: any) {
                return this && this.isOnboarded
            },
        },
        gradYear: {
            type: Number,
            required: function (this: any) {
                return this && this.isOnboarded
            },
        },
        location: {
            type: String,
            required: function (this: any) {
                return this && this.isOnboarded
            },
        },
        currentProfile: {
            type: String,
            required: function (this: any) {
                return this && this.isOnboarded
            },
            enum: ["Student", "Fresher", "Working Professional", "Freelancer", "Other"],
        },
    },
    platforms: {
        dsa: {
            leetcode: {
                type: String,
                required: function (this: any): boolean {
                    //Access the parent document to check isOnboarded
                    const parentDoc = this.ownerDocument ? this.ownerDocument() : null;
                    return parentDoc ? parentDoc.isOnboarded : false;
                },
            },
            codeforces: {
                type: String,
                required: function (this: any): boolean {
                    const parentDoc = this.ownerDocument ? this.ownerDocument() : null;
                    return parentDoc ? parentDoc.isOnboarded : false;
                },
            }
        },
        dev: {
            github: {
                type: String,
                required: function (this: any): boolean {
                    //Access the parent document to check isOnboarded
                    const parentDoc = this.ownerDocument ? this.ownerDocument() : null;
                    return parentDoc ? parentDoc.isOnboarded : false;
                },
            },
        },
        others: {
            website: {
                type: String,
                required: false
            },
            linkedin: {
                type: String,
                required: function (this: any) {
                    //Access the parent document to check isOnboarded
                    const parentDoc = this.ownerDocument ? this.ownerDocument() : null;
                    return parentDoc ? parentDoc.isOnboarded : false;
                },
            },
            twitter: {
                type: String,
                required: false
            }
        }
    },
  }, {  timestamps: true, versionKey: false })

  UserSchema.index({ username: 1 }, { unique: true })
  UserSchema.index({ email: 1 }, { unique: true })

export default mongoose.models.User || mongoose.model("User", UserSchema)