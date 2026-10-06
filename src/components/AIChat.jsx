import { useState } from "react";
import "./AIChat.css";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askAI = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      const response = await fetch("https://atharv-portfolio-ai.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, I couldn't connect to the AI assistant.",
        },
      ]);
    }
  };

  return (
    <>
      {!open && (
        <button
          className="ai-chat-button"
          onClick={() => setOpen(true)}
        >
          🤖 Ask AI
        </button>
      )}

      {open && (
        <div className="ai-chat-window">

          <div className="ai-chat-header">
            <div>
              <strong>Atharv's AI Assistant</strong>
              <span>Ask me about Atharv</span>
            </div>

            <button
              className="ai-chat-close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="ai-chat-messages">

            {messages.length === 0 && (
              <div className="ai-chat-welcome">
                Hi! 👋 Ask me about Atharv's skills,
                projects, education or experience.
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${message.role}`}
              >
                {message.text}
              </div>
            ))}

          </div>

          <div className="ai-chat-input">

            <input
              type="text"
              placeholder="Ask about Atharv..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI();
                }
              }}
            />

            <button onClick={askAI}>
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
}