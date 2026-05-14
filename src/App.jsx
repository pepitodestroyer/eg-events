import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, X, Phone, GraduationCap, Music, Star, Camera } from 'lucide-react';

// --- CONFIGURACIÓN DE SERVICIOS ---
const services = [
  { id: 1, title: "Matrimonios", icon: <Music />, description: "Elegancia sonora y protocolos impecables para su unión.", details: "Incluye sonido JBL Line Array, microfonía inalámbrica para ceremonia y DJ especializado en protocolo." },
  { id: 2, title: "Quinceaños", icon: <Star />, description: "Máximo despliegue de iluminación LED y mezclas crossover.", details: "Show de luces inteligentes, pantallas LED, robots LED y animación interactiva de alto impacto." },
  { id: 3, title: "Graduaciones 2026", icon: <GraduationCap />, description: "El cierre de etapa más legendario de Maracay.", details: "Paquetes Prom Elite: Estructuras Truss, sonido masivo JBL y máquinas de chispas frías." },
  { id: 4, title: "Eventos Sociales", icon: <Camera />, description: "Bautizos, cumpleaños y reuniones corporativas.", details: "Sonido ambiente profesional y coordinación técnica personalizada." },
];

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hola, soy el asistente de EG Events. ¿Cómo puedo ayudarte con tu evento?' }]);
  const [input, setInput] = useState('');

  // --- LÓGICA DE IA (Usando su llave API) ---
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulación de carga
    setMessages(prev => [...prev, { role: 'ai', text: 'Procesando presupuesto...' }]);

    try {
      // AQUÍ SE INTEGRA SU LLAVE API EN EL BACKEND POSTERIORMENTE
      // Por ahora mantenemos la interfaz conectada
      setTimeout(() => {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'ai', text: `Entendido. Para un evento de ${input}, Jesús recomienda el sistema JBL Elite. ¿Deseas que te conecte con él por WhatsApp?` }
        ]);
      }, 1000);
    } catch (e) {
      console.error("Falla en núcleo de IA");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500">
      
      {/* NAVBAR PULCRA */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="EG Events" className="h-10 w-auto" />
          <span className="text-2xl font-black tracking-tighter italic">EG <span className="text-orange-500">EVENTS</span></span>
        </div>
        <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em]">
          <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
          <a href="https://wa.me/584141490509" className="text-orange-500 border border-orange-500/30 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-black transition-all">WhatsApp Directo</a>
        </div>
      </nav>

      {/* HERO SECTION - ESENCIA ORIGINAL */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-6">
          <p className="text-orange-500 font-bold tracking-[0.5em] uppercase mb-6 text-sm">A sound for you ;)</p>
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">ALTA <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">INGENIERÍA</span></h1>
          <p className="max-w-xl mx-auto text-gray-400 text-lg mb-12 font-light">Sistemas de audio JBL Professional e iluminación inteligente. <br/> El estándar de prestigio en Maracay.</p>
          <div className="flex gap-6 justify-center">
            <button onClick={() => setIsChatOpen(true)} className="px-10 py-4 bg-orange-600 text-black font-black uppercase text-xs tracking-widest hover:bg-orange-400 transition-all rounded-sm">Cotización IA</button>
          </div>
        </div>
      </section>

      {/* SERVICIOS CON POP-UPS (MODALS) */}
      <section id="servicios" className="py-32 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black uppercase mb-16 text-center italic tracking-widest">Nuestros <span className="text-orange-500">Protocolos</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(service => (
            <div 
              key={service.id} 
              onClick={() => setSelectedService(service)}
              className="group p-8 bg-[#111] border border-white/5 hover:border-orange-500/50 cursor-pointer transition-all duration-500"
            >
              <div className="text-orange-500 mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2 uppercase">{service.title}</h3>
              <p className="text-gray-500 text-sm font-light">Click para detalles técnicos</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL DE SERVICIO */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#161616] border border-orange-500/30 p-10 max-w-lg w-full relative">
            <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X/></button>
            <h3 className="text-3xl font-black text-orange-500 mb-4 uppercase italic">{selectedService.title}</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">{selectedService.details}</p>
            <a href={`https://wa.me/584141490509?text=Hola! Deseo cotizar: ${selectedService.title}`} className="block w-full py-4 bg-white text-black text-center font-black uppercase text-xs tracking-widest hover:bg-orange-500 transition-all">Hablar con Jesús</a>
          </div>
        </div>
      )}

      {/* ASISTENTE IA - FLOTANTE */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 ${isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="bg-[#111] border border-orange-500/20 w-80 md:w-96 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-orange-600 p-4 flex justify-between items-center text-black font-black uppercase text-xs">
            <span>Soporte Inteligente EG</span>
            <button onClick={() => setIsChatOpen(false)}><X size={18}/></button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4 text-sm bg-black/40">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'ai' ? 'bg-white/5 mr-auto text-gray-300' : 'bg-orange-600 ml-auto text-black font-bold'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Pregunta por precios o equipos..." 
              className="bg-transparent w-full text-xs focus:outline-none border-b border-white/10 pb-1"
            />
            <button onClick={sendMessage} className="text-orange-500 hover:text-white transition-colors"><Send size={18}/></button>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-8 right-8 bg-orange-600 p-4 rounded-full text-black shadow-2xl hover:scale-110 transition-all z-[90]">
          <MessageSquare/>
        </button>
      )}

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center px-6">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 italic">A sound for you ;)</p>
        <p className="text-gray-800 text-[9px] font-black uppercase">JBL Professional Systems | Maracay 2026</p>
      </footer>
    </div>
  );
}