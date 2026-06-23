(function () {
  const EMAIL_ONE = "27singhk@bsj.sch.id";
  const EMAIL_TWO = "eshan030709@gmail.com";

  const overlay = document.getElementById("modal-overlay");
  const modal = overlay.querySelector(".modal");
  const modalRole = document.getElementById("modal-role");
  const modalMailto = document.getElementById("modal-mailto");
  const modalCopyBtn = document.getElementById("modal-copy");
  const modalCopyFeedback = document.getElementById("modal-copy-feedback");
  const closeBtn = document.getElementById("modal-close");

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

  function openModal(role) {
    lastFocusedElement = document.activeElement;
    modalRole.textContent = role;
    modalMailto.href = buildMailto(role);
    modalCopyFeedback.textContent = "";
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
})();
