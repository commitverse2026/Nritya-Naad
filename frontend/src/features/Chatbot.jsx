import { useState, useRef, useEffect } from "react";

const theme = {
  color: "#FF6B00",
  bg: "rgba(255,107,0,0.08)",
  gradient: "linear-gradient(135deg, #FF6B00, #E85D04)",
  border: "rgba(255,107,0,0.2)",
};

const KB = [
  {
    keys: ["bharatanatyam", "bharata natyam"],
    answer:
      "Bharatanatyam is one of India's oldest classical dance forms, originating in Tamil Nadu. It blends nritta (pure dance), nritya (expressive dance), and natya (drama). Characterized by its intricate footwork, hand gestures (mudras), and expressive eye movements, it was traditionally performed in temples and is now a world-renowned art form.",
  },
  {
    keys: ["kathak"],
    answer:
      "Kathak is a North Indian classical dance that evolved from the storytelling traditions of wandering bards (Kathakas). It features fast spins (chakkar), intricate footwork (tatkar), and expressive abhinaya. The two major gharanas are Lucknow (lyrical, graceful) and Jaipur (vigorous, rhythmic).",
  },
  {
    keys: ["odissi"],
    answer:
      "Odissi is a classical dance from Odisha, one of the oldest surviving dance forms. It is known for its tribhangi posture (three-bend body stance), sculpturesque poses, and devotional themes inspired by Lord Jagannath and Radha-Krishna. Guru Kelucharan Mahapatra was instrumental in its revival.",
  },
  {
    keys: ["kuchipudi"],
    answer:
      "Kuchipudi is a classical dance-drama from Andhra Pradesh. It combines expressive abhinaya with acrobatic elements, and is known for the famous tarangam — dancing on the rim of a brass plate. It originated as a male-only tradition in the village of Kuchipudi.",
  },
  {
    keys: ["manipuri"],
    answer:
      "Manipuri is a classical dance from Manipur, northeast India. Deeply rooted in Vaishnavism, it features soft, flowing movements and the iconic Ras Lila performances depicting Krishna's dance with the gopis. Unlike other forms, Manipuri avoids sharp, forceful movements.",
  },
  {
    keys: ["kathakali"],
    answer:
      "Kathakali is a classical dance-drama from Kerala, renowned for its elaborate costumes, vivid face paint (vesham), and large headgear. Performers enact stories from epics like Ramayana and Mahabharata. It requires years of rigorous training in facial expressions (navarasas) and body language.",
  },
  {
    keys: ["mohiniyattam"],
    answer:
      "Mohiniyattam is a classical solo dance from Kerala, traditionally performed by women. It is known for its gentle, swaying movements resembling the swaying of coconut palms. The name means 'dance of the enchantress Mohini.' It blends elements of Bharatanatyam and Kathakali.",
  },
  {
    keys: ["carnatic", "karnatik"],
    answer:
      "Carnatic music is the classical music tradition of South India, practiced in Tamil Nadu, Andhra Pradesh, Telangana, Karnataka, and Kerala. It is primarily vocal, and compositions are structured around ragas (melodic frameworks) and talas (rhythmic cycles). Key composers include Tyagaraja, Muthuswami Dikshitar, and Syama Sastri — the Trinity of Carnatic Music.",
  },
  {
    keys: ["hindustani"],
    answer:
      "Hindustani music is the classical music tradition of North India. It developed under Persian and Mughal influences, diverging from Carnatic music around the 13th century. Key forms include khayal, dhrupad, thumri, and ghazal. Famous gharanas include Jaipur, Agra, Kirana, and Gwalior.",
  },
  {
    keys: ["raga", "raag"],
    answer:
      "A raga is a melodic framework in Indian classical music built from a specific set of notes (swaras) with rules for ascent (arohana) and descent (avarohana). Each raga has a specific mood (rasa), time of day, and season. Examples: Bhairav (dawn, serene), Yaman (evening, romantic), Bhairavi (late night, melancholic).",
  },
  {
    keys: ["tala", "taal", "rhythm"],
    answer:
      "Tala is the rhythmic cycle in Indian classical music. Common talas include Teental (16 beats), Ektal (12 beats), Rupak (7 beats), and Adi tala (8 beats in Carnatic). The tabla is the primary percussion instrument in Hindustani music, while the mridangam is central to Carnatic music.",
  },
  {
    keys: ["mudra", "hand gesture"],
    answer:
      "Mudras are symbolic hand gestures used in Indian classical dance. Asamyuta mudras use one hand (e.g., Pataka, Tripataka, Alapadma), while Samyuta mudras use both hands. There are 28 asamyuta and 24 samyuta mudras in Bharatanatyam, each conveying specific meanings, emotions, or objects.",
  },
  {
    keys: ["tabla"],
    answer:
      "The tabla is a pair of hand drums central to Hindustani classical music. The right drum (dayan) is made of wood, and the left (bayan) is made of metal. It provides rhythmic accompaniment to vocal and instrumental performances. Famous tabla maestros include Zakir Hussain, Allah Rakha, and Kishan Maharaj.",
  },
  {
    keys: ["sitar"],
    answer:
      "The sitar is a plucked string instrument prominent in Hindustani classical music. It has 18–21 strings and a resonating gourd. Ravi Shankar brought it to global prominence. The sitar produces its characteristic sound through sympathetic strings (tarab) that resonate with played notes.",
  },
  {
    keys: ["veena", "vina"],
    answer:
      "The veena is a plucked string instrument central to Carnatic classical music. The Saraswati veena, played in South India, has 4 main strings and 3 drone strings. It is associated with Goddess Saraswati. Eminent veena players include M.S. Subbulakshmi's guru, Semmangudi Srinivasa Iyer, and E. Gayathri.",
  },
  {
    keys: ["mridangam"],
    answer:
      "The mridangam is a double-headed drum and the primary percussion instrument in Carnatic music. Made from a single piece of jackwood, it accompanies vocal and instrumental concerts. Notable mridangam artists include Umayalpuram K. Sivaraman and Karaikudi Mani.",
  },
  {
    keys: ["natya shastra"],
    answer:
      "The Natya Shastra is a foundational ancient treatise on performing arts, attributed to the sage Bharata Muni (200 BCE–200 CE). It covers theatre, dance, music, poetics, costumes, and makeup. It introduced the concept of Navarasas — nine emotional states: Shringara, Hasya, Karuna, Raudra, Vira, Bhayanaka, Bibhatsa, Adbhuta, and Shanta.",
  },
  {
    keys: ["navarasa", "nine rasa", "nine emotions", "emotion"],
    answer:
      "The Navarasas are the nine emotional essences in Indian performing arts: 1. Shringara (love/beauty), 2. Hasya (humour), 3. Karuna (compassion/sorrow), 4. Raudra (fury), 5. Vira (heroism), 6. Bhayanaka (terror), 7. Bibhatsa (disgust), 8. Adbhuta (wonder), 9. Shanta (peace). Every performance aims to evoke these rasas in the audience.",
  },
  {
    keys: ["classical dance forms", "how many", "dance forms in india", "types of dance"],
    answer:
      "India has 8 officially recognised classical dance forms by the Sangeet Natak Akademi: Bharatanatyam (Tamil Nadu), Kathak (North India), Odissi (Odisha), Kuchipudi (Andhra Pradesh), Manipuri (Manipur), Kathakali (Kerala), Mohiniyattam (Kerala), and Sattriya (Assam).",
  },
  {
    keys: ["sattriya"],
    answer:
      "Sattriya is a classical dance form from Assam, originating in the Vaishnavite monasteries (sattras) founded by saint-scholar Srimanta Sankardeva in the 15th century. It was recognised as a classical dance by the Sangeet Natak Akademi in 2000. It is performed as part of rituals and storytelling within the monastic tradition.",
  },
  {
    keys: ["ravi shankar"],
    answer:
      "Pandit Ravi Shankar (1920–2012) was a sitar virtuoso who brought Indian classical music to a global audience. He collaborated with George Harrison of The Beatles and performed at Woodstock. He founded music schools in the US and India and was awarded the Bharat Ratna in 1999.",
  },
  {
    keys: ["ms subbulakshmi", "m.s. subbulakshmi", "subbulakshmi"],
    answer:
      "M.S. Subbulakshmi (1916–2004) was one of the greatest Carnatic vocalists of all time. She was the first musician to receive the Bharat Ratna (1998). Her rendition of Venkateswara Suprabhatam and Meera Bhajans are iconic. She performed at the United Nations General Assembly in 1966.",
  },
  {
    keys: ["zakir hussain"],
    answer:
      "Ustad Zakir Hussain (1951–2024) was the world's foremost tabla maestro. Son of the legendary Allah Rakha, he elevated the tabla to a global solo instrument. He collaborated with artists like Ravi Shankar and John McLaughlin (Shakti). He received the Padma Vibhushan and multiple Grammy Awards.",
  },
  {
    keys: ["hello", "hi", "hey", "namaste"],
    answer:
      "Namaste! 🙏 I'm your NrityaNaad cultural guide. Ask me anything about Indian classical dance forms, music traditions, ragas, instruments, legendary artists, or performing arts concepts. What would you like to explore today?",
  },
  {
    keys: ["thank", "thanks", "dhanyavad"],
    answer:
      "You're welcome! 🙏 Feel free to ask anything more about Indian classical arts — there's always more to discover in this rich tradition.",
  },
  {
    keys: ["help", "what can you", "topics"],
    answer:
      "I can answer questions about: \n• Classical dance forms (Bharatanatyam, Kathak, Odissi, Kuchipudi, Manipuri, Kathakali, Mohiniyattam, Sattriya)\n• Music traditions (Carnatic, Hindustani)\n• Concepts (Raga, Tala, Mudra, Navarasa, Natya Shastra)\n• Instruments (Sitar, Tabla, Veena, Mridangam)\n• Legendary artists (Ravi Shankar, M.S. Subbulakshmi, Zakir Hussain)\n\nJust ask away!",
  },
];

function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keys.some((k) => lower.includes(k))) {
      return entry.answer;
    }
  }
  return "That's a beautiful question! While I'm still learning about that specific topic, I'd encourage you to explore it through our other features — or rephrase your question. You can also ask me about dance forms, ragas, instruments, or legendary artists. 🎶";
}

const SUGGESTIONS = [
  "What is Bharatanatyam?",
  "Tell me about ragas",
  "What are the Navarasas?",
  "Explain Carnatic music",
  "What is a mudra?",
  "Classical dance forms in India",
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Namaste! 🙏 I'm your NrityaNaad cultural guide. Ask me anything about Indian classical dance, music, instruments, or legendary artists!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: getBotReply(userText) }]);
    }, 700);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Chat window */}
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        border: `1.5px solid ${theme.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "460px",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px",
          background: theme.gradient,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "36px", height: "36px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}>💬</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: "15px" }}>NrityaNaad Guide</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>Cultural Q&A Assistant</div>
          </div>
          <div style={{
            marginLeft: "auto",
            width: "8px", height: "8px",
            borderRadius: "50%",
            background: "#4cff91",
            boxShadow: "0 0 6px #4cff91",
          }} />
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          gap: "10px",
          background: "#fafafa",
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about Indian classical arts..."
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: "24px",
              border: `1.5px solid ${theme.border}`,
              fontSize: "14px",
              outline: "none",
              background: "#fff",
              color: "#3D1C00",
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            style={{
              width: "42px", height: "42px",
              borderRadius: "50%",
              border: "none",
              background: input.trim() ? theme.gradient : "rgba(0,0,0,0.08)",
              color: "#fff",
              fontSize: "18px",
              cursor: input.trim() ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
          >
            ➤
          </button>
        </div>
      </div>

      {/* Quick suggestions */}
      <div>
        <p style={{ fontSize: "12px", color: "#8B6452", marginBottom: "10px", fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>
          Suggested questions
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              style={{
                padding: "7px 14px",
                borderRadius: "20px",
                border: `1.5px solid ${theme.border}`,
                background: theme.bg,
                color: theme.color,
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: 400,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = theme.color; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = theme.bg; e.currentTarget.style.color = theme.color; }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }) {
  const isBot = msg.from === "bot";
  return (
    <div style={{
      display: "flex",
      justifyContent: isBot ? "flex-start" : "flex-end",
      alignItems: "flex-end",
      gap: "8px",
    }}>
      {isBot && (
        <div style={{
          width: "28px", height: "28px",
          borderRadius: "50%",
          background: theme.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          flexShrink: 0,
        }}>💬</div>
      )}
      <div style={{
        maxWidth: "75%",
        padding: "10px 14px",
        borderRadius: isBot ? "4px 18px 18px 18px" : "18px 18px 4px 18px",
        background: isBot ? "#f5f0eb" : theme.gradient,
        color: isBot ? "#3D1C00" : "#fff",
        fontSize: "14px",
        lineHeight: 1.6,
        whiteSpace: "pre-line",
      }}>
        {msg.text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
      <div style={{
        width: "28px", height: "28px",
        borderRadius: "50%",
        background: theme.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        flexShrink: 0,
      }}>💬</div>
      <div style={{
        padding: "10px 16px",
        borderRadius: "4px 18px 18px 18px",
        background: "#f5f0eb",
        display: "flex",
        gap: "4px",
        alignItems: "center",
      }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            width: "7px", height: "7px",
            borderRadius: "50%",
            background: theme.color,
            display: "inline-block",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40% { transform: translateY(-6px); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
