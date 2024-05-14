import React, { useEffect, useRef } from "react";
import Animation from "@/public/Animation.svg";

const AnimationLoader = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;

    let offset = 5000;

    const intervalId = setInterval(() => {
      offset -= 15;
      if (svg) {
        svg.style.strokeDashoffset = `${offset}px`;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return <Animation width="100" height="100" ref={svgRef} />;
};

export default AnimationLoader;
