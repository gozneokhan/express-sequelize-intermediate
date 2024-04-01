'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize'); // (1) Sequelize 라이브러리를 불러옵니다.
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.cjs')[env]; // json에서 cjs로 변경 (2) config에서 읽어와서 설정 파일을 불러와 환경에 맞는 설정을 가져옵니다.
const db = {};

let sequelize; // (3) Sequelize 인스턴스를 담을 변수를 선언 - 변수에 db에 접속할 수 있는 정보가 담겨 있습니다.
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // 환경 변수를 사용하는 경우
} else {
  sequelize = new Sequelize( // (4) sequelize라는 객체를 db, username, password를 이용해 새로운 객체를 생성합니다.  // 환경 변수를 사용하지 않는 경우
    config.database,
    config.username,
    config.password,
    config,
  );
}
// (5) 현재 디렉토리의 파일들을 읽어옵니다.
fs.readdirSync(__dirname) // directory name은 현재 위치에 directory 주소 => 현재 파일이 있는 주소는 models => models의 파일이 생성되어서 모두 읽어와서
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && // 숨겨진 파일은 제외합니다.
      file !== basename && // 현재 파일은 제외합니다.
      file.slice(-4) === '.cjs' && // cjs로 변경 (뒤에 .cjs인 경우에만 사용한다.) // JavaScript 파일만 필터링합니다.
      file.indexOf('.test.js') === -1 // 테스트 파일은 제외합니다.
    );
  })
  .forEach((file) => {
    // (6) model을 사용할 수 있도록 model을 초기화하여 db 객체에 추가합니다.
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model; // (7) db라는 객체에 해당 이름의 해당하는 property로 해당하는 model을 넘겨주게 됩니다.
  });

Object.keys(db).forEach((modelName) => {
  //(8) 추가적으로 model과 model의 관계 설정을 자동을 해줍니다.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// (9) 설정했던 값들을 모두 db에 저장을 한 다음에(Sequelize 인스턴스와 모델들을 db 객체에 추가)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; // (10) db라는 객체를 export해서 어디서나 db 객체를 (model, db 접근 정보 등등) 가져다 사용할 수 있도록 모듈로 내보냅니다.

// 수정이 완료되면 제대로 접근이 가능한지 확인을 위해 .env 환경 변수 작성
