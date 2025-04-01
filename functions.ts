import { Editor } from "obsidian";
import { App, ItemView, WorkspaceLeaf, EditorPosition, EditorSelection, moment, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Menu, iterateRefs, View, editorEditorField } from 'obsidian';


export const updateColors = (NAME_COLOR: Record<string,string>[], editor: Editor): void => {

    // Check Every Line
    for (let lineIndex = 0; lineIndex < editor.lineCount(); lineIndex++) {
        // console.log("nameColorArray Length " + NAME_COLOR.length)

        // Check Every Set in NAME_COLOR
        for (let nameColorArrayIndex = 0; nameColorArrayIndex < NAME_COLOR.length; nameColorArrayIndex++) {

            // console.log("nameColorArrayIndex" + nameColorArrayIndex)


            let editorValue = editor.getValue();
            
            const lineContent = editor.getLine(lineIndex);
            
            // Check all arrays
            for (let nameColorSetIndex in Object.keys(NAME_COLOR)) {
                
                // let charName: string = Object.keys(NAME_COLOR)[nameColorSetIndex];
                // let color: string = Object.values(NAME_COLOR)[nameColorSetIndex];
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






class Invoice {
    client: string;
    details: string;
    amount: number;

    constructor(c:string, d:string, a:number) {
        this.client = c
        this.details = d
        this.amount = a
    }

    format() {
        return `${this.client} owes ${this.amount} for ${this.details}`
    }
}


const invOne = new Invoice("Johnny", "WOAW", 20)

export const testCommand = () : void => {
    
    

}

export const mergeAlternately = (word1: string, word2: string) => {
    let base: string = ""
    let result: string = ""

    if (1 <= word1.length, word2.length <= 100, word1 == word1.toLowerCase() && word2 == word2.toLowerCase()) {

        // Merge letters into combinedArray
        for (let index = 0; index <= Math.max(word1.length, word2.length); index++) {
            
            
        }

        return result

    } else {
        return "Sorry, not allowed"
    }

}

export const gcdOfStrings = (str1: string, str2: string):string => {

    let prefix: string = ""
    
    if (1 <= str1.length, str2.length <= 100, str1 == str1.toUpperCase() && str2 == str2.toUpperCase()) {
        

        for (let index = 0; index < Math.min(str1.length, str2.length); index++) {

            
        }

        
    }

    return prefix
    
}
