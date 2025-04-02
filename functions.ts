import { Editor } from "obsidian";
import { App, ItemView, WorkspaceLeaf, EditorPosition, EditorSelection, moment, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Menu, iterateRefs, View, editorEditorField } from 'obsidian';


export const updateColors = (NAME_COLOR: Record<string,string>[], editor: Editor): void => {

    // Check Every Line
    for (let lineIndex = 0; lineIndex < editor.lineCount(); lineIndex++) {

        // Check Every Set in NAME_COLOR
        for (let nameColorArrayIndex = 0; nameColorArrayIndex < NAME_COLOR.length; nameColorArrayIndex++) {

            let editorValue = editor.getValue();
            const lineContent = editor.getLine(lineIndex);
            
            // Check all arrays
            for (let nameColorSetIndex in Object.keys(NAME_COLOR)) {
                
                let charName: string = Object.keys(NAME_COLOR[nameColorArrayIndex])[nameColorSetIndex];
                let color: string = Object.values(NAME_COLOR[nameColorArrayIndex])[nameColorSetIndex];

                let namePosition = lineContent.indexOf(charName);
                // If it doesn't have a color
                if (!lineContent.contains('<font style="color:') && !lineContent.contains("</font>")) {
                    
                    // If name is the very first word
                    if (namePosition <= 1) {
                        let updatedLineContent = editor.getLine(lineIndex).replace(charName, `<font style="color:${color}"> ${charName}</font>`)
                        editor.setLine(lineIndex, updatedLineContent);
                    }
                    
                } 
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