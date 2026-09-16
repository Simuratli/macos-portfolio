import { techStack } from "#constants/index";
import WindowWrapper from "#hoc/window_wrapper";
import useWindowStore from "#store/useWindowStore";
import { Check, Flag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Terminal = () => {
  const { closeWindow } = useWindowStore();
  const startRef = useRef(performance.now());
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    setRenderTime(Math.round(performance.now() - startRef.current));
  }, []);

  return (
    <>
      <div id="window-header">
        <div id="window-controls">
          <span
            className="close"
            onClick={() => closeWindow("terminal")}
          />
          <span className="minimize" />
          <span className="maximize" />
        </div>
        <h2>Tech Stack</h2>
        <span />
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@simuratli</span> % show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" />
              <h3>{category}</h3>
              <p>{items.join(", ")}</p>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check />
            {techStack.length} of {techStack.length} stacks loaded
            successfully (100%)
          </p>
          <p>
            <Flag />
            Render time: {renderTime}ms
          </p>
        </div>
      </div>
    </>
  );
};

export default WindowWrapper(Terminal, "terminal");

