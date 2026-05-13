import React, { useState, useEffect } from 'react';
import { 
  Music, Mic, MonitorPlay, Lightbulb, PartyPopper, HeartHandshake, 
  GlassWater, Users, CalendarCheck, MessageCircle, Sparkles, 
  Loader2, ChevronRight, X, Speaker, Projector, ShieldCheck, Award, Zap
} from 'lucide-react';
import './index.css';
import miLogo from './logo.png';

// --- BASE DE DATOS DE SERVICIOS (CON IMÁGENES PREMIUM) ---
const serviciosData = [
  {
    id: '15anos',
    title: 'Fiestas de 15 Años',
    icon: <PartyPopper size={32} />,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80',
    shortDesc: 'La noche mágica que siempre soñó.',
    fullDesc: 'Diseñamos una atmósfera de fantasía. Desde iluminación robótica que sigue a la quinceañera en su entrada, hasta pantallas LED de alta definición para proyectar su video cronológico. Un sonido impecable para que la pista de baile sea el epicentro de la juventud.',
  },
  {
    id: 'bodas',
    title: 'Bodas de Ensueño',
    icon: <HeartHandshake size={32} />,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80',
    shortDesc: 'El soundtrack perfecto para tu "Sí, acepto".',
    fullDesc: 'Musicalización elegante para la ceremonia, sonido envolvente para el vals y un sistema de fiesta explosivo para la hora loca. Nos encargamos de que la acústica y la iluminación arquitectónica transformen tu locación en un verdadero palacio.',
  },
  {
    id: 'divorcios',
    title: 'Fiestas de Divorcio',
    icon: <Zap size={32} />,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80',
    shortDesc: '¡Celebra tu nueva libertad por todo lo alto!',
    fullDesc: 'Un cierre de ciclo épico merece una fiesta legendaria. Luces de neón, karaoke con micrófonos inalámbricos profesionales, láseres dinámicos y la música más vibrante para festejar el inicio de tu nueva etapa junto a tus mejores amigos.',
  },
  {
    id: 'bautizos',
    title: 'Bautizos y Comuniones',
    icon: <GlassWater size={32} />,
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80',
    shortDesc: 'Celebraciones íntimas, familiares y elegantes.',
    fullDesc: 'Proporcionamos un ambiente musical sutil y sofisticado. Microfonía nítida para los discursos y brindis familiares, apoyados con una iluminación cálida que realza la pureza y la paz de estas importantes ceremonias espirituales.',
  },
  {
    id: 'corporativos',
    title: 'Eventos Corporativos',
    icon: <Users size={32} />,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
    shortDesc: 'Proyecta el éxito de tu marca o empresa.',
    fullDesc: 'Soluciones audiovisuales de alto calibre. Microfonía de diadema para ponentes, pantallas gigantes para presentaciones claras y un sonido uniforme que garantice que tu mensaje llegue con fuerza a cada rincón del auditorio.',
  }
];

export default function App() {
  const [iaPrompt, setIaPrompt] = useState('');
  const [iaResponse, setIaResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicioActivo, setServicioActivo] = useState(null);

  // --- GENERADOR INTELIGENTE DE ENLACES DE WHATSAPP ---
  const getWaLink = (contextoEvento = "") => {
    const numero = "584141490509";
    let mensaje = "¡Hola EG Events! Vi su página web y me gustaría solicitar una cotización. A sound for you ;)";
    
    if (contextoEvento) {
      mensaje = `¡Hola EG Events! Vi su página web y me gustaría cotizar el servicio para: *${contextoEvento}*. A sound for you ;)`;
    }
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  };

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
      setIaResponse("⚠️ Error interno: Clave de IA no detectada.");
      setIsLoading(false); return;
    }

    try {
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

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modeloCorrecto}:generateContent?key=${API_KEY}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Actúa como experto en eventos de 'EG Events' (16 años de experiencia). Cliente quiere: "${iaPrompt}". Sugiere brevemente (3 líneas) música, estructuras e iluminación. Tono vendedor y cálido.`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        setIaResponse(data.candidates[0].content.parts[0].text);
      } else {
        setIaResponse("¡Suena a un evento espectacular! Escríbenos directamente para diseñarlo a tu medida.");
      }
    } catch (error) {
      setIaResponse("¡Suena a un evento espectacular! Escríbenos directamente para diseñarlo a tu medida.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans scroll-smooth">
      
      {/* NAVEGACIÓN */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <img src={miLogo} alt="EG Events" className="h-14 w-auto rounded-lg shadow-sm transition-transform hover:scale-105" />
          <div className={`hidden md:flex space-x-8 font-bold text-sm tracking-wide ${scrolled ? 'text-neutral-800' : 'text-white'}`}>
            <a href="#trayectoria" className="hover:text-orange-500 transition-colors">Nosotros</a>
            <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
            <a href="#equipos" className="hover:text-orange-500 transition-colors">Equipos</a>
            <a href="#ia-ideas" className="hover:text-orange-500 transition-colors">Asistente IA</a>
          </div>
          <a href={getWaLink()} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-orange-500 to-yellow-500 font-bold shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all">
            <MessageCircle size={18} /> Contactar
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-40 overflow-hidden bg-neutral-950 text-white text-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80" alt="Concert Event" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/90 to-neutral-950"></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/30 rounded-full blur-[120px] animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-orange-400 font-semibold text-sm mb-8 backdrop-blur-md shadow-2xl">
            <Award size={18} /> 16 Años de Excelencia Profesional
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter drop-shadow-2xl">
            Elevamos el nivel <br className="hidden md:block"/> de tu celebración.
          </h1>
          <p className="mt-6 text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 font-light italic tracking-widest">
            "A sound for you ;)"
          </p>
        </div>
      </section>

      {/* NOSOTROS / TRAYECTORIA (Recuperando el texto y la esencia) */}
      <section id="trayectoria" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">No solo ponemos música, <span className="text-orange-500">creamos memorias.</span></h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              En <strong>EG Events</strong> entendemos que tu evento no es una fecha más en el calendario, es un momento irrepetible. Con 16 años de trayectoria perfeccionando montajes audiovisuales, hemos aprendido que el secreto de una fiesta legendaria está en los detalles técnicos.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              Desde la nitidez del micrófono a la hora del brindis, hasta la potencia del bajo cuando la pista de baile explota. Tu tranquilidad es nuestra prioridad; nosotros manejamos la tecnología, tú te dedicas a disfrutar.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-orange-500" size={32} />
                <span className="font-bold text-neutral-800">Garantía Técnica</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="text-orange-500" size={32} />
                <span className="font-bold text-neutral-800">Diseño Personalizado</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-3xl translate-x-4 translate-y-4 opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1533174000222-edfe81d8bb71?auto=format&fit=crop&q=80" alt="DJ Equipment" className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
          </div>
        </div>
      </section>

      {/* SERVICIOS PREMIUM (Tarjetas Fotográficas) */}
      <section id="servicios" className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">Experiencias a tu Medida</h2>
            <p className="text-xl text-neutral-600">Selecciona el tipo de evento para conocer nuestra propuesta de montaje.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosData.map((servicio) => (
              <div 
                key={servicio.id} 
                onClick={() => setServicioActivo(servicio)}
                className="group relative rounded-[2rem] overflow-hidden shadow-lg h-[400px] cursor-pointer"
              >
                <img src={servicio.image} alt={servicio.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-orange-400 mb-4">{servicio.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{servicio.title}</h3>
                  <p className="text-neutral-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{servicio.shortDesc}</p>
                  <span className="inline-flex items-center text-sm font-bold text-orange-400">Cotizar este servicio <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform"/></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENTANA MODAL (POP-UP) PROFESIONAL DIVIDIDA */}
      {servicioActivo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm" onClick={() => setServicioActivo(null)}></div>
          
          <div className="relative bg-white rounded-[2rem] w-full max-w-5xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row max-h-[90vh]">
            <button onClick={() => setServicioActivo(null)} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors backdrop-blur-md">
              <X size={24} />
            </button>
            
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img src={servicioActivo.image} alt={servicioActivo.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 md:to-white/20"></div>
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <div className="inline-flex p-4 rounded-2xl bg-orange-100 text-orange-600 mb-6 w-max">
                {servicioActivo.icon}
              </div>
              <h3 className="text-4xl font-black text-neutral-900 mb-4">{servicioActivo.title}</h3>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">{servicioActivo.fullDesc}</p>
              
              {/* BOTÓN WHATSAPP DINÁMICO */}
              <a href={getWaLink(servicioActivo.title)} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-white bg-neutral-900 hover:bg-orange-500 font-bold text-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300 group">
                <MessageCircle size={22} className="group-hover:animate-bounce" /> Cotizar este montaje
              </a>
            </div>
          </div>
        </div>
      )}

      {/* EQUIPOS TÉCNICOS */}
      <section id="equipos" className="py-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Arsenal Tecnológico</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[2rem] bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-colors text-left group">
              <Speaker className="text-orange-400 mb-6 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-bold mb-4">Audio Profesional</h3>
              <p className="text-neutral-400 leading-relaxed">Sistemas Line Array, bajos de alta potencia y microfonía inalámbrica de rango extendido para una acústica perfecta, sin acoples ni distorsiones.</p>
            </div>
            <div className="p-10 rounded-[2rem] bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-colors text-left group">
              <Lightbulb className="text-orange-400 mb-6 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-bold mb-4">Iluminación Inteligente</h3>
              <p className="text-neutral-400 leading-relaxed">Cabezas móviles robóticas, luz negra UV, láseres dinámicos y estructuras truss de aluminio para montajes imponentes y ambientes inmersivos.</p>
            </div>
            <div className="p-10 rounded-[2rem] bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-colors text-left group">
              <Projector className="text-orange-400 mb-6 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-bold mb-4">Visuales y Pantallas</h3>
              <p className="text-neutral-400 leading-relaxed">Pantallas LED gigantes modulares, videobeams de alta luminosidad y circuitos cerrados para que nadie se pierda ningún detalle visual.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IA INTERACTIVA */}
      <section id="ia-ideas" className="py-32 bg-orange-50 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 shadow-xl">
            <Sparkles className="w-12 h-12 text-orange-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">Asistente Creativo IA</h2>
          <p className="text-xl text-neutral-600 mb-12">¿Tienes una idea en mente? Escríbela y nuestro Asistente de Inteligencia Artificial te dará una sugerencia técnica en segundos.</p>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative border border-orange-100">
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <input 
                type="text" 
                value={iaPrompt}
                onChange={(e) => setIaPrompt(e.target.value)}
                placeholder="Ej: Una fiesta de divorcio temática de los años 80..." 
                className="flex-1 px-8 py-5 rounded-full bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-lg transition-all"
              />
              <button 
                onClick={generarIdeaConIA}
                disabled={isLoading || !iaPrompt}
                className="px-10 py-5 bg-neutral-900 text-white font-bold rounded-full hover:bg-orange-500 transition-all disabled:opacity-50 min-w-[220px] shadow-lg"
              >
                {isLoading ? <Loader2 className="animate-spin mx-auto" size={24} /> : "Generar Idea"}
              </button>
            </div>
            
            <div className={`transition-all duration-500 overflow-hidden ${iaResponse ? 'max-h-[600px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
              <div className="p-8 md:p-10 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl text-left border border-orange-200 shadow-inner">
                <p className="text-neutral-800 text-xl font-medium italic leading-relaxed">"{iaResponse}"</p>
                <div className="mt-8 pt-6 border-t border-orange-200 flex justify-end">
                  {/* WHATSAPP DINÁMICO PARA IA */}
                  <a href={getWaLink(`Producción sugerida por la IA para: ${iaPrompt}`)} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform">
                    <MessageCircle size={20} /> Cotizar esta idea al WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 py-16 text-center text-neutral-500 border-t border-neutral-800">
        <img src={miLogo} alt="EG Events" className="h-12 w-auto mx-auto grayscale opacity-30 mb-8 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
        <p>© {new Date().getFullYear()} EG Events. Todos los derechos reservados.</p>
        <p className="mt-2 font-mono text-sm">"A sound for you ;)"</p>
      </footer>
    </div>
  );
}