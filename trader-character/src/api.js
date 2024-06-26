import { Spritesheet, Texture, AnimatedSprite, Assets } from 'pixi.js';

async function assetsFetch() {
    await Assets.load('../src/assets/approval.png')
}

async function hero() {
    const data = {
        frames: {
            hero1: {
                frame: { x: 0, y: 0, w: 128, h: 128 },
                sourceSize: { w: 128, h: 128 },
                spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 }
            },
            hero2: {
                frame: { x: 128, y: 0, w: 128, h: 128 },
                sourceSize: { w: 128, h: 128 },
                spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 }
            },
            hero3: {
                frame: { x: 256, y: 0, w: 128, h: 128 },
                sourceSize: { w: 128, h: 128 },
                spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 }
            },
            hero4: {
                frame: { x: 384, y: 0, w: 128, h: 128 },
                sourceSize: { w: 128, h: 128 },
                spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 }
            },
            hero5: {
                frame: { x: 512, y: 0, w: 128, h: 128 },
                sourceSize: { w: 128, h: 128 },
                spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 }
            },
            hero6: {
                frame: { x: 640, y: 0, w: 128, h: 128 },
                sourceSize: { w: 128, h: 128 },
                spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 }
            },
            hero7: {
                frame: { x: 768, y: 0, w: 128, h: 128 },
                sourceSize: { w: 128, h: 128 },
                spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 }
            },
            hero8: {
                frame: { x: 896, y: 0, w: 128, h: 128 },
                sourceSize: { w: 128, h: 128 },
                spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 }
            },
        },
        meta: {
            image: '../src/assets/approval.png',
            size: { w: 1024, h: 128 },
            scale: 0.25
        },
        animations: {
            hero: ['hero1', 'hero2', 'hero3', 'hero4', 'hero5', 'hero6', 'hero7', 'hero8'] //array of frames by name
        }
    }


    // Create the SpriteSheet from data and image
    const spritesheet = new Spritesheet(
        Texture.from(data.meta.image),
        data
    );

    // Generate all the Textures asynchronously
    await spritesheet.parse();

    // spritesheet is ready to use!
    const anim = new AnimatedSprite(spritesheet.animations.hero);

    anim.anchor.set(0.5);

    return anim
}

export { assetsFetch, hero }