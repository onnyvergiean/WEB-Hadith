let param = location.search.substring(1);
let splitter = param.split("|");
let hadithId = splitter[0];
let page = parseInt(splitter[1]);

let nomorHadithInput = document.querySelector('#nomor-hadith')
const isiHadith = document.querySelector('#isiHadith');
const nextBtnHadith = document.querySelector('#nextHadith');
const backBtnHadith = document.querySelector('#backHadith');


// show data to page
const showHadith = async (data) => {
    try {
        isiHadith.innerHTML = (data.found) ?  `
            <div>
                <h2>${data.name}</h2>
                <h3>Hadis Nomor ${data.num}</h3>
                <h5>${data.arab}</h5>
                <h5>${data.idn}</h5>
            </div>
        ` : `<h1>Hadith ${data.name} nomor ${data.page} tidak ditemukan</h1>` 
    } catch (e) {
        return e;
    }
}


// fetch data from API
const fetchHadith = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/' + hadithId + "/" + page)
        console.log(res)

        if(res.data.data.contents) {
            return {
                "found": 1,
                "arab": res.data.data.contents.arab,
                "idn": res.data.data.contents.id,
                "num": res.data.data.contents.number,
                "name": res.data.data.name
            }
        }

        return {
            "found": 0,
            "name": res.data.data.name,
            page
        }
        

    } catch (e) {
        return e
    }
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

// get hadith by number
const getSpecificHadith = async (num) => {
    try {
        const data = window.history.replaceState(null, null, "?" + hadithId + "|" + num);
        location.reload();
        return data

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



document.addEventListener('DOMContentLoaded', async () => {


    // disable back button if current page is 1
    if (page == 1) {
        backBtnHadith.disabled = true
    }

    // show user feedback to page
    isiHadith.innerHTML = `
        <h1>Loading Data...</h1>
    `
    setTimeout(async () => {
        const data = await fetchHadith()
        showHadith(data)
    }, 1000);

    nomorHadithInput.addEventListener('change', async () => {
        const nomorHadith = nomorHadithInput.value
        const data = await getSpecificHadith(nomorHadith)

        showHadith(data)
    })

    nextBtnHadith.addEventListener('click', nextHadith)
    backBtnHadith.addEventListener('click', backHadith)
})