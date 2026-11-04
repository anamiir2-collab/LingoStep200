import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 28,
  level: 2,
  title: "It's going to rain",
  titleAr: "التنبؤ بالمستقبل",
  groups:[
    {
      label: "",
      lines:[
        [
          "A",
          "Where's Jack?",
          "أين جاك؟"
        ],
        [
          "B",
          "Look! He's on the wall. He's going to fall.",
          "انظر! إنه فوق السور، وسوف يسقط."
        ],
        [
          "A",
          "Hurry up! You're going to be late.",
          "أسرع! سوف تتأخر."
        ],
        [
          "A",
          "She's going to marry John.",
          "سوف تتزوج جون."
        ],
        [
          "A",
          "The team is bad today.",
          "الفريق سيئ اليوم."
        ],
        [
          "B",
          "They are going to lose the match.",
          "سوف يخسرون المباراة."
        ],
        [
          "A",
          "Look at those black clouds.",
          "انظر إلى هذه السحب السوداء."
        ],
        [
          "B",
          "It's going to rain.",
          "إنها سوف تمطر."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 28, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
