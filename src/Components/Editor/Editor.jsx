import { useEffect, useRef, useState } from "react";
import classes from "./Editor.module.css";

const Editor = (props) => {
  const [contentState, setContentState] = useState("");
  const editorRef = useRef(null);
  const boldBtnRef = useRef(null);
  const {shouldClear} = props;

  useEffect(() => {
    // will only run for the first time for this component
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // above line disables the warnings about dependencies as we don't want to include to make it run only onMount
    if (props.innerContent !== undefined) {
      editorRef.current.innerHTML = props.innerContent;
    }
  }, []);

  useEffect(() => {
    // will only run when shouldClear changes
    if (shouldClear) {
      editorRef.current.innerHTML = props.placeholder;
      setContentState(""); // just to trigger rerender to update the changes to the UI.
    }
  }, [shouldClear]);

  const insertImage = () => {
    const imageUrl = prompt("Enter the image URL:");
    if (imageUrl) {
      insertImageAtCursor(imageUrl);
      // popupRef.current.classList.add(classes.hidden);
    }
  };

  const insertImageAtCursor = (imageUrl) => {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("content-image"); // note this CSS should be available in details page.

    const selection = window.getSelection();
    console.log("image: ", img);
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.insertNode(img);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      editorRef.current.appendChild(img);
    }
  };

  const handleBoldClick = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      const span = document.createElement("span");
      span.style.fontWeight = "bold";
      span.textContent = range.toString();

      range.deleteContents();
      range.insertNode(span);
    }
  };

  const handleInsertLink = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const link = prompt("Enter the URL:");
      if (link) {
        console.log("link: ", link);
        const anchor = document.createElement("a");
        anchor.textContent = range.toString();
        anchor.href = link;
        anchor.classList.add("custom-link");
        range.deleteContents();
        console.log("link: ", anchor);
        range.insertNode(anchor);
      }
    }
  };

  const setContent = (e) => {
    if (props.setContent) {
      props.setContent(e.target.innerHTML);
    }
  };

  return (
    <>
      <div className={classes.headers}>
        <button
          id="insertImageBtn"
          className={classes.btn}
          onClick={insertImage}
        >
          Insert Image
        </button>
        <button
          id="boldBtn"
          className={classes.btn}
          onClick={handleBoldClick}
          ref={boldBtnRef}
        >
          Bold
        </button>
        <button id="linkBtn" className={classes.btn} onClick={handleInsertLink}>
          Insert Link{" "}
        </button>
      </div>
      <div
        id="editor"
        ref={editorRef}
        className={classes.editor}
        contentEditable={true}
        onBlur={setContent}
        suppressContentEditableWarning
      >
        {props.placeholder}
      </div>
    </>
  );
};

export default Editor;
