document.addEventListener("DOMContentLoaded", () => {
  const messagesDiv = document.getElementById("messages");
  const userInputContainer = document.getElementById("user-input-container");
  const userInputField = document.getElementById("user-input-field");
  const submitBtn = document.getElementById("submit-btn");
  let step = 0;
  let teamName = "";

  // Steps with messages that should appear in the chatbot message span
  const steps = [
    "Hi Welcome to Haxmas 2024 Please Enter your team Name",
    "Great! Now, please enter your name.",
    "Nice to meet you! Now, please enter your email.",
    "Almost done! Please enter your contact number.",
    "Thank you for registering! See you at Haxmas 2024.",
  ];

  const appendMessage = (content, isUser = false) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(isUser ? "user-message" : "chatbot-message");

    const icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = isUser ? "user-icon.png" : "chatbot-icon.png";
    icon.alt = isUser ? "User" : "Chatbot";

    const textSpan = document.createElement("span");
    if (isUser) {
      textSpan.textContent = content;
    } else {
      textSpan.classList.add("chatbot-text");
      typeText(textSpan, content);
    }

    messageDiv.appendChild(icon);
    messageDiv.appendChild(textSpan);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  const typeText = (element, text, delay = 50) => {
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
        userInputContainer.style.display = "flex"; // Show input field after typing animation
      }
    }, delay);
  };

  // Initialize the conversation with the first message
  appendMessage(steps[step]);

  submitBtn.addEventListener("click", () => {
    const userInput = userInputField.value.trim();
    if (userInput === "") return;

    appendMessage(userInput, true);

    if (step === 0) {
      teamName = userInput;
    }

    userInputContainer.style.display = "none"; // Hide input field before showing next message
    setTimeout(() => {
      step++;
      if (step < steps.length) {
        appendMessage(steps[step]);
        userInputField.value = "";
        userInputField.placeholder = steps[step].split(" ").slice(-2).join(" ");
      } else {
        userInputField.style.display = "none";
        submitBtn.style.display = "none";
      }
    }, 500); // Adjust delay if needed
  });

  userInputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      submitBtn.click();
    }
  });
});
