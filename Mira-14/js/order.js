/**
 * Delicious Taste by Mirany — WhatsApp Ordering
 */

const WHATSAPP_NUMBER = '23273581551';

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function orderProduct(productName) {
  openWhatsApp(`Hi! I'd like to order: ${productName} from Delicious Taste by Mirany.`);
}

document.addEventListener('DOMContentLoaded', () => {
  // Product card order buttons
  document.querySelectorAll('[data-order-product]').forEach((btn) => {
    btn.addEventListener('click', () => {
      orderProduct(btn.dataset.orderProduct);
    });
  });

  // WhatsApp CTA buttons
  document.querySelectorAll('[data-whatsapp]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const message = btn.dataset.whatsapp || 'Hi! I would like to place an order from Delicious Taste by Mirany.';
      openWhatsApp(message);
    });
  });

  // Contact form
  const form = document.getElementById('order-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#customer-name');
    const phone = form.querySelector('#customer-phone');
    const product = form.querySelector('#product-select');
    const quantity = form.querySelector('#quantity');
    const message = form.querySelector('#message');
    let valid = true;

    [name, phone, product, quantity].forEach((field) => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('invalid');
        valid = false;
      } else {
        group.classList.remove('invalid');
      }
    });

    if (!valid) return;

    const orderMessage = [
      'Hello! I would like to place an order:',
      '',
      `Name: ${name.value.trim()}`,
      `Phone: ${phone.value.trim()}`,
      `Product: ${product.value}`,
      `Quantity: ${quantity.value.trim()}`,
      message.value.trim() ? `Special Request: ${message.value.trim()}` : '',
      '',
      'Sent from Delicious Taste by Mirany website.'
    ].filter(Boolean).join('\n');

    openWhatsApp(orderMessage);
  });

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      field.closest('.form-group').classList.remove('invalid');
    });
  });
});
