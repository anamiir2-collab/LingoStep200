import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 38,
  level: 2,
  title: "You have to pay for the prescription",
  titleAr: "استشارة الطبيب",
  groups:[
    {
      label: "",
      lines:[
        [
          "Doctor",
          "Hello. Come and sit down. What seems to be the matter?",
          "مرحباً، تفضل بالجلوس. ما المشكلة؟"
        ],
        [
          "Manuel",
          "Well, I haven't felt very well for a few days. I've got a bit of a temperature, and I just feel terrible.",
          "لم أشعر أنني بخير منذ أيام، لدي ارتفاع بسيط في الحرارة وأشعر بسوء."
        ],
        [
          "Doctor",
          "Have you felt sick?",
          "هل شعرت بالغثيان؟"
        ],
        [
          "Manuel",
          "I've been sick a few times.",
          "تقيأت بضع مرات."
        ],
        [
          "Doctor",
          "Well, your glands aren't swollen. Have you got a sore throat?",
          "الغدد ليست متورمة. هل لديك التهاب في الحلق؟"
        ],
        [
          "Manuel",
          "No, I haven't.",
          "لا."
        ],
        [
          "Doctor",
          "Have you had diarrhea at all?",
          "هل عانيت من الإسهال؟"
        ],
        [
          "Manuel",
          "Yes, I have actually.",
          "نعم، في الحقيقة."
        ],
        [
          "Doctor",
          "Have you had anything to eat recently?",
          "هل أكلت شيئاً مؤخراً؟"
        ],
        [
          "Manuel",
          "I went to a barbecue and the chicken wasn't well cooked.",
          "ذهبت إلى حفلة شواء وكان الدجاج غير مطهو جيداً."
        ],
        [
          "Doctor",
          "You should have a day or two in bed. I'll write you a prescription.",
          "عليك البقاء في الفراش يوماً أو يومين. سأكتب لك وصفة طبية."
        ],
        [
          "Manuel",
          "Thank you. Do I have to pay you?",
          "شكراً. هل يجب أن أدفع لك؟"
        ],
        [
          "Doctor",
          "No, seeing me is free, but you have to pay for the prescription. It's £6.",
          "الكشف مجاني، لكن عليك دفع ثمن الوصفة في الصيدلية، وهو 6 جنيهات إسترلينية."
        ],
        [
          "Manuel",
          "Right, thank you.",
          "حسناً، شكراً لك."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 38, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
