(function (g) {
  function hay(c) {
    const parts = [c.title, c.description, c.subject, c.level, (c.objectives || []).join(" ")];
    (c.modules || []).forEach((m) => {
      parts.push(m.title);
      (m.lessons || []).forEach((l) => {
        parts.push(l.title);
        parts.push((l.body || "").replace(/<[^>]+>/g, " "));
      });
    });
    return parts.join(" ").toLowerCase();
  }
  const cache = {};
  function indexed(c) {
    if (!cache[c.id]) cache[c.id] = hay(c);
    return cache[c.id];
  }

  g.SearchService = {
    query(q) {
      const term = (q || "").trim().toLowerCase();
      if (!term) return { courses: window.ETHAN_COURSES.slice(), lessons: [], paths: window.ETHAN_PATHS.slice(), subjects: window.ETHAN_SUBJECTS.slice() };
      const words = term.split(/\s+/);
      const courses = window.ETHAN_COURSES.filter((c) => {
        const h = indexed(c);
        return words.every((w) => h.includes(w));
      });
      const lessons = [];
      window.ETHAN_COURSES.forEach((c) => {
        (c.modules || []).forEach((m) => (m.lessons || []).forEach((l) => {
          const t = (l.title + " " + (l.body || "").replace(/<[^>]+>/g, " ")).toLowerCase();
          if (words.every((w) => t.includes(w))) lessons.push({ course: c, lesson: l, module: m });
        }));
      });
      const paths = window.ETHAN_PATHS.filter((p) => (p.title + p.description + (p.skills || []).join(" ")).toLowerCase().includes(term));
      const subjects = window.ETHAN_SUBJECTS.filter((s) => (s.name + " " + (s.topics || []).join(" ")).toLowerCase().includes(term));
      return { courses, lessons, paths, subjects };
    }
  };
})(window);
