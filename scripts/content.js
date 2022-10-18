/**
 * limitações:
 *  → tira um único screenshot quando abre a página. se a página alterar algum elemento, o screenshot não captura essa mudança. solução: a cada x segundos, tirar um novo screenshot (função setInterval).
 *  → getImageData é uma operação cara. quem sabe podemos salvar o imageData em cache como em https://github.com/youbastard/getImageData
 * 
 */

let context;

function screenshot() {
    let region = document.querySelector("body"); // whole screen
    html2canvas(region).then(canvas => {
        context = canvas.getContext('2d', { willReadFrequently: true })
    })
}

function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}

screenshot()

document.addEventListener('mousemove', (event) => {
    console.log("body", document.body.scrollHeight, document.body.scrollWidth, "mouse", event.pageY, event.pageX)

    if (context) {
        let pixelData = context.getImageData(event.pageX, event.pageY, 1, 1).data;

        if (pixelData[0] == 0 && pixelData[1] == 0 && pixelData[2] == 0 && pixelData[3] == 0)
            throw "Transparent color detected, cannot be converted to HEX"
        if (pixelData[0] > 255 && pixelData[1] > 255 && pixelData[2] > 255)
            throw "Invalid color component";

        let hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
        console.log("%c◼◼◼◼◼◼◼◼◼◼◼", "color: " + hex);
    }
});
