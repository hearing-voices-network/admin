import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSort,
  faSortUp,
  faSortDown,
  faEdit,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSort, faSortUp, faSortDown, faEdit, faArrowUp, faArrowDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
