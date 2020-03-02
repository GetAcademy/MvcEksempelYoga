const model = {
    login: {
        loggedInUser: null,
        usernameEntry: '',
        passwordEntry: '',
        error: null
    },

    users: [
        {
            name: 'per',
            password: 'hemmelig',
            program: [1001, 1007]
        },
        {
            name: 'pål',
            password: 'hemmelig',
            program: [1009, 1007]
        },
    ],
    exercises: [
        {
            id: 1001,
            name: 'Solhilsen',
            youtubeUrl: '',
        },
        {
            id: 1007,
            name: 'Banarama',
            youtubeUrl: '',
        },
        {
            id: 1009,
            name: 'Abc',
            youtubeUrl: '',
        }
    ]
};

show();
function show() {
    if (model.login.loggedInUser == null) {
        showLogin();
    } else {
        showMainPage();
    }
}

function showLogin() {
    document.getElementById('content').innerHTML = `
    Brukernavn<br/>
    <input type="text" oninput="model.login.usernameEntry=this.value" /><br/>
    Passord<br/>
    <input type="password" oninput="model.login.passwordEntry=this.value" /> <br/>
    <button onclick="login();">Logg inn</button>
    <button onclick="model.login.loggedInUser = 'knut'; show();">Dummy logg inn som Knut</button>
    <span style="color: red">${model.login.error || ''}</span>
    `;
}

function showMainPage() {

    let loggedInUserObj = findUser(model.login.loggedInUser);
    // let loggedInUserObj = model.users.filter(u=>u.name==model.login.loggedInUser)[0];
    let program = loggedInUserObj.program;

    let exercisesHtml = '';
    for (let exercise of model.exercises) {
        if (!program.includes(exercise.id)) continue;
        exercisesHtml += `
        <li>${exercise.name}</li>
        `;
    }


    document.getElementById('content').innerHTML = `
    Du er logget inn som ${model.login.loggedInUser}.

    <h2>Program</h2>
    <ol>
        ${exercisesHtml}
    </ol>

    <button onclick="model.login.loggedInUser = null; show()">Logg ut</button>
    
    `;
}

function findUser(username) {
    for (let user of model.users) {
        if (user.name == username) {
            return user;
        }
    }
    return null;
}


// Controller
function login() {
    const username = model.login.usernameEntry;
    const password = model.login.passwordEntry;
    model.login.loggedInUser = null;
    for (let user of model.users) {
        if (user.name == username && user.password == password) {
            model.login.loggedInUser = username;
            model.login.error = '';
            break;
        }
    }
    if (model.login.loggedInUser == null) {
        model.login.error = 'Feil brukernavn og/eller passord.';
    }
    show();
}
