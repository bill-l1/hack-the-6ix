import JSZip from 'jszip';
import React from 'react';
import { saveAs } from 'file-saver'

const createAndDownloadPackage = async (firebase, assets, category, provider, accountInfo, policyInfo, dateInfo, additionalInfo) => {
    return new Promise(async (res, rej) => {
        console.log('cat',category)
        console.log('prov',provider)
        console.log('acc',accountInfo)
        console.log('policy',policyInfo)
        console.log('date',dateInfo)
        console.log('add',additionalInfo)

        const html =`
        Category:
            ${category}
        
        Account Information:
            ${accountInfo}
            
        Policy Information:
            ${policyInfo}

        Additional Information:
            ${additionalInfo}
        `;
    
        console.log(html);
        // const src = html + 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

        let urls = {};
        let zip = new JSZip();
        const claim = new File(html, "claim.txt", {type: "text/plain;charset=utf-8"});
        zip.file('claim.doc', claim);
        // let counter = 1;
        for(const asset of assets){
            const asset_id = asset['id'];
            const asset_name = asset.data.name;
            let folder = zip.folder(asset_name)

            urls[asset_id] = [];
            const documents = await firebase.getDocuments(asset_id);
            for(const doc of documents){
                const url = await firebase.getDocumentUrl(doc.id);
                const blob = await window.fetch(url, {mode: 'no-cors'}).then(res => res.blob());
                const filename = url.split(RegExp('%2..*%2F(.*?)\?alt'))[1].slice(0, -1);
                console.log("FILENAME:", filename);
                const file = new File([blob], `${filename}`)
                folder.file(`${filename}`, file);

                urls[asset_id].push(url);
            }
        }
        res(zip.generateAsync({type:"blob"}).then(content => {
            saveAs(content, 'package.zip')
        }))
    })
}


export default createAndDownloadPackage;