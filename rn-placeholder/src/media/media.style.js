/**
 * Compute style based on props
 * @param size The media size
 * @param hasRadius Does the media rounded or not ?
 * @param color The media color
 */
export default ({height,width, size = 40, hasRadius = false, color = '#efefef' }) => ({
  height: height || size,
  width:width|| size,
  borderRadius: hasRadius ? size / 2 : 3,
  backgroundColor: color,
});
