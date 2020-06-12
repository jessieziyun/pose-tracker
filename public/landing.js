// LANDING SCREEN

export function createTextElements(div) {
    const header = document.createElement("h1");
    const headerNode = document.createTextNode("POSE TRACKER");
    header.appendChild(headerNode);
    header.style.color = "white";
    header.style.font = "28px Helvetica";
    header.style.lineHeight = "200%";
    header.style.paddingTop = "15%";

    const para = document.createElement("p");
    const paraNode = document.createTextNode(
        "Pose Tracker is a networked pose tracker built using PoseNet and Three.js"
    );
    para.appendChild(paraNode);
    para.style.color = "white";
    para.style.font = "14px Helvetica";

    div.appendChild(header);
    div.appendChild(para);
}

export function createButton(div) {
    const button = document.createElement("button");

    button.style.position = "absolute";
    button.style.bottom = "15%";
    button.style.width = "210px";
    button.style.left = "calc(50% - 105px)";
    button.style.border = "1px solid #fff";
    button.style.borderRadius = "4px";
    button.style.padding = "12px 6px";
    button.style.color = "#fff";
    button.style.background = "rgba(0,0,0,0.1)";
    button.style.font = "14px Helvetica";
    button.style.opacity = "0.5";
    button.style.cursor = "cursor";

    button.textContent = "LOADING PLEASE WAIT";

    div.appendChild(button);
    return button;
}

export function updateButton(button, div) {
    button.textContent = "ENTER POSE TRACKER";
    button.style.cursor = "pointer";

    button.onmouseenter = () => {
        button.style.opacity = "1.0";
    };

    button.onmouseleave = () => {
        button.style.opacity = "0.5";
    };

    button.onclick = () => {
        if (div.style.display !== "none") {
            div.style.display = "none";
        } else {
            div.style.display = "block";
        }
    };
}