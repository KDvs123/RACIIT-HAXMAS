document.addEventListener("DOMContentLoaded", () => {
  const messagesDiv = document.getElementById("messages");
  const userInputContainer = document.getElementById("user-input-container");
  const userInputField = document.getElementById("user-input-field");
  const submitBtn = document.getElementById("submit-btn");

  let step = 0;
  let teamName = "";
  let teamMembersCount = 0;
  let currentMember = 0;

  const steps = [
    "Hi Welcome to Haxmas 2024! I'm HaxmasBot, your assistant for registration today.",
    "First of all, let's have a team name, shall we? Enter your team name to start with:",
    "Great! Now, how many team members will you have in your team?", // Radio buttons will appear here
    "Great! Now let's add your team leader's name:",
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

  const addRadioButtons = () => {
    userInputContainer.innerHTML = ""; // Clear previous input elements
    const radioContainer = document.createElement("div");
    radioContainer.classList.add("radio-container");
    const options = [2, 3, 4, 5];

    options.forEach((option) => {
      const label = document.createElement("label");
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "team-members";
      radioInput.value = option;
      label.textContent = option;
      label.prepend(radioInput);
      radioContainer.appendChild(label);
    });

    userInputContainer.appendChild(radioContainer);
    userInputContainer.appendChild(submitBtn); // Reattach submit button
  };

  const addMemberInputs = () => {
    userInputContainer.innerHTML = ""; // Clear previous input elements

    const memberDetails = document.createElement("div");
    memberDetails.classList.add("member-details");

    const nameGroup = document.createElement("div");
    nameGroup.classList.add("member-details-row");
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "member-name";
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);

    const emailGroup = document.createElement("div");
    emailGroup.classList.add("member-details-row");
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email:";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "member-email";
    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);

    const phoneGroup = document.createElement("div");
    phoneGroup.classList.add("member-details-row");
    const phoneLabel = document.createElement("label");
    phoneLabel.textContent = "Phone Number:";
    const phoneInput = document.createElement("input");
    phoneInput.type = "number";
    phoneInput.id = "member-phone";
    phoneGroup.appendChild(phoneLabel);
    phoneGroup.appendChild(phoneInput);

    memberDetails.appendChild(nameGroup);
    memberDetails.appendChild(emailGroup);
    memberDetails.appendChild(phoneGroup);

    userInputContainer.appendChild(memberDetails);
    userInputContainer.appendChild(submitBtn); // Reattach submit button
  };

  // Initialize the conversation with the first message
  appendMessage(steps[step]);

  submitBtn.addEventListener("click", () => {
    const userInput = userInputField.value.trim();
    const selectedRadio = document.querySelector(
      'input[name="team-members"]:checked'
    );

    if (step === 0) {
      teamName = userInput;
    } else if (step === 2 && selectedRadio) {
      teamMembersCount = parseInt(selectedRadio.value);
    }

    appendMessage(userInput || selectedRadio?.value, true);

    userInputContainer.style.display = "none"; // Hide input field before showing next message
    setTimeout(() => {
      step++;
      if (step < steps.length) {
        appendMessage(steps[step]);

        if (step === 2) {
          // Show radio buttons for team members count
          addRadioButtons();
        } else if (step === 3 || currentMember < teamMembersCount) {
          // Show inputs for team member details
          addMemberInputs();
          userInputField.value = "";
          currentMember++;
        }
      } else if (currentMember < teamMembersCount) {
        appendMessage(
          `Now let's add details for team member ${currentMember + 1}:`
        );
        addMemberInputs();
        currentMember++;
      } else {
        appendMessage("Thank you for registering! See you at Haxmas 2024.");
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
