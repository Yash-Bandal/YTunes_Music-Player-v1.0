// console.log("YB Productions...typing javascript")
let currentSong = new Audio();
let songs;
let currFolder;


//conv sec to minsec---gpt created
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;

    try {
        //we fetch
        // let a = await fetch("http://127.0.0.1:5000/s2")  //used initially at making time
        let a = await fetch(`http://127.0.0.1:5000/${folder}/`)

        //we get response and see it as text
        let response = await a.text()

        //create a div 
        let div = document.createElement("div")
        div.innerHTML = response;

        //search that div ele
        let as = div.getElementsByTagName("a");
        //    console.log(as)

        songs = []

        for (let i = 0; i < as.length; i++) {
            let element = as[i];
            if (element.href.endsWith(".mp3")) {
                // songs.push(element.href.split("/s2/")[1])
                songs.push(element.href.split(`/${folder}/`)[1])
            }

        }
        //list out songs
        let songUL = document.querySelector('.songList').getElementsByTagName("ul")[0];
        songUL.innerHTML = ""; //this avoids appending 
        // let songUL = document.querySelector('.songList ul');
        if (!songUL) {
            console.error("No <ul> found inside .songList");
            return;
        }

        // show all the songs in the playlist 
        for (const song of songs) {
            // let li = document.createElement("li");
            // li.textContent = song;
            // songUL.appendChild(li);
            songUL.innerHTML = songUL.innerHTML +
                `<li>
                 <img class="invert musicsvg" src="img/music2.svg">
                 <div class="info">
                     <div>${song.replaceAll("%20", " ")}</div> 
                     <div>Yash Bandal</div>
                 </div>
                 <!-- button  -->
                  <div class="playNow">
                     <span>Play Now</span>
                      <img class = "invert" src="img/play.svg" alt="">
                  </div>
            </li>`; //replaces all songs %20 woth space which was default
        }

        // //play the first song
        // var audio = new Audio(songs[0]);
        // audio.play();

        // audio.addEventListener('loadeddata', () => {
        //     let duration = audio.duration;
        //     console.log(duration)
        //     //duration var holds duration if song/audio clip in seconfs
        // });

        //attach an event listener to the song

        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.addEventListener('click', () => { //gives all songs inside
                let songName = e.querySelector(".info").firstElementChild.innerHTML.trim(); // trim the song name first
                console.log(songName);
                playMusic(songName); // now pass the trimmed song name correctly
            });
        });

        return songs;  //provides songs to playmusic(inside)
    }
    catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}

const playMusic = async (track, pause = false) => {  //track is the song= value is 'song name'
    // let audio = new Audio("/s2/" + track);
    // currentSong.src = "/s2/" + track;
    currentSong.src = `/${currFolder}/` + track;
    console.log("Selected song path " + currentSong.currentSrc)
    if (!pause) {
        currentSong.play();
        play.src = "img/pause2.svg";
    }

    //show time and info of curr song
    document.querySelector('.songInfo').innerHTML = decodeURI(track);  //decodeuri removes %% spaces
    document.querySelector('.songtime').innerHTML = '00:00 / 00:00';
}


/*
"/s2/" + track creates the full file path, like "/s2/song.mp3".
This tells the Audio object (currentSong) where to find the song.
*/



async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5000/songs/`)

    //we get response and see it as text
    let response = await a.text()

    let div = document.createElement("div")
    div.innerHTML = response;
    // console.log(div)

    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector('.cardContainer');

    // Array.from(anchors).forEach( e => { //this is async ..but we want no asyn so we use nommal for
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];



        // if (e.href.includes("/songs")) {
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0];

            //get metadata of folder ..info.json
            let a = await fetch(`http://127.0.0.1:5000/songs/${folder}/info.json`)

            //we get response and see it as json
            let response = await a.json();
            // console.log(response) //gives inside json info title and descrip 

            cardContainer.innerHTML = cardContainer.innerHTML + `
              <div data-folder="${folder}" class="card border">
                        <div class="play">
                            <svg width="45" height="45" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#1fdf64" />
                                <circle cx="12" cy="12" r="10" stroke="black" stroke-width="1.5" opacity="0.3" />
                                <polygon points="9,7 9,17 17,12" fill="black" />
                                <!-- <path d="M19 12c0 3-1 5-4 7M21 12c0 4-1 7-5 9" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/> -->
                            </svg>
                        </div>


                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                        </div>
                        `
            // response holds the json content
        }
    }


    //load the playlist wheneer the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        // console.log(e)
        e.addEventListener('click', async item => {
            console.log(item.target, item.target.dataset, item.currentTarget)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0])

        });

    });
}


//in js all is stored as obj..here we used array obj that has songs..which can be accessed with index

//to load a async func..use another main func
async function main() {



    // //get list of all songs
    // await getSongs("songs/cs");
    // // console.log(songs)
    // //play the first song default whenever load website
    // playMusic(songs[0], true)


    // //display all the albums on the page
    // displayAlbums();


    // //attach an  event listener to play id , pause , next buttons of playbar
    // play.addEventListener('click', () => {
    //     if (currentSong.paused) {
    //         currentSong.play();
    //         play.src = "img/pause2.svg";
    //     }
    //     else {
    //         currentSong.pause();
    //         play.src = "img/play2.svg";   //togle between pause and play svg images on click
    //     }
    // });

    // //toggle pause play on space bar click
    // document.addEventListener("keydown", (event) => {
    //     if (event.code === "Space") { // Detect spacebar press
    //         event.preventDefault(); // Prevent scrolling when spacebar is pressed
    
    //         if (currentSong.paused) {
    //             currentSong.play();
    //             play.src = "img/pause2.svg";
    //         } else {
    //             currentSong.pause();
    //             play.src = "img/play2.svg";
    //         }
    //     }
    // });

    
    // //  listen for timeupdate event
    // currentSong.addEventListener('timeupdate', () => {

    //     let currTime = currentSong.currentTime;
    //     let totalDuration = currentSong.duration;

    //     // console.log(currTime, totalDuration)
    //     //after 60sec next  minute
    //     document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currTime)} / ${secondsToMinutesSeconds(totalDuration)}`;
    //     document.querySelector('.circle').style.left = (currTime / totalDuration) * 100 + "%";

    // });

    // //add an event listener to seekbar
    // document.querySelector('.seekbar').addEventListener('click', (e) => {
    //     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    //     document.querySelector('.circle').style.left = percent + "%" //"%" is vimp...its left% so..
    //     currentSong.currentTime = ((currentSong.duration) * percent) / 100;  //change the seekbar time on click
    // });

    //add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //add an event listener for close cross
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // //Add evnt listener for previous and next


    // previous.addEventListener('click', () => {
    //     console.log("Previous clicked")

    //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    //     if ((index - 1) >= 0) { // Fix for previous

    //         playMusic(songs[index - 1]);
    //     }
    // });


    // next.addEventListener('click', () => {
    //     console.log("Next clicked");

    //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    //     if ((index + 1) < songs.length) { // Fix for next
    //         playMusic(songs[index + 1]);
    //     }
    //     //     let nextIndex = (index + 1) % songs.length; // Loops back to the first song when it reaches the end
    //     // playMusic(songs[nextIndex]);

    // });
    // //auto play next
    // currentSong.addEventListener('ended', () => {
    //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);

    //     if ((index + 1) < songs.length) {
    //         playMusic(songs[index + 1]); // Play next song automatically
    //     } else {
    //         playMusic(songs[0]); // Restart from the first song
    //     }
    // });

    // //add event listener for volume slider
    // document.querySelector('.range').getElementsByTagName("input")[0].addEventListener('change', (e) => {
    //     console.log("Setting value to :", e.target.value, " / 100");
    //     currentSong.volume = parseInt(e.target.value) / 100;
    //     //default value of volume range is 0 to 1 and that of slider range is 1 to 100
    //     //so convert it
    //     if(currentSong.volume == 0) {
    //         document.querySelector('.volume img').src = "img/mute.svg";
    //     }
    //     else {
    //         document.querySelector('.volume img').src = "img/volume.svg";
    //     }

    // });

    // //add event listener to mute the track
    // document.querySelector('.volume img').addEventListener('click', (e) => {
    //     // console.log(e.target)
   
    //     //now directly access image
    //     if(e.target.src.includes("volume.svg")){

    //         e.target.src = e.target.src.replace("volume.svg","mute.svg");
    //         currentSong.volume = 0;
    //         document.querySelector('.range').getElementsByTagName("input")[0].value = 0;
    //     }
    //     else{
       
    //         e.target.src = e.target.src.replace("mute.svg", "volume.svg");
    //         currentSong.volume = 50/100;
    //         document.querySelector('.range').getElementsByTagName("input")[0].value = 50;
    //     }
    // });


}
main()




/*
every playlist is a folder 
*/