/* Builds the shared lesson schema for each standalone book dialogue.
   Original groups/lines remain in the module for the dialogue reader. */
const sections = ['foundations','daily-life','home-family','food-services','travel','health-emergency','social-communication','work-money'];
const slug = s => String(s || 'conversation').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,28) || 'conversation';

export function buildLessonFields({dialogueId, title, titleAr, groups}) {
  const lines = (groups || []).flatMap(g => (g.lines || []).map(([speaker,en,ar]) => ({speaker,en,ar}))).filter(x => x.en && x.ar);
  const unique = [...new Map(lines.map(x => [x.en.trim().toLowerCase(), x])).values()];
  const id = 'lesson-' + String(dialogueId).padStart(3,'0');
  const tag = slug(title);
  const examples = unique.slice(0,3).map(x => ({en:x.en, ar:x.ar}));
  while (examples.length < 2 && lines.length) examples.push({en:lines[0].en,ar:lines[0].ar});
  const vocabulary = unique.slice(0,8).map(x => ({word:x.en.replace(/[?!.,]/g,'').trim(),meaningAr:x.ar,example:x.en}));
  while (vocabulary.length < 4 && lines.length) {
    const x = lines[vocabulary.length % lines.length];
    vocabulary.push({word:x.en,meaningAr:x.ar,example:x.en});
  }
  const exercises = [];
  const add = x => { x.id = id + '-ex-' + String(exercises.length+1).padStart(3,'0'); x.grammarTags=[tag]; exercises.push(x); };
  unique.slice(0,Math.min(4,unique.length)).forEach(x => add({type:'listen-and-type',en:x.en,ar:x.ar,difficulty:1,acceptedAnswers:[x.en]}));
  for(let i=0;i<3;i++) {
    const x=unique[i%unique.length], words=x.en.match(/[A-Za-z']+/g)||[], blank=words.find(w=>w.length>2)||words[0]||'hello';
    const escaped=blank.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    add({type:'fill-blank',en:x.en,ar:x.ar,display:x.en.replace(new RegExp('\\b'+escaped+'\\b','i'),'___'),blankWord:blank,acceptedAnswers:[blank],difficulty:1});
  }
  const orderable=unique.filter(x=>x.en.trim().replace(/[.!?]+$/,'').split(/\s+/).length>=3);
  for(let i=0;i<2;i++) {
    const x=orderable[i%Math.max(1,orderable.length)]||unique[i%unique.length], words=x.en.trim().replace(/[.!?]+$/,'').split(/\s+/);
    while(words.length<3) words.push(words[0]||'Hello');
    add({type:'word-order',en:x.en,ar:x.ar,words:[...words].reverse(),difficulty:2});
  }
  for(let i=0;i<2;i++) {
    const x=unique[i%unique.length], options=[x.ar,...unique.filter(y=>y.ar!==x.ar).slice(0,2).map(y=>y.ar)];
    while(options.length<3) options.push('إجابة أخرى');
    add({type:'multiple-choice',question:'What does “'+x.en+'” mean?',ar:x.ar,options,answerIndex:0,difficulty:1});
  }
  const section=dialogueId<=11?'foundations':dialogueId<=22?'daily-life':dialogueId<=33?'home-family':dialogueId<=40?'social-communication':'work-money';
  return {
    id, dialogueId, section, level:dialogueId<=22?'A1':'A2',
    estimatedMinutes:Math.max(5,Math.ceil(lines.length*0.6)),
    objectives:[`Understand key expressions about ${title}.`,'Practice listening, sentence building, and everyday vocabulary.','Use the phrases in a short real-life conversation.'],
    grammar:{
      explanation:`This lesson practices common expressions about ${title}. Notice the word order and how speakers ask and answer questions. Read each example aloud and compare it with the Arabic meaning.`,
      explanationAr:`في هذا الدرس تتعلم التعبيرات الأساسية المرتبطة بموضوع «${titleAr}». لاحظ ترتيب الكلمات وطريقة السؤال والإجابة، واقرأ الأمثلة مع معناها بالعربية.`,
      examples
    },
    vocabulary,
    exercises
  };
}
