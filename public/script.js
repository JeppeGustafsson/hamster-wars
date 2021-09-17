let hamsters;

const getHamsters = async () => {
    await fetch('http://localhost:3000/hamsters')
            .then(res => res.json())
            .then(data => hamsters = data)
    
    render();
    gameInit();
    console.log(hamsters);
}
getHamsters();

const render = () => {
    hamsters.map(obj => {
        const content = `
                        <div class="hamster-item">
                            <img src="${obj.content.imgName}" />
                            <h3>${obj.content.name}</h3>
                        </div>
                        `
        ;
        document.getElementById('allHamsters').innerHTML += content;
    })
}

const gameInit = () => {
    let rand1 = Math.floor(Math.random() * hamsters.length);
    let rand2 = Math.floor(Math.random() * hamsters.length);
    const con = [hamsters[rand1], hamsters[rand2]];
    let num = 0;
    con.map(obj => {
        num += 1;
        const content = `
                        <div class="hamster-item-arena" id="contestant-${num}">
                            <img src="${obj.content.imgName}" />
                            <h3>${obj.content.name}</h3>
                        </div>
                        `
        ;
        document.getElementById('arena').innerHTML += content;
        document.querySelectorAll(`.hamster-item-arena`).forEach(item => {
            item.addEventListener('click', () => {
                return fetch(`http://localhost:3000/hamsters/${obj.id}`, {
                    method: 'PUT',
                    body: obj.content
                }).then(response => response.json())
            })
        })
    })
}