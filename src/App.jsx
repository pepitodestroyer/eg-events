import React, { useState, useEffect } from 'react';
import { 
  PartyPopper, HeartHandshake, Zap, GlassWater, Users, 
  CalendarCheck, MessageCircle, Sparkles, Loader2, 
  ChevronRight, X, Speaker, Projector, ShieldCheck, Award, Lightbulb
} from 'lucide-react';
import './index.css';
import miLogo from './logo.png';

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
    fullDesc: 'Musicalización elegante para la ceremonia y potencia desbordante para la celebración. Ofrecemos micrófonos inalámbricos para los discursos, iluminación arquitectónica para el salón, y una mezcla de DJ que mantendrá a todas las generaciones bailando.',
  },
  {
    id: 'corporativos',
    title: 'Eventos Corporativos',
    icon: <Projector size={32} />,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
    shortDesc: 'Proyectando la mejor imagen de su empresa.',
    fullDesc: 'Soluciones audiovisuales integrales para conferencias, lanzamientos de marca y fiestas de fin de año. Pantallas, sonido nítido para los ponentes y soporte técnico en tiempo real para que su evento corporativo fluya sin contratiempos.',
  },
  {
    id: 'infantiles',
    title: 'Fiestas Infantiles',
    icon: <Sparkles size={32} />,
    image: 'https://images.unsplash.com/photo-1530103862676-de8892bf96f5?auto=format&fit=crop&q=80',
    shortDesc: 'Diversión y energía al máximo nivel.',
    fullDesc: 'Animación interactiva, sonido adaptado para los más pequeños, máquina de burbujas, luces de colores y un repertorio musical sano y divertido que hará que los niños no paren de saltar.',
  },
  {
    id: 'graduaciones',
    title: 'Fiestas de Graduación 2026',
    icon: <Award size={32} />,
    image: 'https://images.unsplash.com/photo-1523580494112-071fd6611667?auto=format&fit=crop&q=80',
    shortDesc: 'El cierre de etapa más legendario de Maracay.',
    fullDesc: 'Paquetes Prom Elite diseñados para promociones escolares y universitarias. Incluye estructuras Truss completas, pantallas LED 4K, show de luces inteligentes y animación crossover interactiva. Una producción de alto impacto para celebrar tu logro.',
  }
];

export default function App() {
  const [activeService, setActiveService] = useState(null);
  const [iaPrompt, setIaPrompt] = useState('');
  const [iaResponse, setIaResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const miNumero = "+584141490509"; 

  const getWaLink = (textoPersonalizado) => {
    const mensaje = encodeURIComponent(textoPersonalizado);
    return `https://wa.me/${miNumero}?text=${mensaje}`;
  };

  const handleCotizarIA = () => {
    if(!iaPrompt.trim()) return;
    setIsGenerating(true);
    setIaResponse('');
    
    setTimeout(() => {
      setIaResponse(`¡Suena como un evento increíble! Para un evento de estilo "${iaPrompt}", te recomiendo una combinación de iluminación cálida al inicio, y un set de luces robóticas para cuando empiece la fiesta. ¡Dale al botón verde de abajo para que agendemos la fecha y te pase el presupuesto exacto al WhatsApp!`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200 selection:bg-orange-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={miLogo} alt="EG Events" className="h-10 w-auto" />
            <span className="text-2xl font-black tracking-tight text-white">EG<span className="text-orange-500">EVENTS</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-sm font-semibold uppercase tracking-widest hover:text-orange-500 transition-colors">Servicios</a>
            <a href="#ia-quote" className="text-sm font-semibold uppercase tracking-widest hover:text-orange-500 transition-colors">Cotización IA</a>
            <a href={getWaLink("Hola Jesús, me gustaría consultar disponibilidad para un evento.")} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105">
              WhatsApp Directo
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-950/70 z-10"></div>
          <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover object-center" />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold text-xs uppercase tracking-widest mb-6">
              <Zap size={14} /> Producción Audiovisual Élite
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              HACEMOS QUE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">TU EVENTO</span> <br />
              SUENE INCREÍBLE.
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed font-light">
              Más que sonido e iluminación. Diseñamos atmósferas envolventes y experiencias acústicas impecables en Maracay y todo el estado Aragua.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={getWaLink("Hola Jesús! Vengo de tu página web, quiero cotizar un evento.")} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-orange-500 text-white font-bold uppercase tracking-widest text-sm rounded flex items-center gap-2 hover:bg-orange-600 transition-all hover:pr-6 group">
                Cotizar mi Evento <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center text-orange-500 mb-2">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-white">Confiabilidad Absoluta</h3>
              <p className="text-neutral-400 leading-relaxed">Equipos de respaldo, puntualidad estricta y un equipo técnico preparado para cualquier eventualidad. Tu tranquilidad es primero.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center text-orange-500 mb-2">
                <Speaker size={28} />
              </div>
              <h3 className="text-xl font-bold text-white">Equipos de Alta Gama</h3>
              <p className="text-neutral-400 leading-relaxed">No escatimamos en calidad. Trabajamos con marcas líderes en la industria para garantizar que cada nota y cada luz sea perfecta.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center text-orange-500 mb-2">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-white">Atención Personalizada</h3>
              <p className="text-neutral-400 leading-relaxed">Entendemos que cada evento es único. Jesús y todo el equipo te asesorarán desde el día uno hasta que el último invitado se vaya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- INSERCIÓN: CERTIFICACIÓN JBL --- */}
      <section className="py-12 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-neutral-950 to-neutral-900 border-l-4 border-orange-500 p-8 md:p-10 rounded-r-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="bg-orange-500 p-4 rounded-full text-black flex-shrink-0 shadow-[0_0_30px_rgba(249,115,22,0.2)] z-10">
              <Speaker size={40} />
            </div>
            <div className="text-center md:text-left z-10">
              <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2 italic">
                Estándar <span className="text-orange-500">JBL Professional</span>
              </h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-3xl font-light">
                No solo es música, es una experiencia acústica inmersiva. Todos nuestros despliegues están potenciados por sistemas activos de alta fidelidad <strong>JBL Audio</strong>, garantizando presión sonora cristalina y bajos profundos para cualquier recinto en Maracay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 bg-neutral-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Nuestros <span className="text-orange-500">Servicios</span></h2>
            <div className="w-20 h-1 bg-orange-500"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviciosData.map((servicio) => (
              <div 
                key={servicio.id}
                onClick={() => setActiveService(servicio)}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent transition-opacity group-hover:opacity-80"></div>
                <img 
                  src={servicio.image} 
                  alt={servicio.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end transform transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    {servicio.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{servicio.title}</h3>
                  <p className="text-neutral-300 text-sm">{servicio.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DE DETALLE DE SERVICIO */}
      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-neutral-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-neutral-900 rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative">
            <button 
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-orange-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="md:w-2/5 h-64 md:h-auto relative">
              <img src={activeService.image} alt={activeService.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-orange-500 mb-4">{activeService.icon}</div>
              <h3 className="text-3xl font-black text-white mb-4">{activeService.title}</h3>
              <p className="text-neutral-400 leading-relaxed mb-8 text-lg">
                {activeService.fullDesc}
              </p>
              <a 
                href={getWaLink(`Hola Jesús, me gustaría recibir una cotización detallada para un evento de tipo: ${activeService.title}`)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded hover:bg-orange-500 hover:text-white transition-colors"
              >
                Solicitar Cotización <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN IA - ASISTENTE DE COTIZACIÓN RÁPIDA */}
      <section id="ia-quote" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lightbulb size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-950 tracking-tight mb-6">
            ¿No sabes por dónde empezar? <br />
            <span className="text-orange-500">Nuestra IA te asesora.</span>
          </h2>
          <p className="text-neutral-600 text-lg mb-12">
            Cuéntanos brevemente cómo te imaginas tu evento (ej. "Una boda para 100 personas de noche con música de los 80s") y nuestro asistente te dará una recomendación instantánea del montaje ideal.
          </p>

          <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-2 md:p-4 border border-neutral-100">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={iaPrompt}
                onChange={(e) => setIaPrompt(e.target.value)}
                placeholder="Ej: Una fiesta de 15 años temática neón en salón cerrado..."
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-4 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-lg"
              />
              <button 
                onClick={handleCotizarIA}
                disabled={isGenerating || !iaPrompt.trim()}
                className="px-8 py-4 bg-neutral-950 text-white font-bold rounded-2xl hover:bg-orange-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-w-[200px]"
              >
                {isGenerating ? (
                  <><Loader2 size={20} className="animate-spin" /> Analizando...</>
                ) : (
                  <><Sparkles size={20} /> Generar Idea</>
                )}
              </button>
            </div>
            
            <div className={`transition-all duration-500 overflow-hidden ${iaResponse ? 'max-h-[600px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
              <div className="p-8 md:p-10 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl text-left border border-orange-200 shadow-inner">
                <p className="text-neutral-800 text-xl font-medium italic leading-relaxed">"{iaResponse}"</p>
                <div className="mt-8 pt-6 border-t border-orange-200 flex justify-end">
                  <a href={getWaLink(`Producción sugerida por la IA para: ${iaPrompt}`)} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform">
                    <MessageCircle size={20} /> Cotizar esta idea al WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 py-16 text-center text-neutral-500 border-t border-neutral-800">
        <img src={miLogo} alt="EG Events" className="h-12 w-auto mx-auto grayscale opacity-30 mb-8 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
        <p className="font-semibold tracking-widest uppercase text-sm mb-2 text-neutral-400">EG Events Production</p>
        <p className="text-xs mb-8">Maracay, Aragua - Venezuela.</p>
        <div className="flex justify-center gap-6">
          {/* Aquí puedes agregar links a Instagram, Facebook, etc. */}
        </div>
      </footer>
    </div>
  );
}