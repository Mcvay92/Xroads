export default {
    API_PATH: "/api",
    stages: {
        0: 'Idea',
        1: 'Market Research',
        2: 'Production',
        3: 'MVP',
        4: 'Other'
    },
    roles: {
        0: 'Founder',
        1: 'Co-Founder',
        2: 'Memeber',
        3: 'other User'
    },
    stageSelect:[
        {label: 'Select Stage', value: ''},
        {label: 'Idea', value: '0'},
        {label: 'Market Research', value: '1'},
        {label: 'Production', value: '2'},
        {label: 'MVP', value: '3'},
        {label: 'Other', value: '4'}
    ],
    roleSelect: [
        {label: 'Select Role', value: ''},
        {label: 'Founder', value: '0'},
        {label: 'Co-Founder', value: '1'},
        {label: 'Memeber', value: '2'},
        {label: 'other User', value: '3'}
    ]
}