// ==UserScript==
// @name         Google Scholar SciHub Button & DOI Redirect to Scihub
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a SciHub button to articles on Google Scholar and automatically redirects DOI links to Tesble.com when clicked.
// @author       You
// @match        https://scholar.google.com/*
// @match        *://*/*
// @grant        none
// ==/UserScript==

// Declare the base URL for SciHub3
const sciHubBaseUrl = 'https://www.tesble.com/';

// Function to add the SciHub Button on Google Scholar
function addSciHubButtons() {
    document.querySelectorAll('#gs_res_ccl_mid > div > div > h3').forEach(h3 => {
        const link = h3.querySelector('a');
        if (link && !h3.querySelector('.scihub-button')) { // Check if the button already exists
            const originalURL = link.href;
            const sciHubURL = `${sciHubBaseUrl}${originalURL}`;
            const button = document.createElement('a');
            button.textContent = 'SciHub'; // SciHub button text
            button.href = sciHubURL;
            button.target = '_blank'; // Open the link in a new tab
            button.className = 'scihub-button';
            button.style.marginLeft = '10px';
            button.style.padding = '5px 10px';
            button.style.backgroundColor = '#4CAF50';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.borderRadius = '5px';
            button.style.textDecoration = 'none';
            button.style.fontSize = '12px';
            h3.appendChild(button);
        }
    });
}

// Observe DOM changes to handle dynamic loading
const observer = new MutationObserver(() => {
    addSciHubButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

// Call the function initially to handle already existing buttons
addSciHubButtons();

// Function to convert DOI URL to Tesble format
function convertDOIToTesble(doiURL) {
    return 'https://www.tesble.com/' + doiURL.replace('https://doi.org/', '');
}

// Find all DOI links and redirect them
const links = document.querySelectorAll('a[href^="https://doi.org/"]');
links.forEach(link => {
    link.style.backgroundColor = '#4CAF50';
    link.style.color = '#fff';
    link.style.padding = '10px 20px';
    link.style.borderRadius = '5px';
    link.style.textDecoration = 'none';
    link.style.display = 'inline-block';

    link.addEventListener('mouseenter', () => {
        link.style.backgroundColor = '#45a049';
    });

    link.addEventListener('mouseleave', () => {
        link.style.backgroundColor = '#4CAF50';
    });

    link.addEventListener('click', function(event) {
        event.preventDefault();
        const doiURL = link.href;
        const tesbleURL = convertDOIToTesble(doiURL);

        // Redirect to the Tesble URL in the current tab
        window.location.href = tesbleURL;
    });
});
