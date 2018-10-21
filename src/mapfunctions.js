export const svgViewBox = {
    left: 0,
    top: 0,
    right: 179.37636,
    bottom: 107.75621
}

export function getViewBoxAttr() {
    return `${svgViewBox.left} ${svgViewBox.top} ${svgViewBox.right} ${svgViewBox.bottom}`;
}

export function translateCoords({ Latitude, Longitude }) {
    const primeMeridian = 87.31;
    const equator = 72.5;
    const y = Math.tan(Latitude / 90 * Math.PI / 2) / 4.24 * (svgViewBox.top + svgViewBox.bottom) + equator;
    const x = Longitude/180 * (svgViewBox.left + svgViewBox.right + 6) / 2 + primeMeridian;
    return { x, y };
}