import React, {useEffect, useState, useRef} from 'react';
import styles from './Landing.module.css';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Payment from './Payment';

const style = { background: '#0092ff', padding: '0px 0' };

function Landing () {

  

    const[streams, Setstreams] = useState([])

    const myRefname= useRef(null);

    const handleClick = () => {
        myRefname.current.focus();
     }

     const myRef = useRef(null);

  const clickElement = (ref) => {
    ref.current.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      }),
    );
  };


    useEffect(() => {
      // console.log(localStorage.getItem("token"))
      axios.get('http://localhost:8080/twitchsl/v1/streams')
      .then(response => {
        Setstreams(response.data)
      })
    },[])

    let history = useHistory();

    function handleNav (streamKey) {
        history.push({
            pathname: '/Stream',
            state: { streamkey: streamKey }
        })
    }


    function handleNavPayment () {
      /* history.push({
          pathname: '/payment',
          state: { streamkey: streamKey }
      }) */
  }

    function handleBegin () {
      history.push({
          pathname: '/beginstream'
      })
  }

    return (
      <div>
        <Button onClick={() => {handleBegin()}} className={styles.begin}>Begin Streaming</Button>
        {/* <Payment
        orderId={45896588}
        name="Buying coins"
        amount="4500"></Payment> */}
        <div style={{margin: 50, marginTop: -20}}>
        <img style={{height: 50, width: 50}} src="https://www.digiseller.ru/preview/868654/p1_2692666_94395ea4.png" onClick={() => {handleNavPayment()}}></img>
        <h4>1000 bits</h4>
        </div>
        <div className={styles.tiles}>
             <Row gutter={16} style={{padding: 10}}>
               {streams.map(stream => <Col className="gutter-row" span={6}>
        <div className={styles.imgtile} onClick={() => {handleNav(stream.key)}}><img style={{height: '100%', width: '100%', objectFit: 'cover'}} src={stream.photoUrl}></img><h4>{stream.streamName}</h4> </div>
      </Col>)}
    </Row>
            
        </div>
        </div>
    )
}

export default Landing;