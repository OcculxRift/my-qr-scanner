// Находим видео элемент
const video = document.getElementById("qr-video");

// Определяем объекты для чтения QR-кодов
const codeReader = new ZXing.BrowserQRCodeReader();

// Запускаем сканирование QR-кода
codeReader.decodeFromInputVideoDevice(undefined, "qr-video", (result, error) => {
  // Обрабатываем результаты сканирования
  if (result) {
    // Отображаем результат сканирования
    const qrResultElement = document.getElementById("qr-result");
    qrResultElement.textContent = "Готово";
    qrResultElement.style.fontSize = "5em";
    
    // Отправляем GET-запрос на сервер
    const url = "http://45.89.66.175/?text=" + result.text + "&status=warehouse";
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Отображаем ответ сервера
        qrResultElement.textContent = "Готово, " + data;
        qrResultElement.style.fontSize = "32px";
      })
      .catch(error => {
        console.error(error);
      });
  }
  if (error) {
    console.error(error);
  }
});
