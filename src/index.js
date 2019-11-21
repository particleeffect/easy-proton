import Proton from "proton-engine";
import RAFManager from "raf-manager";

let proton, emitter, renderer;

function createProton({
    rate = 30,
    body,
    life = 1,
    x = 100,
    y = 100,
    canvas,
    color = ["#ff0000", "#ffff00"],
    scale = [1, 0.1],
    alpha = [1, 0],
    v = 2,
    angel = [0, 50]
}) {
    proton = new Proton();
    emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(new Proton.Span(rate), 0.1);

    emitter.addInitialize(new Proton.Mass(1));
    body && emitter.addInitialize(new Proton.Body(body));
    emitter.addInitialize(new Proton.Life(life));
    emitter.addInitialize(
        new Proton.V(new Proton.Span(v), new Proton.Span(angel[0], angel[1]), "polar")
    );

    emitter.addBehaviour(new Proton.Color(color[0], color[1]));
    emitter.addBehaviour(new Proton.Scale(scale[0], scale[1]));
    emitter.addBehaviour(new Proton.Alpha(alpha[0], alpha[1]));

    emitter.p.x = x;
    emitter.p.y = y;
    emitter.emit();
    proton.addEmitter(emitter);

    renderer = new Proton.CanvasRenderer(canvas);
    proton.addRenderer(renderer);
    RAFManager.add(render);
}

function destroyProton() {
    proton.destroy();
    stopProton();
}

function stopProton() {
    RAFManager.remove(render);
}

function render() {
    proton && proton.update();
}

export { createProton, destroyProton, stopProton }