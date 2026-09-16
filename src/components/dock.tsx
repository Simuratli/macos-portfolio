import { dockApps } from "#constants/index";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import useWindowStore from "#store/useWindowStore";

const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);
  const {openWindow,closeWindow,windows} = useWindowStore();

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");
    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2) / 4000);
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -12 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power1.out",
        });
      });

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app: (typeof dockApps)[1]) => {
    if(!app.canOpen) return;
    const window = windows[app.id as keyof typeof windows];
    if(window?.isOpen) {
      closeWindow(app.id as keyof typeof windows);
    } else {
      openWindow(app.id as keyof typeof windows);
    }
  };

  return (
    <section id="dock">
      <div className="dock-container" ref={dockRef}>
        {dockApps.map(({ id, name, canOpen, icon }) => (
          <div key={id ?? name} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, name, canOpen, icon })}
            >
              <img
                loading="lazy"
                src={`images/${icon}`}
                alt={name}
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip
          id="dock-tooltip"
          delayShow={150}
          place="top"
          className="tooltip"
        />
      </div>
    </section>
  );
};

export default Dock;
