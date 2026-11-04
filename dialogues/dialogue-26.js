import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 26,
  level: 2,
  title: "Comparisons",
  titleAr: "المقارنات السريعة",
  groups:[
    {
      label: "",
      lines:[
        [
          "A",
          "My house is bigger than yours.",
          "بيتي أكبر من بيتك."
        ],
        [
          "B",
          "But your house is older than mine.",
          "ولكن بيتك أقدم من بيتي."
        ],
        [
          "A",
          "My dress is newer than yours.",
          "فستاني أحدث من فستانك."
        ],
        [
          "B",
          "But my dress is more expensive.",
          "ولكن فستاني أغلى ثمناً."
        ],
        [
          "A",
          "I am taller than you.",
          "أنا أطول منك."
        ],
        [
          "B",
          "But I am stronger than you.",
          "ولكنني أقوى منك."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 26, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
