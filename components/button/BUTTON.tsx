import React from 'react'
import styles from '../../styles/button.module.css'
type buttontype = {
    title:string,
    onclickhandler:(student:any)=>void
}

const BUTTON = (props:buttontype) => {
  return (
    <>
        <button className={styles.btn} onClick={()=>props.onclickhandler(props)}>
    {props.title}
</button>
    </>
  )
}

export default BUTTON