import { useState } from "react"
import { API_URL } from "../resources.js"


export default function SignUp({setView}) {
        const [firstName,setFirstName]=useState("")
        const [lastName,setLastName]=useState("")
        const [email,setEmail]=useState("")
        const [phone,setPhone]=useState("")
        const [street,setStreet]=useState("")
        const [unit,setUnit]=useState("")
        const [state,setState]=useState("")
        const [zip,setZip]=useState("")
        const [zone,setZone]=useState("")
        const [prayer,setPrayer]=useState("")

        const [error,setError]=useState("")
        

    const signUpVisitor = (e) =>{
        e.preventDefault()

        const newVisitor={
            firstName,
            lastName,
            email,
            phone,
            street,
            unit,
            state,
            zip,
            zone,
            prayer
        }

        fetch(`${API_URL}/visitors`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newVisitor)
        })
        .then(incoming=>incoming.json())
        .then(response=>{
            console.log(response)
            if(response.message=="okay") setView(0)
        })
        .catch(console.error)

        
    }

    return (
        <>

            <form id="login-form" className="login-form" onSubmit={signUpVisitor}>

                {error?<p>{error}</p>:"" }
                <label>First Name</label>
                <input name="firstname" id="firstname" placeholder="first name" 
                 disabled={phone?true:false}
                onChange={e => {
                    setFirstName(e.target.value)
                }} />

                <label>Last Name</label>
                <input name="lastname" id="lastname" placeholder="last name" 
                 disabled={phone?true:false}
                onChange={e => {
                    setLastName(e.target.value)
                }} />

                <label>Email</label>
                <input name="email" id="email" placeholder="Email" 
                 disabled={phone?true:false}
                onChange={e => {
                    setEmail(e.target.value)
                }} />

                <label>Phone</label>
                <input name="phone" id="phone" placeholder="(---) --- ---"
              
                    onChange={e => {
                        if (e.target.value >= 0) {
                            setPhone(e.target.value)
                        }
                        else document.getElementById("phone").value = e.target.value.substring(0, e.target.value.length - 1)
                     }} />

                <label>Address</label>

                <input name="street" id="street" placeholder="street" type="street"
                    onChange={e => {
                        setStreet(e.target.value)
                    }} />
                <input name="unit" id="unit" placeholder="unit" type="unit"
                    onChange={e => {
                        setUnit(e.target.value)
                    }} />
                <input name="state" id="state" placeholder="state" type="state"
                    onChange={e => {
                        setState(e.target.value)
                    }} />
                <input name="zip" id="zip" placeholder="zip" type="zip"
                    onChange={e => {
                        setZip(e.target.value)
                    }} />

                <label>Zone</label>
                <input name="zone" id="zone" placeholder="zone" type="zone"
                    onChange={e => {
                        setZone(e.target.value)
                    }} />
                <label>Prayer Request</label>
                <input name="prayer" id="prayer" placeholder="prayer" type="prayer"
                    onChange={e => {
                        setPrayer(e.target.value)
                    }} />

                    
               
                <button>Submit</button>
            </form>



        </>
    )
}