import { useEffect, useRef, useState } from "react";
import styles from "./TestEnvironment.module.css";

function TestEnvironment() {
  const videoRef = useRef(null);
  const [permission, setPermission] = useState({
    camera: false,
    microphone: false,
  });

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setPermission({ camera: true, microphone: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log("Permission denied");
      setPermission({ camera: false, microphone: false });
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <div>
        {permission.camera && permission.microphone ? (
          <p>Camera and Microphone Access Granted</p>
        ) : (
          <p>Camera and Microphone Access Denied</p>
        )}
      </div>
      {permission.camera && permission.microphone && (
        <div className={styles.container}>
          <video ref={videoRef} autoPlay className={styles.video} />
        </div>
      )}
    </>
  );
}

export default TestEnvironment;
