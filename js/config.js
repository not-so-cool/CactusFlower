/* ============ EDITABLE CONTENT — everything personal lives here ============ */

// PHOTOS: relative paths. Missing files render a tone-matched SVG placeholder.
const PHOTOS = {
  hero:"images/hero.jpg", cover:"images/cover.jpg", full:"images/full.jpg",
  m1:"images/m1.jpg", m2:"images/m2.jpg", m3:"images/m3.jpg", m4:"images/m4.jpg", m5:"images/m5.jpg",
  m6:"images/m6.jpg", m7:"images/m7.jpg", m8:"images/m8.jpg", m9:"images/m9.jpg",
  interlude:"images/interlude.jpg", final:"images/final.jpg"
};

// THINGS_SPECIAL — section 04
const THINGS_SPECIAL = [
  {title:"The way you show up.",        note:"TODO: replace with a real memory — a sentence or two in your own words."}, // TODO: replace with a real memory
  {title:"The way you see things.",     note:"TODO: replace with a real memory — something only you do."},              // TODO: replace with a real memory
  {title:"The way you make a room feel.",note:"TODO: replace with a real memory — a small, specific detail."},           // TODO: replace with a real memory
  {title:"The way you are, simply.",    note:"TODO: replace with a real memory — keep it short and true."}              // TODO: replace with a real memory
];

// THINGS_I_LIKE — section 05. `crossed` = text that gets written, struck out, then replaced.
const THINGS_I_LIKE = [
  {label:"Your laugh",    note:"TODO: replace with a real memory."},
  {label:"Your kindness", note:"TODO: replace with a real memory."},
  {label:"Your chaos",    note:"TODO: replace with a real memory.", crossed:"Your mess"},
  {label:"Your weirdness",note:"TODO: replace with a real memory."},
  {label:"You",           note:"TODO: replace with a real memory.", crossed:"Everything about you"}
];

// MEMORIES — section 06. collage: x/y/w in %, rot in deg, speed = parallax. journey: w in vw, dy = vertical offset.
const MEMORIES = {
  collage:[
    {p:"m1",caption:"TODO: replace with a real memory", x:"6%", y:"2%", w:"34%",rot:-3,speed:-.3,pol:1},
    {p:"m2",caption:"TODO: replace with a real memory", x:"52%",y:"6%", w:"26%",rot:2.5,speed:.5,pol:0},
    {p:"m3",caption:"TODO: replace with a real memory", x:"24%",y:"38%",w:"22%",rot:4,speed:-.6,pol:1},
    {p:"m4",caption:"TODO: replace with a real memory", x:"60%",y:"48%",w:"32%",rot:-2,speed:.2,pol:0},
    {p:"m5",caption:"TODO: replace with a real memory", x:"8%", y:"68%",w:"28%",rot:2,speed:-.2,pol:1}
  ],
  journey:[
    {p:"m6",caption:"TODO: replace with a real memory",w:26,rot:-2,dy:"-8vh"},
    {p:"m7",caption:"TODO: replace with a real memory",w:20,rot:3,dy:"9vh"},
    {p:"m8",caption:"TODO: replace with a real memory",w:28,rot:-1.5,dy:"-4vh"},
    {p:"m9",caption:"TODO: replace with a real memory",w:22,rot:2.5,dy:"7vh"}
  ],
  journeyHead:"and a few more."
};

// FULL_MEMORY — section 07
const FULL_MEMORY = {line:"TODO: replace with one short line."}; // TODO: replace with a real memory

// LITTLE_THINGS — section 08. tone = background it shifts to when opened.
const LITTLE_THINGS = [
  {short:"The small thing you always do.",   more:"TODO: replace with a real memory.", tone:"#2B3A31", x:"4%", y:"4%", d:"7s"},
  {short:"A sound that means you.",           more:"TODO: replace with a real memory.", tone:"#3A2F2C", x:"52%",y:"0%", d:"9s"},
  {short:"How you say certain words.",        more:"TODO: replace with a real memory.", tone:"#2C2F2B", x:"22%",y:"26%",d:"8s"},
  {short:"The way you're never on time.",     more:"TODO: replace with a real memory.", tone:"#33382B", x:"60%",y:"36%",d:"10s"},
  {short:"What you do when you think no one sees.",more:"TODO: replace with a real memory.",tone:"#2B3A31",x:"6%",y:"56%",d:"7.5s"},
  {short:"Just, you.",                        more:"TODO: replace with a real memory.", tone:"#3A2F2C", x:"48%",y:"70%",d:"9.5s"}
];

// CACTUS — section 09
const CACTUS = {title:"Maybe cactus is actually a pretty fitting name.", lines:["A little sharp sometimes.","Strangely resilient.","Impossible to mistake for anyone else.","And somehow\u2026 really beautiful."]};
// HOPE — section 10
const HOPE = ["You are more loved than you probably realize.","You make people's lives better simply by being in them.","You don't need to become someone else to be extraordinary.","And I hope you always remember that."];
// LETTER — section 11
const LETTER = {
  to:"Dear Cactus,",
  paras:[
    "TODO: replace with a real memory — open with what you most want her to hear.",
    "TODO: replace with a real memory — one or two specific things you're grateful for.",
    "TODO: replace with a real memory — what you hope for her this year."
  ],
  sign:"TODO: your name"
};
// INTERLUDE / BIRTHDAY / FINAL — sections 12–14
const INTERLUDE = {a:"Anyway\u2026", b:"Enough emotional damage."};
const BIRTHDAY = {title:["Happy Birthday,","Cactus."], line:"I hope this year gives you a ridiculous amount of reasons to smile."};
const FINAL_LINE = "Here's to another year of being completely, unapologetically you.";
// FINAL_BUTTON / FINAL_MESSAGES — section 15
const FINAL_BUTTON = "One last thing\u2026";
const FINAL_MESSAGES = ["I'm really glad I met you."]; // TODO: make it yours
// MUSIC — path to an audio file (e.g. "audio/song.mp3"). Missing file => control stays hidden. No autoplay.
const MUSIC = "audio/song.mp3";

