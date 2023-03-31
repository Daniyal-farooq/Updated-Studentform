import React from 'react'
import { useState } from 'react'
import styles from '../../styles/studentlist.module.css'
import BUTTON from '../button/BUTTON'
import {  db} from '../../database'
import { addDoc , collection, query } from 'firebase/firestore'
import { async } from '@firebase/util';
import { updateDoc , deleteDoc } from 'firebase/firestore'
import {doc} from 'firebase/firestore'
import { getDocs } from 'firebase/firestore'
import {useEffect} from 'react'

type studentType = {
    name:string,
    rollno:string,
    batch:string,
    section:string,
    id:string
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
        id:""
    }])
    const [re,setRe] = useState("")

    useEffect(()=>{
        gethandler();
    },[])
    
    const submithandler=async()=>{
        if(!name || !rollno || !batch || !section){
            console.log("Error uploading document");
            alert("Fill all the fields please!")
        }else{

            const newdoc = {
                name:name,
                rollno:rollno,
                batch:batch,
                section:section,
                
            }
    
                const docRef = await addDoc(collection(db , "students"), newdoc);
                setStudentlist([...studentlist,{...newdoc,id:docRef.id}]);
                setName("")
                setRollno("")
                setBatch("")
                setSection("")
                setRe("")
        }
        

    }
    const updatehandler = async (student:any)=>{
    
       
            setName(student.name)
            setRollno(student.rollno)
            setBatch(student.batch)
            setSection(student.section)
            setRe(student.id)
            
            const newdoc = {
                name:name,
                rollno:rollno,
                batch:batch,
                section:section,
                
            };
            await updateDoc(doc(db, "students", student.id),newdoc);

        
            
             let newlist = studentlist.map((stu)=>{
            
            if ( stu == student ){
                return {...newdoc,id:re}
            }else{
                return stu
            }
        })
        setStudentlist(newlist)
        setName("")
            setRollno("")
            setBatch("")
            setSection("")
            setRe("")
        console.log(studentlist);
        
       
        
    }
    const onremovehandler = async(student:studentType)=>{
        
        await deleteDoc(doc(db, "students" , student.id));
         
        setStudentlist(studentlist.filter(s=> s!==student))
        
    }
    const gethandler = async()=>{
        const querySnapshot = await getDocs(collection(db,"students"));
        let list:studentType[] = []
        querySnapshot.forEach((doc)=>{list.push({
            id:doc.id,
            name:doc.data().name,
            rollno:doc.data().rollno,
            batch:doc.data().batch,
            section:doc.data().section});});
            setStudentlist(list);
    }
  return (
    <>
       <div className={styles.conts}>
    <h1 className={styles.vert}>University of Erasmus mendas</h1>
    <div className={styles.loginbox}>
 
 <form>
   <div className={styles.userbox}>
     <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
     <label>Enter name</label>
   </div>
   <div className={styles.userbox}>
     <input type="text" name="rollno" value={rollno} onChange={(e)=>{setRollno(e.target.value)}} ></input>
     <label>Enter Rollno</label>
   </div>
   <div className={styles.userbox}>
     <input type="text" name="batch" value={batch} onChange={(e)=>{setBatch(e.target.value)}} ></input>
     <label>Batch</label>
   </div>
   <div className={styles.userbox}>
     <input type="text" name="section" value={section} onChange={(e)=>{setSection(e.target.value)}} ></input>
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
                <div className="col-1"><BUTTON title="UPDATE" onclickhandler={()=>updatehandler(student)}/></div>
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