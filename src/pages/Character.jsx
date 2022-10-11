import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getByIdFull } from '../utils/fetch'

export const Character = () => {
    const [datas, setDatas] = React.useState([]);
    const { id } = useParams()

    useEffect(() => {
        getByIdFull(id, 'characters', setDatas)
    }, [id])

  return (
    <div>{id} {datas.name}</div>
  )
}
