const r = require("raylib");

function isInsideCircle(x, y, circle) {
    const isInCircle =
        (x - circle.center.x) ** 2 + (y - circle.center.y) ** 2 <=
        circle.radius ** 2;
    return isInCircle;
}

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random points inside rectangle",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(10);
    r.SetTraceLogLevel(r.LOG_NONE);

    const color = {
        r: 255,
        g: 255,
        b: 255,
        a: 100,
    };

    const circle = {
        center: {
            x: 800,
            y: 400,
        },
        radius: 300,
        pointsInsideCircle: 0,
    };

    const rectangle = {
        x: 400,
        y: 100,
        width: 800,
        height: 600,
    };

    const points = [];

    for (let i = 0; i < 100; i++) {
        const xPoint = getRandom(rectangle.x, rectangle.x + rectangle.width);
        const yPoint = getRandom(rectangle.y, rectangle.y + rectangle.height);
        if (isInsideCircle(xPoint, yPoint, circle)) {
            circle.pointsInsideCircle++;
        }
        points.push({ x: xPoint, y: yPoint });
    }

    return { screen, rectangle, color, points, circle };
}

function getRandom(start, end) {
    return start + Math.random() * (end - start);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    console.log(world.circle.pointsInsideCircle);

    r.DrawRectangleLinesEx(world.rectangle, 8, r.WHITE);

    for (const point of world.points) {
        r.DrawCircle(point.x, point.y, 5, world.color);
    }

    r.EndDrawing();
}

function update(world) {}

function teardown() {
    r.CloseWindow();
}
function loop(world) {
    while (!r.WindowShouldClose()) {
        draw(world);
        update(world);
    }
    teardown();
}
function main() {
    const world = setup();
    loop(world);
}

main();
