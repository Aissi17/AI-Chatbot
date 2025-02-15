import { useState } from "react";
import { Assistant } from "./assistants/google-ai";
// import { Assistant } from "./assistants/open-ai";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import { Loader } from "./components/Loader/Loader";

function App() {
  const googleAssistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setLoading(true);
    try {
      const result = await googleAssistant.chat(content);
      // const result = await googleAssistant.chat(content, messages);
      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      addMessage({ content: "Busy servers.", role: "system" });
    } finally {
      setLoading(false);
    }
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
      <Controls isDisabled={isLoading} onSend={handleContentSend} />
    </div>
  );
}

export default App;
