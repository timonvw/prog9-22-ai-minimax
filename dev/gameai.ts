/// <reference path="knight.ts" />

class GameAI {

    // depth     -> current depth
    // gameState -> current game state
    // isMax     -> true if it's the horse his turn (maximizer), false if it's the King his turn (minimizer)
    // nodeIndex -> index of the current node to get te right scores
    // scores    -> array of scores for all nodes
    // maxDepth  -> maximum depth of the tree
    public static minimax(
        depth:number,
        gameState:GameState,
        isMax:boolean,
        scoreIndex:number,
        scores:number[],
        maxDepth:number,
        king: King,
        knights: Knight[]
        ): number {
        // debugger;
        // stop if the last node has been reached
        if(depth === maxDepth) {
            console.log("Reached max depth", scores);
            gameState.getScore();
            return scores[scoreIndex];
        }

        if(isMax) {
            // maximizer
            let bestScore = -Infinity;
            for(let i = 0; i < gameState.knightPositions.length; i++) {
                let newGameState = gameState.copy();
                let knightMoves = knights[i].getMoves(newGameState.knightPositions[i]);
                console.log("Knight moves " + i , knightMoves);

                for(let j = 0; j < knightMoves.length; j++) {
                    // newGameState.knightPositions[i] = knightMoves[j];
                    // TODO: change the position of the knight and calculate the distance to the king
                    // TODO: gameState.getScore();
                    let score = GameAI.minimax(depth + 1, newGameState, false, scoreIndex + 1, scores, maxDepth, king, knights);
                    // TODO: Change with calculation
                    if(score > bestScore) {
                        bestScore = score;
                    }
                }
            }
            scores[scoreIndex] = bestScore;
            return bestScore;
        } else {
            // minimizer
            let bestScore = -Infinity;
            let newGameState = gameState.copy();
            let kingMoves = king.getMoves(newGameState.kingPos);
            console.log("King moves ", kingMoves);

            for(let j = 0; j < kingMoves.length; j++) {
                // move the king and calculate the distance to otherside of the board
                // TODO: gameState.getScore();
                let score = GameAI.minimax(depth + 1, newGameState, true, scoreIndex + 1, scores, maxDepth, king, knights);
                // TODO: Change with calculation
                if(score > bestScore) {
                    bestScore = score;
                }
            }
            scores[scoreIndex] = bestScore;
            return bestScore;
        }
    }

    // let the AI choose a move, and update both the
    // knight and the gamestate
    
    public static moveKnight(king:King, knights: Knight[], gameState:GameState) {
        let t0 = performance.now();

         // TODO: remove random move, amnd replace with AI move

         //TODO calculate minimax for all horses and pick the best one

        // RANDOM MOVE - START ------------------

        this.minimax(0, gameState, true, 0, [], 3, king, knights);

        console.log(king); // only to avoid error: 'king' is declared but its value is never read.

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