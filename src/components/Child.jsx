import {  useState } from "react"

export default function Child({ child, IDs, setIDs, names, setNames }) {
    const { _id, name, dob, allergies, loggedInAt } = child
    const [toggle,setToggle] = useState(false)

    const toggleSelect = () => {

console.log("MATH ", ((Number(loggedInAt)+3600000-Number(Date.now().toString()))/3600000).toFixed(2))
        if (!IDs.includes(_id)) {

            IDs.push(_id)
            setIDs(IDs)

            names.push(name)
            setNames(names)

            setToggle(true)
        }
        else {
            let newIDs = []
            let newNames = []

            for (let i = 0; i < IDs.length; i++) {
                if (IDs[i] != _id) {
                    newIDs.push(IDs[i])
                    newNames.push(names[i])
                }
            }
            setIDs(newIDs)
            setNames(newNames)
            setToggle(false)

        }
    }

    return (
        <>
            <div id="child" className="child" onClick={toggleSelect}
            
            style={{
                boxShadow:toggle?"0px 0px 30px 3px #000000":"",
                border:toggle?"5px solid #ff0000":"5px solid wheat",
                //one hour=3600000ms
                opacity: ((Number(loggedInAt)+(6*3600000)-Number(Date.now().toString()))/3600000).toFixed(2)>0
                    ?0.5
                    :1
            }}>
                <p>{name}</p>
                <p>{dob}</p>
                <p>{allergies ? allergies : "-none-"}</p>

            </div>
        </>
    )
}