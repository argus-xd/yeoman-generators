"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-excellent ${chalk.red(
          "generator-nest-pgmodule"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to add PG-module to the project",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const pkgJson = {
      dependencies: {
        "@nestjs/typeorm": "8.1.4"
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(
      this.destinationPath("packages/app/package.json"),
      pkgJson
    );

    this.fs.copyTpl(
      this.templatePath("entities"),
      this.destinationPath("packages/entities")
    );

    this.fs.copyTpl(
      this.templatePath("pg"),
      this.destinationPath("packages/app/src/infrastructure/pg")
    );
  }

  async install() {
    await this.yarnInstall();

    await this.spawnCommand(
      `yarn`,
      `workspace ᐸAppᐳ add ᐸEntitiesᐳ`.split(" ")
    );
  }
};
