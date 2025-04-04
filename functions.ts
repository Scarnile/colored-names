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
            let caseSensitive: boolean = name_color[nameColorArrayIndex].caseSensitive;

            
            let namePosition = lineContent.indexOf(charName);
            
            //Not Case Sensitive
            if (!caseSensitive) {
                namePosition = lineContent.toLowerCase().indexOf(charName.toLowerCase())
                
                if (lineContent.toLowerCase().contains(charName.toLowerCase())) {
                    console.log("not case sensitive")
                    charName = lineContent.substring(namePosition)
                    console.log(charName)
                }
            } 
            
            let updatedLineContent = editor.getLine(lineIndex).replace(charName, `<font style="color:${color}">${charName}</font>`)


            

            // If it doesn't have a color
            if (!lineContent.contains('<font style="color:') && !lineContent.contains("</font>")) {
                
                // If name is the very first word
                if (namePosition <= 1) {
                    editor.setLine(lineIndex, updatedLineContent);
                }
            
            } 

            

            // Check all arrays
            for (let nameColorSetIndex in Object.keys(name_color)) {
                
                
            }    
        }  
    } 
}