// Referencias al DOM
const openCameraBtn = document.getElementById('openCamera');
const closedCamera = document.getElementById('closedCamera');

const cameraContainer = document.getElementById('cameraContainer');
const video = document.getElementById('video');
const takePhotoBtn = document.getElementById('takePhoto');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let stream = null;

// Función para abrir la cámara
async function openCamera() {
    try {
        const constraints = {
            video: {
              facingMode: { ideal: 'user' }, // cámara frontal por defecto (más estable en iOS)
              width: { ideal: 320 },
              height: { ideal: 240 }
            }
          };
          
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        cameraContainer.style.display = 'block';
        openCameraBtn.textContent = 'Cámara Abierta';
        openCameraBtn.disabled = true;
        console.log('Cámara abierta exitosamente');
    } catch (error) {
        console.error('Error al acceder a la cámara:', error);
        alert('No se pudo acceder a la cámara. Verifica permisos.');
    }
}

// Función para tomar una foto
function takePhoto() {
    if (!stream) {
      alert('Primero abre la cámara.');
      return;
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/png');
    
    // Mostrar imagen para guardar manualmente
    const img = document.createElement('img');
    img.src = imageDataURL;
    img.alt = "Foto capturada";
    img.style.width = '320px';
    img.style.marginTop = '1rem';
    document.body.appendChild(img);
    
  }
  

// Función para cerrar la cámara
function closeCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
        video.srcObject = null;
        cameraContainer.style.display = 'none';
        openCameraBtn.textContent = 'Abrir Cámara';
        openCameraBtn.disabled = false;
        console.log('Cámara cerrada');
    }
}

// Eventos
openCameraBtn.addEventListener('click', openCamera);
takePhotoBtn.addEventListener('click', takePhoto);
closedCamera.addEventListener('click', closeCamera);


