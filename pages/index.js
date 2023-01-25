import { useState, useEffect } from 'react';
import React from "react";
import styles from "../styles/index.module.css";

export default function Button() {

    const [data, setData] = useState("")
    const [show, setShow] = useState(false)
    const [state, setState] = React.useState({
        First_Name: "",
        Last_Name: "",
        Age: "",
        Gender: "",
        Phone_Number: "",
        Email_Address: "",
        Birth_Date: "",
        Birth_Place:  "",
        School:  "",
        Work_Place: "",
        Facebook: "",
        Twitter: "",
        Instagram: ""
      })

    const validate = (values) => {
        
    }

    const onKeyUp = (evt) => {

        const value = evt.target.value;
        setState({
        ...state,
        [evt.target.name]: value
        });
    }

    
  
    const onClick = async () => {
        
        if (state.First_Name.length == 0 || state.Last_Name.length == 0 ||
            state.Age.length == 0|| state.Gender.length == 0 ||
            state.Phone_Number.length == 0 ||  state.Email_Address.length == 0 ||
            state.Birth_Date.length == 0 || state.Birth_Place.length == 0 ||
            state.School.length == 0 || state.Work_Place.length == 0 ||
            state.Facebook.length == 0 || state.Twitter.length == 0 ||
            state.Instagram.length == 0 ){

                setData("Required To Fill Up Everything")
                setShow(true)

        }
        else if (!(state.Email_Address.includes("@" && "."))){
                setData("Invalid Email")
                setShow(true)
        }
        else if(!(state.Facebook.includes("facebook.com"))){
            setData("Not a Facebook Link")
            setShow(true)
        }
        else if(!(state.Twitter.includes("twitter.com"))){
            setData("Not a Twitter Link")
            setShow(true)
        }
        else if(!(state.Instagram.includes("instagram.com"))){
            setData("Not a Instagram Link")
            setShow(true)
    }    
        else{

       
        const myData = 
        {
            First_Name: state.First_Name,
            Last_Name: state.Last_Name,
            Age: state.Age,
            Gender: state.Gender,
            Phone_Number: state.Phone_Number,
            Email_Address: state.Email_Address,
            Birth_Date: state.Birth_Date,
            Birth_Place:  state.Birth_Place,
            School:  state.School,
            Work_Place: state.Work_Place,
            Facebook: state.Facebook,
            Twitter: state.Twitter,
            Instagram: state.Instagram
        }
        console.log(myData)

        const result = await fetch('http://192.168.0.101:4000/sca', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
        })  
        try {
            const fetchResponse = await fetch(`http://192.168.0.101:4000/sca`);
            const res = await fetchResponse.json();
            console.log(res)
            setData(res)
            setShow(true)
        } catch (e) {
            return e;
        } 
    }

    }

    return (
        <div className={styles.regPage}>
            <div className={styles.formContainer}>
                <h1 id={styles.h1}> TARGET INFORMATION </h1>
                <div className={styles.subCont}>
                    <div className={styles.Cont1}>
                        <label className={styles.label}> First Name: </label>
                        <input className={styles.input} type="text" name="First_Name" value={state.First_Name} onChange={onKeyUp} required></input >
                        <label className={styles.label}> Age: </label>
                        <input className={styles.input} type="number" name="Age" value={state.Age} onChange={onKeyUp} required></input>
                        <label className={styles.label}> Phone Number: </label>
                        <input className={styles.input} type="number" name="Phone_Number" value={state.Phone_Number} onChange={onKeyUp} required></input>
                        <label className={styles.label}> Birth Date: </label>
                        <input className={styles.input} type="date" name="Birth_Date" value={state.Birth_Date} onChange={onKeyUp}></input>
                        <label className={styles.label}> School: </label>
                        <input className={styles.input} type="text" name="School" value={state.School} onChange={onKeyUp}></input>                          
                    </div>
                    <div className={styles.Cont2}>
                    <label className={styles.label}> Last Name </label>
                        <input className={styles.input} type="text" name="Last_Name" value={state.Last_Name} onChange={onKeyUp}></input>
                        <label className={styles.label}> Gender: </label>
                        <input className={styles.input} type="text" name="Gender" value={state.Gender} onChange={onKeyUp}></input>
                        <label className={styles.label}> Email: </label>
                        <input className={styles.input} type="email" name="Email_Address" value={state.Email_Address} onChange={onKeyUp}></input>
                        <label className={styles.label}> Birth Place: </label>
                        <input className={styles.input} type="text" name="Birth_Place" value={state.Birth_Place} onChange={onKeyUp}></input>
                        <label className={styles.label}> Work Place: </label>
                        <input className={styles.input} type="text" name="Work_Place" value={state.Work_Place} onChange={onKeyUp}></input>                          
                    </div>
                </div>
                <p id={styles.p}> Social Media Link: </p>

                <div className={styles.subCont2}>
                    <div className={styles.Cont1}>
                        <label className={styles.label}> Facebook: </label>
                        <input className={styles.input} type="url" name="Facebook" value={state.Facebook} onChange={onKeyUp}></input>
                    </div>
                    <div className={styles.Cont2}>
                        <label className={styles.label}> Twitter: </label>
                        <input className={styles.input} type="url" name="Twitter" value={state.Twitter} onChange={onKeyUp}></input>
                    </div>
                    <div className={styles.Cont3}>
                        <label className={styles.label}> Instagram: </label>
                        <input className={styles.input} type="url" name="Instagram" value={state.Instagram} onChange={onKeyUp}></input>
                    </div>
                </div>
                <button className={styles.button} type="button" onClick={onClick}> ENTER INFORMATION </button>
            </div>
            <div>
            {
                        show ?
                        <div className={styles.messageBox1}>
                            <h2 id={styles.h2}> {data} </h2>
                            <button id={styles.button} onClick={()=>setShow(false)} > OK </button>
                        </div>:null
                    }
            </div>
        </div>
        
  )
}

