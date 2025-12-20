document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.querySelector(".nav");
  const body = document.body;

  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    nav.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burgerMenu.classList.remove("active");
      nav.classList.remove("active");
      body.classList.remove("menu-open");
    });
  });

  const copyIcon = document.querySelector(".copy-icon");
  const contractAddress = "0x464946f3f004b37014D272d6195aC131Eb54B94d";

  copyIcon.addEventListener("click", () => {
    navigator.clipboard.writeText(contractAddress).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  });

  // Game Modal Functionality
  const gameModal = document.getElementById("gameModal");
  const modalClose = document.querySelector(".modal-close");
  const modalOverlay = document.querySelector(".modal-overlay");

  // Check if user has already seen the modal (using sessionStorage)
  const hasSeenModal = sessionStorage.getItem("hasSeenGameModal");

  // Show modal on page load if not seen in this session
  if (!hasSeenModal) {
    setTimeout(() => {
      gameModal.classList.add("active");
      body.style.overflow = "hidden";
    }, 500); // Small delay for better UX
  }

  // Close modal function
  const closeModal = () => {
    gameModal.classList.remove("active");
    body.style.overflow = "";
    sessionStorage.setItem("hasSeenGameModal", "true");
  };

  // Close button click
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close on overlay click (outside modal)
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gameModal.classList.contains("active")) {
      closeModal();
    }
  });
});
