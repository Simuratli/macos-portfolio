import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400,
) => {
  return [...text].map((char, i) => {
    return (
      <span
        key={i}
        className={className}
        style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  });
};

const FONT_WEIGHTS = {
  subtitle: {
    min: 100,
    max: 400,
    default: 100,
  },
  title: {
    min: 400,
    max: 900,
    default: 400,
  },
};
const setupTextHover = (
  container: HTMLElement | null,
  type: "subtitle" | "title",
) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");

  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLElement,
    weight: number,
    duration: number = 0.25,
  ) => {
    return gsap.to(letter, {
      duration: duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);
      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(()=>{
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
    return () => {
      titleCleanup?.();
      subtitleCleanup?.();
    };
  },[])

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Eljan Simuratli. Welcome to my ",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 className="mt-7" ref={titleRef}>
        {renderText(" portfolio!", "text-9xl italic font-georama")}
      </h1>
      <div className="small-screen">
        <p>
          This Portfolio is designed for desktop/tablet screens only
        </p>
      </div>
    </section>
  );
};

export default Welcome;
