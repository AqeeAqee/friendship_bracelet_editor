// })
function genCursor () {
    // sprCursor = sprites.create(image.create(screen.width * 2, screen.height * 2), SpriteKind.Player)
    // sprCursor.image.fillRect(0, 113, 319, 12, 14)
    // sprCursor.image.fillRect(153, 0, 12, 239, 14)
    sprCursor = sprites.create(image.create(interval*2, interval*2), SpriteKind.Player)
    sprCursor.image.fill(7)
    // sprCursor.image.drawLine(0, 113, 319, 113, 5)
    // sprCursor.image.drawLine(0, 125, 319, 125, 5)
    // sprCursor.image.drawLine(153, 0, 153, 239, 5)
    // sprCursor.image.drawLine(165, 0, 165, 239, 5)
}
// game.onPaint(()=>{
function genKnots_DefaultPattern () {
    iKnots = countThread - 1
    interval = img1.width - 1
    imgKnots = image.create(interval * iKnots + 1, interval * countRows + 1)
    for (let x = 0; x <= countThread - 1; x++) {
        imgKnots.setPixel(x * interval, 0, x%2==0?5:2)
    }
    // if(y==2)break
    for (let y = 0; y <= countRows - 1; y++) {
        knotType = y % 4 + 1
        for (let x = 0; x <= iKnots - 1; x++) {
            if (x == 0 && y % 2 == 1) {
                continue;
            }
            setKnot(x, y, knotType, null)
            x += 1
        }
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if(cursorX>1){
        cursorX+=-2
        sprCursor.x += -20
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if(cursorX<countThread-3){
        sprCursor.x += 20
        cursorX += 2
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    info.setScore(cursorX)
    if (cursorX == 0)
        lr = -1
    else if (cursorX == countThread - 2)
        lr = 1
    if(cursorY>0){
        cursorY += -1
        cursorX += -1 * lr
        sprCursor.y += -10
        sprCursor.x += -10 * lr
        lr = lr * -1
        scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + -10)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    info.setScore(cursorX)
    if (cursorX == 0)
        lr = -1
    else if (cursorX == countThread - 2)
        lr=1
    if (cursorY < countRows - 1) {
        cursorY += 1
        cursorX += -1*lr
        sprCursor.y += 10
        sprCursor.x += -10 * lr
        lr = lr * -1
        scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 10)
    }
})
// if (knotType == 0) {
// if (x == 0||x==countThread-1)
// return //todo, image at side end
// else if (bg.getPixel(x * interval - 1, y * interval) != 0 || bg.getPixel(x * interval + 1, y * interval)!=0)
// return
// }
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    switchKnotType_Color()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    switchKnotType_Thread()
})
function switchKnotType_Color() {
    let knotType = getKnotType(cursorX, cursorY)
    let switchList = [0, 3, 4, 1, 2]
    knotType = switchList[knotType]
    setKnot(cursorX, cursorY, knotType, null)
}
function switchKnotType_Thread() {
    let knotType = getKnotType(cursorX, cursorY)
    let switchList = [0, 2, 1, 4, 3]
    knotType = switchList[knotType]
    setKnotAndUpdate(cursorX, cursorY, knotType)
}
function switchKnotType_Next(){
    // game.splash(getKnot(cursorX, cursorY))
    let knotType = getKnotType(cursorX, cursorY)
    knotType += 1
    if (knotType == 5)
        knotType = 1
    setKnotAndUpdate(cursorX, cursorY, knotType)
}
function setKnotAndUpdate(x: number, y: number, knotType: number){
    let imgToUpdateKnots = image.create(countThread - 1, countRows)
    imgToUpdateKnots = setKnot(cursorX, cursorY, knotType, imgToUpdateKnots)
    for (let j = cursorY + 1; j < countRows; j++) {
        for (let i = 0; i < countThread - 1; i++) {
            if (imgToUpdateKnots.getPixel(i, j) > 0)
                setKnot(i, j, getKnotType(i, j), imgToUpdateKnots)
        }
        imgToUpdateKnots = imgToUpdateKnots
    }
}

function getKnotType(x: number, y: number): number {
    if (imgKnots.getPixel(x * interval + 5, y * interval + 5) == 1){
        if (imgKnots.getPixel(x * interval + 6, y * interval + 4) == 1)
            return 1
        else if (imgKnots.getPixel(x * interval + 4, y * interval + 4) == 1)
            return 3
        else
            return -1
    }else{
        if (imgKnots.getPixel(x * interval + 4, y * interval + 4) == 1)
            return 2
        else if (imgKnots.getPixel(x * interval + 6, y * interval + 4) == 1)
            return 4
        else
            return -1
    }
}
function setKnot (x: number, y: number, knotType: number, imgToUpdateKnots: Image) {
    // knotType = bg.getPixel(x * iInterval, y * iInterval)
    imgTemp = imgList[knotType].clone()
    cNew1 = imgKnots.getPixel(x * interval, y * interval)
    cNew2 = imgKnots.getPixel((x + 1) * interval, y * interval)
    c1 = imgTemp.getPixel(0, 0)
    c2 = imgTemp.getPixel(interval, 0)
    if (cNew1 == c2) {
        imgTemp.replace(c2, 15)
        c2 = 15
    }
    imgTemp.replace(c1, cNew1)
    imgTemp.replace(c2, cNew2)
    imgKnots.drawTransparentImage(imgTemp, x * interval, y * interval)

    // update first thread at next line
    if (x == 0) {
        imgKnots.drawLine(
            x * interval, (y + 1) * interval,
            x * interval, (y + 2) * interval,
            imgKnots.getPixel(x * interval, (y + 1) * interval))
        }
    // update last thread at next line
    if (x == countThread - 2) {
        imgKnots.drawLine(
            (x + 1) * interval, (y + 1) * interval,
            (x + 1) * interval, (y + 2) * interval,
            imgKnots.getPixel((x + 1) * interval, (y + 1) * interval))
    }
    info.changeScoreBy(1)

    if (imgToUpdateKnots&&y<countRows-1){
     basic.pause(10)
        for(let i=Math.max(x-1,0); i<Math.min(x+2, countThread-1);i++){
            if(getKnotType(i,y+1)>0)
                imgToUpdateKnots.setPixel(i,y+1,1)
                //setKnot(i, y+1, getKnotType(i, y + 1),true)
        }
    }
    return imgToUpdateKnots
}
let c2 = 0
let c1 = 0
let cNew2 = 0
let cNew1 = 0
let knotType = 0
let iKnots = 0
let sprCursor: Sprite = null
let lr = 0
let countRows = 0
let countThread = 0
let imgList: Image[] = []
let imgTemp: Image = null
let interval = 0
let imgKnots: Image = null
let imgThreads: Image = null
let iRows = 0
let threadEndHeight = 4
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
// for(let i=0;i<imgList.length;i++){
// imgList[i].replace(2, 22)
// imgList[i].replace(5, 25)
// }
interval = img1.width - 1
countThread = 12
countRows = 16
genCursor()
let cursorX =5
let cursorY = 5
genKnots_DefaultPattern()
let spriteBG = sprites.create(imgKnots, SpriteKind.Projectile)
lr = 1
spriteBG.setPosition(80, 85)
let spriteThread = sprites.create(genThread(), SpriteKind.Projectile)
spriteThread.setPosition(spriteBG.x, spriteBG.top - spriteThread.height / 2)
let spriteThread2 = sprites.create(genThread(), SpriteKind.Projectile)
spriteThread2.setPosition(spriteBG.x, spriteBG.bottom + spriteThread.height / 2)

function genThread(){
    imgThreads=image.create(imgKnots.width, threadEndHeight)
    for(let i=0;i<countThread;i++){
        imgThreads.drawLine(i*interval,0, i*interval,threadEndHeight, imgKnots.getPixel(i*interval,0))
    }
    return imgThreads
}