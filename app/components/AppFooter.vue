<template>
  <footer class="footer">
    <div class="container footer__in">
      <span class="footer__copy">Все права защищены 2026</span>
      <div class="logo">
        <span class="logo__flag" aria-hidden="true" />
        <span class="logo__text">
          <small>Интернет-магазин</small>
          <b>ГРОТЕСК</b>
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { height: var(--footer-h); background: var(--c-footer); margin-top: 32px; }
.footer__in { height: 100%; display: flex; align-items: flex-end; justify-content: space-between; padding-bottom: 32px; }
.footer__copy { font-size: 12px; color: #a59aa0; }
.logo { display: flex; align-items: center; gap: 6px; }
.logo__flag {
  width: 22px; height: 22px; border-radius: 50%;
  background: linear-gradient(#fff 0 33%, #1c4fd8 33% 66%, #e5223b 66%);
}
.logo__text { display: flex; flex-direction: column; line-height: 1; gap: 1px; }
.logo__text small { font-size: 7px; color: #7b6f75; }
.logo__text b { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
</style>
