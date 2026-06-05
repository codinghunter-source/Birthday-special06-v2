// ============================================================
// "Cherry Cherry Lady" — Modern Talking (1985) Synth Replica
// Web Audio API only — no files, no network, works offline
// Key: C major | BPM: 128 | Bright 80s Euro-disco synth
// ============================================================

const N: { [k: string]: number } = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
};

interface Note { freq: number; dur: number; rest?: number }

// ── "Cherry Cherry Lady" — Iconic synth melody ───────────────────────
// The main synth hook & verse melody that loops throughout the song
const CHERRY_MELODY: Note[] = [
  // ── Main synth riff intro ────────────────────────────────────────────
  { freq: N.G4, dur: 0.25 },
  { freq: N.A4, dur: 0.25 },
  { freq: N.G4, dur: 0.25 },
  { freq: N.E4, dur: 0.5 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.25 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.E4, dur: 0.5 },

  { freq: N.D4, dur: 0.25 },
  { freq: N.E4, dur: 0.25 },
  { freq: N.D4, dur: 0.25 },
  { freq: N.C4, dur: 0.5 },
  { freq: N.D4, dur: 0.5 },
  { freq: N.E4, dur: 0.25 },
  { freq: N.D4, dur: 0.75 },

  // ── "Cherry Cherry Lady" melodic hook ────────────────────────────────
  { freq: N.E4, dur: 0.5 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.G4, dur: 0.25 },
  { freq: N.E4, dur: 0.25 },
  { freq: N.D4, dur: 0.5 },
  { freq: N.C4, dur: 1.0, rest: 0.25 },

  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.B4, dur: 0.5 },
  { freq: N.A4, dur: 0.25 },
  { freq: N.G4, dur: 0.25 },
  { freq: N.F4, dur: 0.5 },
  { freq: N.E4, dur: 1.0, rest: 0.25 },

  // ── Upward climb ─────────────────────────────────────────────────────
  { freq: N.C5, dur: 0.5 },
  { freq: N.B4, dur: 0.25 },
  { freq: N.A4, dur: 0.25 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.B4, dur: 0.5 },
  { freq: N.C5, dur: 0.75, rest: 0.25 },

  { freq: N.B4, dur: 0.5 },
  { freq: N.A4, dur: 0.25 },
  { freq: N.G4, dur: 0.25 },
  { freq: N.F4, dur: 0.5 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.G4, dur: 1.5, rest: 0.5 },

  // ── Chorus peak ──────────────────────────────────────────────────────
  { freq: N.D5, dur: 0.5 },
  { freq: N.C5, dur: 0.5 },
  { freq: N.B4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.B4, dur: 1.0, rest: 0.25 },

  { freq: N.C5, dur: 0.5 },
  { freq: N.B4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.E4, dur: 0.5 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 1.5, rest: 0.5 },

  // ── Resolution ───────────────────────────────────────────────────────
  { freq: N.G4, dur: 0.25 },
  { freq: N.A4, dur: 0.25 },
  { freq: N.G4, dur: 0.25 },
  { freq: N.E4, dur: 0.5 },
  { freq: N.D4, dur: 0.5 },
  { freq: N.C4, dur: 0.5 },
  { freq: N.D4, dur: 0.25 },
  { freq: N.E4, dur: 0.25 },
  { freq: N.G4, dur: 2.0, rest: 0.5 },
];

// ── Disco bass line — root + fifth walk ──────────────────────────────────
const CHERRY_BASS: Note[] = [
  { freq: N.C3, dur: 0.5 }, { freq: N.C3, dur: 0.5 },
  { freq: N.G3, dur: 0.5 }, { freq: N.G3, dur: 0.5 },
  { freq: N.A3, dur: 0.5 }, { freq: N.A3, dur: 0.5 },
  { freq: N.G3, dur: 0.5 }, { freq: N.G3, dur: 0.5 },
  { freq: N.F3, dur: 0.5 }, { freq: N.F3, dur: 0.5 },
  { freq: N.G3, dur: 0.5 }, { freq: N.G3, dur: 0.5 },
  { freq: N.C3, dur: 0.5 }, { freq: N.C3, dur: 0.5 },
  { freq: N.G3, dur: 0.5 }, { freq: N.G3, dur: 0.5 },
];

// ── Euro-disco chord stabs (every 2 beats) ──────────────────────────────────
const CHORD_FREQS = [
  [N.C4, N.E4, N.G4],  // C major
  [N.G3, N.B3, N.D4],  // G major
  [N.A3, N.C4, N.E4],  // A minor
  [N.F3, N.A3, N.C4],  // F major
];

// ============================================================
export class CherryLadyMusic {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private stopCallbacks: (() => void)[] = [];
  private readonly bpm = 128;

  private initCtx() {
    if (!this.ctx) {
      const AC = window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.38, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  // ── 80s bright square-wave synth lead ────────────────────
  private playSynthLead(freq: number, t: number, dur: number, vol = 0.11) {
    const ctx = this.ctx!;
    // Primary square wave (80s synth character)
    const osc  = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const lp   = ctx.createBiquadFilter();
    const g    = ctx.createGain();
    // Chorus effect: two slightly detuned oscillators
    osc.type  = 'square'; osc.frequency.value = freq; osc.detune.value = 0;
    osc2.type = 'square'; osc2.frequency.value = freq; osc2.detune.value = 12;
    lp.type = 'lowpass'; lp.frequency.value = 2800; lp.Q.value = 2.5;
    // Punchy synth envelope: fast attack, light sustain
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);
    g.gain.setValueAtTime(vol * 0.75, t + 0.07);
    g.gain.linearRampToValueAtTime(vol * 0.6, t + dur * 0.7);
    g.gain.linearRampToValueAtTime(0, t + dur);
    osc.connect(lp); osc2.connect(lp); lp.connect(g); g.connect(this.masterGain!);
    osc.start(t); osc.stop(t + dur + 0.05);
    osc2.start(t); osc2.stop(t + dur + 0.05);
  }

  // ── Euro-disco chord stab ────────────────────────────────
  private playChordStab(freqs: number[], t: number) {
    const ctx = this.ctx!;
    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      const lp  = ctx.createBiquadFilter();
      osc.type = 'sawtooth'; osc.frequency.value = freq;
      lp.type = 'lowpass'; lp.frequency.value = 1800; lp.Q.value = 1;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.04, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      osc.connect(lp); lp.connect(g); g.connect(this.masterGain!);
      osc.start(t); osc.stop(t + 0.35);
    });
  }

  // ── Disco bass ───────────────────────────────────────────
  private playBass(freq: number, t: number, dur: number) {
    const ctx = this.ctx!;
    const osc  = ctx.createOscillator();
    const lp   = ctx.createBiquadFilter();
    const g    = ctx.createGain();
    osc.type = 'sawtooth'; osc.frequency.value = freq;
    lp.type = 'lowpass'; lp.frequency.value = 350; lp.Q.value = 0.8;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.22, t + 0.015);
    g.gain.setValueAtTime(0.22, t + dur * 0.7);
    g.gain.linearRampToValueAtTime(0, t + dur);
    osc.connect(lp); lp.connect(g); g.connect(this.masterGain!);
    osc.start(t); osc.stop(t + dur + 0.05);
  }

  // ── High glitzy arpeggio shimmer ────────────────────────
  private playArp(base: number, t: number) {
    const ctx = this.ctx!;
    [0, 4, 7, 12, 16].forEach((semi, i) => {
      const freq = base * Math.pow(2, semi / 12);
      const ti   = t + i * 0.06;
      const osc  = ctx.createOscillator();
      const g    = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq * 2;
      g.gain.setValueAtTime(0, ti);
      g.gain.linearRampToValueAtTime(0.022, ti + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ti + 0.38);
      osc.connect(g); g.connect(this.masterGain!);
      osc.start(ti); osc.stop(ti + 0.45);
    });
  }

  private scheduleSong(startAt: number): number {
    const beat = 60 / this.bpm;

    // Lead melody
    let lt = startAt;
    for (const n of CHERRY_MELODY) {
      const r   = (n.rest ?? 0) * beat;
      const dur = n.dur * beat;
      this.playSynthLead(n.freq, lt + r, dur, 0.11);
      lt += r + dur;
    }

    // Bass line (repeated to cover full melody length)
    const bassLoops = Math.ceil(lt / (CHERRY_BASS.reduce((s, n) => s + n.dur, 0) * beat));
    let bt = startAt;
    for (let loop = 0; loop < bassLoops; loop++) {
      for (const n of CHERRY_BASS) {
        const dur = n.dur * beat;
        this.playBass(n.freq, bt, dur);
        bt += dur;
      }
    }

    // Chord stabs every 2 beats
    const beats = Math.floor((lt - startAt) / beat);
    for (let b = 0; b < beats; b += 2) {
      const chord = CHORD_FREQS[Math.floor(b / 2) % CHORD_FREQS.length];
      this.playChordStab(chord, startAt + b * beat);
    }

    // Glitzy arpeggios every 4 beats
    for (let i = 0; i < Math.floor(beats / 4); i++) {
      this.playArp(N.C5, startAt + i * 4 * beat);
    }

    return lt - startAt;
  }

  public play() {
    if (this.isPlaying) return;
    this.initCtx();
    this.isPlaying = true;
    const loop = () => {
      if (!this.isPlaying || !this.ctx) return;
      const dur = this.scheduleSong(this.ctx.currentTime + 0.05);
      const tid = setTimeout(loop, (dur - 0.4) * 1000);
      this.stopCallbacks.push(() => clearTimeout(tid));
    };
    loop();
  }

  public stop() {
    this.isPlaying = false;
    this.stopCallbacks.forEach(fn => fn());
    this.stopCallbacks = [];
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.7);
      setTimeout(() => {
        if (this.masterGain && this.ctx)
          this.masterGain.gain.setValueAtTime(0.38, this.ctx!.currentTime);
      }, 800);
    }
  }

  public setVolume(v: number) {
    if (this.masterGain && this.ctx)
      this.masterGain.gain.linearRampToValueAtTime(v, this.ctx.currentTime + 0.3);
  }

  public get playing() { return this.isPlaying; }
}

export const cherryLadyMusic =
  typeof window !== 'undefined' ? new CherryLadyMusic() : null;
export default cherryLadyMusic;
