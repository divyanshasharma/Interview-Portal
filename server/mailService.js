const nodemailer = require('nodemailer');
let instance = null;

const SERVICE = 'gmail';
const USER = 'dasistmeinemailid@gmail.com';
const PASSWORD = '**********';


const transporter = nodemailer.createTransport({
    service: SERVICE,
    auth: {
        user: USER,
        pass: PASSWORD
    }
});

class MailService {

    static getMailServiceInstance() {
        return instance ? instance : new MailService();
    }

    getData = (data) => {
        data = data.split('(');
        const name = data[0];
        const email = data[1].slice(0,-1);
        return {
            name: name,
            email: email
        };
    }
    
    schedule = (interviewer, interviewee, startTime, endTime) => {
        interviewer = this.getData(interviewer);
        interviewee = this.getData(interviewee);
        const mailOptions = {
            from: USER,
            to: interviewer.email + ',' + interviewee.email,
            subject: 'New Interview',
            text: `You have new interview scheduled.
                   Details:
                   interviewer name: ${interviewer.name}
                   interviewee name: ${interviewee.name}
                   start time: ${startTime}
                   end time: ${endTime}`
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    update = (interviewer, interviewee, startTime, endTime) => {
        interviewer = this.getData(interviewer);
        interviewee = this.getData(interviewee);
        const mailOptions = {
            from: USER,
            to: interviewer.email + ',' + interviewee.email,
            subject: 'Interview Timings Updates',
            text: `You interview scheduled timings are updated.
                   Details:
                   interviewer name: ${interviewer.name}
                   interviewee name: ${interviewee.name}
                   start time: ${startTime}
                   end time: ${endTime}`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }

    delete = (interviewer, interviewee, startTime, endTime) => {
        interviewer = this.getData(interviewer);
        interviewee = this.getData(interviewee);
        const mailOptions = {
            from: USER,
            to: interviewer.email + ',' + interviewee.email,
            subject: 'Interview Cancelled',
            text: `You interview scheduled with
                   Details:
                   interviewer name: ${interviewer.name}
                   interviewee name: ${interviewee.name}
                   start time: ${startTime}
                   end time: ${endTime}
                   is cancelled now.`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}
  
module.exports = MailService;