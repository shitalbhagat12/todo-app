import React, { useEffect } from 'react';

const Fireworks = () => {
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.display = 'block';

        const colors = ['#ff0000', '#ff9900', '#ffff00', '#33cc33', '#0066ff', '#6600cc'];
        let particles = [];
        const particleCount = 1000;

        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    radius: Math.random() * 5 + 2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: Math.random() * 5 + 2,
                    angle: Math.random() * 2 * Math.PI,
                    alpha: 1,
                    decay: Math.random() * 0.01 + 0.005
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                particle.x += particle.speed * Math.cos(particle.angle);
                particle.y += particle.speed * Math.sin(particle.angle);
                particle.alpha -= particle.decay;

                if (particle.alpha <= 0) {
                    particles.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = `rgba(${hexToRgb(particle.color)},${particle.alpha})`;
                ctx.fill();
            }

            if (particles.length > 0) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    createParticles();
                    animate();
                }, 1000); // Adjust the interval as needed
            }
        }

        function hexToRgb(hex) {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `${r},${g},${b}`;
        }

        createParticles();
        animate();
    }, []);

    return <canvas id="canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}></canvas>;
};

export default Fireworks;