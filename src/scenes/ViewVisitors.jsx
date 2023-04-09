import { useState, useEffect } from "react"
import { API_URL } from "../resources"
import Visitor from "../components/Visitor"



export default function ViewVisitors() {
    const [visitors, setVisitors] = useState("")


    useEffect(() => {

        fetch(`${API_URL}/visitors`)
            .then(incoming => incoming.json())
            .then(response => {
                setVisitors(response)
                //console.log(response)
            })
            .catch(console.error)


    }, [])



    return (
        <>

            <div className="child-list">
                <div className="child">
                    <p>First Name</p>
                    <p>Last Name</p>
                    <p>Email</p>
                    <p>Phone</p>
                    <p>Prayer Request</p>
                </div>

                {
                    visitors
                        ? visitors.map(visitor => <Visitor key={visitor._id} visitor={visitor} />)
                        : ""
                }

              
            </div>



        </>
    )
}