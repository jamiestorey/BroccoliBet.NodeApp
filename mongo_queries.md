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
## An alternative way to search matches that haven't started that could include Match postponed
#### Goals value of -111 for home and -222 for away means the match hasn't started yet
```
{
    $or: [
        { $and: [ { fixture_team_home_name: "Wigan" }, { fixture_goals_home : -111 } ] },
        { $and: [ { fixture_team_away_name: "Wigan" }, { fixture_goals_away : -222} ] }
    ]
}
```
## Number of rounds in a season
'''
db.latest__41.distinct("fixture_round").length
'''
