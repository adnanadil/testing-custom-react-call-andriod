import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './App.css';

import { doc, onSnapshot } from "firebase/firestore";
import { db } from './utils';
import { logDOM } from '@testing-library/react';

function App() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const [hideUTBvideoScreen, sethideUTBvideoScreen] = useState(false)


  onSnapshot(doc(db, "robots", "UTB-Tele-Bot"), (doc) => {
    console.log("Current data: ", doc.data().available);
    sethideUTBvideoScreen(!(doc.data().available))
  });

  useEffect(() => {
    // const peer = new Peer();
    const peer = new Peer('UTB'); 

    // peer.on('open', (id) => {
    //   setPeerId(id)
    // });
    peer.on('open', (id) => {
        // console.log(`This is the ID ${id}`)
        setPeerId(id)
      });

    
    peer.on('call', (call) => {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        // currentUserVideoRef.current.stop();
        call.answer(mediaStream)
        call.on('stream', function(remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    })

    peerInstance.current = peer;


    if (!hideUTBvideoScreen){
      
    }

  }, [hideUTBvideoScreen])


  if (!hideUTBvideoScreen){
  }

  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {

      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream)

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    });
  }

    
//     const unsubscribe = props.firebase
//     .db.collection('myCollectionName')
//     .onSnapshot(snapshot => {
//       if (snapshot.size) {
//         // we have something
        
//       } else {
//         // it's empty
//       }
//     })
  // return () => {
  //   unsub()
  //   }


  return (
    <div className="App">
      {/* <h1>Current user id is {peerId}</h1>
      <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button> */}
      <div id={hideUTBvideoScreen? "hide" :"videoHolder"} autoPlay>
        {/* <video id="promoVideo">
        src=''
        </video> */}
        <img id="promoVideo" src ="images/UTB-Logo-Big.png"/>
        {/* <video id="promoVideo" autoPlay loop muted>
            <source src="videos/UTB.MP4" type="video/mp4" />
        </video> */}
        {/* <iframe src="https://drive.google.com/file/d/16kh7_isQFUwZ9LQ-1y07fv4mX3zIzFIq/preview" width="600" height="480" autoPlay></iframe> */}
      </div>
      <div id={!hideUTBvideoScreen? "hide" :"videoCallHolder"}>
        {/* <div> */}
          <video ref={remoteVideoRef} id={"primary-video"} playsInline />
        {/* </div> */}
        {/* <div> */}
          <video ref={ currentUserVideoRef} muted id={"secondary-video"} playsInline autoPlay={false}/>
        {/* </div> */}
        {/* <button onClick={() => {sethideUTBvideoScreen(false)}}>unhide the lad</button> */}
      </div>
    </div>
  );
}

export default App;
