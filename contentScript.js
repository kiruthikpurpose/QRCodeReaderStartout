// contentScript.js

// Function to scan the page for QR codes
function scanPageForQRCodes() {
    const qrCodeLinks = [];
    // Get all images on the page
    const images = document.getElementsByTagName('img');
    // Iterate through each image and check if it contains a QR code
    for (let i = 0; i < images.length; i++) {
        const qrCode = detectQRCode(images[i]);
        if (qrCode) {
            // If a QR code is detected, extract its URL and add it to the list
            const qrCodeLink = extractQRCodeLink(qrCode);
            qrCodeLinks.push(qrCodeLink);
        }
    }
    // Send the detected QR code links back to the extension's popup
    chrome.runtime.sendMessage({ qrCodeLinks: qrCodeLinks });
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'scanQRCode') {
        // Scan the page for QR codes
        scanPageForQRCodes();
    }
});
