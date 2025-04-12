"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const logos = [
  { src: "/images/google.png", alt: "Google" },
  { src: "/images/western-digital.png", alt: "Western Digital" },
  { src: "/images/microsoft.png", alt: "Microsoft" },
  { src: "/images/bluescape.png", alt: "Bluescape" },
  { src: "/images/netflix.png", alt: "Netflix" },
  { src: "/images/bloomberg.png", alt: "Bloomberg" },
  { src: "/images/ticketmaster.png", alt: "Ticketmaster" },
];

export default function ClientLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const animationDuration = 50; // Fixed duration in seconds for smoother animation

      const keyframes = `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${scrollWidth / 2}px); }
        }

        .logo-image {
          filter: grayscale(100%);
        }
      `;

      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = keyframes;
      document.head.appendChild(styleSheet);

      scrollContainer.style.animation = `scroll ${animationDuration}s linear infinite`;
      
      // Add grayscale class to all logo images
      scrollContainer.querySelectorAll('img').forEach(img => {
        img.classList.add('logo-image');
      });
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 w-40 z-10 bg-gradient-to-r from-gray-50 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-40 z-10 bg-gradient-to-l from-gray-50 to-transparent"></div>
      <div ref={scrollRef} className="flex items-center">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-12">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={60}
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
