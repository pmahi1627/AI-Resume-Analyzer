import React from 'react'
import styles from './Login.module.css';
import KeyIcon from '@mui/icons-material/Key';
import GoogleIcon from '@mui/icons-material/Google';
const Login = () => {
  return (
    <div className={styles.Login}>
        <div className={styles.LoginCard}>
            <div className = {styles.LoginCardTitle}>
                <h1>Login</h1>
                <KeyIcon style={{fontSize:'50px'}}/>
            </div>
            <div className= {styles.googleBtn}> <GoogleIcon sx={{fontSize:'45px',color:'red'}}/> Sign in with Google!</div>
        </div>
    </div>
  )
}

export default Login