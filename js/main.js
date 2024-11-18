// Initialize the animation system
function initStarSystem() {
    initCanvas();

    const stars = [];
    const maxStars = 300;
    const shootingStar = new ShootingStar();
    let lastTwinkleGroup = Date.now();
    let lastShootingStar = Date.now();
    const shootingStarInterval = 8000;
    const twinkleGroupInterval = 2000;

    // Create initial stars
    for (let i = 0; i < maxStars; i++) {
        stars.push(new Star());
    }

    function getRandomTimeOffset() {
        return Math.random() * 1000;
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        const now = Date.now();

        if (now - lastTwinkleGroup >= twinkleGroupInterval) {
            const availableStars = stars.filter(star => !star.isTwinkling);
            if (availableStars.length >= 4) {
                for (let i = 0; i < 4; i++) {
                    const randomIndex = Math.floor(Math.random() * availableStars.length);
                    const star = availableStars.splice(randomIndex, 1)[0];
                    
                    setTimeout(() => {
                        star.startTwinkle();
                    }, getRandomTimeOffset());
                }
            }
            lastTwinkleGroup = now;
        }

        if (!shootingStar.active && now - lastShootingStar >= shootingStarInterval) {
            shootingStar.reset();
            lastShootingStar = now;
        }

        stars.forEach(star => star.draw());
        
        shootingStar.update();
        shootingStar.draw();
        
        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Start animation
    animate();
}

// Initialize everything when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    initStarSystem();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove any existing glow effects
        document.querySelectorAll('.glass-container, .project-card').forEach(element => {
            element.classList.remove('glow-effect');
        });
        
        // Get the target section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        // Add glow effect to the target container
        if (targetId === 'projects') {
            // For projects section, glow all project cards
            targetSection.querySelectorAll('.project-card').forEach(card => {
                card.classList.add('glow-effect');
            });
        } else {
            // For other sections, glow the glass container
            const container = targetSection.querySelector('.glass-container');
            if (container) {
                container.classList.add('glow-effect');
            }
        }
        
        // Smooth scroll to the section
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});