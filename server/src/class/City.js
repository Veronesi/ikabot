class City {

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

    constructor({ name, id, phase, isCapital, islandId, islandName, islandXCoord, islandYCoord, underConstruction, endUpgradeTime, startUpgradeTime }) {
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
    }
}