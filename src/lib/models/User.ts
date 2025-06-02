import mongoose from "mongoose"
const schema = mongoose.Schema

//Todo: Add validation, indexing for username may be
const UserSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
        default: "https://img.icons8.com/nolan/100/user-default.png"
    },
    authProvider: {
        type: String,
        required: true,
        enum: ["google", "github", "twitter", "email"],
    },
    authProviderId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: function (this: any): boolean {
            return this.isOnboarded 
        },
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
                required: function (this: any) {
                    return this && this.isOnboarded
                },
            },
            geeksforgeeks: {
                type: String,
                required: false,
            },
            codeforces: {
                type: String,
                required: false,
            },
            codechef: {
                type: String,
                required: false,
            },
            hackerrank: {
                type: String,
                equired: false,
            },
            interviewbit: {
                type: String,
                required: false,
            },
            codingninjas: {
                type: String,
                required: false,
            },
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
  }, {  timestamps: true })

export default mongoose.models.User || mongoose.model("User", UserSchema)