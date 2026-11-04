import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 35,
  level: 2,
  title: "The negative",
  titleAr: "النفي",
  groups:[
    {
      label: "Situation 1",
      lines:[
        [
          "Ahmed",
          "Could you lend me some money?",
          "هل تستطيع إقراضي بعض المال؟"
        ],
        [
          "Ramez",
          "Sorry! I haven't got any money.",
          "للأسف ليس معي أي نقود."
        ]
      ]
    },
    {
      label: "Situation 2",
      lines:[
        [
          "A",
          "Would you like some tea?",
          "هل ترغب في الشاي؟"
        ],
        [
          "B",
          "Yes, please. No sugar, thanks.",
          "نعم من فضلك، من دون سكر."
        ]
      ]
    },
    {
      label: "Situation 3",
      lines:[
        [
          "X",
          "How many legs has a snake got?",
          "كم عدد أرجل الثعبان؟"
        ],
        [
          "Y",
          "None, of course.",
          "ليس لديه أي أرجل بالطبع."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 35, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
