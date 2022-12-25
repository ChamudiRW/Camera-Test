
    const videoElement = document.getElementById('videoElement');
    const btnTurnOn = document.getElementById('btnTurnOn');
    const btnTurnOff = document.getElementById('btnTurnOff');
    const btnRecord = document.getElementById('btnRecord');
    const btnStop = document.getElementById('btnStop');
    const downloadLink = document.getElementById('downloadLink');
    const constraints = {
      audio: false,
      video: { width: 640, height: 480 }
    };
    let stream;
    let mediaRecorder;
    let recordedBlobs;

    btnTurnOn.addEventListener('click', () => {
      navigator.mediaDevices.getUserMedia(constraints)
        .then((s) => {
          stream = s;
          videoElement.srcObject = stream;
        });
    });

    btnTurnOff.addEventListener('click', () => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      videoElement.srcObject = null;
    });

    btnRecord.addEventListener('click', () => {
      recordedBlobs = [];
      let options = { mimeType: 'video/webm;codecs=vp9' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = { mimeType: 'video/webm;codecs=vp8' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not supported`);
          options = { mimeType: 'video/webm' };
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.error(`${options.mimeType} is not supported`);
            options = { mimeType: '' };
          }
        }
      }

      try {
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        return;
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedBlobs.push(event.data);
}
};
  mediaRecorder.start(10);
});

btnStop.addEventListener('click', () => {
  mediaRecorder.stop();
  downloadLink.href = URL.createObjectURL(new Blob(recordedBlobs, { type: 'video/webm' }));
  downloadLink.download = 'recorded-video.webm';
  downloadLink.style.display = 'block';
});
 const recordingIndicator = document.getElementById('recordingIndicator');

btnRecord.addEventListener('click', () => {
  // ...
  recordingIndicator.innerHTML = 'Recording';
});

btnStop.addEventListener('click', () => {
  // ...
  recordingIndicator.innerHTML = '';
});

