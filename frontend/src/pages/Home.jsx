import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [permission, setPermission] = useState({
    camera: false,
    microphone: false,
  });
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStartTest = async () => {
    setIsRequestingPermission(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setPermission({ camera: true, microphone: true });
      streamRef.current = stream; // Store the stream reference
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setTimeout(() => {
        navigate("/test");
      }, 3000);
    } catch (err) {
      console.log("Permission denied");
      alert("You must grant camera and microphone access to proceed.");
      setIsRequestingPermission(false);
    }
  };

  useEffect(() => {
    return () => {
      // Stop the media stream when the component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to the Test Platform</h1>
      <p>
        Please read and accept the terms and conditions before starting the
        test.
      </p>
      <div className={styles.terms}>
        <p>Terms and Conditions:</p>
        <ul>
          <li>You must allow camera and microphone access.</li>
          <li>The test is monitored for suspicious activity.</li>
          <li>No external help is allowed during the test.</li>
        </ul>
      </div>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="termsCheckbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="termsCheckbox">I accept the terms and conditions</label>
      </div>
      <button
        onClick={handleStartTest}
        className={styles.startTestButton}
        disabled={!isChecked || isRequestingPermission}
      >
        Start Test
      </button>
      {isRequestingPermission && (
        <div className={styles.videoContainer}>
          <p>Requesting camera and microphone access...</p>
          <video ref={videoRef} autoPlay className={styles.video} />
        </div>
      )}
    </div>
  );
}

export default Home;
