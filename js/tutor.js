(function (g) {
  function reply(prompt, ctx) {
    const p = (prompt || "").toLowerCase();
    const title = (ctx && ctx.lessonTitle) || "this lesson";
    if (/simpl/i.test(p)) {
      return "Here is a simpler take on " + title + ": focus on one idea at a time. Read the key points box, then try one example with pencil and paper before using software.";
    }
    if (/example/i.test(p)) {
      return "Another example for " + title + ": imagine a small shop or classroom list. Write three rows of sample data and apply the idea to those rows only.";
    }
    if (/quiz me|revision/i.test(p)) {
      return "Revision prompt: explain the main idea of " + title + " in two sentences, then list two mistakes a beginner might make.";
    }
    if (/wrong|mistake/i.test(p)) {
      return "When an answer is wrong, compare it with the explanation under the question. Check units, range references, or whether you answered the question that was asked.";
    }
    if (/beginner/i.test(p)) {
      return "Beginner view: " + title + " is a building block. You do not need to memorize every term today. Practice the worked example until you can repeat the steps without looking.";
    }
    if (/exercise|practice/i.test(p)) {
      return "Practical exercise: spend 15 minutes applying " + title + " to a real note from your week (budget line, paragraph, or data list). Then write what was still unclear.";
    }
    if (/summar/i.test(p)) {
      return "Summary of " + title + ": read the key points, complete the practice prompt, and use the quiz to check recall. Progress is saved on this device in local mode.";
    }
    return "ETHAN Tutor (local practice engine): I can simplify, give examples, quiz you, or summarize. Connect an AI provider later via services/ai.js. Your question was: “" + (prompt || "").slice(0, 180) + "”.";
  }

  g.TutorService = {
    ask(prompt, ctx) {
      return Promise.resolve({ source: "local-mock", text: reply(prompt, ctx) });
    }
  };
  g.AIService = g.TutorService;
})(window);
