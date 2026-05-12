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

  // Efecto Jarvis: Detectar scroll para cambiar la barra de navegación
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generarIdeaConIA = async () => {
    if (!iaPrompt) return;
    setIsLoading(true);
    
    const API_KEY = 'AIzaSyCREpXX8xEyEADcbPcdCxOF0CE4OjMkTJI'; 
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Actúa como un experto en eventos de 'EG Events'. Un cliente quiere hacer una fiesta con esta temática: "${iaPrompt}". Dale una sugerencia muy breve (máximo 3 líneas) de qué tipo de música e iluminación (colores) le recomendarías para que su evento sea espectacular. Tono profesional y animado.`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        setIaResponse(data.candidates[0].content.parts[0].text);
      } else {
        setIaResponse("¡Suena como un evento increíble! Escríbenos al WhatsApp y lo diseñamos a tu medida.");
      }
    } catch (error) {
      setIaResponse("Hubo un error de conexión, señor. ¡Pero no se preocupe, escríbanos directamente y le asesoramos!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-orange-500 selection:text-white scroll-smooth">
      
      {/* NAVEGACIÓN DINÁMICA */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* AQUÍ VA SU LOGO: Asegúrese de tener logo.png en la carpeta public */}
              <img 
                src={miLogo}
                alt="EG Events Logo" 
                className="h-12 w-auto rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300 object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/150x50/171717/f97316?text=EG+Events"; // Placeholder por si no encuentra el logo
                }}
              />
            </div>
            <div className={`hidden md:flex space-x-8 text-sm font-bold transition-colors duration-300 ${scrolled ? 'text-neutral-800' : 'text-white'}`}>
              <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
              <a href="#equipos" className="hover:text-orange-500 transition-colors">Equipos</a>
              <a href="#ia-ideas" className="hover:text-orange-500 transition-colors">Asistente IA</a>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/40 hover:-translate-y-0.5">
              <MessageCircle size={18} />
              Contactar
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION MEJORADA */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-neutral-950 text-white">
        {/* Fondo con superposición elegante */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950"></div>
          {/* Luces simuladas animadas */}
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
          <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 font-light">
            Sistemas de sonido profesional, iluminación inteligente y animación para eventos de cualquier magnitud. Diseño limpio, montaje impecable y acústica perfecta.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group px-8 py-4 text-lg font-bold rounded-full text-white bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3 hover:-translate-y-1">
              <CalendarCheck size={24} /> 
              Agendar Evento
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#servicios" className="px-8 py-4 text-lg font-bold rounded-full text-white border border-neutral-700 hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center hover:-translate-y-1">
              Explorar Servicios
            </a>
          </div>
        </div>
      </section>

      {/* SERVICIOS CON TRANSICIONES */}
      <section id="servicios" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-neutral-900 sm:text-5xl tracking-tight">Cualquier motivo es bueno para celebrar</h2>
            <p className="mt-6 text-xl text-neutral-500 max-w-2xl mx-auto font-light">
              Más de una década y media perfeccionando cada detalle. Desde reuniones íntimas hasta grandes producciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: HeartHandshake, title: "Matrimonios", desc: "Sonido elegante y animación medida para el día más importante de tu vida. Ceremonia y fiesta cubiertas." },
              { icon: PartyPopper, title: "Quinceaños", desc: "Energía al máximo, iluminación espectacular y los mejores ritmos para una noche inolvidable." },
              { icon: GlassWater, title: "Fiestas de Divorcio", desc: "Cierra un ciclo celebrando un nuevo comienzo. Animación divertida y un ambiente liberador." },
              { icon: CheckCircle2, title: "Bautizos", desc: "Música ambiental adecuada, micrófonos para palabras emotivas y un volumen respetuoso para la familia." },
              { icon: Music, title: "Celebraciones", desc: "Cumpleaños, aniversarios o graduaciones. Ponemos el sistema; tú pones las ganas de disfrutar." },
              { icon: Users, title: "Corporativos", desc: "Sistemas de audio nítido para conferencias, presentaciones y fiestas de fin de año de tu empresa." }
            ].map((servicio, idx) => (
              <div key={idx} className="group p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 hover:bg-white hover:border-orange-500/30 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-default">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500 mb-8 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                  <servicio.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{servicio.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA DE EQUIPOS REALES */}
      <section id="equipos" className="py-32 bg-neutral-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-black sm:text-5xl mb-8 leading-tight">
                Montajes <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Limpios y Profesionales</span>
              </h2>
              <p className="text-neutral-400 text-xl mb-10 font-light leading-relaxed">
                Cuidamos la estética de tu evento, señor. Nuestros montajes están diseñados para verse tan bien como suenan, sin cables desordenados ni estructuras antiestéticas.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: MonitorPlay, title: "Pantallas y Visuales", desc: "Integración de monitores para visuales reactivos, videos conmemorativos o logotipos del evento." },
                  { icon: Mic, title: "Sonido de Alta Fidelidad", desc: "Sistemas de amplificación configurados a la perfección para interiores y exteriores." },
                  { icon: Lightbulb, title: "Iluminación Inteligente", desc: "Paneles LED, focos direccionales y luces rítmicas montadas sobre estructuras seguras." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                      <p className="text-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN DE IMÁGENES REALES */}
            <div className="order-1 lg:order-2 relative h-[600px] w-full rounded-3xl overflow-hidden group shadow-2xl shadow-orange-500/10">
              {/* IMAGEN 1: Asegúrese de tener montaje1.jpg en public */}
              <img 
                src="/montaje1.jpg" 
                alt="Montaje de Sonido e Iluminación" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop"; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
              
              {/* IMAGEN 2 (Opcional, insertada como un pequeño recuadro dinámico) */}
              <div className="absolute bottom-8 right-8 w-48 h-48 rounded-2xl border-4 border-neutral-900 overflow-hidden shadow-2xl hover:scale-110 transition-transform duration-500 z-20 hidden md:block">
                <img 
                  src="/montaje2.jpg" 
                  alt="Detalle de Iluminación" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop"; 
                  }}
                />
              </div>
              
              <div className="absolute bottom-8 left-8 z-20">
                <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white font-medium">
                  Sistemas JBL & Iluminación LED
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* IA INTERACTIVA (LLM Integration) */}
      <section id="ia-ideas" className="py-32 bg-orange-50 border-y border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-8 shadow-inner">
            <Sparkles className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-4xl font-black text-neutral-900 sm:text-5xl mb-6 tracking-tight">Protocolo de Inspiración IA</h2>
          <p className="text-xl text-neutral-600 mb-12 font-light">
            Señor, cuéntele a nuestro Asistente de IA impulsado por Gemini qué tipo de evento tiene en mente, y procesaremos una idea instantánea de ambientación.
          </p>

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
                className="px-10 py-5 bg-neutral-900 text-white font-bold rounded-full hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center min-w-[220px]"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Generar Idea"}
              </button>
            </div>
            
            {/* Animación de respuesta */}
            <div className={`transition-all duration-500 overflow-hidden ${iaResponse ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
              <div className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50/50 rounded-3xl text-left border border-orange-100 shadow-inner">
                <p className="text-neutral-800 text-xl font-medium italic leading-relaxed">"{iaResponse}"</p>
                <div className="mt-6 pt-6 border-t border-orange-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-sm text-neutral-500 font-bold uppercase tracking-wider">Análisis completado</span>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold flex items-center gap-2 transition-colors shadow-md">
                    <MessageCircle size={18} /> Hagámoslo realidad
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PREMIUM */}
      <footer id="contacto" className="bg-neutral-950 text-white pt-24 pb-12 relative overflow-hidden">
        {/* Línea superior decorativa */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-neutral-900/80 backdrop-blur-lg rounded-[3rem] p-10 md:p-20 text-center border border-neutral-800 mb-20 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">¿Sistemas listos para el mejor evento?</h2>
            <p className="text-2xl text-neutral-400 mb-10 max-w-3xl mx-auto font-light">
              Contacte a nuestro equipo hoy mismo vía WhatsApp. Con 16 años de trayectoria, calcularemos la configuración acústica y visual perfecta para sus invitados.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group px-12 py-5 text-xl font-bold rounded-full text-neutral-900 bg-white hover:bg-green-500 hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3 mx-auto w-fit hover:-translate-y-2">
              <MessageCircle size={28} className="text-green-500 group-hover:text-white transition-colors" />
              Iniciar Protocolo de Cotización
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-neutral-800/50 pt-10 gap-6">
            <div className="flex items-center gap-4">
              {/* Logo en el footer */}
               <img 
                src={miLogo}
                alt="EG Events Logo" 
                className="h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/150x50/171717/f97316?text=EG+Events";
                }}
              />
            </div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-400 italic text-lg tracking-widest font-light">
              "A sound for you ;)"
            </p>
            <div className="text-neutral-600 text-sm font-medium">
              © {new Date().getFullYear()} EG Events. Sistemas en línea.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}