// Global constants KANA_DATA and ROW_LABELS are inherited from kana.js loaded previously.

// --- APPLICATION STATE ---
let state = {
  kanaType: 'hiragana', // 'hiragana' | 'katakana' | 'both'
  selectedSoundTypes: ['seion'], // 'seion', 'dakuon', 'handakuon', 'yoon'
  selectedRows: [], // Array of row keys, e.g. ['a', 'ka']
  autoPronounce: true,
  autoPronounceCorrect: true, // Auto-play audio on correct answer, checked by default
  theme: 'dark',
  timeChallenge: false,
  voiceSpeed: 0.85,
  strokeSpeed: 1.5,
  selectedVoiceName: '',
  isWeakReviewMode: false,
  weakReviewOriginalDeck: [],
  weakReviewOriginalQueue: [],
  weakReviewOriginalCard: null,
  cardStartTime: 0,
  
  // Queues
  activeDeck: [], // Filtered set of cards based on settings
  learningQueue: [], // Shuffled active list of cards to learn
  currentCard: null,
  cardState: 'front', // 'front' | 'back'
  
  // Incorrect / Review Queue (Anki logic)
  // Format: cardId -> { id, incorrectCount, consecutiveCorrect }
  incorrectCards: {}, 
  
  // Stats
  totalAttempts: 0,
  correctAttempts: 0,
  masteredCardIds: [] // Array of card IDs that are mastered
};

// Anti-double-trigger cooldown helper
let lastStateTransitionTime = 0;

// --- DOM ELEMENTS ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeMoonIcon = document.getElementById('themeMoonIcon');
const themeSunIcon = document.getElementById('themeSunIcon');
const kanaTypeSelector = document.getElementById('kanaTypeSelector');
const autoPronounceCheckbox = document.getElementById('autoPronounceCheckbox');
const autoPronounceCorrectCheckbox = document.getElementById('autoPronounceCorrectCheckbox');

const timeChallengeCheckbox = document.getElementById('timeChallengeCheckbox');
const voiceSelect = document.getElementById('voiceSelect');
const voiceSpeedSlider = document.getElementById('voiceSpeedSlider');
const voiceSpeedValue = document.getElementById('voiceSpeedValue');
const strokeSpeedSlider = document.getElementById('strokeSpeedSlider');
const strokeSpeedValue = document.getElementById('strokeSpeedValue');

const timerTrack = document.getElementById('timerTrack');
const timerFill = document.getElementById('timerFill');

const startWeakReviewBtn = document.getElementById('startWeakReviewBtn');
const weakReviewBanner = document.getElementById('weakReviewBanner');
const weakReviewCount = document.getElementById('weakReviewCount');
const exitWeakReviewBtn = document.getElementById('exitWeakReviewBtn');

const toggleCanvasBtn = document.getElementById('toggleCanvasBtn');
const canvasContainer = document.getElementById('canvasContainer');
const drawingCanvas = document.getElementById('drawingCanvas');
const clearCanvasBtn = document.getElementById('clearCanvasBtn');
const closeCanvasBtn = document.getElementById('closeCanvasBtn');
const strokeOverlayContainer = document.getElementById('strokeOverlayContainer');

const vocabContainer = document.getElementById('vocabContainer');
const vocabImg = document.getElementById('vocabImg');
const vocabWordText = document.getElementById('vocabWordText');
const vocabMeaningText = document.getElementById('vocabMeaningText');

const strokeAnimContainer = document.getElementById('strokeAnimContainer');
const strokeSvgHolder = document.getElementById('strokeSvgHolder');
const backKanaGhost = document.getElementById('backKanaGhost');
const cardBack = document.querySelector('.card-back');
const typeSeionCheckbox = document.getElementById('typeSeionCheckbox');
const typeDakuonCheckbox = document.getElementById('typeDakuonCheckbox');
const typeHandakuonCheckbox = document.getElementById('typeHandakuonCheckbox');
const typeYoonCheckbox = document.getElementById('typeYoonCheckbox');
const rowsCheckboxGrid = document.getElementById('rowsCheckboxGrid');
const selectAllRowsBtn = document.getElementById('selectAllRowsBtn');
const deselectAllRowsBtn = document.getElementById('deselectAllRowsBtn');

const cardWrapper = document.getElementById('cardWrapper');
const flashcard = document.getElementById('flashcard');
const cardKanaTypeHint = document.getElementById('cardKanaTypeHint');
const cardKanaDisplay = document.getElementById('cardKanaDisplay');
const cardGroupHint = document.getElementById('cardGroupHint');
const cardAnswerDisplay = document.getElementById('cardAnswerDisplay');
const backHiragana = document.getElementById('backHiragana');
const backKatakana = document.getElementById('backKatakana');
const backHiraganaChip = document.getElementById('backHiraganaChip');
const backKatakanaChip = document.getElementById('backKatakanaChip');
const backRomajiLabel = document.getElementById('backRomajiLabel');
const playAudioBtn = document.getElementById('playAudioBtn');
const speechWave = document.getElementById('speechWave');

const romajiInput = document.getElementById('romajiInput');
const submitBtn = document.getElementById('submitBtn');
const skipBtn = document.getElementById('skipBtn');
const feedbackBox = document.getElementById('feedbackBox');

const masteredCountText = document.getElementById('masteredCountText');
const accuracyText = document.getElementById('accuracyText');
const queueRemainingText = document.getElementById('queueRemainingText');
const progressBarPercentage = document.getElementById('progressBarPercentage');
const progressBarFill = document.getElementById('progressBarFill');
const weakItemsList = document.getElementById('weakItemsList');
const noWeakMsg = document.getElementById('noWeakMsg');
const resetProgressBtn = document.getElementById('resetProgressBtn');

// --- MODAL REFERENCE CHART LOGIC ---
const chartModal = document.getElementById('chartModal');
const openChartBtn = document.getElementById('openChartBtn');
const closeChartBtn = document.getElementById('closeChartBtn');
const modalChartBody = document.getElementById('modalChartBody');
const modalKanaSelector = document.getElementById('modalKanaSelector');

let modalState = {
  tab: 'seion',      // 'seion' | 'dakuon' | 'yoon'
  kanaMode: 'hiragana' // 'hiragana' | 'katakana' | 'both'
};

const seionChartData = [
  { label: 'あ行', chars: ['あ', 'い', 'う', 'え', 'お'] },
  { label: 'か行', chars: ['か', 'き', 'く', 'け', 'こ'] },
  { label: 'さ行', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
  { label: 'た行', chars: ['た', 'ち', 'つ', 'て', 'と'] },
  { label: 'な行', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { label: 'は行', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { label: 'ま行', chars: ['ま', 'み', 'む', 'め', 'も'] },
  { label: 'や行', chars: ['や', '', 'ゆ', '', 'よ'] },
  { label: 'ら行', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { label: 'わ行', chars: ['わ', '', '', '', 'を'] },
  { label: 'ん',   chars: ['ん', '', '', '', ''] }
];

const dakuonChartData = [
  { label: 'が行', chars: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  { label: 'ざ行', chars: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  { label: 'だ行', chars: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
  { label: 'ば行', chars: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  { label: 'ぱ行', chars: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] }
];

const yoonChartData = [
  { label: 'k-拗音', chars: ['きゃ', 'きゅ', 'きょ'] },
  { label: 's-拗音', chars: ['しゃ', 'しゅ', 'しょ'] },
  { label: 't-拗音', chars: ['ちゃ', 'ちゅ', 'ちょ'] },
  { label: 'n-拗音', chars: ['にゃ', 'にゅ', 'にょ'] },
  { label: 'h-拗音', chars: ['ひゃ', 'ひゅ', 'ひょ'] },
  { label: 'm-拗音', chars: ['みゃ', 'みゅ', 'みょ'] },
  { label: 'r-拗音', chars: ['りゃ', 'りゅ', 'りょ'] },
  { label: 'g-拗音', chars: ['ぎゃ', 'ぎゅ', 'ぎょ'] },
  { label: 'z-拗音', chars: ['じゃ', 'じゅ', 'じょ'] },
  { label: 'b-拗音', chars: ['びゃ', 'びゅ', 'びょ'] },
  { label: 'p-拗音', chars: ['ぴゃ', 'ぴゅ', 'ぴょ'] }
];

function renderModalChart() {
  modalChartBody.innerHTML = '';
  
  let rows = [];
  let cols = 0;
  let headers = [];
  
  if (modalState.tab === 'seion') {
    rows = seionChartData;
    cols = 6;
    headers = ["行", "a (あ)", "i (い)", "u (う)", "e (え)", "o (お)"];
  } else if (modalState.tab === 'dakuon') {
    rows = dakuonChartData;
    cols = 6;
    headers = ["行", "a (あ)", "i (い)", "u (う)", "e (え)", "o (お)"];
  } else {
    rows = yoonChartData;
    cols = 4;
    headers = ["行", "ya (ゃ)", "yu (ゅ)", "yo (ょ)"];
  }
  
  const grid = document.createElement('div');
  grid.className = `chart-grid chart-grid-${cols}col`;
  
  // Render Headers
  headers.forEach(h => {
    const cell = document.createElement('div');
    cell.className = 'chart-cell header-cell';
    cell.textContent = h;
    grid.appendChild(cell);
  });
  
  // Render Rows
  rows.forEach(rowInfo => {
    // 1. Row label
    const labelCell = document.createElement('div');
    labelCell.className = 'chart-cell header-cell';
    labelCell.textContent = rowInfo.label;
    grid.appendChild(labelCell);
    
    // 2. Row chars
    rowInfo.chars.forEach(char => {
      const cell = document.createElement('div');
      
      if (!char) {
        cell.className = 'chart-cell empty-cell';
      } else {
        // Find in KANA_DATA
        const match = KANA_DATA.find(k => k.hiragana === char);
        if (match) {
          cell.className = 'chart-cell';
          
          // Display character based on mode
          let displayChar = '';
          if (modalState.kanaMode === 'hiragana') {
            displayChar = match.hiragana;
          } else if (modalState.kanaMode === 'katakana') {
            displayChar = match.katakana;
          } else {
            displayChar = `${match.hiragana} <span style="font-size:0.9rem; font-weight:400; color:var(--text-secondary);">/ ${match.katakana}</span>`;
          }
          
          cell.innerHTML = `
            <div class="chart-cell-char">${displayChar}</div>
            <div class="chart-cell-romaji">${match.romaji}</div>
          `;
          
          cell.addEventListener('click', () => {
            speak(match.hiragana);
            cell.classList.add('animate-pop');
            setTimeout(() => cell.classList.remove('animate-pop'), 200);
          });
        } else {
          cell.className = 'chart-cell';
          cell.innerHTML = `<div class="chart-cell-char">${char}</div>`;
        }
      }
      grid.appendChild(cell);
    });
  });
  
  modalChartBody.appendChild(grid);
}

function openChart() {
  chartModal.style.display = 'flex';
  renderModalChart();
}

function closeChart() {
  chartModal.style.display = 'none';
}


// --- SPEECH SYNTHESIS SETUP ---
let systemVoices = [];
let selectedVoice = null;

function loadVoices() {
  if ('speechSynthesis' in window) {
    systemVoices = window.speechSynthesis.getVoices();
    // Prioritize Japanese voices
    const jaVoices = systemVoices.filter(voice => voice.lang === 'ja-JP' || voice.lang.startsWith('ja') || voice.lang.includes('JP'));
    
    // Populate voice dropdown select element if available
    const voiceSelect = document.getElementById('voiceSelect');
    if (voiceSelect) {
      voiceSelect.innerHTML = '';
      if (jaVoices.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '系統預設日語語音';
        voiceSelect.appendChild(opt);
      } else {
        jaVoices.forEach(voice => {
          const opt = document.createElement('option');
          opt.value = voice.name;
          opt.textContent = voice.name;
          if (state.selectedVoiceName && voice.name === state.selectedVoiceName) {
            opt.selected = true;
          }
          voiceSelect.appendChild(opt);
        });
      }
    }
    
    // Set selectedVoice based on state or fallback
    if (state.selectedVoiceName) {
      selectedVoice = systemVoices.find(voice => voice.name === state.selectedVoiceName);
    }
    if (!selectedVoice && jaVoices.length > 0) {
      selectedVoice = jaVoices[0];
    }
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

let audioFallback = null;

function speak(text) {
  // Try to use browser's native speech synthesis first
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    // Check if a Japanese voice is actually available
    const systemVoices = window.speechSynthesis.getVoices();
    const jaVoices = systemVoices.filter(voice => voice.lang === 'ja-JP' || voice.lang.startsWith('ja') || voice.lang.includes('JP'));
    
    if (jaVoices.length > 0) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      
      let rate = parseFloat(state.voiceSpeed);
      if (isNaN(rate) || rate <= 0) {
        rate = 0.85;
      }
      utterance.rate = rate;
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.onstart = () => {
        if (speechWave) speechWave.style.display = 'inline-flex';
        if (playAudioBtn) playAudioBtn.classList.add('speaking');
      };
      
      utterance.onend = () => {
        if (speechWave) speechWave.style.display = 'none';
        if (playAudioBtn) playAudioBtn.classList.remove('speaking');
      };
      
      utterance.onerror = () => {
        if (speechWave) speechWave.style.display = 'none';
        if (playAudioBtn) playAudioBtn.classList.remove('speaking');
        // If native speech fails, try fallback
        speakOnlineFallback(text);
      };
      
      window.speechSynthesis.speak(utterance);
      return;
    }
  }
  
  // If native speech synthesis is not supported or has no Japanese voices, use Google Translate TTS fallback
  speakOnlineFallback(text);
}

function speakOnlineFallback(text) {
  if (audioFallback) {
    try {
      audioFallback.pause();
    } catch (e) {}
  }
  
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encodeURIComponent(text)}`;
  audioFallback = new Audio(url);
  
  let rate = parseFloat(state.voiceSpeed);
  if (isNaN(rate) || rate <= 0) {
    rate = 0.85;
  }
  audioFallback.playbackRate = rate;
  
  audioFallback.onplay = () => {
    if (speechWave) speechWave.style.display = 'inline-flex';
    if (playAudioBtn) playAudioBtn.classList.add('speaking');
  };
  
  audioFallback.onended = () => {
    if (speechWave) speechWave.style.display = 'none';
    if (playAudioBtn) playAudioBtn.classList.remove('speaking');
  };
  
  audioFallback.onerror = () => {
    if (speechWave) speechWave.style.display = 'none';
    if (playAudioBtn) playAudioBtn.classList.remove('speaking');
    console.error('Online TTS fallback failed.');
  };
  
  audioFallback.play().catch(err => {
    if (speechWave) speechWave.style.display = 'none';
    if (playAudioBtn) playAudioBtn.classList.remove('speaking');
    console.warn('Playback blocked or failed:', err);
  });
}

// --- KANJIVG STROKE ANIME FETCH ---
function getKanjiVgUrl(char) {
  if (!char) return '';
  const codePoint = char.codePointAt(0);
  const hex = codePoint.toString(16).padStart(5, '0');
  return `https://cdn.jsdelivr.net/gh/KanjiVG/KanjiVG@master/kanji/${hex}.svg`;
}

async function loadStrokeSvg(char, targetEl, animate = false) {
  targetEl.innerHTML = '';
  const url = getKanjiVgUrl(char);
  if (!url) return;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    let svgText = await response.text();
    
    // Extract SVG tag and content only, stripping XML header/DTD to prevent raw DTD markup like ]> from printing
    const svgStart = svgText.indexOf('<svg');
    if (svgStart !== -1) {
      svgText = svgText.substring(svgStart);
    }
    
    // Remove standard inline styling styles to override custom ones
    svgText = svgText.replace(/style="[^"]*"/g, '');
    targetEl.innerHTML = svgText;
    
    const svg = targetEl.querySelector('svg');
    if (svg) {
      svg.style.stroke = 'var(--accent-purple)';
      svg.style.strokeWidth = '3.5';
      svg.style.fill = 'none';
      
      // Remove stroke order number labels (KanjiVG <text> elements)
      svg.querySelectorAll('text').forEach(t => t.remove());
      
      const paths = svg.querySelectorAll('path');
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        if (animate) {
          const speed = state.strokeSpeed || 1.5;
          const duration = (0.9 / speed).toFixed(2);
          const delay = (index * 0.8 / speed).toFixed(2);
          path.style.animation = `stroke-draw ${duration}s ease-in-out ${delay}s forwards`;
        } else {
          path.style.strokeDashoffset = '0'; // static show
        }
      });
    }
  } catch (err) {
    console.warn('Failed to load KanjiVG stroke SVG, falling back to static text guide:', err);
    targetEl.innerHTML = `<span style="font-size: 3rem; color: var(--text-muted); opacity: 0.25;">${char}</span>`;
  }
}

// --- LOCAL STORAGE PERSISTENCE ---
function loadFromLocalStorage() {
  const savedState = localStorage.getItem('gojuon_master_state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      
      // Load configuration preferences
      if (parsed.kanaType) state.kanaType = parsed.kanaType;
      if (parsed.selectedSoundTypes) state.selectedSoundTypes = parsed.selectedSoundTypes;
      if (parsed.selectedRows) state.selectedRows = parsed.selectedRows;
      if (parsed.autoPronounce !== undefined) state.autoPronounce = parsed.autoPronounce;
      if (parsed.autoPronounceCorrect !== undefined) state.autoPronounceCorrect = parsed.autoPronounceCorrect;
      if (parsed.theme) state.theme = parsed.theme;
      if (parsed.timeChallenge !== undefined) state.timeChallenge = parsed.timeChallenge;
      if (parsed.voiceSpeed !== undefined) state.voiceSpeed = parsed.voiceSpeed;
      if (parsed.strokeSpeed !== undefined) state.strokeSpeed = parsed.strokeSpeed;
      if (parsed.selectedVoiceName !== undefined) state.selectedVoiceName = parsed.selectedVoiceName;
      
      // Load statistics & incorrect reviews
      if (parsed.incorrectCards) state.incorrectCards = parsed.incorrectCards;
      if (parsed.totalAttempts !== undefined) state.totalAttempts = parsed.totalAttempts;
      if (parsed.correctAttempts !== undefined) state.correctAttempts = parsed.correctAttempts;
      if (parsed.masteredCardIds) state.masteredCardIds = parsed.masteredCardIds;
    } catch (e) {
      console.error('Error loading saved state:', e);
    }
  }
}

function saveToLocalStorage() {
  const stateToSave = {
    kanaType: state.kanaType,
    selectedSoundTypes: state.selectedSoundTypes,
    selectedRows: state.selectedRows,
    autoPronounce: state.autoPronounce,
    autoPronounceCorrect: state.autoPronounceCorrect,
    theme: state.theme,
    timeChallenge: state.timeChallenge,
    voiceSpeed: state.voiceSpeed,
    strokeSpeed: state.strokeSpeed,
    selectedVoiceName: state.selectedVoiceName,
    incorrectCards: state.incorrectCards,
    totalAttempts: state.totalAttempts,
    correctAttempts: state.correctAttempts,
    masteredCardIds: state.masteredCardIds
  };
  localStorage.setItem('gojuon_master_state', JSON.stringify(stateToSave));
}

// --- QUEUE GENERATION & GAMEPLAY ---

// Filter cards based on current settings
function getFilteredCards() {
  return KANA_DATA.filter(card => {
    // 1. Filter by sound types (seion, dakuon, etc.)
    if (!state.selectedSoundTypes.includes(card.type)) return false;
    
    // 2. Filter by row selection
    if (!state.selectedRows.includes(card.row)) return false;
    
    return true;
  });
}

// Generate active deck and populate learning queue
function generateDeck() {
  const filtered = getFilteredCards();
  state.activeDeck = [];
  
  // Expand active deck for Hiragana / Katakana / Both options
  filtered.forEach(card => {
    if (state.kanaType === 'hiragana' || state.kanaType === 'both') {
      state.activeDeck.push({
        ...card,
        displayKana: card.hiragana,
        kanaTypeLabel: '平假名'
      });
    }
    if (state.kanaType === 'katakana' || state.kanaType === 'both') {
      state.activeDeck.push({
        ...card,
        displayKana: card.katakana,
        kanaTypeLabel: '片假名'
      });
    }
  });

  // Create shuffled learning queue preserving current card if valid
  rebuildQueuePreservingCurrent();
}

function rebuildQueuePreservingCurrent() {
  // If we have a current card, check if it's still valid in activeDeck
  const isCurrentCardValid = state.currentCard && state.activeDeck.some(
    card => card.id === state.currentCard.id && card.displayKana === state.currentCard.displayKana
  );
  
  if (isCurrentCardValid) {
    // Re-shuffle the remaining cards in activeDeck (excluding currentCard) to form learningQueue
    const remainingCards = state.activeDeck.filter(
      card => !(card.id === state.currentCard.id && card.displayKana === state.currentCard.displayKana)
    );
    
    // Shuffle remaining cards
    for (let i = remainingCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingCards[i], remainingCards[j]] = [remainingCards[j], remainingCards[i]];
    }
    
    state.learningQueue = remainingCards;
  } else {
    // If no current card or current card is invalid, shuffle all active cards
    state.learningQueue = [...state.activeDeck];
    for (let i = state.learningQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.learningQueue[i], state.learningQueue[j]] = [state.learningQueue[j], state.learningQueue[i]];
    }
    state.currentCard = null;
  }
}

// --- COUNTDOWN TIMER LOGIC ---
let timerInterval = null;

function startCountdownTimer() {
  if (timerInterval) clearInterval(timerInterval);
  if (!state.timeChallenge || state.cardState !== 'front') {
    timerTrack.style.display = 'none';
    return;
  }
  
  timerTrack.style.display = 'block';
  timerFill.style.transition = 'none';
  timerFill.style.width = '100%';
  
  // Force reflow and apply transition in next frame
  requestAnimationFrame(() => {
    timerFill.style.transition = 'width 5s linear';
    timerFill.style.width = '0%';
  });
  
  const limit = 5000;
  const startTime = Date.now();
  
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= limit) {
      clearInterval(timerInterval);
      handleTimerTimeout();
    }
  }, 100);
}

function handleTimerTimeout() {
  if (state.cardState === 'front') {
    romajiInput.value = ''; // trigger timeout failure
    checkAnswer(true); // pass isTimeout flag
  }
}

function stopCountdownTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerTrack.style.display = 'none';
}

// --- HANDWRITING TRACING CANVAS LOGIC ---
let isDrawing = false;
let canvasCtx = null;

function initCanvas() {
  if (!drawingCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = drawingCanvas.getBoundingClientRect();
  drawingCanvas.width = rect.width * dpr;
  drawingCanvas.height = rect.height * dpr;
  canvasCtx = drawingCanvas.getContext('2d');
  canvasCtx.scale(dpr, dpr);
  
  canvasCtx.strokeStyle = '#ec4899'; // accent-pink
  canvasCtx.lineWidth = 3.5;
  canvasCtx.lineCap = 'round';
  canvasCtx.lineJoin = 'round';
}

function startDrawing(e) {
  isDrawing = true;
  const rect = drawingCanvas.getBoundingClientRect();
  canvasCtx.beginPath();
  // Support touch translation fallback ClientX/Y
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  canvasCtx.moveTo(clientX - rect.left, clientY - rect.top);
}

function draw(e) {
  if (!isDrawing) return;
  const rect = drawingCanvas.getBoundingClientRect();
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  canvasCtx.lineTo(clientX - rect.left, clientY - rect.top);
  canvasCtx.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

function toggleCanvas() {
  if (canvasContainer.style.display === 'none' || canvasContainer.style.display === '') {
    canvasContainer.style.display = 'flex';
    initCanvas();
    strokeOverlayContainer.innerHTML = '';
    if (state.currentCard && state.currentCard.displayKana.length === 1) {
      loadStrokeSvg(state.currentCard.displayKana, strokeOverlayContainer, false);
    }
  } else {
    canvasContainer.style.display = 'none';
  }
}

// --- WEAK REVIEW MODE LOGIC ---
function startWeakReview() {
  const weakIds = Object.keys(state.incorrectCards);
  if (weakIds.length === 0) return;
  
  state.isWeakReviewMode = true;
  state.weakReviewOriginalDeck = [...state.activeDeck];
  state.weakReviewOriginalQueue = [...state.learningQueue];
  state.weakReviewOriginalCard = state.currentCard;
  
  const weakCardsMap = [];
  weakIds.forEach(id => {
    const cardEntry = state.incorrectCards[id].card;
    const originalCard = KANA_DATA.find(c => c.id === cardEntry.id);
    if (originalCard) {
      weakCardsMap.push({
        ...originalCard,
        displayKana: cardEntry.displayKana,
        kanaTypeLabel: cardEntry.displayKana === originalCard.hiragana ? '平假名' : '片假名'
      });
    }
  });
  
  state.activeDeck = weakCardsMap;
  state.learningQueue = [...state.activeDeck];
  // Shuffle queue
  for (let i = state.learningQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.learningQueue[i], state.learningQueue[j]] = [state.learningQueue[j], state.learningQueue[i]];
  }
  
  state.currentCard = null;
  nextCard();
}

function exitWeakReview(completed = false) {
  state.isWeakReviewMode = false;
  state.activeDeck = state.weakReviewOriginalDeck || [];
  state.learningQueue = state.weakReviewOriginalQueue || [];
  state.currentCard = state.weakReviewOriginalCard;
  
  if (completed) {
    alert('🎉 恭喜！您已成功消滅所有錯題！回到主學習區。');
  }
  
  renderRowFilters();
  generateDeck();
  nextCard();
}

// --- GAMEPLAY NEXT CARD ---
function nextCard() {
  // If queue is empty, regenerate or alert
  if (state.learningQueue.length === 0) {
    if (state.isWeakReviewMode) {
      exitWeakReview(true);
      return;
    }
    if (state.activeDeck.length === 0) {
      cardKanaDisplay.textContent = '選取行';
      cardGroupHint.textContent = '請在左側選擇學習的假名行數';
      cardKanaTypeHint.textContent = '-';
      state.currentCard = null;
      updateUI();
      return;
    }
    // Re-shuffle to keep practicing
    rebuildQueuePreservingCurrent();
  }
  
  // Flip card back to front
  flipCard('front');
  
  // Close handwriting canvas overlay
  if (canvasContainer) {
    canvasContainer.style.display = 'none';
  }
  
  // Hide vocab & stroke containers, clear result state
  if (vocabContainer) vocabContainer.style.display = 'none';
  if (cardBack) cardBack.classList.remove('result-correct', 'result-incorrect');
  if (strokeAnimContainer) strokeAnimContainer.style.display = 'none';
  
  // Pop next card
  state.currentCard = state.learningQueue.shift();
  
  // Reset input and feedback
  romajiInput.value = '';
  romajiInput.disabled = false;
  submitBtn.textContent = '送出';
  if (feedbackBox) {
    feedbackBox.className = 'feedback-box';
    feedbackBox.textContent = '';
  }
  
  // Update Display
  cardKanaDisplay.textContent = state.currentCard.displayKana;
  cardKanaTypeHint.textContent = state.currentCard.kanaTypeLabel;
  
  const typeText = {
    seion: '清音',
    dakuon: '濁音',
    handakuon: '半濁音',
    yoon: '拗音'
  }[state.currentCard.type];
  
  cardGroupHint.textContent = `${ROW_LABELS[state.currentCard.row] || state.currentCard.row} | ${typeText}`;
  
  // Clear Back Face info during rotation back to front to prevent answer leaks
  cardAnswerDisplay.textContent = '';
  cardAnswerDisplay.innerHTML = '';
  cardAnswerDisplay.classList.remove('stroke-center');
  if (backHiragana) backHiragana.textContent = '';
  if (backKatakana) backKatakana.textContent = '';
  if (backHiraganaChip) backHiraganaChip.style.display = 'flex';
  if (backKatakanaChip) backKatakanaChip.style.display = 'flex';
  if (backRomajiLabel) backRomajiLabel.textContent = '';
  if (vocabContainer) vocabContainer.style.display = 'none';
  
  updateUI();
  
  // Start timers
  startCountdownTimer();
  state.cardStartTime = Date.now();
  
  // Focus input
  setTimeout(() => romajiInput.focus(), 50);
}

// Flip Card utility
function flipCard(face) {
  state.cardState = face;
  lastStateTransitionTime = Date.now();
  if (face === 'back') {
    flashcard.classList.add('flipped');
  } else {
    flashcard.classList.remove('flipped');
  }
}

// Check Romaji answer
function checkAnswer(isTimeout = false) {
  if (!state.currentCard) return;
  
  const userInput = romajiInput.value.trim().toLowerCase();
  if (userInput === '' && !isTimeout) {
    // Shaking alert for empty input
    cardWrapper.classList.add('animate-shake');
    setTimeout(() => cardWrapper.classList.remove('animate-shake'), 400);
    return;
  }
  
  // Stop timer countdown
  stopCountdownTimer();
  
  const reactionTime = ((Date.now() - state.cardStartTime) / 1000).toFixed(2);
  
  const isCorrect = !isTimeout && (userInput === state.currentCard.romaji || 
                    (state.currentCard.alternatives && state.currentCard.alternatives.includes(userInput)));
  
  // Update stats
  state.totalAttempts++;
  if (isCorrect) {
    state.correctAttempts++;
  }
  
  // Populate back face details right before flipping
  const typeText = {
    seion: '清音',
    dakuon: '濁音',
    handakuon: '半濁音',
    yoon: '拗音'
  }[state.currentCard.type];
  
  // Reset and update text contents, ensuring both chips are visible by default
  if (backHiragana) backHiragana.textContent = state.currentCard.hiragana;
  if (backKatakana) backKatakana.textContent = state.currentCard.katakana;
  if (backHiraganaChip) backHiraganaChip.style.display = 'flex';
  if (backKatakanaChip) backKatakanaChip.style.display = 'flex';
  if (backRomajiLabel) backRomajiLabel.textContent = state.currentCard.romaji;
  
  // Show stroke order animation when correct, romaji when incorrect
  if (isCorrect) {
    cardAnswerDisplay.textContent = '';
    // Load stroke order SVG directly into the main answer area
    if (state.currentCard.displayKana.length === 1) {
      cardAnswerDisplay.classList.add('stroke-center');
      loadStrokeSvg(state.currentCard.displayKana, cardAnswerDisplay, true);
    } else {
      // Multi-char kana (yoon) — show kana text as fallback
      cardAnswerDisplay.classList.remove('stroke-center');
      cardAnswerDisplay.textContent = state.currentCard.displayKana;
    }
    
    // Hide the redundant tag that is already shown in the center stroke order animation
    if (state.currentCard.displayKana === state.currentCard.hiragana) {
      if (backHiraganaChip) backHiraganaChip.style.display = 'none';
    } else if (state.currentCard.displayKana === state.currentCard.katakana) {
      if (backKatakanaChip) backKatakanaChip.style.display = 'none';
    }
  } else {
    cardAnswerDisplay.classList.remove('stroke-center');
    cardAnswerDisplay.textContent = state.currentCard.romaji;
  }
  
  // Set ghost kana watermark
  if (backKanaGhost) {
    backKanaGhost.textContent = state.currentCard.displayKana;
  }
  
  // Set result state class on card-back
  if (cardBack) {
    cardBack.classList.remove('result-correct', 'result-incorrect');
    cardBack.classList.add(isCorrect ? 'result-correct' : 'result-incorrect');
  }
  
  // Display reaction time inside back answers label
  const backAnswerLabel = document.getElementById('backAnswerLabel');
  if (isCorrect) {
    backAnswerLabel.textContent = `✓ 答對！反應時間: ${reactionTime}秒`;
  } else {
    backAnswerLabel.textContent = isTimeout ? '✗ 超時！正確答案' : '✗ 答錯！正確答案';
  }

  // Flip card to reveal details
  flipCard('back');
  
  // Disable input during card reveal
  romajiInput.disabled = true;
  
  // Hide separate stroke container in bottom row (stroke is shown in center now)
  if (strokeAnimContainer) strokeAnimContainer.style.display = 'none';
  
  // Load Vocabulary association into right column
  if (vocabContainer) {
    if (state.currentCard.vocab) {
      vocabContainer.style.display = 'flex';
      vocabWordText.textContent = `${state.currentCard.vocab.word} (${state.currentCard.vocab.reading})`;
      vocabMeaningText.textContent = `${state.currentCard.vocab.meaning} (${state.currentCard.vocab.romaji})`;
    } else {
      vocabContainer.style.display = 'none';
    }
  }
  
  if (isCorrect) {
    // Answer is Correct
    if (feedbackBox) {
      feedbackBox.className = 'feedback-box correct show';
      feedbackBox.textContent = '答對了！非常棒！';
    }
    submitBtn.textContent = '下一張';
    
    // Add success styling feedback to card wrapper temporarily
    cardWrapper.classList.add('animate-pop');
    setTimeout(() => cardWrapper.classList.remove('animate-pop'), 450);
    
    // Anki/Spaced repetition updates
    const cardId = state.currentCard.id;
    if (state.incorrectCards[cardId]) {
      state.incorrectCards[cardId].consecutiveCorrect++;
      if (state.incorrectCards[cardId].consecutiveCorrect >= 2) {
        // Mastered after 2 consecutive correct answers
        delete state.incorrectCards[cardId];
        
        // Remove from review queue as well if in weak review mode
        if (state.isWeakReviewMode) {
          state.learningQueue = state.learningQueue.filter(
            card => !(card.id === cardId && card.displayKana === state.currentCard.displayKana)
          );
        }
        
        if (!state.masteredCardIds.includes(cardId)) {
          state.masteredCardIds.push(cardId);
        }
      }
    } else {
      // First-try correct
      if (!state.masteredCardIds.includes(cardId)) {
        state.masteredCardIds.push(cardId);
      }
    }
    
    // Auto-pronounce when answer is correct
    if (state.autoPronounceCorrect) {
      speak(state.currentCard.displayKana);
    }
  } else {
    // Answer is Incorrect
    if (feedbackBox) {
      feedbackBox.className = 'feedback-box incorrect show';
      feedbackBox.textContent = isTimeout 
        ? `⏳ 時間到！正確答案是: ${state.currentCard.romaji}`
        : `答錯了！正確答案是: ${state.currentCard.romaji}`;
    }
    submitBtn.textContent = '繼續';
    
    // Shake animation
    cardWrapper.classList.add('animate-shake');
    setTimeout(() => cardWrapper.classList.remove('animate-shake'), 400);
    
    // Anki logic for incorrect answer:
    const cardId = state.currentCard.id;
    if (state.incorrectCards[cardId]) {
      state.incorrectCards[cardId].incorrectCount++;
      state.incorrectCards[cardId].consecutiveCorrect = 0;
    } else {
      state.incorrectCards[cardId] = {
        id: cardId,
        card: { ...state.currentCard },
        incorrectCount: 1,
        consecutiveCorrect: 0
      };
      state.masteredCardIds = state.masteredCardIds.filter(id => id !== cardId);
    }
    
    // Re-queue card
    const insertIndex = Math.min(3, state.learningQueue.length);
    state.learningQueue.splice(insertIndex, 0, state.currentCard);
    
    if (state.autoPronounce) {
      speak(state.currentCard.displayKana);
    }
  }
  
  saveToLocalStorage();
  updateUI();
  submitBtn.focus();
}

// Skip current card
function skipCard() {
  if (!state.currentCard) return;
  
  // Treat skip as incorrect for review queue purposes
  const cardId = state.currentCard.id;
  if (!state.incorrectCards[cardId]) {
    state.incorrectCards[cardId] = {
      id: cardId,
      card: { ...state.currentCard },
      incorrectCount: 1,
      consecutiveCorrect: 0
    };
    state.masteredCardIds = state.masteredCardIds.filter(id => id !== cardId);
  }
  
  // Re-queue card
  state.learningQueue.push(state.currentCard);
  
  nextCard();
}

// Trigger review session for a specific incorrect card from sidebar click
function reviewIncorrectCard(cardId) {
  const incorrectEntry = state.incorrectCards[cardId];
  if (!incorrectEntry) return;
  
  const targetCard = incorrectEntry.card;
  
  // Set as current card
  flipCard('front');
  state.currentCard = {
    ...targetCard,
    // ensure display properties are set based on active selection if possible, otherwise guess from ID
    displayKana: targetCard.displayKana || targetCard.hiragana,
    kanaTypeLabel: targetCard.kanaTypeLabel || (state.kanaType === 'katakana' ? '片假名' : '平假名')
  };
  
  // Reset interaction state
  romajiInput.value = '';
  romajiInput.disabled = false;
  submitBtn.textContent = '確認答案';
  feedbackBox.className = 'feedback-box';
  feedbackBox.textContent = '';
  
  cardKanaDisplay.textContent = state.currentCard.displayKana;
  cardKanaTypeHint.textContent = state.currentCard.kanaTypeLabel;
  const typeText = { seion: '清音', dakuon: '濁音', handakuon: '半濁音', yoon: '拗音' }[state.currentCard.type];
  cardGroupHint.textContent = `${ROW_LABELS[state.currentCard.row] || state.currentCard.row} | ${typeText}`;
  
  // Clear Back Face info during rotation back to front to prevent answer leaks
  cardAnswerDisplay.textContent = '';
  backRowHint.textContent = '';
  backTypeHint.textContent = '';
  
  updateUI();
  setTimeout(() => romajiInput.focus(), 50);
}

// --- RENDER & UI UPDATES ---

// Update statistics panels and review lists
function updateUI() {
  // 1. Queue count
  queueRemainingText.textContent = state.learningQueue.length;
  
  // 2. Mastered count
  masteredCountText.textContent = state.masteredCardIds.length;
  
  // 3. Accuracy
  const accuracy = state.totalAttempts > 0 
    ? Math.round((state.correctAttempts / state.totalAttempts) * 100) 
    : 0;
  accuracyText.textContent = `${accuracy}%`;
  
  // 4. Progress bar (Mastered / Filtered unique cards in dataset)
  // Get count of unique available cards under active filter rules
  const uniqueCardsCount = state.activeDeck.length;
  const activeDeckIds = state.activeDeck.map(c => c.id);
  const activeMasteredCount = state.masteredCardIds.filter(id => activeDeckIds.includes(id)).length;
  
  const progressPercentage = uniqueCardsCount > 0 
    ? Math.round((activeMasteredCount / uniqueCardsCount) * 100) 
    : 0;
  
  progressBarPercentage.textContent = `${progressPercentage}%`;
  progressBarFill.style.width = `${progressPercentage}%`;
  
  // 5. Weak review queue listing
  const incorrectEntries = Object.values(state.incorrectCards);
  if (incorrectEntries.length === 0) {
    noWeakMsg.style.display = 'block';
    // Clear list but keep message
    const badges = weakItemsList.querySelectorAll('.weak-badge');
    badges.forEach(b => b.remove());
  } else {
    noWeakMsg.style.display = 'none';
    
    // Clear list
    const badges = weakItemsList.querySelectorAll('.weak-badge');
    badges.forEach(b => b.remove());
    
    // Sort by incorrect count descending
    incorrectEntries.sort((a, b) => b.incorrectCount - a.incorrectCount);
    
    incorrectEntries.forEach(entry => {
      const badge = document.createElement('span');
      badge.className = 'weak-badge';
      badge.title = '點擊立即單獨複習';
      
      const charToShow = entry.card.displayKana || entry.card.hiragana;
      badge.innerHTML = `${charToShow} <span class="badge-count">${entry.incorrectCount}次</span>`;
      
      badge.addEventListener('click', () => {
        reviewIncorrectCard(entry.id);
      });
      
      weakItemsList.appendChild(badge);
    });
  }
  
  // Toggle Weak Review Button & Banner
  const weakIdsCount = incorrectEntries.length;
  if (weakIdsCount > 0 && !state.isWeakReviewMode) {
    startWeakReviewBtn.style.display = 'block';
  } else {
    startWeakReviewBtn.style.display = 'none';
  }
  
  if (state.isWeakReviewMode) {
    weakReviewBanner.style.display = 'block';
    weakReviewCount.textContent = state.learningQueue.length + (state.currentCard ? 1 : 0);
    modeBanner.style.display = 'none';
  } else {
    weakReviewBanner.style.display = 'none';
    modeBanner.style.display = 'block';
  }
}

// Dynamically generate the Row filter checkboxes based on selected Sound Types
function renderRowFilters() {
  // Collect unique rows that correspond to selected sound types
  const availableRows = new Set();
  KANA_DATA.forEach(card => {
    if (state.selectedSoundTypes.includes(card.type)) {
      availableRows.add(card.row);
    }
  });

  // Sort rows order nicely (a, ka, sa, ta, na, ha, ma, ya, ra, wa, ga, za, da, ba, pa)
  const rowOrder = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'ga', 'za', 'da', 'ba', 'pa'];
  const sortedRows = rowOrder.filter(r => availableRows.has(r));
  
  // If state.selectedRows is empty, initialize it with all sortedRows (default checked)
  // Or check if previous selections are still valid, filtering out ones that are no longer available.
  const prevSelected = state.selectedRows;
  state.selectedRows = sortedRows.filter(r => prevSelected.includes(r));
  if (state.selectedRows.length === 0 && sortedRows.length > 0) {
    state.selectedRows = [...sortedRows];
  }

  // Render row checklist
  rowsCheckboxGrid.innerHTML = '';
  sortedRows.forEach(rowKey => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    
    const isChecked = state.selectedRows.includes(rowKey);
    label.innerHTML = `
      <input type="checkbox" value="${rowKey}" ${isChecked ? 'checked' : ''}>
      <span>${ROW_LABELS[rowKey] || rowKey}</span>
    `;
    
    const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (!state.selectedRows.includes(rowKey)) {
          state.selectedRows.push(rowKey);
        }
      } else {
        state.selectedRows = state.selectedRows.filter(r => r !== rowKey);
      }
      
      saveToLocalStorage();
      generateDeck();
      if (!state.currentCard) {
        nextCard();
      } else {
        updateUI();
      }
    });
    
    rowsCheckboxGrid.appendChild(label);
  });
}

// --- THEME MANAGEMENT ---
function setTheme(theme) {
  state.theme = theme;
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    themeMoonIcon.style.display = 'none';
    themeSunIcon.style.display = 'block';
  } else {
    document.body.classList.remove('light-theme');
    themeMoonIcon.style.display = 'block';
    themeSunIcon.style.display = 'none';
  }
  saveToLocalStorage();
}

// --- INITIAL EVENT LISTENERS ---

// Theme toggle
themeToggleBtn.addEventListener('click', () => {
  setTheme(state.theme === 'dark' ? 'light' : 'dark');
});

// Segmented controls for Hiragana / Katakana / Both
kanaTypeSelector.addEventListener('click', (e) => {
  const btn = e.target.closest('.segment-btn');
  if (!btn) return;
  
  // Update UI active state
  kanaTypeSelector.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  // Update state
  state.kanaType = btn.dataset.type;
  
  saveToLocalStorage();
  generateDeck();
  if (!state.currentCard) {
    nextCard();
  } else {
    updateUI();
  }
});

// Auto pronunciation checkbox
autoPronounceCheckbox.addEventListener('change', (e) => {
  state.autoPronounce = e.target.checked;
  saveToLocalStorage();
});

// Auto pronunciation on correct answer checkbox
autoPronounceCorrectCheckbox.addEventListener('change', (e) => {
  state.autoPronounceCorrect = e.target.checked;
  saveToLocalStorage();
});

// Sound type checkboxes
const soundTypeCheckboxes = [
  { el: typeSeionCheckbox, type: 'seion' },
  { el: typeDakuonCheckbox, type: 'dakuon' },
  { el: typeHandakuonCheckbox, type: 'handakuon' },
  { el: typeYoonCheckbox, type: 'yoon' }
];

soundTypeCheckboxes.forEach(({ el, type }) => {
  el.addEventListener('change', () => {
    const wasChecked = el.checked;
    
    // Collect active sound types
    state.selectedSoundTypes = soundTypeCheckboxes
      .filter(item => item.el.checked)
      .map(item => item.type);
    
    // Ensure at least one sound type is checked
    if (state.selectedSoundTypes.length === 0) {
      el.checked = true;
      state.selectedSoundTypes = [type];
    }
    
    // If a sound type was checked, automatically add its rows to state.selectedRows
    if (wasChecked) {
      const newRows = new Set();
      KANA_DATA.forEach(card => {
        if (card.type === type) {
          newRows.add(card.row);
        }
      });
      newRows.forEach(row => {
        if (!state.selectedRows.includes(row)) {
          state.selectedRows.push(row);
        }
      });
    }
    
    saveToLocalStorage();
    renderRowFilters(); // Re-render row selection grid
    generateDeck();
    if (!state.currentCard) {
      nextCard();
    } else {
      updateUI();
    }
  });
});

// Bulk Row Select Actions
selectAllRowsBtn.addEventListener('click', () => {
  const checkboxes = rowsCheckboxGrid.querySelectorAll('input[type="checkbox"]');
  state.selectedRows = [];
  checkboxes.forEach(cb => {
    cb.checked = true;
    state.selectedRows.push(cb.value);
  });
  saveToLocalStorage();
  generateDeck();
  if (!state.currentCard) {
    nextCard();
  } else {
    updateUI();
  }
});

deselectAllRowsBtn.addEventListener('click', () => {
  const checkboxes = rowsCheckboxGrid.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false;
  });
  state.selectedRows = [];
  saveToLocalStorage();
  generateDeck();
  if (!state.currentCard) {
    nextCard();
  } else {
    updateUI();
  }
});

// Text Input Events
romajiInput.addEventListener('focus', () => {
  if (window.innerWidth <= 768 && cardWrapper) {
    // Force scroll to cardWrapper so it stays in view when keyboard pops up
    setTimeout(() => {
      cardWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    // Double check slightly later for some Android keyboards that are slow to animate
    setTimeout(() => {
      cardWrapper.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 400);
  }
});

romajiInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (state.cardState === 'front') {
      checkAnswer();
    } else if (Date.now() - lastStateTransitionTime > 300) {
      nextCard();
    }
  }
});

// Action Buttons
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (state.cardState === 'front') {
    checkAnswer();
  } else if (Date.now() - lastStateTransitionTime > 300) {
    nextCard();
  }
});

if (skipBtn) {
  skipBtn.addEventListener('click', () => {
    skipCard();
  });
}

// Play audio button — only plays sound
playAudioBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (state.currentCard) {
    speak(state.currentCard.displayKana);
  }
});

// Front face double-click or click to listen/skip
cardWrapper.addEventListener('click', (e) => {
  // Exclude clicking speech buttons, stroke anim buttons, or vocab info
  if (e.target.closest('#playAudioBtn') || 
      e.target.closest('#strokeAnimContainer') || 
      e.target.closest('#vocabContainer')) {
    return;
  }
  
  // Toggle flip card manually on click (only when answer is shown or skip is clicked)
  if (state.cardState === 'back') {
    // Disabled: only Next/Continue button switches card per user request
  }
});

// Reset progress completely
resetProgressBtn.addEventListener('click', () => {
  if (confirm('確定要清除所有掌握記錄、統計數據以及待複習錯題嗎？這無法復原！')) {
    state.incorrectCards = {};
    state.totalAttempts = 0;
    state.correctAttempts = 0;
    state.masteredCardIds = [];
    
    saveToLocalStorage();
    generateDeck();
    nextCard();
    alert('進度已完全重置！');
  }
});

// Modal Event Listeners
openChartBtn.addEventListener('click', openChart);
closeChartBtn.addEventListener('click', closeChart);

chartModal.addEventListener('click', (e) => {
  if (e.target === chartModal) {
    closeChart();
  }
});

// Escape key to close chart
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && chartModal.style.display === 'flex') {
    closeChart();
  }
});

// Tab buttons in Modal
const modalTabBtns = chartModal.querySelectorAll('.modal-tab-btn');
modalTabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    modalTabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    modalState.tab = btn.dataset.tab;
    renderModalChart();
  });
});

// Kana Mode in Modal
const modalKanaSelectorBtns = modalKanaSelector.querySelectorAll('.segment-btn');
modalKanaSelectorBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    modalKanaSelectorBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    modalState.kanaMode = btn.dataset.mode;
    renderModalChart();
  });
});

// --- DYNAMIC CONTROL BINDINGS ---

// Timer Challenge mode change trigger
timeChallengeCheckbox.addEventListener('change', (e) => {
  state.timeChallenge = e.target.checked;
  saveToLocalStorage();
  if (state.cardState === 'front') {
    startCountdownTimer();
  } else {
    stopCountdownTimer();
  }
});

// Voice Select trigger
voiceSelect.addEventListener('change', (e) => {
  state.selectedVoiceName = e.target.value;
  if ('speechSynthesis' in window && systemVoices.length > 0) {
    selectedVoice = systemVoices.find(voice => voice.name === state.selectedVoiceName);
  }
  saveToLocalStorage();
});

// Speed slider trigger
if (voiceSpeedSlider) {
  voiceSpeedSlider.addEventListener('input', (e) => {
    state.voiceSpeed = parseFloat(e.target.value);
    if (voiceSpeedValue) {
      voiceSpeedValue.textContent = `${state.voiceSpeed.toFixed(2)}x`;
    }
    saveToLocalStorage();
  });
}

// Stroke speed slider trigger
if (strokeSpeedSlider) {
  strokeSpeedSlider.addEventListener('input', (e) => {
    state.strokeSpeed = parseFloat(e.target.value);
    if (strokeSpeedValue) {
      strokeSpeedValue.textContent = `${state.strokeSpeed.toFixed(2)}x`;
    }
    saveToLocalStorage();
  });
}

// Start Weak Cards Review trigger
startWeakReviewBtn.addEventListener('click', () => {
  startWeakReview();
});

exitWeakReviewBtn.addEventListener('click', () => {
  exitWeakReview(false);
});

// Stroke order animation play click trigger
strokeAnimContainer.addEventListener('click', (e) => {
  e.stopPropagation();
  if (state.currentCard && state.currentCard.displayKana.length === 1) {
    strokeAnimContainer.classList.add('stroke-anim-active');
    loadStrokeSvg(state.currentCard.displayKana, strokeSvgHolder, true);
    setTimeout(() => strokeAnimContainer.classList.remove('stroke-anim-active'), 4000);
  }
});

// Canvas tracing controls trigger
toggleCanvasBtn.addEventListener('click', () => {
  toggleCanvas();
});

clearCanvasBtn.addEventListener('click', () => {
  initCanvas();
});

closeCanvasBtn.addEventListener('click', () => {
  canvasContainer.style.display = 'none';
});

// Canvas touch & mouse handlers
drawingCanvas.addEventListener('mousedown', startDrawing);
drawingCanvas.addEventListener('mousemove', draw);
drawingCanvas.addEventListener('mouseup', stopDrawing);
drawingCanvas.addEventListener('mouseout', stopDrawing);

drawingCanvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  drawingCanvas.dispatchEvent(mouseEvent);
}, { passive: false });

drawingCanvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  drawingCanvas.dispatchEvent(mouseEvent);
}, { passive: false });

drawingCanvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  const mouseEvent = new MouseEvent('mouseup', {});
  drawingCanvas.dispatchEvent(mouseEvent);
}, { passive: false });

// --- INIT APP ---
function init() {
  // 1. Load data from local storage
  loadFromLocalStorage();
  
  // 2. Set theme
  setTheme(state.theme);
  
  // 3. Update configuration selectors in UI
  autoPronounceCheckbox.checked = state.autoPronounce;
  autoPronounceCorrectCheckbox.checked = state.autoPronounceCorrect;
  
  if (timeChallengeCheckbox) {
    timeChallengeCheckbox.checked = state.timeChallenge;
  }
  if (voiceSpeedSlider) {
    voiceSpeedSlider.value = state.voiceSpeed !== undefined ? state.voiceSpeed : 0.85;
  }
  if (voiceSpeedValue) {
    voiceSpeedValue.textContent = `${(state.voiceSpeed !== undefined ? state.voiceSpeed : 0.85).toFixed(2)}x`;
  }
  
  if (state.strokeSpeed === undefined || state.strokeSpeed === null || isNaN(state.strokeSpeed)) {
    state.strokeSpeed = 1.5;
  }
  if (strokeSpeedSlider) {
    strokeSpeedSlider.value = state.strokeSpeed;
  }
  if (strokeSpeedValue) {
    strokeSpeedValue.textContent = `${state.strokeSpeed.toFixed(2)}x`;
  }
  
  // Set Kana type segment active
  kanaTypeSelector.querySelectorAll('.segment-btn').forEach(btn => {
    if (btn.dataset.type === state.kanaType) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Set Sound Type checkboxes
  typeSeionCheckbox.checked = state.selectedSoundTypes.includes('seion');
  typeDakuonCheckbox.checked = state.selectedSoundTypes.includes('dakuon');
  typeHandakuonCheckbox.checked = state.selectedSoundTypes.includes('handakuon');
  typeYoonCheckbox.checked = state.selectedSoundTypes.includes('yoon');
  
  // 4. Render checklist rows
  renderRowFilters();
  
  // 5. Generate learning deck & load first card
  generateDeck();
  nextCard();
}

// Run initial startup
init();
