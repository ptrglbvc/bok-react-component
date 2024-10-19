import React, { useState, useEffect } from "react";
import "./OptionsMenu.css";

interface OptionsMenuProps {
  onClose: () => void;
  fontSize: React.MutableRefObject<number>;
  padding: React.MutableRefObject<number>;
}

function OptionsMenu({ onClose, fontSize, padding }: OptionsMenuProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Duration matches the CSS transition time
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div className={`options-menu-overlay ${isClosing ? "fade-out" : ""}`}>
      <div className={`options-menu ${isClosing ? "slide-down" : ""}`}>
        <button onClick={handleClose} className="close-button">
          ✕
        </button>
        <h2>Reader Options</h2>
        <div className="options-buttons">
          <button
            onClick={() => {
              if ((padding.current + 5) * 2 <= 100) padding.current += 5;
            }}
          >
            {" "}
            +{" "}
          </button>
          <button
            onClick={() => {
              if (padding.current - 5 > 0) padding.current -= 5;
            }}
          >
            {" "}
            -{" "}
          </button>
          <button>Change Theme</button>
          <button>More Options</button>
        </div>
      </div>
    </div>
  );
}

export default OptionsMenu;
