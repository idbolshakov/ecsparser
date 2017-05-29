// описание правил блока кода
code_block
  = S comment: comment_block? S start_row: code_block__start_row S body_row: code_block__body_row* S code_block__end_row
    { return {
        comment: comment,
        name: start_row.name,
        type: start_row.type,
        data: body_row
      }; 
    }

// начальная строка блока кода
code_block__start_row 
  = entity: code_block__entity_type S name: code_block__allowed_name S '{' 
    { return { 
        type: entity,
        name: name
      } 
    }

// возможные названия сущности 
code_block__entity_type = 'class' / 'object' / 'interface' / 'package' / 'block' / 'table' / 'db'

// допустимое имя для сущности, метода или свойства
code_block__allowed_name 
  = name: ( ([a-z]i / '_')+ ([a-z]i / '_' / [0-9])* ) { return name[0].join('') + name[1].join(''); }

// строка тела сущности (свойство или метод)
code_block__body_row 
  = S comment: comment_block? S property: code_block__property S ';'
    { return {
        comment: comment,
        type: 'property',
        scope: property.modificators.scope,
        is_static: property.modificators.is_static,
        property_type: property.variable.type,
        name: property.variable.name
      };
    }
  / S comment: comment_block? S method: code_block__method S ';'
    { return {
        comment: comment,
        type: 'method',
        name: method.name,
        scope: method.modificators.scope,
        is_static: method.modificators.is_static,
        return_type: method.return_type,
        arguments: method.arguments
      };
    }

// свойство сущности
code_block__property 
  = modificators: code_block__modificators S variable: code_block__var
    { return {
        modificators: modificators,
        variable: variable 
      };
    }

// модификаторы метода или свойства сущности
code_block__modificators 
  = S scope: ('public' / 'private' / 'protected') S is_static: ('static' S)?
    { return {
        scope: scope,
        is_static: !!is_static
      };
    }

// объявление переменной
code_block__var 
  = type: code_block__type S name: code_block__allowed_name
  { return { type: type, name: name } }

// тип свойства или возвращаемого типа метода сущности
code_block__type = type: code_block__allowed_name { return type; }

// метод сущности
code_block__method 
  = modificators: code_block__modificators S method: code_block__var S args: code_block__arguments
    { return {
        modificators: modificators,
        return_type: method.type,
        name: method.name,
        arguments: args
      }
    } 

// аргументы метода сущности
code_block__arguments 
  = '(' head_arguments:(S code_block__var ',')* S tail_argument: code_block__var S ')' 
    { 
      var argumentsList = head_arguments.reduce((arr, curr) => {
        arr.push(curr[1]);
        return arr;
      }, []);

      argumentsList.push(tail_argument);

      return argumentsList;
    }

// конечная строка блок кода
code_block__end_row = S '}' WS EOL
