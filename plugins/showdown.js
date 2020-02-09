import Vue from 'vue'
import showdown from 'showdown'

const converter = new showdown.Converter({
  noHeaderId: true
})

Vue.prototype.$mdToHtml = (md) => converter.makeHtml(md)
