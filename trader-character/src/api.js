import { Spritesheet, Texture, AnimatedSprite, Assets } from 'pixi.js';

async function createAnimation(frames, w, h, image) {
    const data = {
        frames: {},
        meta: {
            image: image,
            size: { w: w * frames, h: h },
            scale: 1
        },
        animations: {
            anim: []
        },
    }

    for (let i = 0; i < frames; i++) {
        data.frames[`anim${i}`] = {
            frame: { x: i * w, y: 0, w: w, h: h },
            sourceSize: { w: w, h: h },
            spriteSourceSize: { x: 0, y: 0, w: w, h: h }
        }
        data.animations.anim.push(`anim${i}`)
    }

    const spritesheet = new Spritesheet(
        Texture.from(data.meta.image),
        data
    );

    await spritesheet.parse();

    const animation = new AnimatedSprite(spritesheet.animations.anim);
    animation.anchor.set(0.5);

    return animation
}

async function createBombAnimations(standFrames, explFrames, w, h, standImage, explImage) {
    const expldAnim = await createAnimation(explFrames, w, h, explImage)
    const standAnim = await createAnimation(standFrames, w, h, standImage)

    return { standAnim, expldAnim }
}

async function createBomb(x, y, standSpeed, explSpeed, onClick) {

    await Assets.load(['../src/assets/red.png', '../src/assets/expl-red.png'])
    const bomb = await createBombAnimations(3, 11, 50, 50, '../src/assets/red.png', '../src/assets/expl-red.png')

    bomb.standAnim.x = bomb.expldAnim.x = x
    bomb.standAnim.y = bomb.expldAnim.y = y

    bomb.expldAnim.animationSpeed = explSpeed
    bomb.standAnim.animationSpeed = standSpeed

    bomb.standAnim.interactive = true;
    bomb.standAnim.on('click', () => { 
        bomb.standAnim.destroy()
        onClick()
    })

    bomb.expldAnim.loop = false
    bomb.expldAnim.onComplete = () => { 
        bomb.expldAnim.destroy()
    }

    return bomb
}

export { createBomb }