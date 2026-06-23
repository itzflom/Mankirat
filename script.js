(function () {
  const WEB3FORMS_ACCESS_KEY = "5a02e537-5cd7-4c4c-8c87-fffdc516f4a0";

  const overlay = document.getElementById("modal-overlay");
  const modal = overlay.querySelector(".modal");
  const modalRole = document.getElementById("modal-role");
  const closeBtn = document.getElementById("modal-close");

  const applyForm = document.getElementById("apply-form");
  const formRole = document.getElementById("form-role");
  const formSubject = document.getElementById("form-subject");
  const formSubmitBtn = document.getElementById("form-submit-btn");
  const formStatus = document.getElementById("form-status");

  let lastFocusedElement = null;

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

  applyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = "Submitting...";
    formStatus.textContent = "";
    formStatus.classList.remove("form-status-success", "form-status-error");

    const formData = new FormData(applyForm);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

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
