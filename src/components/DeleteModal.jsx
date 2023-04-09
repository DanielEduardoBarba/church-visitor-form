import { useEffect } from "react"
import { API_URL } from "../resources.js"

export default function DeleteModal({ names, IDs, setModal }) {


    useEffect(()=>{
        console.log(IDs)
        console.log(names)
       // console.log(IDs)
    },[])
    const deleteChildren = (e) => {
        e.preventDefault()

        fetch(`${API_URL}/children`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(IDs)
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

            <div className="delete-children-modal">
                <form id="delete-children-form" className="delete-children-form" onSubmit={deleteChildren}>


                    <label>Names</label>

                    {names
                        ?names.map(child => <p>{child}</p>)
                        :""
                    }

                    <button>Confirm Delete</button>
                </form>

            </div>


        </>
    )
}