/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
 */

const emojis = {
  "-": " ",
  O: "🛖",
  X: "💣",
  I: "🍯",
  P: "🧱",
  A: "🌳",
  H: "🕳️",
  PLAYER: "🐻",
  ENEMY: "🔥",
  GAME_OVER: "👎",
  WIN: "🏆",
  HEART: "❤️",
};

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXAAXXXXX
  -XAAAXXHXX
  -XXXAA--XX
  -XXXAX-XXX
  -XXAXX-XXX
  -------XA-
  OAAAAAAAAA
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  O----XXXXX
  XXXX-XXXXX
  XX---XXXXX
  XX-XXXXXXX
  XX----XXXX
  XXX-XXXXXX
  XX----XXXX
  XX-XXXXXXX
  XX--IXXXXX
  XXXXXXXXXX
`);
