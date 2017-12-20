/**
 * Created by apaivaer on 20/12/2017.
 */

const VOTE_UP = 'VOTE_UP'
const VOTE_DOWN = 'VOTE_DOWN'


function voteUp(post) {
    return {
        type: VOTE_UP,
        post
    }
}

function voteDown(post) {
    return {
        type: VOTE_DOWN,
        post
    }
}

export { voteUp, voteDown, VOTE_UP, VOTE_DOWN }
