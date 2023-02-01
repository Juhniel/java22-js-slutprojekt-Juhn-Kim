
const imageContainer = document.querySelector("#imageContainer");
const searchButton = document.querySelector("button");
let errorMsgH1 = document.querySelector("#errorMsgH1");
document.body.append(errorMsgH1);

searchButton.addEventListener("click", getUserInput);

function getUserInput(event){
    event.preventDefault();
    const searchInputValue = document.querySelector("#searchInput").value;
    const imagePerPageValue = document.querySelector("#dropDownImgAmount").value;
    const sortImagesValue = document.querySelector("#sortImages").value; 
    imageContainer.innerHTML = "";
    imageSizeValue = document.querySelector('input[name="imgSize"]:checked').value;
    getFlickrImages(searchInputValue, imagePerPageValue, sortImagesValue);    
}

    // Checks first if the searchInput has any value
    // If there is a value --> fetch
    // check if response status is between 200-299 
   
    function getFlickrImages(searchInputValue, imagePerPageValue, sortImagesValue) {
        searchInputValue = formatSearchInput(searchInputValue);
        const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e43da4908cf522366dcc1b1b0d90a856&text=${searchInputValue}&per_page=${imagePerPageValue}&page=1&sort=${sortImagesValue}&format=json&nojsoncallback=1`;
        if(searchInputValue = null || searchInputValue == ""){
            alert("Searchfield is empty!");
        }else{
            fetch(flickrURL).then(response => {
                if(response.status >= 200 && response.status < 300) {
                    errorMsgH1.innerText = "";
                    return response.json();
                }else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }).then(displayImages)
            .catch(error => {
                    console.error(error);
                    errorMsgH1.innerText = "An error occurred while fetching images. Please try again later.";
            })
        }
    }

// Places img elements and setting "a" attribute to be able to click on links

function displayImages(imageInfo) {
    if (imageInfo.photos.photo.length === 0) {
        return errorMsgH1.innerText = "No photos were found for the given search. Please try again with different keywords.";
    }else{
        imageInfo.photos.photo.forEach(photoElement => {
            const img = document.createElement("img");
            const a = document.createElement("a");
            const gridImageBox = document.createElement("div");
            
            gridImageBox.classList.add("gridImageBox");
            img.classList.add("gridImg");

            a.setAttribute("href", `https://live.staticflickr.com/${photoElement.server}/${photoElement.id}_${photoElement.secret}_${imageSizeValue}.jpg`);
            a.setAttribute("target", "_blank");
            img.src = `https://live.staticflickr.com/${photoElement.server}/${photoElement.id}_${photoElement.secret}_${imageSizeValue}.jpg`
            
            a.append(img);
            gridImageBox.append(a);
            imageContainer.append(gridImageBox);

            imageContainer.scrollIntoView({
                behavior: "smooth"
            });
        })
    }
}

// Format the input value from the search to replacing whitespaces with +

function formatSearchInput(searchInputValue) {
    return searchInputValue.replace(/\s+/g, "+");
}

// Shows the "ScrollToTop button if user has scrolled 300px on the Y-axis"
const scrollToTopButton = document.getElementById("scrollToTopButton");
window.onscroll = function() {
    if (window.pageYOffset >= 300) {
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
  };


// Scrolls all the way to the top if user clicks button.
  scrollToTopButton.addEventListener("click", ()=> {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
  })



