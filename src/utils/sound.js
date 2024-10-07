import click from "../assets/sounds/click.mp3";
import clap from "../assets/sounds/clap.mp3";
import sufflingCards from "../assets/sounds/sufflingCards.mp3";
import {Howl} from "howler";

export class GameSound {
    constructor() {
        // this.bgAudio = new Howl({
        //     src: bgSound,
        //     loop: true,
        //     volume: 0.5,
        //     preload: true,
        //     autoplay: false,
        // });
        this.winSound = new Howl({
            src: [clap],
        });
        this.click = new Howl({
            src: [click],
        });
        this.sufflingCards = new Howl({
            src: [sufflingCards],
        });
    }

    updateVolume(val) {
        this.click.volume(val);
        this.winSound.volume(val);
        this.sufflingCards.volume(val);
    }

    playWinSound() {
        this.winSound.play();
    }
    pauseWinSound() {
        this.winSound.stop();
    }

    playClickSound() {
        this.click.play();
    }
    pauseClickSound() {
        this.click.stop();
    }

    playSufflingCardsSound() {
        this.sufflingCards.play();
    }
    pauseSufflingCardsSound() {
        this.sufflingCards.stop();
    }
}
