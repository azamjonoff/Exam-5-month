import { getData } from "./request.js";

const tempPopular = document.querySelector("#popular-template");
const tempDiscount = document.querySelector("#discount-template");
const popularList = document.querySelector(".popular-list");
const discountList = document.querySelector(".discount-list");

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
    .slice(0, 4)
    .forEach((prod) => {
      const clonePopular = tempPopular.content.cloneNode(true);
      const cardPopularImg = clonePopular.querySelector(".card-popular-img");
      cardPopularImg.setAttribute("src", prod.images[0]);

      const title = clonePopular.querySelector(".card-popular-title");
      title.textContent = prod.title;

      const cardPopularPrice = clonePopular.querySelector(
        ".card-popular-price"
      );
      cardPopularPrice.textContent = prod.price;

      const rating = clonePopular.querySelector(".card-popular-rating");
      rating.textContent = prod.rating;

      const btnShop = clonePopular.querySelector(".btn-shop");
      // btnShop.href = `./pages/buy.html?id=${prod.id}`;

      popularList.appendChild(clonePopular);
    });

  data
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 4)
    .forEach((prod) => {
      const cloneDiscount = tempDiscount.content.cloneNode(true);
      const img = cloneDiscount.querySelector(".card-discount-img");
      img.setAttribute("src", prod.images[0]);

      const title = cloneDiscount.querySelector(".card-discount-title");
      title.textContent = prod.title;

      const oldPrice = cloneDiscount.querySelector(".card-discount-old-price");
      oldPrice.textContent = prod.price;

      const newPrice = cloneDiscount.querySelector(".card-discount-price");
      newPrice.textContent = (
        prod.price -
        (prod.price / 100) * prod.discountPercentage
      ).toFixed();

      const persentage = cloneDiscount.querySelector(".percentage");
      if (prod.discountPercentage > 17) {
        persentage.textContent = ` ${prod.discountPercentage} `;
        persentage.style.display = "flex";
      }

      const rating = cloneDiscount.querySelector(".card-popular-rating");
      rating.textContent = prod.rating;

      const btnShop = cloneDiscount.querySelector(".btn-shop");
      btnShop.href = `./pages/buy.html?id=${prod.id}`;

      discountList.appendChild(cloneDiscount);
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

getData("https://dummyjson.com/products?limit=194")
  .then((data) => {
    updateUI(data.products);
  })
  .catch((err) => {
    console.log(err);
  });
