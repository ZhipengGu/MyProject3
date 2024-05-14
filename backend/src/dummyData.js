const randomEvents =
    [
        {
            "title": "Yoga Class at Auckland War Memorial Museum",
            "description": "Join us for a rejuvenating yoga class in the peaceful surroundings of the Auckland War Memorial Museum. Enhance your well-being and find inner peace amidst art and history.",
            "address": {
                "detailed_address": "The Auckland Domain, Parnell, Auckland 1010, New Zealand",
                "location": {
                    "lat": -36.8521,
                    "lng": 174.7694
                }
            },
            "tags": [
                "Health & Wellness",
                "Arts & Culture"
            ]
        },
        {
            "title": "Soccer Tournament at Victoria Park",
            "description": "Compete in our exciting soccer tournament at Victoria Park. Gather your team and showcase your skills in a friendly yet competitive atmosphere.",
            "address": {
                "detailed_address": "Victoria Park, Auckland CBD, Auckland 1010, New Zealand",
                "location": {
                    "lat": -36.8472,
                    "lng": 174.7659
                }
            },
            "tags": [
                "Sports & Recreation"
            ]
        },
        {
            "title": "Live Music at Queen Street",
            "description": "Experience the vibrant music scene of Auckland with live performances along Queen Street. Tap your feet to the rhythm of diverse musical genres.",
            "address": {
                "detailed_address": "Queen St, Auckland CBD, Auckland 1010, New Zealand",
                "location": {
                    "lat": -36.8486,
                    "lng": 174.7643
                }
            },
            "tags": [
                "Music & Concerts"
            ]
        },
        {
            "title": "Food Festival at Wynyard Quarter",
            "description": "Indulge in a culinary adventure at the Wynyard Quarter Food Festival. Explore a variety of delicious cuisines and savor gourmet delights from local chefs.",
            "address": {
                "detailed_address": "Wynyard Quarter, Auckland CBD, Auckland 1010, New Zealand",
                "location": {
                    "lat": -36.8423,
                    "lng": 174.7672
                }
            },
            "tags": [
                "Food & Drink"
            ]
        },
        {
            "title": "Entrepreneurship Workshop at GridAKL",
            "description": "Empower yourself with valuable skills and insights at our entrepreneurship workshop hosted at GridAKL. Learn from successful entrepreneurs and network with like-minded individuals.",
            "address": {
                "detailed_address": "101 Pakenham St W, Auckland CBD, Auckland 1010, New Zealand",
                "location": {
                    "lat": -36.8447,
                    "lng": 174.7451
                }
            },
            "tags": [
                "Business & Networking",
                "Technology & Innovation"
            ]
        },
        {
            "title": "Children's Storytime at Auckland Central Library",
            "description": "Ignite your child's imagination with captivating stories at our children's storytime event at Auckland Central Library. Foster a love for reading and creativity in a welcoming environment.",
            "address": {
                "detailed_address": "44-46 Lorne St, Auckland CBD, Auckland 1010, New Zealand",
                "location": {
                    "lat": -36.8509,
                    "lng": 174.7648
                }
            },
            "tags": [
                "Family & Education",
                "Arts & Culture"
            ]
        },
        {
            "title": "Tech Talk at Auckland University",
            "description": "Stay updated on the latest trends in technology with our informative tech talk at Auckland University. Engage in discussions and gain insights from industry experts.",
            "address": {
                "detailed_address": "24 Princes St, Auckland CBD, Auckland 1010, New Zealand",
                "location": {
                    "lat": -36.8503,
                    "lng": 174.7685
                }
            },
            "tags": [
                "Technology & Innovation"
            ]
        },
        {
            "title": "Fashion Show at Britomart",
            "description": "Witness the latest trends and styles at our glamorous fashion show in the heart of Britomart. Discover unique designs from local and international designers.",
            "address": {
                "detailed_address": "Britomart Pl, Auckland CBD, Auckland 1010, New Zealand",
                "location": {
                    "lat": -36.8442,
                    "lng": 174.7687
                }
            },
            "tags": [
                "Fashion & Beauty"
            ]
        },
        {
            "title": "Fundraising Gala for Local Charity",
            "description": "Support a worthy cause at our fundraising gala for a local charity. Enjoy an evening of elegance, entertainment, and philanthropy.",
            "address": {
                "detailed_address": "Venue to be announced",
                "location": {
                    "lat": 0,
                    "lng": 0
                }
            },
            "tags": [
                "Charity & Fundraising"
            ]
        },
        {
            "title": "Community Clean-Up Day at Western Springs Park",
            "description": "Join hands with fellow community members for a rewarding clean-up day at Western Springs Park. Help preserve the beauty of our natural environment.",
            "address": {
                "detailed_address": "Western Springs Park, Western Springs, Auckland 1022, New Zealand",
                "location": {
                    "lat": -36.8761,
                    "lng": 174.7217
                }
            },
            "tags": [
                "Community",
                "Health & Wellness"
            ]
        }
    ]


const TAGS_ENUM = [
    "Community",
    "Arts & Culture",
    "Sports & Recreation",
    "Music & Concerts",
    "Food & Drink",
    "Health & Wellness",
    "Business & Networking",
    "Family & Education",
    "Technology & Innovation",
    "Fashion & Beauty",
    "Charity & Fundraising"
];

const randomUser = [
    {
        "name": "John Doe",
        "display_name": "TechNinja"
    },
    {
        "name": "Emily Johnson",
        "display_name": "CodeMaster"
    },
    {
        "name": "Michael Brown",
        "display_name": "PixelPioneer"
    },
    {
        "name": "Sarah Lee",
        "display_name": "DataDiva"
    },
    {
        "name": "David Wilson",
        "display_name": "GeekGuru"
    },
    {
        "name": "Jessica Garcia",
        "display_name": "InnovationQueen"
    },
    {
        "name": "Daniel Martinez",
        "display_name": "ByteBender"
    },
    {
        "name": "Sophia Taylor",
        "display_name": "AlgorithmAlchemist"
    },
    {
        "name": "Matthew Anderson",
        "display_name": "CyberSavant"
    },
    {
        "name": "Olivia Moore",
        "display_name": "TechTinkerer"
    }
];

const avatarPaths = [
    "avatar1.jpg",
    "avatar2.jpg",
    "avatar3.jpg"
];

const defaultPassowrd = "123456";
const defaultEmailDomain = "@dummy.com";

const testUser = {
    username: "test",
    displayName: "test",
    email: "test@dummy.com",
    password: bcrypt.hashSync("123456", 10),
    avatarPath: "avatar1.jpg",
    tags: ["Community"]
};


function randomIntFromInterval(intInterval) {
    return Math.floor(intInterval.min + Math.random() * (intInterval.max - intInterval.min));
}

function randomDateIn24hAfter(date) {
    return new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000);
}

function randomDateInInterval(dateInterval) {
    return new Date(dateInterval.min.getTime() + Math.floor(Math.random() * (dateInterval.max - dateInterval.min)));
}

function getRandomtags(probability = 0.3) {
    let tags = [];
    TAGS_ENUM.forEach(tag => {
        if (Math.random() < probability) {
            tags.push(tag);
        }
    });
    if (tags.includes(TAGS_ENUM[0]) === false) {
        tags.push(TAGS_ENUM[0]);
    }
    return tags;
}

function getRandomAvatar() {
    return avatarPaths[randomIntFromInterval({min: 0, max: avatarPaths.length})];
}

function getRandomItemFromList(list) {
    return list[randomIntFromInterval({min: 0, max: list.length})];
}

const now = new Date();
const DateInterval = {
    min: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours in the past
    max: new Date(now.getTime() + 24 * 60 * 60 * 1000)  // 24 hours in the future
}


import bcrypt from "bcrypt";

export default async function addRandomRecord({User, Event, Like, Attend}) {
    let users = [];
    let events = [];
    let likes = [];

    for (const user of randomUser) {
        let newUser = new User({
            username: user.name,
            displayName: user.display_name,
            email: user.name.replace(" ", "_") + defaultEmailDomain,
            password: bcrypt.hashSync(defaultPassowrd, 10),
            avatarPath: getRandomAvatar(),
            tags: getRandomtags()
        });
        const result = await User.create(newUser);
        users.push(result._id);
    }

    const result = await User.create(new User(testUser));
    users.push(result._id);

    console.log("Users generated successfully!")

    for (const event of randomEvents) {
        const startTime = randomDateInInterval(DateInterval);
        const endTime = randomDateIn24hAfter(startTime);
        // console.log(startTime);
        let newEvent = new Event({
            userId: getRandomItemFromList(users),
            title: event.title,
            description: event.description,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            vacancy: randomIntFromInterval({min: 10, max: 100}),
            address: {
                detailed_address: event.address.detailed_address,
                location: {
                    coordinates: [event.address.location.lng, event.address.location.lat]
                }
            },
            tags: event.tags
        });
        const result = await Event.create(newEvent);
        events.push(result._id);
    }

    console.log("Dummy data generated successfully!")
}





