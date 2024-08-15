const apiKey = "qBHRbMZ_KQ94TNMoH0gpCGWIcOH2C14FaneOeuaIgMg";
const perPage = 30;
let currentPage = 1;

async function fetchImages(page) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

// function downloadImage(url) {
//   console.log("clicked");
//   const a = document.createElement("a");
//   a.click();

//   document.body.appendChild(a);
//   console.log(a);

//   document.body.removeChild(a);
// }
// const array = [];

// Function to render images into the container
function renderImages(images) {
  const container = document.getElementById("image-container");

  images.forEach((image) => {
    let url = image.urls.full;
    console.log(image);
    const filename = `image-${image.alt_description}.jpg`;
    console.log(filename);
    const imgWrapper = document.createElement("div");
    const img = document.createElement("img");
    const downloadBtn = document.createElement("a");

    // Create the image element
    img.src = image.urls.small;
    img.alt = image.alt_description;
    imgWrapper.classList.add("img-btn");

    // Create the download button
    downloadBtn.textContent = "Download";
    downloadBtn.classList.add("anchor");
    downloadBtn.style.cursor = "pointer";

    // Append image and button to the wrapper
    imgWrapper.appendChild(img);
    imgWrapper.appendChild(downloadBtn);
    container.appendChild(imgWrapper);

    // Open image in a new tab on click
    img.addEventListener("click", () => {
      window.open(url, "_blank");
    });

    // Handle download with Blob on click
    downloadBtn.addEventListener("click", () => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = filename;
          link.click();
          // URL.revokeObjectURL(blobUrl);
        })
        .catch((error) => console.error("Error fetching image:", error));
    });
  });
}

// Function to load more images on button click
async function loadMoreImages() {
  const images = await fetchImages(currentPage);
  if (images.length === 0) {
    console.log("No more images available.");
    return;
  }

  renderImages(images);
  currentPage++;
}

// Event listener for the "Load More" button
document.getElementById("load-more").addEventListener("click", loadMoreImages);

loadMoreImages();
