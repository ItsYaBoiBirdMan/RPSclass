var pool = require('./connection.js')

module.exports.getPlayerDeck = async function (pId,pmId) { 
    try {
        let sqlCheck = `select * from playermatch where pm_player_id = $1 and pm_id = $2`;
        let resultCheck = await pool.query(sqlCheck, [pId,pmId]);
        if (resultCheck.rows.length > 0) { // I'm the owner of the deck
            let sql = `select deck_id, deck_pm_id, deck_pos_id, deck_card_id, deck_card_hp,
            cp_name, crd_name, crd_description
            from deck, cardpos, card 
            where deck_pm_id = $1 and
                deck_pos_id = cp_id and
                deck_card_id = crd_id`;
            let result = await pool.query(sql, [pmId]);
            let cards = result.rows;
            return { status: 200, result: cards };
        }
        let sqlCheckOp = `
            select * from playermatch 
            where pm_player_id = $1 and pm_match_id IN
                (select pm_match_id from playermatch where pm_id = $2)`;
        let resultCheckOp = await pool.query(sqlCheckOp, [pId,pmId]);
        
        if (resultCheckOp.rows.length > 0) {
            let sql = `select deck_id, deck_pm_id, deck_pos_id, deck_card_id, deck_card_hp,
            cp_name, crd_name, crd_description
            from deck, cardpos, card 
            where deck_pm_id = $1 and
                deck_pos_id = cp_id and
                deck_card_id = crd_id and
                (cp_name LIKE 'Table' or  cp_name LIKE 'TablePlayed')  `;
            let result = await pool.query(sql, [pmId]);
            let cards = result.rows;
            return { status: 200, result: cards };
        } 
        return { status: 401, result: { msg: "You are not playing in this match"} };
        
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }    
}




module.exports.getPlayerMatchInfo = async function (pmId) { 
    try {
        let sql = `	select pm_id, pm_state_id, pm_hp, pms_name, mt_turn, mt_finished, ply_name, ply_id  
        from  playermatch, pmstate, match, player  
        where 
          pm_player_id = ply_id and
          pm_state_id = pms_id and
          pm_match_id = mt_id and
          pm_id = $1`;
        let result = await pool.query(sql, [pmId]);
        if (result.rows.length > 0) {
            let player = result.rows[0];
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "No playermatch with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }    
}


module.exports.getPlayerInfo = async function (playerId) {
    try {
        let sql = `Select ply_name from player where ply_id = $1`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let player = result.rows[0];
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "No player with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }