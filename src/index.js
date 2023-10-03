const messageBox = document.getElementById("messageBox");
const triggerButton = document.getElementById("triggerButton");
const slideUpModal = document.getElementById("slideUpModal");
const slideDownButton = document.getElementById("slideDownButton");

triggerButton.addEventListener("click", () => {
  localStorage.setItem("query", messageBox.value);
  // console.log(localStorage.getItem('query'));

  // For release / testing

  //   (async () => {
  //     if (messageBox.value.length >= 10) {
  //       slideUpModal.classList.remove("translate-y-full");
  //     } else if (messageBox.value.length > 0) {
  //       alert("Please enter a more specific query!");
  //     } else if (messageBox.value == "") {
  //       alert("Please enter a query!");
  //     }
  //   })();

  slideUpModal.classList.remove("translate-y-full");
});

slideDownButton.addEventListener("click", () => {
  slideUpModal.classList.add("translate-y-full");
});
