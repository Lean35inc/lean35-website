var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/lean35com' );
//mongoose.connect( 'mongodb://lean35:pass@dharma.mongohq.com:10017/lean35com' );
var models = ['article', 'ticket'];

exports.initialize = function() {
    var len = models.length;

    for (var i = 0; i < len; i++) {
      require('../models/' + models[i]);
    }
};
