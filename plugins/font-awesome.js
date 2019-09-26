import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSort, faSortUp, faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
