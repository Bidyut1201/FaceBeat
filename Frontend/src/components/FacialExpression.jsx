
import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from 'axios';

export default function App({setSongs}) {
  const videoRef = useRef(null);
  

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

      startVideo();
    };

    loadModels();

    
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  // const detectMood = () => {
  //   // Prevent multiple intervals
  //   if (intervalRef.current) return;

  //   intervalRef.current = setInterval(async () => {
  //     const detection = await faceapi
  //       .detectSingleFace(
  //         videoRef.current,
  //         new faceapi.TinyFaceDetectorOptions()
  //       )
  //       .withFaceExpressions();

  //     if (detection) {
  //       const expressions = detection.expressions;

  //       const topEmotion = Object.keys(expressions).reduce((a, b) =>
  //         expressions[a] > expressions[b] ? a : b
  //       );

  //       if(previousMoodRef.current !== topEmotion){
  //         previousMoodRef.current = topEmotion;
        
  //         console.log("Emotion:", topEmotion);
  //         axios
  //         .get(`http://localhost:3000/songs?mood=${topEmotion}`)
  //         .then((response) => {
  //           console.log(response.data);
  //           setSongs(response.data.songs);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       }

  //     } else {
  //       console.log("No face detected");
  //     }
  //   }, 1000); // detects every 1 second

  // };

  const detectMood = async () => {
    const detection = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (detection) {
      const expressions = detection.expressions;

      const topEmotion = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      console.log("Emotion:", topEmotion);

      axios
        .get(`http://localhost:3000/songs?mood=${topEmotion}`)
        .then((response) => {
          console.log(response.data);
          setSongs(response.data.songs);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No face detected");
    }
};


  return (
    <div
      style={{
        width: "100vw",
        // height: "100vh",
        backgroundColor: "black",
        // position: "relative",
        padding:"40px 100px",
        paddingBottom:0,
        // paddingTop:"40px",
        
      }}
    >
      <div
        style={{
          // position: "absolute",
          // top: "40px",
          // left: "100px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{
            width: "260px",
            height: "195px",
            borderRadius: "10px",
          }}
        />

        <button
          onClick={detectMood}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Detect Mood
        </button>
      </div>
    </div>
  );
}





