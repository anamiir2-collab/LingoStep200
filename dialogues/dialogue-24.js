import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 24,
  level: 2,
  title: "At the dentist",
  titleAr: "عند طبيب الأسنان",
  groups:[
    {
      label: "",
      lines:[
        [
          "Doctor",
          "Good morning. What's the problem?",
          "صباح الخير. ما المشكلة؟"
        ],
        [
          "Ahmed",
          "Well, my tooth hurts and I've got a bad headache.",
          "ضِرسي يؤلمني، ولدي صداع شديد."
        ],
        [
          "Doctor",
          "I see. Does it hurt very badly?",
          "فهمت. هل الألم شديد جداً؟"
        ],
        [
          "Ahmed",
          "Yes, too much all the time.",
          "نعم، طوال الوقت."
        ],
        [
          "Doctor",
          "How long have you had this?",
          "منذ متى وأنت تعاني من هذا؟"
        ],
        [
          "Ahmed",
          "Two days ago.",
          "منذ يومين."
        ],
        [
          "Doctor",
          "Yes, right. I'd like to examine you.",
          "حسناً، أود أن أفحصك."
        ],
        [
          "Ahmed",
          "Does it look too bad?",
          "هل يبدو الأمر سيئاً للغاية؟"
        ],
        [
          "Doctor",
          "No, it doesn't. Here's a prescription for some medicine.",
          "لا، تفضل هذه وصفة لبعض الدواء."
        ],
        [
          "Ahmed",
          "If it hurts me again?",
          "ماذا لو آلمني مجدداً؟"
        ],
        [
          "Doctor",
          "Call me immediately if you are not better by the day after tomorrow.",
          "اتصل بي فوراً إذا لم تتحسن بعد غد."
        ],
        [
          "Ahmed",
          "Thank you doc.",
          "شكراً يا دكتور."
        ],
        [
          "Doctor",
          "Good bye.",
          "إلى اللقاء."
        ],
        [
          "Ahmed",
          "Good bye.",
          "إلى اللقاء."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 24, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
