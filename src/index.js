const messageBox = document.getElementById("messageBox");
const triggerButton = document.getElementById("triggerButton");
const slideUpModal = document.getElementById("slideUpModal");
const slideDownButton = document.getElementById("slideDownButton");

let queryMessageBox = document.getElementById("queryMessageBox");

triggerButton.addEventListener("click", () => {
  query = messageBox.value;

  // localStorage.setItem("query", messageBox.value);
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
  queryMessageBox.innerHTML = query;
  triggerBotResponse();
});



// The restart button
slideDownButton.addEventListener("click", () => {
  slideUpModal.classList.add("translate-y-full");
  setTimeout(() => {
    clearResponse();
  }, 300);
});

function triggerBotResponse() {
  let botResponse = document.createElement("div");
  botResponse.id = "botResponse";
  botResponse.className =
    "p-4 col-start-1 col-span-3 bg-packgreen-light rounded-xl";
  let botResponseContent = document.createTextNode(
    "This is a test response to a query"
  );
  botResponse.appendChild(botResponseContent);

  queryMessageBox.insertAdjacentElement("afterend", botResponse);
}

async function clearResponse() {
  let botResponse = document.getElementById("botResponse");
  if (botResponse) {
    botResponse.remove();
  }
}
