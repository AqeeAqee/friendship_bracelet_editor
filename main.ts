/**
 * game.onPaint(()=>{
 */
// })
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.y += -10
    mySprite.x += -10 * lr
    lr = lr * -1
    scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + -10)
})
function genCursor () {
    mySprite = sprites.create(image.create(screen.width * 2, screen.height * 2), SpriteKind.Player)
    mySprite.image.drawLine(0, 113, 319, 113, 5)
    mySprite.image.drawLine(0, 125, 319, 125, 5)
    mySprite.image.drawLine(153, 0, 153, 239, 5)
    mySprite.image.drawLine(165, 0, 165, 239, 5)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    spriteKnotsData.setFlag(SpriteFlag.Invisible, false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.x += -20
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.x += 20
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    spriteKnotsData.setFlag(SpriteFlag.Invisible, true)
})
function genSpriteBG (countThread: number, countRows: number) {
    iKnots = countThread - 1
    iRows = countRows
    imgTreadData = image.create(iKnots, iRows)
    imgKnotsData = image.create(countThread, iRows + 1)
    iInterval = img1.width - 1
    bg = image.create(iInterval * iKnots + 1, iInterval * iRows + 1)
    for (let y = 0; y <= iRows - 1; y++) {
        knotType = y % 4 + 1
        knotType = 0
        for (let x = y % 2; x <= iKnots - 1; x++) {
            imgKnotsData.setPixel(x, y, knotType)
            imgKnotsData.setPixel(x, y, knotType)
            imgTemp = getImageFromLocAndType(x, y, knotType)
            // imgTemp = img1
            bg.drawTransparentImage(imgTemp, x* (iInterval) , (y ) * (iInterval))
            x++
        }
    }
    // tiles.setCurrentTilemap(tilemap`level2`)
    spriteBG = sprites.create(bg, SpriteKind.Projectile)
    sptThreadData = sprites.create(imgTreadData, SpriteKind.Projectile)
    spriteKnotsData = sprites.create(imgKnotsData, SpriteKind.Projectile)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.y += 10
    mySprite.x += -10 * lr
    lr = lr * -1
    scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 10)
})
function getImageFromLocAndType (x: number, y: number, _type: number) {
    return imgList[_type]
}
let sptThreadData: Sprite = null
let imgTreadData: Image = null
let iRows = 0
let mySprite: Sprite = null
let spriteKnotsData: Sprite = null
let spriteBG: Sprite = null
let lr = 0
let imgList: Image[] = []
let bg: Image = null
let iInterval = 0
let imgKnotsData = null
let iKnots = 0
let imgTemp: Image = null
let knotType = 0
let img0 = img`
    5 . . . . . . . . . 2 
    . 5 . . . . . . . 2 . 
    . . 5 . . . . . 2 . . 
    . . 5 . . . . . 2 . . 
    . . 5 . . . . . 2 . . 
    . . 5 . . . . . 2 . . 
    . . 5 . . . . . 2 . . 
    . . 5 . . . . . 2 . . 
    . . 5 . . . . . 2 . . 
    . 5 . . . . . . . 2 . 
    5 . . . . . . . . . 2 
    `
let img1 = img`
    5 . . 2 2 2 2 2 . . 2 
    . 5 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 1 2 2 2 
    2 2 2 2 2 2 1 2 2 2 2 
    2 2 1 2 2 1 2 2 2 2 2 
    2 2 1 2 1 2 2 2 2 2 2 
    2 2 1 1 2 2 2 2 2 2 2 
    2 2 1 1 1 1 2 2 2 2 2 
    . 2 2 2 2 2 2 2 2 5 . 
    2 . . 2 2 2 2 2 . . 5 
    `
let img2 = img`
    5 . . 2 2 2 2 2 . . 2 
    . 5 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 1 2 2 2 . 
    2 2 2 2 2 1 2 2 2 2 2 
    2 2 2 2 1 2 2 2 2 2 2 
    2 2 2 1 2 2 2 2 2 2 2 
    2 2 2 2 1 2 2 1 2 2 2 
    2 2 2 2 2 1 2 1 2 2 2 
    . 2 2 2 2 2 1 1 2 2 . 
    . 5 2 2 1 1 1 1 2 2 . 
    5 . . 2 2 2 2 2 . . 2 
    `
let img3 = img1.clone()
img3.flipX()
let img4 = img2.clone()
img4.flipX()
imgList = [
img0,
img1,
img2,
img3,
img4
]
genSpriteBG(16, 8)
genCursor()
lr = 1
spriteBG.setPosition(80, 45)
spriteKnotsData.setPosition(72, -20)
