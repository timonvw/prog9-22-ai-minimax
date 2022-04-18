/// <reference path="knight.ts" />

class GameAI {

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
        knights: Knight[]
        ): number {
        let score = gameState.getScore();

        // stop if the last node has been reached
        if(depth === maxDepth || score[1]) {
            console.log("Reached max depth");
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
                }
            }
            console.log(`bestscore: ${bestScore} and depth: ${depth}`);
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

        // RANDOM MOVE - START ------------------
        let best = this.minimax(0, gameState, true, 3, king, knights);
        console.log("FINAL: " + best);

        // choose knight to move
        let i:number =  Math.floor(Math.random() * Math.floor(knights.length));

        let legalMoves: [number, number][] = knights[i].getMoves();

        console.log(legalMoves);

        let j:number =  Math.floor(Math.random() * Math.floor(legalMoves.length));

        knights[i].setPosition(legalMoves[j]);
        gameState.knightPositions[i] = legalMoves[j];

        // RANDOM MOVE - END   ------------------

        let t1 = performance.now();
        console.log("AI move took " + (t1 - t0) + " milliseconds.");

    }


}