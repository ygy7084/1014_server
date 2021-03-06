/* global process */
import fs from 'fs';
import path from 'path';

// 환경설정 파일을 읽는다
const fileLocation = path.join('./', 'config.json');
const config = JSON.parse(fs.readFileSync(fileLocation, 'utf8'));

// 환경설정 구조
const configKey = [
  'MONGO_URL',
  'PORT',
];

// 환경설정 입력할 객체
const configuration = {
  MONGO_URL: '',
  PORT: '',
  SECRET: '',
};

// 위의 객체에 환경설정 입력
(function initConfig() {
  for (let i = 0; i < configKey.length; i += 1) {
    if (config[configKey[i]]) { configuration[configKey[i]] = config[configKey[i]]; }
  }
  configuration.PORT = process.env.PORT || 8080;
  configuration.SECRET = 'afdsdfs';
}());

export default configuration;
