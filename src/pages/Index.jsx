import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { ImageFlex } from '../components/ImageFlex'
import { getSchedules, getSeasonNow } from '../utils/fetch'
import { todayString } from '../utils/todayString'

export const Index = () => {
  const [seasonNow, setSeasonNow] = React.useState([])
  const [newEpisode, setNewEpisode] = React.useState([])

  useEffect(() => {
    getSeasonNow(setSeasonNow, false, 5)
    getSchedules(setNewEpisode, false, todayString())
  }, [])

  return (
    <Box pt={10}>
        <ImageFlex datas={seasonNow} title="This Season" />
        <ImageFlex datas={newEpisode} title="Today Episode" />
    </Box>
  )
}
