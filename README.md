# bok

A React component library for reading EPUB files. Built with React, TypeScript, and Vite.

The reader that is spawned will render a column view, with each column representing a page of the book. The user is able to change the font size, font family, side margin and toggle the reader in fullscreen.

Butt.

## Installation

```bash
npm install bok
# or
yarn add bok
```

## Usage

```jsx
import React from "react";
import { BokReader } from "bok";
import "bok/dist/style.css"; // this css file is absolutely necessary to render the component properly

function MyBookViewer() {
    const epubUrl = "path/to/your/book.epub"; // Can be a URL, File object, or ArrayBuffer

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <BokReader epubDataSource={epubUrl} />
        </div>
    );
}

export default MyBookViewer;
```

## Props to BokReader

-   `epubDataSource`: `File | ArrayBuffer | string | null` - The source of the EPUB file (File object, ArrayBuffer, or URL string).
-   `onTitleChange?`: `(title: string) => void` - Callback when the book title is loaded.
-   `onLoadingChange?`: `(isLoading: boolean) => void` - Callback when the loading state changes.
-   `onError?`: `(errorMsg: string) => void` - Callback when an error occurs during loading or processing.
-   `supportedFonts?`: `{ displayName: string; name: string }[]` - Array of custom fonts to make available in the options menu.
-   `color?`: `string` - Hexadecimal value. Color tint of the component.
-   `style?`: `React.CSSProperties` - Optional inline styles for the main wrapper component.

## Development Scripts

-   `npm run dev`: Start development server.
-   `npm run build`: Build the library for production.
-   `npm run lint`: Lint the project files.
-   `npm run preview`: Preview the production build locally.

## Dependencies

-   jszip
-   react-spinners
-   styled-components

## Peer Dependencies

-   react >=18.3.1
-   react-dom >=18.3.1
