(function (g) {
  g.AuthService = {
    current() {
      return StorageService.get().profile;
    },
    signInLocal(name, role) {
      StorageService.update((s) => {
        s.profile.name = name || "Local learner";
        s.profile.role = role || "learner";
        s.profile.local = true;
      });
    },
    signOut() {
      StorageService.update((s) => {
        s.profile = {
          name: "Guest",
          role: "learner",
          learnerType: s.profile.learnerType,
          interests: s.profile.interests,
          level: s.profile.level,
          goal: s.profile.goal,
          local: true
        };
      });
    },
    isTeacher() {
      return this.current().role === "teacher" || this.current().role === "admin";
    }
  };
})(window);
