const MB_musicUrlFormat = "https://music.163.com/song/media/outer/url?id={id}.mp3";
let MB_musics = {
    "musicIds": [],
    "musics": {
        "562598184": {
            "title": "Rendezvous",
            "author": "Vivienne",
            "lyrics": "no"
        }
    }
};
let MB_index = 0;
let MB_mode = 0;
let MB_pastTime = 0;
let MB_useLyrics = false;
let MB_Lyrics = {};

const MB_audio = document.getElementById("MB_audio");
const MB_Button_Start = document.getElementById("MB_Button_Start");
const MB_Button_ChangeMode = document.getElementById("MB_Button_ChangeMode");
const MB_musicTitle = document.getElementById("MB_musicTitle");
const MB_musicLyrics = document.getElementById("MB_musicLyrics");
const MB_COOKIE_NAMES = {
    "mode": "MB_mode",
    "pastTime": "MB_pastTime",
    "index": "MB_index",
    "play": "MB_play"
};
function MB_onMusicBoxInit() {
    let url = "./js/music/musics.json";
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            MB_musics = JSON.parse(request.responseText);
            MB_onMusicBoxInitNow();
        } else {

        }
    }
}

function MB_onMusicBoxInitNow() {
    if (MB_hasCookie(MB_COOKIE_NAMES.mode)) {
        MB_mode = Number(MB_getCookie(MB_COOKIE_NAMES.mode));
    }
    if (MB_hasCookie(MB_COOKIE_NAMES.index)) {
        MB_index = Number(MB_getCookie(MB_COOKIE_NAMES.index));
    }
    if (MB_hasCookie(MB_COOKIE_NAMES.pastTime)) {
        MB_pastTime = Number(MB_getCookie(MB_COOKIE_NAMES.pastTime));
    }
    let musicId = MB_musics.musicIds[MB_index % MB_musics.musicIds.length];
    MB_loadLyrics(musicId);
    MB_audio.src = MB_musicUrlFormat.replace("{id}", musicId);
    MB_audio.currentTime = MB_pastTime;
    MB_setModeStatus();

    if (MB_hasCookie(MB_COOKIE_NAMES.play)) {
        if (MB_getCookie(MB_COOKIE_NAMES.play) !== "1") {
            MB_audio.pause();
        }
    }

    MB_audio.ontimeupdate = function (e) {
        MB_setCookie(MB_COOKIE_NAMES.pastTime, MB_audio.currentTime);
        MB_updateLyric(MB_audio.currentTime);
    }

    MB_audio.oncanplay = function (e) {
        if (MB_getCookie(MB_COOKIE_NAMES.play) === "1") {
            MB_audio.play();
        }
    }

    MB_audio.onpause = function (e) {
        MB_Button_Start.innerText = "播放";
    }

    MB_audio.onplaying = function (e) {
        MB_Button_Start.innerText = "暂停";
    }

    MB_audio.addEventListener('ended', function () {
        MB_nextMusic();
    }, false);
}

function MB_startPlay() {
    if (MB_audio.paused === true) {
        MB_audio.play();
        MB_setCookie(MB_COOKIE_NAMES.play, 1);
    } else {
        MB_setCookie(MB_COOKIE_NAMES.play, 0);
        MB_audio.pause();
    }
}

function MB_updateMusicInfo() {
    let musicId = MB_musics.musicIds[MB_index];
    let musicData = MB_musics.musics[musicId];
    MB_musicTitle.innerText = musicData.title + " - " + musicData.author;
}

function MB_changeMode() {
    MB_mode = (MB_mode + 1) % 3;
    MB_setCookie(MB_COOKIE_NAMES.mode, MB_mode);
    MB_setModeStatus();
}

function MB_loadLyrics(id) {
    MB_musicLyrics.innerText = "";
    MB_useLyrics = false;
    let str = MB_musics.musics[id].lyrics;
    if (str === "") {
        return;
    }
    MB_Lyrics = {};
    let array = str.split("\n");
    for (let index in array) {
        let line = array[index];
        if (line.length > 1 && line.charAt(0) === '[' && line.charAt(1) === '0') {
            let data = line.split("]");
            data[0] = data[0].replace("[", "");
            let timeString = data[0].split(":");
            let time = Number(timeString[0]) * 60 + Number(timeString[1]);
            time = Math.floor(time * 1000);
            MB_Lyrics[time] = data[1];
        }
    }
    MB_useLyrics = true;
}

function MB_updateLyric(time) {
    if (MB_useLyrics === false) {
        MB_musicLyrics.innerText = "无歌词.";
        return;
    }
    time = time * 1000;
    let preTime = 0;
    for (let temp in MB_Lyrics) {
        preTime = temp;
        break;
    }
    for (let temp in MB_Lyrics) {
        if (time < temp) {
            MB_musicLyrics.innerText = MB_Lyrics[preTime];
            break;
        }
        preTime = temp;
    }
}

function MB_setModeStatus() {
    if (MB_mode === 0) {
        MB_Button_ChangeMode.innerText = "顺序";
    } else if (MB_mode === 1) {
        MB_Button_ChangeMode.innerText = "随机";
    } else if (MB_mode === 2) {
        MB_Button_ChangeMode.innerText = "单曲";
    }
    MB_updateMusicInfo();
}

function MB_nextMusic() {
    if (MB_mode === 0) {
        MB_index = (MB_index + 1) % MB_musics.musicIds.length;
    } else if (MB_mode === 1) {
        MB_index = Math.floor(Math.random() * MB_musics.musicIds.length);
    }
    MB_setCookie(MB_COOKIE_NAMES.index, MB_index);
    MB_getCookie(MB_COOKIE_NAMES.index);
    let musicId = MB_musics.musicIds[MB_index];
    MB_audio.src = MB_musicUrlFormat.replace("{id}", musicId);
    MB_audio.play();
    MB_updateMusicInfo();
    MB_loadLyrics(musicId);
}

function MB_setCookie(key, value) {
    document.cookie = key + "=" + value + ";";
}

function MB_getCookie(key) {
    let cookies = document.cookie.split(";");
    for (let index in cookies) {
        let data = cookies[index].split("=");
        if (data[0].indexOf(key) >= 0) {
            return data[1];
        }
    }
    return "";
}

function MB_hasCookie(key) {
    return MB_getCookie(key) !== "";
}
