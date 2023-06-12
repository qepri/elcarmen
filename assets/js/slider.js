window.addEventListener("DOMContentLoaded", function() {
    // Path to your JSON file
    const jsonUrl = 'assets/js/home.json';

    // Fetch JSON data
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            let imageIndex = 0;
            const imageElement = document.getElementById('slider-image');

            // Set initial image
            imageElement.src = data[imageIndex].src;

            // Change image every 2 seconds
            setInterval(function() {
                imageIndex = (imageIndex + 1) % data.length;
                imageElement.src = data[imageIndex].src;
            }, 5000);
        })
        .catch(error => console.error('Error:', error));
});
