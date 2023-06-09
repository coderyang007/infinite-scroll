const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []
let isInitialLoad = true;
// Unsplash API
let initialCount = 5;
const apiKey = '4fxaTv2e6EYUJZvLsk2SSkk6HDSi73r1rl5RAOokqPY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// new function to update apiUrl with new imageCount

function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// check if all images are loaded:
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imageCount = 30;
    }
}
// create a helper function for a "dry" code to avoide repetition of all the setAttributes (set attributes on DOM elements)
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements for Links and Photos, Add to DOM
function displayPhotos () {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run funtion for each phote's object in photosArray
    photosArray.forEach((photo) => {
        // create an <a> to link to Unsplash
         const item = document.createElement('a');
        // create attributes:
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img'); 
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //  Add event listener and check when it is finished loading:
        img.addEventListener('load', imageLoaded());
        // put<img> inside <a>, then put both inside imageContainer Element 
        // add img to item or <a>
        item.appendChild(img);
        imageContainer.appendChild(item);   
    });
}
// Get Photes from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30); 
            isInitialLoad = false; 
        } 
    } catch(error) {
    // Catch error
    }
}

// check to see if scrolling near the bottom of the page, load more photos
window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
   }
});
// On Load
getPhotos();