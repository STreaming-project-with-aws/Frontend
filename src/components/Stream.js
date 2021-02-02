import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player'
import styles from './Stream.module.css'
import { Select, Input, Button, Space } from 'antd';
import moment from 'moment';
import ReactScrollableList from 'react-scrollable-list'
import axios from 'axios'
import { UserDeleteOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";

// const streamUrl = "https://3e78de676721.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.076677838612.channel.mDIQL4B6xZre.m3u8"


function Stream(props) {

    
const location = useLocation();

    const[messages, Setmessages] = useState([])
    const[message, Setmessage] = useState({id: '',user: '', time: '', content: '', date: '', videoid: ''})
    const[messagecontent, Setmessagecontent] = useState('')
    const[viewcount, Setviewcount] = useState()

    useEffect(() => {
        axios.post('http://localhost:8080/twitchsl/v1/setview',{
              id:8,
              usersName:"ceejay10",
              videoId:"v-1"
        }).then(response => {
            console.log(response)
        })

        console.log(location.state.streamkey)

        
    },[])

    useEffect(() => {
        /* axios.get('http://localhost:8080/twitchsl/v1/viewcount')
        .then(response => {
            console.log(response)
            Setviewcount(response.data)
        }) */

        

        function getAlerts() {
            axios.get('http://localhost:8080/twitchsl/v1/viewcount')
            .then(response => {
                console.log(response)
                Setviewcount(response.data)
        })
          }

          function getComments() {
            axios.get('http://localhost:8080/twitchsl/v1/getcomments/v-1')
            .then(response => {
                console.log(response)
                Setmessages(response.data.reverse())
            })
          }

          getAlerts()
          getComments()
          const interval = setInterval(() => getAlerts(), 10000)
          const interval2 = setInterval(() => getComments(), 1000)
          return () => {
            clearInterval(interval);
            clearInterval(interval2);
          }
          
    },[])


    var count = 0

    function messageHandler() {
        var messageset = messages
        var messagenew = {
            id: count,
            user: localStorage.getItem("user"),
            content: messagecontent,
            date: moment().format('LTS'),
            videoid: 'v-1'
        }
        messageset.push(messagenew)
        axios.post('http://localhost:8080/twitchsl/v1/setcomment', {
            usersName: localStorage.getItem("user"),
            date: moment().format('LTS'),
            content: messagecontent,
            videoId: 'v-1'
        }).then(response => {
            console.log(response)
        })
        // Setmessages(messageset.reverse())
        Setmessagecontent('')
        Setmessage({id: '',user: '', time: '', content: '', date: '', videoid: ''})
        count++
    }
/* 
    function handleChangeText(e){
        // Setmessage(e.target.value)  
        var messagenew = {
            id: count,
            content: e.target.value
        } 
        Setmessage(messagenew)
        count++
    } */

    function handleChangeText(e){
        Setmessagecontent(e.target.value)  
        // Setmessage(messagenew)
        count++
    }

    function handleBits() {

    }



    return (
        <div style={{width: 1000}}>
           
           <div className={styles.checkout}>
           <Button type="dark" color="white" shape="circle" icon={<UserDeleteOutlined />}  />
           </div>
        <ReactPlayer 
        url = {location.state.streamkey}
        width="100%"
        height="100%"
        playing
        style={{textAlign: 'center', padding: 10}}
        
        />
        <div>
            <h2 className={styles.viewcount}>Views {viewcount}</h2>
        </div>
        <div className={styles.livechat}>
            Live chat
            <div className={styles.messagesbox}>
                {messages.map(message => <div style={{flexDirection: 'row', display: 'inline', borderBottomWidth: 1, borderBottomColor: 'grey', borderBottomStyle: 'solid', textAlign: 'left', width: 300, marginLeft: 0}}><div style={{width: '100%', paddingLeft: 10}}><div style={{color: '#9dfc03',  display:'inline-block', textAlign: 'left'/* ,position: 'absolute', marginLeft: 0 *//* marginLeft: -180 */}}>{message.usersName}</div><div style={{fontSize: 8,  display:'inline-block', marginLeft: 20, color: '#eb9834'}}>{message.date}</div><div style={{marginLeft: 20, display:'inline', wordWrap: 'break-word', color: 'white'}}>{message.content}</div></div><br/></div>)}
            </div>
            {/* <ReactScrollableList
  listItems={messages}
  heightOfItem={40}
//   maxItemsToRender={10}
  style={{height: 200, color: '#333' }}
/> */}
            
            <div className={styles.message}>
            <Input value={messagecontent} onChange={handleChangeText} style={{marginTop: 10, width: 170, marginLeft: 40}} placeholder="Your message" />
            <Button onClick={messageHandler} style={{}}>Send</Button>
            <br/>
            <div className={styles.sendbits} >
            <img style={{height: 50, width: 50}} src="https://www.digiseller.ru/preview/868654/p1_2692666_94395ea4.png" onClick={() => {handleBits()}}></img>
            <h4 className={styles.bits}>Send Bits</h4>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Stream;
