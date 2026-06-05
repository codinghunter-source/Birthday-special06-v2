// ============================================================
// "Tum Hi Ho" — Aashiqui 2 (2013) Web Audio API Synthesizer
// Key: A minor | BPM: 65 | Slow, emotional, layered
// Lead melody + strings pad + bass + shimmer harmonics
// ============================================================

const N: { [k: string]: number } = {
  // Bass register
  A2: 110.00, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, C3: 130.81,
  // Mid register
  A3: 220.00, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63,
  F4: 349.23, G4: 392.00,
  // Upper register
  A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25,
  F5: 698.46, G5: 783.99,
};

interface Note { freq: number; dur: number; rest?: number }

// ── "Tum Hi Ho" iconic piano/violin melody (A minor) ──────────────────────
// Opening instrumental + chorus hook
const TUM_HI_HO: Note[] = [
  // ── Intro phrase — iconic descending run ──
  { freq: N.E5, dur: 0.5 },
  { freq: N.D5, dur: 0.5 },
  { freq: N.C5, dur: 1.0 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 2.0, rest: 0.25 },

  // ── "Hum tere bin ab reh nahi sakte" ──
  { freq: N.E4, dur: 0.75 },
  { freq: N.E4, dur: 0.25 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.75 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.E4, dur: 0.5 },
  { freq: N.D4, dur: 2.0, rest: 0.25 },

  // ── "Tere bina kya wajood mera" ──
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.75 },
  { freq: N.C5, dur: 1.0 },
  { freq: N.B4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.G4, dur: 1.5, rest: 0.25 },

  // ── "Tum hi ho" chorus hook ──
  { freq: N.A4, dur: 1.0 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.F4, dur: 0.5 },
  { freq: N.E4, dur: 1.5 },
  { freq: N.D4, dur: 0.5 },
  { freq: N.C4, dur: 2.0, rest: 0.5 },

  // ── "Ab tum hi ho" rising ──
  { freq: N.A4, dur: 0.5 },
  { freq: N.B4, dur: 0.5 },
  { freq: N.C5, dur: 1.0 },
  { freq: N.B4, dur: 0.5 },
  { freq: N.A4, dur: 0.5 },
  { freq: N.G4, dur: 1.5, rest: 0.25 },

  // ── "Zindagi ab tum hi ho" ──
  { freq: N.A4, dur: 0.5 },
  { freq: N.G4, dur: 0.25 },
  { freq: N.F4, dur: 0.5 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 0.75 },
  { freq: N.C5, dur: 1.0 },
  { freq: N.B4, dur: 0.5 },
  { freq: N.A4, dur: 1.0, rest: 0.25 },

  // ── Resolve cadence ──
  { freq: N.E5, dur: 0.5 },
  { freq: N.D5, dur: 0.5 },
  { freq: N.C5, dur: 0.75 },
  { freq: N.A4, dur: 0.75 },
  { freq: N.G4, dur: 0.5 },
  { freq: N.A4, dur: 3.5, rest: 1.0 },
];

// Bass chord walk — A minor progression: Am - F - C - G
const BASS: Note[] = [
  { freq: N.A2, dur: 4 },  // Am
  { freq: N.F3, dur: 4 },  // F
  { freq: N.C3, dur: 4 },  // C
  { freq: N.G3, dur: 4 },  // G
  { freq: N.A2, dur: 4 },
  { freq: N.E3, dur: 4 },
  { freq: N.D3, dur: 4 },
  { freq: N.A2, dur: 4 },
];

// ────────────────────────────────────────────────────────────
export class MusicBox {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private stopCallbacks: (() => void)[] = [];
  private readonly bpm = 65;

  private initCtx() {
    if (!this.ctx) {
      const AC = window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  // ── Warm string pad (detuned sawtooth) ────────────────────
  private playStrings(freq: number, t: number, dur: number, vol = 0.07) {
    const ctx = this.ctx!;
    [0, 8, -8].forEach(detune => {
      const osc = ctx.createOscillator();
      const lp  = ctx.createBiquadFilter();
      const g   = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      osc.detune.value = detune;
      lp.type = 'lowpass'; lp.frequency.value = 1200; lp.Q.value = 0.6;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + Math.min(dur * 0.4, 1.4));
      g.gain.setValueAtTime(vol, t + dur * 0.65);
      g.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(lp); lp.connect(g); g.connect(this.masterGain!);
      osc.start(t); osc.stop(t + dur + 0.1);
    });
  }

  // ── Piano/pluck tone with delay echo ──────────────────────
  private playPiano(freq: number, t: number, dur: number, vol = 0.13) {
    const ctx = this.ctx!;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const g    = ctx.createGain();
    const dly  = ctx.createDelay(0.5);
    const dlyG = ctx.createGain();
    osc1.type = 'triangle'; osc2.type = 'sine';
    osc1.frequency.value = freq; osc2.frequency.value = freq * 2.001;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(vol * 0.45, t + 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.min(dur, 4));
    dly.delayTime.value = 0.21; dlyG.gain.value = 0.17;
    osc1.connect(g); osc2.connect(g);
    g.connect(this.masterGain!); g.connect(dly); dly.connect(dlyG); dlyG.connect(this.masterGain!);
    osc1.start(t); osc1.stop(t + dur + 0.5);
    osc2.start(t); osc2.stop(t + dur + 0.5);
  }

  // ── Bass sine ─────────────────────────────────────────────
  private playBass(freq: number, t: number, dur: number) {
    const ctx = this.ctx!;
    const osc  = ctx.createOscillator();
    const filt = ctx.createBiquadFilter();
    const g    = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    filt.type = 'lowpass'; filt.frequency.value = 300;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.2, t + 0.05);
    g.gain.setValueAtTime(0.2, t + dur - 0.3);
    g.gain.linearRampToValueAtTime(0, t + dur);
    osc.connect(filt); filt.connect(g); g.connect(this.masterGain!);
    osc.start(t); osc.stop(t + dur + 0.1);
  }

  // ── High shimmer arpeggio ─────────────────────────────────
  private shimmer(base: number, t: number) {
    const ctx = this.ctx!;
    [0, 5, 7, 12].forEach((semi, i) => {
      const freq = base * Math.pow(2, semi / 12);
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      const ti  = t + i * 0.11;
      osc.type = 'sine'; osc.frequency.value = freq * 2;
      g.gain.setValueAtTime(0, ti);
      g.gain.linearRampToValueAtTime(0.025, ti + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ti + 0.55);
      osc.connect(g); g.connect(this.masterGain!);
      osc.start(ti); osc.stop(ti + 0.65);
    });
  }

  private scheduleSong(startAt: number): number {
    const beat = 60 / this.bpm;
    // Lead + strings
    let lt = startAt;
    for (const n of TUM_HI_HO) {
      const r   = (n.rest ?? 0) * beat;
      const dur = n.dur * beat;
      this.playPiano(n.freq, lt + r, dur, 0.13);
      this.playStrings(n.freq * 0.5, lt + r, dur, 0.05);
      lt += r + dur;
    }
    // Bass
    let bt = startAt;
    for (const n of BASS) {
      const dur = n.dur * beat;
      this.playBass(n.freq, bt, dur);
      bt += dur;
    }
    // Shimmer every 4 beats
    for (let i = 0; i < 10; i++) {
      this.shimmer(N.A4, startAt + i * 4 * beat);
    }
    return Math.max(lt - startAt, bt - startAt);
  }

  public play() {
    if (this.isPlaying) return;
    this.initCtx();
    this.isPlaying = true;
    const loop = () => {
      if (!this.isPlaying || !this.ctx) return;
      const dur = this.scheduleSong(this.ctx.currentTime + 0.05);
      const tid = setTimeout(loop, (dur - 0.3) * 1000);
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
          this.masterGain.gain.setValueAtTime(0.55, this.ctx!.currentTime);
      }, 800);
    }
  }

  public setVolume(v: number) {
    if (this.masterGain && this.ctx)
      this.masterGain.gain.linearRampToValueAtTime(v, this.ctx.currentTime + 0.3);
  }
}

export const musicBoxInstance =
  typeof window !== 'undefined' ? new MusicBox() : null;
export default musicBoxInstance;
