import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 40,
  level: 2,
  title: "It's a lovely day, isn't it?",
  titleAr: "الأسئلة المذيلة",
  groups:[
    {
      label: "",
      lines:[
        [
          "A",
          "It's a lovely day, isn't it?",
          "إنه يوم جميل، أليس كذلك؟"
        ],
        [
          "B",
          "Yes, it's brilliant.",
          "نعم، إنه رائع."
        ],
        [
          "A",
          "Look! These flowers are nice, aren't they?",
          "انظر! هذه الزهور جميلة، أليست كذلك؟"
        ],
        [
          "B",
          "Yes, what are they?",
          "نعم، ما نوعها؟"
        ],
        [
          "A",
          "You haven't got a car, have you?",
          "ليس لديك سيارة، أليس كذلك؟"
        ],
        [
          "B",
          "No, I can't drive.",
          "لا، لا أستطيع القيادة."
        ],
        [
          "A",
          "You won't tell anybody what I said, will you?",
          "لن تخبر أحداً بما قلته، أليس كذلك؟"
        ],
        [
          "B",
          "No, of course not.",
          "لا، بالطبع لا."
        ],
        [
          "A",
          "You will help me, won't you?",
          "ستساعدني، أليس كذلك؟"
        ],
        [
          "B",
          "Yes, of course I will.",
          "نعم، بالطبع سأفعل."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 40, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
