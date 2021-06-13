
let bodyHadith = document.querySelector('.body-hadith')

// fetch hadiths list from API
const fetchHadithsList = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/')
        return res.data.data
    } catch (e) {
        return e
    }
}


// show data to page
const showHadiths = async () => {
    try {
        let el = ''
        const data = await fetchHadithsList()
        data.forEach(data => {
            el += `
            <div class="col-2 offset-1 ">
                <a href="hadith.html?${data.id}|1">
                    <button id="btnShowHadith">
                        ${data.name} Dengan Jumlah hadist ${data.available}
                    </button>
                </a>
            </div>`
            
        });

        bodyHadith.innerHTML = el
    } catch (e) {
        return 'Maaf terjadi kesalahan ketika mengambil data. Silahkan refresh halaman kembali'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    bodyHadith.innerHTML = `
        <h1>Loading Data...</h1>
    `
    setTimeout(() => {
        showHadiths()
    }, 1000);
})