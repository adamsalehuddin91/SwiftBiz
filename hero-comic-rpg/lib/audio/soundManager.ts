import { Howl } from 'howler';

// Sound Manager for 8-bit RPG
class SoundManager {
  private bgm: Howl | null = null;
  private sfx: Map<string, Howl> = new Map();
  private bgmVolume: number = 0.3;
  private sfxVolume: number = 0.5;
  private isMuted: boolean = false;

  // Initialize sound system
  init() {
    // We'll use generated 8-bit sounds via Web Audio API
    // Or you can add audio files later
    this.createSFX();
  }

  // Create 8-bit sound effects using Web Audio API
  private createSFX() {
    // We'll generate simple beep sounds for now
    // You can replace these with actual audio files
  }

  // Play background music
  playBGM(track: 'menu' | 'battle' | 'boss' | 'victory') {
    if (this.isMuted) return;

    // Stop current BGM
    if (this.bgm) {
      this.bgm.stop();
    }

    // For now, we'll use placeholder
    // You can add actual music files later
    console.log(`Playing BGM: ${track}`);
  }

  // Stop background music
  stopBGM() {
    if (this.bgm) {
      this.bgm.stop();
    }
  }

  // Play sound effect using Web Audio API (8-bit style)
  playSFX(type: 'attack' | 'damage' | 'critical' | 'skill' | 'heal' | 'guard' | 'victory' | 'defeat' | 'button') {
    if (this.isMuted) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sounds for different actions
    switch (type) {
      case 'attack':
        oscillator.frequency.value = 200;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(this.sfxVolume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;

      case 'damage':
        oscillator.frequency.value = 100;
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.8, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
        break;

      case 'critical':
        // Three ascending tones
        oscillator.frequency.value = 400;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(this.sfxVolume, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.05);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;

      case 'skill':
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.7, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;

      case 'heal':
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.6, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;

      case 'guard':
        oscillator.frequency.value = 150;
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.7, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.25);
        break;

      case 'victory':
        // Victory fanfare
        const notes = [523, 659, 784, 1047]; // C, E, G, C
        notes.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          osc.type = 'square';
          gain.gain.setValueAtTime(this.sfxVolume * 0.5, audioContext.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);
          osc.start(audioContext.currentTime + i * 0.15);
          osc.stop(audioContext.currentTime + i * 0.15 + 0.3);
        });
        return; // Skip the default oscillator

      case 'defeat':
        // Descending sad tone
        oscillator.frequency.value = 400;
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.6, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;

      case 'button':
        oscillator.frequency.value = 300;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
    }
  }

  // Set volumes
  setBGMVolume(volume: number) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    if (this.bgm) {
      this.bgm.volume(this.bgmVolume);
    }
  }

  setSFXVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.bgm) {
      this.bgm.pause();
    } else if (!this.isMuted && this.bgm) {
      this.bgm.play();
    }
    return this.isMuted;
  }

  // Get mute status
  getMuted() {
    return this.isMuted;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
