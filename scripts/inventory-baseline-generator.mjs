/* Full content inventory of the original LingoStep app.
   Counts lessons, exercises by type, accepted answers, dialogues, vocabulary. */
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';

const ROOT = '/home/z/my-project/original-lingostep';
const manifestSrc = readFileSync(path.join(ROOT, 'data/lesson-manifest.js'), 'utf8');
const manifestJson = manifestSrc.slice(manifestSrc.indexOf('['), manifestSrc.lastIndexOf(']') + 1);
const manifest = JSON.parse(manifestJson);

const summary = {
  totalLessons: manifest.length,
  sections: {},
  totalExercises: 0,
  byType: { 'listen-and-type': 0, 'fill-blank': 0, 'word-order': 0, 'multiple-choice': 0 },
  totalAcceptedAnswers: 0,
  totalVocabulary: 0,
  exercisesWithoutAccepted: 0,
  multiWordBlanks: 0,
  perLesson: {},
};
const blankLens = {};

for (const entry of manifest) {
  const file = path.join(ROOT, entry.path);
  const src = readFileSync(file, 'utf8').replace(/^[\s\S]*?export default/, '').trim().replace(/;\s*$/, '');
  const lesson = JSON.parse(src);
  const counts = {};
  for (const ex of lesson.exercises) {
    counts[ex.type] = (counts[ex.type] || 0) + 1;
    summary.byType[ex.type] = (summary.byType[ex.type] || 0) + 1;
    summary.totalExercises += 1;
    const answers = Array.isArray(ex.acceptedAnswers) ? ex.acceptedAnswers : [];
    summary.totalAcceptedAnswers += answers.length;
    if (!answers.length && ex.type !== 'multiple-choice') summary.exercisesWithoutAccepted += 1;
    if (ex.type === 'fill-blank') {
      const w = String(ex.blankWord || '').trim();
      if (/\s/.test(w)) summary.multiWordBlanks += 1;
      blankLens[w.length] = (blankLens[w.length] || 0) + 1;
    }
  }
  summary.totalVocabulary += (lesson.vocabulary || []).length;
  summary.sections[lesson.section] = (summary.sections[lesson.section] || 0) + 1;
  summary.perLesson[lesson.id] = { exercises: lesson.exercises.length, counts };
}

// dialogues inventory
const dlgDir = path.join(ROOT, 'dialogues');
const dlgFiles = readdirSync(dlgDir).filter((f) => f.endsWith('.js'));
let dialogueLines = 0;
const dlgInfo = [];
for (const f of dlgFiles) {
  const src = readFileSync(path.join(dlgDir, f), 'utf8');
  try {
    const mod = src.replace(/^[\s\S]*?export default/, '').trim().replace(/;\s*$/, '');
    const data = JSON.parse(mod);
    const lines = Array.isArray(data.lines) ? data.lines.length : (Array.isArray(data) ? data.length : 0);
    dialogueLines += lines;
    dlgInfo.push({ file: f, lines });
  } catch (e) {
    dlgInfo.push({ file: f, error: String(e).slice(0, 80) });
  }
}
summary.dialogues = { files: dlgFiles.length, totalLines: dialogueLines };

console.log(JSON.stringify(summary, (k, v) => (k === 'perLesson' ? undefined : v), 1).slice(0, 2500));
console.log('Blank word length distribution:', blankLens);
writeFileSync('/home/z/my-project/scripts/inventory-baseline.json', JSON.stringify({ ...summary, dialoguesDetail: dlgInfo }, null, 1));
console.log('Saved to scripts/inventory-baseline.json');
