import { app } from 'hyperapp'
import { view } from '../../components/view'
const state = {
  text: 'Picostyle'
}
const actions = {}
app(state, actions, view, document.body)
