import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 29,
  level: 2,
  title: "There aren't many biscuits",
  titleAr: "المطبخ والمشتريات",
  groups:[
    {
      label: "",
      lines:[
        [
          "Chris",
          "Have we got any bread?",
          "هل لدينا أي خبز؟"
        ],
        [
          "Laura",
          "Yes, we've got some.",
          "نعم، لدينا بعضه."
        ],
        [
          "Chris",
          "How much bread have we got?",
          "كم لدينا من الخبز؟"
        ],
        [
          "Laura",
          "One loaf.",
          "رغيف واحد."
        ],
        [
          "Chris",
          "There aren't many biscuits but we've got a lot of crisps.",
          "لا يوجد الكثير من البسكويت، لكن لدينا الكثير من رقائق البطاطس."
        ],
        [
          "Laura",
          "Ok. We'll get some biscuits. What about peas?",
          "حسناً، سنحضر بعض البسكويت. وماذا عن البازلاء؟"
        ],
        [
          "Chris",
          "There aren't many peas.",
          "لا توجد بازلاء كثيرة."
        ],
        [
          "Laura",
          "Ok. Is there much rice?",
          "حسناً، هل يوجد الكثير من الأرز؟"
        ],
        [
          "Chris",
          "No, there isn't much rice, we'll buy some.",
          "لا، لا يوجد الكثير من الأرز، سنشتري بعضاً منه."
        ],
        [
          "Laura",
          "How much rice do we need?",
          "كم نحتاج من الأرز؟"
        ],
        [
          "Chris",
          "Two packs.",
          "عبوتان."
        ],
        [
          "Laura",
          "Have we got any milk?",
          "هل لدينا حليب؟"
        ],
        [
          "Chris",
          "No, we've got to buy some.",
          "لا، علينا شراء بعضه."
        ],
        [
          "Laura",
          "How many boxes of milk?",
          "كم علبة حليب؟"
        ],
        [
          "Chris",
          "Four boxes.",
          "أربع علب."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 29, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
