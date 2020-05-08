import React,{useState,useEffect} from 'react'
import {NativeSelect,FormControl} from '@material-ui/core'
import {fetchCountries} from '../../api'
import styles from './CountryPicker.module.css'

export default function CountryPicker({handleCountryChange}) {
    const [fetchedcountries, setfetchedcountries] = useState([]);
    useEffect(
        ()=>{
            const fetchapi = async()=>{
                setfetchedcountries(await fetchCountries()) 
            }
            fetchapi()
        },[setfetchedcountries]
        
    )
    return (
        <>
        <FormControl className={styles.FormControl}>
            <NativeSelect onChange={(e)=>handleCountryChange(e.target.value)}>
                <option value="" defaultValue>Global</option>
                {fetchedcountries.map((country,i)=> <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
            
        </>
    )
}
