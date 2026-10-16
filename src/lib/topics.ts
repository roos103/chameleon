import type { Destination, Level } from "./types";

export type Topic = {
  slug: string;
  title: string;
  emoji: string;
  color: "leaf" | "sun" | "coral" | "grape" | "sky";
  blurb: string;
  sections: { heading: string; points: string[] }[];
  phrases?: { say: string; when: string }[];
  destination?: Partial<Record<Destination, string>>;
  level?: Partial<Record<Level, string>>;
  tryThis: string;
};

export const TOPICS: Topic[] = [
  {
    slug: "class-participation",
    title: "Speaking up in class discussions",
    emoji: "🙋",
    color: "leaf",
    blurb: "Why your voice counts here, often literally, as part of your grade.",
    sections: [
      {
        heading: "What's expected",
        points: [
          "Many classes give a “participation” grade, sometimes 10–25% of the total. Being quiet can lower your grade even when your written work is excellent.",
          "Teachers usually want to hear your reasoning, not the one correct answer. A half-formed idea, explained clearly, is welcome.",
          "Students often jump in without being called on. Raising your hand is normal, but waiting for a long silence isn't required.",
          "Building on a classmate (“I agree with Maya, and I'd add…”) counts as participation too.",
        ],
      },
      {
        heading: "How to get started",
        points: [
          "Do the reading and write down one question or opinion before class. Then you have something ready.",
          "Aim to speak once in the first 10 minutes. It gets easier after the first time.",
          "Asking a question counts. “Could you explain the difference between X and Y?” is a great contribution.",
          "If speaking up in a big group is hard, tell your teacher. Many will let you start in small groups or online forums.",
        ],
      },
    ],
    phrases: [
      { say: "I see it a bit differently, because…", when: "Polite disagreement" },
      { say: "Building on what Sam said…", when: "Joining the conversation" },
      { say: "Can I ask a clarifying question?", when: "When you're lost" },
    ],
    level: {
      highschool: "In high school, teachers often call on quiet students to help them participate. It's meant kindly, not as a punishment.",
      university: "In university seminars, you may be expected to speak in almost every class. Big lectures are more relaxed, but sections or tutorials usually track participation.",
    },
    tryThis: "In your next class, ask one question or add one comment, even a short one.",
  },
  {
    slug: "asking-for-help",
    title: "Office hours & asking for help",
    emoji: "🤝",
    color: "sky",
    blurb: "Asking for help here shows initiative, not weakness.",
    sections: [
      {
        heading: "The local view on help",
        points: [
          "Teachers and professors expect questions. Many say the students who ask for help are the ones they remember most positively.",
          "“Office hours” are times set aside for students to drop in. You don't need a big problem. “I wanted to check I understood the reading” is a perfectly good reason to go.",
          "Schools offer lots of free support: writing centers, tutoring, math labs, librarians, counselors, and international student advisors.",
          "Asking for help early (before the exam, not after) is seen as responsible.",
        ],
      },
      {
        heading: "How to ask",
        points: [
          "Be specific: “I understood steps 1–3 but got lost at step 4.”",
          "Write a short, polite email: greeting, one-line question, thanks, your name and class.",
          "If you need an extension or accommodation, ask before the deadline and briefly explain why.",
        ],
      },
    ],
    phrases: [
      { say: "Do you have a few minutes to go over something I'm stuck on?", when: "After class" },
      { say: "Would it be possible to meet during office hours this week?", when: "Email" },
    ],
    level: {
      highschool: "Your school counselor is a great first stop for anything: classes, friends, or feeling homesick.",
      university: "Look for your International Student Office. They help with visas, work rules, and adjusting, and you can visit them anytime.",
    },
    tryThis: "Find out when one of your teachers holds office hours (or extra help) and put it in your calendar.",
  },
  {
    slug: "direct-communication",
    title: "Direct vs. indirect communication",
    emoji: "💬",
    color: "grape",
    blurb: "Decoding what people say, and what they actually mean.",
    sections: [
      {
        heading: "The general pattern",
        points: [
          "North Americans tend to say what they mean fairly directly, especially at school and work. “No, that doesn't work for me” isn't usually meant as rude.",
          "At the same time, there's a lot of softening: “This is great, but maybe consider…” often means “please change this.”",
          "Feedback is often a “sandwich”: something positive, then the criticism, then something positive. Focus on the middle part.",
          "Silence is often read as agreement. If you disagree or are confused, people may not notice unless you say so.",
        ],
      },
      {
        heading: "Common mix-ups",
        points: [
          "“We should get coffee sometime!” is often friendly, not a firm plan. If you'd like to go, suggest a specific day.",
          "“How are you?” is a greeting. “Good, you?” is the expected answer, not your full day.",
          "“That's interesting…” with a pause can mean polite doubt.",
          "Saying “no” to an extra task or a social plan is acceptable, especially with a short reason and a “thanks.”",
        ],
      },
    ],
    phrases: [
      { say: "Just to make sure I understand, you'd like me to…?", when: "Checking meaning" },
      { say: "Thanks for asking! I can't this time, but maybe next week.", when: "Saying no kindly" },
    ],
    destination: {
      US: "Americans are often very enthusiastic (“Amazing!”, “Love it!”). It's usually friendliness, not a sign of a deep commitment.",
      CA: "Canadians are known for politeness and apologizing (“Sorry!”) even for small things. Feedback may be extra softened, so listen carefully for the request.",
    },
    tryThis: "Next time you're unsure what someone meant, use a “Just to check…” question.",
  },
  {
    slug: "making-friends",
    title: "Making friends & small talk",
    emoji: "🎉",
    color: "coral",
    blurb: "Friendships here often start small and casual, and that's normal.",
    sections: [
      {
        heading: "How friendships usually form",
        points: [
          "People are often friendly quickly but become close friends slowly. A warm first chat doesn't always mean instant friendship, so keep showing up.",
          "Most friendships form around shared activities: clubs, sports, music, study groups, volunteering, religious groups, or dorm events.",
          "Inviting someone is normal and appreciated: “A few of us are getting lunch. Want to come?”",
          "It's fine to have friends from your home country and new friends from everywhere. Both help.",
        ],
      },
      {
        heading: "Small talk basics",
        points: [
          "Safe topics: classes, weekend plans, food, sports, music, shows, pets, the weather, where you're from.",
          "Usually avoided with new people: salary, weight or appearance, age, religion, and politics.",
          "Ask follow-up questions. People enjoy talking about their interests, and it keeps the chat going.",
          "Sharing a little about your home culture is a great conversation starter. Many students will be curious.",
        ],
      },
    ],
    phrases: [
      { say: "How's your week going?", when: "Opening line" },
      { say: "Are you going to the club fair? Want to go together?", when: "Making a plan" },
    ],
    level: {
      highschool: "Lunch, sports teams, and after-school clubs are the main social hubs. Joining one activity early makes a big difference.",
      university: "The first weeks (orientation, club fairs, residence events) are when everyone is looking for friends. Go to as many as you can.",
    },
    tryThis: "Sign up for one club or activity this month and go at least twice.",
  },
  {
    slug: "academic-expectations",
    title: "Deadlines, independence & academic integrity",
    emoji: "📚",
    color: "sun",
    blurb: "The unwritten rules of studying here, and the written ones too.",
    sections: [
      {
        heading: "How courses are structured",
        points: [
          "Your grade usually comes from many pieces: homework, quizzes, projects, participation, and exams. Small assignments add up.",
          "The syllabus (course outline) is like a contract. It lists every deadline and the rules. Read it in the first week.",
          "Late work often loses points automatically. Ask for an extension before the deadline, not after.",
          "You're expected to manage your own time. Teachers may not remind you about upcoming deadlines.",
        ],
      },
      {
        heading: "Academic integrity (very important)",
        points: [
          "Using someone else's words or ideas without citing them is plagiarism, even if you change a few words. Consequences can be serious.",
          "Rules about working together differ by class. Some allow collaboration on homework, others don't. When in doubt, ask.",
          "Check each course's policy on AI tools like ChatGPT. Some allow it, some ban it, many require you to say how you used it.",
          "The writing center or library can teach you how to cite in APA, MLA, or Chicago style.",
        ],
      },
    ],
    level: {
      highschool: "Teachers usually post homework online (Google Classroom, Canvas, etc.). Check it every day.",
      university: "A course might meet only 3 hours a week, but expect 6–9 hours of independent study outside class.",
    },
    tryThis: "Put every deadline from your syllabi into one calendar this week.",
  },
  {
    slug: "teachers-professors",
    title: "How to talk to teachers & professors",
    emoji: "🧑‍🏫",
    color: "leaf",
    blurb: "Friendly but respectful: the balance that works here.",
    sections: [
      {
        heading: "Relationships with teachers",
        points: [
          "Relationships are often more casual than students expect. Teachers may joke, share personal stories, or ask your opinion.",
          "Still, use a title until invited otherwise: “Mr./Ms. Lee” in high school, “Professor Lee” or “Dr. Lee” at university.",
          "If a professor says “Call me Sarah,” it's fine to do so.",
          "Disagreeing respectfully with a teacher, with reasons, is often welcomed rather than seen as disrespectful.",
        ],
      },
      {
        heading: "Email etiquette",
        points: [
          "Use a clear subject line: “ECON 101 – Question about Problem Set 3”.",
          "Start with “Dear Professor Lee,” or “Hi Ms. Lee,”. Keep it short, and end with thanks and your full name.",
          "Don't expect a reply within an hour. 1–2 school days is normal.",
        ],
      },
    ],
    level: {
      highschool: "Parents/guardians may be in contact with teachers too, through parent-teacher conferences or emails. That's normal here.",
      university: "Teaching assistants (TAs) often run sections and grade work. They're a great, approachable first contact.",
    },
    tryThis: "Introduce yourself to one teacher after class: your name, where you're from, and one thing you're excited about in the course.",
  },
  {
    slug: "everyday-life",
    title: "Everyday norms: tipping, time & personal space",
    emoji: "🧭",
    color: "sky",
    blurb: "The small daily customs that nobody explains, until now.",
    sections: [
      {
        heading: "Daily customs",
        points: [
          "Tipping at restaurants is expected, usually 15–20% of the bill. It's also common for haircuts, taxis, and food delivery.",
          "Being on time matters for class, appointments, and work. For casual parties, arriving 10–15 minutes late is usually fine.",
          "People tend to keep about an arm's length of personal space, and they line up (queue) for almost everything.",
          "“Please,” “thank you,” and “excuse me” are used constantly, even with strangers and service workers.",
        ],
      },
      {
        heading: "Before and right after you arrive",
        points: [
          "Get a local phone number and bank account early. Many things (apps, banking) depend on them.",
          "Learn how health care works at your school: health insurance, the campus clinic, and what to do in an emergency (call 911 in both the US and Canada).",
          "Keep copies of your passport, visa/study permit, and school documents somewhere safe.",
        ],
      },
    ],
    destination: {
      US: "Prices in stores usually don't include sales tax, so the total at the register will be higher. Health insurance is especially important, because care can be very expensive without it.",
      CA: "Sales tax (GST/HST) is added at the register too. Winters can be very cold. Ask locals where to buy a proper winter coat and boots, and don't wait until December.",
    },
    tryThis: "Find your school's health clinic and international student office on a map.",
  },
  {
    slug: "group-work",
    title: "Group projects that go well",
    emoji: "🧩",
    color: "grape",
    blurb: "Team assignments are common, and they're a skill you can learn.",
    sections: [
      {
        heading: "What teams expect",
        points: [
          "Everyone is expected to contribute and to share ideas, even before the group has agreed on a direction.",
          "Divide tasks clearly at the first meeting: who does what, by when.",
          "Disagreeing about ideas is normal and healthy. Just keep it about the work, not the person.",
          "If someone isn't contributing, talk to them first. If it doesn't improve, it's okay to tell the teacher.",
        ],
      },
      {
        heading: "Making it smooth",
        points: [
          "Suggest a shared doc and a group chat on day one. People will appreciate the organization.",
          "Volunteer for a role you're good at (research, slides, editing). It's an easy way to lead.",
          "If language makes fast discussions hard, ask for the plan in writing. Most teams welcome that.",
        ],
      },
    ],
    phrases: [
      { say: "Should we split this into parts and check in on Thursday?", when: "First meeting" },
      { say: "I like that idea. What if we also…", when: "Adding to someone's idea" },
    ],
    tryThis: "In your next group task, offer to set up the shared document or schedule.",
  },
];

export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);

export const COLOR_CLASSES: Record<Topic["color"], { bg: string; text: string; ring: string }> = {
  leaf: { bg: "bg-leaf-light", text: "text-leaf-dark", ring: "ring-leaf/30" },
  sun: { bg: "bg-sun-light", text: "text-amber-700", ring: "ring-sun/40" },
  coral: { bg: "bg-coral-light", text: "text-red-700", ring: "ring-coral/30" },
  grape: { bg: "bg-grape-light", text: "text-grape", ring: "ring-grape/30" },
  sky: { bg: "bg-sky-light", text: "text-sky", ring: "ring-sky/30" },
};
