import JSZip from 'jszip';
import { saveAs } from 'file-saver'

const createAndDownloadPackage = async (firebase, asset_ids) => {
    return new Promise(async (res, rej) => {
        let urls = {};
        let zip = new JSZip();
        // let counter = 1;
        for(const asset_id of asset_ids){
            const asset = await firebase.getAsset(asset_id)
            const asset_name = asset.data.name;
            let folder = zip.folder(asset_name)

            urls[asset_id] = [];
            const documents = await firebase.getDocuments(asset_id);
            for(const doc of documents){
                const url = await firebase.getDocumentUrl(doc.id);
                const blob = await window.fetch(url).then(res => res.blob());
                const filename = url.split(RegExp('%2..*%2F(.*?)\?alt'))[1];
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


export default {createAndDownloadPackage};