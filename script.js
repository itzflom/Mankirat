(function () {
  const WEB3FORMS_ACCESS_KEY = "5a02e537-5cd7-4c4c-8c87-fffdc516f4a0";

  const ROLE_QUESTIONS = {
    Commander: [
      "Describe a time you made a difficult, unpopular decision and stood by it.",
      "How would you rally the group around a necessary but controversial call?",
      "How do you take responsibility when a plan you led goes wrong?",
      "How do you lead with authority without becoming a second Mankirat?",
    ],
    "Co-Commander": [
      "How do you resolve a disagreement between two people who both report to you?",
      "Describe how you'd track progress across multiple teams without micromanaging.",
      "If the Commander were suddenly unavailable, what's the first thing you'd do?",
      "Give an example of you successfully delegating a task you wanted to do yourself.",
    ],
    "Propaganda Marketer": [
      "Link to a meme, post, or design you've made (if any).",
      "How would you make \"Mankirat is dethroned\" trend in the group chat?",
      "What's your go-to platform or format for getting a message to spread fast?",
      "Describe a time you created something compelling on a tight deadline.",
    ],
    Editor: [
      "Link to a writing sample, if you have one.",
      "Describe a time you caught a mistake before it became a public problem.",
      "How do you give feedback to someone sensitive about their writing?",
      "What's your process for keeping a consistent tone across multiple documents?",
    ],
    "Logistical Operations Manager": [
      "Describe a time you coordinated multiple moving parts under a deadline.",
      "How do you track a budget or resources without things slipping through the cracks?",
      "What's your method for catching a bottleneck before it becomes a problem?",
      "Have you organised logistics for an event or trip before? Describe it.",
    ],
    "Event Co-ordinator": [
      "Describe an event or gathering you've helped organise.",
      "How do you handle a last-minute scheduling conflict or venue issue?",
      "Roughly how many people can you realistically coordinate at once?",
      "What's your backup plan if your main plan falls through on the day?",
    ],
    "Communications Officer": [
      "How quickly can you typically respond to an urgent message?",
      "Describe a time you had to handle sensitive information discreetly.",
      "How would you communicate a difficult or unpopular update to the group?",
      "How do you stay diplomatic when two people disagree?",
    ],
  };

  const overlay = document.getElementById("modal-overlay");
  const modal = overlay.querySelector(".modal");
  const modalRole = document.getElementById("modal-role");
  const closeBtn = document.getElementById("modal-close");

  const applyForm = document.getElementById("apply-form");
  const formRole = document.getElementById("form-role");
  const formSubject = document.getElementById("form-subject");
  const questionFields = document.getElementById("form-question-fields");
  const formSubmitBtn = document.getElementById("form-submit-btn");
  const formStatus = document.getElementById("form-status");

  let lastFocusedElement = null;
  let currentQuestions = [];

  function renderQuestions(role) {
    currentQuestions = ROLE_QUESTIONS[role] || [];
    questionFields.innerHTML = "";
    currentQuestions.forEach((question, index) => {
      const label = document.createElement("label");
      label.className = "form-label";
      label.setAttribute("for", `form-question-${index}`);
      label.textContent = question;

      const textarea = document.createElement("textarea");
      textarea.className = "form-input";
      textarea.id = `form-question-${index}`;
      textarea.rows = 2;
      textarea.required = true;

      label.appendChild(textarea);
      questionFields.appendChild(label);
    });
  }

  function resetForm() {
    applyForm.reset();
    formStatus.textContent = "";
    formStatus.classList.remove("form-status-success", "form-status-error");
    formSubmitBtn.disabled = false;
    formSubmitBtn.textContent = "Submit Application";
  }

  function openModal(role) {
    lastFocusedElement = document.activeElement;
    modalRole.textContent = role;
    formRole.value = role;
    formSubject.value = `Application: ${role} — Mankirat Dethroning Revolution`;
    renderQuestions(role);
    resetForm();
    overlay.hidden = false;
    modal.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeModal() {
    overlay.hidden = true;
    document.removeEventListener("keydown", onKeydown);
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  document.querySelectorAll(".apply-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.role);
    });
  });

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  function buildMessageField() {
    return currentQuestions
      .map((question, index) => {
        const answer = document.getElementById(`form-question-${index}`).value;
        return `Q: ${question}\nA: ${answer}`;
      })
      .join("\n\n");
  }

  applyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = "Submitting...";
    formStatus.textContent = "";
    formStatus.classList.remove("form-status-success", "form-status-error");

    const formData = new FormData(applyForm);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("message", buildMessageField());

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        formStatus.textContent =
          "Application submitted! The Command will be in touch.";
        formStatus.classList.add("form-status-success");
        applyForm.reset();
        formRole.value = modalRole.textContent;
        formSubject.value = `Application: ${modalRole.textContent} — Mankirat Dethroning Revolution`;
        formSubmitBtn.textContent = "Submitted";
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      formStatus.textContent =
        "Something went wrong submitting your application. Please try again in a moment.";
      formStatus.classList.add("form-status-error");
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = "Submit Application";
    }
  });
})();
