import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 37,
  level: 2,
  title: "There's a little but not much",
  titleAr: "التسوق والكميات",
  groups:[
    {
      label: "",
      lines:[
        [
          "Jane",
          "How much milk do we need?",
          "كم نحتاج من الحليب؟"
        ],
        [
          "Sarah",
          "Two pints.",
          "مكيالان."
        ],
        [
          "Jane",
          "And how many eggs?",
          "وكم بيضة؟"
        ],
        [
          "Sarah",
          "A dozen.",
          "دزينة."
        ],
        [
          "Jane",
          "How many tomatoes?",
          "كم نحتاج من الطماطم؟"
        ],
        [
          "Sarah",
          "A kilo is enough.",
          "كيلو واحد يكفي."
        ],
        [
          "Jane",
          "And butter, how much?",
          "والزبدة، كم نحتاج؟"
        ],
        [
          "Sarah",
          "Just one packet.",
          "عبوة واحدة فقط."
        ],
        [
          "Jane",
          "Do we need anything else?",
          "هل نحتاج شيئاً آخر؟"
        ],
        [
          "Sarah",
          "We've got some bananas but there aren't any grapes.",
          "لدينا بعض الموز لكن لا يوجد عنب."
        ],
        [
          "Jane",
          "What about coffee?",
          "وماذا عن القهوة؟"
        ],
        [
          "Sarah",
          "There is a little, but not much.",
          "يوجد القليل، لكن ليس الكثير."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 37, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
