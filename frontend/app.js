const accessKey = "qBHRbMZ_KQ94TNMoH0gpCGWIcOH2C14FaneOeuaIgMg";
let page = 1;
let query = "";
const gallery = document.getElementById("image-container");
const loadMoreButton = document.getElementById("load-more");
const searchInput = document.getElementById("search-input");

async function fetchImages() {
  const url = query
    ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=30&client_id=${accessKey}`
    : `https://api.unsplash.com/photos?page=${page}&per_page=30&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const images = query ? data.results : data;

  displayImages(images);
}

// Display images in the gallery
function displayImages(images) {
  images.forEach((image) => {
    let url = image.urls.full;
    const filename = `image-${image.alt_description}.jpg`;
    // element created

    const subDiv = document.createElement("div");
    const imgElement = document.createElement("img");
    const downloadBtn = document.createElement("a");
    // adding the descriptions

    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description || "Unsplash Image";
    downloadBtn.textContent = "download";
    // adding the classlists
    gallery.classList.add("img-btn");
    downloadBtn.classList.add("ancher");
    // appending the elements
    subDiv.append(imgElement, downloadBtn);
    gallery.appendChild(subDiv);
    // view image functionality
    imgElement.addEventListener("click", () => {
      window.open(url, "-black");
    });

    //  download functionality

    downloadBtn.addEventListener("click", () => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = filename;
          link.click();
        })
        .catch((error) => console.error("Error fetching image:", error));
    });
  });
}

// Load more images
loadMoreButton.addEventListener("click", () => {
  page++;
  fetchImages();
});

// Search for images
searchInput.addEventListener("input", (e) => {
  query = e.target.value;
  page = 1;
  gallery.innerHTML = "";
  fetchImages();
});

// starting calling for accessing the images
fetchImages();
