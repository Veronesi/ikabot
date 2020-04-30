module.exports = class City {

    name;
    id;
    phase;
    isCapital;
    islandId;
    islandName;
    islandXCoord;
    islandYCoord;
    underConstruction;
    endUpgradeTime;
    startUpgradeTime;
    position;
    constructor({ name, id, phase, isCapital, islandId, islandName, islandXCoord, islandYCoord, underConstruction, endUpgradeTime, startUpgradeTime, position }) {
        this.name = name || "";
        this.id = id || "";
        this.phase = phase || "";
        this.isCapital = isCapital || "";
        this.islandId = islandId || "";
        this.islandName = islandName || "";
        this.islandXCoord = islandXCoord || "";
        this.islandYCoord = islandYCoord || "";
        this.underConstruction = underConstruction || "";
        this.endUpgradeTime = endUpgradeTime || "";
        this.startUpgradeTime = startUpgradeTime || "";
        this.position = position || "";
    }
}