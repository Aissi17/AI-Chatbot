import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
const model = googleai.getGenerativeModel({ model: "gemini-2.0-flash" });
const chat = model.startChat({ history: [] });

function App() {
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      const result = await chat.sendMessage(content);
      addMessage({ content: result.response.text(), role: "assistant" });
    } catch (error) {
      addMessage({ content: "Busy servers.", role: "system" });
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/bot.png" />
        <h2 className={styles.Title}>AI CHATBOT</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
