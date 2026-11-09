// ============================================================
//  369 MANIFESTATION METHOD — COMPLETE APPLICATION ENGINE
//  Audio, IndexedDB, Alarms, Templates, Streak, Writing Studio & PWA
// ============================================================

(function () {
  'use strict';

  // --- STORAGE KEYS ---
  const KEYS = {
    ACTIVE_AFFIRMATION: 'cosmos_369_active_affirmation',
    ACTIVE_CATEGORY: 'cosmos_369_active_category',
    STREAK: 'cosmos_369_streak',
    LAST_COMPLETED_DATE: 'cosmos_369_last_completed_date',
    DAILY_LOGS: 'cosmos_369_daily_logs', // { "YYYY-MM-DD": { morning: true, afternoon: true, evening: true, quote: "..." } }
    ALARMS: 'cosmos_369_alarms',
    SELECTED_TONE: 'cosmos_369_selected_tone',
    VOLUME: 'cosmos_369_volume',
    CUSTOM_TEMPLATES: 'cosmos_369_custom_templates',
    STRICT_LOCK: 'cosmos_369_strict_lock',
  };

  // --- DEFAULT CURATED MANIFESTATION TEMPLATES (BY LIFE ASPECTS) ---
  const DEFAULT_TEMPLATES = [
    // 💖 Relationship & Love
    {
      id: 'rel_1',
      category: 'Relationship',
      badge: '💖 Relationship',
      text: 'I am attracting a deeply loving, supportive, and conscious partner who cherishes me completely.'
    },
    {
      id: 'rel_2',
      category: 'Relationship',
      badge: '💖 Relationship',
      text: 'My relationship is filled with unwavering trust, passionate romance, and open communication.'
    },
    {
      id: 'rel_3',
      category: 'Relationship',
      badge: '💖 Relationship',
      text: 'I radiate unconditional love, and love flows back to me in miraculous ways every single day.'
    },
    {
      id: 'rel_4',
      category: 'Relationship',
      badge: '💖 Relationship',
      text: 'I release past relationship wounds and welcome healthy, sacred, and everlasting love into my heart.'
    },

    // 🌸 Self Care & Self Worth
    {
      id: 'self_1',
      category: 'Self Care',
      badge: '🌸 Self Care',
      text: 'I am grounded, present, and enough, exactly as I am.'
    },
    {
      id: 'self_2',
      category: 'Self Care',
      badge: '🌸 Self Care',
      text: 'I honor my mind, body, and soul by giving myself the rest, kindness, and nourishment I deserve.'
    },
    {
      id: 'self_3',
      category: 'Self Care',
      badge: '🌸 Self Care',
      text: 'I set healthy boundaries with grace, and I choose my inner peace above all external noise.'
    },
    {
      id: 'self_4',
      category: 'Self Care',
      badge: '🌸 Self Care',
      text: 'I deeply and unconditionally love, forgive, and celebrate every part of myself today.'
    },

    // 🚀 Career & Promotion
    {
      id: 'career_1',
      category: 'Career',
      badge: '🚀 Career',
      text: 'I am excelling in my dream career with incredible recognition, respect, and compensation.'
    },
    {
      id: 'career_2',
      category: 'Career',
      badge: '🚀 Career',
      text: 'Doors of magnificent professional opportunities swing open effortlessly for me now.'
    },
    {
      id: 'career_3',
      category: 'Career',
      badge: '🚀 Career',
      text: 'My unique talents and visionary leadership make a lasting, positive impact on my team and industry.'
    },
    {
      id: 'career_4',
      category: 'Career',
      badge: '🚀 Career',
      text: 'I am worthy of great success, and I step boldly into the highest version of my purpose.'
    },

    // 💼 Business & Entrepreneurship
    {
      id: 'biz_1',
      category: 'Business',
      badge: '💼 Business',
      text: 'My business is scaling rapidly, profitably, and aligned with my highest values.'
    },
    {
      id: 'biz_2',
      category: 'Business',
      badge: '💼 Business',
      text: 'High-paying, dream clients who value my work find me effortlessly and enthusiastically.'
    },
    {
      id: 'biz_3',
      category: 'Business',
      badge: '💼 Business',
      text: 'I make wise, decisive moves that generate massive value and unstoppable momentum.'
    },
    {
      id: 'biz_4',
      category: 'Business',
      badge: '💼 Business',
      text: 'Every dollar and hour I invest in my business multiplies ten-fold in impact and revenue.'
    },

    // 💰 Wealth & Abundance
    {
      id: 'wealth_1',
      category: 'Wealth',
      badge: '💰 Wealth',
      text: 'I am a natural magnet for endless wealth, prosperity, and unexpected financial windfalls.'
    },
    {
      id: 'wealth_2',
      category: 'Wealth',
      badge: '💰 Wealth',
      text: 'Multiple streams of passive and active income flow into my bank accounts effortlessly.'
    },
    {
      id: 'wealth_3',
      category: 'Wealth',
      badge: '💰 Wealth',
      text: 'I have complete financial freedom and live in pure abundance with total peace of mind.'
    },
    {
      id: 'wealth_4',
      category: 'Wealth',
      badge: '💰 Wealth',
      text: 'Money is good; it flows to me easily and I use it to bless my life and elevate others.'
    },

    // 🌿 Health & Healing
    {
      id: 'health_1',
      category: 'Health',
      badge: '🌿 Health',
      text: 'Every cell in my body vibrates with vitality, youthful strength, and perfect healing.'
    },
    {
      id: 'health_2',
      category: 'Health',
      badge: '🌿 Health',
      text: 'I wake up each morning refreshed, energized, and deeply grateful for my healthy body.'
    },
    {
      id: 'health_3',
      category: 'Health',
      badge: '🌿 Health',
      text: 'My immune system is resilient, strong, and in harmonious balance with nature.'
    },
    {
      id: 'health_4',
      category: 'Health',
      badge: '🌿 Health',
      text: 'I easily make nourishing choices that support my long-term longevity and vibrant health.'
    },

    // 🧘 Inner Peace & Calm
    {
      id: 'peace_1',
      category: 'Inner Peace',
      badge: '🧘 Inner Peace',
      text: 'I release all anxiety and worry; I trust that everything is unfolding for my highest good.'
    },
    {
      id: 'peace_2',
      category: 'Inner Peace',
      badge: '🧘 Inner Peace',
      text: 'Stillness lives within me; no outside storm can disturb the deep sanctuary of my peace.'
    },
    {
      id: 'peace_3',
      category: 'Inner Peace',
      badge: '🧘 Inner Peace',
      text: 'I breathe in divine clarity and breathe out tension, fear, and need for control.'
    },

    // 🌌 Spiritual Growth & Universe Alignment
    {
      id: 'spirit_1',
      category: 'Spiritual',
      badge: '🌌 Spiritual',
      text: 'The universe is conspiring in my favor, orchestrating synchronicities beyond my wildest dreams.'
    },
    {
      id: 'spirit_2',
      category: 'Spiritual',
      badge: '🌌 Spiritual',
      text: 'I am in complete energetic alignment with Nikola Tesla’s sacred 369 creation frequencies.'
    },
    {
      id: 'spirit_3',
      category: 'Spiritual',
      badge: '🌌 Spiritual',
      text: 'My intuition is sharp, clear, and leads me directly toward my highest destiny.'
    }
  ];

  // --- DEFAULT ALARMS ---
  const DEFAULT_ALARMS = {
    morning: { enabled: true, time: '08:00', label: 'Three (Morning)' },
    afternoon: { enabled: true, time: '13:00', label: 'Six (Afternoon)' },
    evening: { enabled: true, time: '20:00', label: 'Nine (Evening)' }
  };

  // --- INDEXED DB ENGINE FOR CUSTOM ALARM AUDIO ---
  const DB_NAME = 'cosmos_369_audio_db';
  const DB_VERSION = 1;
  const STORE_NAME = 'custom_tones';

  function openAudioDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function saveCustomAudioFile(file) {
    const db = await openAudioDB();
    const arrayBuffer = await file.arrayBuffer();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const record = {
        id: 'user_custom_tone',
        name: file.name,
        type: file.type || 'audio/mpeg',
        size: file.size,
        data: arrayBuffer,
        updatedAt: Date.now()
      };
      const req = store.put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = () => reject(req.error);
    });
  }

  async function getCustomAudioFile() {
    try {
      const db = await openAudioDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get('user_custom_tone');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      console.warn('IndexedDB error:', e);
      return null;
    }
  }

  async function deleteCustomAudioFile() {
    const db = await openAudioDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete('user_custom_tone');
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  }

  // --- AUDIO SYNTHESIS & TONES ENGINE ---
  let audioCtx = null;
  let activeAudioElement = null;
  let customToneObjectUrl = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play synthesized celestial sounds
  function playSynthTone(type, volume = 0.8) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (type === 'solfeggio') {
      // 528 Hz Solfeggio Miracle Tone & Sacred Harmonics
      const freqs = [528, 528 * 1.5, 528 * 2];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5 / (idx + 1), ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 3.3);
      });
    } else if (type === 'singing-bowl') {
      // Tibetan Singing Bowl deep resonance
      const baseFreq = 216; // Harmonic resonance
      [1, 2.76, 5.4, 8.9].forEach((mult, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * mult, ctx.currentTime);

        gain.gain.setValueAtTime(0.6 / (i + 1), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 4.6);
      });
    } else if (type === 'zen-gong') {
      // Zen Gong
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 2.5);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      gain.gain.setValueAtTime(0.7, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 4.0);
    } else if (type === 'harp') {
      // Celestial Harp Arpeggio (C-E-G-B-C)
      const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99];
      notes.forEach((freq, i) => {
        const noteTime = ctx.currentTime + i * 0.15;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0, noteTime);
        gain.gain.linearRampToValueAtTime(0.4, noteTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.8);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(noteTime);
        osc.stop(noteTime + 1.9);
      });
    } else {
      // Sacred Bell / Chime (Default)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5

      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    }
  }

  // Play a soft pleasant typing chime
  function playKeyChime() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25 + Math.random() * 40, ctx.currentTime); // E5 range
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  }

  // Play alarm sound (synth or custom audio file, looping if active alarm)
  async function triggerAlarmSound(isLooping = false) {
    stopCurrentAlarmSound();

    const selectedTone = localStorage.getItem(KEYS.SELECTED_TONE) || 'solfeggio';
    const volume = parseFloat(localStorage.getItem(KEYS.VOLUME) || '0.8');

    if (selectedTone === 'custom') {
      const customFile = await getCustomAudioFile();
      if (customFile) {
        if (!customToneObjectUrl) {
          const blob = new Blob([customFile.data], { type: customFile.type });
          customToneObjectUrl = URL.createObjectURL(blob);
        }
        activeAudioElement = new Audio(customToneObjectUrl);
        activeAudioElement.volume = volume;
        activeAudioElement.loop = isLooping;
        activeAudioElement.play().catch((err) => {
          console.warn('Audio play prevented by browser policy:', err);
          // Fallback to synth if user hasn't interacted
          playSynthTone('solfeggio', volume);
        });
        return;
      }
    }

    // Otherwise synth tone
    playSynthTone(selectedTone, volume);
    if (isLooping) {
      // Loop synth tone every 3.5s
      const loopInterval = setInterval(() => {
        if (!document.getElementById('alarmRingOverlay').classList.contains('active')) {
          clearInterval(loopInterval);
          return;
        }
        playSynthTone(selectedTone, volume);
      }, 3500);
    }
  }

  function stopCurrentAlarmSound() {
    if (activeAudioElement) {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement = null;
    }
  }

  // --- STREAK & 33 DAYS SACRED ENGINE ---
  function getTodayString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getYesterdayString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getDailyLogs() {
    return JSON.parse(localStorage.getItem(KEYS.DAILY_LOGS) || '{}');
  }

  function saveDailyLogs(logs) {
    localStorage.setItem(KEYS.DAILY_LOGS, JSON.stringify(logs));
  }

  // Enforces streak calculation & strict 0-reset rule if previous day was missed
  function checkAndVerifyStreak() {
    const today = getTodayString();
    const yesterday = getYesterdayString();
    const logs = getDailyLogs();
    let currentStreak = parseInt(localStorage.getItem(KEYS.STREAK) || '0', 10);
    const lastCompleted = localStorage.getItem(KEYS.LAST_COMPLETED_DATE);

    if (lastCompleted && lastCompleted !== today && lastCompleted !== yesterday) {
      // Missed at least one full day -> Streak resets to 0 as requested!
      currentStreak = 0;
      localStorage.setItem(KEYS.STREAK, '0');
    } else if (lastCompleted === yesterday) {
      // Check if yesterday had all 3 sessions completed
      const yLog = logs[yesterday];
      if (!yLog || !yLog.morning || !yLog.afternoon || !yLog.evening) {
        // Yesterday was partially missed! Streak resets to 0!
        currentStreak = 0;
        localStorage.setItem(KEYS.STREAK, '0');
      }
    }

    return currentStreak;
  }

  // Mark a session completed
  function markSessionComplete(sessionType) {
    const today = getTodayString();
    const logs = getDailyLogs();
    if (!logs[today]) {
      logs[today] = {
        morning: false,
        afternoon: false,
        evening: false,
        quote: localStorage.getItem(KEYS.ACTIVE_AFFIRMATION) || DEFAULT_TEMPLATES[1].text,
        updatedAt: new Date().toISOString()
      };
    }

    logs[today][sessionType] = true;
    saveDailyLogs(logs);

    // Check if all three (3, 6, 9) are now finished today
    const { morning, afternoon, evening } = logs[today];
    if (morning && afternoon && evening) {
      let streak = parseInt(localStorage.getItem(KEYS.STREAK) || '0', 10);
      const lastCompleted = localStorage.getItem(KEYS.LAST_COMPLETED_DATE);
      if (lastCompleted !== today) {
        streak += 1;
        localStorage.setItem(KEYS.STREAK, String(streak));
        localStorage.setItem(KEYS.LAST_COMPLETED_DATE, today);
        showToast(`🎉 Sacred 369 Complete! Day ${streak} of 33 marked!`);
        if (streak >= 33) {
          showSacred33CompletionCelebration();
        }
      }
    } else {
      showToast(`✨ ${sessionType.toUpperCase()} manifestation anchored into the cosmos!`);
    }

    updateUI();
  }

  // --- UI UPDATERS ---
  function updateUI() {
    const today = getTodayString();
    const logs = getDailyLogs();
    const todayLog = logs[today] || { morning: false, afternoon: false, evening: false };
    const streak = checkAndVerifyStreak();

    // 1. Streak & Header
    const streakTextEl = document.getElementById('streakCounterText');
    if (streakTextEl) {
      streakTextEl.textContent = `${streak} day streak`;
    }

    const headerStatusEl = document.getElementById('headerStatusTitle');
    if (headerStatusEl) {
      if (todayLog.morning && todayLog.afternoon && todayLog.evening) {
        headerStatusEl.textContent = `All 3 sessions aligned! ✨ Day ${streak}/33`;
      } else {
        const completedCount = [todayLog.morning, todayLog.afternoon, todayLog.evening].filter(Boolean).length;
        if (completedCount === 0) {
          headerStatusEl.textContent = 'Today is a fresh page.';
        } else {
          headerStatusEl.textContent = `${completedCount} of 3 sessions completed today.`;
        }
      }
    }

    // 2. Top Milestone Bar (Progress towards 33 days)
    const topBarFill = document.getElementById('topMilestoneFill');
    if (topBarFill) {
      const progressPercent = Math.min(100, Math.round((streak / 33) * 100));
      topBarFill.style.width = `${progressPercent}%`;
    }

    // 3. Active Affirmation Display
    const activeText = localStorage.getItem(KEYS.ACTIVE_AFFIRMATION) || DEFAULT_TEMPLATES[1].text;
    const activeCat = localStorage.getItem(KEYS.ACTIVE_CATEGORY) || 'Self Care';
    const quoteEl = document.getElementById('activeAffirmationText');
    const catTagEl = document.getElementById('activeAffirmationCategory');
    if (quoteEl) quoteEl.textContent = `“${activeText}”`;
    if (catTagEl) catTagEl.innerHTML = `✦ ${activeCat}`;

    // 4. Update the Three Session Cards
    updateSessionCard('three', 3, 'morning', todayLog.morning);
    updateSessionCard('six', 6, 'afternoon', todayLog.afternoon);
    updateSessionCard('nine', 9, 'evening', todayLog.evening);

    // 5. Update Journey View
    updateJourneyView(streak, logs);
  }

  function updateSessionCard(cardId, repCount, sessionKey, isDone) {
    const cardEl = document.getElementById(`sessionCard_${cardId}`);
    if (!cardEl) return;

    const alarms = JSON.parse(localStorage.getItem(KEYS.ALARMS) || JSON.stringify(DEFAULT_ALARMS));
    const alarmTime = alarms[sessionKey] ? alarms[sessionKey].time : '08:00';
    const isStrictLock = localStorage.getItem(KEYS.STRICT_LOCK) === 'true';

    // Calculate time status
    const now = new Date();
    const [ah, am] = alarmTime.split(':').map(Number);
    const alarmDate = new Date();
    alarmDate.setHours(ah, am, 0, 0);

    const isTimeReached = now >= alarmDate || !isStrictLock;
    const diffMs = alarmDate - now;

    const statusEl = cardEl.querySelector('.session-status');
    const actionEl = cardEl.querySelector('.session-action');

    cardEl.classList.remove('is-active', 'is-completed');

    if (isDone) {
      cardEl.classList.add('is-completed');
      if (statusEl) statusEl.textContent = `Completed ${repCount}/${repCount} ✓`;
      if (actionEl) {
        actionEl.innerHTML = `<span class="completed-pill">Done ✦</span>`;
      }
    } else if (isTimeReached) {
      cardEl.classList.add('is-active');
      if (statusEl) statusEl.textContent = 'Open now';
      if (actionEl) {
        actionEl.innerHTML = `<button class="btn-write-gold" onclick="Cosmos369.openWritingModal('${sessionKey}', ${repCount})">Write</button>`;
      }
    } else {
      // Locked until time
      const hoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
      const minsLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const countdownStr = hoursLeft > 0 ? `${hoursLeft}h ${minsLeft}m` : `${minsLeft}m`;

      if (statusEl) statusEl.textContent = `Opens in ${countdownStr}`;
      if (actionEl) {
        actionEl.innerHTML = `
          <button class="btn-write-gold" style="background: rgba(212, 175, 55, 0.15); color: #fae4a8; border: 1px solid rgba(212,175,55,0.3);" onclick="Cosmos369.openWritingModal('${sessionKey}', ${repCount})">
            Write
          </button>
        `;
      }
    }
  }

  function updateJourneyView(streak, logs) {
    const hugeStreakEl = document.getElementById('streakHugeNumber');
    if (hugeStreakEl) hugeStreakEl.textContent = streak;

    // Render 33-day Constellation Grid
    const gridContainer = document.getElementById('daysGrid33');
    if (gridContainer) {
      gridContainer.innerHTML = '';
      const teslaMilestones = [3, 6, 9, 18, 27, 33];

      for (let day = 1; day <= 33; day++) {
        const node = document.createElement('div');
        node.className = 'day-node';

        if (day <= streak) {
          node.classList.add('is-completed');
          node.innerHTML = `<span>✓</span><span style="font-size:10px">${day}</span>`;
        } else if (day === streak + 1) {
          node.classList.add('is-current');
          node.innerHTML = `<span>${day}</span>`;
        } else {
          node.innerHTML = `<span>${day}</span>`;
        }

        if (teslaMilestones.includes(day)) {
          node.classList.add('is-tesla-milestone');
        }
        gridContainer.appendChild(node);
      }
    }

    // Render Recent History
    const historyContainer = document.getElementById('manifestationHistoryList');
    if (historyContainer) {
      const dates = Object.keys(logs).sort().reverse().slice(0, 7);
      if (dates.length === 0) {
        historyContainer.innerHTML = `<p style="font-size:13px; color:var(--text-dim); text-align:center; padding:12px;">Your sacred manifestation journey begins today.</p>`;
      } else {
        historyContainer.innerHTML = dates.map(d => {
          const entry = logs[d];
          const completedCount = [entry.morning, entry.afternoon, entry.evening].filter(Boolean).length;
          const statusIcon = completedCount === 3 ? '🌟 3/3 Complete' : `⏳ ${completedCount}/3 Sessions`;
          return `
            <div class="history-item">
              <div class="history-item-top">
                <span>${d}</span>
                <span>${statusIcon}</span>
              </div>
              <div class="history-item-quote">“${entry.quote || 'Manifestation in progress'}”</div>
            </div>
          `;
        }).join('');
      }
    }
  }

  // --- WRITING STUDIO MODAL LOGIC ---
  let currentWritingSession = null;
  let currentRepTarget = 3;

  function openWritingModal(sessionKey, count) {
    currentWritingSession = sessionKey;
    currentRepTarget = count;

    const overlay = document.getElementById('writingModalOverlay');
    const titleEl = document.getElementById('writingModalTitle');
    const refQuoteEl = document.getElementById('modalTargetRefQuote');
    const linesGroup = document.getElementById('repetitionLinesGroup');

    const sessionNames = {
      morning: 'Three — Morning Vibration',
      afternoon: 'Six — Afternoon Amplification',
      evening: 'Nine — Evening Subconscious Anchor'
    };

    const activeAffirmation = localStorage.getItem(KEYS.ACTIVE_AFFIRMATION) || DEFAULT_TEMPLATES[1].text;

    if (titleEl) titleEl.textContent = `${sessionNames[sessionKey]} (${count}x)`;
    if (refQuoteEl) refQuoteEl.textContent = `“${activeAffirmation}”`;

    // Render repetition input fields
    linesGroup.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'rep-line-item';
      lineDiv.id = `repLine_${i}`;
      lineDiv.innerHTML = `
        <div class="rep-counter-badge">${i}</div>
        <input type="text" class="rep-input-field" placeholder="Type repetition #${i}..." data-line="${i}" autocomplete="off" autocorrect="off" spellcheck="false" />
        <button type="button" class="btn-fill-suggest" title="Quick fill this repetition" onclick="Cosmos369.quickFillLine(${i})">✨ Fill</button>
      `;

      const input = lineDiv.querySelector('.rep-input-field');
      input.addEventListener('input', (e) => handleLineInput(e, i, count));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const nextInput = document.querySelector(`.rep-input-field[data-line="${i + 1}"]`);
          if (nextInput) nextInput.focus();
        }
      });

      linesGroup.appendChild(lineDiv);
    }

    updateCompleteButtonState(count);
    overlay.classList.add('active');

    // Auto focus first line
    setTimeout(() => {
      const firstInput = linesGroup.querySelector('.rep-input-field');
      if (firstInput) firstInput.focus();
    }, 150);
  }

  function handleLineInput(e, lineIdx, totalCount) {
    const val = e.target.value.trim();
    const item = document.getElementById(`repLine_${lineIdx}`);
    if (val.length > 3) {
      item.classList.add('completed');
    } else {
      item.classList.remove('completed');
    }
    playKeyChime();
    updateCompleteButtonState(totalCount);
  }

  function quickFillLine(lineIdx) {
    const activeAffirmation = localStorage.getItem(KEYS.ACTIVE_AFFIRMATION) || DEFAULT_TEMPLATES[1].text;
    const input = document.querySelector(`.rep-input-field[data-line="${lineIdx}"]`);
    if (input) {
      input.value = activeAffirmation;
      const item = document.getElementById(`repLine_${lineIdx}`);
      if (item) item.classList.add('completed');
      playKeyChime();
      updateCompleteButtonState(currentRepTarget);

      // Focus next empty line
      const nextInput = document.querySelector(`.rep-input-field[data-line="${lineIdx + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  }

  function quickFillAllLines() {
    const activeAffirmation = localStorage.getItem(KEYS.ACTIVE_AFFIRMATION) || DEFAULT_TEMPLATES[1].text;
    const inputs = document.querySelectorAll('.rep-input-field');
    inputs.forEach(input => {
      input.value = activeAffirmation;
      const line = input.getAttribute('data-line');
      const item = document.getElementById(`repLine_${line}`);
      if (item) item.classList.add('completed');
    });
    playSynthTone('harp', 0.5);
    updateCompleteButtonState(currentRepTarget);
  }

  function updateCompleteButtonState(totalCount) {
    const completedItems = document.querySelectorAll('.rep-line-item.completed');
    const completeBtn = document.getElementById('btnCompleteSession');
    if (completeBtn) {
      const isAllFilled = completedItems.length >= totalCount;
      completeBtn.disabled = !isAllFilled;
      completeBtn.textContent = isAllFilled 
        ? `Anchor ${totalCount} Repetitions ✦ Complete` 
        : `Written ${completedItems.length} of ${totalCount}`;
    }
  }

  function completeWritingSession() {
    if (!currentWritingSession) return;
    markSessionComplete(currentWritingSession);
    closeWritingModal();
    triggerCelebrationParticles();
    playSynthTone('solfeggio', 0.8);
  }

  function closeWritingModal() {
    const overlay = document.getElementById('writingModalOverlay');
    if (overlay) overlay.classList.remove('active');
    currentWritingSession = null;
  }

  // --- TEMPLATES LIBRARY (LIFE ASPECTS) ---
  function getTemplates() {
    const custom = JSON.parse(localStorage.getItem(KEYS.CUSTOM_TEMPLATES) || '[]');
    return [...custom, ...DEFAULT_TEMPLATES];
  }

  function renderTemplates(filterCategory = 'all', searchQuery = '') {
    const container = document.getElementById('templatesListContainer');
    if (!container) return;

    const all = getTemplates();
    const activeAffirmation = localStorage.getItem(KEYS.ACTIVE_AFFIRMATION) || DEFAULT_TEMPLATES[1].text;

    const filtered = all.filter(t => {
      const matchCat = filterCategory === 'all' || t.category.toLowerCase() === filterCategory.toLowerCase();
      const matchQuery = !searchQuery || t.text.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 20px; color:var(--text-muted);">
          <p style="font-size:15px; margin-bottom:8px;">No affirmations found.</p>
          <button class="btn-write-gold" onclick="Cosmos369.openCustomTemplateModal()">+ Create New Affirmation</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isActive = item.text === activeAffirmation;
      return `
        <div class="template-item-card ${isActive ? 'is-current-active' : ''}">
          <div class="template-header-row">
            <span class="template-cat-tag">✦ ${item.badge || item.category}</span>
            ${isActive ? '<span style="font-size:11px; color:var(--success); font-weight:700;">ACTIVE NOW</span>' : ''}
          </div>
          <div class="template-body-text">“${item.text}”</div>
          <div class="template-footer-actions">
            ${isActive 
              ? `<button class="btn-use-template active-badge">In Practice ✓</button>` 
              : `<button class="btn-use-template" onclick="Cosmos369.setActiveAffirmation('${escapeHtml(item.text)}', '${escapeHtml(item.category)}')">Set as Active</button>`
            }
            <div class="template-secondary-btns">
              <button class="btn-icon-subtle" title="Edit sentence" onclick="Cosmos369.editAndUseTemplate('${escapeHtml(item.text)}', '${escapeHtml(item.category)}')">✎</button>
              <button class="btn-icon-subtle" title="Copy text" onclick="Cosmos369.copyTemplate('${escapeHtml(item.text)}')">📋</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function setActiveAffirmation(text, category) {
    localStorage.setItem(KEYS.ACTIVE_AFFIRMATION, text);
    localStorage.setItem(KEYS.ACTIVE_CATEGORY, category || 'Sacred');
    showToast('✨ Manifestation sentence set as active!');
    updateUI();
    renderTemplates();
  }

  function editAndUseTemplate(text, category) {
    const newText = prompt('Customize your manifestation affirmation sentence:', text);
    if (newText && newText.trim()) {
      setActiveAffirmation(newText.trim(), category);
    }
  }

  function copyTemplate(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard ✦');
    }).catch(() => {
      showToast('Affirmation ready to write!');
    });
  }

  function saveCustomTemplate(text, category) {
    if (!text || !text.trim()) return;
    const custom = JSON.parse(localStorage.getItem(KEYS.CUSTOM_TEMPLATES) || '[]');
    const newTemplate = {
      id: 'custom_' + Date.now(),
      category: category || 'Custom',
      badge: `✨ ${category || 'Custom'}`,
      text: text.trim()
    };
    custom.unshift(newTemplate);
    localStorage.setItem(KEYS.CUSTOM_TEMPLATES, JSON.stringify(custom));
    setActiveAffirmation(newTemplate.text, newTemplate.category);
    renderTemplates();
  }

  // --- ALARMS & SOUND STUDIO ENGINE ---
  function loadAlarmSettings() {
    const alarms = JSON.parse(localStorage.getItem(KEYS.ALARMS) || JSON.stringify(DEFAULT_ALARMS));

    const morningTimeInput = document.getElementById('alarmMorningTime');
    const morningToggle = document.getElementById('alarmMorningToggle');
    if (morningTimeInput) morningTimeInput.value = alarms.morning.time;
    if (morningToggle) morningToggle.checked = alarms.morning.enabled;

    const afternoonTimeInput = document.getElementById('alarmAfternoonTime');
    const afternoonToggle = document.getElementById('alarmAfternoonToggle');
    if (afternoonTimeInput) afternoonTimeInput.value = alarms.afternoon.time;
    if (afternoonToggle) afternoonToggle.checked = alarms.afternoon.enabled;

    const eveningTimeInput = document.getElementById('alarmEveningTime');
    const eveningToggle = document.getElementById('alarmEveningToggle');
    if (eveningTimeInput) eveningTimeInput.value = alarms.evening.time;
    if (eveningToggle) eveningToggle.checked = alarms.evening.enabled;

    // Volume
    const vol = parseFloat(localStorage.getItem(KEYS.VOLUME) || '0.8');
    const volSlider = document.getElementById('volumeSlider');
    if (volSlider) volSlider.value = vol;

    // Strict Lock
    const strictToggle = document.getElementById('strictLockToggle');
    if (strictToggle) {
      strictToggle.checked = localStorage.getItem(KEYS.STRICT_LOCK) === 'true';
    }

    renderToneSelector();
  }

  function saveAlarmsFromUI() {
    const alarms = {
      morning: {
        enabled: document.getElementById('alarmMorningToggle').checked,
        time: document.getElementById('alarmMorningTime').value,
        label: 'Three (Morning)'
      },
      afternoon: {
        enabled: document.getElementById('alarmAfternoonToggle').checked,
        time: document.getElementById('alarmAfternoonTime').value,
        label: 'Six (Afternoon)'
      },
      evening: {
        enabled: document.getElementById('alarmEveningToggle').checked,
        time: document.getElementById('alarmEveningTime').value,
        label: 'Nine (Evening)'
      }
    };
    localStorage.setItem(KEYS.ALARMS, JSON.stringify(alarms));
    showToast('Alarm schedule saved ✦');
    updateUI();
  }

  async function renderToneSelector() {
    const selected = localStorage.getItem(KEYS.SELECTED_TONE) || 'solfeggio';
    const customFile = await getCustomAudioFile();

    const options = [
      { id: 'solfeggio', title: '528 Hz Solfeggio Miracle Frequency', sub: 'Sacred DNA repair & transformation chime' },
      { id: 'singing-bowl', title: 'Tibetan Singing Bowl', sub: 'Deep harmonic grounding resonance' },
      { id: 'zen-gong', title: 'Zen Temple Gong', sub: 'Mindful presence & inner clarity' },
      { id: 'harp', title: 'Celestial Harp Arpeggio', sub: 'Light, uplifting heavenly progression' },
      { id: 'bell', title: 'Sacred Crystal Bell', sub: 'Crisp, serene awakening tone' }
    ];

    const container = document.getElementById('toneOptionsContainer');
    if (!container) return;

    let html = options.map(t => `
      <div class="tone-option-card ${selected === t.id ? 'selected' : ''}" onclick="Cosmos369.selectTone('${t.id}')">
        <div class="tone-title-info">
          <h5>${t.title}</h5>
          <p>${t.sub}</p>
        </div>
        <div>${selected === t.id ? '✦' : ''}</div>
      </div>
    `).join('');

    // Custom audio option if exists
    if (customFile) {
      html += `
        <div class="tone-option-card ${selected === 'custom' ? 'selected' : ''}" onclick="Cosmos369.selectTone('custom')">
          <div class="tone-title-info">
            <h5>🎵 Custom Tone: ${escapeHtml(customFile.name)}</h5>
            <p>Your uploaded sound (${(customFile.size / 1024).toFixed(1)} KB)</p>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            ${selected === 'custom' ? '✦' : ''}
            <button class="btn-icon-subtle" title="Delete custom sound" onclick="event.stopPropagation(); Cosmos369.removeCustomTone()">🗑️</button>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  function selectTone(toneId) {
    localStorage.setItem(KEYS.SELECTED_TONE, toneId);
    renderToneSelector();
    triggerAlarmSound(false);
  }

  async function handleCustomAudioUpload(file) {
    if (!file) return;
    try {
      await saveCustomAudioFile(file);
      customToneObjectUrl = null; // Reset cached object URL
      localStorage.setItem(KEYS.SELECTED_TONE, 'custom');
      await renderToneSelector();
      showToast(`Custom tone "${file.name}" saved! 🎵`);
      triggerAlarmSound(false);
    } catch (e) {
      alert('Could not save audio file: ' + e.message);
    }
  }

  async function removeCustomTone() {
    if (confirm('Remove your custom uploaded alarm tone?')) {
      await deleteCustomAudioFile();
      customToneObjectUrl = null;
      localStorage.setItem(KEYS.SELECTED_TONE, 'solfeggio');
      await renderToneSelector();
      showToast('Custom tone removed');
    }
  }

  // Check alarm times every 2 seconds
  let lastAlarmFiredMinute = '';
  function runAlarmChecker() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentMinuteStr = `${hh}:${mm}`;

    if (currentMinuteStr === lastAlarmFiredMinute) return;

    const alarms = JSON.parse(localStorage.getItem(KEYS.ALARMS) || JSON.stringify(DEFAULT_ALARMS));
    const today = getTodayString();
    const logs = getDailyLogs();
    const todayLog = logs[today] || { morning: false, afternoon: false, evening: false };

    const sessionKeys = [
      { key: 'morning', count: 3, name: 'Morning (Three)' },
      { key: 'afternoon', count: 6, name: 'Afternoon (Six)' },
      { key: 'evening', count: 9, name: 'Evening (Nine)' }
    ];

    sessionKeys.forEach(s => {
      const alarmConfig = alarms[s.key];
      if (alarmConfig && alarmConfig.enabled && alarmConfig.time === currentMinuteStr) {
        if (!todayLog[s.key]) {
          lastAlarmFiredMinute = currentMinuteStr;
          fireActiveAlarm(s.key, s.count, s.name);
        }
      }
    });
  }

  function fireActiveAlarm(sessionKey, repCount, sessionName) {
    // 1. Show Ringing Overlay
    const overlay = document.getElementById('alarmRingOverlay');
    const title = document.getElementById('alarmRingSessionTitle');
    const sub = document.getElementById('alarmRingSessionSub');

    if (title) title.textContent = `Time for your 369 ${sessionName}!`;
    if (sub) sub.textContent = `Pause what you are doing. Speak and write your sacred manifestation ${repCount} times into the universe.`;
    
    if (overlay) overlay.classList.add('active');

    // 2. Play Alarm Tone in Loop
    triggerAlarmSound(true);

    // 3. Vibrate device (Android vibration pattern)
    if ('vibrate' in navigator) {
      navigator.vibrate([400, 250, 400, 250, 800]);
    }

    // 4. Send Web Notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      const activeAffirmation = localStorage.getItem(KEYS.ACTIVE_AFFIRMATION) || DEFAULT_TEMPLATES[1].text;
      new Notification(`✨ 369 Manifestation Time: ${sessionName}`, {
        body: `“${activeAffirmation}” — Time to write ${repCount} times!`,
        icon: 'icons/icon-369.svg',
        vibrate: [300, 200, 300]
      });
    }
  }

  function dismissActiveAlarm() {
    const overlay = document.getElementById('alarmRingOverlay');
    if (overlay) overlay.classList.remove('active');
    stopCurrentAlarmSound();
  }

  function writeNowFromAlarm(sessionKey, repCount) {
    dismissActiveAlarm();
    openWritingModal(sessionKey, repCount);
  }

  // --- PWA INSTALLATION HELPER ---
  let deferredInstallPrompt = null;

  function initPWA() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
          console.log('369 Service Worker active:', reg.scope);
        }).catch((err) => {
          console.warn('SW registration failed:', err);
        });
      });
    }

    // Capture install prompt for Android/Chrome
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      const banner = document.getElementById('pwaInstallBanner');
      if (banner) banner.style.display = 'flex';
    });

    // Handle installed state
    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      const banner = document.getElementById('pwaInstallBanner');
      if (banner) banner.style.display = 'none';
      showToast('🎉 369 Method is installed on your device!');
    });
  }

  function promptInstallPWA() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          showToast('Installing 369 App...');
        }
        deferredInstallPrompt = null;
      });
    } else {
      // Show Android Guide Modal
      const modal = document.getElementById('androidInstallGuideModal');
      if (modal) modal.classList.add('active');
    }
  }

  // --- CELEBRATION EFFECTS ---
  function triggerCelebrationParticles() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#fae4a8', '#e5c07b', '#d4af37', '#ffffff', '#10b981'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 3,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life -= p.decay;
        if (p.life > 0) {
          alive = true;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      if (alive) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    render();
  }

  function showSacred33CompletionCelebration() {
    const activeAffirmation = localStorage.getItem(KEYS.ACTIVE_AFFIRMATION) || DEFAULT_TEMPLATES[1].text;
    alert(`👑 CONGRATULATIONS! You have completed the sacred 33-Day Manifestation Cycle for:\n\n“${activeAffirmation}”\n\nYour vibrational energy is fully synchronized with the 3-6-9 frequency!`);
  }

  // --- BACKGROUND COSMIC CANVAS ---
  function initCosmicCanvas() {
    const canvas = document.getElementById('spaceCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = [];
    const numStars = window.innerWidth < 600 ? 55 : 95;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.3,
        alpha: Math.random() * 0.7 + 0.2,
        delta: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.delta;
        if (s.alpha > 0.95 || s.alpha < 0.2) s.delta = -s.delta;
        ctx.fillStyle = `rgba(255, 248, 230, ${Math.max(0.1, s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

  // --- TAB ROUTING ---
  function switchTab(tabId) {
    document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));

    const targetView = document.getElementById(`view_${tabId}`);
    const targetBtn = document.getElementById(`tabBtn_${tabId}`);

    if (targetView) targetView.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabId === 'templates') {
      renderTemplates();
    } else if (tabId === 'alarms') {
      loadAlarmSettings();
    } else if (tabId === 'journey') {
      updateUI();
    }
  }

  // --- HELPERS ---
  function showToast(msg) {
    const toast = document.getElementById('cosmosToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initCosmicCanvas();
    initPWA();
    checkAndVerifyStreak();
    updateUI();
    loadAlarmSettings();

    // Check alarms every 2 seconds
    setInterval(runAlarmChecker, 2000);

    // Request notification permission on first user tap if supported
    if ('Notification' in window && Notification.permission === 'default') {
      document.body.addEventListener('click', function requestOnce() {
        Notification.requestPermission();
        document.body.removeEventListener('click', requestOnce);
      }, { once: true });
    }

    // Attach search input
    const searchInput = document.getElementById('templateSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const cat = document.querySelector('.category-pill.active')?.getAttribute('data-cat') || 'all';
        renderTemplates(cat, e.target.value.trim());
      });
    }

    // Category pills filter
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.getAttribute('data-cat');
        const searchVal = document.getElementById('templateSearchInput')?.value.trim() || '';
        renderTemplates(cat, searchVal);
      });
    });

    // Custom tone audio file input
    const fileInput = document.getElementById('customToneFileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleCustomAudioUpload(e.target.files[0]);
        }
      });
    }

    // Volume slider
    const volSlider = document.getElementById('volumeSlider');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        localStorage.setItem(KEYS.VOLUME, e.target.value);
      });
    }

    // Strict lock toggle
    const strictToggle = document.getElementById('strictLockToggle');
    if (strictToggle) {
      strictToggle.addEventListener('change', (e) => {
        localStorage.setItem(KEYS.STRICT_LOCK, e.target.checked ? 'true' : 'false');
        updateUI();
      });
    }
  });

  // Export to global scope for HTML event handlers
  window.Cosmos369 = {
    switchTab,
    openWritingModal,
    closeWritingModal,
    quickFillLine,
    quickFillAllLines,
    completeWritingSession,
    setActiveAffirmation,
    editAndUseTemplate,
    copyTemplate,
    selectTone,
    triggerAlarmSound,
    stopCurrentAlarmSound,
    removeCustomTone,
    saveAlarmsFromUI,
    dismissActiveAlarm,
    writeNowFromAlarm,
    promptInstallPWA,
    openCustomTemplateModal: () => {
      const text = prompt('Enter your sacred manifestation sentence (e.g. "I am attracting..."):');
      if (text && text.trim()) {
        const cat = prompt('Which life aspect category? (Relationship, Self Care, Career, Business, Wealth, Health, Inner Peace, Spiritual):', 'Self Care');
        saveCustomTemplate(text, cat);
      }
    }
  };

})();
