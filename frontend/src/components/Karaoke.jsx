// src/components/Karaoke.jsx
import React, { useState, useRef, useEffect } from 'react';

// 1. Importing your exact local MP3 file
import nationalAnthem from '../assets/Jana Gana Mana (Original)-(Mr-Jat.in).mp3'; 

const Karaoke = ({ theme }) => {
  // ==========================================
  // 🛠️ TUNE YOUR SYNC HERE:
  // If lyrics appear too EARLY -> make it positive (e.g., 1.5)
  // If lyrics appear too LATE -> make it negative (e.g., -1.5)
  const LYRIC_OFFSET = -1.5; 
  // ==========================================

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const animationRef = useRef(null); 

  const songData = {
    title: "Jana Gana Mana",
    artist: "Rabindranath Tagore",
    audioUrl: nationalAnthem, 
    
    lyrics: [
      { time: 0.0,  line: "🎵 (Prelude) 🎵" },
      { time: 4.0,  line: "Jana-gana-mana-adhinayaka, jaya he" },
      { time: 9.5,  line: "Bharata-bhagya-vidhata." },
      { time: 13.5, line: "Punjab-Sindhu-Gujarata-Maratha" },
      { time: 17.5, line: "Dravida-Utkala-Banga" },
      { time: 21.0, line: "Vindhya-Himachala-Yamuna-Ganga" },
      { time: 24.5, line: "Uchchala-Jaladhi-taranga." },
      { time: 29.5, line: "Tava shubha name jage," },
      { time: 33.5, line: "Tava shubha asisa mage," },
      { time: 37.0, line: "Gahe tava jaya gatha," },
      { time: 41.0, line: "Jana-gana-mangala-dayaka jaya he" },
      { time: 46.0, line: "Bharata-bhagya-vidhata." },
      { time: 49.5, line: "Jaya he, jaya he, jaya he," },
      { time: 54.0, line: "Jaya jaya jaya, jaya he!" }
    ]
  };

  const whilePlaying = () => {
    if (!audioRef.current) return;
    
    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    // Apply the offset here!
    const syncTime = time - LYRIC_OFFSET;

    const activeIndex = songData.lyrics.findIndex((line, index) => {
      const nextLineTime = songData.lyrics[index + 1]?.time || Infinity;
      return syncTime >= line.time && syncTime < nextLineTime;
    });

    if (activeIndex !== currentLineIndex) {
      setCurrentLineIndex(activeIndex);
      
      if (lyricsContainerRef.current) {
        const lyricElements = lyricsContainerRef.current.children;
        if (lyricElements[activeIndex]) {
          lyricElements[activeIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    }

    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    
    if (!prevValue) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || duration === 0) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const totalWidth = progressBar.offsetWidth;
    const newTime = (clickPosition / totalWidth) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div style={styles.container}>
      <audio 
        ref={audioRef} 
        src={songData.audioUrl} 
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => {
          setIsPlaying(false);
          cancelAnimationFrame(animationRef.current);
        }}
      />
      
      <div style={styles.karaokeCard}>
        <div style={styles.songInfo}>
          <div style={{...styles.songIcon, background: theme.bg, color: theme.color}}>🇮🇳</div>
          <div>
            <h2 style={{...styles.songTitle, color: theme.color}}>{songData.title}</h2>
            <p style={styles.songArtist}>{songData.artist}</p>
          </div>
        </div>

        <div ref={lyricsContainerRef} style={styles.lyricsContainer}>
          {songData.lyrics.map((line, index) => {
            const isActive = currentLineIndex === index;
            const isPassed = index < currentLineIndex;
            
            return (
              <div
                key={index}
                style={{
                  ...styles.lyricLine,
                  ...(isActive ? {
                    ...styles.activeLyric,
                    background: theme.bg,
                    borderLeftColor: theme.color,
                    color: theme.color
                  } : isPassed ? {
                    color: '#94a3b8' 
                  } : {})
                }}
              >
                <span style={styles.lyricTime}>{formatTime(line.time)}</span>
                <span style={styles.lyricText}>{line.line}</span>
              </div>
            );
          })}
        </div>

        <div style={styles.playerControls}>
          <div style={styles.progressSection}>
            <span style={styles.timeCurrent}>{formatTime(currentTime)}</span>
            <div style={styles.progressBar} onClick={handleSeek}>
              <div style={{...styles.progressFill, width: `${(currentTime / duration) * 100}%`, background: theme.color}} />
            </div>
            <span style={styles.timeTotal}>{formatTime(duration)}</span>
          </div>

          <button onClick={togglePlayPause} style={{...styles.playBtn, background: theme.color}}>
            {isPlaying ? '⏸️ Pause' : '▶️ Play Anthem'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { width: '100%', maxWidth: '800px', margin: '0 auto' },
  karaokeCard: { background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  songInfo: { padding: '1.5rem', background: '#fdf8f5', borderBottom: '1px solid #e8dfd9', display: 'flex', alignItems: 'center', gap: '1rem' },
  songIcon: { width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' },
  songTitle: { fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '0.25rem' },
  songArtist: { color: '#8B6452', fontSize: '0.9rem' },
  lyricsContainer: { height: '400px', overflowY: 'auto', padding: '2rem 1.5rem', background: '#fff', scrollBehavior: 'smooth' },
  lyricLine: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', marginBottom: '0.5rem', borderRadius: '12px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', color: '#cbd5e1' },
  activeLyric: { fontWeight: 'bold', borderLeft: '4px solid', transform: 'scale(1.02)' },
  lyricTime: { fontSize: '0.75rem', fontFamily: 'monospace', minWidth: '40px', opacity: 0.6 },
  lyricText: { flex: 1, fontSize: '1.2rem', lineHeight: '1.5', fontFamily: "'Playfair Display', serif" },
  playerControls: { padding: '1.5rem', background: '#fdf8f5', borderTop: '1px solid #e8dfd9', textAlign: 'center' },
  progressSection: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
  timeCurrent: { fontSize: '0.8rem', color: '#8B6452', fontFamily: 'monospace', width: '40px' },
  timeTotal: { fontSize: '0.8rem', color: '#8B6452', fontFamily: 'monospace', width: '40px' },
  progressBar: { flex: 1, height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden', cursor: 'pointer', position: 'relative' },
  progressFill: { height: '100%', transition: 'none', pointerEvents: 'none' }, 
  playBtn: { padding: '1rem 3rem', border: 'none', borderRadius: '50px', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
};

export default Karaoke;