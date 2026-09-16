import type { WINDOW_CONFIG } from "#constants/index";
import useWindowStore from "#store/useWindowStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";
type WindowKey = keyof typeof WINDOW_CONFIG;

gsap.registerPlugin(Draggable);

const WindowWrapper = (
  Component: React.ComponentType<any>,
  windowKey: WindowKey,
) => {
  const Wrapped = (props: any) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef<HTMLElement | null>(null);

    useGSAP(()=>{
        const el = ref.current;
        if(!el || !isOpen) return;
        el.style.display = "block";
        gsap.fromTo(el,{scale:0.8,opacity:0, y:40},{scale:1, opacity:1,y:0, duration: 0.4, ease: "power3.out"})
    },[isOpen])

    useGSAP(()=>{
        const el = ref.current;
        if(!el) return;
        Draggable.create(el,{
            onPress() {
                focusWindow(windowKey);
            }
        });
    },[])

    useLayoutEffect(() => {
      const el = ref.current;
      if(!el) return;
        el.style.display = isOpen ? "block" : "none";
    }, [isOpen  ])


    return <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
      <Component {...props} />
    </section>

  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
