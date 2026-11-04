import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 23,
  level: 2,
  title: "What's the date today?",
  titleAr: "تاريخ اليوم",
  groups:[
    {
      label: "",
      lines:[
        [
          "Mike",
          "Happy Valentine!",
          "عيد حب سعيد!"
        ],
        [
          "Peter",
          "What is the date today?",
          "ما تاريخ اليوم؟"
        ],
        [
          "Mike",
          "It's the fourteenth of February.",
          "إنه الرابع عشر من فبراير."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 23, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
