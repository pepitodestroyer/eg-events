import React, { useState } from 'react';
import { 
  Music, Mic, MonitorPlay, Lightbulb, PartyPopper, HeartHandshake, 
  GlassWater, Users, CheckCircle2, CalendarCheck, MessageCircle, 
  Sparkles, Loader2
} from 'lucide-react';
import './index.css';

export default function App() {
  const whatsappNumber = "584141490509"; 
  const whatsappMessage = encodeURIComponent("¡Hola EG Events! Vi su página web y me gustaría solicitar una cotización para un evento. A sound for you ;)");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const [iaPrompt, setIaPrompt] = useState('');
  const [iaResponse, setIaResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      setIaResponse("Hubo un error al generar la idea. ¡Pero no te preocupes, escríbenos directamente y te asesoramos!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-orange-500 selection:text-white">
      
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-black tracking-tighter text-neutral-900">
                EG<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Events</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-semibold">
              <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
              <a href="#equipos" className="hover:text-orange-500 transition-colors">Equipos</a>
              <a href="#ia-ideas" className="hover:text-orange-500 transition-colors">Inspiración IA</a>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-transparent text-sm font-bold rounded-full text-white bg-green-500 hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/30">
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/90 to-neutral-900"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold text-sm mb-6">
            <Sparkles size={16} /> Respaldados por 16 años de experiencia
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Llevamos el mejor nivel <br className="hidden md:block"/> a tu celebración.
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-neutral-300 font-light max-w-3xl mx-auto italic">
            "A sound for you ;)"
          </p>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto mb-10">
            Sistemas de sonido profesional, iluminación y animación para eventos de cualquier envergadura. Diseño limpio, montaje impecable y acústica perfecta.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-lg font-bold rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 flex items-center justify-center gap-2">
              <MessageCircle size={24} /> Cotizar por WhatsApp
            </a>
            <a href="#servicios" className="px-8 py-4 text-lg font-bold rounded-full text-white border border-neutral-700 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center">
              Ver Servicios
            </a>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Cualquier motivo es bueno para celebrar</h2>
            <p className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto">
              Más de una década y media perfeccionando cada detalle. Desde reuniones íntimas hasta grandes producciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-orange-500/30 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake size={28} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Matrimonios</h3>
              <p className="text-neutral-600">Sonido elegante y animación medida para el día más importante de tu vida. Ceremonia y fiesta cubiertas.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-orange-500/30 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <PartyPopper size={28} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Quinceaños</h3>
              <p className="text-neutral-600">Energía al máximo, iluminación espectacular y los mejores ritmos para una noche inolvidable.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-orange-500/30 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <GlassWater size={28} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Fiestas de Divorcio</h3>
              <p className="text-neutral-600">Cierra un ciclo celebrando un nuevo comienzo. Animación divertida y un ambiente liberador.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-orange-500/30 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Bautizos</h3>
              <p className="text-neutral-600">Música ambiental adecuada, micrófonos para palabras emotivas y un volumen respetuoso para la familia.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-orange-500/30 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <Music size={28} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Celebraciones Generales</h3>
              <p className="text-neutral-600">Cumpleaños, aniversarios o graduaciones. Ponemos el sistema; tú pones las ganas de disfrutar.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-orange-500/30 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Reuniones Corporativas</h3>
              <p className="text-neutral-600">Sistemas de audio nítido para conferencias, presentaciones y fiestas de fin de año de tu empresa.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="equipos" className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                Montajes <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Limpios y Profesionales</span>
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                Cuidamos la estética de tu evento. Nuestros montajes están diseñados para verse tan bien como suenan, sin cables desordenados ni estructuras antiestéticas.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-orange-500">
                    <MonitorPlay size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Pantallas y Visuales</h4>
                    <p className="text-neutral-400">Integración de monitores para visuales reactivos, videos conmemorativos o logotipos del evento.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-orange-500">
                    <Mic size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Sonido de Alta Fidelidad</h4>
                    <p className="text-neutral-400">Torres de sonido potentes configuradas a la perfección para interiores y exteriores.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-orange-500">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Iluminación Inteligente</h4>
                    <p className="text-neutral-400">Paneles LED, focos direccionales y luces rítmicas montadas sobre estructuras seguras.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-tr from-neutral-800 to-neutral-700 rounded-3xl p-8 relative overflow-hidden shadow-2xl border border-neutral-700">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-500/20 blur-[100px] rounded-full"></div>
                <div className="flex flex-col h-full justify-center items-center gap-6 relative z-10">
                   <div className="w-48 h-32 bg-neutral-900 border-2 border-neutral-600 rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
                      <div className="w-16 h-16 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
                   </div>
                   <div className="w-64 h-8 bg-neutral-800 rounded flex items-center justify-between px-2 gap-2 shadow-lg border border-neutral-700">
                      <div className="h-4 flex-1 bg-blue-500/80 rounded-sm animate-pulse"></div>
                      <div className="h-4 flex-1 bg-red-500/80 rounded-sm animate-pulse delay-75"></div>
                      <div className="w-8 h-8 rounded-full bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                      <div className="w-8 h-8 rounded-full bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                      <div className="h-4 flex-1 bg-yellow-500/80 rounded-sm animate-pulse delay-150"></div>
                      <div className="h-4 flex-1 bg-green-500/80 rounded-sm animate-pulse"></div>
                   </div>
                   <div className="flex gap-20">
                     <div className="w-20 h-32 bg-neutral-900 rounded border border-neutral-700 flex flex-col items-center justify-center gap-2 shadow-2xl">
                        <div className="w-12 h-12 rounded-full bg-neutral-800 border-2 border-neutral-700"></div>
                        <div className="w-16 h-16 rounded-full bg-neutral-800 border-2 border-neutral-700"></div>
                     </div>
                     <div className="w-20 h-32 bg-neutral-900 rounded border border-neutral-700 flex flex-col items-center justify-center gap-2 shadow-2xl">
                        <div className="w-12 h-12 rounded-full bg-neutral-800 border-2 border-neutral-700"></div>
                        <div className="w-16 h-16 rounded-full bg-neutral-800 border-2 border-neutral-700"></div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section id="objetivos" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl mb-4">Nuestros Objetivos Claros</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-16">
            No solo ponemos música; creamos atmósferas. Nuestro enfoque está diseñado para darte tranquilidad y resultados superiores.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
              <h4 className="text-xl font-bold mb-2">Garantía Auditiva</h4>
              <p className="text-neutral-600">Volumen e inteligibilidad perfecta. Que la música envuelva la pista de baile sin aturdir a quienes conversan.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
              <h4 className="text-xl font-bold mb-2">Estética Visual</h4>
              <p className="text-neutral-600">Mantener un aspecto limpio en todos nuestros equipos. Los cables ocultos y luces estratégicas son nuestra firma.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
              <h4 className="text-xl font-bold mb-2">Animación a la Medida</h4>
              <p className="text-neutral-600">Animadores y DJs que saben leer el público. Sin excesos, respetando el tono de cada tipo de evento.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ia-ideas" className="py-24 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl mb-4">¿No sabes por dónde empezar?</h2>
          <p className="text-lg text-neutral-600 mb-10">
            Cuéntale a nuestro Asistente de IA qué tipo de evento tienes en mente, y te daremos una idea instantánea de cómo lo ambientaríamos.
          </p>

          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-orange-100">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input 
                type="text" 
                value={iaPrompt}
                onChange={(e) => setIaPrompt(e.target.value)}
                placeholder="Ej: Una fiesta de 15 años temática neón..." 
                className="flex-1 px-6 py-4 rounded-full border border-neutral-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-lg"
              />
              <button 
                onClick={generarIdeaConIA}
                disabled={isLoading || !iaPrompt}
                className="px-8 py-4 bg-neutral-900 text-white font-bold rounded-full hover:bg-orange-500 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[200px]"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Generar Idea"}
              </button>
            </div>
            
            {iaResponse && (
              <div className="mt-6 p-6 bg-orange-50 rounded-2xl text-left border border-orange-200">
                <p className="text-neutral-800 text-lg italic">"{iaResponse}"</p>
                <div className="mt-4 pt-4 border-t border-orange-200 flex items-center justify-between">
                  <span className="text-sm text-neutral-500 font-semibold">¿Te gusta la idea?</span>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold flex items-center gap-1 hover:text-green-700">
                    <MessageCircle size={16} /> Hagámoslo realidad
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-neutral-950 text-white pt-20 pb-10 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900 rounded-3xl p-8 md:p-16 text-center border border-neutral-800 mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">¿Listo para el mejor evento?</h2>
            <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy por WhatsApp. Nuestro equipo, con 16 años de experiencia, te asesorará con la configuración perfecta según el espacio y tus invitados.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-10 py-4 text-xl font-bold rounded-full text-white bg-green-500 hover:bg-green-600 transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-3 mx-auto w-fit">
              <MessageCircle size={28} />
              Escríbenos al WhatsApp
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-neutral-800 pt-8 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black tracking-tighter text-white">
                EG<span className="text-orange-500">Events</span>
              </span>
            </div>
            <p className="text-neutral-500 italic">"A sound for you ;)"</p>
            <div className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} EG Events. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}