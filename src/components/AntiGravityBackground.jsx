import { useRef, useEffect } from 'react';

const AntiGravityBackground = ({ isDay = true }) => {
    // We can add subtle cursor interaction later using these refs
    const bgRef = useRef(null);
    const orbRef = useRef(null);

    // CSS classes for the main background gradient
    const containerClasses = `fixed inset-0 w-full h-full transition-colors duration-1000 -z-50 overflow-hidden ${isDay
            ? 'bg-gradient-to-b from-blue-400 via-blue-300 to-blue-100'
            : 'bg-gradient-to-b from-[#0B1026] via-[#1B2256] to-[#2B32B2]'
        }`;

    // Celestial body styles (Sun vs Moon)
    const orbCurrentClasses = isDay
        ? 'w-64 h-64 bg-yellow-100 rounded-full shadow-[0_0_80px_rgba(255,223,0,0.6)] animate-float-slow'
        : 'w-48 h-48 bg-gray-100 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] animate-float-slower';

    // Position of celestial body
    const orbPosition = isDay
        ? 'top-[-5%] right-[-5%] opacity-90'
        : 'top-[10%] right-[10%] opacity-80';

    return (
        <div className={containerClasses} ref={bgRef}>
            {/* Ambient Background Glows */}
            <div className={`absolute w-full h-full transition-opacity duration-1000 ${isDay ? 'opacity-100' : 'opacity-0'}`}>
                {/* Day ambient light */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-300/30 to-transparent pointer-events-none" />
            </div>

            <div className={`absolute w-full h-full transition-opacity duration-1000 ${isDay ? 'opacity-0' : 'opacity-100'}`}>
                {/* Night ambient stars or glow */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle opacity-60" />
                <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle-delayed opacity-40" />
                <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle opacity-50" />
            </div>

            {/* Celestial Body (Sun/Moon) with Anti-Gravity Float */}
            <div className={`absolute ${orbPosition} transition-all duration-1000`}>
                <div className={orbCurrentClasses} ref={orbRef}>
                    {/* Inner detail for Moon (Crater hint) */}
                    {!isDay && (
                        <div className="absolute top-8 left-10 w-8 h-8 bg-gray-200/20 rounded-full blur-[2px]" />
                    )}
                </div>
            </div>

            {/* Floating Clouds / Fog - Decorative */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Layer 1 - Slowest */}
                <div className={`absolute top-20 left-10 w-48 h-20 rounded-full blur-3xl transition-colors duration-1000 animate-drift-slow ${isDay ? 'bg-white/40' : 'bg-blue-900/40'}`} />

                {/* Layer 2 - Medium */}
                <div className={`absolute top-1/2 right-20 w-64 h-24 rounded-full blur-3xl transition-colors duration-1000 animate-drift-medium ${isDay ? 'bg-white/30' : 'bg-blue-800/30'}`} />

                {/* Layer 3 - Subtle bottom fog */}
                <div className={`absolute bottom-[-10%] left-0 w-full h-64 blur-3xl transition-colors duration-1000 ${isDay ? 'bg-white/20' : 'bg-black/20'}`} />
            </div>
        </div>
    );
};

export default AntiGravityBackground;
