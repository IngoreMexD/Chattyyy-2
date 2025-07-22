
import React, { useState } from "react";
import "../styles/animations.css";

const reactions = ["👍", "❤️", "😂", "😮", "😢"];

const getRandomAvatar = (name) => {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const emojiSet = ["🐱", "🐶", "🐼", "🦊", "🐵", "🐸", "🐯", "🐰", "🦄", "🐙"];
  return emojiSet[hash % emojiSet.length];
};

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const handleSend = () => {
    if (input.trim() === "" || name.trim() === "") return;
    const newMessage = {
      text: input,
      sender: name,
      timestamp: new Date(),
      reaction: "",
      id: Date.now(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const addReaction = (index, emoji) => {
    const updatedMessages = [...messages];
    updatedMessages[index].reaction = emoji;
    setMessages(updatedMessages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center relative overflow-hidden px-4">
      {/* Floating Decorations */}
      <span className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce">💫</span>
      <span className="absolute bottom-10 right-10 text-4xl opacity-20 animate-spin">🌙</span>
      <span className="absolute top-1/2 left-5 text-3xl opacity-10 animate-pulse">✨</span>
      <span className="absolute bottom-1/4 right-1 text-3xl opacity-10 animate-ping">🪐</span>

      <div className="p-6 max-w-xl w-full bg-gray-900 text-white rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-6">Chattyyy</h1>

        <input
          className="mb-4 w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="✨ Enter your name..."
        />

        <div className="h-96 overflow-y-auto border border-gray-700 p-4 rounded-xl bg-gray-800 shadow mb-4">
          {messages.length === 0 && <p className="text-center text-gray-400">📭 No messages yet. Be the first to say hi!</p>}
          {messages.map((msg, index) => (
            <div key={msg.id} className="mb-4 bg-gray-700 p-3 rounded-lg shadow-inner animate-fade-in">
              <p className="text-xs text-yellow-300 flex items-center gap-1">
                <span className="text-xl">{getRandomAvatar(msg.sender)}</span> {msg.sender} • ⏰ {msg.timestamp.toLocaleTimeString()}
              </p>
              <div className="text-base mb-1 bg-gray-600 p-2 rounded-md mt-1">
                💬 {msg.text}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {reactions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addReaction(index, emoji)}
                    className="text-xl hover:scale-110 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
                {msg.reaction && <span className="ml-2">✨ Reacted: {msg.reaction}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="✍️ Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

        <p className="text-center text-sm text-gray-400">Made with 💛 by Abhishek 🌟</p>
      </div>
    </div>
  );
}
