import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 41,
  level: 2,
  title: "Punctuation Marks / Job Interview",
  titleAr: "مقابلة وظيفية",
  groups:[
    {
      label: "",
      lines:[
        [
          "Interviewer",
          "Good morning, Miss Salwa. Please, take a seat.",
          "صباح الخير آنسة سلوى، تفضلي بالجلوس."
        ],
        [
          "Salwa",
          "Thank you.",
          "شكراً لك."
        ],
        [
          "Interviewer",
          "What are your qualifications?",
          "ما مؤهلاتك؟"
        ],
        [
          "Salwa",
          "I have a BSc in biology and chemistry.",
          "لدي بكالوريوس في الأحياء والكيمياء."
        ],
        [
          "Interviewer",
          "Have you got a driving license?",
          "هل لديك رخصة قيادة؟"
        ],
        [
          "Salwa",
          "Yes, I've got one.",
          "نعم، لدي رخصة."
        ],
        [
          "Interviewer",
          "Why are you applying for this post with us?",
          "لماذا تقدمت لهذه الوظيفة لدينا؟"
        ],
        [
          "Salwa",
          "Your company is well known and it is a great honour to be working in it.",
          "شركتكم معروفة وإنه لشرف كبير لي أن أعمل بها."
        ],
        [
          "Interviewer",
          "When would you like to start?",
          "متى يمكنك البدء؟"
        ],
        [
          "Salwa",
          "I'm ready to start at the time you fix.",
          "أنا مستعدة للبدء في الوقت الذي تحددونه."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 41, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
