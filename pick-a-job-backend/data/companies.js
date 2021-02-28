import mongoose from 'mongoose';

const companies = [
    {
        companyName: 'Matrix Inc LTD.',
        cvsEmail: 'cv_matrix@matrix.com',
        companyDescription: 'Since my very first day at Matrix, I have felt fortunate to lead its growth in the ever-changing world of technology. We have established solid bonds with partners and clients from every sector, industry, and across the globe. I believe that these strong, long term relationships are a reflection of the high quality solutions, large scale complex deliverables and top service level for which we have become known, and which have made us a leader in the technology market. For us, relationships are not only external. I am proud to boast that many of our professionals stick around for years, not only because we’re a solid secure company, but because they are a curious team who love to learn, grow and develop – and at Matrix they can do exactly that. It is our people who take responsibility for exploring, learning, and leading the market into exciting new areas.',
        companyAgents: [mongoose.Types.ObjectId('603645e1e8d2191358bcd0c9'), mongoose.Types.ObjectId('603645e1e8d2191358bcd0c5'), mongoose.Types.ObjectId('603645e1e8d2191358bcd0c4')],
        companyPositions: []
    },
    {
        companyName: 'Sean Industries LTD.',
        cvsEmail: 'cv_sean_industries@matrix.com',
        companyDescription: 'XYZ is a partnership firm owned and operated by A and B in the city of Davis, California. You can find all types of lab equipment for schools and colleges. ABC Company provides high quality plumbing services. We have been serving St. Washougal, Washington and neighboring areas for more than 12 years. Sit and Chill is a Chinese restaurant in St. Irving, Texas. For nine years, we have been a local favorite for the best Chinese noodles in town.',
        companyAgents: [mongoose.Types.ObjectId('603645e1e8d2191358bcd0c6'), mongoose.Types.ObjectId('603645e1e8d2191358bcd0c7'), mongoose.Types.ObjectId('603645e1e8d2191358bcd0ca')],
        companyPositions: []
    },
];

export default companies;