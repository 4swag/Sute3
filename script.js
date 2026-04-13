document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const year = new Date().getFullYear();
  footer.innerHTML = `swagbot.dev // old-web spirit, modern polish // ${year}`;
});
