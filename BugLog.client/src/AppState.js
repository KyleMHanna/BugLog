import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  bugs: [],
  notes: [],
  note: null,
  trackedbugs: [],
  tracked: false,
  accountBugs: [],
  bug: [],
  sort: { order: 'all' },
  currentBug: {}
})
