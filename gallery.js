// Load the JSON data
fetch('gallery-data.json')
  .then(response => response.json())
  .then(data => {
    const filterContainer = document.querySelector(".gallery-filter");
    const galleryItemsContainer = document.getElementById("gallery-items");

    // Generate the gallery items
    data.forEach(item => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item " + item.category;
      galleryItem.innerHTML = `
        <div class="gallery-item-inner">
          <img src="${item.image}" alt="${item.category}">
        </div>
      `;
      galleryItemsContainer.appendChild(galleryItem);
    });

    const galleryItems = document.querySelectorAll(".gallery-item");

    filterContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("filter-item")) {
        // deactivate existing active 'filter-item'
        filterContainer.querySelector(".active").classList.remove("active");
        // activate new 'filter-item'
        event.target.classList.add("active");
        const filterValue = event.target.getAttribute("data-filter");
        galleryItems.forEach((item) => {
          if (item.classList.contains(filterValue) || filterValue === 'all') {
            item.classList.remove("hide");
            item.classList.add("show");
          } else {
            item.classList.remove("show");
            item.classList.add("hide");
          }
        });
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
