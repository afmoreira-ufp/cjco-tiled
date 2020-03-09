export default class FirstScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.image("tiles", "super-mario-nes-arrow-32px.png");
    this.load.tilemapTiledJSON("map", "mario.json");
    this.load.spritesheet("mario", "mario-spritesheet.png", {
      frameHeight: 41,
      frameWidth: 36,
      spacing: 0.5
    });
  }
  create() {
    this.map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = this.map.addTilesetImage("mario-tiles", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.map.createStaticLayer("back", tileset, 0, 0);
    const front = this.map.createStaticLayer("front", tileset, 0, 0);
    const kill = this.map.createStaticLayer("kill", tileset, 0, 0);

    this.mario = this.physics.add.sprite(50, 560, "mario", 6);

    //get the scene camera
    const camera = this.cameras.main;
    //make camera follow mario
    camera.startFollow(this.mario);
    //camera is not allowed to go out bounds
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();

    //set tiles from front tilemap that have collides property true as collidable
    front.setCollisionByProperty({ "collides": true }, true);
    //set collision between collidable tiles from front and mario
    this.physics.add.collider(this.mario, front);

    //set the callback function killMario to be called when something collides with the tile 124 (axe)     
    this.map.setTileIndexCallback(124, this.killMario, this);
    //set collidion between mario and the tilemap kill
    this.physics.add.overlap(this.mario, kill);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('mario', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('mario', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: 0
    });
  }

  update() {
    this.mario.setVelocityX(0);
    if (this.cursors.right.isDown) {
      this.mario.setVelocityX(150);
      this.mario.play('right', true);
    } else if (this.cursors.left.isDown) {
      this.mario.setVelocityX(-150);
      this.mario.play('left', true);
    } if (this.cursors.up.isDown && this.mario.body.blocked.down) {
      this.mario.setVelocityY(-200);
    }
  }
  killMario() {

    this.scene.restart();
  }
}
