
// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== CART =====
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (existing) { existing.qty += 1; } else { cart.push({ name, price, qty: 1 }); }
  saveCart(cart);
  updateCartCount();
  showToast(`${name} ajouté au panier !`);
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `position:fixed;bottom:2rem;right:2rem;background:#c9a96e;color:#0e0e0e;
    padding:1rem 1.5rem;font-family:'Jost',sans-serif;font-size:0.85rem;font-weight:500;
    letter-spacing:0.05em;z-index:9999;border-radius:2px;box-shadow:0 4px 20px rgba(0,0,0,0.2)`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 2500);
}

// ===== QUANTITY =====
function changeQty(btn, delta) {
  const row = btn.parentElement;
  const qtyEl = row.querySelector('.qty');
  let qty = parseInt(qtyEl.textContent) + delta;
  if (qty < 1) qty = 1;
  qtyEl.textContent = qty;
}

// ===== FILTERS =====
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    if (cat === 'all') { card.style.display = ''; }
    else { card.style.display = (card.dataset.cat || '').includes(cat) ? '' : 'none'; }
  });
}

// ===== FAQ =====
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
}

// ===== CONTACT FORM =====
function sendMessage() {
  const success = document.getElementById('formSuccess');
  if (success) { success.style.display = 'block'; }
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.padding = window.scrollY > 50 ? '0.8rem 3rem' : '1.2rem 3rem';
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
