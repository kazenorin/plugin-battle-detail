'use strict'

const remote = require('electron').remote
window.POI_VERSION = remote.getGlobal('POI_VERSION')
window.ROOT = remote.getGlobal('ROOT')
window.MODULE_PATH = remote.getGlobal('MODULE_PATH')
window.APPDATA_PATH = remote.getGlobal('APPDATA_PATH')
require('module').globalPaths.push(window.MODULE_PATH)
require('module').globalPaths.push(window.ROOT)
require('module').globalPaths.push(__dirname)  // Import module from root.


// DEBUG
;(() => {
  // var w = remote.getCurrentWindow()
  // w.show()
  // w.openDevTools({detach: true})
})()


// Init environment
// require('babel-register')
// require('coffee-react/register')
require(`${window.ROOT}/views/env`)


// i18n
const path = require('path-extra')
const i18n = require('i18n-2')
window.i18n = {}

window.i18n.main = new i18n({
  locales: ['en-US', 'ja-JP', 'zh-CN', 'zh-TW'],
  defaultLocale: 'zh-CN',
  directory: path.join(__dirname, 'assets', 'i18n'),
  extension: '.json',
  updateFiles: false,
  devMode: false,
})
window.i18n.main.setLocale(window.language)
window.__ = window.i18n.main.__.bind(window.i18n.main)

window.i18n.resources = {
  __: str => str,
  translate: (_locale, str) => str,
  setLocale: _str => {},
}
try {
  require('poi-plugin-translator').pluginDidLoad()
} catch (error) {
  // Do nothing
}
window.__r = window.i18n.resources.__.bind(window.i18n.resources)

const { $, __ } = window
// Render
document.title = __('Battle Records')
$('#font-awesome').setAttribute('href', require.resolve('font-awesome/css/font-awesome.css'))

const React = require('react')
const ReactDOM = require('react-dom')
const MainArea = require('./views')
ReactDOM.render(React.createElement(MainArea, null), $('main'))
