// src/BokReader.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import useEpub from "../../hooks/useEpub"; // Import the modified hook
import Book from "../Book";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import OptionsMenu from "../OptionsMenu/OptionsMenu";

// These styles apply *only* within BokReaderWrapper thanks to styled-components scoping
const ScopedGlobalStyle = createGlobalStyle<{
  fontFamily: string;
  fontSize: number;
}>`
  .bok-reader-container {
    font-family: ${(props) => props.fontFamily}, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    text-align: justify;
    color-scheme: dark light;
    color: rgb(215, 215, 215);
    background-color: black;
    height: 100%;
    width: 100%;
    overflow: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
     &::-webkit-scrollbar { display: none; }
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    container-type: size;

    .book-page {
        margin: 0;
        font-family: var(--font-family);
        padding: var(--top-padding) var(--side-padding) var(--bottom-padding);
        height: 100%;
        text-shadow: 2px 2px 5px rgba(0, 0, 0); // Keep stylistic choice
        font-size: var(--font-size);

        column-gap: calc(2 * var(--side-padding)); // Gap between columns
        column-fill: auto; // MUST be auto for scrollWidth calculation to be correct
        -moz-column-gap: calc(2 * var(--side-padding));
        -webkit-column-gap: calc(2 * var(--side-padding));

        // Enable horizontal scrolling of the columns
        overflow-x: scroll;
        overflow-y: hidden; // Prevent vertical scrollbar on the container itself
        scroll-snap-type: x mandatory; // Snap pages (columns)
        scroll-behavior: auto; // Let JS handle smooth scrolling during page turns
        -webkit-overflow-scrolling: touch; // Momentum scroll on iOS
        box-sizing: border-box; // Include padding in width/height calculations


        scrollbar-width: none;
        -ms-overflow-style: none;
         &::-webkit-scrollbar {
            display: none;
         }

        // Content *inside* the columns
         > * { // Target direct children (likely the .bok-chapter divs)
              break-inside: avoid-column; // Try to prevent elements breaking mid-column
              page-break-inside: avoid; /* Older alias */
              -webkit-column-break-inside: avoid;
         }
    }

    @container (aspect-ratio > 1/1) {
        .book-page {
            column-count: 2;
            -moz-column-count: 2;
            -webkit-column-count: 2;
            column-width: calc(50% - var(--side-padding));
            -webkit-column-width: calc(50% - var(--side-padding));

            img, svg {
                max-width: calc(50% - var(--side-padding)) !important;
            }
        }
    }

    @container (aspect-ratio <= 1/1) {
        .book-page {
            column-count: 1;
            -moz-column-count: 1;
            -webkit-column-count: 1;
            column-width: 100%;
            -webkit-column-width: 100%;

            img, svg {
                max-width: 100% !important;
            }
        }
    }    // --- Styles for Images/SVG within Columns ---

    .book-page img,
    .book-page svg {
        border-radius: 10px;
        // Max height respects the vertical padding of the book-page container
        max-height: calc(100% - var(--top-padding) - var(--bottom-padding)) !important;
        display: block;
        margin-left: auto; // Center if smaller than column width
        margin-right: auto;
        object-fit: contain; // Fit without distortion
        box-sizing: border-box; // Ensure border/padding included in size
         break-inside: avoid-column; // Crucial to prevent images splitting across columns
         page-break-inside: avoid;
         -webkit-column-break-inside: avoid;
    }

    .book-page svg > image {
        width: 100%; // Inherit size from parent SVG
        height: 100%;
    }

    // --- Chapter Styling ---
    .bok-chapter { // The divs wrapping content injected by useEpub
      margin-bottom: 1em; // Basic spacing between chapter content blocks
       break-inside: avoid-column; // Try to keep chapter content from splitting if possible
       page-break-inside: avoid;
       -webkit-column-break-inside: avoid;
        /* Consider adding break-before: column; if you want each chapter
           to always start on a new column, but test performance/layout */
    }

    // --- Other Scoped Styles ---
    parsererror { display: none; } // Hide EPUB parsing errors if they render

    .page-number {
        position: absolute;
        bottom: 15px; // Position relative to the reader container
        left: 50%;
        transform: translateX(-50%);
        font-size: 13px;
        color: gray;
        z-index: 10; // Above book content
        pointer-events: none; // Non-interactive
    }

    .bottom-click-area {
        position: absolute; // Within the reader container
        bottom: 0;
        left: 0;
        width: 100%;
        height: 15%;
        z-index: 1000; // Above page number, below options menu overlay
        background-color: transparent;
        cursor: pointer;
    }
  }
`;

interface BokReaderProps {
  /** The EPUB file object or ArrayBuffer to display */
  epubDataSource: File | ArrayBuffer | null;
  /** Optional: Callback when book title is loaded */
  onTitleChange?: (title: string) => void;
  /** Optional: Callback when internal loading state changes */
  onLoadingChange?: (isLoading: boolean) => void;
  /** Optional: Callback on EPUB processing error */
  onError?: (errorMsg: string) => void;
  /** Optional: ClassName for the root wrapper */
  className?: string;
  /** Optional: Style object for the root wrapper */
  style?: React.CSSProperties;
}

// Wrapper div for scoping styles and establishing positioning context
const BokReaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative; /* Needed for absolute positioning of children like PageNumber/OptionsMenu */
  overflow: hidden; /* Contain the scrolling book */
`;

const BokReader: React.FC<BokReaderProps> = ({
  epubDataSource,
  onTitleChange,
  onLoadingChange,
  onError,
  className,
  style,
}) => {
  // Use the modified hook
  const { title, rawContent, isLoading, error, loadEpub, setIsLoading } =
    useEpub();

  // State for user-configurable options
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
  const [fontSize, setFontSize] = useState(1.2); // Default font size
  const [sidePadding, setSidePadding] = useState(30); // Default padding
  const [fontFamily, setFontFamily] = useState("Inter"); // Default font

  const bokReaderWrapperRef = useRef<HTMLDivElement>(null);

  // --- Effects to handle epub source and hook state changes ---

  // Load EPUB when the source prop changes
  useEffect(() => {
    if (epubDataSource) {
      loadEpub(epubDataSource);
    }
    // Optionally handle epubDataSource becoming null (e.g., clear content)
    // else { /* clear state if needed */ }
  }, [epubDataSource, loadEpub]); // Reload when source changes

  // Report title changes upstream
  useEffect(() => {
    if (onTitleChange) {
      onTitleChange(title);
    }
  }, [title, onTitleChange]);

  // Report loading state changes upstream
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

  // Report errors upstream
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // --- Style variables ---
  // Use useMemo to prevent recalculating styles object on every render
  const dynamicCssVariables = useMemo(
    () => ({
      "--side-padding": `${sidePadding}px`,
      "--top-padding": "30px", // Example: make these configurable too if needed
      "--bottom-padding": "70px", // Example
      "--font-size": `${fontSize}em`,
      "--font-family": fontFamily,
    }),
    [sidePadding, fontSize, fontFamily],
  );

  // --- Render logic ---

  // Display error message if loading failed
  if (error && !isLoading && !rawContent) {
    return (
      <BokReaderWrapper
        className={`bok-reader-container ${className || ""}`}
        style={style}
      >
        <ScopedGlobalStyle fontFamily={fontFamily} fontSize={fontSize} />
        <div style={{ padding: "20px", color: "red" }}>
          Error loading EPUB: {error}
        </div>
      </BokReaderWrapper>
    );
  }

  // Display loading indicator or the book content
  return (
    <BokReaderWrapper
      className={`bok-reader-container ${className || ""}`}
      style={{ ...style, ...dynamicCssVariables } as React.CSSProperties} // Apply CSS vars
      ref={bokReaderWrapperRef}
    >
      <ScopedGlobalStyle fontFamily={fontFamily} fontSize={fontSize} />
      <LoadingScreen isLoading={isLoading} />

      {/* Render Book only if content is ready and not loading */}
      {rawContent && (
        <>
          <Book
            content={rawContent}
            title={title}
            setIsLoading={setIsLoading}
            fontSize={fontSize}
            sidePadding={sidePadding}
            fontFamily={fontFamily}
            setPadding={setSidePadding}
            setFontSize={setFontSize}
            setFontFamily={setFontFamily}
            isOptionMenuVisible={isOptionsMenuVisible} // For navigation hook inside Book
            containerElementRef={bokReaderWrapperRef}
          />

          {/* Render Options Menu when visible */}
          {isOptionsMenuVisible && (
            <OptionsMenu
              onClose={() => setIsOptionsMenuVisible(false)}
              fontSize={fontSize}
              padding={sidePadding}
              fontFamily={fontFamily}
              setPadding={setSidePadding}
              setFontSize={setFontSize}
              setFontFamily={setFontFamily}
              setIsLoading={setIsLoading}
            />
          )}

          {/* Click area to open options */}
          {!isOptionsMenuVisible && (
            <div
              className="bottom-click-area"
              onClick={() => setIsOptionsMenuVisible(true)}
              aria-label="Open reader options"
            />
          )}
        </>
      )}
      {/* Placeholder or message if no EPUB is loaded and not currently loading/error */}
      {!epubDataSource && !isLoading && !error && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          No EPUB loaded.
        </div>
      )}
    </BokReaderWrapper>
  );
};

export default BokReader; // Default export
export { BokReader }; // Named export
