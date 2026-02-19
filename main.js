/* =====================================
   VOLLEYWOLLEY GOD MODE MAIN.JS
===================================== */


/* ===============================
   MOUSE GLOW EFFECT
================================ */

const glow = document.querySelector(".mouse-glow");

// Prevent errors if element missing
if(glow){

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

}


/* ===============================
   MAGNETIC BUTTON EFFECT
   (INSANE PREMIUM FEEL)
================================ */

const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .btn-nav");

buttons.forEach(btn => {

    btn.addEventListener("mousemove",(e)=>{

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;

        btn.style.transform = `translate(${x*0.15}px, ${y*0.15}px)`;

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform = "translate(0,0)";

    });

});


/* ===============================
   NAVBAR SCROLL GLOW EFFECT
================================ */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 20){
        navbar.style.boxShadow = "0 0 30px rgba(0,212,255,0.3)";
    }else{
        navbar.style.boxShadow = "none";
    }

});
