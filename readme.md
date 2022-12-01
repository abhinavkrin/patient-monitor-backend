## REST API ENDPOINTS

/tournaments
    -GET: lists tournaments ◄
    -POST: creates a tournament ◄

/tournaments/:id
    -GET: get a tournament by id ◄
    -PUT: update the tournaments ◄
    -DELETE: deletes the tournament ◄

/tournaments/:id/matches 
    -GET: lists the matches in the given tournament ◄
    -POST: add the match result to the tournament ◄

/tournaments/:id/matches/:match_id
    -GET: get the match by id ◄
    -PUT: update the match results ◄
    -DELETE: delete the match ◄

/tournaments/:id/teams
    -GET: lists the teams of the tournament ◄
    -POST: adds a new team to the tournament ◄

/tournaments/:id/teams/:team_id
    -GET: gets team with the given id ◄
    -PUT: update the team ◄
    -DELETE: delete the team ◄

/tournaments/:id/groups/
    -GET: gets list of groups ◄
    -POST: creates a new group ◄

/tournaments/:id/groups/groupId
    -GET: get group details ◄
    -PUT: updates group detail ◄
    -DELETE: deletes the group ◄

/tournaments/:id/form
    -GET: gets form data
    -POST: creates a form
    -PUT: update the form

/tournaments/:id/form/registrations
    -GET: get lists of registrations
    -POST: add a new registration


/tournaments/:id/form/registrations/:reg_id
    -GET: Get Registration Data
    -DELETE: delete registration data

/tournaments/:id/post
    -GET: get public post of the tournament
    -POST: creates a post doc for the tournament
    -PUT: updates the post doc

/tournaments/:id/stats
    -GET: get tournament stats

/tournaments/:id/stats/:groupid
    -GET: get group stats of the tournament

