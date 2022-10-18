import React from 'react'
import { Ranking } from '../components/Ranking'
import { useEffect } from 'react'
import { getTop } from '../utils/fetch'

export const AnimeRanking = () => {
    const [datas, setDatas] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(false)

    useEffect(() => {
        getTop("anime", setDatas, true, setIsLoaded, 100)
        console.log("ok")
    }, [])
    
  return (
    <>
        <Ranking datas={datas} isLoaded={isLoaded} />
    </>
  )
}
