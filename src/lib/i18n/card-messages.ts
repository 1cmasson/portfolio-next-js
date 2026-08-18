/**
 * Message catalogue for the /hi contact card.
 *
 * Hand-rolled and key-based rather than i18next: a ~40 KB runtime on the one
 * page that sells "highly performant websites" would undercut the pitch. The
 * shape is the standard one, so swapping in a library later is mechanical.
 *
 * `MessageKey` is derived from the English catalogue, so every other locale is
 * checked at compile time — a missing or misspelled Spanish key fails the build
 * instead of silently rendering English in production.
 */

export const CARD_LOCALES = ["en", "es"] as const;

export type CardLocale = (typeof CARD_LOCALES)[number];

export const DEFAULT_LOCALE: CardLocale = "en";

const en = {
  "meta.title": "Carlos Masson — Websites, 3D Prints & AI in Hialeah",
  "lang.aria": "Language",
  "hero.eyebrow": "Hialeah · Miami Lakes, FL",
  "hero.greeting": "Hey, I'm Carlos Masson",
  "hero.intro":
    "I'm an engineer at The Home Depot, on the online platform team. I live in Miami Lakes with my wife and daughter, and I'm an FIU alumnus.",
  "hero.avatarAlt": "Illustrated portrait of Carlos Masson",
  "why.title": "Why you have this",
  "why.lead": "I made this 3D print for you because I want to help you.",
  "why.body":
    "I own a 3D printer and I design very well. I've mastered web development, and I'm an expert in AI implementations and marketing technology.",
  "services.title": "What I can build for you",
  "services.prints": "Custom 3D prints",
  "services.modeling": "Custom 3D modeling",
  "services.animation": "AI animation",
  "services.voice": "AI voice calls",
  "services.web": "Highly performant websites",
  "services.ai": "AI implementations",
  "services.martech": "Marketing technology",
  "services.more": "…and the list goes on.",
  "work.title": "Sites I've built",
  "work.medical": "Medical center",
  "work.legal": "Law firm",
  "work.realestate": "Commercial real estate",
  "work.vending": "Vending company",
  "game.title": "And a game, for fun",
  "game.body": "I built a multiplayer dungeon game on the side. Go play it.",
  "game.cta": "Play now",
  "mission.body":
    "I'm bringing Hialeah to the next level in user experience — one local business at a time.",
  "contact.title": "Let's talk",
  "contact.phoneLabel": "Phone",
  "contact.emailLabel": "Email",
  "cta.hint": "Call me. If I don't answer, text me.",
  "cta.aria": "Contact Carlos",
  "cta.call": "Call",
  "cta.text": "Text",
  "cta.save": "Save contact",
  "footer.note": "Made in Miami Lakes by Carlos Masson.",
} as const;

export type MessageKey = keyof typeof en;

const es: Record<MessageKey, string> = {
  "meta.title": "Carlos Masson — Sitios web, impresiones 3D e IA en Hialeah",
  "lang.aria": "Idioma",
  "hero.eyebrow": "Hialeah · Miami Lakes, FL",
  "hero.greeting": "Hola, soy Carlos Masson",
  "hero.intro":
    "Soy ingeniero en The Home Depot, en el equipo de la plataforma en línea. Vivo en Miami Lakes con mi esposa y mi hija, y soy egresado de FIU.",
  "hero.avatarAlt": "Retrato ilustrado de Carlos Masson",
  "why.title": "Por qué tienes esto",
  "why.lead": "Hice esta impresión 3D para ti porque quiero ayudarte.",
  "why.body":
    "Tengo mi propia impresora 3D y diseño muy bien. Domino el desarrollo web y soy experto en implementaciones de IA y en tecnología de marketing.",
  "services.title": "Lo que puedo construir para ti",
  "services.prints": "Impresiones 3D personalizadas",
  "services.modeling": "Modelado 3D personalizado",
  "services.animation": "Animación con IA",
  "services.voice": "Llamadas con voz de IA",
  "services.web": "Sitios web ultrarrápidos",
  "services.ai": "Implementaciones de IA",
  "services.martech": "Tecnología de marketing",
  "services.more": "…y la lista sigue.",
  "work.title": "Sitios que he creado",
  "work.medical": "Centro médico",
  "work.legal": "Bufete de abogados",
  "work.realestate": "Bienes raíces comerciales",
  "work.vending": "Empresa de vending",
  "game.title": "Y un juego, por diversión",
  "game.body":
    "Hice un juego multijugador de mazmorras por mi cuenta. Ve a jugarlo.",
  "game.cta": "Jugar ahora",
  "mission.body":
    "Estoy llevando a Hialeah al siguiente nivel en experiencia de usuario, un negocio local a la vez.",
  "contact.title": "Hablemos",
  "contact.phoneLabel": "Teléfono",
  "contact.emailLabel": "Correo",
  "cta.hint": "Llámame. Si no contesto, mándame un mensaje.",
  "cta.aria": "Contactar a Carlos",
  "cta.call": "Llamar",
  "cta.text": "Mensaje",
  "cta.save": "Guardar contacto",
  "footer.note": "Hecho en Miami Lakes por Carlos Masson.",
};

export const CARD_MESSAGES: Record<CardLocale, Record<MessageKey, string>> = {
  en,
  es,
};

export function isCardLocale(value: unknown): value is CardLocale {
  return (
    typeof value === "string" &&
    (CARD_LOCALES as readonly string[]).includes(value)
  );
}

export function translate(key: MessageKey, locale: CardLocale): string {
  return CARD_MESSAGES[locale][key] ?? CARD_MESSAGES[DEFAULT_LOCALE][key];
}
