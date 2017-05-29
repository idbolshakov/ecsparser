// описание правил блока комментария
comment_block
  = comment_block__start_row comment_block: comment_block__body_row* comment_block__end_row { return comment_block; }

// начальная строка блока комментариев
comment_block__start_row = S '/**' WS EOL

// строка тела блока комментариев
comment_block__body_row 
  = WS '*' !'/' WS '@' tag: [a-z]i+ WS tag_content: (!EOL .)* EOL 
    { return {
        block_tag: {
          tag: tag.join(''), 
          tag_content: tag_content.reduce((text, curr) => {
            return text + curr[1];
          }, '')
        }
      }; 
    }
  / WS '*' !'/' WS plain_text: (!EOL .)* EOL
    { return {
        plain_text: plain_text.reduce((text, curr) => {

          return text + curr[1];
        }, '')
      }; 
    }

// конечная строка блока комментариев
comment_block__end_row = WS '*/' WS EOL
