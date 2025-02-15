import { useState } from "react";
import { Assistant } from "./assistants/google-ai";
// import { Assistant } from "./assistants/open-ai";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import { Loader } from "./components/Loader/Loader";

function App() {
  const googleAssistant = new Assistant();
  // const openaiAssistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStraming, setIsStraming] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  function updateLastMsg(content) {
    setMessages((previousMessages) =>
      previousMessages.map((message, index) =>
        index === previousMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      // const result = await googleAssistant.chat(content); // non stream chat
      // addMessage({ content: result, role: "assistant" }); // non stream chat
      const result = await googleAssistant.chatStream(content);
      let isFirstMsg = false;
      // const result = await openaiAssistant.chat(content, messages);
      for await (const message of result) {
        if (!isFirstMsg) {
          isFirstMsg = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStraming(true);
        }
        updateLastMsg(message);
      }
      setIsStraming(false);
    } catch (error) {
      addMessage({ content: "Busy servers.", role: "system" });
      setIsLoading(false);
      setIsStraming(false);
    }
    //  non stream chat
    // finally {
    // setIsLoading(false);
    // }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/bot.png" />
        <h2 className={styles.Title}>AI CHATBOT</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls
        isDisabled={isLoading || isStraming}
        onSend={handleContentSend}
      />
    </div>
  );
}

export default App;
