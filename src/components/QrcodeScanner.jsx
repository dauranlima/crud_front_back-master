import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useZXing } from '@zxing/library';

function QRCodeScanner() {
    const webcamRef = useRef(null);
    const [result, setResult] = useState(null);
    const [scanning, setScanning] = useState(false);

    const { onResult, cameraRef } = useZXing({
        onResult: (result) => setResult(result.text)
    });

    const handleScan = () => {
        setScanning(true);
    };

    const handleStop = () => {
        setScanning(false);
    };

    const handleAddCart = () => {
        // Lógica para adicionar o item ao carrinho
        console.log('Adicionando ao carrinho:', result);
        // ... (sua lógica de adição ao carrinho)
    };

    return (
        <div>
            <Webcam
                ref={cameraRef}
                style={{
                    width: '320px',
                    height: '240px',
                    margin: 'auto',
                }}
            />
            {scanning && (
                <button onClick={handleStop}>Parar</button>
            )}
            {!scanning && (
                <button onClick={handleScan}>Iniciar Leitura</button>
            )}
            {result && (
                <div>
                    <p>Código QR Lido: {result}</p>
                    <button onClick={handleAddCart}>Adicionar ao Carrinho</button>
                </div>
            )}
        </div>
    );
}

export default QRCodeScanner;