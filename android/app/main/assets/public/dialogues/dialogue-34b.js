import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 34,
  level: 2,
  title: "Holiday plans",
  titleAr: "خطط الإجازة",
  groups:[
    {
      label: "",
      lines:[
        [
          "Peter",
          "We are planning a holiday.",
          "نخطط لقضاء عطلة."
        ],
        [
          "Agent",
          "What about Tunisia?",
          "ما رأيك في تونس؟"
        ],
        [
          "Peter",
          "We have been there already.",
          "لقد زرناها من قبل."
        ],
        [
          "Agent",
          "Have you visited Sudan?",
          "هل زرت السودان؟"
        ],
        [
          "Peter",
          "No, I haven't.",
          "لا، لم أزره."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 34, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
