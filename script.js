// ===============================
//   SLIDER AUTOMÁTICO
// ===============================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3500); // Cambia cada 3.5 segundos

// ===============================
//   MENÚ RESPONSIVE
// ===============================
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Cerrar menú al hacer click en un enlace (solo móvil)
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});

// ===============================
//   FORMULARIO DE CONTACTO
// ===============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Simulación de envío
    alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto a ${email}.`);
    
    // Limpiar formulario
    contactForm.reset();
  });
}

// ===============================
//   CHAT BOT
// ===============================
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');

// Respuestas del bot
const botResponses = {
  'hola': '¡Hola! ¿En qué puedo ayudarte? Soy el asistente virtual de Paseo Norte.',
  'horarios': 'Paseo Norte abre de lunes a domingos de 10:00 a 22:00 hs.',
  'estacionamiento': 'Contamos con estacionamiento cubierto y descubierto. Las primeras 2 horas son gratis con compras superiores a $5000.',
  'promociones': 'Podés ver todas las promos y beneficios vigentes en la sección "Ofertas" del menú principal.',
  'tiendas': 'En la sección "Locales Comerciales" podés ver el listado de marcas y acceder a sus sitios individuales.',
  'gastronomia': 'Encontrás restaurantes, café, patio de comidas y heladería en la sección "Gastronomía".',
  'contacto': 'Podés escribirnos desde la sección "Contacto" o al email contacto@paseonorte.com.',
  'servicios': 'Ofrecemos estacionamiento, WiFi, actividades y beneficios para toda la familia. Más info en "Servicios".',
  'entretenimientos': 'Tenemos cine, bowling, espacio cultural y área deportiva. Mirá la sección "Entretenimientos" para conocer más.'
};

function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (message.includes(key)) {
      return response;
    }
  }
  
  return 'Gracias por tu consulta. Puedo ayudarte con información sobre horarios, estacionamiento, promociones, tiendas, gastronomía, servicios o entretenimientos. ¿Qué te gustaría saber?';
}

function addMessage(text, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
  messageDiv.innerHTML = `<p>${text}</p>`;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (chatbotToggle) {
  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
  });
}

if (chatbotClose) {
  chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
  });
}

if (chatbotSend && chatbotInput) {
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message) {
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Simular respuesta del bot con delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      addMessage(botResponse, false);
    }, 500);
  }
}

// ===============================
//   MAPA INTERACTIVO
// ===============================
const localMapaElements = document.querySelectorAll('.local-mapa');
const tiendaCards = document.querySelectorAll('.tienda-card');

localMapaElements.forEach(local => {
  local.addEventListener('click', () => {
    const localId = local.getAttribute('data-local');
    const tiendaCard = document.querySelector(`.tienda-card[data-local="${localId}"]`);
    
    if (tiendaCard) {
      tiendaCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      tiendaCard.style.transform = 'scale(1.05)';
      tiendaCard.style.boxShadow = '0 4px 15px rgba(255, 51, 102, 0.5)';
      
      setTimeout(() => {
        tiendaCard.style.transform = '';
        tiendaCard.style.boxShadow = '';
      }, 2000);
    }
  });
});

tiendaCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const localId = card.getAttribute('data-local');
    const localMapa = document.querySelector(`.local-mapa[data-local="${localId}"]`);
    if (localMapa) {
      localMapa.style.background = '#ff1a55';
      localMapa.style.transform = 'scale(1.15)';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    const localId = card.getAttribute('data-local');
    const localMapa = document.querySelector(`.local-mapa[data-local="${localId}"]`);
    if (localMapa) {
      localMapa.style.background = '#ff3366';
      localMapa.style.transform = '';
    }
  });
});