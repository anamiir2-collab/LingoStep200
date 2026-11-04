import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 31,
  level: 2,
  title: "The train is coming soon",
  titleAr: "القرارات السريعة",
  groups:[
    {
      label: "Situation 1",
      lines:[
        [
          "Mary",
          "John, the phone is ringing.",
          "جون، الهاتف يرن."
        ],
        [
          "John",
          "Ok, I'll answer it.",
          "حسناً، سأجيب عليه."
        ]
      ]
    },
    {
      label: "Situation 2",
      lines:[
        [
          "A",
          "I don't have money.",
          "ليس معي مال."
        ],
        [
          "B",
          "All right, I'll lend you some.",
          "حسناً، سأقرضك بعضاً."
        ],
        [
          "A",
          "That's very kind of you.",
          "هذا لطف كبير منك."
        ],
        [
          "B",
          "Don't mention it.",
          "لا شكر على واجب."
        ]
      ]
    },
    {
      label: "Situation 3",
      lines:[
        [
          "A",
          "You know, Max is ill.",
          "تعلم، ماكس مريض."
        ],
        [
          "B",
          "Really! I'll visit him tomorrow.",
          "حقاً! سأزوره غداً."
        ]
      ]
    },
    {
      label: "Situation 4",
      lines:[
        [
          "A",
          "Today is Sarah's birthday.",
          "اليوم عيد ميلاد سارة."
        ],
        [
          "B",
          "I know. I am going to bring her a necklace.",
          "أعرف، سأحضر لها قلادة."
        ]
      ]
    },
    {
      label: "Situation 5",
      lines:[
        [
          "A",
          "When will the train arrive?",
          "متى سيصل القطار؟"
        ],
        [
          "B",
          "It's coming soon.",
          "سيصل قريباً."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 31, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
