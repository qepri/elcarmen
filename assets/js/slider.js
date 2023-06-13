let contentImages;
let intervalId;

// Fetch the content from the JSON file on page load
window.addEventListener('DOMContentLoaded', (event) => {
    fetch('assets/js/home.json')
        .then(response => response.json())
        .then(data => {
            contentImages = data;
            updateImages(); // initial image update
        });
});

function updateImages(category = "") {
    const imageElement = document.getElementById('slider-image');

    // If there is a category, filter images. Otherwise, use all images.
    let images = category ? contentImages.filter(item => item.category === category) : contentImages;

    if (!images.length) {
        console.warn(`No images found for category: "${category}"`);
        return;
    }

    let imageIndex = 0;
    
    // Clear the previous interval
    if (intervalId) {
        clearInterval(intervalId);
    }

    // Set initial image
    imageElement.src = images[imageIndex].src;

    // Change image every 5 seconds
    intervalId = setInterval(function() {
        imageIndex = (imageIndex + 1) % images.length;
        imageElement.src = images[imageIndex].src;
    }, 5000);
}
