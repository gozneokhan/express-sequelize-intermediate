/**
 * Sequelize 라이브러리는 ES 모듈로 변경할 경우 예기치 않은 부작용이 발생할 수 있습니다.
 * 따라서 init(npx sequelize init) 명령을 통해 생성되는 파일은 대개 CommonJS 스타일로 작성됩니다.
 * (config, migrations, models, seeders 등등)
 * 이러한 변경으로 인해 예기치 못한 사이드 이펙트가 발생할 수 있으므로, ES 모듈 사용 시에는 주의가 필요합니다.
 **/
require('dotenv').config();

const development = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
};

module.exports = { development };
