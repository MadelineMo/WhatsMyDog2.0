let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  // for the number of slides, hide each image until called
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // next slide
  slideIndex++;
  // start at the begining
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

//source: https://www.w3schools.com/howto/howto_js_slideshow.asp