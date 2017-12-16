import _ from 'lodash'
import { createSelector } from 'reselect'

import {
  extensionSelectorFactory,
} from 'views/utils/selectors'

import { initState } from './store'

const extSelector = createSelector(
  extensionSelectorFactory('poi-plugin-battle-detail'),
  ext => _.isEmpty(ext) ? initState : ext)

const uiSelector = createSelector(
  extSelector,
  ext => ext.ui
)

const indexesSelector = createSelector(
  extSelector,
  ext => ext.indexes
)

const modalSelector = createSelector(
  uiSelector,
  ui => ui.modal
)

const sortieViewerSelector = createSelector(
  uiSelector,
  ui => ui.sortieViewer
)

const browseModeSelector = createSelector(
  uiSelector,
  ui => ui.browseMode
)

export {
  extSelector,
  uiSelector,
  modalSelector,
  indexesSelector,
  sortieViewerSelector,
  browseModeSelector,
}