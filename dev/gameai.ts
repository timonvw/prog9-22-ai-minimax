/// <reference path="knight.ts" />

class GameAI {
    private static finalScore: number = 0;
    private static bestMove: [number, [number, number]] = [0, [0, 0]];
    // depth     -> current depth
    // gameState -> current game state
    // isMax     -> true if it's the horse his turn (maximizer), false if it's the King his turn (minimizer)
    // maxDepth  -> maximum depth of the tree
    // king      -> king object
    // knights   -> array of knight objects
    public static minimax(
        depth:number,
        gameState:GameState,
        isMax:boolean,
        maxDepth:number,
        king: King,
        knights: Knight[],
        ): number {
        let score = gameState.getScore();

        // stop if the last node has been reached
        if(depth === maxDepth || score[1]) {
            return score[0];
        }

        if(isMax) {
            // maximizer
            let bestScore = -Infinity;
            for(let i = 0; i < gameState.knightPositions.length; i++) {
                let newGameState = gameState.copy();
                let knightMoves = knights[i].getMoves(newGameState.knightPositions[i]);

                for(let j = 0; j < knightMoves.length; j++) {
                    newGameState.knightPositions[i] = knightMoves[j];
                    bestScore = Math.max(bestScore, GameAI.minimax(depth + 1, newGameState, false, maxDepth, king, knights));
                    if(depth === 0) {
                       if(this.finalScore < bestScore) {
                            this.finalScore = bestScore;
                            this.bestMove = [i, knightMoves[j]];
                        }
                    }
                }
            }
            return bestScore;
        } else {
            // minimizer
            let bestScore = Infinity;
            let newGameState = gameState.copy();
            let kingMoves = king.getMoves(newGameState.kingPos);

            for(let j = 0; j < kingMoves.length; j++) {
                newGameState.kingPos = kingMoves[j];
                bestScore = Math.min(bestScore, GameAI.minimax(depth + 1, newGameState, true, maxDepth, king, knights));
            }
            return bestScore;
        }
    }

    // let the AI choose a move, and update both the
    // knight and the gamestate
    
    public static moveKnight(king:King, knights: Knight[], gameState:GameState) {
        let t0 = performance.now();

        this.minimax(0, gameState, true, 6, king, knights);
        knights[this.bestMove[0]].setPosition(this.bestMove[1]);
        gameState.knightPositions[this.bestMove[0]] = this.bestMove[1];

        let t1 = performance.now();
        console.log("AI move took " + (t1 - t0) + " milliseconds.");

    }


}