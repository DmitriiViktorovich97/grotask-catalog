<template>
  <footer class="footer">
    <div class="container">
      <div class="line"></div>
    </div>
    <div class="container footer__in">
      <span class="footer__copy">@ Company name 2026</span>
      <AppLogo></AppLogo>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  height: var(--footer-h);
  padding-top: 44px;
  background: var(--c-footer);
  margin-top: 32px;
}

.footer__in {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 48px;
  padding-bottom: 32px;
  text-decoration: none;
}

.line {
  height: 2px;
  background: var(--c-line);
}

.footer__copy {
  font-size: 12px;
  color: #a59aa0;
}

@media (max-width: 768px) {
  .footer {
    padding-top: 20px;
  }

  .footer__in {
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 60px;
  }
}
</style>
