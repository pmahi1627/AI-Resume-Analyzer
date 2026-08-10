import React, { useContext } from 'react'
import styles from './Login.module.css';
import KeyIcon from '@mui/icons-material/Key';
import GoogleIcon from '@mui/icons-material/Google';
import {auth,provider} from '../../utils/firebase';
import { signInWithPopup} from 'firebase/auth';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
const Login = () => {
    const{isLogin,setLogin,userInfo,setUserInfo} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL
    };

    const response = await axios.post('/api/user', userData);

console.log("Backend response:", response.data);

setUserInfo(response.data.user);
localStorage.setItem("userInfo", JSON.stringify(response.data.user));

    setLogin(true);
    localStorage.setItem("isLogin", "true");

    navigate('/dashboard');
  } catch (err) {
    alert('Something went wrong');
    console.log(err);
  }
};
  return (
    <div className={styles.Login}>

        <div className={styles.LoginCard}>

            <KeyIcon className={styles.keyIcon} />

            <h1>Login</h1>

            <p className={styles.loginSubtitle}>
                Sign in to continue to Resume Screening
            </p>

            <div
                className={styles.googleBtn}
                onClick={handleLogin}
            >
                <GoogleIcon className={styles.googleIcon} />

                <span>
                    Sign in with Google
                </span>
            </div>

        </div>

    </div>
)
}

export default Login 