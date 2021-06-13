
let param = location.search.substring(1);
let splitter = param.split("|");
let hadithId = splitter[0];
let page = parseInt(splitter[1]);

const arabHadith = document.querySelector('#arabHadith');
const nomorHadith = document.querySelector('#nomorHadith');
const idHadith = document.querySelector('#idHadith');
const namaHadith = document.querySelector('#namaHadith');

const nextBtnHadith = document.querySelector('#nextHadith');
const backBtnHadith = document.querySelector('#backHadith');

<<<<<<< HEAD
const showHadith= async()=>{
    try{
        const hadith= await fetchHadith();
        const newHadithArab = document.createElement('newHadithArab');
        newHadithArab.append(hadith.arabHadith);
        arabHadith.append(newHadithArab);  

        const newHadithNomor = document.createElement('newHadithNomor')
        newHadithNomor.append(hadith.nomorHadith);
        nomorHadith.append(newHadithNomor);

        const newHadithId = document.createElement('newHadithId')
        newHadithId.append(hadith.idHadith);
        idHadith.append(newHadithId);

        const newHadithNama = document.createElement('newHadithNama')
        newHadithNama.append(hadith.namaHadith);
        namaHadith.append(newHadithNama);
    }catch(e){
=======

// show data to page
const showHadith = async () => {
    try {
        const hadith = await fetchHadith();
        isiHadith.innerHTML = `
            <div>
                <h6>${hadith.num}</h3>
                <h5>${hadith.arab}></h5>
                <h5>${hadith.idn}></h5>
            </div>
        `;
    } catch (e) {
>>>>>>> fac508168711866aef501267d489d42b1dfe2d5c
        return e;
    }
}


// fetch data from API
const fetchHadith = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/' + hadithId + "/" + page)
<<<<<<< HEAD
        const namaHadith    = `${res.data.data.name}`
        const nomorHadith   = `Hadis Nomor ${res.data.data.contents.number}`
        const arabHadith    = `${res.data.data.contents.arab}`
        const idHadith = `${res.data.data.contents.id}`
        return {arabHadith,nomorHadith,idHadith,namaHadith}
   }catch(e){
       return e
   }
=======
        return {
            "arab": res.data.data.contents.arab,
            "idn": res.data.data.contents.id,
            "num": res.data.data.contents.number
        }

    } catch (e) {
        return e
    }
>>>>>>> fac508168711866aef501267d489d42b1dfe2d5c
}


// next button, increase page by 1
const nextHadith = async () => {
    try {
        page += 1;
        const nextHadithContent = window.history.replaceState(null, null, "?" + hadithId + "|" + page);
        location.reload();
        return nextHadithContent
    } catch (e) {
        return e
    }
}


// back button, decrease page by 1
const backHadith = async () => {
    try {
        page -= 1;
        const backHadithContent = window.history.replaceState(null, null, "?" + hadithId + "|" + page);
        location.reload();
        return backHadithContent
    } catch (e) {
        return e
    }
}



document.addEventListener('DOMContentLoaded', () => {


    // disable back button if current page is 1
    if (page == 1) {
        backBtnHadith.disabled = true
    }

    // show user feedback to page
    isiHadith.innerHTML = `
        <h1>Loading Data...</h1>
    `
    setTimeout(() => {
        showHadith()
    }, 1000);

    nextBtnHadith.addEventListener('click', nextHadith)
    backBtnHadith.addEventListener('click', backHadith)
})