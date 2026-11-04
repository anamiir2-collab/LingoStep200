import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 25,
  level: 2,
  title: "It's colder than here",
  titleAr: "المقارنات والوصف",
  groups:[
    {
      label: "",
      lines:[
        [
          "Mike",
          "Where were you last week?",
          "أين كنتِ الأسبوع الماضي؟"
        ],
        [
          "Mary",
          "I was in Paris, the most romantic city in the world.",
          "كنت في باريس، أروع مدينة رومانسية في العالم."
        ],
        [
          "Mike",
          "What's the weather like there?",
          "كيف الطقس هناك؟"
        ],
        [
          "Mary",
          "Wonderful, but it is colder than here.",
          "رائع، لكنه أبرد من هنا."
        ],
        [
          "Mike",
          "What are the people like?",
          "وكيف يبدو الناس؟"
        ],
        [
          "Mary",
          "They are more romantic and friendlier than the people here.",
          "إنهم أكثر رومانسية ووداً من الناس هنا."
        ],
        [
          "Mike",
          "What's the food like?",
          "وماذا عن الطعام؟"
        ],
        [
          "Mary",
          "The food is fantastic, but more expensive.",
          "الطعام ممتاز لكنه أغلى ثمناً."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 25, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
