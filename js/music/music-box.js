const MB_musicUrlFormat = "https://music.163.com/song/media/outer/url?id={id}.mp3";
const MB_lyricsFormat = "http://music.163.com/api/song/media?id={id}";
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
// TODO mode = 0 : 顺序 | 1 随机 | 2 单曲循环
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
    "index": "MB_index"
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
    MB_audio.src = MB_musicUrlFormat.replace("{id}", musicId);
    MB_audio.currentTime = MB_pastTime;
    MB_setModeStatus();

    MB_audio.ontimeupdate = function (e) {
        MB_setCookie(MB_COOKIE_NAMES.pastTime, MB_audio.currentTime);
        MB_updateLyric(MB_audio.currentTime);
    }

    MB_audio.oncanplay = function (e) {
        MB_audio.play();
        MB_loadLyrics(musicId);
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
    console.log("musicStart");
}

function MB_startPlay() {
    if (MB_audio.paused === true) {
        MB_audio.play();
    } else {
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
    MB_setModeStatus();
}

function MB_loadLyrics(id) {
    MB_musicLyrics.innerText = "";
    MB_useLyrics = false;
    let url = "./js/music/lyrics/" + id + ".lrc";
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            MB_Lyrics = {};
            let array = request.responseText.split("\n");
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
            console.log(MB_Lyrics);
            MB_useLyrics = true;
        } else {

        }
    }
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
        if (data[0].indexOf(key) === 1) {
            return data[1];
        }
    }
    return "";
}

function MB_hasCookie(key) {
    return MB_getCookie(key) !== "";
}