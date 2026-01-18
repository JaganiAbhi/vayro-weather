import { useEffect, useRef } from 'react';

const CloudBackground = () => {
  const containerRef = useRef(null);
  const cloudsRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId = null;

    // Wait for DOM to be ready
    const initClouds = () => {
      const cloudElements = container.querySelectorAll('.cloud-particle');
      if (cloudElements.length === 0) {
        requestAnimationFrame(initClouds);
        return;
      }

      // Initialize cloud elements with their base positions
      cloudsRef.current = Array.from(cloudElements).map((cloud) => {
        const rect = cloud.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(cloud);
        const left = parseFloat(computedStyle.left) || rect.left;
        const top = parseFloat(computedStyle.top) || rect.top;
        
        return {
          element: cloud,
          baseX: left + rect.width / 2,
          baseY: top + rect.height / 2,
          currentX: left + rect.width / 2,
          currentY: top + rect.height / 2,
          velocityX: (Math.random() - 0.5) * 0.12,
          velocityY: (Math.random() - 0.5) * 0.12,
          influenceRadius: 180 + Math.random() * 80,
          repulsionStrength: 0.2 + Math.random() * 0.1,
        };
      });

      // Start animation loop after initialization
      startAnimation();
    };

    // Animation loop for cursor interaction
    const startAnimation = () => {
      const animate = () => {
        cloudsRef.current.forEach((cloud) => {
          const dx = cloud.currentX - mousePositionRef.current.x;
          const dy = cloud.currentY - mousePositionRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < cloud.influenceRadius && distance > 0) {
            // Calculate repulsion force (stronger when closer, very soft)
            const force = (1 - distance / cloud.influenceRadius) * cloud.repulsionStrength;
            const angle = Math.atan2(dy, dx);
            
            // Apply very gentle repulsion - soft and airy
            cloud.velocityX += Math.cos(angle) * force * 0.02;
            cloud.velocityY += Math.sin(angle) * force * 0.02;
          }

          // Apply damping for smooth movement
          cloud.velocityX *= 0.96;
          cloud.velocityY *= 0.96;

          // Limit velocity to prevent excessive movement
          const maxVelocity = 2;
          cloud.velocityX = Math.max(-maxVelocity, Math.min(maxVelocity, cloud.velocityX));
          cloud.velocityY = Math.max(-maxVelocity, Math.min(maxVelocity, cloud.velocityY));

          // Update position
          cloud.currentX += cloud.velocityX;
          cloud.currentY += cloud.velocityY;

          // Apply transform using CSS custom properties to work with CSS animations
          const offsetX = cloud.currentX - cloud.baseX;
          const offsetY = cloud.currentY - cloud.baseY;
          cloud.element.style.setProperty('--cursor-x', `${offsetX}px`);
          cloud.element.style.setProperty('--cursor-y', `${offsetY}px`);
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    initClouds();

    // Track mouse position
    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="cloud-background">
      {/* Cloud particles */}
      <div className="cloud-particle cloud-1"></div>
      <div className="cloud-particle cloud-2"></div>
      <div className="cloud-particle cloud-3"></div>
      <div className="cloud-particle cloud-4"></div>
      <div className="cloud-particle cloud-5"></div>
      <div className="cloud-particle cloud-6"></div>
      <div className="cloud-particle cloud-7"></div>
      <div className="cloud-particle cloud-8"></div>
      <div className="cloud-particle cloud-9"></div>
      <div className="cloud-particle cloud-10"></div>
      <div className="cloud-particle cloud-11"></div>
      <div className="cloud-particle cloud-12"></div>
    </div>
  );
};

export default CloudBackground;
