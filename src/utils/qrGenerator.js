import QRCode from 'qrcode';

/**
 * Generates an SVG string of a QR Code using the verified 'qrcode' library.
 * Preserves the exact signature, options, and output structure.
 *
 * @param {string} text - Payload to encode in the QR code
 * @param {object} options - Generation options
 * @param {number} [options.size=200] - Render width/height in px
 * @param {number} [options.margin=2] - Margin border modules
 * @param {string} [options.darkColor='#0f172a'] - Hex/CSS color for dark modules
 * @param {string} [options.lightColor='#ffffff'] - Hex/CSS color for light background
 * @returns {string} SVG string
 */
export function generateQRCodeSvg(text, options = {}) {
  const margin = options.margin !== undefined ? options.margin : 2;
  const darkColor = options.darkColor || '#0f172a';
  const lightColor = options.lightColor || '#ffffff';
  const size = options.size || 200;

  try {
    const qr = QRCode.create(text, {
      errorCorrectionLevel: options.errorCorrectionLevel || 'M'
    });
    const count = qr.modules.size;
    let path = '';

    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.modules.get(r, c)) {
          path += `M${c + margin},${r + margin}h1v1h-1z `;
        }
      }
    }

    const total = count + margin * 2;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${size}" height="${size}">
      <rect width="100%" height="100%" fill="${lightColor}"/>
      <path d="${path.trim()}" fill="${darkColor}" shape-rendering="crispEdges"/>
    </svg>`;
  } catch (err) {
    console.error('QR Code Generation Error:', err);
    return '';
  }
}

/**
 * Generates a Data URL string containing the QR Code SVG.
 * Compatible with <img src="..."> tags.
 *
 * @param {string} text - Payload to encode
 * @param {object} options - Generation options
 * @returns {string} Data URL
 */
export function generateQRCodeDataUrl(text, options = {}) {
  const svg = generateQRCodeSvg(text, options);
  if (!svg) return '';
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
