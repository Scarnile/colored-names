import { Editor } from "obsidian";
import { App, ItemView, WorkspaceLeaf, EditorPosition, EditorSelection, moment, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Menu, iterateRefs, View, editorEditorField } from 'obsidian';
import {NameColor} from "nameColor"

export const updateColors = (name_color: NameColor[], editor: Editor): void => {

    // Check Every Line
    for (let lineIndex = 0; lineIndex < editor.lineCount(); lineIndex++) {

        // Check Every Set in name_color
        for (let nameColorArrayIndex = 0; nameColorArrayIndex < name_color.length; nameColorArrayIndex++) {

            let editorValue = editor.getValue();
            const lineContent = editor.getLine(lineIndex);
            
            let charName: string = name_color[nameColorArrayIndex].name;
                let color: string = name_color[nameColorArrayIndex].color;

                let namePosition = lineContent.indexOf(charName);
                // If it doesn't have a color
                if (!lineContent.contains('<font style="color:') && !lineContent.contains("</font>")) {
                    
                    // If name is the very first word
                    if (namePosition <= 1) {
                        let updatedLineContent = editor.getLine(lineIndex).replace(charName, `<font style="color:${color}">${charName}</font>`)
                        editor.setLine(lineIndex, updatedLineContent);
                    }
                    
                } 

            // Check all arrays
            for (let nameColorSetIndex in Object.keys(name_color)) {
                
                
            }    
        }  
    } 
}

export const bookMarkAllBeginningWithProvided = (editor: Editor):void => {
    for (let lineIndex = 0; lineIndex < editor.lineCount(); lineIndex++) {
        const lineContent = editor.getLine(lineIndex);

        if (lineContent.startsWith("# -")) {
            
        }
    }
}