import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './AddPage.css';

import { doc, onSnapshot } from "firebase/firestore";
import { db } from './utils';
import { logDOM } from '@testing-library/react';

function AddPage() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const [hideUTBvideoScreen, sethideUTBvideoScreen] = useState(false)


  // onSnapshot(doc(db, "robots", "UTB-Tele-Bot"), (doc) => {
  //   console.log("Current data: ", doc.data().available);
  //   sethideUTBvideoScreen(!(doc.data().available))
  // });

  useEffect(() => {
    

  }, [])


  

    
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
      {/* <div id={hideUTBvideoScreen? "hide" :"videoHolder"} autoPlay> */}
      <div id={"videoHolder"} autoPlay>
        {/* <video id="promoVideo">
        src=''
        </video> */}
        {/* <img id="logo-image" src ="images/UTB-logo.png"/> */}
        <video id="promoVideo" autoPlay loop muted>
            <source src="videos/UTB1.MP4" type="video/mp4" />
        </video>
        {/* <iframe src="https://drive.google.com/file/d/16kh7_isQFUwZ9LQ-1y07fv4mX3zIzFIq/preview" width="600" height="480" autoPlay></iframe> */}
      </div>
    </div>
  );
}

export default AddPage;
