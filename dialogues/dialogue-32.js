import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 32,
  level: 2,
  title: "They've gone to the cinema",
  titleAr: "التأخير عن المنزل",
  groups:[
    {
      label: "",
      lines:[
        [
          "Mom",
          "What time is it?",
          "كم الساعة؟"
        ],
        [
          "Dad",
          "It's seven o'clock. I've just looked at my watch.",
          "الساعة السابعة. نظرت إلى ساعتي للتو."
        ],
        [
          "Mom",
          "Are the children still out?",
          "هل ما زال الأطفال في الخارج؟"
        ],
        [
          "Dad",
          "They haven't come back yet.",
          "لم يعودوا بعد."
        ],
        [
          "Mom",
          "How long have they been out?",
          "منذ متى وهم في الخارج؟"
        ],
        [
          "Dad",
          "I've given them permission to stay out a little late today.",
          "سمحت لهم بالبقاء خارجاً لوقت متأخر قليلاً اليوم."
        ],
        [
          "Mom",
          "They've stayed out for about three hours, why?",
          "بقوا في الخارج نحو ثلاث ساعات، لماذا؟"
        ],
        [
          "Dad",
          "They've gone to the cinema.",
          "لقد ذهبوا إلى السينما."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 32, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
