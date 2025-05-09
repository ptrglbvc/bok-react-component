import { useState, useEffect, useRef } from "react";
import toggleFullscreen from "../../helpful_functions/toggleFullscreen";

import "./OptionsMenu.css";

interface OptionsMenuProps {
    onClose: () => void;
    fontSize: number;
    padding: number;
    fontFamily: string;
    setFontSize: React.Dispatch<React.SetStateAction<number>>;
    setPadding: React.Dispatch<React.SetStateAction<number>>;
    setFontFamily: React.Dispatch<React.SetStateAction<string>>;
    supportedFonts: { displayName: string; name: string }[];
}

function OptionsMenu({
    onClose,
    fontSize,
    padding,
    fontFamily,
    setFontSize,
    setPadding,
    setFontFamily,
    supportedFonts,
}: OptionsMenuProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const fontValueRef = useRef<HTMLSpanElement>(null);
    const paddingValueRef = useRef<HTMLSpanElement>(null);

    const allFonts = [
        { displayName: "System Default", name: "system-ui" },
        ...supportedFonts,
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
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

    const handleOverlayClick = () => {
        handleClose();
    };

    const handleMenuClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent click from propagating to the overlay
    };

    const animateValue = (ref: React.RefObject<HTMLSpanElement | null>) => {
        if (ref.current) {
            ref.current.classList.add("value-changed");
            setTimeout(() => {
                if (ref.current) {
                    ref.current.classList.remove("value-changed");
                }
            }, 300); // Duration matches the CSS transition time
        }
    };

    const handlePaddingIncrement = () => {
        if (padding <= 70) {
            setPadding((prev) => prev + 5);
            animateValue(paddingValueRef);
        }
    };

    const handlePaddingDecrement = () => {
        if (padding - 5 > 0) {
            setPadding((prev) => prev - 5);
            animateValue(paddingValueRef);
        }
    };

    const handleFontIncrement = () => {
        if (fontSize < 3) {
            setFontSize((prev) => prev + 0.2);
            animateValue(fontValueRef);
        }
    };

    const handleFontDecrement = () => {
        if (fontSize - 0.2 > 0.6) {
            setFontSize((prev) => prev - 0.2);
            animateValue(fontValueRef);
        }
    };

    return (
        <div
            className={`options-menu-overlay ${isClosing ? "fade-out" : ""}`}
            onClick={handleOverlayClick}
        >
            <div
                className={`options-menu ${isVisible ? "visible" : ""} ${
                    isClosing ? "slide-down" : ""
                }`}
                onClick={handleMenuClick}
            >
                <button onClick={handleClose} className="close-button">
                    ✕
                </button>
                <h2>Reader Options</h2>
                <div className="options-buttons">
                    <div className="font-family-buttons">
                        <select
                            value={fontFamily}
                            onChange={(e) => {
                                for (const font of allFonts) {
                                    if (font.name === e.target.value) {
                                        setFontFamily(e.target.value);
                                    }
                                }
                            }}
                        >
                            {allFonts.map((font) => {
                                return (
                                    <option
                                        key={font.displayName}
                                        value={font.name}
                                    >
                                        {font.displayName}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="option-label">Font family</div>
                    </div>
                    <div className="padding-buttons">
                        <button onClick={handlePaddingIncrement}>+</button>
                        <button onClick={handlePaddingDecrement}>-</button>
                        <div>
                            <span className="option-label">Side padding: </span>
                            <span
                                ref={paddingValueRef}
                                className="option-value"
                            >
                                {padding}
                            </span>
                        </div>
                    </div>
                    <div className="font-buttons">
                        <button onClick={handleFontIncrement}>+</button>
                        <button onClick={handleFontDecrement}>-</button>
                        <div style={{ marginLeft: "auto" }}>
                            <span className="option-label">Font size: </span>
                            <span ref={fontValueRef} className="option-value">
                                {Math.round(fontSize * 10)}
                            </span>
                        </div>
                    </div>
                    <button onClick={toggleFullscreen}>
                        Toggle fullscreen
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OptionsMenu;
