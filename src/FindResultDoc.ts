'use strict';

import * as vscode from 'vscode';
import CscopeExecutor from './CscopeExecutor';

export default class FindResultDoc {
    private links: vscode.DocumentLink[];
    private docContent : string;
    private docUri : string;

    constructor (uri: vscode.Uri, fileList : any){
        const [briefText, symbol, functionIndex] = <[string, string, number]>JSON.parse(uri.query);
        const briefing = `${briefText} "${symbol}":\n`;
        this.docUri = uri.toString();
//        const fileList = executor.runSearch(symbol, functionIndex);
        let content = '';
        let lineNum = 1;
        const workspacePathLen = vscode.workspace.rootPath.length;
        this.links = [];
        fileList.forEach((line) =>{
//            const fileInfo = line.fileName.slice(workspacePathLen) + ':' + line.lineNum
            const fileInfo = line.fileName + ':' + line.lineNum;
            if (fileInfo.length === 2) {
                content += "\t\t" + ` ${line.otherText}\n`;
            } else {
                content += lineNum + "\t" + fileInfo + ` ${line.otherText}\n`;
                lineNum++;
            }
        });

        this.docContent = briefing + content;
    }

    getDocContent():string{
        return this.docContent;
    }

    getUri() :string{
        return this.docUri;
    }

    getDocLinks():vscode.ProviderResult<vscode.DocumentLink[]>{
        return this.links;
    }
}