var PSD = require('psd');
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
if (process.argv.length < 3) {
    console.log("PSD file name is not specified")
    return;
}
var psd = PSD.fromFile(process.argv[2]);
psd.parse();
get_info(psd.tree().export());

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function get_info(layers) {
    if (layers.hasOwnProperty("children")) {
        get_info(layers.children);
    }
    var i;
    for (i = 0; i < layers.length; ++i) {
        var entry = layers[i];
        if (entry.hasOwnProperty("children")) {
            get_info(entry.children);
        } else {
            if (entry.hasOwnProperty("text") && entry.text != undefined) {
                //font sizes
                var j;
                var sizes = [];
                for (j = 0; j < entry.text.font.sizes.length; ++j) {
                    var size = entry.text.font.sizes[j];
                    if (sizes.indexOf(size) == -1) {
                        sizes.push(size);
                    }
                }
                var font_size = "";
                sizes.map(function(s) {
                    font_size += " " + s + "px";
                });
                //colors
                var k;
                var colors = [];
                for (k = 0; k < entry.text.font.colors.length; ++k) {
                    var hex_colors = entry.text.font.colors[k];
                    var color = rgbToHex(hex_colors[0], hex_colors[1], hex_colors[2]);
                    if (colors.indexOf(color) == -1) {
                        colors.push(color);
                    }
                }
                var web_color = "";
                colors.map(function(c) {
                    web_color += " " + c;
                })
                console.log("%s '%s', %s, %s", entry.text.value, entry.text.font.name, font_size.trim(), web_color.trim());
            }
        }
    }
}