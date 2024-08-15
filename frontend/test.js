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
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

// Function to render images into the container
function renderImages(images) {
  const container = document.getElementById("image-container");

  images.forEach((image) => {
    let url = image.urls.full;
    const filename = `image-${image.alt_description}.jpg`;

    const imgWrapper = document.createElement("div");
    const img = document.createElement("img");
    const downloadBtn = document.createElement("a");
    downloadBtn.classList.add("ancher");
    container.classList.add("img-btn");
    imgWrapper.classList.add("img-btn");

    img.src = image.urls.small;
    img.alt = image.alt_description;
    downloadBtn.textContent = "download";

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(downloadBtn);
    container.appendChild(imgWrapper);
    img.addEventListener("click", () => {
      window.open(url, "-black");
    });

    // downloadBtn.addEventListener("click", () => {
    //   console.log(image);
    //   downloadBtn.download = `'${url}'`;
    //   console.log(url);
    // });
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
