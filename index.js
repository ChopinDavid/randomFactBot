const request = require('request-promise');

const getFact = async function() {
	const json = await request({
		url: 'https://uselessfacts.jsph.pl/random.json?language=en',
		json: true
	});

	return {
		text: json.text,
		source: json.source_url
	};
};

(async function () {
	try {
		//Get the fact
		const fact = await getFact();
		

		//Create the post body
		const postBody = {
			mkdwn: true,
			text: '*Random fact:*',
			attachments: [{
				color: '#3DB75C',
				text: fact.text
			}]
		};

		//Post to slack
		const res = await request({
			url: `https://hooks.slack.com/services/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`,
			method: 'POST',
			body: postBody,
			json: true
		});

		console.log(res);
	} catch (e) {
		console.log("Error: ", e);
	}
})();