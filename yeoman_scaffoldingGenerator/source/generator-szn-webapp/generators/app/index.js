'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var mkdirp = require('mkdirp');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'SZN - ' + chalk.red('generator-szn-webapp') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'SZN - Just skip me ?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    new Promise(resolve => {
      mkdirp.sync('./source/serverSide/');
      mkdirp.sync('./source/clientSide/assets/');
      mkdirp.sync('./setup/container/shellScript/');
      mkdirp.sync('./setup/build/');
      mkdirp.sync('./setup/test/');
      mkdirp.sync('./source/');
      resolve();
    }).then(()=>{

      // create webapp structure
      this.fs.copyTpl(
        this.templatePath('.gitkeep'),
        this.destinationPath('./source/serverSide/.gitkeep'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('.gitkeep'),
        this.destinationPath('./source/clientSide/assets/.gitkeep'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('.gitkeep'),
        this.destinationPath('./setup/container/shellScript/.gitkeep'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('.gitkeep'),
        this.destinationPath('./setup/build/.gitkeep'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('.gitkeep'),
        this.destinationPath('./source/.gitkeep'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('.gitkeep'),
        this.destinationPath('./setup/test/.gitkeep'), {
          name: this.props.name
        }
      );

      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('.gitattributes'),
        this.destinationPath('.gitattributes')
      );

      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );

      this.fs.copy(
        this.templatePath('run.sh'),
        this.destinationPath('./setup/run.sh')
      );

      this.fs.copy(
        this.templatePath('Jenkinsfile'),
        this.destinationPath('./setup/Jenkinsfile')
      );

      this.fs.copy(
        this.templatePath('production.dockerStack.yml'),
        this.destinationPath('./setup/container/production.dockerStack.yml')
      );

      this.fs.copy(
        this.templatePath('deployment.dockerCompose.yml'),
        this.destinationPath('./setup/container/deployment.dockerCompose.yml')
      );

      this.fs.copy(
        this.templatePath('development.dockerCompose.yml'),
        this.destinationPath('./setup/container/development.dockerCompose.yml')
      );

      this.fs.copy(
        this.templatePath('service.dockerfile'),
        this.destinationPath('./setup/container/service.dockerfile')
      );

      Promise.resolve();
    })

  },

  install: function () {
    // npm install 
    // this.installDependencies();
  }
});
