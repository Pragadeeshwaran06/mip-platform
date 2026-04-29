import React, { useState, useRef, useEffect } from 'react';
import marketplaceBg from '../assets/marketplace-bg.png';


function AIAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your MIP Career Assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let responseText = "";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('resume')) {
        responseText = "I can definitely help with your resume! For micro-internships, focus on highlighting your specific technical skills and any projects you've completed. Would you like me to analyze a specific section?";
      } else if (lowerInput.includes('task') || lowerInput.includes('internship')) {
        responseText = "We have over 50 micro-internships available right now! I recommend checking out the 'Technical' category if you're into coding, or 'Non-Technical' for marketing and writing roles.";
      } else if (lowerInput.includes('earn') || lowerInput.includes('money')) {
        responseText = "Earnings depend on the complexity of the task. Most tasks on MIP pay between ₹2,000 and ₹15,000. The more tasks you complete, the higher your 'Skill Level' and earning potential!";
      } else {
        responseText = "That's a great question! I'm here to help you navigate your micro-internship journey, improve your portfolio, and find the best tasks for your skill set. What else is on your mind?";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'ai' }]);
      setIsTyping(false);
    }, 1500);
  };

  const starterQuestions = [
    "How do I improve my resume?",
    "What tasks pay the most?",
    "How to get started with coding tasks?",
    "What is a micro-internship?"
  ];

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto w-full px-4 py-8 relative">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${marketplaceBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden h-full relative z-10">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🤖</div>
          <div>
            <h2 className="text-xl font-bold">MIP Career AI</h2>
            <p className="text-indigo-100 text-xs font-medium">Online | Always here to help</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm transition-all ${
                msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer/Input */}
        <div className="p-6 border-t border-slate-100 bg-white">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {starterQuestions.map((q, i) => (
                <button 
                  key={i}
                  onClick={() => { setInput(q); }}
                  className="px-4 py-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your career question..."
              className="w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-100"
            >
              <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">Powered by MIP Intelligence</p>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
