const overlay = document.querySelector(".overlay");

export const loading = (isPending) => {
  if (isPending) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
};
