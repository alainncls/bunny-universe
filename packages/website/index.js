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
});
