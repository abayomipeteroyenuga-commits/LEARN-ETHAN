(function (g) {
  function today() {
    return new Date().toISOString().slice(0, 10);
  }
  function weekKey() {
    const d = new Date();
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return d.getFullYear() + "-W" + week;
  }

  g.ProgressService = {
    enroll(courseId) {
      StorageService.update((s) => {
        if (!s.enrolled[courseId]) s.enrolled[courseId] = { at: Date.now(), status: "in-progress" };
      });
    },
    markLesson(courseId, lessonId, minutes) {
      StorageService.update((s) => {
        const key = courseId + ":" + lessonId;
        s.completedLessons[key] = { at: Date.now() };
        const wk = weekKey();
        s.weeklyMinutes[wk] = (s.weeklyMinutes[wk] || 0) + (minutes || 10);
        const t = today();
        if (s.streak.last === t) {
          /* same day */
        } else {
          const y = new Date();
          y.setDate(y.getDate() - 1);
          const ymd = y.toISOString().slice(0, 10);
          s.streak.count = s.streak.last === ymd ? s.streak.count + 1 : 1;
          s.streak.last = t;
        }
        s.xp += 10;
        this._badges(s, courseId);
        s.recent.unshift({ type: "lesson", courseId, lessonId, at: Date.now() });
        s.recent = s.recent.slice(0, 20);
      });
    },
    _badges(s, courseId) {
      const add = (id) => { if (!s.badges.includes(id)) s.badges.push(id); };
      if (Object.keys(s.completedLessons).length >= 1) add("first-lesson");
      if (s.streak.count >= 7) add("seven-day");
      if (this.courseComplete(courseId, s)) {
        add("course-completed");
        s.enrolled[courseId] = s.enrolled[courseId] || { at: Date.now() };
        s.enrolled[courseId].status = "completed";
        s.enrolled[courseId].completedAt = Date.now();
      }
    },
    lessonDone(courseId, lessonId) {
      return !!StorageService.get().completedLessons[courseId + ":" + lessonId];
    },
    courseLessons(course) {
      const list = [];
      (course.modules || []).forEach((m) => (m.lessons || []).forEach((l) => list.push(l)));
      return list;
    },
    courseProgress(course) {
      const lessons = this.courseLessons(course);
      if (!lessons.length) return 0;
      const done = lessons.filter((l) => this.lessonDone(course.id, l.id)).length;
      return Math.round((done / lessons.length) * 100);
    },
    courseComplete(courseId, state) {
      const course = (window.ETHAN_COURSES || []).find((c) => c.id === courseId);
      if (!course) return false;
      const s = state || StorageService.get();
      const lessons = this.courseLessons(course);
      const allDone = lessons.every((l) => s.completedLessons[courseId + ":" + l.id]);
      const needQuiz = lessons.filter((l) => l.quiz && l.quiz.length);
      const quizzesOk = needQuiz.every((l) => {
        const att = (s.quizAttempts[courseId + ":" + l.id] || []).slice(-1)[0];
        return att && att.pct >= 60;
      });
      return allDone && quizzesOk;
    },
    recordQuiz(courseId, lessonId, pct) {
      StorageService.update((s) => {
        const k = courseId + ":" + lessonId;
        s.quizAttempts[k] = s.quizAttempts[k] || [];
        s.quizAttempts[k].push({ at: Date.now(), pct });
        s.xp += Math.round(pct / 10);
        if (pct >= 80) {
          if (!s.badges.includes("quiz-master")) s.badges.push("quiz-master");
        }
      });
    },
    bestScore(courseId, lessonId) {
      const arr = StorageService.get().quizAttempts[courseId + ":" + lessonId] || [];
      if (!arr.length) return null;
      return Math.max.apply(null, arr.map((a) => a.pct));
    },
    canCertificate(courseId) {
      return this.courseComplete(courseId);
    }
  };
})(window);
