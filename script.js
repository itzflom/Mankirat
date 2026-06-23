(function () {
  const EMAIL_ONE = "27singhk@bsj.sch.id";
  const EMAIL_TWO = "eshan030709@gmail.com";

  // Get a free access key at https://web3forms.com (enter your email, no
  // password/account needed) then paste it here. Add 27singhk@bsj.sch.id as
  // an "Additional Email" on the form in your Web3Forms dashboard so both
  // organisers receive every submission.
  const WEB3FORMS_ACCESS_KEY = "5a02e537-5cd7-4c4c-8c87-fffdc516f4a0";

  const overlay = document.getElementById("modal-overlay");
  const modal = overlay.querySelector(".modal");
  const modalRole = document.getElementById("modal-role");
  const modalMailto = document.getElementById("modal-mailto");
  const modalCopyBtn = document.getElementById("modal-copy");
  const modalCopyFeedback = document.getElementById("modal-copy-feedback");
  const closeBtn = document.getElementById("modal-close");

  const applyForm = document.getElementById("apply-form");
  const formRole = document.getElementById("form-role");
  const formSubject = document.getElementById("form-subject");
  const formSubmitBtn = document.getElementById("form-submit-btn");
  const formStatus = document.getElementById("form-status");

  let lastFocusedElement = null;

  function buildMailto(role) {
    const subject = encodeURIComponent(
      `Application: ${role} — Mankirat Dethroning Revolution`
    );
    const body = encodeURIComponent(
      `To the Provisional Revolutionary Command,\n\n` +
        `I wish to apply for the position of ${role} in the Mankirat Dethroning Revolution.\n\n` +
        `Relevant skills:\n- \n- \n- \n\n` +
        `Why I should be appointed:\n\n\n` +
        `In service of the cause,\n`
    );
    return `mailto:${EMAIL_ONE},${EMAIL_TWO}?subject=${subject}&body=${body}`;
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
    modalMailto.href = buildMailto(role);
    formRole.value = role;
    formSubject.value = `Application: ${role} — Mankirat Dethroning Revolution`;
    modalCopyFeedback.textContent = "";
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

  modalCopyBtn.addEventListener("click", async () => {
    const text = `${EMAIL_ONE}, ${EMAIL_TWO}`;
    try {
      await navigator.clipboard.writeText(text);
      modalCopyFeedback.textContent = "Email addresses copied to clipboard.";
    } catch (err) {
      modalCopyFeedback.textContent =
        `Could not copy automatically. Please copy manually: ${text}`;
    }
  });

  applyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
      formStatus.textContent =
        "Direct submission isn't configured yet — please use the email option below instead.";
      formStatus.classList.add("form-status-error");
      return;
    }

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
        "Something went wrong sending your application. Please use the email option below instead.";
      formStatus.classList.add("form-status-error");
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = "Submit Application";
    }
  });
})();
