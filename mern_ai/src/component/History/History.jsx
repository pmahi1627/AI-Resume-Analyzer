import React from 'react'
import styles from './History.module.css'
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
const History = () => {
  return (
    <div className = {styles.History}>
      <div className = {styles.HistoryCardBlock}>
        <Skeleton variant="rectangular" 
                  sx= {{borderRadius:"20px"}} 
                  width={266} height={200} />
        <div className = {styles.HistoryCard}>
          <div className = {styles.cardPercentage}>80%</div>
          <h2>FrontEnd Developer</h2>
          <p>Resume Name: Resume.pdf</p>
          <p>This resume is perfect and ready for submission. Also there are no issues with the content.</p>
          <p>Dated: 2025-11-18</p>
      </div>
      <div className = {styles.HistoryCard}>
          <div className = {styles.cardPercentage}>80%</div>
          <h2>FrontEnd Developer</h2>
          <p>Resume Name: Resume.pdf</p>
          <p>This resume is perfect and ready for submission. Also there are no issues with the content.</p>
          <p>Dated: 2025-11-18</p>
      </div>
      <div className = {styles.HistoryCard}>
          <div className = {styles.cardPercentage}>80%</div>
          <h2>FrontEnd Developer</h2>
          <p>Resume Name: Resume.pdf</p>
          <p>This resume is perfect and ready for submission. Also there are no issues with the content.</p>
          <p>Dated: 2025-11-18</p>
      </div>
      <div className = {styles.HistoryCard}>
          <div className = {styles.cardPercentage}>80%</div>
          <h2>FrontEnd Developer</h2>
          <p>Resume Name: Resume.pdf</p>
          <p>This resume is perfect and ready for submission. Also there are no issues with the content.</p>
          <p>Dated: 2025-11-18</p>
      </div>
      <div className = {styles.HistoryCard}>
          <div className = {styles.cardPercentage}>80%</div>
          <h2>FrontEnd Developer</h2>
          <p>Resume Name: Resume.pdf</p>
          <p>This resume is perfect and ready for submission. Also there are no issues with the content.</p>
          <p>Dated: 2025-11-18</p>
      </div>
    </div>
    </div>
  )
}

export default WithAuthHOC(History)