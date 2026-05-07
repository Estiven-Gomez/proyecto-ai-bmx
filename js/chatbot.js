const chatbotFab = document.getElementById("chatbotFab");
const chatbotPanel = document.getElementById("chatbotPanel");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");
const chatbotMessages = document.getElementById("chatbotMessages");
const chatbotTyping = document.getElementById("chatbotTyping");

function toggleChat(open) {
  if (!chatbotPanel || !chatbotFab) return;
  const shouldOpen = typeof open === "boolean" ? open : chatbotPanel.hidden;
  chatbotPanel.hidden = !shouldOpen;
  chatbotFab.setAttribute("aria-expanded", String(shouldOpen));
  if (shouldOpen) chatbotInput?.focus();
}

function appendMessage(text, role) {
  if (!chatbotMessages) return;
  const wrap = document.createElement("div");
  wrap.className = `chat-msg chat-msg--${role}`;
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = text;
  wrap.appendChild(bubble);
  chatbotMessages.appendChild(wrap);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBmxReply(message) {
  const text = message.toLowerCase();

  if (text.includes("olimp")) {
    return "La disciplina olimpica es BMX Park, donde se compite en rampas y bowls enlazando trucos con altura y fluidez.";
  }
  if (text.includes("principiante") || text.includes("empezar") || text.includes("primer truco")) {
    return "Para comenzar, practica equilibrio, bunny hop y luego barspin basico. Usa casco y protecciones desde el primer dia.";
  }
  if (text.includes("equipo") || text.includes("casco") || text.includes("proteccion")) {
    return "Equipo esencial: bici BMX 20 pulgadas, casco certificado, rodilleras, coderas, muñequeras y zapatillas de suela plana.";
  }
  if (text.includes("disciplina") || text.includes("park") || text.includes("street") || text.includes("flatland")) {
    return "Disciplinas principales: Park, Street, Flatland, Dirt, Vert y Trails. Si buscas competir, Park es una gran ruta inicial.";
  }
  if (text.includes("cultura") || text.includes("comunidad") || text.includes("musica")) {
    return "La cultura BMX mezcla deporte, estilo y comunidad. Las sesiones en spots locales, la musica y el video son parte central.";
  }
  if (text.includes("truco") || text.includes("tailwhip") || text.includes("flair")) {
    return "Trucos destacados: Barspin (base), Tailwhip (intermedio), Flair (avanzado) y combos elite como Double Barspin Backflip.";
  }

  return "Te puedo ayudar con disciplinas BMX, trucos, equipo basico y cultura. Escribe, por ejemplo: 'que equipo necesito para empezar'.";
}

function sendUserMessage() {
  if (!chatbotInput) return;
  const text = chatbotInput.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  chatbotInput.value = "";
  if (chatbotTyping) chatbotTyping.hidden = false;

  setTimeout(() => {
    const reply = getBmxReply(text);
    if (chatbotTyping) chatbotTyping.hidden = true;
    appendMessage(reply, "bot");
  }, 450);
}

chatbotFab?.addEventListener("click", () => toggleChat());
chatbotClose?.addEventListener("click", () => toggleChat(false));
chatbotSend?.addEventListener("click", sendUserMessage);

chatbotInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendUserMessage();
  }
});

document.querySelectorAll(".suggestion-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const msg = chip.getAttribute("data-msg");
    if (!msg || !chatbotInput) return;
    chatbotInput.value = msg;
    sendUserMessage();
  });
});
