import { h } from 'hyperapp'
import picostyle from 'picostyle'

const ps = picostyle(h)

export const view = state => {
  const keyColor = '#f07'

  const Text = ps('span')({
    fontSize: '64px',
    cursor: 'pointer',
    color: '#fff',
    padding: '0.4em',
    transition: 'all .2s ease-in-out',
    textDecoration: 'none',
    ':hover': {
      transform: 'scale(1.3)'
    },
    '@media (max-width: 450px)': {
      fontSize: '32px'
    }
  })

  const Wrapper = ps('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: keyColor
  })

  return (
    <Wrapper>
      <Text>{state.text}</Text>
    </Wrapper>
  )
}
