import { Heading, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { ImageFlex } from '../components/ImageFlex'
import { getSchedules, getSeasonNow } from '../utils/fetch'
import { todayString } from '../utils/todayString'

export const Index = () => {
  const [seasonNow, setSeasonNow] = React.useState([])
  const [newEpisode, setNewEpisode] = React.useState([])

  useEffect(() => {
    getSeasonNow(setSeasonNow, true, 5)
    getSchedules(setNewEpisode, true, todayString())
  }, [])

  return (
    <div>
        <ImageFlex datas={seasonNow} title="This Season" />
        <ImageFlex datas={newEpisode} title="Today Episode" />
    </div>
  )
}
