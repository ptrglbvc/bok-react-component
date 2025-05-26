import React from "react";
import styled from "styled-components";

interface TutorialOverlayProps {
    color?: string;
    onDismiss: () => void;
}

const StyledOverlay = styled.div<{ color?: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    z-index: 2000;
    pointer-events: auto;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.35s ease;
    &.fade-out {
        opacity: 0;
        pointer-events: none;
    }

    .tap-circle {
        position: absolute;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        border: 3px solid ${({ color }) => color || "#4fc3f7"};
        background: ${({ color }) => color || "#4fc3f7"};
        box-shadow: 0 0 16px 0 ${({ color }) => color || "#4fc3f7"}55;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        pointer-events: none;
        opacity: 0.95;
    }
    .tap-circle.right {
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
    }
    .tap-circle.left {
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
    }
    .tap-circle.bottom {
        left: 50%;
        bottom: 32px;
        transform: translateX(-50%);
    }
    .tutorial-label {
        position: absolute;
        color: ${({ color }) => color || "#4fc3f7"};
        font-size: 1.1em;
        font-weight: 500;
        background: rgba(0, 0, 0, 0.7);
        padding: 0.5em 1.1em;
        border-radius: 1.2em;
        z-index: 3;
        pointer-events: none;
        white-space: nowrap;
    }
    .tutorial-label.right {
        right: 90px;
        top: 47%;
        transform: none;
    }
    .tutorial-label.left {
        left: 90px;
        top: 47%;
        transform: none;
    }
    .tutorial-label.bottom {
        left: 50%;
        bottom: 110px;
        transform: translateX(-50%);
    }
    .tutorial-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    .dismiss {
        position: absolute;
        left: 50%;
        top: 16%;
        text-align: center;
        padding: 0.5em 1.1em;
        transform: translateX(-50%);
        font-size: 1em;
        color: #fff;
        opacity: 0.8;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10;
        pointer-events: none;
    }
    @media (max-width: 600px) {
        .tap-circle.right {
            top: 44%;
        }
        .tutorial-label.right {
            top: 41%;
        }
        .tap-circle.left {
            top: 56%;
        }
        .tutorial-label.left {
            top: 53%;
        }
    }
`;

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
    color,
    onDismiss,
}) => {
    const [fading, setFading] = React.useState(false);
    const handleClick = () => {
        setFading(true);
        setTimeout(onDismiss, 350);
    };
    return (
        <StyledOverlay
            color={color}
            onClick={handleClick}
            className={fading ? "fade-out" : ""}
        >
            {/* Tap Circles */}
            <div className="tap-circle right" />
            <div className="tap-circle left" />
            <div className="tap-circle bottom" />
            {/* Labels */}
            <div className="tutorial-label right">scroll right</div>
            <div className="tutorial-label left">scroll left</div>
            <div className="tutorial-label bottom">open settings</div>
            {/* Dismiss text */}
            <div className="dismiss">Tap anywhere to continue</div>
        </StyledOverlay>
    );
};

export default TutorialOverlay;
