'use strict';

var convert = require('./convert'),
    func = convert('spread', require('../spread'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL2ZwL3NwcmVhZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksVUFBVSxRQUFRLFdBQVIsQ0FBVjtJQUNBLE9BQU8sUUFBUSxRQUFSLEVBQWtCLFFBQVEsV0FBUixDQUFsQixDQUFQOztBQUVKLEtBQUssV0FBTCxHQUFtQixRQUFRLGVBQVIsQ0FBbkI7QUFDQSxPQUFPLE9BQVAsR0FBaUIsSUFBakIiLCJmaWxlIjoic3ByZWFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbnZlcnQgPSByZXF1aXJlKCcuL2NvbnZlcnQnKSxcbiAgICBmdW5jID0gY29udmVydCgnc3ByZWFkJywgcmVxdWlyZSgnLi4vc3ByZWFkJykpO1xuXG5mdW5jLnBsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9wbGFjZWhvbGRlcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jO1xuIl19