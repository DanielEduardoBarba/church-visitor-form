import { useState } from "react"
import { API_URL } from "../resources.js"

export default function NewChildModal({ userID, setModal }) {

    const [name, setName] = useState("")
    const [dob, setDob] = useState("")
    const [allergies, setAllergies] = useState("")

    const submitChild = (e) => {
        e.preventDefault()

        const newChild = {
            name,
            dob,
            allergies,
            uid:userID
        }
        fetch(`${API_URL}/children`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newChild)
        })
        .then(incoming=>incoming.json())
        .then(response=>{
            //run print job
            console.log(response)
            setModal(0)
        })
        .catch(console.error)




    }

    return (
        <>
            <div className="blurr-background" onClick={() => setModal(0)} />

            <div className="new-child-modal">
                <form id="new-child-form" className="new-child-form" onSubmit={submitChild}>


                    <label>Name</label>

                    <input name="name" id="name" placeholder="Name"
                        onChange={e => {
                            setName(e.target.value)
                        }} />

                    <label>Date Of Birth</label>
                    <input type="date" id="dob" name="dob" 
                    onChange={e=>{
                        setDob(e.target.value)
                    }}/>

                    <label>Allergies?</label>
                    <textarea
                        name="allergies"
                        id="allergies"
                        placeholder="peanuts, dairy, etc..."
                        rows="5"
                        maxLength={100}
                        onChange={e => {
                            setAllergies(e.target.value)
                        }} />


                    <button>Add Child</button>
                </form>

            </div>


        </>
    )
}