
import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import GradeIcon from '@mui/icons-material/Grade';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/axios';
const Dashboard = () => {
  const[uploadFileText, setUploadFileText] = useState("Upload your resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");

  const[result,setResult] = useState(null);
  const {userInfo} = useContext(AuthContext);


  const handleOnChangeFile = (e)=>{
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  }

  const handleUpload = async()=>{
    setResult(null);
  if (!jobDesc || !resumeFile) {
    alert("Please fill Job Description & Upload Resume");
    return;
  }
  if (!userInfo?._id) {
    alert("User session not loaded yet. Please try again.");
    return;
  }
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo._id);
    setLoading(true)

    try{
      const result = await axios.post('/api/resume/addResume', formData);
      setResult(result.data.data);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className = {styles.Dashboard}>
      <div className = {styles.DashboardLeft}>
        <div className = {styles.DashboardHeader}>
          <div className = {styles.DashboardHeaderTitle}>Smart Resume Screening</div>
          <div className = {styles.DashboardHeaderSubTitle}>Resume Match Score</div>

          <div className = {styles.alertInfo}>
            <div>Important instructions:</div>
            <div className = {styles.alertInfoContent}>
              <div>Please paste the complete job description in the text area below.</div>
              <div>Only PDF(.pdf) files are accepted!!</div>
            </div>
          </div>

          <div className = {styles.DashboardUploadResume}>
            <div className = {styles.DashboardResumeBlock}>
              {uploadFileText}
            </div>
            <div className = {styles.DashboardInputField}>
              <label htmlFor='inputField' className = {styles.analyzeAIBtn}>Upload Resume</label>
              <input type = 'file' accept='.pdf' id = 'inputField' onChange={handleOnChangeFile} />
            </div>
          </div>
          <div className = {styles.jobDesc}>
            <textarea value = {jobDesc} onChange = {(e)=>{setJobDesc(e.target.value)}} className = {styles.txtArea} placeholder = 'Paste the complete job description here...' rows = {10} cols = {50} />
            <div className = {styles.analyzeBtn} onClick = {handleUpload}>Analyze</div>
          </div>
        </div>
      </div>
      <div className={styles.DashboardRight}>
        <div className = {styles.DashboardRightTopCard}>
          <div>Analyze with AI</div>
         

  <img
  className={styles.profileImage}
  src={userInfo?.photoUrl}
  alt="Profile"
/>


<h2>{userInfo?.name }</h2>
        </div>
      
      {
        result && <div className = {styles.DashboardRightTopCard}>
        <div>Result</div>
        <div style = {{display: 'flex', justifyContent: 'center',alignItems: 'center',gap:20}}>
          <h1>{result?.score}%</h1>
          <GradeIcon sx = {{fontSize: 30}} />
        </div>
        <div className = {styles.feedback}>
          <div>Feedback:</div>
          <div>{result?.feedback}</div>
        </div> 
      </div> 
      }
      {
        loading && <Skeleton variant="rectangular" sx= {{borderRadius:"20px"}} width={280} height={200} />
      }
      
      </div>
    </div>
    
  )
}

export default WithAuthHOC(Dashboard);