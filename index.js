let imageUploadInput = document.getElementById("imageUpload");
let convertGrayscaleButton = document.getElementById("convertGrayscale");
let uploadedImage = document.getElementById("uploadedImage");
let grayscaleCanvas = document.getElementById("grayscaleImage");
let grayscaleContext = grayscaleCanvas.getContext("2d");

imageUpload.addEventListener("change", handleImageUpload);
convertGrayscaleButton.addEventListener("click", convertToGrayScale);

function handleImageUpload() {

    let file = this.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            uploadedImage.onload = () => {
                grayscaleCanvas.width = uploadedImage.width;
                grayscaleCanvas.height = uploadedImage.height;
            };
        };
        reader.readAsDataURL(file);
    }
}

function convertToGrayScale() {

    if (uploadedImage.src) {

        grayscaleContext.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);

        let imageData = grayscaleContext.getImageData(0, 0, grayscaleCanvas.width, grayscaleCanvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }
        
        grayscaleContext.putImageData(imageData, 0, 0);

    } else {
        alert("File not uploaded!");
    }
}