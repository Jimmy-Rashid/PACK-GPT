const messageBox = document.getElementById("messageBox");
const responseBox = document.getElementById("responseBox");
const triggerButton = document.getElementById("triggerButton");
const slideUpModal = document.getElementById("slideUpModal");
const slideDownButton = document.getElementById("slideDownButton");

let queryMessageBox = document.getElementById("queryMessageBox");
let n = 0;

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
  triggerBotResponse(query, n);
});

responseBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    response = responseBox.value;
    sendHumanResponse(response, n);
    n++;
  }
});

// The restart button
slideDownButton.addEventListener("click", () => {
  slideUpModal.classList.add("translate-y-full");
  setTimeout(() => {
    clearResponse();
  }, 300);
});

function triggerBotResponse(response, n) {
  let botResponse = document.createElement("div");
  botResponse.className =
    "p-4 col-start-1 col-span-3 bg-packgreen-light rounded-xl botResponse";
  let botResponseContent = document.createTextNode(
    "This is a test response to the query: " + response
  );
  botResponse.appendChild(botResponseContent);

  try {
    bottomHumanResponse = document.getElementsByClassName("humanResponse")[n];
    bottomHumanResponse.insertAdjacentElement("afterend", botResponse);
  } catch {
    queryMessageBox.insertAdjacentElement("afterend", botResponse);
  }
}

function sendHumanResponse(response, n) {
  let humanResponse = document.createElement("div");
  humanResponse.className =
    "p-4 col-start-3 col-span-3 bg-packgreen-dark rounded-xl humanResponse";
  let humanResponseContent = document.createTextNode(response);
  humanResponse.appendChild(humanResponseContent);

  bottomBotResponse = document.getElementsByClassName("botResponse")[n];

  bottomBotResponse.insertAdjacentElement("afterend", humanResponse);
  triggerBotResponse(response, n);
  responseBox.value = "";
}

function clearResponse() {
  // let botResponse = document.getElementById("botResponse");
  // if (botResponse) {
  //   botResponse.remove();
  // }

  location.reload();
}
