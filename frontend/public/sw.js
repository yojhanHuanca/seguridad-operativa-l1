// Service worker mínimo, solo para notificaciones push — no cachea nada de
// la app (el SPA ya tiene su propio Cache-Control vía nginx en producción
// dockerizada / Vercel), así que no hay riesgo de servir contenido viejo.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  if (!event.data) return;
  let data = {};
  try {
    data = event.data.json();
  } catch {
    data = { title: "SIGMA L1", body: event.data.text() };
  }
  const title = data.title || "SIGMA L1";
  const options = {
    body: data.body || "",
    icon: "/logo-linea1.png",
    badge: "/logo-linea1.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Al tocar la notificación, enfoca una pestaña ya abierta del sitio si hay
// una, o abre una nueva — la app misma decide a dónde mandar según la sesión.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientsArr) => {
      const existente = clientsArr.find((c) => "focus" in c);
      if (existente) return existente.focus();
      return self.clients.openWindow("/");
    })
  );
});
