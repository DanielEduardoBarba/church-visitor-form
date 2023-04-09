import { useState, useEffect } from "react"
import { API_URL } from "../resources"
import Child from "../components/Child"
import NewChildModal from "../components/NewChildModal"
import DeleteModal from "../components/DeleteModal"


export default function ChildList({ userID, setUserID }) {
    const [children, setChildren] = useState("")
    const [IDs, setIDs] = useState([])
    const [names, setNames] = useState([])

    const [showOptions, setShowOptions] = useState(false)

    const [modal, setModal] = useState(0)

    useEffect(() => {

        //setIDs([])
        //setNames([])
        //console.log("WHAT IS SELECTED: ", selected)

        fetch(`${API_URL}/children/${userID}`)
            .then(incoming => incoming.json())
            .then(response => {
                setChildren(response)
                //console.log(response)
            })
            .catch(console.error)


    }, [modal])

    useEffect(() => {
        console.log("OKAY", IDs.length)
        if (IDs.length > 0) setShowOptions(true)
        else setShowOptions(false)

    }, [IDs,names])


    const signIn = () => {

        fetch(`${API_URL}/children/${userID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(IDs)
        })
            .then(incoming => incoming.json())
            .then(response => {
                //run print job
                console.log(response)
                setUserID("")
            })
            .catch(console.error)

    }


    return (
        <>

            <div className="child-list">
                <div className="child">
                    <p>Name</p>
                    <p>Birthday</p>
                    <p>Alergies</p>
                </div>

                {
                    children
                        ? children.map(child => <Child key={child._id} child={child} IDs={IDs} setIDs={setIDs} names={names} setNames={setNames} />)
                        : ""
                }

                {   IDs
                        ?<button onClick={signIn}>SIGN IN</button>
                        :""
                }
                <button onClick={() => {
                    setIDs([])
                    setNames([])
                    setModal(1)
                }}>ADD</button>

                <button onClick={() => {
                    setModal(2)
                    console.log(IDs)
                    console.log(names)
                }}>DELETE</button>

                <button onClick={() => {
                    setIDs([])
                    setNames([])
                    setUserID("")
                }}>Exit</button>

            </div>
            {
                modal == 1
                    ? <NewChildModal userID={userID} setModal={setModal} />
                    : modal == 2
                        ? <DeleteModal IDs={IDs} names={names} setModal={setModal} />
                        : ""
            }


        </>
    )
}