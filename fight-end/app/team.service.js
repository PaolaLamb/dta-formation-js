export class TeamService {
  constructor( $http, API_URL ) {
    this.$http = $http;
    this.API_URL = API_URL;
  }

  getAllTeams() {
    return this.$http.get( this.API_URL )
      .then( response => response.data );
  }

  getTeam( id ) {
    return this.$http.get( `${this.API_URL}/${id}` )
      .then( response => response.data );
  }

  delete( team_id ) {
    return this.$http.delete( `${this.API_URL}/${ team_id }` )
      .then( response => response.data );
  }

  put( team ) {
    return this.$http.put( `${this.API_URL}/${ team.id }`, team )
    .then( response => response.data );
  }
  
  post( team ) {
    return this.$http.post( this.API_URL, team )
    .then(response => response.data);
  }

  getOrCreate(name){
      return this.$http.get(`${this.API_URL}?name=${name}`)
      .then(response => response.data)
      .then(teams => {
          if(teams.length === 0) return this.post({name, fighters:[]});
          return teams[0];
      })
  }

}