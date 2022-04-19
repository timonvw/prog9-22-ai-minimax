class GameState {
    public kingPos: [number, number];               // position of the king in the game in board coordinates
    public knightPositions: [number, number][];     // position of the knights in the game in board coordinates

    constructor(kingPos: [number, number], knightPositions: [number, number][]) {
        this.kingPos = kingPos;
        this.knightPositions = knightPositions;
    }

    // return the value of the state and if the state is terminal (game over)
    // higher value is better gamestate for the king (100 is win, -100 is lose)
    public getScore() : [number, boolean] {
        // game over
        for (let z of this.knightPositions) {
            if (Board.samePosition(z, this.kingPos)) {
                return [100, true];
            }
        }

        // win
        if (this.kingPos[1] == 0) {
            return[-100, true];
        }
        
        // close the king to 0 the lower the score
        let scoreKing = (100 + (this.kingPos[1] * -10)) * -1;
        // calculate the distance between the knights and the king
        let knightsDistance = this.knightPositions.map(k => Math.floor(Math.sqrt(Math.pow(k[0] - this.kingPos[0], 2) + Math.pow(k[1] - this.kingPos[1], 2))));
        let mediumKnights = ((knightsDistance.reduce((a, b) => a + b)) / knightsDistance.length);
        let scoreKnights = Math.floor((100 - (mediumKnights * 10)));
        return [scoreKnights + scoreKing, false];
    }

    // create a copy of the gamestate (needed by AI to look into the future)
    public copy() : GameState {
        const knightPosCopy  = Object.assign([], this.knightPositions);

        return new GameState(this.kingPos, knightPosCopy)
    }
}