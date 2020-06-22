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
    const paraNode1 = document.createTextNode("Pose Tracker is a networked pose tracker built using PoseNet and Three.js. PoseNet");
    para.appendChild(paraNode1);
    const br1 = document.createElement("br");
    para.appendChild(br1);
    const paraNode2 = document.createTextNode("is trained on full body images, so stand slighly back from the camera for best results.");
    para.appendChild(paraNode2);
    const br2 = document.createElement("br");
    para.appendChild(br2);
    const paraNode3 = document.createTextNode("The more of your body the camera sees, the more accurate PoseNet's predictions.")
    para.appendChild(paraNode3);
    para.style.color = "white";
    para.style.font = "18px Helvetica";
    para.style.lineHeight = "1.4";
    para.style.paddingBottom = "2%";

    div.appendChild(header);
    div.appendChild(para);
}

export function createButton(div) {
    const button = document.createElement("button");

    button.style.position = "absolute";
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