/* ===============================
   VOLLEYHUB GOD MODE JS
================================ */

/* ===============================
   Mouse Glow Effect
================================ */

const glow = document.querySelector(".mouse-glow");

// Prevent errors if element not found
if (glow) {

    document.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

}
