import mongoose from 'mongoose';
const schema = mongoose.Schema;

//Todo: Add validation, indexing for username may be
const UserSchema = new schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    authProvider: String,
    authProviderId: String,
    username: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    education: {
        degree: String,
        branch: String,
        college: String,
        gradYear: String,
        location: String,
        current_profile: String
    },
    platforms: {
        dsa: {
            leetcode: String,
            geeksforgeeks: String,
            codeforces: String,
            codechef: String,
            hackerrank: String,
            interviewbit: String,
            codingninjas: String
        },
        dev: {
            github: String
        },
        others: {
            portfolio: String,
            linkedin: String,
            X: String
        }
    }
}, {
    timestamps: true
})

export default mongoose.models.User || mongoose.model('User', UserSchema)