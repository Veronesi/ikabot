const Ikariam = require('./ikariam');
const regex = require('./helpers/regex')
const fs = require('fs')
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('IKABOT - 1.0')
rl.question('email: ', email => {
  rl.question('password: ', password => {
    Ikariam.session.login({ email, password }, res => {
      console.table(res)
      rl.question('Selecciona una cuenta (id): ', id => {
        Ikariam.session.selectAccount(id, res => {
          //scanIsland(4316, 5721) //5721
          scanHighscore(0, 100)
        })
      });
      //rl.close();
    }, err => {
      console.log(err)
    })
  })
});
function highscoreAlly(page, max) {
  if (page <= max) {
    Ikariam.screenshot.highscoreAlly({ offset: page * 50 }, res => {
      let _ = res[1][1][1].match(regex.allyHighscoreG)
      if(_){
        let ally = _.map(e => regex.allyHighscore.exec(e).groups)
        console.table(ally)
        fs.appendFile(`./src/cache/database/allies_${Ikariam.server.language}-${Ikariam.server.number}.json`, `${JSON.stringify(ally).slice(1,-1)},\n`, function (err) {
        });
        highscoreAlly(page + 1, max)
        console.log(`${page}/${max}`);
      }else{
        console.log('finish!');
      }
    })
  }
}
function scanHighscore(page, max) {
  if (page <= max) {
    Ikariam.screenshot.highscore({ offset: page * 50 }, res => {
      let _ = res[1][1][1].match(regex.playerHighscoreG)
      if(_){
        let player = _.map(e => regex.playerHighscore.exec(e).groups)
        console.table(player)
        fs.appendFile(`./src/cache/database/players_${Ikariam.server.language}-${Ikariam.server.number}.json`, `${JSON.stringify(player).slice(1,-1)},\n`, function (err) {
        });
        scanHighscore(page + 1, max)
        console.log(`${page}/${max}`);
      }else{
        console.log('finish!');
      }

    })
  }
}
function scanIsland(islandId, max) {
  let emptyIsland = [3, 8, 10, 12, 14, 21, 22, 23, 138, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 236, 237, 238, 239, 240, 241, 242, 245, 251, 255, 256, 257, 258, 259, 260, 261, 284, 315, 317, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 541, 542, 543, 599, 611, 612, 613, 644, 645, 646, 651, 662, 689, 690, 707, 709, 748, 749, 750, 751, 797, 798, 805, 806, 914, 915, 916, 917, 918, 923, 924, 925, 926, 927, 928, 929, 930, 988, 989, 1053, 1244, 1245, 1267, 1299, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1519, 1520, 1756, 1830, 1831, 1848, 1850, 2011, 2024, 2025, 2026, 2027, 2062, 2063, 2064, 2065, 2066, 2067, 2268, 2357, 2449, 2450, 2451, 2452, 2453, 2454, 2455, 2456, 2457, 2459, 2463, 2471, 2472, 2473, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2513, 2514, 2700, 2701, 2702, 2703, 2704, 2735, 2736, 2806, 2807, 2808, 2809, 2810, 2811, 2834, 2835, 2836, 2837, 2970, 3014, 3015, 3016, 3017, 3018, 3019, 3020, 3021, 3022, 3023, 3024, 3025, 3026, 3027, 3028, 3029, 3030, 3031, 3032, 3033, 3040, 3104, 3105, 3106, 3107, 3108, 3109, 3163, 3164, 3165, 3166, 3187, 3240, 3241, 3242, 3243, 3244, 3245, 3331, 3408, 3409, 3472, 3529, 3530, 3531, 3532, 3533, 3534, 3535, 3781, 3782, 3870, 3994, 4102, 4103, 4104, 4105, 4146, 4188, 4189, 4205, 4206, 4207, 4208, 4209, 4210, 4211, 4212, 4213, 4214, 4215, 4216, 4217, 4218, 4219, 4220, 4221, 4222, 4223, 4234, 4242, 4243, 4268, 4269, 4270, 4271, 4272, 4273, 4274, 4275, 4276, 4277, 4278, 4279, 4280, 4281, 4282, 4283, 4284, 4285, 4286, 4287, 4307, 4388, 4605, 4677, 4697, 4698, 4718, 4720, 4721, 4722, 4734, 4735, 4737, 4747, 4748, 4749, 4750, 4753, 4754, 4801, 4802, 5012, 5013, 5014, 5015, 5018, 5019, 5020, 5021, 5061, 5066, 5067, 5185, 5186, 5189, 5255, 5256, 5296, 5297, 5322];
  if (islandId <= max) {
    if (emptyIsland.includes(islandId)) {
      scanIsland(islandId + 1, max)
    } else {
      Ikariam.screenshot.viewIslandById({ islandId }, res => {
        let _ = res.match(regex.Responder)
        _ = JSON.parse(`{"response": ${_[1]}}`)
        let island = {
          id: _.response[0][1].id,
          island: _.response[0][1].island,
          name: _.response[0][1].name,
          resourceLevel: _.response[0][1].resourceLevel,
          tradegood: _.response[0][1].tradegood,
          tradegoodLevel: _.response[0][1].tradegoodLevel,
          type: _.response[0][1].type,
          wonder: _.response[0][1].wonder,
          wonderLevel: _.response[0][1].wonderLevel,
          xCoord: _.response[0][1].xCoord,
          yCoord: _.response[0][1].yCoord,
          cities: _.response[0][1].cities.map(e => {
            return {
              id: e.id,
              type: e.type,
              name: e.name,
              level: e.level,
              buildplace_type: e.buildplace_type ? e.buildplace_type : '',
              ownerAllyId: e.ownerAllyId ? e.ownerAllyId : '',
              ownerId: e.ownerId ? e.ownerId : '',
              state: e.state ? e.state : '',
            }
          })
        }
        fs.appendFile(`./src/cache/database/islands_${Ikariam.server.language}-${Ikariam.server.number}.json`, `${JSON.stringify(island)},\n`, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
        scanIsland(islandId + 1, max)
      })
    }
  } else {
    console.log('listo')
  }
}

/*
Ikariam.session.login({ema})
*/