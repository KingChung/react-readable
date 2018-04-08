import ColorHash from 'color-hash'

export const strToHex = (str) => {
    const colorHash = new ColorHash()
    return colorHash.hex(str)
}

export const hexToReverse = (h) =>  {
	if(h[0] === '#') {
		h = h.slice(1)
	}
	var r = 0, g = 0, b = 0;
	r = 255 - parseInt(h[0],16)*16 - parseInt(h[1],16);
	g = 255 - parseInt(h[2],16)*16 - parseInt(h[3],16);
	b = 255 - parseInt(h[4],16)*16 - parseInt(h[5],16);
	return '#' + (r < 16 ? "0" + r.toString(16).toUpperCase() : r.toString(16).toUpperCase()) + (g < 16 ? "0" + g.toString(16).toUpperCase() : g.toString(16).toUpperCase()) + (b < 16 ? "0" + b.toString(16).toUpperCase() : b.toString(16).toUpperCase());
}