class GameState {
    public kingPos: [number, number];               // position of the king in the game in board coordinates
    public knightPositions: [number, number][];     // position of the knights in the game in board coordinates

    constructor(kingPos: [number, number], knightPositions: [number, number][]) {
        this.kingPos = kingPos;
        this.knightPositions = knightPositions;
    }

    // return the value of the state and if the state is terminal (game over)
    // higher value is better gamestate for the king (100 is win, -100 is lose)
    public getScore(knight: number | undefined = undefined) : [number, boolean] {
        // game over
        for (let z of this.knightPositions) {
            if (Board.samePosition(z, this.kingPos)) {
                return [-100, true];
            }
        }

        // win
        if (this.kingPos[1] == 0) {
            return[100, true];
        }

        if(knight) {
            console.log("KNIGHT POS: " + this.knightPositions[knight] + " KING POS: " + this.kingPos)
        } else {

        }
        // not over yet, return an evaluation of the gamestate
        // higher number is better for king, lower better for the knights

        // TODO: calculate the value of the gamestate scoren ding
        // TODO: calculate with distance to other players

        // Hint: use the position of the king stored in this.kingPos
        return [0, false]
    }

    // create a copy of the gamestate (needed by AI to look into the future)
    public copy() : GameState {
        const knightPosCopy  = Object.assign([], this.knightPositions);

        return new GameState(this.kingPos, knightPosCopy)
    }
}