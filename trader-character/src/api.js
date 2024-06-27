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


async function createBomb(type, x, y, standSpeed, explSpeed, onClick) {
    let bomb

    switch (type) {
        case 'ice': {
            await Assets.load(['../src/assets/ice.png', '../src/assets/expl-ice.png'])
            bomb = await createBombAnimations(1, 20, 50, 50, '../src/assets/ice.png', '../src/assets/expl-ice.png')
            break
        }
        case 'green': {
            await Assets.load(['../src/assets/green.png', '../src/assets/expl-green.png'])
            bomb = await createBombAnimations(2, 18, 50, 50, '../src/assets/green.png', '../src/assets/expl-green.png')
            break
        }
        case 'sound': {
            await Assets.load(['../src/assets/sound.png', '../src/assets/expl-sound.png'])
            bomb = await createBombAnimations(4, 11, 50, 50, '../src/assets/sound.png', '../src/assets/expl-sound.png')
            break
        }
        default: {
            await Assets.load(['../src/assets/red.png', '../src/assets/expl-red.png'])
            bomb = await createBombAnimations(3, 11, 50, 50, '../src/assets/red.png', '../src/assets/expl-red.png')
            break
        }
    }

    bomb.standAnim.x = bomb.expldAnim.x = x
    bomb.standAnim.y = bomb.expldAnim.y = y

    bomb.expldAnim.animationSpeed = explSpeed
    bomb.standAnim.animationSpeed = standSpeed

    bomb.standAnim.interactive = true;
    bomb.standAnim.on('click', () => {
        onClick()
    })

    bomb.expldAnim.loop = false
    bomb.expldAnim.onComplete = () => {
        bomb.expldAnim.destroy()
    }

    return bomb
}

export { createBomb }