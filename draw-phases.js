const drawMainPilar = (context, w, h) => {
    context.moveTo(w / 4, h);
    context.lineTo(w / 4, h / 4);
}

const drawHorizPilar = (context, w, h) => {
    context.moveTo(w / 4, h / 4);
    context.lineTo(w - w / 4, h / 4);
}

let radius, headX, headY;
const drawHead = (context, w, h) => {
    radius = 35; headX = w - w / 4; headY = h / 2;
    context.arc(headX, headY, radius, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.arc(360, 236, 2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(388, 236, 2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.moveTo(361, 265);
    context.lineTo(390, 265);//*/
    context.stroke();
}

const BODY_HEIGHT = 80, BODY_WIDTH = 13;
const drawBody = (context, w, h) => {
    context.fillRect(w - w / 4 - 5, h / 2 + radius, BODY_WIDTH, BODY_HEIGHT);
}

const drawLeftHand = (context, _w, _h) => {
    context.moveTo(370, 300);
    context.lineTo(335, 324);
    context.lineWidth = 5;
}

const drawRightHand = (context, _w, _h) => {
    context.moveTo(382, 300);
    context.lineTo(420, 324);
    context.lineWidth = 5;
}

const drawLeftLeg = (context, _w, _h) => {
    context.moveTo(374, 366);
    context.lineTo(362, 397);
    context.lineWidth = 8;
}

const drawRightLeg = (context, _w, _h) => {
    context.moveTo(380, 366);
    context.lineTo(390, 397);
    context.lineWidth = 8;
}

const drawRope = (context, w, h) => {
    context.moveTo(w - w / 4, h / 4);
    context.lineTo(headX, headY - radius);
    context.lineWidth = 3;
}

const drawPhases = [drawMainPilar, drawHorizPilar, drawHead, drawBody, drawLeftHand, drawRightHand, drawLeftLeg, drawRightLeg, drawRope];
export default drawPhases;