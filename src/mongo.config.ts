export function getMongooseUri() {
  return 'mongodb://localhost:27017/nest_test_project_db';
}

export function getMongooseOption() {
  return {
    useNewUrlParser: true, // использовать новый парсер
    bufferCommands: false, // отключить буфиризацию
    useFindAndModify: false, // не использовать старый метод useFindAndModify, новые (findOneAndUpdate, ..Replace, ..Delete))
    useUnifiedTopology: true, // новый механизм коннекта, если будет отваливатся изменить
    poolSize: 10, // максимальное количество сокетов, п.у. 5
  };
}
