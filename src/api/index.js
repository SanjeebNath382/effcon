import axios from 'axios'
const url="https://covid19.mathdro.id/api";


export const fetchData =async (country)=>{
        let changeableurl= url;

        if(country){
            changeableurl = `${url}/countries/${country}`
        }

        try {
            const {data}= await axios.get(changeableurl);

            const newData={
                confirmed:data.confirmed,
                recovered:data.recovered,
                deaths:data.deaths,
                lastUpdate: data.lastUpdate

            }
            return newData
        } catch (error) {
            return error
        }
}

export const fetchDailyData = async ()=>{
    try {
        const {data} = await axios.get(`${url}/daily`)
        const modifiedData= data.map((dailydata)=>({
            confirmed: dailydata.confirmed.total,
            deaths: dailydata.deaths.total,
            date: dailydata.reportDate,
        }))
        return modifiedData;

    } catch (error) {
        
    }
}
export const fetchCountries = async()=>{
    try {
        const {data:{countries}} = await axios.get(`${url}/countries`)
        
        return countries.map((country)=> country.name);
    } catch (error) {
        return error
    }
}
