'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var writing=require(require.resolve('./script/mkarma_writting'));

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('generator-mkarma') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'needCli',
      message: '你需要装karma-cli吗?,这是karma的全局命令行工具.',
      default: true
    },{

    type: 'rawlist',
    name: 'bowers',
    message: '请选择您惯用的浏览器?',
    choices: [
    {
      value: 'chrome',
      name: '谷歌',
      checked: true
    }, {
      value: 'firefox',
      name: '火狐',
      checked: false
    }, {
      value: 'phantomjs',
      name: 'phantomjs',
      checked: false
    }]
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // this.log(this.props.bowers);
    // this.log(this.props.needCli);
    writing(this);
  },

  install: function () {
    // this.installDependencies();
  }
});
