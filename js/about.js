import { getData } from "./request.js";

const tempMen = document.querySelector("#men-template");
const tempWomen = document.querySelector("#women-template");
const menList = document.querySelector(".men-list");
const womenList = document.querySelector(".women-list");

const updateUI = (data) => {
  const carouselImg = document.querySelectorAll(".carousel-img");
  let counter = 0;
  carouselImg.forEach((img) => {
    if (counter < data.length) {
      img.setAttribute("src", data[counter++].images);
    }
  });

  data
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)
    .forEach((prod) => {
      const clonemen = tempMen.content.cloneNode(true);
      const cardmenImg = clonemen.querySelector(".card-men-img");
      cardmenImg.setAttribute("src", prod.images[0]);

      const title = clonemen.querySelector(".card-men-title");
      title.textContent = prod.title;

      const cardmenPrice = clonemen.querySelector(".card-men-price");
      cardmenPrice.textContent = prod.price;

      const rating = clonemen.querySelector(".card-men-rating");
      rating.textContent = prod.rating;

      menList.appendChild(clonemen);
    });

  data
    .sort((a, b) => b.womenPercentage - a.womenPercentage)
    .slice(0, 8)
    .forEach((prod) => {
      const cloneWomen = tempWomen.content.cloneNode(true);
      const img = cloneWomen.querySelector(".card-women-img");
      img.setAttribute("src", prod.images[0]);

      const title = cloneWomen.querySelector(".card-women-title");
      title.textContent = prod.title;

      const oldPrice = cloneWomen.querySelector(".card-women-old-price");
      oldPrice.textContent = prod.price;

      const newPrice = cloneWomen.querySelector(".card-women-price");
      newPrice.textContent = (
        prod.price -
        (prod.price / 100) * prod.discountPercentage
      ).toFixed();

      const persentage = cloneWomen.querySelector(".percentage");
      if (prod.discountPercentage > 17) {
        persentage.textContent = ` ${prod.discountPercentage} `;
        persentage.style.display = "flex";
      }

      const rating = cloneWomen.querySelector(".card-men-rating");
      rating.textContent = prod.rating;

      womenList.appendChild(cloneWomen);
    });

  //   const imgBottom = document.querySelectorAll(".img-bottom");
  //   let imgCounter = 14;
  //   imgBottom.forEach((img) => {
  //     if (imgBottom < data.length) {
  //       img.setAttribute("src", data[imgCounter++].images[0]);
  //     }
  //   });
};

let counterrr = 1;

setInterval(() => {
  document.getElementById("radio" + counterrr).checked = true;
  counterrr++;
  if (counterrr > 4) {
    counterrr = 1;
  }
}, 5000);

let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll(".carousel-slide");
  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? "block" : "none";
  });
}

function moveSlide(n) {
  const slides = document.querySelectorAll(".carousel-slide");
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  showSlides();
}

showSlides();

// const limit = 12;

getData(`https://dummyjson.com/products?limit=194`)
  .then((data) => {
    updateUI(data.products);
  })
  .catch((err) => {
    console.log(err);
  });
