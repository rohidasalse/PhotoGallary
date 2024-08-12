const apiKey = "qBHRbMZ_KQ94TNMoH0gpCGWIcOH2C14FaneOeuaIgMg"; // Replace with your Unsplash Access Key
const perPage = 30; // Number of images per page
let currentPage = 1; // Start with the first page

// Function to fetch images from Unsplash API for a specific page
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

    if (!response.ok) {
      throw new Error(`Error fetching page ${page}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

// Function to render images into the container
function renderImages(images) {
  const container = document.getElementById("image-container");
  const button = document.getElementById("button");

  //   const container = document.getElementById("a");

  //   console.log(images);
  images.forEach((image) => {
    const img = document.createElement("img");
    // const btn = document.createElement("button");
    img.src = image.urls.small; // Use the URL you need
    img.alt = image.alt_description;
    container.appendChild(img);
    // button.appendChild(btn);
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

// Initial load
loadMoreImages();
