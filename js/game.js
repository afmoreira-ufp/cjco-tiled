import config from './config.js';
import FirstScene from './scenes/FirstScene.js';

class Game extends Phaser.Game{
    constructor(){
        super(config);
        this.scene.add('FirstScene',FirstScene);
        this.scene.start('FirstScene');
    }
}
new Game();