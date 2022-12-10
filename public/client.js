const socket = io();
let user_name;
const textarea = document.querySelector("#textarea");
const btn = document.querySelector("#btn");
const messageArea = document.querySelector(".message-area");

do {
  user_name = prompt("Enter your name to join");
} while (!user_name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
btn.addEventListener("click", () => {
  sendMessage(textarea.value);
});

function sendMessage(message) {
  let msg = {
    user: user_name,
    message: message.trim(),
  };
  // Appending the message to the message area
  appendMessage(msg, "outgoing");
  textarea.value = "";
  autoScroll();

  // Sending the message to the server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}
// Receiving the message from the server
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  autoScroll();
});

function autoScroll() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
