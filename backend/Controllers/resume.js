const ResumeModel = require('../models/resume');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const mongoose = require('mongoose');

const {CohereClientV2} = require('cohere-ai');
const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY,
})

exports.addResume = async(req,res)=>{
    
    try{
        const {job_desc, user} = req.body;
        if (!user || user === 'undefined' || !mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: 'Valid user id is required' });
        }
        //console.log(req.file);
        //console.log(job_desc,user);

        const pdfBuffer = req.file.buffer || null;
        const pdfPath = req.file.path;
        const fs = require('fs');
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(dataBuffer);

        const prompt = `
        You are a resume screening assistant. 
        Compare the following resume text with the provided 
        Job Description (JD) and give a match score (0-100) and feedback
        Resume : ${pdfData.text} 
        Job Description: ${job_desc}
        Return the score and a brief explanation in this format:
        Score: XX
        FeedBack:...
        
        `;

        const response = await cohere.chat({
            model: "command-a-03-2025",
            messages: [
        {
            role: "user",
            content: prompt
        }
        ],
        max_tokens: 500,
        temperature: 0.7,
        });

        let result = response.message.content[0].text;
        //console.log(result);

        const match = result.match(/Score:\s*(\d+)/i);
        const score = match ? parseInt(match[1], 10) : null;

        const reasonMatch = result.match(/Feedback:\s*([\s\S]*)/i);
        const reason = reasonMatch ? reasonMatch[1].trim() : null;
        const newResume = new ResumeModel({
            user,
            resume_name: req.file.originalname,
            job_desc,
            score,
            feedback: reason
        });

        await newResume.save();
        fs.unlinkSync(pdfPath);
        res.status(200).json({
            message: "Your analysis are ready", data: newResume
        });
    }catch(err){
        console.log(err);
        res.status(500).json({errir:'Server Error',message:err.message});
    }
}

exports.getAllResumeForUser = async (req,res)=>{
    try{
        const{user} = req.params;
        let resumes = await ResumeModel.find({user:user}).sort({createdAt: -1});
        return res.status(200).json({message: "Your Previous History", resumes: resumes});
    }catch (err){
        console.log(err);
        res.status(500).json({errir:'Server Error',message:err.message});
    }
}

exports.getResumeForAdmin = async(req,res)=>{
    try{
        let resumes = await ResumeModel.find({}).sort({createdAt: -1});
        return res.status(200).json({message: "Fetched All History", resumes: resumes});

    }catch(err){
        console.log(err);
        res.status(500).json({errir:'Server Error',message:err.message});
    }
}