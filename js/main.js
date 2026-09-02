/* Avendaño & Asociados — interacciones */
(function () {
  "use strict";

  var doc = document;

  /* --- año dinámico en el pie --- */
  var yearEl = doc.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- sombra/borde del header al hacer scroll --- */
  var header = doc.querySelector("[data-header]");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 8) header.setAttribute("data-scrolled", "");
    else header.removeAttribute("data-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- menú móvil --- */
  var toggle = doc.querySelector("[data-toggle]");
  var menu = doc.querySelector("[data-mobile]");
  if (toggle && menu) {
    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      menu.removeAttribute("data-open");
      menu.hidden = true;
    };
    var openMenu = function () {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
      menu.hidden = false;
      menu.setAttribute("data-open", "");
    };
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* --- reveal al entrar en viewport --- */
  var reveals = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* --- fallback de fotos del equipo (si no cargan, muestra iniciales) --- */
  doc.querySelectorAll("img.avatar").forEach(function (img) {
    img.addEventListener("error", function () {
      var span = doc.createElement("span");
      span.className = "avatar";
      span.setAttribute("aria-hidden", "true");
      if (img.dataset.initials) span.setAttribute("data-initials", img.dataset.initials);
      img.replaceWith(span);
    });
  });

  /* --- chat simulado (estilo Zendesk) --- */
  var zchat = doc.querySelector("[data-zchat]");
  if (zchat) {
    var panel = zchat.querySelector("[data-zchat-panel]");
    var log = zchat.querySelector("[data-zchat-log]");
    var chatForm = zchat.querySelector("[data-zchat-form]");
    var input = chatForm.querySelector("input");
    var quick = zchat.querySelector("[data-zchat-quick]");
    var badge = zchat.querySelector("[data-zchat-badge]");
    var opened = false;

    var now = function () {
      return new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
    };

    var scrollDown = function () { log.scrollTop = log.scrollHeight; };

    var addMsg = function (text, who) {
      var el = doc.createElement("div");
      el.className = "zmsg zmsg-" + who;
      el.innerHTML = String(text).replace(/</g, "&lt;") + '<span class="zmsg-time">' + now() + "</span>";
      log.appendChild(el);
      scrollDown();
    };

    var typing = function () {
      var t = doc.createElement("div");
      t.className = "ztyping";
      t.innerHTML = "<span></span><span></span><span></span>";
      log.appendChild(t);
      scrollDown();
      return t;
    };

    /* respuesta automática según palabras clave */
    var reply = function (msg) {
      var m = msg.toLowerCase();
      if (/(agend|consulta|cita|reun)/.test(m))
        return "Con gusto agendamos su consulta. ¿Qué día y horario le acomoda esta semana? Déjeme también su nombre y un teléfono para confirmarle.";
      if (/(cobr|precio|cuánto|cuanto|costo|honorari|tarifa)/.test(m))
        return "La primera cita es de valoración. Los honorarios dependen de la materia y la complejidad del asunto, y se los entregamos por escrito antes de iniciar, sin sorpresas.";
      if (/(ubica|direcc|dónde|donde|oficina|llegar|mapa)/.test(m))
        return "Estamos en el World Trade Center, Montecito 38, Col. Nápoles, CDMX. Tiene el mapa justo arriba de este chat. ¿Le ayudo con algo más?";
      if (/(penal|delito|deten|carpeta|ministerio)/.test(m))
        return "En materia penal atendemos desde la detención y las audiencias iniciales hasta el juicio oral. ¿Nos cuenta brevemente qué está pasando?";
      if (/(amparo|suspensión|suspension)/.test(m))
        return "Llevamos amparo directo e indirecto y la suspensión del acto reclamado. ¿Contra qué acto o resolución busca ampararse?";
      if (/(divorc|custodia|pensión|pension|aliment|familiar)/.test(m))
        return "En derecho familiar vemos divorcio, custodia, alimentos y sucesiones. ¿Nos comparte un poco de su situación para orientarle?";
      if (/(laboral|despido|trabajo|reinstal|finiquito)/.test(m))
        return "En laboral representamos al trabajador y al patrón ante los Tribunales Laborales. ¿Se trata de un despido, prestaciones o un convenio?";
      if (/(mercantil|cobro|adeud|contrato|pagaré|pagare|deuda)/.test(m))
        return "En mercantil llevamos cobro de adeudos, títulos de crédito y juicios ejecutivos. ¿De qué monto y tipo de documento hablamos?";
      if (/(hola|buenas|buenos|qué tal|que tal|saludos)/.test(m))
        return "¡Hola! Con gusto le ayudamos. ¿En qué materia es su asunto: penal, amparo, familiar, mercantil, civil o laboral?";
      if (/(gracias|muchas gracias|ok|vale)/.test(m))
        return "Con gusto. Si nos deja su nombre y un teléfono, un abogado del área le contacta hoy mismo para dar seguimiento.";
      return "Gracias por su mensaje. Un abogado del área revisará su caso y continuará esta conversación en breve. ¿Me comparte su nombre y un teléfono de contacto?";
    };

    var botSay = function (text, delay) {
      var t = typing();
      setTimeout(function () {
        t.remove();
        addMsg(text, "bot");
      }, delay || 900);
    };

    var seeded = false;
    var seed = function () {
      if (seeded) return;
      seeded = true;
      botSay("Hola, le saluda el equipo de Avendaño & Asociados. ¿En qué podemos ayudarle hoy?", 600);
    };

    var openChat = function () {
      zchat.setAttribute("data-open", "");
      panel.hidden = false;
      zchat.querySelectorAll("[data-zchat-open]").forEach(function (b) { b.setAttribute("aria-expanded", "true"); });
      if (badge) badge.style.display = "none";
      opened = true;
      seed();
      setTimeout(function () { input.focus(); }, 60);
    };
    var closeChat = function () {
      zchat.removeAttribute("data-open");
      panel.hidden = true;
      zchat.querySelectorAll("[data-zchat-open]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    };

    doc.querySelectorAll("[data-zchat-open]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (opened && zchat.hasAttribute("data-open")) closeChat();
        else openChat();
      });
    });
    var closeBtn = zchat.querySelector("[data-zchat-close]");
    if (closeBtn) closeBtn.addEventListener("click", closeChat);
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && zchat.hasAttribute("data-open")) closeChat();
    });

    var send = function (text) {
      text = String(text).trim();
      if (!text) return;
      addMsg(text, "user");
      botSay(reply(text), 700 + Math.min(text.length * 20, 1200));
    };

    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      send(input.value);
      input.value = "";
    });
    if (quick) {
      quick.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-msg]");
        if (b) send(b.getAttribute("data-msg"));
      });
    }
  }
})();
