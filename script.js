// script.js

document.addEventListener('DOMContentLoaded', function() {
    const scanButton = document.getElementById('scanButton');
    const qrCodeLinksContainer = document.getElementById('qrCodeLinks');

    // Add event listener to the scan button
    scanButton.addEventListener('click', function() {
        // Clear previous results
        qrCodeLinksContainer.innerHTML = '';

        // Scan the page for QR codes
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            // Send message to content script to scan for QR codes
            chrome.tabs.sendMessage(tabs[0].id, { action: 'scanQRCode' });
        });
    });

    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.qrCodeLinks) {
            // Display the detected QR code links
            request.qrCodeLinks.forEach(function(qrCodeLink) {
                displayQRCodeLink(qrCodeLink);
            });
        }
    });

    function displayQRCodeLink(qrCodeLink) {
        // Display the QR code link in the popup
        const linkElement = document.createElement('a');
        linkElement.href = qrCodeLink.url;
        linkElement.textContent = qrCodeLink.text;
        linkElement.target = '_blank';

        const openButton = document.createElement('button');
        openButton.textContent = 'Open';
        openButton.addEventListener('click', function() {
            window.open(qrCodeLink.url, '_blank');
        });

        const qrCodeContainer = document.createElement('div');
        qrCodeContainer.appendChild(linkElement);
        qrCodeContainer.appendChild(openButton);
        qrCodeLinksContainer.appendChild(qrCodeContainer);
    }
});
