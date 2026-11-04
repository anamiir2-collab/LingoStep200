import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: "lesson-019",
  dialogueId: 19,
  level: 2,
  title: "Directions",
  titleAr: "الاتجاهات",
  section: "daily-life",
  level: "A1",
  estimatedMinutes: 6,
  objectives: [
    "Understand and use key expressions about directions.",
    "Practice listening, sentence building, and everyday vocabulary from the dialogue.",
    "Use the dialogue phrases in a short real-life conversation."
  ],
  grammar: {
    explanation: "In this lesson, learn common expressions used for directions. Notice the word order and the way each speaker asks or answers questions. Read each example aloud and compare it with the Arabic meaning.",
    explanationAr: "في هذا الدرس هتتعلم التعبيرات الأساسية المرتبطة بموضوع «الاتجاهات». لاحظ ترتيب الكلمات وطريقة السؤال والإجابة في كل جملة، واقرأ الأمثلة بصوت عالٍ مع مقارنة معناها بالعربية.",
    examples: [
      {
        "en": "Excuse me, sir.",
        "ar": "معذرة سيدي."
      },
      {
        "en": "Yes.",
        "ar": "أجل."
      },
      {
        "en": "Can you tell me how to go to the post office?",
        "ar": "هل تستطيع أن تخبرني كيف أذهب إلى مكتب البريد؟"
      }
    ]
  },
  vocabulary: [
    {
      "word": "Excuse me sir",
      "meaningAr": "معذرة سيدي.",
      "example": "Excuse me, sir."
    },
    {
      "word": "Yes",
      "meaningAr": "أجل.",
      "example": "Yes."
    },
    {
      "word": "Thank you",
      "meaningAr": "شكراً لك.",
      "example": "Thank you."
    },
    {
      "word": "Yes of course",
      "meaningAr": "نعم بالطبع.",
      "example": "Yes, of course."
    }
  ],
  exercises: [
    {
      "type": "listen-and-type",
      "en": "Excuse me, sir.",
      "ar": "معذرة سيدي.",
      "difficulty": 1,
      "acceptedAnswers": [
        "Excuse me, sir."
      ],
      "id": "lesson-019-ex-001",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "Yes.",
      "ar": "أجل.",
      "difficulty": 1,
      "acceptedAnswers": [
        "Yes."
      ],
      "id": "lesson-019-ex-002",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "Can you tell me how to go to the post office?",
      "ar": "هل تستطيع أن تخبرني كيف أذهب إلى مكتب البريد؟",
      "difficulty": 1,
      "acceptedAnswers": [
        "Can you tell me how to go to the post office?"
      ],
      "id": "lesson-019-ex-003",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "Go down this street, then turn left. It's on the right next to the bank.",
      "ar": "اسلكي هذا الشارع، ثم اتجهي يساراً. إنه على اليمين بجوار البنك.",
      "difficulty": 1,
      "acceptedAnswers": [
        "Go down this street, then turn left. It's on the right next to the bank."
      ],
      "id": "lesson-019-ex-004",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "fill-blank",
      "en": "Excuse me, sir.",
      "ar": "معذرة سيدي.",
      "display": "___ me, sir.",
      "blankWord": "Excuse",
      "acceptedAnswers": [
        "Excuse"
      ],
      "difficulty": 1,
      "id": "lesson-019-ex-005",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "fill-blank",
      "en": "Yes.",
      "ar": "أجل.",
      "display": "___.",
      "blankWord": "Yes",
      "acceptedAnswers": [
        "Yes"
      ],
      "difficulty": 1,
      "id": "lesson-019-ex-006",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "fill-blank",
      "en": "Can you tell me how to go to the post office?",
      "ar": "هل تستطيع أن تخبرني كيف أذهب إلى مكتب البريد؟",
      "display": "___ you tell me how to go to the post office?",
      "blankWord": "Can",
      "acceptedAnswers": [
        "Can"
      ],
      "difficulty": 1,
      "id": "lesson-019-ex-007",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "word-order",
      "en": "Excuse me, sir.",
      "ar": "معذرة سيدي.",
      "words": [
        "sir",
        "me,",
        "Excuse"
      ],
      "difficulty": 2,
      "id": "lesson-019-ex-008",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "word-order",
      "en": "Can you tell me how to go to the post office?",
      "ar": "هل تستطيع أن تخبرني كيف أذهب إلى مكتب البريد؟",
      "words": [
        "office",
        "post",
        "the",
        "to",
        "go",
        "to",
        "how",
        "me",
        "tell",
        "you",
        "Can"
      ],
      "difficulty": 2,
      "id": "lesson-019-ex-009",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "multiple-choice",
      "question": "What does “Excuse me, sir.” mean?",
      "ar": "معذرة سيدي.",
      "options": [
        "معذرة سيدي.",
        "أجل.",
        "هل تستطيع أن تخبرني كيف أذهب إلى مكتب البريد؟"
      ],
      "answerIndex": 0,
      "difficulty": 1,
      "id": "lesson-019-ex-010",
      "grammarTags": [
        "directions"
      ]
    },
    {
      "type": "multiple-choice",
      "question": "What does “Yes.” mean?",
      "ar": "أجل.",
      "options": [
        "أجل.",
        "معذرة سيدي.",
        "هل تستطيع أن تخبرني كيف أذهب إلى مكتب البريد؟"
      ],
      "answerIndex": 0,
      "difficulty": 1,
      "id": "lesson-019-ex-011",
      "grammarTags": [
        "directions"
      ]
    }
  ],

  groups:[
    {
      label: "Situation 1",
      lines:[
        [
          "Sara",
          "Excuse me, sir.",
          "معذرة سيدي."
        ],
        [
          "Sam",
          "Yes.",
          "أجل."
        ],
        [
          "Sara",
          "Can you tell me how to go to the post office?",
          "هل تستطيع أن تخبرني كيف أذهب إلى مكتب البريد؟"
        ],
        [
          "Sam",
          "Go down this street, then turn left. It's on the right next to the bank.",
          "اسلكي هذا الشارع، ثم اتجهي يساراً. إنه على اليمين بجوار البنك."
        ],
        [
          "Sara",
          "Thank you.",
          "شكراً لك."
        ]
      ]
    },
    {
      label: "Situation 2",
      lines:[
        [
          "Tarek",
          "Excuse me, can you help me?",
          "عذراً، هل تستطيعين مساعدتي؟"
        ],
        [
          "Noha",
          "Yes, of course.",
          "نعم بالطبع."
        ],
        [
          "Tarek",
          "Is there a bank near here?",
          "هل يوجد بنك بالقرب من هنا؟"
        ],
        [
          "Noha",
          "Yes, go straight ahead, then turn right. It's between the hotel and the library.",
          "نعم، سر إلى الأمام ثم اتجه يميناً. إنه بين الفندق والمكتبة."
        ],
        [
          "Tarek",
          "Thank you.",
          "شكراً لك."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 19, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
