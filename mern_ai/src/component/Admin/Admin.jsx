import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import Skeleton from '@mui/material/Skeleton';
import axios from '../../utils/axios';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoader(true);

      try {
        const results = await axios.get('/api/resume/get');

        console.log(results.data.resumes);
        setData(results.data.resumes || []);
      } catch (err) {
        console.log(err);
        alert('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>

        {loader && (
          <>
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: '20px' }}
              width="100%"
              height={450}
            />

            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: '20px' }}
              width="100%"
              height={450}
            />

            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: '20px' }}
              width="100%"
              height={450}
            />
          </>
        )}

        {!loader &&
          data.map((item, index) => (
            <div
              className={styles.AdminCard}
              key={item?._id || index}
            >
              <h2>{item?.user?.name}</h2>

              <p style={{ color: 'blue' }}>
                Email: {item?.user?.email}
              </p>

              <h3>
                Score: {item?.score}%
              </h3>

              <p>
                {item?.feedback}
              </p>
            </div>
          ))}

      </div>
    </div>
  );
};

export default Admin;