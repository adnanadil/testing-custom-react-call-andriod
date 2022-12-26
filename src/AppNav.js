import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './AppNav.css';
import { Route, Routes, useNavigate } from "react-router-dom"

import { doc, onSnapshot } from "firebase/firestore";
import { db } from './utils';
import { logDOM } from '@testing-library/react';
import AddPage from './AddPage';
import VideoStream from './VideoStream';

function AppNav() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const [hideUTBvideoScreen, sethideUTBvideoScreen] = useState(false)


  const navigate = useNavigate()

  onSnapshot(doc(db, "robots", "UTB-Tele-Bot"), (doc) => {
    console.log("Current data: ", doc.data().available);
    sethideUTBvideoScreen(!(doc.data().available))
  });

  useEffect(() => {
    console.log("Addu!!!")
    if(!hideUTBvideoScreen){
      navigate("/", { replace: false})
    }else {
      navigate("/videoCall", { replace: false})
    }
  }, [hideUTBvideoScreen])

  return (
    <Routes>
      <Route path="/" element={<AddPage />} />
      <Route path="/videoCall" element={<VideoStream />} />
    </Routes>
  );
}

export default AppNav;
