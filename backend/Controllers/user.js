const UserModel = require('../models/user');
exports.register = async(req,res) => {
    try{
        const{name,email,photoUrl} = req.body;
        const userExist = await UserModel.findOne({email:email});
        if(!userExist){
            let newUser = new UserModel({
                name,email,photoUrl
            });
            await newUser.save();
            return res.status(200).json({
                message: "User Registered Successfully",
                user:newUser
            })
        }
        return res.status(200).json({
            message: 'Welcom Back',
            user:userExist
        })
    }catch(err){
        console.log(err)
        res.status(500).json({errir:'Server Error',message:err.message});
    }
}