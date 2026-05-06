document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".museum-section");
  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    observer.observe(section);
  });

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const allLinks = document.querySelectorAll(".nav-links a, .footer-nav a");
  allLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
      link.style.color = "#fff";
      link.style.borderBottom = "2px solid #a11e1e";
    }
  });

  const searchInput = document.getElementById("dbSearch");
  const searchBtn = document.getElementById("searchBtn");
  const cards = document.querySelectorAll(".name-card");

  function performSearch() {
    const filter = searchInput.value.toLowerCase().trim();

    cards.forEach((card) => {
      const name = card.textContent.toLowerCase();
      if (filter !== "" && name.includes(filter)) {
        card.classList.add("found");
        cards.forEach((c) => {
          if (c !== card) c.style.opacity = "0.3";
        });
      } else {
        card.classList.remove("found");
        card.style.opacity = "1";
      }
    });

    if (filter === "") {
      cards.forEach((c) => {
        c.classList.remove("found");
        c.style.opacity = "1";
      });
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("found")) {
        card.style.transform = "translateY(-5px)";
        card.style.backgroundColor = "rgba(161, 30, 30, 0.15)";
        card.style.borderColor = "#a11e1e";
      }
    });
    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("found")) {
        card.style.transform = "translateY(0)";
        card.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
        card.style.borderColor = "rgba(161, 30, 30, 0.2)";
      }
    });
  });
  const modal = document.getElementById("infoModal");
  const closeModal = document.querySelector(".close-modal");
  const modalName = document.getElementById("modalName");

  document.querySelectorAll(".name-card").forEach((card) => {
    card.onclick = function () {
      const name = this.querySelector("span").innerText;
      modalName.innerText = name;
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    };
  });

  closeModal.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };
});
