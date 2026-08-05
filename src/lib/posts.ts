/**
 * Blog posts, held in code.
 *
 * These previously came from a MySQL table, which was removed so the site can
 * deploy without a database. Add a post by adding an entry here — newest first,
 * since the list renders in order.
 *
 * `slug` is the URL: /blogs/<slug>/. It must be unique and URL-safe.
 * `thumbnail` takes a path under /public (e.g. "/images/blogs/post.jpg") or
 * null for the styled placeholder frame.
 *
 * NOTE: the body copy below is placeholder written to demonstrate the article
 * layout. Replace it with your own before promoting these posts.
 */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  thumbnail: string | null;
  content: ContentBlock[];
};

export const posts: Post[] = [
  {
    slug: "experiments-that-changed-how-kids-see-science",
    title: "Beyond textbooks: 12 experiments that changed how kids see science",
    category: "STEM",
    excerpt:
      "Our most-loved hands-on STEM activities — and the learning science behind why they work.",
    readTime: "5 min read",
    date: "28 July 2026",
    author: "Funscholar Team",
    thumbnail: "/images/blogs/experiments-that-changed-how-kids-see-science.jpg",
    content: [
      {
        type: "p",
        text: "Ask a class of eleven-year-olds what science is and you will usually get a description of a textbook chapter. Ask the same class after an afternoon of building circuits, and the answer changes shape entirely. Science stops being something to memorise and becomes something you do.",
      },
      {
        type: "p",
        text: "Over the past four years we have run hands-on sessions in thousands of classrooms across twenty-two states. A handful of activities come up again and again as the ones that shift how students think — not because they are spectacular, but because of what they ask of the student.",
      },
      { type: "h2", text: "What makes an experiment stick" },
      {
        type: "p",
        text: "The activities that work share a structure. They begin with a question the student can genuinely predict the answer to, and they end with a result the student can check for themselves. The gap between prediction and result is where the learning happens.",
      },
      {
        type: "ul",
        items: [
          "The setup takes under ten minutes, so most of the period is spent thinking rather than assembling.",
          "Failure is informative — a circuit that does not light tells you something specific.",
          "Materials are cheap enough that every student gets their own, not one demonstration at the front.",
          "The result is visible from across the room, so discussion happens naturally.",
        ],
      },
      {
        type: "quote",
        text: "The moment a student stops asking whether their answer is right and starts asking why it came out that way, the lesson has done its job.",
      },
      { type: "h2", text: "Prediction before demonstration" },
      {
        type: "p",
        text: "One change improves almost any practical activity: ask for a written prediction before anything is switched on. It takes ninety seconds and it converts a demonstration into an experiment. Students who have committed to an answer pay attention to the outcome in a way that passive observers do not.",
      },
      {
        type: "p",
        text: "This also gives the teacher something valuable — a record of what the class believed beforehand. Misconceptions that would otherwise stay hidden become visible and addressable.",
      },
      { type: "h2", text: "Where to start" },
      {
        type: "p",
        text: "Schools beginning this work often want to overhaul everything at once. We suggest the opposite. Pick one topic per term where the practical version replaces the explanation entirely, run it properly, and see what changes. The evidence from your own classrooms will be more persuasive than anything we could tell you.",
      },
    ],
  },
  {
    slug: "funscholar-ai-personalised-learning-at-scale",
    title: "Funscholar AI: Personalized learning at a national scale",
    category: "AI in Education",
    excerpt:
      "Inside India's first student intelligence platform — and how it's reshaping outcomes for millions.",
    readTime: "8 min read",
    date: "12 July 2026",
    author: "Funscholar Team",
    thumbnail: "/images/blogs/funscholar-ai-personalised-learning-at-scale.jpg",
    content: [
      {
        type: "p",
        text: "Personalised learning has been promised for a decade and delivered rarely. The gap is not ambition — it is arithmetic. A teacher with sixty students in a room cannot construct sixty learning paths, and no amount of enthusiasm changes that.",
      },
      {
        type: "p",
        text: "What can change is how much of the diagnosis happens before the lesson begins.",
      },
      { type: "h2", text: "The problem is diagnosis, not delivery" },
      {
        type: "p",
        text: "Most classrooms discover that a student has fallen behind weeks after it happened, usually through a test. By then the gap has compounded: the student has spent a month building on a foundation that was not there.",
      },
      {
        type: "p",
        text: "Continuous, low-stakes assessment changes the timeline. When a system observes which questions a student hesitates on, which they revisit, and which they abandon, it can surface a specific gap in days rather than weeks — and it can tell the teacher exactly which concept to revisit.",
      },
      {
        type: "quote",
        text: "The goal is not to replace the teacher's judgement. It is to give that judgement better information, sooner.",
      },
      { type: "h2", text: "What scale actually requires" },
      {
        type: "ul",
        items: [
          "Works on the devices schools already have, including shared tablets and low-bandwidth connections.",
          "Produces output a teacher can act on in a five-minute break, not a dashboard requiring training.",
          "Handles multiple languages of instruction without treating English as the default.",
          "Stores as little personal data as possible, and is explicit about what it stores.",
        ],
      },
      {
        type: "p",
        text: "That last point deserves more attention than it usually gets. Student data is among the most sensitive a country collects, and an education platform that treats it casually will eventually cost schools more than it saves them.",
      },
      { type: "h2", text: "What we have learned so far" },
      {
        type: "p",
        text: "The schools that see results treat the platform as an instrument rather than an answer. They use it to decide what to teach next week, and they keep the teaching itself firmly human. The technology is at its best when it is quietly informing a decision someone else makes.",
      },
    ],
  },
  {
    slug: "why-every-indian-school-needs-robotics-by-2026",
    title: "Why every Indian school needs a robotics program by 2026",
    category: "Robotics",
    excerpt:
      "From problem-solving to career readiness — the case for making robotics a core subject, not an elective.",
    readTime: "6 min read",
    date: "30 June 2026",
    author: "Funscholar Team",
    thumbnail: "/images/blogs/why-every-indian-school-needs-robotics-by-2026.jpg",
    content: [
      {
        type: "p",
        text: "Robotics is still treated as an enrichment activity in most Indian schools — a club that meets on Saturdays, funded from whatever is left over. That framing made sense when robotics was a specialism. It makes considerably less sense now.",
      },
      { type: "h2", text: "It is a thinking subject, not a technical one" },
      {
        type: "p",
        text: "The most valuable thing a student takes from building a robot is not the wiring. It is the habit of breaking a vague goal into steps a machine can follow, then debugging the steps when the goal is not met. That is the same discipline that underlies mathematics, writing and experimental science.",
      },
      {
        type: "p",
        text: "Students who spend a term on robotics tend to get better at a specific thing: staying with a problem that has not worked yet. In a system that rewards speed and correct answers, sustained productive struggle is unusually hard to teach — and robotics teaches it almost incidentally.",
      },
      {
        type: "quote",
        text: "A robot that does not work is not a failed project. It is the only kind of feedback that cannot be argued with.",
      },
      { type: "h2", text: "The policy case" },
      {
        type: "p",
        text: "NEP 2020 asks schools to build experiential, competency-based learning into the core curriculum rather than bolting it on. The Atal Tinkering Lab programme has already put equipment into thousands of schools. In many cases the infrastructure exists and the timetable has not caught up with it.",
      },
      {
        type: "ul",
        items: [
          "Lab equipment sitting unused is a more common problem than lack of equipment.",
          "Teacher confidence, not student ability, is usually the limiting factor.",
          "Programmes that survive are the ones with timetabled hours, not optional sessions.",
          "Assessment matters — what is not assessed is quietly treated as optional.",
        ],
      },
      { type: "h2", text: "What a serious programme looks like" },
      {
        type: "p",
        text: "A robotics programme worth running has scheduled hours, a teacher who has been trained rather than volunteered, and projects that end in something demonstrable. It does not need the most expensive kits available. It needs consistency, and it needs to be treated as a subject rather than a treat.",
      },
      {
        type: "p",
        text: "Schools that get this right rarely go back. The change shows up first in the students who were disengaged by conventional teaching — which is, after all, the point.",
      },
    ],
  },
];

/** Look up a single post by its URL slug. */
export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
