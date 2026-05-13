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
    setIsLoading(true);
    setIaResponse('Escaneando servidores de Google...');
    
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      // Le pedimos a Google LA LISTA EXACTA de modelos que tienes permitidos
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
      const data = await response.json();
      
      if (data.models) {
         // Extraemos solo los nombres y los mostramos en pantalla
         const nombres = data.models.map(m => m.name.replace('models/', '')).join(" | ");
         setIaResponse(`✅ TUS MODELOS AUTORIZADOS SON: ${nombres}`);
      } else {
         setIaResponse(`⚠️ RESPUESTA DE GOOGLE: ${JSON.stringify(data)}`);
      }
      
    } catch (error) {
      setIaResponse(`⚠️ ERROR CRÍTICO: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-orange-500 selection:text-white scroll-smooth">
      
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img src={miLogo} alt="EG Events Logo" className="h-12 w-auto rounded-lg shadow-sm object-contain" />
        </div>
      </nav>

      <section className="relative pt-40 pb-32 overflow-hidden bg-neutral-950 text-white text-center">
        <h1 className="text-5xl md:text-8xl font-black mb-6">Modo Diagnóstico</h1>
        <p className="text-2xl text-orange-400 italic">"A sound for you ;)"</p>
      </section>

      <section id="ia-ideas" className="py-32 bg-orange-50 border-y border-orange-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-12">Escáner de Permisos API</h2>
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative">
            <button 
              onClick={generarIdeaConIA}
              disabled={isLoading}
              className="px-10 py-5 bg-neutral-900 text-white font-bold rounded-full hover:bg-orange-500 transition-all w-full mb-8"
            >
              {isLoading ? <Loader2 className="animate-spin mx-auto" size={24} /> : "EJECUTAR ESCÁNER DE GOOGLE"}
            </button>
            
            <div className={`transition-all duration-500 ${iaResponse ? 'opacity-100' : 'opacity-0'}`}>
              <div className="p-8 bg-neutral-100 rounded-3xl text-left border border-neutral-300">
                <p className="text-neutral-900 font-mono font-bold text-lg break-words">{iaResponse}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}