import React, { useState, useEffect } from 'react';
import { 
  Music, Mic, MonitorPlay, Lightbulb, PartyPopper, HeartHandshake, 
  GlassWater, Users, CalendarCheck, MessageCircle, Sparkles, 
  Loader2, ChevronRight, X, Speaker, Projector, ShieldCheck, Award, Zap, School
} from 'lucide-react';
import './index.css';
import miLogo from './logo.png';

const serviciosData = [
  {
    id: '15anos',
    title: 'Fiestas de 15 Años',
    icon: <PartyPopper size={28} className="md:w-8 md:h-8" />,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80',
    shortDesc: 'La noche mágica que siempre soñó.',
    fullDesc: 'Diseñamos una atmósfera de fantasía. Desde iluminación robótica que sigue a la quinceañera, hasta pantallas LED. Todo respaldado por la potencia y claridad de nuestros sistemas de sonido JBL.',
  },
  {
    id: 'bodas',
    title: 'Bodas de Ensueño',
    icon: <HeartHandshake size={28} className="md:w-8 md:h-8" />,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80',
    shortDesc: 'El soundtrack perfecto para tu "Sí, acepto".',
    fullDesc: 'Musicalización elegante para la ceremonia y fiesta explosiva para la hora loca. Utilizamos tecnología JBL para garantizar que cada palabra de los votos y cada nota del vals se escuchen con una fidelidad asombrosa.',
  },
  {
    id: 'graduaciones',
    title: 'Graduaciones',
    icon: <School size={28} className="md:w-8 md:h-8" />,
    image: 'https://images.unsplash.com/photo-1523050853023-8c2d27443ef8?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'El cierre de un ciclo, el inicio de una leyenda.',
    fullDesc: 'Producimos actos académicos y fiestas de promoción con un estándar de excelencia. Desde el audio nítido para los discursos hasta la máxima potencia JBL para el baile final. Estructuras imponentes para una despedida inolvidable.',
  },
  {
    id: 'divorcios',
    title: 'Fiestas de Divorcio',
    icon: <Zap size={28} className="md:w-8 md:h-8" />,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80',
    shortDesc: '¡Celebra tu nueva libertad por todo lo alto!',
    fullDesc: 'Un cierre de ciclo épico merece una fiesta legendaria. Luces de neón, láseres dinámicos y el sonido más vibrante de nuestras cabinas JBL para festejar tu nueva etapa junto a tus mejores amigos.',
  },
  {
    id: 'bautizos',
    title: 'Bautizos y Comuniones',
    icon: <GlassWater size={28} className="md:w-8 md:h-8" />,
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80',
    shortDesc: 'Celebraciones íntimas, familiares y elegantes.',
    fullDesc: 'Ambiente musical sutil y sofisticado. Microfonía nítida para los brindis familiares, apoyados con sonido profesional JBL de alta fidelidad y una iluminación cálida que realza la paz de la ceremonia.',
  },
  {
    id: 'corporativos',
    title: 'Eventos Corporativos',
    icon: <Users size={28} className="md:w-8 md:h-8" />,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
    shortDesc: 'Proyecta el éxito de tu marca o empresa.',
    fullDesc: 'Soluciones audiovisuales de alto calibre para conferencias y lanzamientos. Sonido uniforme JBL que garantiza que tu mensaje corporativo llegue con total claridad a cada rincón del auditorio.',
  }
];

export default function App() {
  const [iaPrompt, setIaPrompt] = useState('');
  const [iaResponse, setIaResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicioActivo, setServicioActivo] = useState(null);

  const getWaLink = (contextoEvento = "") => {
    const numero = "584141490509";
    let mensaje = "¡Hola EG Events! Vi su página web y me gustaría solicitar una cotización. A sound for you ;)";
    if (contextoEvento) {
      mensaje = `¡Hola EG Events! Vi su página web y me gustaría cotizar el servicio para: *${contextoEvento}*. A sound for you ;)`;
    }
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
              text: `Actúa como experto de 'EG Events' (16 años exp). Cliente quiere: "${iaPrompt}". Sugiere brevemente música, estructuras y recalca el uso de sonido JBL. Tono comercial.`
            }]
          }]
        })
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        setIaResponse(data.candidates[0].content.parts[0].text);
      } else {
        setIaResponse("¡Suena espectacular! Escríbenos para diseñarlo con nuestra potencia JBL.");
      }
    } catch (error) {
      setIaResponse("¡Suena espectacular! Escríbenos para diseñarlo con nuestra potencia JBL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans scroll-smooth">
      
      {/* NAVEGACIÓN */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <img src={miLogo} alt="EG Events" className="h-10 md:h-14 w-auto rounded-lg shadow-sm" />
          <div className={`hidden md:flex space-x-8 font-bold text-sm tracking-wide ${scrolled ? 'text-neutral-800' : 'text-white'}`}>
            <a href="#trayectoria" className="hover:text-orange-500 transition-colors">Nosotros</a>
            <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
            <a href="#equipos" className="hover:text-orange-500 transition-colors">Equipos</a>
            <a href="#ia-ideas" className="hover:text-orange-500 transition-colors">Asistente IA</a>
          </div>
          <a href={getWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 rounded-full text-white bg-gradient-to-r from-orange-500 to-yellow-500 font-bold shadow-lg transition-all text-sm md:text-base">
            <MessageCircle size={18} /> Contactar
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-neutral-950 text-white text-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" alt="Concert Event" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/90 to-neutral-950"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-orange-400 font-semibold text-xs md:text-sm mb-6 md:mb-8 backdrop-blur-md">
            <Award size={16} className="md:w-4 md:h-4" /> 16 Años de Excelencia con JBL
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-4 md:mb-6 leading-tight tracking-tighter">Elevamos el nivel <br className="hidden md:block"/> de tu celebración.</h1>
          <p className="mt-4 md:mt-6 text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 font-light italic">"A sound for you ;)"</p>
        </div>
      </section>

      {/* NOSOTROS (TRAYECTORIA) */}
      <section id="trayectoria" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-4 md:mb-6 leading-tight">No solo ponemos música, <br className="hidden sm:block"/> <span className="text-orange-500">creamos memorias.</span></h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-6">
              En <strong>EG Events</strong> somos especialistas en llevar la potencia de <strong>JBL Professional</strong> a tu evento. Con 16 años de trayectoria perfeccionando montajes, garantizamos una experiencia sonora de alto impacto y una iluminación de vanguardia.
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
              <div className="flex items-center gap-2 md:gap-3">
                <ShieldCheck className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />
                <span className="font-bold text-neutral-800 text-sm md:text-base">Calidad JBL</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Sparkles className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />
                <span className="font-bold text-neutral-800 text-sm md:text-base">Diseño Elite</span>
              </div>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="absolute inset-0 bg-orange-500 rounded-3xl translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" alt="Equipos EG Events" className="relative rounded-3xl shadow-2xl object-cover h-64 sm:h-80 md:h-[500px] w-full" />
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-16 md:py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-3 md:mb-4">Experiencias a tu Medida</h2>
            <p className="text-lg md:text-xl text-neutral-600 px-4">Producción de alto nivel para eventos inolvidables.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {serviciosData.map((servicio) => (
              <div key={servicio.id} onClick={() => setServicioActivo(servicio)} className="group relative rounded-3xl md:rounded-[2rem] overflow-hidden shadow-lg h-72 sm:h-80 md:h-[400px] cursor-pointer">
                <img src={servicio.image} alt={servicio.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 md:translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="text-orange-400 mb-3 md:mb-4">{servicio.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{servicio.title}</h3>
                  <span className="inline-flex items-center text-xs md:text-sm font-bold text-orange-400">Ver detalles <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform"/></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENTANA MODAL SERVICIOS (OPTIMIZADA PARA MÓVIL) */}
      {servicioActivo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm" onClick={() => setServicioActivo(null)}></div>
          <div className="relative bg-white rounded-3xl md:rounded-[2rem] w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <button onClick={() => setServicioActivo(null)} className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors backdrop-blur-md">
              <X size={20} className="md:w-6 md:h-6" />
            </button>
            
            {/* EL TRUCO: flex-none evita que la imagen se aplaste en teléfonos */}
            <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-auto flex-none relative">
              <img src={servicioActivo.image} alt={servicioActivo.title} className="w-full h-full object-cover" />
            </div>
            
            {/* EL TRUCO: Menos padding (p-6) en teléfonos para que el texto no se asfixie */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 overflow-y-auto">
              <div className="inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-orange-100 text-orange-600 mb-4 md:mb-6 w-max">
                {servicioActivo.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 mb-3 md:mb-4">{servicioActivo.title}</h3>
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-6 md:mb-8">{servicioActivo.fullDesc}</p>
              <a href={getWaLink(servicioActivo.title)} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full text-white bg-neutral-900 hover:bg-orange-500 font-bold text-sm md:text-lg shadow-lg transition-all">
                <MessageCircle size={20} className="md:w-6 md:h-6" /> Cotizar vía WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* EQUIPOS TÉCNICOS */}
      <section id="equipos" className="py-16 md:py-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-10 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Arsenal Tecnológico</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-8 md:p-10 rounded-3xl md:rounded-[2rem] bg-neutral-900 border border-neutral-800 text-left group">
              <Speaker className="text-orange-400 mb-5 md:mb-6 group-hover:scale-110 transition-transform w-10 h-10 md:w-12 md:h-12" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Sonido JBL Professional</h3>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">Sistemas Line Array y bajos de alta potencia JBL para una acústica perfecta, nítida y envolvente en cualquier espacio.</p>
            </div>
            <div className="p-8 md:p-10 rounded-3xl md:rounded-[2rem] bg-neutral-900 border border-neutral-800 text-left group">
              <Lightbulb className="text-orange-400 mb-5 md:mb-6 group-hover:scale-110 transition-transform w-10 h-10 md:w-12 md:h-12" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Iluminación Inteligente</h3>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">Cabezas móviles robóticas, luz negra UV y efectos láser para crear ambientes inmersivos sincronizados con la música.</p>
            </div>
            <div className="p-8 md:p-10 rounded-3xl md:rounded-[2rem] bg-neutral-900 border border-neutral-800 text-left group">
              <Projector className="text-orange-400 mb-5 md:mb-6 group-hover:scale-110 transition-transform w-10 h-10 md:w-12 md:h-12" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Pantallas LED</h3>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">Pantallas gigantes de alta resolución para proyección de visuales, videos y transmisiones en vivo con máxima claridad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IA INTERACTIVA */}
      <section id="ia-ideas" className="py-20 md:py-32 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-4 md:mb-6">Asistente Creativo IA</h2>
          <p className="text-base md:text-xl text-neutral-600 mb-8 md:mb-12">Diseña tu evento ideal con nuestra Inteligencia Artificial.</p>
          <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[3rem] shadow-2xl border border-orange-100">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-2">
              <input type="text" value={iaPrompt} onChange={(e) => setIaPrompt(e.target.value)} placeholder="Ej: Mi graduación con sonido JBL..." className="flex-1 px-6 md:px-8 py-4 md:py-5 rounded-full bg-neutral-50 border focus:border-orange-500 text-base md:text-lg outline-none" />
              <button onClick={generarIdeaConIA} disabled={isLoading || !iaPrompt} className="px-8 md:px-10 py-4 md:py-5 bg-neutral-900 text-white font-bold rounded-full hover:bg-orange-500 transition-all sm:min-w-[200px] md:min-w-[220px]">
                {isLoading ? <Loader2 className="animate-spin mx-auto" size={24} /> : "Generar Idea"}
              </button>
            </div>
            {iaResponse && (
              <div className="mt-6 md:mt-8 p-6 md:p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl md:rounded-3xl text-left border border-orange-200">
                <p className="text-neutral-800 text-base md:text-xl font-medium italic">"{iaResponse}"</p>
                <div className="mt-6 md:mt-8 flex justify-end">
                  <a href={getWaLink(`Idea IA: ${iaPrompt}`)} target="_blank" rel="noopener noreferrer" className="px-6 py-3 md:px-8 md:py-3.5 bg-green-500 text-white rounded-full font-bold flex items-center gap-2 shadow-md text-sm md:text-base">
                    <MessageCircle size={20} className="md:w-5 md:h-5" /> Cotizar esta idea
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 py-10 md:py-16 text-center text-neutral-500 border-t border-neutral-800">
        <img src={miLogo} alt="EG Events" className="h-8 md:h-12 w-auto mx-auto grayscale opacity-30 mb-6 md:mb-8" />
        <p className="text-sm md:text-base">© {new Date().getFullYear()} EG Events. Potenciado por JBL.</p>
        <p className="mt-1 md:mt-2 font-mono text-xs md:text-sm">"A sound for you ;)"</p>
      </footer>
    </div>
  );
}