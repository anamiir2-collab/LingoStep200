import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 22,
  level: 2,
  title: "At what time did you come home?",
  titleAr: "السؤال عن العودة",
  groups:[
    {
      label: "",
      lines:[
        [
          "Father",
          "At what time did you come home last night?",
          "متى عدت إلى المنزل الليلة الماضية؟"
        ],
        [
          "Jacky",
          "Oh! I don't know. About twelve o'clock.",
          "لا أعلم، حوالي الساعة الثانية عشرة."
        ],
        [
          "Father",
          "But I didn't hear you.",
          "ولكنني لم أسمعك."
        ],
        [
          "Jacky",
          "Well, I came in quietly. I didn't want to wake you up.",
          "دخلت بهدوء لأنني لم أرد إيقاظك."
        ],
        [
          "Father",
          "Where did you go?",
          "أين ذهبت؟"
        ],
        [
          "Jacky",
          "I went to a folk concert.",
          "ذهبت إلى حفل موسيقى شعبية."
        ],
        [
          "Father",
          "With whom did you go?",
          "ومع من ذهبت؟"
        ],
        [
          "Jacky",
          "I went with Alice and Mary.",
          "ذهبت مع أليس وماري."
        ],
        [
          "Father",
          "Why did you come back so late? A concert doesn't go on till midnight.",
          "لماذا عدت متأخراً؟ الحفل لا يستمر حتى منتصف الليل."
        ],
        [
          "Jacky",
          "Yes, but I went to Alice's house, and we had coffee. Then we started talking about politics.",
          "ذهبت إلى منزل أليس وشربنا القهوة ثم بدأنا الحديث عن السياسة."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 22, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
