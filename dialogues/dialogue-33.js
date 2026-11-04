import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 33,
  level: 2,
  title: "Have you ever been to Mexico?",
  titleAr: "السفر والرحلات",
  groups:[
    {
      label: "Situation 1",
      lines:[
        [
          "A",
          "Have you ever been to Mexico?",
          "هل ذهبت إلى المكسيك من قبل؟"
        ],
        [
          "B",
          "Yes, I have.",
          "نعم."
        ],
        [
          "A",
          "When did you go there?",
          "متى ذهبت إلى هناك؟"
        ],
        [
          "B",
          "Last year.",
          "العام الماضي."
        ]
      ]
    },
    {
      label: "Situation 2",
      lines:[
        [
          "A",
          "Have you ever been to Edinburgh?",
          "هل ذهبت إلى إدنبرة من قبل؟"
        ],
        [
          "B",
          "No, I haven't.",
          "لا، لم أذهب."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 33, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
