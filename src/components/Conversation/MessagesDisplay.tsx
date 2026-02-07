const messages = [
  {
    sender: "ai",
    text: "Hello! Let's practice ordering at a restaurant. I'll be your waiter today.",
  },
  { sender: "user", text: "Hi, I'd like to see the menu please." },
  {
    sender: "ai",
    text: "Of course! Here's our menu. What would you like to order?",
  },
  { sender: "user", text: "Can I have the pasta carbonara?" },
];

const MessagesDisplay = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] rounded-2xl px-6 py-4 ${
              msg.sender === "user"
                ? "bg-linear-to-r from-[#6C47FF] to-[#FF6B9D]"
                : "bg-[#1A1F2E]"
            }`}
            style={{
              animation: `slideIn 0.3s ease-out ${idx * 0.1}s both`,
            }}
          >
            <p className="text-white leading-relaxed">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesDisplay;
