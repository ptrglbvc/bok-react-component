import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import styles from "./InputScreen.module.css";

interface InputScreenProps {
  handleFileInput: (file: File) => void;
}

export default function InputScreen({ handleFileInput }: InputScreenProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/epub+zip") {
        handleFileInput(file);
      } else {
        alert("That ain't an EPUB file.");
      }
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileInput(files[0]);
    }
  };

  return (
    <div
      className={`${styles.input} ${isDragging ? styles.dragging : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h1>Bok</h1>
      <div className={styles.dropzone}>
        <input
          type="file"
          id="fileInput"
          accept=".epub"
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
}
