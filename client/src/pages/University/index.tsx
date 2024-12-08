import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ref, onValue, push, set } from "firebase/database";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import database from "../../config/firebase";

const University = () => {
  const { university } = useParams<{ university: string }>();

  // Get the username from Redux
  const username =
    useSelector((state: any) => state.user.username) || "Anonymous";

  const [messages, setMessages] = useState<
    { user: string; message: string; timestamp: number }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Reference the chat messages for the specific university
    const chatRef = ref(database, `chats/${university}`);

    // Subscribe to changes in the chat
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const chatMessages = data ? Object.values(data) : [];
      setMessages(
        chatMessages as { user: string; message: string; timestamp: number }[]
      );
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [university]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Create a new message
    const message = {
      user: username || "Anonymous",
      message: newMessage,
      timestamp: Date.now(),
    };

    // Push the message to Firebase
    const chatRef = ref(database, `chats/${university}`);
    const newMessageRef = push(chatRef);
    set(newMessageRef, message);

    setNewMessage(""); // Clear the input field
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <h1>Group Chat for {university}</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.user}:</strong> {msg.message}{" "}
            <small>({new Date(msg.timestamp).toLocaleTimeString()})</small>
          </div>
        ))}
      </div>
      <form action="">
        <p>{username}</p>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key press
        />
        <button onClick={handleSendMessage}>Send</button>
      </form>
    </div>
  );
};

export default University;
