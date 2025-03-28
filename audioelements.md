 # HTML Audio Elements Notes

## 1. Basic `<audio>` Element
```html  
<audio controls>  
    <source src="song.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
```
- `controls` → Displays built-in play, pause, and volume controls.
- `<source>` → Specifies the audio file with `src` and `type`.

## 2. Common `<audio>` Attributes
| Attribute | Description |
|-----------|------------|
| `controls` | Shows built-in audio player controls. |
| `autoplay` | Starts playing the audio automatically. |
| `loop` | Repeats the audio when it ends. |
| `muted` | Starts the audio in a muted state. |
| `preload` | Defines when to load the audio file (`auto`, `metadata`, `none`). |

### Example with All Attributes
```html
<audio controls autoplay loop muted preload="auto">
    <source src="song.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
```

## 3. JavaScript Audio API (`Audio` Object)
```javascript
let audio = new Audio("song.mp3");
audio.play();  // Start playing the audio
audio.pause(); // Pause the audio
audio.currentTime = 30; // Jump to 30 seconds
audio.volume = 0.5; // Set volume (0 to 1)
```

## 4. HTML Audio Events
| Event | Description |
|-------|------------|
| `play` | Fires when playback starts. |
| `pause` | Fires when playback is paused. |
| `ended` | Fires when the audio ends. |
| `timeupdate` | Fires when the playback position changes. |
| `volumechange` | Fires when volume is changed. |
| `loadeddata` | Fires when the audio data has been loaded. |
| `canplay` | Fires when the browser can start playing the audio. |
| `seeking` | Fires when the user starts seeking audio. |
| `seeked` | Fires when seeking is complete. |

### Example: Listening for Events
```javascript
let audio = document.querySelector("audio");
audio.addEventListener("play", () => console.log("Audio is playing"));
audio.addEventListener("pause", () => console.log("Audio is paused"));
audio.addEventListener("ended", () => console.log("Audio has ended"));
audio.addEventListener("timeupdate", () => console.log(`Current time: ${audio.currentTime}s`));
audio.addEventListener("volumechange", () => console.log(`Volume: ${audio.volume}`));
```

## 5. Advanced Audio API Features

### Adjusting Playback Speed
```javascript
audio.playbackRate = 1.5; // Plays at 1.5x speed
audio.playbackRate = 0.75; // Plays at 0.75x speed
```

### Fading Audio In and Out
```javascript
function fadeOut(audio) {
    let fade = setInterval(() => {
        if (audio.volume > 0.1) {
            audio.volume -= 0.1;
        } else {
            clearInterval(fade);
            audio.pause();
        }
    }, 200);
}
```

### Getting Audio Duration and Current Time
```javascript
console.log(`Duration: ${audio.duration} seconds`);
console.log(`Current Time: ${audio.currentTime} seconds`);
```

### Seeking in Audio
```javascript
audio.currentTime = 15; // Jumps to 15 seconds in the track
```

## 6. Custom Audio Player
```html
<audio id="myAudio">
    <source src="song.mp3" type="audio/mpeg">
</audio>

<button onclick="document.getElementById('myAudio').play()">Play</button>
<button onclick="document.getElementById('myAudio').pause()">Pause</button>
<button onclick="document.getElementById('myAudio').currentTime = 0">Restart</button>
<button onclick="document.getElementById('myAudio').volume += 0.1">Volume +</button>
<button onclick="document.getElementById('myAudio').volume -= 0.1">Volume -</button>
```

## 7. Web Audio API (Advanced Audio Manipulation)
If you need more control over audio (effects, visualization, real-time manipulation), use the **Web Audio API**:
```javascript
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = document.querySelector("audio");
let track = audioContext.createMediaElementSource(audioElement);
let gainNode = audioContext.createGain();
track.connect(gainNode).connect(audioContext.destination);

// Adjust volume dynamically
gainNode.gain.value = 0.5;
```

## Summary
- The `<audio>` element embeds sound.
- JavaScript can control audio dynamically.
- You can listen to **audio events** for better interactivity.
- Custom controls can replace the built-in player.
- Advanced APIs like the **Web Audio API** allow real-time audio manipulation and effects.

