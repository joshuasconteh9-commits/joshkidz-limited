const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.desktop-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('mobile-open', !isOpen);
  navigation.style.display = !isOpen ? 'flex' : '';
  navigation.style.position = !isOpen ? 'absolute' : '';
  navigation.style.top = !isOpen ? '72px' : '';
  navigation.style.left = !isOpen ? '0' : '';
  navigation.style.right = !isOpen ? '0' : '';
  navigation.style.padding = !isOpen ? '18px 8vw' : '';
  navigation.style.background = !isOpen ? 'var(--cream)' : '';
  navigation.style.borderBottom = !isOpen ? '1px solid var(--line)' : '';
  navigation.style.flexDirection = !isOpen ? 'column' : '';
  navigation.style.gap = !isOpen ? '18px' : '';
  menuButton.textContent = isOpen ? '☰' : '×';
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('mobile-open');
    navigation.style.display = '';
    menuButton.textContent = '☰';
  });
});

const revealItems = document.querySelectorAll('.section, .programme-card, .story-section, .contact-inner');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));
