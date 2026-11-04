import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 39,
  level: 2,
  title: "If I were you",
  titleAr: "تقديم النصيحة",
  groups:[
    {
      label: "",
      lines:[
        [
          "A",
          "I need some advice.",
          "أحتاج إلى نصيحة."
        ],
        [
          "B",
          "I can help you.",
          "أستطيع مساعدتك."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 39, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
