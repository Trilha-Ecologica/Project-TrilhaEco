import "../styles/QRCodeScanner.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import NavBar from "../components/NavBar";

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se getUserMedia está disponível
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;

            // Aguarde o vídeo carregar completamente
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().catch((err) => {
                console.warn("Erro ao iniciar a reprodução do vídeo:", err);
              });
            };
          }
        })
        .catch((err) => {
          console.error("Erro ao acessar a câmera:", err);
        });
    } else {
      console.error("getUserMedia não é suportado neste navegador.");
    }

    return () => {
      // Limpa os recursos da câmera ao desmontar o componente
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Verificar QR Code a cada intervalo
    const interval = setInterval(() => {
      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const video = videoRef.current;

        if (video.videoWidth && video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          // Detecta QR Code
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            setQrCode(code.data);
            navigate("/card-details", { state: { qrCodeData: code.data } });
            clearInterval(interval);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="camera-container">
      <video ref={videoRef} className="video-camera" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {qrCode && <p>QR Code detectado: {qrCode}</p>}
      <div className="div-navbar">
        <NavBar />
      </div>
    </div>
  );
};

export default QRCodeScanner;
