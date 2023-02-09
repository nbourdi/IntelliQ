const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');
const { parse } = require('../node_modules/json2csv');

router.get('/:questionnaireID/:questionID', function(req, res){

    const { questionnaireID, questionID } = req.params;
    pool.getConnection(function(err, connection){

        if(err) {
			res.status(500).json({status:"failed", reason: "connection to database not established."});
			console.log(err);
		}
        else{
            q = `select Questionnaire.title, Question.question_text, Session.session_id, Answer.answer_id, Option.option_text 
            from Option join Answer on (Option.option_id = Answer.Option_option_id)
            join Question on (Option.Question_question_id = Question.question_id)
            join Questionnaire on (Question.Questionnaire_questionnaire_id = Questionnaire.questionnaire_id)
            join Session on (Answer.Session_session_id = Session.session_id)
            where (Questionnaire.questionnaire_id = ${questionnaireID} and Question.question_id = ${questionID} and Option.Question_Questionnaire_questionnaire_id = ${questionnaireID})
            order by Answer.answer_id ASC;`;
            connection.query(q, function(err, result){
                if(err) {
                    res.status(400).json({status:"failed", reason: "Error getting question information."});
                    console.log(err);
                }
                else if(result==0) {
                    res.status(204).json({status:"failed", reason: " no data for this query"});
                    console.log("getquestionanswers query no data");
                }
                else{
                    const answers = [];
    			    for (const row of result) {
      				    const answer = { session: row.session_id, ans: row.answer_id };
      				    answers.push(answer);
                        questionnaire_title = row.title;
					    question_text = row.question_text;
    			    }

                    console.log(answers);

                    if(req.query.format === "csv") {
                        const csv_input = [];
                        for (const row of result) {
                            const inputty = {
                                "questionnaireID":questionnaireID,
                                "questionID":questionID,
                                "session": row.session_id.toString(),
                                "ans": row.answer_id.toString(),
                            }
                            csv_input.push(inputty)
                        }
    
                        const csvHeader = ['questionnaireID,qID,Questionnaire_title,qtext,Session_id,answer_id,answer_text'];
                        const csvObj = { csvHeader };
                        var csvData = parse(csv_input, csvObj);
                        res.status(200).send(csvData);
                        console.log("Question info OK.");
                    }
                    else {
                        const input = {
                            "questionnaireID":questionnaireID.toString(),
                            "questionID":questionID.toString(),
                            "answers": answers
                        }
                        const json = JSON.stringify(input);
                        const response = JSON.parse(json, (key, val) => (
                            typeof val !== 'object' && val !== null ? String(val) : val
                        ));
                        // JSON response: default if no query format specified.					
                        res.status(200).json(response);
                        console.log("Question info OK.");
                    }
                }
            });
        }

    connection.release();
    });
});

module.exports = router;
