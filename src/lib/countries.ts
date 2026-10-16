// Country-specific bridge notes. These describe patterns *some* students notice,
// never rules about who a student is. Their own answers always come first.

export type CountryNote = { notice: string[] };

export const COUNTRY_NOTES: Record<string, CountryNote> = {
  BR: {
    notice: [
      "Physical greetings like hugs and cheek kisses are less common, especially with people you've just met. A smile, a wave, or a handshake is typical.",
      "Classes and meetings usually start exactly on time, even when social plans are more relaxed.",
      "People can feel friendly but a bit reserved at first. Close friendships may take longer to build than you're used to.",
    ],
  },
  CN: {
    notice: [
      "Class discussion and questioning the teacher are often actively encouraged and graded.",
      "Group work and individual opinions are both valued. Saying “I think…” in class is normal.",
      "Citation rules can be stricter than students expect. Check every syllabus for its academic integrity policy.",
    ],
  },
  IN: {
    notice: [
      "Teachers are often addressed less formally, and some professors prefer first names.",
      "Continuous assessment (many smaller assignments) can matter as much as final exams.",
      "Head movements and indirect “yes” can be misread, so a clear verbal “yes” or “no” helps avoid confusion.",
    ],
  },
  KR: {
    notice: [
      "The hierarchy between older and younger students is less visible. Classmates of different ages usually interact as equals.",
      "Asking questions in class and speaking before you're sure of the answer are usually seen positively.",
      "Social life often revolves around clubs and activities more than set friend groups from your year.",
    ],
  },
  JP: {
    notice: [
      "Silence in a conversation is often filled quickly, and long pauses can be read as disinterest.",
      "Opinions are expected to be stated more explicitly, especially in class.",
      "Casual friendliness from teachers and staff is common and doesn't mean rules are relaxed.",
    ],
  },
  MX: {
    notice: [
      "Greetings tend to be less physical, and personal space is often a bit larger.",
      "Deadlines for school and work are usually treated as firm.",
      "Spanish speakers are common in many areas, which can help you find community.",
    ],
  },
  NG: {
    notice: [
      "Teachers may prefer a more casual relationship. Using first names at university isn't unusual when invited.",
      "Direct eye contact is generally read as confidence and honesty.",
      "Asking for extensions or extra help is normal when done before the deadline.",
    ],
  },
  SA: {
    notice: [
      "Many classes are mixed-gender, and group work often means teaming up with anyone in the class.",
      "Schools usually have quiet or prayer rooms. Ask the international or student life office where they are.",
      "Food labeling (including halal options) varies, so campus dining staff can help you find options.",
    ],
  },
  VN: {
    notice: [
      "Students are often expected to question ideas and share opinions, even in front of the teacher.",
      "Tutoring and writing centers are free and widely used. There's no stigma in going.",
      "Small talk with strangers (in elevators, lines, and stores) is common and friendly.",
    ],
  },
  DE: {
    notice: [
      "Communication can feel a bit less blunt than you're used to. Criticism is often softened with compliments.",
      "Small talk and enthusiasm are a big part of social life, even with people you've just met.",
      "Grades are usually built from many assignments across the term, not mostly the final exam.",
    ],
  },
};

export const hasCountryNotes = (code: string) => code in COUNTRY_NOTES;
