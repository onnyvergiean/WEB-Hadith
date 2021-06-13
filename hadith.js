let param = location.search.substring(1);
let splitter = param.split("|");
let hadithId = splitter[0];
let page = parseInt(splitter[1]);

const isiHadith = document.querySelector('#isiHadith');
const nextBtnHadith = document.querySelector('#nextHadith');
const backBtnHadith = document.querySelector('#backHadith');


// show data to page
const showHadith = async () => {
    try {
        const hadith = await fetchHadith();
        isiHadith.innerHTML = `
            <div>
                <h2>${hadith.name}</h2>
                <h3>Hadis Nomor ${hadith.num}</h3>
                <h5>${hadith.arab}</h5>
                <h5>${hadith.idn}</h5>
            </div>
        `;
    } catch (e) {
        return e;
    }
}


// fetch data from API
const fetchHadith = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/' + hadithId + "/" + page)
        return {
            "arab": res.data.data.contents.arab,
            "idn": res.data.data.contents.id,
            "num": res.data.data.contents.number,
            "name": res.data.data.name
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