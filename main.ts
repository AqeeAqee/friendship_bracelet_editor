controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    // info.setScore(cursorX)
    if (cursorX == 0) {
        cursorLR = -1
    } else if (cursorX == countThread - 2) {
        cursorLR = 1
    }
    if (cursorY > 0) {
        cursorY += -1
        cursorX += -1 * cursorLR
        sprCursor.y += -10
        sprCursor.x += -10 * cursorLR
        cursorLR = cursorLR * -1
        scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + -10)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    switchKnotType_Thread()
})
function genThread () {
    imgThreads = image.create(imgKnots.width, threadEndHeight)
    for (let l = 0; l <= countThread - 1; l++) {
        imgThreads.drawLine(l * interval, 0, l * interval, threadEndHeight, imgKnots.getPixel(l * interval, 0))
    }
    return imgThreads
}
// })
function genCursor () {
    sprCursor = sprites.create(image.create(interval * 2, interval * 2), SpriteKind.Player)
    sprCursor.image.fill(9)
}
// if (knotType == 0) {
// if (x == 0||x==countThread-1)
// return //todo, image at side end
// else if (bg.getPixel(x * interval - 1, y * interval) != 0 || bg.getPixel(x * interval + 1, y * interval)!=0)
// return
// }
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    switchKnotType_Color()
})
function setKnotAndUpdate (x: number, y: number, knotType: number) {
    imgToUpdateKnots = image.create(countThread - 1, countRows)
    imgToUpdateKnots = setKnot(cursorX, cursorY, knotType, imgToUpdateKnots)
    for (let j = cursorY + 1; j < countRows; j++) {
        for (let i = 0; i < countThread - 1; i++) {
            if (imgToUpdateKnots.getPixel(i, j) > 0)
                setKnot(i, j, getKnotType(i, j), imgToUpdateKnots)
        }
        imgToUpdateKnots = imgToUpdateKnots
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorX > 1) {
        cursorX += -2
        sprCursor.x += -20
    }
})
function showTitle () {
    color.setPalette(color.Black)
    scene.setBackgroundImage(image.create(screen.width,screen.height))
    scene.backgroundImage().drawImage(imgTitle,10,10)
    scene.backgroundImage().print("by Aqee", 106,106)
    color.startFade(color.Black, color.originalPalette, 2000)
    color.pauseUntilFadeDone()
    pause(500)
    color.startFade(color.originalPalette, color.Black, 800)
    color.pauseUntilFadeDone()
    scene.setBackgroundImage(null)
}
function genPreview () {
    sprPreview = sprites.create(image.create((countRows + countThread - .5) >> 1, (countRows + countThread - .5) >> 1), 0)
    sprPreview.setFlag(SpriteFlag.RelativeToCamera, true)
    // sprPreview.image.fill(1)
    sprPreview.bottom = screen.height - 1
    sprPreview.left = 0
}
function switchKnotType_Next () {
    // game.splash(getKnot(cursorX, cursorY))
    knotType3 = getKnotType(cursorX, cursorY)
    knotType3 += 1
    if (knotType3 == 5) {
        knotType3 = 1
    }
    // info.setScore(0)
    setKnotAndUpdate(cursorX, cursorY, knotType3)
}
function switchKnotType_Color () {
    knotType = getKnotType(cursorX, cursorY)
    switchList = [
    0,
    3,
    4,
    1,
    2
    ]
    knotType = switchList[knotType]
    setKnot(cursorX, cursorY, knotType, null)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorX < countThread - 3) {
        sprCursor.x += 20
        cursorX += 2
    }
})
function getKnotType (x: number, y: number) {
    if (imgKnots.getPixel(x * interval + 5, y * interval + 5) == 1) {
        if (imgKnots.getPixel(x * interval + 6, y * interval + 4) == 1) {
            return 1
        } else if (imgKnots.getPixel(x * interval + 4, y * interval + 4) == 1) {
            return 3
        } else {
            return -1
        }
    } else {
        if (imgKnots.getPixel(x * interval + 4, y * interval + 4) == 1) {
            return 2
        } else if (imgKnots.getPixel(x * interval + 6, y * interval + 4) == 1) {
            return 4
        } else {
            return -1
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    // info.setScore(cursorX)
    if (cursorX == 0) {
        cursorLR = -1
    } else if (cursorX == countThread - 2) {
        cursorLR = 1
    }
    if (cursorY < countRows - 1) {
        cursorY += 1
        cursorX += -1 * cursorLR
        sprCursor.y += 10
        sprCursor.x += -10 * cursorLR
        cursorLR = cursorLR * -1
        scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 10)
    }
})
function updatePreview (x: number, y: number, c: number) {
    sprPreview.image.setPixel((y + x) >>1, (countThread + y-x-.5) >>1, c)
}
function switchKnotType_Thread () {
    knotType2 = getKnotType(cursorX, cursorY)
    switchList2 = [
    0,
    2,
    1,
    4,
    3
    ]
    knotType2 = switchList2[knotType2]
    // info.setScore(0)
    setKnotAndUpdate(cursorX, cursorY, knotType2)
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
        imgKnots.drawLine(x * interval, (y + 1) * interval, x * interval, (y + 2) * interval, imgKnots.getPixel(x * interval, (y + 1) * interval))
    }
    // update last thread at next line
    if (x == countThread - 2) {
        imgKnots.drawLine((x + 1) * interval, (y + 1) * interval, (x + 1) * interval, (y + 2) * interval, imgKnots.getPixel((x + 1) * interval, (y + 1) * interval))
    }
    // todo, update outer threads when last row
    // info.changeScoreBy(1)
    updatePreview(x, y, [0,cNew2,cNew2,cNew1,cNew1].get(knotType))
    if (imgToUpdateKnots && y < countRows - 1) {
        basic.pause(10)
for(let k=Math.max(x-1,0); k<Math.min(x+2, countThread-1);k++){
            if(getKnotType(k,y+1)>0)
                imgToUpdateKnots.setPixel(k,y+1,1)
                //setKnot(i, y+1, getKnotType(i, y + 1),true)
        }
    }
    return imgToUpdateKnots
}
function genKnots_DefaultPattern () {
    iKnots = countThread - 1
    interval = img1.width - 1
    imgKnots = image.create(interval * iKnots + 1, interval * countRows + 1)
    for (let x = 0; x <= countThread - 1; x++) {
        imgKnots.setPixel(x * interval, 0, x%2==0?7:2)
    }
    // if(y==2)break
    for (let y = 0; y <= countRows - 1; y++) {
        knotType4 = y % 4 + 1
        for (let x2 = 0; x2 <= iKnots - 1; x2++) {
            if (x2 == 0 && y % 2 == 1) {
                continue;
            }
            setKnot(x2, y, knotType4, null)
            x2 += 1
        }
    }
}
let knotType4 = 0
let iKnots = 0
let c2 = 0
let c1 = 0
let switchList2: number[] = []
let knotType2 = 0
let switchList: number[] = []
let knotType = 0
let knotType3 = 0
let imgToUpdateKnots: Image = null
let imgThreads: Image = null
let sprCursor: Sprite = null
let cursorY = 0
let cursorX = 0
let cursorLR = 0
let imgList: Image[] = []
let threadEndHeight = 4
let iRows = 0
let imgKnots: Image = null
let interval = 0
let imgTemp: Image = null
let countThread = 0
let countRows = 0
let cNew1 = 0
let cNew2 = 0
showTitle()
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
interval = img1.width - 1
countThread = 12
countRows = 16
cursorLR = 1
genCursor()
cursorX = 5
cursorY = 5
let sprPreview:Sprite
genPreview()
genKnots_DefaultPattern()
let sprKnots = sprites.create(imgKnots, SpriteKind.Projectile)
sprKnots.setPosition(80, 85)
let sprThread = sprites.create(genThread(), SpriteKind.Projectile)
sprThread.setPosition(sprKnots.x, sprKnots.top - sprThread.height / 2)
let sprThread2 = sprites.create(genThread(), SpriteKind.Projectile)
sprThread2.setPosition(sprKnots.x, sprKnots.bottom + sprThread.height / 2)
color.startFadeUntilDone(color.Black,color.originalPalette,  1000)
