"use client";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const Chatbot = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string; reasoning_details?: any }[]>([
    { role: "assistant", content: "Hi! I'm Donate Now AI. Have any questions about food donation?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Hide entirely on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: "Connection error... Check your API key or server status." }]);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: botMessage.content,
          reasoning_details: botMessage.reasoning_details 
        }
      ]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I am facing technical difficulties right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          backgroundColor: '#06C167',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'transform 0.2s',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        {isOpen ? <span style={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>✕</span> : <i className="uil uil-comment-alt-lines" style={{ fontSize: '28px', color: 'white' }}></i>}
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '350px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 5px 25px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          height: '450px',
        }}>
          <div style={{ background: '#06C167', color: 'white', padding: '15px', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center' }}>
            Donate Now AI
          </div>

          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#f7f7f7' }}>
            {messages.map((ms, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '15px', flexDirection: ms.role === 'assistant' ? 'row' : 'row-reverse' }}>
                <div style={{
                  padding: '10px 15px',
                  borderRadius: '18px',
                  fontSize: '14px',
                  maxWidth: '80%',
                  lineHeight: '1.4',
                  backgroundColor: ms.role === 'assistant' ? '#e6e6e6' : '#06C167',
                  color: ms.role === 'assistant' ? 'black' : 'white',
                  borderBottomLeftRadius: ms.role === 'assistant' ? '2px' : '18px',
                  borderBottomRightRadius: ms.role === 'assistant' ? '18px' : '2px',
                }}>
                  {ms.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ padding: '10px 15px', backgroundColor: '#e6e6e6', borderRadius: '18px', display: 'inline-block', fontSize: '14px' }}>
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #eee', background: 'white' }}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask anything..." 
              style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '20px', outline: 'none' }}
            />
            <button type="submit" disabled={isLoading} style={{ marginLeft: '10px', padding: '10px 15px', background: isLoading ? '#ccc' : '#06C167', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
