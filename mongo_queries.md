# Mongo queries for searching fixtures


## Search for one team playing home or away and the match hasn't started yet.
```
{
    $or: [
        { $and: [ { fixture_team_home_name: "Sunderland" }, { fixture_status : "Not Started" } ] },
        { $and: [ { fixture_team_away_name: "Sunderland" }, { fixture_status : "Not Started" } ] }
    ]
}
```
