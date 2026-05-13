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
    setIaResponse('');
    
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!API_KEY || API_KEY === "undefined" || API_KEY === "") {
      setIaResponse("⚠️ DIAGNÓSTICO: Vercel no está inyectando la Llave API.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. AUTO-DESCUBRIMIENTO: El radar busca el nombre exacto del modelo que Google permite hoy
      const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
      const listData = await listResponse.json();
      
      let modeloCorrecto = "models/gemini-pro"; // Nombre de respaldo
      
      if (listData.models && listData.models.length > 0) {
          // Filtramos para agarrar un motor de texto válido que no sea de imágenes
          const modeloDisponible = listData.models.find(m => 
              m.supportedGenerationMethods && 
              m.supportedGenerationMethods.includes("generateContent") &&
              m.name.includes("gemini") && 
              !m.name.includes("vision") &&
              !m.name.includes("embedding")
          );
          
          if (modeloDisponible) {
              modeloCorrecto = modeloDisponible.name; 
          }
      }

      // 2. Conectamos con el nombre exacto que el radar encontró
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modeloCorrecto}:generateContent?key=${API_KEY}`;
      
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
      
      if (data.candidates && data.candidates[0]) {
        // ¡Éxito! Mostramos el mensaje comercial de la IA
        setIaResponse(data.candidates[0].content.parts[0].text);
      } else {
        // Si por casualidad falla la respuesta de Google
        setIaResponse(`⚠️ DIAGNÓSTICO GOOGLE: ${data?.error?.message || JSON.stringify(data)}`);
      }
    } catch (error) {
      setIaResponse(`⚠️ DIAGNÓSTICO DE RED: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-orange-500 selection:text-white scroll-smooth">
      
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <img src={miLogo} alt="EG Events Logo" className="h-12 w-auto rounded-lg shadow-sm" />
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-green-500 to-emerald-600 font-bold shadow-lg">
            <MessageCircle size={18} /> Contactar
          </a>
        </div>
      </nav>

      <section className="relative pt-40 pb-32 overflow-hidden bg-neutral-950 text-white text-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">Elevamos el nivel <br/> de tu celebración.</h1>
          <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 italic">"A sound for you ;)"</p>
        </div>
      </section>

      <section id="ia-ideas" className="py-32 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">Inspírate con nuestra IA</h2>
          <p className="text-xl text-neutral-600 mb-12">Cuéntale a nuestro Asistente Virtual qué evento tienes en mente.</p>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative">
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <input 
                type="text" 
                value={iaPrompt}
                onChange={(e) => setIaPrompt(e.target.value)}
                placeholder="Ej: Una fiesta temática neón..." 
                className="flex-1 px-8 py-5 rounded-full bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-orange-500 text-lg"
              />
              <button 
                onClick={generarIdeaConIA}
                disabled={isLoading || !iaPrompt}
                className="px-10 py-5 bg-neutral-900 text-white font-bold rounded-full hover:bg-orange-500 transition-all disabled:opacity-50 min-w-[220px]"
              >
                {isLoading ? <Loader2 className="animate-spin mx-auto" size={24} /> : "Generar Idea"}
              </button>
            </div>
            
            <div className={`transition-all duration-500 overflow-hidden ${iaResponse ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
              <div className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50/50 rounded-3xl text-left border border-orange-100">
                <p className="text-neutral-800 text-xl font-medium italic">"{iaResponse}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}