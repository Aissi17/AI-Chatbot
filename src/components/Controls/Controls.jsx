import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./Controls.module.css";

export function Controls({ onSend, isDisabled = false }) {
  const taRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isDisabled) {
      taRef.current.focus();
    }
  }, [isDisabled]);

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      onSend(content);
      setContent("");
    }
  }
  function handleEnterButton(event) {
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          ref={taRef}
          disabled={isDisabled}
          className={styles.TextArea}
          placeholder="Message AI Chatbot"
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterButton}
          minRows={1}
          maxRows={6}
        />
      </div>
      <button
        className={styles.Button}
        onClick={handleContentSend}
        disabled={isDisabled}
      >
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
