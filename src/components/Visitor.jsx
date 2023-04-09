import {  useState } from "react"

export default function Visitor({ visitor}) {
    const{firstName,lastName, email, phone, prayer}=visitor



    return (
        <>
            <div id="child" className="child" >
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{email}</p>
                <p>{phone}</p>
                <p>{prayer}</p>
             


            </div>
        </>
    )
}