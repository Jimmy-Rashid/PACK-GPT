const messageBox = document.getElementById("messageBox");
const responseBox = document.getElementById("responseBox");
const triggerButton = document.getElementById("triggerButton");
const slideUpModal = document.getElementById("slideUpModal");
const restartButton = document.getElementById("restartButton");

let queryMessageBox = document.getElementById("queryMessageBox");
let n = 0;

// Checks if enter is pressed to send first query messsage
messageBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    queryCheck();
  }
});

// Checks if the "Ask" button is pressed instead to send first query messsage
triggerButton.addEventListener("click", () => {
  queryCheck();
});

// Checks if enter is pressed to send followup response
responseBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // For release / testing

    // (async () => {
    //   if (responseBox.value.length >= 10) {
    //     response = responseBox.value;
    //     sendHumanResponse(response, n);
    //     n++;
    //   } else if (responseBox.value.length > 0) {
    //     alert("Please enter a more specific query!");
    //   } else if (responseBox.value == "") {
    //     alert("Please enter a query!");
    //   }
    // })();

    response = responseBox.value;
    sendHumanResponse(response, n);
    n++;
  }
});

// Checks if the "Restart" button is pressed to refresh page contents
restartButton.addEventListener("click", () => {
  slideUpModal.classList.add("translate-y-full");
  setTimeout(() => {
    clearResponse();
  }, 300);
});

// Makes sure initial query is long enough
function queryCheck() {
  query = messageBox.value;

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
}

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
  location.reload();
}
