import React, { useState, useEffect } from 'react';

// Your list of creative taglines
const taglines = [
  "Where Green Meets Home...",
  "Bring Life to Your Living Space.",
  "Plant Today, Breathe Tomorrow!",
  "Love in Every Leaf.",
  "Your Garden, Your Story",
  "Nature's Beauty, Delivered."
];

// A list of playful fonts to cycle through
const fonts = [
  'font-pacifico text-green-800',
  'font-kalam text-emerald-700',
  'font-patrick-hand text-[#036666] font-bold',
  'font-caveat text-teal-700 font-bold',
  'font-gloria-hallelujah text-[#2d6a4f] font-semibold',
  'font-gochi-hand text-[#52b788] font-bold',
];

const TaglineSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to change the tagline every 3.5 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3500); // 3500 milliseconds = 3.5 seconds

    // Clear the interval when the component is unmounted to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  // Get the current tagline and font style based on the index
  const currentTagline = taglines[currentIndex];
  const currentFontClass = fonts[currentIndex];

  return (
    <div className="flex items-center justify-center h-full overflow-hidden">
      <h2
        key={currentIndex} // Using key makes React re-render the element for smooth transitions
        // UPDATED: Changed from text-2xl to text-xl for a slimmer look
        className={`text-xl animate-blink animate-fade-in ${currentFontClass}`}
      >
        {currentTagline}
      </h2>
    </div>
  );
};

export default TaglineSlider