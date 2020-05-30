Ikariam.new({});

allies.forEach((ally, i) => {
    new Ejx({
        parent: '#ally-list',
        render: true,
        type: 'option',
        children: `${i + 1}° ${ally.allyName} [${ally.allyTagName}]`,
        props: [{ name: 'value', value: ally.allyId }]
    })
})

players.forEach((player, i) => {
    new Ejx({
        parent: '#player-list',
        render: true,
        type: 'option',
        children: `${player.username} [${player.allyName ? player.allyName : '-'}]`,
        props: [{ name: 'value', value: player.avatarId }, { name: 'class', value: 'option-player' }, { name: 'name', value: player.username }]
    })
})

document.querySelector('#ally-list').onchange = () => {
    Ikariam.map.paint.densityAlly({ ownerAllyId: document.querySelector('#ally-list').value })
}

document.querySelector('#scan-by-resource').onclick = () => {
    let resourceLevel = Number(document.querySelector('#lv-resource').value)
    let tradegood = Number(document.querySelector('#tradegood-list').value)
    tradegood = tradegood == 0 ? [1, 2, 3, 4] : [Number(tradegood)];
    let tradegoodLevel = Number(document.querySelector('#lv-tradegood').value)
    Ikariam.map.paint.filterResources({ resourceLevel, tradegoodLevel, tradegood })
}

document.querySelector('#density-population').onclick = () => {
    Ikariam.map.paint.densityPalyers()
}

document.querySelector('#filter-player').onkeyup = () => {
    let text = document.querySelector('#filter-player').value;
    document.querySelectorAll('.option-player').forEach(e => {
        e.getAttribute('name').includes(text) ? e.classList.remove('d-none') : e.classList.add('d-none');
    })
}

document.querySelector('#player-list').onchange = () =>[
    Ikariam.map.paint.player({ ownerId: document.querySelector('#player-list').value })
]