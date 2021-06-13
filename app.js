
const fetchHadiths = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/')
        return res.data.data
    } catch (error) {
        return error
    }
}

const showHadiths = async () => {
    try {
        let el = ''
        const data = await fetchHadiths()
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

        document.querySelector('.body-hadith').innerHTML = el
    } catch (error) {
        
    }
}

showHadiths()