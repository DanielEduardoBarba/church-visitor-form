

export default function SignUp({setView}) {
      

    return (
        <>

            <form id="login-form" className="login-form">
                <button onClick={()=>setView(2)}>LIST New Visitors</button>
                <button onClick={()=>setView(1)}>Visitor Form</button>
            </form>



        </>
    )
}