import { notDeepEqual } from 'assert';
import { it } from 'node:test';
import { App, Editor, ItemView, WorkspaceLeaf, EditorPosition, EditorSelection, moment, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Menu, iterateRefs, View, editorEditorField, ButtonComponent, HexString, SliderComponent, ToggleComponent, TextComponent } from 'obsidian';
import { cursorTo } from 'readline';
import { isSymbolObject } from 'util/types';
import { updateColors, bookMarkAllBeginningWithProvided } from 'functions';
import { getPackedSettings } from 'http2';
import {NameColor} from "nameColor";
 
export const VIEW_TYPE_EXAMPLE = "example-view";

interface MyPluginSettings {
	name_color: NameColor[];
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	name_color: [{name: "Jolyne", color: "##11ff6c" }, {name: "Joseph", color: "#be7026"}]
}

export class ExampleView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
	  super(leaf);
	}
  
	getViewType() {
	  return VIEW_TYPE_EXAMPLE;
	}
  
	getDisplayText() {
	  return "Example view";
	}
  
	async onOpen() {
		let viewtype = this.getViewType()

		const container = this.containerEl.children[1];
		container.empty();

		let editorContent;
		const editor = this.app.workspace.activeEditor?.editor;
		
		let titleButtons = [];

		if (editor != null) {
			editorContent = editor.getValue();
			
			// Checks every line
			for (let lineIndex = 0; lineIndex < editor.lineCount(); lineIndex++) {
				const lineContent = editor.getLine(lineIndex);
				if (lineContent.contains("# -")){
					var regexp = /-/g;
					let filteredTitle = lineContent.replace(regexp, "").replace("#", "");

					let titlebutton = container.createEl("button", { text: filteredTitle });
					titleButtons.push(titlebutton);
				}
				
			}
		}

		for(let titleButton = 0; titleButton < titleButtons.length; titleButton++) {
			
		}
	}
  
	async onClose() {
	  // Nothing to clean up.
	}

  }

export default class ColoredNamesPlugin extends Plugin {
	settings: MyPluginSettings;
	
	async onload() {
		await this.loadSettings();
		
		const ribbonIconEl = this.addRibbonIcon("dice","Test Command", (evt: MouseEvent) => {
			// testCommand()
		})

		this.addCommand({
			id:"make-all-names-match-their-assigned-color",
			name:"Make All Names Match Their Assigned Color",
			hotkeys:[{modifiers:["Mod"], key:"q"}],

			editorCallback: (editor: Editor) => {
				console.log(this.settings.name_color)
				updateColors(this.settings.name_color, editor)
			}
		})


		this.addCommand({
			id:"change-color-of-name",
			name:"Change Color of Name",
			hotkeys:[{modifiers:["Alt"], key:"q"}],

			editorCallback: (editor: Editor) => {

				let lineContent = editor.getLine(editor.getCursor().line);

				// Get Name
				if (lineContent.contains('<font style="color:')) {
					let charName = lineContent.split(">")[1].slice(0, -6);
					new Notice(charName);
				}

				//Get Color
				if (lineContent.contains('<font style="color:')) {
					let contentWithoutCode = lineContent.split('<font style="color:')[1].slice(0, -6);
					let quotationMarkPosition = contentWithoutCode.indexOf('"')

					let colorName = contentWithoutCode.slice(0, quotationMarkPosition)
					new Notice(colorName.toString());
				}

			}
		})

		this.addCommand({
			id:"test-command",		
			name:"Test Command",
			editorCallback: (editor:Editor) => {
				console.dir(document)
			}
		})

		this.addCommand({
			id:"bookMarkAllBeginningWithProvided",
			name:"bookMarkAllBeginningWithProvided",
			editorCallback:(editor: Editor) => {
				bookMarkAllBeginningWithProvided(editor) 


				for (let lineIndex = 0; lineIndex < editor.lineCount(); lineIndex++) {
					const lineContent = editor.getLine(lineIndex);
			
					if (lineContent.startsWith("# -")) {
						this.app.workspace.on("file-menu", (menu, file) => {
							
						})
						
						
			
					}
				}
			}

			

		})
		
		this.addSettingTab(new ColoredNamesSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => {
		// 	const editor = this.app.workspace.activeEditor?.editor!;

		// 	// console.log('setInterval')
		// 	// updateColors(NAME_COLOR, editor) 
			
		// }, 0.1 * 1000)); //Every x Seconds

	}

	onunload() {

	}

	async activateView() {
		const { workspace } = this.app;
	
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);
	
		if (leaves.length > 0) {
		  // A leaf with our view already exists, use that
		  leaf = leaves[0];
		} else {
		  // Our view could not be found in the workspace, create a new leaf
		  // in the right sidebar for it
		  leaf = workspace.getRightLeaf(false);
		  await leaf!.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
		}
	
		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf!);}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


function addNameColorInSettings(settingTab: ColoredNamesSettingTab, containerEl:HTMLElement,
	index: number, isButton: boolean) {

	let nameColor = settingTab.plugin.settings.name_color

	// Pressing the button has to create a new name_color
	if (isButton) {
		nameColor.push({name: "", color: "#ffffff"})
		index = nameColor.length - 1
	}

	new Setting(containerEl)
	.setName("Name")
	.addColorPicker((colorPicker) => colorPicker
		.setValue(nameColor[index].color)
		.onChange(async (value) => {
			nameColor[index].color = value
			await settingTab.plugin.saveSettings()
		})
	)	
	.addText((text) => text
		.setPlaceholder("Name")
		.setValue(nameColor[index].name)
		.onChange(async (value) => {				
			nameColor[index].name = value
			await settingTab.plugin.saveSettings()
		})
	)
	.addButton((button) => { button
		.setIcon("trash")
		.setClass("removeButton")
		.onClick((evt: MouseEvent) => {
			nameColor.splice(index, 1)
			settingTab.display()
			settingTab.plugin.saveSettings()
		})
	})
	

	// console.log(settingTab.plugin.settings.name_color[index] + ": " + index)

}


class ColoredNamesSettingTab extends PluginSettingTab {
	plugin: ColoredNamesPlugin;

	constructor(app: App, plugin: ColoredNamesPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
		
		const nameColorContainer = containerEl.createDiv({cls: "nameColorContainer"})
		// Load all saved 
		for (let index = 0; index < this.plugin.settings.name_color.length; index++) {
			addNameColorInSettings(this, nameColorContainer, index, false)
		}	

		new Setting(containerEl)
			.addButton((button) => { button
			.setButtonText("Add")
			.setClass("addButton")
			.setIcon("plus")
			.onClick(async () => {
				addNameColorInSettings(this, nameColorContainer, 0, true)
			})
		})

		// const divider = containerEl.createEl("div", { cls: "divider" });
		
		new Setting(containerEl)
			.setName("Update Every X Seconds")
			.addToggle((toggle: ToggleComponent) => {})
			.addText((text: TextComponent) => {})
			

	}

}