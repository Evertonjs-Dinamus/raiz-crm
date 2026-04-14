import { useState, useRef } from "react";

const C = {
  fundo: "#0a0f0a",
  card: "#111811",
  elevado: "#1a221a",
  borda: "#1f2e1f",
  bordaClara: "#2a3e2a",
  verde: "#2ecc71",
  verdeEscuro: "#1a7a42",
  verdeApagado: "#1a2e1a",
  terra: "#c8873a",
  terraApagado: "#2e1e0a",
  amarelo: "#f5c518",
  amareloApagado: "#2a2000",
  vermelho: "#e05252",
  vermelhoApagado: "#2a0a0a",
  azul: "#4a9eff",
  azulApagado: "#0a1a2e",
  texto: "#e8f0e8",
  textoSuave: "#6a8a6a",
  textoMedio: "#9ab09a",
};

// ── DADOS SIMULADOS ──────────────────────────────────────────
const clientes = [
  {
    id: 1,
    nome: "João da Silva",
    fazenda: "Fazenda Boa Vista",
    cidade: "Uberaba, MG",
    culturas: ["Soja", "Milho"],
    hectares: 320,
    telefone: "(34) 99812-4455",
    status: "em_negociacao",
    ultimaVisita: "3 dias atrás",
    propostaAberta: 4200,
    totalAnual: 18000,
    alerta: "45 dias sem contato. Costuma comprar em março.",
    pessoal: {
      familia: "Casado com Ana. Dois filhos: Lucas (8 anos) e Mariana (12 anos).",
      aniversarios: [
        { quem: "João", data: "10/11" },
        { quem: "Lucas (filho)", data: "15/04" },
        { quem: "Mariana (filha)", data: "23/08" },
      ],
      preferencias: "Toma café preto. Torcedor do Atlético-MG. Gosta de conversar sobre pecuária.",
      notas: "Filho Lucas vai fazer exame médico semana que vem. Calça número 42.",
    },
    historico: [
      { data: "15/03/2025", tipo: "Visita", desc: "Soja V6, nematoides, recomendou Presence 1L/ha. Aguardando decisão.", status: "em_negociacao" },
      { data: "28/02/2025", tipo: "Compra", desc: "Rizomais 50L + BioVida 20kg. Total R$6.800.", status: "fechado" },
      { data: "10/02/2025", tipo: "Visita", desc: "Levantamento safra 25/26. Interesse em biofungicidas.", status: "visitado" },
    ],
  },
  {
    id: 2,
    nome: "Maria Aparecida",
    fazenda: "Sítio São Bento",
    cidade: "Patos de Minas, MG",
    culturas: ["Feijão", "Milho"],
    hectares: 85,
    telefone: "(34) 98723-1190",
    status: "proposta_enviada",
    ultimaVisita: "Ontem",
    propostaAberta: 1800,
    totalAnual: 7500,
    alerta: null,
    pessoal: {
      familia: "Viúva. Uma filha: Camila (22 anos, estuda agronomia).",
      aniversarios: [
        { quem: "Maria", data: "03/06" },
        { quem: "Camila (filha)", data: "17/09" },
      ],
      preferencias: "Muito religiosa. Prefere visitas pela manhã. Gosta de novidades em orgânicos.",
      notas: "Filha Camila volta da faculdade em dezembro. Pode ser parceira futura.",
    },
    historico: [
      { data: "12/03/2025", tipo: "Visita", desc: "Feijão em desenvolvimento. Proposta Rizomais enviada.", status: "proposta_enviada" },
      { data: "15/01/2025", tipo: "Compra", desc: "BioStarter 10kg. Total R$1.200.", status: "fechado" },
    ],
  },
  {
    id: 3,
    nome: "Carlos Eduardo",
    fazenda: "Fazenda Santa Fé",
    cidade: "Araxá, MG",
    culturas: ["Soja", "Café"],
    hectares: 510,
    telefone: "(34) 99101-8823",
    status: "visitado",
    ultimaVisita: "1 semana atrás",
    propostaAberta: null,
    totalAnual: 32000,
    alerta: "Safra de café se aproxima. Histórico de compra em abril.",
    pessoal: {
      familia: "Casado com Rita. Três filhos adultos que trabalham na fazenda.",
      aniversarios: [
        { quem: "Carlos", data: "22/07" },
        { quem: "Rita (esposa)", data: "08/03" },
      ],
      preferencias: "Muito técnico, gosta de dados e resultados comprovados. Prefere WhatsApp pra combinar visita.",
      notas: "Está avaliando ampliar área de café em 80ha. Grande oportunidade.",
    },
    historico: [
      { data: "08/03/2025", tipo: "Visita", desc: "Levantamento necessidades café. Safra se aproxima.", status: "visitado" },
      { data: "10/11/2024", tipo: "Compra", desc: "Pacote completo biológico safra. Total R$14.500.", status: "fechado" },
    ],
  },
  {
    id: 4,
    nome: "Roberto Mendes",
    fazenda: "Agropecuária Mendes",
    cidade: "Coromandel, MG",
    culturas: ["Soja"],
    hectares: 720,
    telefone: "(34) 99445-6672",
    status: "em_negociacao",
    ultimaVisita: "2 semanas atrás",
    propostaAberta: 9600,
    totalAnual: 44000,
    alerta: "Proposta de R$9.600 vence em 3 dias.",
    pessoal: {
      familia: "Casado com Fátima. Filho Pedro (19 anos) começa a ajudar na fazenda.",
      aniversarios: [
        { quem: "Roberto", data: "14/02" },
        { quem: "Pedro (filho)", data: "30/10" },
      ],
      preferencias: "Decisivo, gosta de negociar. Joga na Association local aos sábados.",
      notas: "Pedro vai assumir parte da gestão — cultivar relacionamento com ele também.",
    },
    historico: [
      { data: "01/03/2025", tipo: "Visita", desc: "Proposta pacote soja R$9.600 enviada. Negociando.", status: "em_negociacao" },
      { data: "05/02/2025", tipo: "Compra", desc: "Rizomais + Presence safra anterior. Total R$11.200.", status: "fechado" },
    ],
  },
];

const alertas = [
  { id: 1, tipo: "proposta", cliente: "Roberto Mendes", msg: "Proposta R$9.600 vence em 3 dias", urgente: true },
  { id: 2, tipo: "contato", cliente: "João da Silva", msg: "45 dias sem contato — costuma comprar em março", urgente: true },
  { id: 3, tipo: "safra", cliente: "Carlos Eduardo", msg: "Safra de café se aproxima — histórico abril", urgente: false },
  { id: 4, tipo: "aniversario", cliente: "Lucas (filho do João)", msg: "Aniversário em 3 dias — 15/04", urgente: false },
];

const statusCfg = {
  visitado: { label: "Visitado", cor: C.textoSuave, bg: C.elevado },
  proposta_enviada: { label: "Proposta Enviada", cor: C.azul, bg: C.azulApagado },
  em_negociacao: { label: "Em Negociação", cor: C.amarelo, bg: C.amareloApagado },
  fechado: { label: "Fechado", cor: C.verde, bg: C.verdeApagado },
};

// ── COMPONENTES BASE ─────────────────────────────────────────
function Badge({ status, small }) {
  const s = statusCfg[status] || { label: status, cor: C.textoSuave, bg: C.elevado };
  return (
    <span style={{
      background: s.bg, color: s.cor,
      border: `1px solid ${s.cor}44`,
      borderRadius: 6, padding: small ? "2px 7px" : "3px 10px",
      fontSize: small ? 10 : 11, fontWeight: 700, letterSpacing: 0.3,
    }}>{s.label}</span>
  );
}

function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: C.card, borderRadius: 16,
      border: `1px solid ${C.borda}`, padding: 16,
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.15s", ...style,
    }}>{children}</div>
  );
}

function Secao({ titulo, children, style = {} }) {
  return (
    <div style={{ marginBottom: 20, ...style }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: C.textoSuave, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, paddingLeft: 2 }}>
        {titulo}
      </div>
      {children}
    </div>
  );
}

// ── GRAVADOR DE ÁUDIO ────────────────────────────────────────
function GravadorAudio({ onTranscricao, compact }) {
  const [estado, setEstado] = useState("idle");
  const [tempo, setTempo] = useState(0);
  const [ondas, setOndas] = useState(Array(16).fill(4));
  const [transcricao, setTranscricao] = useState("");
  const ref = useRef(null);

  const exemplos = [
    "Visitei João da Silva na Fazenda Boa Vista. Soja no estágio V6, relatou problema de nematoides no talhão três. Recomendei Presence na dose de um litro por hectare. Ficou interessado, vai me ligar até sexta.",
    "Maria Aparecida confirmou o pedido de Rizomais, cinquenta litros. Quer entrega quinta-feira direto na fazenda.",
    "Carlos Eduardo quer ampliar área de café em oitenta hectares. Grande oportunidade pra fechar pacote completo em abril.",
  ];

  const iniciar = () => {
    setEstado("gravando"); setTempo(0);
    ref.current = setInterval(() => {
      setTempo(t => t + 1);
      setOndas(Array(16).fill(0).map(() => Math.random() * 24 + 4));
    }, 200);
  };

  const parar = () => {
    clearInterval(ref.current);
    setEstado("processando");
    setOndas(Array(16).fill(4));
    setTimeout(() => {
      const t = exemplos[Math.floor(Math.random() * exemplos.length)];
      setTranscricao(t); setEstado("concluido"); onTranscricao(t);
    }, 2000);
  };

  const resetar = () => { setEstado("idle"); setTempo(0); setTranscricao(""); onTranscricao(""); };
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (compact && estado === "idle") {
    return (
      <button onClick={iniciar} style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 16px", borderRadius: 12,
        background: C.vermelhoApagado, border: `1px solid ${C.vermelho}44`,
        color: C.vermelho, fontSize: 13, fontWeight: 700, cursor: "pointer",
        width: "100%", justifyContent: "center",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
          <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Gravar por voz
      </button>
    );
  }

  return (
    <div style={{ borderRadius: 14, border: `2px solid ${estado === "gravando" ? C.vermelho : estado === "concluido" ? C.verde : C.borda}`, background: C.elevado, padding: 20, transition: "border-color 0.3s", textAlign: "center" }}>
      {estado === "idle" && (
        <>
          <div style={{ fontSize: 12, color: C.textoSuave, marginBottom: 20 }}>Pressione e fale o que aconteceu na visita</div>
          <button onClick={iniciar} style={{ width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${C.vermelho}, #a02020)`, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: `0 0 0 10px ${C.vermelho}15, 0 0 0 20px ${C.vermelho}08` }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" />
              <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div style={{ fontSize: 11, color: C.textoSuave, fontWeight: 700, letterSpacing: 1 }}>TOQUE PARA GRAVAR</div>
        </>
      )}
      {estado === "gravando" && (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, fontSize: 12, fontWeight: 800, color: C.vermelho, letterSpacing: 1 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.vermelho, animation: "blink 1s step-end infinite" }} />
            GRAVANDO · {fmt(tempo)}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, height: 40, marginBottom: 20 }}>
            {ondas.map((h, i) => <div key={i} style={{ width: 4, height: h, borderRadius: 4, background: `linear-gradient(to top, ${C.vermelho}, ${C.vermelho}66)`, transition: "height 0.15s ease" }} />)}
          </div>
          <button onClick={parar} style={{ padding: "12px 32px", borderRadius: 10, background: C.card, border: `2px solid ${C.vermelho}`, color: C.vermelho, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
            ⬛ Parar
          </button>
        </>
      )}
      {estado === "processando" && (
        <>
          <div style={{ fontSize: 32, marginBottom: 12, display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.verde }}>Transcrevendo áudio...</div>
          <div style={{ fontSize: 11, color: C.textoSuave, marginTop: 4 }}>Whisper + IA processando</div>
        </>
      )}
      {estado === "concluido" && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, justifyContent: "center" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.verde, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✓</div>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.verde }}>Áudio transcrito com sucesso</span>
          </div>
          <div style={{ background: C.fundo, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.borda}`, fontSize: 13, color: C.textoMedio, lineHeight: 1.7, fontStyle: "italic", textAlign: "left", marginBottom: 12 }}>
            "{transcricao}"
          </div>
          <button onClick={resetar} style={{ padding: "8px 16px", borderRadius: 8, background: "none", border: `1px solid ${C.borda}`, color: C.textoSuave, fontSize: 11, cursor: "pointer" }}>
            🎤 Gravar novamente
          </button>
        </>
      )}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ── TELA: INÍCIO ─────────────────────────────────────────────
function TelaInicio({ onIrParaCliente }) {
  return (
    <div style={{ padding: "16px 16px 0" }}>

      {/* Saudação */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.texto, letterSpacing: -0.5 }}>Bom dia, Carlos 👋</div>
        <div style={{ fontSize: 13, color: C.textoSuave, marginTop: 2 }}>Segunda, 14 de abril · 4 alertas pendentes</div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Clientes Ativos", valor: "24", icon: "🌱", cor: C.verde },
          { label: "Propostas Abertas", valor: "R$43k", icon: "📋", cor: C.azul },
          { label: "Fechamentos", valor: "R$18k", icon: "✅", cor: C.verde },
          { label: "Alertas", valor: "4", icon: "⚡", cor: C.amarelo },
        ].map((k, i) => (
          <Card key={i} style={{ padding: 14, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${k.cor}, transparent)` }} />
            <div style={{ fontSize: 20, marginBottom: 6 }}>{k.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: k.cor }}>{k.valor}</div>
            <div style={{ fontSize: 11, color: C.textoSuave, marginTop: 2 }}>{k.label}</div>
          </Card>
        ))}
      </div>

      {/* Alertas */}
      <Secao titulo="⚡ Alertas da IA">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {alertas.map(a => (
            <div key={a.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 12, background: a.urgente ? C.vermelhoApagado : C.elevado, border: `1px solid ${a.urgente ? C.vermelho + "44" : C.borda}` }}>
              <div style={{ fontSize: 18 }}>
                {a.tipo === "proposta" ? "⏰" : a.tipo === "contato" ? "📵" : a.tipo === "safra" ? "🌾" : "🎂"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.texto }}>{a.cliente}</div>
                <div style={{ fontSize: 12, color: C.textoSuave, marginTop: 2 }}>{a.msg}</div>
              </div>
              {a.urgente && <span style={{ background: C.vermelho, color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap", letterSpacing: 0.5 }}>URGENTE</span>}
            </div>
          ))}
        </div>
      </Secao>

      {/* Clientes recentes */}
      <Secao titulo="👥 Visitar Hoje">
        {clientes.slice(0, 3).map(c => (
          <Card key={c.id} onClick={() => onIrParaCliente(c)} style={{ marginBottom: 8, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: C.texto }}>{c.nome}</div>
                <div style={{ fontSize: 11, color: C.textoSuave, marginTop: 2 }}>📍 {c.cidade} · {c.culturas.join(", ")}</div>
              </div>
              <Badge status={c.status} small />
            </div>
            {c.alerta && (
              <div style={{ marginTop: 8, fontSize: 11, color: C.amarelo, display: "flex", gap: 4 }}>
                <span>⚡</span> {c.alerta}
              </div>
            )}
          </Card>
        ))}
      </Secao>
    </div>
  );
}

// ── TELA: CLIENTES ───────────────────────────────────────────
function TelaClientes({ onSelecionarCliente }) {
  const [busca, setBusca] = useState("");
  const filtrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.cidade.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: "16px 16px 0" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.texto, marginBottom: 16 }}>Clientes</div>

      <input
        value={busca} onChange={e => setBusca(e.target.value)}
        placeholder="🔍  Buscar cliente ou cidade..."
        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${C.borda}`, background: C.elevado, fontSize: 14, color: C.texto, outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 16 }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtrados.map(c => (
          <Card key={c.id} onClick={() => onSelecionarCliente(c)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.texto }}>{c.nome}</div>
                <div style={{ fontSize: 12, color: C.textoSuave, marginTop: 2 }}>🌿 {c.fazenda} · {c.hectares}ha</div>
                <div style={{ fontSize: 11, color: C.textoSuave }}>📍 {c.cidade}</div>
              </div>
              <Badge status={c.status} small />
            </div>
            <div style={{ display: "flex", gap: 0, borderTop: `1px solid ${C.borda}`, paddingTop: 10 }}>
              {[
                { label: "Última visita", valor: c.ultimaVisita },
                c.propostaAberta ? { label: "Proposta", valor: `R$${c.propostaAberta.toLocaleString("pt-BR")}`, destaque: C.amarelo } : null,
                { label: "Total/ano", valor: `R$${c.totalAnual.toLocaleString("pt-BR")}`, destaque: C.verde },
              ].filter(Boolean).map((item, i, arr) => (
                <div key={i} style={{ flex: 1, borderRight: i < arr.length - 1 ? `1px solid ${C.borda}` : "none", paddingRight: 10, paddingLeft: i > 0 ? 10 : 0 }}>
                  <div style={{ fontSize: 9, color: C.textoSuave, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: item.destaque || C.texto }}>{item.valor}</div>
                </div>
              ))}
            </div>
            {c.alerta && (
              <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: C.amareloApagado, border: `1px solid ${C.amarelo}33`, fontSize: 11, color: C.amarelo }}>
                ⚡ {c.alerta}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── TELA: DETALHE DO CLIENTE ─────────────────────────────────
function TelaCliente({ cliente, onVoltar }) {
  const [subAba, setSubAba] = useState("visita");
  const [modo, setModo] = useState("audio");
  const [texto, setTexto] = useState("");
  const [processando, setProcessando] = useState(false);
  const [registrado, setRegistrado] = useState(false);

  const registrar = () => {
    if (!texto.trim()) return;
    setProcessando(true);
    setTimeout(() => { setProcessando(false); setRegistrado(true); setTexto(""); }, 1800);
  };

  const subAbas = [
    { id: "visita", label: "Visita" },
    { id: "pessoa", label: "Pessoa" },
    { id: "historico", label: "Histórico" },
  ];

  return (
    <div>
      {/* Header do cliente */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.borda}`, padding: "12px 16px" }}>
        <button onClick={onVoltar} style={{ background: "none", border: "none", color: C.verde, fontSize: 13, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
          ← Voltar
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.texto }}>{cliente.nome}</div>
            <div style={{ fontSize: 12, color: C.textoSuave, marginTop: 2 }}>🌿 {cliente.fazenda} · {cliente.hectares}ha</div>
            <div style={{ fontSize: 11, color: C.textoSuave }}>📍 {cliente.cidade} · 📞 {cliente.telefone}</div>
          </div>
          <Badge status={cliente.status} />
        </div>
        {cliente.alerta && (
          <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: C.amareloApagado, border: `1px solid ${C.amarelo}33`, fontSize: 11, color: C.amarelo }}>
            ⚡ {cliente.alerta}
          </div>
        )}
      </div>

      {/* Sub-abas */}
      <div style={{ display: "flex", background: C.card, borderBottom: `1px solid ${C.borda}` }}>
        {subAbas.map(a => (
          <button key={a.id} onClick={() => setSubAba(a.id)} style={{ flex: 1, padding: "12px 0", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: subAba === a.id ? C.verde : C.textoSuave, borderBottom: subAba === a.id ? `2px solid ${C.verde}` : "2px solid transparent", transition: "all 0.2s" }}>
            {a.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>

        {/* ABA: REGISTRAR VISITA */}
        {subAba === "visita" && (
          <div>
            <div style={{ display: "flex", gap: 0, background: C.elevado, borderRadius: 10, padding: 3, border: `1px solid ${C.borda}`, marginBottom: 16 }}>
              {[{ id: "audio", label: "🎤 Voz" }, { id: "texto", label: "⌨️ Texto" }].map(m => (
                <button key={m.id} onClick={() => { setModo(m.id); setTexto(""); setRegistrado(false); }} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", cursor: "pointer", background: modo === m.id ? C.card : "transparent", color: modo === m.id ? C.texto : C.textoSuave, fontSize: 13, fontWeight: 700, boxShadow: modo === m.id ? `0 0 0 1px ${C.borda}` : "none", transition: "all 0.2s" }}>
                  {m.label}
                </button>
              ))}
            </div>

            {modo === "audio"
              ? <GravadorAudio onTranscricao={t => setTexto(t)} />
              : (
                <textarea value={texto} onChange={e => setTexto(e.target.value)}
                  placeholder={`Descreva a visita com ${cliente.nome.split(" ")[0]}...`}
                  style={{ width: "100%", minHeight: 120, padding: "14px", borderRadius: 12, border: `1px solid ${C.borda}`, fontSize: 14, color: C.texto, resize: "none", fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: C.elevado, lineHeight: 1.7 }}
                />
              )
            }

            {texto && !registrado && (
              <button onClick={registrar} disabled={processando} style={{ marginTop: 12, width: "100%", padding: "14px", borderRadius: 12, border: "none", background: processando ? C.elevado : `linear-gradient(135deg, ${C.verde}, ${C.verdeEscuro})`, color: processando ? C.textoSuave : "#000", fontWeight: 800, fontSize: 14, cursor: processando ? "default" : "pointer", transition: "all 0.2s" }}>
                {processando ? "⏳ IA organizando..." : "✦ Registrar visita"}
              </button>
            )}

            {registrado && (
              <div style={{ marginTop: 12, padding: "14px", borderRadius: 12, background: C.verdeApagado, border: `1px solid ${C.verde}44`, fontSize: 13, color: C.verde, fontWeight: 700, textAlign: "center" }}>
                ✅ Visita registrada com sucesso!
              </div>
            )}

            {/* Dados rápidos */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.textoSuave, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Dados do Cliente</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { label: "Culturas", valor: cliente.culturas.join(", ") },
                  { label: "Área", valor: `${cliente.hectares} ha` },
                  { label: "Última Visita", valor: cliente.ultimaVisita },
                  { label: "Total Anual", valor: `R$${cliente.totalAnual.toLocaleString("pt-BR")}` },
                ].map((item, i) => (
                  <div key={i} style={{ background: C.elevado, borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 9, color: C.textoSuave, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.texto }}>{item.valor}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA: PESSOA — O DIFERENCIAL */}
        {subAba === "pessoa" && (
          <div>
            <div style={{ padding: "12px 14px", borderRadius: 12, background: C.verdeApagado, border: `1px solid ${C.verde}33`, marginBottom: 16, fontSize: 12, color: C.verde, lineHeight: 1.6 }}>
              🌱 <strong>Conheça a pessoa, não só o cliente.</strong> Esses detalhes fazem a diferença na próxima visita.
            </div>

            {/* Família */}
            <Secao titulo="👨‍👩‍👧 Família">
              <Card style={{ padding: 14 }}>
                <div style={{ fontSize: 13, color: C.textoMedio, lineHeight: 1.7 }}>{cliente.pessoal.familia}</div>
              </Card>
            </Secao>

            {/* Aniversários */}
            <Secao titulo="🎂 Aniversários">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cliente.pessoal.aniversarios.map((a, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 10, background: C.elevado, border: `1px solid ${C.borda}` }}>
                    <span style={{ fontSize: 13, color: C.texto, fontWeight: 600 }}>{a.quem}</span>
                    <span style={{ fontSize: 13, color: C.terra, fontWeight: 800 }}>🎂 {a.data}</span>
                  </div>
                ))}
              </div>
            </Secao>

            {/* Preferências */}
            <Secao titulo="☕ Preferências e Perfil">
              <Card style={{ padding: 14 }}>
                <div style={{ fontSize: 13, color: C.textoMedio, lineHeight: 1.7 }}>{cliente.pessoal.preferencias}</div>
              </Card>
            </Secao>

            {/* Notas livres */}
            <Secao titulo="📝 Notas Pessoais">
              <Card style={{ padding: 14 }}>
                <div style={{ fontSize: 13, color: C.textoMedio, lineHeight: 1.7 }}>{cliente.pessoal.notas}</div>
              </Card>
            </Secao>
          </div>
        )}

        {/* ABA: HISTÓRICO */}
        {subAba === "historico" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cliente.historico.map((h, i) => (
                <Card key={i} style={{ padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: C.texto }}>{h.tipo}</span>
                      <Badge status={h.status} small />
                    </div>
                    <span style={{ fontSize: 11, color: C.textoSuave }}>{h.data}</span>
                  </div>
                  <div style={{ fontSize: 13, color: C.textoSuave, lineHeight: 1.6 }}>{h.desc}</div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TELA: REGISTRAR VISITA RÁPIDA ────────────────────────────
function TelaRegistrar() {
  const [modo, setModo] = useState("audio");
  const [texto, setTexto] = useState("");
  const [processando, setProcessando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const processar = () => {
    if (!texto.trim()) return;
    setProcessando(true);
    setTimeout(() => {
      const temJoao = texto.toLowerCase().includes("joão");
      const temMaria = texto.toLowerCase().includes("maria");
      const temCarlos = texto.toLowerCase().includes("carlos");
      const temPedido = texto.toLowerCase().includes("pedido") || texto.toLowerCase().includes("confirmou");
      setResultado({
        cliente: temJoao ? "João da Silva" : temMaria ? "Maria Aparecida" : temCarlos ? "Carlos Eduardo" : "Novo cliente",
        cultura: texto.toLowerCase().includes("milho") ? "Milho" : texto.toLowerCase().includes("café") ? "Café" : "Soja",
        produto: texto.toLowerCase().includes("presence") ? "Presence 1L/ha" : texto.toLowerCase().includes("rizomais") ? "Rizomais" : texto.toLowerCase().includes("biostarter") ? "BioStarter" : "A definir",
        status: temPedido ? "proposta_enviada" : "em_negociacao",
        acao: temPedido ? "Confirmar entrega com logística" : "Aguardar retorno até sexta-feira",
      });
      setProcessando(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "16px 16px 0" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.texto, marginBottom: 6 }}>Registrar Visita</div>
      <div style={{ fontSize: 13, color: C.textoSuave, marginBottom: 20 }}>Fale ou escreva — a IA organiza tudo</div>

      {/* Seletor modo */}
      <div style={{ display: "flex", gap: 0, background: C.elevado, borderRadius: 12, padding: 4, border: `1px solid ${C.borda}`, marginBottom: 16 }}>
        {[{ id: "audio", label: "🎤  Gravar Voz" }, { id: "texto", label: "⌨️  Digitar" }].map(m => (
          <button key={m.id} onClick={() => { setModo(m.id); setTexto(""); setResultado(null); }} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", cursor: "pointer", background: modo === m.id ? C.card : "transparent", color: modo === m.id ? C.texto : C.textoSuave, fontSize: 13, fontWeight: 700, boxShadow: modo === m.id ? `0 0 0 1px ${C.borda}` : "none", transition: "all 0.2s" }}>
            {m.label}
          </button>
        ))}
      </div>

      {modo === "audio"
        ? <GravadorAudio onTranscricao={t => setTexto(t)} />
        : (
          <div>
            <textarea value={texto} onChange={e => setTexto(e.target.value)}
              placeholder="Ex: Visitei João da Silva, soja no estágio V6, problema de nematoides, recomendei Presence 1L/ha, vai me ligar até sexta..."
              style={{ width: "100%", minHeight: 140, padding: "14px", borderRadius: 12, border: `1px solid ${C.borda}`, fontSize: 14, color: C.texto, resize: "none", fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: C.elevado, lineHeight: 1.7 }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              {[
                "Visitei João, soja V6, nematoides, recomendei Presence 1L/ha",
                "Maria confirmou pedido Rizomais 50L, entrega quinta",
                "Carlos Eduardo quer ampliar 80ha de café, fechar em abril",
              ].map((ex, i) => (
                <button key={i} onClick={() => setTexto(ex)} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.borda}`, background: C.elevado, fontSize: 11, color: C.textoSuave, cursor: "pointer" }}>
                  Exemplo {i + 1}
                </button>
              ))}
            </div>
          </div>
        )
      }

      {texto && !resultado && (
        <button onClick={processar} disabled={processando} style={{ marginTop: 14, width: "100%", padding: "15px", borderRadius: 12, border: "none", background: processando ? C.elevado : `linear-gradient(135deg, ${C.verde}, ${C.verdeEscuro})`, color: processando ? C.textoSuave : "#000", fontWeight: 800, fontSize: 14, cursor: processando ? "default" : "pointer", transition: "all 0.2s" }}>
          {processando ? "⏳  IA analisando..." : "✦  Processar com IA"}
        </button>
      )}

      {resultado && (
        <div style={{ marginTop: 16 }}>
          <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${C.verde}, ${C.amarelo})`, marginBottom: 16 }} />
          <div style={{ fontSize: 11, fontWeight: 800, color: C.verde, letterSpacing: 1, marginBottom: 12 }}>✦ IA EXTRAIU AUTOMATICAMENTE</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Cliente", valor: resultado.cliente },
              { label: "Cultura", valor: resultado.cultura },
              { label: "Produto", valor: resultado.produto },
              { label: "Status", valor: <Badge status={resultado.status} small /> },
            ].map((item, i) => (
              <div key={i} style={{ background: C.elevado, borderRadius: 10, padding: "10px 12px", border: `1px solid ${C.borda}` }}>
                <div style={{ fontSize: 9, color: C.textoSuave, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.texto }}>{item.valor}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 10, background: C.amareloApagado, border: `1px solid ${C.amarelo}33`, marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.textoSuave, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>Próxima ação</div>
            <div style={{ fontSize: 13, color: C.amarelo, fontWeight: 700 }}>⚡ {resultado.acao}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ flex: 1, padding: "13px", borderRadius: 12, background: `linear-gradient(135deg, ${C.verde}, ${C.verdeEscuro})`, border: "none", color: "#000", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
              ✓ Confirmar e Salvar
            </button>
            <button onClick={() => { setResultado(null); setTexto(""); }} style={{ padding: "13px 18px", borderRadius: 12, background: "none", border: `1px solid ${C.borda}`, color: C.textoSuave, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── TELA: PIPELINE ───────────────────────────────────────────
function TelaPipeline() {
  const etapas = [
    { status: "visitado", label: "Visitado", cor: C.textoSuave },
    { status: "proposta_enviada", label: "Proposta", cor: C.azul },
    { status: "em_negociacao", label: "Negociação", cor: C.amarelo },
    { status: "fechado", label: "Fechado", cor: C.verde },
  ];

  const [etapaAtiva, setEtapaAtiva] = useState("em_negociacao");
  const clientesFiltrados = clientes.filter(c => c.status === etapaAtiva);
  const etapaAtual = etapas.find(e => e.status === etapaAtiva);

  return (
    <div style={{ padding: "16px 16px 0" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.texto, marginBottom: 16 }}>Pipeline</div>

      {/* Seletor de etapa */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 20 }}>
        {etapas.map(e => {
          const count = clientes.filter(c => c.status === e.status).length;
          const ativo = etapaAtiva === e.status;
          return (
            <button key={e.status} onClick={() => setEtapaAtiva(e.status)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 20, border: `1px solid ${ativo ? e.cor : C.borda}`, background: ativo ? e.cor + "22" : C.elevado, color: ativo ? e.cor : C.textoSuave, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
              {e.label}
              <span style={{ background: ativo ? e.cor : C.borda, color: ativo ? "#000" : C.textoSuave, borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 800 }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Resumo da etapa */}
      <div style={{ padding: "12px 14px", borderRadius: 12, background: C.elevado, border: `1px solid ${etapaAtual.cor}33`, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: C.textoMedio }}>{clientesFiltrados.length} cliente{clientesFiltrados.length !== 1 ? "s" : ""}</span>
        <span style={{ fontSize: 15, fontWeight: 800, color: etapaAtual.cor }}>
          R${clientesFiltrados.reduce((acc, c) => acc + (c.propostaAberta || 0), 0).toLocaleString("pt-BR")}
        </span>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {clientesFiltrados.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: C.textoSuave, fontSize: 13 }}>
            Nenhum cliente nessa etapa
          </div>
        )}
        {clientesFiltrados.map(c => (
          <Card key={c.id} style={{ padding: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: C.texto, marginBottom: 4 }}>{c.nome}</div>
            <div style={{ fontSize: 12, color: C.textoSuave, marginBottom: 10 }}>{c.culturas.join(", ")} · {c.hectares}ha · {c.cidade}</div>
            {c.propostaAberta && (
              <div style={{ fontSize: 18, fontWeight: 900, color: C.amarelo, marginBottom: 8 }}>R${c.propostaAberta.toLocaleString("pt-BR")}</div>
            )}
            {c.alerta && (
              <div style={{ fontSize: 11, color: C.amarelo }}>⚡ {c.alerta}</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── APP PRINCIPAL ────────────────────────────────────────────
export default function RaizCRM() {
  const [aba, setAba] = useState("inicio");
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const irParaCliente = (c) => {
    setClienteSelecionado(c);
    setAba("cliente");
  };

  const voltarDeCliente = () => {
    setClienteSelecionado(null);
    setAba("clientes");
  };

  const abas = [
    { id: "inicio", label: "Início", icon: (ativo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={ativo ? C.verde : C.textoSuave}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22" fill="none" stroke={ativo ? C.verde : C.textoSuave} strokeWidth="2"/>
      </svg>
    )},
    { id: "clientes", label: "Clientes", icon: (ativo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ativo ? C.verde : C.textoSuave} strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )},
    { id: "registrar", label: "Registrar", icon: (ativo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={ativo ? C.verde : "none"} stroke={ativo ? C.verde : C.textoSuave} strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round"/>
        <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round"/>
        <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round"/>
      </svg>
    )},
    { id: "pipeline", label: "Pipeline", icon: (ativo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ativo ? C.verde : C.textoSuave} strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    )},
  ];

  const abaAtiva = aba === "cliente" ? "clientes" : aba;

  return (
    <div style={{
      maxWidth: 430,
      margin: "0 auto",
      minHeight: "100vh",
      background: C.fundo,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: C.texto,
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* HEADER */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.borda}`, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Logo Raiz */}
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${C.verde}, ${C.verdeEscuro})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 22V12"/>
              <path d="M12 12C12 12 8 10 6 6c3 0 6 2 6 6z"/>
              <path d="M12 12C12 12 16 10 18 6c-3 0-6 2-6 6z"/>
              <path d="M12 12C12 12 10 8 12 4c2 4 0 8 0 8z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: C.texto, letterSpacing: -0.3 }}>Raiz</div>
            <div style={{ fontSize: 10, color: C.textoSuave, marginTop: -2 }}>Relacionamentos com raiz</div>
          </div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.verdeApagado, border: `2px solid ${C.verde}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: C.verde }}>
          C
        </div>
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {aba === "inicio" && <TelaInicio onIrParaCliente={irParaCliente} />}
        {aba === "clientes" && <TelaClientes onSelecionarCliente={irParaCliente} />}
        {aba === "cliente" && clienteSelecionado && <TelaCliente cliente={clienteSelecionado} onVoltar={voltarDeCliente} />}
        {aba === "registrar" && <TelaRegistrar />}
        {aba === "pipeline" && <TelaPipeline />}
      </div>

      {/* NAVEGAÇÃO INFERIOR */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: C.card,
        borderTop: `1px solid ${C.borda}`,
        display: "flex",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}>
        {abas.map(a => {
          const ativo = abaAtiva === a.id;
          return (
            <button key={a.id} onClick={() => { setAba(a.id); setClienteSelecionado(null); }} style={{ flex: 1, padding: "10px 0 8px", border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, transition: "all 0.2s" }}>
              {a.icon(ativo)}
              <span style={{ fontSize: 10, fontWeight: ativo ? 800 : 600, color: ativo ? C.verde : C.textoSuave, transition: "color 0.2s" }}>{a.label}</span>
              {ativo && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.verde }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
