Ikariam.new({});

allies.forEach((ally, i) => {
    new Ejx({
        parent: '#ally-list',
        render: true,
        type: 'option',
        children: `${i+1}° ${ally.allyName} [${ally.allyTagName}]`,
        props: [{name: 'value', value: ally.allyId}]
    })
})

players.forEach((player, i) => {
    new Ejx({
        parent: '#player-list',
        render: true,
        type: 'option',
        children: `${player.username} [${player.allyName ? player.allyName : '-'}]`,
        props: [{name: 'value', value: player.avatarId}]
    })
})

document.querySelector('#scan-by-ally').onclick = () =>{
    Ikariam.map.paint.densityAlly({ownerAllyId: document.querySelector('#ally-list').value})
}

document.querySelector('#scan-by-resource').onclick = () => {
    let resourceLevel = document.querySelector('#lv-resource').value
    let tradegood = document.querySelector('#tradegood-list').value
    tradegood = tradegood == 0 ? [1,2,3,4] : [Number(tradegood)];
    let tradegoodLevel = document.querySelector('#lv-tradegood').value
    Ikariam.map.paint.filterResources({resourceLevel, tradegoodLevel, tradegood})
}

document.querySelector('#density-population').onclick = () => {
    Ikariam.map.paint.densityPalyers()
}

document.querySelector('#find-player').onclick = () =>{
    Ikariam.map.paint.player({ownerId: document.querySelector('#player-list').value})
}
