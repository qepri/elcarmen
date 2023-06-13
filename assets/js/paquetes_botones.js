let content;
  
// Fetch the content from the JSON file on page load
window.addEventListener('DOMContentLoaded', (event) => {
    fetch('assets/js/paquetes.json')
    .then(response => response.json())
    .then(data => content = data);
});

function updateContent(key) {
    if (content && content[key]) {
        // Update '.paquete_foto' div
        document.querySelector('.paquete_foto h1').innerText = content[key].title;
        document.querySelector('.paquete_foto h2').innerText = content[key].subtitle;
        let ps = document.querySelectorAll('.paquete_foto p');
        ps[0].innerText = content[key].description1;
        ps[1].innerText = content[key].description2;
        document.querySelector('.paquete_foto .precio a').innerText = content[key].price;

        // Update '.paquete_foto_smol' div
        document.querySelector('.paquete_foto_smol h1').innerText = content[key].title;
        document.querySelector('.paquete_foto_smol h2').innerText = content[key].subtitle;
        let pss = document.querySelectorAll('.paquete_foto_smol p');
        pss[0].innerText = content[key].description1;
        pss[1].innerText = content[key].description2;
        // Assuming that you also have a '.precio a' element in '.paquete_foto_smol' div
        // If not, you can comment or remove the line below.
        document.querySelector('.paquete_foto_smol .precio a').innerText = content[key].price;
        
        // Update the images to match the current category
        updateImages(key);
    }
}
