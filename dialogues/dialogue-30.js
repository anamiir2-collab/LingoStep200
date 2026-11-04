import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 30,
  level: 2,
  title: "What are you going to do on Christmas Day?",
  titleAr: "المناسبات والتمنيات",
  groups:[
    {
      label: "Situation 1",
      lines:[
        [
          "Mike",
          "It's midnight. Happy New Year everybody!",
          "منتصف الليل الآن، سنة جديدة سعيدة للجميع!"
        ],
        [
          "All",
          "Happy New Year!",
          "سنة جديدة سعيدة!"
        ]
      ]
    },
    {
      label: "Situation 2",
      lines:[
        [
          "A",
          "Have you got any Valentine's cards?",
          "هل لديك بطاقات لعيد الحب؟"
        ],
        [
          "B",
          "Roses are red, violets are blue. You are my valentine and I love you.",
          "الورد أحمر والبنفسج أزرق، أنت حبيبي وأنا أحبك."
        ],
        [
          "A",
          "Who sent it?",
          "من أرسلها؟"
        ],
        [
          "B",
          "I don't know.",
          "لا أعلم."
        ]
      ]
    },
    {
      label: "Situation 3",
      lines:[
        [
          "A",
          "When's Christmas Day?",
          "متى عيد الميلاد؟"
        ],
        [
          "B",
          "It's on the 24th of December.",
          "في الرابع والعشرين من ديسمبر."
        ],
        [
          "A",
          "What are you going to do on this holiday?",
          "ماذا ستفعل في هذه العطلة؟"
        ],
        [
          "B",
          "I'm going to spend the day outdoors with my friends.",
          "سأقضي اليوم في الهواء الطلق مع أصدقائي."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 30, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
