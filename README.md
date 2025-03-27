# HTML Audio Elements and API

## 1. HTML `<audio>` Element
- `<audio>` → Main element to embed audio.
- `<source>` → Specifies multiple audio formats inside `<audio>`.
- `<track>` → Provides captions/subtitles for audio.

## 2. Audio Element Attributes
| Attribute | Description |
|-----------|------------|
| `controls` | Shows default play, pause, and volume controls. |
| `autoplay` | Automatically plays the audio when loaded. |
| `loop` | Repeats the audio when it ends. |
| `muted` | Starts the audio in a muted state. |
| `preload` | Specifies how/when the audio file should load (`auto`, `metadata`, `none`). |
| `src` | Direct link to the audio file. |

## 3. JavaScript Audio Methods
| Method | Description |
|--------|------------|
| `play()` | Starts playing the audio. |
| `pause()` | Pauses the audio. |
| `load()` | Reloads the audio element. |
| `canPlayType(type)` | Checks if the browser can play a given audio format. |
| `addTextTrack(kind, label, language)` | Adds a text track (captions). |

### Example Usage
```javascript
let audio = document.querySelector("audio");
audio.play();  // Start playing
audio.pause(); // Pause playback
audio.volume = 0.5; // Set volume (0-1)
```

## 4. Audio Properties
| Property | Description |
|----------|------------|
| `currentTime` | Gets or sets the current playback position (in seconds). |
| `duration` | Returns the total duration of the audio. |
| `paused` | Returns `true` if the audio is paused. |
| `ended` | Returns `true` if the audio has finished playing. |
| `volume` | Gets or sets the volume (0 to 1). |

### Example
```javascript
console.log(audio.duration); // Total duration
console.log(audio.currentTime); // Current play time
```

## 5. Audio Events
| Event | Description |
|-------|------------|
| `play` | Fires when playback starts. |
| `pause` | Fires when playback is paused. |
| `ended` | Fires when the audio ends. |
| `timeupdate` | Fires when playback position changes. |
| `volumechange` | Fires when volume is adjusted. |
| `loadeddata` | Fires when audio is fully loaded. |

### Example
```javascript
audio.addEventListener("play", () => console.log("Audio is playing"));
audio.addEventListener("pause", () => console.log("Audio paused"));
audio.addEventListener("ended", () => console.log("Audio finished playing"));
```

## 6. Audio Formats
| Format | MIME Type |
|--------|----------|
| MP3 | `audio/mpeg` |
| OGG | `audio/ogg` |
| WAV | `audio/wav` |

### Example with Multiple Formats
```html
<audio controls>
    <source src="song.mp3" type="audio/mpeg">
    <source src="song.ogg" type="audio/ogg">
    Your browser does not support the audio element.
</audio>
