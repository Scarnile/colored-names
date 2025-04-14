import { Editor } from "obsidian";
import { App, ItemView, WorkspaceLeaf, EditorPosition, EditorSelection, moment, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Menu, iterateRefs, View, editorEditorField } from 'obsidian';
import {NameColor} from "nameColor"

export const updateColors = (name_color: NameColor[], editor: Editor): void => {

    // Check Every Line
    for (let lineIndex = 0; lineIndex < editor.lineCount(); lineIndex++) {

        // Check Every Set in name_color
        for (let nameColorArrayIndex = 0; nameColorArrayIndex < name_color.length; nameColorArrayIndex++) {

            let syntaxRegex = /<font style="[^"]*">[A-Za-z0-9]+<\/font>/i

            let editorValue = editor.getValue();
            const lineContent = editor.getLine(lineIndex);
            
            let settingName: string = name_color[nameColorArrayIndex].name;
            let settingColor: string = name_color[nameColorArrayIndex].color;
            let caseSensitive: boolean = name_color[nameColorArrayIndex].caseSensitive;
            
            let namePosition
            let updatedLineContent            
            
            //Not Case Sensitive
            if (!caseSensitive) {
                namePosition = lineContent.toLowerCase().indexOf(settingName.toLowerCase())
                
                if (lineContent.toLowerCase().contains(settingName.toLowerCase())) {
                    
                    settingName = lineContent.substring(namePosition)
                    
                    if (lineContent.contains("</font>")) {
                    }

                }
            } else {
                namePosition = lineContent.indexOf(settingName);
            }
            console.log(settingName)
            
            

            // If it has a color, check if the color doesn't match and update it
            if (lineContent.match(syntaxRegex)) {
                
                let lineContentColor = lineContent.split('<font style="color:')[1].substring(0, 7);
                let lineContentName = lineContent.split('<font style="color:' + lineContentColor +'">')[1].slice(0, -7);

                // If name's current color doesn't match settings 
                if (settingName == lineContentName && settingColor != lineContentColor) {
                    
                    updatedLineContent = lineContent.replace(lineContentColor, settingColor)
                    editor.setLine(lineIndex, updatedLineContent);
                    
                }
            }
            // If the name in the editor doesn't have a color, give it one
            else if (lineContent.includes(settingName)){ 
                updatedLineContent = lineContent.replace(settingName, `<font style="color:${settingColor}">${settingName.trim()}</font>`)
                editor.setLine(lineIndex, updatedLineContent);

                // If name is the very first word
                // if (namePosition <= 1) {
                // }
            }
            

        }  
    } 
}