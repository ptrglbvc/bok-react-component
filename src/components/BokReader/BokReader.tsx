// src/BokReader.tsx
import React, { useState, useEffect, useMemo } from "react";
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
  // Target the main wrapper class provided by BokReaderWrapper
  .bok-reader-container {
    // Base container styles (previously root/body)
    font-family: ${(props) => props.fontFamily}, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    text-align: justify;
    color-scheme: dark light;
    color: rgb(215, 215, 215);
    background-color: black;
    height: 100%; // Fill container
    width: 100%; // Fill container
    overflow: hidden; // Outer container clips everything
    scrollbar-width: none;
    -ms-overflow-style: none;
     &::-webkit-scrollbar { display: none; }
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    // -- CSS Variables are applied via inline style on BokReaderWrapper --
    // -- var(--side-padding), var(--font-size), etc. are available to nested rules --

    // --- Book Page Column Layout (Restored from original CSS) ---
    .book-page {
        margin: 0;
        font-family: var(--font-family);
        // Padding defines the content area *within* which columns flow
        padding: var(--top-padding) var(--side-padding) var(--bottom-padding);
        // Height calculation is critical for columns to fill vertically
        // It should be based on the container height (100%) minus vertical padding
        height: calc(100% - (var(--top-padding) + var(--bottom-padding)));
        text-shadow: 2px 2px 5px rgba(0, 0, 0); // Keep stylistic choice
        font-size: var(--font-size);

        column-gap: calc(2 * var(--side-padding)); // Gap between columns
        column-fill: auto; // MUST be auto for scrollWidth calculation to be correct
        -moz-column-gap: calc(2 * var(--side-padding));
        -webkit-column-gap: calc(2 * var(--side-padding));

        // Enable horizontal scrolling of the columns
        overflow-x: scroll;
        overflow-y: hidden; // Prevent vertical scrollbar on the container itself
        width: 100%; // The column container takes the full width
        scroll-snap-type: x mandatory; // Snap pages (columns)
        scroll-behavior: auto; // Let JS handle smooth scrolling during page turns
        -webkit-overflow-scrolling: touch; // Momentum scroll on iOS
        box-sizing: border-box; // Include padding in width/height calculations


        // Hide the scrollbar for the horizontal column scrolling
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
         &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
         }

        // Content *inside* the columns
         > * { // Target direct children (likely the .bok-chapter divs)
              break-inside: avoid-column; // Try to prevent elements breaking mid-column
              page-break-inside: avoid; /* Older alias */
              -webkit-column-break-inside: avoid;
         }
    }


    // --- Media Queries for Column Count/Width ---
     @media screen and (orientation: landscape) {
        .book-page {
            column-count: 2;
            -moz-column-count: 2;
            -webkit-column-count: 2;
            // Define column width based on 2 columns layout
            column-width: calc(50% - var(--side-padding)); // Half width minus half gap
            -webkit-column-width: calc(50% - var(--side-padding));
        }

        .book-page img,
        .book-page svg {
            // Max width is the calculated column width
            max-width: calc(50% - var(--side-padding)) !important;
        }
     }

     @media screen and (orientation: portrait) {
        .book-page {
            column-count: 1;
            -moz-column-count: 1;
            -webkit-column-count: 1;
            // Define column width based on 1 column layout
            column-width: 100%; // Takes full width (padding is handled by parent)
            -webkit-column-width: 100%;
        }

        .book-page img,
        .book-page svg {
            // Max width is the container width minus padding (effectively column width)
             max-width: 100% !important; // Let the padding contain it
        }
     }

    // --- Styles for Images/SVG within Columns ---
    .book-page img,
    .book-page svg {
        border-radius: 10px; // Keep styling
        // Max height respects the vertical padding of the book-page container
        max-height: calc(100% - var(--top-padding) - var(--bottom-padding)) !important;
        display: block; // Prevent extra bottom space
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
  const { title, rawContent, isLoading, error, loadEpub } = useEpub();

  // State for user-configurable options
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
  const [fontSize, setFontSize] = useState(1.2); // Default font size
  const [sidePadding, setSidePadding] = useState(30); // Default padding
  const [fontFamily, setFontFamily] = useState("Inter"); // Default font

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
    >
      <ScopedGlobalStyle fontFamily={fontFamily} fontSize={fontSize} />
      <LoadingScreen isLoading={isLoading} />

      {/* Render Book only if content is ready and not loading */}
      {rawContent && !isLoading && (
        <>
          <Book
            content={rawContent}
            title={title} // Pass title if Book needs it
            // Pass state setters down to Book/OptionsMenu
            setIsLoading={() => {
              /* Let useEpub handle loading state */
            }}
            fontSize={fontSize}
            sidePadding={sidePadding}
            fontFamily={fontFamily}
            setPadding={setSidePadding}
            setFontSize={setFontSize}
            setFontFamily={setFontFamily}
            isOptionMenuVisible={isOptionsMenuVisible} // For navigation hook inside Book
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
              // Pass setIsLoading from useEpub if OptionsMenu needs to trigger global load indicator
              setIsLoading={() => {
                /* Let useEpub handle loading state */
              }}
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
