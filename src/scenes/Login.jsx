import { useState } from "react"
import { initializeApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { fetchSignInMethodsForEmail } from "firebase/auth"
import { API_URL, firebaseConfig } from "../resources.js"


export default function Login({setUserID}) {
        const [email,setEmail]=useState("")
        const [phone,setPhone]=useState("")
        const [password,setPassword]=useState("")
        const [confirmPassword,setConfirmPassword]=useState("")

        const [error,setError]=useState("")


        const [isUser,setIsUser]=useState(0)
        

    const loginUser = (e) =>{
        e.preventDefault()
        const app = initializeApp(firebaseConfig)
        const auth = getAuth(app)


        console.log(email)
        console.log(phone)
        console.log(password)

        signInWithEmailAndPassword(auth,email, password)
        .then(_user=>{
            setUserID(_user.user.uid)
            //console.log("KAOKAOKAOKA")
        })
        .catch(e=>{
            console.error(e)
             setError(`Password or ${email?"email":"phone"} is not valid!`)
        })

    }
    const checkUser = (e) =>{
        e.preventDefault()

       const app = initializeApp(firebaseConfig)
       const auth = getAuth(app)

       if(phone){
        // const phoneProvider = new PhoneAuthProvider(auth)

        // phoneProvider.verifyPhoneNumber(phone)
        // .then(response=>{
        //     console.log(response)
        // })
       }

       
       if(email) fetchSignInMethodsForEmail(auth, email)
       .then(methods=>{
        console.log("METHODS ", methods.length)
        if(methods.length>0){
            console.log("REAYD TO LOG IN")
            setIsUser(1)
        }
        else{
            setIsUser(-1)
        }
       })
    
    }


    const registerUser = (e) =>{
        e.preventDefault()

        if(confirmPassword!=password){
            setError("Password not the same")
            return
        } 
        const app = initializeApp(firebaseConfig)
        const auth = getAuth(app)

        createUserWithEmailAndPassword(auth, email, password)
        .then(_user=>{
            setUserID(_user.user.uid)
            //console.log("KAOKAOKAOKA")
        })
        .catch(console.error)
    }

    return (
        <>

            <form id="login-form" className="login-form" onSubmit={e=>
                isUser==1
                    ?loginUser(e)
                    :isUser==0
                        ?checkUser(e)
                        :isUser==-1
                            ?registerUser(e)
                            :""  
                         }>

                {error?<p>{error}</p>:"" }
                <label>Email</label>

                <input name="email" id="email" placeholder="Email" 
                 disabled={phone?true:false}
                onChange={e => {
                    setEmail(e.target.value)
                }} />

                <label>Phone</label>
                <input name="phone" id="phone" placeholder="(---) --- ---"
               // disabled={email?true:false}
               disabled={true}
                    onChange={e => {
                        if (e.target.value >= 0) {
                            setPhone(e.target.value)
                        }
                        else document.getElementById("phone").value = e.target.value.substring(0, e.target.value.length - 1)
                     }} />

                {/* <select name="frequency" id="frequency" onChange={e => {
                 
                }}>
                    <option value="">Statement Frequency</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                  <option value="seconds">Seconds</option> 
                </select> */}

                { isUser?<label>Password</label>:""}
                {
                    isUser
                    ?<input name="password" id="password" placeholder="password" type="password"
                    onChange={e => {
                        setPassword(e.target.value)
                    }} />
                    :""
                }
                { isUser==-1?<label>Confirm Password</label>:""}
                {
                    isUser==-1
                    ?<input name="confirm-password" id="confirm-password" placeholder="confirm password" type="password"
                    onChange={e => {
                        setConfirmPassword(e.target.value)
                    }} />
                    :""
                }
                <button>{ 
                         isUser==1
                            ?"Login"
                            :isUser==0
                                ?"Find Parent"
                                :isUser==-1
                                    ?"Register"
                                    :""
                            }</button>
            </form>



        </>
    )
}