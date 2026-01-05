const btn = document.getElementById('generate-btn');
const input = document.getElementById('text-input');
const qrContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('download-btn');

// 1. GENERATE THE QR CODE
btn.addEventListener('click', () => {
    const text = input.value;

    if (text === "") {
        alert("Please enter a link first!");
        return;
    }

    // Clear previous QR code and hide download button
    qrContainer.innerHTML = "";
    downloadBtn.style.display = "none";

    // Generate new QR code
    new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200
    });

    // Wait a tiny bit for the library to render the <img> tag, then show download button
    setTimeout(() => {
        const img = qrContainer.querySelector('img');
        if (img) {
            downloadBtn.style.display = "inline-block";
        }
    }, 300); 
});

// 2. DOWNLOAD THE IMAGE
downloadBtn.addEventListener('click', () => {
    const img = qrContainer.querySelector('img');
    
    if (img && img.src) {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'my-qrcode.png'; // The name of the file to save
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Image not ready yet. Please try again.");
    }
});