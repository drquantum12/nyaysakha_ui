interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: string;
    }

interface conversationData {
    id: string;
    topic: string;
    messages: Message[];
    }

const conversations : conversationData[] = [
    {
        id: 'c5313a5d69590cca',
        topic: 'Which is better, React or Angular?',
        messages: [
            {
                id: 'sdsugfiu4987',
                text: 'I am trying to decide between React and Angular for my next project. Which one do you think is better?',
                sender: 'Human',
                timestamp: '2021-08-01T12:00:00Z',
            },
            {
                id: 'sdsugfiu4988',
                text: 'It depends on your requirements. React is more flexible and has a larger ecosystem, while Angular is opinionated and has more built-in features.',
                sender: 'Bot',
                timestamp: '2021-08-01T12:01:00Z',
            },
        ],
    },
    {
        id: 'c5313a5d69590ccb',
        topic: 'What is the best way to learn programming?',
        messages: [
            {
                id: 'sdsugfiu4989',
                text: 'I am new to programming and want to learn it. What is the best way to learn programming?',
                sender: 'Human',
                timestamp: '2021-08-02T12:00:00Z',
            },
            {
                id: 'sdsugfiu4990',
                text: 'The best way to learn programming is to practice regularly, work on projects, and seek help from experienced developers.',
                sender: 'Bot',
                timestamp: '2021-08-02T12:01:00Z',
            },
        ],
    },
    {
        id: 'c5313a5d69590ccc',
        topic: 'What is the future of AI?',
        messages: [
            {
                id: 'sdsugfiu4991',
                text: 'I am interested in AI and want to know what the future holds for it. What is the future of AI?',
                sender: 'Human',
                timestamp: '2021-08-03T12:00:00Z',
            },
            {
                id: 'sdsugfiu4992',
                text: 'The future of AI is bright. It will revolutionize industries, improve efficiency, and create new opportunities for businesses and individuals.',
                sender: 'Bot',
                timestamp: '2021-08-03T12:01:00Z',
            },
        ],
    },
];

export default conversations;
// Compare this snippet from frontend/app/utils/chatData.ts: