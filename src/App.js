import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';
import Stream from '../src/components/Stream';
import Landing from '../src/components/Landing'
import Login from '../src/components/Login'
import Register from '../src/components/Register'
import BeginStream from '../src/components/BeginStream';
import Payment from '../src/components/Payment';
import PaymentPage from '../src/components/PaymentPage';


const streamUrl = "https://3e78de676721.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.076677838612.channel.mDIQL4B6xZre.m3u8"


function App() {
  return (
     
    // <div className="App">
    //    <header className="App-header">
    //     <div style={{width: 1000}}>
    //     <ReactPlayer 
    //     url = {streamUrl}
    //     width="100%"
    //     height="100%"
    //     playing
        
    //     />
    //     </div>
    //     //  <div>
    //     //   <input label="message"></input>
    //     // </div>
    //   </header>
    // </div>
     

     <Router>
       <Switch>
         <Route exact path='/landing' component={Landing} />
         <Route exact path='/' component={Login} />
         <Route exact path='/register' component={Register} />
         <Route exact path='/stream' component={Stream} />
         <Route exact path='/beginstream' component={BeginStream} />
         <Route exact path='/payment' component={PaymentPage} />
       </Switch>
      </Router>
  );
}

export default App;
