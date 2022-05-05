var pool = require('./connection.js')

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