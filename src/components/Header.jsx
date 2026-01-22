import CityTime from './CityTime';

const Header = ({ city, country, timezone, sunrise, sunset, onSearchClick, onLocationClick, loading }) => {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <header className="mb-8">
      <div className="flex items-start justify-between">
        <div className="flex-1 drop-shadow-md">
          {/* Brand/Logo always at top left */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg tracking-tight">
            {city || 'VAYRO'}
          </h1>

          {/* Secondary Info: Country or Slogan */}
          {!city ? (
            <p className="text-sm text-gray-100 italic opacity-80">Weather, refined.</p>
          ) : (
            country && (
              <p className="text-sm text-blue-50 font-medium tracking-wide opacity-90">{country}</p>
            )
          )}

          {/* Dynamic City Time - Stacked Under City Name */}
          <div className="mt-4">
            {city && timezone !== undefined ? (
              <CityTime timezone={timezone} sunrise={sunrise} sunset={sunset} />
            ) : (
              <p className="text-sm text-white/80 drop-shadow-md font-medium tracking-wide uppercase">
                {formattedDate}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Search & Location Controls */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={onSearchClick}
            disabled={loading}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white shadow-lg transition-all border border-white/20 disabled:opacity-50"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={onLocationClick}
            disabled={loading}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white shadow-lg transition-all border border-white/20 disabled:opacity-50"
            aria-label="Use my location"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

