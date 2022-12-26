import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './VideoStream.css';

import { doc, onSnapshot } from "firebase/firestore";
import { db } from './utils';
import { logDOM } from '@testing-library/react';

function VideoStream() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRefVideoStream = useRef(null);
  const currentUserVideoRefVideoStream = useRef(null);
  const peerInstance = useRef(null);

  const [hideUTBvideoScreen, sethideUTBvideoScreen] = useState(false)


  // onSnapshot(doc(db, "robots", "UTB-Tele-Bot"), (doc) => {
  //   console.log("Current data: ", doc.data().available);
  //   sethideUTBvideoScreen(!(doc.data().available))
  // });

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
        currentUserVideoRefVideoStream.current.srcObject = mediaStream;
        currentUserVideoRefVideoStream.current.play();
        // currentUserVideoRef.current.stop();
        call.answer(mediaStream)
        call.on('stream', function(remoteStream) {
          remoteVideoRefVideoStream.current.srcObject = remoteStream
          remoteVideoRefVideoStream.current.play();
        });
      });
    })

    peerInstance.current = peer;


   

  }, [])



  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {

      currentUserVideoRefVideoStream.current.srcObject = mediaStream;
      currentUserVideoRefVideoStream.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream)

      call.on('stream', (remoteStream) => {
        remoteVideoRefVideoStream.current.srcObject = remoteStream
        remoteVideoRefVideoStream.current.play();
      });
    });

    
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
  }

  return (
    <div className="App">
      {/* <h1>Current user id is {peerId}</h1>
      <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button> */}
      {/* <div id={!hideUTBvideoScreen? "hide" :"videoCallHolder"}> */}
      <div id={"videoCallHolder"}>
        {/* <div> */}
          <video ref={remoteVideoRefVideoStream} id={"primary-video"} playsInline />
        {/* </div> */}
        {/* <div> */}
          <video ref={ currentUserVideoRefVideoStream} id={"secondary-video"} playsInline/>
        {/* </div> */}
        {/* <button onClick={() => {sethideUTBvideoScreen(false)}}>unhide the lad</button> */}
      </div>
    </div>
  );
}

export default VideoStream;
