const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.desktop-nav');

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

function updateScrollEffects() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 18);
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });
updateScrollEffects();

const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const welcomeStage = document.querySelector('.welcome-stage');
const welcomeCube = document.querySelector('.welcome-cube');
if (motionAllowed && welcomeStage && welcomeCube) {
  welcomeStage.addEventListener('pointermove', (event) => {
    const bounds = welcomeStage.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    welcomeCube.style.transform = `rotateX(${-18 - y * 7}deg) rotateY(${30 + x * 12}deg) translateY(-6px)`;
  });
  welcomeStage.addEventListener('pointerleave', () => { welcomeCube.style.transform = ''; });
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('mobile-open', !isOpen);
  menuButton.textContent = isOpen ? '☰' : '×';
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('mobile-open');
    menuButton.textContent = '☰';
  });
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = 'Copy number'; }, 1800);
    } catch {
      button.textContent = button.dataset.copy;
    }
  });
});

const copyrightYear = document.querySelector('#copyright-year');
if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

const chatMessages = document.querySelector('.chat-messages');
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('#chat-input');

const khadijaReplies = [
  { matches: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'], reply: 'Hello and welcome. I’m Khadija, your JoshKidz guide. Ask me anything about our mission, support, volunteering, or Sierra Leone.' },
  { matches: ['who are you', 'your name', 'khadija'], reply: 'I’m Khadija, the JoshKidz digital guide. I can help you explore our work, learn how to support children, and discover Sierra Leone.' },
  { matches: ['what does', 'joshkidz', 'work', 'programme'], reply: 'JoshKidz creates practical opportunities for children and young people to learn, grow in confidence and connect with mentors in Sierra Leone.' },
  { matches: ['help', 'donate', 'support', 'volunteer'], reply: 'You can support the work through Orange Money on 074038160, volunteer, partner with us, or email joshuasconteh9@gmail.com to start a conversation.' },
  { matches: ['place', 'visit', 'beach', 'chimp', 'sierra leone', 'travel'], reply: 'Start with Tacugama Chimpanzee Sanctuary, Tokeh Beach or the peaceful Banana Islands. Each place offers a different way to meet Sierra Leone.' },
  { matches: ['contact', 'email', 'phone', 'number', 'address'], reply: 'You can reach the JoshKidz team at joshuasconteh9@gmail.com or 074038160. We are rooted in Freetown, Sierra Leone.' },
  { matches: ['story', 'sad', 'sia', 'children'], reply: 'Our story is about the courage of children who keep learning through difficult days. Read Sia’s fictional story above, then help make more welcoming learning spaces possible.' },
  { matches: ['thank', 'thanks'], reply: 'You’re very welcome. Every thoughtful question helps more people find their place in this work.' },
  { matches: ['how are you'], reply: 'I’m here and ready to help. What would you like to discover today?' }
];

function addChatMessage(text, type) {
  const message = document.createElement('div');
  message.className = `chat-message ${type}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getKhadijaReply(text) {
  const normalized = text.toLowerCase();
  const match = khadijaReplies.find((item) => item.matches.some((word) => normalized.includes(word)));
  return match ? match.reply : 'That is a good question. I can help with JoshKidz, programmes, donations, volunteering, contact details, Sierra Leone travel, beaches, chimpanzees, and our stories. For anything personal or urgent, email joshuasconteh9@gmail.com and our team will reply.';
}

function sendToKhadija(text) {
  if (!text || !chatMessages) return;
  addChatMessage(text, 'user');
  window.setTimeout(() => addChatMessage(getKhadijaReply(text), 'assistant'), 350);
}

if (chatForm && chatInput) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = chatInput.value.trim();
    chatInput.value = '';
    sendToKhadija(text);
  });
  document.querySelectorAll('[data-chat-prompt]').forEach((button) => {
    button.addEventListener('click', () => sendToKhadija(button.dataset.chatPrompt));
  });
}

const revealItems = document.querySelectorAll('.section, .programme-card, .story-section, .contact-inner');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));
