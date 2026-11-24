(function () {
  const $ = (id) => document.getElementById(id);
  const out = $("out"), input = $("q"), btn = $("go");
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  let busy = false;

  // Simple keyword router (stands in for the LLM choosing tools)
  function pick(text) {
    const t = text.toLowerCase();
    if (/dinner|book|restaurant|table/.test(t)) return "dinner";
    if (/money|spend|expense|budget|bank/.test(t)) return "money";
    if (/email|reply|mail|professor/.test(t)) return "email";
    if (/plan|day|study|schedule|calendar/.test(t)) return "day";
    return null;
  }

  function add(cls, html) {
    const d = document.createElement("div");
    d.className = cls;
    d.innerHTML = html;
    out.appendChild(d);
    return d;
  }

  function setBusy(v) { busy = v; btn.disabled = v; }

  async function run(key) {
    if (busy) return;
    const text = input.value.trim();
    if (!text) return;
    key = key || pick(text);
    setBusy(true);
    out.innerHTML = "";
    add("msg u", esc(text));
    await sleep(400);

    if (!key) {
      add("msg a", "I can help with planning your day, booking dinner, reviewing spending, or drafting an email. Try one of the suggestions above.");
      setBusy(false);
      return;
    }

    const s = SCENARIOS[key];
    for (const [server, tool, args, result] of s.steps) {
      add("call", "<b>" + server + "</b>." + tool + "(" + esc(JSON.stringify(args)) + ")<span class='r'>→ " + esc(result) + "</span>");
      await sleep(800);
    }
    add("msg a", esc(s.answer));
    setBusy(false);
  }

  // Suggestion chips
  Object.entries(SCENARIOS).forEach(([key, s]) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = s.label;
    b.onclick = () => { input.value = s.label; run(key); };
    $("chips").appendChild(b);
  });

  btn.onclick = () => run();
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") run(); });
})();
