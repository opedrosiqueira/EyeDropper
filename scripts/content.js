/**
 * limitações:
 *  → tira um único screenshot quando abre a página. se a página alterar algum elemento, o screenshot não captura essa mudança. solução: a cada x segundos, tirar um novo screenshot (função setInterval).
 *  → getImageData é uma operação cara. quem sabe podemos salvar o imageData em cache como em https://github.com/youbastard/getImageData
 * 
 */

let canvas;
let context;

function screenshot() {
    let region = document.body; // whole screen
    html2canvas(region).then((canvas_) => {
        // html2canvas(region, { windowWidth: document.body.scrollWidth, windowHeight: document.body.scrollHeight }).then((canvas_) => {
        canvas = canvas_;
        context = canvas.getContext('2d', { willReadFrequently: true });
        console.log("screenshot");
    })
}


window.onload = () => {

    // setInterval(screenshot, 5000);
    screenshot();

    document.addEventListener('mousemove', (event) => {
        console.log("body", document.body.scrollWidth, document.body.scrollHeight, "mouse", event.pageX, event.pageY, event.screenX, event.screenY)

        if (context) {
            let pixelData = context.getImageData(event.pageX, event.pageY, 1, 1).data;

            console.log("%c◼◼◼◼◼◼◼◼◼◼◼", "color: rgba(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + "," + pixelData[3] + ")");
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key == 's') {
            let dataURL = canvas.toDataURL("image/png");
            let newTab = window.open('about:blank', 'image from canvas');
            newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
        } else if (event.key == 'u') {
            screenshot();
        }
    });
};
