const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req, res) => {
    try {
        const {gender, dateOfBirth, about, contactNo} = req.body;
        //retrieve userId from auth middleware
        let userId = req.user.id;
        //fetch the user based on userId
        const user = await User.findById(userId);
        // take the additional profile id of the user
        const additionalDetailsId = user.additionalDetails;
        //update the details in profile collection based on id
        await Profile.findByIdAndUpdate(additionalDetailsId, {gender, dateOfBirth,about, contactNo})
        return res.status(200).json({
            success: true,
            message:"Profile Updated Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
        
    }
}


//delete account
exports.deleteAccount = async (req,res)=>{
    try {
        const userId = req.user.id;
        // deleteProfile
        // fetch details
        const details = await User.findById(userId);
        //delete additionalData from profile collection 
        await Profile.findByIdAndDelete(details.additionalDetails)
        //delete user from user collection
        await User.findByIdAndDelete(userId)
        return res.status(200).json({
            success: true,
            message: "Account deleted Successfully"
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
        
    }
}