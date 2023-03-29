"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the awesome ${chalk.red(
          "generator-change-name"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "someAuthor",
        message: "Введите имя автора пакетов",
        default: null
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  async writing() {}

  install() {
    // This.installDependencies();
  }
};
