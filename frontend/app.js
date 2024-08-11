// Application id 642240
// Access key {qBHRbMZ_KQ94TNMoH0gpCGWIcOH2C14FaneOeuaIgMg}
// secret key {zrB0xLf2UxCGvZ6mHAHWQIrTuyc7UiwJTLfOvyPnfjI}

/*
const apiUrl = "https://api.unsplash.com/photos";
const apiKey = "qBHRbMZ_KQ94TNMoH0gpCGWIcOH2C14FaneOeuaIgMg";

fetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: `Client-ID ${apiKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Handle the JSON data here
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  */
const apiKey = "qBHRbMZ_KQ94TNMoH0gpCGWIcOH2C14FaneOeuaIgMg"; // Replace with your actual Unsplash Access Key
const perPage = 30; // Number of images per page
const totalImages = 1200; // Total images you want to fetch
const totalPages = Math.ceil(totalImages / perPage); // Calculate total pages needed

async function fetchImages(page) {
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
}

async function getAllImages() {
  let images = [];
  for (let page = 1; page <= totalPages; page++) {
    console.log(`Fetching page ${page}`);
    const pageImages = await fetchImages(page);
    images = images.concat(pageImages);
  }
  return images;
}

getAllImages()
  .then((images) => {
    // console.log(images[0].urls.full);
    for (const element of images) {
      console.log(element.urls.full);
    }
  })
  .catch((error) => {
    console.error("Error fetching images:", error);
  });
