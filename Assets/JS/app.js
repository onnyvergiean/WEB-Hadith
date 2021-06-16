let bodyHadith = document.querySelector('.body-hadith');
let sortData = document.querySelector('.form-select');
let darkModeSwitch = document.querySelector('#dark-mode-switch')
let filterHadith = document.querySelector('#filter-hadith')

// fetch hadiths list from API
const fetchHadithList = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/')
        return res.data.data
    } catch (e) {
        return e
    }
}

// show data to page
const showHadithList = async () => {
    try {
        let el = ''
        const data = await fetchHadithList()
        data.forEach(data => {
            el += `
            <div class="col-12 col-md-3 my-2">
                <a href="hadith.html?${data.id}|1">
                    <div class="card-hadith">
                        <div>
                            <span class="material-icons-outlined">
                                auto_stories
                            </span>
                            <h4 id="btnShowHadith">
                                ${data.name} 
                            </h4>
                            <p>
                                Dengan Jumlah ${data.available} Data
                            </p>
                        </div>
                    </div>
                </a>
            </div>`
        });

        bodyHadith.innerHTML = el
    } catch (e) {
        return 'Maaf terjadi kesalahan ketika mengambil data. Silahkan refresh halaman kembali'
    }
}

//function sort Hadith Number Ascending
const sortHadithAsc = async () => {
    try {
        let replace = ''
        let dataArray = []
        const data = await fetchHadithList()
        data.forEach(data => {
            dataArray.push([data.available, data.name, data.id])
        });

        let sortedArrayAsc = dataArray.sort(function (a, b) {
            return a[0] - b[0];
        });

        for (let i = 0; i <= 8; i++) {
            replace += `
            <div class="col-2 offset-1 ">
                <a href="hadith.html?${sortedArrayAsc[i][2]}|1">
                    <button id="btnShowHadith">
                        ${sortedArrayAsc[i][1]} Dengan Jumlah hadist ${sortedArrayAsc[i][0]}
                    </button>
                </a>
            </div>`
        }
        bodyHadith.innerHTML = replace
    } catch (e) {
        return e
    }
}

//function sort Hadith Number Descending
const sortHadithDesc = async () => {
    try {
        let replace = ''
        let dataArray = []
        const data = await fetchHadithList()
        data.forEach(data => {
            dataArray.push([data.available, data.name, data.id])
        });

        let sortedArrayDesc = dataArray.sort(function (a, b) {
            return b[0] - a[0];
        });

        for (let i = 0; i <= 8; i++) {
            replace += `
            <div class="col-2 offset-1 ">
                <a href="hadith.html?${sortedArrayDesc[i][2]}|1">
                    <button id="btnShowHadith">
                        ${sortedArrayDesc[i][1]} Dengan Jumlah hadist ${sortedArrayDesc[i][0]}
                    </button>
                </a>
            </div>`
        }
        bodyHadith.innerHTML = replace
    } catch (e) {
        return e
    }

}

//function sort Hadith Name Ascending
const sortNamaHadithAsc = async () => {
    try {
        let replace = ''
        let dataArray = []
        const data = await fetchHadithList()
        data.forEach(data => {
            dataArray.push([data.name, data.available, data.id])
        });


        dataArray.sort(function (a, b) {
            return a === b ? 0 : a < b ? -1 : 1;
        });

        for (let i = 0; i <= 8; i++) {
            replace += `
            <div class="col-2 offset-1 ">
                <a href="hadith.html?${dataArray[i][2]}|1">
                    <button id="btnShowHadith">
                        ${dataArray[i][0]} Dengan Jumlah hadist ${dataArray[i][1]}
                    </button>
                </a>
            </div>`
        }
        bodyHadith.innerHTML = replace
    } catch (e) {
        return e
    }
}

//function sort Hadith Nae Descending
const sortNamaHadithDesc = async () => {
    try {
        let replace = ''
        let dataArray = []
        const data = await fetchHadithList()
        data.forEach(data => {
            dataArray.push([data.name, data.available, data.id])
        });

        dataArray.sort(function (a, b) {
            return b === a ? 0 : b < a ? -1 : 1;
        });

        for (let i = 0; i <= 8; i++) {
            replace += `
            <div class="col-2 offset-1 ">
                <a href="hadith.html?${dataArray[i][2]}|1">
                    <button id="btnShowHadith">
                        ${dataArray[i][0]} Dengan Jumlah hadist ${dataArray[i][1]}
                    </button>
                </a>
            </div>`
        }
        bodyHadith.innerHTML = replace
    } catch (e) {
        return e
    }
}



document.addEventListener('DOMContentLoaded', () => {

    filterHadith.addEventListener('change', (event) => {
          if(event.target.value == 0){
            sortHadithAsc()
          }else if(event.target.value == 1){
            sortHadithDesc()
          }else if(event.target.value == 2){
            sortNamaHadithAsc()
          }else if(event.target.value == 3){
            sortNamaHadithDesc()
          }
    });

    const preloader = `
        <div class="preloader-data text-center">
            <div class="lottie-anim"></div>
            <H3>Memuat Data</H3>
        </div>
    `
    bodyHadith.innerHTML = preloader

    //showPreloader('loading-data.json')

    setTimeout(() => {
        fetchHadithList()
            .then(async res => {
                showHadithList(res)
            })
            .catch(e => console.log(e))
    }, 1000);

    darkModeSwitch.addEventListener('click', () => {
        if (darkModeSwitch.checked) {
            turnOnDarkMode()
            localStorage.setItem('dark-mode', true)
        } else {
            turnOffDarkMode()
            localStorage.setItem('dark-mode', false)
        }
    })

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


