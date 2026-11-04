import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 43,
  level: 2,
  title: "Phone conversations",
  titleAr: "مكالمات هاتفية",
  groups:[
    {
      label: "Call 1",
      lines:[
        [
          "A",
          "Hello.",
          "مرحباً."
        ],
        [
          "B",
          "Hello. Is that Sandy?",
          "مرحباً، هل هذه ساندي؟"
        ],
        [
          "A",
          "No, I'm afraid she's out at the moment. Can I take a message?",
          "هي بالخارج حالياً. هل يمكنني أخذ رسالة؟"
        ],
        [
          "B",
          "Can you tell her that Clare phoned, and I'll try again later? Do you know what time she'll be back?",
          "أخبريها أن كلار اتصلت وسأحاول لاحقاً. هل تعرفين متى ستعود؟"
        ],
        [
          "A",
          "In about an hour, I think.",
          "خلال ساعة تقريباً على ما أعتقد."
        ],
        [
          "B",
          "Thanks. Good bye.",
          "شكراً، وداعاً."
        ],
        [
          "A",
          "Good bye.",
          "وداعاً."
        ]
      ]
    },
    {
      label: "Call 2",
      lines:[
        [
          "A",
          "Hello. 793421.",
          "مرحباً، رقم 793421."
        ],
        [
          "B",
          "Hello John. This is Sam.",
          "أهلاً جون، معك سام."
        ],
        [
          "A",
          "Hi, Sam. How are you?",
          "أهلاً سام، كيف حالك؟"
        ],
        [
          "B",
          "Fine, thanks, and you?",
          "بخير شكراً، وأنت؟"
        ],
        [
          "A",
          "Did you have a nice weekend? You went away, didn't you?",
          "هل قضيت عطلة أسبوع جيدة؟ لقد سافرت، أليس كذلك؟"
        ],
        [
          "B",
          "Yes, I went to London. It was lovely. I had a good time.",
          "نعم، ذهبت إلى لندن. كانت رائعة وقضيت وقتاً ممتعاً."
        ],
        [
          "B",
          "Can I borrow your racket? Mine is broken.",
          "هل أستعير مضربك؟ مضربي مكسور."
        ],
        [
          "A",
          "Sure.",
          "بالتأكيد."
        ],
        [
          "B",
          "I'll come and get it in half an hour.",
          "سآتي لآخذه بعد نصف ساعة."
        ],
        [
          "A",
          "Ok, I'll be in.",
          "حسناً، سأكون في المنزل."
        ],
        [
          "B",
          "Ok. Bye.",
          "حسناً، إلى اللقاء."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 43, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
