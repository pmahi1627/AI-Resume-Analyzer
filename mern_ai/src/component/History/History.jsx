import React, { useContext } from 'react'
import styles from './History.module.css'
import Skeleton from '@mui/material/Skeleton'
import { useState, useEffect } from 'react'
import axios from "../../utils/axios"
import { AuthContext } from '../../utils/AuthContext'

const History = () => {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const { userInfo } = useContext(AuthContext)

    useEffect(() => {

        const fetchUserData = async () => {

            setLoader(true)

            try {

                const results = await axios.get(
                    `/api/resume/get/${userInfo?._id}`
                )

                console.log(results.data.resumes)

                setData(results.data.resumes)

            } catch (err) {

                console.log(err)
                alert("something went wrong")

            } finally {

                setLoader(false)

            }
        }

        fetchUserData()

    }, [])

    return (

        <div className={styles.History}>

            <div className={styles.HistoryBlock}>

                {loader && (
                    <>
                        <Skeleton
                            variant="rectangular"
                            sx={{ borderRadius: "20px" }}
                            width="100%"
                            height={200}
                        />

                        <Skeleton
                            variant="rectangular"
                            sx={{ borderRadius: "20px" }}
                            width="100%"
                            height={200}
                        />

                        <Skeleton
                            variant="rectangular"
                            sx={{ borderRadius: "20px" }}
                            width="100%"
                            height={200}
                        />
                    </>
                )}

                {!loader && data.map((item, index) => {

                    return (

                        <div
                            key={item._id || index}
                            className={styles.HistoryCard}
                        >

                            <div className={styles.cardPercentage}>
                                {item.score}%
                            </div>

                            <h2>
                                FrontEnd Developer
                            </h2>

                            <p>
                                Resume Name: {item.resume_name}
                            </p>

                            <p>
                                {item.feedback}
                            </p>

                            <p>
                                Dated: {item.createdAt.slice(0, 10)}
                            </p>

                        </div>

                    )

                })}

            </div>

        </div>

    )
}

export default WithAuthHOC(History)