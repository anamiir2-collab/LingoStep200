import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 44,
  level: 2,
  title: "What's... Like?",
  titleAr: "الشخصية والتفضيلات",
  groups:[
    {
      label: "",
      lines:[
        [
          "Sam",
          "Hi Peter. How is it going?",
          "مرحباً بيتر، كيف تسير الأمور؟"
        ],
        [
          "Peter",
          "Fine. Everything is fine.",
          "بخير، كل شيء على ما يرام."
        ],
        [
          "Sam",
          "Where were you yesterday evening?",
          "أين كنت مساء الأمس؟"
        ],
        [
          "Peter",
          "I went to the airport to pick up my Italian friend. She came yesterday.",
          "ذهبت إلى المطار لاستقبال صديقتي الإيطالية، لقد وصلت أمس."
        ],
        [
          "Sam",
          "What's her name?",
          "ما اسمها؟"
        ],
        [
          "Peter",
          "Clara Nisi.",
          "كلارا نيسي."
        ],
        [
          "Sam",
          "What a pretty name! What's she like?",
          "يا له من اسم جميل! كيف هي؟"
        ],
        [
          "Peter",
          "She's really nice. I'm sure we will get on really well. We seem to have a lot in common.",
          "إنها لطيفة جداً، وأنا متأكد أننا سنتوافق. يبدو أن لدينا الكثير من الأمور المشتركة."
        ],
        [
          "Sam",
          "What does she like doing?",
          "ماذا تحب أن تفعل؟"
        ],
        [
          "Peter",
          "She likes dancing and so do I. And we both like going out and skiing.",
          "تحب الرقص وأنا كذلك، وكلانا يحب الخروج والتزلج."
        ],
        [
          "Sam",
          "What does she look like?",
          "كيف يبدو مظهرها؟"
        ],
        [
          "Peter",
          "She's quite tall, and has got long hair.",
          "إنها طويلة نوعاً ما ولديها شعر طويل."
        ],
        [
          "Peter",
          "I'll ask her and tell you tomorrow. How is your mum now?",
          "سأسألها وأخبرك غداً. كيف حال والدتك الآن؟"
        ],
        [
          "Sam",
          "She's ok now. She has had a bad stomachache, but she's getting better now.",
          "إنها بخير الآن. عانت من ألم شديد في المعدة لكنها تتحسن."
        ],
        [
          "Peter",
          "Send her my love. See you, bye.",
          "أبلغها سلامي. أراك لاحقاً، وداعاً."
        ],
        [
          "Sam",
          "Bye.",
          "وداعاً."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 44, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
