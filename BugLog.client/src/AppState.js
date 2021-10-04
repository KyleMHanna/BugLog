import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  bugs: [],
  notes: [],
  note: null,
  trackedbugs: [],
  bug: [],
  sort: { order: 'all' },
  currentBug: {}
})
