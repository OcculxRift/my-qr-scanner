import QrScanner from "./qr-scanner.min.js";
QrScanner.WORKER_PATH = "./qr-scanner-worker.min.js";

const video = document.getElementById("qr-video");
const startButton = document.getElementById("start-button");
const qrResult = document.getElementById("qr-result");

function setResult(label, result) {
  label.textContent = result;
  label.style.color = "#000000";
  label.style.fontSize = "5em";
}

function resetResult(label) {
  label.textContent = "QR code scanning...";
  label.style.color = "#666666";
  label.style.fontSize = "32px";
}

QrScanner.hasCamera().then(hasCamera => {
  if (!hasCamera) {
    alert("No camera found!");
  } else {
    const scanner = new QrScanner(video, result => {
      scanner.destroy();
      setResult(qrResult, result);

      fetch(`http://45.89.66.175/?text=${result}&status=warehouse`)
        .then(response => response.text())
        .then(text => {
          setResult(qrResult, text);
        })
        .catch(error => {
          console.error(error);
          resetResult(qrResult);
        });
    });

    startButton.addEventListener("click", () => {
      scanner.start();
      resetResult(qrResult);
    });
  }
});
