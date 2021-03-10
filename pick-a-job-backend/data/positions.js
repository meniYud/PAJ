import mongoose from 'mongoose';

const positions = [
    {
        offeringCompany: mongoose.Types.ObjectId('60366b5d2e9a6743b013d114'),
        offeringAgent: mongoose.Types.ObjectId('603645e1e8d2191358bcd0c4') ,
        positionDisplayId: '12AB15',
        positionName: 'web developer',
        subPositionName: 'frontend web developer',
        positionDescription: 'A front-end web developer is responsible for implementing visual and interactive elements that users engage with through their web browser when using a web application. They are usually supported by back-end web developers, who are responsible for server-side application logic and integration of the work front-end developers do.',
        offeredReward: '2000',
        positionStatus: 'ACTIVE',
        positionLocation: 'HaGoshrim beach IL',
        requiredExperience: '2 years with React-Redux',
    },
    {
        offeringCompany: mongoose.Types.ObjectId('60366b5d2e9a6743b013d114'),
        offeringAgent: mongoose.Types.ObjectId('603645e1e8d2191358bcd0c4') ,
        positionDisplayId: '12AB16',
        positionName: 'web developer',
        subPositionName: 'backend web developer',
        positionDescription: 'A back-end web developer is responsible for server-side web application logic and integration of the work front-end developers do. Back-end developers are usually write the web services and APIs used by front-end developers and mobile application developers.',
        offeredReward: '2000',
        positionStatus: 'ACTIVE',
        positionLocation: 'HaGoshrim beach IL',
        requiredExperience: '2 years with Node-Express',
    },
    {
        offeringCompany: mongoose.Types.ObjectId('60366b5d2e9a6743b013d114'),
        offeringAgent: mongoose.Types.ObjectId('603645e1e8d2191358bcd0c5') ,
        positionDisplayId: '12DD31',
        positionName: 'AI developer',
        subPositionName: 'Machine Learning Engineer',
        positionDescription: 'Machine Learning Engineer responsibilities include creating machine learning models and retraining systems. To do this job successfully, you need exceptional skills in statistics and programming. If you also have knowledge of data science and software engineering, we’d like to meet you.',
        offeredReward: '4000',
        positionStatus: 'ACTIVE',
        positionLocation: 'Haifa IL',
        requiredExperience: '2 years with Python',
    },
    {
        offeringCompany: mongoose.Types.ObjectId('60366b5d2e9a6743b013d114'),
        offeringAgent: mongoose.Types.ObjectId('603645e1e8d2191358bcd0c5') ,
        positionDisplayId: '12DD19',
        positionName: 'IOT developer',
        subPositionName: 'AWS IoT developer',
        positionDescription: 'This is a fantastic AWS IOT Developer position working with IOT Greengrass to make sure devices communicate correctly on the current AWS Platform.',
        offeredReward: '3000',
        positionStatus: 'SUSPENDED',
        positionLocation: 'Tel Aviv IL',
        requiredExperience: '2 years with AWS',
    },
    {
        offeringCompany: mongoose.Types.ObjectId('60366b5d2e9a6743b013d115'),
        offeringAgent: mongoose.Types.ObjectId('603645e1e8d2191358bcd0c6') ,
        positionDisplayId: 'ATR15',
        positionName: 'QA engineer',
        subPositionName: 'QA automation engineer',
        positionDescription: 'QA, which stands for quality assurance, is a position that tests and assures the quality of software, websites, programs, and more. QA testers or analysts typically dive deep into a program or service to uncover bugs and issues. Their goal is to help fix and improve items before releasing to a customer or company',
        offeredReward: '1000',
        positionStatus: 'ACTIVE',
        positionLocation: 'TLV Israel',
        requiredExperience: '4 years experience in QA',
    },
    {
        offeringCompany: mongoose.Types.ObjectId('60366b5d2e9a6743b013d115'),
        offeringAgent: mongoose.Types.ObjectId('603645e1e8d2191358bcd0c6') ,
        positionDisplayId: 'ATR27',
        positionName: 'web developer',
        subPositionName: 'fullstack web developer',
        positionDescription: 'As a Full Stack Developer, you should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. You should also be a team player with a knack for visual design and utility.',
        offeredReward: '2000',
        positionStatus: 'ACTIVE',
        positionLocation: 'TLV Israel',
        requiredExperience: '2 years with MERN stack',
    },
    {
        offeringCompany: mongoose.Types.ObjectId('60366b5d2e9a6743b013d115'),
        offeringAgent: mongoose.Types.ObjectId('603645e1e8d2191358bcd0c7') ,
        positionDisplayId: 'ATR158TST',
        positionName: 'Test automation developer',
        subPositionName: 'Machine Learning Engineer',
        positionDescription: 'Test automation developers create programs that test software throughout the development cycle.',
        offeredReward: '2500',
        positionStatus: 'ACTIVE',
        positionLocation: 'Raanana IL',
        requiredExperience: '2 years with Java',
    },
    {
        offeringCompany: mongoose.Types.ObjectId('60366b5d2e9a6743b013d115'),
        offeringAgent: mongoose.Types.ObjectId('603645e1e8d2191358bcd0c7') ,
        positionDisplayId: 'ATR166TST',
        positionName: 'Automation engineer',
        subPositionName: 'Automation Engineer & Information Technology',
        positionDescription: 'We are looking for a bright and passionate Automation Engineer to join our new Automation Security team! As a member of this team, you will be responsible for the design, implementation and maintenance of Automated tests using our Java-based framework. Our Automated tests cover all aspects of the product, including complex networking topology and traffic and security rules.',
        offeredReward: '3000',
        positionStatus: 'ACTIVE',
        positionLocation: 'Raanana IL',
        requiredExperience: '5 years with automobile',
    },
];

export default positions;