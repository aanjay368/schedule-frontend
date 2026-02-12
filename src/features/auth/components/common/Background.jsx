
import { useEffect, useState, useCallback, memo } from "react";
import image1 from '../../../../assets/images/4k-plane.webp';
import image2 from '../../../../assets/images/4k-plane-with-car-5dvyg0410dk3q7si.webp';
import image3 from '../../../../assets/images/private-luxury-jet-airport-terminal.webp';
import image4 from '../../../../assets/images/busy-airport-view-with-airplanes-against-clear-sky.webp';
import image5 from '../../../../assets/images/airport-terminal.webp';

const images = [
  image1,
  image2,
  image3,
  image4,
  image5
];

export default function Background() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);      
    }, 3000); // change image every 5 seconds    
    return () => clearInterval(interval);
  });

  return (
    <>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt="background"
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity transition-blur duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
