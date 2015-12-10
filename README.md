# get_style_from_psd
During long years I suffered from designers, who created shitty designs in PSD, where every fucking element has new code style, as developer I had to open Photoshop and click on every element to get it's font, font-size, color. The owful part of developer's life no one ever mentioned.
This node.js script parses PSD file and outputs all text layers with font-family, font-size, color values.
Usage: node app.js ~/Downloads/BrilliantNewDesignFile.psd
Output example:
Village Roadshow Theme 'Roboto-Bold', 20px, #79b822
View Deal 'Roboto-Bold', 18px, #ffffff
