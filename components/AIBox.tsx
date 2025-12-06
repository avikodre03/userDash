"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AIBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.reply },
        ]);
      } else {
        toast.error("AI Error");
      }
    } catch (error) {
      toast.error("Network Error");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 cursor-pointer right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        💬 Chat
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50">
          <div className="bg-white w-full max-w-md h-[70vh] rounded-t-2xl md:rounded-2xl p-4 shadow-lg flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">AI Assistant</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 text-xl">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <p className="text-gray-400 text-sm">AI is typing...</p>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                className="flex-1 border rounded-lg p-2"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 rounded-lg cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
