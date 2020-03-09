import './phaser.js';

export default {
  type: Phaser.AUTO,
  width: 600,
  height: 480,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      //debug: true
    }
  },
};