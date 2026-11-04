import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 36,
  level: 2,
  title: "Would you like some tea?",
  titleAr: "الضيافة",
  groups:[
    {
      label: "",
      lines:[
        [
          "Mary",
          "Would you like some tea?",
          "هل ترغب في احتساء الشاي؟"
        ],
        [
          "Mike",
          "I'd like a cold drink, please.",
          "أرغب في مشروب بارد من فضلك."
        ],
        [
          "Mary",
          "Would you like some orange juice?",
          "ما رأيك في عصير البرتقال؟"
        ],
        [
          "Mike",
          "Yes, please. I'd love some.",
          "نعم من فضلك، أحب ذلك."
        ],
        [
          "Mary",
          "Would you like a biscuit?",
          "هل ترغب في بعض البسكويت؟"
        ],
        [
          "Mike",
          "No, thanks. Just orange juice.",
          "لا شكراً، عصير فقط."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 36, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
