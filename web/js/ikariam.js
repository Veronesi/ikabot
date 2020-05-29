const Ikariam = {
    new({ width = 100, height = 100, el = '#map' }) {
        Ikariam.map.width = width;
        Ikariam.map.height = height;
        Ikariam.el = el;
        Ikariam.map.clear()
    },
    map: {
        clear() {
            document.querySelector(Ikariam.el).innerHTML = ''
            for (let i = 0; i < Ikariam.map.width + 1; i++) {

                new Ejx({
                    type: 'div',
                    parent: Ikariam.el,
                    render: true,
                    props: [{ name: 'id', value: `col-${i}` }]
                })
                for (let j = 0; j < Ikariam.map.height + 1; j++) {
                    new Ejx({
                        type: 'div',
                        parent: `#col-${i}`,
                        props: [{ name: 'class', value: 'island red' }, { name: 'style', value: `top: ${i * 9}px; left: ${j * 9}px;` }, { name: 'id', value: `i${i}-${j}` }, { name: 'title', value: `[${i};${j}]` }],
                        render: true
                    })

                }
            }
        },
        paint: {
            ally: ({ ownerAllyId = 0, name = "" }) => {
                if (ownerAllyId) {
                    Ikariam.map.clear()
                    islands.forEach(island => {
                        island.cities.find(city => city.ownerAllyId == ownerAllyId) ? document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add('green') : document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add(`bg-secondary`);;
                    });
                }
            },
            densityAlly: ({ ownerAllyId = 0, name = "" }) => {
                if (name) {
                    Ikariam.map.clear()
                    ownerAllyId = allies.find(ally => ally.allyTagName == name).allyId
                }
                Ikariam.map.clear()
                islands.forEach(island => {
                    let density = island.cities.filter(city => city.ownerAllyId == ownerAllyId).length
                    if (density) {
                        document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add(`density-${density}`);
                    } else {
                        document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add(`bg-secondary`);
                    }
                })

            },
            filterResources: ({ resourceLevel = 0, tradegood = [1, 2, 3, 4], tradegoodLevel = 0 }) => {
                Ikariam.map.clear()
                islands.forEach(island => {
                    (island.resourceLevel >= resourceLevel && tradegood.includes(Number(island.tradegood)) && island.tradegoodLevel >= tradegoodLevel) ?
                        document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add('green') : document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add(`bg-secondary`);

                })
            },
            player: ({ ownerId = 0 }) => {
                Ikariam.map.clear()
                islands.forEach(island => {
                    (island.cities.find(city => city.ownerId == ownerId)) ?
                        document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add('green') : document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add(`bg-secondary`);

                })
            },
            densityPalyers: () => {
                Ikariam.map.clear()
                islands.forEach(island => {
                    let density = island.cities.filter(city => city.type == "city").length
                    document.querySelector(`#i${island.xCoord}-${island.yCoord}`).classList.add(`density-${density}`);
                })
            }
        }
    }
}