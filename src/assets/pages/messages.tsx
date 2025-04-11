import React, { useEffect, useState } from 'react';
import './MessagePage.css';

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [replyMessage, setReplyMessage] = useState<string>(''); // State for the reply message

  useEffect(() => {
    // Get messages from localStorage (or from backend)
    const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(storedMessages);
  }, []);

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyMessage(e.target.value); // Update the reply message
  };

  const handleReply = (productId: string) => {
    if (!replyMessage.trim()) {
      alert("Please enter a reply.");
      return;
    }
    
    // Logic to save the reply (could be updated to save to backend or in localStorage)
    alert(`Reply to the user for product ${productId}: ${replyMessage}`);
    
    // Clear the reply message field after sending the reply
    setReplyMessage('');
  };

  return (
    <div className="">
      <h1>Messages from Users</h1>
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div>
          {messages.map((message, index) => (
            <div key={index} className="message-card">
              <h3>Product ID: {message.productId}</h3>
              <p>User Message: {message.userMessage}</p>
              <p>Sent at: {new Date(message.timestamp).toLocaleString()}</p>
              
              <div className="reply-section">
                <input 
                  type="text" 
                  placeholder="Type your reply here" 
                  value={replyMessage} 
                  onChange={handleReplyChange}
                />
                <button onClick={() => handleReply(message.productId)}>
                  Reply to User
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
