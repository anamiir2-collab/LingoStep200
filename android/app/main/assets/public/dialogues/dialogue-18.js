import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: "lesson-018",
  dialogueId: 18,
  level: 2,
  title: "Can you spell your name?",
  titleAr: "التهجئة والجمارك",
  section: "daily-life",
  level: "A1",
  estimatedMinutes: 9,
  objectives: [
    "Understand and use key expressions about can you spell your name?.",
    "Practice listening, sentence building, and everyday vocabulary from the dialogue.",
    "Use the dialogue phrases in a short real-life conversation."
  ],
  grammar: {
    explanation: "In this lesson, learn common expressions used for can you spell your name?. Notice the word order and the way each speaker asks or answers questions. Read each example aloud and compare it with the Arabic meaning.",
    explanationAr: "في هذا الدرس هتتعلم التعبيرات الأساسية المرتبطة بموضوع «التهجئة والجمارك». لاحظ ترتيب الكلمات وطريقة السؤال والإجابة في كل جملة، واقرأ الأمثلة بصوت عالٍ مع مقارنة معناها بالعربية.",
    examples: [
      {
        "en": "What's that, sir? I can't understand you.",
        "ar": "ما هذا يا سيدي؟ لا أستطيع فهمك."
      },
      {
        "en": "Pardon!",
        "ar": "عفواً!"
      },
      {
        "en": "Can you speak English?",
        "ar": "هل تستطيع التحدث بالإنجليزية؟"
      }
    ]
  },
  vocabulary: [
    {
      "word": "Pardon",
      "meaningAr": "عفواً!",
      "example": "Pardon!"
    },
    {
      "word": "Can you speak English",
      "meaningAr": "هل تستطيع التحدث بالإنجليزية؟",
      "example": "Can you speak English?"
    },
    {
      "word": "Yes I can speak English",
      "meaningAr": "نعم، أستطيع التحدث بالإنجليزية.",
      "example": "Yes, I can speak English."
    },
    {
      "word": "Well what's your name",
      "meaningAr": "حسناً، ما اسمك؟",
      "example": "Well, what's your name?"
    },
    {
      "word": "James Walkman",
      "meaningAr": "جيمس واكمان.",
      "example": "James Walkman."
    },
    {
      "word": "Can you spell it please",
      "meaningAr": "هل تستطيع تهجئة اسمك من فضلك؟",
      "example": "Can you spell it, please?"
    },
    {
      "word": "James J-A-M-E-S Walkman W-A-L-K-M-A-N",
      "meaningAr": "جيمس J-A-M-E-S. واكمان W-A-L-K-M-A-N.",
      "example": "James, J-A-M-E-S. Walkman, W-A-L-K-M-A-N."
    },
    {
      "word": "Yes here you are",
      "meaningAr": "نعم، تفضل.",
      "example": "Yes, here you are."
    }
  ],
  exercises: [
    {
      "type": "listen-and-type",
      "en": "What's that, sir? I can't understand you.",
      "ar": "ما هذا يا سيدي؟ لا أستطيع فهمك.",
      "difficulty": 1,
      "acceptedAnswers": [
        "What's that, sir? I can't understand you."
      ],
      "id": "lesson-018-ex-001",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "Pardon!",
      "ar": "عفواً!",
      "difficulty": 1,
      "acceptedAnswers": [
        "Pardon!"
      ],
      "id": "lesson-018-ex-002",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "Can you speak English?",
      "ar": "هل تستطيع التحدث بالإنجليزية؟",
      "difficulty": 1,
      "acceptedAnswers": [
        "Can you speak English?"
      ],
      "id": "lesson-018-ex-003",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "Yes, I can speak English.",
      "ar": "نعم، أستطيع التحدث بالإنجليزية.",
      "difficulty": 1,
      "acceptedAnswers": [
        "Yes, I can speak English."
      ],
      "id": "lesson-018-ex-004",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "fill-blank",
      "en": "What's that, sir? I can't understand you.",
      "ar": "ما هذا يا سيدي؟ لا أستطيع فهمك.",
      "display": "___ that, sir? I can't understand you.",
      "blankWord": "What's",
      "acceptedAnswers": [
        "What's"
      ],
      "difficulty": 1,
      "id": "lesson-018-ex-005",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "fill-blank",
      "en": "Pardon!",
      "ar": "عفواً!",
      "display": "___!",
      "blankWord": "Pardon",
      "acceptedAnswers": [
        "Pardon"
      ],
      "difficulty": 1,
      "id": "lesson-018-ex-006",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "fill-blank",
      "en": "Can you speak English?",
      "ar": "هل تستطيع التحدث بالإنجليزية؟",
      "display": "___ you speak English?",
      "blankWord": "Can",
      "acceptedAnswers": [
        "Can"
      ],
      "difficulty": 1,
      "id": "lesson-018-ex-007",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "word-order",
      "en": "What's that, sir? I can't understand you.",
      "ar": "ما هذا يا سيدي؟ لا أستطيع فهمك.",
      "words": [
        "you",
        "understand",
        "can't",
        "I",
        "sir?",
        "that,",
        "What's"
      ],
      "difficulty": 2,
      "id": "lesson-018-ex-008",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "word-order",
      "en": "Can you speak English?",
      "ar": "هل تستطيع التحدث بالإنجليزية؟",
      "words": [
        "English",
        "speak",
        "you",
        "Can"
      ],
      "difficulty": 2,
      "id": "lesson-018-ex-009",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "multiple-choice",
      "question": "What does “What's that, sir? I can't understand you.” mean?",
      "ar": "ما هذا يا سيدي؟ لا أستطيع فهمك.",
      "options": [
        "ما هذا يا سيدي؟ لا أستطيع فهمك.",
        "عفواً!",
        "هل تستطيع التحدث بالإنجليزية؟"
      ],
      "answerIndex": 0,
      "difficulty": 1,
      "id": "lesson-018-ex-010",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    },
    {
      "type": "multiple-choice",
      "question": "What does “Pardon!” mean?",
      "ar": "عفواً!",
      "options": [
        "عفواً!",
        "ما هذا يا سيدي؟ لا أستطيع فهمك.",
        "هل تستطيع التحدث بالإنجليزية؟"
      ],
      "answerIndex": 0,
      "difficulty": 1,
      "id": "lesson-018-ex-011",
      "grammarTags": [
        "can-you-spell-your-name"
      ]
    }
  ],

  groups:[
    {
      label: "",
      lines:[
        [
          "Customs Officer",
          "What's that, sir? I can't understand you.",
          "ما هذا يا سيدي؟ لا أستطيع فهمك."
        ],
        [
          "Mr. James",
          "Pardon!",
          "عفواً!"
        ],
        [
          "Customs Officer",
          "Can you speak English?",
          "هل تستطيع التحدث بالإنجليزية؟"
        ],
        [
          "Mr. James",
          "Yes, I can speak English.",
          "نعم، أستطيع التحدث بالإنجليزية."
        ],
        [
          "Customs Officer",
          "Well, what's your name?",
          "حسناً، ما اسمك؟"
        ],
        [
          "Mr. James",
          "James Walkman.",
          "جيمس واكمان."
        ],
        [
          "Customs Officer",
          "Can you spell it, please?",
          "هل تستطيع تهجئة اسمك من فضلك؟"
        ],
        [
          "Mr. James",
          "James, J-A-M-E-S. Walkman, W-A-L-K-M-A-N.",
          "جيمس J-A-M-E-S. واكمان W-A-L-K-M-A-N."
        ],
        [
          "Customs Officer",
          "All right. Can I see your passport?",
          "حسناً. هل أستطيع رؤية جواز سفرك؟"
        ],
        [
          "Mr. James",
          "Yes, here you are.",
          "نعم، تفضل."
        ],
        [
          "Customs Officer",
          "Where are your luggage?",
          "وأين حقائبك؟"
        ],
        [
          "Mr. James",
          "Here, these two.",
          "ها هما، هاتان الحقيبتان."
        ],
        [
          "Customs Officer",
          "Can you open them?",
          "هل بإمكانك فتحهما؟"
        ],
        [
          "Mr. James",
          "No, I can't. I don't have the keys.",
          "لا أستطيع، ليس معي المفاتيح."
        ],
        [
          "Customs Officer",
          "Mmm, I can open them.",
          "همم، أستطيع فتحهما."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 18, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
