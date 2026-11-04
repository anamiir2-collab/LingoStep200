/* ============================================================
   LingoStep — audio-upgrade/ui.js  (Section 20)
   Renders the upgraded "Speech" settings section on the More screen.
   Reuses the app's own helpers (el, toggle, settingRow, toast, icon)
   so the panel looks native. All strings live here (EN/AR) so the
   original i18n.js stays untouched.
   ============================================================ */

import {
  getAudioSettings, saveAudioSettings, restoreAudioDefaults,
  SPEED_PRESETS, loadVoices, englishVoicesDetailed, diagnostics,
  speak, stopSpeaking, pausePlayback, resumePlayback, replayLast,
  onAudioState, startRecording, recognizeOnce, recognitionSupported,
  sanitizeSpeechText,
} from './core.js';

const STR = {
  en: {
    accent: 'Accent',
    accentUs: 'American (US)', accentUk: 'British (UK)', accentAuto: 'Auto',
    accentNote: 'Pick how English should sound. "Auto" uses the best English voice available.',
    voice: 'Voice',
    voiceAuto: 'Best available',
    voiceEmpty: 'No English voices found on this device yet.',
    voiceFallback: (a) => `No ${a} voices installed — the best available English voice will be used.`,
    natural: 'Natural', local: 'Offline', online: 'Online',
    speed: 'Playback speed', speedSlow: 'Slow', speedNormal: 'Normal', speedFast: 'Fast',
    volume: 'Volume',
    autoRepeat: 'Auto-repeat', autoRepeatNote: 'Play each sentence up to 3 times automatically.',
    testVoice: 'Test',
    controls: 'Playback controls',
    pause: 'Pause', resume: 'Resume', replay: 'Replay', stop: 'Stop',
    speakingPractice: 'Speaking practice (beta)',
    practiceIntro: 'Listen, then repeat out loud (shadowing). Record yourself and compare. Your microphone is used only when you tap Record, and recordings stay on this device until you delete them.',
    practiceSentence: 'Practice sentence',
    practiceCustom: 'Or type your own sentence (English only)',
    listen: 'Listen', record: 'Record', stopRec: 'Stop',
    myRecording: 'My recording', deleteRec: 'Delete recording',
    noRecording: 'No recording yet.',
    checkSpeech: 'Check with speech recognition',
    recognized: 'Heard', notRecognized: 'Nothing recognized.',
    recognitionDisclaimer: 'Speech recognition can mishear words — treat the result as a hint, not a grade. This is not a pronunciation score.',
    shadowing: 'Auto-record after listening (shadowing)',
    recordingNow: 'Recording… tap Stop when done (max 90s).',
    micDenied: 'Microphone access was blocked. Allow it in the browser settings and try again.',
    micMissing: 'No microphone was found on this device.',
    micUnsupported: 'Recording is not supported in this browser.',
    recFailed: 'Recording could not start.',
    recSaved: 'Recording ready — play it back below.',
    recDeleted: 'Recording deleted.',
    recUnsupported: 'Speech recognition is not available in this browser.',
    recDenied: 'Speech recognition was blocked. Allow microphone access and try again.',
    recNetwork: 'Speech recognition needs an internet connection.',
    noSpeechErr: 'No speech detected — try again a bit louder.',
    recognitionFailed: 'Recognition failed — try again.',
    diagnostics: (d) => `${d.english} English voice(s) found: ${d.us} American, ${d.uk} British, ${d.natural} natural, ${d.local} offline.`,
    diagnosticsNone: 'No speech voices are installed on this device. Audio buttons will stay silent — install a system voice (or use Chrome) and reopen this page.',
    restore: 'Restore audio defaults',
    restoreDone: 'Audio settings restored to defaults.',
    saved: 'Saved',
    honestyNote: 'All audio is generated on your device from its installed voices. Nothing is a human recording; quality depends on your device. English text is spoken only — interface symbols and Arabic translations are never read.',
  },
  ar: {
    accent: 'اللهجة',
    accentUs: 'أمريكي (US)', accentUk: 'بريطاني (UK)', accentAuto: 'تلقائي',
    accentNote: 'اختر طريقة نطق الإنجليزية. «تلقائي» يستخدم أفضل صوت إنجليزي متاح.',
    voice: 'الصوت',
    voiceAuto: 'الأفضل المتاح',
    voiceEmpty: 'لم يتم العثور على أصوات إنجليزية على جهازك حتى الآن.',
    voiceFallback: (a) => `لا توجد أصوات ${a === 'uk' ? 'بريطانية' : 'أمريكية'} على جهازك — سيُستخدم أفضل صوت إنجليزي متاح.`,
    natural: 'طبيعي', local: 'بدون إنترنت', online: 'أونلاين',
    speed: 'سرعة النطق', speedSlow: 'بطيء', speedNormal: 'عادي', speedFast: 'سريع',
    volume: 'مستوى الصوت',
    autoRepeat: 'تكرار تلقائي', autoRepeatNote: 'إعادة تشغيل كل جملة حتى 3 مرات تلقائيًا.',
    testVoice: 'تجربة',
    controls: 'أزرار التشغيل',
    pause: 'إيقاف مؤقت', resume: 'متابعة', replay: 'إعادة', stop: 'إيقاف',
    speakingPractice: 'تدريب المحادثة (تجريبي)',
    practiceIntro: 'استمع ثم أعد الكلام بصوت عالٍ (وضع الظل). سجّل صوتك وقارنه. الميكروفون يعمل فقط عند الضغط على «تسجيل»، والتسجيلات تبقى على جهازك حتى تحذفها.',
    practiceSentence: 'جملة التدريب',
    practiceCustom: 'أو اكتب جملتك الخاصة (بالإنجليزية فقط)',
    listen: 'استمع', record: 'تسجيل', stopRec: 'إيقاف',
    myRecording: 'تسجيلي', deleteRec: 'حذف التسجيل',
    noRecording: 'لا يوجد تسجيل بعد.',
    checkSpeech: 'تحقق بالتعرف على الكلام',
    recognized: 'تم سماع', notRecognized: 'لم يتم التعرف على أي كلام.',
    recognitionDisclaimer: 'التعرف على الكلام قد يخطئ — اعتبر النتيجة تلميحًا وليس تقييمًا. هذه ليست درجة نطق.',
    shadowing: 'تسجيل تلقائي بعد الاستماع (وضع الظل)',
    recordingNow: 'جارٍ التسجيل… اضغط «إيقاف» عند الانتهاء (بحد أقصى 90 ثانية).',
    micDenied: 'تم منع الوصول للميكروفون. اسمح به من إعدادات المتصفح ثم أعد المحاولة.',
    micMissing: 'لم يتم العثور على ميكروفون في هذا الجهاز.',
    micUnsupported: 'التسجيل غير مدعوم في هذا المتصفح.',
    recFailed: 'تعذر بدء التسجيل.',
    recSaved: 'التسجيل جاهز — شغّله من الأسفل.',
    recDeleted: 'تم حذف التسجيل.',
    recUnsupported: 'التعرف على الكلام غير متاح في هذا المتصفح.',
    recDenied: 'تم منع التعرف على الكلام. اسمح بالميكروفون ثم أعد المحاولة.',
    recNetwork: 'التعرف على الكلام يحتاج اتصال إنترنت.',
    noSpeechErr: 'لم يُكتشف صوت — حاول مرة أخرى بصوت أعلى.',
    recognitionFailed: 'فشل التعرف — حاول مرة أخرى.',
    diagnostics: (d) => `تم العثور على ${d.english} صوت إنجليزي: ${d.us} أمريكي، ${d.uk} بريطاني، ${d.natural} طبيعي، ${d.local} بدون إنترنت.`,
    diagnosticsNone: 'لا توجد أصوات نطق مثبتة على هذا الجهاز. ستبقى أزرار الصوت صامتة — ثبّت صوت نظام (أو استخدم كروم) ثم أعد فتح الصفحة.',
    restore: 'استعادة الإعدادات الافتراضية للصوت',
    restoreDone: 'تمت استعادة إعدادات الصوت الافتراضية.',
    saved: 'تم الحفظ',
    honestyNote: 'كل الأصوات تُولَّد على جهازك من أصوات النظام المثبتة. لا يوجد أي تسجيلات بشرية، والجودة حسب جهازك. يُنطق النص الإنجليزي فقط — رموز الواجهة والترجمة العربية لا تُقرأ أبدًا.',
  },
};

/* Curated practice sentences (real, everyday English + Arabic help). */
const PRACTICE = [
  { en: 'Good morning! How are you today?', ar: 'صباح الخير! كيف حالك اليوم؟' },
  { en: 'My name is Omar, and I am learning English.', ar: 'اسمي عمر، وأنا أتعلم الإنجليزية.' },
  { en: 'Could you help me, please?', ar: 'هل يمكنك مساعدتي من فضلك؟' },
  { en: 'I would like a cup of coffee, please.', ar: 'أريد فنجان قهوة، من فضلك.' },
  { en: 'Where is the nearest bus stop?', ar: 'أين أقرب موقف أتوبيس؟' },
  { en: 'Sorry, could you say that again more slowly?', ar: 'عفوًا، هل يمكنك إعادتها ببطء أكثر؟' },
  { en: 'What time does the train leave?', ar: 'متى يتحرك القطار؟' },
  { en: 'Thank you very much for your help.', ar: 'شكرًا جزيلًا على مساعدتك.' },
  { en: 'I am looking forward to the weekend.', ar: 'أنتظر نهاية الأسبوع بفارغ الصبر.' },
  { en: 'Have a nice day. See you tomorrow!', ar: 'نهارك سعيد. أراك غدًا!' },
];

function seg(options, value, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'audio-seg';
  wrap.setAttribute('role', 'group');
  const paint = () => {
    for (const b of wrap.querySelectorAll('button')) {
      b.setAttribute('aria-pressed', String(b.dataset.val === value));
    }
  };
  for (const o of options) {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.val = o.value;
    b.textContent = o.label;
    b.addEventListener('click', () => { onChange(o.value); value = o.value; paint(); });
    wrap.appendChild(b);
  }
  paint();
  return wrap;
}

/**
 * Build the upgraded speech settings section.
 * ctx: { L, s, t, el, toast, icon, iconLabel, toggle, settingRow, saveSettings }
 * Returns a DOM node (div.more-section-content.more-list).
 */
export async function renderAudioSettingsPanel(ctx) {
  const { L, t, el, toast, icon, iconLabel, toggle, settingRow, saveSettings } = ctx;
  const T = STR[L] === undefined ? STR.en : STR[L];
  const audio = getAudioSettings();

  const wrap = el('div', { class: 'more-section-content more-list audio-panel' });

  /* ---------- accent ---------- */
  const accentSeg = seg(
    [
      { value: 'us', label: T.accentUs },
      { value: 'uk', label: T.accentUk },
      { value: 'auto', label: T.accentAuto },
    ],
    audio.accent,
    (v) => { saveAudioSettings({ accent: v }); refreshVoices(); toast(t(L, 'dataSaved')); },
  );
  wrap.append(
    settingRow(T.accent, T.accentNote, accentSeg),
  );

  /* ---------- voice picker (per accent, honest labels) ---------- */
  const voiceSel = el('select', { 'aria-label': T.voice });
  const voiceNote = el('p', { class: 'small muted more-note' });
  const voiceRow = settingRow(T.voice, null, el('div', { class: 'row' }, [voiceSel]));
  wrap.append(voiceRow, voiceNote);

  async function refreshVoices() {
    await loadVoices();
    const a = getAudioSettings();
    const list = englishVoicesDetailed();
    voiceSel.replaceChildren();

    const accName = a.accent === 'uk' ? T.accentUk : a.accent === 'us' ? T.accentUs : T.accentAuto;
    const pool = a.accent === 'auto'
      ? list
      : list.filter((d) => d.accent === a.accent);
    const fallbackUsed = !pool.length && list.length > 0;

    voiceSel.append(el('option', { value: '', text: `${T.voiceAuto} — ${accName}` }));
    for (const d of (pool.length ? pool : list).sort((x, y) => (y.natural - x.natural) || (y.local - x.local))) {
      const bits = [d.lang];
      if (d.natural) bits.push(T.natural);
      bits.push(d.local ? T.local : T.online);
      voiceSel.append(el('option', {
        value: d.voiceURI,
        text: `${d.name} (${bits.join(' • ')})`,
        selected: a.voiceURI[a.accent] === d.voiceURI ? '' : null,
      }));
    }
    if (!list.length) {
      voiceSel.disabled = true;
      voiceNote.textContent = T.voiceEmpty;
    } else if (fallbackUsed) {
      voiceSel.disabled = false;
      voiceNote.textContent = T.voiceFallback(a.accent);
    } else {
      voiceSel.disabled = false;
      voiceNote.textContent = '';
    }
  }
  await refreshVoices();

  voiceSel.addEventListener('change', () => {
    saveAudioSettings({ voiceURI: { [getAudioSettings().accent]: voiceSel.value } });
    toast(t(L, 'dataSaved'));
  });

  const testBtn = el('button', {
    class: 'btn btn-sm',
    onclick: () => {
      const ok = speak('Hello! This is LingoStep, your English practice partner.', { voiceURI: voiceSel.value });
      if (!ok) toast(T.voiceEmpty);
    },
  }, [iconLabel('audio', T.testVoice)]);
  voiceRow.querySelector('.row').append(testBtn);

  /* ---------- speed ---------- */
  const speedSeg = seg(
    [
      { value: 'slow', label: T.speedSlow },
      { value: 'normal', label: T.speedNormal },
      { value: 'fast', label: T.speedFast },
    ],
    audio.speed,
    (v) => {
      saveAudioSettings({ speed: v });
      // keep the legacy More-screen rate select coherent (it writes settings.rate)
      try { if (ctx.rateSel) ctx.rateSel.value = String(SPEED_PRESETS[v]); } catch { /* optional */ }
      toast(t(L, 'dataSaved'));
    },
  );
  wrap.append(settingRow(T.speed, null, speedSeg));

  /* ---------- volume ---------- */
  const volVal = el('span', { class: 'small muted', text: `${Math.round(audio.volume * 100)}%` });
  const volInput = el('input', { type: 'range', min: '0', max: '1', step: '0.05', value: String(audio.volume), 'aria-label': T.volume, class: 'audio-vol' });
  volInput.addEventListener('input', () => { volVal.textContent = `${Math.round(Number(volInput.value) * 100)}%`; });
  volInput.addEventListener('change', () => {
    saveAudioSettings({ volume: Number(volInput.value) });
    speak('Volume level test.', { repeat: 1 });
    toast(t(L, 'dataSaved'));
  });
  wrap.append(settingRow(T.volume, null, el('div', { class: 'row audio-vol-row' }, [volInput, volVal])));

  /* ---------- auto-repeat ---------- */
  const repeatSeg = seg(
    [
      { value: '1', label: '1×' },
      { value: '2', label: '2×' },
      { value: '3', label: '3×' },
    ],
    String(audio.autoRepeat),
    (v) => { saveAudioSettings({ autoRepeat: Number(v) }); toast(t(L, 'dataSaved')); },
  );
  wrap.append(settingRow(T.autoRepeat, T.autoRepeatNote, repeatSeg));

  /* ---------- playback controls (pause / resume / replay / stop) ---------- */
  const pauseBtn = el('button', { class: 'btn btn-sm', onclick: onTogglePause }, [iconLabel('audio', T.pause)]);
  const replayBtn = el('button', { class: 'btn btn-sm', onclick: () => { if (!replayLast()) toast(T.noRecording); } }, [iconLabel('play', T.replay)]);
  const stopBtn = el('button', { class: 'btn btn-sm', onclick: () => stopSpeaking() }, [iconLabel('volumeX', T.stop)]);

  let isPaused = false;
  function onTogglePause() {
    if (isPaused) { if (resumePlayback()) { isPaused = false; pauseBtn.replaceChildren(iconLabel('audio', T.pause)); } }
    else if (pausePlayback()) { isPaused = true; pauseBtn.replaceChildren(iconLabel('audio', T.resume)); }
  }
  const syncButtons = (state) => {
    [pauseBtn, replayBtn, stopBtn].forEach((b) => { b.disabled = !state.playing; });
  };
  syncButtons({ playing: false });
  onAudioState((st) => {
    syncButtons(st);
    if (!st.playing) { isPaused = false; pauseBtn.replaceChildren(iconLabel('audio', T.pause)); }
  });
  wrap.append(settingRow(T.controls, null, el('div', { class: 'row' }, [pauseBtn, replayBtn, stopBtn])));

  /* ---------- speaking practice (beta): shadowing + record + compare ---------- */
  const pick = el('select', { 'aria-label': T.practiceSentence });
  PRACTICE.forEach((p, i) => pick.append(el('option', { value: String(i), text: L === 'ar' ? `${p.en} — ${p.ar}` : p.en })));
  const custom = el('input', { type: 'text', dir: 'ltr', placeholder: T.practiceCustom, 'aria-label': T.practiceCustom, class: 'audio-custom' });

  const practiceText = () => sanitizeSpeechText(custom.value.trim() || PRACTICE[Number(pick.value) || 0].en);
  const sentenceLabel = el('span', { class: 'small muted', dir: 'ltr', text: '' });

  let rec = null;          // active recorder handle
  let recBlob = null;      // last recorded Blob
  let recUrl = null;       // object URL for playback
  let autoRec = false;     // shadowing: auto-record after listen
  let recTimer = null;

  const recBtn = el('button', { class: 'btn btn-sm', onclick: onRecordTap }, [iconLabel('play', T.record)]);
  const playMineBtn = el('button', { class: 'btn btn-sm', onclick: playMine, disabled: true }, [iconLabel('audio', T.myRecording)]);
  const delBtn = el('button', { class: 'btn btn-sm', onclick: deleteRec, disabled: true }, [iconLabel('trash', T.deleteRec)]);
  const recStatus = el('p', { class: 'small muted more-note', text: T.noRecording });
  const heard = el('p', { class: 'small more-note', dir: 'auto' });
  heard.hidden = true;

  function currentSentence() { return custom.value.trim() ? custom.value.trim() : PRACTICE[Number(pick.value) || 0].en; }
  function refreshSentenceLabel() { sentenceLabel.textContent = currentSentence(); }
  pick.addEventListener('change', refreshSentenceLabel);
  custom.addEventListener('input', refreshSentenceLabel);
  refreshSentenceLabel();

  function listen() {
    const ok = speak(currentSentence(), {
      onend: () => { if (autoRec && !rec) onRecordTap(); },
    });
    if (!ok) toast(T.voiceEmpty);
  }

  async function onRecordTap() {
    if (rec) { // stop
      const blob = await rec.stop();
      rec = null;
      if (recTimer) { clearTimeout(recTimer); recTimer = null; }
      recBlob = blob;
      if (recUrl) URL.revokeObjectURL(recUrl);
      recUrl = URL.createObjectURL(blob);
      recBtn.replaceChildren(iconLabel('play', T.record));
      playMineBtn.disabled = false;
      delBtn.disabled = false;
      recStatus.textContent = T.recSaved;
      return;
    }
    try {
      rec = await startRecording();
    } catch (e) {
      const key = e && e.message;
      toast(key === 'recordingDenied' ? T.micDenied
        : key === 'recordingNoMic' ? T.micMissing
          : key === 'recordingUnsupported' ? T.micUnsupported : T.recFailed);
      return;
    }
    recStatus.textContent = T.recordingNow;
    recBtn.replaceChildren(iconLabel('volumeX', T.stopRec));
    recTimer = setTimeout(() => { if (rec) onRecordTap(); }, 90000); // hard cap 90s
  }

  function playMine() {
    if (!recUrl) return;
    stopSpeaking(); // never overlap engine audio
    const a = new Audio(recUrl);
    a.play().catch(() => toast(T.recFailed));
  }

  function deleteRec() {
    recBlob = null;
    if (recUrl) { URL.revokeObjectURL(recUrl); recUrl = null; }
    playMineBtn.disabled = true;
    delBtn.disabled = true;
    recStatus.textContent = T.noRecording;
    toast(T.recDeleted);
  }

  const checkBtn = el('button', {
    class: 'btn btn-sm',
    onclick: async () => {
      heard.hidden = false;
      heard.textContent = '…';
      const r = await recognizeOnce({ lang: 'en-US' });
      if (r.transcript) heard.textContent = `${T.recognized}: "${r.transcript}" — ${T.recognitionDisclaimer}`;
      else {
        heard.textContent = T[
          r.error === 'recognitionUnsupported' ? 'recUnsupported'
            : r.error === 'recognitionDenied' ? 'recDenied'
              : r.error === 'recognitionNetwork' ? 'recNetwork'
                : r.error === 'noSpeech' ? 'noSpeechErr' : 'recognitionFailed'
        ];
      }
    },
  }, [iconLabel('check', T.checkSpeech)]);

  const shadowToggle = toggle(autoRec, (on) => { autoRec = on; });

  const practice = el('details', { class: 'card audio-practice' }, [
    el('summary', { class: 'audio-practice-summary' }, [icon('conversation'), el('span', { text: T.speakingPractice })]),
    el('div', { class: 'more-section-content more-list' }, [
      el('p', { class: 'small muted more-note', text: T.practiceIntro }),
      settingRow(T.practiceSentence, null, pick),
      el('div', { class: 'audio-sentence-preview' }, [sentenceLabel]),
      settingRow('', null, custom),
      settingRow(T.shadowing, null, shadowToggle),
      el('div', { class: 'row audio-actions' }, [
        el('button', { class: 'btn btn-sm', onclick: listen }, [iconLabel('headphones', T.listen)]),
        recBtn, playMineBtn, delBtn,
      ]),
      recStatus,
      el('div', { class: 'row' }, [checkBtn]),
      heard,
      el('p', { class: 'small muted more-note', text: T.recognitionDisclaimer }),
    ]),
  ]);

  wrap.append(practice);

  /* ---------- diagnostics + restore + honesty note ---------- */
  const diag = await (async () => { await loadVoices(); return diagnostics(); })();
  const diagText = el('p', { class: 'small muted more-note', text: diag.english ? T.diagnostics(diag) : T.diagnosticsNone });
  wrap.append(el('div', {}, [diagText]));

  const restoreBtn = el('button', {
    class: 'btn btn-sm',
    onclick: () => {
      restoreAudioDefaults();
      toast(T.restoreDone);
      // simplest honest refresh of the panel state:
      setTimeout(() => window.location.reload(), 700);
    },
  }, [iconLabel('clock', T.restore)]);
  wrap.append(settingRow(T.restore, null, restoreBtn));

  wrap.append(el('p', { class: 'small muted more-note', text: T.honestyNote }));

  return wrap;
}
