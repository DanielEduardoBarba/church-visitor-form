
import { useState } from 'react';
import SignUp from './scenes/SignUp';
import ViewVisitors from './scenes/ViewVisitors';
import SelectView from "./scenes/SelectView"
import './App.css';

function App() {
  const [view, setView] = useState(0)
  return (
    <div className="whole-page">
      {
        view==0
          ?<SelectView setView={setView}/>
          :view==1
            ?<SignUp setView={setView} />
            :view==2
              ?<ViewVisitors />
              :""
      }
      
    </div>
  );
}

export default App;
