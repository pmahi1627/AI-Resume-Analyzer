const ResumeModel = require('../models/resume');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const mongoose = require('mongoose');

const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY,
});
exports.addResume = async(req,res)=>{
    try{
        const {job_desc, user} = req.body;
        // Validate user
        if(
            !user || 
            user === "undefined" ||
            !mongoose.Types.ObjectId.isValid(user)
        ){
            return res.status(400).json({
                message:"Valid user id is required"
            });
        }
        // Validate file
        if(!req.file){
            return res.status(400).json({
                message:"Resume PDF is required"
            });
        }
        const pdfPath = req.file.path;
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(dataBuffer);
        const prompt = `
You are a resume screening assistant.
Compare this resume with the job description.
Resume:
${pdfData.text}
Job Description:
${job_desc}
Return exactly:
Score: number between 0-100
Feedback:
short explanation
`;
        const response = await cohere.chat({
            model:"command-a-03-2025",
            messages:[
                {
                    role:"user",
                    content:prompt
                }
            ],
            max_tokens:500,
            temperature:0.7
        });
        const result = response.message.content[0].text;
        const scoreMatch = result.match(/Score:\s*(\d+)/i);
        const score = scoreMatch 
            ? parseInt(scoreMatch[1])
            : 0;
        const feedbackMatch = result.match(
            /Feedback:\s*([\s\S]*)/i
        );
        const feedback = feedbackMatch
            ? feedbackMatch[1].trim()
            : result;
        const newResume = new ResumeModel({
            user:user,
            resume_name:req.file.originalname,
            job_desc,
            score,
            feedback
        });
        await newResume.save();
        fs.unlinkSync(pdfPath);
        res.status(200).json({
            message:"Your analysis is ready",
            data:newResume
        });
    }catch(err){

        console.log(err);
        res.status(500).json({errir:'Server Error',message:err.message});
    }
}

exports.getResumeForAdmin = async(req,res)=>{
    try{
        let resumes = await ResumeModel.find({}).sort({createdAt: -1}).populate('user');
        return res.status(200).json({message: "Fetched All History", resumes: resumes});

    }catch(err){
        console.log(err);
        res.status(500).json({errir:'Server Error',message:err.message});
    }
};