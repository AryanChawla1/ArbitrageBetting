var nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
require('dotenv').config();

var user = process.env.EMAIL_USER;
var pass = process.env.EMAIL_PASS;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
});

function sendEmail(to, subject, opportunitiesJson) {
    const source = fs.readFileSync('./templates/email_template.html', 'utf-8').toString();
    const template = handlebars.compile(source);

    // Build HTML content from opportunities JSON
    let opportunitiesHtml = '';
    opportunitiesJson.forEach(opp => {
        const best = opp.best_odds;
        const home = opp.home_team;
        const away = opp.away_team;

        opportunitiesHtml += `
            <div class="opportunity">
                <h3>${home} vs ${away}</h3>
                <p><strong>${home}</strong>: ${best[home]} (Source: ${best['source_' + home]})</p>
                <p><strong>${away}</strong>: ${best[away]} (Source: ${best['source_' + away]})</p>
                <p><strong>Profit:</strong> ${best.profitPercentage}%</p>
                ${best['eventLink_' + home] !== 'unavailable' ? `<p><a href="${best['eventLink_' + home]}">Bet on ${home}</a></p>` : ''}
                ${best['eventLink_' + away] !== 'unavailable' ? `<p><a href="${best['eventLink_' + away]}">Bet on ${away}</a></p>` : ''}
            </div>
        `;
    });

    const replacements = {
        opportunities: opportunitiesHtml,
        websiteLink: 'http:localhost:5173'
    };
    const htmlToSend = template(replacements);

    var mailOptions = {
        from: user,
        to: to,
        subject: subject,
        html: htmlToSend,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail };
