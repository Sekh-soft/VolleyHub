/* ===============================
   VOLLEYWOLLEY GOD MODE JS
================================ */

/*
=================================
Mouse Glow Effect
=================================
Moves glowing background based
on mouse position.
*/

// Select glow element
const glow = document.querySelector(".mouse-glow");

// Run only if element exists (prevents console errors)
if (glow) {

    document.addEventListener("mousemove", (e) => {

        // Update glow position
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

}
