// TODO: require paths should be updated, waiting on the files & locations


const { Router } = require('../node_modules/express');
const router = Router();
const { connect } = require('../connect');

router.post('/:questionnaireID/:questionID', function(req, res) {
    const { questionnaireID, questionID } = req.params;
	connect(function(err, client, release) {
		if(err) {
			res.status(500).json({status:"failed", reason: "connection to database not established."});
				console.log(err);
		}

        // TODO: needs to be tested + ordered by dec -nat
		client.query("select Question.question_text, required, Question.type, Option.option_id, Option.option_text, Option.Question_nextquestion_id from Question inner join Option ON Question.question_id = Option.question_id where (Question.Questionnaire_questionnaire_id = $1 AND Question.question_id = $2);", [questionnaireID, questionID], function(err) 
		{
        	if(err) {
				res.status(500).json({status:"failed", reason: "Error getting question information."});
                console.log(err);
			}
			else {
				//make array of options 
   				const options = [];
    				for (const row of result.rows) {
      					const options = { optID: row.option_id, opttxt: row.option_text, nextqID: row.Question_nextquestion_id };
      					questions.push(question);
    				}
				//generate response
				const response = {
						"questionnaireID":questionnaireID,
						"qID":questionID,
						"qtext":result.question_text,
						"required":result.required,
						"type":result.type,
                        			"options":options
					//result.rows //only some columns?
				}
				if(req.query.format === "csv") {
					const csvHeader = ['questionnaireID,qID,qtext,required,type,options'];
					const csvObj = { csvHeader };
					var csvData = parse(response, data_opts);
					res.status(200).send(csvData);
					console.log("Question info OK.");
				}
				else {
                    // JSON response: default if no query format specified.
                    // TODO: result.[] ?, test -nat						
					res.status(200).json(response);
					console.log("Question info OK.");
				}
        	}
   		});
		release();
	});
});

module.exports = router;
