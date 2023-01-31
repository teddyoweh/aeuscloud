import AudiosTab from "./Audios";
import PicturesTab from "./Pictures";
import DocumentsTab from "./Documents";
import VideosTab from "./Videos";

function GenerateNewTab({tab}){
  switch(tab){
    case "pics":
        return (<PicturesTab/>)
    case "audio":
        return (<AudiosTab/>)
    case "docs":
        return (<DocumentsTab/>)
    case "vids":
        return (<VideosTab/>)

    default:
        return (<PicturesTab/>)

        
  }
}

export {PicturesTab, GenerateNewTab}