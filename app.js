let bodyHadith = document.querySelector('.body-hadith');
let sortData = document.querySelector('.form-select');

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

const shortHadithAsc = async()=>{
   try{
    let replace=''
    let dataArray =[]
    const data = await fetchHadithsList()
    data.forEach(data =>{
        dataArray.push([data.available,data.name,data.id])
    });
    
    let sortedArrayAsc = dataArray.sort(function(a, b) {
    return  a[0] - b[0];
    });
    
    for(let i=0;i<=8;i++){
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
   }catch(e){
       return e
   }
}

const shortHadithDesc = async()=>{
   try{
    let replace=''
    let dataArray =[]
    const data = await fetchHadithsList()
    data.forEach(data =>{
        dataArray.push([data.available,data.name,data.id])
    });
    
    let sortedArrayDesc = dataArray.sort(function(a, b) {
    return  b[0] - a[0];
    });
    
    for(let i=0;i<=8;i++){
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
   }catch(e){
       return e
   }

}

const shortNamaHadithAsc = async()=>{
    try{
    let replace=''
    let dataArray =[]
    const data = await fetchHadithsList()
    data.forEach(data =>{
        dataArray.push([data.name,data.available,data.id])
    });
    
    let sortedArrayAsc = dataArray.sort(function(a, b) {
    return  a[0] - b[0];
    });
    
    for(let i=0;i<=8;i++){
         replace += `
            <div class="col-2 offset-1 ">
                <a href="hadith.html?${sortedArrayAsc[i][2]}|1">
                    <button id="btnShowHadith">
                        ${sortedArrayAsc[i][0]} Dengan Jumlah hadist ${sortedArrayAsc[i][1]}
                    </button>
                </a>
            </div>`
    }
     bodyHadith.innerHTML = replace
   }catch(e){
       return e
   }
}

const shortNamaHadithDesc = async()=>{
    try{
    let replace=''
    let dataArray =[]
    const data = await fetchHadithsList()
    data.forEach(data =>{
        dataArray.push([data.name,data.available,data.id])
    });
    
    let sortedArrayDesc = dataArray.sort(function(a, b) {
    return  b[0] - a[0];
    });
    
    for(let i=0;i<=8;i++){
         replace += `
            <div class="col-2 offset-1 ">
                <a href="hadith.html?${sortedArrayDesc[i][2]}|1">
                    <button id="btnShowHadith">
                        ${sortedArrayDesc[i][0]} Dengan Jumlah hadist ${sortedArrayDesc[i][1]}
                    </button>
                </a>
            </div>`
    }
     bodyHadith.innerHTML = replace
   }catch(e){
       return e
   }
}



document.addEventListener('DOMContentLoaded', () => {
    bodyHadith.innerHTML = `
        <h1>Loading Data...</h1>
    `
    setTimeout(() => {
        showHadiths()
    }, 1000);

  sortData.addEventListener('change', (event) => {
      if(event.target.value == "sortDataAsc"){
        shortHadithAsc()
      }else if(event.target.value == "sortDataDesc"){
        shortHadithDesc()
      }else if(event.target.value == "sortNamaAsc"){
        shortNamaHadithAsc()
      }else if(event.target.value == "sortNamaDesc"){
        shortNamaHadithDesc()
      }
});
})

 
 