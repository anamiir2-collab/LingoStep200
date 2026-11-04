import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: "lesson-017",
  dialogueId: 17,
  level: 2,
  title: "She has got long straight hair",
  titleAr: "وصف الشخص",
  section: "daily-life",
  level: "A1",
  estimatedMinutes: 5,
  objectives: [
    "Understand and use key expressions about she has got long straight hair.",
    "Practice listening, sentence building, and everyday vocabulary from the dialogue.",
    "Use the dialogue phrases in a short real-life conversation."
  ],
  grammar: {
    explanation: "In this lesson, learn common expressions used for she has got long straight hair. Notice the word order and the way each speaker asks or answers questions. Read each example aloud and compare it with the Arabic meaning.",
    explanationAr: "في هذا الدرس هتتعلم التعبيرات الأساسية المرتبطة بموضوع «وصف الشخص». لاحظ ترتيب الكلمات وطريقة السؤال والإجابة في كل جملة، واقرأ الأمثلة بصوت عالٍ مع مقارنة معناها بالعربية.",
    examples: [
      {
        "en": "Hey Ramy.",
        "ar": "مرحباً رامي."
      },
      {
        "en": "Ayman, nice to see you.",
        "ar": "سعيد لرؤيتك يا أيمن."
      },
      {
        "en": "Where are you going?",
        "ar": "إلى أين أنت ذاهب؟"
      }
    ]
  },
  vocabulary: [
    {
      "word": "Hey Ramy",
      "meaningAr": "مرحباً رامي.",
      "example": "Hey Ramy."
    },
    {
      "word": "Ayman nice to see you",
      "meaningAr": "سعيد لرؤيتك يا أيمن.",
      "example": "Ayman, nice to see you."
    },
    {
      "word": "Where are you going",
      "meaningAr": "إلى أين أنت ذاهب؟",
      "example": "Where are you going?"
    },
    {
      "word": "Congratulations",
      "meaningAr": "تهانينا!",
      "example": "Congratulations!"
    },
    {
      "word": "She's pretty",
      "meaningAr": "إنها جميلة.",
      "example": "She's pretty."
    }
  ],
  exercises: [
    {
      "type": "listen-and-type",
      "en": "Hey Ramy.",
      "ar": "مرحباً رامي.",
      "difficulty": 1,
      "acceptedAnswers": [
        "Hey Ramy."
      ],
      "id": "lesson-017-ex-001",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "Ayman, nice to see you.",
      "ar": "سعيد لرؤيتك يا أيمن.",
      "difficulty": 1,
      "acceptedAnswers": [
        "Ayman, nice to see you."
      ],
      "id": "lesson-017-ex-002",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "Where are you going?",
      "ar": "إلى أين أنت ذاهب؟",
      "difficulty": 1,
      "acceptedAnswers": [
        "Where are you going?"
      ],
      "id": "lesson-017-ex-003",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "listen-and-type",
      "en": "I'm going to the hairdresser. Tomorrow is my wedding party.",
      "ar": "أنا ذاهب إلى الحلاق. غداً حفل زفافي.",
      "difficulty": 1,
      "acceptedAnswers": [
        "I'm going to the hairdresser. Tomorrow is my wedding party."
      ],
      "id": "lesson-017-ex-004",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "fill-blank",
      "en": "Hey Ramy.",
      "ar": "مرحباً رامي.",
      "display": "___ Ramy.",
      "blankWord": "Hey",
      "acceptedAnswers": [
        "Hey"
      ],
      "difficulty": 1,
      "id": "lesson-017-ex-005",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "fill-blank",
      "en": "Ayman, nice to see you.",
      "ar": "سعيد لرؤيتك يا أيمن.",
      "display": "___, nice to see you.",
      "blankWord": "Ayman",
      "acceptedAnswers": [
        "Ayman"
      ],
      "difficulty": 1,
      "id": "lesson-017-ex-006",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "fill-blank",
      "en": "Where are you going?",
      "ar": "إلى أين أنت ذاهب؟",
      "display": "___ are you going?",
      "blankWord": "Where",
      "acceptedAnswers": [
        "Where"
      ],
      "difficulty": 1,
      "id": "lesson-017-ex-007",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "word-order",
      "en": "Ayman, nice to see you.",
      "ar": "سعيد لرؤيتك يا أيمن.",
      "words": [
        "you",
        "see",
        "to",
        "nice",
        "Ayman,"
      ],
      "difficulty": 2,
      "id": "lesson-017-ex-008",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "word-order",
      "en": "Where are you going?",
      "ar": "إلى أين أنت ذاهب؟",
      "words": [
        "going",
        "you",
        "are",
        "Where"
      ],
      "difficulty": 2,
      "id": "lesson-017-ex-009",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "multiple-choice",
      "question": "What does “Hey Ramy.” mean?",
      "ar": "مرحباً رامي.",
      "options": [
        "مرحباً رامي.",
        "سعيد لرؤيتك يا أيمن.",
        "إلى أين أنت ذاهب؟"
      ],
      "answerIndex": 0,
      "difficulty": 1,
      "id": "lesson-017-ex-010",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    },
    {
      "type": "multiple-choice",
      "question": "What does “Ayman, nice to see you.” mean?",
      "ar": "سعيد لرؤيتك يا أيمن.",
      "options": [
        "سعيد لرؤيتك يا أيمن.",
        "مرحباً رامي.",
        "إلى أين أنت ذاهب؟"
      ],
      "answerIndex": 0,
      "difficulty": 1,
      "id": "lesson-017-ex-011",
      "grammarTags": [
        "she-has-got-long-straight-ha"
      ]
    }
  ],

  groups:[
    {
      label: "",
      lines:[
        [
          "Ayman",
          "Hey Ramy.",
          "مرحباً رامي."
        ],
        [
          "Ramy",
          "Ayman, nice to see you.",
          "سعيد لرؤيتك يا أيمن."
        ],
        [
          "Ayman",
          "Where are you going?",
          "إلى أين أنت ذاهب؟"
        ],
        [
          "Ramy",
          "I'm going to the hairdresser. Tomorrow is my wedding party.",
          "أنا ذاهب إلى الحلاق. غداً حفل زفافي."
        ],
        [
          "Ayman",
          "Congratulations!",
          "تهانينا!"
        ],
        [
          "Ramy",
          "Sarah. This is her photo. She's got long straight hair and brown eyes.",
          "سارة. هذه صورتها. شعرها طويل ناعم وعيناها بنيتان."
        ],
        [
          "Ayman",
          "She's pretty.",
          "إنها جميلة."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 17, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
