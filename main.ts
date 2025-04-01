import { notDeepEqual } from 'assert';
import { it } from 'node:test';
import { App, Editor, ItemView, WorkspaceLeaf, EditorPosition, EditorSelection, moment, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Menu, iterateRefs, View, editorEditorField, ButtonComponent } from 'obsidian';
import { cursorTo } from 'readline';
import { isSymbolObject } from 'util/types';
import { updateColors, testCommand, mergeAlternately, bookMarkAllBeginningWithProvided } from 'functions';

export const VIEW_TYPE_EXAMPLE = "example-view";


interface MyPluginSettings {
	mySetting: string;
	name: string;
	name_color: Record<string,string>[];
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	name: '#fef65b',
	name_color: [{"Jolyne": "green"}, {"Joseph":"brown"}]
}

const NAME_COLOR: Record<string,string> = {
	// "Johnny": "yellow",
	// "Gyro": "pink",
	// "Jotaro": "red",
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

export default class SecondPlugin extends Plugin {
	settings: MyPluginSettings;
	
	async onload() {
		await this.loadSettings();
		
		
		const ribbonIconEl = this.addRibbonIcon("dice","Test Command", (evt: MouseEvent) => {
			testCommand()
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
				testCommand()
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
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => {
		// 	const editor = this.app.workspace.activeEditor?.editor!;

		// 	testCommand()
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

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

function addNameColorButton(containerEl: HTMLElement, button: ButtonComponent){
	button
		.setButtonText("Add")
		.onClick(async () => {
			// this.plugin.settings.name_color.push({"" : ""})
			addNameColorInSettings(containerEl)
		})
		.setClass("mod-cta")
}


function addNameColorInSettings(containerEl: HTMLElement) {
	console.log("addNameColorInSettings")

	new Setting(containerEl)
			.setName("Name")
			.addText((text) =>
				text
					.setPlaceholder("Name")
					.onChange(async (value) => {
						this.plugin.settings.name_color[0].key = value;
						await this.plugin.saveSettings()
				})
		);

		new Setting(containerEl)
			.setName("Color")
			.addText((text) =>
				text
					.setPlaceholder("Color")
					.onChange(async (value) => {
						this.plugin.settings.name_color[0].value = value;
						// NAME_COLOR.Alex = value;
						await this.plugin.saveSettings()
				})
		);

		const divider = containerEl.createEl("div", { cls: "divider" });
}

class SampleSettingTab extends PluginSettingTab {
	plugin: SecondPlugin;

	constructor(app: App, plugin: SecondPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		// const addNameColorButt on = containerEl.createEl("button", {cls: "addButton", text:"+", })
		new Setting(containerEl).addButton((button) => addNameColorButton(containerEl, button))

		const divider = containerEl.createEl("div", { cls: "divider" });
		for (let index = 0; index < this.plugin.settings.name_color.length; index++) {
			addNameColorInSettings(containerEl)
		}	
			
	}
}