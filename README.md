# Map

Simple abstraction to work with `SVG` based maps.

![js map component](http://f.cl.ly/items/0B3M2w0Z2Y2p46461d0c/Screen%20Shot%202012-11-09%20at%2011.25.20%20AM.png)

## Example

```js
var map = new Map(svg);

map.colors("#0B486B", "#3B8686", "#79BD9A");
map.set('minas-gerais', 300);
map.set('sao-paulo', 500);
map.colorize();

document.body.appendChild(map.el);
```

## API

### Map(svg)

Initialize `Map` with given `Document`.

### Map#size(width, height)

Set `width` and `height` dimensions.

### Map#scale(amount)

Adds scale by given amount to the paths.

### Map#style(attributes)

Set the `attributes` for every path. 

### Map#find(id)

Find path with given `id`.

### Map#set(key, value)

Set value for key. 

### Map#colors(colors)

Set range of colors.

### Map#colorize([animate])

Set color of each path on the map.

### Map#draw

Draw `Map`. Useful if you change colors or size values.

Note: You must name each path in your `SVG` document through the `id` attribute.

## License

MIT
