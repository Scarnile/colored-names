# Colored Names

An Obsidian plugin that assigns custom colors to specific names or words in your notes. Each occurrence of a configured name is wrapped in a `<font>` tag with the chosen color.

## Features

- Assign any hex color to any name/word
- Case-sensitive or case-insensitive matching per name
- **Make All Names Match Their Assigned Color** command — applies or updates colors across the entire editor
- **Change Color of Name** command — inspect the color of a name at the cursor position
- Optional auto-update on a configurable timer interval
- Manage all name-color pairs directly in the plugin settings tab

## Commands

| Command | Hotkey | Description |
|---|---|---|
| Make All Names Match Their Assigned Color | `Ctrl+Q` | Scan the active editor and apply/update colors for all configured names |
| Change Color of Name | `Alt+Q` | Show a notice with the name and color at the cursor |

## Usage

1. Open **Settings → Colored Names**.
2. Click **Add** to create a new name–color pair.
3. Pick a color and enter the name text.
4. Toggle the case-sensitivity button (Aa icon) as needed.
5. Remove entries with the trash button.
6. In any note, run **Make All Names Match Their Assigned Color** (`Ctrl+Q`) to apply the colors.

Names that already have a `<font>` color tag will be updated if the color has changed. Uncolored names will be wrapped with the configured color.

### Auto-update

Enable **Update Every X Seconds** in settings and set the interval. The plugin will reapply colors automatically on that timer. Restart the plugin (disable/enable) after changing this setting.

## Installation

### Manual

Copy `main.js`, `styles.css`, and `manifest.json` from this repo to `VaultFolder/.obsidian/plugins/colored-names/`.

### Development

```bash
npm install
npm run dev
```