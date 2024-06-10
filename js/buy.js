import { getData } from "./request.js";

const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const buyId = getQueryParam("id");
if (buyId) {
  getData(`https://dummyjson.com/buys/${buyId}`)
    .then((buy) => {
      if (buy) {
        updateBuyDetailsUI(buy);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const updateBuyDetailsUI = (buy) => {
  const buyTemplate = document.getElementById("buyTemplate");
  const buyContent = buyTemplate.content.cloneNode(true);

  const buyImg = buyContent.querySelector(".buy-img");
  const buyTitle = buyContent.querySelector(".buy-title");
  const oldPrice = buyContent.querySelector(".buy-oldprice");
  const newPrice = buyContent.querySelector(".buy-newprice");
  const discount = buyContent.querySelector(".buy-discount");

  buyImg.src = buy.thumbnail;
  buyTitle.textContent = buy.title;
  oldPrice.textContent = Rp`${buy.price}`;
  const newPriceFixed =
    (buy.price / 100) * (100 - buy.discountPercentage);
  newPrice.textContent = Rp`${newPriceFixed.toFixed(2)}`;
  discount.textContent = Disc`${Math.round(buy.discountPercentage)}%`;

  document.getElementById("buySection").appendChild(buyContent);
};
