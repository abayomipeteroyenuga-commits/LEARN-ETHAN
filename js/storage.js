(function (g) {
  const KEY = "ethan-learn-v1";
  const defaultState = () => ({
    version: 1,
    profile: {
      name: "Local learner",
      role: "learner",
      learnerType: "Lifelong Learner",
      interests: [],
      level: "Beginner",
      goal: "Personal development",
      local: true
    },
    onboarded: false,
    lowData: false,
    enrolled: {},
    completedLessons: {},
    quizAttempts: {},
    bookmarks: [],
    notes: {},
    flashcards: [],
    xp: 0,
    badges: [],
    streak: { last: null, count: 0 },
    weeklyGoalHours: 5,
    weeklyMinutes: {},
    recent: [],
    teacherCourses: []
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch (e) {
      console.warn("storage reset", e);
      return defaultState();
    }
  }

  let state = load();

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      g.ETHAN && g.ETHAN.toast && g.ETHAN.toast("Storage is full or blocked. Progress may not persist.");
    }
  }

  g.StorageService = {
    get: () => state,
    set(patch) {
      state = Object.assign(state, patch);
      save();
      return state;
    },
    update(fn) {
      fn(state);
      save();
      return state;
    },
    reset() {
      state = defaultState();
      save();
    }
  };
})(window);
