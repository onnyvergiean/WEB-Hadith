
let  param = location.search.substring(1);
let splitter = param.split("|");
let hadithId = splitter[0];
let page = parseInt(splitter[1]);

const isiHadith = document.querySelector('#isiHadith');
const nextBtnHadith = document.querySelector('#nextHadith');
const backBtnHadith = document.querySelector('#backHadith');

const showHadith= async()=>{
    try{
        const hadith= await fetchHadith();
        const newHadith = document.createElement('newHadith');
        newHadith.append(hadith);
        isiHadith.append(newHadith);  
    }catch(e){
        return e;
    } 
}

const fetchHadith =async() =>{
   try{
        const res = await axios.get('https://api.hadith.sutanlab.id/books/' + hadithId + "/" + page)
        const hadithContent =  [res.data.data.contents.arab, res.data.data.contents.id, res.data.data.contents.number]
        return hadithContent
   }catch(e){
       return e
   }
}

const nextHadith = async()=>{
    try{
        page+=1;
        const nextHadithContent = window.history.replaceState(null, null, "?" + hadithId + "|" + page);
        location.reload();
        return nextHadithContent
    }catch(e){
        return e
    }
}

const backHadith = async () =>{
    try{
        page-=1;
        const backHadithContent = window.history.replaceState(null, null, "?" + hadithId + "|" + page);
        location.reload();
        return backHadithContent
    }catch(e){
        return e
    }
}


showHadith();
nextBtnHadith.addEventListener('click', nextHadith)
backBtnHadith.addEventListener('click', backHadith)