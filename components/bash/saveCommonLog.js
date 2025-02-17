const { applyBashCommand, isExists, createFolder } = require('../../helpers/files');
const { removeFile, joinFiles } = require('./bashCommands');
const ERROR = require('../errors/constants');

async function saveCommonLog(folders, task, config, repository) {
  const files = folders.map((folder) => `${folder}/log.txt`);
  const folder = task.folder
    ? `./${config.output.folder}/${task.folder}`
    : `./${config.output.folder}`;
  const file = `${folder}/${task.code}.txt`;

  if (!isExists(folder)) {
    const commandForCreateFolder = createFolder(folder);
    if (commandForCreateFolder) return ERROR.CREATE_FOLDER;
  }

  if (isExists(file)) {
    const commandForRemoveFile = removeFile(file);
    const cantRemoveFile = await applyBashCommand(commandForRemoveFile);
    if (cantRemoveFile) return ERROR.REMOVE_FILE;
  }

  const commandForJoinFiles = joinFiles(files, file);
  const cantJoinFiles = await applyBashCommand(commandForJoinFiles);
  if (cantJoinFiles) return ERROR.CREATE_FILE;

  return false;
}

module.exports = saveCommonLog;

