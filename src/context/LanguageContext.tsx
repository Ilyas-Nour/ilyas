import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'es';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', fr: 'Accueil', es: 'Inicio' },
  'nav.about': { en: 'About', fr: 'À propos', es: 'Acerca' },
  'nav.skills': { en: 'Skills', fr: 'Compétences', es: 'Habilidades' },
  'nav.projects': { en: 'Projects', fr: 'Projets', es: 'Proyectos' },
  'nav.contact': { en: 'Contact', fr: 'Contact', es: 'Contacto' },

  // Hero
  'hero.title': { en: 'Web DEVELOPER.', fr: 'DÉVELOPPEUR Web.', es: 'DESARROLLADOR Web.' },
  'hero.subtitle': { 
    en: 'I build FAST and BEAUTIFUL digital experiences.', 
    fr: 'Je conçois des expériences numériques RAPIDES et ÉLÉGANTES.', 
    es: 'Diseño experiencias digitales RÁPIDAS y ELEGANTES.' 
  },
  'hero.work': { en: 'SEE MY WORK //', fr: 'MES RÉALISATIONS //', es: 'VER MIS PROYECTOS //' },
  'hero.contact': { en: 'CONTACT ME.', fr: 'CONTACTEZ-MOI.', es: 'CONTÁCTAME.' },

  // About / Archive
  'about.title': { en: 'About', fr: 'À propos', es: 'Acerca' },
  'about.archive': { en: 'Technical Archive', fr: 'Archive Technique', es: 'Archivo Técnico' },
  'about.bio1': { 
    en: 'I am a software engineer focused on building elegant, scalable, and high-performance web applications.', 
    fr: 'Je suis un ingénieur logiciel passionné par la création d\'applications web élégantes, évolutives et performantes.', 
    es: 'Soy un ingeniero de software enfocado en la creación de aplicaciones web elegantes, escalables y de alto rendimiento.' 
  },
  'about.bio2': { 
    en: 'With expertise in modern frameworks and a deep understanding of user experience, I transform complex ideas into intuitive digital realities.', 
    fr: 'Grâce à mon expertise dans les frameworks modernes et une compréhension approfondie de l\'expérience utilisateur, je transforme des idées complexes en réalités numériques intuitives.', 
    es: 'Con experiencia en frameworks modernos y un profundo conocimiento de la experiencia de usuario, transformo ideas complejas en realidades digitales intuitivas.' 
  },

  // Projects
  'projects.my_work': { en: 'My', fr: 'Mes', es: 'Mis' },
  'projects.work_suffix': { en: 'Work.', fr: 'Projets.', es: 'Trabajos.' },
  'projects.artifact': { en: 'Artifact', fr: 'Artéfact', es: 'Artefacto' },
  'projects.visit': { en: 'Visit Site', fr: 'Voir le Site', es: 'Visitar Sitio' },
  'projects.source': { en: 'Source Code', fr: 'Code Source', es: 'Código Fuente' },
  'projects.explore': { en: 'Explore', fr: 'Explorer', es: 'Explorar' },
  'projects.repo': { en: 'View Repo', fr: 'Voir le Repo', es: 'Ver Repo' },

  // Project Descriptions
  'projects.animy.desc': {
    en: 'Animy is a social-first anime and manga discovery platform designed to connect fans through real-time interaction and personalized tracking. It shifts the focus from simple content browsing to building a community around shared interests.',
    fr: 'Animy est une plateforme sociale de découverte d\'animes et de mangas conçue pour connecter les passionnés grâce à des interactions en temps réel et un suivi personnalisé. Elle met l\'accent sur la création d\'une communauté autour d\'intérêts partagés.',
    es: 'Animy es una plataforma social de descubrimiento de anime y manga diseñada para conectar a los fans mediante la interacción en tiempo real y el seguimiento personalizado. Centra su atención en construir una comunidad en torno a intereses compartidos.'
  },
  'projects.privaflow.desc': {
    en: 'PrivaFlow is a cutting-edge, privacy-focused productivity suite designed for high-performance file manipulation. Leveraging WebAssembly and local-only AI, it empowers users to process media and transform data entirely within the browser.',
    fr: 'PrivaFlow est une suite de productivité de pointe axée sur la confidentialité, conçue pour la manipulation de fichiers haute performance. En utilisant WebAssembly et une IA locale, elle permet de traiter des médias et transformer des données directement dans le navigateur.',
    es: 'PrivaFlow es una suite de productividad de vanguardia centrada en la privacidad, diseñada para la manipulación de archivos de alto rendimiento. Utilizando WebAssembly e IA local, permite procesar archivos multimedia y transformar datos directamente en el navegador.'
  },
  'projects.topnature.desc': {
    en: 'Top Nature is an immersive e-commerce sanctuary for plant enthusiasts, blending minimalist aesthetics with a high-performance shopping experience. It features fluid transitions and a seamless checkout flow.',
    fr: 'Top Nature est un sanctuaire e-commerce immersif pour les passionnés de plantes, alliant esthétique minimaliste et expérience d\'achat haute performance. Il propose des transitions fluides et un processus de paiement transparent.',
    es: 'Top Nature es un santuario de comercio electrónico inmersivo para entusiastas de las plantas, que combina una estética minimalista con una experiencia de compra de alto rendimiento. Cuenta con transiciones fluidas y un proceso de pago sin interrupciones.'
  },

  // Contact
  'contact.title': { en: 'Get in touch', fr: 'Contactez-moi', es: 'Hablemos' },
  'contact.subtitle': { en: 'Ready for a new project?', fr: 'Prêt pour un nouveau projet ?', es: '¿Listo para un nuevo proyecto?' },
  'contact.name': { en: 'Full Name', fr: 'Nom Complet', es: 'Nombre Completo' },
  'contact.email': { en: 'Email Address', fr: 'Adresse Email', es: 'Correo Electrónico' },
  'contact.message': { en: 'Your Message', fr: 'Votre Message', es: 'Tu Mensaje' },
  'contact.send': { en: 'Send Transmission', fr: 'Envoyer la Transmission', es: 'Enviar Transmisión' },
  'contact.sending': { en: 'Transmitting...', fr: 'Transmission...', es: 'Transmitiendo...' },
  'contact.success': { en: 'Transmission Received.', fr: 'Transmission Reçue.', es: 'Transmisión Recibida.' },

  // Footer
  'footer.links': { en: 'Links', fr: 'Liens', es: 'Enlaces' },
  'footer.social': { en: 'Social', fr: 'Réseaux', es: 'Social' },
  'footer.copy': { en: 'All rights reserved.', fr: 'Tous droits réservés.', es: 'Todos los derechos reservados.' },

  // Added for Skills
  'skills.title1': { en: 'Rolling', fr: 'Protocoles', es: 'Protocolos' },
  'skills.title2': { en: 'protocols.', fr: 'de mouvement.', es: 'de movimiento.' },
  'skills.subtitle': { 
    en: 'High-performance tech stack deployment. Verified across full-stack architectures.', 
    fr: 'Déploiement de piles technologiques haute performance. Vérifié sur des architectures full-stack.', 
    es: 'Despliegue de stacks tecnológicos de alto rendimiento. Verificado en arquitecturas full-stack.' 
  },
  'skills.bg1': { en: 'Kinetic', fr: 'Cinétique', es: 'Cinético' },
  'skills.bg2': { en: 'Archive', fr: 'Archive', es: 'Archivo' },

  // Added for contact refinement
  'contact.title1': { en: 'Get in', fr: 'Entrer en', es: 'Ponte en' },
  'contact.title2': { en: 'Touch.', fr: 'Contact.', es: 'Contacto.' },
  'contact.name_label': { en: 'Your Name', fr: 'Votre Nom', es: 'Tu Nombre' },
  'contact.email_label': { en: 'Email Address', fr: 'Adresse Email', es: 'Correo Electrónico' },
  'contact.message_label': { en: 'Your Message', fr: 'Votre Message', es: 'Tu Mensaje' },
  'contact.name_placeholder': { en: 'Ilyas Nour', fr: 'Ilyas Nour', es: 'Ilyas Nour' },
  'contact.email_placeholder': { en: 'hello@studio.com', fr: 'bonjour@studio.fr', es: 'hola@studio.es' },
  'contact.message_placeholder': { en: 'Tell me about your vision...', fr: 'Parlez-moi de votre vision...', es: 'Cuéntame tu visión...' },
  'contact.location': { en: 'Based Globally.', fr: 'Basé Mondialement.', es: 'Basado Globalmente.' },
  'contact.working': { en: 'Working Remotely.', fr: 'Travail à Distance.', es: 'Trabajo Remoto.' },
  'contact.failed': { en: 'Submission Failed. Try again?', fr: 'Échec de l\'envoi. Réessayer ?', es: 'Error en el envío. ¿Reintentar?' },
  'contact.thanks': { en: 'Received. Thanks.', fr: 'Reçu. Merci.', es: 'Recibido. Gracias.' },
  'contact.send_btn': { en: 'Send Message', fr: 'Envoyer le Message', es: 'Enviar Mensaje' },
  'contact.sending_btn': { en: 'Sending...', fr: 'Envoi...', es: 'Enviando...' },
  'contact.sent_btn': { en: 'Sent', fr: 'Envoyé', es: 'Enviado' },

  // Added for Footer
  'footer.index': { en: 'Index', fr: 'Index', es: 'Índice' },
  'footer.designed': { en: 'Designed & Developed', fr: 'Conçu et Développé', es: 'Diseñado y Desarrollado' },
  'footer.by': { en: 'by', fr: 'par', es: 'por' },

  // Added for About Section (KineticBlueprint)
  'about.title1': { en: 'About', fr: 'À Propos', es: 'Sobre' },
  'about.title2': { en: 'Me.', fr: 'de Moi.', es: 'Mí.' },
  'about.bio': { 
    en: "I am Ilyas Nour, a digital architect from Morocco and a student at OFPPT. My work is defined by the fusion of high-performance logic and aesthetic precision. Through projects like Animy and PrivaFlow, I bridge the gap between complex data and elegant design. Every line of code is a step toward the 'Masterwork' standard—merging speed, stability, and artistic soul.", 
    fr: "Je suis Ilyas Nour, un architecte numérique du Maroc et étudiant à l'OFPPT. Mon travail est défini par la fusion de la logique haute performance et de la précision esthétique. À travers des projets comme Animy et PrivaFlow, je comble le fossé entre les données complexes et le design élégant. Chaque ligne de code est une étape vers le standard 'Masterwork'—fusionnant vitesse, stabilité et âme artistique.", 
    es: "Soy Ilyas Nour, un arquitecto digital de Marruecos y estudiante de OFPPT. Mi trabajo se define por la fusión de la lógica de alto rendimiento y la precisión estética. A través de proyectos como Animy y PrivaFlow, cierro la brecha entre los datos complejos y el diseño elegante. Cada línea de código es un paso hacia el estándar 'Masterwork', fusionando velocidad, estabilidad y alma artística." 
  },
  'about.important': {
    en: "Ilyas,Nour,Morocco,OFPPT,Animy,PrivaFlow,Masterwork",
    fr: "Ilyas,Nour,Maroc,OFPPT,Animy,PrivaFlow,Masterwork",
    es: "Ilyas,Nour,Marruecos,OFPPT,Animy,PrivaFlow,Masterwork"
  },
  'about.hud1': { en: 'System Stability: Optimized', fr: 'Stabilité Système : Optimisée', es: 'Estabilidad del Sistema: Optimizada' },
  'about.hud2': { en: 'Narrative State: Synchronized', fr: 'État Narratif : Synchronisé', es: 'Estado Narrativo: Sincronizado' },
  'about.hud3': { en: 'Status: Masterwork_V4', fr: 'Statut : Masterwork_V4', es: 'Estado: Masterwork_V4' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language') as Language;
    if (saved && ['en', 'fr', 'es'].includes(saved)) return saved;
    
    // Automatic detection
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'fr', 'es'].includes(browserLang)) return browserLang as Language;
    
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
    document.documentElement.setAttribute('lang', lang);
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
