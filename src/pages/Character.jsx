import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Character = () => {
    const [datas, setDatas] = React.useState([]);
    const { id } = useParams()

    useEffect(() => {
      const getByIdFull = async () => {
        await axios.get(
          `https://api.jikan.moe/v4/characters/${id}/full`
        )
          .then((response) => {
            setDatas(response.data.data);
          })
          .catch((error) => {
            console.log(error)
          })
      };
    
        getByIdFull()
    }, [id])

  return (
    <div>{id} {datas.name}</div>
  )
}
