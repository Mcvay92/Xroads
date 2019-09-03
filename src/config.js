export default {
    API_PATH: "/api",
    LOGO_IMG_PATH: "https://crossroad-test.s3.us-east-2.amazonaws.com/logo/",
    stages: {
        0: 'Idea/market research',
        1: 'Prototype development/team formation',
        2: 'Private beta',
        3: 'Public beta'
    },
    roles: {
        0: 'Founder',
        1: 'Co-Founder',
        2: 'Memeber',
        3: 'other User'
    },
    stageSelect:[
        {label: 'Select Stage', value: ''},
        {label: 'Idea/market research', value: '0'},
        {label: 'Prototype development/team formation', value: '1'},
        {label: 'Private beta', value: '2'},
        {label: 'Public beta', value: '3'},
    ],
    roleSelect: [
        {label: 'Select Role', value: ''},
        {label: 'Founder', value: '0'},
        {label: 'Co-Founder', value: '1'},
        {label: 'Memeber', value: '2'},
        {label: 'other User', value: '3'}
    ]
}


