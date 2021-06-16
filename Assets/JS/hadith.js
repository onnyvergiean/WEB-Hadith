let param = location.search.substring(1);
let splitter = param.split("|");
let hadithId = splitter[0];
let page = parseInt(splitter[1]);

let nomorHadithInput = document.querySelector('#nomor-hadith')
const detailHadith = document.querySelector('.detail-hadith');
const nextBtnHadith = document.querySelector('#nextHadith');
const backBtnHadith = document.querySelector('#backHadith');
const namaHadith = document.querySelector('#nama-hadith')
const nomorHadith = document.querySelector('#no-hadith')




// show data to page
const showHadith = (data) => {
    try {

        namaHadith.innerHTML = data.name
        nomorHadith.innerHTML = `
            <h5>Nomor Hadith</h5>
            <h3>${data.num}</h3>
        `

        detailHadith.innerHTML = (data.found) ?
        `
            <div>
                <p id="arabic-hadith">
                    ${data.arab}
                </p>
                <hr />
                <p id="idn-hadith">'
                    ${data.idn}
                </p>
            </div>
        ` : `<h1>Hadith ${data.name} nomor ${data.num} tidak ditemukan</h1>` 
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
            "num" : page
        }
        

    } catch (e) {
        return e
    }
}


// next button, increase page by 1
const nextHadith = () => {
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
const getSpecificHadith = (num) => {
    try {
        const data = window.history.replaceState(null, null, "?" + hadithId + "|" + num);
        location.reload();
        return data

    } catch (e) {
        return e
    }
}


// back button, decrease page by 1
const backHadith = () => {
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
    if (page <= 1) {
        backBtnHadith.disabled = true
    }

    // show user feedback to page
    detailHadith.innerHTML = `
        <h1>Loading Data...</h1>
    `
    setTimeout(async () => {
        const data = await fetchHadith()
        showHadith(data)
    }, 1000);

    // nomorHadithInput.addEventListener('change', async () => {
    //     const nomorHadith = nomorHadithInput.value
    //     const data = await getSpecificHadith(nomorHadith)

    //     showHadith(data)
    // })

    nextBtnHadith.addEventListener('click', nextHadith)
    backBtnHadith.addEventListener('click', backHadith)
})

window.addEventListener('load', async () => {
    let darkModeState = localStorage.getItem('dark-mode')

    if (darkModeState == 'true') {
        turnOnDarkMode()
        darkModeSwitch.checked = true
    } else {
        turnOffDarkMode()
        darkModeSwitch.checked = false
    }
})

