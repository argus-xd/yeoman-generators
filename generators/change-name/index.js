"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const fs = require("fs");
const glob = require("glob");

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

  async getPackageJsonFiles() {
    return new Promise((resolve, reject) => {
      glob("packages/**/package.json", (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  }

  async writing() {
    if (this.props.someAuthor) {
      await this.changeAuthor();
    }
  }

  async changeAuthor() {
    const files = ["package.json"];
    const allFiles = await this.getPackageJsonFiles();

    files.push(...allFiles);
    for (const file of files) {
      const filePath = this.destinationPath(file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      if (fileContent) {
        const fileJson = JSON.parse(fileContent);

        if (fileJson.author) {
          fileJson.author = this.props.someAuthor;
          fs.writeFileSync(
            filePath,
            JSON.stringify(fileJson, null, 2),
            "utf-8"
          );
        }
      }
    }
  }
};
