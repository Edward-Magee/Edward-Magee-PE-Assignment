function getElement(name) {
   return document.querySelector("#" + name);
}
function randomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}
function randomFloat(min, max) {
   return Math.random() * (max - min) + min;
}

const confettis = [];
class Confetti {
   constructor() {
      this.displayObj = document.createElement("div");
      this.displayObj.classList.add("confetti");
      document.body.appendChild(this.displayObj);
      this.displayObj.style.width = randomInt(15, 20) + "px";
      this.displayObj.style.height = randomInt(6, 9) + "px";

      this.x = randomInt(20, 80);
      this.y = randomInt(40, 100);
      this.displayObj.style.left = this.x + "%";
      this.displayObj.style.top = this.y + "%";

      this.displayObj.style.transform = `rotate(${randomFloat(0, 360)}deg)`;

      this.xVel = randomInt(5, -5);
      this.yVel = randomFloat(-1, -3);

      this.pos = {
         x: this.x,
         y: this.y
      };

      const colours = ["00e5ff", "ffae00", "ff008c"];
      console.log(Math.floor(Math.random() * colours.length));
      this.displayObj.style.backgroundColor = "#" + colours[Math.floor(Math.random() * colours.length)];
   }
}

const tick = () => {
   if (confettis.length < 1) return;

   const GRAVITY = 0.03;
   for (const confetti of confettis) {
      confetti.obj.y += confetti.obj.yVel;
      confetti.obj.yVel *= 0.99;
      confetti.obj.yVel += GRAVITY;
      confetti.obj.displayObj.style.top = confetti.obj.y + "%";

      confetti.obj.x += confetti.obj.xVel;
      confetti.obj.xVel *= 0.9;
      confetti.obj.displayObj.style.left = confetti.obj.x + "%";
   }
}

window.onload = () => {
   getElement("website-button").addEventListener("click", () => {
      document.location = "index.html";
   });

   getElement("summary-button").addEventListener("click", () => {
      document.location = "summary.html";
   });

   getElement("confetti-button").addEventListener("click", () => {
      const CONFETTI_COUNT = randomInt(25, 100);
      for (let i = 0; i < CONFETTI_COUNT; i++) {
         const confetti = new Confetti();
         confettis.push({
            obj: confetti,
            pos: confetti.pos
         });
      }
      getElement("confetti-count").innerHTML = `Confetti generated:  ${CONFETTI_COUNT}`;
   });

   setInterval(tick, 10);
}