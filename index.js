// подключение зависимостей
const 
  fs  = require('fs'),
  peg = require('pegjs'),
  GrammarCollector = require('./utils/grammar_collector/GrammarCollector');

// чтение input'a и исполнение
const 
  input            = process.argv[2],
  data             = fs.readFileSync(input, 'utf-8'),
  grammarCollector = new GrammarCollector(fs, './grammar/', 'config.json'),
  rules            = grammarCollector.collect(),
  parser           = peg.generate(rules),
  ast              = JSON.stringify(parser.parse(data));

// вывод результата
console.log(ast);

