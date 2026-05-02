let chatBox = document.getElementById("chatBox");

const currentUser = {
    name: "Temuujin",
    pic: "images/Profile.jpg" 
};

const botUser = {
    name: "Bot",
    pic: "images/Profile2.jpg"  
};

window.onload = function () {
    let history = localStorage.getItem("chatHistory");
    if (history) {
        chatBox.innerHTML = history;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};

function getTime() {
    let now = new Date();
    return now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
}

function addMessage(text, sender, user) {

    let row = document.createElement("div");
    row.classList.add("message-row");

    let msg = document.createElement("div");
    msg.classList.add("message");

    let meta = document.createElement("div");
    meta.classList.add("meta");
    meta.innerText = user.name + " • " + getTime();

    let img = document.createElement("img");
    img.classList.add("profile");
    img.src = user.pic;

    msg.innerText = text;

    let container = document.createElement("div");
    container.appendChild(meta);
    container.appendChild(msg);

    if (sender === "user") {
        row.classList.add("user-row");
        msg.classList.add("user");
        row.appendChild(container);
        row.appendChild(img);
    } else {
        msg.classList.add("bot");
        row.appendChild(img);
        row.appendChild(container);
    }

    chatBox.appendChild(row);
    chatBox.scrollTop = chatBox.scrollHeight;

    localStorage.setItem("chatHistory", chatBox.innerHTML);
}

function sendMessage() {
    let inputField = document.getElementById("userInput");
    let input = inputField.value.trim();

    if (input === "") return;

    addMessage(input, "user", currentUser);

    let lower = input.toLowerCase();
    let reply = "I don't understand";

    if (lower.includes("sainuu")) {
        reply = "sain";
    } else if (lower.includes("yu baina")) {
        reply = "yumgue";
    } else if (lower.includes("bye")) {
        reply = "bye";
    }

    setTimeout(() => {
        addMessage(reply, "bot", botUser);
    }, 400);

    inputField.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("userInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });
});

function clearChat() {
    localStorage.removeItem("chatHistory");
    chatBox.innerHTML = "";
}
