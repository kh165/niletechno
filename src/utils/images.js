// Safe image loader: never breaks the build if an image file is missing.
const found = import.meta.glob('../assets/images/*.{png,webp,jpg,jpeg,svg}', {
  eager: true,
  import: 'default'
});

export function getImage(name) {
  const key = `../assets/images/${name}`;
  return found[key] || '';
}