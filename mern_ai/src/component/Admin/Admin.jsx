import React from 'react'
import styles from './Admin.module.css'
import Skeleton from '@mui/material/Skeleton';
const Admin = () => {
  return (
    <div className = {styles.Admin}>
      <div className = {styles.AdminBlock}>
      <Skeleton variant="rectangular" 
                  sx= {{borderRadius:"20px"}} 
                  width={266} height={450} />
        <div className = {styles.AdminCard}>
          <h2>Name</h2>
          <p style={{color:'blue'}}>Email:</p>
          <h3>Score: 50%</h3>
          <p>
            random text about the resume - 
          </p>
        </div>

        <div className = {styles.AdminCard}>
          <h2>Name</h2>
          <p style={{color:'blue'}}>Email:</p>
          <h3>Score: 50%</h3>
          <p>
            random text about the resume - 
          </p>
        </div>

        <div className = {styles.AdminCard}>
          <h2>Name</h2>
          <p style={{color:'blue'}}>Email:</p>
          <h3>Score: 50%</h3>
          <p>
            random text about the resume - 
          </p>
        </div>

        <div className = {styles.AdminCard}>
          <h2>Name</h2>
          <p style={{color:'blue'}}>Email:</p>
          <h3>Score: 50%</h3>
          <p>
            random text about the resume - 
          </p>
        </div>

        <div className = {styles.AdminCard}>
          <h2>Name</h2>
          <p style={{color:'blue'}}>Email:</p>
          <h3>Score: 50%</h3>
          <p>
            random text about the resume - 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Admin