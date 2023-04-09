import { useState } from 'react';
import Login from './scenes/Login';
import ChildList from './scenes/ChildList';
import './App.css';

function App() {
  const [userID, setUserID] = useState("")
  
  return (
    <div className="whole-page">
      {
        !userID
          ?<Login setUserID={setUserID}/>
          :<ChildList userID={userID} setUserID={setUserID}/>
      }
      
    </div>
  );
}

export default App;
