import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 21,
  level: 2,
  title: "I didn't sleep well last night",
  titleAr: "السهر والحفلات",
  groups:[
    {
      label: "",
      lines:[
        [
          "Hossam",
          "You look tired.",
          "تبدو متعباً."
        ],
        [
          "Sami",
          "Yes, I didn't sleep well last night.",
          "نعم، لم أنم جيداً الليلة الماضية."
        ],
        [
          "Hossam",
          "Why?",
          "لماذا؟"
        ],
        [
          "Sami",
          "Because I went to Hadi's party.",
          "لأني ذهبت إلى حفلة هادي."
        ],
        [
          "Hossam",
          "Did you spend a long time there?",
          "هل قضيت وقتاً طويلاً هناك؟"
        ],
        [
          "Sami",
          "Yes, I came back at 3 o'clock in the morning.",
          "نعم، عدت عند الثالثة صباحاً."
        ],
        [
          "Hossam",
          "Did you find a taxi?",
          "هل وجدت سيارة أجرة؟"
        ],
        [
          "Sami",
          "No, I didn't. But one of my friends gave me a lift.",
          "لا، لكن أحد أصدقائي أوصلني بسيارته."
        ],
        [
          "Hossam",
          "I'll leave you now. Sleep well!",
          "سأتركك الآن. نم جيداً!"
        ],
        [
          "Sami",
          "Thank you.",
          "شكراً لك."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 21, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
