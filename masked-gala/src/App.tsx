import { useState } from 'react'
import Intro from './components/Intro'
import Hero from './sections/Hero'
import Countdown from './sections/Countdown'
import Event from './sections/Event'
import DressCode from './sections/DressCode'
import Venue from './sections/Venue'
import Rsvp from './sections/Rsvp'
import Finale from './sections/Finale'

export default function App() {
  const [opened, setOpened] = useState(false) // cortinas começaram a abrir
  const [done, setDone] = useState(false)     // abertura terminou e foi removida
  return (
    <main>
      <Hero active={opened} />
      <Countdown />
      <Event />
      <DressCode />
      <Venue />
      <Rsvp />
      <Finale />
      {!done && <Intro onOpen={() => setOpened(true)} onDone={() => setDone(true)} />}
    </main>
  )
}
