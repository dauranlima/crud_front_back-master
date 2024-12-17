import React, { useRef } from 'react';
import Webcam from 'react-webcam';

function MyComponent() {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  };

  return (
    <div>
      <Webcam 
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capturar Imagem</button>
    </div>
  );
}