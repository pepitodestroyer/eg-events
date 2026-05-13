import React, { useState, useEffect } from 'react';
import { 
  Music, Mic, MonitorPlay, Lightbulb, PartyPopper, HeartHandshake, 
  GlassWater, Users, CheckCircle2, CalendarCheck, MessageCircle, 
  Sparkles, Loader2, ChevronRight
} from 'lucide-react';
import './index.css';
import miLogo from './logo.png';

export default function App() {
  const whatsappNumber = "584141490509"; 
  const whatsappMessage = encodeURIComponent("¡Hola EG Events! Vi su página web y me gustaría solicitar una cotización para un evento. A sound for you ;)");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const [iaPrompt, setIaPrompt] = useState('');
  const [iaResponse, setIaResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generarIdeaConIA = async () => {
    if (!iaPrompt) return;
    setIsLoading(true);
    setIaResponse(''); // Limpiar respuesta anterior
    
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!API_KEY || API_KEY === "undefined") {
      setIaResponse("⚠️ VERCEL ERROR: La Clave API no existe. Vercel no está inyectando la variable secreta.");
      setIsLoading(false);
      return;
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Actúa como un experto en eventos y producción de 'EG Events'. Un cliente quiere hacer una fiesta con esta temática: "${iaPrompt}". Dale una sugerencia muy breve (máximo 3 líneas) de qué tipo de música, estructuras e iluminación le recomendarías para que su evento sea espectacular. Tono profesional, cálido y animado para ventas.`
            }]
          }]
        })
      });

      const data = await response.json();
      
      // Detector infalible de errores HTTP de Google
      if (!response.ok) {
        setIaResponse(`⚠️ GOOGLE RECHAZÓ LA SOLICITUD (Error ${response.status}): ${data?.error?.message || 'Desconocido'}`);
        setIsLoading(false);
        return;
      }

      // Procesamiento de la respuesta
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        setIaResponse(data.candidates[0].content.parts[0].text);
      } else if (data.candidates && data.candidates[0] && data.candidates[0].finishReason) {
        setIaResponse(`⚠️ ALERTA: La IA bloqueó tu texto por seguridad de Google (Motivo: ${data.candidates[0].finishReason}). Prueba escribiendo otra cosa.`);
      } else {
        setIaResponse("⚠️ ERROR EXTRAÑO: Google conectó bien, pero no quiso devolver texto. Avísale al desarrollador.");
      }
      
    } catch (error) {
      setIaResponse(`⚠️ ERROR CRÍTICO DE RED: ${error.message}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-orange-500 selection:text-white scroll-smooth">
      
      {/* NAVEGACIÓN */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              <img src={miLogo} alt="EG Events Logo" className="h-12 w-auto rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300 object-contain" />
            </div>
            <div className={`hidden md:flex space-x-8 text-sm font-bold transition-colors duration-300 ${scrolled ? 'text-neutral-800' : 'text-white'}`}>
              <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
              <a href="#equipos" className="hover:text-orange-500 transition-colors">Equipos</a>
              <a href="#ia-ideas" className="hover:text-orange-500 transition-colors">Asistente IA</a>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/40 hover:-translate-y-0.5">
              <MessageCircle size={18} /> Contactar
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950"></div>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 font-semibold text-sm mb-8 backdrop-blur-sm animate-fade-in-up">
            <Sparkles size={16} className="text-yellow-400" /> Respaldados por 16 años de experiencia
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
            Elevamos el nivel <br className="hidden md:block"/> de tu celebración.
          </h1>
          <p className="mt-4 text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 font-light max-w-3xl mx-auto italic tracking-wide">
            "A sound for you ;)"
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group px-8 py-4 text-lg font-bold rounded-full text-white bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 transition-all duration-300 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3">
              <CalendarCheck size={24} /> Agendar Evento <ChevronRight size={20} className="group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* IA INTERACTIVA */}
      <section id="ia-ideas" className="py-32 bg-orange-50 border-y border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-8 shadow-inner">
            <Sparkles className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-4xl font-black text-neutral-900 sm:text-5xl mb-6 tracking-tight">Inspírate con nuestra IA</h2>
          <p className="text-xl text-neutral-600 mb-12 font-light">Cuéntale a nuestro Asistente Virtual qué tipo de evento tienes en mente.</p>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-orange-500/10 border border-orange-100/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <input 
                type="text" 
                value={iaPrompt}
                onChange={(e) => setIaPrompt(e.target.value)}
                placeholder="Ej: Una fiesta de 15 años temática neón..." 
                className="flex-1 px-8 py-5 rounded-full bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-lg transition-all"
              />
              <button 
                onClick={generarIdeaConIA}
                disabled={isLoading || !iaPrompt}
                className="px-10 py-5 bg-neutral-900 text-white font-bold rounded-full hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center min-w-[220px]"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Generar Idea"}
              </button>
            </div>
            
            <div className={`transition-all duration-500 overflow-hidden ${iaResponse ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
              <div className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50/50 rounded-3xl text-left border border-orange-100 shadow-inner">
                <p className="text-neutral-800 text-xl font-medium italic leading-relaxed">"{iaResponse}"</p>
                <div className="mt-6 pt-6 border-t border-orange-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-sm text-neutral-500 font-bold uppercase tracking-wider">¡Hazlo realidad!</span>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold flex items-center gap-2 shadow-md">
                    <MessageCircle size={18} /> Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-neutral-950 py-10 text-center border-t border-neutral-800">
        <img src={miLogo} alt="EG Events Logo" className="h-10 w-auto mx-auto grayscale opacity-50 mb-4" />
        <p className="text-neutral-600 text-sm">© {new Date().getFullYear()} EG Events. A sound for you ;)</p>
      </footer>
    </div>
  );
}