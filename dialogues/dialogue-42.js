import { buildLessonFields } from './lesson-fields.js';
const dialogue = {
  id: 42,
  level: 2,
  title: "How lovely to hear from you!",
  titleAr: "اتصال بين صديقين",
  groups:[
    {
      label: "",
      lines:[
        [
          "Terry",
          "Hi Clara. It's me, Terry.",
          "مرحباً كلارا، هذا أنا تيري."
        ],
        [
          "Clara",
          "Hello Terry! How lovely to hear from you. How are you? How's the new job going?",
          "أهلاً تيري! يسعدني سماع صوتك. كيف حالك وكيف يسير العمل الجديد؟"
        ],
        [
          "Terry",
          "Work's ok - but I think I'm just tired.",
          "العمل جيد، لكنني أظن أنني متعب فقط."
        ],
        [
          "Clara",
          "Tired? You sound tired. What have you been doing?",
          "متعب؟ تبدو متعباً. ماذا كنت تفعل؟"
        ],
        [
          "Terry",
          "I've been working so hard and everything is so new to me. I remain in the office until 9:00 every night.",
          "أعمل بجد وكل شيء جديد عليّ، وأبقى في المكتب حتى التاسعة كل ليلة."
        ],
        [
          "Clara",
          "That's terrible. And have you been eating well?",
          "هذا صعب. وهل تأكل جيداً؟"
        ],
        [
          "Terry",
          "After work John and I go out for something to eat in the pub round the corner.",
          "بعد العمل أخرج أنا وجون لتناول الطعام في المكان القريب."
        ],
        [
          "Clara",
          "John! Who's John?",
          "جون! من هو جون؟"
        ],
        [
          "Terry",
          "We work together in the same office. He's been working for 3 years and he's been helping me a lot.",
          "نعمل معاً في المكتب نفسه، وهو يعمل منذ ثلاث سنوات ويساعدني كثيراً."
        ],
        [
          "Clara",
          "I'm sure I've never heard you talk about John before.",
          "أنا متأكدة أنني لم أسمعك تتحدث عن جون من قبل."
        ],
        [
          "Terry",
          "I'm looking forward to seeing you here.",
          "أتطلع إلى رؤيتك هنا."
        ],
        [
          "Clara",
          "Me too. Bye for now.",
          "وأنا أيضاً. إلى اللقاء الآن."
        ],
        [
          "Terry",
          "Bye Clara. Take care.",
          "إلى اللقاء كلارا، اعتني بنفسك."
        ]
      ]
    }
  ]
};

export default {
  ...dialogue,
  ...buildLessonFields({ dialogueId: 42, title: dialogue.title, titleAr: dialogue.titleAr, groups: dialogue.groups })
};
