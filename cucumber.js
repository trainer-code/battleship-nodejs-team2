module.exports = {
  default: {
    parallel: 2,
    format: ["html:cucumber-report.html"],
    paths: ["src/GameController_ATDD/**/*.feature"],
    require: ['build/GameController_ATDD/support/*.js'] 
  },
};

