/* Abstraction for a future remote AI provider.
   Never place API secrets in this file. */
(function (g) {
  g.AIProvider = {
    mode: "local",
    async complete(messages, context) {
      const last = messages && messages.length ? messages[messages.length - 1].content : "";
      return TutorService.ask(last, context);
    }
  };
})(window);
