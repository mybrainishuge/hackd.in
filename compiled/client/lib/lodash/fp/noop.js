'use strict';

var convert = require('./convert'),
    func = convert('noop', require('../noop'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL2ZwL25vb3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFVBQVUsUUFBUSxXQUFSLENBQVY7SUFDQSxPQUFPLFFBQVEsTUFBUixFQUFnQixRQUFRLFNBQVIsQ0FBaEIsRUFBb0MsUUFBUSxpQkFBUixDQUFwQyxDQUFQOztBQUVKLEtBQUssV0FBTCxHQUFtQixRQUFRLGVBQVIsQ0FBbkI7QUFDQSxPQUFPLE9BQVAsR0FBaUIsSUFBakIiLCJmaWxlIjoibm9vcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb252ZXJ0ID0gcmVxdWlyZSgnLi9jb252ZXJ0JyksXG4gICAgZnVuYyA9IGNvbnZlcnQoJ25vb3AnLCByZXF1aXJlKCcuLi9ub29wJyksIHJlcXVpcmUoJy4vX2ZhbHNlT3B0aW9ucycpKTtcblxuZnVuYy5wbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vcGxhY2Vob2xkZXInKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuYztcbiJdfQ==