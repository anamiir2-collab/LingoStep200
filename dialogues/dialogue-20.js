import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 20,
  level: 2,
  title: "At the restaurant",
  titleAr: "في المطعم",
  groups:[
    {
      label: "Ordering",
      lines:[
        [
          "Waiter",
          "Good evening, sir. Can I help you?",
          "مساء الخير سيدي، هل يمكنني مساعدتك؟"
        ],
        [
          "Customer",
          "Have you got a table for two?",
          "هل لديك طاولة لشخصين؟"
        ],
        [
          "Waiter",
          "Yes sir, over here, by the window.",
          "نعم سيدي، هنا بجوار النافذة."
        ],
        [
          "Customer",
          "The menu, please.",
          "قائمة الطعام من فضلك."
        ],
        [
          "Customer",
          "Can I have a beef burger and a pizza please?",
          "هل يمكنني طلب برغر لحم بقري وبيتزا؟"
        ],
        [
          "Madam",
          "I'll have chicken and chips.",
          "سأطلب دجاجاً وبطاطس."
        ],
        [
          "Waiter",
          "Anything to drink?",
          "هل تريدان شيئاً للشرب؟"
        ],
        [
          "Customer",
          "An orange juice and a cup of coffee.",
          "عصير برتقال وفنجان قهوة."
        ],
        [
          "Customer",
          "Could you bring us the bill, please?",
          "هل يمكنك إحضار الفاتورة؟"
        ],
        [
          "Waiter",
          "That's one hundred eighty pounds.",
          "الحساب مائة وثمانون جنيهاً."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 20, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
