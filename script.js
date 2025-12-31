const pages = document.querySelectorAll(".page");
let currentPage = 0;
let isFlipping = false; // 🔒 animation lock

// Stack pages properly
pages.forEach((page, index) => {
  gsap.set(page, {
    rotationY: 0,
    zIndex: pages.length - index
  });
});

// Ambient book movement
gsap.to(".book", {
  y: -8,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Play music on first interaction
document.body.addEventListener("click", () => {
  document.getElementById("bgMusic").play();
}, { once: true });

// PAGE FLIP FUNCTION (FIXED)
function flipPage() {
  if (isFlipping) return;               // ❌ block spam clicks
  if (currentPage >= pages.length - 1) return;

  isFlipping = true;                    // 🔒 lock

  gsap.to(pages[currentPage], {
    rotationY: -180,
    duration: 1.8,
    ease: "power4.inOut",
    onComplete: () => {
      pages[currentPage].style.zIndex = 0; // send flipped page back
      currentPage++;
      isFlipping = false;               // 🔓 unlock
    }
  });
}

// Click anywhere to flip
document.body.addEventListener("click", flipPage);
