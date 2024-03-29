var mongoose = require('mongoose');

var Leaderships = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new leader
    Leaderships.create({
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
    }, function(err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        console.log(leader);

        var id = leader._id;

        // get all the leaderships
        setTimeout(function() {
            Leaderships.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test'
                    }
                }, {
                    new: true
                })
                .exec(function(err, leader) {
                    if (err) throw err;
                    console.log('Updated Leader!');
                    console.log(leader);

                    leader.abbr = "CTO";
                    leader.save(function(err, leader) {
                        console.log('Updated abbr!');
                        console.log(leader);

                        db.collection('leaderships').drop(function() {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});