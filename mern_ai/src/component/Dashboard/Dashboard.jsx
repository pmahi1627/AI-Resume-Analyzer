import React from 'react'
import styles from './Dashboard.module.css'
import GradeIcon from '@mui/icons-material/Grade';
import Skeleton from '@mui/material/Skeleton';
const Dashboard = () => {
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
              Upload Your Resume!
            </div>
            <div className = {styles.DashboardInputField}>
              <label htmlFor='inputField' className = {styles.analyzeAIBtn}>Upload Resume</label>
              <input type = 'file' accept='.pdf' id = 'inputField' />
            </div>
          </div>
          <div className = {styles.jobDesc}>
            <textarea className = {styles.txtArea} placeholder = 'Paste the complete job description here...' rows = {10} cols = {50} />
            <div className = {styles.analyzeBtn}>Analyze</div>
          </div>
        </div>
      </div>
      <div className={styles.DashboardRight}>
        <div className = {styles.DashboardRightTopCard}>
          <div>Analyze with AI</div>
          <img className={styles.profileImage} src={'original.jpg'}/>
          <h2>Name</h2>
        </div>
        {/*<div className = {styles.DashboardRightTopCard}>
        <div>Result</div>
        <div style = {{display: 'flex', justifyContent: 'center',alignItems: 'center',gap:20}}>
          <h1>75%</h1>
          <GradeIcon sx = {{fontSize: 30}} />
        </div>
        <div className = {styles.feedback}>
          <div>Feedback:</div>
          <div>Good match with the job description. You have the required skills and experience for this role.</div>
        </div> 
      </div> */}
      <Skeleton variant="rectangular" sx= {{borderRadius:"20px"}} width={280} height={200} />
      </div>
    </div>
    
  )
}

export default Dashboard