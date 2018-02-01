/*
 * Serve JSON to our AngularJS client
 */
var mongoose = require('mongoose'), 
    Article = mongoose.model('Article'),
    Ticket = mongoose.model('Ticket');

var SendGrid = require('sendgrid').SendGrid;
var sendgrid = new SendGrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)



exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.article = function (req, res) {

  // var article = new Article({title: "test"})	
  // article.save();
  Article.find({name: req.params.name}).lean().exec(function (err, articles) {
  	  res.json(articles[0]);
  })
  // res.json({
  // 	title: req.params.name
  // });
};

exports.ticket = function (req, res){
  var name = req.body.name,
      email = req.body.email,
      phone = req.body.phone ? req.body.phone : null
      message = req.body.message;

  // var ticket = new Ticket({
  //   name: name,
  //   email: email,
  //   phone: phone,
  //   message: message
  // });
  var ticket = new Ticket(req.body);

  ticket.save(function (err) {
    if (err) {
        console.log('Error while saving ticket');
      }
  });

  sendgrid.send({
  to: 'dailychoices@gmail.com',
  from: email,
  subject: 'Testing from Lean35.com site',
  text: message
}, function(success, message) {
  if (!success) {
    console.log(message);
    return res.send(500);
  }else{
    console.log('Message successfully sent') 
  }
   res.send(200);
});

}
