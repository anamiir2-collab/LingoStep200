import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 27,
  level: 2,
  title: "The busiest street in the world",
  titleAr: "التفضيل والآراء",
  groups:[
    {
      label: "Situation 1",
      lines:[
        [
          "A",
          "Harold's street is very busy and very large.",
          "شارع هارولد مزدحم وواسع جداً."
        ],
        [
          "B",
          "It's the busiest and the largest street in the world.",
          "إنه الشارع الأكثر ازدحاماً والأكبر في العالم."
        ]
      ]
    },
    {
      label: "Situation 2",
      lines:[
        [
          "A",
          "What do you think about Nagy?",
          "ما رأيك في ناجي؟"
        ],
        [
          "B",
          "He is very stubborn and stupid.",
          "إنه عنيد وغبي جداً."
        ],
        [
          "A",
          "He is the most polite person in his family.",
          "إنه أكثر شخص مهذب في عائلته."
        ]
      ]
    },
    {
      label: "Situation 3",
      lines:[
        [
          "A",
          "Do you know Miss Mona?",
          "هل تعرف الآنسة مونا؟"
        ],
        [
          "B",
          "She's a very kind and sympathetic person.",
          "إنها لطيفة ومتعاطفة جداً."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 27, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
