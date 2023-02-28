import React from 'react'
import { useState } from 'react'
import styles from '../../styles/studentlist.module.css'
import BUTTON from '../button/BUTTON'

type studentType = {
    name:string,
    rollno:string,
    batch:string,
    section:string,
}

const STUDENTLIST = () => {
    
    const [name,setName] = useState("")
    const [rollno,setRollno] = useState("")
    const [batch,setBatch] = useState("")
    const [section,setSection] = useState("")
    const [studentlist,setStudentlist] = useState<studentType[]>([{
        name:"Daniyal",
        rollno:"23",
        batch:"BSCS",
        section:"f1",
    },{
        name:"Farooq",
        rollno:"23223",
        batch:"ICS",
        section:"C3",
    }])

    const submithandler=()=>{
        const newdoc:studentType = {
            name:name,
            rollno:rollno,
            batch:batch,
            section:section,
        }
        setStudentlist([...studentlist , newdoc])
    }
    const onedithandler = (student:studentType)=>{
        const newdoc = {
            name:name,
            rollno:rollno,
            batch:batch,
            section:section,
        }
        let newlist
        newlist = studentlist.map((stu,index)=>{
            if ( stu == student ){
                return newdoc
            }else{
                return stu
            }
        })
        setStudentlist(newlist)
       
        
    }
    const onremovehandler = (student:studentType)=>{
        setStudentlist(studentlist.filter(s=> s!==student))
        
    }
  return (
    <>
       <div className={styles.conts}>
    <h1 className={styles.vert}>University of Erasmus mendas</h1>
    <div className={styles.loginbox}>
 
 <form>
   <div className={styles.userbox}>
     <input type="text" name="name" onChange={(e)=>{setName(e.target.value)}}></input>
     <label>Enter name</label>
   </div>
   <div className={styles.userbox}>
     <input type="text" name="rollno" onChange={(e)=>{setRollno(e.target.value)}} ></input>
     <label>Enter Rollno</label>
   </div>
   <div className={styles.userbox}>
     <input type="text" name="batch" onChange={(e)=>{setBatch(e.target.value)}} ></input>
     <label>Batch</label>
   </div>
   <div className={styles.userbox}>
     <input type="text" name="section" onChange={(e)=>{setSection(e.target.value)}} ></input>
     <label>Section</label>
   </div>
   <center>
   <a href="#" onClick={submithandler}>
          SUBMIT
      <span></span>
   </a></center>
 </form>
</div>
     
     <div className={styles.bodyy}>

     

        <div className={`container `}>
            <div className={`row ${styles.heading}`}>
                <div className="col-1"></div>
                <div className="col-2"><p  className={styles.headingtext}>Name</p></div>
                <div className="col-2"><p  className={styles.headingtext}>Rollno</p></div>
                <div className="col-2"><p  className={styles.headingtext}>Batch</p></div>
                <div className="col-1"><p  className={styles.headingtext}>Section</p></div>
                
            </div>
        </div>
        {studentlist.map((student:studentType)=>{
            return(
                <>
                <div className="container">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-2"><span className={styles.content}>{student.name}</span></div>
                <div className="col-2"><span className={styles.content}>{student.rollno}</span></div>
                <div className="col-2"><span className={styles.content}>{student.batch}</span></div>
                <div className="col-1"><span className={styles.content}>{student.section}</span></div>
                <div className="col-1"><BUTTON title="EDIT" onclickhandler={()=>onedithandler(student)}/></div>
                <div className="col-1"></div>
                <div className="col-1"><BUTTON title = "REMOVE" onclickhandler={()=>onremovehandler(student)}/></div>
            </div>
        </div>
                </>
            )
        })}</div>
        </div>
    </>
  )
}

export default STUDENTLIST