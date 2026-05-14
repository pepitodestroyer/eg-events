import React, { useState } from 'react';
import { MessageSquare, Send, X, Music, Star, GlassWater, Mic } from 'lucide-react';

const services = [
  { id: 1, title: "Matrimonios", icon: <Music size={32} />, description: "Elegancia sonora y protocolos impecables para el día más importante." },
  { id: 2, title: "Quinceaños", icon: <Star size={32} />, description: "Despliegue de iluminación LED y mezclas crossover de alto impacto." },
  { id: 3, title: "Bautizos y Reuniones", icon: <Mic size={32} />, description: "Sonido ambiente profesional y microfonía de alta gama." },
  { id: 4, title: "Divorcios y Celebraciones", icon: <GlassWater size={32} />, description: "Fiestas temáticas con animación profesional para celebrar nuevos comienzos." },
];

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hola, soy el asistente virtual de EG Events. ¿En qué te puedo ayudar hoy?' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Aquí es donde su API Key de Google AI Studio procesará la respuesta en el backend
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: 'Estoy procesando tu solicitud con nuestros parámetros de servicio. ¿Deseas que te contactemos por WhatsApp para más detalles?' }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="EG Events" className="h-12 w-auto" />
            <span className="text-2xl font-black italic tracking-tighter">EG <span className="text-orange-500">EVENTS</span></span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest">
            <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
            <a href="https://wa.me/584141490509" className="bg-orange-600 text-black px-5 py-2 rounded-full hover:bg-orange-400 transition-all">WhatsApp</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 to-black/95 z-0" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-orange-500 font-bold tracking-[0.4em] uppercase mb-4 italic">A sound for you ;)</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
            Ingeniería en <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Entretenimiento</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            Sonido profesional y sistema de animación para cualquier envergadura de eventos. 
            Garantizamos la máxima fidelidad y pulcritud en cada celebración.
          </p>
          <a href="#servicios" className="px-8 py-4 bg-orange-600 text-black font-black uppercase tracking-widest text-sm rounded-sm hover:bg-orange-400 transition-all">
            Ver Servicios
          </a>
        </div>
      </header>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase mb-4 italic">Nuestros <span className="text-orange-500">Servicios</span></h2>
            <p className="text-gray-500 tracking-widest text-sm uppercase">Experiencias a tu medida</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => (
              <div 
                key={service.id} 
                onClick={() => setSelectedService(service)}
                className="bg-[#111] p-8 rounded-xl border border-white/5 hover:border-orange-500/50 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,140,0,0.1)] group"
              >
                <div className="text-orange-500 mb-6 group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 uppercase">{service.title}</h3>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POP-UP MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#161616] border border-orange-500/30 p-8 rounded-2xl max-w-md w-full relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24}/>
            </button>
            <div className="text-orange-500 mb-4">{selectedService.icon}</div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase italic">{selectedService.title}</h3>
            <p className="text-gray-400 mb-8">{selectedService.description}</p>
            <a 
              href={`https://wa.me/584141490509?text=Hola,%20deseo%20solicitar%20cotización%20para:%20${selectedService.title}`} 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full py-4 bg-orange-600 text-black font-black uppercase tracking-widest text-xs rounded hover:bg-orange-400 transition-all"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      )}

      {/* AI ASSISTANT CHAT */}
      <div className={`fixed bottom-6 right-6 z-[90] transition-all duration-300 ${isChatOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-[#111] border border-orange-500/30 w-[350px] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[450px]">
          <div className="bg-orange-600 p-4 flex justify-between items-center text-black">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <span className="font-black uppercase text-xs tracking-widest">Asistente Virtual</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:scale-110 transition-transform"><X size={18}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg max-w-[85%] text-sm ${m.role === 'user' ? 'bg-orange-600 text-black font-medium' : 'bg-[#222] text-gray-200'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-white/5 bg-[#111]">
            <div className="flex items-center gap-2 bg-[#222] p-2 rounded-lg">
              <input 
                type="text"
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Escribe tu consulta..." 
                className="bg-transparent w-full text-sm focus:outline-none px-2 text-white placeholder:text-gray-500"
              />
              <button onClick={sendMessage} className="p-2 text-orange-500 hover:bg-orange-500/20 rounded-md transition-colors">
                <Send size={18}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT TOGGLE BUTTON */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)} 
        className={`fixed bottom-6 right-6 z-[80] bg-orange-600 p-4 rounded-full text-black shadow-2xl hover:scale-110 transition-all ${isChatOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare size={24}/>
      </button>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center px-6 relative z-10">
        <p className="text-orange-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 italic">A sound for you ;)</p>
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
          © {new Date().getFullYear()} EG Events. Diseñado por Jesús.
        </p>
      </footer>
    </div>
  );
}