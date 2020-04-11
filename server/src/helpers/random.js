const random = {
    getHexaRandom(len) {
        switch (len) {
            case 4:
                return (Math.random() * 0xFFFF << 0).toString(16);
            case 3:
                return (Math.random() * 0xFFF << 0).toString(16);
            case 8:
                return (Math.random() * 0xFFFFFFFF << 0).toString(16);
            case 12:
                return (Math.random() * 0xFFFFFF << 0).toString(16) + '' + (Math.random() * 0xFFFFFF << 0).toString(16);
        }
    },

    getDecRandom(pow) {
        return parseInt(Math.random() * (Math.pow(10, pow)));
    },

    fp_eval_id() {
        return random.getHexaRandom(8) + '-' + random.getHexaRandom(4) + '-' + '4' + '' + random.getHexaRandom(3) + '-' + random.getHexaRandom(4) + '-' + random.getHexaRandom(12)
    },

    fingerprint() {
        return this.getDecRandom(9);
    }
}

module.exports = random;