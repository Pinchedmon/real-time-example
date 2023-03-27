import axios from "axios";
import React, { useEffect, useState } from "react";
interface Imessage {
  message: string;
  id: number;
}
const LongPolling = () => {
  const [messages, setMessages] = useState<Array<Imessage>>([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5050/get-messages");
      setMessages((prev: any) => [...prev, data]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };
  const sendMessage = async () => {
    await axios.post("http://localhost:5050/new-messages", {
      message: value,
      id: Date.now(),
    });
  };
  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className={`${messages.length > 0 ? "messages" : ""}`}>
          {messages.map((item: Imessage, index: number) => (
            <div className="message" key={index}>
              {item.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongPolling;
