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
            el +=
            
    `<div class="col-3 my-3">
        <div class="card-hadith">
          <div>
            <i class="fas fa-quran"></i>
             <a href="hadith.html?${data.id}|1">
                    <h4 id="btnShowHadith">
                        ${data.name} 
                    </h4>
                    <p>
                    Dengan Jumlah hadist ${data.available}
                    </p>
                </a>
          </div>
        </div>
      </div>`
        });

        bodyHadith.innerHTML = el
    } catch (e) {
        return 'Maaf terjadi kesalahan ketika mengambil data. Silahkan refresh halaman kembali'
    }
}

//function sort Hadith Number Ascending
const sortHadithAsc = async()=>{
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

//function sort Hadith Number Descending
const sortHadithDesc = async()=>{
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

//function sort Hadith Name Ascending
const sortNamaHadithAsc = async()=>{
    try{
    let replace=''
    let dataArray =[]
    const data = await fetchHadithsList()
    data.forEach(data =>{
        dataArray.push([data.name,data.available,data.id])
    });

    
    dataArray.sort(function(a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
    });

    for(let i=0;i<=8;i++){
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
   }catch(e){
       return e
   }
}

//function sort Hadith Nae Descending
const sortNamaHadithDesc = async()=>{
    try{
    let replace=''
    let dataArray =[]
    const data = await fetchHadithsList()
    data.forEach(data =>{
        dataArray.push([data.name,data.available,data.id])
    });

    dataArray.sort(function(a, b) {
    return b === a ? 0 : b < a ? -1 : 1;
    });

    for(let i=0;i<=8;i++){
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
   }catch(e){
       return e
   }
}



document.addEventListener('DOMContentLoaded', () => {
    // bodyHadith.innerHTML = `
    //     <h1>Loading Data...</h1>
    // `
    setTimeout(() => {
        showHadiths()
    }, 1000);

//   sortData.addEventListener('change', (event) => {
//       if(event.target.value == "sortDataAsc"){
//         sortHadithAsc()
//       }else if(event.target.value == "sortDataDesc"){
//         sortHadithDesc()
//       }else if(event.target.value == "sortNamaAsc"){
//         sortNamaHadithAsc()
//       }else if(event.target.value == "sortNamaDesc"){
//         sortNamaHadithDesc()
//       }
// });
})

 
 