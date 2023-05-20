const { Pool } = require('pg');
require('dotenv').config()

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById (playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name FROM playlists
            INNER JOIN users on playlists.owner = users.id
            WHERE playlists.id = $1`,
      values: [playlistId]
    }
    const result = await this._pool.query(query)
    return result.rows[0]
  }

  async getPlaylistSongs (playlistId) {
    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM playlist_songs INNER JOIN songs ON song_id = songs.id WHERE playlist_id = $1',
      values: [playlistId]
    }
    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = PlaylistsService;