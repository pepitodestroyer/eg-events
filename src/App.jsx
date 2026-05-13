import React, { useState, useEffect } from 'react';
import { 
  Music, Mic, MonitorPlay, Lightbulb, PartyPopper, HeartHandshake, 
  GlassWater, Users, CalendarCheck, MessageCircle, Sparkles, 
  Loader2, ChevronRight, X, Speaker, Projector
} from 'lucide-react';
import './index.css';
import miLogo from './logo.png';

// --- BASE DE DATOS DE SERVICIOS ---
const serviciosData = [
  {
    id: '15anos',
    title: 'Fiestas de 15 Años',
    icon: <PartyPopper size={32} />,
    shortDesc: 'La noche mágica que siempre soñó.',
    fullDesc: 'Diseñamos una atmósfera de fantasía. Desde iluminación robótica que sigue a la quinceañera, hasta pantallas LED de alta definición para proyectar su video cronológico. Un sonido impecable para que la pista de baile sea el epicentro de la juventud.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'bodas',
    title: 'Bodas de Ensueño',
    icon: <HeartHandshake size={32} />,
    shortDesc: 'El soundtrack perfecto para tu "Sí, acepto".',
    fullDesc: 'Musicalización elegante para la ceremonia, sonido envolvente para el vals y un sistema de fiesta explosivo para la hora loca. Nos encargamos de que la acústica y la iluminación arquitectónica transformen tu locación en un palacio.',
    color: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'divorcios',
    title: 'Fiestas de Divorcio',
    icon: <Music size={32} />,
    shortDesc: '¡Celebra tu nueva libertad por todo lo alto!',
    fullDesc: 'Un cierre de ciclo épico merece una fiesta legendaria. Luces de neón, karaoke con micrófonos inalámbricos profesionales, láseres dinámicos y la música más vibrante para festejar el inicio de tu nueva vida junto a tus mejores amigos.',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'bautizos',
    title: 'Bautizos y Comuniones',
    icon: <GlassWater size={32} />,
    shortDesc: 'Celebraciones íntimas, familiares y elegantes.',
    fullDesc: 'Proporcionamos un ambiente musical sutil y sofisticado. Microfonía nítida para los discursos y brindis familiares, apoyados con una iluminación cálida que realza la pureza y la paz de estas importantes ceremonias espirituales.',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'corporativos',
    title: 'Eventos Corporativos',
    icon: <Users size={32} />,
    shortDesc: 'Proyecta el éxito de tu marca o empresa.',
    fullDesc: 'Soluciones audiovisuales de alto calibre. Microfonía de solapa o diadema para ponentes, pantallas gigantes para presentaciones claras y un sonido uniforme que garantice que tu mensaje llegue con fuerza a cada rincón del auditorio.',
    color: 'from-slate-600 to-neutral-800'
  }
];

export default function App() {
  const whatsappNumber = "584141490509"; 
  const whatsappMessage = encodeURIComponent("¡Hola EG Events! Vi su página web y me gustaría solicitar una cotización. A sound for you ;)");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const [iaPrompt, setIaPrompt] = useState('');
  const [iaResponse, setIaResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicioActivo, setServicioActivo] = useState(null); // Controla la ventana modal

  // Efecto de scroll para el menú superior
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- MOTOR DE INTELIGENCIA ARTIFICIAL BLINDADO ---
  const generarIdeaConIA = async () => {
    if (!iaPrompt) return;
    setIsLoading(true);
    setIaResponse('');
    
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!API_KEY || API_KEY === "undefined" || API_KEY === "") {
      setIaResponse("⚠️ Vercel no está leyendo la Llave API.");
      setIsLoading(false); return;
    }

    try {
      // 1. Piloto automático: Buscar el modelo correcto
      const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
      const listData = await listResponse.json();
      
      let modeloCorrecto = "models/gemini-pro"; 
      if (listData.models && listData.models.length > 0) {
          const modeloDisponible = listData.models.find(m => 
              m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent") &&
              m.name.includes("gemini") && !m.name.includes("vision") && !m.name.includes("embedding")
          );
          if (modeloDisponible) modeloCorrecto = modeloDisponible.name; 
      }

      // 2. Generar el contenido
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modeloCorrecto}:generateContent?key=${API_KEY}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Actúa como un experto en eventos de 'EG Events' (16 años de experiencia). Un cliente quiere una fiesta con esta temática: "${iaPrompt}". Dale una sugerencia muy breve (3 líneas) de qué música, estructuras e iluminación le recomendarías. Tono profesional y comercial.`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        setIaResponse(data.candidates[0].content.parts[0].text);
      } else {
        setIaResponse("¡Suena increíble! Escríbenos al WhatsApp y lo diseñamos a tu medida.");
      }
    } catch (error) {
      setIaResponse("¡Suena increíble! Escríbenos al WhatsApp y lo diseñamos a tu medida.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans scroll-smooth">
      
      {/* --- NAVEGACIÓN --- */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <img src={miLogo} alt="EG Events" className="h-14 w-auto rounded-lg shadow-sm transition-transform hover:scale-105" />
          <div className={`hidden md:flex space-x-8 font-bold ${scrolled ? 'text-neutral-800' : 'text-white'}`}>
            <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
            <a href="#equipos" className="hover:text-orange-500 transition-colors">Equipos</a>
            <a href="#ia-ideas" className="hover:text-orange-500 transition-colors">Asistente IA</a>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-green-500 to-emerald-600 font-bold shadow-lg hover:scale-105 transition-transform">
            <MessageCircle size={18} /> Contactar
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-40 overflow-hidden bg-neutral-950 text-white text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-neutral-950"></div>
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-orange-400 font-semibold text-sm mb-8">
            <Sparkles size={16} /> Respaldados por 16 años de experiencia
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">Elevamos el nivel <br/> de tu celebración.</h1>
          <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 font-light italic tracking-widest">
            "A sound for you ;)"
          </p>
        </div>
      </section>

      {/* --- SECCIÓN DE SERVICIOS (CON MODALES) --- */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-neutral-600">Haz clic en cualquier opción para conocer los detalles de nuestro montaje.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosData.map((servicio) => (
              <div 
                key={servicio.id} 
                onClick={() => setServicioActivo(servicio)}
                className="group cursor-pointer p-8 rounded-3xl bg-neutral-50 border border-neutral-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${servicio.color} opacity-80`}></div>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${servicio.color} text-white mb-6 shadow-md`}>
                  {servicio.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-orange-500 transition-colors">{servicio.title}</h3>
                <p className="text-neutral-600 mb-6">{servicio.shortDesc}</p>
                <span className="inline-flex items-center text-sm font-bold text-orange-500">Ver detalles <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform"/></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VENTANA MODAL (POP-UP) DE SERVICIOS --- */}
      {servicioActivo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fondo oscuro desenfocado */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setServicioActivo(null)}></div>
          
          {/* Tarjeta de Contenido */}
          <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className={`h-3 w-full bg-gradient-to-r ${servicioActivo.color}`}></div>
            <button onClick={() => setServicioActivo(null)} className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors">
              <X size={24} />
            </button>
            
            <div className="p-8 md:p-12">
              <div className={`inline-flex p-5 rounded-3xl bg-gradient-to-br ${servicioActivo.color} text-white mb-6 shadow-lg`}>
                {servicioActivo.icon}
              </div>
              <h3 className="text-4xl font-black text-neutral-900 mb-4">{servicioActivo.title}</h3>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">{servicioActivo.fullDesc}</p>
              
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-white bg-neutral-900 hover:bg-orange-500 font-bold text-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                <CalendarCheck size={20} /> Cotizar este evento
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- SECCIÓN DE EQUIPOS TÉCNICOS --- */}
      <section id="equipos" className="py-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Arsenal Tecnológico</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-colors text-left">
              <Speaker className="text-orange-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-3">Audio Profesional</h3>
              <p className="text-neutral-400">Sistemas Line Array, bajos de alta potencia y microfonía inalámbrica de rango extendido para una acústica perfecta.</p>
            </div>
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-colors text-left">
              <Lightbulb className="text-orange-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-3">Iluminación Inteligente</h3>
              <p className="text-neutral-400">Cabezas móviles robóticas, luz negra UV, láseres dinámicos y estructuras truss de aluminio para montajes imponentes.</p>
            </div>
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-colors text-left">
              <Projector className="text-orange-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-3">Visuales y Pantallas</h3>
              <p className="text-neutral-400">Pantallas LED gigantes, videobeams de alta luminosidad y circuitos cerrados para que nadie se pierda ningún detalle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IA INTERACTIVA --- */}
      <section id="ia-ideas" className="py-32 bg-orange-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-8 shadow-xl">
            <Sparkles className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">El Asistente Virtual</h2>
          <p className="text-xl text-neutral-600 mb-12">Cuéntale a nuestra IA qué evento tienes en mente y recibe una sugerencia experta de producción en segundos.</p>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative border border-orange-100">
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <input 
                type="text" 
                value={iaPrompt}
                onChange={(e) => setIaPrompt(e.target.value)}
                placeholder="Ej: Una fiesta temática neón para mis 15 años..." 
                className="flex-1 px-8 py-5 rounded-full bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-lg transition-all"
              />
              <button 
                onClick={generarIdeaConIA}
                disabled={isLoading || !iaPrompt}
                className="px-10 py-5 bg-neutral-900 text-white font-bold rounded-full hover:bg-orange-500 transition-all disabled:opacity-50 min-w-[220px] flex justify-center items-center shadow-lg"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Generar Idea"}
              </button>
            </div>
            
            <div className={`transition-all duration-500 overflow-hidden ${iaResponse ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
              <div className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl text-left border border-orange-200 shadow-inner">
                <p className="text-neutral-800 text-xl font-medium italic leading-relaxed">"{iaResponse}"</p>
                <div className="mt-8 flex justify-end">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform">
                    <MessageCircle size={18} /> Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-neutral-950 py-12 text-center text-neutral-500 border-t border-neutral-800">
        <img src={miLogo} alt="EG Events" className="h-10 w-auto mx-auto grayscale opacity-30 mb-6" />
        <p>© {new Date().getFullYear()} EG Events. Todos los derechos reservados.</p>
        <p className="mt-2 font-mono text-sm">"A sound for you ;)"</p>
      </footer>
    </div>
  );
}