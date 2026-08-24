/* =========================================
   AETHERSOFT
   JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       HEADER SCROLL
    ===================================== */

    const header = document.querySelector("#header");

    const updateHeader = () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================
       MENU MOBILE
    ===================================== */

    const menuToggle = document.querySelector("#menuToggle");
    const nav = document.querySelector("#nav");

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        nav.classList.toggle("active");

    });


    /* Fecha o menu ao clicar em um link */

    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            nav.classList.remove("active");

        });

    });


    /* =====================================
       DARK MODE
    ===================================== */

    const themeToggle = document.querySelector("#themeToggle");

    const savedTheme = localStorage.getItem("aethersoft-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀";
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        themeToggle.textContent = isDark ? "☀" : "◐";

        localStorage.setItem(
            "aethersoft-theme",
            isDark ? "dark" : "light"
        );

    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================
       CONTADORES
    ===================================== */

    const counters =
        document.querySelectorAll("[data-counter]");

    let countersStarted = false;

    const animateCounters = () => {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.counter);

            let current = 0;

            const duration = 1500;

            const startTime = performance.now();

            const updateCounter = (currentTime) => {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                const ease =
                    1 - Math.pow(1 - progress, 3);

                current =
                    Math.floor(target * ease);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent =
                        target + (target === 98 ? "%" : "+");
                }

            };

            requestAnimationFrame(updateCounter);

        });

    };


    const statsSection =
        document.querySelector(".stats");

    const statsObserver =
        new IntersectionObserver(
            entries => {

                if (entries[0].isIntersecting) {

                    animateCounters();

                    statsObserver.disconnect();

                }

            },
            {
                threshold: 0.3
            }
        );

    statsObserver.observe(statsSection);


    /* =====================================
       ANIMAÇÃO DO DASHBOARD
    ===================================== */

    const dashboard =
        document.querySelector(".dashboard-card");

    if (dashboard) {

        document.addEventListener("mousemove", event => {

            const x =
                (window.innerWidth / 2 - event.clientX) / 80;

            const y =
                (window.innerHeight / 2 - event.clientY) / 80;

            dashboard.style.transform =
                `rotate(2deg) translate(${x}px, ${y}px)`;

        });

    }


    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});